#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
APPLY=1
RUN_VERIFY=1
TARGET_RELATIVE="publication/site"

usage() {
  cat <<'USAGE'
Normalize malformed MSL/MSC canonical frontmatter exposed by SITE-0003.

Usage:
  fix-monad-docs-site-SITE-0003A.sh [options]

Options:
  --check         Report files that would change without writing them.
  --skip-verify   Apply changes without running the SITE-0003 quality gate.
  --target PATH   Publication site path relative to the repository root.
  -h, --help      Show this help text.

Behavior:
  - Creates a timestamped backup before modifying canonical documents.
  - Rewrites only malformed sectioned frontmatter in MSL-CORE and MSC-CORE specs.
  - Repairs nonstandard frontmatter closing rules made only of hyphens.
  - Gives the MSC-CORE README an explicit series-index identifier.
  - Does not modify document bodies.
  - Is idempotent; a second run should report no changes.
USAGE
}

log() {
  printf '[%s] %s\n' "$PROGRAM_NAME" "$*"
}

fail() {
  printf '[%s] error: %s\n' "$PROGRAM_NAME" "$*" >&2
  exit 1
}

while (($# > 0)); do
  case "$1" in
    --check)
      APPLY=0
      RUN_VERIFY=0
      shift
      ;;
    --skip-verify)
      RUN_VERIFY=0
      shift
      ;;
    --target)
      (($# >= 2)) || fail "--target requires a path"
      TARGET_RELATIVE="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

case "$TARGET_RELATIVE" in
  /*|../*|*/../*|*/..)
    fail "--target must be a safe repository-relative path"
    ;;
esac

if git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  REPO_ROOT="$git_root"
else
  REPO_ROOT="$PWD"
fi

SITE_ROOT="$REPO_ROOT/$TARGET_RELATIVE"
[[ -d "$REPO_ROOT/specifications" ]] || fail "specifications/ was not found beneath $REPO_ROOT"
[[ -d "$SITE_ROOT" ]] || fail "$TARGET_RELATIVE was not found beneath $REPO_ROOT"
[[ -f "$SITE_ROOT/.monad-site-bootstrap" ]] || fail "$TARGET_RELATIVE is not marked as a Monad publication site"

if [[ $RUN_VERIFY -eq 1 ]]; then
  command -v bun >/dev/null 2>&1 || fail "Bun is required to run verification; rerun with --skip-verify to apply files only"
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

NORMALIZER="$TMP_DIR/normalize.py"
cat > "$NORMALIZER" <<'PY'
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

SECTION_NAMES = {"artifact", "metadata", "relationships", "compilation"}
SPEC_PATTERNS = (
    "specifications/MSL/core/MSL-CORE-*.md",
    "specifications/MSC/core/MSC-CORE-*.md",
)
README_PATH = Path("specifications/MSC/core/README.md")
DELIMITER = re.compile(r"^-{3,}\s*$")
KEY_VALUE = re.compile(r"^([A-Za-z_][A-Za-z0-9_-]*):(?:\s*(.*))?$")
ID_PATTERN = re.compile(r"^(?P<series>[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*)-(?P<number>\d{4})$")


@dataclass
class ParsedHeader:
    sections: dict[str, dict[str, object]] = field(default_factory=dict)
    root: dict[str, object] = field(default_factory=dict)

    def section(self, name: str) -> dict[str, object]:
        return self.sections.setdefault(name, {})


def parse_scalar(raw: str) -> str:
    value = raw.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        return value[1:-1]
    return value


def find_frontmatter(text: str, path: Path) -> tuple[list[str], list[str]]:
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError(f"{path}: expected opening --- frontmatter delimiter")

    for index in range(1, len(lines)):
        if DELIMITER.fullmatch(lines[index].strip()):
            return lines[1:index], lines[index + 1 :]

    raise ValueError(f"{path}: no closing frontmatter delimiter was found")


def parse_sectioned_header(lines: list[str], path: Path) -> ParsedHeader:
    result = ParsedHeader()
    current_section: str | None = None
    current_list: tuple[dict[str, object], str] | None = None

    for line_number, raw_line in enumerate(lines, start=2):
        line = raw_line.rstrip()
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue

        if stripped.startswith("- "):
            if current_list is None:
                raise ValueError(f"{path}:{line_number}: list item has no owning key")
            owner, key = current_list
            items = owner.setdefault(key, [])
            if not isinstance(items, list):
                raise ValueError(f"{path}:{line_number}: {key} is not a list")
            items.append(parse_scalar(stripped[2:]))
            continue

        match = KEY_VALUE.fullmatch(stripped)
        if not match:
            raise ValueError(f"{path}:{line_number}: unsupported frontmatter line: {stripped}")

        key, raw_value = match.group(1), match.group(2) or ""
        if not raw_value and key in SECTION_NAMES and not line.startswith((" ", "\t")):
            current_section = key
            current_list = None
            result.section(key)
            continue

        owner = result.section(current_section) if current_section else result.root
        if raw_value:
            owner[key] = parse_scalar(raw_value)
            current_list = None
        else:
            owner[key] = []
            current_list = (owner, key)

    return result


def first_value(parsed: ParsedHeader, *paths: tuple[str | None, str]) -> object | None:
    for section_name, key in paths:
        owner = parsed.root if section_name is None else parsed.sections.get(section_name, {})
        value = owner.get(key)
        if value not in (None, "", []):
            return value
    return None


def as_list(value: object | None) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(item) for item in value if str(item).strip()]
    return [str(value)]


def quote(value: object) -> str:
    return json.dumps(str(value), ensure_ascii=False)


def emit_scalar(lines: list[str], key: str, value: object | None) -> None:
    if value not in (None, ""):
        lines.append(f"{key}: {quote(value)}")


def emit_list(lines: list[str], key: str, values: list[str]) -> None:
    if not values:
        return
    lines.append(f"{key}:")
    lines.extend(f"  - {quote(item)}" for item in values)


def normalize_document(path: Path) -> tuple[str, bool]:
    original = path.read_text(encoding="utf-8")
    header_lines, body_lines = find_frontmatter(original, path)

    # SITE-0003 already accepts conventional YAML. Only rewrite the known
    # sectioned-flat form used by the MSL/MSC core documents.
    nonblank = [line for line in header_lines if line.strip()]
    has_flat_sections = any(line in {f"{name}:" for name in SECTION_NAMES} for line in nonblank)
    has_unindented_section_members = False
    active_section = False
    for line in header_lines:
        stripped = line.strip()
        if stripped in {f"{name}:" for name in SECTION_NAMES} and not line.startswith((" ", "\t")):
            active_section = True
            continue
        if active_section and stripped and not stripped.startswith("-") and KEY_VALUE.fullmatch(stripped):
            if not line.startswith((" ", "\t")):
                has_unindented_section_members = True
                break

    if not (has_flat_sections and has_unindented_section_members):
        return original, False

    parsed = parse_sectioned_header(header_lines, path)

    identifier = first_value(parsed, (None, "id"), ("artifact", "id"))
    title = first_value(parsed, (None, "title"), ("metadata", "title"))
    document_type = first_value(parsed, (None, "type"), ("artifact", "type"))
    namespace = first_value(parsed, (None, "namespace"), ("artifact", "namespace"))
    version = first_value(parsed, (None, "version"), ("metadata", "version"))
    status = first_value(parsed, (None, "status"), ("metadata", "status"))
    created = first_value(parsed, (None, "created"), ("metadata", "created"))
    authors = as_list(first_value(parsed, (None, "authors"), ("metadata", "authors")))
    tags = as_list(first_value(parsed, (None, "tags"), ("metadata", "tags")))
    depends_on = as_list(first_value(parsed, (None, "depends_on"), ("relationships", "depends_on")))
    references = as_list(first_value(parsed, (None, "references"), ("relationships", "references")))
    enables = as_list(first_value(parsed, (None, "enables"), ("relationships", "enables")))

    if not identifier:
        raise ValueError(f"{path}: no identifier was found in malformed frontmatter")
    if not title:
        raise ValueError(f"{path}: no title was found in malformed frontmatter")

    series = None
    position = None
    id_match = ID_PATTERN.fullmatch(str(identifier))
    if id_match:
        series = id_match.group("series")
        position = int(id_match.group("number"))

    output: list[str] = ["---"]
    emit_scalar(output, "id", identifier)
    emit_scalar(output, "title", title)
    emit_scalar(output, "type", document_type)
    emit_scalar(output, "namespace", namespace)
    emit_scalar(output, "series", series)
    if position is not None:
        output.append(f"series_position: {position}")
    emit_scalar(output, "version", version)
    emit_scalar(output, "status", status)
    emit_scalar(output, "created", created)
    emit_list(output, "authors", authors)
    emit_list(output, "tags", tags)
    emit_list(output, "depends_on", depends_on)
    emit_list(output, "references", references)
    emit_list(output, "enables", enables)

    compilation = parsed.sections.get("compilation", {})
    for key in ("language", "language_version", "profile", "source_role", "status"):
        value = compilation.get(key)
        if value not in (None, "", []):
            emit_scalar(output, f"compilation_{key}", value)

    output.append("---")
    normalized = "\n".join(output + body_lines).rstrip() + "\n"
    return normalized, normalized != original


def normalize_readme(path: Path) -> tuple[str, bool]:
    original = path.read_text(encoding="utf-8")
    if original.startswith("---\n"):
        header, _ = find_frontmatter(original, path)
        if any(re.match(r'^id:\s*[\"\']?MSC-CORE-0000[\"\']?\s*$', line.strip()) for line in header):
            return original, False

    frontmatter = "\n".join(
        [
            "---",
            'id: "MSC-CORE-0000"',
            'title: "MSC-CORE Series Index"',
            'description: "Index and planned document map for the Monad Specification Compiler core series."',
            'kind: "series-index"',
            'series: "MSC-CORE"',
            "series_position: 0",
            'status: "active"',
            "---",
        ]
    ) + "\n\n"
    normalized = frontmatter + original.lstrip("\n")
    return normalized, normalized != original


def collect_targets(root: Path) -> list[Path]:
    targets: set[Path] = set()
    for pattern in SPEC_PATTERNS:
        targets.update(root.glob(pattern))
    readme = root / README_PATH
    if readme.exists():
        targets.add(readme)
    return sorted(targets)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", required=True, type=Path)
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--manifest", type=Path)
    args = parser.parse_args()

    root = args.root.resolve()
    changes: list[dict[str, str]] = []
    errors: list[str] = []

    for path in collect_targets(root):
        relative = path.relative_to(root)
        try:
            if relative == README_PATH:
                normalized, changed = normalize_readme(path)
            else:
                normalized, changed = normalize_document(path)
            if not changed:
                continue
            changes.append({"path": relative.as_posix(), "status": "normalized"})
            if args.apply:
                path.write_text(normalized, encoding="utf-8")
        except Exception as error:  # noqa: BLE001 - command-line diagnostics
            errors.append(f"{relative}: {error}")

    if args.manifest:
        args.manifest.parent.mkdir(parents=True, exist_ok=True)
        args.manifest.write_text(
            json.dumps({"changed": changes, "errors": errors}, indent=2) + "\n",
            encoding="utf-8",
        )

    for change in changes:
        print(f"CHANGE {change['path']}")
    for error in errors:
        print(f"ERROR  {error}", file=sys.stderr)

    mode = "applied" if args.apply else "would change"
    print(f"Frontmatter normalization {mode}: {len(changes)} file(s); {len(errors)} error(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
PY

MANIFEST="$TMP_DIR/manifest.json"
PYTHON_ARGS=(--root "$REPO_ROOT" --manifest "$MANIFEST")
if [[ $APPLY -eq 1 ]]; then
  PYTHON_ARGS+=(--apply)
fi

if [[ $APPLY -eq 0 ]]; then
  python3 "$NORMALIZER" "${PYTHON_ARGS[@]}"
  exit 0
fi

# Determine the exact files that would change before backing them up.
python3 "$NORMALIZER" --root "$REPO_ROOT" --manifest "$MANIFEST" >/dev/null
mapfile -t CHANGED_FILES < <(python3 - "$MANIFEST" <<'PY'
import json
import sys
from pathlib import Path
manifest = json.loads(Path(sys.argv[1]).read_text())
for item in manifest["changed"]:
    print(item["path"])
PY
)

if ((${#CHANGED_FILES[@]} == 0)); then
  log "no canonical content changes are required"
else
  BACKUP_ROOT="$REPO_ROOT/.monad/backups/content-normalization"
  TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
  BACKUP="$BACKUP_ROOT/SITE-0003A-$TIMESTAMP.tar.gz"
  mkdir -p "$BACKUP_ROOT"
  tar -czf "$BACKUP" -C "$REPO_ROOT" "${CHANGED_FILES[@]}"
  log "backed up ${#CHANGED_FILES[@]} source file(s) to ${BACKUP#$REPO_ROOT/}"

  python3 "$NORMALIZER" "${PYTHON_ARGS[@]}"
  log "canonical frontmatter normalization applied"
fi

rm -rf "$SITE_ROOT/.generated" "$SITE_ROOT/.source"
log "cleared disposable publication projections"

if [[ $RUN_VERIFY -eq 1 ]]; then
  log "running SITE-0003 quality gate"
  (cd "$SITE_ROOT" && bun run verify)
else
  log "verification skipped"
fi

cat <<RESULT

SITE-0003A content compatibility hotfix completed.

Changed source files:
  ${#CHANGED_FILES[@]}

Publication site:
  $SITE_ROOT

Inspect ingestion results:
  cd "$SITE_ROOT"
  bun run content:report

Re-run only content validation:
  bun run content:validate
RESULT

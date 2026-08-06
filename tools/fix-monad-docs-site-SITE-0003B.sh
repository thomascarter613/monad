#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
CHECK_ONLY=0
SKIP_VERIFY=0
TARGET_RELATIVE="engineering/work-cycles/WC-0001-SEMANTIC-GRAPH-CONSTRUCTION-REVIEW.md"
NEW_ID="WC-REVIEW-0001"
NEW_SERIES="WC-REVIEW"
NEW_POSITION="1"

usage() {
  cat <<'USAGE'
Resolve the SITE-0003 work-cycle review identity collision.

Usage:
  fix-monad-docs-site-SITE-0003B.sh [options]

Options:
  --check          Report whether a change is needed without writing files.
  --skip-verify    Apply the repair without running the site quality gate.
  --target PATH    Override the canonical review-document path.
  -h, --help       Show this help text.

Environment:
  MONAD_ROOT       Explicit Monad repository root. Otherwise git root or cwd is used.

Repair:
  Assigns the review document the independent governed identity WC-REVIEW-0001,
  series WC-REVIEW, and series position 1. The work-cycle record remains WC-0001.
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
      CHECK_ONLY=1
      shift
      ;;
    --skip-verify)
      SKIP_VERIFY=1
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

if [[ -n "${MONAD_ROOT:-}" ]]; then
  REPO_ROOT="$(cd "$MONAD_ROOT" && pwd)"
elif git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  REPO_ROOT="$git_root"
else
  REPO_ROOT="$(pwd)"
fi

TARGET="$REPO_ROOT/$TARGET_RELATIVE"
SITE="$REPO_ROOT/publication/site"

[[ -f "$TARGET" ]] || fail "canonical review document not found: $TARGET_RELATIVE"
[[ -f "$SITE/package.json" ]] || fail "Monad publication site not found at publication/site"

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

NORMALIZED="$TMP_DIR/normalized.md"

python3 - "$TARGET" "$NORMALIZED" "$NEW_ID" "$NEW_SERIES" "$NEW_POSITION" <<'PY'
from __future__ import annotations

from pathlib import Path
import re
import sys

source_path = Path(sys.argv[1])
out_path = Path(sys.argv[2])
new_id = sys.argv[3]
new_series = sys.argv[4]
new_position = sys.argv[5]

raw = source_path.read_text(encoding="utf-8")
newline = "\r\n" if "\r\n" in raw else "\n"
text = raw.replace("\r\n", "\n")

required = {
    "id": new_id,
    "series": new_series,
    "series_position": new_position,
}


def update_frontmatter(frontmatter: str) -> str:
    lines = frontmatter.split("\n") if frontmatter else []
    found: set[str] = set()
    output: list[str] = []

    for line in lines:
        match = re.match(r"^(id|series|series_position)\s*:\s*.*$", line)
        if match:
            key = match.group(1)
            if key not in found:
                output.append(f"{key}: {required[key]}")
                found.add(key)
            # Drop duplicate declarations of the governed field.
            continue
        output.append(line)

    insertion = [
        f"{key}: {required[key]}"
        for key in ("id", "series", "series_position")
        if key not in found
    ]

    # Place governed identity fields first so humans and tooling see them immediately.
    return "\n".join(insertion + output).strip("\n")

if text.startswith("---\n"):
    closing = text.find("\n---\n", 4)
    if closing == -1:
        raise SystemExit(
            f"{source_path}: opening frontmatter delimiter exists without a closing delimiter"
        )
    frontmatter = text[4:closing]
    body = text[closing + 5 :]
    normalized = f"---\n{update_frontmatter(frontmatter)}\n---\n{body}"
else:
    normalized = (
        "---\n"
        f"id: {new_id}\n"
        f"series: {new_series}\n"
        f"series_position: {new_position}\n"
        "---\n\n"
        f"{text}"
    )

out_path.write_text(normalized.replace("\n", newline), encoding="utf-8")
PY

if cmp -s "$TARGET" "$NORMALIZED"; then
  log "$TARGET_RELATIVE already has identity $NEW_ID"
  CHANGED=0
else
  CHANGED=1
  if [[ $CHECK_ONLY -eq 1 ]]; then
    printf 'CHANGE %s: WC-0001 -> %s\n' "$TARGET_RELATIVE" "$NEW_ID"
  else
    BACKUP_ROOT="$REPO_ROOT/.monad/backups/content-normalization"
    TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
    BACKUP="$BACKUP_ROOT/SITE-0003B-$TIMESTAMP.tar.gz"
    mkdir -p "$BACKUP_ROOT"
    tar -czf "$BACKUP" -C "$REPO_ROOT" "$TARGET_RELATIVE"
    log "backed up the review document to ${BACKUP#$REPO_ROOT/}"

    install -m 0644 "$NORMALIZED" "$TARGET"
    log "assigned $NEW_ID to $TARGET_RELATIVE"
  fi
fi

if [[ $CHECK_ONLY -eq 1 ]]; then
  if [[ $CHANGED -eq 0 ]]; then
    printf 'OK %s already uses %s\n' "$TARGET_RELATIVE" "$NEW_ID"
  fi
  exit 0
fi

rm -rf "$SITE/.generated" "$SITE/.source" "$SITE/.next"
log "cleared disposable publication projections"

if [[ $SKIP_VERIFY -eq 0 ]]; then
  command -v bun >/dev/null 2>&1 || fail "Bun is required to run verification"
  log "running SITE-0003 quality gate"
  (
    cd "$SITE"
    bun run verify
  )
else
  log "verification skipped"
fi

cat <<EOF

SITE-0003B applied successfully.

Canonical identities:
  WC-0001        engineering/work-cycles/WC-0001.md
  WC-REVIEW-0001 $TARGET_RELATIVE

The review remains related to WC-0001 through its content, but no longer occupies
WC series position 1.
EOF

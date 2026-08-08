#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  apply-WP-MSC-0007-GATEFIX-0002.sh [--verify-release] [--check-only]

One-time identity-history migration for WC-0002.

Fixes the two remaining publication-governance errors by migrating the previous
generated registry entry for the WC-0002 review from:

  id: WC-0002

to:

  id: WC-REVIEW-0002

when the previous entry points at:
  engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md

This removes:
  CONTENT_ALIAS_CANONICAL_COLLISION
  CONTENT_LIFECYCLE_TRANSITION_INVALID

The canonical WC-0002 record remains planning-complete. The review remains
accepted in the WC-REVIEW series.

The script then reruns the original WP-MSC-0007 updater. No commit, push, tag,
release, or pull request is performed.
EOF
}

VERIFY_RELEASE=0
CHECK_ONLY=0

while (($#)); do
  case "$1" in
    --verify-release) VERIFY_RELEASE=1 ;;
    --check-only) CHECK_ONLY=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$ROOT" ]]; then
  echo "Run this command from inside the Monad Git repository." >&2
  exit 2
fi
cd "$ROOT"

ORIGINAL_UPDATER="tools/wp-msc-0007/apply-WP-MSC-0007.sh"
WC_RECORD="engineering/work-cycles/WC-0002.md"
WC_REVIEW="engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"
PREVIOUS_REGISTRY="publication/site/.generated/registry/documents.json"

for required in "$ORIGINAL_UPDATER" "$WC_RECORD" "$WC_REVIEW"; do
  if [[ ! -f "$required" ]]; then
    echo "Required file not found: $required" >&2
    exit 2
  fi
done

if [[ ! -f "$PREVIOUS_REGISTRY" ]]; then
  echo "Previous publication registry not found: $PREVIOUS_REGISTRY" >&2
  echo "Run publication content sync once before applying this migration." >&2
  exit 2
fi

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP=".monad/backups/wp-msc-0007-gatefix-0002/$STAMP"
mkdir -p "$BACKUP"

cp --parents \
  "$ORIGINAL_UPDATER" \
  "$WC_RECORD" \
  "$WC_REVIEW" \
  "$PREVIOUS_REGISTRY" \
  "$BACKUP"

echo "Backup: $ROOT/$BACKUP"

python3 - "$ROOT" <<'PY'
from pathlib import Path
import json
import re
import sys

root = Path(sys.argv[1])

updater = root / "tools/wp-msc-0007/apply-WP-MSC-0007.sh"
wc_record = root / "engineering/work-cycles/WC-0002.md"
wc_review = root / "engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"
registry_path = root / "publication/site/.generated/registry/documents.json"

review_filename = "WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"
review_route = "/artifacts/engineering/work-cycles/wc-0002-diagnostics-incrementality-and-reproducibility-review"

def split_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise SystemExit(f"{path}: expected Markdown frontmatter")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise SystemExit(f"{path}: closing frontmatter delimiter not found")
    return text[4:end], text[end + 5:]

def write_frontmatter(path: Path, fm: str, body: str):
    path.write_text("---\n" + fm.rstrip() + "\n---\n" + body, encoding="utf-8")

def set_top_level(fm: str, key: str, value: str) -> str:
    lines = fm.splitlines()
    rx = re.compile(rf"^{re.escape(key)}\s*:")
    for i, line in enumerate(lines):
        if rx.match(line):
            lines[i] = f"{key}: {value}"
            return "\n".join(lines)
    insert_at = 0
    for i, line in enumerate(lines):
        if re.match(r"^(id|series|series_position|title|description|date)\s*:", line):
            insert_at = i + 1
    lines.insert(insert_at, f"{key}: {value}")
    return "\n".join(lines)

def set_nested(fm: str, section: str, key: str, value: str) -> str:
    lines = fm.splitlines()
    start = next((i for i,l in enumerate(lines) if re.match(rf"^{re.escape(section)}\s*:\s*$", l)), None)
    if start is None:
        if lines and lines[-1].strip():
            lines.append("")
        lines.extend([f"{section}:", f"  {key}: {value}"])
        return "\n".join(lines)
    end = len(lines)
    for j in range(start + 1, len(lines)):
        if lines[j] and not lines[j][0].isspace():
            end = j
            break
    rx = re.compile(rf"^(\s+){re.escape(key)}\s*:")
    for i in range(start + 1, end):
        m = rx.match(lines[i])
        if m:
            lines[i] = f"{m.group(1)}{key}: {value}"
            return "\n".join(lines)
    lines.insert(end, f"  {key}: {value}")
    return "\n".join(lines)

# Preserve source semantics:
# canonical cycle record = WC-0002, planning complete;
# cycle review = WC-REVIEW-0002, accepted.
fm, body = split_frontmatter(wc_record)
fm = set_top_level(fm, "status", "planning-complete")
if not re.search(r"(?m)^planning_status\s*:", fm):
    fm = set_top_level(fm, "planning_status", "complete")
write_frontmatter(wc_record, fm, body)

fm, body = split_frontmatter(wc_review)
fm = set_top_level(fm, "id", "WC-REVIEW-0002")
fm = set_top_level(fm, "series", "WC-REVIEW")
fm = set_top_level(fm, "series_position", "2")
fm = set_top_level(fm, "status", "accepted")
write_frontmatter(wc_review, fm, body)

# One-time migration of the PREVIOUS GENERATED REGISTRY.
data = json.loads(registry_path.read_text(encoding="utf-8"))
docs = data.get("documents")
if not isinstance(docs, list):
    raise SystemExit(f"{registry_path}: documents[] missing")

migrated = 0
cleaned_aliases = 0

def points_to_review(doc):
    fields = [
        str(doc.get("canonicalPath", "")),
        str(doc.get("relativePath", "")),
        str(doc.get("route", "")),
        str(doc.get("source", "")),
    ]
    joined = "\n".join(fields).lower()
    return (
        review_filename.lower() in joined
        or review_route.lower() == str(doc.get("route", "")).lower()
    )

for doc in docs:
    if not isinstance(doc, dict):
        continue

    # Correct historical identity for the review entry.
    if doc.get("id") == "WC-0002" and points_to_review(doc):
        doc["id"] = "WC-REVIEW-0002"
        # Keep the historical accepted state with the review identity.
        doc["status"] = "accepted"
        migrated += 1

    # Do not allow the canonical WC record to inherit the review's route.
    if doc.get("id") == "WC-0002":
        aliases = doc.get("aliases")
        if isinstance(aliases, list):
            new_aliases = [
                a for a in aliases
                if str(a).rstrip("/").lower() != review_route.lower()
            ]
            if new_aliases != aliases:
                doc["aliases"] = new_aliases
                cleaned_aliases += 1

# If the registry contained no directly identifiable review entry, inspect the
# unique prior WC-0002 route. This handles older generated registries whose
# canonicalPath metadata was sparse.
if migrated == 0:
    candidates = [d for d in docs if isinstance(d, dict) and d.get("id") == "WC-0002"]
    for doc in candidates:
        route = str(doc.get("route", "")).rstrip("/").lower()
        if route == review_route.lower():
            doc["id"] = "WC-REVIEW-0002"
            doc["status"] = "accepted"
            migrated += 1

if migrated == 0:
    raise SystemExit(
        "Could not identify the stale WC-0002 review entry in the previous "
        "generated registry. Refusing to mutate registry history blindly."
    )

registry_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

# Preserve the execution-report lifecycle fix from GATEFIX-0001.
text = updater.read_text(encoding="utf-8")
old = "  status: {'completed' if passed else 'blocked'}"
new = "  status: completed\\n  outcome: {'pass' if passed else 'conditional-fail'}"
if old in text:
    text = text.replace(old, new)
elif new not in text:
    raise SystemExit(f"{updater}: execution-report lifecycle template not recognized")
updater.write_text(text, encoding="utf-8")

print(f"Migrated previous review identity entries: {migrated}")
print(f"Removed stale WC-0002 review aliases: {cleaned_aliases}")
PY

static_check() {
  python3 - "$ROOT" <<'PY'
from pathlib import Path
import json
import re
import sys

root = Path(sys.argv[1])
record = (root / "engineering/work-cycles/WC-0002.md").read_text(encoding="utf-8")
review = (root / "engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md").read_text(encoding="utf-8")
registry = json.loads((root / "publication/site/.generated/registry/documents.json").read_text(encoding="utf-8"))
updater = (root / "tools/wp-msc-0007/apply-WP-MSC-0007.sh").read_text(encoding="utf-8")

review_route = "/artifacts/engineering/work-cycles/wc-0002-diagnostics-incrementality-and-reproducibility-review"

checks = {}
checks["WC source remains planning complete"] = bool(re.search(r"(?m)^status:\s*planning-complete\s*$", record))
checks["review id migrated"] = bool(re.search(r"(?m)^id:\s*WC-REVIEW-0002\s*$", review))
checks["review series migrated"] = bool(re.search(r"(?m)^series:\s*WC-REVIEW\s*$", review))
checks["review accepted"] = bool(re.search(r"(?m)^status:\s*accepted\s*$", review))

docs = [d for d in registry.get("documents", []) if isinstance(d, dict)]
review_entries = [d for d in docs if d.get("id") == "WC-REVIEW-0002"]
wc_entries = [d for d in docs if d.get("id") == "WC-0002"]

checks["previous review registry identity exists"] = len(review_entries) >= 1
checks["no WC-0002 previous review route"] = all(
    str(d.get("route", "")).rstrip("/").lower() != review_route.lower()
    for d in wc_entries
)
checks["no WC-0002 stale review alias"] = all(
    review_route.lower() not in {
        str(a).rstrip("/").lower() for a in (d.get("aliases") or [])
    }
    for d in wc_entries
)
checks["updater report lifecycle fix retained"] = (
    "status: completed\\n  outcome: {'pass' if passed else 'conditional-fail'}" in updater
)

for name, ok in checks.items():
    print(f"{'PASS' if ok else 'FAIL'} {name}")

failed = [name for name, ok in checks.items() if not ok]
if failed:
    raise SystemExit("Static migration validation failed: " + ", ".join(failed))
PY
}

static_check
echo "GATEFIX-0002 STATIC VALIDATION PASSED"

if [[ "$CHECK_ONLY" -eq 1 ]]; then
  echo "Check-only mode complete."
  exit 0
fi

ARGS=()
if [[ "$VERIFY_RELEASE" -eq 1 ]]; then
  ARGS+=(--verify-release)
fi

echo
echo "Re-running WP-MSC-0007 validation after registry-history migration..."
"$ORIGINAL_UPDATER" "${ARGS[@]}"

echo
echo "WP-MSC-0007 GATEFIX-0002 complete."
echo "No commit, push, tag, release, or pull request was performed."

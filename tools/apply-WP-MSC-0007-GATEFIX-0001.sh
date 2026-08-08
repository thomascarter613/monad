#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  apply-WP-MSC-0007-GATEFIX-0001.sh [--verify-release] [--check-only]

Repairs the four blocking publication-governance errors exposed after
WP-MSC-0007 reconciliation:

  1. WP-MSC-0007 execution-report lifecycle regression.
  2. Duplicate WC-0002 identifier.
  3. Invalid WC-0002 lifecycle regression.
  4. Duplicate WC series position 2.

The script then reruns the original WP-MSC-0007 updater so the implementation
threshold is declared only if all mandatory validation gates pass.

No commit, push, tag, release, or pull request is performed.
EOF
}

VERIFY_RELEASE=0
CHECK_ONLY=0

while (($#)); do
  case "$1" in
    --verify-release)
      VERIFY_RELEASE=1
      ;;
    --check-only)
      CHECK_ONLY=1
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
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
REPORT="engineering/reports/WP-MSC-0007-execution-report.md"
WC_RECORD="engineering/work-cycles/WC-0002.md"
WC_REVIEW="engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"

for required in "$ORIGINAL_UPDATER" "$REPORT" "$WC_RECORD" "$WC_REVIEW"; do
  if [[ ! -f "$required" ]]; then
    echo "Required file not found: $required" >&2
    exit 2
  fi
done

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP=".monad/backups/wp-msc-0007-gatefix-0001/$STAMP"
mkdir -p "$BACKUP"

cp --parents \
  "$ORIGINAL_UPDATER" \
  "$REPORT" \
  "$WC_RECORD" \
  "$WC_REVIEW" \
  "$BACKUP"

echo "Backup: $ROOT/$BACKUP"

python3 - "$ROOT" <<'PY'
from pathlib import Path
import re
import sys

root = Path(sys.argv[1])

original_updater = root / "tools/wp-msc-0007/apply-WP-MSC-0007.sh"
report = root / "engineering/reports/WP-MSC-0007-execution-report.md"
wc_record = root / "engineering/work-cycles/WC-0002.md"
wc_review = root / "engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"

def split_frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise SystemExit(f"{path}: expected Markdown frontmatter")
    end = text.find("\n---\n", 4)
    if end < 0:
        raise SystemExit(f"{path}: closing frontmatter delimiter not found")
    fm = text[4:end]
    body = text[end + 5:]
    return text, fm, body

def write_frontmatter(path: Path, fm: str, body: str):
    path.write_text("---\n" + fm.rstrip() + "\n---\n" + body, encoding="utf-8")

def set_top_level(fm: str, key: str, value: str) -> str:
    lines = fm.splitlines()
    pattern = re.compile(rf"^{re.escape(key)}\s*:")
    for i, line in enumerate(lines):
        if pattern.match(line):
            lines[i] = f"{key}: {value}"
            return "\n".join(lines)
    # Insert after common identity keys when possible.
    insert_at = 0
    for i, line in enumerate(lines):
        if re.match(r"^(id|series|series_position|title)\s*:", line):
            insert_at = i + 1
    lines.insert(insert_at, f"{key}: {value}")
    return "\n".join(lines)

def set_nested(fm: str, section: str, key: str, value: str) -> str:
    lines = fm.splitlines()
    section_re = re.compile(rf"^{re.escape(section)}\s*:\s*$")
    key_re = re.compile(rf"^(\s+){re.escape(key)}\s*:")
    start = None
    section_indent = 0
    for i, line in enumerate(lines):
        if section_re.match(line):
            start = i
            break
    if start is None:
        # Add the section at the end.
        if lines and lines[-1].strip():
            lines.append("")
        lines.extend([f"{section}:", f"  {key}: {value}"])
        return "\n".join(lines)

    end = len(lines)
    for j in range(start + 1, len(lines)):
        if lines[j] and not lines[j][0].isspace():
            end = j
            break

    for i in range(start + 1, end):
        m = key_re.match(lines[i])
        if m:
            lines[i] = f"{m.group(1)}{key}: {value}"
            return "\n".join(lines)

    lines.insert(end, f"  {key}: {value}")
    return "\n".join(lines)

# 1. A report can be complete even when the work outcome is conditional-fail.
#    Keeping status=completed prevents an invalid published -> draft regression.
_, fm, body = split_frontmatter(report)
fm = set_nested(fm, "metadata", "status", "completed")
fm = set_nested(fm, "metadata", "outcome", "conditional-fail")
write_frontmatter(report, fm, body)

# 2. Match the established WC-0001 pattern:
#    canonical cycle record = WC-0002;
#    cycle review = WC-REVIEW-0002 in the WC-REVIEW series.
_, fm, body = split_frontmatter(wc_review)
fm = set_top_level(fm, "id", "WC-REVIEW-0002")
fm = set_top_level(fm, "series", "WC-REVIEW")
fm = set_top_level(fm, "series_position", "2")
fm = set_top_level(fm, "status", "accepted")
write_frontmatter(wc_review, fm, body)

# 3. Preserve monotonic lifecycle for the canonical WC-0002 record.
_, fm, body = split_frontmatter(wc_record)
fm = set_top_level(fm, "status", "planning-complete")
write_frontmatter(wc_record, fm, body)

# 4. Prevent the original updater from reintroducing the report regression.
text = original_updater.read_text(encoding="utf-8")
old = "  status: {'completed' if passed else 'blocked'}"
new = "  status: completed\\n  outcome: {'pass' if passed else 'conditional-fail'}"
if old in text:
    text = text.replace(old, new)
elif new not in text:
    raise SystemExit(
        f"{original_updater}: could not locate the execution-report status template"
    )
original_updater.write_text(text, encoding="utf-8")
PY

static_check() {
  python3 - "$ROOT" <<'PY'
from pathlib import Path
import re
import sys

root = Path(sys.argv[1])
report = (root / "engineering/reports/WP-MSC-0007-execution-report.md").read_text()
record = (root / "engineering/work-cycles/WC-0002.md").read_text()
review = (root / "engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md").read_text()
updater = (root / "tools/wp-msc-0007/apply-WP-MSC-0007.sh").read_text()

checks = {
    "report status completed": bool(re.search(r"(?ms)^metadata:\n(?:^[ \t].*\n)*?^[ \t]+status:\s*completed\s*$", report)),
    "report conditional outcome": bool(re.search(r"(?ms)^metadata:\n(?:^[ \t].*\n)*?^[ \t]+outcome:\s*conditional-fail\s*$", report)),
    "WC record planning complete": bool(re.search(r"(?m)^status:\s*planning-complete\s*$", record)),
    "WC review unique id": bool(re.search(r"(?m)^id:\s*WC-REVIEW-0002\s*$", review)),
    "WC review series": bool(re.search(r"(?m)^series:\s*WC-REVIEW\s*$", review)),
    "WC review position": bool(re.search(r"(?m)^series_position:\s*2\s*$", review)),
    "updater lifecycle fix": "status: completed\\n  outcome: {'pass' if passed else 'conditional-fail'}" in updater,
}

failed = [name for name, ok in checks.items() if not ok]
for name, ok in checks.items():
    print(f"{'PASS' if ok else 'FAIL'} {name}")
if failed:
    raise SystemExit("Static gate-fix validation failed: " + ", ".join(failed))
PY
}

static_check
echo "GATEFIX STATIC VALIDATION PASSED"

if [[ "$CHECK_ONLY" -eq 1 ]]; then
  echo "Check-only mode complete."
  exit 0
fi

ARGS=()
if [[ "$VERIFY_RELEASE" -eq 1 ]]; then
  ARGS+=(--verify-release)
fi

echo
echo "Re-running WP-MSC-0007 validation..."
"$ORIGINAL_UPDATER" "${ARGS[@]}"

echo
echo "WP-MSC-0007 gate fix complete."
echo "No commit, push, tag, release, or pull request was performed."

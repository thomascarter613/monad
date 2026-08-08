#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
CHECK_ONLY=0

usage() {
  cat <<'USAGE'
Repair SITE-0003 governance-state collisions exposed by the real Monad corpus.

Usage:
  fix-monad-docs-site-SITE-0003E.sh [--check]

Repairs:
  1. Assign the WC-0002 review an independent identity: WC-REVIEW-0002.
  2. Keep WC-0002 as the canonical work-cycle identity, with publication
     lifecycle status accepted and planning_status planning-complete.
  3. Keep WP-MSC-0007-EXECUTION-REPORT published as an artifact while
     preserving metadata.status: blocked as its execution outcome.

Safety:
  - --check performs a read-only preview.
  - Apply mode backs up the exact current files before editing.
  - Unexpected existing values cause a hard stop rather than a guess.
  - The repair is idempotent.
USAGE
}

log() { printf '[%s] %s\n' "$PROGRAM_NAME" "$*"; }
fail() { printf '[%s] error: %s\n' "$PROGRAM_NAME" "$*" >&2; exit 1; }

while (($# > 0)); do
  case "$1" in
    --check) CHECK_ONLY=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) fail "unknown option: $1" ;;
  esac
done

if git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  REPO_ROOT="$git_root"
else
  fail "run this script from inside the Monad git repository"
fi

REVIEW_REL="engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md"
CYCLE_REL="engineering/work-cycles/WC-0002.md"
REPORT_REL="engineering/reports/WP-MSC-0007-execution-report.md"
REVIEW="$REPO_ROOT/$REVIEW_REL"
CYCLE="$REPO_ROOT/$CYCLE_REL"
REPORT="$REPO_ROOT/$REPORT_REL"
SITE="$REPO_ROOT/publication/site"

for path in "$REVIEW" "$CYCLE" "$REPORT"; do
  [[ -f "$path" ]] || fail "required file not found: ${path#$REPO_ROOT/}"
done
[[ -d "$SITE" ]] || fail "publication site not found: publication/site"

# First pass is always read-only and validates that the repository is in an expected state.
PLAN_OUTPUT="$({ python3 - "$REVIEW" "$CYCLE" "$REPORT" <<'PY'
from pathlib import Path
import sys

review, cycle, report = map(Path, sys.argv[1:])

def fm(path):
    lines = path.read_text(encoding='utf-8').splitlines()
    if not lines or lines[0].strip() != '---':
        raise SystemExit(f'ERROR {path}: missing frontmatter')
    try:
        end = next(i for i, line in enumerate(lines[1:], 1) if line.strip() == '---')
    except StopIteration:
        raise SystemExit(f'ERROR {path}: unterminated frontmatter')
    return lines[1:end]

def top(lines):
    out={}
    for line in lines:
        if line and not line[0].isspace() and ':' in line:
            k,v=line.split(':',1); out[k.strip()]=v.strip()
    return out

changes=[]
rv=top(fm(review))
if rv.get('id') not in (None,'WC-REVIEW-0002'):
    raise SystemExit(f"ERROR {review}: unexpected id {rv.get('id')!r}")
if rv.get('series') not in (None,'WC-REVIEW'):
    raise SystemExit(f"ERROR {review}: unexpected series {rv.get('series')!r}")
if rv.get('series_position') not in (None,'2'):
    raise SystemExit(f"ERROR {review}: unexpected series_position {rv.get('series_position')!r}")
if any(rv.get(k) is None for k in ('id','series','series_position')):
    changes.append(f'CHANGE {review}: assign WC-REVIEW-0002 identity and series position 2')

cv=top(fm(cycle))
if cv.get('status') not in ('planning-complete','accepted'):
    raise SystemExit(f"ERROR {cycle}: unexpected status {cv.get('status')!r}")
if cv.get('planning_status') not in (None,'planning-complete'):
    raise SystemExit(f"ERROR {cycle}: unexpected planning_status {cv.get('planning_status')!r}")
if cv.get('status') != 'accepted' or cv.get('planning_status') is None:
    changes.append(f'CHANGE {cycle}: lifecycle status accepted; planning_status planning-complete')

rfm=fm(report); pv=top(rfm)
if pv.get('status') not in (None,'published'):
    raise SystemExit(f"ERROR {report}: unexpected top-level status {pv.get('status')!r}")
text='\n'.join(rfm)
if 'metadata:' not in text or '  status: blocked' not in text:
    raise SystemExit(f'ERROR {report}: expected nested metadata.status: blocked')
if pv.get('status') is None:
    changes.append(f'CHANGE {report}: publication lifecycle published; execution outcome remains blocked')

if changes:
    print('\n'.join(changes))
else:
    print('NO CHANGE: SITE-0003E repairs are already present')
PY
} 2>&1)" || { printf '%s\n' "$PLAN_OUTPUT" >&2; exit 1; }
printf '%s\n' "$PLAN_OUTPUT"

if [[ $PLAN_OUTPUT == NO\ CHANGE:* ]]; then
  if [[ $CHECK_ONLY -eq 1 ]]; then exit 0; fi
  log "repairs already present; running publication quality gate"
  (cd "$SITE" && bun run verify)
  exit 0
fi

if [[ $CHECK_ONLY -eq 1 ]]; then
  log "check complete; no files changed"
  exit 0
fi

BACKUP_ROOT="$REPO_ROOT/.monad/backups/content-normalization"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$BACKUP_ROOT/SITE-0003E-$TIMESTAMP.tar.gz"
mkdir -p "$BACKUP_ROOT"
tar -czf "$BACKUP" -C "$REPO_ROOT" "$REVIEW_REL" "$CYCLE_REL" "$REPORT_REL"
log "backed up 3 source files to ${BACKUP#$REPO_ROOT/}"

# Second pass performs only the validated transformations.
python3 - "$REVIEW" "$CYCLE" "$REPORT" <<'PY'
from pathlib import Path
import sys

review, cycle, report = map(Path, sys.argv[1:])

def split(path):
    text=path.read_text(encoding='utf-8')
    lines=text.splitlines(keepends=True)
    end=next(i for i,line in enumerate(lines[1:],1) if line.strip()=='---')
    return lines[:end+1], lines[end+1:]

def values(front):
    out={}
    for raw in front[1:-1]:
        line=raw.rstrip('\r\n')
        if line and not line[0].isspace() and ':' in line:
            k,v=line.split(':',1); out[k.strip()]=v.strip()
    return out

def insert(front, items):
    return front[:-1]+[f'{item}\n' for item in items]+front[-1:]

def replace(front,key,old,new):
    out=[]; changed=False
    for raw in front:
        line=raw.rstrip('\r\n')
        if line.startswith(f'{key}:') and not line[0].isspace():
            current=line.split(':',1)[1].strip()
            if current==old:
                out.append(f'{key}: {new}\n'); changed=True; continue
        out.append(raw)
    return out,changed

def save(path,front,body): path.write_text(''.join(front+body),encoding='utf-8')

front,body=split(review); v=values(front); add=[]
if v.get('id') is None: add.append('id: WC-REVIEW-0002')
if v.get('series') is None: add.append('series: WC-REVIEW')
if v.get('series_position') is None: add.append('series_position: 2')
if add: save(review,insert(front,add),body)

front,body=split(cycle); v=values(front)
if v.get('status')=='planning-complete': front,_=replace(front,'status','planning-complete','accepted')
if v.get('planning_status') is None: front=insert(front,['planning_status: planning-complete'])
save(cycle,front,body)

front,body=split(report); v=values(front)
if v.get('status') is None: front=insert(front,['status: published'])
save(report,front,body)
PY

log "applied SITE-0003E governance normalization"
rm -rf "$SITE/.generated" "$SITE/.source" "$SITE/.next"
log "cleared disposable publication projections"
log "running publication quality gate"
(cd "$SITE" && bun run verify)
log "SITE-0003E completed successfully"

#!/usr/bin/env bash
set -euo pipefail

MODE="apply"
RUN_CONTENT_VALIDATE=1
RUN_VERIFY_RELEASE=0
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PAYLOAD_ARCHIVE="$SCRIPT_DIR/wp-msc-0007-payload.tar.gz"

usage() {
  cat <<'USAGE'
Usage: apply-WP-MSC-0007.sh [options]

Options:
  --check                  Check whether WP-MSC-0007 is already applied.
  --skip-content-validate  Apply static reconciliation but keep threshold blocked.
  --verify-release         Run bun run verify:release after the threshold gate passes.
  -h, --help               Show help.

Run from the Monad repository root. Keep wp-msc-0007-payload.tar.gz beside this
script. The updater is idempotent, creates timestamped backups under
.monad/backups/wp-msc-0007/, and performs no commit or push.
USAGE
}

while (($#)); do
  case "$1" in
    --check) MODE="check" ;;
    --skip-content-validate) RUN_CONTENT_VALIDATE=0 ;;
    --verify-release) RUN_VERIFY_RELEASE=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

ROOT="$(pwd)"
[[ -d "$ROOT/specifications/MSC/core" ]] || { echo "Run from the Monad repository root." >&2; exit 2; }
[[ -f "$ROOT/specifications/MSC/core/MSC-CORE-0001.md" ]] || { echo "MSC-CORE-0001.md not found." >&2; exit 2; }

static_check() {
python3 - "$ROOT" <<'PY_STATIC_CHECK'
from pathlib import Path
import re,sys
r=Path(sys.argv[1]); errors=[]
for n in range(1,11):
    p=r/f'specifications/MSC/core/MSC-CORE-{n:04d}.md'
    if not p.exists(): errors.append(f'missing {p.relative_to(r)}')
for n in [1,2,4,6,7,8,9,10]:
    p=r/f'specifications/MSC/core/MSC-CORE-{n:04d}.md'
    if p.exists() and '<!-- WP-MSC-0007:BEGIN -->' not in p.read_text():
        errors.append(f'missing reconciliation marker in {p.relative_to(r)}')
p1=r/'specifications/MSC/core/MSC-CORE-0001.md'
if p1.exists():
    raw=p1.read_text(); cut=raw.find('\n# '); meta=raw if cut<0 else raw[:cut]
    if re.search(r'(?<!\d)(?:MSL|MKE)-CORE-000(?!\d)',meta): errors.append('truncated relationship ID remains in MSC-CORE-0001 metadata')
p7=r/'specifications/MSC/core/MSC-CORE-0007.md'; p8=r/'specifications/MSC/core/MSC-CORE-0008.md'
if p7.exists() and 'SemanticGraphConstructionInput' not in p7.read_text(): errors.append('0007 construction handoff missing')
if p8.exists():
    t=p8.read_text()
    if 'kind: SemanticGraphConstructionInput' not in t: errors.append('0008 machine input not reconciled')
    if 'MSG\n├──→ MKE ingestion' not in t: errors.append('0008 MSG branch missing')
p10=r/'specifications/MSC/core/MSC-CORE-0010.md'
if p10.exists():
    t=p10.read_text()
    if 'Knowledge Intermediate Representation' not in t: errors.append('canonical KIR expansion missing')
    if 'What exact expansion and canonical name will KIR use' in t: errors.append('resolved KIR naming question remains')
    if 'backend-neutral, target-oriented' not in t: errors.append('canonical KIR orientation missing')
reg=r/'specifications/registry/specifications.yaml'
if not reg.exists(): errors.append('registry missing')
else:
    t=reg.read_text()
    for n in range(1,11):
        count=len(re.findall(rf'(?m)^\s*-\s+id\s*:\s*MSC-CORE-{n:04d}\s*$',t))
        if count != 1: errors.append(f'registry count for MSC-CORE-{n:04d} is {count}, expected 1')
    m=re.search(r'(?ms)^planned_artifacts\s*:\s*$.*?(?=^[A-Za-z_][A-Za-z0-9_-]*\s*:\s*$|\Z)',t)
    if m and 'MSC-CORE-0003' in m.group(0): errors.append('stale planned MSC-CORE-0003 remains')
if errors:
    print('STATIC VALIDATION FAILED')
    for e in errors: print('ERROR:',e)
    raise SystemExit(1)
print('STATIC VALIDATION PASSED')
PY_STATIC_CHECK
}

if [[ "$MODE" == "check" ]]; then
  static_check
  exit $?
fi

[[ -f "$PAYLOAD_ARCHIVE" ]] || { echo "Missing payload: $PAYLOAD_ARCHIVE" >&2; exit 2; }
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$TMP/payload"
tar -xzf "$PAYLOAD_ARCHIVE" -C "$TMP/payload"

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$ROOT/.monad/backups/wp-msc-0007/$STAMP"
mkdir -p "$BACKUP"
MANAGED=(
  specifications/MSC/core/MSC-CORE-0001.md
  specifications/MSC/core/MSC-CORE-0002.md
  specifications/MSC/core/MSC-CORE-0004.md
  specifications/MSC/core/MSC-CORE-0006.md
  specifications/MSC/core/MSC-CORE-0007.md
  specifications/MSC/core/MSC-CORE-0008.md
  specifications/MSC/core/MSC-CORE-0009.md
  specifications/MSC/core/MSC-CORE-0010.md
  specifications/MSC/core/README.md
  specifications/registry/specifications.yaml
  engineering/work-packets/WP-MSC-0007.md
  engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW.md
  engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02.md
  engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md
  engineering/reports/WP-MSC-0007-execution-report.md
  engineering/PROJECT-STATUS.md
  engineering/MILESTONES.md
  engineering/increments/PI-002.md
  engineering/work-packets/active.md
  engineering/work-packets/backlog.md
)
for rel in "${MANAGED[@]}"; do
  if [[ -f "$ROOT/$rel" ]]; then
    mkdir -p "$BACKUP/$(dirname "$rel")"
    cp -p "$ROOT/$rel" "$BACKUP/$rel"
  fi
done
printf '%s\n' "${MANAGED[@]}" > "$BACKUP/MANAGED-FILES.txt"
echo "Backup: $BACKUP"

python3 - "$ROOT" "$TMP/payload" "$BACKUP" <<'PY_APPLY'
from pathlib import Path
import re,sys,json
root=Path(sys.argv[1]); payload=Path(sys.argv[2]); backup=Path(sys.argv[3])
changes=[]; mappings=[]

def write(path,data):
    path.parent.mkdir(parents=True,exist_ok=True)
    old=path.read_text() if path.exists() else None
    if old==data: return
    path.write_text(data); changes.append(str(path.relative_to(root)))

def install(rel): write(root/rel,(payload/rel).read_text())
for rel in [
    'engineering/work-packets/WP-MSC-0007.md',
    'engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW.md',
    'specifications/MSC/core/MSC-CORE-0008.md',
    'specifications/MSC/core/MSC-CORE-0009.md',
    'specifications/MSC/core/MSC-CORE-0010.md',
]: install(rel)

BEGIN='<!-- WP-MSC-0007:BEGIN -->'; END='<!-- WP-MSC-0007:END -->'
def apply_block(path,block):
    t=path.read_text(); block=block.strip()
    pat=re.compile(re.escape(BEGIN)+r'.*?'+re.escape(END),re.S)
    if pat.search(t): nt=pat.sub(block,t)
    else:
        m=re.search(r'\n## Status\s*\n',t)
        nt=(t[:m.start()]+'\n\n'+block+'\n'+t[m.start():]) if m else (t.rstrip()+'\n\n'+block+'\n')
    write(path,nt)
for n in ['0001','0002','0004','0006','0007']:
    p=root/f'specifications/MSC/core/MSC-CORE-{n}.md'
    if not p.exists(): raise SystemExit(f'Missing {p.relative_to(root)}')
    apply_block(p,(payload/f'amendments/MSC-CORE-{n}.md').read_text())

# Repair exact truncated relationship IDs in MSC-CORE-0001 metadata only.
p=root/'specifications/MSC/core/MSC-CORE-0001.md'; t=p.read_text(); cut=t.find('\n# ')
if cut<0: cut=min(len(t),20000)
front,rest=t[:cut],t[cut:]
for fam,dirn in [('MSL','specifications/MSL/core'),('MKE','specifications/MKE/core')]:
    pat=re.compile(rf'(?<![A-Z0-9-]){fam}-CORE-000(?!\d)')
    used={int(x) for x in re.findall(rf'{fam}-CORE-(\d{{4}})',front)}
    available=[i for i in range(1,10000) if (root/dirn/f'{fam}-CORE-{i:04d}.md').exists() and i not in used]
    count=len(pat.findall(front))
    if count>len(available): raise SystemExit(f'Cannot map {count} truncated {fam} IDs; only {len(available)} verified targets')
    it=iter(available)
    def repl(_):
        i=next(it); target=f'{fam}-CORE-{i:04d}'; mappings.append(f'{fam}-CORE-000 -> {target}'); return target
    front=pat.sub(repl,front)
t=front+rest
if 'ADR-0007' not in front:
    lines=t.splitlines(True)
    for i,line in enumerate(lines[:300]):
        if re.match(r'^\s*depends_on\s*:\s*$',line):
            indent=re.match(r'^(\s*)',line).group(1)+'  '; lines.insert(i+1,indent+'- ADR-0007\n'); break
    t=''.join(lines)
write(p,t)

# Registry: copy MSC-CORE-0007 block as the schema template for 0008-0010.
reg=root/'specifications/registry/specifications.yaml'
if not reg.exists(): raise SystemExit('Missing specifications registry')
lines=reg.read_text().splitlines(True)
def section(name):
    s=None
    for i,l in enumerate(lines):
        if re.match(rf'^{re.escape(name)}\s*:\s*$',l): s=i; break
    if s is None:return None
    e=len(lines)
    for j in range(s+1,len(lines)):
        if re.match(r'^[A-Za-z_][A-Za-z0-9_-]*\s*:\s*$',lines[j]): e=j; break
    return s,e
def block(sec,ident):
    sr=section(sec)
    if not sr:return None
    s,e=sr
    for i in range(s+1,e):
        m=re.match(r'^(\s*)-\s+id\s*:\s*'+re.escape(ident)+r'\s*$',lines[i])
        if not m:continue
        ind=len(m.group(1)); j=i+1
        while j<e:
            m2=re.match(r'^(\s*)-\s+id\s*:',lines[j])
            if m2 and len(m2.group(1))==ind:break
            if lines[j].strip() and len(re.match(r'^(\s*)',lines[j]).group(1))<ind:break
            j+=1
        return i,j,ind
    return None
b=block('planned_artifacts','MSC-CORE-0003')
if b: del lines[b[0]:b[1]]
b7=block('artifacts','MSC-CORE-0007')
if not b7: raise SystemExit('MSC-CORE-0007 registry artifact block not found')
template=''.join(lines[b7[0]:b7[1]]); insert=b7[1]
titles={8:'Semantic Graph Construction',9:'Diagnostics, Incrementality, and Reproducibility',10:'KIR Lowering, Backend Contracts, and Self-Hosting'}
new=[]
for n in (8,9,10):
    ident=f'MSC-CORE-{n:04d}'
    if block('artifacts',ident):continue
    x=template.replace('MSC-CORE-0007',ident)
    x=re.sub(r'(?m)^(\s*title\s*:\s*).+$',lambda m:m.group(1)+titles[n],x)
    x=re.sub(r'(?m)^(\s*path\s*:\s*).+$',lambda m:m.group(1)+f'specifications/MSC/core/{ident}.md',x)
    x=re.sub(r'(?m)^(\s*sequence\s*:\s*)7\s*$',lambda m:m.group(1)+str(n),x)
    new.append(x)
if new: lines[insert:insert]=new
write(reg,''.join(lines))

# Series README managed block.
readme=root/'specifications/MSC/core/README.md'
if not readme.exists(): raise SystemExit('MSC core README missing')
rows=[
(1,'MSC-CORE-0001','Compiler Vision and Architecture','draft/reconciled'),
(2,'MSC-CORE-0002','Pipeline and Phase Model','draft/reconciled'),
(3,'MSC-CORE-0003','Artifact Discovery and Compilation Units','draft'),
(4,'MSC-CORE-0004','Frontend and Normalizer Orchestration','draft/reconciled'),
(5,'MSC-CORE-0005','Declaration Collection and Symbol Binding','draft'),
(6,'MSC-CORE-0006','Namespace, Import, and Reference Resolution','draft/reconciled'),
(7,'MSC-CORE-0007','Type, Constraint, and Semantic Analysis','draft/reconciled'),
(8,'MSC-CORE-0008','Semantic Graph Construction','draft/reconciled'),
(9,'MSC-CORE-0009','Diagnostics, Incrementality, and Reproducibility','draft/reconciled'),
(10,'MSC-CORE-0010','KIR Lowering, Backend Contracts, and Self-Hosting','draft/reconciled')]
rb=['<!-- WP-MSC-0007:BEGIN -->','','## Reconciled Series Status','','| Position | Artifact | Title | State |','| ---: | --- | --- | --- |']
rb += [f'| {a} | {b} | {c} | {d} |' for a,b,c,d in rows]
rb += ['','The series remains active until the second PI-002 consistency review passes.','','<!-- WP-MSC-0007:END -->']
apply_block(readme,'\n'.join(rb))
(backup/'PRELIMINARY.json').write_text(json.dumps({'changes':changes,'mappings':mappings},indent=2)+'\n')
print(f'Static reconciliation applied; {len(changes)} files changed.')
for c in changes: print(' -',c)
for m in mappings: print(' - relationship',m)
PY_APPLY

STATIC_LOG="$BACKUP/static-validation.log"
set +e
static_check >"$STATIC_LOG" 2>&1
STATIC_RC=$?
set -e
cat "$STATIC_LOG"

CONTENT_RC=125
CONTENT_LOG="$BACKUP/content-validation.log"
if [[ "$STATIC_RC" -eq 0 && "$RUN_CONTENT_VALIDATE" -eq 1 ]]; then
  if [[ -d "$ROOT/publication/site" ]] && command -v bun >/dev/null 2>&1; then
    set +e
    (cd "$ROOT/publication/site" && bun run content:validate) >"$CONTENT_LOG" 2>&1
    CONTENT_RC=$?
    set -e
  else
    echo "publication/site or bun unavailable" >"$CONTENT_LOG"
    CONTENT_RC=127
  fi
else
  echo "content validation skipped" >"$CONTENT_LOG"
fi
cat "$CONTENT_LOG"

PASS=0
[[ "$STATIC_RC" -eq 0 && "$CONTENT_RC" -eq 0 ]] && PASS=1

python3 - "$ROOT" "$TMP/payload" "$BACKUP" "$STATIC_RC" "$CONTENT_RC" "$PASS" <<'PY_FINALIZE'
from pathlib import Path
import sys,json,re
root=Path(sys.argv[1]); payload=Path(sys.argv[2]); backup=Path(sys.argv[3]); static=int(sys.argv[4]); content=int(sys.argv[5]); passed=bool(int(sys.argv[6]))
review=root/'engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02.md'; review.parent.mkdir(parents=True,exist_ok=True)
review.write_text((payload/'templates'/('PASS-REVIEW.md' if passed else 'CONDITIONAL-REVIEW.md')).read_text())
th=root/'engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md'
if passed: th.write_text((payload/'templates/THRESHOLD.md').read_text())
elif th.exists(): th.unlink()

def status_block(path,title,body):
    if not path.exists():return
    begin='<!-- WP-MSC-0007-STATUS:BEGIN -->'; end='<!-- WP-MSC-0007-STATUS:END -->'
    block=f'{begin}\n\n## {title}\n\n{body}\n\n{end}'
    t=path.read_text(); pat=re.compile(re.escape(begin)+r'.*?'+re.escape(end),re.S)
    path.write_text(pat.sub(block,t) if pat.search(t) else t.rstrip()+'\n\n'+block+'\n')
pass_text='WP-MSC-0007 passed static and publication-content validation. The compiler implementation threshold is declared. M-002 is eligible for closure, and WP-MSC-0001 is eligible for activation; WP-MSC-0002 through WP-MSC-0006 remain dependency-gated.'
fail_text='WP-MSC-0007 applied static reconciliation, but a required validation gate did not pass. The implementation threshold remains undeclared, M-002 remains active, and WP-MSC-0001 through WP-MSC-0006 remain planned.'
body=pass_text if passed else fail_text
for rel,title in [('engineering/PROJECT-STATUS.md','WP-MSC-0007 Reconciliation Status'),('engineering/MILESTONES.md','M-002 Reconciliation Gate'),('engineering/increments/PI-002.md','WP-MSC-0007 Outcome'),('engineering/work-packets/active.md','WP-MSC-0007 Status'),('engineering/work-packets/backlog.md','MSC Bootstrap Activation Gate')]:
    status_block(root/rel,title,body)
rd=root/'specifications/MSC/core/README.md'
if rd.exists() and passed:
    rd.write_text(rd.read_text().replace('The series remains active until the second PI-002 consistency review passes.','The second PI-002 consistency review passed; the MSC-CORE series is complete at the specification threshold.'))
reg=root/'specifications/registry/specifications.yaml'
if passed and reg.exists():
    lines=reg.read_text().splitlines(True)
    for i,l in enumerate(lines):
        m=re.match(r'^(\s*)-\s+id\s*:\s*MSC-CORE\s*$',l)
        if not m:continue
        ind=len(m.group(1)); j=i+1
        while j<len(lines):
            m2=re.match(r'^(\s*)-\s+id\s*:',lines[j])
            if m2 and len(m2.group(1))==ind:break
            if re.match(r'^\s*status\s*:',lines[j]): lines[j]=re.sub(r'status\s*:\s*\S+','status: complete',lines[j]); break
            j+=1
        break
    reg.write_text(''.join(lines))
pre=json.loads((backup/'PRELIMINARY.json').read_text())
report=root/'engineering/reports/WP-MSC-0007-execution-report.md'; report.parent.mkdir(parents=True,exist_ok=True)
outcome='PASS — IMPLEMENTATION THRESHOLD DECLARED' if passed else 'CONDITIONAL FAIL — IMPLEMENTATION THRESHOLD NOT DECLARED'
repairs='\n'.join('- '+x for x in pre.get('mappings',[])) or '- No truncated IDs required replacement.'
changed='\n'.join('- `'+x+'`' for x in pre.get('changes',[]))
threshold='Created `engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md`.' if passed else 'Not created; M-002 remains blocked.'
report.write_text(f'''---
artifact:
  id: WP-MSC-0007-EXECUTION-REPORT
  type: engineering.report
metadata:
  title: WP-MSC-0007 Execution Report
  status: {'completed' if passed else 'blocked'}
  executed: 2026-08-06
---

# WP-MSC-0007 Execution Report

## Outcome

```text
{outcome}
```

## Applied Scope

* Installed MSC-CORE-0008 through MSC-CORE-0010.
* Applied reconciliation amendments to MSC-CORE-0001, 0002, 0004, 0006, 0007, 0008, 0009, and 0010.
* Reconciled phase boundaries, MSG/MKE/KIR direction, consumer taxonomy, KIR definition, profiles, readiness, diagnostics, manifests, generation-plan ownership, and bootstrap decision gates.
* Reconciled the registry and MSC-CORE README.

## Source-Shape Decision

Strategy B: preserve legacy source while defining deterministic, lossless compatibility normalization to canonical nested YAML and exact `---` delimiters.

## Relationship Repairs

{repairs}

## Validation

| Gate | Exit | Result |
| --- | ---: | --- |
| Static reconciliation | {static} | {'PASS' if static==0 else 'FAIL'} |
| Publication content validation | {content} | {'PASS' if content==0 else 'FAIL or SKIPPED'} |

Logs: `{backup.relative_to(root)}`

## Second Review

Outcome: **{'PASS' if passed else 'CONDITIONAL FAIL'}**.

## Threshold

{threshold}

## Static Changes

{changed}

## Version-Control Boundary

No commit, push, tag, release, or pull request was performed.
''')
PY_FINALIZE

if [[ "$PASS" -eq 1 && "$RUN_VERIFY_RELEASE" -eq 1 ]]; then
  (cd "$ROOT/publication/site" && bun run verify:release) | tee "$BACKUP/verify-release.log"
fi

git diff --check
git status --short

echo
echo "WP-MSC-0007 outcome: $([[ "$PASS" -eq 1 ]] && echo PASS || echo CONDITIONAL-FAIL)"
echo "Evidence: $BACKUP"
if [[ "$PASS" -ne 1 ]]; then
  echo "Implementation threshold was not declared." >&2
  exit 1
fi

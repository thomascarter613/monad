#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
CANONICAL_REL="engineering/work-packets/WP-MSC-0010.md"
DUPLICATE_REL="engineering/work-packets/WP-MSC-0010 (1).md"
CHECK_ONLY=0
SKIP_VERIFY=0

usage() {
  cat <<'USAGE'
Remove the verified byte-identical duplicate WP-MSC-0010 work packet.

Usage:
  fix-monad-docs-site-SITE-0003D.sh [options]

Options:
  --check        Verify the duplicate safely without changing files.
  --skip-verify  Remove the duplicate but do not run the publication quality gate.
  -h, --help     Show this help text.

Environment:
  MONAD_ROOT     Explicit Monad repository root. Otherwise git root or cwd is used.

Safety:
  - Refuses to delete anything unless both files exist and are byte-identical.
  - Creates a timestamped backup containing both files before deletion.
  - Deletes only engineering/work-packets/WP-MSC-0010 (1).md.
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
    -h|--help)
      usage
      exit 0
      ;;
    *)
      fail "unknown option: $1"
      ;;
  esac
done

if [[ -n "${MONAD_ROOT:-}" ]]; then
  REPO_ROOT="$(cd "$MONAD_ROOT" && pwd)"
elif git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  REPO_ROOT="$git_root"
else
  REPO_ROOT="$(pwd)"
fi

CANONICAL="$REPO_ROOT/$CANONICAL_REL"
DUPLICATE="$REPO_ROOT/$DUPLICATE_REL"
SITE_ROOT="$REPO_ROOT/publication/site"

[[ -f "$CANONICAL" ]] || fail "canonical work packet is missing: $CANONICAL_REL"

if [[ ! -e "$DUPLICATE" ]]; then
  log "duplicate is already absent: $DUPLICATE_REL"
  if [[ $CHECK_ONLY -eq 1 || $SKIP_VERIFY -eq 1 ]]; then
    exit 0
  fi
  [[ -d "$SITE_ROOT" ]] || fail "publication site is missing: publication/site"
  log "running the publication quality gate"
  (cd "$SITE_ROOT" && bun run verify)
  exit 0
fi

[[ -f "$DUPLICATE" ]] || fail "duplicate path exists but is not a regular file: $DUPLICATE_REL"

if ! cmp -s -- "$CANONICAL" "$DUPLICATE"; then
  fail "refusing deletion because the two WP-MSC-0010 files are not byte-identical"
fi

CANONICAL_SHA="$(sha256sum "$CANONICAL" | awk '{print $1}')"
DUPLICATE_SHA="$(sha256sum "$DUPLICATE" | awk '{print $1}')"
[[ "$CANONICAL_SHA" == "$DUPLICATE_SHA" ]] || fail "hash verification failed unexpectedly"

if [[ $CHECK_ONLY -eq 1 ]]; then
  printf 'REMOVE %s\n' "$DUPLICATE_REL"
  printf 'KEEP   %s\n' "$CANONICAL_REL"
  printf 'SHA256 %s\n' "$CANONICAL_SHA"
  log "check complete; no files changed"
  exit 0
fi

BACKUP_ROOT="$REPO_ROOT/.monad/backups/content-normalization"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$BACKUP_ROOT/SITE-0003D-$TIMESTAMP.tar.gz"
mkdir -p "$BACKUP_ROOT"

tar -czf "$BACKUP" -C "$REPO_ROOT" "$CANONICAL_REL" "$DUPLICATE_REL"
log "backed up both work-packet files to ${BACKUP#$REPO_ROOT/}"

rm -- "$DUPLICATE"
log "removed byte-identical duplicate: $DUPLICATE_REL"
log "retained canonical work packet: $CANONICAL_REL"

# Clear only disposable projections so no stale duplicate route survives.
rm -rf "$SITE_ROOT/.generated" "$SITE_ROOT/.source" "$SITE_ROOT/.next"
log "cleared disposable publication projections"

if [[ $SKIP_VERIFY -eq 1 ]]; then
  log "verification skipped"
  exit 0
fi

command -v bun >/dev/null 2>&1 || fail "Bun is required to run the publication quality gate"
[[ -d "$SITE_ROOT" ]] || fail "publication site is missing: publication/site"

log "running the complete publication quality gate"
(cd "$SITE_ROOT" && bun run verify)

cat <<EOF

SITE-0003D completed successfully.

Removed:
  $DUPLICATE_REL

Retained:
  $CANONICAL_REL

Backup:
  ${BACKUP#$REPO_ROOT/}
EOF

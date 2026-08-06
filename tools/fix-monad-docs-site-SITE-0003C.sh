#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
SITE_RELATIVE="publication/site"
SKIP_VERIFY=0

usage() {
  cat <<'USAGE'
Apply SITE-0003C: format the Monad publication site with the repository's pinned Biome binary.

Usage:
  fix-monad-docs-site-SITE-0003C.sh [options]

Options:
  --skip-verify  Apply formatting, then run only `bun run check`.
  --site PATH    Override the site path relative to the repository root.
  -h, --help     Show this help text.

Behavior:
  - Creates a timestamped backup of publication/site before formatting.
  - Runs the locally installed Biome binary with `check --write`.
  - Re-runs the static check.
  - Runs the complete SITE-0003 quality gate unless --skip-verify is supplied.
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
    --skip-verify)
      SKIP_VERIFY=1
      shift
      ;;
    --site)
      (($# >= 2)) || fail "--site requires a repository-relative path"
      SITE_RELATIVE="$2"
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

case "$SITE_RELATIVE" in
  /*|../*|*/../*|*/..)
    fail "--site must be a safe repository-relative path"
    ;;
esac

if git_root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
  REPO_ROOT="$git_root"
else
  REPO_ROOT="$(pwd)"
fi

SITE_ROOT="$REPO_ROOT/$SITE_RELATIVE"
[[ -d "$SITE_ROOT" ]] || fail "site directory not found: $SITE_ROOT"
[[ -f "$SITE_ROOT/package.json" ]] || fail "package.json not found in $SITE_ROOT"
command -v bun >/dev/null 2>&1 || fail "Bun is required"

BIOME="$SITE_ROOT/node_modules/.bin/biome"
[[ -x "$BIOME" ]] || fail "local Biome binary not found; run 'cd $SITE_RELATIVE && bun install' first"

BACKUP_ROOT="$REPO_ROOT/.monad/backups/publication-site"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP="$BACKUP_ROOT/SITE-0003C-$TIMESTAMP.tar.gz"
mkdir -p "$BACKUP_ROOT"

tar \
  --exclude='./node_modules' \
  --exclude='./.next' \
  --exclude='./.source' \
  --exclude='./.generated' \
  --exclude='./coverage' \
  --exclude='./playwright-report' \
  --exclude='./test-results' \
  -czf "$BACKUP" -C "$SITE_ROOT" .
log "backed up the publication site to ${BACKUP#$REPO_ROOT/}"

log "applying Biome formatting and safe import organization"
(
  cd "$SITE_ROOT"
  "$BIOME" check --write .
)

log "confirming the Biome check is clean"
(
  cd "$SITE_ROOT"
  bun run check
)

if [[ $SKIP_VERIFY -eq 1 ]]; then
  log "formatting repair completed; full verification skipped"
else
  log "running the complete SITE-0003 quality gate"
  (
    cd "$SITE_ROOT"
    bun run verify
  )
fi

cat <<EOF

SITE-0003C completed successfully.

Backup:
  ${BACKUP#$REPO_ROOT/}

Site:
  $SITE_ROOT
EOF

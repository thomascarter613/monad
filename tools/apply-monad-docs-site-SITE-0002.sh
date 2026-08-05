#!/usr/bin/env bash
set -Eeuo pipefail

PROGRAM_NAME="$(basename "$0")"
TARGET_RELATIVE="publication/site"
FORCE=0
SKIP_INSTALL=0
SKIP_VERIFY=0

usage() {
  cat <<'USAGE'
Apply the cumulative SITE-0002 Monad publication-site scaffold.

Usage:
  apply-monad-docs-site-SITE-0002.sh [options]

Options:
  --force         Apply over an unmarked existing target after creating a backup.
  --skip-install  Do not run bun install.
  --skip-verify   Do not run bun run verify.
  --target PATH   Override the target path relative to the repository root.
  -h, --help      Show this help text.

Environment:
  MONAD_ROOT      Explicit repository root. Otherwise git root or cwd is used.

Behavior:
  - Creates a timestamped backup before changing an existing site.
  - Preserves unknown files.
  - Migrates SITE-0001 route files into SITE-0002 route-group locations.
  - Installs dependencies and runs the quality gate unless skipped.
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
    --force)
      FORCE=1
      shift
      ;;
    --skip-install)
      SKIP_INSTALL=1
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
MARKER="$TARGET/.monad-site-bootstrap"

if [[ -d "$TARGET" && ! -f "$MARKER" && $FORCE -ne 1 ]]; then
  fail "$TARGET exists but is not marked as a Monad publication scaffold; review it and rerun with --force"
fi

if [[ $SKIP_INSTALL -ne 1 || $SKIP_VERIFY -ne 1 ]]; then
  command -v bun >/dev/null 2>&1 || fail "Bun is required. Install Bun 1.3.14 or newer, or use --skip-install --skip-verify to apply files only."
fi

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

PAYLOAD_LINE="$(awk '/^__SITE_0002_PAYLOAD_BELOW__$/ { print NR + 1; exit }' "$0")"
[[ -n "$PAYLOAD_LINE" ]] || fail "embedded payload marker is missing"

if base64 --help 2>&1 | grep -q -- '--decode'; then
  tail -n "+$PAYLOAD_LINE" "$0" | base64 --decode >"$TMP_DIR/payload.tar.gz"
else
  tail -n "+$PAYLOAD_LINE" "$0" | base64 -D >"$TMP_DIR/payload.tar.gz"
fi

tar -xzf "$TMP_DIR/payload.tar.gz" -C "$TMP_DIR"
SOURCE="$TMP_DIR/publication/site"
[[ -f "$SOURCE/package.json" ]] || fail "embedded SITE-0002 payload is invalid"

if [[ -d "$TARGET" ]]; then
  BACKUP_ROOT="$REPO_ROOT/.monad/backups/publication-site"
  TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"
  BACKUP="$BACKUP_ROOT/SITE-0002-$TIMESTAMP.tar.gz"
  mkdir -p "$BACKUP_ROOT"
  tar \
    --exclude='./node_modules' \
    --exclude='./.next' \
    --exclude='./.source' \
    --exclude='./coverage' \
    --exclude='./playwright-report' \
    --exclude='./test-results' \
    -czf "$BACKUP" -C "$TARGET" .
  log "backed up the existing site to ${BACKUP#$REPO_ROOT/}"
fi

mkdir -p "$TARGET"

# Remove only paths owned by SITE-0001 that would conflict with route groups.
if [[ -e "$TARGET/app/page.tsx" ]]; then
  rm -f "$TARGET/app/page.tsx"
  log "migrated app/page.tsx into app/(publication)/page.tsx"
fi
if [[ -d "$TARGET/app/system" ]]; then
  rm -rf "$TARGET/app/system"
  log "migrated app/system into app/(reference)/system"
fi

cp -a "$SOURCE/." "$TARGET/"
log "applied cumulative SITE-0002 files to ${TARGET#$REPO_ROOT/}"

if [[ $SKIP_INSTALL -ne 1 ]]; then
  log "installing dependencies with Bun $(bun --version)"
  (cd "$TARGET" && bun install)
fi

if [[ $SKIP_VERIFY -ne 1 ]]; then
  log "running the SITE-0002 quality gate"
  (cd "$TARGET" && bun run verify)
fi

cat <<EOF

SITE-0002 applied successfully.

Site root:
  $TARGET

Run the development server:
  cd "$TARGET"
  bun run dev

Optional first-time browser-test setup:
  bun run test:e2e:install
  bun run test:e2e
EOF

exit 0
__SITE_0002_PAYLOAD_BELOW__
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
/D/WWf4tAGgBAA==

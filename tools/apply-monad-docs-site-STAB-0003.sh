#!/usr/bin/env bash
set -Eeuo pipefail

TARGET="publication/site"
RUN_SYNC=1
RUN_BUILD=0

usage() {
  cat <<'EOF'
Usage: apply-monad-docs-site-STAB-0003.sh [options]

Applies the identity-inference compatibility patch over STAB-0002.

Options:
  --skip-sync   Apply files without running content synchronization.
  --build       Run the production build after synchronization.
  -h, --help    Show this help.
EOF
}

while (($#)); do
  case "$1" in
    --skip-sync) RUN_SYNC=0 ;;
    --build) RUN_BUILD=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
  shift
done

if REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null); then
  :
else
  REPO_ROOT=$(pwd)
fi
REPO_ROOT=$(cd "$REPO_ROOT" && pwd)
SITE_ROOT="$REPO_ROOT/$TARGET"
MARKER="$SITE_ROOT/.monad-site-bootstrap"

if [[ ! -d "$SITE_ROOT" ]]; then
  echo "ERROR: $TARGET does not exist beneath $REPO_ROOT." >&2
  exit 1
fi

if [[ ! -f "$MARKER" ]]; then
  echo "ERROR: $TARGET is not a recognized Monad publication scaffold." >&2
  exit 1
fi

CURRENT_MARKER=$(head -n 1 "$MARKER" || true)
case "$CURRENT_MARKER" in
  STAB-0002|STAB-0003) ;;
  *)
    echo "ERROR: STAB-0003 expects STAB-0002; found $CURRENT_MARKER." >&2
    exit 1
    ;;
esac

TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP_DIR="$REPO_ROOT/.monad/backups/publication-site"
BACKUP_FILE="$BACKUP_DIR/STAB-0003-$TIMESTAMP.tar.gz"
mkdir -p "$BACKUP_DIR"

MANAGED_FILES=(
  publication/site/.monad-site-bootstrap
  publication/site/package.json
  publication/site/REAL-CORPUS-COMPATIBILITY.md
  publication/site/scripts/content/lib/normalize.mjs
  publication/site/tests/unit/content-normalize.test.ts
)

EXISTING_FILES=()
for path in "${MANAGED_FILES[@]}"; do
  [[ -e "$REPO_ROOT/$path" ]] && EXISTING_FILES+=("$path")
done
if ((${#EXISTING_FILES[@]})); then
  tar -czf "$BACKUP_FILE" -C "$REPO_ROOT" "${EXISTING_FILES[@]}"
  echo "Backup: $BACKUP_FILE"
fi

PAYLOAD_FILE=$(mktemp)
trap 'rm -f "$PAYLOAD_FILE"' EXIT
base64 -d > "$PAYLOAD_FILE" <<'PAYLOAD'
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
PAYLOAD

tar -xzf "$PAYLOAD_FILE" -C "$REPO_ROOT"
rm -rf \
  "$SITE_ROOT/.generated" \
  "$SITE_ROOT/.source" \
  "$SITE_ROOT/.next"

echo "Applied STAB-0003 to $TARGET."

if ((RUN_SYNC)); then
  (
    cd "$SITE_ROOT"
    bun run content:sync
  )
fi

if ((RUN_BUILD)); then
  (
    cd "$SITE_ROOT"
    bun run build
  )
fi

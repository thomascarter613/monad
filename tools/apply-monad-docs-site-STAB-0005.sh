#!/usr/bin/env bash
set -Eeuo pipefail

TARGET="publication/site"
RUN_SYNC=1
RUN_BUILD=0

usage() {
  cat <<'USAGE'
Usage: apply-monad-docs-site-STAB-0005.sh [options]

Applies the template-placeholder series-position compatibility patch over STAB-0004.

Options:
  --skip-sync   Apply files without running content synchronization.
  --build       Run the production build after applying the patch.
  -h, --help    Show this help.
USAGE
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
  STAB-0004|STAB-0005) ;;
  *)
    echo "ERROR: STAB-0005 expects STAB-0004; found $CURRENT_MARKER." >&2
    exit 1
    ;;
esac

TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP_DIR="$REPO_ROOT/.monad/backups/publication-site"
BACKUP_FILE="$BACKUP_DIR/STAB-0005-$TIMESTAMP.tar.gz"
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
PAYLOAD_DIR=$(mktemp -d)
trap 'rm -f "$PAYLOAD_FILE"; rm -rf "$PAYLOAD_DIR"' EXIT
base64 -d > "$PAYLOAD_FILE" <<'PAYLOAD'
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
PAYLOAD

tar -xzf "$PAYLOAD_FILE" -C "$PAYLOAD_DIR"
cp -a "$PAYLOAD_DIR"/. "$REPO_ROOT"/

# Projection, Fumadocs source manifests, and Turbopack output are disposable.
rm -rf "$SITE_ROOT/.generated" "$SITE_ROOT/.source" "$SITE_ROOT/.next"

echo "Applied STAB-0005 to $TARGET."

if ((RUN_SYNC)); then
  (cd "$SITE_ROOT" && bun run content:sync)
fi

if ((RUN_BUILD)); then
  (cd "$SITE_ROOT" && bun run build)
fi

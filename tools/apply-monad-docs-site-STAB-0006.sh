#!/usr/bin/env bash
set -Eeuo pipefail

TARGET="publication/site"
RUN_SYNC=1
RUN_BUILD=0

usage() {
  cat <<'USAGE'
Usage: apply-monad-docs-site-STAB-0006.sh [options]

Applies the dependency-backed TypeScript contract stabilization patch over STAB-0005.

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

if REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null); then :; else REPO_ROOT=$(pwd); fi
REPO_ROOT=$(cd "$REPO_ROOT" && pwd)
SITE_ROOT="$REPO_ROOT/$TARGET"
MARKER="$SITE_ROOT/.monad-site-bootstrap"

if [[ ! -d "$SITE_ROOT" ]]; then echo "ERROR: $TARGET does not exist beneath $REPO_ROOT." >&2; exit 1; fi
if [[ ! -f "$MARKER" ]]; then echo "ERROR: $TARGET is not a recognized Monad publication scaffold." >&2; exit 1; fi

CURRENT_MARKER=$(head -n 1 "$MARKER" || true)
case "$CURRENT_MARKER" in
  STAB-0005|STAB-0006) ;;
  *) echo "ERROR: STAB-0006 expects STAB-0005; found $CURRENT_MARKER." >&2; exit 1 ;;
esac

TIMESTAMP=$(date -u +%Y%m%dT%H%M%SZ)
BACKUP_DIR="$REPO_ROOT/.monad/backups/publication-site"
BACKUP_FILE="$BACKUP_DIR/STAB-0006-$TIMESTAMP.tar.gz"
mkdir -p "$BACKUP_DIR"

MANAGED_FILES=(
  publication/site/.monad-site-bootstrap
  publication/site/package.json
  publication/site/REAL-CORPUS-COMPATIBILITY.md
  publication/site/tsconfig.json
  publication/site/lib/metadata.ts
  'publication/site/app/(publication)/editions/[edition]/epub/route.ts'
  'publication/site/app/(publication)/editions/[edition]/print/page.tsx'
  publication/site/components/mdx.tsx
  publication/site/lib/discovery/pages.ts
  publication/site/tests/unit/building-monad-manifest.test.ts
  publication/site/tests/unit/editions-manifest.test.ts
)

EXISTING_FILES=()
for path in "${MANAGED_FILES[@]}"; do [[ -e "$REPO_ROOT/$path" ]] && EXISTING_FILES+=("$path"); done
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

rm -rf "$SITE_ROOT/.source" "$SITE_ROOT/.next"

echo "Applied STAB-0006 to $TARGET."

if ((RUN_SYNC)); then (cd "$SITE_ROOT" && bun run content:sync); fi
if ((RUN_BUILD)); then (cd "$SITE_ROOT" && bun run build); fi

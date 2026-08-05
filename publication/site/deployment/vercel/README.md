# Vercel Deployment

Configure the Vercel project root directory as `publication/site`.

Required project settings:

- Install command: `bun install --frozen-lockfile`
- Build command: `bun run build`
- Node.js: 22 or newer
- `NEXT_PUBLIC_SITE_URL`: canonical production origin
- `NEXT_PUBLIC_REPOSITORY_URL`: canonical repository URL
- `MONAD_DEPLOYMENT_TARGET=vercel`
- `MONAD_SECURITY_HSTS=true`

For GitHub Actions deployment, configure repository variables:

- `MONAD_DOCS_PREVIEW_ENABLED=true`
- `MONAD_DOCS_PRODUCTION_ENABLED=true`

And repository or environment secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Prefer Vercel's native Git integration when no custom deployment gate is needed. Use the included workflows when deployment must occur only after the repository's explicit quality gates.

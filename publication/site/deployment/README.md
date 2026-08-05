# Deployment Profiles

The Monad Engineering Log supports two production deployment profiles.

- `vercel/` — managed Next.js hosting and preview deployments.
- `container/` — provider-independent standalone OCI image.

The canonical health endpoint is `/api/health`. The public operational contract is `/api/operations`.

GitHub deployment workflows are opt-in. They do nothing until the documented repository variables and secrets are configured.

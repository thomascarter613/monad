# Standalone Container

Build from the Monad repository root because the documentation compiler consumes canonical files outside `publication/site/`.

```bash
docker build \
  -f publication/site/deployment/container/Dockerfile \
  -t monad-engineering-log:local \
  .

docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  monad-engineering-log:local
```

Or use:

```bash
cd publication/site/deployment/container
docker compose up --build
```

The runtime image is unprivileged, exposes port 3000, and checks `/api/health`.

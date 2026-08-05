# syntax=docker/dockerfile:1
FROM oven/bun:1.3.14-alpine AS dependencies
WORKDIR /repo/publication/site
COPY publication/site/package.json publication/site/bun.lock* ./
RUN bun install --frozen-lockfile

FROM oven/bun:1.3.14-alpine AS builder
WORKDIR /repo
COPY --from=dependencies /repo/publication/site/node_modules ./publication/site/node_modules
COPY . .
WORKDIR /repo/publication/site
ENV NODE_ENV=production \
    MONAD_DEPLOYMENT_TARGET=container
RUN bun run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    MONAD_DEPLOYMENT_TARGET=container
RUN addgroup --system --gid 1001 monad && adduser --system --uid 1001 --ingroup monad monad
COPY --from=builder --chown=monad:monad /repo/publication/site/.next/standalone ./
COPY --from=builder --chown=monad:monad /repo/publication/site/.next/static ./publication/site/.next/static
COPY --from=builder --chown=monad:monad /repo/publication/site/public ./publication/site/public
USER monad
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null || exit 1
CMD ["node", "publication/site/server.js"]

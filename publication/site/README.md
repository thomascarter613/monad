# Monad publication site

The Fumadocs-based documentation and engineering-log application for Monad.

## Current implementation

This cumulative scaffold contains SITE-0001 through SITE-0003:

- Next.js and Fumadocs application foundation
- Typed site configuration and route contracts
- Search, error handling, tests, and quality commands
- Canonical repository content discovery and normalization
- Generated collections for Building Monad, architecture, ADRs, and specifications
- Cross-document route rewriting and a machine-readable document registry

## Start development

From `publication/site/`:

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open `http://localhost:3000`.

## Canonical source model

Authoritative documents stay at the repository level:

```text
journal/
architecture/
adrs/
specifications/
```

The application generates a disposable projection under `.generated/` before development, type checking, and production builds. See [CONTENT-INGESTION.md](./CONTENT-INGESTION.md).

## Primary commands

```bash
bun run content:sync
bun run content:report
bun run typecheck
bun run test:unit
bun run build
bun run verify
bun run verify:strict
bun run verify:full
```

Install the Playwright Chromium browser once before running full browser tests:

```bash
bun run test:e2e:install
```

## Environment

Copy `.env.example` to `.env.local`. Set `MONAD_REPOSITORY_ROOT` only when the site is executed outside the repository tree or Git root discovery is unavailable.

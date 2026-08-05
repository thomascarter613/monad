# Development workflow

## Prerequisites

- Bun 1.3.14 or newer
- Node.js 22 or newer
- A Git checkout of Monad, or `MONAD_REPOSITORY_ROOT` pointing to the repository root

## First run

```bash
cd publication/site
bun install
cp .env.example .env.local
bun run dev
```

The development launcher performs an initial canonical-content synchronization, starts a polling watcher for repository Markdown, and then starts Next.js.

## Content troubleshooting

Validate without writing generated files:

```bash
bun run content:validate
```

Treat warnings as failures:

```bash
bun run content:validate:strict
```

Inspect registries and navigation:

```bash
bun run content:report
bun run content:report:issues
bun run content:report:series
bun run content:report:relationships
bun run content:report:navigation
bun run content:report:building-monad
bun run content:report:discovery
```

Rebuild the projection:

```bash
bun run content:clean
bun run content:sync
```

## Quality gates

```bash
bun run verify
```

This validates canonical content, runs Biome, generates Fumadocs types, type-checks TypeScript, runs unit tests, and creates a production build.

```bash
bun run verify:strict
```

This uses the same gate but rejects all content-ingestion warnings.

```bash
bun run verify:full
```

This also runs Playwright browser tests.

## Frontmatter migration

`bun run content:migrate` creates an advisory frontmatter plan under `.generated/migrations/`; it never edits canonical files. Use `bun run content:migrate:check` when explicit frontmatter has become a publication gate.

## Visual-system verification

SITE-0006 adds accessibility smoke tests to the ordinary Playwright suite and opt-in screenshot comparisons.

```bash
bun run test:a11y
bun run test:visual:update
bun run test:visual
bun run verify:visual
```

Visual baselines should be generated and reviewed on the same browser and operating-system environment used by CI. See `VISUAL-SYSTEM.md` for the governing contract.
## Building Monad series diagnostics

```bash
bun run content:report:building-monad
bun run content:report:discovery
curl http://localhost:3000/api/building-monad
```

Reading state is browser-local and can be reset by removing `monad:building-monad:reading:v1` from local storage. See `BUILDING-MONAD-EXPERIENCE.md`.


## Inspect artifact exploration

```bash
bun run content:sync
bun run content:report:exploration
```

The generated browser and API contract is available at `/api/exploration`.


## Discovery and SEO diagnostics

```bash
bun run content:report:discovery
curl "http://localhost:3000/api/discovery?q=manifest&kind=specification"
curl http://localhost:3000/llms.txt
curl http://localhost:3000/feeds/building-monad.rss.xml
```

Document Markdown is available by appending `.md` to a rendered document route.

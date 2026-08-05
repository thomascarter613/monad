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

Inspect the current route and identifier registry:

```bash
bun run content:report
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

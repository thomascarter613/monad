# Monad publication site

The Fumadocs-based documentation and engineering-log application for Monad.

## Current implementation

This cumulative scaffold contains SITE-0001 through SITE-0011:

- Next.js and Fumadocs application foundation
- Typed site configuration, route contracts, search, errors, tests, and quality commands
- Canonical repository content discovery and disposable Fumadocs projection
- Versioned identifier families, lifecycle validation, aliases, series, and reverse references
- Registry-backed artifact indexes and machine-readable APIs
- Final public information architecture and canonical route policy
- Generated page-tree ordering, breadcrumbs, and previous/next navigation
- Audience-specific reading paths
- Project status, roadmap, release-policy, and build-log surfaces
- Cross-section discovery and canonical metadata
- Technical MDX presentation component library
- Dedicated Building Monad series experience with phases, continuity, repository state, and local reading progress
- Faceted publication search, RSS/Atom feeds, AI-readable Markdown, structured metadata, sitemap, robots, and social cards
- Reproducible PDF, EPUB, offline HTML, and canonical-source publication editions

## Start development

From `publication/site/`:

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open `http://localhost:3000`.

## Public entry points

```text
/start
/building-monad
/system
/artifacts
/project
/search
/editions
```

See [INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) for the route and reading-path contract.

## Canonical source model

Authoritative documents stay at the repository level:

```text
journal/
architecture/
adrs/
specifications/
engineering/
research/
knowledge/
build-log/
```

The application generates a disposable projection under `.generated/` before development, type checking, and production builds. See [CONTENT-INGESTION.md](./CONTENT-INGESTION.md) and [CONTENT-GOVERNANCE.md](./CONTENT-GOVERNANCE.md).

## Primary commands

```bash
bun run content:sync
bun run content:report
bun run content:report:issues
bun run content:report:navigation
bun run content:report:building-monad
bun run content:report:discovery
bun run content:migrate
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

## Visual system

The production visual foundations are documented in [`VISUAL-SYSTEM.md`](./VISUAL-SYSTEM.md). The site uses repository-local CSS tokens, system font stacks, section identities, light/dark presentation, accessible focus behavior, reduced-motion handling, and print-aware base rules.

## SITE-0007 component library

The semantic presentation vocabulary is implemented in `components/engineering/` and documented in `PRESENTATION-COMPONENTS.md`. Canonical Markdown can use recognized blockquote markers and terminal fence metadata; the disposable projection upgrades those conventions into MDX while preserving ordinary repository readability.

Reference page: `/system/presentation-components`.
## SITE-0008 Building Monad experience

The chronological publication is documented in [`BUILDING-MONAD-EXPERIENCE.md`](./BUILDING-MONAD-EXPERIENCE.md). It is generated from canonical `journal/` files and exposes a phase-grouped series index, repository checkpoints, artifact introductions, local reading progress, and `/api/building-monad`.


## SITE-0009 exploration surfaces

The generated registry now feeds `/artifacts/explore`, `/artifacts/relationships`, `/artifacts/series`, and `/project/timeline`. Run `bun run content:report:exploration` to inspect the same read model in the terminal. See `ARTIFACT-EXPLORATION.md` for the manifest and chronology contracts.


## SITE-0010 discovery and machine-readable publication

See [`SEARCH-AI-SEO.md`](./SEARCH-AI-SEO.md). Public outputs include `/search`, `/llms.txt`, `/llms-full.txt`, per-page `.md` routes, RSS and Atom feeds, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, and registry-backed `/api/discovery`.

## Derived publications

SITE-0011 adds configured PDF, EPUB, offline, and canonical-source editions. See `PUBLICATION-EDITIONS.md` and run `bun run publication:plan`.


## Operations and deployment

SITE-0012 adds GitHub Actions quality gates, opt-in Vercel previews and production deployment, a portable standalone container, health and operations endpoints, reproducible documentation-release automation, security headers, and operational reports.

```bash
bun run operations:doctor
bun run verify:operations
```

See `OPERATIONS.md`, `SECURITY.md`, and `deployment/README.md`.

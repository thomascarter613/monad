# Publication application architecture

## Boundary

`publication/site/` owns presentation behavior. It does not own the engineering facts it presents. Canonical Monad documents remain in domain-oriented repository directories and are projected into Fumadocs at build and development time.

## Layers

```text
Canonical repository Markdown
        │
        ▼
Discovery, normalization, and governance
        │
        ├── validation issues
        ├── relationship graph
        ├── document registry
        └── navigation manifest
        │
        ▼
.generated/content + .generated/registry
        │
        ▼
Fumadocs MDX collections
        │
        ├── /building-monad
        ├── /system
        ├── /artifacts
        ├── /project
        ├── /api/search
        ├── /api/registry
        └── /api/navigation
```

## Repository boundary

The site is a self-contained TypeScript application. It does not create a root `package.json`, require a JavaScript monorepo, or change the language-neutral Monad repository taxonomy.

## Source configuration

`content.sources.mjs` is the adapter contract between repository organization and public information architecture. A source definition specifies canonical roots, semantic kind, generated collection, public route base, and identifier expectations.

`information-architecture.mjs` defines the public section hierarchy, route policy, and audience reading paths independently of Fumadocs and Next.js.

## Generated boundary

`.generated/` contains reproducible output:

```text
.generated/
├── content/
│   ├── artifacts/
│   ├── building-monad/
│   ├── project/
│   └── system/
└── registry/
    ├── documents.json
    ├── navigation.json
    ├── reading-paths.json
    ├── redirects.json
    ├── relationships.json
    └── series.json
```

The directory is atomically replaced after successful validation. A failed ingestion leaves the previous valid projection untouched.

## Content loaders

`source.config.ts` defines five Fumadocs MDX collections: bootstrap system documentation, generated system documentation, Building Monad, Artifacts, and Project.

`lib/source.ts` merges bootstrap and generated system sources into one `/system` page tree. The search endpoint combines every public documentation source.

## Route groups

```text
app/
├── (publication)/
│   ├── page.tsx
│   ├── start/
│   └── building-monad/
└── (reference)/
    ├── artifacts/
    ├── project/
    └── system/
```

Route groups separate guided, narrative, reference, registry, and operational experiences without changing public URLs.

## Navigation model

Generated `meta.json` files establish deterministic Fumadocs page trees. Fumadocs uses those trees for sidebars, breadcrumbs, and default previous/next navigation. A separate navigation manifest records the route hierarchy and reading paths for APIs and non-Fumadocs presentation formats.

## Integrity rules

Identifiers, routes, aliases, and generated paths must be globally unique. Canonical paths and SHA-256 hashes are recorded in every generated page and registry entry. Relative document links are resolved against the source repository and rewritten to public routes. Previous routes are retained as permanent redirects.

## SITE-0006 presentation layer

The application visual layer is divided into four explicit boundaries:

```text
styles/tokens.css       semantic color, typography, spacing, and section variables
styles/base.css         document defaults, focus, prose, motion, and forced colors
styles/components.css   publication-specific layout and component treatments
styles/print.css        print-only foundational behavior
```

Fumadocs remains responsible for documentation layout mechanics, navigation, search, and page trees. Monad owns the visual tokens, article chrome, section identity, and publication-specific components. This preserves the ability to upgrade Fumadocs without treating its default theme as the product identity.

## Presentation component boundary

SITE-0007 introduces a renderer-facing semantic layer beneath `components/engineering/`. The canonical corpus does not import these components. Instead, `scripts/content/lib/presentation.mjs` converts a deliberately small set of GitHub-readable Markdown conventions during projection. Site-owned MDX pages may use the same components directly through the central `components/mdx.tsx` registry.

This layer may change visual structure, but it may not alter document identity, lifecycle, relationships, routes, or canonical source files.

## Building Monad series projection

SITE-0008 derives a dedicated chronological manifest from governed `journal/` documents. The shared contract in `building-monad.config.mjs` defines phase vocabulary, reading-time policy, completion threshold, and browser storage namespace without importing Next.js or Fumadocs.

Content synchronization writes `.generated/registry/building-monad.json`. The Next.js application consumes that manifest for the phase-grouped series index, repository checkpoints, connected-artifact panels, and explicit installment continuity. Reading progress is a presentation concern stored locally in the reader's browser; it does not alter the canonical document registry.

## Exploration read model

SITE-0009 derives `.generated/registry/exploration.json` from the governed document registry. This read model is optimized for filtering, relationship neighborhoods, supersession lineage, series completion, and chronology. It is disposable and cannot override canonical identity, lifecycle, route, or relationship facts from `documents.json`.

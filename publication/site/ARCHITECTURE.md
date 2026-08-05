# Publication application architecture

## Boundary

`publication/site/` owns presentation behavior. It does not own the engineering facts it presents.
Canonical Monad documents remain in domain-oriented repository directories and are projected into Fumadocs at build and development time.

## Layers

```text
Canonical repository Markdown
        │
        ▼
Discovery and normalization
        │
        ├── validation issues
        ├── link and identifier graph
        └── document registry
        │
        ▼
.generated/content
        │
        ▼
Fumadocs MDX collections
        │
        ├── /building-monad
        ├── /system
        ├── /artifacts
        └── /api/search
```

## Repository boundary

The site is a self-contained TypeScript application. It does not create a root `package.json`, require a JavaScript monorepo, or change the language-neutral Monad repository taxonomy.

## Source configuration

`content.sources.mjs` is the adapter contract between repository organization and public information architecture. A source definition specifies:

- Canonical repository roots
- Semantic document kind
- Generated Fumadocs collection and prefix
- Public route base
- Whether an explicit document identifier is expected

## Generated boundary

`.generated/` contains only reproducible output:

```text
.generated/
├── content/
│   ├── artifacts/
│   ├── building-monad/
│   └── system/
└── registry/
    └── documents.json
```

The directory is atomically replaced after successful validation. A failed ingestion leaves the previous valid projection untouched.

## Content loaders

`source.config.ts` defines four Fumadocs MDX collections:

- Bootstrap system documentation
- Generated system documentation
- Building Monad
- Artifacts

`lib/source.ts` merges bootstrap and generated system sources into a single `/system` page tree. Building Monad and Artifacts use independent loaders and layouts. The search endpoint combines pages from all public sources into one index.

## Route groups

```text
app/
├── (publication)/
│   ├── page.tsx
│   └── building-monad/
└── (reference)/
    ├── artifacts/
    └── system/
```

Route groups separate narrative and reference experiences without changing public URLs.

## Integrity rules

Identifiers, routes, and generated output paths must be globally unique. Canonical paths and SHA-256 hashes are recorded in every generated page and registry entry. Relative document links are resolved against the source repository and rewritten to public routes.

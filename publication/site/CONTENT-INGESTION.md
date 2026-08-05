# Canonical content ingestion

SITE-0003 connects the publication application to Markdown owned by the Monad repository.
The website does not become the canonical storage location for engineering documents.

## Configured sources

| Repository source | Public route | Generated collection |
| --- | --- | --- |
| `journal/` | `/building-monad` | `.generated/content/building-monad/` |
| `architecture/` | `/system/architecture` | `.generated/content/system/architecture/` |
| `adrs/` | `/artifacts/decisions` | `.generated/content/artifacts/decisions/` |
| `specifications/` | `/artifacts/specifications` | `.generated/content/artifacts/specifications/` |

Change source mappings in `content.sources.mjs`. Paths are relative to the repository root.

## Commands

```bash
bun run content:sync
bun run content:validate
bun run content:validate:strict
bun run content:report
bun run content:clean
```

`bun run dev`, `bun run build`, and `bun run typecheck` synchronize content automatically.
The development command also watches canonical files and refreshes the projection when they change.

## Normalization

The adapter:

1. Discovers `.md` and `.mdx` files recursively.
2. Parses a conservative YAML frontmatter subset.
3. Infers a title, description, identifier, status, slug, series, and position when possible.
4. Preserves the repository-relative canonical path and SHA-256 source hash.
5. Rewrites links between ingested Markdown documents to public site routes.
6. Extracts references to known document identifiers.
7. Generates collection indexes and Fumadocs metadata.
8. Writes a machine-readable registry to `.generated/registry/documents.json`.

## Validation behavior

Errors stop synchronization and builds. Errors include:

- Invalid frontmatter structure
- Unreadable or oversized documents
- Duplicate identifiers
- Duplicate public routes
- Duplicate generated paths

Warnings do not stop normal development, but they fail `content:validate:strict`. Warnings include:

- Missing configured source roots
- Inferred fallback identifiers
- Empty document bodies
- Broken Markdown document links
- Relative media references not yet handled by the media pipeline

## Frontmatter

Canonical documents may provide site metadata without depending on Fumadocs:

```yaml
---
id: MKE-CORE-0001
title: Knowledge Engine Core
summary: Defines the foundation of the Monad Knowledge Engine.
status: active
slug: mke/core/0001-knowledge-engine-core
series: MKE-CORE
series_position: 1
tags: [knowledge-engine, architecture]
related:
  decisions: [ADR-0001]
  articles: [MJ-0001]
---
```

Only `title`, `description` or `summary`, `id`, `status`, `slug`, `series`,
`series_position`, `tags`, and `related` are interpreted in SITE-0003. Unknown metadata remains canonical but is not copied into the generated page schema yet.

## Generated boundary

`.generated/` is disposable and excluded from version control. Never edit it manually.
A generated page records its canonical path and source hash, so rendered content can always be traced back to its authoritative file.

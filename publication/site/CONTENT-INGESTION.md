# Canonical content ingestion

SITE-0003 introduced, SITE-0004 governs, and SITE-0005 organizes, the publication application to Markdown owned by the Monad repository.
The website does not become the canonical storage location for engineering documents.

## Configured sources

| Repository source | Public route | Generated collection |
| --- | --- | --- |
| `journal/` | `/building-monad` | `.generated/content/building-monad/` |
| `architecture/` | `/system/architecture` | `.generated/content/system/architecture/` |
| `adrs/` | `/artifacts/decisions` | `.generated/content/artifacts/decisions/` |
| `specifications/` | `/artifacts/specifications` | `.generated/content/artifacts/specifications/` |
| `engineering/` | `/artifacts/engineering` | `.generated/content/artifacts/engineering/` |
| `research/` | `/artifacts/research` | `.generated/content/artifacts/research/` |
| `knowledge/` | `/artifacts/knowledge` | `.generated/content/artifacts/knowledge/` |
| `build-log/` | `/project/build-log` | `.generated/content/project/build-log/` |

Change source mappings in `content.sources.mjs`. Paths are relative to the repository root.

## Commands

```bash
bun run content:sync
bun run content:validate
bun run content:validate:strict
bun run content:report
bun run content:report:issues
bun run content:report:series
bun run content:report:relationships
bun run content:report:navigation
bun run content:migrate
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
8. Validates identifier families, lifecycle transitions, aliases, relationships, supersession, and series order.
9. Generates deterministic Fumadocs page trees and audience reading-path manifests.
10. Writes versioned registry, navigation, redirect, relationship, series, report, and migration outputs beneath `.generated/`.

## Validation behavior

Errors stop synchronization and builds. Errors include:

- Invalid frontmatter structure
- Unreadable or oversized documents
- Duplicate identifiers
- Duplicate public routes
- Duplicate generated paths
- Identifier-family and document-kind mismatches
- Invalid lifecycle transitions
- Alias collisions
- Invalid supersession targets or cycles
- Duplicate series positions or conflicting totals

Warnings do not stop normal development, but they fail `content:validate:strict`. Warnings include:

- Missing configured source roots
- Inferred fallback identifiers
- Empty document bodies
- Broken Markdown document links
- Relative media references not yet handled by the media pipeline
- Missing relationship targets outside supersession chains
- Series position gaps
- Unusual initial lifecycle states

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
series_total: 18
aliases: [/artifacts/specifications/old-knowledge-engine-core]
tags: [knowledge-engine, architecture]
related:
  decisions: [ADR-0001]
  articles: [MJ-0001]
---
```

SITE-0004 additionally interprets `series_total`, `aliases`, `redirect_from`, `references`, `supersedes`, and `superseded_by`. Unknown metadata remains canonical and is not copied into the generated page schema.

## Generated boundary

`.generated/` is disposable and excluded from version control. Never edit it manually.
A generated page records its canonical path and source hash, so rendered content can always be traced back to its authoritative file.

## Presentation enrichment

After canonical normalization and governance, the projection applies `scripts/content/lib/presentation.mjs`. It converts recognized semantic blockquotes and terminal-marked code fences into registered MDX components. Generated documents use the `.mdx` extension even when their canonical source uses `.md`; public routes and canonical identities are unaffected.

## Building Monad derived manifest

Journal entries receive optional publication and repository-state normalization during ingestion. After governance and relationship validation, the projection compiles those records into `.generated/registry/building-monad.json`. This derived manifest is disposable, contains no authoring-only React syntax, and can always be recreated from the canonical journal corpus and governed registry.

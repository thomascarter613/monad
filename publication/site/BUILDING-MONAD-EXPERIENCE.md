# Building Monad series experience

SITE-0008 turns `journal/` into a first-class chronological publication while keeping every canonical article readable as ordinary Markdown.

## Generated series manifest

Content synchronization writes:

```text
.generated/registry/building-monad.json
```

The manifest records:

- installment order and declared total
- project-phase grouping
- reading-time estimates
- publication dates
- repository state
- connected artifacts
- previous and next installment links
- the current published edge of the series

The same data is available at `GET /api/building-monad`.

## Optional journal frontmatter

Existing journal entries continue to work without new metadata. Richer presentation is enabled with:

```yaml
---
id: MJ-0008
title: Building the Publication Experience
status: published
series: building-monad
series_position: 8
series_total: 24
project_phase: experience
published: 2026-08-04
updated: 2026-08-04
reading_minutes: 18
repository:
  branch: main
  commit: 0123456789abcdef
  release: null
  tree: publication/site
  command: bun run content:sync
related:
  decisions: [ADR-0007]
  specifications: [PUB-CORE-0008]
---
```

Supported repository keys are `commit`, `branch`, `release` or `tag`, `tree` or `path`, and `command`.

## Project phases

The default phase vocabulary is defined in `building-monad.config.mjs`:

1. Orientation
2. Foundation
3. Kernel and Runtime
4. Specification Language
5. Engine and Generation
6. CLI and Human Experience
7. AI Context and Intelligence
8. Governance and Assurance
9. Operations and Ecosystem

An article may declare another phase key. Unknown phase keys remain valid and receive a generated human-readable title rather than failing publication.

## Reading state

Reading progress is stored only in the reader's browser under:

```text
monad:building-monad:reading:v1
```

The stored state contains route, maximum observed progress, completion, and last-visited time. It is not sent to the server. An installment is considered read after the configured completion threshold, currently 92 percent.

## Reading-time estimates

When `reading_minutes` is absent, the ingestion pipeline estimates reading time from the canonical body using 225 words per minute. Code fences and markup punctuation are excluded from the approximate word count.

## Connected artifacts

The article experience displays validated outgoing relationships to ADRs, specifications, architecture records, engineering records, research, and knowledge records. These relationships remain governed by SITE-0004's registry contract.

## Commands

```bash
bun run content:sync
bun run content:report:building-monad
bun run dev
```

Inspect the generated API locally:

```bash
curl http://localhost:3000/api/building-monad
```

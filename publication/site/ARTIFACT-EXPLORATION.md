# Monad artifact exploration

SITE-0009 adds a registry-backed exploration layer over the canonical Monad corpus.

## Generated contract

`bun run content:sync` writes `.generated/registry/exploration.json`. The manifest is a disposable read model derived from `documents.json`; it does not replace the document registry.

The read model contains:

- compact document cards and filter facets;
- validated directed relationship edges;
- supersession components and lineage order;
- declared-series completion and lifecycle distributions;
- dated project events and an explicit undated-document queue.

## Public surfaces

- `/artifacts/explore` — searchable and filterable corpus catalog;
- `/artifacts/relationships` — incoming/outgoing neighborhoods and supersession chains;
- `/artifacts/series` — completion dashboards and ordered positions;
- `/project/timeline` — publication, update, inferred, and build-log chronology;
- `/api/exploration` — the machine-readable exploration manifest.

## Date policy

The chronology prefers explicit `published` and `updated` frontmatter. When neither is present, an ISO-like date in a canonical path or title can place a document provisionally in the timeline. Inferred dates are labeled. Documents with no trustworthy date remain in the undated queue rather than receiving fabricated chronology.

## Rendering policy

The explorers are progressively enhanced React interfaces backed by server-generated JSON. Canonical Markdown remains renderer-independent, and the core registry remains the source of truth for identity, lifecycle, routes, and relationships.

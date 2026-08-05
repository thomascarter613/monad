# Monad Engineering Log information architecture

**Packet:** SITE-0005  
**Contract:** `information-architecture.mjs`  
**Generated manifest:** `.generated/registry/navigation.json`

## Purpose

The site presents one canonical corpus through complementary reader models. Physical repository paths remain optimized for governance and authorship; public routes are optimized for comprehension and durable citation.

## Public entry points

| Route | Reader model | Purpose |
| --- | --- | --- |
| `/start` | Guided | Audience-specific reading paths |
| `/building-monad` | Chronological | The project as an engineering narrative |
| `/system` | Conceptual | Stable explanations and architecture |
| `/artifacts` | Governed | Decisions, specifications, evidence, and indexes |
| `/project` | Operational | Status, roadmap signals, releases, and build history |

## Canonical route policy

1. Public paths use lowercase kebab case.
2. Canonical paths do not include dates.
3. Canonical paths do not include release versions.
4. A document identifier is its durable identity; its route is its reader-facing location.
5. A route change preserves the previous location as a permanent redirect.
6. Canonical source paths never leak into public URL structure unless intentionally mapped.
7. Collection indexes have stable routes even when their canonical source directory is empty.
8. Derived release snapshots may use versioned hosts or bundles, but never replace the canonical route.

## Content mapping

| Canonical repository root | Public route |
| --- | --- |
| `journal/` | `/building-monad` |
| `architecture/` | `/system/architecture` |
| `adrs/` | `/artifacts/decisions` |
| `specifications/` | `/artifacts/specifications` |
| `engineering/` | `/artifacts/engineering` |
| `research/` | `/artifacts/research` |
| `knowledge/` | `/artifacts/knowledge` |
| `build-log/` | `/project/build-log` |

## Page-tree rules

Generated `meta.json` files establish deterministic ordering:

- Collection index first.
- Series-positioned documents in numeric order.
- Remaining documents by identifier, then title.
- Normative artifacts before engineering evidence.
- Governance indexes after canonical artifact collections.
- Project summaries before execution history.

Fumadocs uses the page tree for sidebar navigation, breadcrumbs, and default previous/next page navigation. The generated tree therefore contains presentation labels and routes only, never large or sensitive registry data.

## Reading paths

Reading paths are non-canonical overlays. They do not duplicate documents or create alternate identities. The four initial paths are:

- Builder
- Architect
- Implementer
- Historian

The web experience is available at `/start`; the machine-readable form is available at `/api/navigation`.

## Generated navigation artifacts

```text
.generated/registry/
├── navigation.json
└── reading-paths.json
```

`navigation.json` records route availability and canonical document counts. `reading-paths.json` contains the same audience paths without the rest of the navigation manifest.

## Exploration routes

- `/artifacts/explore` provides faceted corpus discovery.
- `/artifacts/relationships` combines the durable relationship table with an interactive neighborhood view and supersession chains.
- `/artifacts/series` combines ordered series listings with completion dashboards.
- `/project/timeline` presents dated publication and engineering events while retaining an explicit undated queue.

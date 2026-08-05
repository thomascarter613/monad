# Content governance and document registry

SITE-0004 introduced and SITE-0005 extends the generated publication registry from a discovery index into a governed document model.

## Contract versions

Two versions are tracked independently:

- `schemaVersion` describes the machine-readable JSON shape.
- `contractVersion` identifies the identifier, lifecycle, relationship, alias, and series rules.

The SITE-0004 registry uses schema version `2`. The governance contract is declared in `content.families.mjs`.

## Identifier families

| Family | Pattern | Primary kind |
| --- | --- | --- |
| Building Monad journal | `MJ-0001` | `journal-entry` |
| Architecture decisions | `ADR-0001` | `decision` |
| Architecture records | `ARCH-CORE-0001` | `architecture` |
| Engineering records | `ENG-0001` and similar | `engineering` |
| Research records | `RES-0001` and similar | `research` |
| Knowledge records | `KNOW-0001` and similar | `knowledge` |
| Build-log records | `BLD-0001` and similar | `build-log` |
| Governed artifacts | `MKE-CORE-0001`, `PUB-CORE-0001`, and similar | `specification` or source-specific artifact kind |

An identifier whose family conflicts with its source kind fails validation. Documents with no recognized identifier remain visible under a stable `UNTRACKED-*` identifier, but strict validation rejects the warning.

## Lifecycle

Each document kind has an explicit set of valid statuses and status transitions. During synchronization, the adapter reads the previous generated registry when available and validates changes such as:

```text
proposed -> accepted
accepted -> superseded
published -> archived
```

Invalid regressions, such as `accepted -> proposed`, fail synchronization. Terminal states cannot silently return to active use.

## Relationships

Canonical frontmatter may declare relationships under `related` or through supported top-level keys:

```yaml
related:
  decisions: [ADR-0002]
  specifications: [MKE-CORE-0001]
supersedes: [ADR-0001]
```

The registry validates targets, expected target kinds, self-references, supersession compatibility, and supersession cycles. It records both directions of every validated edge:

```text
ADR-0002 --supersedes--> ADR-0001
ADR-0001 <--supersededBy-- ADR-0002
```

Identifier references discovered in prose become `references` edges when the target exists in the current corpus.

## Series

Series membership and position can be explicit or inferred from identifiers. The adapter validates duplicate positions, gaps, declared totals, and positions that exceed a declared total. Each registry entry receives previous and next document navigation when an ordered series exists.

```yaml
series: MKE-CORE
series_position: 2
series_total: 18
```

## Route aliases

Aliases preserve old public URLs when a slug or canonical route changes:

```yaml
aliases:
  - /artifacts/specifications/knowledge-engine-core
```

The adapter also carries forward a prior registry route automatically when the same identifier moves. Alias collisions fail validation. Valid aliases are emitted to `.generated/registry/redirects.json`, and `next.config.mjs` exposes them as permanent Next.js redirects.

## Registry outputs

```text
.generated/
├── registry/
│   ├── documents.json
│   ├── redirects.json
│   ├── relationships.json
│   ├── series.json
│   ├── navigation.json
│   └── reading-paths.json
├── reports/
│   └── content-report.md
└── migrations/
    ├── frontmatter-plan.json
    └── frontmatter-plan.md
```

The same registry is available through `/api/registry` and `/api/registry/{DOCUMENT-ID}`.

## Diagnostics and migration assistance

```bash
bun run content:report
bun run content:report:issues
bun run content:report:series
bun run content:report:relationships
bun run content:report:navigation
bun run content:migrate
bun run content:migrate:check
```

`content:migrate` is advisory. It generates missing-frontmatter suggestions without modifying canonical files.

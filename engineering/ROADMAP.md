---
artifact:
  id: MONAD-ENGINEERING-ROADMAP
  type: engineering.roadmap
  namespace: monad
metadata:
  title: Monad Engineering Roadmap
  version: 0.2.0
  status: active
  updated: 2026-08-06
---

# Monad Engineering Roadmap

## Roadmap Principle

Monad proceeds from accepted knowledge to executable capability.

```text
Vision
  ↓
Specifications
  ↓
Compiler
  ↓
Semantic Graph
  ↓
Knowledge Engine
  ↓
Projections and Applications
  ↓
Self-Hosting
```

## Completed

### PI-001 — Architecture Freeze

Status: **Completed**

Outcome:

- Vision layer established.
- Architecture reviewed.
- Governance established.
- Compiler and knowledge boundaries stabilized.
- PI-002 authorized.

## Active

### PI-002 — Semantic Compiler Foundation

Status: **Active**

Objectives:

- complete `MSC-CORE-0008`;
- complete `MSC-CORE-0009`;
- complete `MSC-CORE-0010`;
- reconcile the compiler specification;
- declare the implementation threshold;
- create the compiler-bootstrap work packet set.

## Planned

### PI-003 — Compiler Bootstrap

Objectives:

- implement a local-first compiler executable;
- support bootstrap MSL Markdown;
- discover and classify local artifacts;
- parse and normalize supported source;
- collect declarations and symbols;
- resolve local references;
- construct deterministic MSG output;
- emit structured diagnostics;
- establish clean-build conformance tests.

### PI-004 — Persistent Knowledge Bootstrap

Objectives:

- define and implement MKE ingestion;
- persist immutable MSG snapshots;
- preserve lineage and semantic diffs;
- support local queries;
- establish provider-independent storage interfaces.

### PI-005 — Projection Bootstrap

Objectives:

- generate documentation projections;
- generate architecture and reference views;
- publish project status and work-packet reports;
- establish projection provenance.

### PI-006 — Monad Self-Hosting I

Objectives:

- compile Monad's own specifications;
- validate artifact metadata and registries;
- publish selected documentation from compiled knowledge;
- connect work packets, commits, tests, and outcomes.

### PI-007 — Developer Experience

Objectives:

- stabilize CLI workflows;
- add guided TUI configuration;
- add semantic inspection;
- add IDE-facing diagnostics and navigation;
- provide example repositories and conformance fixtures.

## Later Horizons

- governed AI context and reasoning;
- execution-oriented lowering and backends;
- broader language and artifact frontends;
- multi-repository semantic federation;
- advanced ontology;
- formal verification;
- distributed knowledge services;
- governance automation.

## Current Next Step

Generate and accept:

`specifications/MSC/core/MSC-CORE-0008.md`

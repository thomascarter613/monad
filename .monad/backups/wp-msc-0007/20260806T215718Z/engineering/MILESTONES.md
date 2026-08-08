---
artifact:
  id: MONAD-ENGINEERING-MILESTONES
  type: engineering.milestones
  namespace: monad
metadata:
  title: Monad Engineering Milestones
  version: 0.2.0
  status: active
  updated: 2026-08-06
---

# Monad Engineering Milestones

## Milestone Summary

| ID | Title | Status |
|---|---|---|
| M-001 | Architecture Freeze | Completed |
| M-002 | Compiler Specification Complete | Active |
| M-003 | Bootstrap Compiler Operational | Planned |
| M-004 | Persistent Knowledge Operational | Planned |
| M-005 | Projection Bootstrap Operational | Planned |
| M-006 | Initial Self-Hosting | Planned |

## M-001 — Architecture Freeze

Status: **Completed**

Completion date: **2026-08-06**

Completion evidence:

- WP-AF-0001 through WP-AF-0009 completed.
- Nine Vision artifacts created.
- Architecture Freeze consistency review passed.
- No unresolved P0 architectural blocker remains.
- PI-001 closed.

## M-002 — Compiler Specification Complete

Status: **Active**

Completion criteria:

- MSC-CORE-0008 accepted.
- MSC-CORE-0009 accepted.
- MSC-CORE-0010 accepted.
- Compiler-specification cross-document review completed.
- MSG, diagnostics, incrementality, reproducibility, KIR, backend, and self-hosting boundaries are coherent.
- Compiler implementation threshold declared.

## M-003 — Bootstrap Compiler Operational

Status: **Planned**

Completion criteria:

- local CLI compile command exists;
- bootstrap MSL artifacts parse;
- declarations bind;
- local references resolve;
- deterministic MSG export is produced;
- structured diagnostics exist;
- clean end-to-end tests pass.

## M-004 — Persistent Knowledge Operational

Status: **Planned**

Completion criteria:

- MKE ingests MSG;
- immutable graph history is persisted;
- parent/child snapshots are queryable;
- semantic diff exists;
- local provider-independent persistence is demonstrated.

## M-005 — Projection Bootstrap Operational

Status: **Planned**

Completion criteria:

- documentation is generated from semantic knowledge;
- projection identity and provenance are preserved;
- project status and work-packet reports are generated;
- manual source and generated projection boundaries are explicit.

## M-006 — Initial Self-Hosting

Status: **Planned**

Completion criteria:

- Monad compiles selected Monad specifications;
- MKE stores the resulting knowledge;
- documentation is projected from that knowledge;
- changes remain governed by Work Packets, ADRs, specifications, and the Constitution.

<!-- WP-MSC-0007-STATUS:BEGIN -->

## M-002 Reconciliation Gate

WP-MSC-0007 applied static reconciliation, but a required validation gate did not pass. The implementation threshold remains undeclared, M-002 remains active, and WP-MSC-0001 through WP-MSC-0006 remain planned.

<!-- WP-MSC-0007-STATUS:END -->

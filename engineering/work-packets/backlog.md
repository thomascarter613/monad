---
title: "Engineering Work-Packet Backlog"
description: "Ordered register of PI-002 work packets that have not entered accepted implementation."
date: 2026-08-08
status: active
program_increment: PI-002
milestone: M-002
governing_specifications: [MSC-CORE-0008, MSC-CORE-0009, MSC-CORE-0010]
---

# Engineering Work-Packet Backlog

## Backlog policy

This register contains the 20 accepted PI-002 packet definitions without claiming implementation delivery. Planning closure, document validation, or review readiness does not constitute implementation authorization or completion.

## WC-0001 — Semantic Graph Construction

| Order | Packet | Title | State |
| ---: | --- | --- | --- |
| 1 | [`WP-MSC-0001`](WP-MSC-0001.md) | Semantic Graph Model | Planned; not started |
| 2 | [`WP-MSC-0002`](WP-MSC-0002.md) | Semantic Entity Extraction | Planned; not started |
| 3 | [`WP-MSC-0003`](WP-MSC-0003.md) | Semantic Relationship Construction | Planned; not started |
| 4 | [`WP-MSC-0004`](WP-MSC-0004.md) | Semantic Identity Assignment | Planned; not started |
| 5 | [`WP-MSC-0005`](WP-MSC-0005.md) | Semantic Graph Validation | Planned; not started |
| 6 | [`WP-MSC-0006`](WP-MSC-0006.md) | Immutable MSG Snapshot Construction | Planned; not started |

## WC-0002 — Diagnostics, Incrementality, and Reproducibility

| Order | Packet | Title | State |
| ---: | --- | --- | --- |
| 7 | [`WP-MSC-0007`](WP-MSC-0007.md) | Reconcile MSC-CORE Phase, Representation, and Backend Contracts | Review-ready; execution incomplete; implementation prohibited |
| 8 | [`WP-MSC-0008`](WP-MSC-0008.md) | Implement Compilation Manifests | Planned; not started |
| 9 | [`WP-MSC-0009`](WP-MSC-0009.md) | Implement Dependency Observation and Invalidation | Planned; not started |
| 10 | [`WP-MSC-0010`](WP-MSC-0010.md) | Implement Incremental Planning | Planned; not started |
| 11 | [`WP-MSC-0011`](WP-MSC-0011.md) | Implement Verified Compilation Caching | Planned; not started |
| 12 | [`WP-MSC-0012`](WP-MSC-0012.md) | Implement Deterministic Execution and Reproducibility | Planned; not started |
| 13 | [`WP-MSC-0013`](WP-MSC-0013.md) | Build Incremental and Reproducibility Conformance Suite | Planned; not started |

## WC-0003 — KIR, Backends, and Self-Hosting

| Order | Packet | Title | State |
| ---: | --- | --- | --- |
| 14 | [`WP-MSC-0014`](WP-MSC-0014.md) | Implement the Kernel Intermediate Representation | Planned; not started |
| 15 | [`WP-MSC-0015`](WP-MSC-0015.md) | Implement Deterministic MSG-to-KIR Lowering | Planned; not started |
| 16 | [`WP-MSC-0016`](WP-MSC-0016.md) | Implement Target Profiles and the Governed Backend Protocol | Planned; not started |
| 17 | [`WP-MSC-0017`](WP-MSC-0017.md) | Implement Backend Planning, Invalidation, and Verified Reuse | Planned; not started |
| 18 | [`WP-MSC-0018`](WP-MSC-0018.md) | Implement Artifact Validation and Atomic Publication | Planned; not started |
| 19 | [`WP-MSC-0019`](WP-MSC-0019.md) | Implement Bootstrap and Bounded Self-Hosting Evidence | Planned; not started |
| 20 | [`WP-MSC-0020`](WP-MSC-0020.md) | Build KIR, Backend, Artifact, and Self-Hosting Conformance Suite | Planned; not started |

Packet-local dependency declarations remain authoritative. At the program level, implementation progresses from canonical MSG construction through manifests, dependency/invalidation, incremental planning, verified caching and reproducibility, then KIR/lowering, governed backends, publication, self-hosting evidence, and end-to-end conformance.

## Promotion gates

No implementation packet may be promoted until the PI-002 consistency and acceptance gates permit it. After threshold declaration, packets remain dependency-gated according to their own `depends_on` metadata; packets must not move directly from backlog to completed.

Each completed implementation packet must provide:

- reviewed production changes;
- passing unit, integration, and applicable conformance tests;
- completed acceptance criteria;
- traceability to its governing MSC requirements;
- negative, partial-state, and boundary evidence appropriate to its scope; and
- a recorded packet-specific acceptance disposition.

## Backlog maintenance

Update this register when a packet is added, split, superseded, reprioritized, authorized, blocked, or accepted. Preserve packet identities and link governing decisions; never infer delivery from planning status.

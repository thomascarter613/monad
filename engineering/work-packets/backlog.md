---
title: "Engineering Work-Packet Backlog"
description: "Ordered register of planned implementation work that has not yet started."
date: 2026-08-06
status: active
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0008
---

# Engineering Work-Packet Backlog

## Backlog policy

This register contains planned implementation work with accepted decomposition but without accepted implementation evidence. A planning-complete work cycle does not complete its implementation packets.

WP-MSC-0001 through WP-MSC-0006 are ordered producer-consumer work. Their sequence is normative unless a later reviewed decision changes it:

```text
WP-MSC-0001 → WP-MSC-0002 → WP-MSC-0003
            → WP-MSC-0004 → WP-MSC-0005 → WP-MSC-0006
```

## PI-002 semantic-graph implementation backlog

| Order | Packet | Title | Depends on | State | Primary acceptance focus |
| ---: | --- | --- | --- | --- | --- |
| 1 | [`WP-MSC-0001`](WP-MSC-0001.md) | Semantic Graph Model | MSC-CORE-0008 | Planned; not started | Canonical value model, metadata, builders, interfaces, and immutability boundary |
| 2 | [`WP-MSC-0002`](WP-MSC-0002.md) | Implement Semantic Entity Extraction | WP-MSC-0001 | Planned; not started | Graph-eligible entities with typed, governed, incomplete, and source-derived state |
| 3 | [`WP-MSC-0003`](WP-MSC-0003.md) | Implement Semantic Relationship Construction | WP-MSC-0001–0002 | Planned; not started | Relationships, claims, reification, qualifiers, and preserved conflict/uncertainty state |
| 4 | [`WP-MSC-0004`](WP-MSC-0004.md) | Implement Semantic Identity Assignment | WP-MSC-0001–0003 | Planned; not started | Durable identity, aliases, equivalence, merges, collisions, lineage, and graph-local IDs |
| 5 | [`WP-MSC-0005`](WP-MSC-0005.md) | Implement Semantic Graph Validation | WP-MSC-0001–0004 | Planned; not started | Whole-graph invariants, completeness, diagnostics, and consumer-specific output readiness |
| 6 | [`WP-MSC-0006`](WP-MSC-0006.md) | Implement Immutable MSG Snapshot Construction | WP-MSC-0001–0005 | Planned; not started | Canonicalization, graph identity, fingerprint, immutability, round trips, records, and MKE handoff |

The dependency expressions above summarize the accepted construction order. Packet-local prerequisites remain authoritative when the individual work-packet files are created or updated.

## Evidence required before completion

No packet may move directly from backlog to completed. Each packet must first enter active execution and ultimately provide:

- reviewed production source changes;
- passing unit, integration, and applicable conformance tests;
- completed packet checklist and acceptance criteria;
- traceability to MSC-CORE-0008 requirements;
- evidence for failure, partial-knowledge, and boundary cases in its scope; and
- a recorded packet-specific acceptance disposition.

Across the six packets, the combined evidence must demonstrate:

- semantic identity continuity, aliases, equivalence, merges, and collisions;
- deterministic graph-local identity allocation;
- graph identity distinct from canonical-content fingerprint;
- preservation of unresolved, ambiguous, external, invalid, unsupported, uncertain, and conflicting states;
- output-specific completeness and readiness;
- deterministic construction and stable canonical serialization;
- deep immutability and canonical JSON round-trip equivalence;
- parent lineage, construction, reproducibility, output-availability, and MKE-handoff records; and
- an MSG/MKE boundary that does not transfer persistence ownership to the compiler.

## Promotion order and gates

| Packet | Promotion gate |
| --- | --- |
| WP-MSC-0001 | Implementation threshold and model contract authorized |
| WP-MSC-0002 | WP-MSC-0001 interfaces stable enough for extraction work |
| WP-MSC-0003 | Entity representation and extraction outputs available |
| WP-MSC-0004 | Entity and relationship inputs available for identity assignment |
| WP-MSC-0005 | Constructed, identified graph available for whole-graph validation |
| WP-MSC-0006 | Validation outputs available for immutable snapshot finalization |

## Carried-forward constraints

- WP-MSC-0004 owns semantic and graph-local member identity; WP-MSC-0006 owns graph identity finalization and fingerprint calculation.
- WP-MSC-0005 determines completeness and consumer-specific readiness; WP-MSC-0006 records those results in the snapshot.
- WP-MSC-0006 produces an MKE ingestion handoff; it does not implement MKE persistence, indexing, transactions, or queries.
- MSC-CORE-0009 may extend compiler-wide reproducibility policy and must be reconciled before final PI-002 acceptance.
- MSC-CORE-0010 governs KIR, backend, target-support, and self-hosting behavior and must not be pulled into MSG construction.

## Backlog maintenance

Update this file when a packet is added, split, superseded, reprioritized, or promoted into `active.md`. Preserve its historical identity and link any governing decision; do not silently reinterpret the accepted WC-0001 ownership model.

<!-- WP-MSC-0007-STATUS:BEGIN -->

## MSC Bootstrap Activation Gate

WP-MSC-0007 passed static and publication-content validation. The compiler implementation threshold is declared. M-002 is eligible for closure, and WP-MSC-0001 is eligible for activation; WP-MSC-0002 through WP-MSC-0006 remain dependency-gated.

<!-- WP-MSC-0007-STATUS:END -->

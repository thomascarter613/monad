---
title: "WC-0001 — Semantic Graph Construction Review"
description: "Acceptance and consistency review for MSC-CORE-0008 and its six implementation work packets."
date: 2026-08-06
status: accepted
review_outcome: pass
work_cycle: WC-0001
program_increment: PI-002
milestone: M-002
specification:
  - MSC-CORE-0008
work_packets:
  - WP-MSC-0001
  - WP-MSC-0002
  - WP-MSC-0003
  - WP-MSC-0004
  - WP-MSC-0005
  - WP-MSC-0006
journal_entry: journal/011-designing-the-semantic-graph.md
supersedes: []
---

# WC-0001 — Semantic Graph Construction Review

## Review decision

| Field | Decision |
| --- | --- |
| Review outcome | **PASS** |
| Specification disposition | **Accepted for PI-002 planning and implementation decomposition** |
| Work-packet disposition | **Planning complete; implementation not started by this work cycle** |
| Architecture impact | **No Architecture Freeze amendment required** |
| Unresolved P0 blockers | **None** |
| Unresolved P1 blockers | **None identified** |
| Next work cycle | **WC-0002 — Diagnostics, Incrementality, and Reproducibility** |

WC-0001 passes its construction review. MSC-CORE-0008 defines a coherent semantic-graph construction boundary, and WP-MSC-0001 through WP-MSC-0006 provide a complete, ordered, non-duplicative implementation decomposition of that boundary. The reviewed design preserves the accepted architectural spine, keeps MSG separate from compiler syntax, persistence, and target lowering, and treats identity, governance, incomplete knowledge, validation, canonicalization, and immutability as explicit responsibilities.

This decision accepts the **design and decomposition**. It does not claim that the six work packets have been implemented, that a production MSG compiler exists, or that MKE ingestion, KIR lowering, canonical serialization, or self-hosting is operational. Those claims require implementation evidence and conformance results produced by later work.

The eventual PI-002 compiler-specification consistency review remains authoritative over the combined MSC-CORE-0008 through MSC-CORE-0010 contract. Acceptance here permits WC-0001 planning to close and WC-0002 specification work to begin; it does not pre-accept MSC-CORE-0009 or MSC-CORE-0010.

## 1. Review purpose

This review determines whether WC-0001 has transformed the semantic-graph construction problem into a sufficiently precise and internally consistent implementation plan.

The review verifies:

1. consistency between MSC-CORE-0008 and the established MSC and Vision architecture;
2. preservation of the MSG, MKE, and KIR responsibility boundaries;
3. complete allocation of specification responsibilities across six work packets;
4. absence of contradictory or materially duplicated work-packet ownership;
5. coherent treatment of durable identity, graph-local identity, graph identity, and fingerprints;
6. coherent treatment of partial graphs, conflicts, uncertainty, and output readiness;
7. deterministic and immutable snapshot construction;
8. availability of traceable engineering-journal coverage; and
9. readiness to proceed from design into implementation planning without misrepresenting implementation status.

## 2. Review scope

### 2.1 Primary artifact

- [`MSC-CORE-0008 — Semantic Graph Construction`](../../specifications/MSC/core/MSC-CORE-0008.md), series position **MSC-CORE-0008 of 10**

### 2.2 Implementation decomposition

- [`WP-MSC-0001 — Semantic Graph Model`](../work-packets/WP-MSC-0001.md)
- [`WP-MSC-0002 — Implement Semantic Entity Extraction`](../work-packets/WP-MSC-0002.md)
- [`WP-MSC-0003 — Implement Semantic Relationship Construction`](../work-packets/WP-MSC-0003.md)
- [`WP-MSC-0004 — Implement Semantic Identity Assignment`](../work-packets/WP-MSC-0004.md)
- [`WP-MSC-0005 — Implement Semantic Graph Validation`](../work-packets/WP-MSC-0005.md)
- [`WP-MSC-0006 — Implement Immutable MSG Snapshot Construction`](../work-packets/WP-MSC-0006.md)

### 2.3 Architectural references

- [`vision/architecture-map.md`](../../vision/architecture-map.md)
- [`vision/compiler-pipeline.md`](../../vision/compiler-pipeline.md)
- [`vision/knowledge-lifecycle.md`](../../vision/knowledge-lifecycle.md)
- [`vision/constitution.md`](../../vision/constitution.md)
- MSC-CORE-0001 through MSC-CORE-0007

### 2.4 Narrative traceability

- [`Building Monad #011 — Designing the Semantic Graph`](../../journal/011-designing-the-semantic-graph.md)

### 2.5 Out of scope

This review does not:

- verify source code implementing any WP-MSC packet;
- close any implementation checklist;
- benchmark graph construction or serialization;
- validate a concrete MKE persistence adapter;
- validate KIR lowering or a backend contract;
- approve compiler-wide diagnostics, incremental compilation, or reproducibility behavior governed by MSC-CORE-0009;
- approve KIR lowering, backend, or self-hosting behavior governed by MSC-CORE-0010; or
- replace the compiler-specification consistency review required after MSC-CORE-0010.

## 3. Governing architectural baseline

The review uses the following accepted pipeline as its principal boundary test:

```text
MSL
  ↓
MSC
  ↓
MSG
  ↓
MKE
  ↓
Projections, KIR, Backends, Applications, and AI Context
```

MSC analyzes supported source artifacts. MSG is the canonical immutable semantic output of one compilation snapshot. MKE persists, versions, indexes, queries, governs, and evolves knowledge. KIR lowers canonical knowledge toward target-specific representations. Publications and AI context are governed projections or consumers rather than alternate sources of canonical compiler meaning.

The following invariants are review gates:

- MSG is not an AST, symbol table, database schema, or KIR.
- Compiler-only mutable state does not leak into the published MSG contract.
- Persistence concerns do not determine semantic identity or MSG structure.
- Target requirements do not redefine canonical graph meaning.
- AI assistance does not acquire independent acceptance authority.
- Architecture remains frozen by default and changes only through constitutional governance.

MSC-CORE-0008 and its decomposition satisfy these gates. No reviewed responsibility requires an architectural exception or amendment.

## 4. Consistency with MSC-CORE-0001 through MSC-CORE-0007

MSC-CORE-0008 consumes the frozen semantic-analysis boundary established by the preceding MSC specifications and does not reopen parsing, source modeling, name resolution, type analysis, or other upstream semantic decisions. Its construction work begins only after supported knowledge has been analyzed sufficiently to produce graph-eligible semantic entities and relationships.

| Consistency question | Finding | Result |
| --- | --- | --- |
| Does graph construction replace parsing or the AST? | No. Syntax remains an upstream compiler representation. | PASS |
| Does graph construction replace name, type, or semantic analysis? | No. It consumes frozen analyzed input and records its semantic result. | PASS |
| Does the graph introduce a second canonical meaning model? | No. MSG is the canonical output snapshot of the established MSC pipeline. | PASS |
| Can compiler-private state leak into the graph by default? | No. Entity extraction includes graph-eligible knowledge and excludes compiler-only state. | PASS |
| Are upstream diagnostics silently erased? | No. Invalid, unsupported, unresolved, ambiguous, deferred, external, incomplete, and conflicting states remain representable or diagnosable. | PASS |
| Does construction mutate accepted upstream meaning? | No. Construction preserves analyzed meaning; validation and publication qualify usability without reinterpreting source semantics. | PASS |

No contradiction with the established MSC compiler responsibilities is identified. Detailed cross-section numbering remains the responsibility of the final PI-002 compiler-specification review once MSC-CORE-0009 and MSC-CORE-0010 are available together.

## 5. Consistency with the Vision layer

### 5.1 Compiler pipeline

The design supplies the missing canonical boundary between semantic analysis and downstream consumers. It prevents MKE, KIR backends, publishers, search, and AI-context assemblers from depending directly on mutable compiler internals or independently reconstructing semantic meaning.

**Finding:** consistent; no reverse dependency or bypass is introduced.

### 5.2 Knowledge lifecycle

The graph makes provenance, source lineage, authority, lifecycle, applicability, evidence, and uncertainty part of semantic interpretation. Immutable snapshots and parent references permit knowledge to evolve through new states without overwriting the historical subject of a decision.

**Finding:** consistent; lifecycle and governance data remain first-class rather than presentation-only metadata.

### 5.3 Constitution

The design preserves human and institutional acceptance authority. AI may help extract, propose, search, explain, or assemble context, but it cannot convert a proposal into accepted knowledge by construction alone. Authority and provenance remain visible to downstream consumers.

**Finding:** consistent; no independent AI acceptance authority is created.

### 5.4 Architecture Freeze

MSC-CORE-0008 specializes already accepted component responsibilities. It does not add a new architectural layer, collapse established layers, or transfer ownership between them.

**Finding:** no ADR, constitutional amendment, or Architecture Freeze reopening is required.

## 6. Boundary review

| Boundary | MSG owns | MSG does not own | Result |
| --- | --- | --- | --- |
| AST / MSG | Canonical analyzed entities, relationships, claims, governance, and lineage | Grammar shape, tokens, parser recovery state, or mutable compiler navigation | PASS |
| MSG / MKE | Snapshot model, invariants, canonical content, identity, fingerprint, and ingestion handoff | Database schema, transactions, durable indexes, retention, query execution, or storage migration | PASS |
| MSG / KIR | Target-neutral canonical semantic knowledge | Target naming, flattening, implementation types, backend capabilities, or generated artifacts | PASS |
| MSG / publication | Governed semantic source for projections | Audience-specific selection, layout, navigation, prose rendering, or site implementation | PASS |
| MSG / AI context | Governed knowledge carrying authority, provenance, conflict, and uncertainty | Model acceptance authority or unqualified free-form conclusions | PASS |

The six work packets maintain these boundaries. WP-MSC-0006 may produce an MKE ingestion handoff package, but it does not implement MKE persistence. Likewise, output-availability information describes whether a downstream output may proceed; it does not perform KIR lowering or publication.

## 7. Identity and fingerprint review

The design correctly separates four related concepts:

| Concept | Scope | Required behavior |
| --- | --- | --- |
| Semantic identity | Across representations and, when governed, across snapshots | Preserved, imported, or deterministically derived; aliases do not imply equivalence; merges require authorization |
| Graph-local node or edge ID | One materialized graph snapshot | Deterministic and unique within the snapshot; never promoted into durable identity |
| Graph identity | The snapshot as an entity in a lineage | Finalized independently of content comparison and capable of carrying parent references |
| Graph fingerprint | Canonical content | Deterministically computed from the specified canonical representation and usable for equality, cache, and reproducibility checks |

WP-MSC-0004 owns semantic identity assignment, merge authorization, collision detection, identity lineage, and deterministic graph-local IDs. WP-MSC-0006 owns graph identity finalization and fingerprint computation after canonical ordering and encoding. This is a deliberate handoff, not duplicated ownership.

**Finding:** graph identity and fingerprint remain distinct. Durable identity cannot accidentally depend on graph-local allocation or physical storage identifiers.

## 8. Partial knowledge, conflicts, and readiness

The reviewed design does not equate incomplete knowledge with absent knowledge, nor does it equate preservation with validity.

WP-MSC-0002 preserves incomplete semantic entity state. WP-MSC-0003 preserves unresolved, ambiguous, deferred, external, unsupported, invalid, and conflicting relationships. WP-MSC-0005 validates those states and computes completeness and output-specific readiness. WP-MSC-0006 publishes the validated result with an output-availability map.

This sequence yields three coherent outcomes:

1. known valid knowledge remains usable;
2. incomplete or contested knowledge remains inspectable with its provenance and qualifications; and
3. downstream outputs can be blocked or constrained without discarding the graph wholesale.

Conflicts are not silently resolved during extraction or relationship construction. Uncertainty is not reduced to a boolean success flag. Partial graphs cannot masquerade as universally ready because readiness is evaluated per output.

**Finding:** partial-graph and conflict behavior is coherent and implementation ownership is complete.

## 9. Work-packet decomposition review

### 9.1 Dependency order

```text
WP-MSC-0001  Semantic Graph Model
      ↓
WP-MSC-0002  Semantic Entity Extraction
      ↓
WP-MSC-0003  Semantic Relationship Construction
      ↓
WP-MSC-0004  Semantic Identity Assignment
      ↓
WP-MSC-0005  Semantic Graph Validation
      ↓
WP-MSC-0006  Immutable MSG Snapshot Construction
```

The sequence is valid. A shared model precedes producers; entity candidates precede relationships; the complete candidate structure precedes identity finalization; identity-stable candidates precede whole-graph validation; only a validated candidate crosses the immutable publication boundary.

### 9.2 Ownership matrix

| Responsibility | Primary owner | Supporting or consuming packets | Assessment |
| --- | --- | --- | --- |
| Canonical graph value model and interfaces | WP-MSC-0001 | All later packets | Complete |
| Graph-eligible entity selection | WP-MSC-0002 | WP-MSC-0005 validates | Complete |
| Typed entity properties and governance dimensions | WP-MSC-0002 | WP-MSC-0001 models; WP-MSC-0005 validates | Complete |
| Relationship and semantic-claim construction | WP-MSC-0003 | WP-MSC-0005 validates | Complete |
| Edge-versus-reified-relationship decision | WP-MSC-0003 | WP-MSC-0001 models | Complete |
| Preservation of unresolved and conflicting relationships | WP-MSC-0003 | WP-MSC-0005 classifies readiness | Complete |
| Durable semantic identity and lineage | WP-MSC-0004 | Extraction supplies candidates | Complete |
| Alias, equivalence, merge, and collision behavior | WP-MSC-0004 | WP-MSC-0005 validates invariants | Complete |
| Deterministic graph-local IDs | WP-MSC-0004 | WP-MSC-0006 serializes | Complete |
| Whole-graph invariant and profile validation | WP-MSC-0005 | WP-MSC-0001 supplies interfaces | Complete |
| Completeness and output-specific readiness | WP-MSC-0005 | WP-MSC-0006 publishes map | Complete |
| Canonical ordering and typed-value encoding | WP-MSC-0006 | Earlier packets supply validated values | Complete |
| Graph identity, fingerprint, and parent references | WP-MSC-0006 | WP-MSC-0004 supplies semantic identities | Complete |
| Deep immutability and immutable indexes | WP-MSC-0006 | WP-MSC-0001 defines boundary | Complete |
| Canonical JSON and round-trip verification | WP-MSC-0006 | WP-MSC-0001 defines serialization interface | Complete |
| Construction and reproducibility records | WP-MSC-0006 | MSC-CORE-0009 may extend compiler-wide policy | Complete for WC-0001 |
| MKE ingestion handoff | WP-MSC-0006 | MKE consumes downstream | Complete at boundary |

No required MSC-CORE-0008 responsibility lacks an owner. Apparent overlaps are interface relationships:

- WP-MSC-0001 defines types and boundaries; later packets populate or enforce them.
- WP-MSC-0002 and WP-MSC-0003 preserve semantic state; WP-MSC-0005 validates it.
- WP-MSC-0004 assigns member identities; WP-MSC-0006 identifies and fingerprints the completed snapshot.
- WP-MSC-0005 determines readiness; WP-MSC-0006 records it in the immutable result.

These are producer-consumer handoffs, not competing ownership.

## 10. Determinism, canonicalization, and immutability

The construction contract recognizes that immutable but nondeterministic output is insufficient. WP-MSC-0006 brings canonical ordering, typed-value encoding, deterministic canonical JSON, fingerprint computation, serialization round-trip verification, and reproducibility recording together at the publication boundary.

Deterministic graph-local ID allocation is assigned earlier to WP-MSC-0004 because allocation depends on resolved identity. Canonical serialization remains in WP-MSC-0006 because it operates on the complete validated candidate. This allocation is coherent.

Deep immutability covers graph metadata, nodes, edges, properties, typed values, and derived indexes. Mutable builders are permitted only before publication. A changed semantic result becomes a new snapshot with lineage rather than an in-place mutation.

**Finding:** the design provides a testable deterministic snapshot boundary without making incidental construction data part of canonical semantic content.

## 11. Bootstrap profile and conformance readiness

The bootstrap MSG profile may intentionally support a bounded subset, but it may not weaken the core architectural distinctions. Unsupported knowledge must be preserved or diagnosed according to the profile and must influence completeness or readiness where appropriate.

Implementation conformance should include, at minimum:

- simple entities and typed relationships;
- relationship reification;
- explicit, imported, and derived semantic identities;
- aliases, authorized equivalence, unauthorized merge attempts, and collisions;
- deterministic graph-local IDs;
- provenance, source lineage, authority, lifecycle, and applicability;
- evidence and uncertainty;
- unresolved, ambiguous, deferred, external, unsupported, invalid, and conflicting states;
- graph roots and external references;
- profile and extension validation;
- complete and partial graph readiness;
- canonical ordering and typed-value encoding;
- stable fingerprints for equivalent canonical content;
- distinct graph identity and fingerprint behavior;
- deep immutability;
- canonical JSON round-trip equivalence; and
- parent lineage and MKE handoff integrity.

These tests are acceptance obligations for implementation work. Their enumeration in the specification and packets is sufficient for planning readiness; test execution is not claimed by this review.

## 12. Findings register

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| WC1-F-001 | Informational | Graph identity and content fingerprint are separate concepts with separate construction responsibilities. | Accepted invariant |
| WC1-F-002 | Informational | Partial graphs may support selected consumers while remaining unavailable to others. | Enforce through validation and output-readiness tests |
| WC1-F-003 | Informational | An MKE handoff package ends MSG construction but does not confer persistence ownership on MSC. | Preserve in implementation interfaces |
| WC1-F-004 | Informational | Compiler-wide reproducibility policy will be extended by MSC-CORE-0009. | Reconcile during WC-0002 and final PI-002 review |
| WC1-F-005 | Informational | Target support and lowering behavior remain governed by MSC-CORE-0010. | Reconcile during WC-0003 and final PI-002 review |

No blocking defect, architectural contradiction, missing work-packet owner, or duplicated primary responsibility was found.

## 13. Acceptance criteria

| Criterion | Result |
| --- | --- |
| MSC-CORE-0008 is consistent with the accepted upstream MSC boundary | PASS |
| MSC-CORE-0008 is consistent with the Vision layer | PASS |
| Six work packets form a coherent dependency sequence | PASS |
| Specification responsibilities have primary owners | PASS |
| No material primary-ownership duplication exists | PASS |
| MSG/MKE/KIR boundaries remain intact | PASS |
| Semantic identity and graph-local identity remain distinct | PASS |
| Graph identity and fingerprint remain distinct | PASS |
| Partial graphs, conflicts, and uncertainty remain representable and governed | PASS |
| Deterministic immutable snapshot construction is assigned and testable | PASS |
| Bootstrap implementation can proceed without weakening the architecture | PASS |
| Engineering-journal traceability exists | PASS |
| Implementation completion is not falsely claimed | PASS |

## 14. Final disposition

**WC-0001 — Semantic Graph Construction receives a PASS.**

MSC-CORE-0008 is accepted as the PI-002 semantic-graph construction specification, subject to reconciliation in the final compiler-specification consistency review. WP-MSC-0001 through WP-MSC-0006 are accepted as its implementation decomposition. WC-0001 planning deliverables are complete once the Work Cycle index and project-control records are synchronized.

The implementation work packets remain **planned**, not completed. Their checklists must remain open until code, automated tests, conformance evidence, and packet-specific acceptance results exist.

## 15. Required project-control actions

The repository maintainer should now:

1. create or update [`engineering/work-cycles/WC-0001.md`](WC-0001.md) to record the specification, six work packets, journal entry, review, and planning-complete status;
2. update `engineering/PROJECT-STATUS.md`;
3. update `engineering/work-packets/active.md` and `engineering/work-packets/backlog.md` without marking WP-MSC-0001 through WP-MSC-0006 completed;
4. update `engineering/increments/PI-002.md` to record MSC-CORE-0008 acceptance and WC-0002 as next;
5. retain PI-002 and M-002 as active; and
6. begin WC-0002 with `specifications/MSC/core/MSC-CORE-0009.md`.

## 16. Next required artifact

```text
engineering/work-cycles/WC-0001.md
```

After the Work Cycle index is created, synchronize the project-control artifacts before beginning:

```text
WC-0002 — Diagnostics, Incrementality, and Reproducibility
specifications/MSC/core/MSC-CORE-0009.md
MSC-CORE-0009 of 10
```

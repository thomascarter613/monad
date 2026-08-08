---
title: "PI-002 — Cross-Specification Consistency Review"
description: "Final direct consistency review of MSC-CORE-0008 through MSC-CORE-0010 for the Semantic Compiler Foundation increment."
id: PI-002-CROSS-SPECIFICATION-CONSISTENCY-REVIEW
date: 2026-08-08
status: complete
review_type: cross-specification-consistency
program_increment: PI-002
milestone: M-002
specifications: [MSC-CORE-0008, MSC-CORE-0009, MSC-CORE-0010]
work_cycles: [WC-0001, WC-0002, WC-0003]
review_outcome: pass
implementation_status: not-started
implementation_threshold: not-declared-by-this-review
architecture_freeze: intact
supersedes: []
---

# PI-002 — Cross-Specification Consistency Review

## Review disposition

| Field | Result |
| --- | --- |
| Program increment | **PI-002 — Semantic Compiler Foundation** |
| Milestone | **M-002 — Compiler Specification Complete** |
| Specifications reviewed | **MSC-CORE-0008, MSC-CORE-0009, MSC-CORE-0010** |
| Work cycles reviewed | **WC-0001, WC-0002, WC-0003** |
| Review outcome | **PASS** |
| Unresolved P0 contradictions | **None** |
| Unresolved P1 contradictions | **None** |
| Architecture Freeze impact | **No amendment required** |
| Implementation status | **Not started** |
| Implementation threshold | **Not declared by this review** |
| Next gate | **Explicit PI-002 implementation-threshold decision** |

The PI-002 specification set is internally consistent enough to proceed to the explicit compiler implementation-threshold decision. The three specifications define a coherent one-way compiler contract:

```text
analyzed semantic state
  -> validated immutable MSG
  -> validated immutable KIR
  -> isolated backend candidate output
  -> independent artifact validation
  -> atomic publication
  -> bounded reproducibility and self-hosting evidence
```

MSC-CORE-0008 owns canonical semantic construction. MSC-CORE-0009 owns compiler-wide diagnostics, dependency observation, invalidation, safe reuse, caching, deterministic execution, and reproducibility vocabulary. MSC-CORE-0010 adopts those upstream contracts for KIR lowering, backends, artifacts, publication, bootstrap, and self-hosting without transferring semantic authority downstream.

This PASS accepts cross-document architectural consistency. It does not accept an implementation, activate a work packet, complete PI-002 or M-002, prove reproducibility, establish self-hosting, or declare the compiler implementation threshold.

## 1. Review purpose

This review closes the direct-reconciliation obligation carried by WC1, WC2, and WC3. It determines whether MSC-CORE-0008 through MSC-CORE-0010 can govern one implementation program without contradictory ownership, identity, authority, readiness, diagnostic, reuse, publication, or self-hosting rules.

The review answers five questions:

1. Do the specifications describe one phase-ordered compiler rather than three competing systems?
2. Does canonical semantic authority remain upstream in validated MSG?
3. Can incrementality and caching accelerate the pipeline without changing meaning or bypassing validation?
4. Can KIR and backends produce effects without becoming semantic authorities?
5. Are bootstrap and self-hosting claims bounded, falsifiable, governed, and weaker than correctness proof?

## 2. Source set

### 2.1 Normative specifications

- `specifications/MSC/core/MSC-CORE-0008.md` — Semantic Graph Construction
- `specifications/MSC/core/MSC-CORE-0009.md` — Diagnostics, Incrementality, and Reproducibility
- `specifications/MSC/core/MSC-CORE-0010.md` — KIR Lowering, Backend Contracts, and Self-Hosting

### 2.2 Governing cycle records

- `engineering/work-cycles/WC-0001.md`
- `engineering/work-cycles/WC-0002.md`
- `engineering/work-cycles/WC-0003.md`
- the three construction and consistency reviews referenced by those ledgers

### 2.3 Project controls

- `engineering/PROJECT-STATUS.md`
- `engineering/increments/PI-002.md`
- `engineering/work-packets/active.md`
- `engineering/work-packets/backlog.md`

### 2.4 Implementation decomposition

- WP-MSC-0001 through WP-MSC-0006 for MSG construction
- WP-MSC-0007 through WP-MSC-0013 for diagnostics, incrementality, caching, and reproducibility
- WP-MSC-0014 through WP-MSC-0020 for KIR, backends, publication, bootstrap, and conformance

All work-packet references in this review are planning references. No implementation evidence was reviewed or inferred.

## 3. Review method

The source set was compared across:

- terminology and phase ordering;
- responsibility and authority ownership;
- identity and fingerprint domains;
- partiality, readiness, and availability;
- provenance and diagnostic continuity;
- dependency observation, invalidation, caching, and reuse;
- deterministic execution and comparison levels;
- MSG-to-KIR lowering and semantic-loss disposition;
- backend selection, capability, trust, and effects;
- artifact validation, publication, rollback, and user-content protection;
- bootstrap, diverse verification, self-hosting, promotion, and rollback; and
- work-packet ownership and acceptance-gate consistency.

Potential conflicts were classified as:

| Severity | Meaning |
| --- | --- |
| P0 | Contradiction that makes the architecture unsafe or impossible to implement coherently |
| P1 | Contradiction that blocks the implementation threshold until resolved |
| P2 | Non-blocking ambiguity requiring an implementation contract, fixture, or control update |
| P3 | Editorial or traceability cleanup that does not alter normative meaning |

## 4. Cross-specification ownership map

| Concern | Primary owner | Required downstream treatment | Result |
| --- | --- | --- | --- |
| Semantic graph construction | MSC-CORE-0008 | 0009 observes dependencies; 0010 consumes validated eligible MSG | Consistent |
| Canonical semantic authority | MSC-CORE-0008 | KIR, caches, backends, artifacts, and self-hosting evidence remain derived | Consistent |
| MSG identity and semantic fingerprint | MSC-CORE-0008 | 0009 compares them; 0010 references them as lowering inputs | Consistent |
| Compiler-wide diagnostics | MSC-CORE-0009 | 0010 adopts and extends subjects without creating a second system | Consistent |
| Dependency observation and invalidation | MSC-CORE-0009 | 0010 adds KIR/backend/output-affecting dependencies | Consistent |
| Cache and reuse safety | MSC-CORE-0009 | 0010 uses affirmative compatibility and retains validation gates | Consistent |
| Determinism and reproducibility vocabulary | MSC-CORE-0009 | 0010 applies it to lowering, artifacts, and self-hosting comparisons | Consistent |
| KIR model and lowering | MSC-CORE-0010 | Must preserve 0008 meaning and expose every loss disposition | Consistent |
| Target and backend contracts | MSC-CORE-0010 | Must use 0009 diagnostics, manifests, invalidation, and reuse rules | Consistent |
| Candidate validation and publication | MSC-CORE-0010 | Cannot elevate 0008 authority or trust cache/backend success | Consistent |
| Bootstrap and self-hosting | MSC-CORE-0010 | Must use 0009 comparison evidence and retain external governance | Consistent |

No concern has two incompatible primary owners. Cross-specification references are extensions or consumptions of an upstream contract, not silent redefinitions.

## 5. Authority and phase-boundary review

### 5.1 AST, compiler state, and MSG

MSC-CORE-0008 correctly separates canonical semantic knowledge from syntax trees, symbol tables, pass-local handles, traversal state, and caches. MSG is an immutable, independently validatable snapshot rather than a serialization of compiler memory.

MSC-CORE-0009 does not make its compilation manifest, diagnostic set, dependency graph, or cache entry semantic authority. Those objects explain and accelerate compilation; they do not redefine compiled meaning.

**Result: PASS.**

### 5.2 MSG and KIR

MSC-CORE-0008 makes KIR eligibility target-profile-specific and requires all semantics needed for deterministic lowering. MSC-CORE-0010 consumes that rule and makes KIR a validated, immutable, target-oriented operational projection.

KIR cannot become canonical semantic authority, erase MSG provenance, elevate authority, rewrite lifecycle, or hide a conflict used to block lowering. Every applicable construct receives a preservation, deferral, approximation, omission, unsupported, or blocked disposition.

**Result: PASS.**

### 5.3 KIR and backend state

MSC-CORE-0010 keeps backend-internal representations noncanonical and backend-owned. A backend consumes validated KIR, operates under explicit capabilities and least authority, and produces candidate output. It cannot read arbitrary raw source or MSG to invent meaning missing from KIR.

**Result: PASS.**

### 5.4 Candidate output and publication

Successful generation is not semantic validation. Cached or newly rendered output remains an untrusted candidate until independent validation succeeds. Publication is a separate governed transaction with collision checks, preconditions, user-content protection, atomicity, recovery, and rollback.

Publication success cannot elevate source or MSG authority.

**Result: PASS.**

### 5.5 Self-hosting and governance

Self-hosting is defined as a staged equivalence process with explicit bootstrap sources, binaries, tools, environments, dependencies, seeds, comparison levels, divergence evidence, promotion authority, and rollback. A candidate compiler cannot promote itself.

Semantic, KIR, artifact, byte, behavioral, diagnostic, and diverse-compilation comparisons remain distinguishable. Success at one comparison level cannot be reported as proof at another.

**Result: PASS.**

## 6. Identity and fingerprint review

The specifications preserve the following distinct domains:

| Domain | Governing meaning |
| --- | --- |
| Semantic identity | Durable identity of a semantic subject |
| Representation identity | Identity of one representation of that subject |
| Source identity | Identity of source material or an external record |
| Graph snapshot identity | Identity of one immutable MSG snapshot |
| MSG semantic fingerprint | Canonical semantic-content comparison value |
| Diagnostic rule identity | Stable identity of a diagnostic rule |
| Diagnostic occurrence identity | Stable identity of one finding occurrence |
| Diagnostic-set identity | Identity of a normalized set of findings |
| Compilation/run identity | Identity of one execution or request |
| Manifest identity | Identity of normalized inputs and declared environment |
| Cache key | Domain-separated compatibility lookup key |
| KIR identity | Identity of derived target-specific operational content |
| KIR fingerprint | Canonical KIR comparison value |
| Target identity | Identity of the intended output domain |
| Backend identity | Identity of the implementation producing candidates |
| Artifact identity | Canonical logical identity of generated output |
| Artifact-set/publication identity | Identity of a governed candidate or accepted set |
| Bootstrap/candidate compiler identity | Identity of a compiler stage under comparison |

No specification requires equality across distinct identity domains. References across domains are lineage relationships, not identity collapse.

**Result: PASS.**

## 7. Partiality, readiness, and availability review

MSC-CORE-0008 permits partial MSG while preserving unknown, deferred, ambiguous, invalid, redacted, and contested states. It separately defines authoritative, publication, AI-context, and target-specific KIR eligibility.

MSC-CORE-0009 requires phase results to carry completeness and availability, and it permits recomputation or explicit unavailability when reuse safety is unknown. It does not turn an incomplete result into a valid one merely because it is cached.

MSC-CORE-0010 evaluates KIR eligibility per target and records missing guarantees, prohibited backends, blocked scope, and lowering loss. Publication eligibility does not imply KIR eligibility, and partial KIR cannot silently satisfy a stronger backend contract.

**Result: PASS.**

## 8. Diagnostics and provenance review

MSC-CORE-0009 provides the common renderer-neutral diagnostic envelope, stable rule and occurrence identities, ordering, evidence, suppression, remediation, and rendering boundary.

MSC-CORE-0010 explicitly adopts that contract for KIR, backend, artifact, publication, bootstrap, equivalence, trust, and promotion subjects. It does not create an incompatible target-only diagnostic system.

Provenance remains continuous across:

```text
source region
  -> analyzed semantic result
  -> MSG element or claim
  -> KIR module, unit, or instruction
  -> backend plan and operation
  -> candidate artifact region
  -> validation and publication evidence
  -> bootstrap or self-hosting comparison record
```

Many-to-many mappings are permitted; downstream convenience cannot erase earlier lineage.

**Result: PASS.**

## 9. Incrementality, caching, and reproducibility review

The combined correctness rule is coherent:

```text
clean result
  ~= incremental result
  ~= cached result
  ~= permitted reordered or parallel result
```

The comparison operator is declared per output domain. MSG semantic equivalence and equal semantic fingerprints apply where MSC-CORE-0008 requires them. KIR, diagnostic, artifact, byte, and behavioral comparisons use their own declared levels.

Clean compilation remains the correctness oracle. Reuse requires affirmative compatibility evidence. Unknown or unobservable dependencies force recomputation or explicit unavailability. Cache content is untrusted memoization, and cache hits cannot bypass MSG validation, KIR validation, candidate validation, publication policy, security-domain separation, or provenance requirements.

MSC-CORE-0010 correctly extends cache keys and invalidation to KIR fingerprint, target, backend, capabilities, options, tools, environment, destination semantics, formatters, package managers, security domain, and other output-affecting inputs.

**Result: PASS.**

## 10. Work-packet and dependency review

The 20-packet planning graph is complete at the PI boundary:

```text
WP-MSC-0001–0006
  MSG model, construction, validation, identity, provenance, canonicalization
            |
            v
WP-MSC-0007–0013
  diagnostics, manifests, dependencies, planning, cache, reproducibility, conformance
            |
            v
WP-MSC-0014–0020
  KIR, lowering, backends, reuse, publication, self-hosting, conformance
```

Cross-cycle dependencies are directional and acyclic. Later packets consume accepted upstream contracts. No downstream packet owns permission to revise semantic meaning, relax upstream validation, or declare its own authority.

WP-MSC-0007 is retained as a planning-only reconciliation packet and is not an implementation entry point. Implementation sequencing and activation remain subject to the separate threshold decision.

**Result: PASS.**

## 11. Findings

### PI2-CS-F-001 — One-way authority flow is consistent

- Severity: informational
- Status: accepted
- Finding: Canonical semantic authority remains in validated MSG. KIR, caches, backend state, generated artifacts, publication results, and self-hosting evidence remain derived.
- Required treatment: preserve through typed boundaries, code ownership, conformance fixtures, and review gates.

### PI2-CS-F-002 — Shared diagnostic and reproducibility contracts are coherent

- Severity: informational
- Status: accepted
- Finding: MSC-CORE-0010 adopts and extends MSC-CORE-0009 rather than defining a parallel system.
- Required treatment: use one diagnostic envelope and one comparison vocabulary across implementation packets.

### PI2-CS-F-003 — Reuse cannot bypass validation

- Severity: informational
- Status: accepted
- Finding: Reused MSG, KIR, backend plans, candidate artifacts, and comparison results remain subject to their owning validation and policy gates.
- Required treatment: implement negative, corruption, stale-input, cross-tenant, and policy-change tests.

### PI2-CS-F-004 — Loss and availability must remain explicit

- Severity: P2
- Status: governed; non-blocking
- Finding: The specifications are consistent, but implementation must use a shared machine-checkable vocabulary for preserved, deferred, approximated, omitted, unsupported, blocked, unavailable, and invalid states.
- Required treatment: finalize the vocabulary and cross-representation mapping in WP-MSC-0014 and WP-MSC-0015; falsify it in WP-MSC-0020.

### PI2-CS-F-005 — Comparison levels require shared fixtures

- Severity: P2
- Status: governed; non-blocking
- Finding: Semantic, diagnostic, KIR, artifact, byte, behavioral, and diverse-compilation equivalence are correctly distinct but require common fixtures to prevent overclaiming.
- Required treatment: define comparison records and cross-mode fixtures in WP-MSC-0012, WP-MSC-0019, and WP-MSC-0020.

### PI2-CS-F-006 — Implementation choices remain deliberately open

- Severity: P2
- Status: governed; non-blocking
- Finding: Stage 0 language, concrete data structures, concurrency runtime, cache library, CLI framework, formatter, package-manager, filesystem strategy, first backend, and first generated self-hosting artifact are not selected by these specifications.
- Required treatment: decide them in implementation packets or accepted ADRs before the affected code is committed; do not reinterpret an open choice as a specification contradiction.

### PI2-CS-F-007 — Specification lifecycle metadata requires acceptance synchronization

- Severity: P3
- Status: open editorial control
- Finding: The normative files retain `metadata.status: draft` while cycle and PI controls record acceptance for PI-002 planning. These meanings can coexist, but the final PI acceptance/threshold records must state whether the source specifications remain draft, become accepted, or receive a new lifecycle value.
- Required treatment: synchronize specification lifecycle metadata and acceptance checklists during the PI-002 acceptance gate; do not silently change normative status.

### PI2-CS-F-008 — Planning acceptance is not implementation authorization

- Severity: gate control
- Status: open until next decision
- Finding: This PASS removes the cross-specification contradiction gate but does not declare the implementation threshold.
- Required treatment: create an explicit threshold decision that names the authorized bootstrap slice, initial packet sequence, prerequisites, evidence, stop conditions, and control-file updates.

## 12. Conflict register

| Class | Count | Disposition |
| --- | ---: | --- |
| P0 contradictions | 0 | None identified |
| P1 contradictions | 0 | None identified |
| P2 governed ambiguities | 3 | Assigned to work packets or ADR decisions; non-blocking for specification consistency |
| P3 editorial controls | 1 | Carry to PI acceptance synchronization |
| Gate controls | 1 | Explicit implementation-threshold decision required next |

No amendment to the Architecture Freeze is required by this review.

## 13. Review checklist

- [x] Phase order is explicit and one-way.
- [x] MSG remains canonical semantic authority.
- [x] AST, compiler-private state, MSG, MKE, KIR, backend state, cache state, artifacts, and evidence remain distinct.
- [x] Identity and fingerprint domains remain separated.
- [x] Partiality, readiness, loss, and availability are preserved explicitly.
- [x] Diagnostics use one compiler-wide contract.
- [x] Provenance crosses every representation boundary.
- [x] Clean compilation remains the correctness oracle.
- [x] Dependency observation and invalidation fail safe.
- [x] Reuse requires affirmative compatibility evidence.
- [x] Cache state remains untrusted and non-authoritative.
- [x] MSG-to-KIR lowering is target-specific and deterministic by contract.
- [x] KIR cannot elevate authority or rewrite semantic meaning.
- [x] Backend effects are explicit and least-authority.
- [x] Backend success creates a candidate, not an accepted artifact.
- [x] Candidate validation and publication are separate gates.
- [x] Publication is governed, atomic, recoverable, and user-content-safe.
- [x] Self-hosting comparison levels are bounded and distinct.
- [x] Candidate compilers cannot self-promote.
- [x] Work-packet ownership is complete and directionally coherent.
- [x] No unresolved P0 or P1 contradiction remains.
- [ ] Compiler implementation threshold explicitly declared.
- [ ] PI-002 acceptance review completed.
- [ ] M-002 closure decision recorded.

## 14. Decision

**Decision: PASS.**

MSC-CORE-0008 through MSC-CORE-0010 form a coherent specification set for PI-002. Their phase ownership, authority model, identity domains, readiness semantics, diagnostic and provenance flow, incremental correctness rules, lowering contract, backend boundaries, publication gates, and self-hosting constraints can govern one implementation program without a blocking contradiction.

This decision closes WC1-F and WC2-F direct-source concerns and satisfies WC3-F-008. It preserves WC3-F-009: planning acceptance remains distinct from implementation authorization.

## 15. Required follow-up

The next artifact must make the compiler implementation-threshold decision explicit. It must define at least:

1. whether the threshold is declared or deferred;
2. the minimum authorized bootstrap scope;
3. the first implementation work packet or bounded packet set;
4. prerequisite ADRs or packet-local decisions;
5. required tests, conformance evidence, and clean-oracle comparisons;
6. security, authority, and effect limits;
7. stop, rollback, and architecture-deviation conditions;
8. specification lifecycle treatment for PI2-CS-F-007; and
9. the exact project-control changes permitted by the decision.

Until that decision is accepted:

- PI-002 remains active;
- M-002 remains active;
- WP-MSC-0001 through WP-MSC-0020 remain unstarted;
- no implementation packet is active;
- no self-hosting claim exists; and
- no compiler implementation threshold has been declared.

## 16. Next required artifact

```text
engineering/reviews/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD-DECISION.md
```

After that decision, synchronize the four project-control records and conduct the PI-002 acceptance/closure review before generating the GitHub issue hierarchy.

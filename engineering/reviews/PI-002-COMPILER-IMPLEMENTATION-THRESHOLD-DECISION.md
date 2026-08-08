---
title: "PI-002 — Compiler Implementation Threshold Decision"
description: "Decision declaring the bounded threshold from the accepted Semantic Compiler Foundation specifications into implementation."
id: PI-002-COMPILER-IMPLEMENTATION-THRESHOLD-DECISION
date: 2026-08-08
status: accepted
decision_type: implementation-threshold
program_increment: PI-002
milestone: M-002
governing_specifications: [MSC-CORE-0008, MSC-CORE-0009, MSC-CORE-0010]
decision: declared-bounded
authorized_bootstrap_packet: WP-MSC-0001
implementation_status: not-started
architecture_freeze: intact
supersedes: []
---

# PI-002 — Compiler Implementation Threshold Decision

## Decision disposition

| Field | Decision |
| --- | --- |
| Threshold | **DECLARED — BOUNDED** |
| Authorized bootstrap scope | **WP-MSC-0001 — Semantic Graph Model** |
| Activation time | **After PI-002 acceptance and project-control synchronization** |
| Currently active implementation packets | **None** |
| Automatically authorized later packets | **None** |
| Architecture Freeze | **Intact; no amendment required** |
| PI-002 status | **Active pending acceptance review** |
| M-002 status | **Active pending acceptance review** |
| Next gate | **PI-002 acceptance and milestone-closure review** |

The compiler implementation threshold is declared. This declaration is permission to begin one bounded bootstrap slice after the remaining PI-002 governance gates close. It is not evidence that implementation has begun, that any packet has passed, or that Monad is self-hosting.

Only `WP-MSC-0001` may become the first active implementation packet under this decision. WP-MSC-0002 through WP-MSC-0020 remain planned and inactive until their dependencies, entry criteria, and packet-specific activation decisions are satisfied.

## 1. Basis

The declaration rests on the following accepted planning evidence:

- WC-0001, WC-0002, and WC-0003 completed planning with PASS reviews;
- MSC-CORE-0008 through MSC-CORE-0010 form a coherent one-way compiler contract;
- the PI-002 cross-specification review found no unresolved P0 or P1 contradiction;
- the 20-packet dependency graph is explicit and acyclic;
- canonical semantic authority remains in validated immutable MSG;
- clean compilation remains the correctness oracle;
- cache, backend, artifact, and self-hosting evidence remain derived and non-authoritative; and
- Architecture Freeze remains intact.

The consistency PASS removed the specification contradiction gate. This decision separately determines how implementation may start.

## 2. Threshold rule

The implementation threshold means:

> Accepted specifications may now govern a bounded implementation program, beginning with the smallest independently reviewable semantic-model slice and expanding only through evidence-backed packet activation.

The threshold does not mean:

- all 20 packets are active;
- PI-002 implementation is complete or in progress;
- an implementation language, library, or storage representation is normative merely because it is convenient;
- downstream KIR, backend, publication, or self-hosting work may bypass MSG contracts;
- generated output is accepted without independent validation; or
- a compiler may promote itself.

## 3. Authorized bootstrap slice

### 3.1 Packet

The sole bootstrap packet is:

```text
WP-MSC-0001 — Semantic Graph Model
```

Its purpose is to establish the minimum typed model needed to represent the immutable Monad Semantic Graph contract without implementing extraction, relationship construction, identity assignment, full validation, snapshot publication, KIR lowering, backends, caching, or self-hosting.

### 3.2 In scope

- semantic graph root and versioned schema boundary;
- typed semantic entity and relationship envelopes required by MSC-CORE-0008;
- explicit authority, lifecycle, applicability, evidence, uncertainty, and provenance fields;
- explicit incomplete, unknown, deferred, ambiguous, invalid, redacted, contested, and unsupported states;
- separation of semantic identity, representation identity, graph identity, and fingerprints;
- deterministic field and collection semantics at the model boundary;
- construction-time rejection of structurally impossible states where the specification requires it;
- fixtures and tests proving the model can represent required states without silent loss; and
- API documentation identifying normative versus implementation-private types.

### 3.3 Out of scope

- source parsing or semantic extraction;
- graph relationship discovery;
- final identity algorithms;
- full graph validation or publication eligibility;
- canonical serialization or fingerprint algorithms beyond interfaces needed to preserve domain separation;
- incremental planning, caching, backends, generated artifacts, publication, bootstrap compilation, or self-hosting;
- MKE persistence or query ownership; and
- any Architecture Freeze amendment.

## 4. Preconditions for activation

`WP-MSC-0001` may move from **Planned** to **Active** only after all of these conditions are recorded:

1. This decision is accepted and committed.
2. The PI-002 acceptance and M-002 closure review passes.
3. The four project-control records are synchronized.
4. MSC-CORE-0008 through MSC-CORE-0010 lifecycle metadata is synchronized as an accepted implementation baseline without erasing their history.
5. The owning repository and code location are named.
6. The implementation language and minimum supported toolchain are confirmed by an existing accepted ADR or a new bounded ADR.
7. The packet issue links its governing specification, dependencies, acceptance criteria, and required evidence.
8. A clean test command and baseline result are recorded before implementation changes.

If any precondition is absent, the packet remains planned.

## 5. Required implementation decisions

The following decisions are deliberately not made by the specifications. They must be resolved before affected code is merged:

| Decision | Required treatment |
| --- | --- |
| Owning repository and module boundary | Record in the packet and GitHub issue |
| Stage 0 implementation language | Confirm by ADR before substantive code |
| Minimum toolchain version | Pin in repository controls and CI |
| Concrete immutable collection strategy | Justify in packet notes or ADR if architecture-significant |
| Serialization library | Defer until its owning packet unless WP-MSC-0001 needs a narrow test fixture |
| Error representation | Align with the shared diagnostic envelope; do not create a competing system |
| Concurrency model | Defer unless required by the model; no concurrency semantics are authorized here |

An implementation choice becomes normative only through its proper specification or ADR process.

## 6. Acceptance evidence for WP-MSC-0001

The packet cannot pass on code presence alone. Required evidence includes:

- a reviewed pull request linked to the packet issue;
- automated unit tests for every required semantic-state family;
- negative tests for structurally forbidden states;
- fixtures covering partial, conflicting, uncertain, and externally sourced knowledge;
- tests demonstrating distinct identity and fingerprint domains;
- deterministic ordering or normalization tests wherever collection order is observable;
- round-trip or construction tests showing that authority, provenance, lifecycle, applicability, evidence, and uncertainty are not silently discarded;
- public/API documentation for normative model boundaries;
- clean test, lint, formatting, and static-analysis results;
- a packet acceptance record mapping every criterion to evidence; and
- a deviation record for any specification ambiguity or proposed architecture change.

No self-hosting, cache correctness, backend correctness, or publication claim may be inferred from this evidence.

## 7. Correctness and conformance controls

The bootstrap implementation must preserve these controls:

1. **Authority:** only accepted upstream semantic inputs may become authoritative MSG claims.
2. **Identity:** distinct identity domains must not share an interchangeable primitive without type or domain separation.
3. **Partiality:** incomplete or disputed knowledge must remain representable.
4. **Provenance:** required lineage must survive every model transformation exercised by the packet.
5. **Determinism:** observable normalized model output must not depend on map iteration, allocation address, wall-clock time, random seed, locale, or scheduling unless explicitly declared as input.
6. **Validation:** reused or constructed state receives no validation bypass.
7. **Isolation:** no backend, filesystem publication, network, or arbitrary process capability belongs in the semantic model.
8. **AI authority:** AI-generated proposals have no independent acceptance authority.

## 8. Security and effect boundary

WP-MSC-0001 is authorized as a pure or effectively pure model slice. It must not require:

- network access at runtime;
- arbitrary subprocess execution;
- writes outside test-owned temporary locations;
- credential, secret, or tenant access;
- artifact publication;
- dynamic code loading; or
- unbounded deserialization of untrusted data.

If implementation reveals a need for any such capability, work stops and the packet returns to review.

## 9. Stop and rollback conditions

Implementation must stop before merge if any of the following occurs:

- a P0 or P1 contradiction appears between code and MSC-CORE-0008 through MSC-CORE-0010;
- the model collapses canonical semantic authority into AST, compiler-private, cache, KIR, backend, or persistence state;
- required partial, uncertain, disputed, or unavailable states cannot be represented without loss;
- identity domains cannot be kept distinct;
- deterministic behavior requires an undeclared environmental input;
- an effect outside the authorized boundary becomes necessary;
- an Architecture Freeze invariant would need to change;
- required tests or evidence cannot be produced; or
- implementation depends on activating a downstream packet prematurely.

Rollback means reverting the packet's activation to **Planned**, preserving the branch and evidence, opening an ADR/specification clarification as appropriate, and leaving later packets inactive. No accepted architecture record is silently rewritten to fit code.

## 10. Later packet activation

This decision does not bulk-authorize the backlog. Subsequent activation follows the dependency graph and these rules:

- WP-MSC-0002 through WP-MSC-0006 require accepted upstream interfaces and packet-specific entry review.
- WP-MSC-0007 remains a planning-only reconciliation record, not an implementation entry point.
- WP-MSC-0008 through WP-MSC-0013 require the applicable MSG and diagnostics foundations.
- WP-MSC-0014 through WP-MSC-0020 require accepted upstream MSG, diagnostic, dependency, reproducibility, and KIR contracts.
- Parallel activation is allowed only when dependencies are satisfied and shared interfaces are stable enough to avoid speculative divergence.

Each active packet must have one owning repository, one linked issue, named acceptance evidence, and an explicit status in the program Project.

## 11. Specification lifecycle decision

To resolve PI2-CS-F-007, MSC-CORE-0008 through MSC-CORE-0010 must be recorded as:

```text
accepted implementation baseline for v0.1
```

This lifecycle value means they are authoritative for bounded implementation and remain subject to constitutional change control. It does not mean every implementation detail is frozen, every future amendment is prohibited, or any code has passed conformance.

The original drafting and review history must remain visible. Lifecycle metadata must be synchronized in one reviewed change; it must not be silently edited as part of an implementation pull request.

## 12. Permitted project-control changes

After this decision, but before the PI-002 acceptance review passes, controls may state:

- implementation threshold: **declared — bounded**;
- authorized bootstrap packet: **WP-MSC-0001**;
- implementation status: **not started**;
- PI-002 and M-002: **active pending acceptance review**; and
- next gate: **PI-002 acceptance and M-002 closure review**.

Only after that review passes and the activation preconditions are met may controls state:

- WP-MSC-0001: **Active**;
- implementation program: **started**; and
- all other packets: **Planned**, unless separately activated.

This decision does not permit any packet to be marked complete, verified, or accepted.

## 13. Decision checklist

- [x] Cross-specification review passed.
- [x] No unresolved P0 or P1 specification contradiction remains.
- [x] Threshold disposition is explicit.
- [x] Bootstrap scope is bounded.
- [x] First packet is named.
- [x] Preconditions are explicit.
- [x] Required decisions are assigned.
- [x] Tests and evidence are named.
- [x] Authority and effect limits are explicit.
- [x] Stop and rollback conditions are explicit.
- [x] Specification lifecycle treatment is explicit.
- [x] Permitted control changes are explicit.
- [ ] PI-002 acceptance review passed.
- [ ] Project controls synchronized to the accepted decision.
- [ ] WP-MSC-0001 activated.
- [ ] Implementation begun.

## 14. Decision

**DECLARED — BOUNDED.**

Monad has enough accepted and internally coherent compiler specification to cross from architecture planning into a controlled implementation program. The crossing is intentionally narrow: `WP-MSC-0001` is the sole authorized bootstrap packet, and it remains inactive until PI-002 acceptance, lifecycle synchronization, control reconciliation, repository ownership, toolchain confirmation, and baseline evidence are complete.

The declaration preserves the Architecture Freeze, keeps all downstream authority derived, and makes expansion depend on accepted evidence rather than schedule pressure or implementation convenience.

## 15. Immediate consequences

As of this decision:

- the compiler implementation threshold is declared;
- PI-002 and M-002 remain active pending their acceptance/closure review;
- no implementation packet is active;
- no code implementation is claimed;
- WP-MSC-0001 is the only packet eligible for first activation;
- WP-MSC-0002 through WP-MSC-0020 remain planned and inactive; and
- no reproducibility, backend, publication, bootstrap, or self-hosting claim exists.

## 16. Next required artifact

```text
engineering/reviews/PI-002-ACCEPTANCE-AND-M002-CLOSURE-REVIEW.md
```

That review must verify this decision, synchronize specification lifecycle treatment, determine whether PI-002 and M-002 may close as planning/specification achievements, and identify the implementation program's next increment before `WP-MSC-0001` is activated.

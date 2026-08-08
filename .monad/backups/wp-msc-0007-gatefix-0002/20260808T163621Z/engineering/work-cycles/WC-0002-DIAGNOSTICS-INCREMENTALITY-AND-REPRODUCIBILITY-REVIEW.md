---
title: "WC-0002 — Diagnostics, Incrementality, and Reproducibility Review"
id: WC-REVIEW-0002
series: WC-REVIEW
series_position: 2
description: "Acceptance and consistency review for MSC-CORE-0009 and its seven implementation work packets."
date: 2026-08-06
status: accepted
review_outcome: pass
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
specification:
  - MSC-CORE-0009
work_packets:
  - WP-MSC-0007
  - WP-MSC-0008
  - WP-MSC-0009
  - WP-MSC-0010
  - WP-MSC-0011
  - WP-MSC-0012
  - WP-MSC-0013
journal_entry: journal/012-designing-diagnostics-incrementality-and-reproducibility.md
supersedes: []
---

# WC-0002 — Diagnostics, Incrementality, and Reproducibility Review

## Review decision

| Field | Decision |
| --- | --- |
| Review outcome | **PASS** |
| Specification disposition | **Accepted for PI-002 planning and implementation decomposition** |
| Work-packet disposition | **Planning complete; implementation not started by this work cycle** |
| Architecture impact | **No Architecture Freeze amendment required** |
| Unresolved P0 blockers | **None** |
| Unresolved P1 blockers | **None identified** |
| Next work cycle | **WC-0003 — KIR, Backends, and Self-Hosting** |

WC-0002 passes its construction and consistency review. MSC-CORE-0009 defines a coherent compiler-wide contract for structured diagnostics, normalized compilation inputs, dependency-sensitive reuse, verified caching, deterministic execution, and reproducibility evidence. WP-MSC-0007 through WP-MSC-0013 provide a complete, ordered, and non-duplicative implementation decomposition of that contract.

The design has one governing correctness rule: for equivalent semantic inputs, a successful clean, incremental, cached, repeated, relocated, or differently scheduled compilation must have observationally equivalent normalized semantic output, diagnostics, and output availability. Clean compilation remains the oracle. Reuse is permitted only when compatibility is proven; uncertainty, corruption, or incomplete dependency knowledge causes safe recomputation or explicit unavailability.

This decision accepts the **specification and planning decomposition**. It does not claim that structured diagnostics, incremental compilation, cache infrastructure, deterministic scheduling, reproducibility comparison, or the conformance suite exists. Implementation completion requires production code, executable evidence, fault testing, and packet-specific acceptance records.

Acceptance here permits WC-0002 planning to close and MSC-CORE-0010 work to begin. The final PI-002 consistency review remains authoritative over MSC-CORE-0008 through MSC-CORE-0010 together.

## 1. Review purpose

This review determines whether WC-0002 has transformed compiler observability and safe reuse into a precise, testable, and bounded implementation plan.

The review verifies:

1. internal coherence of MSC-CORE-0009;
2. preservation of the MSG, MKE, KIR, and backend boundaries;
3. stable diagnostic identity independent of rendering and execution accidents;
4. complete capture of semantic compilation inputs;
5. conservative dependency observation and transitive invalidation;
6. clean/incremental/cache observational equivalence;
7. cache integrity, compatibility, and non-authority;
8. schedule-independent deterministic results and honest reproducibility claims;
9. complete ownership across WP-MSC-0007 through WP-MSC-0013;
10. falsification-oriented conformance readiness; and
11. accurate separation of planning acceptance from implementation completion.

## 2. Review scope

### 2.1 Primary artifact

- [`MSC-CORE-0009 — Diagnostics, Incrementality, and Reproducibility`](../../specifications/MSC/core/MSC-CORE-0009.md), series position **MSC-CORE-0009 of 10**

### 2.2 Implementation decomposition

- [`WP-MSC-0007 — Implement Structured Diagnostics`](../work-packets/WP-MSC-0007.md)
- [`WP-MSC-0008 — Implement Compilation Manifests`](../work-packets/WP-MSC-0008.md)
- [`WP-MSC-0009 — Implement Dependency Observation and Invalidation`](../work-packets/WP-MSC-0009.md)
- [`WP-MSC-0010 — Implement Incremental Planning`](../work-packets/WP-MSC-0010.md)
- [`WP-MSC-0011 — Implement Verified Compilation Caching`](../work-packets/WP-MSC-0011.md)
- [`WP-MSC-0012 — Implement Deterministic Execution and Reproducibility`](../work-packets/WP-MSC-0012.md)
- [`WP-MSC-0013 — Build Incremental and Reproducibility Conformance Suite`](../work-packets/WP-MSC-0013.md)

### 2.3 Predecessor and control references

- [`WC-0001 — Semantic Graph Construction`](WC-0001.md)
- [`WC-0001 — Semantic Graph Construction Review`](WC-0001-SEMANTIC-GRAPH-CONSTRUCTION-REVIEW.md)
- [`PI-002 — Semantic Compiler Foundation`](../increments/PI-002.md)
- [`Monad Engineering Project Status`](../PROJECT-STATUS.md)

MSC-CORE-0008 is the governing predecessor but is not present in this workspace snapshot. Its accepted boundary is evidenced by WC-0001, its review, PI-002, and MSC-CORE-0009's explicit reconciliation section. The final PI-002 review must still compare the normative source specifications directly.

### 2.4 Narrative traceability

- [`Building Monad #012 — Designing Diagnostics, Incrementality, and Reproducibility`](../../journal/012-designing-diagnostics-incrementality-and-reproducibility.md)

### 2.5 Out of scope

This review does not:

- verify source code or close a packet checklist;
- assert measured performance gains;
- run clean/incremental/cache equivalence tests;
- validate a local or remote cache implementation;
- issue a reproducibility attestation;
- approve KIR lowering, backend behavior, or self-hosting;
- redefine MSG identity, fingerprinting, validation, or canonical serialization; or
- replace the final PI-002 compiler-specification consistency review.

## 3. Governing correctness model

MSC-CORE-0009 treats diagnostics, incrementality, caching, and reproducibility as one trust boundary rather than four optional features.

For normalized manifest `M`, authoritative inputs `I`, and supported operational variations `V`, the review accepts the following required relation:

```text
clean(M, I) ≡ incremental(M, I, prior)
            ≡ cached(M, I, cache)
            ≡ execute(M, I, V)
```

Here, equivalence applies to normalized semantic results, normalized diagnostics, and output availability. It does not require identical elapsed time, logs, cache-hit layout, run identifiers, timestamps, or other declared operational records.

This model yields five mandatory consequences:

1. clean compilation remains available without cache state;
2. reuse requires affirmative compatibility evidence;
3. cache contents are untrusted memoization, not authority;
4. scheduling and machine-local accidents cannot change normalized meaning; and
5. reproducibility claims state the level and evidence actually demonstrated.

**Finding:** the correctness model is explicit, bounded, and falsifiable.

## 4. Architectural consistency

| Boundary | MSC-CORE-0009 owns | MSC-CORE-0009 does not own | Result |
| --- | --- | --- | --- |
| Diagnostics / rendering | Normalized findings, identity, ordering, suppression, evidence, fix preconditions | Terminal, editor, localization, or web presentation | PASS |
| Manifest / source authority | Normalized compilation contract and semantic-input inventory | Replacing authoritative source or governance records | PASS |
| Dependency graph / MSG | Compiler-private execution observations and invalidation evidence | Canonical semantic knowledge or MKE relationships | PASS |
| Reuse / MSG construction | Proof that prior phase results remain compatible | Bypassing MSC-CORE-0008 validation, canonicalization, fingerprinting, or immutability | PASS |
| Cache / MKE | Validated, evictable memoized phase results | Authoritative persistence, lineage, or governance decisions | PASS |
| MSC / KIR and backends | Common diagnostic envelope, normalized ordering, compiler-wide comparison rules | Target-specific rules, target availability, lowering semantics, or backend key extensions | PASS |
| Reproducibility / authority | Evidence records, levels, comparison, and optional attestation boundary | Automatically accepting knowledge, code, diagnostics, or AI conclusions | PASS |

No reviewed requirement adds a new architectural layer, reverses a dependency, or transfers established ownership. No Architecture Freeze amendment is required.

## 5. Diagnostic contract review

The diagnostic model correctly separates concepts that implementations commonly collapse:

| Concept | Required distinction |
| --- | --- |
| Rule identity | Namespaced identity of the violated rule, independent of one occurrence |
| Occurrence identity | Stable identity of a normalized finding subject to declared semantic inputs |
| Severity | Importance of the finding, not an implicit output-blocking decision |
| Blocking scope | Explicit effect on phases, outputs, or consumers |
| Presentation | A pure rendering of normalized findings |
| Diagnostic-set digest | Identity of normalized findings, distinct from manifest, run, graph identity, and MSG fingerprint |

WP-MSC-0007 owns the envelope, catalog, identities, normalization, ordering, deduplication, suppression, and fix-proposal boundary. WP-MSC-0008 makes diagnostic policy and other relevant inputs manifest-visible. WP-MSC-0009 observes changes that invalidate findings. Later packets preserve and compare normalized sets.

Suppressions remain scoped, attributable, and dependency-visible. Fix proposals are bounded edits with precondition digests and do not acquire acceptance authority merely because AI produced them. Deduplication may not erase distinct provenance or conflicts.

**Finding:** diagnostics are treated as stable compiler output, not schedule-dependent log text.

## 6. Manifest and semantic-input review

The compilation manifest is the normalized statement of what compilation means for a run. It includes source inventories and content digests; compiler, language, profile, extension, plugin, policy, schema, and algorithm versions; controlled semantic environment inputs; and explicit declarations of unsupported or uncontrolled inputs.

The design correctly excludes machine-local absolute paths and incidental operational details from portable semantic identities while still recording operational evidence outside canonical result digests when useful. It also keeps manifest identity and digest distinct from run identity, diagnostic-set digest, MSG graph identity, and MSG fingerprint.

WP-MSC-0008 owns normalization and phase-result contracts. Downstream packets consume that contract rather than inventing independent compatibility models.

**Finding:** manifest completeness is a prerequisite for reuse and reproducibility; omitted or uncontrolled semantic inputs prevent stronger claims rather than being silently ignored.

## 7. Dependency observation and invalidation review

Incrementality is accepted only as a dependency proof. A reusable phase result must declare every observable dependency capable of affecting it at its stated granularity. Hidden reads, unknown change classes, incompatible schemas, or unsupported observation force recomputation or non-reuse.

The design covers source, import, external-reference, configuration, policy, profile, extension, plugin, schema, and toolchain dependencies. It requires conservative transitive invalidation through cycles and explicitly covers deletions, renames, policy-only changes, and independent subgraphs.

WP-MSC-0009 owns dependency observations, change classification, dependency-set digests, and invalidation decisions. WP-MSC-0010 consumes those decisions to create an execution plan. This producer-consumer relationship does not duplicate ownership.

**Finding:** false-negative invalidation is prohibited. Unknown information fails safe, and every nontrivial decision is explainable.

## 8. Incremental-planning review

WP-MSC-0010 assigns every planned phase one explicit disposition: reused, recomputed, or unavailable. Planning occurs after manifest and prior-state compatibility validation, carries stable reason codes, respects partial-result availability, and preserves a direct clean path.

The planner may coordinate reuse but cannot weaken semantic gates. A cached or reused pre-MSG phase result must still pass MSC-CORE-0008 validation, canonicalization, fingerprinting, and immutable publication requirements. Cancellation cannot publish incomplete mutable work as reusable completion.

**Finding:** incremental planning is inspectable orchestration, not a competing semantic authority.

## 9. Cache review

The cache contract correctly separates four states:

1. an entry exists;
2. an entry can be decoded safely;
3. an entry is compatible, complete, and intact; and
4. the current trust policy permits reuse.

Only the fourth state permits acceptance. WP-MSC-0011 owns domain-separated keys, immutable entry envelopes, bounded decoding, schema and integrity validation, atomic publication, explicit decisions, storage interfaces, and rejection recovery. Local and remote-equivalent origins obey the same semantic acceptance rules.

Eviction and total cache loss affect performance only. Corrupt, truncated, malicious, oversized, incomplete, incompatible, failed, or cancelled entries must fail closed and lead to recomputation or explicit unavailability. Concurrent equivalent writers cannot make meaning depend on arrival order.

**Finding:** cache state remains untrusted and non-authoritative, with clean recomputation as the recovery path.

## 10. Determinism and reproducibility review

WP-MSC-0012 owns canonical traversal and reduction, deterministic merge rules, control or capture of nondeterministic inputs, reproducibility levels and records, normalized comparison, mismatch categorization, and the optional attestation boundary.

The design requires schedule independence across thread count, interleaving, work stealing, remote-worker choice, and completion order. Filesystem enumeration, workspace relocation, locale, timezone, wall-clock time, randomness, and live network inputs must be normalized, declared, controlled, or reflected as taint/unavailability.

The reproducibility record keeps these concepts separate:

- run identity;
- compilation-manifest digest;
- dependency-set digest;
- diagnostic-set digest;
- MSG graph identity;
- MSG content fingerprint; and
- declared reproducibility level.

Comparison targets normalized observables, not raw logs or operational coincidence. Attestation, if later implemented, states what was compared and does not create semantic or governance authority.

**Finding:** the design supports bounded and honest reproducibility claims without equating semantic equivalence with binary identity.

## 11. Partial results, cancellation, and recovery

MSC-CORE-0009 preserves the partial-knowledge model established by MSC-CORE-0008. A partial MSG may be produced only when the predecessor permits it, with diagnostics explaining incomplete or invalid state and its blocking scope. Reuse cannot upgrade readiness.

Cancellation is cooperative and may retain only independently complete and validated units. The cancelled run itself cannot masquerade as a completed compilation. Corrupt state, interrupted writes, and incompatible schemas recover from authoritative inputs, with trust-affecting actions recorded.

**Finding:** performance mechanisms cannot convert partial, cancelled, or corrupt work into accepted semantic output.

## 12. Work-packet decomposition review

### 12.1 Dependency graph

```text
WP-MSC-0007 Diagnostics ─┐
                        ├─> WP-MSC-0010 Incremental planning
WP-MSC-0008 Manifests ─> WP-MSC-0009 Dependencies ─┘
                                  |
                                  v
                         WP-MSC-0011 Verified caching
                                  |
                                  v
                         WP-MSC-0012 Reproducibility
                                  |
                                  v
                         WP-MSC-0013 Conformance
```

The full packet metadata supplies the exact dependency set: WP-MSC-0010 depends on WP-MSC-0007 through WP-MSC-0009; each later packet cumulatively depends on the preceding foundation. The graph is acyclic. Independent diagnostic and manifest foundations can begin separately, while evidence closure correctly waits for all implementation surfaces.

### 12.2 Ownership matrix

| Responsibility | Primary owner | Consumers or support | Assessment |
| --- | --- | --- | --- |
| Diagnostic envelope, catalog, identities, normalization, and rendering boundary | WP-MSC-0007 | WP-MSC-0010–0013 | Complete |
| Compilation request, manifest, environment classification, and phase-result contract | WP-MSC-0008 | WP-MSC-0009–0013 | Complete |
| Dependency observation, change classification, and invalidation | WP-MSC-0009 | WP-MSC-0010–0013 | Complete |
| Reuse/recompute/unavailable plans, explanations, and clean fallback | WP-MSC-0010 | WP-MSC-0011–0013 | Complete |
| Cache keys, entries, validation, storage boundary, and atomic publication | WP-MSC-0011 | WP-MSC-0012–0013 | Complete |
| Deterministic execution, reproducibility records, comparison, and attestation boundary | WP-MSC-0012 | WP-MSC-0013; MSC-CORE-0010 | Complete |
| Differential, property, mutation, fault, security, and matrix evidence | WP-MSC-0013 | Packet acceptance and PI-002 review | Complete |

No normative implementation area required by MSC-CORE-0009 §21 lacks a primary owner. Apparent overlaps are intentional handoffs: manifests expose inputs, dependency tracking observes them, planning decides work, caching validates stored results, reproducibility compares outcomes, and conformance attempts to falsify the entire chain.

## 13. Conformance readiness

WP-MSC-0013 is appropriately falsification-oriented. Its plan includes:

- clean, incremental, cold-cache, warm-cache, partial-cache, and evicted-cache comparisons;
- serial, parallel, reordered, repeated, and relocated executions;
- no-op, body, interface, addition, deletion, rename, policy, plugin, and unknown changes;
- mutation tests that intentionally omit dependency observations;
- corrupt, truncated, malicious, incompatible, incomplete, and cancelled entries;
- property-generated dependency graphs, edits, and schedules;
- resource boundaries for entry size, nesting, decompression, fan-out, and diagnostic volume; and
- positive equivalence plus negative semantic-change and diagnostic-policy-only comparisons.

The suite cannot accept an implementation by its planned existence. It closes MSC-CORE-0009 evidence only after WP-MSC-0007 through WP-MSC-0012 have accepted implementations and every applicable normative requirement has executable evidence or a reviewed non-test verification method.

**Finding:** the planned evidence can expose stale reuse, nondeterminism, cache unsafety, and dishonest reproducibility claims.

## 14. Bootstrap-profile review

The bootstrap profile may use coarse file- or module-level invalidation and a local content-addressed cache. It may defer remote caching, cross-machine verified reproducibility, signed attestations, and fine-grained semantic-interface reuse.

It may not defer the core invariants: normalized diagnostics, explicit manifests, conservative invalidation, clean fallback, cache verification, deterministic observables, honest capability declarations, and clean/incremental comparison. Unsupported fine-grained behavior must be declared rather than implied.

**Finding:** implementation can begin incrementally without weakening the trust model.

## 15. Cross-specification reconciliation

### 15.1 MSC-CORE-0008 handoff

The reviewed design preserves the predecessor boundary:

- MSG graph identity remains distinct from MSG fingerprint and all run/manifest identities;
- MSC-CORE-0008 retains canonical serialization and fingerprint algorithms;
- those algorithm versions participate in compatibility checks without being redefined here;
- partial MSG diagnostics remain aligned with consumer-specific readiness; and
- reuse never bypasses graph validation, canonicalization, or immutability.

This reconciliation is sufficient for WC-0002 planning acceptance based on the available accepted WC-0001 evidence. Direct normative cross-review remains a final PI-002 obligation.

### 15.2 MSC-CORE-0010 handoff

MSC-CORE-0010 must define:

- KIR and backend diagnostic rules within the common envelope and ordering contract;
- target-specific availability and lowering failures;
- backend-specific cache inputs and compatibility without contaminating canonical MSG semantics;
- self-hosting evidence using the normalized comparison model; and
- the distinction between semantic-result equivalence and compiler-binary identity.

WC-0002 does not pre-accept those downstream decisions.

## 16. Security, governance, and AI review

The design treats cache and diagnostic serialization as untrusted boundaries, imposes resource limits, requires secret redaction, makes plugin read capabilities explicit, and preserves tenant and authority separation for shared caches.

AI may classify findings, explain evidence, or propose fixes. It may not suppress findings, alter authoritative sources, accept diagnostics, or assert reproducibility without governed authority. Neither cache hits nor attestations confer semantic acceptance.

**Finding:** the design preserves the constitutional authority boundary and introduces no independent AI decision right.

## 17. Findings register

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| WC2-F-001 | Informational | Diagnostic rule, occurrence, set, manifest, run, graph, and fingerprint identities are intentionally distinct. | Preserve through typed APIs and domain-separated tests |
| WC2-F-002 | Informational | Clean compilation is the correctness oracle; caches and prior results are optional acceleration state. | Enforce in WP-MSC-0010, WP-MSC-0011, and WP-MSC-0013 |
| WC2-F-003 | Informational | Unknown dependencies and compatibility fail safe rather than permitting speculative reuse. | Enforce with mutation and negative tests |
| WC2-F-004 | Informational | Diagnostic-policy-only changes may change findings without changing MSG semantic content. | Preserve in comparison categories and negative tests |
| WC2-F-005 | Informational | The bootstrap profile may be coarse but must declare limitations honestly. | Record capability declarations and unsupported cases |
| WC2-F-006 | Informational | MSC-CORE-0010 owns target diagnostics, backend keys, and self-hosting proof. | Carry into WC-0003 and final PI-002 review |
| WC2-F-007 | Informational | MSC-CORE-0008 is absent from this workspace snapshot. | Perform direct normative reconciliation when the complete source set is assembled |

No blocking defect, architectural contradiction, cyclic dependency, missing primary owner, or materially duplicated responsibility was found.

## 18. Acceptance criteria

| Criterion | Result |
| --- | --- |
| Diagnostic, incremental, cache, and reproducibility boundaries are internally coherent | PASS |
| Every normative implementation area maps to one primary work packet | PASS |
| Work-packet dependencies are explicit and acyclic | PASS |
| Stable diagnostic identity remains renderer-, path-, locale-, and schedule-independent | PASS |
| Compilation manifests capture or qualify all semantic inputs | PASS |
| Unknown dependency or compatibility state fails safe | PASS |
| Clean compilation remains the correctness oracle | PASS |
| Cache failure, corruption, and eviction cannot change normalized meaning | PASS |
| Deterministic execution and reproducibility claims are bounded and testable | PASS |
| MSG identity and fingerprint ownership remains with MSC-CORE-0008 | PASS |
| KIR, backend, and self-hosting obligations are handed to MSC-CORE-0010 | PASS |
| The planned conformance matrix can falsify stale reuse and nondeterminism | PASS |
| No Architecture Freeze amendment is required | PASS |
| Engineering-journal traceability exists | PASS |
| Implementation completion is not falsely claimed | PASS |

## 19. Final disposition

**WC-0002 — Diagnostics, Incrementality, and Reproducibility receives a PASS.**

MSC-CORE-0009 is accepted as the PI-002 compiler-wide diagnostics, incrementality, caching, determinism, and reproducibility specification, subject to direct cross-specification reconciliation in the final PI-002 consistency review. WP-MSC-0007 through WP-MSC-0013 are accepted as its implementation decomposition.

All seven work packets remain **planned; not started**. Their owners remain unassigned, their completion checklists remain open, and this review supplies no implementation, test, benchmark, security, or reproducibility evidence.

## 20. Required project-control actions

The repository maintainer should now:

1. create or update `engineering/work-cycles/WC-0002.md` with the specification, seven work packets, journal entry, review, findings, and planning-complete status;
2. update `engineering/PROJECT-STATUS.md`;
3. update `engineering/work-packets/active.md` and `engineering/work-packets/backlog.md` without marking WP-MSC-0007 through WP-MSC-0013 completed;
4. update `engineering/increments/PI-002.md` to record MSC-CORE-0009 planning acceptance and WC-0003 as next;
5. retain PI-002 and M-002 as active;
6. carry WC2-F-006 and WC2-F-007 into the final PI-002 consistency review; and
7. begin WC-0003 with `specifications/MSC/core/MSC-CORE-0010.md` only after project-control synchronization.

## 21. Next required artifact

```text
engineering/work-cycles/WC-0002.md
```

After the Work Cycle record and project controls are synchronized, proceed to:

```text
WC-0003 — KIR, Backends, and Self-Hosting
specifications/MSC/core/MSC-CORE-0010.md
MSC-CORE-0010 of 10
```

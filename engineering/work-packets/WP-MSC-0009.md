---
title: "WP-MSC-0009 — Implement Dependency Observation and Invalidation"
description: "Implement normalized dependency observations, change classification, conservative transitive invalidation, and explainable reuse eligibility."
date: 2026-08-06
status: planned
work_packet: WP-MSC-0009
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0009
implementation_status: not-started
depends_on: [WP-MSC-0008]
supersedes: []
---

# WP-MSC-0009 — Implement Dependency Observation and Invalidation

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0008  
> **Planning authority:** MSC-CORE-0009 §§7, 9–10, 18–20

## 1. Objective

Implement complete dependency observation at each declared granularity and an explainable, conservative invalidation engine that never reuses a result when relevant dependency compatibility is unknown.

## 2. Scope

### In scope

- source, import, external-reference, configuration, policy, profile, extension, plugin, schema, and toolchain observations;
- whole-artifact and sound finer-grained interface/semantic-fact observations;
- versioned dependency kinds and normalized observation identities;
- change classification for no-op, body, interface, addition, deletion, rename, policy, plugin, and unknown changes;
- transitive invalidation across cycles and independent subgraphs;
- undeclared-read detection or mandatory non-reusable fallback;
- diagnostic invalidation; and
- machine-readable invalidation reasons and dependency-set digests.

### Out of scope

- scheduling recomputation (WP-MSC-0010);
- cache entry persistence (WP-MSC-0011);
- converting the execution dependency graph into MSG or MKE knowledge; and
- speculative reuse based on unobserved dependencies.

## 3. Deliverables

1. Dependency observation schema, recorder, and phase integration API.
2. Dependency graph and versioned dependency-set digest.
3. Change classifier and conservative invalidation engine.
4. Explainable invalidation-decision model.
5. Cycle, rename/delete, unknown-change, and undeclared-read handling.
6. Unit, property, mutation, and integration fixtures.

## 4. Acceptance criteria

- Every reusable phase result declares all dependencies capable of affecting it at its stated granularity.
- Hidden or unobservable reads force non-reuse.
- Unknown change classes force safe recomputation.
- Relevant invalidation propagates transitively, including through cycles, while provably independent subgraphs may remain reusable.
- Deletions and renames cannot leave stale semantic results or diagnostics.
- Diagnostic-policy-only changes invalidate diagnostic results without falsely implying an MSG semantic change.
- The execution dependency graph remains compiler-private and non-authoritative.
- Every nontrivial invalidation/reuse eligibility result is explainable.

## 5. Required evidence

- complete MSC-CORE-0009 §19.2 scenario matrix;
- generated dependency-graph and edit-sequence properties;
- mutation tests that remove observations and demonstrate stale-reuse detection;
- cycle and fan-out resource-limit tests;
- undeclared-read/non-reusable fallback tests; and
- deterministic dependency-set digest vectors.

## 6. Completion checklist

- [ ] Recorder and invalidation engine reviewed.
- [ ] Declared granularity and bootstrap limitations documented.
- [ ] Property, mutation, negative, and integration tests pass.
- [ ] Explainability output is consumable by WP-MSC-0010.
- [ ] Compiler-private graph boundary is verified.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0009 supplies compatibility and invalidation decisions to the incremental planner and dependency evidence to cache validation and reproducibility records.

## 8. Status boundary

This packet defines intended work only; no dependency engine or invalidation behavior is claimed implemented.


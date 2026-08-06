---
title: "WP-MSC-0013 — Build Incremental and Reproducibility Conformance Suite"
description: "Build adversarial fixtures and the clean, incremental, cache, schedule, repetition, relocation, fault, and security conformance matrix."
date: 2026-08-06
status: planned
work_packet: WP-MSC-0013
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0009
implementation_status: not-started
depends_on: [WP-MSC-0007, WP-MSC-0008, WP-MSC-0009, WP-MSC-0010, WP-MSC-0011, WP-MSC-0012]
supersedes: []
---

# WP-MSC-0013 — Build Incremental and Reproducibility Conformance Suite

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0007–0012  
> **Planning authority:** MSC-CORE-0009 §§18–20, 23

## 1. Objective

Build the falsification-oriented conformance system that proves clean, incremental, cached, parallel, relocated, and repeated compilation preserve the required observable meaning—and reliably detects stale reuse, corruption, nondeterminism, and dishonest reproducibility claims.

## 2. Scope

### In scope

- canonical source, manifest, dependency, diagnostic, cache, partial-result, and MSG comparison fixtures;
- clean/incremental/cache/schedule/repetition/relocation/platform matrix;
- diagnostics, invalidation, cache, and reproducibility conformance suites;
- negative semantic-change and diagnostic-policy-only cases;
- property-generated dependency graphs, edits, and schedules;
- mutation testing for omitted dependency observations;
- cache I/O, corruption, cancellation, plugin, comparison, and concurrency fault injection;
- malicious/oversized/decompression/fan-out/diagnostic-volume boundaries;
- stable evidence reports suitable for packet acceptance; and
- bootstrap capability/unsupported-case verification.

### Out of scope

- substituting tests for packet-specific design/code review;
- defining KIR/backend/self-hosting conformance owned by MSC-CORE-0010; and
- accepting an implementation merely because a happy-path matrix passes.

## 3. Deliverables

1. Versioned conformance fixture corpus and expected normalized results.
2. Matrix runner covering all MSC-CORE-0009 §19 axes.
3. property, mutation, fault-injection, and security test harnesses.
4. clean-oracle differential comparator integration.
5. reproducible evidence/report schema with environment and capability declarations.
6. CI integration and local bootstrap invocation documentation.
7. coverage/traceability ledger for every normative MSC-CORE-0009 requirement.

## 4. Acceptance criteria

- Every applicable MUST/MUST NOT in MSC-CORE-0009 has a primary owner and executable evidence or a reviewed non-test verification method.
- The matrix demonstrates clean/incremental/cache/repetition equivalence across every supported variation.
- Deliberately omitted dependency edges cause detectable failures.
- Corrupt, malicious, incompatible, partial, cancelled, and unknown inputs fail safely and lead to recomputation or explicit unavailability.
- Schedule, path, enumeration, locale, and timezone variation cannot change normalized meaning.
- Genuine semantic changes are detected, while diagnostic-policy-only changes are classified accurately.
- Test evidence is reproducible, attributable, and cannot be confused with implementation completion before all packet reviews pass.

## 5. Required evidence

- published matrix results for cold, warm, partial, and evicted cache states;
- mutation score/evidence for dependency omissions;
- property-test seeds and minimized counterexamples;
- fault and malicious-input reports;
- supported-platform comparison reports;
- full normative traceability ledger; and
- packet-specific acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Fixture corpus and harness reviewed.
- [ ] All required matrix cells pass or are explicitly unsupported by the bootstrap profile.
- [ ] Mutation, property, fault, and security suites pass.
- [ ] Evidence is stable and machine-readable.
- [ ] MSC-CORE-0010 conformance responsibilities remain downstream.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0013 closes MSC-CORE-0009 implementation evidence when—and only when—WP-MSC-0007–0012 have accepted implementations. Its comparison model and fixtures become inputs to MSC-CORE-0010 self-hosting and the final PI-002 consistency review.

## 8. Status boundary

This is a planned conformance packet. No tests have been run and no MSC-CORE-0009 implementation has been accepted.


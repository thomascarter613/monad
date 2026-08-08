---
title: "WP-MSC-0019 — Implement Bootstrap and Bounded Self-Hosting Evidence"
description: "Implement Stage 0/1/2 campaign records, governed comparison levels, clean and diverse evidence, divergence reporting, and explicit trust boundaries."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0019
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0012, WP-MSC-0013, WP-MSC-0014, WP-MSC-0015, WP-MSC-0016, WP-MSC-0017, WP-MSC-0018]
supersedes: []
---

# WP-MSC-0019 — Implement Bootstrap and Bounded Self-Hosting Evidence

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0012–0018  
> **Planning authority:** MSC-CORE-0010 §§16, 19–23

## 1. Objective

Implement a bounded self-hosting evidence program that records Stage 0/1/2 lineage and compares declared semantic, KIR, artifact, byte, behavioral, and diverse surfaces without treating self-reproduction as proof of correctness.

## 2. Scope

### In scope

- bootstrap-profile capability and limitation declaration;
- Stage 0 provenance and trust assumptions;
- Stage 1/2 manifests, graph, KIR, backend, validator, artifact, environment, and cache records;
- comparison profiles and level-specific comparison engine;
- clean comparison independent of reusable cache state;
- first-known-divergence diagnostics;
- conformance-suite association;
- diverse-double-compilation evidence or governed limitation; and
- taint, waiver, exclusion, risk, and approval records.

### Out of scope

- claiming authority from circular reproduction;
- proving external toolchains, hardware, or cryptography correct; and
- release authorization.

## 3. Deliverables

1. Bootstrap campaign and self-hosting record schemas.
2. Stage lineage and provenance recorder.
3. Level-specific comparison profiles and engine.
4. Clean Stage 1/2 campaign runner.
5. First-divergence diagnostic and evidence reports.
6. Diverse-path strategy and trust-boundary documentation.
7. Positive, negative, mismatched-input, and taint tests.

## 4. Acceptance criteria

- Every claim names its stages, governed inputs, environment, cache policy, comparison level, result, exclusions, and approving authority.
- Passing one comparison level cannot be reported as passing another.
- At least one acceptance comparison is clean and cache-independent.
- Mismatched or undeclared inputs prevent an equivalence claim.
- The first known divergence is reproducibly identified and diagnosed.
- Missing diverse evidence is visible as a limitation.
- Self-hosting records retain Stage 0 and environmental trust assumptions.

## 5. Required evidence

- complete Stage 0/1/2 sample campaign record;
- clean comparison results;
- level-separation and false-claim rejection tests;
- first-divergence fixtures;
- mismatched-input/environment tests;
- diverse-evidence report or governed limitation; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Campaign and comparison schemas reviewed.
- [ ] Stage lineage is complete and attributable.
- [ ] Clean comparison is demonstrated.
- [ ] Comparison levels remain distinct.
- [ ] Trust assumptions and limitations are explicit.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0020 incorporates bootstrap campaigns into final adversarial conformance. The resulting evidence informs—but cannot replace—the final PI-002 consistency and implementation-threshold review.

## 8. Status boundary

This packet is planned and unassigned. No compiler has self-hosted and no self-hosting claim is accepted.

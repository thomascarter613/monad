---
title: "WP-MSC-0010 — Implement Incremental Planning"
description: "Implement inspectable incremental plans, reuse/recompute decisions, clean fallback, execution coordination, and decision reporting."
date: 2026-08-06
status: planned
work_packet: WP-MSC-0010
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0009
implementation_status: not-started
depends_on: [WP-MSC-0007, WP-MSC-0008, WP-MSC-0009]
supersedes: []
---

# WP-MSC-0010 — Implement Incremental Planning

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0007–0009  
> **Planning authority:** MSC-CORE-0009 §§7, 10–11, 15, 17–20

## 1. Objective

Implement an inspectable incremental planner that classifies each phase result as reused, recomputed, or unavailable, records the reason, and falls back safely to clean computation whenever reuse cannot be proven correct.

## 2. Scope

### In scope

- prior-state compatibility checks after manifest normalization;
- phase-level reused/recomputed/unavailable decisions;
- dependency-sensitive transitive plan construction;
- explicit reason codes and human/machine-readable explanations;
- partial-result and output-availability planning;
- clean compilation path as the correctness oracle;
- cancellation boundaries and safe plan abandonment;
- clean-versus-incremental normalized result comparison hooks; and
- coarse bootstrap planning with honest capability declarations.

### Out of scope

- cache byte formats and stores (WP-MSC-0011);
- scheduler determinism implementation (WP-MSC-0012);
- diagnostic model ownership (WP-MSC-0007); and
- bypassing MSG validation or canonicalization.

## 3. Deliverables

1. `IncrementalPlan`, phase decision, reason, and availability models.
2. `plan_incremental` implementation over normalized manifests and prior state.
3. incremental execution coordinator interfaces and clean fallback.
4. explain/report output independent from plan semantics.
5. cancellation, failure, and partial-result handling.
6. decision fixtures and clean/incremental equivalence tests.

## 4. Acceptance criteria

- Planning occurs only after manifest and prior-state compatibility validation.
- Every phase has one explicit disposition and all nontrivial decisions have stable reason codes.
- Uncertainty, corrupt state, unknown dependencies, or unsupported compatibility causes recomputation or unavailability, never optimistic reuse.
- Clean compilation remains callable without cache state.
- Incremental success is observationally equivalent to the clean oracle for normalized diagnostics, availability, and semantic outputs.
- Cancellation never publishes reusable partial work.
- A reused pre-MSG result cannot bypass MSC-CORE-0008 validation, canonicalization, or immutability gates.

## 5. Required evidence

- no-op, localized, transitive, deletion, rename, configuration, and unknown-change plans;
- plan reason-code golden fixtures;
- clean/incremental differential tests;
- cancellation and corrupt-prior-state fault tests;
- partial-result availability tests; and
- requirement ownership traceability.

## 6. Completion checklist

- [ ] Planner and decision models reviewed.
- [ ] Clean fallback and cancellation behavior tested.
- [ ] Differential suite passes for supported bootstrap phases.
- [ ] Decision reports are deterministic and inspectable.
- [ ] MSC-CORE-0008 construction gates remain mandatory.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0010 provides explicit phase decisions to cache orchestration and scheduler execution, and decision records to reproducibility evidence and the conformance suite.

## 8. Status boundary

This planning artifact does not establish that incremental compilation exists or is safe.


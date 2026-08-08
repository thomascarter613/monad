---
title: "WP-MSC-0015 — Implement Deterministic MSG-to-KIR Lowering"
description: "Implement governed lowering rules, traceability, semantic-loss accounting, target readiness, partiality, and deterministic lowering decisions."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0015
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0014]
supersedes: []
---

# WP-MSC-0015 — Implement Deterministic MSG-to-KIR Lowering

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0014  
> **Planning authority:** MSC-CORE-0010 §§6, 8, 15–17, 21–23

## 1. Objective

Implement deterministic, explainable lowering from validated immutable MSG snapshots to validated KIR while making preservation, deferral, approximation, omission, unsupported meaning, and target readiness explicit.

## 2. Scope

### In scope

- lowering-contract and rule-set identities;
- rule declaration, deterministic selection, precedence, and ambiguity diagnostics;
- preserved/deferred/approximated/omitted/unsupported dispositions;
- partial, conflicting, uncertain, lifecycle-qualified, provenance-qualified, and authority-qualified knowledge;
- decision records, losses, obligations, normalized diagnostics, and dependency observations;
- bidirectional MSG-to-KIR trace maps;
- target-readiness and partial-result outcomes; and
- deterministic partitioning and schedule independence.

### Out of scope

- changing MSG membership or resolving upstream conflicts;
- backend generation; and
- silently converting target limitations into canonical meaning.

## 3. Deliverables

1. Versioned lowering-rule contract and registry.
2. Deterministic lowering planner and executor.
3. Structured lowering result and decision record.
4. Semantic-loss and obligation ledger.
5. MSG/KIR trace-map implementation.
6. Dependency-observation integration with MSC-CORE-0009.
7. Partiality, ambiguity, mutation, and determinism tests.

## 4. Acceptance criteria

- Every applicable MSG construct receives an explicit lowering disposition.
- Equivalent governed inputs yield equivalent KIR, diagnostics, losses, traces, readiness, and decision records.
- Material conflict, uncertainty, provenance, authority, lifecycle, and security meaning is preserved or visibly dispositioned.
- Ambiguous rules cannot be resolved by registration, filesystem, or scheduling order.
- Omitted dependencies are detected or conservatively force recomputation.
- Lowering never mutates or back-propagates authority into the source MSG snapshot.

## 5. Required evidence

- disposition-complete fixture matrix;
- ambiguity and precedence tests;
- partial/conflicting knowledge results;
- trace completeness review;
- dependency mutation results;
- schedule/permutation comparison results; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Rule contracts and precedence reviewed.
- [ ] All loss dispositions implemented.
- [ ] Trace maps validated.
- [ ] Partiality and uncertainty preserved.
- [ ] Determinism and invalidation tests pass.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0016 consumes validated KIR and target-readiness results. WP-MSC-0017 observes lowering identities and dependencies. WP-MSC-0020 validates semantic preservation adversarially.

## 8. Status boundary

This packet is planned and unassigned. No lowering implementation or evidence is claimed.

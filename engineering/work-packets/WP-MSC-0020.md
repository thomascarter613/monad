---
title: "WP-MSC-0020 — Build KIR, Backend, Artifact, and Self-Hosting Conformance Suite"
description: "Build the adversarial end-to-end suite that falsifies semantic loss, backend leakage, stale reuse, unsafe publication, nondeterminism, and false self-hosting claims."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0020
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0014, WP-MSC-0015, WP-MSC-0016, WP-MSC-0017, WP-MSC-0018, WP-MSC-0019]
supersedes: []
---

# WP-MSC-0020 — Build KIR, Backend, Artifact, and Self-Hosting Conformance Suite

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0014–0019  
> **Planning authority:** MSC-CORE-0010 §§22–26

## 1. Objective

Build the falsification-oriented conformance system that proves the MSG-to-KIR-to-artifact pipeline preserves governed meaning and fails safely under ambiguity, incompatibility, nondeterminism, stale reuse, hostile output, interrupted publication, and misleading self-hosting evidence.

## 2. Scope

### In scope

- canonical MSG/KIR/target/backend/artifact/bootstrap fixtures;
- traversal, schedule, cache, repetition, relocation, locale, timezone, and supported-platform comparisons;
- lowering disposition, ambiguity, partiality, conflict, authority, lifecycle, and trace tests;
- backend compatibility, isolation, mutation, crash, timeout, excessive-output, and cancellation tests;
- cache mutation, corruption, incompatibility, and cross-tenant cases;
- path, collision, secret, validator, atomicity, overwrite, interruption, and recovery attacks;
- Stage 0/1/2, comparison-level, divergence, and false-claim cases; and
- normative traceability and machine-readable evidence reports.

### Out of scope

- substituting test results for design/code/security review;
- closing PI-002 without the direct cross-specification review; and
- accepting self-reproduction as correctness proof.

## 3. Deliverables

1. Versioned conformance fixture corpus.
2. KIR/lowering/backend/artifact/self-hosting matrix runner.
3. Property, mutation, fault-injection, isolation, and security harnesses.
4. Clean-oracle and level-specific comparators.
5. Deterministic machine-readable evidence reports.
6. CI and local bootstrap invocation documentation.
7. Complete MSC-CORE-0010 normative traceability ledger.

## 4. Acceptance criteria

- Every applicable MSC-CORE-0010 MUST/MUST NOT has executable evidence or a reviewed non-test verification method and one primary packet owner.
- Equivalent inputs agree across clean/reused, serial/parallel, relocated, repeated, and permitted-platform executions.
- Deliberate semantic loss, omitted dependency observation, backend leakage, stale cache, unsafe publication, and dishonest comparison-level claims are detected.
- Malformed, malicious, oversized, incompatible, partial, failed, and cancelled inputs fail safely.
- Artifacts remain traceable through KIR to MSG without granting downstream authority.
- Self-hosting evidence exposes assumptions, exclusions, taints, and first divergence.

## 5. Required evidence

- full conformance and reproducibility matrix;
- property and mutation results with minimized counterexamples;
- backend isolation and fault reports;
- artifact security/publication recovery report;
- self-hosting false-claim and divergence results;
- complete normative traceability ledger; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Fixture corpus and harness reviewed.
- [ ] All required matrix cells pass or are explicitly unsupported.
- [ ] Mutation, fault, isolation, and security suites pass.
- [ ] Self-hosting claim boundaries are enforced.
- [ ] Evidence is stable, attributable, and machine-readable.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0020 closes MSC-CORE-0010 implementation evidence only after WP-MSC-0014–0019 have accepted implementations. Its evidence feeds the final direct MSC-CORE-0008–0010 consistency and PI-002 implementation-threshold review.

## 8. Status boundary

This is a planned conformance packet. No tests have run, no implementation is accepted, and neither PI-002 nor M-002 is complete.

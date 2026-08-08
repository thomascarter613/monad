---
title: "WP-MSC-0016 — Implement Target Profiles and the Governed Backend Protocol"
description: "Implement target-profile resolution, deterministic backend discovery and selection, capability negotiation, isolation, invocation, and diagnostics."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0016
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0007, WP-MSC-0008, WP-MSC-0014]
supersedes: []
---

# WP-MSC-0016 — Implement Target Profiles and the Governed Backend Protocol

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0007, WP-MSC-0008, WP-MSC-0014  
> **Planning authority:** MSC-CORE-0010 §§9–10, 17–19, 21–23

## 1. Objective

Implement immutable target profiles and a deterministic, capability-negotiated, least-authority backend protocol that can consume validated KIR without acquiring publication or semantic authority.

## 2. Scope

### In scope

- target-profile schema, identity, digest, registry, and compatibility;
- backend descriptors and protocol versions;
- canonical discovery, explicit selection, and fail-closed negotiation;
- `describe`, `plan`, `generate`, and `validate` protocol boundaries;
- local bootstrap transport and declared limitations;
- staging isolation and governed filesystem, network, environment, subprocess, clock, randomness, and secret capabilities;
- timeout, cancellation, crash, malformed-output, and resource-limit handling; and
- normalized backend diagnostics and trace references.

### Out of scope

- artifact publication authority;
- backend cache implementation; and
- remote execution beyond a later declared profile.

## 3. Deliverables

1. Versioned target-profile and backend-descriptor schemas.
2. Deterministic profile/backend registry and selection engine.
3. Capability compatibility and policy evaluator.
4. Backend invocation adapter and bootstrap isolation boundary.
5. Structured backend outcome and diagnostic integration.
6. Reference backend test double.
7. Compatibility, isolation, failure, and nondeterminism tests.

## 4. Acceptance criteria

- Selection is independent of registration, filesystem, network, and completion order.
- Unknown, contradictory, or incompatible capabilities fail closed for the affected target.
- Backends cannot mutate MSG/KIR or write outside assigned staging.
- Undeclared capabilities are denied and detected.
- Generation success never implies validation or publication authority.
- All target/backend diagnostics conform to MSC-CORE-0009 identity and ordering contracts.

## 5. Required evidence

- discovery/selection permutation tests;
- compatibility matrix;
- sandbox escape and undeclared-capability tests;
- crash, timeout, cancellation, and malformed-output reports;
- diagnostic conformance results; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Profile and descriptor schemas reviewed.
- [ ] Selection and negotiation are deterministic.
- [ ] Bootstrap isolation limitations documented.
- [ ] Failure and cancellation paths verified.
- [ ] Publication authority remains separate.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0017 extends planning, invalidation, and caching for accepted backends. WP-MSC-0018 consumes candidate output only through the governed protocol. WP-MSC-0020 tests the trust boundary.

## 8. Status boundary

This packet is planned and unassigned. No backend, registry, or isolation implementation is claimed.

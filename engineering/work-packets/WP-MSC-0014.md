---
title: "WP-MSC-0014 — Implement the Kernel Intermediate Representation"
description: "Implement the immutable KIR module model, canonical encoding, identity domains, validation, and versioning contracts."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0014
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0001, WP-MSC-0002, WP-MSC-0003, WP-MSC-0004, WP-MSC-0005, WP-MSC-0006, WP-MSC-0007, WP-MSC-0008]
supersedes: []
---

# WP-MSC-0014 — Implement the Kernel Intermediate Representation

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0001–0008  
> **Planning authority:** MSC-CORE-0010 §§6–7, 21–23

## 1. Objective

Implement the immutable, versioned, canonically encoded Kernel Intermediate Representation that receives validated MSG snapshots without becoming a competing source of semantic authority.

## 2. Scope

### In scope

- KIR schema and module envelope;
- typed, domain-separated module and digest identities;
- imports, exports, declarations, effects, capabilities, obligations, trace references, and completeness states;
- canonical ordering, encoding, normalization, and KIR-set digest;
- schema evolution and compatibility checks;
- referential, type, effect, capability, obligation, and trace validation;
- immutable validated KIR-set API; and
- resource and malformed-input boundaries.

### Out of scope

- MSG-to-KIR lowering rules;
- target-specific backend behavior; and
- treating KIR as canonical knowledge.

## 3. Deliverables

1. Versioned KIR schema and module APIs.
2. Canonical encoder/decoder and domain-separated digest implementation.
3. KIR-set construction and immutability boundary.
4. Validation pipeline with structured diagnostics.
5. Compatibility and schema-migration policy implementation.
6. Unit, property, malformed-input, and determinism tests.
7. Normative traceability ledger.

## 4. Acceptance criteria

- Equivalent inputs produce canonically identical KIR bytes and digests across traversal and schedule variation.
- Invalid imports, references, types, effects, capabilities, obligations, traces, or digests are rejected before backend use.
- MSG, KIR, manifest, backend, target, artifact, and digest identity domains cannot be substituted accidentally.
- Unknown versions and fields follow the governed compatibility policy.
- Validation is mandatory for decoded and cached KIR.
- KIR remains an immutable downstream projection of an identified MSG snapshot.

## 5. Required evidence

- canonical byte and digest fixtures;
- permutation/property test results;
- malformed and incompatible KIR rejection results;
- identity-domain type-safety review;
- resource-boundary tests; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] KIR schema and module model reviewed.
- [ ] Canonical encoding and digest rules verified.
- [ ] Validation gates enforced before consumption.
- [ ] Identity separation demonstrated.
- [ ] Determinism and adversarial tests pass.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

The validated KIR model is consumed by WP-MSC-0015 lowering and WP-MSC-0016 backend negotiation. It supplies fixtures and invariants to WP-MSC-0020.

## 8. Status boundary

This packet is planned and unassigned. No KIR implementation or acceptance evidence exists yet.

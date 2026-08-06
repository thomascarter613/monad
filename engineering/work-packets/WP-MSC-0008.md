---
title: "WP-MSC-0008 — Implement Compilation Manifests"
description: "Implement normalized compilation requests, semantic input capture, environment classification, manifests, and phase-result contracts."
date: 2026-08-06
status: planned
work_packet: WP-MSC-0008
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0009
implementation_status: not-started
depends_on: []
supersedes: []
---

# WP-MSC-0008 — Implement Compilation Manifests

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Planning authority:** MSC-CORE-0009 §§6–7, 13–14, 17–20

## 1. Objective

Create the normalized, versioned manifest and phase-result contracts that define the complete semantic input to a compilation and form the trustworthy basis for reuse, comparison, and reproducibility claims.

## 2. Scope

### In scope

- compilation-request normalization;
- logical workspace roots and path normalization;
- ordered source/input inventory and content digests;
- compiler, language, profile, extension, plugin, policy, schema, and algorithm versions;
- controlled environment classification, including semantic versus operational inputs;
- manifest identity and domain-separated manifest digest;
- phase identity, normalized phase inputs/outputs, availability, dependencies, diagnostics, and reusable-state declarations;
- explicit representation of uncontrolled or unsupported inputs; and
- bootstrap-profile manifest support.

### Out of scope

- dependency observation implementation (WP-MSC-0009);
- cache storage or acceptance (WP-MSC-0011);
- MSG graph identity and fingerprint algorithms (MSC-CORE-0008); and
- backend target manifests (MSC-CORE-0010).

## 3. Deliverables

1. `CompilationRequest`, `CompilationManifest`, environment, and input-inventory models.
2. Deterministic normalization service and versioned canonical encoding.
3. Domain-separated manifest identity/digest implementation.
4. Phase-result envelope with completeness, availability, diagnostic, dependency, and reuse metadata.
5. Validation and compatibility APIs.
6. Manifest/phase fixtures and documentation.

## 4. Acceptance criteria

- Equivalent requests normalize identically across workspace relocation, locale, timezone, and filesystem enumeration order within the supported platform contract.
- Every semantic input is captured directly or by a versioned digest; uncontrolled semantic inputs prevent unsupported reproducibility claims.
- Machine-local absolute paths do not enter portable identities.
- Operational-only inputs cannot silently change semantic results.
- Manifest, run, diagnostic-set, graph identity, and graph fingerprint concepts remain distinct.
- A phase result cannot be reusable unless its contract, completeness, observations, compatibility, and output integrity are explicit.
- Unsupported fine-grained capture is declared rather than inferred.

## 5. Required evidence

- golden normalization vectors;
- relocation, ordering, locale, timezone, and environment classification tests;
- digest domain-separation tests;
- schema/version incompatibility tests;
- phase-result completeness and non-reusable fallback tests; and
- requirement-to-code/test traceability.

## 6. Completion checklist

- [ ] Production models and normalizer reviewed.
- [ ] Canonical encoding and algorithm versions documented.
- [ ] Compatibility and invalid-input tests pass.
- [ ] Fixtures are available to WP-MSC-0009–0013.
- [ ] Identity/digest boundaries reconcile with MSC-CORE-0008.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0008 provides the normalized semantic-input contract consumed by dependency tracking, incremental planning, cache keys, reproducibility records, and conformance comparisons.

## 8. Status boundary

This packet is planned only. No manifest or phase-result implementation is claimed.


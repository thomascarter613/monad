---
title: "WP-MSC-0007 — Implement Structured Diagnostics"
description: "Implement the normalized diagnostic model, catalog, stable identity, suppression, fix proposals, and rendering boundary required by MSC-CORE-0009."
date: 2026-08-06
status: planned
work_packet: WP-MSC-0007
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0009
implementation_status: not-started
depends_on: []
supersedes: []
---

# WP-MSC-0007 — Implement Structured Diagnostics

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Planning authority:** MSC-CORE-0009 §§8, 15, 17–20

## 1. Objective

Implement a stable, structured diagnostic subsystem whose normalized findings are independent of presentation, machine-local paths, locale, and execution schedule. Diagnostics must remain correct across clean, incremental, and cached compilation.

## 2. Scope

### In scope

- versioned diagnostic envelope and catalog;
- namespaced rule identity and stable occurrence identity;
- severity distinct from blocking scope;
- normalized subjects, spans, provenance, related locations, and evidence;
- deterministic ordering and semantics-preserving deduplication;
- scoped suppressions, invalidation inputs, and non-suppressible rules;
- bounded fix proposals with precondition digests;
- internal compiler diagnostics and partial-result association;
- renderer-neutral serialization and rendering interfaces; and
- diagnostic-set identity/digest kept distinct from MSG and manifest identities.

### Out of scope

- dependency discovery and invalidation policy (WP-MSC-0009);
- incremental planning (WP-MSC-0010);
- KIR/backend rule ownership (MSC-CORE-0010); and
- terminal, editor, localization, or web presentation design.

## 3. Deliverables

1. Diagnostic value model, catalog API, and schema/version policy.
2. Rule and occurrence identity algorithms with domain separation.
3. Normalization, ordering, deduplication, suppression, and lifecycle services.
4. Fix-proposal validation with stale-precondition rejection.
5. Renderer interface proving presentation does not mutate normalized findings.
6. Unit and property tests plus reusable diagnostic fixtures.
7. API and invariants documentation.

## 4. Acceptance criteria

- Required MSC-CORE-0009 diagnostic fields are represented and validated.
- Rule and occurrence identities are stable across renderer, locale, absolute-path, and permitted scheduling changes.
- Distinct provenance or conflicting findings are not erased by deduplication.
- Severity never implicitly determines blocking scope.
- Suppression is scoped, attributable, dependency-visible, and unable to hide non-suppressible failures.
- Fix proposals identify exact bounded edits and reject stale preconditions; AI proposals gain no acceptance authority.
- Cached and clean normalized diagnostic sets compare equal for equivalent inputs.
- Ordering is deterministic and presentation is a pure downstream operation.

## 5. Required evidence

- unit tests for every value invariant and invalid input class;
- golden normalized-diagnostic fixtures across renderers and locales;
- path-relocation and schedule-permutation comparisons;
- suppression-policy and stale-fix negative tests;
- provenance-preserving deduplication tests; and
- reviewed traceability from MSC-CORE-0009 §§8, 15, 17–20 to source and tests.

## 6. Completion checklist

- [ ] Production implementation reviewed.
- [ ] Public schemas and versioning documented.
- [ ] Unit, property, negative, and integration tests pass.
- [ ] Diagnostic fixtures are consumable by WP-MSC-0013.
- [ ] No backend-specific rule ownership leaked upstream.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

WP-MSC-0007 supplies normalized findings to phase results, cached results, reproducibility comparisons, and the conformance matrix. MSC-CORE-0010 may extend the catalog with KIR/backend rules while preserving this envelope and ordering contract.

## 8. Status boundary

This packet is a planning artifact. It does not claim source code, tests, diagnostics, or acceptance evidence exist.


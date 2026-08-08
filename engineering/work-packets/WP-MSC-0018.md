---
title: "WP-MSC-0018 — Implement Artifact Validation and Atomic Publication"
description: "Implement candidate-artifact identity, traceability, validation, manifests, collision and overwrite safety, and atomic artifact-set publication."
date: 2026-08-08
status: planned
work_packet: WP-MSC-0018
work_cycle: WC-0003
program_increment: PI-002
milestone: M-002
governing_specification: MSC-CORE-0010
implementation_status: not-started
depends_on: [WP-MSC-0007, WP-MSC-0008, WP-MSC-0014, WP-MSC-0015, WP-MSC-0016, WP-MSC-0017]
supersedes: []
---

# WP-MSC-0018 — Implement Artifact Validation and Atomic Publication

> **State:** Planned; not started  
> **Primary owner:** Unassigned  
> **Depends on:** WP-MSC-0007, WP-MSC-0008, WP-MSC-0014–0017  
> **Planning authority:** MSC-CORE-0010 §§13–18, 21–23

## 1. Objective

Implement the governed boundary that turns isolated backend output into validated artifact sets, immutable output manifests, and atomic publications without overwriting user content or publishing partial success.

## 2. Scope

### In scope

- candidate and artifact-set identity, digest, kind, media type, logical path, permissions, provenance, dependency, validation, and taint models;
- many-to-many KIR/MSG/artifact source maps;
- manifest, path, collision, size, permission, syntax, semantic, provenance, policy, secret, reproducibility, and completeness validation;
- traversal, reserved-name, case-folding, and platform ambiguity protection;
- output manifests and canonical artifact ordering;
- stale-precondition and user-authored-file protection;
- atomic publication groups, rollback, interruption, and recovery; and
- published/validated/review-only/unavailable/failed/cancelled outcomes.

### Out of scope

- release-channel authorization or registry distribution;
- treating generated files as semantic sources; and
- publishing partial artifacts as complete.

## 3. Deliverables

1. Candidate/artifact/output-manifest schemas.
2. Bidirectional source-map format and validator.
3. Staged artifact-validation pipeline.
4. Collision, overwrite, and logical-path safety implementation.
5. Atomic artifact-set publisher and recovery journal.
6. Deterministic artifact/output-manifest comparison support.
7. Adversarial publication and recovery tests.

## 4. Acceptance criteria

- Only complete, validated candidate sets can become published sets.
- Artifact identities use canonical logical paths, never host-absolute locations.
- Collisions require a governed deterministic merge or fail safely.
- User-authored files require explicit policy plus matching precondition digest before overwrite.
- Interrupted, failed, cancelled, or stale publication leaves the prior accepted set intact or cleanly recoverable.
- Output manifests bind artifacts to MSG, KIR, target, backend, validators, diagnostics, reproducibility, and authority.
- Trace maps preserve many-to-many origins without fabricating a single source.

## 5. Required evidence

- validation-stage matrix;
- traversal/collision/platform-path tests;
- stale-overwrite and user-content protection tests;
- secret-leakage scan results;
- atomicity, interruption, rollback, and recovery evidence;
- output-manifest integrity fixtures; and
- packet acceptance review with no unresolved P0/P1 defect.

## 6. Completion checklist

- [ ] Artifact and manifest schemas reviewed.
- [ ] Source maps are bidirectional and valid.
- [ ] All validation gates are enforced.
- [ ] Atomic publication and recovery verified.
- [ ] User content and secrets are protected.
- [ ] Packet-specific acceptance disposition recorded.

## 7. Handoffs

Published and validated artifact records become comparison inputs for WP-MSC-0019. WP-MSC-0020 attacks validation, traceability, collision, and publication boundaries.

## 8. Status boundary

This packet is planned and unassigned. No artifact publication implementation or acceptance evidence is claimed.

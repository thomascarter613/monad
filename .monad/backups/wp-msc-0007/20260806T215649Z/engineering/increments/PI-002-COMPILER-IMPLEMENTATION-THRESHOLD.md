---
artifact:
  id: PI-002-COMPILER-IMPLEMENTATION-THRESHOLD
  type: engineering.declaration
  namespace: monad
metadata:
  title: PI-002 Compiler Implementation Threshold
  version: 0.1.0
  status: declared
  program_increment: PI-002
  milestone: M-002
  declared: 2026-08-06
relationships:
  depends_on:
    - PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02
    - WP-MSC-0007
---

# PI-002 Compiler Implementation Threshold

## Declaration

The reconciled `MSC-CORE-0001` through `MSC-CORE-0010` contracts are sufficient to authorize bounded bootstrap compiler implementation.

This declaration authorizes implementation planning and dependency-ordered activation beginning with `WP-MSC-0001`.

It does not claim that MSC, MSG, KIR, a KIR backend, MKE persistence, or self-hosting already exists.

## Canonical Boundary

```text
Artifacts → canonical compiler representations → analyzed semantic state → MSG
MSG → MKE ingestion
MSG → target-oriented KIR → KIR backend → generated-artifact plan
```

## Required Implementation Evidence

Every implementation slice must preserve deterministic identity, provenance, authority, lifecycle, diagnostics, clean/incremental equivalence, and the declared representation boundaries.

Effectful backend apply and self-hosting promotion remain separately gated.

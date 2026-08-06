---
artifact:
  id: MONAD-PROJECT-STATUS
  type: engineering.project-status
  namespace: monad
metadata:
  title: Monad Project Status
  version: 0.2.0
  status: active
  updated: 2026-08-06
---

# Monad Project Status

## Current State

| Field | Value |
|---|---|
| Current Phase | Compiler Specification |
| Current Program Increment | PI-002 — Semantic Compiler Foundation |
| Current Milestone | M-002 — Compiler Specification Complete |
| Previous Program Increment | PI-001 — Architecture Freeze |
| Previous Milestone | M-001 — Architecture Freeze |
| Architecture Status | Frozen by default |
| Implementation Status | Bootstrap prototypes only |
| Current Focus | MSC-CORE-0008 through MSC-CORE-0010 |
| Next Concrete Artifact | `specifications/MSC/core/MSC-CORE-0008.md` |

## PI-001 Outcome

PI-001 completed the foundational Monad Vision layer and the Architecture Freeze program.

Completed artifacts:

- `vision/manifesto.md`
- `vision/principles.md`
- `vision/laws.md`
- `vision/glossary.md`
- `vision/ecosystem.md`
- `vision/architecture-map.md`
- `vision/compiler-pipeline.md`
- `vision/knowledge-lifecycle.md`
- `vision/constitution.md`
- `engineering/increments/PI-001-ARCHITECTURE-FREEZE-CONSISTENCY-REVIEW.md`

The consistency review found no unresolved P0 architectural blockers.

## Accepted Architectural Spine

```text
MSL
  ↓
MSC
  ↓
MSG
  ↓
MKE
  ↓
Projections, Backends, Applications, and AI Context
```

Primary responsibilities:

| Component | Responsibility |
|---|---|
| MSL | Express engineering knowledge and specification intent |
| MSC | Compile supported artifacts into analyzed semantic graphs |
| MSG | Represent one compiled semantic knowledge snapshot |
| MKE | Persist, version, index, query, govern, and evolve knowledge |
| KIR | Represent lowered target-oriented projections |
| MPE | Produce publication projections |
| MAE | Assemble governed AI context and assist reasoning |

## Architecture Freeze Policy

Accepted architecture is stable by default.

Architectural change now requires the proportional process defined by `vision/constitution.md`, including an ADR where applicable.

Implementation details may evolve freely when they remain inside accepted boundaries.

## Current Risks

| Risk | Severity | Response |
|---|---:|---|
| Continuing architecture work indefinitely | Medium | PI-002 is limited to the final MSC-CORE specifications |
| MSG ontology remains incomplete | Medium | Resolve through MSC-CORE-0008 and follow-on MSG work |
| Incremental compilation may be underspecified | Medium | Resolve through MSC-CORE-0009 |
| KIR/backend boundary may remain abstract | Medium | Resolve through MSC-CORE-0010 |
| Project-control files may drift manually | Low | Replace with generated projections during self-hosting |

## Immediate Execution Queue

1. Complete `MSC-CORE-0008`.
2. Complete `MSC-CORE-0009`.
3. Complete `MSC-CORE-0010`.
4. Reconcile the three documents against the Vision layer.
5. Declare the compiler implementation threshold.
6. Create compiler-bootstrap implementation work packets.

## Implementation Threshold

Monad reaches the next implementation threshold when:

- MSC-CORE-0008 through MSC-CORE-0010 are accepted;
- MSG construction is sufficiently specified;
- diagnostics, incrementality, and reproducibility are sufficiently specified;
- KIR lowering and backend contracts are sufficiently specified;
- no P0 compiler-architecture blocker remains.

## Status

PI-001 is complete.

PI-002 is active.

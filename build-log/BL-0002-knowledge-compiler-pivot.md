# BL-0002 — Knowledge Compiler Pivot

**Date:** 2026-08-03

## Summary

Monad formally adopted a compiler architecture for engineering knowledge.

## Decisions

- Specifications are compilable artifacts.
- MSL is the specification language.
- MSC is the specification compiler.
- KIR is the normalized intermediate representation.
- MKE is the knowledge runtime.
- Code and documentation are projections of compiled knowledge.

## Repository Changes

- Added MSL specification domain.
- Added MSC specification domain.
- Added KIR specification domain.
- Added the bootstrap Specification Registry.
- Added a provisional specification template.
- Recorded ADR-0002.

## Existing Corpus

Existing MKE specifications remain intact.

They are classified as pre-normative and will become the first migration and
conformance corpus after MSL, KIR, and MSC are sufficiently defined.

## Next Step

Write MSL-CORE-0001 — Monad Specification Language Vision.
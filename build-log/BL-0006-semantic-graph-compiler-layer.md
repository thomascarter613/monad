# BL-0006 — Semantic Graph Compiler Layer

**Date:** 2026-08-04

## Summary

Monad introduced an explicit semantic-graph stage between the canonical MSL AST and KIR.

## Previous Pipeline

```text
Source
  ↓
Surface AST
  ↓
Canonical MSL AST
  ↓
KIR
```

## Revised Pipeline

```text
Source
  ↓
Surface AST
  ↓
Canonical MSL AST
  ↓
Monad Semantic Graph
  ↓
KIR
```

## Responsibilities

### Canonical MSL AST

Preserves the MSL concepts expressed by authors and normalized sources.

### Monad Semantic Graph

Represents fully bound and resolved meaning.

### KIR

Represents deterministic lowered knowledge for validation, optimization, generation, and backend execution.

## Repository Changes

* Added `specifications/MSG/core`.
* Reordered the next foundational specification series.
* Recorded ADR-0006.
* Preserved the completed MSL-CORE corpus.

## Revised Next Sequence

1. MSC-CORE
2. MSG-CORE
3. KIR-CORE
4. MSL-DOCUMENT
5. MSL-TYPE
6. MSL-EXPR
7. MSL-CONSTRAINT

## Next Step

Write `MSC-CORE-0001 — Monad Specification Compiler Vision and Architecture`.

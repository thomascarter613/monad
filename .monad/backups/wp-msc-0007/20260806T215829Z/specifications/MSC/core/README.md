---
id: "MSC-CORE-0000"
title: "MSC-CORE Series Index"
description: "Index and planned document map for the Monad Specification Compiler core series."
kind: "series-index"
series: "MSC-CORE"
series_position: 0
status: "active"
---

# MSC-CORE — Monad Specification Compiler Core

The MSC-CORE series defines the architecture and behavior of the Monad
Specification Compiler.

MSC transforms authoring and engineering sources into compiled knowledge.

## Canonical Pipeline

```text
Sources
  ↓
Frontends
  ↓
Surface ASTs
  ↓
Normalizers
  ↓
Canonical MSL AST
  ↓
Binding and Semantic Analysis
  ↓
Monad Semantic Graph
  ↓
Validation
  ↓
KIR
  ↓
Backends
```

## Planned Specifications

| ID | Title |
|---|---|
| MSC-CORE-0001 | Monad Specification Compiler Vision and Architecture |
| MSC-CORE-0002 | Compilation Pipeline and Phase Model |
| MSC-CORE-0003 | Artifact Discovery and Compilation Units |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis |
| MSC-CORE-0008 | Semantic Graph Construction |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |


<!-- WP-MSC-0007:BEGIN -->

## Reconciled Series Status

| Position | Artifact | Title | State |
| ---: | --- | --- | --- |
| 1 | MSC-CORE-0001 | Compiler Vision and Architecture | draft/reconciled |
| 2 | MSC-CORE-0002 | Pipeline and Phase Model | draft/reconciled |
| 3 | MSC-CORE-0003 | Artifact Discovery and Compilation Units | draft |
| 4 | MSC-CORE-0004 | Frontend and Normalizer Orchestration | draft/reconciled |
| 5 | MSC-CORE-0005 | Declaration Collection and Symbol Binding | draft |
| 6 | MSC-CORE-0006 | Namespace, Import, and Reference Resolution | draft/reconciled |
| 7 | MSC-CORE-0007 | Type, Constraint, and Semantic Analysis | draft/reconciled |
| 8 | MSC-CORE-0008 | Semantic Graph Construction | draft/reconciled |
| 9 | MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility | draft/reconciled |
| 10 | MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting | draft/reconciled |

The series remains active until the second PI-002 consistency review passes.

<!-- WP-MSC-0007:END -->

## Status

Active.

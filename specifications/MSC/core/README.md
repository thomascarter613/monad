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

| ID            | Title                                                |
| ------------- | ---------------------------------------------------- |
| MSC-CORE-0001 | Monad Specification Compiler Vision and Architecture |
| MSC-CORE-0002 | Compilation Pipeline and Phase Model                 |
| MSC-CORE-0003 | Source Discovery and Compilation Units               |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration                |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding            |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution          |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis              |
| MSC-CORE-0008 | Semantic Graph Construction                          |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility     |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting    |

## Status

Active.

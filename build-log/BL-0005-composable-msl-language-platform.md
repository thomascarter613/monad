    # BL-0005 — Composable MSL Language Platform

**Date:** 2026-08-04

## Summary

Monad redefined MSL from one expanding grammar into a composable family of engineering languages.

## Previous Model

```text
MSL
└── One language containing documents, constraints, policies, workflows,
    types, queries, state machines, and transformations
```

## Revised Model

```text
MSL Platform

├── Document Language
├── Type Language
├── Expression Language
├── Constraint Language
├── Policy Language
├── Workflow Language
├── State Machine Language
├── Query Language
├── Pattern Language
├── Transformation Language
└── Package Language
```

## Compiler Impact

The host document parser discovers embedded-language regions and dispatches each region to the appropriate language frontend.

```text
Document Source
    ↓
Document Parser
    ↓
Embedded-Language Dispatch
    ↓
Language-Specific Surface ASTs
    ↓
Canonical MSL AST
    ↓
KIR
```

## Reason

The engineering knowledge Monad must represent contains multiple semantic domains with different grammar and tooling requirements.

A modular language family provides cleaner parsing, safer semantics, stronger editor support, and independent evolution.

## Existing Specifications

No existing MSL specifications were deleted.

Bootstrap machine-specification and invariant blocks remain provisional until specialized languages replace or formalize them.

## Revised Remaining MSL-CORE Documents

* `MSL-CORE-0009 — Document and Embedded Language Architecture`
* `MSL-CORE-0010 — Core Semantic Integration, Types, References, and Evolution`

## Next Step

Write `MSL-CORE-0009 — Document and Embedded Language Architecture`.

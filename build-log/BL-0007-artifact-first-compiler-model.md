# BL-0007 — Artifact-First Compiler Model

**Date:** 2026-08-04

## Summary

Monad replaced its remaining file-centric compiler abstraction with an artifact-first model.

## Decision

Monad compiles artifacts, not files.

A file is one possible physical representation of an artifact.

## Core Model

```text
Artifact
    ↓
Transformation
    ↓
Artifact
```

The complete compiler is an artifact-transformation graph:

```text
Source Artifact
    ↓
Surface AST Artifact
    ↓
Canonical AST Artifact
    ↓
Semantic Graph Artifact
    ↓
KIR Artifact
    ↓
Generated Artifact
```

## Architectural Impact

The following concepts become artifact-oriented:

* discovery;
* acquisition;
* identity;
* provenance;
* compilation units;
* compiler invocations;
* diagnostics;
* reports;
* caches;
* registries;
* generated outputs.

## New Series

Monad introduces:

```text
MART-CORE — Monad Artifact Model Core
```

This series will define the common artifact ontology used by MSL, MSC, MSG, KIR, MKE, registries, caches, and backends.

## Revised Next Sequence

1. Complete `MSC-CORE`
2. Define `MART-CORE`
3. Define `MSG-CORE`
4. Define `KIR-CORE`
5. Define `MSL-DOCUMENT`
6. Define `MSL-TYPE`
7. Define `MSL-EXPR`
8. Define `MSL-CONSTRAINT`

## Next Step

Write `MSC-CORE-0003 — Artifact Discovery and Compilation Units`.

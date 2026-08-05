# MART-CORE — Monad Artifact Model Core

The MART-CORE series defines the universal artifact model used throughout the Monad ecosystem.

An artifact is Monad’s foundational unit of identity, provenance, transformation, versioning, storage, relationship, compilation, and publication.

## Core Principle

```text
Artifact
    ↓
Transformation
    ↓
Artifact
```

Files, documents, source code, ASTs, semantic graphs, KIR, diagnostics, reports, compiler invocations, packages, caches, and generated outputs are specialized artifact forms.

## Planned Specifications

| ID             | Title                                                          |
| -------------- | -------------------------------------------------------------- |
| MART-CORE-0001 | Artifact Model Vision and Design Principles                    |
| MART-CORE-0002 | Artifact Identity, Types, and Classification                   |
| MART-CORE-0003 | Artifact Representations, Locations, and Materialization       |
| MART-CORE-0004 | Artifact Versioning, Lifecycle, and Mutability                 |
| MART-CORE-0005 | Artifact Provenance and Lineage                                |
| MART-CORE-0006 | Artifact Relationships and Composition                         |
| MART-CORE-0007 | Artifact Integrity, Trust, and Security                        |
| MART-CORE-0008 | Artifact Transformation Model                                  |
| MART-CORE-0009 | Artifact Registries, Discovery, and Resolution                 |
| MART-CORE-0010 | Artifact Serialization, Interchange, and Ecosystem Integration |

## Architectural Consumers

MART is consumed by:

* MSL;
* MSC;
* MSG;
* KIR;
* MKE;
* CLI;
* registries;
* frontends;
* normalizers;
* caches;
* backends;
* generators;
* publishers.

## Status

Planned.

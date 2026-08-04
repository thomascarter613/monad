---
id: MKE-CORE-0003

title: Relationship Taxonomy Specification

series: MKE-CORE

version: 1.0.0

status: Draft

created: 2026-08-03

category:
  - architecture
  - knowledge-model
  - graph-model

authors:
  - Monad Architecture Team

depends_on:
  - ADR-0001
  - MKE-CORE-0001
  - MKE-CORE-0002
---

# MKE-CORE-0003 — Relationship Taxonomy Specification


# 1. Purpose

This specification defines the relationship model used by the Monad Knowledge Engine.

The Relationship Taxonomy establishes the vocabulary and semantics used to describe how artifacts connect to one another.

The purpose of relationships is to transform a collection of artifacts into an interconnected knowledge graph.

---

# 2. Motivation

Artifacts have limited value in isolation.

A specification without implementation context is incomplete.

A source file without requirements is difficult to understand.

A test without behavior expectations lacks meaning.

An architecture decision without the problem it solved becomes historical trivia.

The relationships between artifacts provide the context necessary for understanding.

---

# 3. Core Principle

> Artifacts describe things. Relationships explain meaning.

Monad considers relationships first-class knowledge objects.

A relationship is not merely a hyperlink.

A relationship expresses a semantic statement.

Example:

```text
SPEC-AUTH-001

implements

services/authentication/login.go
```

This means:

"The source file exists because it implements the behavior defined by the specification."

---

# 4. Relationship Model

A relationship consists of:

```text
Relationship

├── Identity
├── Source Artifact
├── Relationship Type
├── Target Artifact
├── Metadata
├── Provenance
└── Validation
```

---

# 5. Relationship Structure

Example:

```yaml
relationship:

  source:
    SPEC-AUTH-001

  type:
    implements

  target:
    SRC-AUTH-LOGIN

  created:
    2026-08-03

  created_by:
    human
```

---

# 6. Relationship Requirements

All relationships MUST:

* have a source artifact
* have a target artifact
* have a defined relationship type
* have semantic meaning
* be traceable

---

# 7. Relationship Categories

Monad organizes relationships into categories.

```text
Knowledge Relationships

├── Dependency
├── Derivation
├── Implementation
├── Verification
├── Documentation
├── Evolution
├── Ownership
├── Organization
└── Generation
```

---

# 8. Dependency Relationships

Dependency relationships express that one artifact requires another.

## depends_on

Meaning:

Artifact A requires artifact B.

Example:

```text
CLI

depends_on

Configuration System
```

---

## requires

Meaning:

Artifact A cannot function without artifact B.

Example:

```text
Service

requires

Database
```

---

## references

Meaning:

Artifact A mentions or uses artifact B.

Example:

```text
Article

references

ADR-0001
```

---

# 9. Implementation Relationships

Implementation relationships connect intent to realization.

## implements

Meaning:

An artifact provides the implementation of another artifact.

Example:

```text
Source File

implements

Specification
```

---

## realizes

Meaning:

An artifact makes an abstract concept concrete.

Example:

```text
Database Schema

realizes

Data Model
```

---

# 10. Verification Relationships

Verification relationships connect expectations with evidence.

## validates

Meaning:

An artifact proves correctness of another artifact.

Example:

```text
Test Suite

validates

Feature Specification
```

---

## tests

Meaning:

A test artifact verifies behavior.

Example:

```text
unit_test.go

tests

Authentication Module
```

---

## benchmarks

Meaning:

Measures characteristics of another artifact.

Example:

```text
Performance Report

benchmarks

Query Engine
```

---

# 11. Documentation Relationships

Documentation explains knowledge.

## documents

Meaning:

Artifact provides explanation for another artifact.

Example:

```text
Tutorial

documents

API Service
```

---

## explains

Meaning:

Artifact provides conceptual understanding.

Example:

```text
Architecture Article

explains

ADR
```

---

# 12. Derivation Relationships

Derivation expresses creation from another artifact.

## derived_from

Meaning:

Artifact was created based on another artifact.

Example:

```text
Generated Code

derived_from

Specification
```

---

## generated_by

Meaning:

Artifact was produced by a tool or process.

Example:

```text
Documentation

generated_by

Monad Publisher
```

---

# 13. Evolution Relationships

Evolution describes change over time.

## supersedes

Meaning:

New artifact replaces old artifact.

Example:

```text
ADR-002

supersedes

ADR-001
```

---

## modifies

Meaning:

Artifact changes another artifact.

Example:

```text
Commit

modifies

Source File
```

---

## conflicts_with

Meaning:

Artifacts contain incompatible decisions or requirements.

Example:

```text
Architecture Proposal A

conflicts_with

Architecture Proposal B
```

---

# 14. Ownership Relationships

Ownership identifies responsibility.

## owned_by

Meaning:

Artifact belongs to a person, team, or organization.

Example:

```text
Service

owned_by

Platform Team
```

---

## maintained_by

Meaning:

Artifact lifecycle responsibility.

Example:

```text
Package

maintained_by

Security Team
```

---

# 15. Organization Relationships

Organization describes grouping.

## belongs_to

Meaning:

Artifact is part of a larger system.

Example:

```text
Authentication Service

belongs_to

Identity Platform
```

---

## contains

Meaning:

Artifact contains other artifacts.

Example:

```text
Repository

contains

Modules
```

---

# 16. Generation Relationships

Generated artifacts must preserve lineage.

## generated_from

Meaning:

Artifact was generated from another artifact.

Example:

```text
Source Code

generated_from

Specification
```

---

## generated_by

Meaning:

Artifact was created by a generator.

Example:

```text
Deployment File

generated_by

Infrastructure Generator
```

---

# 17. Relationship Direction

Relationships are directional.

Example:

Correct:

```text
Specification

implements

Source Code
```

Incorrect:

```text
Source Code

implements

Specification
```

Direction provides meaning.

---

# 18. Relationship Composition

Relationships may form chains.

Example:

```text
Business Requirement

        |
        v

Specification

        |
        v

Architecture Decision

        |
        v

Implementation

        |
        v

Test

        |
        v

Release
```

These chains enable reasoning.

---

# 19. Relationship Confidence

Future versions MAY support confidence values.

Example:

```yaml
relationship:

  type:
    derived_from

  confidence:
    0.95
```

This supports AI-assisted knowledge extraction.

---

# 20. Relationship Validation

The Knowledge Engine validates relationships.

Examples:

A specification SHOULD NOT:

* implement source code

A test SHOULD NOT:

* generate architecture

A commit SHOULD:

* modify artifacts

Validation prevents semantic corruption.

---

# 21. Query Examples

The Relationship Taxonomy enables queries.

Examples:

## Impact Analysis

"What depends on this artifact?"

```text
traverse depends_on
```

---

## Traceability

"What implements this requirement?"

```text
traverse implements
```

---

## Documentation Discovery

"How is this component explained?"

```text
traverse documents
```

---

## History

"Why was this changed?"

```text
traverse modifies
```

---

# 22. Initial Relationship Vocabulary

Version 1.0 defines:

| Relationship   | Category       |
| -------------- | -------------- |
| depends_on     | Dependency     |
| requires       | Dependency     |
| references     | Dependency     |
| implements     | Implementation |
| realizes       | Implementation |
| validates      | Verification   |
| tests          | Verification   |
| benchmarks     | Verification   |
| documents      | Documentation  |
| explains       | Documentation  |
| derived_from   | Derivation     |
| generated_by   | Generation     |
| supersedes     | Evolution      |
| modifies       | Evolution      |
| conflicts_with | Evolution      |
| owned_by       | Ownership      |
| maintained_by  | Ownership      |
| belongs_to     | Organization   |
| contains       | Organization   |

---

# 23. Future Extensions

Future specifications:

| ID            | Title                   |
| ------------- | ----------------------- |
| MKE-CORE-0004 | Knowledge Graph Model   |
| MKE-CORE-0005 | Identity and Provenance |
| MKE-CORE-0006 | Query and Traversal API |

---

# Status

Draft specification.

This document defines the semantic language of the Monad Knowledge Graph.

```

---

Next:

**MKE-CORE-0004 — Knowledge Graph Model Specification**

This is where we move from:

> "Artifacts have relationships"

to:

> "How do we store, traverse, query, and reason over the complete graph?"

That document will define the actual conceptual database model behind Monad.
```

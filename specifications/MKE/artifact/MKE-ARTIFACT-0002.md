Continuing.

We now define the **classification system** for artifacts.

The previous document established:

> Every artifact has a schema.

Now we answer:

> What kinds of things can exist inside Monad?

This is one of the most important design decisions because the artifact taxonomy becomes the vocabulary used by:

* CLI commands
* generators
* AI agents
* search
* validation
* reporting
* integrations

A mistake here would force the entire ecosystem to evolve around the wrong concepts.

The key Monad principle:

> Artifact types describe the role an artifact plays in the knowledge system, not the implementation technology used to create it.

For example:

Wrong:

```
go_file
python_file
typescript_file
```

Right:

```
source_code
```

The language is metadata.

The artifact type is meaning.

---

Save as:

```text
specifications/MKE/artifact/MKE-ARTIFACT-0002.md
```

---

````markdown
# MKE-ARTIFACT-0002 — Artifact Type Registry Specification

## Metadata

```yaml
id: MKE-ARTIFACT-0002

title: Artifact Type Registry Specification

series: MKE-ARTIFACT

version: 1.0.0

status: Draft

created: 2026-08-03

category:
  - architecture
  - artifact-system
  - taxonomy

authors:
  - Monad Architecture Team

depends_on:
  - MKE-CORE-0002
  - MKE-CORE-0003
  - MKE-ARTIFACT-0001
````

---

# 1. Purpose

This specification defines the artifact type registry used by the Monad Knowledge Engine.

The Artifact Type Registry establishes the controlled vocabulary for classifying knowledge objects managed by Monad.

---

# 2. Motivation

Without a consistent artifact taxonomy, systems become fragmented.

Example:

```
docs/
documentation/
manuals/
wiki/
notes/
```

Humans may understand these categories, but tools cannot reliably reason about them.

Monad requires a semantic classification system.

---

# 3. Core Principle

> Artifact types describe meaning, purpose, and behavior.

An artifact type determines:

* validation rules
* allowed relationships
* lifecycle
* generation behavior
* AI interpretation

---

# 4. Artifact Type Model

Every artifact type contains:

```text
Artifact Type

├── Identity
├── Purpose
├── Schema Rules
├── Lifecycle Rules
├── Relationship Rules
├── Validation Rules
└── Extensions
```

---

# 5. Type Identifier

Artifact types use stable identifiers.

Format:

```
<domain>.<type>
```

Examples:

```
knowledge.specification

implementation.source

verification.test

communication.document
```

---

# 6. Type Categories

Monad defines initial artifact domains:

```
Artifact Domains

├── Knowledge
├── Architecture
├── Implementation
├── Verification
├── Operations
├── Communication
├── Data
└── Intelligence
```

---

# 7. Knowledge Artifacts

Knowledge artifacts represent understanding and intent.

## requirement

Purpose:

Defines desired behavior or outcome.

Examples:

```
Business requirement

User story

Functional requirement
```

---

## specification

Purpose:

Defines formal system behavior.

Examples:

```
API specification

Architecture specification

Technical design
```

---

## research

Purpose:

Captures investigation and discovery.

Examples:

```
Technology evaluation

Experiment

Analysis
```

---

## decision

Purpose:

Records a choice and rationale.

Examples:

```
ADR

Architecture decision

Design decision
```

---

# 8. Architecture Artifacts

Architecture artifacts describe system organization.

## architecture_model

Purpose:

Represents structural design.

Examples:

```
System architecture

Component diagram

Deployment model
```

---

## interface_contract

Purpose:

Defines interaction boundaries.

Examples:

```
API contract

Message schema

Protocol definition
```

---

# 9. Implementation Artifacts

Implementation artifacts represent realizations.

## source_code

Purpose:

Executable or compilable implementation.

Examples:

```
Go package

Python module

TypeScript component
```

---

## configuration

Purpose:

Defines system behavior settings.

Examples:

```
YAML configuration

Environment definition

Application settings
```

---

## infrastructure

Purpose:

Defines operational resources.

Examples:

```
Terraform

Kubernetes manifests

Cloud resources
```

---

# 10. Verification Artifacts

Verification artifacts establish confidence.

## test

Purpose:

Validates behavior.

Examples:

```
Unit test

Integration test

End-to-end test
```

---

## benchmark

Purpose:

Measures performance.

Examples:

```
Load test

Performance report
```

---

## validation_report

Purpose:

Records validation results.

Examples:

```
Security review

Compliance check

Architecture review
```

---

# 11. Communication Artifacts

Communication artifacts explain knowledge.

## documentation

Purpose:

Explains systems.

Examples:

```
User guide

Developer guide

Reference documentation
```

---

## publication

Purpose:

Public knowledge sharing.

Examples:

```
Blog article

White paper

Book chapter
```

---

## tutorial

Purpose:

Provides learning paths.

Examples:

```
Getting started guide

Training material
```

---

# 12. Operational Artifacts

Operational artifacts describe running systems.

## deployment

Purpose:

Describes deployed state.

Examples:

```
Release

Environment

Deployment record
```

---

## incident

Purpose:

Records operational events.

Examples:

```
Outage report

Security incident
```

---

## metric

Purpose:

Captures system measurements.

Examples:

```
Performance metrics

Health indicators
```

---

# 13. Data Artifacts

Data artifacts represent information resources.

## dataset

Purpose:

Collection of structured information.

Examples:

```
Training data

Reference data

Test data
```

---

## schema

Purpose:

Defines data structure.

Examples:

```
Database schema

Event schema

API model
```

---

# 14. Intelligence Artifacts

These represent AI-related knowledge.

## ai_agent

Purpose:

Defines an autonomous capability.

Examples:

```
Code agent

Research agent

Operations agent
```

---

## ai_model

Purpose:

Represents an AI model.

Examples:

```
Language model

Embedding model

Classifier
```

---

## prompt_template

Purpose:

Reusable AI instruction.

Examples:

```
Generation prompt

Analysis workflow
```

---

# 15. Artifact Type Registry

Initial registry:

| Type               | Domain         |
| ------------------ | -------------- |
| requirement        | Knowledge      |
| specification      | Knowledge      |
| research           | Knowledge      |
| decision           | Knowledge      |
| architecture_model | Architecture   |
| interface_contract | Architecture   |
| source_code        | Implementation |
| configuration      | Implementation |
| infrastructure     | Implementation |
| test               | Verification   |
| benchmark          | Verification   |
| validation_report  | Verification   |
| documentation      | Communication  |
| publication        | Communication  |
| tutorial           | Communication  |
| deployment         | Operations     |
| incident           | Operations     |
| metric             | Operations     |
| dataset            | Data           |
| schema             | Data           |
| ai_agent           | Intelligence   |
| ai_model           | Intelligence   |
| prompt_template    | Intelligence   |

---

# 16. Custom Artifact Types

Monad supports extensions.

Example:

```yaml
artifact_type:

  id:
    domain.custom_type

  extends:
    source_code

```

Custom types MUST declare:

* parent type
* validation rules
* relationships

---

# 17. Artifact Type Inheritance

Types may inherit behavior.

Example:

```
publication

    inherits

documentation
```

Meaning:

A publication is a specialized documentation artifact.

---

# 18. Type Validation

The Knowledge Engine validates:

* known type
* inheritance rules
* required metadata
* relationship compatibility

---

# 19. AI Interpretation

Artifact types provide AI context.

Example:

AI sees:

```
artifact_type:
  decision
```

and understands:

"This contains rationale and historical reasoning."

---

# 20. Future Extensions

Future documents:

| ID                | Title                            |
| ----------------- | -------------------------------- |
| MKE-ARTIFACT-0003 | Artifact Lifecycle Specification |
| MKE-ARTIFACT-0004 | Artifact Metadata Standard       |
| MKE-ARTIFACT-0005 | Artifact Extension Model         |
| MKE-ARTIFACT-0006 | Artifact Storage Specification   |

---

# Status

Draft specification.

This document defines the semantic vocabulary of Monad artifacts.

````

---

Current progress:

```text
MKE-CORE
├── 0001 Vision
├── 0002 Artifact Model
├── 0003 Relationships
├── 0004 Graph
├── 0005 Identity
├── 0006 Query
├── 0007 Semantic Search
├── 0008 Validation
├── 0009 AI Context
└── 0010 Evolution


MKE-ARTIFACT
├── 0001 Artifact Schema        ✅
└── 0002 Type Registry          ✅
````

Next:

**MKE-ARTIFACT-0003 — Artifact Lifecycle Specification**

This defines the complete lifecycle state machine:

```
Concept
  ↓
Draft
  ↓
Review
  ↓
Approved
  ↓
Active
  ↓
Deprecated
  ↓
Archived
```

This is what allows Monad to manage knowledge over years instead of just storing documents.

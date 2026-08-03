---
id: ADR-0002
title: Specifications Compile to Knowledge IR
status: Accepted
version: 1.0.0
created: 2026-08-03
decision_scope: foundational-architecture

depends_on:
  - ADR-0001

affects:
  - MSL
  - MSC
  - KIR
  - MKE
  - generators
  - validators
  - publishing
  - artificial-intelligence
---

# ADR-0002 — Specifications Compile to Knowledge IR

## Context

Monad began as an AI-native repository-management and software-generation system.

As the architecture evolved, it became clear that Monad cannot reliably generate, validate, explain, or evolve software by interpreting unrelated prose documents and source files independently.

Monad requires a structured, typed, machine-processable representation of engineering knowledge.

Human-readable specifications remain necessary, but prose alone is not sufficient for deterministic validation, dependency analysis, generation, conformance testing, or AI context assembly.

## Decision

Monad specifications will be treated as compilable knowledge artifacts.

The canonical compilation pipeline is:

```text
Human Intent
    ↓
Monad Specification Language
    ↓
Monad Specification Compiler
    ↓
Knowledge Intermediate Representation
    ↓
Monad Knowledge Engine
    ↓
Planning, Validation, Generation, Search, AI, and Publishing
    ↓
Target Artifacts
```

The following architectural boundaries are established:

### Monad Specification Language

MSL defines the author-facing language used to express engineering knowledge.

Markdown with structured metadata and machine-specification blocks will be the initial surface syntax.

Markdown is not the canonical internal representation.

### Monad Specification Compiler

MSC parses, resolves, validates, and compiles MSL sources.

MSC produces deterministic diagnostics and normalized KIR output.

### Knowledge Intermediate Representation

KIR is the typed, normalized, language-independent representation produced by MSC.

KIR is suitable for graph construction, querying, validation, planning, generation, and AI context assembly.

### Monad Knowledge Engine

MKE stores, indexes, relates, queries, validates, and evolves compiled knowledge.

MKE is a knowledge runtime and service layer. It is not the specification parser or compiler.

### Backends and Projections

Source code, tests, documentation, infrastructure, diagrams, reports, plans, and publications are projections or backend outputs derived from compiled knowledge.

## Consequences

### Positive

* Specifications can become executable and testable.
* Validators can be derived from normative constraints.
* Generators can consume typed knowledge rather than prose.
* AI agents can reason over normalized, traceable context.
* Multiple authoring interfaces can compile into the same representation.
* The specification corpus can validate itself.

### Negative

* Monad must define and maintain a language, compiler, and intermediate representation.
* Existing specifications require migration.
* Bootstrapping creates a circular dependency: Monad must initially manage its specification corpus manually.
* The design requires strict separation between surface syntax and semantic representation.
* The initial implementation will be more complex than direct template generation.

## Alternatives Considered

### Prose-Only Specifications

Rejected because prose cannot provide deterministic validation or generation semantics.

### Markdown as the Canonical Data Model

Rejected because Markdown structure is presentation-oriented and insufficient as a stable internal representation.

### Direct Specification-to-Code Generation

Rejected because it couples authoring syntax directly to implementation backends and prevents normalization, optimization, graph analysis, and multiple projections.

### Knowledge Engine Parses Every Format Directly

Rejected because parsing, semantic analysis, and runtime knowledge operations are separate responsibilities.

## Migration Strategy

Existing MKE specifications remain authoritative conceptual documents.

They are classified as pre-normative specifications until the MSL language and conformance model are defined.

Migration will occur in stages:

1. Define MSL.
2. Define KIR.
3. Define MSC.
4. Create a canonical specification template.
5. Migrate existing specifications.
6. Validate the migrated corpus.
7. Compile the corpus into KIR.
8. Import compiled knowledge into MKE.

No existing specification will be deleted solely because it predates MSL.

## Decision Invariants

Future architecture must preserve these invariants:

1. MSL is not tied to a single presentation format.
2. MSC produces a normalized intermediate representation.
3. KIR is independent of source-language syntax.
4. MKE consumes compiled knowledge rather than owning all parsing concerns.
5. Generated artifacts preserve traceability to source specifications.
6. Human-readable and machine-readable views remain connected.
7. AI-generated knowledge preserves provenance and requires applicable validation.

## Status

Accepted.

This ADR establishes Monad as a knowledge compiler and software-engineering operating system.

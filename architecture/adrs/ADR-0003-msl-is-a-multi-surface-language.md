# ADR-0003 — MSL Is a Multi-Surface Semantic Language

## Metadata

```yaml
id: ADR-0003
title: MSL Is a Multi-Surface Semantic Language
status: Accepted
version: 1.0.0
created: 2026-08-04
decision_scope: foundational-language-architecture

depends_on:
  - ADR-0002

affects:
  - MSL
  - MSC
  - KIR
  - MKE
  - CLI
  - editors
  - AI authoring
  - publishing
```

## Context

The initial Monad Specification Language design used Markdown with YAML front matter and structured fenced blocks as its bootstrap authoring format.

This approach remains useful for repository-native authoring, but it risks conflating the language itself with one concrete representation.

Monad must eventually support specifications authored through:

* Markdown;
* YAML;
* JSON;
* terminal interfaces;
* graphical editors;
* IDE integrations;
* interactive configuration workflows;
* AI-assisted dialogue;
* imported engineering formats;
* generated specification sources.

If MSL is defined primarily by Markdown headings and fenced blocks, every future authoring interface would need to generate Markdown before semantic processing.

That would make presentation syntax an unnecessary architectural bottleneck.

The semantic language must instead exist independently from any individual authoring surface.

## Decision

MSL will be defined as a multi-surface semantic language.

A concrete authoring format is an MSL frontend.

Every conforming frontend translates source input into the common MSL Abstract Syntax Tree.

The canonical compilation pipeline is:

```text
Authoring Surface
    ↓
Frontend Parser or Semantic Editor
    ↓
MSL Abstract Syntax Tree
    ↓
Semantic Analysis
    ↓
Knowledge Intermediate Representation
    ↓
Monad Knowledge Engine
```

The initial Markdown-based authoring format will be known as:

```text
msl-markdown
```

It is one frontend implementation.

It is not MSL itself.

## Architectural Boundaries

### MSL Semantic Language

Defines the concepts that may be expressed, including:

* specifications;
* metadata;
* requirements;
* constraints;
* invariants;
* relationships;
* references;
* acceptance criteria;
* provenance;
* lifecycle;
* conformance evidence.

### MSL Frontends

Translate authoring inputs into the MSL AST.

Potential frontends include:

* `msl-markdown`;
* `msl-yaml`;
* `msl-json`;
* terminal configuration interfaces;
* graphical specification editors;
* conversational authoring;
* external-format importers.

### MSL AST

Represents the author’s structured specification before complete semantic normalization.

The AST preserves:

* source structure;
* source spans;
* comments where supported;
* unresolved references;
* frontend-specific source information;
* partially complete semantic nodes.

### MSC Semantic Compiler

Performs:

* identity registration;
* reference resolution;
* type checking;
* constraint validation;
* conflict detection;
* authority validation;
* normalization;
* KIR emission.

### KIR

Represents normalized semantic knowledge independent of authoring surface.

### Renderers

Transform AST or KIR into human-consumable projections.

Potential renderers include:

* Markdown;
* HTML;
* PDF;
* JSON;
* YAML;
* diagrams;
* documentation-site pages;
* editor views.

Rendering is distinct from compilation.

## Consequences

### Positive

* MSL remains independent from Markdown.
* Semantic editors can manipulate AST nodes directly.
* AI systems can propose structured nodes rather than produce fragile prose.
* Additional frontends can be added without redefining language semantics.
* Imported formats can map directly into the AST or KIR.
* Specifications can be rendered into multiple formats.
* Presentation changes do not alter canonical semantics.
* The language architecture resembles a conventional compiler architecture.

### Negative

* Monad must define an explicit AST.
* Frontend conformance becomes a first-class concern.
* Round-trip preservation may be difficult across different surfaces.
* Source-specific comments and formatting may not survive all transformations.
* Frontends may expose different subsets of language capabilities.
* AST and KIR versioning must be managed separately.
* The compiler architecture becomes more sophisticated during bootstrap.

## Alternatives Considered

### Markdown as MSL

Rejected because it binds language semantics to a presentation-oriented syntax.

### Markdown as Canonical Source with Other Formats Generating Markdown

Rejected because graphical, conversational, and structured tools would depend on unnecessary Markdown serialization.

### KIR as the Authoring Model

Rejected because KIR is normalized for computation rather than ergonomic human authorship.

### Independent Semantics per Frontend

Rejected because different authoring interfaces would produce incompatible specification languages.

## Frontend Requirements

Every conforming frontend must:

1. identify the MSL language version it targets;
2. produce a valid MSL AST;
3. preserve available source provenance;
4. preserve source spans where the surface supports them;
5. represent unsupported constructs explicitly;
6. produce deterministic diagnostics for deterministic source failures;
7. avoid inventing semantic content not present in the source;
8. declare lossy transformations;
9. preserve canonical artifact identity;
10. respect protected core semantics.

## Renderer Requirements

Every conforming renderer must:

1. identify its AST or KIR input version;
2. preserve canonical identities;
3. preserve normative authority;
4. distinguish authored and generated content;
5. declare lossy output behavior;
6. avoid changing semantic meaning;
7. preserve traceability where the output format permits it.

## Round-Trip Principle

Round-trip equivalence is desirable but not guaranteed for every frontend and renderer.

The following transformations are distinct:

```text
Source → AST → Source
```

and:

```text
Source → AST → KIR → Rendered Projection
```

The first may attempt source-preserving editing.

The second produces a semantic projection and may not preserve original formatting.

Tools must state which behavior they provide.

## Bootstrap Impact

Existing MSL documents remain valid bootstrap specifications.

Their `compilation.language` value:

```yaml
compilation:
  language: msl-markdown
```

already identifies them as using one frontend.

The first four MSL-CORE documents do not need immediate rewriting.

Their references to Markdown must be interpreted as descriptions of the initial frontend rather than definitions of the complete MSL language.

They will be reviewed after the AST, frontend, and compatibility specifications are complete.

## Revised MSL-CORE Roadmap

The remaining initial MSL-CORE documents are redefined as:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSL-CORE-0005 | Language and Frontend Architecture                |
| MSL-CORE-0006 | Abstract Syntax Tree Model                        |
| MSL-CORE-0007 | `msl-markdown` Concrete Syntax                    |
| MSL-CORE-0008 | Machine Semantics and Constraint Blocks           |
| MSL-CORE-0009 | Type System and Semantic Validation               |
| MSL-CORE-0010 | References, Relationships, and Language Evolution |

The following topics previously assigned separate core documents will move into specialized follow-on series:

* acceptance and conformance;
* detailed versioning;
* migration;
* packaging;
* modules;
* frontend conformance;
* AST serialization;
* semantic-editor protocols.

## Decision Invariants

1. MSL semantics are independent of any one authoring surface.
2. All conforming frontends produce a compatible MSL AST.
3. The AST and KIR are distinct representations.
4. KIR is independent of frontend syntax.
5. Renderers do not define language semantics.
6. Frontends do not silently invent knowledge.
7. Canonical identity survives representation changes.
8. Lossy transformations are explicit.
9. AI-assisted authoring preserves provenance.
10. Markdown remains supported but is not privileged as the canonical semantic form.

## Status

Accepted.

This ADR establishes MSL as a multi-surface semantic language with explicit frontend, AST, compiler, KIR, and renderer boundaries.

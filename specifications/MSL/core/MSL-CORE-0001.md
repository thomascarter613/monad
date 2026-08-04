---

artifact:
id: MSL-CORE-0001
type: knowledge.specification
namespace: monad

metadata:
title: Monad Specification Language Vision
version: 0.1.0
status: draft
created: 2026-08-03
authors:
- Monad Architecture Team
tags:
- msl
- specification-language
- knowledge-compiler
- foundational
- architecture

relationships:
depends_on:
- ADR-0001
- ADR-0002
- MKE-CORE-0001
- MKE-CORE-0002
references:
- MKE-CORE-0003
- MKE-CORE-0004
- MKE-CORE-0005
enables:
- MSL-CORE-0002
- MSL-CORE-0003
- MSL-CORE-0004
- MSL-CORE-0005
- MSL-CORE-0006
- MSL-CORE-0007
- MSL-CORE-0008
- MSL-CORE-0009
- MSL-CORE-0010
- KIR-CORE
- MSC-CORE

compilation:
language: msl-markdown
language_version: bootstrap
status: bootstrap
---

# MSL-CORE-0001 — Monad Specification Language Vision

## 1. Purpose

This specification defines the vision, purpose, principles, scope, and architectural role of the Monad Specification Language.

The Monad Specification Language, abbreviated **MSL**, is the author-facing language used to express structured engineering knowledge within the Monad ecosystem.

MSL exists to transform human intent, design reasoning, requirements, constraints, and system behavior into specifications that are simultaneously:

* understandable by humans;
* processable by machines;
* traceable across their complete lifecycle;
* compilable into a normalized knowledge representation;
* suitable for validation, analysis, planning, generation, and evolution.

MSL is a foundational language of the Monad ecosystem.

It is not merely a document format.

It is the primary means through which humans, AI systems, and engineering tools communicate authoritative intent to the Monad Specification Compiler.

---

## 2. Context

Software engineering knowledge is traditionally distributed across many disconnected formats and systems.

Examples include:

* product requirements;
* user stories;
* design documents;
* architecture diagrams;
* source code;
* test suites;
* issue trackers;
* deployment manifests;
* operational runbooks;
* chat conversations;
* emails;
* architectural decision records;
* project plans;
* undocumented assumptions.

These artifacts frequently overlap, contradict one another, or become outdated independently.

The absence of a common semantic model causes several recurring failures:

* requirements drift away from implementation;
* tests validate only part of the intended behavior;
* architectural decisions lose their context;
* documentation becomes stale;
* AI tools receive incomplete or contradictory information;
* repository history records changes without preserving intent;
* project knowledge becomes dependent on individual memory;
* generators rely on fragile templates rather than formal semantics.

Monad requires a language capable of expressing engineering knowledge with enough structure to support deterministic tooling while remaining usable by humans.

MSL provides that language.

---

## 3. Vision

The vision of MSL is:

> Engineering knowledge should be authored once, compiled into a trusted internal representation, and projected into every artifact needed to design, build, verify, operate, explain, and evolve a software system.

Under this model, a specification is not passive documentation.

It is an executable knowledge artifact.

A valid MSL specification may contribute to the generation or validation of:

* architecture models;
* implementation plans;
* source code;
* test cases;
* acceptance criteria;
* API contracts;
* data schemas;
* infrastructure definitions;
* documentation;
* diagrams;
* operational procedures;
* project backlogs;
* compliance evidence;
* AI context packages;
* educational material;
* release artifacts.

MSL therefore serves as the bridge between human intent and machine-operable engineering knowledge.

---

## 4. Architectural Role

MSL occupies the first formal layer of the Monad knowledge-compilation pipeline.

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
Target Artifacts and Operational Systems
```

Each layer has a distinct responsibility.

### 4.1 MSL

MSL expresses engineering knowledge in an author-facing form.

### 4.2 MSC

The Monad Specification Compiler parses, resolves, validates, and compiles MSL.

### 4.3 KIR

The Knowledge Intermediate Representation stores normalized, typed, language-independent knowledge.

### 4.4 MKE

The Monad Knowledge Engine persists, indexes, relates, queries, validates, and evolves compiled knowledge.

### 4.5 Engines and Backends

Monad engines consume KIR through MKE to produce plans, code, tests, documentation, diagrams, infrastructure, AI context, and other projections.

---

## 5. Core Principle

> MSL expresses intent; KIR represents meaning.

MSL is designed for authorship.

KIR is designed for computation.

The distinction is fundamental.

MSL may permit:

* explanatory prose;
* multiple surface syntaxes;
* human-oriented organization;
* comments;
* examples;
* local shorthand;
* editorial structure.

KIR must instead be:

* normalized;
* typed;
* deterministic;
* syntax-independent;
* graph-compatible;
* suitable for traversal and validation.

No MSL surface syntax is itself the canonical internal representation of Monad knowledge.

---

## 6. Primary Goals

MSL has the following primary goals.

### 6.1 Human Readability

Specifications must remain understandable to engineers, architects, product stakeholders, researchers, operators, and future contributors.

A specification that only machines can interpret fails to preserve human understanding.

### 6.2 Machine Processability

Specifications must contain sufficient structure for deterministic parsing, validation, reference resolution, compilation, and tooling.

A specification that only humans can interpret cannot serve as executable knowledge.

### 6.3 Semantic Precision

MSL must provide mechanisms to distinguish:

* normative requirements;
* explanations;
* examples;
* constraints;
* invariants;
* references;
* assumptions;
* acceptance criteria;
* implementation guidance;
* unresolved questions.

### 6.4 Traceability

Every compiled concept must remain traceable to its source specification and source location.

Generated artifacts must remain traceable through KIR back to the MSL knowledge from which they were derived.

### 6.5 Deterministic Compilation

Equivalent valid MSL input, under the same language and compiler versions, must produce semantically equivalent KIR.

### 6.6 Language Independence

MSL must describe software systems without requiring a specific implementation language, framework, operating system, database, cloud provider, or deployment platform.

### 6.7 Extensibility

MSL must support new domains, artifact types, constraints, annotations, and specialized vocabularies without invalidating the stable core language.

### 6.8 AI-Native Collaboration

MSL must support human and AI co-authorship while preserving provenance, review state, confidence, and authority boundaries.

### 6.9 Incremental Adoption

Projects must be able to adopt MSL gradually.

A repository should not require complete formalization before gaining value from specification identity, metadata, relationships, validation, and compilation.

### 6.10 Long-Term Evolution

MSL must support language versioning, specification migrations, deprecation, compatibility rules, and historical preservation.

---

## 7. Non-Goals

MSL is not intended to be all of the following.

### 7.1 A General-Purpose Programming Language

MSL is not designed to replace Go, Rust, Python, TypeScript, Java, or other implementation languages.

It may express behavior, constraints, and transformations, but it does not aim to provide unrestricted general-purpose computation.

### 7.2 A Single Serialization Format

MSL is not equivalent to Markdown, YAML, JSON, TOML, or any one surface syntax.

The bootstrap implementation uses Markdown with structured YAML metadata and machine-specification blocks.

Future surfaces may include:

* dedicated textual syntax;
* structured YAML or JSON;
* graphical editors;
* terminal interfaces;
* web forms;
* conversational authoring;
* imported domain formats.

All conforming surfaces must compile into compatible semantic structures.

### 7.3 A Replacement for Source Control

MSL artifacts should be versioned through Git or another appropriate source-control system.

MSL defines semantic evolution above source-control mechanics.

### 7.4 An Unrestricted Natural-Language Prompt Format

MSL may contain natural-language prose, but authoritative semantics cannot depend solely on ambiguous prompt interpretation.

### 7.5 An Autonomous Authority

MSL enables automation and AI assistance.

It does not remove human ownership, approval, governance, or accountability.

### 7.6 A Direct Code-Generation Template Language

MSL describes intent and knowledge.

Backend-specific templates may consume compiled knowledge, but MSL itself must not become tightly coupled to any one output format.

---

## 8. Design Principles

### 8.1 Knowledge Before Files

Filesystem paths organize source representations.

Artifact identity and compiled semantics define knowledge.

Moving a specification file must not change the identity of the specification it contains.

### 8.2 Explicit Over Implicit

Important semantics should be declared explicitly when ambiguity would affect correctness.

Examples include:

* artifact identity;
* normative authority;
* dependency relationships;
* lifecycle status;
* version constraints;
* acceptance criteria;
* invariants;
* ownership;
* provenance.

### 8.3 Progressive Formalization

MSL should permit a continuum from exploratory knowledge to highly formal specifications.

```text
Idea
    ↓
Narrative Draft
    ↓
Structured Specification
    ↓
Normative Requirements
    ↓
Machine Constraints
    ↓
Executable Conformance
```

Early-stage work may remain partially formal.

Production-critical knowledge may require stronger conformance.

### 8.4 Separation of Normative and Informative Content

MSL must distinguish authoritative requirements from explanatory material.

Normative content defines what conforming systems must do.

Informative content helps humans understand why and how.

### 8.5 Stable Identity, Evolving Content

A specification may evolve through versions while preserving its canonical artifact identity.

### 8.6 Traceable Derivation

Every generated or transformed artifact must retain its derivation chain.

### 8.7 Local-First Operation

The core language, parser, validator, and compiler must be usable without requiring cloud services.

### 8.8 Deterministic Core, Assisted Edge

Core parsing, type checking, validation, and compilation should be deterministic.

AI systems may assist with:

* drafting;
* classification;
* relationship discovery;
* migration;
* summarization;
* diagnostics;
* candidate generation.

AI assistance must not silently redefine authoritative semantics.

### 8.9 Composable Knowledge

Specifications should be capable of importing, extending, constraining, and relating to other specifications without requiring monolithic documents.

### 8.10 Diagnostics as a Language Feature

A useful specification language must explain failures precisely.

Diagnostics are not incidental compiler messages.

They are part of the language contract.

---

## 9. Intended Authors

MSL is intended to support several author classes.

### 9.1 Human Engineers

Engineers may author architecture, interfaces, requirements, invariants, implementation constraints, and acceptance criteria.

### 9.2 Product and Domain Experts

Domain experts may author outcomes, policies, workflows, terminology, and business rules without needing to write implementation code.

### 9.3 AI Systems

AI agents may draft, transform, analyze, and propose MSL artifacts.

AI-produced content must preserve provenance and applicable confidence or review state.

### 9.4 Generators and Importers

Tools may produce MSL from:

* OpenAPI;
* AsyncAPI;
* database schemas;
* existing source code;
* issue trackers;
* infrastructure definitions;
* diagrams;
* legacy documentation;
* interactive configuration sessions.

### 9.5 Monad Itself

Monad must eventually use MSL to specify its own language, compiler, runtime, engines, interfaces, workflows, and publications.

This self-hosting objective is central to the architecture.

---

## 10. Knowledge Domains

MSL is intended to express knowledge across the full software-development lifecycle.

Initial domains include:

* vision and goals;
* stakeholder needs;
* requirements;
* domain models;
* architecture;
* interfaces;
* behavior;
* data;
* security;
* privacy;
* governance;
* testing;
* operations;
* infrastructure;
* delivery;
* documentation;
* publications;
* AI agents;
* workflows;
* generators;
* migrations;
* compliance;
* project planning.

Domain-specific extensions may introduce specialized terms and constraints while compiling into the common KIR foundation.

---

## 11. Specification Artifact Model

An MSL specification is a specialized Monad artifact.

At minimum, a specification contains:

```text
Specification

├── Identity
├── Metadata
├── Lifecycle
├── Provenance
├── Relationships
├── Human-Readable Content
├── Normative Requirements
├── Machine Specification
├── Invariants
├── Diagnostics
├── Acceptance Criteria
└── Evolution Information
```

Not every field must be present at every maturity level.

Conformance profiles will define required subsets.

---

## 12. Surface Syntax Strategy

The initial MSL surface syntax is named:

```text
msl-markdown
```

It consists of:

* Markdown narrative structure;
* YAML front matter;
* normative requirement sections;
* fenced machine-specification blocks;
* fenced invariant blocks;
* acceptance criteria;
* valid and invalid conformance examples.

This syntax is intentionally transitional.

Its purpose is to allow immediate adoption while the dedicated compiler architecture is defined.

Future surface syntaxes may coexist.

A conforming compiler frontend must map each syntax into the same semantic model.

---

## 13. Compilation Model

An MSL implementation is expected to process specifications through the following conceptual stages:

```text
Source Discovery
    ↓
Decoding
    ↓
Lexical and Structural Parsing
    ↓
AST Construction
    ↓
Identity Registration
    ↓
Reference Resolution
    ↓
Type and Constraint Checking
    ↓
Semantic Validation
    ↓
Normalization
    ↓
KIR Emission
    ↓
Knowledge Graph Integration
```

Compilation may operate on:

* a single specification;
* a specification package;
* a series;
* a repository;
* a multi-repository workspace;
* a selected dependency graph.

---

## 14. Semantic Expectations

MSL must eventually support semantic representation of at least:

* declarations;
* entities;
* fields;
* types;
* constraints;
* relationships;
* references;
* requirements;
* invariants;
* behaviors;
* states;
* transitions;
* policies;
* acceptance criteria;
* diagnostics;
* examples;
* extensions;
* provenance;
* lifecycle;
* version compatibility.

The precise syntax and type rules are defined by later MSL specifications.

---

## 15. Normative Authority

Not all specification content has equal authority.

MSL must distinguish at least the following content classes:

### 15.1 Normative

Defines mandatory or permitted behavior.

Examples use:

* MUST;
* MUST NOT;
* SHOULD;
* SHOULD NOT;
* MAY.

### 15.2 Informative

Provides explanation, rationale, examples, commentary, or background.

### 15.3 Machine-Normative

Defines structured constraints that a compiler or validator can enforce directly.

### 15.4 Provisional

Represents unresolved, experimental, or bootstrap semantics.

### 15.5 Deprecated

Remains available for compatibility or historical understanding but should not govern new work.

---

## 16. Conformance Model

MSL conformance applies at multiple levels.

### 16.1 Document Conformance

Whether a source document satisfies structural and metadata requirements.

### 16.2 Language Conformance

Whether syntax and semantic constructs are valid for a declared MSL version.

### 16.3 Specification Conformance

Whether a specification satisfies its selected profile and domain rules.

### 16.4 Implementation Conformance

Whether an implementation satisfies the normative requirements and acceptance criteria defined by compiled specifications.

### 16.5 Corpus Conformance

Whether a collection of specifications has resolvable dependencies, consistent identities, compatible versions, and valid relationships.

---

## 17. Trust and Provenance

Every MSL artifact must be capable of preserving:

* original author;
* contributing authors;
* AI contributors;
* source inputs;
* creation method;
* creation time;
* modifications;
* review history;
* approval state;
* compiler version;
* language version;
* migration history;
* validation status.

Generated KIR must retain traceability to source locations.

AI-derived specifications must not be represented as human-authored unless explicitly reviewed and adopted by a human authority.

---

## 18. Security Principles

MSL tooling must account for the fact that specifications may influence generated code, infrastructure, policies, and AI actions.

Implementations must consider:

* malicious imported specifications;
* unsafe machine-specification expressions;
* unauthorized references;
* sensitive-data leakage;
* prompt injection in informative prose;
* extension abuse;
* untrusted generators;
* dependency substitution;
* compiler-resource exhaustion;
* misleading provenance;
* unauthorized lifecycle transitions.

The core language should favor declarative, constrained semantics over unrestricted executable scripting.

---

## 19. Bootstrap Strategy

Monad cannot initially compile its own specification corpus because the language, compiler, and KIR do not yet exist.

The bootstrap strategy is therefore:

1. author initial MSL specifications using `msl-markdown`;
2. maintain the Specification Registry manually;
3. define MSL semantics;
4. define KIR;
5. define MSC;
6. implement a minimal parser and validator;
7. migrate pre-normative MKE specifications;
8. compile the migrated corpus;
9. generate the registry from compiled knowledge;
10. progressively self-host Monad specifications.

The bootstrap process must remain documented and reproducible.

---

## 20. Self-Hosting Goal

MSL reaches an important maturity milestone when:

* the MSL language is specified in MSL;
* MSC can compile the MSL specification corpus;
* KIR schemas are produced from compiled specifications;
* conformance tests are generated from MSL acceptance criteria;
* the registry is generated rather than manually maintained;
* changes to MSL are validated using the language's own rules.

Full self-hosting may occur incrementally.

Monad must not claim self-hosting before the complete dependency chain is reproducible.

---

## 21. Interoperability

MSL should support mapping to and from established engineering formats where practical.

Potential integrations include:

* OpenAPI;
* AsyncAPI;
* JSON Schema;
* Protocol Buffers;
* GraphQL schemas;
* Smithy;
* Terraform;
* Kubernetes resources;
* CUE;
* Dhall;
* Rego;
* Gherkin;
* SPDX;
* CycloneDX;
* SARIF;
* Architecture Decision Records;
* issue and backlog formats.

These mappings must preserve provenance and clearly identify information loss when round-trip equivalence is impossible.

---

## 22. Success Criteria

MSL is successful when the Monad ecosystem can:

* express engineering intent clearly;
* compile specifications deterministically;
* detect invalid or contradictory knowledge;
* trace generated artifacts to authoritative sources;
* support human and AI co-authorship safely;
* generate validators and conformance tests;
* enable multiple implementation and documentation backends;
* migrate specifications across language versions;
* operate locally;
* progressively specify and build Monad itself.

---

## 23. Normative Requirements

### MSL-VISION-REQ-001

MSL **MUST** distinguish author-facing syntax from canonical internal representation.

### MSL-VISION-REQ-002

MSL source artifacts **MUST** support stable identity independent of filesystem location.

### MSL-VISION-REQ-003

MSL **MUST** support explicit normative requirements.

### MSL-VISION-REQ-004

MSL **MUST** support machine-processable semantic content.

### MSL-VISION-REQ-005

MSL compilation **MUST** preserve traceability from KIR elements to source artifacts and source locations.

### MSL-VISION-REQ-006

MSL **MUST** support versioned language semantics.

### MSL-VISION-REQ-007

MSL tooling **MUST** produce deterministic diagnostics for deterministic validation failures.

### MSL-VISION-REQ-008

MSL **MUST NOT** require cloud services for core parsing, validation, or compilation.

### MSL-VISION-REQ-009

MSL **MUST** support human-readable representations.

### MSL-VISION-REQ-010

MSL **MUST** support extension without permitting extensions to silently redefine stable core semantics.

### MSL-VISION-REQ-011

MSL **MUST** preserve provenance for human-authored, AI-authored, imported, migrated, and generated content.

### MSL-VISION-REQ-012

MSL **SHOULD** support progressive formalization.

### MSL-VISION-REQ-013

MSL **SHOULD** support multiple surface syntaxes compiling to a common semantic model.

### MSL-VISION-REQ-014

MSL **SHOULD** support incremental compilation and validation.

### MSL-VISION-REQ-015

MSL **SHOULD** support interoperability with established engineering formats.

### MSL-VISION-REQ-016

MSL **MAY** support conversational, graphical, and interactive authoring interfaces.

### MSL-VISION-REQ-017

AI assistance **MUST NOT** silently grant authoritative lifecycle or approval status to generated content.

### MSL-VISION-REQ-018

Generated artifacts **MUST** preserve derivation relationships to the specifications and compiled knowledge that produced them.

---

## 24. Conceptual Model

```text
MSL Source Artifact

├── Human-readable narrative
├── Structured metadata
├── Normative requirements
├── Machine specification
├── Constraints and invariants
├── Relationships and references
├── Acceptance criteria
├── Conformance examples
├── Provenance
└── Evolution metadata
          │
          ▼
Monad Specification Compiler
          │
          ▼
Knowledge Intermediate Representation
          │
          ▼
Monad Knowledge Engine
          │
          ├── Query
          ├── Validate
          ├── Plan
          ├── Generate
          ├── Explain
          ├── Publish
          └── Supply AI context
```

---

## 25. Machine Specification

The machine specification in this bootstrap document is provisional.

```yaml
machine_spec:
  kind: language_vision
  language:
    id: MSL
    name: Monad Specification Language
    role: author_facing_engineering_knowledge_language

  pipeline:
    input:
      - human_intent
      - imported_engineering_artifacts
      - generated_knowledge

    compiler: MSC
    output: KIR
    runtime: MKE

  properties:
    human_readable: required
    machine_processable: required
    deterministic_compilation: required
    source_traceability: required
    stable_identity: required
    local_first: required
    multi_surface_syntax: supported
    progressive_formalization: supported
    ai_coauthoring: supported_with_provenance

  initial_surface:
    id: msl-markdown
    components:
      - yaml_frontmatter
      - markdown_sections
      - normative_requirements
      - machine_spec_blocks
      - invariant_blocks
      - acceptance_criteria
      - conformance_examples

  authority_classes:
    - normative
    - informative
    - machine_normative
    - provisional
    - deprecated

  conformance_levels:
    - document
    - language
    - specification
    - implementation
    - corpus
```

---

## 26. Invariants

```yaml
invariants:
  - id: MSL-VISION-INV-001
    expression: surface_syntax != canonical_internal_representation
    description: No surface syntax is the canonical semantic representation.

  - id: MSL-VISION-INV-002
    expression: compiler_output == KIR
    description: Conforming MSC compilation produces KIR.

  - id: MSL-VISION-INV-003
    expression: kir_elements.traceable_to_source == true
    description: Compiled knowledge remains traceable to source specifications.

  - id: MSL-VISION-INV-004
    expression: core_compilation.requires_cloud == false
    description: Core compilation remains local-first.

  - id: MSL-VISION-INV-005
    expression: ai_authorship.provenance_required == true
    description: AI contributions retain explicit provenance.

  - id: MSL-VISION-INV-006
    expression: artifact_identity.depends_on_path == false
    description: Artifact identity is independent of source location.

  - id: MSL-VISION-INV-007
    expression: extension.redefines_core_semantics == false
    description: Extensions cannot silently redefine stable core language behavior.
```

---

## 27. Diagnostics

The following bootstrap diagnostics are reserved.

### MSL0001 — Missing Artifact Identity

The specification does not declare a canonical artifact identifier.

### MSL0002 — Unsupported Language Version

The declared MSL language version is not supported by the compiler.

### MSL0003 — Ambiguous Normative Content

A requirement appears authoritative but is not represented as normative content.

### MSL0004 — Missing Provenance

Required authorship or derivation information is absent.

### MSL0005 — Invalid Compilation Target

The specification declares an unsupported or incompatible compilation target.

### MSL0006 — Unresolved Reference

A referenced specification or artifact cannot be resolved.

### MSL0007 — Core Semantic Override

An extension attempts to redefine protected core semantics.

### MSL0008 — Untraceable Generated Knowledge

Generated semantic content cannot be traced to its source artifact or transformation.

### MSL0009 — Unauthorized Authority Transition

AI-generated or unreviewed content claims an authoritative lifecycle state without required approval evidence.

### MSL0010 — Cloud-Only Core Requirement

A core language construct or compiler phase improperly requires a remote service.

---

## 28. Acceptance Criteria

MSL-CORE-0001 conforms to this vision when all of the following are true:

1. The architectural roles of MSL, MSC, KIR, and MKE are explicitly distinct.
2. MSL is defined as an author-facing language rather than a canonical storage model.
3. The initial `msl-markdown` surface syntax is identified as provisional.
4. Human-readable and machine-processable content are both required.
5. Stable identity, provenance, traceability, deterministic compilation, and local-first operation are normative requirements.
6. AI-assisted authorship is supported without transferring unreviewed authority.
7. The bootstrap and self-hosting strategies are documented.
8. The document defines initial machine-readable semantics, invariants, and diagnostics.
9. Later MSL specifications can extend this document without contradicting its protected invariants.
10. Existing pre-normative MKE specifications can be migrated under this vision without losing their identity or history.

---

## 29. Conformance Examples

### 29.1 Valid Conceptual Example

```yaml
artifact:
  id: EXAMPLE-SPEC-0001
  type: knowledge.specification
  namespace: example

metadata:
  title: Example Authentication Requirement
  version: 0.1.0
  status: draft

compilation:
  language: msl-markdown
  language_version: bootstrap
```

````markdown
## Normative Requirements

- The service MUST reject expired credentials.

## Machine Specification

```yaml
machine_spec:
  entity: authentication_service
  constraints:
    - credential.expired == false
````

## Acceptance Criteria

* An expired credential produces an authentication failure.

````

This example is valid in principle because it combines human-readable intent, normative language, machine-processable constraints, and observable acceptance criteria.

### 29.2 Invalid Identity Example

```yaml
metadata:
  title: Authentication Notes
````

This is invalid as a conforming specification because no stable artifact identity is declared.

Expected diagnostic:

```text
MSL0001: missing artifact identity
```

### 29.3 Invalid Authority Example

```yaml
provenance:
  created_by:
    type: ai

metadata:
  status: approved
```

This is invalid when no human approval evidence or authorized automated governance process exists.

Expected diagnostic:

```text
MSL0009: unauthorized authority transition
```

### 29.4 Invalid Surface Coupling Example

```yaml
machine_spec:
  canonical_representation: markdown_heading_order
```

This violates the separation between surface syntax and canonical semantic representation.

---

## 30. Security and Trust Considerations

MSL specifications may influence powerful downstream systems.

A malicious or compromised specification could attempt to:

* generate insecure code;
* disable tests;
* alter infrastructure;
* broaden permissions;
* conceal provenance;
* redirect dependencies;
* manipulate AI context;
* override governance rules;
* embed hostile instructions in prose.

Therefore:

* machine-executable semantics must be constrained;
* imported artifacts must be treated as untrusted until validated;
* source provenance must be preserved;
* authority transitions must be explicit;
* extensions must be namespaced;
* compiler diagnostics must expose unsafe constructs;
* downstream engines must enforce their own security policies;
* informative prose must not automatically override machine-normative constraints;
* AI systems must treat embedded instructions as content unless explicitly authorized as executable policy.

---

## 31. Evolution and Compatibility

MSL will evolve through versioned language releases.

Language evolution must account for:

* syntax compatibility;
* semantic compatibility;
* migration tooling;
* deprecated constructs;
* KIR compatibility;
* compiler feature negotiation;
* extension compatibility;
* corpus-wide impact analysis.

A future MSL version may add new syntax without changing the meaning of existing valid specifications.

Breaking semantic changes require:

* a new language version;
* migration rules;
* compatibility diagnostics;
* preserved source history;
* documented KIR transformation effects.

The bootstrap `msl-markdown` language version is not stable and must not be treated as a permanent compatibility guarantee.

---

## 32. Open Questions

The following questions remain open and are delegated to later MSL, KIR, and MSC specifications:

1. What is the canonical specification AST?
2. Which constructs belong in the core language?
3. How are domain extensions registered?
4. What type system does MSL require?
5. How expressive may invariants be?
6. Which expressions are safe for deterministic local evaluation?
7. How are source locations encoded in KIR?
8. How are cross-repository references resolved?
9. How are specification packages versioned?
10. How are authority and approval represented?
11. How are partial and unresolved specifications compiled?
12. How does the compiler distinguish errors from tolerated incompleteness?
13. Which compatibility guarantees apply before MSL 1.0?
14. How are natural-language statements linked to machine-normative equivalents?
15. What is the minimum viable self-hosting subset?

---

## 33. Related Specifications

This document is extended by:

| ID            | Title                               |
| ------------- | ----------------------------------- |
| MSL-CORE-0002 | Specification Document Model        |
| MSL-CORE-0003 | Normative Requirement Language      |
| MSL-CORE-0004 | Metadata and Identity Model         |
| MSL-CORE-0005 | Structural Grammar                  |
| MSL-CORE-0006 | Machine Specification Blocks        |
| MSL-CORE-0007 | Type and Constraint System          |
| MSL-CORE-0008 | Relationship and Reference Syntax   |
| MSL-CORE-0009 | Conformance and Acceptance Criteria |
| MSL-CORE-0010 | Versioning and Evolution            |

It also informs:

| Series   | Role                                         |
| -------- | -------------------------------------------- |
| KIR-CORE | Defines normalized compiler output           |
| MSC-CORE | Defines parsing, validation, and compilation |
| MKE      | Consumes and operates on compiled knowledge  |
| PUB      | Publishes human-facing projections           |
| CLI      | Exposes language and compiler operations     |

---

## Status

Draft.

This document establishes the constitutional vision of the Monad Specification Language.

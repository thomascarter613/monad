---
id: "MSL-CORE-0009"
title: "Document and Embedded Language Architecture"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 9
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "document-language"
  - "embedded-languages"
  - "language-composition"
  - "parser-dispatch"
  - "semantic-regions"
  - "language-platform"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSL-CORE-0010"
  - "MSL-DOCUMENT"
  - "MSL-TYPE"
  - "MSL-EXPR"
  - "MSL-CONSTRAINT"
  - "MSL-POLICY"
  - "MSL-WORKFLOW"
  - "MSL-STATE"
  - "MSL-QUERY"
  - "MSL-PATTERN"
  - "MSL-TRANSFORM"
  - "MSL-PACKAGE"
  - "MSL-FRONTEND"
  - "MSL-CONFORMANCE"
  - "MSC-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0009 — Document and Embedded Language Architecture

## 1. Purpose

This specification defines the architecture of the MSL Document Language and its composition with embedded and referenced MSL-family languages.

It establishes:

* the role of the Document Language;
* document-level semantic structure;
* language-region discovery;
* embedded-language declarations;
* language dispatch;
* inline and external composition;
* authority inheritance;
* lifecycle inheritance;
* source mapping;
* parser boundaries;
* embedded AST integration;
* diagnostics;
* capability negotiation;
* unknown-language behavior;
* cross-language references;
* formatting and rendering boundaries;
* package and module interaction;
* security and trust constraints;
* language-family evolution.

The Document Language is the primary host language for human-readable MSL specifications.

It is not the complete MSL platform.

---

## 2. Context

Monad specifications must combine several kinds of engineering knowledge.

A single specification may contain:

* narrative explanation;
* artifact metadata;
* normative requirements;
* type declarations;
* constraints;
* invariants;
* state machines;
* workflows;
* policies;
* queries;
* transformation rules;
* conformance examples;
* diagrams;
* references to external semantic modules.

These forms do not share one appropriate grammar.

Human-facing narrative benefits from document-oriented syntax.

Constraints and types require precise expression grammars.

Workflows and state machines benefit from dedicated structural forms.

Queries and transformations require specialized safety and execution models.

The MSL Document Language therefore acts as a host and composition layer rather than attempting to define every semantic construct itself.

---

## 3. Scope

This specification defines:

* document-language responsibilities;
* semantic sections;
* embedded-language regions;
* referenced-language units;
* language declarations;
* language dispatch;
* parser coordination;
* authority propagation;
* lifecycle propagation;
* provenance;
* source spans;
* document AST composition;
* embedded AST composition;
* language manifests;
* language capability requirements;
* unknown embedded languages;
* opaque preservation;
* diagnostics;
* conformance expectations;
* rendering boundaries.

This specification does not fully define:

* the concrete `msl-markdown` grammar;
* complete type syntax;
* expression syntax;
* constraint semantics;
* workflow syntax;
* policy evaluation;
* query semantics;
* transformation execution;
* language-server protocols;
* KIR schemas;
* compiler implementation.

---

## 4. Non-Goals

The Document Language does not:

* provide one grammar for every MSL-family language;
* make Markdown the canonical semantic representation;
* permit arbitrary executable code;
* allow embedded syntax to redefine host semantics;
* automatically make embedded content authoritative;
* require all embedded content to be inline;
* require all languages to share one parser;
* guarantee lossless rendering into every document format;
* replace package and module systems;
* make presentation order canonical unless explicitly declared.

---

## 5. Core Principle

> The Document Language organizes engineering knowledge; specialized languages define specialized semantics.

The host document provides:

* artifact identity;
* narrative organization;
* semantic-section boundaries;
* authority context;
* lifecycle context;
* provenance context;
* language-region declarations;
* composition;
* references;
* acceptance and publication structure.

Embedded languages provide:

* types;
* expressions;
* constraints;
* policies;
* workflows;
* state machines;
* queries;
* transformations;
* other specialized semantics.

---

## 6. Architectural Position

```text
Document Source
    ↓
Document Frontend
    ↓
Document Surface AST
    ↓
Language Region Discovery
    ↓
Embedded Language Dispatch
    ↓
Embedded Surface ASTs
    ↓
Host and Embedded Normalization
    ↓
Canonical MSL AST
    ↓
Semantic Compilation
    ↓
KIR
```

A document may also reference separately authored language units:

```text
Document Source
    ↓
Reference to Constraint Module
    ↓
Constraint Frontend
    ↓
Constraint Surface AST
    ↓
Canonical MSL AST Integration
```

---

## 7. Terminology

### 7.1 Document Language

The MSL-family language used to structure specifications, narrative, semantic regions, imports, metadata, and composition.

### 7.2 Host Document

A source artifact authored using a Document Language frontend.

### 7.3 Embedded Language

A registered MSL-family language hosted within a document region.

### 7.4 Embedded Region

A bounded source region assigned to an embedded language.

### 7.5 Referenced Language Unit

A separately stored artifact or module written in an MSL-family language and referenced by a host document.

### 7.6 Language Declaration

A declaration identifying a language, version, semantic role, and parser expectations.

### 7.7 Language Dispatch

The process of selecting and invoking the correct frontend for an embedded or referenced language unit.

### 7.8 Host Context

Metadata, authority, lifecycle, namespace, provenance, and profile information supplied by the containing document.

### 7.9 Region Context

Context applying specifically to one embedded region.

### 7.10 Semantic Role

The purpose served by a language region.

Examples:

* constraint;
* invariant;
* type declaration;
* policy;
* workflow;
* query;
* transformation;
* example;
* conformance fixture.

### 7.11 Language Manifest

A registered description of one MSL-family language.

### 7.12 Opaque Embedded Region

An embedded region preserved without semantic interpretation because the required language frontend is unavailable or disabled.

---

## 8. Document Language Responsibilities

The Document Language is responsible for representing:

* specification identity;
* metadata;
* lifecycle;
* ownership;
* provenance;
* compilation declarations;
* purpose;
* context;
* scope;
* non-goals;
* terminology;
* narrative explanation;
* normative requirement declarations;
* embedded-language regions;
* semantic references;
* acceptance criteria;
* examples;
* diagnostics;
* security considerations;
* evolution information;
* publication structure.

The Document Language must not duplicate the full grammar or semantic implementation of every embedded language.

---

## 9. Document Semantic Model

A logical document-language specification contains:

```text
DocumentSpecification

├── Artifact Declaration
├── Metadata
├── Compilation Declaration
├── Language Dependencies
├── Namespace Context
├── Lifecycle
├── Authority
├── Provenance
├── Narrative Sections
├── Requirement Declarations
├── Embedded Regions
├── Referenced Language Units
├── Relationships
├── Acceptance Criteria
├── Conformance Examples
├── Diagnostics
├── Evolution Information
└── Source Map
```

---

## 10. Semantic Sections

The Document Language recognizes semantic section roles independently from presentation headings.

Initial roles include:

* purpose;
* context;
* scope;
* non-goals;
* terminology;
* conceptual model;
* normative requirements;
* machine semantics;
* invariants;
* constraints;
* acceptance criteria;
* conformance examples;
* diagnostics;
* security considerations;
* evolution and compatibility;
* open questions;
* related specifications;
* status.

A concrete frontend may map headings, fields, forms, or editor nodes to these roles.

---

## 11. Language Family

The initial conceptual MSL language family includes:

```text
MSL Platform

├── document
├── metadata
├── type
├── expression
├── constraint
├── policy
├── workflow
├── state
├── query
├── pattern
├── transform
├── package
└── extension languages
```

The initial implementation is not required to implement every language.

Unsupported required languages must remain explicit.

---

## 12. Language Identity

Every MSL-family language must have stable identity.

Conceptual examples:

```text
msl.document
msl.type
msl.expression
msl.constraint
msl.policy
msl.workflow
msl.state
msl.query
msl.pattern
msl.transform
msl.package
```

Language identity must remain distinct from:

* concrete syntax;
* frontend identity;
* parser identity;
* language version;
* surface AST version;
* canonical AST version;
* extension identity.

---

## 13. Language Version

Each language evolves independently.

A document may target several language versions:

```yaml
languages:
  document: 0.1.0
  type: 0.1.0
  expression: 0.1.0
  constraint: 0.1.0
```

A host document must identify its Document Language version.

Each embedded region must identify or inherit a compatible embedded-language version.

---

## 14. Language Manifest

A registered language manifest conceptually contains:

```text
LanguageManifest

├── language_id
├── language_version
├── family
├── role
├── syntax_ids
├── frontend_ids
├── surface_ast_schema
├── canonical_mappings
├── authority_capabilities
├── lifecycle_capabilities
├── execution_class
├── imports
├── extensions
├── diagnostics
├── compatibility
└── trust
```

---

## 15. Language Execution Classes

Initial execution classes are:

```text
descriptive
declarative
query_only
constraint_evaluation
transformation
effectful
```

### 15.1 Descriptive

Represents knowledge without evaluation.

### 15.2 Declarative

Defines desired structure or behavior without unrestricted execution.

### 15.3 Query-Only

Reads permitted knowledge without mutation.

### 15.4 Constraint Evaluation

Evaluates bounded predicates.

### 15.5 Transformation

Produces derived structures under explicit controls.

### 15.6 Effectful

May cause external changes.

Effectful languages must not belong to unrestricted core execution by default.

---

## 16. Embedded Region Model

An embedded region conceptually contains:

```text
EmbeddedRegion

├── region_id
├── language_id
├── language_version
├── syntax_id
├── semantic_role
├── authority
├── lifecycle
├── namespace_context
├── source_span
├── source_payload
├── parser_configuration
├── extension_context
├── provenance
├── parse_result
├── diagnostics
└── loss_state
```

---

## 17. Region Identity

Every embedded region must have compiler-visible identity.

Durably referenced regions should have stable semantic identity.

Region identity supports:

* diagnostics;
* incremental parsing;
* editor navigation;
* conformance fixtures;
* source mapping;
* language-server operations;
* transformation lineage.

---

## 18. Region Discovery

A Document Language frontend identifies embedded regions through frontend-specific mechanisms.

Possible mechanisms include:

* fenced blocks;
* typed fields;
* explicit directives;
* semantic editor nodes;
* inline annotations;
* referenced modules;
* attachment manifests;
* generated region declarations.

Discovery must preserve:

* exact source span;
* host section;
* semantic role;
* declared language;
* declared version;
* authority context.

---

## 19. Explicit Language Declaration

A region should explicitly identify its language when ambiguity is possible.

Conceptual example:

```yaml
embedded:
  language: msl.constraint
  version: 0.1.0
  role: invariant
```

A concrete syntax may encode this through a block label or structured field.

---

## 20. Inferred Language Declaration

A language may be inferred only when:

* the host syntax defines one deterministic language for the region;
* the semantic role has one registered default;
* the active profile permits inference;
* no conflicting declaration exists.

The inferred language and inference source must remain inspectable.

---

## 21. Language Dispatch

Language dispatch conceptually performs:

```text
Embedded Region
    ↓
Read Language Declaration
    ↓
Resolve Language Manifest
    ↓
Select Compatible Frontend
    ↓
Negotiate Capabilities
    ↓
Parse Region
    ↓
Produce Embedded Surface AST
```

Dispatch must be deterministic under equivalent registry and configuration state.

---

## 22. Frontend Selection

A language may have multiple frontends.

Selection may consider:

* syntax ID;
* language version;
* profile;
* trust;
* local availability;
* source medium;
* required capabilities;
* extension support;
* strictness.

The selected frontend and version must be preserved in provenance.

---

## 23. Capability Negotiation

Before parsing an embedded region, the host must confirm that the selected frontend supports required capabilities.

Capabilities may include:

* read;
* write;
* source preservation;
* source maps;
* partial parsing;
* diagnostics;
* extension support;
* deterministic evaluation;
* formatter support;
* semantic normalization.

A frontend lacking required machine-normative capability must not parse the region as though it were fully supported.

---

## 24. Embedded Surface AST

Each embedded language produces its own surface AST.

Examples:

```text
ConstraintExpressionNode
TypeDeclarationNode
WorkflowStepNode
StateTransitionNode
PolicyRuleNode
QueryPatternNode
TransformationRuleNode
```

The host Document AST retains the relationship between:

* host region;
* language manifest;
* embedded surface AST root;
* source span;
* authority context;
* lifecycle context;
* diagnostics.

---

## 25. Host and Embedded AST Composition

The host document AST does not structurally absorb all embedded nodes as ordinary document children.

Conceptually:

```text
DocumentRegionNode
    hosts
EmbeddedAstRoot
```

The precise implementation may use:

* child links;
* side tables;
* foreign AST references;
* language-unit handles.

The language boundary must remain inspectable.

---

## 26. Canonical AST Integration

Embedded surface ASTs normalize into canonical MSL AST nodes.

Examples:

```text
Constraint Surface AST
    ↓
Canonical Constraint Nodes
```

```text
Workflow Surface AST
    ↓
Canonical Workflow and Behavior Nodes
```

```text
Type Surface AST
    ↓
Canonical Type Declaration Nodes
```

Canonical nodes must retain links to:

* embedded surface nodes;
* host region;
* host document;
* parser;
* normalizer;
* source span.

---

## 27. Inline Embedding

An inline embedded region exists physically inside the host source.

Advantages:

* local readability;
* colocated context;
* simple review;
* immediate provenance.

Risks:

* parser nesting;
* delimiter conflicts;
* large documents;
* formatter complexity;
* language-version mixing.

Inline regions should remain bounded and explicitly typed.

---

## 28. External Language Units

A host document may reference an external language artifact.

Examples:

```text
constraints/authentication.mslc
workflows/release.mslw
types/domain.mslt
```

External units may improve:

* reuse;
* independent testing;
* modularity;
* specialized editing;
* package composition.

The external artifact must have identity, version, provenance, and language declaration.

---

## 29. Embedded Versus Referenced Semantics

Inline and external forms may produce equivalent canonical semantics.

They differ in:

* source ownership;
* artifact identity;
* versioning;
* lifecycle;
* reuse;
* publication;
* caching;
* access control.

An external language unit is a first-class artifact.

An inline region is normally a semantic child of the host artifact unless separately identified.

---

## 30. Imports

A host document may import:

* language definitions;
* type modules;
* constraint modules;
* policies;
* workflows;
* namespaces;
* extensions;
* profiles.

Imports must identify:

* target identity;
* version constraint;
* import mode;
* alias;
* visibility;
* authority behavior;
* lifecycle behavior.

---

## 31. Import Modes

Initial import modes include:

```text
semantic
informative
type_only
constraint_only
policy_only
namespace
extension
conformance
```

Import mode determines which semantics become available.

An informative import must not become machine-normative merely because it contains executable-looking syntax.

---

## 32. Authority Inheritance

An embedded region may inherit authority from:

* host document;
* semantic section;
* requirement;
* machine-semantics section;
* explicit region declaration;
* imported policy;
* adoption workflow.

Inheritance must be explicit or deterministic.

The effective authority and its source must remain visible.

---

## 33. Authority Examples

A constraint block inside a machine-normative section may inherit:

```text
machine_normative
```

The same block inside a conformance example may inherit:

```text
example
```

A workflow generated by AI may remain:

```text
provisional
```

even when embedded in an approved specification, unless the workflow itself was reviewed and adopted.

---

## 34. Lifecycle Inheritance

Embedded regions may inherit lifecycle from the host artifact.

However, independently identified language units may have their own lifecycle.

Example:

```text
Host specification: approved
Referenced workflow module: draft
```

The compiler must preserve the mismatch and apply profile rules.

It must not silently promote the draft module.

---

## 35. Provenance

Every embedded region must preserve:

* host document identity;
* region identity;
* source span;
* language declaration;
* parser identity;
* parser version;
* normalizer identity;
* normalizer version;
* authority source;
* lifecycle source;
* actor or generator;
* transformation history.

---

## 36. Cross-Language References

One language may reference declarations from another.

Examples:

* constraint references a type;
* workflow references an operation;
* policy references a resource type;
* state transition references an event;
* query references an artifact class;
* transformation references a pattern.

Cross-language references must use shared identity and namespace rules.

---

## 37. Reference Compatibility

A cross-language reference must validate:

* target existence;
* target kind;
* visibility;
* version compatibility;
* authority compatibility where applicable;
* lifecycle compatibility;
* type compatibility;
* package availability.

A syntactically valid reference may still be semantically invalid.

---

## 38. Language Dependencies

A language may depend on another language.

Examples:

```text
Constraint Language depends on Expression Language.
Policy Language depends on Expression and Type Languages.
Workflow Language may depend on Expression and Type Languages.
Transformation Language may depend on Pattern and Expression Languages.
```

Language dependencies must be registered and versioned.

---

## 39. Dependency Closure

Before compiling a document, MSC must determine the required language dependency closure.

Example:

```text
Document
  → Constraint
      → Expression
      → Type
```

Unavailable required dependencies must block complete compilation.

---

## 40. Language Dependency Cycles

Language dependency cycles are prohibited unless explicitly supported by a versioned fixed-point or mutual-compilation model.

The bootstrap platform should prefer acyclic language dependencies.

---

## 41. Unknown Languages

When an embedded language is unknown, behavior depends on:

* authority;
* semantic role;
* compilation profile;
* required-for-compilation status;
* preservation capability.

Possible behavior:

* reject;
* preserve opaque;
* continue partially;
* preserve as informative;
* require extension installation;
* disable execution.

Unknown required machine-normative languages must block complete compilation.

---

## 42. Opaque Embedded Regions

An opaque embedded region must preserve:

* language ID;
* language version;
* syntax ID;
* raw source;
* region identity;
* host source span;
* semantic role;
* authority;
* lifecycle;
* provenance;
* required status.

Opaque preservation must not imply semantic validation.

---

## 43. Embedded Diagnostics

Embedded parsers produce language-specific diagnostics.

A host diagnostic view should preserve:

* embedded diagnostic ID;
* language identity;
* severity;
* region identity;
* embedded source location;
* mapped host source location;
* related canonical nodes;
* remediation.

The host must not rewrite diagnostics in ways that lose language identity.

---

## 44. Diagnostic Composition

Host and embedded diagnostics may relate.

Example:

```text
Document diagnostic:
Required invariant region failed to compile.

Caused by:
Constraint Language diagnostic:
Unknown type `ArtifactId`.
```

Diagnostic causality should remain inspectable.

---

## 45. Error Recovery

A host parser should recover around invalid embedded regions when possible.

An embedded parser may produce a partial embedded AST.

The host may continue parsing later sections.

Recovery must not represent failed machine-normative regions as successfully compiled.

---

## 46. Incremental Parsing

Editing one embedded region should not require reparsing unrelated language regions when boundaries remain stable.

Incremental parsing should use:

* region identity;
* source span;
* language version;
* parser version;
* region fingerprint;
* dependency fingerprint.

---

## 47. Region Fingerprints

A region fingerprint may include:

* normalized source;
* language ID;
* language version;
* syntax ID;
* parser configuration;
* active extensions;
* inherited authority;
* inherited namespace;
* dependency versions.

Presentation-only host changes should not invalidate embedded semantics when region content and context remain unchanged.

---

## 48. Formatting

Each language may define its own formatter.

The host formatter coordinates:

* block delimiters;
* indentation;
* region placement;
* surrounding whitespace;
* embedded formatter invocation.

The host formatter must not alter embedded semantics.

---

## 49. Rendering

A publication renderer may render embedded languages as:

* source code;
* tables;
* diagrams;
* prose explanations;
* interactive widgets;
* generated summaries.

Rendering must preserve semantic identity and authority.

A rendered explanation is not automatically authoritative source.

---

## 50. Semantic Editor Integration

A semantic editor may represent each language region through a specialized editor.

Example:

```text
Document editor
├── Narrative editor
├── Requirement editor
├── Constraint editor
├── Workflow editor
└── State-machine editor
```

The editor must preserve language boundaries and provenance.

---

## 51. AI Editing

AI systems may edit one language region without regenerating the entire document.

AI operations must identify:

* target region;
* language;
* requested semantic change;
* source context;
* generated AST changes;
* provenance;
* confirmation requirements.

AI-generated region changes remain provisional until adopted under applicable rules.

---

## 52. Language Extensions

Third parties may register additional MSL-family languages.

A language extension must define:

* language identity;
* version;
* semantic role;
* syntax;
* frontend;
* surface AST;
* normalization;
* canonical extensions;
* KIR lowering;
* execution class;
* security model;
* compatibility;
* conformance fixtures.

---

## 53. Core Semantic Protection

An embedded language must not:

* redefine artifact identity;
* redefine core authority classes;
* redefine lifecycle semantics;
* overwrite host provenance;
* bypass reference rules;
* silently grant approval;
* mutate unrelated document regions;
* gain ambient effects.

Core semantic interaction must occur through registered integration points.

---

## 54. Security Model

Embedded languages may introduce evaluation and execution risk.

Controls may include:

* parser sandboxing;
* evaluator sandboxing;
* resource limits;
* no ambient filesystem;
* no ambient network;
* deterministic execution;
* effect declarations;
* language allowlists;
* extension allowlists;
* signature verification;
* trust classification;
* static validation.

---

## 55. Effect Boundaries

Declarative or query languages must not gain effectful capabilities implicitly.

An effectful language must declare:

* possible effects;
* required permissions;
* execution environment;
* audit behavior;
* rollback or compensation where applicable;
* human authorization requirements.

The core specification compiler should not execute effectful regions during ordinary validation.

---

## 56. Language Registry

The language registry should support:

* language discovery;
* version resolution;
* frontend selection;
* parser loading;
* extension loading;
* compatibility checking;
* trust policy;
* conformance status;
* execution policy.

The registry must not allow identifier collisions silently.

---

## 57. Language Packages

A language implementation may be distributed as a package containing:

```text
Language Package

├── manifest
├── parser
├── formatter
├── surface AST schema
├── canonical mappings
├── diagnostics
├── language service
├── conformance fixtures
├── security declaration
└── license and provenance
```

Package details belong to later `MSL-PACKAGE` specifications.

---

## 58. Document Profiles

Document profiles may restrict which languages are permitted.

Examples:

```text
narrative
normative
machine
executable
security_review
publication
bootstrap
```

A narrative profile may forbid effectful or transformation languages.

A machine profile may require all machine-normative regions to compile.

---

## 59. Bootstrap Language Composition

The bootstrap `msl-markdown` frontend currently uses:

* YAML front matter;
* Markdown narrative;
* RFC-style normative requirements;
* YAML machine-specification blocks;
* YAML invariant blocks.

These YAML blocks are provisional embedded structures.

They should be treated as bootstrap syntax for future specialized languages.

They must not permanently define the final Constraint, Type, Policy, or Workflow Languages.

---

## 60. Normative Requirements

### MSL-COMPOSE-REQ-001

The MSL Document Language **MUST** remain distinct from specialized MSL-family languages.

### MSL-COMPOSE-REQ-002

The Document Language **MUST** support inline embedded regions, external language units, or both.

### MSL-COMPOSE-REQ-003

Every embedded region **MUST** have compiler-visible region identity.

### MSL-COMPOSE-REQ-004

Every embedded region **MUST** declare or permit deterministic resolution of its language identity.

### MSL-COMPOSE-REQ-005

Every embedded region **MUST** declare or inherit a compatible language version.

### MSL-COMPOSE-REQ-006

Every embedded region **MUST** declare or inherit a semantic role.

### MSL-COMPOSE-REQ-007

Every embedded region **MUST** preserve host source location and region provenance.

### MSL-COMPOSE-REQ-008

Language identity **MUST** remain distinct from syntax, frontend, parser, AST schema, compiler, and extension identities.

### MSL-COMPOSE-REQ-009

Language dispatch **MUST** be deterministic under equivalent registry and configuration state.

### MSL-COMPOSE-REQ-010

The selected embedded frontend and version **MUST** be preserved in compilation provenance.

### MSL-COMPOSE-REQ-011

Language capability negotiation **MUST** occur before a required embedded region is treated as supported.

### MSL-COMPOSE-REQ-012

A frontend lacking required machine-normative capabilities **MUST NOT** claim full support for that region.

### MSL-COMPOSE-REQ-013

Embedded languages **MUST** produce their own surface ASTs or an equivalent registered semantic input representation.

### MSL-COMPOSE-REQ-014

The host Document AST **MUST** preserve the boundary between document nodes and embedded-language AST nodes.

### MSL-COMPOSE-REQ-015

Canonical MSL nodes derived from embedded regions **MUST** remain traceable to the embedded AST, host region, and host source.

### MSL-COMPOSE-REQ-016

Authority inheritance for embedded regions **MUST** be explicit or deterministic and traceable.

### MSL-COMPOSE-REQ-017

Embedded syntax **MUST NOT** grant normative authority by itself.

### MSL-COMPOSE-REQ-018

AI-generated embedded content **MUST NOT** acquire authoritative status without an authorized adoption process.

### MSL-COMPOSE-REQ-019

Lifecycle inheritance for embedded regions **MUST** preserve its source.

### MSL-COMPOSE-REQ-020

A referenced language unit with a weaker lifecycle state **MUST NOT** be silently promoted to match the host document.

### MSL-COMPOSE-REQ-021

Cross-language references **MUST** use shared canonical identity and namespace rules.

### MSL-COMPOSE-REQ-022

Cross-language references **MUST** validate target kind, visibility, version, and applicable type compatibility.

### MSL-COMPOSE-REQ-023

Language dependencies **MUST** be registered and versioned.

### MSL-COMPOSE-REQ-024

Required language dependency closure **MUST** be resolved before complete compilation.

### MSL-COMPOSE-REQ-025

Unsupported language dependency cycles **MUST** produce deterministic diagnostics.

### MSL-COMPOSE-REQ-026

Unknown required machine-normative embedded languages **MUST** block complete compilation.

### MSL-COMPOSE-REQ-027

Unknown informative embedded regions **MAY** be preserved opaquely when the active profile permits it.

### MSL-COMPOSE-REQ-028

Opaque embedded regions **MUST** preserve language declaration, source, authority, lifecycle, provenance, and required status.

### MSL-COMPOSE-REQ-029

Opaque preservation **MUST NOT** be represented as semantic validation.

### MSL-COMPOSE-REQ-030

Embedded diagnostics **MUST** preserve language identity and both embedded and host source locations where available.

### MSL-COMPOSE-REQ-031

Host diagnostics **SHOULD** preserve causal links to embedded-language diagnostics.

### MSL-COMPOSE-REQ-032

Host error recovery **MUST NOT** convert failed required embedded regions into successful semantics.

### MSL-COMPOSE-REQ-033

Region fingerprints **MUST** include semantically relevant host and embedded context.

### MSL-COMPOSE-REQ-034

Host formatting **MUST NOT** alter embedded normalized semantics.

### MSL-COMPOSE-REQ-035

Renderers **MUST** preserve embedded semantic identity and authority.

### MSL-COMPOSE-REQ-036

New MSL-family languages **MUST** use registered identities, versions, manifests, AST schemas, normalization rules, and conformance fixtures.

### MSL-COMPOSE-REQ-037

Embedded languages **MUST NOT** redefine protected core MSL semantics.

### MSL-COMPOSE-REQ-038

Effectful language regions **MUST** declare their effects and required permissions.

### MSL-COMPOSE-REQ-039

Ordinary specification validation **MUST NOT** execute effectful regions by default.

### MSL-COMPOSE-REQ-040

Bootstrap YAML machine blocks **MUST** remain classified as provisional until specialized language specifications replace or formalize them.

---

## 61. Conceptual Model

```text
DocumentSpecification

├── Artifact and Metadata
├── Narrative Sections
├── Normative Requirements
├── Embedded Region: Type Language
│   └── Type Surface AST
├── Embedded Region: Constraint Language
│   └── Constraint Surface AST
├── Embedded Region: Workflow Language
│   └── Workflow Surface AST
├── Referenced Policy Module
├── Acceptance Criteria
└── Provenance
        │
        ▼
Host and Embedded Normalization
        │
        ▼
Canonical MSL AST
        │
        ▼
Binding, Typing, and Validation
        │
        ▼
KIR
```

---

## 62. Machine Specification

```yaml
machine_spec:
  kind: document_and_embedded_language_architecture

  platform:
    host_language: msl.document

    language_family:
      - msl.metadata
      - msl.type
      - msl.expression
      - msl.constraint
      - msl.policy
      - msl.workflow
      - msl.state
      - msl.query
      - msl.pattern
      - msl.transform
      - msl.package

  embedded_region:
    required:
      - region_id
      - language_id
      - language_version
      - semantic_role
      - authority
      - lifecycle
      - source_span
      - provenance

    conditional:
      - syntax_id
      - namespace_context
      - parser_configuration
      - extensions
      - required_for_compilation
      - external_artifact_identity

  execution_classes:
    - descriptive
    - declarative
    - query_only
    - constraint_evaluation
    - transformation
    - effectful

  import_modes:
    - semantic
    - informative
    - type_only
    - constraint_only
    - policy_only
    - namespace
    - extension
    - conformance

  unknown_language_behavior:
    machine_normative: block_complete_compilation
    normative: block_or_partial_by_profile
    informative: preserve_opaque_by_profile
    example: preserve_opaque_by_profile

  composition_pipeline:
    - document_parse
    - region_discovery
    - language_resolution
    - capability_negotiation
    - embedded_parse
    - embedded_surface_ast
    - normalization
    - canonical_ast_integration
```

---

## 63. Invariants

```yaml
invariants:
  - id: MSL-COMPOSE-INV-001
    expression: document_language != embedded_language_family
    description: The host language and specialized languages remain distinct.

  - id: MSL-COMPOSE-INV-002
    expression: embedded_region.language_id != null
    description: Every region resolves to a language identity.

  - id: MSL-COMPOSE-INV-003
    expression: embedded_region.region_id != null
    description: Every region has compiler-visible identity.

  - id: MSL-COMPOSE-INV-004
    expression: embedded_region.source_span != null
    description: Embedded regions remain traceable to host source.

  - id: MSL-COMPOSE-INV-005
    expression: embedded_syntax.grants_authority == false
    description: Syntax does not establish authority.

  - id: MSL-COMPOSE-INV-006
    expression: embedded_ast.language_boundary_preserved == true
    description: Host and embedded ASTs remain distinguishable.

  - id: MSL-COMPOSE-INV-007
    expression: canonical_node.embedded_lineage != null
    description: Canonical semantics remain linked to embedded input.

  - id: MSL-COMPOSE-INV-008
    expression: unknown_required_machine_language.complete_compilation == false
    description: Required unknown machine semantics block completion.

  - id: MSL-COMPOSE-INV-009
    expression: opaque_region.semantic_validation_claimed == false
    description: Opaque preservation is not semantic validation.

  - id: MSL-COMPOSE-INV-010
    expression: referenced_draft_unit.silently_promoted == false
    description: Host lifecycle does not silently promote referenced units.

  - id: MSL-COMPOSE-INV-011
    expression: host_formatter.changes_embedded_semantics == false
    description: Document formatting preserves embedded meaning.

  - id: MSL-COMPOSE-INV-012
    expression: ordinary_validation.executes_effectful_region == false
    description: Normal validation does not cause effects.

  - id: MSL-COMPOSE-INV-013
    expression: cross_language_reference.uses_shared_identity_rules == true
    description: Language composition uses one identity framework.

  - id: MSL-COMPOSE-INV-014
    expression: language_extension.redefines_core_semantics == false
    description: New languages cannot redefine protected core meaning.
```

---

## 64. Diagnostics

### MSL0801 — Missing Embedded Language

An embedded region does not identify or resolve to a language.

### MSL0802 — Missing Embedded Language Version

No compatible embedded-language version can be determined.

### MSL0803 — Missing Region Identity

An embedded region lacks compiler-visible identity.

### MSL0804 — Missing Semantic Role

The host cannot determine the purpose of an embedded region.

### MSL0805 — Language Manifest Not Found

The declared embedded language is not registered.

### MSL0806 — Embedded Frontend Not Found

No enabled frontend can parse the declared syntax and language version.

### MSL0807 — Embedded Capability Mismatch

The selected frontend lacks capabilities required by the region or profile.

### MSL0808 — Embedded Language Version Conflict

The host, package, or dependency graph requires incompatible language versions.

### MSL0809 — Embedded Parse Failure

The embedded parser could not produce a valid or permitted partial surface AST.

### MSL0810 — Required Embedded Language Unsupported

A required normative or machine-normative region cannot be interpreted.

### MSL0811 — Opaque Region Metadata Missing

An opaque region lacks language, source, authority, lifecycle, provenance, or required-status information.

### MSL0812 — Embedded Authority Unresolved

No deterministic authority can be assigned to the region.

### MSL0813 — Unauthorized Embedded Authority

Generated or imported embedded content claims unsupported authority.

### MSL0814 — Embedded Lifecycle Promotion

A host attempted to promote a referenced language unit without an authorized transition.

### MSL0815 — Cross-Language Target Kind Mismatch

A reference resolves to a target kind incompatible with the referring language construct.

### MSL0816 — Cross-Language Version Mismatch

A reference targets an incompatible language or artifact version.

### MSL0817 — Missing Language Dependency

A required dependent MSL-family language cannot be resolved.

### MSL0818 — Language Dependency Cycle

Language dependencies form an unsupported cycle.

### MSL0819 — Embedded Diagnostic Location Missing

A diagnostic cannot be mapped to its embedded or host source location.

### MSL0820 — Host Recovery Misclassified

A failed required embedded region was treated as successfully compiled.

### MSL0821 — Region Fingerprint Incomplete

A semantic cache key omits required host, parser, language, extension, or authority context.

### MSL0822 — Formatter Changed Embedded Semantics

Host or embedded formatting altered normalized meaning.

### MSL0823 — Renderer Lost Embedded Authority

A rendered projection failed to preserve semantic authority.

### MSL0824 — Protected Core Semantic Override

An embedded language attempts to redefine identity, authority, lifecycle, provenance, or other protected core semantics.

### MSL0825 — Undeclared Effects

An effectful language region does not declare its effects or permissions.

### MSL0826 — Effectful Region Executed During Validation

Ordinary validation attempted to execute an effectful language region.

### MSL0827 — Bootstrap Block Misclassified as Stable Language

A provisional YAML machine block is treated as a finalized specialized language.

### MSL0828 — Import Mode Missing

A referenced language unit does not declare how its semantics enter the host.

### MSL0829 — Referenced Unit Identity Missing

An external language unit lacks first-class artifact identity.

### MSL0830 — Embedded Lineage Lost

Canonical output cannot be traced through the embedded AST to the host source region.

---

## 65. Acceptance Criteria

This specification is satisfied when:

1. the Document Language is explicitly defined as a host and composition language;
2. specialized MSL-family languages possess distinct identities and versions;
3. embedded and referenced language forms are supported;
4. embedded regions have identity, language, version, role, authority, lifecycle, provenance, and source spans;
5. language discovery and dispatch are deterministic;
6. frontend capability negotiation occurs before support is claimed;
7. embedded languages produce distinct surface ASTs;
8. host and embedded AST boundaries remain inspectable;
9. canonical nodes preserve embedded and host lineage;
10. authority and lifecycle inheritance remain explicit and traceable;
11. cross-language references use common identity and namespace rules;
12. language dependencies are versioned and resolved;
13. unknown required machine-normative languages block complete compilation;
14. opaque preservation is distinct from validation;
15. embedded diagnostics preserve language and host context;
16. incremental parsing can operate at region granularity;
17. host formatting and rendering preserve embedded semantics;
18. AI editing can target a region while preserving provenance;
19. effectful language execution is separated from ordinary validation;
20. bootstrap YAML blocks remain provisional.

---

## 66. Conformance Examples

### 66.1 Valid Constraint Region

Conceptual host declaration:

```yaml
embedded:
  id: AUTH-CONSTRAINTS
  language: msl.constraint
  version: 0.1.0
  role: invariant
  authority: machine_normative
```

Embedded source:

```text
credential.expired == false
```

The host preserves the region, invokes the Constraint Language frontend, and links normalized invariant nodes to the host source span.

### 66.2 Invalid Missing Language

````text
```machine
credential.expired == false
````

````

No registry rule defines what `machine` means.

Expected diagnostic:

```text
MSL0801: embedded region does not identify a registered language
````

### 66.3 Valid Informative Example

```yaml
embedded:
  id: EXAMPLE-POLICY
  language: msl.policy
  version: 0.1.0
  role: example
  authority: example
```

The policy syntax does not become authoritative.

### 66.4 Invalid Syntax-Based Authority

A block labeled `policy` is automatically marked approved and machine-normative.

Expected diagnostic:

```text
MSL0813: embedded syntax does not authorize normative authority
```

### 66.5 Valid External Workflow Unit

```yaml
imports:
  - artifact: RELEASE-WORKFLOW-0001
    language: msl.workflow
    version: "^0.1.0"
    mode: semantic
```

The workflow retains independent artifact identity and lifecycle.

### 66.6 Invalid Lifecycle Promotion

Host specification:

```yaml
status: approved
```

Imported workflow:

```yaml
status: draft
```

The compiler changes the workflow to approved automatically.

Expected diagnostic:

```text
MSL0814: referenced draft language unit cannot inherit approved lifecycle silently
```

### 66.7 Valid Opaque Informative Region

```yaml
opaque_region:
  region_id: DIAGRAM-001
  language: org.example.diagram
  version: 1.0.0
  role: example
  authority: informative
  required_for_compilation: false
  raw_source: ...
```

Compilation may continue under a compatible profile.

### 66.8 Invalid Opaque Normative Region

```yaml
opaque_region:
  language: org.example.security-policy
  authority: machine_normative
  required_for_compilation: true
```

No compatible frontend is available.

Expected diagnostic:

```text
MSL0810: required machine-normative embedded language is unsupported
```

### 66.9 Valid Cross-Language Reference

Constraint Language:

```text
user.age >= MinimumUserAge
```

`MinimumUserAge` resolves to a Type or Value declaration exported by an imported Type Language module.

### 66.10 Invalid Effect Execution

A transformation block modifies repository files during `monad validate`.

Expected diagnostics:

```text
MSL0825: transformation effects were not declared
MSL0826: ordinary validation must not execute effectful regions
```

---

## 67. Security and Trust Considerations

The embedded-language system introduces multiple parser, evaluator, package, and execution boundaries.

Threats include:

* malicious language packages;
* parser exploits;
* dependency substitution;
* namespace collisions;
* undeclared effects;
* prompt injection;
* authority escalation;
* lifecycle escalation;
* opaque normative content;
* source-map forgery;
* cross-language reference redirection;
* formatter corruption;
* evaluator denial of service;
* hidden network or filesystem access;
* unsafe transformations;
* extension-schema spoofing.

Implementations should:

* sandbox parsers and evaluators;
* validate language manifests;
* verify package provenance;
* enforce language allowlists;
* separate parsing from execution;
* prohibit ambient authority;
* apply memory and CPU limits;
* preserve source and package fingerprints;
* require explicit effect declarations;
* validate cross-language target kinds;
* reject unsupported required semantics;
* keep language-package trust separate from content authority;
* avoid executing effectful regions during compilation.

---

## 68. Evolution and Compatibility

The composition architecture may evolve by adding:

* new MSL-family languages;
* additional execution classes;
* richer region declarations;
* language-server integration;
* package manifests;
* module exports;
* cross-language generics;
* shared expression services;
* richer capability negotiation.

Compatible changes may add optional languages or region metadata.

Breaking changes include:

* changing language identity;
* changing authority inheritance;
* changing dispatch rules;
* changing cross-language reference semantics;
* changing dependency resolution;
* changing effect classifications;
* changing host and embedded AST contracts.

Breaking changes require:

* language-platform version changes;
* migration guidance;
* registry updates;
* parser compatibility diagnostics;
* fixture updates;
* preserved historical language manifests.

---

## 69. Open Questions

1. What concrete syntax should `msl-markdown` use for language-region declarations?
2. Should every embedded region require explicit version declarations?
3. Can host profiles supply compatible version ranges?
4. Should inline regions receive durable semantic IDs automatically?
5. How should language packages declare exports?
6. Which languages may share one Expression Language?
7. Should Constraint and Policy Languages share one evaluator?
8. How are source maps preserved across nested languages?
9. How should embedded formatter failures affect host formatting?
10. How are region boundaries recovered after malformed delimiters?
11. Should language manifests themselves be authored in MSL?
12. How should trusted built-in languages differ from third-party languages?
13. What is the minimum language registry needed for bootstrap?
14. Can language units be compiled independently and linked later?
15. How should cross-language cyclic references be handled?
16. Which languages may emit executable KIR?
17. How should effectful languages be approved for execution?
18. Should query languages be permitted against partially compiled knowledge?
19. How are language-specific diagnostics localized?
20. Should semantic editors store regions as text, AST, or both?
21. How should AI choose which language to use for a requested semantic change?
22. Can one region contain nested embedded languages?
23. How should nested-language depth be limited?
24. Should publication renderers require language-specific plugins?
25. What specialized language should be specified first after the Document Language?

---

## 70. Related Specifications

This specification is completed by:

| ID            | Title                                                       |
| ------------- | ----------------------------------------------------------- |
| MSL-CORE-0010 | Core Semantic Integration, Types, References, and Evolution |

It establishes the foundation for:

| Series          | Purpose                                          |
| --------------- | ------------------------------------------------ |
| MSL-DOCUMENT    | Document syntax, composition, and `msl-markdown` |
| MSL-TYPE        | Type declarations and compatibility              |
| MSL-EXPR        | Shared expression semantics                      |
| MSL-CONSTRAINT  | Constraints and invariants                       |
| MSL-POLICY      | Policy declaration and evaluation                |
| MSL-WORKFLOW    | Workflow models                                  |
| MSL-STATE       | State machines                                   |
| MSL-QUERY       | Knowledge queries                                |
| MSL-PATTERN     | Structural and semantic patterns                 |
| MSL-TRANSFORM   | Controlled transformations                       |
| MSL-PACKAGE     | Packages, modules, and language distribution     |
| MSL-FRONTEND    | Parser and editor protocols                      |
| MSL-CONFORMANCE | Language and composition fixtures                |
| MSC-CORE        | Multi-language compiler orchestration            |
| KIR-CORE        | Shared normalized semantic representation        |

---

## Status

Draft.

This document defines the host-document and embedded-language composition architecture of the MSL engineering-language platform.

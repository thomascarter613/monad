---
id: "MSL-CORE-0005"
title: "Language and Frontend Architecture"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 5
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "frontend"
  - "language-architecture"
  - "compiler"
  - "parser"
  - "semantic-editor"
  - "multi-surface"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MSL-CORE-0004"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
enables:
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE"
  - "KIR-CORE"
  - "MSL-FRONTEND"
  - "MSL-RENDERER"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0005 — Language and Frontend Architecture

## 1. Purpose

This specification defines the architectural boundaries between the Monad Specification Language, its authoring surfaces, its frontend implementations, the MSL Abstract Syntax Tree, the Monad Specification Compiler, renderers, and downstream knowledge representations.

It establishes:

* MSL as a semantic language independent of any single syntax;
* the responsibilities of MSL frontends;
* the distinction between parsing and semantic compilation;
* the distinction between source-preserving and semantic transformations;
* frontend capability declaration;
* frontend conformance;
* source provenance requirements;
* unsupported-feature behavior;
* diagnostics;
* interactive and conversational authoring behavior;
* renderer boundaries;
* round-trip expectations;
* frontend extension and registration.

This specification defines the architecture of MSL authoring and ingestion.

It does not define the complete MSL AST. That responsibility belongs to `MSL-CORE-0006`.

---

## 2. Context

The first Monad specifications use Markdown, YAML front matter, and structured fenced blocks.

That bootstrap form is intentionally practical:

* it works in Git;
* it is readable in ordinary editors;
* it can be reviewed through pull requests;
* it requires no dedicated tooling;
* it supports incremental adoption.

However, the Monad Specification Language must eventually support more than repository-authored Markdown.

Potential authoring surfaces include:

* Markdown documents;
* YAML or JSON structures;
* terminal interfaces;
* graphical editors;
* IDE extensions;
* domain-specific forms;
* conversational AI sessions;
* imported OpenAPI or AsyncAPI documents;
* architecture diagrams;
* interactive configuration systems;
* generated specifications;
* speech-driven interfaces.

If each surface defines its own independent semantics, Monad would fragment into incompatible specification languages.

If every surface must first generate Markdown, Markdown would become an unnecessary architectural bottleneck.

MSL therefore requires a common semantic frontend architecture.

---

## 3. Scope

This specification defines:

* the semantic language boundary;
* authoring surfaces;
* frontend implementations;
* frontend phases;
* source discovery;
* source decoding;
* structural parsing;
* AST construction;
* source mapping;
* frontend capabilities;
* frontend profiles;
* unsupported constructs;
* error recovery;
* partial documents;
* semantic editors;
* conversational frontends;
* import frontends;
* renderer architecture;
* source-preserving and semantic rendering;
* frontend registration;
* frontend conformance;
* frontend security and trust.

This specification does not fully define:

* AST node schemas;
* KIR;
* semantic type rules;
* cross-reference resolution;
* compiler optimization;
* concrete `msl-markdown` grammar;
* concrete editor protocols;
* package and module resolution;
* renderer styling;
* formatter implementation.

---

## 4. Non-Goals

This specification does not:

* require all frontends to expose identical user experiences;
* require all frontends to preserve original formatting;
* require all frontends to support every MSL feature;
* make Markdown the canonical source representation;
* make the AST the permanent knowledge runtime;
* permit frontends to redefine core MSL semantics;
* require AI systems to produce raw source text;
* require one parser implementation for every surface;
* define unrestricted executable scripting in frontends;
* guarantee lossless conversion between every pair of surfaces.

---

## 5. Core Principle

> MSL defines meaning. Frontends define how that meaning is authored or imported.

A frontend may provide syntax, forms, dialogue, graphical manipulation, or structured import.

A frontend must not create a separate semantic language.

All conforming frontends produce MSL AST structures compatible with the active MSL language version.

---

## 6. Architectural Model

```text
Authoring or Import Surface
        ↓
MSL Frontend
        ↓
MSL AST
        ↓
MSC Semantic Analysis
        ↓
KIR
        ↓
MKE
        ↓
Engines and Renderers
```

Examples:

```text
Markdown ─────────────┐
YAML ─────────────────┤
JSON ─────────────────┤
TUI ──────────────────┤
GUI ──────────────────┼──→ MSL AST
AI Dialogue ──────────┤
OpenAPI Importer ─────┤
Architecture Editor ──┘
```

---

## 7. Terminology

### 7.1 Semantic Language

The abstract set of concepts, rules, types, relationships, and constraints defined by MSL independently of concrete syntax.

### 7.2 Authoring Surface

The human- or machine-facing environment through which specification knowledge is created or edited.

### 7.3 Frontend

A component that translates source or interaction input into the MSL AST.

### 7.4 Source Frontend

A frontend that parses a serialized source representation.

Examples:

* Markdown;
* YAML;
* JSON;
* dedicated textual MSL.

### 7.5 Semantic Frontend

A frontend that directly constructs or edits AST nodes without requiring an intermediate text syntax.

Examples:

* form editor;
* graphical specification editor;
* TUI;
* IDE semantic editor.

### 7.6 Import Frontend

A frontend that maps an external engineering format into MSL AST structures.

Examples:

* OpenAPI importer;
* AsyncAPI importer;
* JSON Schema importer;
* Gherkin importer.

### 7.7 Conversational Frontend

A frontend that gathers intent through dialogue and constructs candidate AST nodes.

### 7.8 Frontend Profile

A declared set of MSL capabilities implemented by a frontend.

### 7.9 Frontend Capability

A language feature or authoring behavior supported by a frontend.

### 7.10 Source-Preserving Transformation

A transformation intended to retain original formatting, comments, ordering, and surface-specific details where possible.

### 7.11 Semantic Transformation

A transformation that preserves normalized meaning but may not preserve source presentation.

### 7.12 Renderer

A component that converts AST or KIR into a human- or machine-facing projection.

### 7.13 Formatter

A source-aware renderer that emits a canonical or configured form of a concrete syntax.

### 7.14 Lossy Transformation

A transformation that cannot preserve all source, semantic, or presentation information.

---

## 8. MSL Semantic Boundary

Core MSL semantics include concepts such as:

* artifact identity;
* metadata;
* requirements;
* authority;
* constraints;
* invariants;
* relationships;
* references;
* provenance;
* lifecycle;
* acceptance criteria;
* conformance evidence;
* diagnostics;
* extensions.

These semantics must not depend on:

* Markdown heading levels;
* YAML key order;
* GUI widget layout;
* conversational question order;
* source filename;
* visual color;
* editor implementation.

A frontend may expose MSL concepts differently.

The resulting AST must preserve equivalent semantic intent.

---

## 9. Frontend Classes

The initial frontend classes are:

```text
textual
structured_data
semantic_editor
conversational
importer
generator
```

### 9.1 Textual Frontend

Parses a human-authored textual language.

Examples:

* `msl-markdown`;
* future dedicated `.msl` syntax.

### 9.2 Structured-Data Frontend

Parses a structured serialization.

Examples:

* YAML;
* JSON;
* TOML.

### 9.3 Semantic-Editor Frontend

Builds AST nodes through typed editing operations.

Examples:

* requirement form;
* graph editor;
* TUI configuration system;
* IDE inspection panel.

### 9.4 Conversational Frontend

Uses dialogue to elicit specification information.

It may use AI, deterministic decision trees, or both.

### 9.5 Import Frontend

Maps an external format into MSL.

### 9.6 Generator Frontend

Produces MSL AST from another deterministic system or generated source.

---

## 10. Frontend Responsibilities

A conforming frontend must:

1. identify itself;
2. declare the MSL version it targets;
3. declare supported capabilities;
4. preserve canonical identity;
5. produce a valid AST or explicit partial AST;
6. preserve available source provenance;
7. preserve source locations where applicable;
8. classify authored, imported, generated, and inferred content;
9. report unsupported constructs;
10. emit deterministic diagnostics for deterministic failures;
11. avoid silently inventing normative semantics;
12. mark lossy transformations;
13. preserve extension namespaces;
14. retain unresolved structures when permitted;
15. distinguish user input from frontend-generated defaults.

---

## 11. Frontend Non-Responsibilities

A frontend should not independently perform final:

* global identity resolution;
* cross-package reference resolution;
* complete type checking;
* requirement conflict resolution;
* KIR normalization;
* graph persistence;
* policy enforcement outside frontend-specific safety;
* backend generation.

A frontend may provide early validation or hints.

The MSC semantic compiler remains authoritative for full semantic compilation.

---

## 12. Frontend Processing Phases

A source frontend conceptually performs:

```text
Source Discovery
    ↓
Source Acquisition
    ↓
Decoding
    ↓
Lexical Recognition
    ↓
Structural Parsing
    ↓
AST Construction
    ↓
Frontend Validation
    ↓
AST Handoff
```

A semantic frontend may instead perform:

```text
User Interaction
    ↓
Typed Edit Operations
    ↓
AST Node Construction
    ↓
Local Validation
    ↓
AST Handoff
```

An import frontend may perform:

```text
External Format
    ↓
External Validation
    ↓
Mapping
    ↓
Loss Analysis
    ↓
AST Construction
    ↓
AST Handoff
```

---

## 13. Source Discovery

Source frontends may discover input from:

* explicit file paths;
* repository manifests;
* package manifests;
* standard directories;
* editor buffers;
* standard input;
* remote connectors;
* generated in-memory sources.

Source discovery must remain distinct from parsing.

A frontend must preserve how a source was discovered.

Example:

```yaml
source:
  uri: specifications/MSL/core/MSL-CORE-0005.md
  discovery:
    method: explicit_path
```

---

## 14. Source Acquisition

Source acquisition retrieves the bytes or semantic input to process.

Acquisition may involve:

* local filesystem reads;
* Git object reads;
* editor-buffer access;
* connector access;
* generated buffers;
* network retrieval.

Remote or connector-based acquisition must declare trust and provenance.

A frontend must not present remotely acquired content as local authored content without distinction.

---

## 15. Source Decoding

A source frontend must identify or declare:

* character encoding;
* media type;
* line-ending form;
* byte-order marks where applicable;
* compression or container format where applicable.

UTF-8 should be the default textual encoding.

Invalid decoding must produce a deterministic diagnostic.

---

## 16. Structural Parsing

Structural parsing recognizes frontend-specific forms.

For `msl-markdown`, these may include:

* front matter;
* headings;
* paragraphs;
* fenced blocks;
* requirement declarations;
* code examples;
* tables.

Structural parsing must not be confused with semantic analysis.

A structurally valid document may still be semantically invalid.

---

## 17. AST Construction

The frontend converts recognized source structures into MSL AST nodes.

AST construction must preserve:

* node kind;
* source span;
* source frontend;
* authored text;
* authority classification;
* unresolved values;
* comments when supported;
* extension data;
* frontend-specific trivia when source preservation is required.

The AST model is defined in `MSL-CORE-0006`.

---

## 18. Partial AST

Frontends may produce partial ASTs for:

* incomplete drafts;
* interactive editing;
* unresolved fields;
* unsupported extensions;
* syntax recovery;
* conversational sessions;
* migration workflows.

A partial AST must identify:

* missing required fields;
* unresolved nodes;
* placeholder values;
* invalid nodes;
* recovery diagnostics;
* confidence or inference state where applicable.

A partial AST must not be mistaken for successfully compiled KIR.

---

## 19. Error Recovery

Interactive and editor-oriented frontends should recover from local errors when possible.

Recovery may produce:

* invalid placeholder nodes;
* missing-token markers;
* unresolved-reference nodes;
* partial requirement nodes;
* skipped-source nodes.

Recovery must not silently change intended semantics.

Diagnostics must identify recovered regions.

Batch compilation may choose stricter behavior than interactive editing.

---

## 20. Source Spans

Source-based frontends must provide source spans for AST nodes where the source supports positional addressing.

A source span should contain:

```yaml
source_span:
  source_uri:
  start:
    line:
    column:
    byte:
  end:
    line:
    column:
    byte:
```

Semantic frontends without textual source may use:

* field paths;
* widget paths;
* node identities;
* interaction-event identities;
* graph coordinates;
* form-control identities.

All such references are generalized source locations.

---

## 21. Source Trivia

Source trivia includes:

* whitespace;
* comments;
* blank lines;
* formatting choices;
* heading style;
* quote style;
* YAML key order.

A source-preserving frontend should retain sufficient trivia for round-trip editing.

The semantic compiler and KIR need not retain all trivia.

Frontends must declare whether they support:

* exact round trip;
* stable formatted round trip;
* semantic round trip only.

---

## 22. Frontend Capability Model

A frontend must declare capabilities.

Example:

```yaml
frontend:
  id: msl-markdown
  version: 0.1.0
  targets:
    msl: bootstrap

  capabilities:
    metadata: full
    requirements: full
    machine_blocks: full
    comments: preserve
    source_maps: precise
    interactive_editing: none
    round_trip: formatted
```

Capability support levels may include:

```text
none
read
write
full
partial
lossy
experimental
```

---

## 23. Core Capability Categories

Initial capability categories include:

* identity;
* metadata;
* lifecycle;
* provenance;
* requirements;
* machine semantics;
* constraints;
* invariants;
* references;
* relationships;
* acceptance criteria;
* examples;
* comments;
* attachments;
* extensions;
* source maps;
* partial documents;
* round-trip editing;
* interactive diagnostics.

---

## 24. Frontend Profiles

Initial frontend profiles are:

```text
read_only
authoring
source_preserving
semantic_editor
importer
conversational
```

### 24.1 Read-Only Profile

Parses or displays MSL without editing support.

### 24.2 Authoring Profile

Can produce valid source or AST structures.

### 24.3 Source-Preserving Profile

Supports source-aware round-trip editing.

### 24.4 Semantic-Editor Profile

Edits AST semantics directly.

### 24.5 Importer Profile

Maps an external format into MSL.

### 24.6 Conversational Profile

Constructs specifications through dialogue.

A frontend may implement multiple profiles.

---

## 25. Unsupported Constructs

A frontend may not support every MSL feature.

Unsupported constructs must be handled explicitly.

Permitted behaviors include:

* reject;
* preserve as opaque extension;
* expose read-only;
* degrade with explicit loss report;
* delegate to another frontend;
* retain as unresolved AST node.

A frontend must not silently remove unsupported normative content.

---

## 26. Opaque Nodes

Opaque AST nodes permit preservation of constructs a frontend cannot interpret.

An opaque node should retain:

* original source or payload;
* extension namespace;
* source span;
* declared semantic role;
* frontend identity;
* preservation status.

Opaque nodes may block semantic compilation when they contain required normative meaning.

---

## 27. Loss Reporting

A lossy transformation must produce a loss report.

Example:

```yaml
loss_report:
  transformation:
    from: msl-markdown
    to: simple-form-editor

  lost:
    - markdown_comments
    - custom_heading_layout

  preserved:
    - artifact_identity
    - normative_requirements
    - machine_constraints
```

Loss reports are themselves traceable artifacts or compilation outputs.

---

## 28. Semantic Equivalence

Two frontend outputs are semantically equivalent when they normalize to equivalent KIR under the same language version and compiler configuration.

Semantic equivalence does not require:

* identical source text;
* identical AST trivia;
* identical heading order;
* identical comments;
* identical renderer output.

Conformance tooling should compare normalized semantics rather than source appearance.

---

## 29. Round-Trip Modes

Initial round-trip modes are:

### 29.1 Exact

The frontend can reproduce byte-equivalent source after a no-op parse and emit cycle.

### 29.2 Source-Preserving

The frontend preserves authored structure and trivia, though normalized encoding or line endings may differ.

### 29.3 Formatted

The frontend preserves semantics and emits a canonical formatted source.

### 29.4 Semantic

The frontend preserves normalized meaning but may reorganize presentation.

### 29.5 Lossy

The frontend cannot preserve all source or semantic information and must report losses.

---

## 30. Semantic Editors

A semantic editor manipulates AST nodes directly.

Example requirement editor fields:

```text
Requirement ID
Subject
Obligation
Predicate
Target
Conditions
Applicability
Verification
Rationale
Relationships
```

Semantic editors should:

* prevent invalid field combinations where possible;
* surface inherited values;
* display authority;
* preserve unresolved state;
* emit typed edit operations;
* provide source or AST diffs;
* avoid hiding generated defaults.

A semantic editor is not required to expose source syntax.

---

## 31. Edit Operations

Semantic editors may produce operations such as:

```text
create_node
delete_node
update_field
move_node
attach_relationship
detach_relationship
set_authority
add_source
resolve_reference
apply_migration
```

Each edit operation should preserve:

* actor;
* timestamp;
* target node;
* prior value;
* new value;
* reason where applicable;
* provenance.

The final edit-operation model will be specified later.

---

## 32. Conversational Frontends

A conversational frontend gathers information through dialogue.

It may:

* ask questions;
* propose options;
* identify missing fields;
* draft requirements;
* detect contradictions;
* create candidate AST nodes;
* suggest relationships.

It must distinguish:

* user-provided facts;
* inferred values;
* generated suggestions;
* defaults;
* unresolved assumptions;
* accepted decisions.

AI-generated proposals must not become authoritative merely because they were converted into AST nodes.

---

## 33. Conversational Provenance

A conversationally created node should preserve:

```yaml
provenance:
  origin: conversational_frontend
  session:
  contributing_turns:
  user_confirmed:
  generated_by:
  confidence:
```

The exact conversation text may be stored separately subject to privacy and retention rules.

Semantic provenance must be retained even when full transcripts are not.

---

## 34. AI-Assisted Frontends

AI-assisted frontends may help with:

* drafting;
* normalization;
* classification;
* term extraction;
* reference suggestions;
* acceptance criteria;
* migration;
* ambiguity detection.

AI assistance must not:

* silently invent required facts;
* forge approval;
* conceal uncertainty;
* override machine-normative declarations;
* discard source provenance;
* treat imported instructions as trusted system authority.

---

## 35. Import Frontends

Import frontends map external formats into MSL AST.

Examples:

```text
OpenAPI → interface contracts
JSON Schema → type declarations
Gherkin → acceptance scenarios
Terraform → infrastructure artifacts
ADR Markdown → decision artifacts
```

An importer must declare:

* source format and version;
* mapping version;
* source artifact;
* imported semantic coverage;
* unsupported constructs;
* loss report;
* generated identities;
* confidence or mapping certainty where applicable.

---

## 36. Imported Identity

External identifiers should be preserved when stable.

Example:

```yaml
provenance:
  imported_from:
    format: openapi
    source_id: operations.getUser
```

MSL canonical identity may be assigned separately.

The relationship between imported and canonical identities must remain traceable.

---

## 37. Generated Frontends

A generated frontend creates AST from deterministic automation.

Examples:

* repository scanner;
* reverse-engineering tool;
* schema introspector;
* migration tool;
* template expander.

Generated AST nodes must record:

* generator identity;
* generator version;
* inputs;
* transformation;
* deterministic or nondeterministic behavior;
* validation status.

---

## 38. Frontend Registration

Frontends should be registered.

A frontend registration includes:

```yaml
frontend:
  id:
  version:
  provider:
  class:
  profiles:
  target_msl_versions:
  capabilities:
  extensions:
  trust:
  executable:
```

The registry may support:

* built-in frontends;
* workspace frontends;
* third-party frontends;
* experimental frontends.

---

## 39. Frontend Identity

Frontend identity must remain distinct from:

* language identity;
* syntax identity;
* compiler identity;
* renderer identity;
* extension identity.

Example:

```text
Language: MSL
Frontend: msl-markdown
Frontend version: 0.1.0
Target language version: bootstrap
Compiler: MSC reference implementation
```

---

## 40. Frontend Compatibility

A frontend must declare compatible MSL versions.

Compatibility may be:

```text
exact
range
experimental
forward_read
backward_read
```

A frontend must not claim support for constructs it cannot represent safely.

---

## 41. Frontend Conformance

Frontend conformance should evaluate:

* valid input parsing;
* invalid input diagnostics;
* AST shape;
* source maps;
* identity preservation;
* authority preservation;
* extension preservation;
* unsupported-feature behavior;
* round-trip behavior;
* loss reporting;
* deterministic output.

Conformance fixtures should include both valid and invalid cases.

---

## 42. Determinism

Given the same:

* input;
* frontend version;
* active extensions;
* configuration;
* dependency state;

a deterministic frontend must produce semantically equivalent AST output and equivalent deterministic diagnostics.

AI-assisted frontends may be nondeterministic.

They must mark generated proposals and cannot claim deterministic compilation behavior for the AI phase.

---

## 43. Frontend Configuration

Frontend configuration may include:

* strictness;
* enabled extensions;
* source encoding;
* formatter settings;
* partial parsing;
* recovery behavior;
* import mappings;
* default namespace;
* trust policy.

Configuration affecting semantics must be included in provenance and compilation fingerprints.

Pure presentation configuration need not affect semantic fingerprints.

---

## 44. Renderer Architecture

A renderer converts AST or KIR into a projection.

Examples:

* Markdown;
* HTML;
* PDF source;
* JSON;
* YAML;
* graph diagram;
* registry record;
* editor view;
* summary.

A renderer must declare whether it consumes:

* source-aware AST;
* normalized AST;
* KIR;
* graph query results.

---

## 45. Renderer Categories

Initial renderer categories:

```text
source_renderer
publication_renderer
serialization_renderer
diagram_renderer
summary_renderer
editor_renderer
```

### 45.1 Source Renderer

Produces an editable source syntax.

### 45.2 Publication Renderer

Produces a human-facing document.

### 45.3 Serialization Renderer

Produces machine-readable output.

### 45.4 Diagram Renderer

Produces visual relationships or models.

### 45.5 Summary Renderer

Produces derived summaries.

### 45.6 Editor Renderer

Produces semantic UI representations.

---

## 46. Renderer Requirements

A renderer must:

* preserve canonical identity;
* preserve normative authority;
* preserve applicable provenance;
* identify generated content;
* declare its input model and version;
* declare lossy behavior;
* avoid changing semantic meaning;
* preserve references where the format permits;
* distinguish derived views from authoritative source.

---

## 47. Formatter Architecture

A formatter is associated with a concrete source syntax.

It may normalize:

* whitespace;
* headings;
* field ordering;
* indentation;
* line wrapping;
* fenced block layout.

A formatter must not alter normalized semantics.

A formatter should be idempotent under the same configuration.

---

## 48. Frontend and Renderer Composition

Possible workflows include:

```text
Markdown → AST → formatted Markdown
```

```text
GUI → AST → Markdown
```

```text
OpenAPI → AST → KIR → HTML documentation
```

```text
AI Dialogue → candidate AST → review → KIR
```

```text
KIR → YAML projection
```

Each workflow must make clear whether output is:

* authoritative source;
* editable source;
* generated projection;
* publication;
* transient view.

---

## 49. Frontend Trust

Frontends may execute code or process untrusted content.

Trust classifications may include:

```text
built_in
trusted
reviewed
sandboxed
untrusted
disabled
```

A frontend’s trust level does not grant authority to the content it produces.

Content authority is governed separately.

---

## 50. Sandboxing

Third-party or import frontends should be sandboxable.

Potential controls include:

* filesystem restrictions;
* network restrictions;
* memory limits;
* CPU limits;
* input-size limits;
* execution timeouts;
* extension allowlists;
* output validation.

The reference architecture should avoid requiring frontends to run with unrestricted repository access.

---

## 51. Frontend Security Threats

Threats include:

* malicious source files;
* parser exploits;
* entity expansion;
* path traversal;
* remote include abuse;
* prompt injection;
* forged provenance;
* hidden normative content;
* extension collisions;
* source-map tampering;
* denial of service;
* import dependency confusion;
* renderer injection.

Frontends must treat inputs as untrusted unless explicitly classified otherwise.

---

## 52. Normative Requirements

### MSL-FRONTEND-REQ-001

MSL semantics **MUST** remain independent of any one authoring surface.

### MSL-FRONTEND-REQ-002

Every conforming frontend **MUST** target a declared MSL language version.

### MSL-FRONTEND-REQ-003

Every conforming frontend **MUST** produce a valid MSL AST or an explicitly partial AST.

### MSL-FRONTEND-REQ-004

Every conforming frontend **MUST** preserve canonical artifact identity.

### MSL-FRONTEND-REQ-005

Every conforming frontend **MUST** preserve available provenance.

### MSL-FRONTEND-REQ-006

Source-based frontends **MUST** preserve source locations for emitted AST nodes where the source format supports positional addressing.

### MSL-FRONTEND-REQ-007

Semantic frontends **MUST** provide generalized source locations or edit identities for created AST nodes.

### MSL-FRONTEND-REQ-008

Frontends **MUST** distinguish authored, imported, generated, inferred, and defaulted content.

### MSL-FRONTEND-REQ-009

Frontends **MUST NOT** silently invent normative semantics.

### MSL-FRONTEND-REQ-010

Frontends **MUST** declare unsupported constructs.

### MSL-FRONTEND-REQ-011

Frontends **MUST NOT** silently discard unsupported normative content.

### MSL-FRONTEND-REQ-012

Lossy transformations **MUST** produce an explicit loss report.

### MSL-FRONTEND-REQ-013

Frontends **MUST** declare their capability profile.

### MSL-FRONTEND-REQ-014

Frontend identity **MUST** remain distinct from MSL language identity.

### MSL-FRONTEND-REQ-015

Frontend version **MUST** remain distinct from target MSL language version.

### MSL-FRONTEND-REQ-016

Frontends **MUST** preserve extension namespaces.

### MSL-FRONTEND-REQ-017

A frontend **MUST NOT** redefine protected core MSL semantics.

### MSL-FRONTEND-REQ-018

A partial AST **MUST** identify unresolved, invalid, missing, or recovered nodes.

### MSL-FRONTEND-REQ-019

Recovered parsing **MUST** emit diagnostics identifying affected source regions.

### MSL-FRONTEND-REQ-020

Deterministic frontends **MUST** produce semantically equivalent AST output for equivalent inputs under equivalent configuration.

### MSL-FRONTEND-REQ-021

Configuration affecting semantics **MUST** be preserved in provenance or compilation fingerprints.

### MSL-FRONTEND-REQ-022

AI-assisted frontends **MUST** preserve AI provenance.

### MSL-FRONTEND-REQ-023

AI-generated candidate nodes **MUST NOT** acquire approval or authoritative lifecycle state without an authorized transition.

### MSL-FRONTEND-REQ-024

Conversational frontends **MUST** distinguish user-provided values from inferred and generated values.

### MSL-FRONTEND-REQ-025

Import frontends **MUST** identify source format, source version, and mapping version.

### MSL-FRONTEND-REQ-026

Import frontends **MUST** preserve external identities when available.

### MSL-FRONTEND-REQ-027

Generated frontends **MUST** record generator identity, version, and inputs.

### MSL-FRONTEND-REQ-028

Renderers **MUST** preserve canonical identity.

### MSL-FRONTEND-REQ-029

Renderers **MUST** preserve normative authority.

### MSL-FRONTEND-REQ-030

Renderers **MUST** distinguish generated projections from authoritative source.

### MSL-FRONTEND-REQ-031

Renderers **MUST** declare lossy behavior.

### MSL-FRONTEND-REQ-032

Formatters **MUST NOT** change normalized semantics.

### MSL-FRONTEND-REQ-033

Formatters **SHOULD** be idempotent under equivalent configuration.

### MSL-FRONTEND-REQ-034

Frontends **SHOULD** support explicit capability negotiation.

### MSL-FRONTEND-REQ-035

Editor-oriented frontends **SHOULD** support error recovery and partial AST construction.

### MSL-FRONTEND-REQ-036

Third-party frontends **SHOULD** support sandboxed execution.

### MSL-FRONTEND-REQ-037

Unknown safe extension data **SHOULD** be preserved as opaque AST nodes when the frontend cannot interpret it.

### MSL-FRONTEND-REQ-038

Opaque normative nodes that block reliable semantic interpretation **MUST** prevent successful full compilation.

### MSL-FRONTEND-REQ-039

Frontend conformance **MUST** be testable through versioned fixtures.

### MSL-FRONTEND-REQ-040

Semantic equivalence **MUST** be evaluated against normalized semantics rather than source presentation.

---

## 53. Conceptual Model

```text
MSL Semantic Language

├── Core Semantics
├── Extension Semantics
└── Versioned Rules
        │
        ├───────────────────────────────────────┐
        ▼                                       ▼
Source Frontends                         Semantic Frontends
├── Markdown                             ├── TUI
├── YAML                                 ├── GUI
├── JSON                                 ├── IDE
└── Dedicated Syntax                     └── Dialogue
        │                                       │
        └──────────────────┬────────────────────┘
                           ▼
                        MSL AST
                           │
                           ▼
                    MSC Semantic Compiler
                           │
                           ▼
                          KIR
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      Renderers         Engines            MKE
```

---

## 54. Machine Specification

```yaml
machine_spec:
  kind: language_and_frontend_architecture

  language:
    id: MSL
    semantic_surface_independent: true

  frontend_classes:
    - textual
    - structured_data
    - semantic_editor
    - conversational
    - importer
    - generator

  frontend_profiles:
    - read_only
    - authoring
    - source_preserving
    - semantic_editor
    - importer
    - conversational

  required_frontend_declarations:
    - frontend_id
    - frontend_version
    - target_msl_version
    - class
    - profiles
    - capabilities
    - trust_level
    - round_trip_mode

  frontend_output:
    allowed:
      - ast
      - partial_ast

  round_trip_modes:
    - exact
    - source_preserving
    - formatted
    - semantic
    - lossy

  support_levels:
    - none
    - read
    - write
    - full
    - partial
    - lossy
    - experimental

  renderer_categories:
    - source_renderer
    - publication_renderer
    - serialization_renderer
    - diagram_renderer
    - summary_renderer
    - editor_renderer

  trust_levels:
    - built_in
    - trusted
    - reviewed
    - sandboxed
    - untrusted
    - disabled

  unsupported_construct_behaviors:
    - reject
    - preserve_opaque
    - read_only
    - degrade_with_loss_report
    - delegate
    - unresolved_ast_node
```

---

## 55. Invariants

```yaml
invariants:
  - id: MSL-FRONTEND-INV-001
    expression: msl.semantics.depends_on_single_surface == false
    description: MSL semantics are surface-independent.

  - id: MSL-FRONTEND-INV-002
    expression: conforming_frontend.output in [ast, partial_ast]
    description: Frontends produce AST representations.

  - id: MSL-FRONTEND-INV-003
    expression: frontend.redefines_core_semantics == false
    description: Frontends cannot redefine core language meaning.

  - id: MSL-FRONTEND-INV-004
    expression: ast.canonical_identity_preserved == true
    description: Identity survives frontend translation.

  - id: MSL-FRONTEND-INV-005
    expression: unsupported_normative_content.silently_discarded == false
    description: Unsupported normative content is never silently removed.

  - id: MSL-FRONTEND-INV-006
    expression: lossy_transformation.loss_report != null
    description: Lossy transformations report losses.

  - id: MSL-FRONTEND-INV-007
    expression: generated_semantics.provenance != null
    description: Generated semantic nodes preserve provenance.

  - id: MSL-FRONTEND-INV-008
    expression: renderer.changes_semantic_meaning == false
    description: Renderers do not redefine semantics.

  - id: MSL-FRONTEND-INV-009
    expression: formatter.changes_normalized_semantics == false
    description: Formatting preserves normalized meaning.

  - id: MSL-FRONTEND-INV-010
    expression: semantic_equivalence.based_on == normalized_semantics
    description: Equivalence is semantic rather than textual.

  - id: MSL-FRONTEND-INV-011
    expression: ai_candidate.authority_transition_requires_authorization == true
    description: AI-generated content does not self-authorize.

  - id: MSL-FRONTEND-INV-012
    expression: partial_ast.unresolved_state_explicit == true
    description: Partial AST uncertainty remains visible.
```

---

## 56. Diagnostics

### MSL0401 — Unsupported Frontend

The declared frontend is not registered or enabled.

### MSL0402 — Unsupported MSL Version

The frontend does not support the requested MSL language version.

### MSL0403 — Missing Frontend Identity

A source or AST does not identify the frontend that produced it.

### MSL0404 — Missing Frontend Capability Declaration

The frontend does not declare supported MSL capabilities.

### MSL0405 — Unsupported Construct

The input uses a construct the frontend cannot represent or preserve.

### MSL0406 — Unsupported Normative Construct

The frontend cannot preserve normative content required for compilation.

### MSL0407 — Silent Semantic Loss

A transformation removed or changed semantics without a loss report.

### MSL0408 — Missing Source Provenance

The frontend output cannot be traced to an input source or interaction.

### MSL0409 — Invalid Partial AST

A partial AST does not identify invalid, missing, unresolved, or recovered nodes.

### MSL0410 — Frontend Semantic Override

The frontend attempts to redefine protected MSL semantics.

### MSL0411 — Invalid Round-Trip Claim

The frontend claims a stronger round-trip mode than conformance tests demonstrate.

### MSL0412 — Missing AI Provenance

AI-assisted frontend output lacks required AI provenance.

### MSL0413 — Unauthorized AI Authority

AI-generated content claims authoritative status without an approved transition.

### MSL0414 — Ambiguous User Versus Generated Value

A conversational frontend does not distinguish user input from generated or inferred content.

### MSL0415 — Missing Import Mapping Version

An importer does not identify the mapping rules used.

### MSL0416 — Untraceable Imported Identity

An imported external identity was discarded without a recorded mapping.

### MSL0417 — Invalid Renderer Input Version

A renderer does not support the AST or KIR version it received.

### MSL0418 — Renderer Authority Loss

A renderer fails to preserve normative authority.

### MSL0419 — Formatter Semantic Change

Formatting altered normalized semantics.

### MSL0420 — Opaque Normative Node

A required normative construct remains opaque and prevents reliable semantic compilation.

### MSL0421 — Nondeterministic Frontend Misclassified

A nondeterministic frontend claims deterministic behavior.

### MSL0422 — Unsafe Frontend Execution

An untrusted frontend requests capabilities prohibited by the active sandbox policy.

### MSL0423 — Source Decoding Failure

The source cannot be decoded under the declared or detected encoding.

### MSL0424 — Recovery Region Unmarked

Parser recovery changed structural interpretation without marking the affected region.

### MSL0425 — Capability Negotiation Failure

The requested authoring or transformation workflow requires unsupported capabilities.

---

## 57. Acceptance Criteria

This specification is satisfied when:

1. MSL is explicitly separated from all concrete authoring surfaces;
2. textual, structured, semantic-editor, conversational, importer, and generator frontends are represented;
3. all conforming frontends produce AST or explicitly partial AST;
4. frontend and language identities are distinct;
5. frontend capability declaration and negotiation are defined;
6. unsupported constructs cannot be silently discarded;
7. lossy transformations require loss reports;
8. source spans and generalized semantic source locations are supported;
9. source-preserving and semantic transformations are distinguished;
10. exact, source-preserving, formatted, semantic, and lossy round-trip modes are defined;
11. conversational and AI-assisted frontends preserve authorship and inference provenance;
12. imported formats preserve mapping and external identity;
13. renderer and formatter boundaries are distinct from compiler semantics;
14. frontend conformance can be evaluated through fixtures;
15. third-party frontends can be classified and sandboxed;
16. semantic equivalence is based on normalized meaning rather than source text.

---

## 58. Conformance Examples

### 58.1 Valid Markdown Frontend Declaration

```yaml
frontend:
  id: msl-markdown
  version: 0.1.0
  class: textual
  profiles:
    - authoring
    - source_preserving
  target_msl_versions:
    - bootstrap
  round_trip: formatted
```

### 58.2 Valid Semantic Editor

```yaml
frontend:
  id: monad-spec-tui
  version: 0.1.0
  class: semantic_editor
  profiles:
    - authoring
    - semantic_editor

  capabilities:
    identity: full
    metadata: full
    requirements: full
    machine_semantics: partial
    comments: none
```

The editor may create valid AST while not preserving Markdown comments.

### 58.3 Invalid Silent Loss

An editor loads an MSL document containing three normative invariants but saves a form representation containing only metadata and requirements.

No warning or loss report is produced.

Expected diagnostic:

```text
MSL0407: transformation discarded normative invariant nodes without a loss report
```

### 58.4 Valid Lossy Import

```yaml
loss_report:
  source_format: openapi-3.1
  target: msl-ast
  unsupported:
    - vendor_extension.x-runtime-routing
  preserved_as_opaque:
    - vendor_extension.x-runtime-routing
```

### 58.5 Invalid Conversational Provenance

```yaml
requirement:
  id: EXAMPLE-REQ-001
  statement: The service must retain audit logs.
```

The frontend cannot determine whether the user stated this, the AI inferred it, or it came from a default.

Expected diagnostic:

```text
MSL0414: requirement origin is ambiguous
```

### 58.6 Valid Conversational Node

```yaml
requirement:
  id: EXAMPLE-REQ-001
  statement: The service must retain audit logs.

provenance:
  origin: conversational_frontend
  value_source: user_confirmed
  contributing_turns:
    - session-123-turn-8
```

### 58.7 Invalid AI Approval

```yaml
metadata:
  status: approved

provenance:
  created_by:
    type: ai
```

No authorized approval evidence exists.

Expected diagnostic:

```text
MSL0413: AI-generated content cannot self-assign approved status
```

### 58.8 Valid Renderer Declaration

```yaml
renderer:
  id: msl-html
  version: 0.1.0
  consumes:
    model: KIR
    version: 0.1.0
  output:
    media_type: text/html
  loss:
    source_trivia: omitted
    normative_semantics: preserved
```

### 58.9 Invalid Formatter

A formatter changes:

```text
MUST NOT
```

to:

```text
SHOULD NOT
```

Expected diagnostic:

```text
MSL0419: formatter changed normalized normative semantics
```

### 58.10 Valid Opaque Extension Preservation

```yaml
ast_node:
  kind: opaque_extension
  namespace: org.example.safety
  authority: machine_normative
  payload: ...
  compilation_behavior: requires_extension
```

Without the extension, full compilation must fail rather than discard the node.

---

## 59. Security and Trust Considerations

Frontends are a major trust boundary.

They ingest external, user-authored, AI-generated, or generated content and construct semantic structures that may influence:

* source code;
* infrastructure;
* policies;
* tests;
* documentation;
* AI context;
* deployments.

Implementations must consider:

* malicious parser inputs;
* dependency confusion;
* remote include substitution;
* prompt injection;
* imported authority escalation;
* source-map forgery;
* frontend plugin compromise;
* extension abuse;
* hidden lossy conversion;
* denial-of-service inputs;
* unsafe deserialization;
* renderer injection;
* forged user confirmation;
* nondeterministic AI output.

Frontends should use:

* strict input-size limits;
* sandboxing;
* deterministic schema validation;
* trusted registries;
* provenance recording;
* extension allowlists;
* safe parsing libraries;
* capability restrictions;
* explicit authority transitions;
* output validation before semantic compilation.

---

## 60. Evolution and Compatibility

The frontend architecture may evolve by adding:

* new frontend classes;
* new capability categories;
* new round-trip modes;
* new generalized source-location forms;
* richer editor operations;
* frontend package manifests;
* plugin protocols;
* remote frontend execution.

Compatible evolution may add optional capabilities or profiles.

Breaking changes include:

* changing AST construction contracts;
* changing the meaning of capability levels;
* changing loss-report requirements;
* changing authority-preservation rules;
* changing source-map guarantees.

Frontends must declare the MSL and AST versions they support.

A frontend may support multiple MSL versions through separate parsing or mapping modes.

---

## 61. Open Questions

1. Should frontend manifests be MSL artifacts?
2. What package format should distribute third-party frontends?
3. Should AST construction use a stable protocol or in-process library?
4. How should frontends stream very large specification corpora?
5. What minimum source trivia must `msl-markdown` preserve?
6. Should semantic editors emit edit-operation logs as first-class artifacts?
7. How should collaborative editing map concurrent changes into AST operations?
8. What conformance test suite is required before a frontend is trusted?
9. Should importers emit AST directly or map through a domain import IR?
10. How should AI-frontends record model, prompt, sampling, and tool provenance?
11. Can a frontend delegate unsupported nodes to another frontend?
12. How should frontend capability negotiation appear in the CLI?
13. What limits apply to opaque nodes?
14. How are renderer templates secured?
15. Should formatters consume AST or concrete syntax trees?
16. Does MSL need a distinct concrete syntax tree in addition to the AST?
17. How are comments attached to AST nodes?
18. What is the canonical loss-report schema?
19. How should source locations work for diagrams and graphical editors?
20. When should an imported external artifact become authoritative local knowledge?

---

## 62. Related Specifications

This specification is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSL-CORE-0006 | Abstract Syntax Tree Model                        |
| MSL-CORE-0007 | `msl-markdown` Concrete Syntax                    |
| MSL-CORE-0008 | Machine Semantics and Constraint Blocks           |
| MSL-CORE-0009 | Type System and Semantic Validation               |
| MSL-CORE-0010 | References, Relationships, and Language Evolution |

Future specialized series should include:

| Series           | Purpose                                     |
| ---------------- | ------------------------------------------- |
| MSL-FRONTEND     | Detailed frontend protocols and conformance |
| MSL-RENDERER     | Renderer and formatter specifications       |
| MSL-EDITOR       | Semantic editing and collaboration          |
| MSL-IMPORT       | External-format mappings                    |
| MSL-CONVERSATION | Conversational authoring                    |
| MSC-CORE         | Semantic compiler architecture              |
| KIR-CORE         | Normalized knowledge representation         |

---

## Status

Draft.

This document defines the multi-surface frontend, authoring, import, and rendering architecture of the Monad Specification Language.

---
artifact:
  id: MSC-CORE-0001
  type: knowledge.specification
  namespace: monad

metadata:
  title: Monad Specification Compiler Vision and Architecture
  version: 0.1.0
  status: draft
  created: 2026-08-04
  authors:
    - Monad Architecture Team
  tags:
    - msc
    - compiler
    - architecture
    - knowledge-compiler
    - semantic-graph
    - kir
    - foundational

relationships:
  depends_on:
    - ADR-0002
    - ADR-0003
    - ADR-0004
    - ADR-0005
    - ADR-0006
    - MSL-CORE-0001
    - MSL-CORE-0002
    - MSL-CORE-0003
    - MSL-CORE-0004
    - MSL-CORE-0005
    - MSL-CORE-000
    - MSL-CORE-000
    - MSL-CORE-000
    - MSL-CORE-000
    - MSL-CORE-0010
  references:
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-000
    - MKE-CORE-0010
  enables:
    - MSC-CORE-0002
    - MSC-CORE-0003
    - MSC-CORE-0004
    - MSC-CORE-0005
    - MSC-CORE-0006
    - MSC-CORE-0007
    - MSC-CORE-0008
    - MSC-CORE-0009
    - MSC-CORE-0010
    - MSG-CORE
    - KIR-CORE
    - MSL-DOCUMENT
    - MSL-TYPE
    - MSL-EXPR
    - MSL-CONSTRAINT

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: primary
  status: bootstrap
---

# MSC-CORE-0001 — Monad Specification Compiler Vision and Architecture

## 1. Purpose

This specification defines the vision, architectural role, responsibilities, boundaries, principles, and high-level structure of the Monad Specification Compiler.

The Monad Specification Compiler, abbreviated **MSC**, transforms human-authored, machine-authored, imported, observed, and generated engineering knowledge into validated, queryable, traceable, and backend-consumable compiled knowledge.

MSC is the central compiler subsystem of the Monad ecosystem.

It coordinates the transformation from source representations into:

1. surface Abstract Syntax Trees;
2. the canonical MSL Abstract Syntax Tree;
3. the Monad Semantic Graph;
4. the Knowledge Intermediate Representation;
5. backend-specific artifacts and projections.

MSC is not merely a Markdown parser, schema validator, template engine, or code generator.

It is a multi-language, multi-source, provenance-preserving compiler for engineering knowledge.

---

## 2. Context

Software engineering knowledge exists across many disconnected forms.

Examples include:

* requirements;
* specifications;
* architecture documents;
* source code;
* API contracts;
* data schemas;
* infrastructure definitions;
* tests;
* policies;
* workflows;
* state machines;
* issues;
* pull requests;
* Git history;
* diagrams;
* operational records;
* AI conversations;
* interactive design sessions.

These sources vary in:

* syntax;
* semantic precision;
* authority;
* lifecycle;
* provenance;
* completeness;
* trust;
* compatibility;
* intended audience.

Traditional tooling processes each source independently.

As a result:

* references remain unresolved across artifact types;
* requirements drift from implementations;
* documentation becomes stale;
* source code is mistaken for intent;
* inferred knowledge is mistaken for approved knowledge;
* generators consume incomplete context;
* AI systems receive fragmented or contradictory inputs;
* changes cannot be analyzed through one semantic model;
* provenance is lost during transformation.

Monad requires a compiler capable of preserving source fidelity while constructing one coherent model of engineering meaning.

MSC provides that compiler.

---

## 3. Vision

The vision of MSC is:

> Any relevant engineering source should be ingestible, interpretable, normalized, semantically resolved, validated, and transformed into trustworthy compiled knowledge without losing identity, authority, provenance, or traceability.

MSC enables an engineering workflow in which:

```text
Human Intent
    ↓
Specifications and Engineering Sources
    ↓
Compilation
    ↓
Resolved Semantic Knowledge
    ↓
Validation, Planning, Generation, Explanation, and Evolution
```

Under this model, compilation is not limited to turning source code into machine instructions.

Compilation also turns:

* prose into structured requirements;
* contracts into interface models;
* schemas into type systems;
* source code into observed behavior;
* Git history into change provenance;
* conversations into proposed decisions;
* policies into evaluable rules;
* workflows into execution models;
* specifications into semantic graphs;
* semantic graphs into deterministic backend representations.

---

## 4. Scope

MSC is responsible for orchestrating:

* source discovery;
* source acquisition;
* source classification;
* frontend selection;
* parser invocation;
* surface AST construction;
* surface validation;
* normalization;
* canonical AST construction;
* declaration collection;
* namespace construction;
* symbol registration;
* import and export resolution;
* reference binding;
* type analysis;
* constraint analysis;
* authority analysis;
* lifecycle analysis;
* compatibility analysis;
* conflict construction;
* semantic-graph construction;
* validation;
* diagnostics;
* incremental compilation;
* caching;
* reproducibility;
* KIR lowering;
* backend invocation;
* compilation reporting;
* self-hosting support.

MSC does not own:

* long-term knowledge persistence;
* general-purpose graph querying;
* interactive user interfaces;
* publication layout;
* arbitrary external effects;
* backend-specific runtime behavior;
* source-control implementation.

Those concerns belong to MKE, CLI, editors, renderers, execution engines, backends, or external systems.

---

## 5. Non-Goals

MSC is not intended to be:

* a general-purpose programming-language compiler;
* a replacement for native language compilers;
* a document editor;
* a graph database;
* a source-control system;
* a free-form AI reasoning agent;
* a template expander without semantic analysis;
* a cloud-only service;
* an unrestricted plugin host;
* the canonical storage system for all knowledge;
* a system that silently resolves ambiguity through heuristics;
* a system that grants authority to generated or inferred knowledge automatically.

---

## 6. Core Principle

> MSC preserves what sources expressed, determines what those sources mean, and lowers validated meaning into deterministic representations.

These responsibilities are distinct:

```text
Preserve Source
    ↓
Interpret Structure
    ↓
Normalize Concepts
    ↓
Resolve Meaning
    ↓
Validate Semantics
    ↓
Lower for Consumption
```

No stage should silently perform the responsibilities of another stage in a way that obscures lineage or alters authority.

---

## 7. Architectural Position

MSC occupies the center of the Monad knowledge-compilation architecture.

```text
Engineering Sources
    ↓
MSC
    ↓
Monad Semantic Graph
    ↓
KIR
    ↓
MKE and Downstream Engines
```

Expanded:

```text
Source Artifacts
    ↓
Source Discovery and Acquisition
    ↓
Surface Frontends
    ↓
Surface ASTs
    ↓
Normalization
    ↓
Canonical MSL AST
    ↓
Binding and Semantic Analysis
    ↓
Monad Semantic Graph
    ↓
Validation and Conformance
    ↓
KIR Lowering
    ↓
Optimization and Projection
    ↓
Backends
    ↓
Generated Artifacts
```

---

## 8. Architectural Responsibilities

MSC has ten primary architectural responsibilities.

### 8.1 Ingestion

Discover and acquire source artifacts.

### 8.2 Frontend Orchestration

Select compatible source readers, parsers, importers, or semantic frontends.

### 8.3 Representation Construction

Produce surface ASTs and canonical MSL AST structures.

### 8.4 Semantic Binding

Register declarations, construct namespaces, and bind references.

### 8.5 Semantic Analysis

Resolve types, constraints, authority, lifecycle, profiles, compatibility, and conflicts.

### 8.6 Semantic Graph Construction

Build the Monad Semantic Graph from resolved semantic knowledge.

### 8.7 Validation

Evaluate structural, semantic, graph, authority, lifecycle, compatibility, and conformance rules.

### 8.8 Lowering

Transform semantic graph projections into KIR.

### 8.9 Backend Orchestration

Invoke generators, validators, renderers, analyzers, or target-specific backends.

### 8.10 Compilation Governance

Preserve reproducibility, diagnostics, provenance, policies, trust boundaries, and compilation records.

---

## 9. Compiler Inputs

MSC may consume:

* MSL source documents;
* MSL semantic-editor output;
* source-specific surface ASTs;
* canonical MSL AST serialization;
* source-code analysis results;
* repository metadata;
* compiler configuration;
* registries;
* profiles;
* language manifests;
* frontend manifests;
* normalization mappings;
* extension packages;
* dependency indexes;
* prior compilation caches;
* existing semantic graph context.

Every input must preserve or declare:

* identity;
* source;
* version;
* trust;
* authority where applicable;
* compatibility;
* provenance.

---

## 10. Compiler Outputs

MSC may produce:

* surface ASTs;
* canonical MSL ASTs;
* semantic graphs;
* partial semantic graphs;
* diagnostics;
* conflict records;
* conformance reports;
* KIR;
* partial KIR;
* compilation manifests;
* dependency graphs;
* source maps;
* lineage maps;
* compatibility reports;
* backend artifacts;
* cache records;
* semantic fingerprints;
* migration proposals.

Outputs must distinguish:

* authoritative results;
* provisional results;
* inferred results;
* partial results;
* failed results;
* generated projections;
* execution evidence.

---

## 11. Compiler Representations

MSC operates across several distinct representations.

| Representation     | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| Source             | Original authored, imported, observed, or generated input |
| Surface AST        | Source-domain structure                                   |
| Canonical MSL AST  | Common MSL semantic constructs                            |
| Bound AST          | Declarations and references associated with symbols       |
| Typed AST          | Types and applicable semantic categories determined       |
| MSG                | Resolved semantic graph                                   |
| KIR                | Deterministic lowered representation                      |
| Backend IR         | Optional target-specific representation                   |
| Generated Artifact | External emitted result                                   |

These representations must not be conflated.

---

## 12. Source Representation

The source representation answers:

> What bytes, objects, events, edits, or observations were supplied?

Examples:

* Markdown file;
* OpenAPI document;
* Git commit;
* editor operation;
* API response;
* AI conversation turn;
* in-memory semantic node.

MSC must preserve source identity and acquisition provenance.

---

## 13. Surface AST

The surface AST answers:

> What structure exists according to the source domain?

Examples:

* Markdown heading;
* OpenAPI operation;
* Terraform resource;
* Rust function;
* conversation confirmation;
* Mermaid relationship.

Surface ASTs remain faithful to source-domain semantics.

---

## 14. Canonical MSL AST

The canonical MSL AST answers:

> Which MSL concepts were expressed or normalized from the source?

Examples:

* requirement;
* type declaration;
* relationship;
* policy;
* workflow;
* invariant;
* provenance record.

The canonical AST may remain partial, unresolved, inferred, or conflicting.

---

## 15. Bound and Typed Semantic State

Binding and typing answer:

* Which declaration does this reference identify?
* Which namespace owns this symbol?
* Which type applies to this value?
* Which compatibility rules govern this use?
* Which imported declaration is visible?
* Which profile activates this requirement?

Bound and typed states may be represented through:

* transformed ASTs;
* compiler side tables;
* semantic indexes;
* graph-building records;
* internal IR.

The public architectural contract matters more than one implementation structure.

---

## 16. Monad Semantic Graph

MSG answers:

> What does the compiled body of engineering knowledge mean after applicable resolution?

MSG contains:

* semantic identities;
* resolved declarations;
* typed values;
* resolved references;
* semantic relationships;
* authority;
* lifecycle;
* provenance;
* conflicts;
* dependencies;
* conformance relationships;
* compatibility state.

MSG is the principal resolved semantic representation.

---

## 17. Knowledge Intermediate Representation

KIR answers:

> What deterministic lowered form should downstream engines and backends consume?

KIR may contain:

* normalized declarations;
* execution-ready constraints;
* generation plans;
* validation plans;
* backend-neutral operations;
* optimized graph projections;
* stable lowered identities;
* deterministic dependency order.

KIR must preserve lineage to MSG.

---

## 18. Compiler Phase Families

MSC phases are grouped into:

```text
Acquisition
Frontend
Normalization
Binding
Analysis
Graph Construction
Validation
Lowering
Optimization
Backend
Reporting
```

Each family may contain multiple passes.

The detailed phase model is defined in `MSC-CORE-0002`.

---

## 19. Acquisition Phases

Acquisition phases may:

* discover files;
* query registries;
* read source buffers;
* inspect Git objects;
* acquire connector data;
* classify media;
* calculate source fingerprints;
* apply access policy;
* establish trust context.

Acquisition does not imply semantic acceptance.

---

## 20. Frontend Phases

Frontend phases may:

* resolve language identity;
* select a frontend;
* parse source;
* construct surface ASTs;
* recover from syntax errors;
* preserve source trivia;
* validate source-domain structure;
* produce source diagnostics.

Frontend success does not imply semantic validity.

---

## 21. Normalization Phases

Normalization phases may:

* select mappings;
* classify source facts;
* construct canonical nodes;
* preserve external identities;
* assign provisional authority;
* identify ambiguity;
* produce loss reports;
* generate canonical AST lineage.

Normalization must not grant unauthorized authority.

---

## 22. Binding Phases

Binding phases may:

* collect declarations;
* assign symbols;
* construct namespaces;
* resolve imports;
* resolve exports;
* normalize aliases;
* associate references with candidates;
* construct dependency indexes.

Binding must preserve ambiguity when one deterministic target cannot be selected.

---

## 23. Analysis Phases

Semantic analysis may include:

* type resolution;
* assignability;
* constraint binding;
* invariant validation;
* authority resolution;
* lifecycle validation;
* compatibility analysis;
* profile activation;
* feature negotiation;
* policy checks;
* conflict detection.

Analysis produces semantic facts and diagnostics.

---

## 24. Graph-Construction Phases

Graph construction transforms bound and analyzed semantics into MSG nodes and edges.

It may:

* create semantic nodes;
* create relationship edges;
* attach provenance;
* attach authority;
* attach lifecycle;
* materialize dependencies;
* preserve conflicts;
* construct source lineage;
* calculate semantic fingerprints.

Graph construction must not flatten unresolved conflicts silently.

---

## 25. Validation Phases

Validation may evaluate:

* source conformance;
* AST conformance;
* canonical AST conformance;
* identity rules;
* metadata rules;
* type rules;
* reference rules;
* graph invariants;
* authority rules;
* lifecycle rules;
* compatibility;
* profiles;
* backend prerequisites;
* conformance suites.

Validation results must distinguish warnings, errors, blocked states, waivers, and unresolved states.

---

## 26. Lowering Phases

Lowering transforms MSG into KIR.

Lowering may:

* select semantic subgraphs;
* normalize equivalent structures;
* remove presentation-only information;
* encode deterministic ordering;
* lower types and constraints;
* build generation or validation plans;
* create backend-neutral operations;
* preserve semantic lineage.

Lowering must not invent semantics absent from MSG.

---

## 27. Optimization Phases

Optimization may:

* remove redundant derived structures;
* deduplicate equivalent lowered forms;
* simplify constraints;
* order dependencies;
* cache stable projections;
* specialize for a backend;
* prune unreachable or irrelevant knowledge.

Optimization must preserve observable semantics under the target contract.

---

## 28. Backend Phases

Backends may generate:

* source code;
* tests;
* schemas;
* infrastructure;
* documentation;
* diagrams;
* issue backlogs;
* plans;
* reports;
* policies;
* configuration;
* indexes;
* publications.

A backend consumes KIR, MSG projections, or both according to a declared contract.

Backends must not bypass authority, lifecycle, security, or provenance requirements.

---

## 29. Reporting Phases

Compilation reporting may produce:

* success or failure status;
* diagnostics;
* compilation duration;
* source inventory;
* dependency summary;
* semantic coverage;
* unresolved references;
* conflicts;
* loss reports;
* cache statistics;
* generated-artifact manifest;
* reproducibility fingerprint;
* toolchain versions.

Compilation reports should be first-class artifacts.

---

## 30. Compiler Modes

Initial conceptual compiler modes include:

```text
inspect
parse
normalize
bind
analyze
validate
compile
lower
generate
migrate
explain
```

### 30.1 Inspect

Discover and report sources and configuration without complete compilation.

### 30.2 Parse

Construct source or surface representations.

### 30.3 Normalize

Produce canonical MSL AST structures.

### 30.4 Bind

Register declarations and resolve symbols where possible.

### 30.5 Analyze

Perform type, authority, lifecycle, compatibility, and semantic analysis.

### 30.6 Validate

Evaluate applicable conformance rules.

### 30.7 Compile

Build MSG and applicable KIR outputs.

### 30.8 Lower

Produce KIR from an existing semantic graph.

### 30.9 Generate

Invoke selected backends.

### 30.10 Migrate

Transform artifacts between versions or schemas.

### 30.11 Explain

Produce human-readable explanations of compiler decisions and lineage.

---

## 31. Compilation Profiles

MSC behavior is controlled by semantic and operational profiles.

Examples:

* bootstrap;
* narrative;
* structured;
* normative;
* machine;
* executable;
* strict;
* partial;
* migration;
* reverse-engineering;
* publication;
* CI;
* editor.

Profiles may control:

* required phases;
* error tolerance;
* unresolved-reference tolerance;
* authority thresholds;
* lifecycle thresholds;
* extension allowlists;
* frontend trust;
* KIR emission;
* backend availability;
* caching;
* diagnostic severity.

---

## 32. Batch and Interactive Compilation

MSC must support both batch and interactive workflows.

### 32.1 Batch Compilation

Optimized for:

* reproducibility;
* CI;
* publication;
* releases;
* full diagnostics;
* deterministic outputs.

### 32.2 Interactive Compilation

Optimized for:

* low latency;
* partial documents;
* incremental edits;
* localized diagnostics;
* provisional semantics;
* semantic completion;
* editor integration.

Interactive results must not be mistaken for final validated outputs.

---

## 33. Partial Compilation

Partial compilation permits progress despite:

* incomplete documents;
* unresolved references;
* unavailable optional languages;
* missing external sources;
* draft semantics;
* editor recovery nodes;
* pending confirmations.

Partial output must identify:

* incomplete phases;
* unresolved nodes;
* invalid nodes;
* missing dependencies;
* blocked outputs;
* provisional graph elements;
* prohibited backend actions.

Partial compilation cannot claim full conformance.

---

## 34. Strict Compilation

Strict compilation may require:

* all required sources available;
* all references resolved;
* all required types valid;
* no blocking conflicts;
* approved authority;
* compatible lifecycle;
* complete provenance;
* deterministic frontends;
* trusted mappings;
* reproducible KIR;
* backend prerequisites.

Strict mode should be used for releases and authoritative generated artifacts.

---

## 35. Determinism

MSC must distinguish deterministic and nondeterministic phases.

Deterministic phases should produce semantically equivalent output from equivalent:

* inputs;
* versions;
* configuration;
* registry state;
* dependency state;
* environment declarations.

Nondeterministic AI-assisted phases must produce candidate knowledge rather than silently entering authoritative compilation.

---

## 36. Reproducibility

A reproducible compilation records:

* source fingerprints;
* source revisions;
* language versions;
* frontend versions;
* surface AST versions;
* mapping versions;
* canonical AST version;
* compiler version;
* MSG schema version;
* KIR version;
* profile;
* extensions;
* registry fingerprints;
* environment requirements;
* backend versions.

Equivalent recorded inputs should reproduce semantically equivalent outputs.

---

## 37. Compiler Configuration

Configuration may come from:

* workspace manifests;
* repository manifests;
* specification metadata;
* profile definitions;
* command-line options;
* editor settings;
* policy configuration;
* environment declarations.

Configuration must distinguish:

* semantic configuration;
* operational configuration;
* presentation configuration;
* security configuration.

Semantic configuration affects compilation fingerprints.

---

## 38. Configuration Precedence

A conceptual precedence model may be:

```text
Explicit invocation
    over
Artifact-specific configuration
    over
Package configuration
    over
Repository configuration
    over
Workspace configuration
    over
Compiler defaults
```

Protected governance fields may use different authority-aware rules.

Effective configuration must be inspectable.

---

## 39. Compiler Context

A compilation context conceptually contains:

```text
CompilationContext

├── invocation identity
├── compiler version
├── target mode
├── profile
├── workspace
├── repository
├── source set
├── language registry
├── frontend registry
├── mapping registry
├── extension registry
├── package context
├── semantic registry
├── trust policy
├── security policy
├── cache context
├── backend selection
└── provenance
```

---

## 40. Compiler Invocation Identity

Every meaningful compiler execution should have stable invocation identity.

Invocation identity supports:

* diagnostics;
* audit;
* cache correlation;
* generated-artifact lineage;
* reproducibility;
* conformance evidence;
* performance measurement.

---

## 41. Compiler Manifest

A compilation should be able to emit a manifest containing:

* invocation ID;
* source inventory;
* versions;
* profiles;
* registries;
* extensions;
* phases executed;
* outputs;
* diagnostics;
* fingerprints;
* cache reuse;
* trust decisions;
* timestamps.

The manifest is not a substitute for detailed provenance.

---

## 42. Frontend Registry

MSC uses a frontend registry to resolve:

* supported source formats;
* supported language versions;
* frontend implementations;
* capabilities;
* trust;
* sandbox requirements;
* AST output versions;
* diagnostics;
* round-trip guarantees.

Frontend selection must be deterministic under equivalent context.

---

## 43. Mapping Registry

MSC uses a mapping registry to resolve:

* source-domain normalization mappings;
* mapping versions;
* supported source ASTs;
* target MSL versions;
* authority policies;
* inference policies;
* loss policies;
* conformance status.

Mappings are compiler components, not undocumented importer behavior.

---

## 44. Language Registry

MSC uses a language registry to resolve:

* MSL-family language identities;
* versions;
* dependencies;
* parsers;
* AST schemas;
* execution classes;
* normalization rules;
* semantic exports;
* reference contracts;
* KIR lowering behavior.

---

## 45. Extension Registry

MSC uses an extension registry to resolve:

* extension identity;
* version;
* namespace;
* schemas;
* AST nodes;
* semantic rules;
* diagnostics;
* trust;
* KIR lowering;
* compatibility.

Unknown required extensions must block complete compilation.

---

## 46. Backend Registry

MSC may use a backend registry to resolve:

* backend identity;
* backend version;
* accepted KIR version;
* accepted MSG projections;
* target artifact types;
* required capabilities;
* trust;
* effects;
* output contracts;
* conformance status.

---

## 47. Compiler Services

MSC may expose reusable services for:

* source discovery;
* parsing;
* normalization;
* symbol lookup;
* type lookup;
* reference resolution;
* graph construction;
* validation;
* KIR lowering;
* explanation;
* diagnostics;
* incremental invalidation.

These services support CLI, editors, language servers, CI, and AI tooling.

---

## 48. Compiler API Principles

Compiler APIs should be:

* versioned;
* deterministic where declared;
* cancellation-aware;
* incremental where practical;
* provenance-preserving;
* side-effect-conscious;
* structured rather than log-only;
* suitable for local-first operation;
* explicit about partial results.

---

## 49. Diagnostics as Structured Output

Diagnostics are first-class compiler output.

A diagnostic conceptually contains:

* diagnostic identity;
* phase;
* severity;
* message;
* semantic condition;
* source locations;
* AST nodes;
* MSG nodes;
* KIR elements;
* related diagnostics;
* remediation;
* waiver state;
* provenance.

Logs are not a substitute for diagnostics.

---

## 50. Explanation

MSC should support explaining:

* why a frontend was selected;
* why a mapping was selected;
* why a reference resolved;
* why a reference remained ambiguous;
* why a type was inferred;
* why authority was assigned;
* why lifecycle blocked use;
* why a conflict was created;
* why KIR was or was not emitted;
* which source produced a generated artifact.

Explanation should derive from recorded compiler decisions rather than generated speculation.

---

## 51. Trust Boundaries

MSC crosses trust boundaries among:

* local files;
* remote connectors;
* third-party frontends;
* mapping packages;
* language packages;
* extension packages;
* AI systems;
* generated ASTs;
* cached semantic data;
* backends.

Every boundary requires explicit trust and validation rules.

---

## 52. Security Principles

MSC should follow these security principles:

* parse untrusted input defensively;
* sandbox third-party executable components;
* avoid ambient filesystem and network authority;
* limit resources;
* preserve provenance;
* prevent authority escalation;
* validate serialized AST and graph inputs;
* verify package identity where practical;
* separate parsing from effectful execution;
* prohibit effectful backends during ordinary validation;
* expose losses and conflicts.

---

## 53. Local-First Operation

Core MSC operations must function locally.

These include:

* source discovery;
* parsing;
* normalization;
* binding;
* type analysis;
* semantic graph construction;
* validation;
* KIR lowering;
* deterministic backend generation.

Remote services may enhance:

* AI assistance;
* external registry resolution;
* connected-source acquisition;
* distributed compilation;
* collaboration.

Remote dependencies must not become mandatory for the core compiler.

---

## 54. Offline Operation

MSC should support offline compilation when all required:

* sources;
* registries;
* language packages;
* mappings;
* extensions;
* dependencies;
* backends;

are available locally.

Offline mode must not silently use stale or incomplete remote assumptions.

---

## 55. Compiler Extensibility

MSC supports extension through registered:

* frontends;
* surface AST schemas;
* normalizers;
* MSL-family languages;
* semantic extensions;
* validators;
* graph passes;
* KIR passes;
* backends;
* renderers;
* diagnostics.

Extensions must use explicit contracts and cannot redefine protected core semantics.

---

## 56. Pass Architecture

MSC may use a pass-based architecture.

A pass conceptually contains:

```text
CompilerPass

├── pass identity
├── version
├── phase family
├── input representation
├── output representation
├── prerequisites
├── dependencies
├── reads
├── writes
├── diagnostics
├── determinism
├── cache behavior
├── effects
└── provenance
```

The detailed pass model belongs to `MSC-CORE-0002`.

---

## 57. Pass Ordering

Pass ordering may derive from:

* explicit dependencies;
* representation prerequisites;
* profile activation;
* language dependencies;
* extension requirements;
* backend requirements.

Ordering must not depend on accidental registration order.

---

## 58. Compiler State

MSC should minimize hidden mutable global state.

Compiler state should be:

* invocation-scoped;
* versioned;
* inspectable;
* cache-aware;
* concurrency-safe;
* serializable where useful.

Global registries must expose stable snapshots or fingerprints for reproducibility.

---

## 59. Concurrency

Independent compiler operations may execute concurrently.

Examples:

* parsing separate sources;
* normalizing independent surface ASTs;
* validating independent graph regions;
* running independent backends.

Concurrency must preserve deterministic semantic results.

Diagnostics should have stable ordering independent of execution timing.

---

## 60. Incremental Compilation

MSC should avoid recompiling unaffected knowledge.

Incremental compilation may use:

* source fingerprints;
* AST node identities;
* semantic fingerprints;
* dependency edges;
* registry fingerprints;
* profile fingerprints;
* pass dependencies;
* KIR projection fingerprints.

The detailed model belongs to `MSC-CORE-0009`.

---

## 61. Caching

Caches may store:

* acquired source;
* parsed surface AST;
* normalized canonical AST;
* symbol indexes;
* type results;
* MSG fragments;
* diagnostics;
* KIR;
* backend outputs.

A cache entry must include all semantically relevant inputs.

Cache reuse must preserve correctness and provenance.

---

## 62. Semantic Invalidations

A change may invalidate:

* one source node;
* one normalized node;
* one symbol;
* reference candidates;
* type results;
* graph edges;
* constraints;
* KIR projections;
* backend outputs.

Invalidation should follow semantic dependency edges rather than directory-wide assumptions where possible.

---

## 63. Compiler Failure Model

MSC failures may include:

* acquisition failure;
* decoding failure;
* parser failure;
* normalization failure;
* binding failure;
* reference failure;
* type failure;
* authority failure;
* lifecycle failure;
* graph failure;
* validation failure;
* lowering failure;
* backend failure;
* reproducibility failure;
* internal compiler failure.

Failures must identify their phase and impact.

---

## 64. Recoverable and Blocking Failures

A recoverable failure permits continued partial analysis.

A blocking failure prevents one or more required outputs.

Examples:

| Failure                           | Possible behavior         |
| --------------------------------- | ------------------------- |
| Informative comment parse failure | warning or local recovery |
| Missing optional reference        | partial                   |
| Missing required type             | block KIR                 |
| Unknown required extension        | block full compilation    |
| Backend formatter failure         | backend failure only      |
| Semantic graph identity collision | block authoritative graph |

Profiles determine exact severity.

---

## 65. Internal Compiler Errors

An internal compiler error indicates a compiler defect, violated invariant, or impossible state.

MSC must:

* preserve the invocation context;
* avoid corrupting source or caches;
* emit a stable internal-error diagnostic;
* preserve a reproducible failure record where practical;
* distinguish internal errors from source errors.

---

## 66. Compilation Success

Compilation success is multidimensional.

Possible states include:

```text
parsed
normalized
bound
analyzed
graph_built
validated
kir_emitted
backend_completed
partial
failed
```

A compilation may succeed at parsing but fail at semantic graph construction.

The compiler must report the highest completed stage and blocked outputs.

---

## 67. Backend Effects

Backends may be:

```text
pure
filesystem_writing
repository_modifying
networked
deployment_effecting
```

Effectful backends require explicit invocation and policy authorization.

Validation must not trigger them implicitly.

---

## 68. Generated Artifact Governance

Generated artifacts must preserve:

* backend identity;
* backend version;
* compiler invocation;
* KIR sources;
* MSG sources;
* canonical AST lineage;
* source lineage;
* generation configuration;
* authority;
* generated status;
* overwrite policy.

Generated artifacts must not masquerade as independently authored source.

---

## 69. Round-Trip Workflows

Some workflows may import, compile, transform, and regenerate source.

Round-trip tooling must declare:

* preservation level;
* canonical source;
* generated source;
* conflict behavior;
* loss behavior;
* ownership;
* overwrite rules.

MSC must not assume every generated artifact is safe to re-import as authoritative intent.

---

## 70. AI Integration

AI systems may assist with:

* source classification;
* normalization proposals;
* reference suggestions;
* requirement extraction;
* type proposals;
* conflict explanation;
* migration proposals;
* backend generation;
* diagnostic remediation.

AI output must remain:

* provenance-tagged;
* confidence-aware where appropriate;
* nonauthoritative until adopted;
* subject to deterministic compiler validation;
* isolated from silent lifecycle transitions.

---

## 71. AI Context

MSC may produce AI context from:

* MSG projections;
* relevant source excerpts;
* authority-filtered requirements;
* dependency subgraphs;
* conflicts;
* provenance;
* diagnostics.

Raw KIR is not always the best AI context.

MSG is the preferred semantic source unless a task specifically requires backend-lowered details.

---

## 72. Compiler and MKE Boundary

MSC:

* constructs representations;
* performs semantic analysis;
* emits diagnostics;
* creates MSG and KIR.

MKE:

* persists;
* indexes;
* queries;
* versions;
* serves;
* synchronizes;
* projects compiled knowledge.

MSC may compile without MKE persistence.

MKE may serve prior compiled results without running a new compilation.

---

## 73. Compiler and MSG Boundary

MSC owns MSG construction.

MSG specifications define:

* graph schema;
* node kinds;
* edge kinds;
* graph invariants;
* graph identity;
* graph serialization;
* query semantics;
* graph projections.

MSC must conform to the MSG contract.

---

## 74. Compiler and KIR Boundary

MSC owns KIR lowering.

KIR specifications define:

* lowered representations;
* normalization rules;
* identity;
* deterministic serialization;
* optimization contracts;
* backend compatibility.

MSC must not encode undocumented backend-specific behavior into generic KIR.

---

## 75. Compiler and Backend Boundary

Backends must declare:

* accepted KIR versions;
* accepted MSG projections;
* required profiles;
* required semantic completeness;
* output types;
* effects;
* configuration;
* deterministic behavior;
* provenance behavior.

MSC validates these contracts before invocation.

---

## 76. Compiler and Native Tool Boundary

Monad may coordinate native tools such as:

* Rust compiler;
* Go compiler;
* TypeScript compiler;
* Terraform;
* Kubernetes validators;
* formatters;
* linters;
* test runners.

MSC should treat these as backends, validators, external analyzers, or toolchain services.

Monad does not need to replace every native compiler.

---

## 77. Bootstrap Strategy

MSC does not yet exist to compile its own specifications.

The bootstrap strategy is:

1. author MSC specifications in bootstrap `msl-markdown`;
2. maintain registry records manually;
3. define the complete MSC architecture;
4. define MSG;
5. define KIR;
6. define `MSL-DOCUMENT`;
7. implement a minimal document frontend;
8. implement canonical AST construction;
9. implement minimal binding and semantic graph construction;
10. implement validation;
11. implement KIR lowering;
12. compile the MSL and MSC specification corpus;
13. progressively replace manual bootstrap processes.

---

## 78. Minimal Viable Compiler

The first usable MSC implementation should support:

* local source discovery;
* bootstrap `msl-markdown`;
* YAML front matter;
* document sections;
* requirement identities;
* metadata validation;
* registry loading;
* canonical AST construction;
* basic symbol registration;
* artifact-reference resolution;
* minimal MSG construction;
* diagnostics;
* deterministic serialization;
* registry validation.

It need not initially support:

* every MSL-family language;
* AI normalization;
* distributed compilation;
* effectful backends;
* advanced optimization;
* full self-hosting.

---

## 79. Self-Hosting Goal

MSC approaches self-hosting when:

* MSC specifications compile through MSC;
* language manifests compile through MSC;
* pass definitions are represented as Monad artifacts;
* diagnostics derive from specifications;
* conformance fixtures validate the compiler;
* MSG and KIR schemas derive from specifications;
* the specification registry is compiler-validated or generated;
* a clean bootstrap can reproduce the compiler’s semantic outputs.

---

## 80. Compiler Evolution

MSC must support evolution of:

* source formats;
* frontends;
* AST schemas;
* mappings;
* language versions;
* MSG schemas;
* KIR schemas;
* passes;
* extensions;
* backends;
* diagnostics;
* cache formats.

Evolution must preserve compatibility declarations and migrations.

---

## 81. Compiler Versioning

MSC version is distinct from:

* MSL platform version;
* language version;
* frontend version;
* AST version;
* mapping version;
* MSG version;
* KIR version;
* backend version.

Compiler version alone is insufficient to reproduce compilation.

---

## 82. Compiler Conformance

MSC conformance must eventually test:

* source discovery;
* frontend selection;
* parsing;
* normalization;
* identity preservation;
* symbol binding;
* reference resolution;
* type analysis;
* authority preservation;
* lifecycle validation;
* semantic graph construction;
* conflict preservation;
* KIR lowering;
* diagnostics;
* incrementality;
* reproducibility;
* security boundaries;
* backend contracts.

---

## 83. Normative Requirements

### MSC-VISION-REQ-001

MSC **MUST** preserve the architectural distinction among source, surface AST, canonical MSL AST, MSG, KIR, and generated artifacts.

### MSC-VISION-REQ-002

MSC **MUST** preserve traceability across every representation transition.

### MSC-VISION-REQ-003

MSC **MUST** support multiple source formats and MSL-family languages through registered frontends.

### MSC-VISION-REQ-004

MSC **MUST** support source-domain normalization through registered versioned mappings.

### MSC-VISION-REQ-005

MSC **MUST** construct or consume the canonical MSL AST before common semantic analysis.

### MSC-VISION-REQ-006

MSC **MUST** construct MSG before general KIR lowering.

### MSC-VISION-REQ-007

MSC **MUST** preserve semantic conflicts rather than flatten them silently.

### MSC-VISION-REQ-008

MSC **MUST** distinguish observed, inferred, proposed, normative, and machine-normative knowledge.

### MSC-VISION-REQ-009

MSC **MUST NOT** silently increase semantic authority.

### MSC-VISION-REQ-010

MSC **MUST NOT** silently promote lifecycle state.

### MSC-VISION-REQ-011

MSC **MUST** preserve source, normalization, binding, graph, and lowering provenance.

### MSC-VISION-REQ-012

MSC **MUST** produce structured diagnostics.

### MSC-VISION-REQ-013

MSC diagnostics **MUST** identify the phase in which the condition was detected.

### MSC-VISION-REQ-014

MSC **MUST** distinguish partial success from complete successful compilation.

### MSC-VISION-REQ-015

MSC **MUST NOT** emit complete authoritative KIR when blocking semantic errors remain.

### MSC-VISION-REQ-016

MSC **MUST** support local-first core compilation.

### MSC-VISION-REQ-017

MSC **MUST NOT** require a remote AI service for deterministic parsing, binding, validation, graph construction, or KIR lowering.

### MSC-VISION-REQ-018

MSC **MUST** distinguish deterministic and nondeterministic phases.

### MSC-VISION-REQ-019

Nondeterministic AI-assisted output **MUST** remain provisional until validated and adopted.

### MSC-VISION-REQ-020

MSC **MUST** preserve all semantically relevant configuration in compilation provenance or fingerprints.

### MSC-VISION-REQ-021

MSC **MUST** support explicit compilation profiles.

### MSC-VISION-REQ-022

Effective compiler configuration **MUST** be inspectable.

### MSC-VISION-REQ-023

MSC **MUST** preserve registry, frontend, mapping, language, extension, MSG, KIR, and backend versions used by a compilation.

### MSC-VISION-REQ-024

MSC **MUST** treat serialized AST, MSG, KIR, cache, and third-party plugin inputs as untrusted until validated.

### MSC-VISION-REQ-025

MSC **MUST** separate ordinary validation from effectful backend execution.

### MSC-VISION-REQ-026

Effectful backends **MUST** require explicit invocation and applicable authorization.

### MSC-VISION-REQ-027

MSC **MUST** prevent accidental pass ordering based solely on registration order.

### MSC-VISION-REQ-028

Compiler-pass dependencies **MUST** be explicit or deterministically derived.

### MSC-VISION-REQ-029

MSC **MUST** support cancellation or bounded termination for compiler operations.

### MSC-VISION-REQ-030

MSC **MUST** enforce applicable resource limits on untrusted frontends, parsers, mappings, extensions, and backends.

### MSC-VISION-REQ-031

MSC **MUST** support compilation manifests or equivalent structured compilation records.

### MSC-VISION-REQ-032

Generated artifacts **MUST** preserve lineage to the compiler invocation and semantic inputs that produced them.

### MSC-VISION-REQ-033

Generated artifacts **MUST** remain distinguishable from authored source.

### MSC-VISION-REQ-034

MSC **MUST** support explanation of applicable deterministic compiler decisions.

### MSC-VISION-REQ-035

Compiler explanations **MUST** derive from recorded decisions and evidence rather than unsupported speculation.

### MSC-VISION-REQ-036

MSC **MUST** preserve external identities during import and normalization when available.

### MSC-VISION-REQ-037

MSC **MUST** support incremental compilation as an architectural capability.

### MSC-VISION-REQ-038

Compiler caches **MUST** include all semantically relevant inputs in their validity decisions.

### MSC-VISION-REQ-039

MSC **MUST NOT** reuse stale cache entries after incompatible semantic inputs change.

### MSC-VISION-REQ-040

Concurrency **MUST NOT** change semantic compilation outcomes.

### MSC-VISION-REQ-041

Diagnostic ordering **SHOULD** remain stable under equivalent inputs despite concurrent execution.

### MSC-VISION-REQ-042

Internal compiler errors **MUST** remain distinguishable from source and semantic errors.

### MSC-VISION-REQ-043

An internal compiler error **MUST NOT** corrupt source artifacts or valid cache entries.

### MSC-VISION-REQ-044

MSC **MUST** support batch and interactive compilation modes.

### MSC-VISION-REQ-045

Interactive compiler results **MUST** remain distinguishable from final validated outputs.

### MSC-VISION-REQ-046

MSC **MUST** support explicit partial compilation.

### MSC-VISION-REQ-047

Partial compilation **MUST** identify blocked phases and unavailable outputs.

### MSC-VISION-REQ-048

MSC **MUST** validate backend compatibility before backend invocation.

### MSC-VISION-REQ-049

Backends **MUST** declare accepted MSG, KIR, profile, effect, and output contracts.

### MSC-VISION-REQ-050

MSC self-hosting claims **MUST** identify a reproducible bootstrap path.

---

## 84. Conceptual Model

```text
Monad Specification Compiler

├── Source Manager
│   ├── discovery
│   ├── acquisition
│   ├── classification
│   └── fingerprinting
│
├── Frontend Manager
│   ├── language resolution
│   ├── parser selection
│   ├── surface AST
│   └── source diagnostics
│
├── Normalization Manager
│   ├── mapping selection
│   ├── canonical AST
│   ├── ambiguity
│   └── loss reporting
│
├── Semantic Compiler
│   ├── declarations
│   ├── symbols
│   ├── namespaces
│   ├── references
│   ├── types
│   ├── constraints
│   ├── authority
│   ├── lifecycle
│   └── compatibility
│
├── Semantic Graph Builder
│   ├── nodes
│   ├── edges
│   ├── provenance
│   ├── conflicts
│   └── dependencies
│
├── Validator
│   ├── invariants
│   ├── profiles
│   ├── conformance
│   └── diagnostics
│
├── KIR Lowerer
│   ├── selection
│   ├── normalization
│   ├── deterministic ordering
│   └── lineage
│
├── Backend Manager
│   ├── compatibility
│   ├── invocation
│   ├── effects
│   └── generated artifacts
│
└── Compilation Services
    ├── caching
    ├── incrementality
    ├── reproducibility
    ├── explanation
    ├── security
    └── reporting
```

---

## 85. Machine Specification

```yaml
machine_spec:
  kind: specification_compiler_vision

  compiler:
    id: MSC
    name: Monad Specification Compiler
    role: engineering_knowledge_compiler

  primary_inputs:
    - source_artifacts
    - surface_asts
    - canonical_msl_ast
    - registries
    - profiles
    - mappings
    - extensions
    - prior_compilation_state

  primary_outputs:
    - surface_asts
    - canonical_msl_ast
    - semantic_graph
    - diagnostics
    - conformance_reports
    - kir
    - generated_artifacts
    - compilation_manifest

  representation_pipeline:
    - source
    - surface_ast
    - canonical_msl_ast
    - bound_semantic_state
    - typed_semantic_state
    - msg
    - kir
    - backend_ir
    - generated_artifact

  phase_families:
    - acquisition
    - frontend
    - normalization
    - binding
    - analysis
    - graph_construction
    - validation
    - lowering
    - optimization
    - backend
    - reporting

  compiler_modes:
    - inspect
    - parse
    - normalize
    - bind
    - analyze
    - validate
    - compile
    - lower
    - generate
    - migrate
    - explain

  supported_workflows:
    - batch
    - interactive
    - incremental
    - partial
    - strict
    - migration
    - reverse_engineering
    - self_hosting

  architectural_properties:
    multi_source: required
    multi_language: required
    local_first: required
    provenance_preserving: required
    authority_aware: required
    lifecycle_aware: required
    graph_building: required
    deterministic_core: required
    ai_assistance: optional_and_provisional
    incremental: required
    backend_extensible: required

  core_boundaries:
    msl: authoring_and_semantic_language_platform
    msc: compilation_orchestration_and_semantic_analysis
    msg: resolved_queryable_semantic_meaning
    kir: deterministic_backend_oriented_lowered_knowledge
    mke: persistence_indexing_query_and_runtime_services

  success_states:
    - parsed
    - normalized
    - bound
    - analyzed
    - graph_built
    - validated
    - kir_emitted
    - backend_completed
    - partial
    - failed
```

---

## 86. Invariants

```yaml
invariants:
  - id: MSC-VISION-INV-001
    expression: source != surface_ast
    description: Source and source-domain representation remain distinct.

  - id: MSC-VISION-INV-002
    expression: surface_ast != canonical_msl_ast
    description: Source fidelity and common MSL semantics remain distinct.

  - id: MSC-VISION-INV-003
    expression: canonical_msl_ast != msg
    description: Expressed concepts and resolved semantic meaning remain distinct.

  - id: MSC-VISION-INV-004
    expression: msg != kir
    description: Queryable semantic meaning and lowered backend representation remain distinct.

  - id: MSC-VISION-INV-005
    expression: generated_artifact.lineage != null
    description: Generated outputs remain traceable through all compiler representations.

  - id: MSC-VISION-INV-006
    expression: semantic_conflict.silently_flattened == false
    description: Conflicting knowledge remains explicit.

  - id: MSC-VISION-INV-007
    expression: inference.silent_authority_escalation == false
    description: Inferred knowledge does not become authoritative automatically.

  - id: MSC-VISION-INV-008
    expression: lifecycle.silent_promotion == false
    description: Compilation does not promote lifecycle silently.

  - id: MSC-VISION-INV-009
    expression: blocking_semantic_error.complete_authoritative_kir == false
    description: Blocking errors prevent complete authoritative KIR.

  - id: MSC-VISION-INV-010
    expression: core_compilation.requires_remote_service == false
    description: Core compiler operation remains local-first.

  - id: MSC-VISION-INV-011
    expression: nondeterministic_output.authority in [provisional, informative]
    description: Nondeterministic output remains nonauthoritative until adopted.

  - id: MSC-VISION-INV-012
    expression: effective_configuration.inspectable == true
    description: Compilation behavior can be explained from visible configuration.

  - id: MSC-VISION-INV-013
    expression: ordinary_validation.executes_effectful_backend == false
    description: Validation does not cause external effects.

  - id: MSC-VISION-INV-014
    expression: cache_reuse.semantic_inputs_match == true
    description: Cached results are reused only for compatible semantic inputs.

  - id: MSC-VISION-INV-015
    expression: concurrent_execution.semantic_result_variation == false
    description: Concurrency does not change meaning.

  - id: MSC-VISION-INV-016
    expression: self_hosting.reproducible_bootstrap_chain != null
    description: Self-hosting remains demonstrably reproducible.
```

---

## 87. Diagnostics

### MSC0001 — Unsupported Source

No registered frontend can process the source.

### MSC0002 — Source Acquisition Failed

MSC could not acquire the declared source.

### MSC0003 — Frontend Resolution Failed

No compatible frontend satisfies source, language, profile, or trust requirements.

### MSC0004 — Surface Parse Failed

The selected frontend could not construct a permitted surface AST.

### MSC0005 — Normalization Mapping Missing

No compatible mapping can normalize the surface AST into the target MSL version.

### MSC0006 — Canonical AST Construction Failed

MSC could not construct valid or permitted partial canonical nodes.

### MSC0007 — Declaration Binding Failed

One or more declarations could not be registered in semantic scope.

### MSC0008 — Namespace Construction Failed

Namespace scopes or imports could not be constructed consistently.

### MSC0009 — Reference Resolution Failed

A required reference could not be resolved.

### MSC0010 — Reference Ambiguous

Multiple compatible reference targets remain.

### MSC0011 — Type Analysis Failed

A required type could not be determined or validated.

### MSC0012 — Constraint Analysis Failed

A required constraint could not be bound, evaluated, or validated.

### MSC0013 — Authority Validation Failed

Semantic content claims unsupported authority.

### MSC0014 — Lifecycle Validation Failed

A lifecycle state or transition is incompatible with the active operation.

### MSC0015 — Compatibility Analysis Failed

Participating language, schema, extension, graph, KIR, or backend versions are incompatible.

### MSC0016 — Semantic Conflict Blocks Compilation

Unresolved competing claims prevent deterministic semantic graph construction or lowering.

### MSC0017 — Semantic Graph Construction Failed

MSC could not construct a valid MSG projection.

### MSC0018 — Validation Failed

One or more blocking validation rules failed.

### MSC0019 — KIR Lowering Failed

The semantic graph cannot be lowered under the active KIR contract.

### MSC0020 — Backend Compatibility Failed

The selected backend cannot consume the available MSG or KIR representation.

### MSC0021 — Backend Invocation Failed

A compatible backend failed during execution.

### MSC0022 — Effectful Backend Not Authorized

An effectful backend was requested without applicable authorization.

### MSC0023 — Partial Compilation

Compilation completed only partially and one or more outputs remain unavailable.

### MSC0024 — Reproducibility Metadata Incomplete

The compilation record omits semantically relevant version, source, configuration, or environment information.

### MSC0025 — Stale Cache Rejected

A cache entry does not match active semantic inputs.

### MSC0026 — Nondeterministic Phase Misclassified

A nondeterministic compiler component claims deterministic output.

### MSC0027 — Unauthorized AI Semantic Adoption

AI-generated or inferred semantics were treated as authoritative without adoption evidence.

### MSC0028 — Traceability Chain Broken

A compiler output cannot be traced to its semantic and source inputs.

### MSC0029 — Internal Compiler Error

MSC encountered a violated internal invariant or unexpected state.

### MSC0030 — Self-Hosting Chain Incomplete

A self-hosting compilation lacks a complete reproducible bootstrap path.

---

## 88. Acceptance Criteria

This specification is satisfied when:

1. MSC is defined as a full engineering-knowledge compiler rather than a parser or template engine.
2. Source, surface AST, canonical AST, MSG, KIR, and generated artifacts have distinct roles.
3. MSC owns orchestration across the complete compilation pipeline.
4. Source discovery, frontend selection, normalization, binding, analysis, graph construction, validation, lowering, and backend execution are represented.
5. MSG construction precedes KIR lowering.
6. Semantic conflicts remain explicit.
7. Authority and lifecycle are validated independently.
8. batch, interactive, partial, strict, migration, and self-hosting workflows are supported architecturally.
9. deterministic and nondeterministic phases are distinct.
10. local-first operation is mandatory for the deterministic core.
11. registries for frontends, mappings, languages, extensions, and backends are defined conceptually.
12. diagnostics are structured first-class output.
13. explanation derives from recorded compiler decisions.
14. incrementality and caching are architectural requirements.
15. cache validity includes semantically relevant inputs.
16. concurrency preserves semantic output.
17. effectful backends are isolated from ordinary validation.
18. generated artifacts preserve complete lineage.
19. MKE, MSG, KIR, backend, and native-tool boundaries remain clear.
20. bootstrap and minimum viable compiler strategies are documented.
21. self-hosting requires a reproducible bootstrap chain.
22. later MSC specifications can refine the architecture without contradicting its core invariants.

---

## 89. Conformance Examples

### 89.1 Valid Local Compilation

```text
monad compile specifications/MSL/core
```

Conceptual outcome:

```yaml
compilation:
  mode: compile
  profile: bootstrap
  status: partial

  completed:
    - source_discovery
    - parsing
    - canonical_ast
    - declaration_binding
    - semantic_graph

  blocked:
    - kir_emission

  reason:
    - KIR schema not yet defined
```

This is valid because the compiler reports the highest completed stage without claiming complete KIR output.

### 89.2 Invalid Direct Source-to-KIR Path

```text
Markdown
    ↓
KIR
```

No surface AST, canonical AST, binding, MSG, or semantic validation occurs.

Expected diagnostic:

```text
MSC0028: KIR output lacks required source-to-semantic traceability chain
```

### 89.3 Valid Partial Reference Analysis

```yaml
reference:
  original: MSL-TYPE-0001
  state: unresolved
  reason: target series not yet authored
```

The semantic graph may retain a provisional unresolved reference under the bootstrap profile.

KIR requiring the target must remain blocked.

### 89.4 Invalid Authority Promotion

Imported source code demonstrates a behavior.

MSC converts it directly into an approved normative requirement.

Expected diagnostic:

```text
MSC0027: observed or inferred behavior cannot become authoritative without adoption
```

### 89.5 Valid Generated Artifact Lineage

```yaml
generated_artifact:
  path: generated/schema.json
  backend:
    id: json-schema
    version: 0.1.0

  derived_from:
    kir:
      - kir-type-44

    semantic_graph:
      - msg-type-18

    canonical_ast:
      - canon-type-7

    source:
      - specifications/MSL/type/MSL-TYPE-0001.md
```

### 89.6 Invalid Effectful Validation

```text
monad validate
```

causes a deployment backend to update Kubernetes resources.

Expected diagnostic:

```text
MSC0022: effectful backend execution is not authorized during validation
```

### 89.7 Valid AI Proposal

```yaml
candidate_requirement:
  origin: ai_assisted
  authority: provisional
  confidence: 0.84
  requires_adoption: true
```

MSC may validate the structure while withholding authoritative graph and KIR status.

### 89.8 Invalid Cache Reuse

A cached semantic graph was built under mapping version `0.1.0`.

The current mapping version is `0.2.0`.

MSC reuses the graph without validation.

Expected diagnostic:

```text
MSC0025: cached semantic graph does not match active normalization mapping
```

### 89.9 Valid Backend Compatibility Check

```yaml
backend:
  id: rust-codegen
  accepts:
    kir: ">=0.1.0 <0.2.0"
    profile: executable

available:
  kir: 0.1.0
  profile: executable

result: compatible
```

### 89.10 Invalid Complete Success Claim

Compilation has unresolved blocking references but reports:

```yaml
status: complete
kir_emitted: true
```

Expected diagnostics:

```text
MSC0009: required references remain unresolved
MSC0019: authoritative KIR cannot be emitted
MSC0023: compilation is partial
```

---

## 90. Security and Trust Considerations

MSC processes potentially hostile and highly consequential inputs.

Threats include:

* parser exploitation;
* malicious source packages;
* mapping manipulation;
* extension substitution;
* authority forgery;
* lifecycle forgery;
* provenance removal;
* cache poisoning;
* graph injection;
* KIR tampering;
* backend supply-chain compromise;
* prompt injection;
* resource exhaustion;
* hidden effects;
* dependency confusion.

Implementations should:

* sandbox untrusted executable compiler components;
* validate every representation boundary;
* fingerprint registries and packages;
* enforce resource limits;
* preserve source and transformation lineage;
* separate content authority from component trust;
* prohibit silent authority escalation;
* prohibit silent lifecycle promotion;
* isolate effectful backend execution;
* make losses, ambiguity, and conflicts visible;
* prefer deterministic local implementations for core phases;
* revalidate imported or cached serialized representations.

---

## 91. Evolution and Compatibility

MSC will evolve as the MSL platform, MSG, KIR, and backend ecosystems mature.

Compatible changes may include:

* optional passes;
* new diagnostics;
* additional nonbreaking compiler services;
* new frontend capabilities;
* additional backend categories;
* improved caching.

Breaking changes include:

* changing representation contracts;
* changing pass ordering semantics;
* changing authority rules;
* changing MSG construction;
* changing KIR lowering contracts;
* changing cache validity;
* changing backend effect policies.

Breaking compiler changes require:

* compiler-version changes;
* compatibility documentation;
* cache migration or invalidation;
* fixture updates;
* reproducibility impact analysis;
* preserved prior toolchain records.

---

## 92. Open Questions

1. Which implementation language should host the initial MSC reference compiler?
2. Should parsing and semantic compilation exist in one binary or several libraries?
3. Should compiler passes use immutable snapshots or mutable contexts?
4. What is the minimum public compiler API?
5. How should third-party passes be distributed and sandboxed?
6. Should MSG construction use an in-memory graph, relational structures, or generated data types first?
7. When should compiler output be persisted to MKE?
8. How should interactive compiler services communicate with editors?
9. What is the canonical compilation-manifest schema?
10. Which phases may run concurrently?
11. How should diagnostics be stabilized across compiler versions?
12. What is the cache storage format?
13. Should semantic fingerprints be cryptographic?
14. How should remote source acquisition integrate with local reproducibility?
15. What compiler mode should `monad validate` use by default?
16. What compiler mode should `monad inspect` use?
17. Should KIR lowering be one pass or a family of target-independent passes?
18. Can backends consume MSG directly?
19. Which backend effects require human confirmation?
20. What is the minimum semantic graph needed before the first parser implementation?
21. Should AI-assisted phases run inside MSC or as external proposal services?
22. How should compilation waivers be represented?
23. Should compiler passes be specified in MSL?
24. How should the compiler bootstrap its own registries?
25. What conditions define MSC 1.0 readiness?

---

## 93. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0002 | Compilation Pipeline and Phase Model              |
| MSC-CORE-0003 | Source Discovery and Compilation Units            |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration             |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding         |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

It establishes the compiler foundation for:

| Series         | Purpose                                       |
| -------------- | --------------------------------------------- |
| MSG-CORE       | Resolved semantic graph                       |
| KIR-CORE       | Deterministic lowered knowledge               |
| MSL-DOCUMENT   | Initial host language and Markdown frontend   |
| MSL-TYPE       | Type semantics                                |
| MSL-EXPR       | Expression semantics                          |
| MSL-CONSTRAINT | Constraints and invariants                    |
| MKE            | Persistence and serving of compiled knowledge |
| CLI            | Compiler command interface                    |
| BACKEND        | Target generation contracts                   |

---

## Status

Draft.

This document establishes the constitutional vision and architecture of the Monad Specification Compiler.

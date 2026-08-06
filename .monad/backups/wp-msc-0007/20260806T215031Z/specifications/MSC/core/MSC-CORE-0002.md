---
id: "MSC-CORE-0002"
title: "Compilation Pipeline and Phase Model"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 2
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "compiler-pipeline"
  - "phases"
  - "passes"
  - "scheduling"
  - "semantic-graph"
  - "kir"
  - "incrementality"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "MSL-CORE-0001"
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE-0001"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSC-CORE-0003"
  - "MSC-CORE-0004"
  - "MSC-CORE-0005"
  - "MSC-CORE-0006"
  - "MSC-CORE-0007"
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MSG-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0002 — Compilation Pipeline and Phase Model

## 1. Purpose

This specification defines the compilation pipeline, phase architecture, pass model, scheduling rules, representation transitions, dependency semantics, execution modes, cancellation behavior, and completion model of the Monad Specification Compiler.

It establishes:

* the canonical MSC pipeline;
* compiler phase families;
* compiler passes;
* pass inputs and outputs;
* phase prerequisites;
* pass dependencies;
* scheduling;
* concurrency;
* incremental execution;
* partial compilation;
* phase completion;
* failure propagation;
* representation ownership;
* validation barriers;
* cache boundaries;
* effect boundaries;
* phase diagnostics;
* extension passes;
* deterministic execution;
* compilation plans.

This document defines how MSC organizes compilation work.

Later documents define the detailed semantics of individual phase families.

---

## 2. Context

MSC transforms heterogeneous engineering sources through several representations:

```text
Source
    ↓
Surface AST
    ↓
Canonical MSL AST
    ↓
Bound and Typed Semantic State
    ↓
Monad Semantic Graph
    ↓
KIR
    ↓
Backend Artifacts
```

Each transition has different correctness, trust, authority, and completeness requirements.

A compiler implemented as one large procedure would make it difficult to:

* identify which work has completed;
* reuse prior results;
* execute independent work concurrently;
* support editor latency;
* explain compiler decisions;
* isolate failures;
* schedule extension logic safely;
* distinguish pure validation from effects;
* invalidate only affected results;
* reproduce builds;
* test compiler stages independently.

MSC therefore requires an explicit pipeline and pass architecture.

---

## 3. Scope

This specification defines:

* phase families;
* phases;
* passes;
* compilation plans;
* pass manifests;
* representation contracts;
* phase barriers;
* dependency graphs;
* scheduling;
* concurrency;
* determinism;
* pass isolation;
* pass effects;
* incremental execution;
* caching;
* invalidation;
* partial execution;
* cancellation;
* failure propagation;
* phase status;
* output readiness;
* compiler extension points;
* pass conformance.

This specification does not fully define:

* source-discovery rules;
* concrete frontend orchestration;
* symbol-table implementation;
* namespace-resolution algorithms;
* type-system semantics;
* MSG schema;
* KIR schema;
* backend protocols;
* diagnostic rendering;
* cache serialization.

---

## 4. Non-Goals

This document does not:

* prescribe one programming language or concurrency runtime;
* require every implementation to materialize every intermediate representation;
* require every phase to be a separate process;
* require all passes to execute for every compilation;
* permit extensions to reorder protected compiler phases arbitrarily;
* define backend-specific optimization;
* make registration order semantically meaningful;
* allow ordinary validation to execute effectful passes;
* guarantee successful recovery from every compiler error;
* replace detailed pass specifications.

---

## 5. Core Principle

> Compilation is a dependency-ordered transformation of explicit representations through independently testable semantic stages.

A compiler phase must declare:

* what it consumes;
* what it produces;
* what it depends on;
* what it may read;
* what it may modify;
* whether it is deterministic;
* whether it is cacheable;
* whether it has effects;
* how it reports failure;
* which downstream outputs it enables.

---

## 6. Canonical Pipeline

The canonical high-level pipeline is:

```text
Invocation Planning
    ↓
Source Discovery
    ↓
Source Acquisition
    ↓
Source Classification
    ↓
Frontend Resolution
    ↓
Surface Parsing
    ↓
Surface Validation
    ↓
Normalization
    ↓
Canonical AST Assembly
    ↓
Declaration Collection
    ↓
Namespace Construction
    ↓
Import and Export Resolution
    ↓
Symbol Binding
    ↓
Reference Resolution
    ↓
Type and Constraint Analysis
    ↓
Authority and Lifecycle Analysis
    ↓
Compatibility and Profile Analysis
    ↓
Semantic Graph Construction
    ↓
Graph Validation
    ↓
Conformance Evaluation
    ↓
KIR Lowering
    ↓
KIR Optimization
    ↓
Backend Planning
    ↓
Backend Execution
    ↓
Compilation Reporting
```

Not every invocation executes every stage.

The active mode and profile select the required subgraph.

---

## 7. Terminology

### 7.1 Pipeline

The complete dependency-ordered compilation workflow.

### 7.2 Phase Family

A broad category of compiler responsibility.

### 7.3 Phase

A logically coherent compilation stage with defined prerequisites and completion criteria.

### 7.4 Pass

A versioned executable compiler operation within a phase.

### 7.5 Compilation Plan

The resolved graph of phases and passes selected for one invocation.

### 7.6 Pass Manifest

The declaration of a pass’s identity, inputs, outputs, dependencies, effects, and compatibility.

### 7.7 Representation

A structured compiler data model passed between phases.

### 7.8 Phase Barrier

A point at which defined invariants must hold before dependent phases may proceed.

### 7.9 Pass Dependency

A declared requirement that one pass’s result or side table must exist before another pass executes.

### 7.10 Read Set

The compiler state or representations a pass may inspect.

### 7.11 Write Set

The compiler state or representations a pass may produce or modify.

### 7.12 Invalidation

The process of marking prior results stale after relevant inputs change.

### 7.13 Fixed-Point Pass

A pass or pass group repeated until no relevant semantic changes remain.

### 7.14 Terminal Phase

A phase that produces a user-requested output or ends a compilation branch.

### 7.15 Protected Phase

A core phase whose semantic ordering cannot be overridden by ordinary extensions.

---

## 8. Phase Families

MSC defines the following initial phase families:

```text
planning
discovery
acquisition
classification
frontend
surface_validation
normalization
canonicalization
binding
resolution
analysis
graph_construction
graph_validation
conformance
lowering
optimization
backend
reporting
```

Each family may contain one or more phases and passes.

---

## 9. Planning Phase

Planning resolves the requested compilation operation before source processing begins.

It determines:

* compiler mode;
* compilation profile;
* source roots;
* requested outputs;
* target languages;
* target MSG version;
* target KIR version;
* requested backends;
* enabled extensions;
* trust policy;
* resource limits;
* cache policy;
* strictness;
* allowed effects.

Planning produces the Compilation Plan.

---

## 10. Discovery Phase

Discovery identifies potential compilation sources.

It may inspect:

* explicit input paths;
* repository manifests;
* workspace manifests;
* package manifests;
* standard source directories;
* registry entries;
* editor buffers;
* connector references;
* generated in-memory sources.

Discovery must not silently interpret source semantics.

Detailed discovery rules belong to `MSC-CORE-0003`.

---

## 11. Acquisition Phase

Acquisition retrieves source content or source objects.

It may:

* read local files;
* read Git objects;
* access editor buffers;
* retrieve allowed connector data;
* load registry artifacts;
* load serialized ASTs;
* load prior graph fragments.

Acquisition records:

* source identity;
* source revision;
* content fingerprint;
* acquisition method;
* trust classification;
* access policy;
* timestamp where relevant.

---

## 12. Classification Phase

Classification determines:

* source media type;
* likely language;
* source role;
* artifact type;
* source version;
* whether content is authored, generated, imported, or observed;
* candidate frontends.

Classification may be deterministic or heuristic.

Heuristic classifications must remain provisional until confirmed by parsing or explicit configuration.

---

## 13. Frontend Resolution Phase

Frontend resolution selects compatible frontends based on:

* source type;
* language identity;
* syntax identity;
* language version;
* frontend capabilities;
* trust;
* profile;
* extension support;
* round-trip requirements.

Frontend selection must not rely on registration order.

---

## 14. Surface Parsing Phase

Surface parsing transforms source into a surface AST or direct canonical input where permitted.

It may produce:

* complete surface AST;
* partial surface AST;
* syntax diagnostics;
* recovery nodes;
* source maps;
* source trivia;
* source-domain symbols.

Parsing does not establish common MSL semantic validity.

---

## 15. Surface Validation Phase

Surface validation applies source-domain rules.

Examples:

* OpenAPI structural validation;
* Markdown region structure;
* JSON Schema validity;
* source-language parse validity;
* Terraform configuration structure.

A source may pass surface validation and still fail semantic normalization.

---

## 16. Normalization Phase

Normalization transforms source-domain structures into canonical MSL concepts.

It performs:

* mapping selection;
* source-fact extraction;
* external-identity preservation;
* canonical-node construction;
* ambiguity reporting;
* authority assignment;
* provenance attachment;
* loss reporting.

Detailed normalization behavior is defined by MSL and `MSC-CORE-0004`.

---

## 17. Canonicalization Phase

Canonicalization assembles normalized and directly authored canonical MSL AST units.

It may:

* merge supplementary sources;
* attach document structure;
* apply permitted metadata defaults;
* validate protected identity fields;
* preserve unresolved nodes;
* create canonical compilation units;
* calculate canonical AST fingerprints.

Canonicalization must not perform final semantic binding.

---

## 18. Declaration Collection Phase

Declaration collection identifies canonical declarations.

It produces:

* declaration inventory;
* semantic identity claims;
* declaration kinds;
* namespace ownership candidates;
* duplicate-identity candidates;
* preliminary symbols.

Detailed declaration semantics belong to `MSC-CORE-0005`.

---

## 19. Namespace Construction Phase

Namespace construction creates semantic scopes.

It determines:

* namespace identities;
* parent-child namespace structure;
* package and module context;
* implicit and explicit imports;
* aliases;
* visibility boundaries.

Filesystem layout may inform discovery but does not define namespace identity.

---

## 20. Import and Export Resolution Phase

This phase determines:

* imported declarations;
* exported declarations;
* import modes;
* version constraints;
* alias mappings;
* visibility;
* dependency closure;
* unavailable dependencies.

It may produce unresolved import records during partial compilation.

---

## 21. Symbol Binding Phase

Binding associates declarations with compiler symbols.

It may:

* assign symbol IDs;
* populate symbol scopes;
* associate members with declarations;
* detect duplicate canonical identities;
* record conflicting declarations;
* construct symbol indexes.

Binding does not guarantee that references are resolved.

---

## 22. Reference Resolution Phase

Reference resolution maps references to semantic targets.

It considers:

* original reference form;
* namespace context;
* imports;
* aliases;
* expected target kind;
* version;
* visibility;
* lifecycle;
* candidate compatibility.

Outcomes include:

* resolved;
* ambiguous;
* missing;
* incompatible;
* invisible;
* deferred;
* deprecated;
* superseded.

---

## 23. Type Analysis Phase

Type analysis determines:

* declared types;
* inferred types;
* assignability;
* equivalence;
* semantic-type compatibility;
* nullability;
* optionality;
* unknown and error types;
* type constraints;
* conversion validity.

Type analysis may remain partial.

---

## 24. Constraint and Invariant Analysis Phase

This phase:

* binds constraint targets;
* resolves constraint expressions;
* validates operators;
* checks static predicates;
* constructs invariant dependencies;
* identifies unevaluable constraints;
* prepares runtime or KIR validation plans.

Constraint evaluation must obey language execution limits.

---

## 25. Authority Analysis Phase

Authority analysis determines:

* effective authority;
* authority inheritance;
* authority transitions;
* adoption evidence;
* unauthorized escalation;
* source-of-truth conflicts;
* inferred versus approved semantics.

Authority analysis must preserve competing claims.

---

## 26. Lifecycle Analysis Phase

Lifecycle analysis determines:

* effective lifecycle;
* lifecycle inheritance;
* transition validity;
* deprecation;
* supersession;
* archival;
* active applicability;
* incompatible referenced lifecycle states.

Lifecycle and authority remain distinct.

---

## 27. Compatibility and Profile Analysis Phase

This phase evaluates:

* platform compatibility;
* language compatibility;
* AST compatibility;
* extension compatibility;
* MSG target compatibility;
* KIR target compatibility;
* backend compatibility;
* active profile rules;
* required feature availability.

Unsupported required features block dependent outputs.

---

## 28. Conflict Construction Phase

Conflict construction materializes incompatible semantic claims.

Conflicts may concern:

* identity;
* metadata;
* authority;
* lifecycle;
* references;
* types;
* requirements;
* relationships;
* imports;
* normalization;
* compatibility.

Conflicts are semantic data, not only diagnostics.

---

## 29. Semantic Graph Construction Phase

This phase constructs MSG nodes and edges from analyzed canonical semantics.

It may create:

* declaration nodes;
* type nodes;
* requirement nodes;
* relationship edges;
* provenance edges;
* authority edges;
* lifecycle edges;
* dependency edges;
* conflict nodes;
* conformance edges;
* source-lineage edges.

Detailed graph construction belongs to `MSC-CORE-0008`.

---

## 30. Graph Validation Phase

Graph validation checks:

* identity uniqueness;
* edge endpoint validity;
* graph invariants;
* prohibited cycles;
* authority consistency;
* lifecycle consistency;
* provenance completeness;
* unresolved required semantics;
* conflict-state validity;
* source traceability.

Graph validation determines whether graph projections are KIR-ready.

---

## 31. Conformance Evaluation Phase

Conformance evaluation applies:

* specification acceptance criteria;
* compiler conformance fixtures;
* profile requirements;
* invariant checks;
* implementation evidence;
* backend prerequisites.

Conformance evidence must identify the graph and source versions evaluated.

---

## 32. KIR Lowering Phase

KIR lowering transforms eligible MSG projections into backend-neutral deterministic structures.

It may:

* select nodes and edges;
* lower types;
* lower constraints;
* normalize relationship forms;
* assign lowered identities;
* order dependencies;
* remove nonsemantic presentation structure;
* preserve traceability.

Detailed lowering belongs to `MSC-CORE-0010` and KIR specifications.

---

## 33. KIR Optimization Phase

Optimization transforms KIR while preserving target-observable semantics.

Potential passes include:

* deduplication;
* constant folding;
* constraint simplification;
* dependency ordering;
* dead-projection elimination;
* canonical ordering;
* backend specialization.

Optimization passes must declare semantic-preservation guarantees.

---

## 34. Backend Planning Phase

Backend planning determines:

* selected backend;
* accepted input version;
* required profile;
* required semantic completeness;
* output paths;
* overwrite policy;
* effects;
* sandbox policy;
* execution order;
* dependency on other backends.

Backend planning occurs before effectful work.

---

## 35. Backend Execution Phase

Backend execution consumes compatible KIR or MSG projections.

Backends may:

* validate;
* generate;
* render;
* export;
* create plans;
* write files;
* invoke native tools;
* perform authorized external actions.

Effectful execution requires explicit authorization.

---

## 36. Reporting Phase

Reporting aggregates:

* completed phases;
* skipped phases;
* blocked phases;
* diagnostics;
* outputs;
* partial results;
* cache usage;
* pass timings;
* source inventory;
* version inventory;
* reproducibility data;
* generated-artifact manifests.

Reporting must execute even after recoverable failure where practical.

---

## 37. Pass Model

A compiler pass is a versioned operation with a declared contract.

Conceptual model:

```text
CompilerPass

├── pass_id
├── pass_version
├── phase_family
├── input_contract
├── output_contract
├── prerequisites
├── dependencies
├── read_set
├── write_set
├── determinism
├── purity
├── effects
├── cache_policy
├── invalidation_keys
├── concurrency_policy
├── resource_limits
├── diagnostics
├── compatibility
└── provenance
```

---

## 38. Pass Identity

Every pass must have stable identity.

Examples:

```text
msc.frontend.parse-markdown
msc.normalization.openapi-to-msl
msc.binding.collect-declarations
msc.resolution.resolve-references
msc.graph.build-requirement-edges
msc.kir.lower-types
```

Pass identity remains distinct from implementation package identity.

---

## 39. Pass Version

A pass version changes when observable pass behavior changes materially.

Version changes may reflect:

* semantic behavior;
* diagnostic behavior;
* cache compatibility;
* input schema;
* output schema;
* algorithm corrections;
* security behavior.

Pass versions must participate in cache and reproducibility fingerprints.

---

## 40. Pass Inputs and Outputs

A pass must declare supported representation types and versions.

Example:

```yaml
inputs:
  - representation: canonical_msl_ast
    version: 0.1.0

outputs:
  - representation: declaration_index
    version: 0.1.0
```

A pass must not consume incompatible representations silently.

---

## 41. Pass Read and Write Sets

Read and write declarations support:

* safe scheduling;
* concurrency;
* invalidation;
* testing;
* effect analysis;
* explanation.

Examples:

```text
reads:
- canonical AST declarations
- namespace configuration

writes:
- symbol index
- duplicate declaration diagnostics
```

A pass must not modify undeclared state.

---

## 42. Pass Purity

Initial purity classes are:

```text
pure
contextual
cache_writing
artifact_writing
externally_effectful
```

### 42.1 Pure

Output depends only on declared inputs.

### 42.2 Contextual

Depends on declared compiler context or registry snapshots.

### 42.3 Cache-Writing

May update compiler-managed caches.

### 42.4 Artifact-Writing

May write generated local artifacts.

### 42.5 Externally Effectful

May affect networks, deployments, remote systems, or external services.

Protected semantic phases should be pure or contextual whenever practical.

---

## 43. Pass Determinism

A pass may be:

```text
deterministic
deterministic_under_declared_environment
nondeterministic
```

Nondeterministic passes must not silently produce authoritative semantics.

Deterministic-under-environment passes must record relevant environment inputs.

---

## 44. Pass Dependencies

Dependencies may be:

* hard;
* optional;
* ordering-only;
* data;
* capability;
* feature;
* language;
* extension;
* backend.

Hard dependencies must complete successfully before execution.

Optional dependencies may enrich results but cannot alter core meaning invisibly.

---

## 45. Pass Scheduling

The scheduler constructs a directed acyclic pass graph whenever possible.

Scheduling considers:

* prerequisites;
* representation availability;
* read/write conflicts;
* profile;
* requested outputs;
* pass compatibility;
* effects;
* resource limits;
* cache availability;
* cancellation state.

Registration order must not control scheduling.

---

## 46. Protected Ordering

The following semantic ordering is protected:

```text
source acquisition
before parsing

surface parsing
before normalization

canonicalization
before common binding

binding
before final reference resolution

reference and type analysis
before authoritative MSG validation

MSG validation
before authoritative KIR lowering

backend planning
before effectful backend execution
```

Extensions may add passes within or between permitted boundaries.

They must not violate protected prerequisites.

---

## 47. Phase Barriers

A phase barrier defines invariants required for downstream work.

Examples:

### Surface Barrier

* source parsed or explicitly partial;
* source map available;
* frontend diagnostics recorded.

### Canonical AST Barrier

* canonical node kinds registered;
* source lineage preserved;
* protected identity conflicts recorded.

### Binding Barrier

* declarations collected;
* symbols assigned or conflicting;
* namespace contexts available.

### MSG Barrier

* graph identity established;
* required nodes and edges validated;
* blocking conflicts identified.

### KIR Barrier

* required semantic inputs resolved;
* lowering profile satisfied;
* lineage complete.

---

## 48. Barrier Outcomes

A phase barrier may result in:

```text
passed
passed_with_warnings
partial
blocked
failed
cancelled
```

Downstream execution policies depend on the outcome and active profile.

---

## 49. Compilation Plan

A Compilation Plan is a resolved pass graph for one invocation.

It contains:

* invocation identity;
* requested mode;
* requested outputs;
* profile;
* selected sources;
* selected frontends;
* selected mappings;
* selected languages;
* selected extensions;
* selected passes;
* dependencies;
* cache decisions;
* concurrency groups;
* effect permissions;
* terminal phases.

The plan should be inspectable before execution.

---

## 50. Plan Construction

Plan construction proceeds conceptually:

```text
Read Invocation
    ↓
Resolve Effective Configuration
    ↓
Determine Requested Outputs
    ↓
Resolve Required Representations
    ↓
Select Phase Families
    ↓
Select Compatible Passes
    ↓
Resolve Dependencies
    ↓
Apply Trust and Effect Policy
    ↓
Apply Cache Policy
    ↓
Validate Plan
    ↓
Freeze Plan Snapshot
```

---

## 51. Plan Validation

A plan is invalid when it contains:

* dependency cycles;
* incompatible pass versions;
* missing required passes;
* conflicting write sets;
* unsupported representation transitions;
* unauthorized effects;
* incompatible target versions;
* unsatisfied capabilities;
* nondeterministic passes prohibited by profile.

Invalid plans must fail before compilation effects begin.

---

## 52. Phase Selection by Mode

Conceptual phase selection:

| Mode      | Terminal target                    |
| --------- | ---------------------------------- |
| inspect   | source and configuration inventory |
| parse     | surface AST                        |
| normalize | canonical AST                      |
| bind      | symbol and reference state         |
| analyze   | typed semantic state               |
| validate  | validation report                  |
| compile   | MSG and eligible KIR               |
| lower     | KIR                                |
| generate  | backend artifacts                  |
| migrate   | target-version artifacts           |
| explain   | decision and lineage report        |

A mode may execute prerequisite phases automatically.

---

## 53. Phase Selection by Profile

Profiles may:

* require additional validation;
* prohibit unresolved references;
* prohibit nondeterministic passes;
* require full provenance;
* require approved lifecycle;
* enable partial output;
* restrict extensions;
* restrict backends;
* alter diagnostic severity.

Mode states what output is requested.

Profile states what rules govern producing it.

---

## 54. Conditional Passes

A pass may activate when:

* a language is present;
* an extension is enabled;
* a source format appears;
* a profile requires it;
* a backend requests it;
* a feature is used;
* a conflict category is present;
* prior analysis produces a specific condition.

Conditional activation must be deterministic from declared state.

---

## 55. Fixed-Point Passes

Some semantic analyses may require repeated evaluation.

Examples:

* recursive type inference;
* import closure;
* relationship enrichment;
* profile propagation;
* dependency derivation.

A fixed-point pass group must declare:

* monotonic state;
* termination condition;
* maximum iterations;
* nontermination diagnostic;
* cache behavior;
* deterministic ordering.

Unbounded iteration is prohibited.

---

## 56. Pass Cycles

Pass dependency cycles are invalid unless represented as a registered fixed-point group.

A cycle must not be broken arbitrarily by the scheduler.

---

## 57. Concurrency

Passes may run concurrently when:

* dependencies are satisfied;
* write sets do not conflict;
* read/write isolation is safe;
* effect policy permits it;
* deterministic semantics are preserved;
* resource limits permit it.

Concurrency is an optimization, not a semantic input.

---

## 58. Concurrency Groups

The planner may create concurrency groups.

Examples:

* parsing independent sources;
* validating independent surface ASTs;
* normalizing independent source units;
* checking independent graph components;
* running pure independent backends.

Group membership must be inspectable.

---

## 59. Stable Merge

Concurrent pass outputs must merge deterministically.

Stable merge may use:

* canonical identity;
* declared ordering keys;
* source order where semantic;
* deterministic pass identity;
* explicit conflict construction.

Completion timing must not determine semantic precedence.

---

## 60. Diagnostic Ordering

Diagnostics should be sorted by stable keys such as:

1. source identity;
2. source location;
3. phase order;
4. diagnostic ID;
5. semantic identity.

Runtime scheduling order should not affect presentation order.

---

## 61. Cancellation

MSC operations must support cancellation at safe points.

Cancellation may be requested by:

* user;
* editor;
* CI timeout;
* resource policy;
* parent invocation;
* internal fatal failure.

Passes should check cancellation cooperatively.

---

## 62. Cancellation Safety

After cancellation, MSC must:

* stop scheduling new work;
* allow safe cleanup;
* avoid publishing incomplete authoritative outputs;
* mark partial results;
* preserve completed reusable pure results where valid;
* avoid committing effectful operations not already authorized and completed;
* emit cancellation status.

---

## 63. Timeouts

Passes may have:

* execution timeout;
* inactivity timeout;
* resource timeout;
* external-tool timeout.

Timeouts must produce structured diagnostics.

A timed-out pass is not a successful pass.

---

## 64. Resource Limits

Pass manifests or policies may define:

* CPU limit;
* memory limit;
* input-size limit;
* AST-node limit;
* graph-node limit;
* recursion limit;
* iteration limit;
* external-process limit;
* network restriction.

Resource-limit failures must identify the affected phase.

---

## 65. Partial Compilation

Partial compilation executes all permitted phases despite nonblocking failure.

A partial result may include:

* valid source units;
* partial ASTs;
* partial symbols;
* unresolved references;
* typed subsets;
* partial MSG;
* blocked KIR projections;
* diagnostics;
* missing outputs.

Every partial representation must declare its incompleteness.

---

## 66. Blocking Semantics

A condition blocks an output when the output cannot be produced without inventing, flattening, or misrepresenting semantics.

Examples:

* unresolved required type blocks dependent KIR;
* unknown machine-normative language blocks full MSG;
* identity collision blocks authoritative graph identity;
* missing optional documentation does not block code generation;
* failed publication backend does not invalidate MSG.

Blocking is output-specific.

---

## 67. Failure Propagation

A pass failure may:

* block only that pass;
* block dependent passes;
* block one representation;
* block one backend;
* mark compilation partial;
* abort the invocation;
* trigger fallback where permitted.

Failure propagation must follow declared dependencies and profile rules.

---

## 68. Failure Isolation

Independent source units and backends should remain isolated where safe.

A documentation-renderer failure should not invalidate an already validated MSG.

A required parser failure may block only the affected compilation unit unless it is a mandatory dependency.

---

## 69. Phase Status

Each phase records:

```text
planned
ready
running
completed
completed_with_warnings
partial
skipped
blocked
failed
cancelled
cached
```

A phase must not report `completed` when required outputs are absent.

---

## 70. Pass Status

Each pass records:

* planned;
* waiting;
* running;
* completed;
* cached;
* skipped;
* blocked;
* failed;
* cancelled;
* timed_out.

Pass records include start and completion metadata where applicable.

---

## 71. Representation Readiness

A representation may have readiness states:

```text
unavailable
partial
structurally_valid
bound
typed
validated
authoritative
backend_ready
```

These states are not interchangeable.

A validated partial MSG is not necessarily authoritative or KIR-ready.

---

## 72. Terminal Outputs

A requested output is successful only when its declared readiness contract is satisfied.

Examples:

* parse mode requires a permitted surface AST;
* normalize mode requires a permitted canonical AST;
* strict compile requires validated MSG;
* lower mode requires compatible KIR;
* generate mode requires successful selected backends.

The invocation may have multiple output statuses.

---

## 73. Cache Boundaries

Cacheable boundaries may include:

* acquired source;
* decoded source;
* surface AST;
* surface validation;
* canonical AST;
* declaration index;
* namespace graph;
* reference results;
* type results;
* MSG fragments;
* validation results;
* KIR;
* backend outputs.

Each cache boundary requires a validity fingerprint.

---

## 74. Cache Fingerprints

A cache fingerprint may include:

* input representation fingerprint;
* pass identity and version;
* compiler version;
* profile;
* semantic configuration;
* registry snapshots;
* extension versions;
* target versions;
* environment inputs;
* dependency fingerprints.

Omitting semantically relevant inputs invalidates the cache contract.

---

## 75. Incremental Execution

Incremental execution compares current inputs with prior compilation state.

It determines:

* changed sources;
* changed AST nodes;
* changed declarations;
* changed symbols;
* affected references;
* affected type results;
* affected graph regions;
* affected KIR projections;
* affected backends.

Only affected passes and dependencies should rerun where safe.

---

## 76. Invalidation Graph

MSC should maintain a semantic invalidation graph connecting:

```text
Source
→ Surface Nodes
→ Canonical Nodes
→ Symbols
→ References
→ Type Results
→ MSG Nodes and Edges
→ KIR Elements
→ Generated Artifacts
```

Invalidation propagates through these relationships.

---

## 77. Fine-Grained and Coarse-Grained Invalidation

Implementations may begin with coarse invalidation.

Example:

```text
file changed
→ reparse file
→ renormalize specification
→ rebuild compilation unit
```

Later implementations may use node-level invalidation.

The architecture must permit refinement without changing semantics.

---

## 78. Pass Extensions

Extensions may register passes for:

* source formats;
* languages;
* normalization mappings;
* semantic validation;
* MSG enrichment;
* KIR transformation;
* backends.

Extension passes must declare the same contracts as core passes.

---

## 79. Protected Compiler Invariants

Extension passes must not:

* bypass source provenance;
* silently alter canonical identity;
* silently elevate authority;
* silently promote lifecycle;
* erase conflicts;
* mutate protected core state outside declared integration points;
* execute effects during protected pure phases;
* forge completion status;
* sever lineage.

---

## 80. Pass Trust

Pass trust classifications may include:

```text
built_in
trusted
reviewed
sandboxed
untrusted
disabled
```

Pass trust affects execution policy.

It does not grant semantic authority to pass outputs.

---

## 81. Pass Sandboxing

Sandboxed passes may receive:

* immutable input snapshots;
* limited temporary storage;
* no ambient network;
* no unrestricted filesystem access;
* resource limits;
* structured output channels.

Outputs must be validated before integration.

---

## 82. Pass Conformance

Pass conformance evaluates:

* input validation;
* output validation;
* deterministic behavior;
* dependency declaration;
* read/write discipline;
* effect declaration;
* cache correctness;
* diagnostic behavior;
* cancellation;
* resource limits;
* provenance.

---

## 83. Pipeline Conformance

Pipeline conformance evaluates:

* protected phase ordering;
* plan determinism;
* dependency resolution;
* failure propagation;
* stable merge;
* output readiness;
* partial compilation;
* cache invalidation;
* cancellation;
* effect isolation;
* reproducibility.

---

## 84. Compilation Trace

MSC should record a compilation trace containing:

* plan;
* selected phases;
* selected passes;
* dependency graph;
* cache hits;
* cache misses;
* phase outcomes;
* pass outcomes;
* diagnostics;
* representation fingerprints;
* output statuses.

The trace may be summarized for users and retained in detail for debugging.

---

## 85. Explanation Support

The phase model enables explanation of:

* why a pass ran;
* why a pass was skipped;
* why a pass was cached;
* why a pass was blocked;
* why one output was available and another was not;
* which dependency caused failure;
* which source change triggered invalidation;
* which pass produced a semantic decision.

---

## 86. Normative Requirements

### MSC-PIPE-REQ-001

MSC **MUST** model compilation as an explicit dependency-ordered pipeline.

### MSC-PIPE-REQ-002

Every compiler phase **MUST** declare its prerequisites and completion criteria.

### MSC-PIPE-REQ-003

Every compiler pass **MUST** have stable identity and version.

### MSC-PIPE-REQ-004

Every compiler pass **MUST** declare accepted input representations and produced output representations.

### MSC-PIPE-REQ-005

Pass input and output contracts **MUST** identify applicable schema versions.

### MSC-PIPE-REQ-006

Every compiler pass **MUST** declare its dependencies.

### MSC-PIPE-REQ-007

Pass scheduling **MUST NOT** depend on accidental registration order.

### MSC-PIPE-REQ-008

Protected compiler phase ordering **MUST NOT** be violated by extension passes.

### MSC-PIPE-REQ-009

Every pass **MUST** declare its read and write sets or an equivalent state-access contract.

### MSC-PIPE-REQ-010

A pass **MUST NOT** modify undeclared compiler state.

### MSC-PIPE-REQ-011

Every pass **MUST** declare determinism classification.

### MSC-PIPE-REQ-012

Every pass **MUST** declare purity and effect classification.

### MSC-PIPE-REQ-013

Effectful passes **MUST NOT** execute during ordinary validation unless explicitly requested and authorized.

### MSC-PIPE-REQ-014

Every pass **MUST** declare cacheability and invalidation inputs.

### MSC-PIPE-REQ-015

Cacheable pass results **MUST** include pass identity and version in validity fingerprints.

### MSC-PIPE-REQ-016

The Compilation Plan **MUST** identify all selected phases, passes, dependencies, outputs, effects, and terminal targets.

### MSC-PIPE-REQ-017

Compilation-plan construction **MUST** occur before effectful pass execution.

### MSC-PIPE-REQ-018

An invalid compilation plan **MUST** fail before effectful execution begins.

### MSC-PIPE-REQ-019

Compilation plans **MUST** be deterministic under equivalent inputs, configuration, registries, and compiler versions.

### MSC-PIPE-REQ-020

Equivalent deterministic pass graphs **MUST** produce semantically equivalent outputs.

### MSC-PIPE-REQ-021

Concurrent execution **MUST NOT** change semantic precedence or meaning.

### MSC-PIPE-REQ-022

Concurrent pass outputs **MUST** merge deterministically.

### MSC-PIPE-REQ-023

Pass completion timing **MUST NOT** determine semantic conflict resolution.

### MSC-PIPE-REQ-024

Diagnostic ordering **SHOULD** be stable under equivalent compilation inputs.

### MSC-PIPE-REQ-025

Every phase barrier **MUST** define permitted outcomes.

### MSC-PIPE-REQ-026

Downstream phases **MUST NOT** consume representations that fail required barrier invariants.

### MSC-PIPE-REQ-027

A phase **MUST NOT** report complete success when mandatory outputs are absent.

### MSC-PIPE-REQ-028

MSC **MUST** distinguish phase, pass, representation, output, and invocation status.

### MSC-PIPE-REQ-029

Partial compilation **MUST** identify incomplete phases, blocked outputs, unresolved semantics, and invalid representations.

### MSC-PIPE-REQ-030

Partial compilation **MUST NOT** claim full conformance.

### MSC-PIPE-REQ-031

Failure propagation **MUST** follow declared dependencies and active profile rules.

### MSC-PIPE-REQ-032

Independent failures **SHOULD** remain isolated when semantic correctness permits.

### MSC-PIPE-REQ-033

Blocking conditions **MUST** be evaluated relative to requested outputs.

### MSC-PIPE-REQ-034

MSC **MUST** support cooperative cancellation.

### MSC-PIPE-REQ-035

Cancellation **MUST** prevent publication of incomplete authoritative outputs.

### MSC-PIPE-REQ-036

Cancelled compilations **MUST** report completed, partial, blocked, and cancelled work.

### MSC-PIPE-REQ-037

Every untrusted pass **MUST** execute under applicable resource and trust restrictions.

### MSC-PIPE-REQ-038

Pass timeouts and resource-limit failures **MUST** produce structured diagnostics.

### MSC-PIPE-REQ-039

Fixed-point pass groups **MUST** define termination criteria and maximum iteration bounds.

### MSC-PIPE-REQ-040

Ordinary pass dependency cycles **MUST** be rejected.

### MSC-PIPE-REQ-041

Supported cyclic analysis **MUST** be represented explicitly as a deterministic fixed-point group.

### MSC-PIPE-REQ-042

Every representation transition **MUST** preserve applicable lineage.

### MSC-PIPE-REQ-043

No pass **MUST** silently sever source-to-output traceability.

### MSC-PIPE-REQ-044

Incremental invalidation **MUST** propagate through semantic dependencies.

### MSC-PIPE-REQ-045

Cache reuse **MUST NOT** occur after any semantically relevant fingerprint input changes.

### MSC-PIPE-REQ-046

Presentation-only changes **SHOULD NOT** invalidate semantic passes when the active source model proves semantic equivalence.

### MSC-PIPE-REQ-047

Extension passes **MUST** conform to the same manifest, provenance, effect, cache, and diagnostic contracts as core passes.

### MSC-PIPE-REQ-048

Extension passes **MUST NOT** redefine protected compiler invariants.

### MSC-PIPE-REQ-049

Compilation traces **MUST** identify the passes and representations that produced requested outputs.

### MSC-PIPE-REQ-050

Compiler explanations **MUST** be derivable from the resolved compilation plan, pass records, diagnostics, and lineage.

---

## 87. Conceptual Model

```text
Compilation Invocation
        │
        ▼
Compilation Planner
├── resolve mode
├── resolve profile
├── select sources
├── select outputs
├── select passes
├── resolve dependencies
├── apply trust policy
└── validate effects
        │
        ▼
Compilation Plan
        │
        ▼
Pass Scheduler
├── dependency ordering
├── concurrency groups
├── cache decisions
├── cancellation
└── resource policy
        │
        ▼
Phase Families

├── Discovery
├── Acquisition
├── Frontend
├── Normalization
├── Canonicalization
├── Binding
├── Resolution
├── Analysis
├── MSG Construction
├── Validation
├── KIR Lowering
├── Optimization
├── Backend
└── Reporting
        │
        ▼
Compilation Outputs
```

---

## 88. Machine Specification

```yaml
machine_spec:
  kind: compilation_pipeline_and_phase_model

  phase_families:
    - planning
    - discovery
    - acquisition
    - classification
    - frontend
    - surface_validation
    - normalization
    - canonicalization
    - binding
    - resolution
    - analysis
    - graph_construction
    - graph_validation
    - conformance
    - lowering
    - optimization
    - backend
    - reporting

  pass:
    required:
      - pass_id
      - pass_version
      - phase_family
      - input_contract
      - output_contract
      - dependencies
      - read_set
      - write_set
      - determinism
      - purity
      - effect_class
      - cache_policy
      - invalidation_keys
      - compatibility
      - provenance

  determinism_classes:
    - deterministic
    - deterministic_under_declared_environment
    - nondeterministic

  purity_classes:
    - pure
    - contextual
    - cache_writing
    - artifact_writing
    - externally_effectful

  dependency_classes:
    - hard
    - optional
    - ordering_only
    - data
    - capability
    - feature
    - language
    - extension
    - backend

  phase_status:
    - planned
    - ready
    - running
    - completed
    - completed_with_warnings
    - partial
    - skipped
    - blocked
    - failed
    - cancelled
    - cached

  barrier_outcomes:
    - passed
    - passed_with_warnings
    - partial
    - blocked
    - failed
    - cancelled

  representation_readiness:
    - unavailable
    - partial
    - structurally_valid
    - bound
    - typed
    - validated
    - authoritative
    - backend_ready

  protected_ordering:
    - acquisition_before_parsing
    - parsing_before_normalization
    - canonicalization_before_binding
    - binding_before_final_reference_resolution
    - semantic_analysis_before_authoritative_msg_validation
    - msg_validation_before_authoritative_kir_lowering
    - backend_planning_before_effectful_execution

  scheduling:
    dependency_driven: true
    registration_order_semantic: false
    concurrency_allowed: true
    deterministic_merge_required: true
    cancellation_required: true
    bounded_fixed_points_required: true
```

---

## 89. Invariants

```yaml
invariants:
  - id: MSC-PIPE-INV-001
    expression: pass.dependencies.explicit == true
    description: Pass ordering derives from declared dependencies.

  - id: MSC-PIPE-INV-002
    expression: scheduling.depends_on_registration_order == false
    description: Registration order has no semantic meaning.

  - id: MSC-PIPE-INV-003
    expression: pass.modifies_undeclared_state == false
    description: Passes respect declared state contracts.

  - id: MSC-PIPE-INV-004
    expression: effectful_pass.executes_before_plan_validation == false
    description: Effects occur only under a valid plan.

  - id: MSC-PIPE-INV-005
    expression: concurrent_execution.changes_semantic_output == false
    description: Concurrency preserves meaning.

  - id: MSC-PIPE-INV-006
    expression: pass_completion_timing.controls_precedence == false
    description: Runtime timing does not decide semantics.

  - id: MSC-PIPE-INV-007
    expression: phase_complete.implies_required_outputs_present == true
    description: Completion status reflects actual outputs.

  - id: MSC-PIPE-INV-008
    expression: partial_compilation.full_conformance == false
    description: Partial results cannot claim complete conformance.

  - id: MSC-PIPE-INV-009
    expression: cancelled_invocation.publishes_incomplete_authoritative_output == false
    description: Cancellation cannot publish invalid authority.

  - id: MSC-PIPE-INV-010
    expression: fixed_point.iterations <= configured_maximum
    description: Repeated analysis remains bounded.

  - id: MSC-PIPE-INV-011
    expression: stale_cache.reused == false
    description: Cache reuse requires compatible semantic inputs.

  - id: MSC-PIPE-INV-012
    expression: representation_transition.lineage != null
    description: Every transition remains traceable.

  - id: MSC-PIPE-INV-013
    expression: untrusted_pass.sandbox_policy != null
    description: Untrusted compiler code executes under policy.

  - id: MSC-PIPE-INV-014
    expression: extension_pass.redefines_protected_ordering == false
    description: Extensions cannot subvert compiler architecture.

  - id: MSC-PIPE-INV-015
    expression: requested_output.status.derivable_from_phase_records == true
    description: Output status is explainable from execution evidence.
```

---

## 90. Diagnostics

### MSC0101 — Compilation Plan Invalid

The selected phases or passes cannot form a valid compilation plan.

### MSC0102 — Required Pass Missing

No compatible pass provides a required transformation or analysis.

### MSC0103 — Pass Dependency Missing

A pass dependency cannot be resolved.

### MSC0104 — Pass Dependency Cycle

Passes form an unsupported cycle.

### MSC0105 — Fixed-Point Group Unbounded

A repeated pass group lacks termination criteria or iteration limits.

### MSC0106 — Incompatible Pass Input

A pass cannot consume the available representation or schema version.

### MSC0107 — Incompatible Pass Output

A pass produces an output incompatible with dependent phases.

### MSC0108 — Protected Phase Ordering Violation

A pass or extension attempts to bypass required compiler ordering.

### MSC0109 — Undeclared Pass State Access

A pass reads or modifies state outside its declared contract.

### MSC0110 — Pass Determinism Missing

A pass does not declare its determinism class.

### MSC0111 — Pass Effect Missing

A pass does not declare its purity or effects.

### MSC0112 — Unauthorized Effectful Pass

An effectful pass is not authorized under the active invocation.

### MSC0113 — Pass Resource Limit Exceeded

A pass exceeded an applicable memory, CPU, input, recursion, or iteration limit.

### MSC0114 — Pass Timed Out

A pass did not complete within its permitted execution window.

### MSC0115 — Pass Cancelled

A pass terminated due to invocation cancellation.

### MSC0116 — Barrier Invariant Failed

A representation does not satisfy required phase-barrier conditions.

### MSC0117 — Phase Completion Misclassified

A phase claims completion without required outputs.

### MSC0118 — Downstream Phase Blocked

A downstream phase cannot run because a prerequisite phase is incomplete or invalid.

### MSC0119 — Partial Output Misclassified

An incomplete representation or output is classified as complete.

### MSC0120 — Concurrent Merge Nondeterministic

Concurrent pass results cannot be merged deterministically.

### MSC0121 — Diagnostic Order Unstable

Equivalent deterministic compilations produced unstable diagnostic ordering beyond permitted variation.

### MSC0122 — Cache Fingerprint Incomplete

A cached pass result omits a semantically relevant validity input.

### MSC0123 — Stale Pass Result

A cached pass result is incompatible with current inputs.

### MSC0124 — Invalidation Chain Broken

A changed semantic input did not invalidate a dependent result.

### MSC0125 — Extension Pass Contract Invalid

An extension pass does not satisfy required manifest or safety contracts.

### MSC0126 — Extension Violates Core Invariant

An extension pass attempts to alter protected compiler semantics.

### MSC0127 — Cancellation Publication Violation

A cancelled invocation attempted to publish an incomplete authoritative output.

### MSC0128 — Output Readiness Failure

A requested output does not meet its declared readiness contract.

### MSC0129 — Compilation Trace Incomplete

The compiler cannot identify which passes produced an output.

### MSC0130 — Plan Explanation Unavailable

A compiler decision cannot be explained from the plan, pass records, configuration, or lineage.

---

## 91. Acceptance Criteria

This specification is satisfied when:

1. the MSC pipeline is represented as explicit dependency-ordered phases;
2. all major phase families from source planning through reporting are defined;
3. phase and pass are distinct concepts;
4. every pass has identity, version, inputs, outputs, dependencies, read/write sets, determinism, effects, caching, and compatibility;
5. compilation planning occurs before execution;
6. invalid plans fail before effects;
7. protected semantic phase ordering is defined;
8. pass scheduling is independent of registration order;
9. deterministic concurrency and stable merge are required;
10. phase barriers define downstream readiness;
11. phase, pass, representation, output, and invocation statuses are distinct;
12. partial compilation is explicit;
13. blocking semantics are output-specific;
14. failures propagate through declared dependencies;
15. cancellation and timeout behavior are defined;
16. fixed-point analyses are bounded;
17. caches use complete semantic fingerprints;
18. incremental invalidation follows semantic dependencies;
19. extension passes obey the same contracts as core passes;
20. untrusted passes are sandboxable;
21. compilation traces support explanation and reproducibility;
22. later MSC specifications can refine phase behavior without changing the pipeline’s constitutional boundaries.

---

## 92. Conformance Examples

### 92.1 Valid Parse Plan

```yaml
plan:
  mode: parse

  phases:
    - discovery
    - acquisition
    - classification
    - frontend
    - surface_validation
    - reporting

  terminal_output:
    representation: surface_ast
```

Normalization and graph construction are not selected because they are not required by the requested mode.

### 92.2 Invalid Direct Normalization

```yaml
plan:
  phases:
    - normalization
```

No source acquisition or surface representation exists.

Expected diagnostic:

```text
MSC0103: normalization requires a compatible surface AST
```

### 92.3 Valid Concurrent Parsing

```text
parse source A ─┐
parse source B ─┼─→ stable surface-AST merge
parse source C ─┘
```

All sources are independent, and merge order uses canonical source identities rather than completion time.

### 92.4 Invalid Timing-Based Merge

Two concurrent normalization passes produce conflicting values.

The compiler accepts whichever pass finishes first.

Expected diagnostic:

```text
MSC0120: concurrent completion order cannot determine semantic precedence
```

### 92.5 Valid Partial Compilation

```yaml
compilation:
  status: partial

  phases:
    parsing: completed
    normalization: completed
    binding: partial
    graph_construction: partial
    kir_lowering: blocked

  unresolved:
    - MSL-TYPE-0001

  outputs:
    canonical_ast: available
    msg: partial
    kir: unavailable
```

### 92.6 Invalid Complete Phase Status

```yaml
phase:
  id: reference_resolution
  status: completed

  unresolved_required_references:
    - AUTH-TYPE
```

Expected diagnostic:

```text
MSC0117: reference-resolution phase lacks mandatory resolved output
```

### 92.7 Valid Fixed-Point Group

```yaml
fixed_point:
  id: recursive-type-resolution
  passes:
    - collect-type-candidates
    - resolve-type-members
    - propagate-type-constraints

  termination:
    condition: no_semantic_changes
    maximum_iterations: 32
```

### 92.8 Invalid Unbounded Fixed Point

```yaml
fixed_point:
  passes:
    - enrich-relationships
```

No termination condition or maximum iteration count exists.

Expected diagnostic:

```text
MSC0105: fixed-point pass group must be bounded
```

### 92.9 Valid Cache Reuse

```yaml
cache:
  pass: msc.binding.collect-declarations
  pass_version: 0.1.0
  canonical_ast_fingerprint: sha256:...
  profile_fingerprint: sha256:...
  registry_fingerprint: sha256:...
  result: reused
```

### 92.10 Invalid Cache Reuse

The declaration pass version changes, but the old result is reused.

Expected diagnostic:

```text
MSC0123: cached pass result was produced by an incompatible pass version
```

### 92.11 Valid Cancellation

```yaml
compilation:
  status: cancelled

  completed:
    - parsing
    - normalization

  cancelled:
    - reference_resolution
    - type_analysis

  outputs:
    canonical_ast:
      status: partial
    msg:
      status: unavailable
```

### 92.12 Invalid Effect During Planning

A backend writes files while the compilation plan is still being constructed.

Expected diagnostic:

```text
MSC0112: effectful execution is prohibited before plan validation
```

---

## 93. Security and Trust Considerations

The pipeline scheduler controls code execution across many trust boundaries.

Threats include:

* malicious pass manifests;
* dependency manipulation;
* pass-order injection;
* undeclared state mutation;
* cache poisoning;
* effect concealment;
* denial of service;
* nontermination;
* nondeterministic merge;
* forged completion status;
* lineage removal;
* extension-pass privilege escalation.

Implementations should:

* validate pass manifests;
* pin compatible pass versions;
* enforce protected phase ordering;
* sandbox untrusted passes;
* validate pass outputs;
* enforce read/write boundaries;
* bound recursion and fixed-point iterations;
* record plan fingerprints;
* isolate effects;
* reject stale caches;
* maintain stable registry snapshots;
* preserve detailed execution traces;
* revalidate extension passes after updates.

---

## 94. Evolution and Compatibility

The phase architecture may evolve by adding:

* optional phase families;
* additional analysis passes;
* new representation barriers;
* new cache layers;
* distributed scheduling;
* remote execution;
* specialized backend planning.

Compatible changes may add optional passes that do not alter existing semantic results.

Breaking changes include:

* changing protected phase ordering;
* changing representation contracts;
* changing barrier invariants;
* changing pass dependency semantics;
* changing cache-validity rules;
* changing effect policy;
* changing completion semantics.

Breaking changes require:

* MSC version updates;
* pass-manifest migrations;
* cache invalidation;
* conformance-fixture updates;
* reproducibility impact documentation.

---

## 95. Open Questions

1. Should compiler phases and passes be declared in MSL artifacts?
2. Which pass manifests must be public APIs?
3. Should the initial implementation use immutable representation snapshots?
4. How should pass outputs be stored in memory?
5. Should phase barriers be represented as validators or dedicated types?
6. What scheduler implementation best supports local-first concurrency?
7. Which phases should be concurrent in the first implementation?
8. How should external native-tool invocations appear in the pass graph?
9. Should diagnostics be emitted incrementally or only after stable merge?
10. What is the canonical compilation-plan serialization?
11. How should editor compilation plans differ from CI plans?
12. Which pass results should persist between process invocations?
13. What is the minimum invalidation granularity for the first compiler?
14. How should source changes invalidate normalization mappings?
15. How should registry changes invalidate semantic results?
16. Can MSG validation and conformance evaluation execute concurrently?
17. Should backend planning consume KIR manifests or direct compiler state?
18. Which passes may consume both MSG and KIR?
19. How should extension passes request protected integration hooks?
20. What constitutes a safe compiler cancellation point?
21. Should failed deterministic passes be cached as negative results?
22. How should resource budgets be divided among concurrent passes?
23. How should pass timings be normalized for reproducibility reports?
24. What parts of the compilation trace belong in MKE?
25. Which pipeline invariants must be implemented first?

---

## 96. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0003 | Source Discovery and Compilation Units            |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration             |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding         |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

It informs:

| Series          | Relevance                                         |
| --------------- | ------------------------------------------------- |
| MSG-CORE        | Defines graph-construction and validation targets |
| KIR-CORE        | Defines lowering and optimization targets         |
| MSL-FRONTEND    | Defines frontend passes                           |
| MSL-CONFORMANCE | Defines compiler fixtures                         |
| BACKEND         | Defines backend planning and execution            |
| CLI             | Exposes compiler modes and plan inspection        |
| MKE             | Stores compilation traces and results             |

---

## Status

Draft.

This document defines the dependency-driven, pass-oriented, incremental, cancellable, and effect-aware compilation pipeline of MSC.

---
id: "MSC-CORE-0004"
title: "Frontend and Normalizer Orchestration"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 4
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "frontend"
  - "normalization"
  - "orchestration"
  - "surface-ast"
  - "canonical-ast"
  - "language-dispatch"
  - "mappings"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "ADR-0007"
  - "MSL-CORE-0001"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE-0001"
  - "MSC-CORE-0002"
  - "MSC-CORE-0003"
references:
  - "MART-CORE"
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSC-CORE-0005"
  - "MSC-CORE-0006"
  - "MSC-CORE-0007"
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MART-CORE"
  - "MSG-CORE"
  - "KIR-CORE"
  - "MSL-DOCUMENT"
  - "MSL-FRONTEND"
  - "MSL-NORMALIZATION"
  - "MSL-CONFORMANCE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0004 — Frontend and Normalizer Orchestration

## 1. Purpose

This specification defines how the Monad Specification Compiler resolves, selects, configures, invokes, composes, validates, and coordinates frontends and normalizers.

It establishes:

* frontend discovery and registration;
* frontend resolution;
* language and syntax dispatch;
* capability negotiation;
* frontend configuration;
* parsing orchestration;
* embedded-language dispatch;
* surface AST validation;
* normalizer discovery and selection;
* mapping resolution;
* normalization profiles;
* multi-stage normalization;
* direct canonical authoring;
* ambiguity and loss handling;
* partial frontend results;
* parser and normalizer isolation;
* trust and sandboxing;
* fallback behavior;
* deterministic selection;
* caching and incrementality;
* provenance;
* conformance;
* orchestration diagnostics.

This specification governs the transformation:

```text
Artifact Representation
    ↓
Frontend
    ↓
Surface AST
    ↓
Normalizer
    ↓
Canonical MSL AST
```

It also governs direct canonical authoring paths where a dedicated semantic frontend produces canonical MSL concepts without a source-domain normalization layer.

---

## 2. Context

MSC may receive artifacts represented as:

* `msl-markdown`;
* YAML;
* JSON;
* OpenAPI;
* AsyncAPI;
* JSON Schema;
* GraphQL SDL;
* Terraform;
* Kubernetes manifests;
* source code;
* Git objects;
* diagrams;
* editor models;
* conversational events;
* serialized surface ASTs;
* serialized canonical ASTs;
* generated semantic structures.

No single parser or normalizer can process every artifact representation.

The compiler must coordinate a changing ecosystem of:

* built-in frontends;
* language-specific parsers;
* source-domain readers;
* importers;
* semantic editors;
* third-party plugins;
* normalization mappings;
* extension-aware adapters;
* migration frontends;
* AI-assisted proposal systems.

Selection cannot depend on filename extensions alone.

It must account for:

* artifact type;
* representation type;
* media type;
* language identity;
* syntax identity;
* language version;
* frontend capabilities;
* trust;
* active profile;
* extension support;
* source-preservation requirements;
* expected output representation;
* deterministic behavior;
* availability.

MSC therefore requires an explicit orchestration model.

---

## 3. Scope

This specification defines:

* frontend registry interaction;
* frontend manifests;
* frontend resolution;
* syntax and language detection;
* capability negotiation;
* frontend configuration;
* parser execution;
* source and artifact provenance;
* surface AST contracts;
* direct canonical AST production;
* embedded-language parsing;
* normalizer manifests;
* mapping resolution;
* normalization orchestration;
* chained normalization;
* normalization profiles;
* ambiguity;
* conflict;
* unsupported constructs;
* opaque preservation;
* loss reports;
* partial results;
* frontend and normalizer diagnostics;
* deterministic selection;
* trust;
* sandboxing;
* caching;
* incremental behavior;
* extension integration;
* conformance.

This specification does not fully define:

* concrete frontend APIs;
* `msl-markdown` grammar;
* every surface AST schema;
* individual normalization mappings;
* canonical AST schemas;
* symbol binding;
* reference resolution;
* MSG construction;
* KIR lowering;
* package distribution formats.

---

## 4. Non-Goals

This specification does not:

* require one frontend per file extension;
* require every frontend to emit a surface AST;
* permit a frontend to redefine canonical MSL semantics;
* require normalizers to infer intent;
* permit registration order to select implementations;
* guarantee lossless normalization;
* treat parsing success as semantic validity;
* treat trusted executable code as authoritative content;
* allow fallback to silently weaken semantic guarantees;
* require AI assistance;
* require remote execution;
* define unrestricted parser or normalizer plugins.

---

## 5. Core Principle

> Frontends preserve and interpret representation structure; normalizers explicitly map that structure into canonical MSL semantics.

Frontend orchestration answers:

* Which implementation can interpret this artifact representation?
* Which language and syntax does it contain?
* Which capabilities are required?
* Which surface representation will it produce?

Normalizer orchestration answers:

* Which versioned mapping converts the surface model into canonical MSL?
* Which profile and authority rules apply?
* What information is preserved, inferred, lost, ambiguous, or unsupported?

These decisions must be deterministic, inspectable, and traceable.

---

## 6. Architectural Position

```text
Compilation Unit
    ↓
Artifact Representation Selection
    ↓
Frontend Candidate Resolution
    ↓
Capability Negotiation
    ↓
Frontend Invocation
    ↓
Surface AST Artifact
    ↓
Surface Validation
    ↓
Normalizer Candidate Resolution
    ↓
Mapping and Profile Selection
    ↓
Normalization
    ↓
Canonical MSL AST Artifact
    ↓
Canonicalization Barrier
    ↓
Declaration Collection
```

Embedded languages introduce nested orchestration:

```text
Document Frontend
    ↓
Host Surface AST
    ↓
Embedded Region Discovery
    ↓
Language Dispatch
    ↓
Embedded Frontends
    ↓
Embedded Surface ASTs
    ↓
Host and Embedded Normalizers
    ↓
Canonical MSL AST
```

---

## 7. Terminology

### 7.1 Frontend

A component that interprets an artifact representation and produces a surface AST, direct canonical AST input, or another registered compiler representation.

### 7.2 Frontend Candidate

A frontend that may be compatible with a given artifact representation.

### 7.3 Frontend Resolution

The process of selecting one frontend or an explicit frontend composition.

### 7.4 Syntax Identity

The stable identity of a concrete representation syntax.

Examples:

* `msl-markdown`;
* `openapi-yaml`;
* `json-schema-json`;
* `terraform-hcl`.

### 7.5 Language Identity

The semantic language represented by the syntax.

Examples:

* `msl.document`;
* `msl.constraint`;
* `openapi`;
* `terraform`;
* `rust`.

### 7.6 Capability Negotiation

The process of confirming that a frontend or normalizer supports the features required by the artifact, profile, extensions, and requested outputs.

### 7.7 Parse Contract

The declared input, output, diagnostics, source mapping, recovery, and determinism behavior of a frontend.

### 7.8 Direct Canonical Frontend

A frontend whose authoring model expresses canonical MSL concepts directly and may therefore produce canonical MSL AST input without source-domain normalization.

### 7.9 Normalizer

A versioned compiler component that maps one registered source or surface representation into canonical MSL AST concepts.

### 7.10 Mapping

The semantic rules implemented or declared by a normalizer.

### 7.11 Normalizer Chain

An ordered sequence of registered transformations used when one normalization step is insufficient.

### 7.12 Normalization Profile

A policy controlling semantic depth, authority, inference, ambiguity, unsupported constructs, and loss.

### 7.13 Opaque Preservation

Retention of content without semantic interpretation.

### 7.14 Fallback

A lower-preference frontend or normalizer path selected after a preferred candidate is unavailable or incompatible.

### 7.15 Orchestration Record

A structured artifact recording selection candidates, decisions, capabilities, versions, configuration, execution, and outcomes.

---

## 8. Frontend Registry

MSC resolves frontends through a versioned frontend registry.

The registry indexes:

* frontend identity;
* frontend version;
* provider;
* supported artifact representations;
* supported media types;
* syntax identities;
* language identities;
* language-version ranges;
* input representation versions;
* output representation versions;
* capabilities;
* trust;
* determinism;
* execution mode;
* resource requirements;
* extensions;
* conformance status;
* round-trip guarantees.

Registry records must not replace frontend manifests or package identity.

---

## 9. Frontend Manifest

A frontend manifest conceptually contains:

```text
FrontendManifest

├── frontend_id
├── frontend_version
├── implementation_id
├── implementation_version
├── provider
├── frontend_class
├── supported_artifact_types
├── supported_representation_types
├── supported_media_types
├── syntax_ids
├── language_ids
├── language_versions
├── accepted_input_versions
├── produced_representation
├── produced_schema_versions
├── capabilities
├── required_dependencies
├── supported_extensions
├── configuration_schema
├── determinism
├── round_trip_mode
├── trust_class
├── execution_policy
├── resource_limits
├── diagnostics
├── compatibility
└── provenance
```

---

## 10. Frontend Classes

Initial frontend classes include:

```text
textual_parser
structured_data_parser
semantic_editor
import_reader
repository_reader
source_code_frontend
conversation_frontend
serialized_ast_reader
generated_frontend
container_frontend
```

### 10.1 Textual Parser

Parses a textual concrete syntax.

### 10.2 Structured-Data Parser

Parses JSON, YAML, TOML, or another structured serialization.

### 10.3 Semantic Editor

Produces semantic nodes through typed editing operations.

### 10.4 Import Reader

Interprets an external engineering format.

### 10.5 Repository Reader

Interprets repository- or version-control-specific structures.

### 10.6 Source-Code Frontend

Uses a native parser, compiler service, or language-specific analyzer.

### 10.7 Conversation Frontend

Builds a source-faithful conversation representation.

### 10.8 Serialized AST Reader

Loads and validates a prior surface or canonical AST artifact.

### 10.9 Generated Frontend

Produces compiler input from deterministic generation or inspection.

### 10.10 Container Frontend

Discovers internal regions or contained artifacts requiring further frontend dispatch.

---

## 11. Frontend Candidate Discovery

Candidates may be identified from:

* explicit invocation;
* artifact manifest;
* representation metadata;
* media type;
* syntax identity;
* language declaration;
* provider classification;
* file extension convention;
* content signature;
* embedded-region label;
* package dependency;
* registry rules.

Candidate discovery should maximize recall.

Selection later applies compatibility and policy filters.

---

## 12. Explicit Frontend Selection

An invocation or manifest may select a frontend explicitly.

Explicit selection must still satisfy:

* artifact compatibility;
* language compatibility;
* version compatibility;
* profile requirements;
* trust policy;
* extension requirements;
* representation output contract.

An explicit but incompatible frontend must be rejected rather than invoked unsafely.

---

## 13. Deterministic Frontend Resolution

Frontend resolution conceptually evaluates candidates in this order:

1. protected policy requirements;
2. explicit compatible frontend declaration;
3. exact syntax and language match;
4. exact representation and version match;
5. required capability support;
6. extension compatibility;
7. trust preference;
8. determinism requirements;
9. source-preservation requirements;
10. configured preference rules;
11. stable frontend identity.

Runtime registration order or response timing must not influence selection.

---

## 14. Frontend Resolution Result

Resolution produces one of:

```text
selected
selected_composition
ambiguous
unsupported
incompatible
untrusted
unavailable
deferred
```

A resolution result must preserve:

* all candidates considered;
* filters applied;
* candidates rejected;
* selected frontend;
* selected version;
* reason;
* configuration;
* trust decision;
* capability result;
* diagnostics.

---

## 15. Ambiguous Frontend Selection

Selection is ambiguous when multiple candidates remain equally valid but may produce materially different semantics, source preservation, or diagnostics.

MSC must not choose silently.

Permitted behavior includes:

* require explicit selection;
* apply a declared stable preference;
* select a composition defined by registry policy;
* continue partially without parsing;
* emit an ambiguity diagnostic.

A stable preference must be semantically justified and inspectable.

---

## 16. Syntax Detection

Syntax detection may be based on:

* explicit declaration;
* media type;
* provider metadata;
* content signature;
* well-known delimiters;
* schema markers;
* extension convention;
* parser probing.

Parser probing must be bounded.

A failed probe must not be represented as a definitive source error unless that frontend was selected.

---

## 17. Language Detection

Syntax and language are distinct.

Examples:

* YAML may encode OpenAPI, Kubernetes, MSL metadata, or arbitrary data.
* Markdown may encode MSL documents, ADRs, RFCs, or ordinary prose.
* JSON may encode JSON Schema, AST serialization, registry records, or configuration.

Language identity should be resolved through explicit metadata or deterministic semantic markers where possible.

Heuristic language detection remains provisional until confirmed.

---

## 18. Capability Model

Frontend capabilities may include:

```text
parse
read
write
source_preserve
exact_round_trip
formatted_round_trip
semantic_round_trip
source_maps
partial_parse
error_recovery
embedded_region_discovery
embedded_dispatch
comments
trivia
extensions
incremental_parse
streaming
deterministic
direct_canonical_output
```

Capabilities may have levels:

```text
none
partial
full
experimental
lossy
```

---

## 19. Required Capabilities

Required capabilities may derive from:

* compiler mode;
* profile;
* artifact authority;
* language features;
* embedded languages;
* round-trip workflow;
* editor use;
* backend requirements;
* conformance requirements.

A publication-only workflow may not require source preservation.

A source-editing workflow may require it.

A machine-normative compilation may require precise source maps and complete semantic support.

---

## 20. Capability Negotiation

Negotiation compares:

* required capabilities;
* frontend-declared capabilities;
* syntax-specific limitations;
* active extensions;
* profile policy;
* trust policy;
* requested output readiness.

Negotiation outcomes include:

```text
satisfied
satisfied_with_degradation
partial
unsupported
prohibited
```

Degradation must be explicit and may require a loss report.

---

## 21. Frontend Configuration

Frontend configuration may include:

* language version;
* syntax version;
* strictness;
* recovery mode;
* extension activation;
* source encoding;
* include behavior;
* comment preservation;
* trivia preservation;
* namespace hints;
* parser limits;
* formatter preferences;
* import policy.

Semantic configuration participates in compilation and cache fingerprints.

Presentation-only configuration need not affect semantic fingerprints.

---

## 22. Configuration Validation

MSC must validate frontend configuration against the selected frontend’s schema.

Unknown semantic configuration keys must not be ignored silently.

Unknown presentation keys may be preserved or warned according to policy.

---

## 23. Frontend Invocation

A frontend invocation conceptually receives:

```text
FrontendInvocation

├── invocation_id
├── compiler_invocation_id
├── artifact_descriptor
├── selected_representation
├── frontend_id
├── frontend_version
├── language_id
├── language_version
├── syntax_id
├── configuration
├── extensions
├── profile
├── trust_context
├── resource_limits
├── cancellation
└── provenance
```

It returns a structured result.

---

## 24. Frontend Result

A frontend result conceptually contains:

```text
FrontendResult

├── invocation_id
├── status
├── output_artifacts
├── surface_ast
├── direct_canonical_ast
├── contained_artifact_descriptors
├── embedded_regions
├── source_maps
├── trivia
├── diagnostics
├── losses
├── recovery_state
├── fingerprints
├── performance
└── provenance
```

---

## 25. Frontend Result States

Initial states are:

```text
complete
partial
recovered
unsupported
failed
cancelled
timed_out
resource_limited
```

A recovered parse is not equivalent to a complete parse.

---

## 26. Surface AST Artifact

A surface AST produced by a frontend is a derived artifact.

It must preserve:

* surface AST identity;
* surface AST schema version;
* source artifact identity;
* source representation identity;
* frontend identity and version;
* language and syntax identity;
* source maps;
* parse status;
* diagnostics;
* provenance;
* fingerprint;
* partial state.

---

## 27. Surface AST Validation

MSC validates a frontend result before accepting it.

Validation includes:

* schema compatibility;
* node identity;
* source lineage;
* source-location integrity;
* language identity;
* syntax identity;
* extension namespaces;
* structural cycles;
* partial-state correctness;
* diagnostic references;
* resource bounds.

A frontend’s own success claim is not sufficient.

---

## 28. Direct Canonical Frontends

A direct canonical frontend may bypass source-domain normalization only when:

* it authors canonical MSL concepts directly;
* its canonical output schema is registered;
* the target MSL version is supported;
* source or edit provenance is preserved;
* authority is not inferred from the frontend;
* extension semantics are validated;
* canonical AST output passes validation.

Examples may include:

* a semantic MSL editor;
* a typed specification form;
* an AST-native compiler API.

---

## 29. Direct Canonical Boundary

A direct canonical frontend does not bypass:

* canonical AST validation;
* declaration collection;
* namespace construction;
* reference resolution;
* type analysis;
* authority validation;
* lifecycle validation;
* MSG construction.

It bypasses only unnecessary source-domain normalization.

---

## 30. Container Frontends

A container frontend discovers internal artifacts or language regions.

Examples:

* Markdown containing embedded MSL languages;
* archive containing artifacts;
* repository containing packages;
* notebook containing code and narrative;
* document bundle containing diagrams and schemas.

Container results may trigger controlled compilation replanning.

---

## 31. Embedded Region Discovery

A host frontend identifies embedded regions with:

* region identity;
* host artifact identity;
* source span;
* language declaration;
* syntax declaration;
* semantic role;
* inherited authority;
* inherited lifecycle;
* namespace context;
* required status.

These regions become child artifact representations or frontend work items.

---

## 32. Embedded Frontend Dispatch

MSC dispatches embedded regions using the same registry and capability rules as top-level artifacts.

The host frontend must not implement specialized embedded semantics merely through opaque string handling when a registered language frontend is required.

---

## 33. Nested Frontend Depth

Nested frontend dispatch must be bounded.

The active profile or resource policy should define:

* maximum nesting depth;
* maximum embedded-region count;
* maximum aggregate source size;
* maximum parser invocations.

Exceeding limits produces structured diagnostics.

---

## 34. Embedded Failure Behavior

An embedded parse failure may:

* block the host artifact;
* mark the host partial;
* preserve the region opaquely;
* remain informative;
* block only dependent outputs.

Behavior depends on:

* authority;
* semantic role;
* required status;
* profile;
* fallback policy.

---

## 35. Normalizer Registry

MSC resolves normalizers through a versioned normalization registry.

The registry indexes:

* normalizer identity;
* normalizer version;
* mapping identity;
* mapping version;
* accepted source domain;
* accepted surface AST schema;
* target canonical AST schema;
* target MSL versions;
* normalization profiles;
* authority policies;
* inference policies;
* ambiguity policies;
* loss policies;
* supported extensions;
* determinism;
* trust;
* conformance status.

---

## 36. Normalizer Manifest

A normalizer manifest conceptually contains:

```text
NormalizerManifest

├── normalizer_id
├── normalizer_version
├── implementation_id
├── implementation_version
├── mapping_id
├── mapping_version
├── accepted_input_representation
├── accepted_schema_versions
├── source_domain
├── source_language_versions
├── target_msl_versions
├── target_canonical_ast_versions
├── normalization_profiles
├── supported_mapping_rules
├── authority_policy
├── inference_policy
├── ambiguity_policy
├── conflict_policy
├── loss_policy
├── extension_support
├── determinism
├── configuration_schema
├── trust_class
├── execution_policy
├── resource_limits
├── diagnostics
├── compatibility
└── provenance
```

---

## 37. Normalizer Candidate Discovery

Normalizer candidates may derive from:

* explicit configuration;
* surface AST domain;
* surface AST schema;
* source language;
* target MSL version;
* artifact type;
* normalization profile;
* extension requirements;
* registry defaults;
* migration context.

Candidates must match both input and target representation contracts.

---

## 38. Deterministic Normalizer Resolution

Normalizer resolution evaluates:

1. protected policy requirements;
2. explicit compatible mapping selection;
3. exact source domain and AST schema;
4. target MSL and canonical AST versions;
5. requested normalization profile;
6. authority and inference policy compatibility;
7. extension support;
8. trust;
9. determinism;
10. declared preference;
11. stable mapping and normalizer identity.

Registration order must not affect selection.

---

## 39. Mapping Identity and Normalizer Identity

Mapping identity and normalizer implementation identity are distinct.

A mapping defines semantic behavior.

A normalizer implementation executes the mapping.

Several implementations may claim conformance to one mapping.

MSC must preserve both identities and versions.

---

## 40. Normalization Profile Selection

Profile selection may come from:

* artifact metadata;
* compilation profile;
* explicit invocation;
* package manifest;
* source type;
* import mode;
* governance policy.

Conceptual profiles include:

```text
archive_only
inventory
documentation
candidate_knowledge
interface_contract
reverse_engineering
migration
authoritative_import
```

The selected normalization profile must be explicit in provenance.

---

## 41. Normalization Configuration

Normalizer configuration may include:

* target namespace;
* identity-generation rules;
* default artifact type;
* source-of-truth policy;
* inference threshold;
* ambiguity behavior;
* opaque preservation;
* field mappings;
* external identity mapping;
* extension activation;
* loss threshold;
* conflict policy.

Semantic configuration participates in fingerprints.

---

## 42. Normalizer Invocation

A normalizer invocation conceptually receives:

```text
NormalizerInvocation

├── invocation_id
├── compiler_invocation_id
├── input_artifact
├── surface_ast_artifact
├── normalizer_id
├── normalizer_version
├── mapping_id
├── mapping_version
├── source_domain
├── target_msl_version
├── target_canonical_ast_version
├── profile
├── configuration
├── extensions
├── existing_semantic_context
├── trust_context
├── resource_limits
├── cancellation
└── provenance
```

---

## 43. Normalizer Result

A normalizer result conceptually contains:

```text
NormalizerResult

├── invocation_id
├── status
├── canonical_ast_artifacts
├── transformation_records
├── external_identity_mappings
├── ambiguity_records
├── conflict_records
├── opaque_nodes
├── unsupported_constructs
├── loss_reports
├── diagnostics
├── coverage
├── fingerprints
└── provenance
```

---

## 44. Normalization Result States

Initial result states are:

```text
complete
partial
ambiguous
conflicting
unsupported
failed
cancelled
timed_out
resource_limited
```

A result may contain usable canonical nodes while remaining partial or conflicting.

---

## 45. Normalizer Chains

Some artifacts may require several registered transformations.

Example:

```text
Legacy YAML
    ↓
Legacy Surface AST
    ↓
Migration Normalizer
    ↓
Current Surface AST
    ↓
MSL Normalizer
    ↓
Canonical MSL AST
```

Another example:

```text
Source Code AST
    ↓
Behavior Observation Model
    ↓
Candidate Knowledge Normalizer
    ↓
Canonical Observed Behavior Nodes
```

Every chain step must preserve lineage.

---

## 46. Chain Planning

A normalizer chain is valid when:

* every output contract matches the next input contract;
* representation and schema versions are compatible;
* authority rules do not escalate silently;
* losses are accumulated;
* ambiguity remains visible;
* the chain is bounded;
* the target canonical representation is reachable.

The chain must be part of the compilation plan.

---

## 47. Chain Selection

When multiple chains can reach the target, selection considers:

* semantic fidelity;
* loss severity;
* determinism;
* trust;
* profile;
* source preservation;
* conformance status;
* number of transformations;
* configured preferences.

Shortest chain alone is not sufficient.

---

## 48. Chain Cycles

Normalizer chains must be acyclic unless a registered migration or fixed-point model explicitly permits repetition.

No normalizer may repeatedly consume its own semantically equivalent output without a bounded reason.

---

## 49. Multi-Input Normalization

A normalizer may consume several input artifacts.

Examples:

* OpenAPI document plus JSON Schema documents;
* Markdown specification plus machine-semantic supplement;
* source code plus compiler metadata;
* diagram plus relationship manifest.

All contributing artifacts must remain in field- or node-level lineage.

---

## 50. Multi-Output Normalization

One input may produce several canonical artifacts or nodes.

Examples:

* Terraform resource produces infrastructure declaration, provider relationship, and constraints;
* OpenAPI operation produces operation, types, security relationships, and acceptance candidates;
* conversation produces candidate decision, unresolved assumption, and provenance record.

All outputs must preserve transformation lineage.

---

## 51. Existing Semantic Context

A normalizer may compare output candidates with existing canonical or semantic context to:

* find duplicates;
* enrich existing nodes;
* identify conflicts;
* map external identities;
* suggest merges;
* preserve parallel claims.

It must not mutate existing authoritative knowledge silently.

---

## 52. Normalization Authority

A normalizer maps semantics but does not independently grant authority.

Effective authority may derive from:

* source artifact authority;
* normalization profile;
* explicit adoption;
* governance policy;
* user confirmation;
* trusted source-of-truth declaration.

Normalizer trust is not content authority.

---

## 53. Inference Policy

A normalizer may perform inference only when the active mapping and profile permit it.

Inference output must preserve:

* evidence;
* method;
* confidence where applicable;
* alternatives;
* provisional authority;
* confirmation requirements.

A deterministic derivation should not be mislabeled as inference.

---

## 54. Ambiguity Policy

Possible ambiguity behaviors include:

```text
reject
preserve_candidates
request_confirmation
apply_declared_default
emit_unresolved_node
profile_specific
```

A declared default must remain visible in provenance.

Materially different semantic interpretations must not be selected silently.

---

## 55. Conflict Policy

Normalizer conflicts may be handled by:

* constructing conflict nodes;
* preserving parallel values;
* applying authority-aware precedence;
* requesting governance resolution;
* blocking the affected canonical output.

Source order or provider response timing must not resolve conflicts.

---

## 56. Unsupported Constructs

Unsupported constructs may be:

* rejected;
* preserved opaquely;
* attached as informative payloads;
* delegated to an extension;
* omitted under an explicit profile;
* represented as unresolved canonical nodes.

Normative, identity-bearing, authority-bearing, constraint-bearing, or security-relevant content must not disappear silently.

---

## 57. Opaque Preservation

Opaque preservation must retain:

* source or surface node identity;
* source payload or stable payload reference;
* source location;
* source-domain kind;
* language and syntax;
* authority;
* lifecycle;
* required status;
* frontend;
* normalizer;
* provenance;
* preservation reason.

Opaque content is not semantically validated content.

---

## 58. Loss Handling

Loss categories include:

* presentation;
* trivia;
* structure;
* identity;
* relationship;
* type;
* constraint;
* authority;
* lifecycle;
* provenance;
* semantic;
* extension;
* round trip.

The orchestrator aggregates losses across frontend and normalizer chains.

---

## 59. Loss Thresholds

Profiles may define tolerated loss thresholds.

Examples:

* publication profile may tolerate source-trivia loss;
* migration profile may reject identity or semantic loss;
* authoritative import may reject authority, lifecycle, provenance, or constraint loss;
* archive-only may preserve opaque content rather than normalize.

A threshold decision must be recorded.

---

## 60. Normalization Coverage

Coverage should report:

* recognized source nodes;
* normalized nodes;
* opaque nodes;
* unsupported nodes;
* omitted nodes;
* ambiguous nodes;
* conflicting nodes;
* generated canonical nodes;
* inferred canonical nodes.

Coverage is not equivalent to correctness.

---

## 61. Canonical AST Assembly

MSC assembles canonical outputs from:

* directly authored canonical frontends;
* normalizer results;
* supplementary canonical artifacts;
* embedded-language results;
* generated defaults;
* migration outputs.

Assembly must preserve:

* artifact boundaries;
* node identity;
* source lineage;
* transformation lineage;
* authority;
* lifecycle;
* conflicts;
* partial state.

---

## 62. Canonicalization Barrier

Before declaration collection, MSC validates that:

* canonical AST schemas are compatible;
* canonical node kinds are registered;
* node identities exist;
* source and transformation lineage are complete;
* protected identity fields are not silently overwritten;
* authority origins are present;
* partial and unresolved nodes are explicit;
* conflicts are represented;
* opaque required semantics are identified;
* canonical AST fingerprints are complete.

---

## 63. Frontend Fallback

Fallback may occur when a preferred frontend is:

* unavailable;
* incompatible;
* untrusted;
* prohibited;
* missing a required capability.

Fallback must not:

* reduce required semantic coverage silently;
* change authority;
* weaken diagnostics invisibly;
* change round-trip guarantees without notice;
* bypass profile requirements.

---

## 64. Normalizer Fallback

Fallback normalizers may have different mapping coverage or loss behavior.

MSC must compare:

* target compatibility;
* mapping semantics;
* authority policy;
* inference policy;
* loss severity;
* conformance.

A lower-fidelity normalizer may be used only under a profile permitting the degradation.

---

## 65. No Universal Text Fallback

MSC must not treat arbitrary unsupported artifacts as ordinary text and then claim successful semantic normalization.

An unsupported artifact may be preserved as an opaque artifact or informative attachment.

Opaque archival is preferable to invented semantics.

---

## 66. Parser Probing

MSC may probe several frontends when syntax is uncertain.

Probing must:

* be bounded;
* avoid effects;
* use restricted resources;
* keep probe diagnostics separate;
* avoid publishing probe failures as user errors;
* stop when deterministic classification is reached.

---

## 67. Frontend Composition

Some frontend workflows require composition.

Examples:

```text
Container Frontend
    +
Document Frontend
    +
Embedded Constraint Frontend
```

or:

```text
Source-Code Parser
    +
Semantic Index Reader
```

A composition must declare:

* component frontends;
* ordering;
* shared source maps;
* output merge rules;
* failure behavior;
* capabilities;
* provenance.

---

## 68. Composition Conflicts

Composed frontends may disagree about:

* region boundaries;
* language identity;
* source positions;
* artifact identity;
* embedded roles.

These disagreements must produce explicit conflicts or diagnostics.

One component must not silently override another based on execution order.

---

## 69. Incremental Frontend Execution

Incremental frontend execution may reprocess only changed:

* artifact representations;
* source ranges;
* embedded regions;
* contained artifacts.

It depends on stable:

* artifact identity;
* region identity;
* frontend version;
* syntax version;
* parser configuration;
* extension state;
* source fingerprints.

---

## 70. Incremental Normalization

Incremental normalization may reprocess only affected:

* surface nodes;
* mapping rules;
* canonical nodes;
* external identity mappings;
* conflicts;
* loss records.

Invalidation must include changes to mappings, profiles, authority policies, extensions, and semantic context.

---

## 71. Frontend Cache

Frontend caches may store:

* decoded representation;
* token stream;
* CST;
* surface AST;
* source map;
* diagnostics;
* contained artifact inventory.

A cache entry must include all relevant artifact, frontend, language, syntax, configuration, extension, and environment fingerprints.

---

## 72. Normalization Cache

Normalization caches may store:

* canonical AST fragments;
* transformation records;
* identity mappings;
* ambiguity;
* conflicts;
* coverage;
* loss reports;
* diagnostics.

A mapping-version change invalidates affected normalization results.

---

## 73. Stable Output Identity

A frontend or normalizer should preserve stable derived artifact and node identities across unchanged inputs where practical.

Stable identity supports:

* incremental compilation;
* diagnostics;
* editor synchronization;
* lineage;
* cache reuse.

Identity stability rules must not depend on nondeterministic traversal order.

---

## 74. Frontend Determinism

Given equivalent:

* artifact representation;
* representation revision;
* frontend version;
* language and syntax versions;
* configuration;
* extensions;
* declared environment;

a deterministic frontend must produce semantically equivalent surface output and deterministic diagnostics.

---

## 75. Normalizer Determinism

Given equivalent:

* surface AST;
* normalizer and mapping versions;
* target MSL version;
* canonical AST version;
* profile;
* configuration;
* extensions;
* semantic context snapshot;

a deterministic normalizer must produce semantically equivalent canonical output, coverage, losses, and diagnostics.

---

## 76. AI-Assisted Frontends

AI-assisted frontends may:

* classify artifacts;
* propose region boundaries;
* extract candidate structure;
* identify likely language;
* create candidate surface nodes.

Their outputs must remain:

* provenance-tagged;
* provisional;
* reviewable;
* distinct from deterministic parsing;
* subject to schema validation.

---

## 77. AI-Assisted Normalizers

AI-assisted normalizers may propose:

* requirements;
* relationships;
* types;
* decisions;
* terminology;
* classifications;
* conflict interpretations.

They must not:

* claim deterministic mapping;
* silently create canonical authority;
* discard alternatives;
* hide uncertainty;
* replace required deterministic mappings.

---

## 78. Trust Model

Frontend and normalizer trust classes include:

```text
built_in
trusted
reviewed
sandboxed
untrusted
disabled
```

Trust influences execution policy.

Trust does not establish semantic truth or artifact authority.

---

## 79. Sandboxing

Sandboxed frontend or normalizer execution may restrict:

* filesystem access;
* network access;
* subprocesses;
* environment variables;
* memory;
* CPU;
* input size;
* output size;
* execution time;
* temporary storage.

Outputs must be validated before integration.

---

## 80. Native Tool Integration

A frontend may delegate to a native language tool.

Examples:

* `rustc` parser services;
* Go parser packages;
* TypeScript compiler API;
* Terraform parser;
* OpenAPI validator.

The frontend must preserve:

* native tool identity;
* native tool version;
* invocation configuration;
* diagnostics;
* output schema;
* provenance.

---

## 81. Remote Frontends

Remote frontend execution is optional.

It must declare:

* remote service identity;
* endpoint policy;
* input transmission;
* access controls;
* privacy behavior;
* deterministic guarantees;
* result validation;
* availability behavior.

Core deterministic compilation must not require remote services.

---

## 82. Orchestration Record

MSC should produce a frontend and normalization orchestration record.

It contains:

* input artifact;
* selected representation;
* frontend candidates;
* selected frontend;
* capability negotiation;
* frontend configuration;
* frontend result;
* embedded dispatches;
* normalizer candidates;
* selected mapping;
* selected profile;
* normalizer chain;
* loss reports;
* ambiguity;
* conflicts;
* canonical outputs;
* fingerprints;
* diagnostics;
* provenance.

---

## 83. Explanation Support

The orchestration model should explain:

* why a frontend was selected;
* why another frontend was rejected;
* how language identity was determined;
* which capabilities were required;
* whether parsing recovered;
* why a normalizer was selected;
* which mapping rule produced a canonical node;
* why a construct remained opaque;
* why a loss was tolerated;
* why fallback was or was not allowed.

---

## 84. Frontend Conformance

Frontend conformance evaluates:

* manifest validity;
* representation compatibility;
* language and syntax behavior;
* capability claims;
* source maps;
* partial parsing;
* recovery;
* deterministic output;
* diagnostics;
* extension preservation;
* resource behavior;
* cancellation;
* cache correctness.

---

## 85. Normalizer Conformance

Normalizer conformance evaluates:

* manifest validity;
* input and output schema compatibility;
* mapping identity;
* canonical output;
* external identity preservation;
* source lineage;
* authority behavior;
* inference behavior;
* ambiguity handling;
* conflict preservation;
* loss reporting;
* coverage;
* deterministic output;
* extension handling;
* cache correctness.

---

## 86. Orchestration Conformance

Orchestration conformance evaluates:

* deterministic candidate selection;
* capability negotiation;
* fallback policy;
* composition;
* embedded dispatch;
* chain planning;
* barrier validation;
* trust enforcement;
* effect isolation;
* lineage;
* explanation.

---

## 87. Normative Requirements

### MSC-ORCH-REQ-001

MSC **MUST** resolve frontends and normalizers through versioned registered contracts.

### MSC-ORCH-REQ-002

Every frontend **MUST** have stable identity and version.

### MSC-ORCH-REQ-003

Every frontend manifest **MUST** declare accepted artifact representations, languages, syntaxes, versions, capabilities, output representations, determinism, trust, and compatibility.

### MSC-ORCH-REQ-004

Every normalizer **MUST** have stable identity and version.

### MSC-ORCH-REQ-005

Every normalizer **MUST** declare a stable mapping identity and mapping version.

### MSC-ORCH-REQ-006

Mapping identity **MUST** remain distinct from normalizer implementation identity.

### MSC-ORCH-REQ-007

Frontend and normalizer selection **MUST NOT** depend on registration order, response timing, or nondeterministic enumeration.

### MSC-ORCH-REQ-008

Frontend resolution **MUST** preserve all materially compatible candidates and the reason for selection or rejection.

### MSC-ORCH-REQ-009

Normalizer resolution **MUST** preserve all materially compatible candidates and the reason for selection or rejection.

### MSC-ORCH-REQ-010

Explicit frontend or normalizer selection **MUST NOT** bypass compatibility, trust, capability, or policy validation.

### MSC-ORCH-REQ-011

Syntax identity **MUST** remain distinct from language identity.

### MSC-ORCH-REQ-012

Language detection based on heuristics **MUST** remain provisional until confirmed.

### MSC-ORCH-REQ-013

Parser probing **MUST** be bounded, side-effect-free, and isolated from final diagnostics unless a probed frontend is selected.

### MSC-ORCH-REQ-014

Capability negotiation **MUST** occur before a frontend or normalizer is treated as fully compatible.

### MSC-ORCH-REQ-015

Capability degradation **MUST** be explicit and produce applicable diagnostics or loss reports.

### MSC-ORCH-REQ-016

Required machine-normative capabilities **MUST NOT** be silently degraded.

### MSC-ORCH-REQ-017

Frontend and normalizer semantic configuration **MUST** participate in compilation and cache fingerprints.

### MSC-ORCH-REQ-018

Frontend and normalizer configuration **MUST** be validated against registered schemas.

### MSC-ORCH-REQ-019

Unknown semantic configuration **MUST NOT** be ignored silently.

### MSC-ORCH-REQ-020

Every frontend invocation **MUST** preserve artifact, representation, frontend, language, syntax, profile, configuration, trust, and provenance context.

### MSC-ORCH-REQ-021

Every normalizer invocation **MUST** preserve surface artifact, mapping, target MSL version, canonical AST version, profile, configuration, trust, and provenance context.

### MSC-ORCH-REQ-022

Frontend outputs **MUST** be validated before entering later compiler phases.

### MSC-ORCH-REQ-023

Normalizer outputs **MUST** be validated before canonical AST assembly.

### MSC-ORCH-REQ-024

Frontend success **MUST NOT** imply semantic validity.

### MSC-ORCH-REQ-025

Normalizer success **MUST NOT** imply successful symbol binding, reference resolution, type validity, or MSG readiness.

### MSC-ORCH-REQ-026

Every surface AST artifact **MUST** preserve source artifact and frontend lineage.

### MSC-ORCH-REQ-027

Every normalized canonical AST node **MUST** preserve surface-node, mapping, and source-artifact lineage.

### MSC-ORCH-REQ-028

Direct canonical frontends **MUST** pass canonical AST validation and **MUST NOT** bypass common semantic analysis.

### MSC-ORCH-REQ-029

Host and embedded frontend boundaries **MUST** remain explicit.

### MSC-ORCH-REQ-030

Embedded-language dispatch **MUST** use registered language, frontend, capability, trust, and version contracts.

### MSC-ORCH-REQ-031

Nested frontend dispatch **MUST** be bounded by depth, count, size, and resource limits.

### MSC-ORCH-REQ-032

A failed required embedded region **MUST NOT** be represented as successfully compiled host semantics.

### MSC-ORCH-REQ-033

Normalizer chains **MUST** be planned before execution and recorded in the compilation plan.

### MSC-ORCH-REQ-034

Every normalizer-chain transition **MUST** have compatible representation and schema contracts.

### MSC-ORCH-REQ-035

Normalizer chains **MUST** preserve cumulative lineage, ambiguity, conflicts, and losses.

### MSC-ORCH-REQ-036

Normalizer-chain cycles **MUST** be rejected unless explicitly modeled as bounded migrations or fixed-point transformations.

### MSC-ORCH-REQ-037

Chain selection **MUST** consider semantic fidelity and loss, not merely the number of steps.

### MSC-ORCH-REQ-038

Multi-input normalization **MUST** preserve all contributing artifact and field-level provenance where applicable.

### MSC-ORCH-REQ-039

Multi-output normalization **MUST** preserve transformation lineage from each output to its inputs.

### MSC-ORCH-REQ-040

Normalizers **MUST NOT** silently mutate existing authoritative canonical knowledge.

### MSC-ORCH-REQ-041

Normalizer trust **MUST NOT** grant semantic authority to normalized content.

### MSC-ORCH-REQ-042

AI-assisted frontend and normalization output **MUST** remain provisional unless validated and adopted through an authorized process.

### MSC-ORCH-REQ-043

Material semantic ambiguity **MUST NOT** be resolved silently.

### MSC-ORCH-REQ-044

Normalization conflicts **MUST** preserve competing claims and provenance.

### MSC-ORCH-REQ-045

Unsupported identity-bearing, normative, authority-bearing, lifecycle-bearing, constraint-bearing, or security-relevant content **MUST NOT** be omitted silently.

### MSC-ORCH-REQ-046

Opaque preservation **MUST** retain source payload or stable payload reference, identity, source location, language, authority, lifecycle, required status, and provenance.

### MSC-ORCH-REQ-047

Opaque preservation **MUST NOT** be represented as semantic validation.

### MSC-ORCH-REQ-048

Frontend and normalizer losses **MUST** be aggregated across the selected orchestration chain.

### MSC-ORCH-REQ-049

Loss-threshold decisions **MUST** preserve profile, category, severity, and rationale.

### MSC-ORCH-REQ-050

Fallback **MUST NOT** silently weaken required semantic, authority, diagnostic, trust, or round-trip guarantees.

### MSC-ORCH-REQ-051

MSC **MUST NOT** use arbitrary text parsing as a universal semantic fallback.

### MSC-ORCH-REQ-052

Frontend composition **MUST** declare ordering, output merge behavior, shared source mapping, capabilities, and failure behavior.

### MSC-ORCH-REQ-053

Composition conflicts **MUST NOT** be resolved through component execution order.

### MSC-ORCH-REQ-054

Incremental frontend invalidation **MUST** include artifact, representation, frontend, language, syntax, configuration, extension, and environment changes.

### MSC-ORCH-REQ-055

Incremental normalization invalidation **MUST** include surface AST, mapping, profile, authority policy, extension, target version, and semantic-context changes.

### MSC-ORCH-REQ-056

Frontend cache validity **MUST** include frontend and input-representation contracts.

### MSC-ORCH-REQ-057

Normalization cache validity **MUST** include normalizer, mapping, target representation, profile, and semantic context contracts.

### MSC-ORCH-REQ-058

A mapping-version change **MUST** invalidate affected normalization outputs.

### MSC-ORCH-REQ-059

Deterministic frontends and normalizers **MUST** produce semantically equivalent outputs under equivalent declared inputs.

### MSC-ORCH-REQ-060

Untrusted frontends and normalizers **MUST** execute under applicable sandbox, access, resource, timeout, and cancellation policies.

---

## 88. Conceptual Model

```text
Compilation Unit
        │
        ▼
Artifact Representation Resolver
├── artifact type
├── representation
├── media type
├── language
├── syntax
└── version
        │
        ▼
Frontend Resolver
├── candidate discovery
├── capability negotiation
├── trust filtering
├── profile filtering
└── deterministic selection
        │
        ▼
Frontend Execution
├── surface AST
├── embedded regions
├── contained artifacts
├── source maps
└── diagnostics
        │
        ▼
Surface Validation
        │
        ▼
Normalizer Resolver
├── source domain
├── surface AST version
├── target MSL version
├── profile
├── authority policy
├── inference policy
└── extension support
        │
        ▼
Normalizer Execution
├── canonical nodes
├── identity mappings
├── ambiguity
├── conflicts
├── opaque content
├── losses
└── provenance
        │
        ▼
Canonical AST Assembly
        │
        ▼
Canonicalization Barrier
        │
        ▼
Declaration Collection
```

---

## 89. Machine Specification

```yaml
machine_spec:
  kind: frontend_and_normalizer_orchestration

  frontend_classes:
    - textual_parser
    - structured_data_parser
    - semantic_editor
    - import_reader
    - repository_reader
    - source_code_frontend
    - conversation_frontend
    - serialized_ast_reader
    - generated_frontend
    - container_frontend

  frontend_capabilities:
    - parse
    - read
    - write
    - source_preserve
    - exact_round_trip
    - formatted_round_trip
    - semantic_round_trip
    - source_maps
    - partial_parse
    - error_recovery
    - embedded_region_discovery
    - embedded_dispatch
    - comments
    - trivia
    - extensions
    - incremental_parse
    - streaming
    - deterministic
    - direct_canonical_output

  capability_levels:
    - none
    - partial
    - full
    - experimental
    - lossy

  frontend_resolution_outcomes:
    - selected
    - selected_composition
    - ambiguous
    - unsupported
    - incompatible
    - untrusted
    - unavailable
    - deferred

  capability_negotiation_outcomes:
    - satisfied
    - satisfied_with_degradation
    - partial
    - unsupported
    - prohibited

  frontend_result_states:
    - complete
    - partial
    - recovered
    - unsupported
    - failed
    - cancelled
    - timed_out
    - resource_limited

  normalizer_result_states:
    - complete
    - partial
    - ambiguous
    - conflicting
    - unsupported
    - failed
    - cancelled
    - timed_out
    - resource_limited

  ambiguity_behaviors:
    - reject
    - preserve_candidates
    - request_confirmation
    - apply_declared_default
    - emit_unresolved_node
    - profile_specific

  unsupported_behaviors:
    - reject
    - preserve_opaque
    - attach_informative
    - delegate_extension
    - omit_by_explicit_profile
    - emit_unresolved_canonical_node

  loss_categories:
    - presentation
    - trivia
    - structure
    - identity
    - relationship
    - type
    - constraint
    - authority
    - lifecycle
    - provenance
    - semantic
    - extension
    - round_trip

  orchestration_pipeline:
    - representation_selection
    - frontend_candidate_resolution
    - capability_negotiation
    - frontend_execution
    - surface_ast_validation
    - embedded_region_dispatch
    - normalizer_candidate_resolution
    - mapping_selection
    - normalization_chain_planning
    - normalization_execution
    - loss_aggregation
    - canonical_ast_assembly
    - canonicalization_barrier
```

---

## 90. Invariants

```yaml
invariants:
  - id: MSC-ORCH-INV-001
    expression: frontend_selection.depends_on_registration_order == false
    description: Registry ordering does not choose semantic behavior.

  - id: MSC-ORCH-INV-002
    expression: normalizer_selection.depends_on_registration_order == false
    description: Mapping selection is deterministic from declared context.

  - id: MSC-ORCH-INV-003
    expression: syntax_identity != language_identity
    description: Concrete representation and semantic language remain distinct.

  - id: MSC-ORCH-INV-004
    expression: frontend_success.implies_semantic_validity == false
    description: Parsing does not establish resolved meaning.

  - id: MSC-ORCH-INV-005
    expression: normalizer_success.implies_msg_ready == false
    description: Canonical construction precedes semantic analysis.

  - id: MSC-ORCH-INV-006
    expression: surface_ast.source_lineage != null
    description: Parsed structures remain linked to input artifacts.

  - id: MSC-ORCH-INV-007
    expression: normalized_node.mapping_lineage != null
    description: Canonical nodes identify the mapping that produced them.

  - id: MSC-ORCH-INV-008
    expression: direct_canonical_frontend.bypasses_common_semantic_analysis == false
    description: AST-native authoring does not bypass compiler semantics.

  - id: MSC-ORCH-INV-009
    expression: embedded_language_boundary.preserved == true
    description: Host and embedded parsers remain distinct.

  - id: MSC-ORCH-INV-010
    expression: normalizer_chain.lineage_complete == true
    description: Multi-stage mappings preserve every transformation.

  - id: MSC-ORCH-INV-011
    expression: normalizer_trust.grants_content_authority == false
    description: Trusted code does not make content authoritative.

  - id: MSC-ORCH-INV-012
    expression: material_ambiguity.silently_selected == false
    description: Competing interpretations remain visible.

  - id: MSC-ORCH-INV-013
    expression: semantic_conflict.resolved_by_execution_order == false
    description: Runtime order does not decide meaning.

  - id: MSC-ORCH-INV-014
    expression: opaque_content.semantic_validation_claimed == false
    description: Preservation is not interpretation.

  - id: MSC-ORCH-INV-015
    expression: fallback.weakens_required_guarantees_silently == false
    description: Degraded paths remain explicit.

  - id: MSC-ORCH-INV-016
    expression: mapping_version_changed.implies_normalization_cache_invalidated == true
    description: Mapping evolution invalidates derived semantics.

  - id: MSC-ORCH-INV-017
    expression: ai_output.authority in [provisional, informative, inferred]
    description: AI assistance remains nonauthoritative until adoption.

  - id: MSC-ORCH-INV-018
    expression: canonicalization_barrier.passed_implies_lineage_complete == true
    description: Binding begins only from traceable canonical structures.
```

---

## 91. Diagnostics

### MSC0301 — Frontend Manifest Invalid

A frontend manifest lacks required identity, version, representation, language, capability, trust, or compatibility information.

### MSC0302 — Frontend Candidate Missing

No registered frontend can interpret the selected artifact representation.

### MSC0303 — Frontend Selection Ambiguous

Several materially distinct compatible frontends remain without a deterministic preference.

### MSC0304 — Explicit Frontend Incompatible

The explicitly selected frontend does not satisfy representation, version, capability, trust, or profile requirements.

### MSC0305 — Syntax Identity Unknown

MSC cannot determine the concrete syntax safely.

### MSC0306 — Language Identity Unknown

MSC cannot determine the represented language safely.

### MSC0307 — Language Classification Provisional

The artifact language was selected heuristically and requires confirmation or parse validation.

### MSC0308 — Frontend Capability Missing

The selected frontend lacks a required capability.

### MSC0309 — Frontend Capability Degraded

The frontend can proceed only with reduced preservation or semantic support.

### MSC0310 — Frontend Configuration Invalid

Frontend configuration violates its registered schema.

### MSC0311 — Frontend Invocation Failed

The selected frontend failed to produce a permitted result.

### MSC0312 — Frontend Timed Out

Frontend execution exceeded its allowed duration.

### MSC0313 — Frontend Resource Limit Exceeded

Frontend execution exceeded memory, CPU, size, recursion, or nesting limits.

### MSC0314 — Surface AST Invalid

The frontend output violates the registered surface AST contract.

### MSC0315 — Surface Lineage Missing

A surface AST cannot be traced to its artifact representation.

### MSC0316 — Direct Canonical Output Invalid

A direct canonical frontend produced invalid or incompatible canonical AST structures.

### MSC0317 — Embedded Region Declaration Invalid

An embedded region lacks identity, language, syntax, role, source span, or provenance.

### MSC0318 — Embedded Frontend Missing

No compatible frontend can interpret a required embedded region.

### MSC0319 — Embedded Parse Failed

A required embedded-language parse failed.

### MSC0320 — Embedded Nesting Limit Exceeded

Nested language dispatch exceeded configured bounds.

### MSC0321 — Normalizer Manifest Invalid

A normalizer manifest lacks required mapping, input, output, profile, authority, loss, or compatibility information.

### MSC0322 — Normalizer Candidate Missing

No compatible normalizer can transform the surface AST into the requested canonical representation.

### MSC0323 — Normalizer Selection Ambiguous

Several materially distinct mappings remain without a deterministic selection rule.

### MSC0324 — Explicit Normalizer Incompatible

The selected normalizer does not satisfy source-domain, mapping, target-version, profile, trust, or extension requirements.

### MSC0325 — Mapping Version Missing

Normalization began without a declared mapping version.

### MSC0326 — Normalization Profile Missing

No profile defines authority, inference, ambiguity, conflict, unsupported, or loss behavior.

### MSC0327 — Normalizer Configuration Invalid

Normalizer configuration violates its registered schema.

### MSC0328 — Normalization Failed

The selected normalizer failed to produce a permitted canonical result.

### MSC0329 — Normalizer Chain Invalid

A selected normalization chain contains incompatible transitions, unsupported cycles, or unreachable targets.

### MSC0330 — Normalizer Chain Loss Excessive

The selected chain exceeds the active profile’s loss threshold.

### MSC0331 — Mapping Lineage Missing

A canonical node cannot be traced to a mapping and source surface node.

### MSC0332 — External Identity Lost

Normalization discarded a stable external identity without preserving a mapping.

### MSC0333 — Unauthorized Normalization Authority

A normalizer assigned stronger authority without an authorized rule or transition.

### MSC0334 — Normalization Inference Misclassified

An inferred value is represented as a direct source fact or deterministic derivation.

### MSC0335 — Normalization Ambiguous

A surface construct supports materially different canonical interpretations.

### MSC0336 — Normalization Conflict

Normalization produced incompatible canonical claims.

### MSC0337 — Unsupported Critical Construct

A required normative, identity, authority, lifecycle, constraint, or security construct cannot be normalized safely.

### MSC0338 — Opaque Preservation Invalid

Opaque content lacks required source, language, authority, lifecycle, payload, or provenance information.

### MSC0339 — Fallback Guarantee Violation

Fallback weakened required semantic or preservation guarantees without explicit authorization.

### MSC0340 — Canonicalization Barrier Failed

Canonical AST assembly does not satisfy the prerequisites for declaration collection.

---

## 92. Acceptance Criteria

This specification is satisfied when:

1. frontend and normalizer orchestration are explicit compiler stages;
2. frontend, syntax, language, mapping, and implementation identities remain distinct;
3. frontend and normalizer registries use versioned manifests;
4. candidate discovery and deterministic selection are defined;
5. selection does not depend on registration order or execution timing;
6. capability negotiation occurs before invocation;
7. degradation is explicit;
8. configuration is schema-validated and fingerprinted;
9. frontend invocation and results are structured;
10. surface AST outputs are validated;
11. direct canonical frontends bypass only unnecessary normalization;
12. container and embedded-language orchestration are supported;
13. nested dispatch is bounded;
14. normalizer selection includes mapping, profile, authority, inference, ambiguity, conflict, and loss policies;
15. multi-stage normalization chains are explicit and validated;
16. multi-input and multi-output normalization preserve lineage;
17. authority cannot increase silently;
18. AI-assisted results remain provisional;
19. ambiguity and conflicts remain visible;
20. unsupported critical content cannot disappear silently;
21. opaque preservation is distinct from semantic validation;
22. fallback cannot silently weaken guarantees;
23. frontend and normalization caches use complete semantic fingerprints;
24. mapping evolution invalidates derived output;
25. orchestration records explain compiler decisions;
26. canonicalization barriers protect downstream binding;
27. conformance is independently testable for frontends, normalizers, and orchestration.

---

## 93. Conformance Examples

### 93.1 Valid Markdown Frontend Resolution

Artifact descriptor:

```yaml
artifact:
  representation: text
  media_type: text/markdown
  syntax: msl-markdown
  language: msl.document
  language_version: bootstrap
```

Resolved frontend:

```yaml
frontend:
  id: msc.frontend.msl-markdown
  version: 0.1.0
  capabilities:
    source_maps: full
    partial_parse: full
    embedded_region_discovery: full
```

The decision is recorded with all rejected candidates.

### 93.2 Invalid Extension-Only Selection

Two Markdown frontends exist.

MSC selects one solely because it was registered first.

Expected diagnostic:

```text
MSC0303: frontend selection cannot depend on registration order
```

### 93.3 Valid Direct Canonical Frontend

```yaml
frontend:
  id: monad.semantic-editor
  output: canonical_msl_ast
  target_msl_version: bootstrap
  target_ast_version: 0.1.0
```

The output still passes canonical AST validation and common semantic compilation.

### 93.4 Invalid Direct Semantic Bypass

A semantic editor emits KIR directly without canonical AST validation, binding, MSG construction, or lineage.

Expected diagnostic:

```text
MSC0316: direct canonical frontend cannot bypass common semantic analysis
```

### 93.5 Valid Embedded Constraint Dispatch

Host region:

```yaml
region:
  id: AUTH-INVARIANT-001
  language: msl.constraint
  version: 0.1.0
  role: invariant
  authority: machine_normative
```

MSC resolves the Constraint Language frontend independently and links its surface AST to the host source region.

### 93.6 Invalid Opaque Machine Constraint

A required machine-normative constraint region is preserved opaquely because no frontend is installed, but compilation reports complete success.

Expected diagnostics:

```text
MSC0318: required embedded frontend is unavailable
MSC0337: required machine-normative construct cannot be interpreted
MSC0340: canonicalization barrier cannot pass
```

### 93.7 Valid OpenAPI Normalization

```yaml
normalizer:
  id: msc.normalizer.openapi
  version: 0.1.0
  mapping:
    id: OPENAPI-MSL-MAP-0001
    version: 0.1.0
  profile: interface_contract
```

Output includes:

* canonical interface operation nodes;
* external identity mappings;
* coverage;
* source lineage;
* loss report;
* diagnostics.

### 93.8 Invalid Authority Escalation

An unapproved OpenAPI file is normalized as an approved machine-normative interface contract without an authoritative import policy.

Expected diagnostic:

```text
MSC0333: normalization cannot silently elevate imported content authority
```

### 93.9 Valid Normalizer Chain

```text
Legacy OpenAPI 2.0 AST
    ↓
OpenAPI 2-to-3 Migration Mapping
    ↓
OpenAPI 3.1 Surface AST
    ↓
OpenAPI-to-MSL Mapping
    ↓
Canonical MSL AST
```

Both mapping identities, versions, losses, and transformation records are retained.

### 93.10 Invalid Chain Selection

A two-step lossy chain is selected over a one-step lossless trusted mapping because it registered earlier.

Expected diagnostic:

```text
MSC0329: normalization-chain selection violated deterministic fidelity policy
```

### 93.11 Valid Candidate Requirement Extraction

```yaml
canonical_node:
  kind: requirement
  authority: provisional

  provenance:
    origin: ai_assisted_normalization
    evidence:
      - conversation-turn-18
    user_confirmed: false
```

The node may enter a partial canonical AST but cannot become authoritative MSG knowledge.

### 93.12 Invalid Text Fallback

An unsupported binary artifact is decoded as arbitrary text and converted into requirements by a generic parser.

Expected diagnostics:

```text
MSC0302: no compatible frontend supports the artifact representation
MSC0339: universal text fallback cannot satisfy semantic guarantees
```

---

## 94. Security and Trust Considerations

Frontends and normalizers process untrusted representations and can materially alter semantic interpretation.

Threats include:

* parser exploits;
* decompression bombs;
* nested-language denial of service;
* malicious AST output;
* source-map forgery;
* frontend substitution;
* mapping substitution;
* authority escalation;
* provenance removal;
* identity remapping;
* opaque-content smuggling;
* fallback weakening;
* cache poisoning;
* prompt injection;
* undeclared effects;
* remote data leakage.

Implementations should:

* validate manifests and package identity;
* sandbox third-party components;
* bound probing and nesting;
* restrict filesystem and network access;
* validate every output representation;
* preserve all rejected and selected candidates;
* fingerprint frontends, mappings, configuration, and outputs;
* enforce authority and loss policies;
* prohibit universal semantic fallbacks;
* separate component trust from content authority;
* isolate AI-assisted paths;
* revalidate cached outputs;
* require complete lineage before canonicalization barriers pass.

---

## 95. Evolution and Compatibility

The orchestration architecture may evolve through:

* richer capability vocabularies;
* parser protocols;
* remote frontend execution;
* declarative mapping languages;
* generated mapping implementations;
* package-based frontend distribution;
* shared language services;
* streaming normalization;
* distributed orchestration.

Compatible changes may add optional capabilities or new implementation candidates.

Breaking changes include:

* changing frontend-selection precedence;
* changing mapping-selection behavior;
* changing capability semantics;
* changing direct-canonical eligibility;
* changing loss thresholds;
* changing fallback policy;
* changing normalization-chain contracts;
* changing canonicalization barriers.

Breaking changes require:

* MSC version updates;
* manifest migrations;
* cache invalidation;
* mapping compatibility analysis;
* conformance-fixture updates;
* reproducibility impact documentation.

---

## 96. Open Questions

1. What concrete runtime API should frontends implement?
2. What concrete runtime API should normalizers implement?
3. Should frontend manifests and mapping manifests be authored in MSL?
4. How should built-in and plugin frontends be packaged?
5. Which capabilities are required for the bootstrap Markdown frontend?
6. Should parser probing be enabled by default?
7. How should language detection confidence be represented?
8. What is the canonical surface AST serialization?
9. Should direct canonical editors store text projections as secondary representations?
10. How should embedded source maps compose across nested languages?
11. What nesting limit should bootstrap MSC use?
12. Should source-code frontends consume native compiler ASTs directly?
13. How should normalizer implementations prove mapping conformance?
14. Should mappings be declarative, executable, or hybrid?
15. What is the minimum normalization profile set for bootstrap?
16. How should field-level lineage be represented efficiently?
17. Which loss categories block canonicalization by default?
18. How should normalizers access existing semantic context without introducing hidden state?
19. Can a normalizer produce several compilation units?
20. Should alternative canonical interpretations be separate artifacts?
21. How should user confirmation update cached normalization output?
22. Should AI-assisted normalization run inside MSC or as an external proposal frontend?
23. Which frontend and normalizer results should be persisted to MKE?
24. How should remote frontend privacy policy enter reproducibility records?
25. Which orchestration invariants should be implemented first?

---

## 97. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding         |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

It provides requirements for:

| Series            | Purpose                                                          |
| ----------------- | ---------------------------------------------------------------- |
| MART-CORE         | Frontend, normalizer, AST, mapping, and transformation artifacts |
| MSL-FRONTEND      | Concrete frontend protocols and manifests                        |
| MSL-NORMALIZATION | Mapping definitions and normalization profiles                   |
| MSL-DOCUMENT      | Bootstrap host frontend                                          |
| MSL-CONFORMANCE   | Frontend and mapping fixtures                                    |
| MSG-CORE          | Canonical semantics after binding                                |
| KIR-CORE          | Lowered normalized semantics                                     |
| MKE               | Registry and artifact persistence                                |
| CLI               | Frontend selection, normalization, and explanation commands      |

---


<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Bootstrap Metadata Compatibility Amendment

The bootstrap Markdown frontend may recognize legacy MSC-CORE metadata with flat keys following empty grouping keys and a long hyphen closing delimiter. The frontend must normalize that representation into the canonical nested metadata model before canonical AST construction.

Compatibility parsing is permitted only when:

* reconstruction is deterministic;
* no key has two possible parents;
* identity, version, lifecycle, relationships, compilation status, and provenance are preserved;
* the canonical output uses exact `---` delimiters and nested mappings;
* a compatibility diagnostic records the legacy representation.

The frontend must reject ambiguous legacy metadata and must not emit the legacy form.

<!-- WP-MSC-0007:END -->

## Status

Draft.

This document defines the deterministic, capability-aware, trust-aware, provenance-preserving orchestration of frontends and normalizers within MSC.

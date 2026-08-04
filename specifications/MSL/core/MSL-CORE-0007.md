---

artifact:
id: MSL-CORE-0007
type: knowledge.specification
namespace: monad

metadata:
title: Surface ASTs and Normalization Pipeline
version: 0.1.0
status: draft
created: 2026-08-04
authors:
- Monad Architecture Team
tags:
- msl
- surface-ast
- normalization
- importers
- compiler-pipeline
- provenance
- semantic-mapping

relationships:
depends_on:
- ADR-0002
- ADR-0003
- ADR-0004
- MSL-CORE-0001
- MSL-CORE-0002
- MSL-CORE-0003
- MSL-CORE-0004
- MSL-CORE-0005
- MSL-CORE-0006
references:
- MKE-CORE-0002
- MKE-CORE-0003
- MKE-CORE-0004
- MKE-CORE-0005
- MKE-CORE-0008
- MKE-CORE-0009
- MKE-CORE-0010
enables:
- MSL-CORE-0008
- MSL-CORE-0009
- MSL-CORE-0010
- MSC-CORE
- KIR-CORE
- MSL-FRONTEND
- MSL-IMPORT
- MSL-NORMALIZATION

compilation:
language: msl-markdown
language_version: bootstrap
profile: machine
source_role: primary
status: bootstrap
-----------------

# MSL-CORE-0007 — Surface ASTs and Normalization Pipeline

## 1. Purpose

This specification defines the surface Abstract Syntax Tree model and the normalization pipeline used to transform source-domain representations into the canonical MSL AST.

It establishes:

* the role and boundaries of surface ASTs;
* surface-domain fidelity requirements;
* normalization stages;
* source-to-semantic mapping;
* mapping identity and versioning;
* normalization rules;
* mapping ambiguity;
* information-loss reporting;
* authority preservation;
* provenance chains;
* external identity preservation;
* partial normalization;
* normalization diagnostics;
* deterministic and nondeterministic normalization;
* normalization caching;
* compatibility;
* conformance testing.

This specification governs the boundary between source-specific understanding and common MSL semantics.

---

## 2. Context

Monad must ingest engineering knowledge from many formats.

Examples include:

* `msl-markdown`;
* YAML and JSON;
* OpenAPI;
* AsyncAPI;
* JSON Schema;
* GraphQL SDL;
* Protocol Buffers;
* Terraform;
* Kubernetes resources;
* Docker Compose;
* Git repositories;
* source code;
* ADRs;
* RFCs;
* issue trackers;
* pull requests;
* Mermaid;
* PlantUML;
* AI conversations;
* interactive terminal sessions.

These inputs are not semantically equivalent.

Each has:

* its own syntax;
* its own versioning;
* its own domain concepts;
* its own identifiers;
* its own validity rules;
* its own source locations;
* its own extension mechanisms;
* its own loss and ambiguity risks.

A source frontend must first represent the source faithfully.

Only then should a versioned normalization process map the source-domain concepts into MSL concepts.

---

## 3. Scope

This specification defines:

* source-domain inputs;
* surface frontends;
* surface ASTs;
* surface AST schemas;
* normalization mappings;
* normalization phases;
* canonical node construction;
* mapping provenance;
* authority mapping;
* identity mapping;
* source-location mapping;
* ambiguity;
* conflicts;
* loss reports;
* unsupported constructs;
* opaque preservation;
* normalization outcomes;
* incremental normalization;
* deterministic normalization;
* normalization conformance.

This specification does not fully define:

* every source-domain AST;
* the complete canonical MSL AST schema;
* concrete `msl-markdown` grammar;
* the MSL type system;
* KIR;
* source-language parsers;
* source-code semantic analysis;
* domain-specific import mappings;
* renderer behavior.

---

## 4. Non-Goals

This specification does not:

* require every frontend to use a distinct surface AST;
* require all external formats to be fully understood;
* guarantee lossless normalization;
* treat external documents as authoritative MSL automatically;
* define one universal import mapping;
* permit normalizers to invent requirements or decisions silently;
* replace source-domain validators;
* make surface ASTs canonical knowledge;
* require reverse normalization for every format;
* require all source constructs to enter KIR.

---

## 5. Core Principle

> Preserve source meaning first; normalize into shared meaning second.

A surface AST should represent what exists in the source domain.

A normalizer should explicitly declare how that source-domain meaning maps into MSL.

The canonical MSL AST must never conceal where a normalized concept came from.

---

## 6. Architectural Position

```text
Source Artifact
    ↓
Source Acquisition
    ↓
Surface Frontend
    ↓
Surface AST
    ↓
Surface Validation
    ↓
Normalization Mapping
    ↓
Canonical MSL AST
    ↓
Binding and Type Analysis
    ↓
KIR
```

The normalization boundary separates:

```text
Source-Domain Semantics
```

from:

```text
MSL Semantic Vocabulary
```

---

## 7. Terminology

### 7.1 Source Domain

The semantic environment defined by an originating format or system.

Examples:

* OpenAPI;
* Terraform;
* Git;
* Rust;
* Markdown;
* conversational interaction.

### 7.2 Surface Frontend

A component that reads, parses, or observes a source domain and produces a surface AST.

### 7.3 Surface AST

A structured representation whose node vocabulary is specific to a source domain or authoring surface.

### 7.4 Surface Node

A node in a surface AST.

Examples:

* `OpenApiOperationNode`;
* `TerraformResourceNode`;
* `GitCommitNode`;
* `MarkdownHeadingNode`;
* `ConversationTurnNode`.

### 7.5 Surface Schema

The schema defining valid surface node kinds and fields for a source domain and version.

### 7.6 Normalizer

A component that maps surface AST nodes into canonical MSL AST nodes.

### 7.7 Mapping Rule

A versioned declaration describing how one or more surface nodes produce, enrich, constrain, or relate one or more canonical MSL nodes.

### 7.8 Normalization Profile

A selected mapping policy for a source format, use case, trust level, or desired semantic depth.

### 7.9 Canonical Node

A node belonging to the canonical MSL AST vocabulary.

### 7.10 Mapping Confidence

An optional representation of certainty when normalization requires inference.

### 7.11 Loss Report

A structured record identifying source information that could not be preserved semantically or structurally.

### 7.12 Mapping Ambiguity

A condition in which the same source structure supports more than one plausible semantic mapping.

### 7.13 Mapping Conflict

A condition in which source structures or mapping rules imply incompatible canonical semantics.

### 7.14 Mapping Coverage

The proportion and categories of source-domain information represented by normalized output.

### 7.15 Source Fidelity

The extent to which the surface AST preserves the source domain accurately.

---

## 8. When a Surface AST Is Required

A dedicated surface AST is required when direct construction of canonical MSL nodes would materially lose:

* source-domain structure;
* source-specific diagnostics;
* comments or trivia required for round trip;
* unsupported source constructs;
* external identities;
* source-specific extension data;
* source-version distinctions;
* source-domain validation state;
* ambiguity needed for later analysis.

A frontend may directly produce the canonical MSL AST when the authoring surface already expresses canonical MSL concepts directly.

Examples may include:

* a semantic MSL editor;
* a structured MSL form;
* a dedicated MSL textual language.

Even in direct production, frontend provenance and source locations remain required.

---

## 9. Surface AST Root Model

A surface AST compilation unit conceptually contains:

```text
SurfaceCompilationUnit

├── source_domain
├── source_format
├── source_format_version
├── frontend_identity
├── frontend_version
├── surface_ast_schema_version
├── sources
├── root_nodes
├── source_diagnostics
├── source_validity
├── extension_context
├── source_map
└── provenance
```

---

## 10. Base Surface Node Model

Every surface node conceptually contains:

```text
SurfaceNode

├── node_id
├── domain_kind
├── source_identity
├── source_location
├── fields
├── children
├── source_validity
├── source_extensions
├── trivia
├── provenance
└── preservation_state
```

A surface node does not require canonical MSL semantic identity.

It may preserve an external identity.

---

## 11. Source-Domain Vocabulary

Surface node kinds must belong to a declared source-domain vocabulary.

Examples:

### OpenAPI

```text
OpenApiDocument
OpenApiPath
OpenApiOperation
OpenApiParameter
OpenApiSchema
OpenApiResponse
```

### Terraform

```text
TerraformModule
TerraformResource
TerraformDataSource
TerraformVariable
TerraformOutput
TerraformExpression
```

### Git

```text
GitRepository
GitCommit
GitTree
GitBlob
GitTag
GitDiff
GitReference
```

### Conversation

```text
Conversation
ConversationTurn
UserStatement
AssistantProposal
UserConfirmation
UnresolvedQuestion
```

Surface vocabularies must not use canonical MSL names merely to imply semantic equivalence before normalization.

---

## 12. Source Validation

Surface validation determines whether the source AST accurately represents a valid or partially valid source-domain artifact.

Surface validation may include:

* syntax validation;
* source-schema validation;
* source-version validation;
* external reference validation;
* source-domain constraints;
* source extension validation.

A source may be valid in its own domain while normalizing into incomplete or conflicting MSL semantics.

A source may also be invalid while still producing a partial surface AST suitable for diagnostics and recovery.

---

## 13. Normalization Pipeline

The conceptual normalization pipeline is:

```text
Surface AST
    ↓
Mapping Selection
    ↓
Surface Node Classification
    ↓
External Identity Extraction
    ↓
Candidate Semantic Mapping
    ↓
Authority Assignment
    ↓
Canonical Node Construction
    ↓
Relationship Construction
    ↓
Loss and Ambiguity Analysis
    ↓
Normalization Validation
    ↓
Canonical MSL AST
```

---

## 14. Mapping Selection

Before normalization, Monad must select:

* source-domain mapping;
* mapping version;
* target MSL version;
* normalization profile;
* active extensions;
* trust policy;
* inference policy;
* strictness.

Example:

```yaml
normalization:
  mapping: openapi-to-msl
  mapping_version: 0.1.0
  source_version: 3.1.0
  target_msl_version: bootstrap
  profile: interface_contract
  inference: conservative
```

Mapping selection must be explicit or deterministic from registered configuration.

---

## 15. Mapping Identity

Every mapping must have stable identity.

Example:

```text
OPENAPI-MSL-MAP-0001
```

A mapping identity must remain distinct from:

* source frontend identity;
* source format identity;
* surface AST schema identity;
* MSL language identity;
* compiler identity;
* KIR identity.

---

## 16. Mapping Version

Mappings evolve independently.

A mapping version may change because:

* the source format changes;
* MSL semantics change;
* mapping coverage improves;
* ambiguity rules change;
* authority policies change;
* bugs are corrected;
* extension support is added.

Normalized output must preserve the mapping version used.

---

## 17. Mapping Rule Model

A mapping rule conceptually contains:

```text
MappingRule

├── rule_id
├── source_domain
├── source_node_pattern
├── source_version_range
├── target_msl_version_range
├── normalization_profile
├── conditions
├── output_node_kinds
├── field_mappings
├── relationship_mappings
├── authority_rule
├── identity_rule
├── loss_behavior
├── ambiguity_behavior
└── provenance
```

---

## 18. Mapping Rule Categories

Initial mapping-rule categories include:

* direct;
* structural;
* aggregate;
* split;
* enrichment;
* inference;
* relationship;
* omission;
* opaque preservation;
* deprecation;
* migration.

### 18.1 Direct Mapping

One surface node produces one canonical node.

### 18.2 Structural Mapping

A source subtree produces a canonical structure.

### 18.3 Aggregate Mapping

Multiple surface nodes combine into one canonical node.

### 18.4 Split Mapping

One surface node produces multiple canonical nodes.

### 18.5 Enrichment Mapping

A source node adds fields or relationships to an existing canonical node.

### 18.6 Inference Mapping

Canonical semantics are proposed based on indirect evidence.

### 18.7 Omission Mapping

A source construct is intentionally excluded from canonical semantics.

### 18.8 Opaque Preservation

Unsupported source content is retained without semantic interpretation.

---

## 19. Direct Mapping Example

```text
OpenApiSchemaNode
    ↓
TypeDeclarationNode
```

The normalizer should preserve:

* schema name;
* external identity;
* fields;
* constraints;
* source span;
* OpenAPI version;
* mapping rule;
* mapping version.

---

## 20. Aggregate Mapping Example

```text
OpenApiPathNode
+
OpenApiOperationNode
+
OpenApiResponseNode
    ↓
InterfaceOperationDeclaration
```

All contributing source nodes must remain traceable.

---

## 21. Split Mapping Example

```text
TerraformResourceNode
    ↓
InfrastructureResourceDeclaration
ResourceProviderRelationship
ConfigurationConstraint
```

The lineage must show that one source node produced several canonical nodes.

---

## 22. Inference Mapping Example

A Git commit message states:

```text
replace YAML registry with generated registry
```

The source AST may produce:

```text
GitCommitNode
```

A conservative normalizer may produce:

```text
ChangeEvent
```

It must not automatically produce:

```text
ArchitectureDecision
```

unless an explicit inference rule and authority workflow permit that conclusion.

---

## 23. Canonical Node Construction

Canonical nodes created by normalization must identify:

* canonical node kind;
* node identity;
* semantic identity when available;
* contributing surface nodes;
* mapping rule;
* mapping version;
* normalization profile;
* source authority;
* resulting authority;
* lifecycle state;
* confidence when inferred;
* unresolved fields;
* loss state.

---

## 24. Identity Mapping

Normalization may encounter several identity classes:

* canonical MSL identity already present;
* stable external identity;
* unstable external label;
* source-location-derived identity;
* no identity.

The normalizer may:

* preserve canonical identity;
* map external identity to canonical identity;
* create provisional identity;
* create ephemeral node identity;
* request identity assignment;
* reject normalization when durable identity is mandatory.

Identity generation rules must be explicit.

---

## 25. External Identity Preservation

External identifiers must be preserved when available.

Example:

```yaml
external_identity:
  authority: openapi
  value: operations.getUser
```

Mapped canonical identity:

```yaml
semantic_identity:
  namespace: example
  id: API-OP-0001
```

Relationship:

```text
API-OP-0001
    derived_from_external_identity
operations.getUser
```

---

## 26. Authority Mapping

Source existence does not imply normative authority.

Normalization must assign authority based on:

* source type;
* source lifecycle;
* source trust;
* mapping profile;
* user confirmation;
* organizational policy;
* import mode;
* explicit adoption.

Examples:

| Source                                      | Typical normalized authority |
| ------------------------------------------- | ---------------------------- |
| Approved MSL specification                  | normative                    |
| OpenAPI contract treated as source of truth | machine_normative            |
| Scanned source code                         | informative or inferred      |
| AI conversation proposal                    | provisional                  |
| User-confirmed requirement                  | normative candidate          |
| Git commit                                  | evidence or historical       |
| Unreviewed ADR draft                        | provisional                  |

Authority rules must be explicit.

---

## 27. Authority Escalation

A normalizer must not increase authority silently.

Examples of authority escalation include:

```text
informative → normative
provisional → approved
inferred → machine_normative
generated → authoritative
```

Such transitions require:

* explicit mapping policy;
* authorized adoption;
* evidence;
* review;
* or a defined governance workflow.

---

## 28. Source Facts Versus Inferences

Normalized output must distinguish:

### Source Fact

Directly represented by the source.

Example:

```text
OpenAPI operation uses HTTP GET.
```

### Derived Fact

Deterministically calculated from source facts.

Example:

```text
Operation is read-oriented under a registered HTTP semantic mapping.
```

### Inference

A plausible but non-deterministic interpretation.

Example:

```text
Operation likely satisfies a user-profile retrieval requirement.
```

### Proposal

A generated candidate requiring review.

Example:

```text
Create requirement USER-PROFILE-REQ-001.
```

These categories must remain visible in provenance.

---

## 29. Mapping Ambiguity

A mapping is ambiguous when more than one canonical interpretation is plausible.

Example:

A Markdown section titled:

```text
Security
```

may represent:

* requirements;
* rationale;
* threats;
* controls;
* general explanation.

The normalizer must not choose silently when the difference affects semantics.

Permitted outcomes:

* unresolved canonical node;
* multiple candidates;
* diagnostic;
* user clarification request;
* profile-defined default with explicit provenance.

---

## 30. Mapping Conflict

A conflict may arise when:

* multiple source nodes map incompatible values to one canonical field;
* two mappings assign incompatible authority;
* imported sources claim the same identity;
* source facts contradict existing MSL knowledge;
* mapping rules overlap inconsistently.

Conflicts must be represented explicitly.

They must not be resolved through arbitrary source order unless a declared precedence policy applies.

---

## 31. Normalization Profiles

A normalization profile determines the intended semantic depth and policy.

Examples:

```text
archive_only
inventory
documentation
interface_contract
reverse_engineering
migration
authoritative_import
candidate_knowledge
```

### 31.1 Archive-Only

Preserve source artifacts and surface AST without producing canonical semantics beyond basic identity and provenance.

### 31.2 Inventory

Produce artifact and relationship inventory.

### 31.3 Documentation

Normalize explanatory and descriptive concepts.

### 31.4 Interface Contract

Produce formal interface declarations.

### 31.5 Reverse Engineering

Infer candidate architecture, behavior, and requirements from existing systems.

### 31.6 Authoritative Import

Treat selected source constructs as authoritative under explicit governance.

Profiles must state their authority and inference policies.

---

## 32. Partial Normalization

A surface AST may normalize only partially.

Partial normalization may contain:

* mapped nodes;
* opaque nodes;
* unresolved candidates;
* missing required fields;
* unsupported constructs;
* conflict nodes;
* pending confirmations.

A partial canonical AST must identify its incomplete state.

It must not be represented as fully compiled knowledge.

---

## 33. Unsupported Constructs

Unsupported source constructs may be handled through:

* rejection;
* opaque preservation;
* informative attachment;
* profile-based omission;
* delegated extension;
* unresolved canonical placeholder;
* loss report.

Unsupported normative or security-relevant constructs must not be omitted silently.

---

## 34. Opaque Surface Preservation

Opaque surface nodes preserve source constructs the normalizer cannot interpret.

They must retain:

* source-domain kind;
* raw payload or source slice;
* source identity;
* source location;
* source authority;
* preservation status;
* whether the construct blocks complete normalization.

---

## 35. Loss Categories

Normalization loss may include:

```text
presentation_loss
source_trivia_loss
structural_loss
identity_loss
relationship_loss
constraint_loss
authority_loss
provenance_loss
semantic_loss
extension_loss
round_trip_loss
```

Semantic, authority, identity, constraint, and provenance losses are high severity.

---

## 36. Loss Report Model

A loss report conceptually contains:

```text
NormalizationLossReport

├── report_id
├── mapping_id
├── mapping_version
├── source_identity
├── normalization_profile
├── losses
├── preserved_elements
├── severity
├── affected_nodes
├── mitigation
└── provenance
```

---

## 37. Mapping Coverage

Normalization should report coverage.

Coverage may describe:

* recognized nodes;
* normalized nodes;
* opaque nodes;
* omitted nodes;
* ambiguous nodes;
* conflicting nodes;
* unsupported nodes;
* source bytes or semantic fields covered.

A single percentage is insufficient without category details.

---

## 38. Normalization Provenance Chain

Every canonical node produced through normalization must preserve:

```text
Canonical MSL Node
    normalized_by
Mapping Rule and Version
    normalized_from
Surface AST Node or Nodes
    parsed_by
Surface Frontend and Version
    parsed_from
Source Artifact and Location
```

---

## 39. Transformation Events

Normalization should produce transformation events.

Example:

```yaml
transformation:
  id: norm-event-001
  kind: normalize
  mapping: OPENAPI-MSL-MAP-0001
  mapping_version: 0.1.0
  inputs:
    - openapi-node-44
  outputs:
    - msl-interface-operation-12
  deterministic: true
```

---

## 40. Deterministic Normalization

A normalization is deterministic when equivalent:

* surface AST;
* mapping version;
* profile;
* target MSL version;
* extension configuration;
* registry state;

produce semantically equivalent canonical AST output and diagnostics.

Deterministic normalizers should support reproducible fingerprints.

---

## 41. Nondeterministic Normalization

AI-assisted or heuristic normalization may be nondeterministic.

It must identify:

* method;
* model or algorithm;
* configuration;
* inputs;
* confidence;
* candidate status;
* confirmation requirements;
* nondeterministic behavior.

Nondeterministic normalization must not claim deterministic conformance.

---

## 42. Human Confirmation

Normalization may require human confirmation for:

* ambiguous mappings;
* inferred identities;
* requirement extraction;
* authority assignment;
* lifecycle adoption;
* conflict resolution;
* lossy transformations;
* source-of-truth selection.

Confirmation must preserve:

* actor;
* decision;
* timestamp;
* selected candidate;
* rejected candidates;
* reason where applicable.

---

## 43. Existing Knowledge Integration

Normalization may operate against an existing MKE context.

Potential outcomes include:

* create new node;
* enrich existing node;
* relate to existing node;
* identify duplicate;
* identify conflict;
* propose merge;
* propose supersession;
* preserve as parallel evidence.

A normalizer must not silently overwrite existing authoritative knowledge.

---

## 44. Deduplication

Two normalized nodes may represent the same semantic concept.

Deduplication may use:

* canonical identity;
* external identity;
* semantic fingerprint;
* source mapping;
* declared equivalence;
* human confirmation.

Similarity alone must not silently merge authoritative nodes.

---

## 45. Merge Behavior

When normalized content enriches an existing node, merge behavior must be field-specific.

Possible outcomes:

```text
accept
reject
append
union
replace
propose
conflict
preserve_parallel
```

Authority and provenance must be considered.

---

## 46. Normalization Ordering

Normalization may require ordered phases.

Example:

```text
Identity Extraction
    ↓
Namespace Mapping
    ↓
Type Mapping
    ↓
Declaration Construction
    ↓
Relationship Construction
    ↓
Constraint Mapping
    ↓
Authority Assignment
    ↓
Validation
```

Mappings must declare dependencies when ordering matters.

---

## 47. Mapping Dependencies

A mapping may depend on:

* another mapping;
* extension schema;
* registry data;
* source-domain library;
* target MSL feature;
* organizational policy;
* type registry.

Mapping dependencies must be versioned and resolvable.

---

## 48. Cyclic Mapping Dependencies

Mapping dependency cycles must be rejected unless the mapping system explicitly supports a fixed-point evaluation model.

Any supported fixed-point behavior must:

* terminate deterministically;
* expose iteration limits;
* preserve diagnostics;
* avoid authority escalation.

---

## 49. Incremental Normalization

Normalization should support processing only changed surface nodes and affected dependencies.

The system should determine:

* changed source nodes;
* invalidated mapping results;
* affected canonical nodes;
* affected relationships;
* stale diagnostics;
* stale KIR descendants.

Stable surface node and canonical node identities improve incremental behavior.

---

## 50. Normalization Fingerprints

A normalization fingerprint may include:

* source semantic fingerprint;
* surface AST schema version;
* mapping identity and version;
* profile;
* target MSL version;
* active extensions;
* semantic configuration;
* dependency fingerprints.

Presentation-only changes should not invalidate semantic normalization when source-domain semantics are unchanged.

---

## 51. Normalization Cache

Normalization results may be cached.

A cache entry must be invalidated when any semantically relevant input changes.

Cached output must preserve:

* mapping provenance;
* source links;
* diagnostics;
* loss report;
* compatibility metadata.

---

## 52. Reverse Mapping

Some normalizers may support reverse mapping from canonical MSL AST into a source-domain AST.

Reverse mapping may support:

* migration;
* synchronization;
* source generation;
* semantic editing;
* format conversion.

Reverse mapping must declare:

* supported node coverage;
* authority behavior;
* loss behavior;
* round-trip guarantees;
* conflict policy.

Reverse mapping is not required for every source domain.

---

## 53. Bidirectional Mapping

A bidirectional mapping must define whether it guarantees:

* exact round trip;
* source-preserving round trip;
* semantic round trip;
* partial round trip;
* lossy round trip.

Round-trip claims must be verified through conformance fixtures.

---

## 54. Mapping Registration

Mappings should be registered.

A mapping registration contains:

```yaml
mapping:
  id:
  version:
  source_domain:
  source_versions:
  source_ast_versions:
  target_msl_versions:
  profiles:
  authority_policy:
  inference_policy:
  extensions:
  implementation:
  trust:
```

---

## 55. Mapping Trust

Mappings may be classified as:

```text
built_in
trusted
reviewed
experimental
sandboxed
untrusted
disabled
```

A trusted mapping implementation does not automatically make its source authoritative.

Implementation trust and content authority remain separate.

---

## 56. Normalization Conformance

Normalization conformance must evaluate:

* source-node recognition;
* mapping selection;
* canonical node output;
* identity preservation;
* source traceability;
* authority preservation;
* loss reporting;
* ambiguity handling;
* conflict handling;
* unsupported constructs;
* deterministic output;
* incremental consistency;
* version compatibility.

---

## 57. Golden Fixtures

Mappings should use versioned fixtures containing:

* source artifact;
* expected surface AST;
* expected canonical AST;
* expected diagnostics;
* expected loss report;
* expected provenance;
* expected authority;
* expected unresolved nodes.

Fixtures may serve as executable mapping specifications.

---

## 58. Normative Requirements

### MSL-NORMPIPE-REQ-001

Source-domain formats requiring fidelity beyond canonical MSL concepts **MUST** be represented through a surface AST or equivalent source-domain model before normalization.

### MSL-NORMPIPE-REQ-002

Every surface AST **MUST** declare its source domain, source format version, frontend identity, frontend version, and surface AST schema version.

### MSL-NORMPIPE-REQ-003

Every surface node **MUST** have compiler-visible node identity.

### MSL-NORMPIPE-REQ-004

Every source-derived surface node **MUST** preserve available source identity and location.

### MSL-NORMPIPE-REQ-005

Surface AST node kinds **MUST** belong to a declared source-domain vocabulary or registered extension namespace.

### MSL-NORMPIPE-REQ-006

Surface frontends **MUST NOT** silently impose canonical MSL semantics before a declared normalization step when doing so would conceal source-domain meaning or ambiguity.

### MSL-NORMPIPE-REQ-007

Every normalizer **MUST** declare a stable mapping identity and mapping version.

### MSL-NORMPIPE-REQ-008

Every normalization execution **MUST** declare the source AST schema version, target MSL version, normalization profile, and active mapping version.

### MSL-NORMPIPE-REQ-009

Every canonical node produced by normalization **MUST** preserve links to all contributing surface nodes.

### MSL-NORMPIPE-REQ-010

Every normalized canonical node **MUST** preserve the mapping rule or transformation that produced it.

### MSL-NORMPIPE-REQ-011

Normalization **MUST** preserve external identities when they are available and stable.

### MSL-NORMPIPE-REQ-012

Normalization **MUST NOT** silently replace external identity with generated canonical identity without retaining the mapping relationship.

### MSL-NORMPIPE-REQ-013

Normalization **MUST** distinguish source facts, deterministic derivations, inferences, and proposals.

### MSL-NORMPIPE-REQ-014

Normalization **MUST NOT** silently elevate authority.

### MSL-NORMPIPE-REQ-015

Authority escalation **MUST** require an explicit authorized rule, evidence, confirmation, or governance transition.

### MSL-NORMPIPE-REQ-016

Ambiguous semantic mappings **MUST** remain unresolved, expose candidates, request clarification, or produce diagnostics.

### MSL-NORMPIPE-REQ-017

Normalizers **MUST NOT** select among materially different ambiguous mappings silently.

### MSL-NORMPIPE-REQ-018

Conflicting mapping results **MUST** be represented explicitly.

### MSL-NORMPIPE-REQ-019

Lossy normalization **MUST** produce a structured loss report.

### MSL-NORMPIPE-REQ-020

Semantic, authority, identity, constraint, and provenance loss **MUST** be classified as high-severity loss unless an active profile explicitly defines otherwise.

### MSL-NORMPIPE-REQ-021

Unsupported normative or security-relevant source constructs **MUST NOT** be omitted silently.

### MSL-NORMPIPE-REQ-022

Opaque surface nodes **MUST** preserve source payload, source location, source identity, source authority, and preservation status.

### MSL-NORMPIPE-REQ-023

Partial normalization **MUST** mark incomplete, unresolved, conflicting, opaque, and unsupported output explicitly.

### MSL-NORMPIPE-REQ-024

Partial normalization **MUST NOT** be represented as complete successful compilation.

### MSL-NORMPIPE-REQ-025

Deterministic normalizers **MUST** produce semantically equivalent canonical AST output for equivalent inputs and configuration.

### MSL-NORMPIPE-REQ-026

Nondeterministic normalizers **MUST** declare their nondeterministic method and preserve applicable model, algorithm, configuration, and confidence provenance.

### MSL-NORMPIPE-REQ-027

AI-assisted normalization output **MUST** remain provisional unless an authorized process adopts it.

### MSL-NORMPIPE-REQ-028

Normalization profiles **MUST** declare authority, inference, ambiguity, loss, and unsupported-construct policies.

### MSL-NORMPIPE-REQ-029

Mappings **MUST** declare versioned dependencies when their behavior depends on other mappings, registries, schemas, or policies.

### MSL-NORMPIPE-REQ-030

Mapping dependency cycles **MUST** be rejected unless a deterministic terminating fixed-point model is explicitly defined.

### MSL-NORMPIPE-REQ-031

Normalization against existing knowledge **MUST NOT** silently overwrite authoritative nodes.

### MSL-NORMPIPE-REQ-032

Potential duplicate canonical nodes **MUST NOT** be merged solely on probabilistic similarity without an explicit deduplication policy or confirmation.

### MSL-NORMPIPE-REQ-033

Field merges during normalization **MUST** follow field-specific authority-aware merge rules.

### MSL-NORMPIPE-REQ-034

Every normalization conflict **MUST** preserve the competing source values and provenance.

### MSL-NORMPIPE-REQ-035

Every normalization result **MUST** expose mapping coverage information at a level sufficient to identify unsupported and omitted semantic categories.

### MSL-NORMPIPE-REQ-036

Normalization fingerprints **MUST** include all semantically relevant mapping inputs.

### MSL-NORMPIPE-REQ-037

Cached normalization results **MUST** be invalidated when a semantically relevant source, mapping, profile, extension, dependency, or target-language input changes.

### MSL-NORMPIPE-REQ-038

Reverse and bidirectional mappings **MUST** declare their round-trip and loss guarantees.

### MSL-NORMPIPE-REQ-039

Mapping conformance **MUST** be testable using versioned fixtures.

### MSL-NORMPIPE-REQ-040

KIR elements derived from normalized knowledge **MUST** remain traceable through canonical AST and surface AST to original sources.

---

## 59. Conceptual Model

```text
Source Artifact

├── source identity
├── source version
├── source authority
└── source location
        │
        ▼
Surface Frontend
        │
        ▼
Surface AST
├── source-domain nodes
├── source diagnostics
├── external identities
├── extensions
└── provenance
        │
        ▼
Versioned Normalizer
├── mapping rules
├── normalization profile
├── authority policy
├── inference policy
├── loss policy
└── ambiguity policy
        │
        ▼
Canonical MSL AST
├── normalized declarations
├── relationships
├── requirements
├── constraints
├── provenance
├── unresolved nodes
├── conflicts
└── loss report
```

---

## 60. Machine Specification

```yaml
machine_spec:
  kind: surface_ast_and_normalization_pipeline

  pipeline:
    - source_acquisition
    - surface_frontend
    - surface_ast_construction
    - surface_validation
    - mapping_selection
    - normalization
    - normalization_validation
    - canonical_ast_output

  surface_ast:
    required_metadata:
      - source_domain
      - source_format
      - source_format_version
      - frontend_identity
      - frontend_version
      - surface_ast_schema_version
      - provenance

    node_required:
      - node_id
      - domain_kind
      - source_identity
      - source_location
      - source_validity
      - provenance

  mapping:
    required:
      - mapping_id
      - mapping_version
      - source_domain
      - source_version_range
      - source_ast_version_range
      - target_msl_version_range
      - normalization_profiles
      - authority_policy
      - inference_policy
      - loss_policy
      - ambiguity_policy

  rule_categories:
    - direct
    - structural
    - aggregate
    - split
    - enrichment
    - inference
    - relationship
    - omission
    - opaque_preservation
    - deprecation
    - migration

  normalization_profiles:
    - archive_only
    - inventory
    - documentation
    - interface_contract
    - reverse_engineering
    - migration
    - authoritative_import
    - candidate_knowledge

  semantic_origin_classes:
    - source_fact
    - deterministic_derivation
    - inference
    - proposal

  loss_categories:
    - presentation_loss
    - source_trivia_loss
    - structural_loss
    - identity_loss
    - relationship_loss
    - constraint_loss
    - authority_loss
    - provenance_loss
    - semantic_loss
    - extension_loss
    - round_trip_loss

  normalization_outcomes:
    - complete
    - partial
    - ambiguous
    - conflicting
    - unsupported
    - failed

  traceability_chain:
    - canonical_ast_node
    - mapping_rule
    - surface_ast_node
    - frontend
    - source_artifact
```

---

## 61. Invariants

```yaml
invariants:
  - id: MSL-NORMPIPE-INV-001
    expression: canonical_node.source_surface_nodes.count >= 1
    description: Every normalized node retains surface provenance.

  - id: MSL-NORMPIPE-INV-002
    expression: normalization.mapping_id != null
    description: Every normalization uses an identified mapping.

  - id: MSL-NORMPIPE-INV-003
    expression: normalization.mapping_version != null
    description: Mapping behavior is versioned.

  - id: MSL-NORMPIPE-INV-004
    expression: authority.normalization_silent_escalation == false
    description: Normalization cannot silently increase authority.

  - id: MSL-NORMPIPE-INV-005
    expression: ambiguous_mapping.silently_resolved == false
    description: Material ambiguity remains visible.

  - id: MSL-NORMPIPE-INV-006
    expression: lossy_normalization.loss_report != null
    description: Lossy mapping produces a loss report.

  - id: MSL-NORMPIPE-INV-007
    expression: external_identity.discarded_without_mapping == false
    description: External identity is preserved or explicitly mapped.

  - id: MSL-NORMPIPE-INV-008
    expression: inference.authority in [provisional, informative]
    description: Unadopted inference remains nonauthoritative.

  - id: MSL-NORMPIPE-INV-009
    expression: partial_normalization.complete == false
    description: Partial results cannot masquerade as complete.

  - id: MSL-NORMPIPE-INV-010
    expression: normalization_conflict.competing_values_preserved == true
    description: Conflicts retain all relevant evidence.

  - id: MSL-NORMPIPE-INV-011
    expression: mapping_dependency_cycle.allowed_implies_terminating_fixed_point == true
    description: Supported cycles must terminate deterministically.

  - id: MSL-NORMPIPE-INV-012
    expression: existing_authoritative_node.silently_overwritten == false
    description: Imported knowledge cannot silently replace authority.

  - id: MSL-NORMPIPE-INV-013
    expression: normalization_cache.inputs_complete == true
    description: Cache fingerprints include semantic inputs.

  - id: MSL-NORMPIPE-INV-014
    expression: kir_element.original_source_traceable == true
    description: End-to-end provenance survives KIR emission.
```

---

## 62. Diagnostics

### MSL0601 — Missing Surface Domain

The surface AST does not identify its source domain.

### MSL0602 — Unsupported Surface AST Version

No compatible normalizer supports the declared surface AST schema version.

### MSL0603 — Missing Mapping Identity

Normalization began without a registered mapping identity.

### MSL0604 — Missing Mapping Version

The mapping does not declare a version.

### MSL0605 — Unsupported Source Version

The selected mapping does not support the source-format version.

### MSL0606 — Unsupported Target MSL Version

The mapping cannot emit the selected MSL version.

### MSL0607 — Missing Normalization Profile

No profile defines authority, inference, loss, or ambiguity behavior.

### MSL0608 — Surface Node Missing Provenance

A source-domain node cannot be traced to source.

### MSL0609 — External Identity Discarded

A stable source identity was not preserved or mapped.

### MSL0610 — Silent Authority Escalation

Normalization assigned stronger authority without an authorized rule or transition.

### MSL0611 — Ambiguous Mapping

A source node supports multiple incompatible canonical interpretations.

### MSL0612 — Mapping Conflict

Mapping outputs contain incompatible canonical semantics.

### MSL0613 — Missing Loss Report

A lossy mapping did not produce structured loss information.

### MSL0614 — Unsupported Normative Source Construct

A normative or security-relevant construct cannot be normalized safely.

### MSL0615 — Invalid Opaque Preservation

An opaque node lacks source payload, source identity, location, or preservation status.

### MSL0616 — Partial Result Misclassified

An incomplete normalization result claims complete status.

### MSL0617 — Missing Mapping Provenance

A canonical node does not identify the mapping rule that produced it.

### MSL0618 — Nondeterministic Mapping Misclassified

An AI-assisted or heuristic normalizer claims deterministic behavior.

### MSL0619 — Unconfirmed Inference Elevated

An inferred canonical node was assigned authoritative status without confirmation.

### MSL0620 — Existing Authority Overwritten

Normalization attempted to replace an authoritative node without a merge or governance decision.

### MSL0621 — Unsafe Probabilistic Merge

Similarity was used to merge authoritative nodes without approved policy or confirmation.

### MSL0622 — Mapping Dependency Missing

A required mapping, schema, registry, extension, or policy dependency cannot be resolved.

### MSL0623 — Mapping Dependency Cycle

Mapping dependencies form an unsupported cycle.

### MSL0624 — Incomplete Normalization Fingerprint

The fingerprint omits a semantically relevant input.

### MSL0625 — Stale Normalization Cache

Cached output was reused despite incompatible inputs.

### MSL0626 — Invalid Round-Trip Claim

A reverse or bidirectional mapping claims unsupported preservation guarantees.

### MSL0627 — Coverage Report Missing

Normalization output does not identify unsupported, opaque, omitted, or conflicting categories.

### MSL0628 — Source Fact and Inference Conflated

The normalized output does not distinguish direct source facts from inferred semantics.

### MSL0629 — Mapping Rule Overlap

Multiple mapping rules match incompatibly without a precedence policy.

### MSL0630 — Canonical Node Source Chain Broken

A canonical node cannot be traced to its originating surface nodes and source artifact.

---

## 63. Acceptance Criteria

This specification is satisfied when:

1. surface ASTs are clearly separated from the canonical MSL AST;
2. source-domain vocabularies remain faithful to their formats;
3. mappings possess stable identity and independent versions;
4. normalization profiles define authority, inference, ambiguity, loss, and unsupported behavior;
5. direct, structural, aggregate, split, enrichment, inference, relationship, omission, and opaque mappings are represented;
6. external identities remain traceable;
7. source facts, derivations, inferences, and proposals remain distinct;
8. authority cannot increase silently;
9. ambiguous mappings remain visible;
10. conflicts preserve competing evidence;
11. lossy mappings produce structured reports;
12. partial normalization is distinguishable from complete output;
13. unsupported normative constructs cannot disappear silently;
14. deterministic and nondeterministic normalizers are distinguished;
15. existing authoritative knowledge cannot be overwritten silently;
16. mapping dependencies and ordering are explicit;
17. incremental normalization and caching use complete semantic fingerprints;
18. reverse mappings declare preservation guarantees;
19. mapping conformance uses versioned fixtures;
20. KIR remains traceable to original source through both AST layers.

---

## 64. Conformance Examples

### 64.1 Valid OpenAPI Mapping

Surface node:

```yaml
surface_node:
  node_id: openapi-op-14
  domain_kind: OpenApiOperation
  external_identity: operations.getUser
  method: GET
  path: /users/{id}
```

Normalized node:

```yaml
canonical_node:
  node_id: msl-op-44
  kind: interface_operation
  semantic_id: API-OP-0001
  authority: machine_normative

  provenance:
    normalized_from:
      - openapi-op-14
    mapping:
      id: OPENAPI-MSL-MAP-0001
      version: 0.1.0

  external_identities:
    - authority: openapi
      value: operations.getUser
```

### 64.2 Invalid Silent Requirement Inference

Source code contains:

```text
if token.expired() { reject() }
```

The normalizer emits:

```text
AUTH-REQ-001: The system MUST reject expired tokens.
```

and marks it approved.

Expected diagnostics:

```text
MSL0610: normalization silently escalated inferred behavior to normative authority
MSL0619: inferred requirement requires confirmation or adoption
```

### 64.3 Valid Candidate Requirement

```yaml
canonical_node:
  kind: requirement
  semantic_id: AUTH-REQ-CANDIDATE-001
  authority: provisional

  provenance:
    origin_class: inference
    normalized_from:
      - rust-if-expression-88
    confidence: 0.91
    user_confirmed: false
```

### 64.4 Valid Loss Report

```yaml
loss_report:
  id: LOSS-0001
  mapping: MERMAID-MSL-MAP-0001
  source: architecture.mmd

  losses:
    - category: presentation_loss
      description: Edge colors are not represented in canonical MSL.

  preserved:
    - nodes
    - edges
    - labels
    - direction
```

### 64.5 Invalid Ambiguous Mapping

A heading named `Requirements` contains prose, examples, and recommendations without explicit requirement IDs.

The normalizer converts every sentence into a `MUST` requirement.

Expected diagnostic:

```text
MSL0611: Markdown section cannot be normalized deterministically into normative requirements
```

### 64.6 Valid Partial Normalization

```yaml
normalization_result:
  status: partial

  normalized:
    - interface_contract
    - type_declarations

  unresolved:
    - vendor_extension.x-routing-policy

  opaque:
    - node_id: openapi-extension-4
      required_for_complete_normalization: true
```

### 64.7 Invalid Existing-Knowledge Overwrite

Existing node:

```yaml
semantic_id: API-OP-0001
authority: approved
method: GET
```

Imported source maps the same identity to:

```yaml
method: POST
```

The normalizer replaces the existing value without conflict.

Expected diagnostic:

```text
MSL0620: normalization attempted to overwrite authoritative canonical knowledge
```

### 64.8 Valid Conflict Preservation

```yaml
conflict:
  id: NORM-CONFLICT-001
  target: API-OP-0001.method

  candidates:
    - value: GET
      source: existing-approved-specification

    - value: POST
      source: imported-openapi-document
```

### 64.9 Invalid Cache Reuse

The mapping version changes from `0.1.0` to `0.2.0`, but the previous normalization result is reused.

Expected diagnostic:

```text
MSL0625: cached normalization result does not match active mapping version
```

### 64.10 Valid End-to-End Traceability

```text
KIR Interface Operation
    derived_from
Canonical MSL InterfaceOperationNode
    normalized_from
OpenApiOperationNode
    parsed_from
openapi.yaml lines 42–71
```

---

## 65. Security and Trust Considerations

Normalization is a critical trust boundary.

A compromised or incorrect normalizer could:

* invent requirements;
* conceal source constraints;
* escalate authority;
* redirect identities;
* erase provenance;
* merge unrelated concepts;
* overwrite approved knowledge;
* suppress security-relevant constructs;
* falsify coverage;
* misclassify AI inference as fact;
* create misleading KIR.

Implementations should:

* sandbox third-party mappings;
* validate mapping manifests;
* use signed or reviewed mapping packages;
* preserve all source provenance;
* prohibit silent authority escalation;
* expose lossy transformations;
* apply resource limits;
* validate mapping output;
* maintain conformance fixtures;
* require human confirmation for high-impact inference;
* separate mapping implementation trust from source authority;
* fingerprint mapping inputs and outputs;
* preserve conflicting evidence.

---

## 66. Evolution and Compatibility

The normalization architecture may evolve through:

* new surface AST schemas;
* new mapping profiles;
* richer authority policies;
* improved source-domain coverage;
* new loss categories;
* new ambiguity-resolution workflows;
* bidirectional mapping protocols;
* normalization packages;
* distributed mapping registries.

Compatible changes may add optional mapping coverage without changing existing output semantics.

Breaking changes include:

* remapping an existing source construct to a materially different MSL concept;
* changing authority behavior;
* changing identity-generation rules;
* changing conflict precedence;
* changing omission behavior;
* changing deterministic output.

Breaking changes require:

* mapping-version increment;
* migration guidance;
* fixture updates;
* impact analysis;
* cache invalidation;
* preserved previous mapping behavior where reproducibility requires it.

---

## 67. Open Questions

1. Should surface AST schemas be standardized in Monad or owned by each frontend?
2. Should normalizers operate in-process, through plugins, or through a protocol?
3. What is the canonical mapping-manifest format?
4. How are mapping rules expressed: code, declarative schema, MSL, or a separate DSL?
5. Which mapping classes can be generated automatically?
6. Should every mapping be reversible?
7. How should source-code analysis map inferred behavior into MSL?
8. How should confidence be represented for non-AI heuristics?
9. What authority should imported OpenAPI documents receive by default?
10. How are conflicting authoritative sources prioritized?
11. Should mapping coverage be measured by source nodes, semantic fields, or both?
12. How should large repositories stream normalization results?
13. Should normalization conflicts become first-class MKE artifacts?
14. How are normalizer packages signed and distributed?
15. What minimum mappings are required for Monad bootstrap?
16. Can one surface node normalize differently under multiple profiles?
17. How are user confirmations incorporated into mapping fingerprints?
18. What parts of normalization belong in frontends versus MSC?
19. Should KIR retain direct surface-AST links or only canonical-AST links with transitive provenance?
20. How are mapping migrations tested across large corpora?
21. Should the normalizer support fixed-point enrichment against MKE?
22. How are temporal and historical source formats normalized?
23. Can multiple normalizers collaborate on one surface AST?
24. What policy governs automatic deduplication?
25. How are opaque source constructs published to users?

---

## 68. Related Specifications

This specification is extended by:

| ID            | Title                                                        |
| ------------- | ------------------------------------------------------------ |
| MSL-CORE-0008 | Canonical MSL AST                                            |
| MSL-CORE-0009 | `msl-markdown` Concrete Syntax                               |
| MSL-CORE-0010 | Machine Semantics, Types, References, and Language Evolution |

Future specialized series should include:

| Series            | Purpose                                                    |
| ----------------- | ---------------------------------------------------------- |
| MSL-SURFACE       | Surface AST architecture and schemas                       |
| MSL-NORMALIZATION | Mapping rules, packages, and profiles                      |
| MSL-IMPORT        | External-format integrations                               |
| MSL-CONFORMANCE   | Normalization fixtures and compatibility                   |
| MSC-CORE          | Compiler orchestration and semantic phases                 |
| KIR-CORE          | Normalized knowledge representation                        |
| MKE               | Storage of normalized knowledge, conflicts, and provenance |

---

## Status

Draft.

This document defines the source-faithful surface AST and versioned normalization architecture that maps external engineering knowledge into the canonical Monad Specification Language.

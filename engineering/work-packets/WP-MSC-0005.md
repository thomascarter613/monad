---

id: WP-MSC-0005
title: Implement Semantic Graph Validation
program: Semantic Compiler Foundation
phase: Compiler Implementation
work_cycle: WC-0001
program_increment: PI-002
milestone: M-003
priority: P0
status: planned

owner: Thomas Carter

created: 2026-08-06
started:
completed:

produces:

* materialized candidate semantic graph
* graph validation report
* structural validation results
* ontology validation results
* identity validation results
* provenance validation results
* governance validation results
* conflict validation results
* profile validation results
* graph readiness assessment
* validated graph candidate
* graph validation diagnostics
* graph validation conformance fixtures

consumes:

* specifications/MSC/core/MSC-CORE-0008.md
* semantic entity inventory
* semantic relationship inventory
* relationship reification inventory
* reconciled semantic identity inventory
* deterministic graph-local identity map
* identity alias inventory
* identity equivalence inventory
* identity collision inventory
* active ontology registry
* active MSG schema
* active MSG profile
* semantic-analysis snapshot
* provenance index
* evidence index
* conflict inventory
* authority-analysis results
* lifecycle-analysis results
* compatibility-analysis results
* resource policy

depends_on:

* WP-MSC-0001
* WP-MSC-0002
* WP-MSC-0003
* WP-MSC-0004

blocks:

* WP-MSC-0006

related:

* MSC-CORE-0007
* MSC-CORE-0008
* MSC-CORE-0009
* WP-MSC-0001
* WP-MSC-0002
* WP-MSC-0003
* WP-MSC-0004
* WP-MSC-0006
* MSG-CORE
* MGO-CORE

supersedes: []
superseded_by: []

tags:

* compiler
* msc
* msg
* semantic-graph
* validation
* ontology
* invariants
* provenance
* authority
* lifecycle
* conflicts
* readiness
* partial-compilation

---

# WP-MSC-0005 — Implement Semantic Graph Validation

## Executive Summary

Implement the materialization and validation stage that transforms reconciled semantic entity, relationship, reification, and identity inventories into a candidate Monad Semantic Graph and determines whether that graph satisfies the structural, semantic, governance, provenance, profile, and determinism requirements of `MSC-CORE-0008`.

This stage is the primary conformance gate before immutable snapshot construction.

It must validate that:

* every graph element has a valid identity;
* every internal edge has valid endpoints;
* every node and relationship uses an allowed ontology type;
* typed values conform to their declared types;
* required properties and relationships exist;
* cardinality and domain/range constraints hold;
* aliases, equivalences, and merges remain coherent;
* provenance is complete enough for the selected profile;
* authority and lifecycle have not been promoted or erased;
* conflicts, uncertainty, and incomplete knowledge remain explicit;
* external references remain distinguishable from internal graph elements;
* compiler-only state has not leaked into canonical semantic knowledge;
* the candidate graph satisfies the active MSG profile;
* validation findings produce an explicit readiness result.

The validator may accept complete or explicitly partial graph candidates.

It must never repair semantic meaning silently.

---

# 1. Objective

Create a deterministic graph materialization and validation subsystem that:

1. materializes candidate nodes from entity-construction requests;
2. materializes candidate edges from relationship-construction requests;
3. materializes reified relationships;
4. attaches reconciled semantic and graph-local identities;
5. attaches properties, provenance, authority, lifecycle, applicability, evidence, and annotations;
6. validates all applicable MSG invariants;
7. classifies every validation finding;
8. determines whether the candidate graph is valid, partial, blocked, or failed;
9. calculates graph completeness and readiness;
10. produces an immutable validation result for snapshot finalization.

---

# 2. Primary Responsibility

The semantic graph validator has one primary responsibility:

> Determine whether a materialized candidate graph is a valid representation of the analyzed semantic knowledge under the active schema, ontology, profile, and compiler invariants.

It owns:

* candidate graph materialization;
* structural graph validation;
* schema validation;
* ontology validation;
* identity validation;
* endpoint validation;
* property and value validation;
* cardinality validation;
* provenance validation;
* authority validation;
* lifecycle validation;
* applicability validation;
* evidence-link validation;
* conflict-preservation validation;
* uncertainty-preservation validation;
* external-reference validation;
* extension-content validation;
* profile validation;
* compiler-state separation validation;
* graph completeness calculation;
* graph readiness calculation;
* validation diagnostics;
* validation reports;
* validation statistics.

It does not own:

* source parsing;
* semantic analysis;
* entity eligibility;
* relationship discovery;
* identity-policy decisions;
* semantic conflict resolution;
* graph fingerprint calculation;
* final snapshot identity;
* snapshot freezing;
* canonical serialization;
* MKE ingestion;
* KIR lowering.

---

# 3. Architectural Position

```text
Entity Construction Requests
Relationship Construction Requests
Reification Requests
Reconciled Identity Inventory
              │
              ▼
    Candidate Graph Materialization
              │
              ▼
       Multi-Class Validation
              │
              ├── Structural
              ├── Schema
              ├── Ontology
              ├── Identity
              ├── Provenance
              ├── Governance
              ├── Conflict
              ├── Completeness
              └── Profile
              │
              ▼
       Validated Graph Candidate
              │
              ▼
     Immutable Snapshot Construction
```

Validation occurs after identity reconciliation and before graph fingerprinting and finalization.

---

# 4. Scope

## Included

This work packet includes:

* validation invocation;
* candidate node materialization;
* candidate edge materialization;
* reified-relationship materialization;
* graph metadata assembly;
* graph roots;
* graph partitions;
* structural validation;
* MSG schema validation;
* ontology node-type validation;
* ontology relationship validation;
* ontology domain and range validation;
* property validation;
* canonical value validation;
* identity validation;
* graph-local ID validation;
* alias validation;
* equivalence and merge validation;
* endpoint integrity;
* duplicate classification;
* cardinality validation;
* required relationship validation;
* provenance validation;
* source-link validation;
* authority validation;
* lifecycle validation;
* applicability validation;
* evidence validation;
* conflict validation;
* incomplete-state validation;
* external-reference validation;
* compiler-state separation;
* extension validation;
* active-profile validation;
* completeness;
* readiness;
* partial graph acceptance;
* blocked graph behavior;
* diagnostic aggregation;
* deterministic validation;
* resource and security controls;
* tests and conformance fixtures.

## Excluded

This work packet excludes:

* source parsing;
* semantic entity extraction;
* relationship extraction;
* identity derivation;
* graph fingerprinting;
* final graph freezing;
* snapshot lineage;
* semantic diff;
* incremental invalidation;
* persistent MKE validation;
* KIR target validation;
* publication validation;
* automatic semantic repair;
* conflict adjudication;
* ontology inference beyond explicitly registered validation rules.

---

# 5. Required Deliverables

## 5.1 Implementation Components

The implementation should provide language-neutral components equivalent to:

```text
Semantic Graph Validation
│
├── GraphValidationCoordinator
├── CandidateGraphMaterializer
├── NodeMaterializer
├── EdgeMaterializer
├── ReifiedRelationshipMaterializer
├── GraphMetadataAssembler
├── ValidationRuleRegistry
├── StructuralValidator
├── SchemaValidator
├── OntologyValidator
├── IdentityValidator
├── EndpointValidator
├── PropertyValidator
├── CardinalityValidator
├── ProvenanceValidator
├── GovernanceValidator
├── EvidenceValidator
├── ConflictValidator
├── IncompleteStateValidator
├── ExternalReferenceValidator
├── ExtensionValidator
├── ProfileValidator
├── CompletenessEvaluator
├── ReadinessEvaluator
├── ValidationDiagnosticAggregator
├── ValidationStatisticsCollector
└── ValidatedGraphCandidate
```

## 5.2 Validation Fixtures

Fixtures must cover:

* valid complete graph;
* valid partial graph;
* missing graph metadata;
* duplicate semantic identity;
* invalid graph-local identity;
* dangling internal edge;
* invalid ontology node type;
* invalid relationship type;
* domain/range violation;
* missing required property;
* invalid typed value;
* cardinality violation;
* missing provenance;
* authority promotion;
* invalid lifecycle state;
* invalid supersession;
* missing conflict representation;
* collapsed ambiguity;
* invalid external reference;
* extension schema violation;
* profile violation;
* deterministic diagnostic ordering;
* resource exhaustion.

## 5.3 MSG Invariant Matrix

The implementation must maintain a traceable matrix mapping every `MSC-CORE-0008` MSG invariant to:

* validator;
* diagnostic code;
* blocking effect;
* test fixture;
* implementation reference.

---

# 6. Input Contract

The validator must consume immutable or observationally stable inputs.

Conceptually:

```text
GraphValidationInput

├── compilation_identity
├── semantic_snapshot_identity
├── entity_inventory
├── relationship_inventory
├── reification_inventory
├── identity_assignment_result
├── graph_schema
├── ontology_registry
├── validation_rule_registry
├── active_msg_profile
├── semantic_analysis_snapshot
├── provenance_index
├── evidence_index
├── conflict_inventory
├── resource_policy
└── reproducibility_context
```

The validator must not mutate upstream inventories.

---

# 7. Output Contract

The validator must produce an immutable result.

Conceptually:

```text
GraphValidationResult

├── validation_identity
├── compilation_identity
├── semantic_snapshot_identity
├── status
├── candidate_graph
├── validated_graph_candidate
├── completeness
├── readiness
├── invariant_results
├── validation_findings
├── diagnostics
├── excluded_state_summary
├── conflict_summary
├── unresolved_summary
├── statistics
├── reproducibility_record
└── downstream_availability
```

The validated graph candidate is not yet the final immutable MSG snapshot.

Final fingerprinting, graph identity finalization, freezing, and serialization belong to WP-MSC-0006.

---

# 8. Validation Status

The validation result must use:

```text
success
success_with_warnings
partial
blocked
failed
cancelled
resource_exhausted
internal_error
```

## Success

The candidate graph satisfies every required invariant for the active profile.

## Success with Warnings

The graph satisfies all blocking invariants, but nonblocking findings exist.

## Partial

The graph is structurally valid and honestly preserves incomplete, unresolved, unsupported, invalid, deferred, ambiguous, or conflicting knowledge permitted by the profile.

## Blocked

A required validator, ontology module, schema, profile dependency, or critical graph guarantee is unavailable.

## Failed

User-controlled semantic graph content violates requirements that prevent a valid graph candidate.

## Cancelled

Validation was intentionally cancelled.

## Resource Exhausted

A declared validation resource limit prevented completion.

## Internal Error

The validator or materializer violated an internal invariant.

---

# 9. Candidate Graph Materialization

Validation must operate on a coherent materialized graph candidate rather than disconnected construction requests.

Candidate materialization must:

1. create graph metadata;
2. create graph roots;
3. instantiate candidate nodes;
4. attach semantic and graph-local node identities;
5. instantiate candidate edges;
6. attach semantic and graph-local edge identities;
7. instantiate reified relationship nodes;
8. instantiate required endpoint-link edges;
9. attach properties and typed values;
10. attach provenance and source links;
11. attach authority and lifecycle;
12. attach applicability;
13. attach evidence references;
14. attach conflict and incomplete-state records;
15. create external-reference records;
16. create indexes required for validation.

Materialization must not silently change the upstream construction requests.

---

# 10. Materialization Failure

Materialization must fail or become partial explicitly when:

* a required node identity is unavailable;
* a required edge endpoint cannot be represented;
* graph-local identity is duplicated;
* a reification request is incomplete;
* a property cannot be encoded canonically;
* required metadata is missing;
* extension payload cannot be represented safely.

The materializer must not fabricate substitute semantic meaning.

---

# 11. Validation Rule Registry

Validation must use registered, versioned rules.

Conceptually:

```text
GraphValidationRule

├── rule_identity
├── version
├── validation_class
├── supported_schema_versions
├── supported_ontology_versions
├── supported_profiles
├── target_selector
├── dependencies
├── evaluation
├── severity_policy
├── blocking_policy
├── extension_origin
├── determinism_declaration
└── diagnostics_namespace
```

Rule execution order must derive from dependencies and stable rule identity.

Registration order must not determine semantics.

---

# 12. Validation Classes

The implementation must distinguish at least:

```text
structural
schema
ontology
identity
endpoint
property
value
cardinality
provenance
source_lineage
authority
lifecycle
applicability
evidence
conflict
uncertainty
external_reference
extension
profile
determinism
security
resource
internal
```

A finding may belong to several classes but must identify one primary class.

---

# 13. Validation Phases

Validation should proceed through explicit barriers.

```text
1. Invocation Validation
2. Candidate Materialization
3. Structural Validation
4. Schema Validation
5. Identity and Endpoint Validation
6. Ontology Validation
7. Property and Value Validation
8. Cardinality Validation
9. Provenance and Source-Lineage Validation
10. Governance Validation
11. Evidence and Conflict Validation
12. Uncertainty and Partial-State Validation
13. External and Extension Validation
14. Profile Validation
15. Completeness Evaluation
16. Readiness Evaluation
17. Validation Finalization
```

Later phases may depend on earlier validation state.

---

# 14. Invocation Validation

Before materialization begins, the validator must verify:

* graph schema is available;
* ontology version is available;
* active MSG profile exists;
* required validators are registered;
* identity result is stable;
* entity and relationship inventories are stable;
* validation resource limits are defined;
* profile-required extension validators are available.

Invalid invocation configuration must block validation before candidate finalization.

---

# 15. Structural Validation

Structural validation must verify:

* graph metadata exists;
* graph identity input exists;
* compilation identity exists;
* schema and ontology versions are declared;
* graph roots are representable;
* node collection is well formed;
* edge collection is well formed;
* graph-local IDs are unique;
* semantic IDs are attached where required;
* internal indexes are coherent;
* property collections are well formed;
* no prohibited mutable references escape;
* every candidate graph element is representable.

Structural validity is necessary but not sufficient for semantic validity.

---

# 16. Schema Validation

Schema validation must verify that the candidate graph conforms to the active MSG schema.

Checks include:

* required graph fields;
* node record shape;
* edge record shape;
* metadata shape;
* property encoding;
* typed value encoding;
* external-reference encoding;
* conflict encoding;
* provenance encoding;
* extension envelope encoding;
* version compatibility.

Schema validity does not prove ontology conformance.

---

# 17. Identity Validation

Identity validation must verify:

* every required node has semantic identity;
* every required relationship has identity where mandated;
* graph-local IDs are unique;
* semantic and graph-local identity types are not mixed;
* aliases point to valid or explicitly external targets;
* aliases contain no illegal cycles;
* equivalence merges are authorized;
* representative mappings are complete;
* collisions remain explicit;
* unresolved identities do not masquerade as valid identities;
* identity lineage is present where required.

---

# 18. Endpoint Validation

Every internal edge must reference valid candidate nodes.

The endpoint validator must verify:

* source exists;
* target exists;
* source and target are internal when encoded as internal;
* external targets use the external-reference model;
* placeholder targets remain explicitly incomplete;
* endpoint ontology types are known;
* no dangling internal edge exists;
* reified endpoint-link edges are complete;
* self-reference is permitted by the ontology where present.

Dangling internal edges are prohibited.

---

# 19. Ontology Node-Type Validation

Every node must use:

* one type defined by the active ontology;
* one type defined by a compatible registered extension; or
* one explicit unsupported-node representation permitted by the active profile.

Validation must reject or classify:

* unknown node types;
* incompatible ontology versions;
* illegal extension types;
* abstract types instantiated directly;
* prohibited type combinations;
* missing required type qualifications.

---

# 20. Ontology Relationship Validation

Every edge or reified relationship must use an ontology-recognized relationship type.

Validation must verify:

* relationship kind exists;
* direction is legal;
* symmetry or inverse policy is respected;
* domain is legal;
* range is legal;
* relationship representation is legal;
* reification is used where required;
* forbidden relationship combinations do not occur;
* extension relationships are registered.

A relationship must not be accepted merely because both endpoints exist.

---

# 21. Domain and Range Validation

For every ontology relationship:

* source type must satisfy the relationship domain;
* target type must satisfy the relationship range;
* permitted subtypes must follow ontology rules;
* unknown endpoint types must follow partial-profile policy;
* external target expectations must be compatible where knowable.

Domain/range failure must not be repaired through silent endpoint coercion.

---

# 22. Property Validation

Property validation must verify:

* property key is defined;
* property is permitted for the target type;
* required properties exist;
* prohibited properties do not exist;
* multiplicity is valid;
* value type is valid;
* property context is valid;
* property authority and lifecycle are representable;
* extension properties are correctly namespaced;
* inherited properties follow explicit ontology rules.

Unknown properties must not become valid solely because they are stored in an extension map.

---

# 23. Typed Value Validation

The validator must preserve and validate canonical value classes including:

* boolean;
* integer;
* decimal;
* string;
* identifier;
* URI;
* date;
* time;
* duration;
* version;
* enumeration;
* list;
* set;
* map;
* range;
* typed literal;
* unknown;
* deferred;
* invalid;
* conflict reference.

Validation must detect:

* type mismatch;
* invalid enumeration member;
* invalid range;
* invalid identifier;
* incompatible version value;
* illegal nested value;
* unsupported value codec;
* ambiguous string encoding.

---

# 24. Required-Relationship Validation

Ontology types may require relationships.

The validator must verify requirements such as:

* declaration has owner;
* semantic entity has source provenance;
* superseded entity identifies successor;
* reified claim links subject and object;
* conflict identifies competing claims;
* external reference identifies its target domain;
* evidence relationship identifies evidence;
* graph root contains or references expected units.

Missing required relationships must produce explicit findings.

---

# 25. Cardinality Validation

Cardinality validation must verify:

* minimum relationships;
* maximum relationships;
* uniqueness;
* exclusive ownership;
* required single target;
* allowed multiple targets;
* inverse cardinality;
* profile-specific cardinality.

Cardinality findings identified during relationship construction must be reconciled with the materialized graph.

---

# 26. Duplicate Validation

The validator must distinguish:

## Structural Duplicate

Equivalent graph elements accidentally materialized more than once.

These should normally be rejected or normalized before finalization.

## Corroborating Claim

Several sources assert equivalent semantic meaning with distinct provenance or authority.

These must retain their qualifications.

## Identity Collision

Different concepts use one semantic identity without authorized equivalence.

This must remain an error or explicit conflict.

## Contradictory Claim

Competing incompatible claims remain separate and must be connected to conflict state.

Duplicate validation must not erase provenance or conflict.

---

# 27. Provenance Validation

Every first-class graph element must have traceable provenance.

The validator must verify:

* source or generated origin exists;
* compilation identity is traceable;
* construction rule is identified;
* transformation lineage is coherent;
* imported origin is identified;
* inferred or generated content identifies derivation;
* provenance references are valid;
* shared provenance records do not create broken links;
* provenance depth and profile requirements are satisfied.

Missing provenance must follow active-profile blocking policy.

---

# 28. Source-Lineage Validation

Source-lineage validation must verify source links where required:

* artifact identity exists;
* representation identity exists;
* source region is valid where available;
* source fingerprint is present where required;
* frontend and normalizer lineage is preserved;
* canonical AST identity is valid where included;
* generated entities identify a non-source origin.

A semantic entity may have several valid source links.

---

# 29. Authority Validation

Authority validation must verify:

* authority class is valid;
* authority is not silently stronger than semantic-analysis output;
* adoption records exist where required;
* assigning actor or process is identified where required;
* context and effective boundary are represented;
* imported authority follows import policy;
* inferred knowledge remains appropriately classified;
* conflicting authority assignments remain explicit;
* withdrawn authority is not represented as active.

Graph construction and persistence readiness must not promote authority.

---

# 30. Lifecycle Validation

Lifecycle validation must verify:

* lifecycle state is valid;
* transitions represented in the graph are permitted;
* supersession preserves predecessor and successor;
* deprecated entities remain traceable;
* withdrawn entities are not silently deleted;
* archived entities remain historical;
* effective boundaries are coherent;
* lifecycle and authority are not conflated;
* lifecycle and implementation readiness are not conflated.

---

# 31. Applicability Validation

Applicability validation must verify:

* context is representable;
* profile constraints are valid;
* feature requirements are valid;
* platform and environment constraints are valid;
* version ranges are coherent;
* lifecycle intervals are coherent;
* authority domains are valid;
* context-dependent claims are not represented as universal.

Unknown or deferred applicability must remain explicit.

---

# 32. Evidence Validation

Evidence validation must verify:

* evidence identities exist or remain explicitly external;
* evidence relationship kinds are valid;
* evidence status is valid;
* supporting and contradicting evidence remain distinct;
* expired or invalidated evidence is not represented as active support;
* evidence is not incorrectly represented as proof;
* evidence provenance is available;
* dependent claim state reflects mandatory invalidation rules where already determined by semantic analysis.

The graph validator does not re-evaluate the truth of evidence.

---

# 33. Conflict Validation

Every known semantic conflict required by the active profile must remain represented.

The validator must verify:

* conflict identity exists;
* conflict kind exists;
* conflict subject exists;
* all competing claims exist;
* claim provenance remains distinct;
* authority remains distinct;
* applicable context exists;
* blocking effect is represented;
* resolution state is represented;
* no claim was silently discarded;
* no winner was selected through ordering.

A known conflict omitted from the graph is a validation failure when conflict preservation is required.

---

# 34. Uncertainty Validation

The validator must preserve distinctions among:

* unknown;
* unresolved;
* ambiguous;
* deferred;
* unsupported;
* invalid;
* contested;
* conflicting;
* blocked.

It must detect invalid collapses such as:

* unknown represented as false;
* unresolved relationship represented as resolved;
* ambiguous target represented as a single selected target;
* deferred represented as invalid;
* unsupported represented as generic valid text;
* conflict represented as overwrite;
* blocked output represented as available.

---

# 35. Partial Graph Validation

A partial graph may be accepted only when:

1. structural invariants hold;
2. incomplete states are explicit;
3. invalid state cannot masquerade as valid;
4. required provenance is present according to profile;
5. missing guarantees are identified;
6. affected graph regions are identified;
7. blocked downstream outputs are identified;
8. graph status is `partial`;
9. strict-profile requirements are not falsely claimed.

Partial validity is a defined outcome, not reduced validation quality.

---

# 36. External-Reference Validation

External references must verify:

* external domain exists;
* identity scheme or target query is valid;
* expected target type is represented;
* version or compatibility constraint is valid;
* authority assumptions are explicit;
* resolution status is explicit;
* external reference is not encoded as an internal node ID;
* no uncontrolled network lookup occurs during ordinary validation.

External references are semantic records, not implicit fetch operations.

---

# 37. Compiler-State Separation Validation

The validator must detect accidental promotion of compiler-only state.

Prohibited ordinary MSG content includes:

* token streams;
* parser stacks;
* temporary inference variables;
* compiler work queues;
* cache internals;
* memory addresses;
* thread IDs;
* map bucket data;
* transient candidate order;
* internal scheduler state.

Diagnostic or inspection profiles may include selected compiler information only through explicit ontology-defined representations.

---

# 38. Extension Validation

Extension content must verify:

* extension identity and version exist;
* extension is allowed by profile;
* ontology module is compatible;
* node and edge types are registered;
* property namespaces are valid;
* payload schema is valid;
* identity policy is valid;
* provenance exists;
* authority and lifecycle are preserved;
* extension output is deterministic where required;
* resource and security policies are satisfied.

An extension must not bypass core MSG invariants.

---

# 39. Profile Validation

The active MSG profile may define requirements for:

* included knowledge domains;
* strictness;
* required node classes;
* required relationships;
* unresolved-state representation;
* invalid-state inclusion;
* source-link granularity;
* provenance granularity;
* evidence inclusion;
* conflict inclusion;
* diagnostic inclusion;
* external-reference behavior;
* graph size;
* readiness threshold.

Profile validation must not redefine foundational semantic meaning.

---

# 40. Determinism Validation

The validator should detect or test for:

* unstable rule ordering;
* unstable node ordering;
* unstable edge ordering;
* unstable diagnostic ordering;
* hidden timestamps;
* random graph-local allocation;
* map-order-dependent findings;
* extension-order dependence;
* inconsistent duplicate classification.

Equivalent candidate graph inputs must produce semantically equivalent validation results.

---

# 41. Security Validation

Security validation must detect:

* oversized values;
* unsafe URI or path interpretation;
* malicious extension payloads;
* identity spoofing;
* Unicode confusable risks;
* provenance expansion attacks;
* relationship explosion;
* external-reference injection;
* secret leakage;
* restricted data included under an ordinary profile;
* unsafe serialization payloads.

Security findings may block graph finalization independently of semantic validity.

---

# 42. Validation Findings

Every validation finding must be structured.

Conceptually:

```text
GraphValidationFinding

├── finding_identity
├── diagnostic_code
├── validation_class
├── rule_identity
├── severity
├── subject_identity
├── graph_local_identity
├── source_locations
├── message
├── explanation
├── related_subjects
├── evidence
├── remediation
├── blocking_outputs
├── profile
├── provenance
└── fingerprint
```

---

# 43. Severity

Initial severities should include:

```text
fatal
error
warning
information
advice
```

Severity and blocking effect are separate.

For example:

* a warning may block a strict profile;
* an error may permit a partial inspection graph;
* a fatal internal invariant may block every output.

---

# 44. Blocking Effects

A validation finding may block:

* validated MSG candidate;
* persistence readiness;
* query readiness;
* publication readiness;
* KIR readiness;
* backend readiness;
* canonical serialization;
* strict conformance;
* selected profiles.

Blocking effects must be explicit.

---

# 45. Diagnostic Deduplication

Diagnostic deduplication must use stable cause and semantic subject rather than message text alone.

Deduplication must not collapse:

* distinct source locations;
* distinct claims;
* distinct identity collisions;
* distinct authority conflicts;
* distinct profile effects.

---

# 46. Validation Suppression

Suppression must be:

* explicit;
* scoped;
* profile-aware;
* provenance-preserving;
* visible in the validation report;
* authorized where required.

Suppression does not make the underlying condition disappear.

A suppressed invariant violation may still block finalization if the invariant is unsuppressible.

---

# 47. Unsuppressible Findings

Findings that should normally be unsuppressible include:

* duplicate graph-local ID;
* dangling internal edge;
* invalid graph schema;
* corrupted identity map;
* unregistered ontology type in strict graph;
* illegal mutation;
* fingerprint-input corruption;
* internal validator inconsistency;
* unsafe secret exposure.

The final list belongs to MSG and diagnostic specifications.

---

# 48. Graph Completeness

The validator must calculate graph completeness independently from readiness.

Completeness may include:

```text
complete
partial
unknown
unsupported_regions
invalid_regions
conflicting_regions
blocked_regions
```

Completeness should identify affected graph regions and unavailable guarantees.

A graph may be semantically incomplete yet valid for inspection or publication.

---

# 49. Graph Readiness

Readiness must be output-specific.

Recommended readiness states include:

```text
unavailable
materialized
structurally_valid
ontology_valid
validated
persistable
queryable
publishable
kir_ready
backend_ready
blocked
```

The validator must produce a readiness matrix rather than one overloaded boolean.

Example:

| Output              | Readiness           |
| ------------------- | ------------------- |
| Semantic inspection | Ready               |
| MKE persistence     | Ready               |
| Documentation       | Ready with warnings |
| KIR lowering        | Blocked             |
| Backend generation  | Blocked             |

---

# 50. Downstream Availability

The validation result must identify availability for:

* snapshot finalization;
* canonical serialization;
* MKE ingestion;
* semantic query;
* publication;
* AI context;
* KIR lowering;
* backend generation;
* diagnostic inspection.

A later-output failure must not retroactively invalidate an otherwise valid MSG candidate.

---

# 51. Validation Result Immutability

The completed validation result must be immutable.

Further change requires:

* a new validation attempt;
* a new validation identity;
* changed input or profile;
* preserved prior result where history is retained.

The validator must not mutate a previously returned result when an extension or downstream consumer runs.

---

# 52. Deterministic Validation

Equivalent graph candidates and validation configuration must produce semantically equivalent results.

Determinism includes:

* rule selection;
* rule execution dependency order;
* finding identities;
* finding ordering;
* duplicate classification;
* completeness calculation;
* readiness calculation;
* statistics;
* downstream availability.

Validation must not depend silently on:

* hash-map order;
* thread scheduling;
* filesystem enumeration;
* extension registration order;
* current time;
* random values;
* machine hostname;
* locale;
* temporary paths.

---

# 53. Parallel Validation

Independent validation rules may execute in parallel.

Parallel execution must preserve:

* deterministic results;
* deterministic finding identities;
* deterministic aggregation;
* dependency barriers;
* resource policy;
* cancellation behavior.

Validation rules that depend on another rule's results must declare that dependency.

---

# 54. Incremental Validation Boundary

Detailed incrementality belongs to MSC-CORE-0009.

This work packet must make validation rules independently identifiable and dependency-aware so future incremental validation can invalidate only affected rules and graph regions.

Incremental validation must remain semantically equivalent to clean validation under equivalent inputs.

---

# 55. Resource Controls

The validator must enforce limits including:

* maximum nodes;
* maximum edges;
* maximum properties;
* maximum validation rules;
* maximum findings;
* maximum conflict participants;
* maximum provenance depth;
* maximum alias depth;
* maximum external references;
* maximum extension payload size;
* maximum ontology traversal depth;
* maximum validation time;
* maximum memory use where measurable.

Resource exhaustion must produce `resource_exhausted`.

It must not masquerade as semantic invalidity.

---

# 56. Implementation Boundaries

The implementation should provide logical boundaries equivalent to:

```text
validation/
├── coordinator
├── materialization
├── rules
├── structural
├── schema
├── ontology
├── identity
├── endpoints
├── properties
├── values
├── cardinality
├── provenance
├── source_lineage
├── authority
├── lifecycle
├── applicability
├── evidence
├── conflicts
├── uncertainty
├── external
├── extensions
├── profiles
├── completeness
├── readiness
├── diagnostics
├── statistics
└── fixtures
```

This is not a mandatory filesystem layout.

---

# 57. Public Interface

A conceptual interface should resemble:

```text
validate_graph(
    entity_inventory,
    relationship_inventory,
    reification_inventory,
    identity_assignment_result,
    graph_schema,
    ontology_registry,
    validation_rule_registry,
    msg_profile,
    resource_policy
) -> GraphValidationResult
```

The interface must not mutate its inputs.

---

# 58. Statistics

The result should report:

* candidate node count;
* candidate edge count;
* reified relationship count;
* external-reference count;
* validation-rule count;
* rules passed;
* rules warned;
* rules failed;
* structural findings;
* schema findings;
* ontology findings;
* identity findings;
* endpoint findings;
* property findings;
* cardinality findings;
* provenance findings;
* governance findings;
* evidence findings;
* conflict findings;
* partial-state findings;
* extension findings;
* suppressed findings;
* fatal findings;
* errors;
* warnings.

Statistics are reporting metadata by default.

---

# 59. Required MSG Invariant Coverage

The validator must implement or route validation for all invariants defined by `MSC-CORE-0008`, including:

| Invariant   | Required Validation                       |
| ----------- | ----------------------------------------- |
| MSG-INV-001 | Graph identity input exists               |
| MSG-INV-002 | Compilation lineage exists                |
| MSG-INV-003 | Schema and ontology declared              |
| MSG-INV-004 | First-class node identity exists          |
| MSG-INV-005 | Node type is valid                        |
| MSG-INV-006 | Edge endpoints are valid                  |
| MSG-INV-007 | Edge semantics are valid                  |
| MSG-INV-008 | Provenance is traceable                   |
| MSG-INV-009 | Authority is preserved                    |
| MSG-INV-010 | Lifecycle is preserved                    |
| MSG-INV-011 | Conflicts are preserved                   |
| MSG-INV-012 | Uncertainty distinctions are preserved    |
| MSG-INV-013 | Values remain typed                       |
| MSG-INV-014 | Compiler state is separated               |
| MSG-INV-015 | No persistence-provider dependency exists |
| MSG-INV-016 | No projection dependency exists           |
| MSG-INV-017 | Validation behavior is deterministic      |
| MSG-INV-018 | Candidate supports immutable finalization |
| MSG-INV-019 | Fingerprint inputs are well formed        |
| MSG-INV-020 | No dangling internal relationship exists  |
| MSG-INV-021 | Identity collisions remain visible        |
| MSG-INV-022 | External references are explicit          |
| MSG-INV-023 | Active profile is declared                |
| MSG-INV-024 | Completeness and readiness are declared   |
| MSG-INV-025 | Source or generated origin is traceable   |

WP-MSC-0006 completes invariants requiring final fingerprinting and freezing.

---

# 60. Acceptance Criteria

WP-MSC-0005 is complete when:

1. Candidate graph materialization is implemented.
2. Nodes are materialized from entity requests.
3. Edges are materialized from relationship requests.
4. Reified relationships are materialized correctly.
5. Reconciled semantic identities are attached.
6. Graph-local IDs are attached.
7. Graph metadata is assembled.
8. Structural validation is implemented.
9. MSG schema validation is implemented.
10. Identity validation is implemented.
11. Endpoint validation is implemented.
12. Ontology node validation is implemented.
13. Ontology relationship validation is implemented.
14. Domain and range validation is implemented.
15. Property validation is implemented.
16. Typed value validation is implemented.
17. Required-relationship validation is implemented.
18. Cardinality validation is implemented.
19. Duplicate classification is validated.
20. Provenance validation is implemented.
21. Source-lineage validation is implemented.
22. Authority validation prevents silent promotion.
23. Lifecycle validation is implemented.
24. Applicability validation is implemented.
25. Evidence validation is implemented.
26. Conflict preservation is validated.
27. Uncertainty distinctions are validated.
28. Partial graph rules are enforced.
29. External references are validated.
30. Compiler-state leakage is detected.
31. Extension content is validated.
32. Active-profile requirements are validated.
33. Completeness is calculated.
34. Output-specific readiness is calculated.
35. Downstream availability is explicit.
36. Validation findings are structured.
37. Severity and blocking effect remain distinct.
38. Validation is deterministic.
39. Parallel validation preserves deterministic results.
40. Resource limits are enforced.
41. Security checks are implemented.
42. All applicable MSG invariants are covered.
43. Unit tests pass.
44. Integration tests pass.
45. Property-based tests pass.
46. Conformance fixtures pass.
47. No final graph fingerprint is computed.
48. No MSG snapshot is finalized.
49. No MKE ingestion occurs.
50. No KIR lowering occurs.

---

# 61. Definition of Done

* [ ] Input contract implemented.
* [ ] Output contract implemented.
* [ ] Validation rule registry implemented.
* [ ] Candidate graph materializer implemented.
* [ ] Node materialization implemented.
* [ ] Edge materialization implemented.
* [ ] Reified relationship materialization implemented.
* [ ] Graph metadata assembly implemented.
* [ ] Graph-root construction implemented.
* [ ] Structural validation implemented.
* [ ] Schema validation implemented.
* [ ] Identity validation implemented.
* [ ] Graph-local identity validation implemented.
* [ ] Alias validation implemented.
* [ ] Equivalence validation implemented.
* [ ] Collision validation implemented.
* [ ] Endpoint validation implemented.
* [ ] Node-type validation implemented.
* [ ] Relationship-type validation implemented.
* [ ] Domain/range validation implemented.
* [ ] Property validation implemented.
* [ ] Typed-value validation implemented.
* [ ] Required-relationship validation implemented.
* [ ] Cardinality validation implemented.
* [ ] Duplicate validation implemented.
* [ ] Provenance validation implemented.
* [ ] Source-lineage validation implemented.
* [ ] Authority validation implemented.
* [ ] Lifecycle validation implemented.
* [ ] Applicability validation implemented.
* [ ] Evidence validation implemented.
* [ ] Conflict validation implemented.
* [ ] Uncertainty validation implemented.
* [ ] Partial graph validation implemented.
* [ ] External-reference validation implemented.
* [ ] Compiler-state separation validation implemented.
* [ ] Extension validation implemented.
* [ ] Profile validation implemented.
* [ ] Determinism validation implemented.
* [ ] Security validation implemented.
* [ ] Completeness evaluation implemented.
* [ ] Readiness evaluation implemented.
* [ ] Downstream availability implemented.
* [ ] Structured finding model implemented.
* [ ] Severity policies implemented.
* [ ] Blocking policies implemented.
* [ ] Diagnostic deduplication implemented.
* [ ] Suppression model implemented.
* [ ] Unsuppressible finding policy implemented.
* [ ] Deterministic aggregation implemented.
* [ ] Parallel validation implemented or explicitly deferred.
* [ ] Resource controls implemented.
* [ ] Statistics implemented.
* [ ] MSG invariant matrix completed.
* [ ] Unit tests completed.
* [ ] Integration tests completed.
* [ ] Property tests completed.
* [ ] Conformance fixtures completed.
* [ ] Architecture review completed.
* [ ] Completion outcome recorded.
* [ ] Project status updated.
* [ ] Changes committed.

---

# 62. Required Tests

## Materialization

* node request becomes candidate node;
* edge request becomes candidate edge;
* reification produces relationship node and endpoint edges;
* identity assignments attach correctly;
* input inventories remain unchanged.

## Structural

* valid graph structure passes;
* duplicate graph-local node ID fails;
* duplicate graph-local edge ID fails;
* malformed metadata fails;
* dangling internal edge fails.

## Ontology

* valid node type passes;
* unknown strict-profile type fails;
* extension type passes when registered;
* invalid relationship kind fails;
* domain/range violation fails;
* required reification is enforced.

## Properties and Values

* required property passes when present;
* missing required property fails;
* invalid property for node type fails;
* typed values remain typed;
* invalid enumeration value fails;
* unknown value remains explicit and valid where permitted.

## Identity

* semantic and local IDs remain distinct;
* unresolved identity blocks strict graph;
* authorized equivalence passes;
* unauthorized merge fails;
* collision remains visible.

## Provenance

* source-derived node has lineage;
* compiler-derived node identifies derivation;
* missing required provenance follows profile policy;
* broken provenance reference fails.

## Governance

* authority remains unchanged;
* silent authority promotion fails;
* valid lifecycle state passes;
* illegal transition fails;
* supersession preserves predecessor and successor.

## Conflict and Uncertainty

* known conflict remains represented;
* missing competing claim fails;
* ambiguity cannot collapse to one target;
* unresolved cannot appear resolved;
* partial graph declares missing guarantees.

## External and Extension

* valid external reference passes;
* external target encoded as internal fails;
* registered extension content passes;
* unregistered extension type fails;
* malformed extension payload fails.

## Readiness

* valid complete graph becomes validated;
* partial graph remains inspectable;
* KIR readiness blocks on unresolved required semantics;
* publication may remain available where profile permits;
* readiness is not one boolean.

## Determinism

* repeated validation produces equivalent findings;
* randomized map order produces equivalent findings;
* parallel validation produces equivalent findings;
* diagnostic ordering is stable.

## Boundary

* no graph fingerprint is finalized;
* no graph snapshot is frozen;
* no persistence operation occurs;
* no KIR lowering occurs.

---

# 63. Property-Based Tests

Property-based tests should verify:

* all internal edges have valid endpoints;
* graph-local IDs remain unique;
* validation ordering does not change meaning;
* valid aliases terminate;
* cardinality rules hold after materialization;
* canonical value validation is stable;
* diagnostic deduplication is idempotent;
* completeness calculation is deterministic;
* readiness calculation is deterministic;
* validation result round-trips without semantic loss;
* clean and future incremental validation remain equivalent.

---

# 64. Conformance Fixtures

At minimum:

```text
fixtures/msg/graph-validation/
├── valid-complete/
├── valid-partial/
├── structure/
├── schema/
├── identities/
├── endpoints/
├── ontology-nodes/
├── ontology-relationships/
├── domain-range/
├── properties/
├── values/
├── cardinality/
├── duplicates/
├── provenance/
├── source-lineage/
├── authority/
├── lifecycle/
├── applicability/
├── evidence/
├── conflicts/
├── uncertainty/
├── external/
├── compiler-state/
├── extensions/
├── profiles/
├── readiness/
├── security/
├── resources/
└── deterministic/
```

Each fixture should identify:

* entity inventory;
* relationship inventory;
* identity assignment;
* active schema;
* active ontology;
* active profile;
* expected validation findings;
* expected completeness;
* expected readiness;
* expected status.

---

# 65. Risks

## Risk 1 — Validation Becomes Semantic Analysis Again

The validator may recalculate types, constraints, authority, or references.

**Mitigation**

Validate preservation and graph conformance; do not repeat upstream analysis.

## Risk 2 — Validator Silently Repairs the Graph

Convenient normalization may alter semantic meaning.

**Mitigation**

Permit only explicitly nonsemantic normalization. Require new construction inputs for semantic repair.

## Risk 3 — Structural Validity Mistaken for Semantic Validity

A graph may have valid endpoints but illegal ontology relationships.

**Mitigation**

Separate structural, schema, and ontology validation.

## Risk 4 — Overly Strict Partial-Graph Handling

Useful editor or inspection graphs may be rejected.

**Mitigation**

Define profile-governed partial validity and output-specific readiness.

## Risk 5 — Overly Permissive Partial Graphs

Invalid semantic content may masquerade as valid knowledge.

**Mitigation**

Require explicit incomplete states and unavailable-guarantee reporting.

## Risk 6 — Validator Responsibility Creep

Validation may absorb fingerprinting, persistence, or lowering.

**Mitigation**

End with a validated graph candidate only.

## Risk 7 — Extension Bypass

Extension content may evade core invariants through opaque payloads.

**Mitigation**

Require registered schemas, validators, namespaces, and shared governance checks.

## Risk 8 — Diagnostic Explosion

One structural failure may trigger thousands of downstream findings.

**Mitigation**

Use dependency-aware rule scheduling, root-cause grouping, limits, and deterministic deduplication.

## Risk 9 — Nondeterministic Parallel Validation

Concurrent rule execution may reorder or change findings.

**Mitigation**

Use stable finding identities and deterministic final aggregation.

## Risk 10 — Profile Fragmentation

Profiles may redefine foundational semantics.

**Mitigation**

Allow profiles to control inclusion and strictness, not core meaning.

---

# 66. Bootstrap Validation Profile

The first compiler implementation should validate a bounded bootstrap MSG profile.

## Required

* graph metadata;
* graph-local identity uniqueness;
* semantic identity presence;
* internal endpoint integrity;
* bootstrap node types;
* bootstrap relationship types;
* required properties;
* canonical primitive values;
* local source provenance;
* basic authority states;
* basic lifecycle states;
* unresolved-reference representation;
* conflict representation;
* partial graph status;
* deterministic findings;
* readiness for deterministic graph export.

## May Defer

* complete MGO cardinality;
* advanced temporal applicability;
* distributed external identity validation;
* advanced evidence logic;
* ontology inference;
* complex extension schemas;
* cryptographic provenance;
* full privacy-policy validation;
* target-specific KIR readiness.

## Bootstrap Principle

The first validator should enforce a small honest contract rigorously rather than claim broad ontology conformance it cannot verify.

---

# 67. Architectural Invariants

1. Validation consumes materialized analyzed semantics.
2. Validation does not repeat parsing or semantic analysis.
3. Structural validity and semantic validity remain distinct.
4. Every internal edge has valid endpoints.
5. Every graph element uses a recognized schema representation.
6. Every node and relationship uses an allowed ontology type.
7. Domain and range are enforced.
8. Typed values remain typed.
9. Required properties and relationships are enforced.
10. Semantic and graph-local identities remain distinct.
11. Identity collisions remain visible.
12. Provenance is validated.
13. Authority is never promoted through validation.
14. Lifecycle is preserved.
15. Applicability remains contextual.
16. Evidence remains distinct from truth.
17. Conflicts remain explicit.
18. Unknown, unresolved, ambiguous, deferred, unsupported, invalid, and blocked remain distinct.
19. External references do not masquerade as internal elements.
20. Compiler-only state does not enter ordinary MSG.
21. Extensions cannot bypass shared invariants.
22. Profiles control inclusion and strictness, not foundational meaning.
23. Partial graphs identify unavailable guarantees.
24. Completeness and readiness remain distinct.
25. Readiness is output-specific.
26. Severity and blocking effect remain distinct.
27. Validation is deterministic.
28. Parallel validation does not change meaning.
29. Resource exhaustion is not semantic invalidity.
30. Validation does not finalize the MSG snapshot.

---

# 68. Completion Outcome

To be completed after implementation.

## Actual Deliverables

Pending.

## Deviations from Plan

Pending.

## Test Evidence

Pending.

## Architectural Findings

Pending.

## Follow-Up Actions

Pending.

## Commits

Pending.

## Final Status

Planned.

---

# 69. Suggested Commit

Planning artifact:

```text
engineering(msc): add semantic graph validation work packet
```

Future implementation:

```text
feat(msc): implement semantic graph validation
```

---

# 70. Next Work

Upon completion of this planning artifact, generate:

```text
WP-MSC-0006 — Implement Immutable MSG Snapshot Construction
```

That final WC-0001 implementation packet will compute canonical graph fingerprints, finalize graph identity and metadata, freeze the validated graph, produce canonical serialization, and emit the complete MSG construction report.

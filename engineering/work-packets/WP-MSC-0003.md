---

id: WP-MSC-0003
title: Implement Semantic Relationship Construction
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

* semantic relationship inventory
* edge-construction requests
* relationship-reification requests
* unresolved and external relationship records
* relationship construction diagnostics
* relationship construction conformance fixtures

consumes:

* specifications/MSC/core/MSC-CORE-0008.md
* semantic-analysis snapshot
* semantic entity inventory
* declaration and ownership results
* namespace and scope graphs
* import and export graphs
* alias graph
* resolved-reference snapshot
* type-analysis snapshot
* constraint graph
* authority-analysis results
* lifecycle-analysis results
* compatibility-analysis results
* provenance index
* evidence index
* conflict inventory
* active ontology registry
* active MSG profile

depends_on:

* WP-MSC-0001
* WP-MSC-0002

blocks:

* WP-MSC-0004
* WP-MSC-0005
* WP-MSC-0006

related:

* MSC-CORE-0005
* MSC-CORE-0006
* MSC-CORE-0007
* MSC-CORE-0008
* WP-MSC-0001
* WP-MSC-0002
* WP-MSC-0004
* WP-MSC-0005
* WP-MSC-0006

supersedes: []
superseded_by: []

tags:

* compiler
* msc
* msg
* semantic-graph
* relationships
* edges
* reification
* references
* provenance
* evidence
* conflicts
* partial-compilation

---

# WP-MSC-0003 — Implement Semantic Relationship Construction

## Executive Summary

Implement the compiler stage that transforms analyzed semantic relationships into deterministic MSG edge-construction requests and relationship-reification requests.

Semantic relationship construction connects the graph-eligible entities identified by WP-MSC-0002.

The subsystem must preserve the meaning of:

* ownership;
* containment;
* membership;
* declarations;
* references;
* imports and exports;
* aliases;
* dependencies;
* types;
* constraints;
* provenance;
* evidence;
* implementation;
* validation;
* authority;
* lifecycle;
* compatibility;
* conflict;
* derivation;
* supersession;
* projection.

The subsystem must distinguish ordinary graph edges from relationships that require first-class semantic identity and therefore must be reified as nodes.

It must also preserve unresolved, ambiguous, conflicting, deferred, unsupported, and external relationships without inventing targets or silently choosing winners.

---

# 1. Objective

Create a deterministic semantic relationship-construction subsystem that converts frozen semantic-analysis results into explicit graph relationship requests.

The subsystem must:

1. inventory all graph-relevant semantic relationships;
2. select registered relationship-construction rules;
3. resolve relationship kinds against the active ontology;
4. identify source and target semantic identities;
5. determine whether a relationship may remain an edge or requires reification;
6. extract relationship properties and qualifications;
7. attach provenance, authority, lifecycle, applicability, and evidence;
8. preserve unresolved and ambiguous outcomes;
9. preserve competing claims and conflicts;
10. represent external targets explicitly;
11. produce immutable relationship-construction inventories;
12. emit structured diagnostics.

---

# 2. Primary Responsibility

The relationship constructor has one primary responsibility:

> Express analyzed semantic relationships as deterministic edge-construction or relationship-reification requests without finalizing graph identities, validating the completed graph, or freezing MSG.

It owns:

* relationship candidate inventory;
* graph-relationship eligibility;
* ontology relationship-kind resolution;
* source and target semantic identity inputs;
* edge-versus-reification classification;
* relationship property extraction;
* direction and cardinality metadata;
* relationship provenance;
* authority and lifecycle qualification;
* applicability qualification;
* evidence references;
* unresolved relationship preservation;
* ambiguous relationship preservation;
* external relationship preservation;
* deterministic relationship ordering;
* relationship diagnostics.

It does not own:

* semantic entity extraction;
* durable identity assignment policy;
* graph-local identity allocation;
* final identity reconciliation;
* final conflict resolution;
* complete graph validation;
* graph fingerprinting;
* immutable snapshot construction;
* MKE persistence;
* KIR lowering.

---

# 3. Architectural Position

```text
Frozen Semantic-Analysis Snapshot
                │
                ├──────────────┐
                ▼              ▼
       Entity Extraction   Relationship Analysis
                │              │
                ▼              ▼
       Entity Inventory   Relationship Inventory
                │              │
                └──────┬───────┘
                       ▼
             Identity Reconciliation
                       │
                       ▼
       Node and Relationship Materialization
```

Relationship construction consumes semantic-analysis results and the entity inventory.

It must not repeat:

* parsing;
* symbol creation;
* namespace construction;
* import resolution;
* reference resolution;
* type analysis;
* constraint evaluation;
* authority analysis;
* lifecycle analysis.

---

# 4. Scope

## Included

This work packet includes:

* relationship-construction invocation;
* relationship candidate discovery;
* relationship disposition;
* relationship-rule registry;
* deterministic rule selection;
* ontology relationship-kind resolution;
* source endpoint selection;
* target endpoint selection;
* internal relationships;
* external relationships;
* unresolved relationships;
* ambiguous relationships;
* deferred relationships;
* invalid relationships;
* unsupported relationships;
* relationship direction;
* edge identity inputs;
* edge property extraction;
* relationship context and applicability;
* provenance;
* source links;
* authority;
* lifecycle;
* evidence references;
* derivation metadata;
* edge-versus-reification decisions;
* reified relationship requests;
* relationship duplication classification;
* extension-defined relationship rules;
* structured diagnostics;
* resource controls;
* security controls;
* relationship fixtures and tests.

## Excluded

This work packet excludes:

* graph entity discovery;
* final semantic identity assignment;
* graph-local ID generation;
* node materialization;
* edge materialization;
* final conflict-node construction;
* ontology-wide graph validation;
* endpoint-integrity validation against finalized graph-local IDs;
* graph normalization;
* graph fingerprinting;
* canonical serialization;
* graph snapshot finalization;
* MKE ingestion;
* KIR lowering.

---

# 5. Required Deliverables

## 5.1 Implementation Components

The implementation should provide language-neutral components equivalent to:

```text
Semantic Relationship Construction
│
├── RelationshipConstructionCoordinator
├── RelationshipCandidateInventory
├── RelationshipEligibilityClassifier
├── RelationshipRuleRegistry
├── RelationshipKindResolver
├── RelationshipEndpointResolver
├── RelationshipRepresentationClassifier
├── EdgePropertyExtractor
├── RelationshipContextExtractor
├── RelationshipProvenanceExtractor
├── RelationshipGovernanceExtractor
├── RelationshipEvidenceExtractor
├── UnresolvedRelationshipPreserver
├── AmbiguousRelationshipPreserver
├── ExternalRelationshipBuilder
├── ReificationRequestBuilder
├── RelationshipDiagnosticEmitter
├── RelationshipStatisticsCollector
└── SemanticRelationshipInventory
```

Names are conceptual. Implementations may use idiomatic language-specific names.

## 5.2 Test Fixtures

Fixtures must cover:

* ownership;
* containment;
* declaration;
* local reference;
* import;
* export;
* alias;
* type;
* constraint;
* dependency;
* provenance;
* evidence;
* supersession;
* implementation;
* external reference;
* unresolved reference;
* ambiguous reference;
* conflicting claim;
* deferred relationship;
* reified relationship;
* extension-defined relationship;
* deterministic ordering.

## 5.3 Relationship Mapping Reference

The implementation should produce or maintain a reference mapping:

```text
analyzed relationship kind
          ↓
construction rule
          ↓
ontology relationship type
          ↓
edge or reified node
```

---

# 6. Input Contract

The constructor must consume immutable or observationally stable inputs.

Conceptually:

```text
RelationshipConstructionInput

├── compilation_identity
├── semantic_snapshot_identity
├── entity_inventory
├── analyzed_relationships
├── ownership_graph
├── namespace_graph
├── scope_graph
├── import_graph
├── export_surfaces
├── alias_graph
├── reference_graph
├── type_analysis
├── constraint_graph
├── authority_analysis
├── lifecycle_analysis
├── compatibility_analysis
├── conflict_inventory
├── provenance_index
├── evidence_index
├── source_map
├── ontology_registry
├── relationship_rule_registry
├── active_msg_profile
└── resource_policy
```

The relationship constructor must not mutate any input.

---

# 7. Output Contract

The constructor must return a structured result.

Conceptually:

```text
RelationshipConstructionResult

├── construction_identity
├── compilation_identity
├── semantic_snapshot_identity
├── status
├── relationship_inventory
├── reification_inventory
├── unresolved_inventory
├── ambiguous_inventory
├── external_inventory
├── excluded_inventory
├── unsupported_inventory
├── invalid_inventory
├── diagnostics
├── statistics
├── reproducibility_record
└── downstream_availability
```

The output inventories contain construction requests, not finalized MSG edges or nodes.

---

# 8. Edge-Construction Request

An ordinary graph relationship must produce an edge-construction request.

Conceptually:

```text
EdgeConstructionRequest

├── source_semantic_identity
├── target_semantic_identity
├── source_relationship_identity
├── relationship_semantic_kind
├── requested_ontology_relationship
├── direction
├── identity_input
├── canonical_properties
├── context
├── applicability
├── provenance
├── source_links
├── authority
├── lifecycle
├── evidence_references
├── derivation
├── completeness
├── annotations
├── extension_payloads
├── construction_rule_identity
├── construction_rule_version
├── diagnostics
└── readiness
```

A construction request must not contain a finalized graph-local edge ID.

---

# 9. Relationship-Reification Request

A relationship requiring first-class representation must produce a reification request.

Conceptually:

```text
RelationshipReificationRequest

├── relationship_semantic_identity
├── source_semantic_identity
├── target_semantic_identity
├── relationship_semantic_kind
├── requested_ontology_node_type
├── endpoint_relationship_types
├── canonical_properties
├── context
├── applicability
├── provenance
├── source_links
├── authority
├── lifecycle
├── evidence_references
├── derivation
├── conflict_state
├── completeness
├── annotations
├── extension_payloads
├── construction_rule_identity
├── construction_rule_version
├── diagnostics
└── readiness
```

The request must contain enough information for later stages to produce:

1. a relationship node;
2. source-to-relationship linkage;
3. relationship-to-target linkage;
4. any ontology-required qualification edges.

---

# 10. Construction Status

The result status must use:

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

All required relationship candidates have valid construction outcomes.

## Success with Warnings

All required outcomes are available, but nonblocking diagnostics exist.

## Partial

A stable inventory exists while some relationships remain unresolved, ambiguous, deferred, unsupported, invalid, conflicting, or external.

## Blocked

A required ontology module, rule, endpoint, profile dependency, or identity input prevents the required inventory.

## Failed

Input-controlled semantic errors prevent a valid relationship inventory.

## Cancelled

The operation was intentionally cancelled.

## Resource Exhausted

A declared limit prevented completion.

## Internal Error

The subsystem violated an internal invariant.

---

# 11. Relationship Candidate Inventory

The constructor must inventory all graph-relevant semantic relationship candidates.

Candidates may originate from:

* artifact containment;
* declaration ownership;
* package membership;
* namespace membership;
* import dependencies;
* export visibility;
* aliases;
* resolved references;
* type relationships;
* assignability;
* conversions;
* constraints;
* dependencies;
* provenance;
* derivation;
* evidence;
* authority;
* lifecycle;
* supersession;
* compatibility;
* validation;
* implementation;
* satisfaction;
* generation;
* projection;
* diagnostic association;
* conflict membership.

Each candidate must receive exactly one primary disposition.

---

# 12. Relationship Dispositions

Required dispositions include:

```text
edge_eligible
reification_required
unresolved
ambiguous
external
deferred
unsupported
invalid
conflicting
excluded_by_profile
compiler_only
diagnostic_only
```

A candidate may have additional qualifications, but it must have one primary disposition.

---

# 13. Graph Eligibility

A relationship is graph-eligible when:

1. the active ontology defines the relationship;
2. a registered extension defines it;
3. the active profile requires explicit preservation of its incomplete state;
4. it is required to preserve provenance, evidence, lifecycle, authority, conflict, or explanation;
5. it connects graph-eligible semantic entities;
6. it represents a first-class semantic claim.

Compiler-memory adjacency alone does not establish graph eligibility.

---

# 14. Compiler-Only Relationships

The subsystem must exclude compiler-only relationships unless an inspection profile explicitly requests them.

Examples include:

* work-queue sequencing;
* temporary candidate ordering;
* hash-table links;
* parser recovery links;
* cache ownership;
* internal pass dependencies;
* rejected search branches not needed for explanation;
* transient union-find structure;
* temporary constraint-solver edges.

Exclusion must not discard semantic derivation or explanation required by the active profile.

---

# 15. Relationship Rule Registry

Relationship construction must use registered, versioned rules.

Conceptually:

```text
RelationshipConstructionRule

├── rule_identity
├── version
├── supported_semantic_relationship
├── target_ontology_relationship
├── representation_policy
├── source_endpoint_policy
├── target_endpoint_policy
├── identity_policy
├── property_mapping
├── context_policy
├── provenance_policy
├── governance_policy
├── evidence_policy
├── completeness_policy
├── extension_origin
├── determinism_declaration
└── specificity
```

Rule selection must not depend on registration order.

---

# 16. Rule Selection

When multiple rules match, deterministic selection should consider:

1. exact relationship-kind match;
2. exact endpoint semantic kinds;
3. most-specific ontology relationship;
4. active profile;
5. ontology module;
6. declared rule specificity;
7. stable rule identity.

If multiple equally valid rules remain, the result is ambiguous and must produce a diagnostic.

---

# 17. Ontology Relationship Resolution

Every eligible relationship must resolve to:

* one recognized ontology relationship;
* one recognized reified relationship type;
* one explicit unsupported type;
* one invalid result;
* one blocked result.

The resolver must evaluate:

* source ontology type;
* target ontology type;
* semantic relationship kind;
* ontology domain;
* ontology range;
* cardinality;
* direction;
* active ontology modules;
* active profile;
* extension compatibility.

A generic relationship fallback must not imply semantic understanding unless explicitly defined.

---

# 18. Endpoint Resolution

Every ordinary edge request must identify semantic source and target endpoints.

Endpoint selection must use semantic identities from:

* entity inventory;
* analyzed semantic state;
* controlled external-reference descriptors;
* permitted placeholder descriptors.

The constructor must not use graph-local IDs.

## 18.1 Missing Endpoint

A missing endpoint must result in one of:

* unresolved relationship;
* external relationship;
* placeholder-target relationship;
* invalid relationship;
* blocked result.

The active profile and relationship rule determine the permitted outcome.

## 18.2 Invalid Endpoint Type

An endpoint with an ontology-incompatible type must produce a diagnostic.

It must not be coerced silently.

---

# 19. Relationship Direction

Direction must derive from semantic and ontology rules.

The subsystem must not derive direction from:

* source order;
* declaration order;
* serializer layout;
* graph traversal order;
* naming convention alone.

Relationships may be:

* directed;
* symmetric;
* inverse-paired;
* undirected where ontology permits.

Symmetric or inverse semantics must remain explicit.

---

# 20. Inverse Relationships

An ontology may define inverse relationships.

For example:

```text
declares ↔ declared_by
contains ↔ contained_by
implements ↔ implemented_by
supersedes ↔ superseded_by
```

The constructor must follow the active profile's materialization policy:

* materialize canonical direction only;
* materialize both directions;
* materialize one direction and derive the inverse;
* reify the relationship.

The policy must not create contradictory duplicate meaning.

---

# 21. Edge Versus Reification

The representation classifier must decide whether a relationship remains an edge or becomes a node.

## 21.1 Edge Representation

An edge is appropriate when the relationship:

* has simple binary semantics;
* does not require independent lifecycle;
* does not require independent authority;
* does not require relationships of its own;
* does not require several competing qualified claims;
* can preserve required provenance and evidence through the edge model.

## 21.2 Mandatory Reification

Reification is required when the relationship:

1. is independently referenceable;
2. has durable semantic identity;
3. has lifecycle transitions;
4. has authority assignments;
5. has complex applicability;
6. is supported or contradicted by evidence;
7. is the subject of another relationship;
8. participates in supersession;
9. contains several independently governed claims;
10. has competing alternatives;
11. represents a first-class event or decision;
12. cannot be losslessly represented by the edge model.

## 21.3 Deterministic Classification

The edge-versus-reification decision must be rule-driven and deterministic.

Equivalent inputs must not produce different representations.

---

# 22. Relationship Identity Inputs

The subsystem must preserve existing relationship semantic identities where semantic analysis provides them.

When identity is required but absent, the constructor must emit identity inputs for WP-MSC-0004.

Identity inputs may include:

* explicit authored relationship ID;
* source declaration identity;
* source endpoint identity;
* target endpoint identity;
* relationship kind;
* context;
* qualifier set;
* construction rule;
* source artifact;
* source region.

The constructor must not finalize a durable derived identity.

---

# 23. Relationship Properties

Relationship properties must be extracted from analyzed semantic state.

Potential properties include:

* relationship status;
* cardinality;
* multiplicity;
* visibility;
* strength;
* requirement level;
* dependency kind;
* implementation state;
* compatibility state;
* validation state;
* source order where semantically meaningful;
* optionality;
* profile;
* feature requirement;
* confidence;
* temporal boundary.

Properties must retain canonical types.

---

# 24. Relationship Context

A relationship may apply only within a context.

Context may include:

* namespace;
* package;
* profile;
* feature set;
* platform;
* environment;
* version range;
* authority domain;
* lifecycle interval;
* organization;
* compilation unit.

The constructor must not flatten contextual relationships into universal relationships.

---

# 25. Relationship Applicability

Applicability must preserve:

* effective start;
* effective end;
* selected profile;
* feature conditions;
* platform conditions;
* version constraints;
* lifecycle constraints;
* authority constraints.

Unknown or deferred applicability must remain explicit.

---

# 26. Provenance

Every edge or reification request must contain traceable provenance.

Provenance should include:

* source artifact;
* representation;
* source region;
* canonical AST relationship source;
* reference-resolution result;
* semantic-analysis result;
* construction rule;
* construction-rule version;
* compilation identity;
* derivation inputs;
* import lineage where relevant.

Relationship construction adds provenance; it does not replace prior lineage.

---

# 27. Source Links

Relationship source links should identify the source representation responsible for the semantic relationship.

A relationship may have several source links where:

* several artifacts assert the same relationship;
* one relationship is synthesized from several declarations;
* a relationship is imported and locally adopted;
* evidence and declaration jointly establish the relationship.

Source links must remain distinct from semantic endpoints.

---

# 28. Authority

The constructor must preserve effective relationship authority.

It must not promote authority based on:

* relationship resolution;
* graph inclusion;
* publication;
* repeated assertion;
* persistence;
* implementation presence.

Authority may differ among equivalent claims from different sources.

Equivalent relationship claims must not be coalesced in a way that erases authority distinctions.

---

# 29. Lifecycle

The constructor must preserve relationship lifecycle state.

Relationships may be:

* draft;
* review;
* accepted;
* implemented;
* deprecated;
* superseded;
* withdrawn;
* archived.

Supersession relationships must preserve predecessor, successor, effective boundary, and provenance.

---

# 30. Evidence References

Relationship requests may attach evidence references indicating:

* supports;
* contradicts;
* validates;
* invalidates;
* demonstrates;
* implements;
* verifies;
* observed_by.

The relationship constructor identifies evidence references but must not invent evidence.

Evidence relationships that themselves require qualification may require reification.

---

# 31. Derivation

Derived relationships must identify:

* derivation rule;
* rule version;
* input semantic identities;
* reasoning class;
* determinism;
* authority;
* confidence where applicable;
* evidence;
* provenance.

Examples include:

* transitive dependency;
* inferred type relationship;
* calculated compatibility;
* normalized ownership;
* derived satisfaction;
* compiler-generated provenance relationship.

Derived does not mean normative.

---

# 32. Ownership and Containment

Ownership and containment must remain distinct.

## Ownership

Answers:

> Which semantic entity governs or defines this entity?

## Containment

Answers:

> Which artifact, package, unit, or structure contains this entity?

A declaration may be contained in one artifact while owned semantically by another entity.

The constructor must not collapse these concepts.

---

# 33. Membership

Membership relationships may include:

* package membership;
* namespace membership;
* collection membership;
* profile membership;
* work-cycle membership;
* program-increment membership.

Membership must remain distinct from ownership and containment.

---

# 34. Reference Relationships

Resolved references must preserve:

* reference site;
* selected target;
* reference kind;
* lookup context;
* alias path where applicable;
* import path where applicable;
* provenance;
* resolution result.

The constructor may omit detailed rejected candidates from canonical MSG unless the active explanation profile requires them.

---

# 35. Unresolved Relationships

An unresolved semantic relationship must not become an ordinary valid edge.

It must preserve:

* source entity;
* reference or relationship site;
* expected target kind;
* target query or name;
* lookup context;
* resolution attempts where required;
* reason unresolved;
* affected operations;
* resume condition where known;
* diagnostic;
* provenance.

The active profile determines whether the unresolved relationship becomes:

* a first-class unresolved relationship node;
* a qualified unresolved relationship record;
* diagnostic-only state;
* an omitted relationship recorded in completeness metadata.

---

# 36. Ambiguous Relationships

An ambiguous relationship must preserve:

* source entity;
* relationship kind;
* all viable candidate targets;
* candidate ordering independent of discovery order;
* ambiguity reason;
* active context;
* affected outputs;
* diagnostics;
* provenance.

The constructor must not choose a candidate based on:

* source order;
* file order;
* plugin order;
* map order;
* latest timestamp alone.

---

# 37. Deferred Relationships

A deferred relationship must preserve:

* source endpoint;
* expected target or target query;
* relationship kind;
* dependency preventing resolution;
* deferment reason;
* resume condition;
* blocked downstream operations;
* provenance.

Deferred is not invalid.

---

# 38. External Relationships

A relationship targeting an entity outside the current MSG snapshot must use an external relationship request.

Conceptually:

```text
ExternalRelationshipRequest

├── source_semantic_identity
├── relationship_kind
├── external_target_identity_or_query
├── external_domain
├── expected_target_kind
├── version_constraint
├── compatibility_constraint
├── resolution_status
├── authority_assumptions
├── provenance
├── diagnostics
└── readiness
```

An external target must not masquerade as an internal node.

---

# 39. Placeholder Targets

Where the active profile permits it, a relationship may target a placeholder entity request created by WP-MSC-0002.

The relationship must preserve:

* expected semantic target;
* placeholder identity input;
* unavailable dependency;
* replacement condition;
* blocked operations.

The edge must not be represented as fully resolved.

---

# 40. Invalid Relationships

An invalid relationship may appear in a partial relationship inventory only when:

* invalidity is explicit;
* the relationship cannot be mistaken for valid semantic knowledge;
* diagnostics are attached;
* blocked outputs are identified;
* the active profile permits preservation.

Examples include:

* illegal endpoint types;
* prohibited cardinality;
* impossible ownership;
* invalid lifecycle transition;
* disallowed dependency direction.

---

# 41. Unsupported Relationships

An unsupported relationship must preserve:

* analyzed relationship kind;
* source semantic identity;
* target semantic identity or query;
* expected ontology capability;
* source artifact and location;
* affected semantics;
* affected outputs;
* diagnostics;
* provenance.

Unsupported relationships must not be mapped to a generic valid `related_to` edge unless that is the exact authored meaning.

---

# 42. Conflicting Relationships

Competing incompatible relationships must remain distinct.

The relationship constructor must:

* preserve each claim;
* preserve each claim's provenance;
* preserve each claim's authority;
* identify the conflict subject;
* provide conflict inputs for later conflict materialization;
* identify affected outputs;
* avoid selecting a winner.

Conflict-node finalization belongs to later materialization and validation stages.

---

# 43. Duplicate Classification

The constructor must distinguish:

## 43.1 Structural Duplicate

The same semantic relationship is encountered repeatedly through equivalent compiler paths.

It may be coalesced if no provenance, authority, lifecycle, or evidence distinction is lost.

## 43.2 Corroborating Claim

Several independent sources assert equivalent relationships.

They must retain distinct source and governance information even if represented through one qualified semantic relationship.

## 43.3 Contradictory Claim

Claims share subject and relationship domain but cannot simultaneously hold.

They must remain distinct and produce conflict inputs.

## 43.4 Alias-Derived Duplicate

The same target is reached through aliases.

Alias paths may be preserved for explanation while avoiding duplicate semantic relationships.

---

# 44. Cardinality

The constructor must preserve ontology-defined and analyzed cardinality information.

It must detect candidate violations such as:

* required relationship absent;
* too many targets;
* duplicate unique relationship;
* illegal multiple owners;
* invalid inverse cardinality.

Final ontology-wide cardinality validation belongs to WP-MSC-0005, but construction-stage findings must be retained.

---

# 45. Relationship Completeness

Every relationship request must have a completeness state.

Recommended values:

```text
complete
partial
unresolved
ambiguous
deferred
external
unsupported
invalid
conflicting
blocked
```

Completeness remains distinct from authority, lifecycle, and readiness.

---

# 46. Extension-Defined Relationships

Extensions may register relationship rules through governed contracts.

Extensions must declare:

* extension identity;
* extension version;
* supported semantic relationship kinds;
* endpoint type requirements;
* produced ontology relationship types;
* edge-versus-reification policy;
* property mappings;
* determinism;
* resource limits;
* trust requirements;
* compatibility;
* diagnostics namespace.

Extensions must not bypass:

* endpoint integrity;
* identity rules;
* provenance;
* authority;
* lifecycle;
* applicability;
* evidence handling;
* conflict preservation;
* deterministic rule selection.

---

# 47. Deterministic Construction

Equivalent analyzed semantic inputs and configuration must produce semantically equivalent relationship inventories.

Determinism includes:

* candidate inventory;
* rule selection;
* endpoint selection;
* ontology-kind selection;
* edge-versus-reification classification;
* property ordering;
* candidate target ordering;
* duplicate classification;
* diagnostic ordering;
* statistics.

Construction must not depend silently on:

* hash-map order;
* thread scheduling;
* filesystem order;
* extension registration order;
* current time;
* random values;
* machine identity;
* locale.

---

# 48. Canonical Inventory Ordering

Observable relationship inventory ordering should use stable keys:

1. source semantic identity;
2. requested ontology relationship;
3. target semantic identity or external target key;
4. context fingerprint;
5. construction-rule identity;
6. relationship semantic identity input.

Semantic meaning must remain independent of ordering.

---

# 49. Relationship Diagnostics

Diagnostic categories should include:

```text
MSG-REL-ELIGIBILITY
MSG-REL-RULE
MSG-REL-ONTOLOGY
MSG-REL-ENDPOINT
MSG-REL-DIRECTION
MSG-REL-REIFICATION
MSG-REL-PROPERTY
MSG-REL-CONTEXT
MSG-REL-PROVENANCE
MSG-REL-AUTHORITY
MSG-REL-LIFECYCLE
MSG-REL-EVIDENCE
MSG-REL-UNRESOLVED
MSG-REL-AMBIGUOUS
MSG-REL-EXTERNAL
MSG-REL-UNSUPPORTED
MSG-REL-CONFLICT
MSG-REL-CARDINALITY
MSG-REL-EXTENSION
MSG-REL-RESOURCE
MSG-REL-INTERNAL
```

Every diagnostic must identify:

* code;
* severity;
* relationship subject;
* source endpoint;
* target or target query;
* source location where available;
* construction rule where applicable;
* blocking effect;
* remediation where practical.

---

# 50. Resource Controls

The subsystem must enforce declared limits, including:

* maximum relationship candidates;
* maximum candidate targets;
* maximum properties per relationship;
* maximum context depth;
* maximum provenance references;
* maximum evidence references;
* maximum conflict participants;
* maximum external relationships;
* maximum reification requests;
* maximum extension payload size;
* maximum diagnostics;
* maximum execution time.

Resource exhaustion must remain distinct from semantic invalidity.

---

# 51. Security Requirements

The constructor must defend against:

* relationship explosion;
* cyclic provenance expansion;
* malicious extension relationships;
* excessive candidate sets;
* invalid endpoint identities;
* oversized property values;
* sensitive source-path leakage;
* external-target injection;
* unbounded reification;
* denial-of-service through ambiguity.

External targets must remain data, not executable lookups, unless a governed later phase explicitly resolves them.

---

# 52. Implementation Boundaries

The implementation should provide logical boundaries equivalent to:

```text
relationship/
├── coordinator
├── candidates
├── eligibility
├── rules
├── ontology
├── endpoints
├── direction
├── representation
├── identity_inputs
├── properties
├── context
├── provenance
├── governance
├── evidence
├── unresolved
├── ambiguous
├── external
├── reification
├── duplicates
├── diagnostics
├── statistics
└── fixtures
```

This is not a mandatory filesystem layout.

---

# 53. Public Interface

A conceptual interface should resemble:

```text
construct_relationships(
    semantic_snapshot,
    entity_inventory,
    ontology_registry,
    relationship_rule_registry,
    msg_profile,
    resource_policy
) -> RelationshipConstructionResult
```

The interface must not mutate its inputs.

All returned inventories must be immutable or frozen before downstream use.

---

# 54. Statistics

The result should report:

* total relationship candidates;
* edge-eligible relationships;
* reification-required relationships;
* complete relationships;
* unresolved relationships;
* ambiguous relationships;
* deferred relationships;
* external relationships;
* unsupported relationships;
* invalid relationships;
* conflicting relationships;
* compiler-only exclusions;
* profile exclusions;
* extension-defined relationships;
* warnings;
* errors.

Statistics are reporting metadata and are not canonical graph knowledge by default.

---

# 55. Acceptance Criteria

WP-MSC-0003 is complete when:

1. An immutable semantic relationship inventory exists.
2. Every relationship candidate receives an explicit disposition.
3. Relationship eligibility is rule-driven.
4. Compiler-only relationships are excluded explicitly.
5. Relationship rules are registered and versioned.
6. Rule selection is deterministic.
7. Ontology relationship-kind resolution is implemented.
8. Source and target endpoint inputs are identified.
9. Relationship direction is explicit.
10. Edge-construction requests are produced.
11. Relationship-reification requests are produced.
12. Edge-versus-reification decisions are deterministic.
13. Relationship identity inputs are preserved.
14. Typed relationship properties are extracted.
15. Context and applicability are preserved.
16. Provenance and source links are preserved.
17. Authority is preserved without promotion.
18. Lifecycle is preserved.
19. Evidence references are preserved.
20. Derived relationships preserve derivation.
21. Ownership and containment remain distinct.
22. Unresolved relationships remain explicit.
23. Ambiguous relationships preserve all candidates.
24. Deferred relationships preserve resume conditions.
25. External relationships remain distinct from internal relationships.
26. Invalid relationships cannot masquerade as valid.
27. Unsupported relationships remain explicit.
28. Conflicting relationships remain separate.
29. Duplicate relationship classes are distinguished.
30. Extensions cannot bypass core invariants.
31. Construction is deterministic.
32. Resource limits are enforced.
33. Structured diagnostics are emitted.
34. Unit tests pass.
35. Integration tests pass.
36. Property-based determinism tests pass.
37. Conformance fixtures pass.
38. No final graph-local IDs are assigned.
39. No finalized MSG edges or snapshots are produced.

---

# 56. Definition of Done

* [ ] Input contract implemented.
* [ ] Output contract implemented.
* [ ] Relationship candidate inventory implemented.
* [ ] Relationship dispositions implemented.
* [ ] Compiler-only exclusion implemented.
* [ ] Relationship rule registry implemented.
* [ ] Deterministic rule selection implemented.
* [ ] Ontology relationship resolver implemented.
* [ ] Endpoint resolution implemented.
* [ ] Direction handling implemented.
* [ ] Inverse relationship policy implemented.
* [ ] Edge-construction request model implemented.
* [ ] Reification request model implemented.
* [ ] Edge-versus-reification classifier implemented.
* [ ] Relationship identity inputs implemented.
* [ ] Typed property extraction implemented.
* [ ] Context extraction implemented.
* [ ] Applicability extraction implemented.
* [ ] Provenance extraction implemented.
* [ ] Source-link extraction implemented.
* [ ] Authority extraction implemented.
* [ ] Lifecycle extraction implemented.
* [ ] Evidence-reference extraction implemented.
* [ ] Derivation metadata implemented.
* [ ] Ownership and containment distinctions implemented.
* [ ] Reference relationship handling implemented.
* [ ] Unresolved relationship preservation implemented.
* [ ] Ambiguous relationship preservation implemented.
* [ ] Deferred relationship preservation implemented.
* [ ] External relationship requests implemented.
* [ ] Placeholder-target handling implemented.
* [ ] Invalid relationship preservation implemented.
* [ ] Unsupported relationship preservation implemented.
* [ ] Conflict inputs implemented.
* [ ] Duplicate classification implemented.
* [ ] Cardinality findings implemented.
* [ ] Completeness classification implemented.
* [ ] Extension rules implemented.
* [ ] Deterministic ordering implemented.
* [ ] Resource controls implemented.
* [ ] Security checks implemented.
* [ ] Structured diagnostics implemented.
* [ ] Statistics implemented.
* [ ] Unit tests completed.
* [ ] Integration tests completed.
* [ ] Property tests completed.
* [ ] Conformance fixtures completed.
* [ ] Architecture review completed.
* [ ] Completion outcome recorded.
* [ ] Project status updated.
* [ ] Changes committed.

---

# 57. Required Tests

## Candidate Classification

* resolved reference becomes edge eligible;
* complex qualified relationship requires reification;
* compiler-only relation is excluded;
* unsupported relation is preserved;
* invalid relation is separated from valid requests.

## Rule Selection

* exact relationship rule is selected;
* endpoint-specific rule is preferred;
* registration order does not change selection;
* ambiguous rule selection produces a diagnostic;
* unavailable required rule blocks construction.

## Endpoint Resolution

* internal source and target resolve;
* missing target becomes unresolved;
* permitted placeholder target remains incomplete;
* external target remains external;
* invalid endpoint type produces a diagnostic.

## Representation Classification

* simple binary relationship remains an edge;
* independently governed relationship is reified;
* evidence-bearing relationship is reified when required;
* lifecycle-bearing relationship is reified when required;
* equivalent input produces the same representation decision.

## Semantic Relationships

* ownership remains distinct from containment;
* package membership remains distinct from ownership;
* reference preserves alias path where requested;
* supersession preserves predecessor and successor;
* derivation preserves rule and inputs.

## Incomplete State

* unresolved relationship preserves target query;
* ambiguous relationship preserves all candidates;
* deferred relationship preserves resume condition;
* unsupported relationship does not become generic valid edge;
* invalid relationship cannot appear as valid.

## Governance

* relationship authority is copied without promotion;
* lifecycle state is preserved;
* contextual applicability is retained;
* equivalent claims with different authority are not collapsed incorrectly.

## Conflict

* competing relationships remain distinct;
* conflict inputs identify all claims;
* source order does not select a winner.

## Determinism

* repeated construction produces equivalent inventory;
* parallel traversal produces equivalent inventory;
* randomized map ordering produces equivalent inventory;
* diagnostic ordering remains stable.

## Boundary

* no graph-local IDs are finalized;
* no graph is frozen;
* no ontology-wide validation is performed;
* semantic snapshot and entity inventory remain unchanged.

---

# 58. Conformance Fixtures

At minimum:

```text
fixtures/msg/relationship-construction/
├── ownership/
├── containment/
├── membership/
├── reference/
├── import/
├── export/
├── alias/
├── type/
├── constraint/
├── dependency/
├── provenance/
├── evidence/
├── authority/
├── lifecycle/
├── supersession/
├── implementation/
├── derivation/
├── unresolved/
├── ambiguous/
├── deferred/
├── external/
├── unsupported/
├── invalid/
├── conflict/
├── reified/
├── extension/
└── deterministic/
```

Each fixture should identify:

* analyzed relationship input;
* entity inventory input;
* expected construction request;
* expected disposition;
* expected diagnostics;
* expected status.

---

# 59. Risks

## Risk 1 — Every Relationship Becomes an Edge

A simplistic implementation may force complex qualified claims into edge properties.

**Mitigation**

Implement mandatory, rule-driven relationship reification.

## Risk 2 — Excessive Reification

Every relationship may become a node, producing unnecessary complexity.

**Mitigation**

Use explicit edge-sufficiency criteria and ontology rules.

## Risk 3 — Endpoint Coupling

Relationship construction may depend on graph-local IDs before identity reconciliation.

**Mitigation**

Use semantic identity inputs only.

## Risk 4 — Silent Target Selection

Ambiguous references may choose a candidate through traversal order.

**Mitigation**

Preserve candidates and emit ambiguity diagnostics.

## Risk 5 — Generic Relationship Fallback

Unsupported relationships may become meaningless `related_to` edges.

**Mitigation**

Require explicit unsupported preservation unless `related_to` is the authored semantic relation.

## Risk 6 — Provenance Loss During Deduplication

Equivalent edges from independent sources may collapse into one unqualified relationship.

**Mitigation**

Distinguish structural duplication from corroborating claims.

## Risk 7 — Responsibility Creep

The subsystem may absorb final conflict construction, identity assignment, or graph validation.

**Mitigation**

Limit outputs to relationship and reification requests.

## Risk 8 — Relationship Explosion

Derived, inverse, evidence, and provenance edges may expand without bound.

**Mitigation**

Use profiles, canonical materialization policies, deduplication, and resource limits.

---

# 60. Architectural Invariants

1. Relationships derive from analyzed meaning.
2. Relationship construction does not repeat reference resolution.
3. Every candidate receives an explicit disposition.
4. Relationship eligibility is rule-driven.
5. Compiler-memory adjacency does not imply semantic relationship.
6. Relationship kinds are ontology-defined.
7. Endpoint identities are semantic, not graph-local.
8. Direction is semantic, not serialization-derived.
9. Ownership, containment, and membership remain distinct.
10. Edge versus reification is deterministic.
11. Complex governed relationships are reified.
12. Relationship identity is preserved where available.
13. Typed properties remain typed.
14. Context and applicability remain explicit.
15. Provenance is preserved.
16. Authority is never promoted.
17. Lifecycle remains distinct from authority.
18. Evidence references remain explicit.
19. Derived relationships preserve derivation.
20. Unresolved is not resolved.
21. Ambiguous relationships preserve all viable candidates.
22. Deferred is not invalid.
23. External targets do not masquerade as internal nodes.
24. Unsupported semantics do not become generic understood relationships.
25. Conflicting claims remain distinct.
26. Duplicate coalescing preserves provenance and governance.
27. Extensions cannot bypass shared invariants.
28. Equivalent inputs produce equivalent inventories.
29. Resource exhaustion is not semantic invalidity.
30. Relationship construction produces no finalized MSG snapshot.

---

# 61. Completion Outcome

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

# 62. Suggested Commit

Planning artifact:

```text
engineering(msc): add semantic relationship construction work packet
```

Future implementation:

```text
feat(msc): implement semantic relationship construction
```

---

# 63. Next Work

Upon completion of this planning artifact, generate:

```text
WP-MSC-0004 — Implement Semantic Identity Assignment
```

That work packet will reconcile authored, imported, compiler-derived, aliased, and generated identities; detect collisions; authorize equivalence; and assign deterministic graph-local identities for materialization.

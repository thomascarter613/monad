---

specification:
id: MSC-CORE-0008
title: Semantic Graph Construction
series: MSC-CORE
position: 8
total: 10
version: 0.1.0
status: draft
maturity: in_specification

metadata:
namespace: monad.msc.core
work_cycle: WC-0001
program_increment: PI-002
milestone: M-002
created: 2026-08-06
owner: Thomas Carter
normative: true

relationships:
depends_on:
- MSC-CORE-0001
- MSC-CORE-0002
- MSC-CORE-0003
- MSC-CORE-0004
- MSC-CORE-0005
- MSC-CORE-0006
- MSC-CORE-0007
- MONAD-VISION-GLOSSARY
- MONAD-VISION-ECOSYSTEM
- MONAD-VISION-ARCHITECTURE-MAP
- MONAD-VISION-COMPILER-PIPELINE
- MONAD-VISION-KNOWLEDGE-LIFECYCLE
- MONAD-VISION-CONSTITUTION
enables:
- MSC-CORE-0009
- MSC-CORE-0010
- MSG-CORE
- MGO-CORE
- MKE-CORE
- WP-MSC-0001
- WP-MSC-0002
- WP-MSC-0003
- WP-MSC-0004
- WP-MSC-0005
- WP-MSC-0006

tags:

* compiler
* semantic-graph
* msg
* graph-construction
* semantic-identity
* provenance
* authority
* lifecycle
* validation
* deterministic-compilation

---

# MSC-CORE-0008 — Semantic Graph Construction

## 1. Status of This Specification

This specification is a normative draft in the MSC-CORE series.

It defines the required architecture and behavior by which the Monad Specification Compiler constructs a Monad Semantic Graph from a frozen semantic-analysis snapshot.

The key words **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and **MAY** are interpreted according to `vision/constitution.md`.

This specification does not define a particular programming language, graph database, serialization format, or storage implementation.

---

# 2. Purpose

The purpose of semantic graph construction is to transform analyzed compiler state into a canonical, immutable, implementation-independent representation of engineering knowledge.

Semantic graph construction is the final semantic phase of core MSC compilation.

It establishes the boundary between:

* compiler-internal analysis state; and
* canonical semantic knowledge for one compilation snapshot.

The output of this phase is the **Monad Semantic Graph**, abbreviated **MSG**.

MSG is the canonical semantic result of one successful or explicitly partial semantic compilation.

---

# 3. Compiler Responsibility

MSC has one primary responsibility:

> Compile supported engineering artifacts into analyzed Monad Semantic Graph snapshots and optional derived compiler representations.

Within that responsibility, the MSG construction phase MUST:

1. consume a frozen semantic-analysis snapshot;
2. identify graph-eligible semantic entities;
3. assign or preserve semantic identities;
4. materialize ontology-defined nodes;
5. materialize ontology-defined edges;
6. attach semantic properties;
7. attach provenance, authority, lifecycle, and evidence;
8. preserve uncertainty, incompleteness, and conflict;
9. validate graph invariants;
10. produce an immutable, deterministic MSG snapshot;
11. produce structured construction diagnostics;
12. report graph completeness and output readiness.

The MSG construction phase MUST NOT:

* parse source syntax;
* perform ordinary name lookup;
* invent unresolved semantic meaning;
* silently resolve conflicts;
* grant authority;
* persist graph history as an MKE responsibility;
* lower graph knowledge into KIR;
* render publication outputs;
* depend on a specific graph database;
* require a remote AI service.

---

# 4. Scope

## 4.1 Included

This specification defines:

* the semantic graph construction boundary;
* MSG snapshot identity;
* node construction;
* edge construction;
* semantic identity preservation;
* graph-local identity;
* semantic properties;
* provenance;
* source lineage;
* authority;
* lifecycle;
* evidence;
* uncertainty;
* conflicts;
* incomplete knowledge;
* external references;
* graph roots;
* graph partitions and subgraphs;
* deterministic ordering;
* graph fingerprints;
* graph validation;
* partial MSG construction;
* graph-construction diagnostics;
* graph readiness;
* extension participation;
* serialization requirements;
* MKE handoff requirements;
* bootstrap implementation scope;
* conformance requirements.

## 4.2 Excluded

This specification does not define:

* the complete Monad Graph Ontology;
* a complete catalog of node kinds;
* a complete catalog of edge kinds;
* storage schemas;
* graph query languages;
* MKE transaction semantics;
* graph database selection;
* distributed graph partitioning;
* KIR lowering;
* backend generation;
* publication rendering;
* full incremental-compilation mechanics;
* complete diagnostic rendering;
* authorization or access-control implementation;
* cryptographic identity protocols.

Those concerns belong to MGO, MSG, MKE, MSC-CORE-0009, MSC-CORE-0010, and later specifications.

---

# 5. Normative Thesis

The central requirement of this specification is:

> MSC MUST construct canonical semantic knowledge from analyzed meaning, not copy compiler implementation state into a graph-shaped container.

MSG is not a serialized symbol table.

MSG is not an AST with edges.

MSG is not a source-document index.

MSG is not a persistence schema.

MSG represents the semantically meaningful entities, relationships, claims, qualifications, conflicts, and lineage established by compilation.

---

# 6. Architectural Boundary

The semantic graph construction boundary is:

```text
Frozen Semantic-Analysis Snapshot
                │
                ▼
        MSG Construction
                │
                ▼
    Immutable Monad Semantic Graph
```

Downstream operations are separate:

```text
MSG
 ├──► MKE ingestion
 ├──► KIR lowering
 ├──► validation reports
 ├──► semantic inspection
 ├──► publication projections
 ├──► AI-context projections
 └──► search and analytics
```

A valid MSG MAY exist entirely in memory.

MKE persistence is not required for MSG validity.

---

# 7. Terminology

## 7.1 Semantic Entity

An identifiable concept represented as a graph node.

Examples include:

* artifact;
* specification;
* declaration;
* type;
* requirement;
* constraint;
* decision;
* work packet;
* implementation component;
* diagnostic;
* conflict;
* evidence artifact;
* profile;
* package;
* version;
* lifecycle event.

## 7.2 Semantic Relationship

An ontology-defined relationship between semantic entities.

A semantic relationship is represented by an edge or, when the relationship itself requires identity and relationships, by a reified node.

## 7.3 Semantic Claim

A qualified assertion that a subject has a property or relationship.

A claim may include:

* value;
* provenance;
* authority;
* lifecycle;
* applicability;
* confidence;
* evidence;
* conflict state.

## 7.4 Graph Element

A node, edge, property, annotation, or graph-level record contained within an MSG snapshot.

## 7.5 Graph-Local Identity

An identity unique within one MSG snapshot.

Graph-local identity supports graph structure and serialization but MUST NOT replace durable semantic identity.

## 7.6 Semantic Identity

A durable identity based on what a concept is rather than where or how it is represented.

## 7.7 Reified Relationship

A relationship represented as a semantic node because the relationship itself requires:

* identity;
* properties;
* provenance;
* authority;
* lifecycle;
* evidence;
* relationships to other entities.

## 7.8 Semantic Snapshot

An immutable representation of analyzed meaning for one compilation result.

MSG is the canonical semantic snapshot produced by MSC.

---

# 8. Inputs

MSG construction MUST consume a frozen semantic-analysis snapshot.

The snapshot MUST provide, as applicable:

* compilation identity;
* compilation-unit identities;
* artifact identities;
* canonical declaration identities;
* semantic identities;
* symbol-to-semantic-identity mappings;
* ownership relationships;
* namespace relationships;
* import and export results;
* resolved references;
* unresolved-reference records;
* type-analysis results;
* constraint-analysis results;
* authority-analysis results;
* lifecycle-analysis results;
* profile and feature results;
* compatibility results;
* semantic conflicts;
* readiness results;
* provenance;
* evidence;
* diagnostics;
* source mappings;
* ontology and schema versions.

MSG construction MUST NOT depend on mutable compiler tables after construction begins.

---

# 9. Outputs

Every MSG construction attempt MUST produce a structured result.

Conceptually:

```text
MsgConstructionResult

├── construction_id
├── compilation_id
├── status
├── msg
├── graph_identity
├── graph_fingerprint
├── ontology_version
├── schema_version
├── completeness
├── readiness
├── statistics
├── diagnostics
├── excluded_state_summary
├── unresolved_summary
├── conflict_summary
├── reproducibility_record
└── output_availability
```

The `msg` field MAY be absent when graph construction fails before a valid graph snapshot can be created.

---

# 10. Construction Status

MSG construction status MUST be one of:

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

## 10.1 Success

A complete graph satisfying all required graph invariants was constructed.

## 10.2 Success with Warnings

A complete graph was constructed, but nonblocking diagnostics exist.

## 10.3 Partial

A structurally valid MSG was constructed while preserving explicit incomplete, unsupported, unresolved, deferred, or conflicting semantic state.

## 10.4 Blocked

Semantic state exists, but an invocation requirement or graph-critical condition prevents construction of the requested MSG class.

## 10.5 Failed

Input-controlled semantic problems prevent construction of a valid MSG.

## 10.6 Cancelled

The operation was intentionally cancelled.

## 10.7 Resource Exhausted

A declared resource limit prevented completion.

## 10.8 Internal Error

MSC violated an internal invariant or encountered an unexpected implementation failure.

---

# 11. MSG Snapshot Model

An MSG snapshot MUST include graph-level metadata.

Conceptually:

```text
MonadSemanticGraph

├── graph_identity
├── graph_local_identity
├── schema_version
├── ontology_version
├── compilation_identity
├── compilation_unit_identities
├── parent_graph_references
├── profile
├── feature_set
├── environment_identity
├── creation_record
├── completeness
├── readiness
├── nodes
├── edges
├── graph_properties
├── diagnostics
├── provenance_root
├── evidence_index
├── conflict_index
├── external_reference_index
├── statistics
└── fingerprint
```

The in-memory implementation MAY differ, but all normative information MUST be representable.

---

# 12. Graph Identity

## 12.1 Required Identity

Every valid MSG MUST possess:

* one durable graph identity;
* one graph-local identity where required by implementation;
* one compilation identity;
* one content or semantic fingerprint.

## 12.2 Graph Identity Basis

Graph identity MUST be assigned according to an explicit identity policy.

It MAY be:

* invocation-assigned;
* repository-derived;
* compilation-derived;
* content-addressed;
* registry-assigned;
* version-derived.

Graph identity MUST NOT depend solely on:

* a memory address;
* map iteration order;
* output filename;
* temporary directory;
* storage row identity.

## 12.3 Graph Identity and Fingerprint

Graph identity and fingerprint are distinct.

Graph identity answers:

> Which semantic snapshot is this?

Graph fingerprint answers:

> Which normalized semantic content does this snapshot contain?

Two graph snapshots MAY have different identities and equivalent semantic fingerprints.

---

# 13. Node Model

Every node MUST represent an ontology-recognized semantic entity or a registered extension entity.

Conceptually:

```text
MsgNode

├── graph_local_id
├── semantic_id
├── kind
├── ontology_type
├── labels
├── properties
├── authority
├── lifecycle
├── applicability
├── completeness
├── provenance
├── evidence
├── source_links
├── annotations
└── extension_data
```

## 13.1 Node Identity

Every first-class semantic node MUST possess a semantic identity.

Anonymous graph nodes MAY be used only when:

* the ontology explicitly permits them;
* no durable semantic reference is required;
* their identity is deterministically derived from an owning semantic entity and structural role.

Anonymous-node use SHOULD be minimized.

## 13.2 Node Kind

Every node MUST identify its semantic kind.

A kind MUST be:

* defined by the active ontology;
* defined by a registered extension; or
* explicitly represented as unknown or unsupported.

Unknown kinds MUST NOT be silently mapped to a generic text node and treated as understood.

## 13.3 Node Properties

A node property MUST have:

* a property identity or ontology-defined key;
* an explicit value representation;
* a value type;
* provenance where not inherited safely;
* authority where not inherited safely;
* lifecycle or applicability where relevant.

A property MUST NOT acquire authority merely from the node that contains it unless the ontology explicitly defines such inheritance.

---

# 14. Edge Model

Every edge MUST represent an ontology-recognized semantic relationship.

Conceptually:

```text
MsgEdge

├── graph_local_id
├── semantic_id
├── kind
├── source_node
├── target_node
├── direction
├── properties
├── authority
├── lifecycle
├── applicability
├── provenance
├── evidence
├── source_links
└── extension_data
```

## 14.1 Edge Endpoints

Every internal edge MUST reference valid nodes in the same MSG snapshot.

An edge targeting an entity outside the snapshot MUST use an explicit external-reference mechanism.

Dangling internal edges are prohibited.

## 14.2 Direction

Edge direction MUST reflect ontology semantics.

Serialization order MUST NOT determine semantic direction.

## 14.3 Edge Identity

An edge MUST have durable semantic identity when:

* it is independently referenceable;
* it has lifecycle;
* it has authority;
* it has evidence;
* it may be superseded;
* it participates in other relationships;
* it represents a first-class claim.

A structurally derived edge MAY use a deterministic graph-local identity when the ontology does not require durable identity.

## 14.4 Reification

A relationship MUST be reified as a node when edge representation cannot preserve required semantics.

Reification is required when the relationship itself:

* is the subject of another relationship;
* has independent identity;
* contains several independently governed claims;
* has competing alternatives;
* has complex temporal applicability;
* has evidence relationships;
* has lifecycle transitions;
* participates in supersession.

---

# 15. Graph Roots

An MSG MAY contain one or more semantic roots.

A root identifies an entry point for:

* a repository;
* workspace;
* package;
* compilation unit;
* artifact set;
* knowledge domain.

Roots are navigation and containment concepts.

They do not imply that all semantic entities have exactly one owner.

The graph MUST preserve multi-domain relationships where valid.

---

# 16. Semantic Identity Assignment

## 16.1 Preservation First

MSG construction MUST preserve semantic identities established by prior compiler phases.

MSG construction MUST NOT generate new durable identities merely because it cannot locate an existing identity without first applying the defined fallback policy.

## 16.2 Identity Sources

Semantic identity MAY originate from:

* explicit authored identity;
* artifact registry;
* canonical declaration identity;
* ontology-defined deterministic derivation;
* package-qualified identity;
* imported persistent identity;
* controlled generated identity.

## 16.3 Deterministic Derived Identity

A derived semantic identity MUST be based on stable semantic inputs.

It MUST NOT depend on:

* source line number alone;
* traversal order;
* memory location;
* noncanonical display text;
* random generation without persisted assignment;
* compiler thread scheduling.

## 16.4 Identity Collision

Identity collisions MUST produce explicit diagnostics and semantic state.

A collision MUST NOT be resolved by:

* last writer wins;
* source order;
* registration order;
* map overwrite;
* silent suffix generation.

## 16.5 Identity Aliases

Aliases MUST be represented separately from identity equality.

An alias relationship MUST NOT silently merge two semantic identities unless an accepted identity-equivalence rule authorizes the merge.

## 16.6 Identity Merge

Semantic-identity merging MUST require:

* an explicit equivalence result;
* preserved source identities;
* merge provenance;
* conflict analysis;
* compatibility with lifecycle and authority;
* deterministic representative selection.

---

# 17. Node Construction

Node construction MUST follow a registered mapping from analyzed semantic entities to ontology node types.

Each node-construction rule MUST declare:

```text
NodeConstructionRule

├── rule_id
├── version
├── source_semantic_kind
├── target_ontology_type
├── identity_policy
├── required_properties
├── optional_properties
├── relationship_requirements
├── provenance_policy
├── authority_policy
├── lifecycle_policy
├── completeness_policy
├── extension_origin
└── determinism
```

## 17.1 Eligibility

A semantic entity is graph-eligible when:

* the active ontology defines a representation;
* a registered extension defines a representation; or
* the graph profile requires explicit unknown or unsupported preservation.

## 17.2 Exclusion

Compiler-only state MUST remain excluded unless the active graph profile explicitly requests a diagnostic or inspection graph.

Examples of normally excluded state include:

* token streams;
* parser stacks;
* transient syntax-recovery nodes;
* work queues;
* hash buckets;
* temporary inference variables;
* rejected candidates not needed for explanation;
* cache internals.

## 17.3 Promotion

Compiler state becomes semantic graph knowledge only through an explicit promotion rule.

Promotion MUST preserve:

* source semantic identity;
* construction rule identity;
* rule version;
* provenance;
* losses;
* qualifications.

---

# 18. Relationship Construction

Relationship construction MUST operate from resolved and analyzed semantic relationships.

Relationships MAY originate from:

* ownership;
* containment;
* membership;
* declaration;
* reference;
* implementation;
* satisfaction;
* dependency;
* derivation;
* evidence;
* provenance;
* authority;
* lifecycle;
* supersession;
* compatibility;
* conflict;
* projection;
* generation;
* validation.

## 18.1 Resolved Relationships

A resolved relationship MUST identify its selected semantic target.

## 18.2 Unresolved Relationships

An unresolved relationship MUST NOT be converted into an ordinary valid edge.

It MUST be represented as one of:

* an unresolved-reference node;
* a qualified unresolved edge form defined by the ontology;
* a diagnostic-only record;
* an external unresolved reference;
* an explicitly omitted relationship recorded in completeness metadata.

The selected method MUST be defined by the active graph profile.

## 18.3 Ambiguous Relationships

Ambiguity MUST preserve:

* reference site;
* candidate identities;
* ambiguity reason;
* affected operations;
* resolution status.

MSG construction MUST NOT select one candidate based on source or iteration order.

## 18.4 Conflicting Relationships

Conflicting relationships MUST remain distinct claims connected to an explicit conflict representation.

They MUST NOT overwrite one another.

## 18.5 Derived Relationships

A derived relationship MUST identify:

* derivation rule;
* rule version;
* input claims;
* reasoning class;
* authority;
* confidence where applicable;
* evidence;
* reproducibility status.

---

# 19. Semantic Claims

A claim requiring independent qualification SHOULD be represented as a first-class semantic entity.

Conceptually:

```text
SemanticClaim

├── claim_id
├── subject
├── predicate
├── object_or_value
├── context
├── authority
├── lifecycle
├── applicability
├── provenance
├── evidence
├── confidence
├── conflict_state
└── derivation
```

An implementation MAY encode simple claims as node properties or edges when all required semantics remain representable.

The representation choice MUST NOT erase:

* provenance;
* authority;
* lifecycle;
* evidence;
* applicability;
* conflict.

---

# 20. Value Model

Graph property and claim values MUST use canonical semantic value representations.

Value classes MAY include:

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
* typed literal;
* quantity;
* range;
* unknown;
* deferred;
* invalid;
* conflict reference.

Values MUST preserve type.

A value MUST NOT be reduced to display text when a structured semantic representation exists.

---

# 21. Provenance

## 21.1 Provenance Requirement

Every graph node and first-class edge MUST have traceable provenance.

Provenance MAY be attached directly or inherited through an explicit, valid provenance relationship.

## 21.2 Provenance Content

Provenance SHOULD identify:

* source artifact;
* source representation;
* source region;
* canonical AST node;
* compilation identity;
* semantic-analysis snapshot;
* construction rule;
* construction-rule version;
* originating actor or system where known;
* transformation lineage;
* import lineage;
* generation lineage.

## 21.3 Provenance Accumulation

MSG construction MUST add graph-construction provenance without replacing prior lineage.

## 21.4 Shared Provenance

Shared provenance records MAY be deduplicated.

Deduplication MUST preserve semantic equivalence and referential integrity.

## 21.5 Missing Provenance

Required missing provenance MUST produce a diagnostic.

The graph profile MUST determine whether missing provenance:

* blocks MSG construction;
* permits partial MSG construction;
* permits construction with warnings.

---

# 22. Source Links

MSG SHOULD preserve navigable links from semantic entities to their source representations.

A source link SHOULD include:

* artifact identity;
* representation identity;
* source location or region;
* source fingerprint;
* frontend identity;
* normalization mapping;
* compilation identity.

Source links are not semantic identities.

A semantic entity MAY have several source links.

---

# 23. Authority

## 23.1 Preservation

MSG construction MUST preserve effective authority determined by semantic analysis.

It MUST NOT promote authority.

## 23.2 Authority Representation

Authority MAY be represented as:

* a typed property;
* an authority relationship;
* an authority-assignment node;
* a context-qualified claim.

The chosen representation MUST preserve:

* authority class;
* granting or adopting actor;
* context;
* basis;
* effective boundary;
* source authority;
* derived authority;
* conflicts.

## 23.3 Authority Conflict

Conflicting authority assignments MUST remain explicit.

Graph construction MUST NOT select an authority based solely on:

* newest source;
* file order;
* importer order;
* publication status;
* persistence status.

## 23.4 Inferred Knowledge

Inferred or generated knowledge MUST remain distinguishable from authored or adopted normative knowledge.

---

# 24. Lifecycle

## 24.1 Preservation

MSG construction MUST preserve lifecycle state and applicability established by semantic analysis.

## 24.2 Lifecycle Representation

Lifecycle MAY be represented through:

* typed properties;
* lifecycle-state nodes;
* transition nodes;
* supersession edges;
* effective-boundary claims.

## 24.3 Required Distinctions

The graph MUST preserve distinctions among:

* draft;
* review;
* accepted;
* implemented;
* deprecated;
* superseded;
* withdrawn;
* archived.

## 24.4 Supersession

Supersession MUST preserve:

* predecessor identity;
* successor identity;
* effective boundary;
* rationale where available;
* migration or compatibility reference where available.

Superseded entities MUST NOT be removed from the graph merely because a successor exists.

---

# 25. Applicability and Context

A semantic claim MAY be valid only within a declared context.

Context MAY include:

* namespace;
* package;
* profile;
* feature set;
* version;
* platform;
* environment;
* lifecycle interval;
* authority domain;
* organization;
* compilation unit.

Context-dependent claims MUST NOT be flattened into universally applicable claims.

---

# 26. Evidence

## 26.1 Evidence Identity

Every first-class evidence artifact MUST have identity.

## 26.2 Evidence Relationships

MSG MUST be capable of representing relationships including:

* supports;
* contradicts;
* validates;
* invalidates;
* derives_from;
* observed_by;
* verified_by;
* supersedes_evidence.

## 26.3 Evidence State

Evidence state MAY include:

* unverified;
* validated;
* supporting;
* contradicting;
* expired;
* invalidated;
* withdrawn;
* superseded.

## 26.4 Evidence and Truth

Evidence MUST NOT be represented as proof unless the relevant logic or ontology defines it as proof.

---

# 27. Uncertainty and Incomplete Knowledge

MSG MUST support incomplete semantic knowledge.

Required incomplete-state concepts include:

* unknown;
* unresolved;
* ambiguous;
* deferred;
* unsupported;
* invalid;
* contested;
* conflicting;
* blocked.

## 27.1 Unknown

The graph knows that a value or target is not known.

Unknown MUST NOT be represented as:

* false;
* zero;
* empty string;
* absent property without qualification.

## 27.2 Deferred

A conclusion is intentionally postponed pending a known condition.

Deferred state MUST preserve the resume condition where known.

## 27.3 Unsupported

The source contained meaningful information not supported by the active compiler or ontology.

Unsupported state MUST preserve:

* source identity;
* source location;
* unsupported kind;
* required capability where known;
* affected semantics.

## 27.4 Invalid

A semantic construct violates applicable rules.

Invalid constructs MAY appear in a partial MSG only when they are explicitly represented as invalid and cannot be confused with valid knowledge.

---

# 28. Conflict Representation

Conflicts are first-class semantic artifacts.

Conceptually:

```text
SemanticConflict

├── conflict_id
├── kind
├── subject
├── competing_claims
├── active_context
├── evidence
├── authority_state
├── lifecycle_state
├── blocking_effect
├── resolution_state
├── provenance
└── diagnostics
```

## 28.1 Conflict Requirements

A conflict MUST preserve:

* each competing claim;
* each claim's provenance;
* each claim's authority;
* the context in which conflict occurs;
* affected outputs;
* any selected resolution;
* resolution authority and rationale.

## 28.2 No Silent Precedence

Graph construction MUST NOT resolve conflicts through:

* source order;
* file order;
* declaration order;
* plugin order;
* storage order;
* latest timestamp alone.

## 28.3 Resolved Conflict

A resolved conflict SHOULD remain represented historically when required by the active lifecycle or history profile.

---

# 29. External References

An MSG MAY refer to semantic entities not contained within the snapshot.

An external reference MUST include enough information to identify:

* target identity or target query;
* external domain;
* expected kind;
* version or compatibility constraint;
* resolution status;
* provenance;
* authority assumptions;
* retrieval or availability state where applicable.

External references MUST NOT appear as valid internal node identifiers.

---

# 30. Graph Profiles

MSG construction MAY be governed by a graph profile.

A graph profile MAY control:

* required ontology modules;
* included knowledge domains;
* diagnostic-node inclusion;
* unresolved-reference representation;
* invalid-node inclusion;
* source-link granularity;
* provenance granularity;
* evidence inclusion;
* historical inclusion;
* external-reference behavior;
* graph size limits;
* strictness;
* required readiness.

A profile MUST NOT redefine foundational semantic meaning.

---

# 31. Graph Partitions and Subgraphs

An MSG MAY expose named subgraphs or partitions for:

* artifacts;
* declarations;
* types;
* constraints;
* provenance;
* evidence;
* conflicts;
* diagnostics;
* work;
* implementation;
* publication.

Partitions are organizational views.

They MUST NOT imply isolated semantic universes where cross-partition relationships exist.

---

# 32. Graph Construction Phases

MSG construction SHOULD proceed through explicit phases.

```text
1. Construction Invocation Validation
2. Semantic Input Inventory
3. Identity Reconciliation
4. Node Materialization
5. Property Materialization
6. Relationship Materialization
7. Provenance Attachment
8. Authority and Lifecycle Attachment
9. Evidence Attachment
10. Conflict Materialization
11. External Reference Materialization
12. Graph Normalization
13. Invariant Validation
14. Fingerprint Construction
15. Snapshot Finalization
```

Implementations MAY combine internal operations while preserving the conceptual barriers.

---

# 33. Construction Invocation Validation

Before graph construction begins, MSC MUST validate:

* semantic-analysis snapshot identity;
* snapshot immutability;
* ontology version;
* graph schema version;
* active profile;
* required extension availability;
* required identity policies;
* requested completeness;
* requested readiness;
* resource limits.

Invalid construction configuration MUST fail before graph elements are finalized.

---

# 34. Semantic Input Inventory

MSC MUST inventory graph-eligible semantic entities and relationships before finalization.

The inventory SHOULD identify:

* total analyzed entities;
* eligible entities;
* excluded compiler-only entities;
* unsupported entities;
* invalid entities;
* unresolved relationships;
* conflicts;
* external references;
* expected graph roots.

The inventory MUST be deterministically ordered or order-independent.

---

# 35. Identity Reconciliation

Before node and edge finalization, MSC MUST:

* preserve established semantic identities;
* detect collisions;
* resolve authorized equivalences;
* preserve aliases;
* assign deterministic identities to eligible derived entities;
* diagnose missing required identity;
* construct graph-local identifiers.

Identity reconciliation MUST be stable under equivalent input.

---

# 36. Node Materialization

Node materialization MUST:

* select the ontology type;
* preserve semantic identity;
* construct required properties;
* construct completeness state;
* preserve contextual applicability;
* attach source lineage;
* record construction rule identity.

A node MUST NOT be finalized until all required node invariants are satisfied or explicitly represented as partial under the active profile.

---

# 37. Relationship Materialization

Relationship materialization MUST:

* validate endpoint identities;
* select edge or reified-node representation;
* preserve direction;
* preserve relationship identity where required;
* preserve context;
* attach provenance;
* attach authority and lifecycle;
* preserve ambiguity or conflict;
* diagnose illegal relationship kinds.

---

# 38. Graph Normalization

Graph normalization MAY:

* deduplicate equivalent shared records;
* canonicalize property ordering;
* canonicalize set ordering;
* normalize value representations;
* normalize equivalent ontology aliases;
* collapse authorized structural duplicates;
* assign deterministic graph-local IDs.

Graph normalization MUST NOT:

* merge semantically distinct entities;
* discard conflicts;
* discard provenance;
* discard unsupported state;
* strengthen authority;
* erase lifecycle distinctions;
* select one claim because it appears later.

---

# 39. Duplicate Handling

## 39.1 Structural Duplicate

Two graph elements are structural duplicates when they represent the same semantic entity or relationship with semantically equivalent qualifications.

Structural duplicates MAY be coalesced.

## 39.2 Semantic Duplicate

Two independently sourced claims may assert equivalent meaning while retaining different provenance or authority.

They MUST NOT be collapsed in a way that loses distinct provenance or authority.

## 39.3 Contradictory Duplicate

Two elements sharing identity but carrying incompatible meaning MUST produce a conflict.

---

# 40. Graph Invariants

Every finalized MSG MUST satisfy the following invariants.

## MSG-INV-001 — Graph Identity

The graph has one valid graph identity.

## MSG-INV-002 — Compilation Lineage

The graph identifies the compilation that produced it.

## MSG-INV-003 — Schema Declaration

The graph identifies its graph schema and ontology versions.

## MSG-INV-004 — Node Identity

Every first-class node has semantic identity.

## MSG-INV-005 — Node Type

Every node has one recognized ontology type or explicit unsupported type.

## MSG-INV-006 — Edge Endpoints

Every internal edge references valid nodes.

## MSG-INV-007 — Edge Semantics

Every edge has a recognized relationship kind.

## MSG-INV-008 — Provenance

Every first-class graph element has traceable provenance.

## MSG-INV-009 — Authority Preservation

Graph construction does not silently promote authority.

## MSG-INV-010 — Lifecycle Preservation

Lifecycle state is preserved without silent promotion or deletion.

## MSG-INV-011 — Conflict Preservation

Competing incompatible claims remain explicit.

## MSG-INV-012 — Uncertainty Preservation

Unknown, deferred, unresolved, ambiguous, and unsupported states remain distinguishable.

## MSG-INV-013 — Canonical Value Typing

Structured semantic values retain their types.

## MSG-INV-014 — Compiler-State Separation

Transient compiler implementation state does not become canonical knowledge without a promotion rule.

## MSG-INV-015 — Persistence Independence

Graph validity does not depend on one persistence provider.

## MSG-INV-016 — Projection Independence

Graph validity does not depend on one renderer, UI, or publication format.

## MSG-INV-017 — Determinism

Equivalent semantic inputs produce semantically equivalent MSG outputs.

## MSG-INV-018 — Immutability

A finalized MSG is immutable.

## MSG-INV-019 — Fingerprint Integrity

The graph fingerprint corresponds to canonical graph content and governing versions.

## MSG-INV-020 — No Dangling Internal References

No internal graph relationship points to a nonexistent graph element.

## MSG-INV-021 — Identity Collision Visibility

Identity collisions are explicit and never resolved by ordering.

## MSG-INV-022 — External Reference Explicitness

External references are distinguishable from internal relationships.

## MSG-INV-023 — Profile Declaration

The graph identifies the profile under which it was constructed.

## MSG-INV-024 — Readiness Declaration

The graph declares its completeness and readiness state.

## MSG-INV-025 — Source Traceability

Semantic entities can be traced to source or declared generated origin.

---

# 41. Validation Classes

MSG validation MUST distinguish at least these classes.

## 41.1 Structural Validation

Checks:

* required graph metadata;
* node and edge structure;
* endpoint integrity;
* type validity;
* value encoding;
* identity format.

## 41.2 Ontology Validation

Checks:

* permitted node types;
* permitted edge types;
* domain and range;
* cardinality;
* required relationships;
* semantic constraints.

## 41.3 Identity Validation

Checks:

* missing identity;
* collisions;
* invalid aliases;
* illegal merges;
* unstable derived identity.

## 41.4 Provenance Validation

Checks:

* missing source;
* broken lineage;
* unknown construction rule;
* inconsistent transformation chain.

## 41.5 Governance Validation

Checks:

* authority representation;
* lifecycle representation;
* applicability;
* adoption basis;
* prohibited promotion.

## 41.6 Conflict Validation

Checks:

* preserved competing claims;
* conflict subject;
* conflict context;
* blocking classification.

## 41.7 Determinism Validation

Checks:

* stable ordering;
* stable identity derivation;
* stable fingerprints;
* absence of hidden environmental inputs.

## 41.8 Profile Validation

Checks compliance with active graph-profile requirements.

---

# 42. Validation Severity and Effect

A graph validation finding MUST identify:

* diagnostic code;
* validation class;
* subject;
* severity;
* blocking effect;
* affected output;
* remediation;
* provenance.

A validation finding MAY:

* permit successful graph construction;
* permit partial graph construction;
* block strict MSG construction;
* block downstream MKE ingestion;
* block KIR lowering;
* block publication;
* require internal-error classification.

Blocking behavior MUST be profile-defined or specification-defined.

---

# 43. Partial MSG

A partial MSG is a structurally valid semantic graph containing explicit incomplete or invalid semantic state.

A partial MSG MUST:

* identify itself as partial;
* list unavailable guarantees;
* identify affected graph regions;
* preserve diagnostics;
* preserve unresolved and conflict summaries;
* identify blocked downstream outputs;
* remain immutable after finalization.

A partial MSG MUST NOT be represented as a complete conforming graph.

---

# 44. Readiness

MSG readiness is separate from semantic completeness.

A graph MAY be:

* complete and not authoritative;
* partial but suitable for inspection;
* MSG-ready but not KIR-ready;
* suitable for publication but not execution;
* persistable but not releasable.

MSG readiness states SHOULD include:

```text
unavailable
partial
constructed
validated
persistable
queryable
publishable
kir_ready
backend_ready
blocked
```

The final readiness vocabulary MAY be refined by MSG-CORE, but the distinctions MUST remain representable.

---

# 45. Immutability

A finalized MSG MUST be immutable.

Any semantic change requires:

* a new compilation or authorized graph-transformation operation;
* a new MSG identity or version identity;
* preserved parent lineage;
* a new fingerprint;
* explicit provenance.

An implementation MAY use internal persistent data structures, copy-on-write structures, or immutable snapshots.

It MUST NOT mutate a finalized graph in place while preserving the same snapshot identity.

---

# 46. Deterministic Construction

MSG construction MUST be deterministic under equivalent declared inputs.

Deterministic construction requires stable behavior for:

* node identity;
* edge identity;
* node ordering where observable;
* edge ordering where observable;
* property ordering where serialized;
* diagnostic ordering;
* conflict ordering;
* graph fingerprint;
* root ordering;
* extension output merging.

Semantic output MUST NOT depend silently on:

* thread scheduling;
* filesystem enumeration order;
* hash-map order;
* plugin registration order;
* current time;
* random seed;
* machine hostname;
* remote latest version;
* locale;
* UI state.

---

# 47. Canonical Ordering

The graph's semantic meaning MUST be independent of serialization ordering.

When an ordered representation is required, ordering MUST be canonical.

Canonical ordering SHOULD use stable keys such as:

1. semantic identity;
2. ontology type;
3. relationship kind;
4. source semantic identity;
5. target semantic identity;
6. canonical property key;
7. canonical value representation.

Source order MAY be preserved as an explicit property when semantically relevant.

It MUST NOT become an implicit tie-breaker.

---

# 48. Fingerprinting

The MSG fingerprint MUST account for all inputs capable of changing canonical semantic content.

At minimum:

* node semantic identities;
* node types;
* canonical properties;
* edge identities;
* edge kinds;
* endpoints;
* semantic qualifications;
* provenance references where semantically relevant;
* authority;
* lifecycle;
* applicability;
* conflict state;
* ontology version;
* graph schema version;
* active profile;
* semantic extension versions.

The fingerprint SHOULD exclude:

* memory addresses;
* transient timings;
* nonsemantic logging;
* absolute cache paths;
* display-only formatting.

---

# 49. Serialization

MSG is a logical semantic model, not a serialization format.

A conforming implementation MAY support:

* JSON;
* YAML;
* CBOR;
* MessagePack;
* protobuf;
* RDF-compatible projection;
* graph database ingestion format;
* custom binary format.

Every canonical serialization MUST:

* preserve all required semantics;
* identify schema and ontology versions;
* preserve semantic identities;
* preserve typed values;
* preserve provenance;
* preserve authority and lifecycle;
* preserve conflicts and incomplete states;
* use deterministic encoding when canonical output is requested;
* round-trip without semantic loss.

Lossy formats MUST be labeled as projections rather than canonical MSG serializations.

---

# 50. Extension Participation

Extensions MAY participate in graph construction through registered contracts.

Permitted extension roles include:

* ontology module provider;
* node-construction rule;
* edge-construction rule;
* value codec;
* semantic validator;
* graph augmenter;
* serialization provider.

## 50.1 Extension Requirements

Every graph-construction extension MUST declare:

* extension identity;
* version;
* supported graph schema;
* supported ontology versions;
* produced node and edge types;
* required inputs;
* determinism;
* resource behavior;
* trust requirements;
* diagnostics namespace.

## 50.2 Extension Restrictions

An extension MUST NOT:

* mutate frozen semantic-analysis state;
* mutate a finalized MSG;
* bypass identity rules;
* omit required provenance;
* promote authority;
* erase lifecycle state;
* silently resolve conflict;
* produce unregistered semantic types;
* depend on registration order;
* access unrestricted external resources without policy authorization.

## 50.3 Graph Augmentation

Extension graph augmentation MUST be distinguishable as:

* source-derived;
* compiler-derived;
* inferred;
* imported;
* generated.

Augmented knowledge MUST retain appropriate authority.

---

# 51. MKE Handoff

A valid MSG MAY be submitted to MKE through a versioned ingestion contract.

The handoff MUST include:

* graph identity;
* graph fingerprint;
* compilation identity;
* schema version;
* ontology version;
* repository or workspace identity;
* profile;
* completeness;
* readiness;
* parent graph references where known;
* ingestion policy;
* expected persistent parent where required.

MKE ingestion MUST NOT be treated as part of graph semantic construction.

MKE MAY reject a valid MSG for:

* incompatible schema;
* incompatible ontology;
* transaction conflict;
* missing expected parent;
* storage policy;
* migration requirement;
* authorization failure.

Such rejection does not retroactively invalidate the MSG's semantic construction.

---

# 52. KIR Boundary

KIR lowering consumes MSG or an explicitly approved semantic projection.

KIR lowering MUST NOT read mutable pre-MSG compiler state as its canonical semantic source unless a future specification defines a controlled optimization with clean equivalence.

MSG MAY contain knowledge that is:

* valid for inspection;
* valid for persistence;
* valid for publication;
* not ready for KIR lowering.

KIR readiness is therefore stricter or equal to MSG readiness.

---

# 53. Diagnostics

MSG construction diagnostics MUST be structured.

Diagnostic categories SHOULD include:

```text
MSG-ID
MSG-NODE
MSG-EDGE
MSG-ONTOLOGY
MSG-PROVENANCE
MSG-AUTHORITY
MSG-LIFECYCLE
MSG-EVIDENCE
MSG-CONFLICT
MSG-EXTERNAL
MSG-PROFILE
MSG-DETERMINISM
MSG-FINGERPRINT
MSG-RESOURCE
MSG-INTERNAL
```

Every diagnostic MUST identify:

* diagnostic code;
* phase;
* subject;
* message;
* severity;
* blocking outputs;
* source locations where available;
* semantic identity where available;
* remediation guidance where practical.

Detailed diagnostic architecture is defined by MSC-CORE-0009.

---

# 54. Resource Controls

MSG construction MUST operate under declared resource limits.

Possible limits include:

* maximum nodes;
* maximum edges;
* maximum properties;
* maximum property size;
* maximum provenance depth;
* maximum evidence relationships;
* maximum conflict size;
* maximum external references;
* maximum ontology expansion;
* maximum validation time;
* maximum extension execution time;
* maximum serialization size.

Resource exhaustion MUST produce a structured `resource_exhausted` result.

Resource exhaustion MUST NOT be misrepresented as semantic invalidity.

---

# 55. Security

## 55.1 Untrusted Semantic Input

Although semantic analysis precedes MSG construction, graph-construction input MUST still be treated as potentially malformed or adversarial.

MSG construction MUST defend against:

* invalid identities;
* oversized values;
* cyclic structures unsupported by the schema;
* malicious extension data;
* excessive relationship expansion;
* provenance bombs;
* conflict explosion;
* serialization attacks.

## 55.2 Sensitive Data

Sensitive values MUST follow active policy.

MSG construction MAY:

* omit prohibited sensitive content;
* replace content with a redaction marker;
* create restricted references;
* block graph construction;
* produce a restricted graph profile.

The operation MUST remain explicit and diagnosable.

## 55.3 Secrets

Secrets MUST NOT enter ordinary MSG output unless an explicit secure semantic profile authorizes them.

---

# 56. Incremental Graph Construction

Detailed incrementality is defined by MSC-CORE-0009.

This specification establishes the following minimum requirements.

An incremental MSG result MUST be semantically equivalent to a clean MSG construction under equivalent inputs.

Incremental construction MUST invalidate affected graph state when any relevant input changes, including:

* semantic identity;
* node type;
* property value;
* relationship target;
* authority;
* lifecycle;
* provenance;
* evidence;
* conflict state;
* ontology version;
* graph schema version;
* graph profile;
* construction-rule version.

Cached graph fragments MUST NOT be reused when governing semantic inputs have changed.

---

# 57. Semantic Diff Compatibility

MSG construction SHOULD produce graph identities and canonical structure suitable for semantic diff.

A semantic diff SHOULD be able to distinguish:

* node added;
* node removed;
* node revised;
* identity changed;
* property added;
* property removed;
* property revised;
* edge added;
* edge removed;
* edge revised;
* authority changed;
* lifecycle changed;
* evidence changed;
* conflict introduced;
* conflict resolved;
* provenance changed;
* representation-only change.

Representation-only changes SHOULD NOT appear as semantic changes when meaning is unchanged.

---

# 58. Graph Construction Conformance

A conforming MSC implementation MUST demonstrate:

1. stable graph identity assignment;
2. stable semantic identity preservation;
3. valid node construction;
4. valid edge construction;
5. explicit external references;
6. typed values;
7. provenance preservation;
8. authority preservation;
9. lifecycle preservation;
10. evidence representation;
11. conflict preservation;
12. incomplete-state preservation;
13. ontology validation;
14. deterministic construction;
15. immutable finalization;
16. canonical serialization;
17. structured diagnostics;
18. correct partial-graph behavior;
19. separation from MKE persistence;
20. separation from KIR lowering.

---

# 59. Required Conformance Tests

## 59.1 Identity Tests

* explicit semantic identity preserved;
* deterministic derived identity stable;
* collision produces diagnostic;
* alias does not merge identities silently;
* authorized merge preserves lineage.

## 59.2 Node Tests

* recognized declaration produces correct node;
* required properties exist;
* unknown type remains explicit;
* compiler-only state remains excluded.

## 59.3 Edge Tests

* resolved reference produces valid relationship;
* unresolved reference remains unresolved;
* ambiguous reference preserves candidates;
* external reference remains external;
* relationship reification occurs when required.

## 59.4 Provenance Tests

* source-to-node lineage exists;
* normalized source lineage survives;
* generated node identifies construction rule;
* missing provenance follows profile behavior.

## 59.5 Governance Tests

* authority is preserved;
* authority is not promoted;
* lifecycle state is preserved;
* supersession preserves predecessor.

## 59.6 Conflict Tests

* incompatible claims remain separate;
* conflict node identifies subject and claims;
* source order does not choose a winner.

## 59.7 Determinism Tests

* repeated clean builds produce equivalent graph;
* parallel scheduling produces equivalent graph;
* randomized map order produces equivalent graph;
* canonical serialization is byte-stable when required.

## 59.8 Partial Graph Tests

* unsupported entity remains explicit;
* invalid entity cannot appear as valid;
* blocked output is reported;
* partial graph remains structurally valid.

## 59.9 Boundary Tests

* valid MSG exists without MKE;
* MKE rejection does not alter MSG;
* KIR failure does not invalidate MSG;
* renderer output does not become MSG.

---

# 60. Property-Based Invariants

Implementations SHOULD use property-based tests for:

* identity stability;
* deterministic ordering;
* serialization round-trip;
* graph endpoint integrity;
* duplicate coalescing;
* conflict preservation;
* clean/incremental equivalence;
* graph-fingerprint stability;
* provenance reachability.

---

# 61. Bootstrap MSG Profile

The first MSC implementation SHOULD support a bounded bootstrap MSG profile.

## 61.1 Required Bootstrap Node Types

At minimum:

* artifact;
* specification;
* declaration;
* type;
* property;
* requirement;
* constraint;
* reference;
* diagnostic;
* conflict;
* provenance record.

## 61.2 Required Bootstrap Edge Types

At minimum:

* contains;
* declares;
* owns;
* references;
* has_type;
* constrained_by;
* depends_on;
* derived_from;
* sourced_from;
* conflicts_with;
* supersedes;
* diagnosed_by.

## 61.3 Required Bootstrap Properties

At minimum:

* semantic identity;
* display name;
* kind;
* version;
* status;
* authority;
* lifecycle;
* source artifact;
* source region;
* completeness.

## 61.4 Required Bootstrap Capabilities

The bootstrap implementation MUST:

1. construct nodes from analyzed local MSL artifacts;
2. construct resolved local-reference edges;
3. preserve unresolved references explicitly;
4. attach source provenance;
5. preserve basic authority and lifecycle;
6. construct conflict records;
7. validate required graph invariants;
8. emit deterministic canonical JSON or YAML;
9. compute a stable fingerprint;
10. emit structured diagnostics.

## 61.5 Deferred Bootstrap Capabilities

The bootstrap implementation MAY defer:

* complete MGO;
* distributed external references;
* advanced evidence graphs;
* ontology inference;
* graph federation;
* historical graph merging;
* cryptographic signatures;
* specialized database ingestion;
* advanced AI-derived claims;
* complex temporal reasoning.

---

# 62. Bootstrap Example

Given an analyzed specification artifact:

```text
Artifact: MSC-CORE-0008
Declares: MonadSemanticGraph
Depends on: MSC-CORE-0007
Status: Draft
```

A conceptual MSG fragment is:

```text
[artifact:MSC-CORE-0008]
    ├── declares ──► [concept:MonadSemanticGraph]
    ├── depends_on ──► [artifact:MSC-CORE-0007]
    ├── has_lifecycle ──► [lifecycle:Draft]
    └── sourced_from ──► [representation:MSC-CORE-0008.md]
```

This illustration is informative.

The exact ontology and serialization are defined by later MSG and MGO specifications.

---

# 63. Construction Report

Every MSG construction attempt SHOULD produce a report containing:

* construction identity;
* compilation identity;
* graph identity;
* graph fingerprint;
* status;
* node count;
* edge count;
* external-reference count;
* unresolved count;
* unsupported count;
* conflict count;
* warning count;
* error count;
* excluded compiler-state count;
* ontology version;
* schema version;
* profile;
* readiness;
* elapsed resource use;
* cache reuse;
* diagnostics.

The report is a projection of structured compiler state.

It is not part of graph semantic meaning unless explicitly ingested as knowledge.

---

# 64. Architectural Invariants

The following requirements are foundational to semantic graph construction.

1. MSG is constructed from analyzed meaning.
2. MSG is not an AST.
3. MSG is not a symbol table.
4. MSG is not a database schema.
5. MSG represents one compilation snapshot.
6. MSG is immutable after finalization.
7. Semantic identity survives representation changes.
8. Graph-local identity does not replace semantic identity.
9. Node and edge types derive from the active ontology.
10. Compiler-only state requires explicit promotion.
11. Provenance is preserved.
12. Authority is preserved and never promoted automatically.
13. Lifecycle is preserved.
14. Evidence remains distinct from truth.
15. Conflict remains explicit.
16. Unknown and unresolved states remain explicit.
17. External references remain distinct from internal relationships.
18. Graph construction is deterministic.
19. Canonical serialization preserves semantic meaning.
20. Persistence is downstream.
21. Lowering is downstream.
22. Publication is downstream.
23. Extension participation is governed.
24. Partial graphs declare unavailable guarantees.
25. Every finalized graph declares completeness and readiness.
26. Every semantic element is traceable to source or generated origin.
27. Equivalent inputs produce semantically equivalent MSGs.
28. Identity collisions are never resolved through ordering.
29. Semantic history is created through new snapshots, not in-place mutation.
30. MSG construction remains local-first and provider-neutral.

---

# 65. Implementation Guidance

The implementation SHOULD separate:

```text
MSG Construction API
│
├── Input Adapter
├── Semantic Inventory
├── Identity Reconciler
├── Node Builder
├── Edge Builder
├── Claim Builder
├── Provenance Builder
├── Governance Attachment
├── Evidence Attachment
├── Conflict Builder
├── External Reference Builder
├── Graph Normalizer
├── Graph Validator
├── Fingerprint Builder
├── Snapshot Finalizer
├── Serializer
└── Construction Reporter
```

These are language-neutral implementation boundaries.

They are not required to be separate deployable services.

---

# 66. Error Handling

MSG construction MUST distinguish:

* user semantic error;
* ontology incompatibility;
* unsupported semantic kind;
* missing required identity;
* identity collision;
* invalid graph relationship;
* missing provenance;
* invalid authority transition;
* invalid lifecycle state;
* graph-profile violation;
* extension failure;
* resource exhaustion;
* cancellation;
* internal compiler error.

An internal compiler error MUST NOT be reported as invalid user input.

---

# 67. Compatibility

MSG compatibility MUST be evaluated across:

* graph schema;
* ontology;
* semantic identities;
* node types;
* edge types;
* value types;
* authority vocabulary;
* lifecycle vocabulary;
* provenance vocabulary;
* conflict representation;
* external-reference representation;
* canonical serialization.

A change may be compatible in one domain and breaking in another.

Breaking MSG changes require:

* an ADR where architectural;
* schema and ontology version changes;
* MKE ingestion impact analysis;
* migration strategy;
* projection impact analysis;
* conformance-fixture updates.

---

# 68. Versioning

Every MSG MUST identify:

* MSG schema version;
* ontology version;
* relevant semantic extension versions;
* compiler version;
* graph-profile version.

Version identifiers MUST participate in compatibility analysis and fingerprints where semantically relevant.

---

# 69. Self-Hosting Requirements

When MSC compiles Monad's own specifications:

* specification artifacts MUST become graph entities;
* specification relationships MUST remain traceable;
* Work Cycle and Work Packet references SHOULD be represented;
* normative requirements SHOULD be independently identifiable;
* specification status and authority MUST remain distinct;
* generated documentation MUST remain a projection;
* the compiled graph MUST not bypass constitutional governance.

---

# 70. Required Follow-On Specifications

This specification intentionally enables, but does not replace:

## MSC-CORE-0009

Must define:

* structured diagnostics;
* incremental invalidation;
* cache reuse;
* reproducibility;
* clean/incremental equivalence;
* deterministic scheduling.

## MSC-CORE-0010

Must define:

* KIR lowering;
* backend contracts;
* target readiness;
* semantic-loss reporting;
* backend execution boundaries;
* compiler self-hosting.

## MSG-CORE

Must define:

* complete logical graph model;
* graph schema;
* snapshots;
* conformance;
* serialization profiles.

## MGO-CORE

Must define:

* foundational node vocabulary;
* relationship vocabulary;
* ontology constraints;
* extension model.

## MKE-CORE

Must define:

* ingestion;
* persistence;
* graph history;
* semantic diff;
* query;
* migration;
* governance.

---

# 71. Acceptance Criteria

MSC-CORE-0008 is ready for acceptance when:

* the MSG construction boundary is unambiguous;
* inputs and outputs are explicit;
* graph identity is defined;
* node construction is defined;
* edge construction is defined;
* relationship reification is defined;
* semantic-identity preservation is mandatory;
* provenance is mandatory;
* authority and lifecycle preservation are mandatory;
* evidence is representable;
* conflict is first-class;
* uncertainty and incomplete knowledge are representable;
* external references are explicit;
* graph invariants are enumerated;
* validation classes are defined;
* partial MSG behavior is defined;
* readiness is distinct from completeness;
* immutability is mandatory;
* determinism is mandatory;
* canonical serialization requirements are defined;
* extension boundaries are governed;
* MKE handoff is separate;
* KIR lowering is separate;
* bootstrap scope is bounded;
* conformance tests are identified;
* no contradiction with the Vision layer remains.

---

# 72. Conformance Statement

An implementation claiming conformance with MSC-CORE-0008 MUST:

* satisfy every applicable MUST and MUST NOT requirement;
* identify the supported MSG profile;
* identify supported schema and ontology versions;
* publish conformance-test evidence;
* disclose unsupported optional capabilities;
* disclose known deviations;
* distinguish partial conformance from complete conformance.

---

# 73. Open Specification Questions

The following questions remain intentionally assigned to follow-on specifications:

1. What is the complete foundational MGO vocabulary?
2. Which semantic claims require mandatory reification?
3. Which canonical serialization becomes the bootstrap interchange format?
4. Which semantic-diff algorithm is normative?
5. Which MSG readiness vocabulary becomes final?
6. How are graph-history branches and merges represented in MKE?
7. Which graph fragments are independently cacheable?
8. Which ontology-inference capabilities belong in MSC versus later services?

These questions do not block the architectural contract defined here.

---

# 74. Decision Summary

This specification establishes that:

* MSG is the canonical semantic output of MSC;
* MSG construction begins only after semantic analysis is frozen;
* graph construction preserves semantic identity;
* graph elements are ontology-defined;
* provenance, authority, lifecycle, evidence, uncertainty, and conflict are first-class;
* compiler implementation state does not become knowledge automatically;
* MSG is immutable and deterministic;
* partial knowledge may be represented honestly;
* MKE persistence and KIR lowering remain downstream;
* the first implementation may use a deliberately bounded bootstrap profile.

---

# 75. Status

**Draft**

This specification is ready for:

1. architectural review;
2. consistency review against MSC-CORE-0001 through MSC-CORE-0007;
3. derivation of WC-0001 implementation work packets;
4. promotion to Review;
5. acceptance by the project acceptance authority.

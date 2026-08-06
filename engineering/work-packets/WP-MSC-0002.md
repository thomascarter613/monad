---

id: WP-MSC-0002
title: Implement Semantic Entity Extraction
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

* semantic entity inventory
* entity extraction rules
* graph-node construction requests
* entity extraction diagnostics
* entity extraction conformance fixtures

consumes:

* specifications/MSC/core/MSC-CORE-0008.md
* semantic-analysis snapshot
* canonical declaration table
* symbol snapshot
* type-analysis snapshot
* constraint-analysis snapshot
* authority-analysis results
* lifecycle-analysis results
* provenance records
* active ontology registry
* active MSG profile

depends_on:

* WP-MSC-0001

blocks:

* WP-MSC-0003
* WP-MSC-0004
* WP-MSC-0005
* WP-MSC-0006

related:

* MSC-CORE-0004
* MSC-CORE-0005
* MSC-CORE-0006
* MSC-CORE-0007
* MSC-CORE-0008
* WP-MSC-0001
* WP-MSC-0003
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
* entity-extraction
* node-construction
* ontology
* provenance
* partial-compilation

---

# WP-MSC-0002 — Implement Semantic Entity Extraction

## Executive Summary

Implement the compiler stage that discovers graph-eligible semantic entities in a frozen semantic-analysis snapshot and converts them into deterministic node-construction requests.

Entity extraction is the first active construction stage between semantic analysis and the immutable Monad Semantic Graph.

The extractor does not create relationships, finalize graph identities, validate the completed graph, or freeze an MSG snapshot. It determines:

* which analyzed semantic entities belong in MSG;
* which ontology type represents each entity;
* which semantic properties must be carried forward;
* which entities remain unsupported, invalid, incomplete, or excluded;
* which provenance, authority, lifecycle, evidence, and source records accompany each entity;
* which node-construction rule produced each result.

The output is a stable semantic entity inventory suitable for identity reconciliation and node materialization.

---

# 1. Objective

Create a deterministic entity-extraction subsystem that transforms analyzed compiler entities into explicit, validated, provenance-preserving graph-node requests.

The subsystem must ensure that MSG contains semantic knowledge rather than arbitrary compiler implementation state.

The implementation must preserve every distinction established by `MSC-CORE-0008`, including:

* semantic versus graph-local identity;
* source-derived versus compiler-derived knowledge;
* supported versus unsupported semantics;
* valid versus invalid semantics;
* known versus unknown values;
* authored versus inferred knowledge;
* canonical semantics versus compiler-only state.

---

# 2. Primary Responsibility

The entity extractor has one primary responsibility:

> Identify graph-eligible semantic entities and express their intended MSG node representations without mutating semantic-analysis state or finalizing the graph.

It owns:

* semantic input inventory;
* graph-eligibility decisions;
* node-construction rule selection;
* ontology-type selection;
* semantic-property extraction;
* source-lineage extraction;
* governance-state extraction;
* incomplete-state classification;
* unsupported-state preservation;
* deterministic entity ordering;
* extraction diagnostics.

It does not own:

* semantic identity policy;
* graph-local identity assignment;
* relationship construction;
* complete ontology validation;
* graph invariant validation;
* graph fingerprints;
* immutable snapshot finalization;
* MKE persistence;
* KIR lowering.

---

# 3. Architectural Position

```text
Frozen Semantic-Analysis Snapshot
                │
                ▼
      Semantic Entity Extraction
                │
                ▼
       Semantic Entity Inventory
                │
                ▼
     Semantic Identity Reconciliation
                │
                ▼
          Node Materialization
```

Entity extraction consumes analyzed meaning.

It must not repeat:

* parsing;
* declaration collection;
* symbol binding;
* reference resolution;
* type inference;
* constraint evaluation.

Where required information is unavailable, the extractor must preserve the unavailable state rather than silently recomputing or inventing it.

---

# 4. Scope

## Included

This work packet includes:

* extraction invocation;
* semantic-input traversal;
* graph-eligibility classification;
* entity-kind classification;
* ontology-type resolution;
* node-construction rule registry;
* node-construction request model;
* canonical property extraction;
* typed value extraction;
* labels and display metadata;
* source-link extraction;
* provenance extraction;
* authority extraction;
* lifecycle extraction;
* applicability extraction;
* evidence references;
* completeness classification;
* unsupported entities;
* invalid entities;
* unknown and deferred values;
* compiler-derived entities;
* extension-provided entity rules;
* deterministic extraction;
* structured diagnostics;
* extraction statistics;
* unit, integration, property, and conformance tests.

## Excluded

This work packet excludes:

* relationship and edge construction;
* alias and identity reconciliation;
* graph-local ID allocation;
* semantic identity merging;
* conflict-node construction;
* complete graph validation;
* graph normalization;
* graph fingerprinting;
* serialization implementation;
* MKE ingestion;
* KIR lowering;
* final MSG freezing.

---

# 5. Required Deliverables

## 5.1 Implementation Components

The implementation should provide language-neutral components equivalent to:

```text
Semantic Entity Extraction
│
├── EntityExtractionCoordinator
├── SemanticInputInventory
├── EntityEligibilityClassifier
├── EntityRuleRegistry
├── OntologyTypeResolver
├── EntityPropertyExtractor
├── SourceLinkExtractor
├── ProvenanceExtractor
├── GovernanceStateExtractor
├── EvidenceReferenceExtractor
├── EntityCompletenessClassifier
├── UnsupportedEntityPreserver
├── ExtractionDiagnosticEmitter
├── ExtractionStatisticsCollector
└── SemanticEntityInventory
```

These names are conceptual. Language-specific names may differ while responsibilities remain intact.

## 5.2 Test Fixtures

The repository must contain fixtures covering:

* supported declarations;
* unsupported declarations;
* invalid declarations;
* compiler-derived entities;
* unknown values;
* deferred semantics;
* provisional authority;
* deprecated lifecycle state;
* missing provenance;
* extension-defined semantic entities;
* deterministic ordering.

## 5.3 Reference Artifact

The implementation should produce or update a reference table describing:

```text
analyzed semantic kind
        ↓
node-construction rule
        ↓
ontology node type
```

This reference may initially be generated from the rule registry.

---

# 6. Input Contract

The extractor must consume a frozen semantic-analysis snapshot.

Conceptually:

```text
EntityExtractionInput

├── compilation_identity
├── semantic_snapshot_identity
├── compilation_units
├── analyzed_entities
├── declaration_table
├── symbol_snapshot
├── resolved_references
├── type_analysis
├── constraint_analysis
├── authority_analysis
├── lifecycle_analysis
├── profile_analysis
├── compatibility_analysis
├── provenance_index
├── evidence_index
├── source_map
├── ontology_registry
├── entity_rule_registry
├── active_msg_profile
└── resource_policy
```

All required input collections must be immutable or observationally stable for the extraction attempt.

---

# 7. Output Contract

Entity extraction must produce a structured result.

Conceptually:

```text
EntityExtractionResult

├── extraction_identity
├── compilation_identity
├── semantic_snapshot_identity
├── status
├── entity_inventory
├── excluded_entity_inventory
├── unsupported_entity_inventory
├── invalid_entity_inventory
├── diagnostics
├── statistics
├── reproducibility_record
└── downstream_availability
```

The `entity_inventory` contains node-construction requests, not finalized MSG nodes.

---

# 8. Node-Construction Request

Every graph-eligible entity must produce a node-construction request.

Conceptually:

```text
NodeConstructionRequest

├── source_semantic_identity
├── source_semantic_kind
├── requested_ontology_type
├── identity_input
├── labels
├── canonical_properties
├── source_links
├── provenance
├── authority
├── lifecycle
├── applicability
├── completeness
├── evidence_references
├── annotations
├── extension_payloads
├── construction_rule_identity
├── construction_rule_version
├── diagnostics
└── readiness
```

A node-construction request must not contain an arbitrary finalized graph-local identity.

Graph-local identity belongs to later construction stages.

---

# 9. Extraction Status

Entity extraction status must use:

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

Every required analyzed entity has a valid and complete extraction outcome.

## Success with Warnings

Every required analyzed entity has an acceptable outcome, but nonblocking diagnostics exist.

## Partial

A stable inventory exists, but some entities are explicitly unsupported, invalid, unknown, deferred, or incomplete.

## Blocked

A required ontology, rule set, identity input, or profile dependency prevents the requested inventory from being produced.

## Failed

Input-controlled semantic problems prevent a valid inventory.

## Cancelled

The operation was intentionally cancelled.

## Resource Exhausted

A declared limit prevented completion.

## Internal Error

The extractor violated an internal invariant or encountered an unexpected implementation failure.

---

# 10. Semantic Input Inventory

Before extracting entities, the subsystem must create a complete inventory of candidate semantic state.

The inventory must classify each candidate as one of:

```text
graph_eligible
compiler_only
unsupported
invalid
deferred
excluded_by_profile
diagnostic_only
external_only
```

Every candidate must receive exactly one primary extraction disposition.

Additional qualifications may be attached.

---

# 11. Graph Eligibility

A semantic entity is graph-eligible when at least one of the following is true:

1. The active ontology defines a node representation.
2. A registered extension defines a permitted node representation.
3. The active MSG profile requires explicit preservation of an unsupported or incomplete semantic entity.
4. The entity must exist to preserve provenance, evidence, conflict, lifecycle, or diagnostic meaning.
5. The entity is a first-class semantic claim requiring independent identity or qualification.

An entity is not graph-eligible merely because it exists in compiler memory.

---

# 12. Compiler-Only State

The extractor must exclude ordinary compiler-only state unless a diagnostic or inspection profile explicitly requests it.

Examples include:

* parser implementation objects;
* token streams;
* syntax-recovery mechanics;
* work queues;
* hash tables;
* temporary inference variables;
* candidate ordering buffers;
* cache entries;
* pass-local statistics;
* rejected lookup paths not needed for explanation;
* scheduler state.

Exclusion must be rule-based and testable.

Compiler-only exclusion must not discard semantic diagnostics, provenance, conflicts, or explanation information required by the active profile.

---

# 13. Entity Rule Registry

Entity extraction must use registered construction rules rather than a monolithic conditional chain.

Conceptually:

```text
EntityConstructionRule

├── rule_identity
├── version
├── supported_semantic_kind
├── target_ontology_type
├── eligibility_predicate
├── property_mapping
├── source_link_policy
├── provenance_policy
├── governance_policy
├── completeness_policy
├── evidence_policy
├── extension_origin
├── determinism_declaration
└── priority_or_specificity
```

Rule selection must be deterministic.

Registration order must not determine the selected rule.

---

# 14. Rule Selection

When several rules could apply, selection must follow explicit semantics such as:

1. exact semantic-kind match;
2. most specific registered subtype;
3. active ontology module;
4. active profile compatibility;
5. declared rule precedence;
6. deterministic rule identity.

Ambiguous rule selection must produce a diagnostic.

The extractor must not select the first registered rule.

---

# 15. Ontology-Type Resolution

Every extracted entity must resolve to:

* one supported ontology type;
* one explicit unsupported type;
* one invalid type result; or
* one blocked result.

Ontology-type resolution must consider:

* analyzed semantic kind;
* active ontology version;
* ontology modules;
* extension registrations;
* active MSG profile;
* compatibility rules.

A generic fallback type must not be treated as semantic understanding unless its semantics are explicitly defined.

---

# 16. Property Extraction

Properties must be extracted from analyzed semantic state rather than reparsed source text.

A property mapping must specify:

* property key or identity;
* source semantic field;
* canonical value type;
* multiplicity;
* required or optional status;
* default policy;
* authority policy;
* lifecycle policy;
* provenance policy;
* unknown-state policy;
* invalid-state policy.

Properties must retain structured values.

The extractor must not convert every value into strings.

---

# 17. Required Property Classes

Depending on semantic kind, extracted properties may include:

* canonical name;
* display name;
* description;
* semantic kind;
* version;
* declared status;
* effective type;
* visibility;
* profile;
* feature requirements;
* compatibility state;
* constraint state;
* readiness;
* completeness;
* authored metadata;
* generated metadata.

Required properties are determined by the target ontology type and active MSG profile.

---

# 18. Value Extraction

The entity extractor must support canonical values including:

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
* typed literal;
* list;
* set;
* map;
* range;
* unknown;
* deferred;
* invalid;
* conflict reference.

Source-specific formatting must not replace canonical value typing.

---

# 19. Unknown Values

An unknown value must be represented explicitly.

The extractor must not map unknown to:

* false;
* zero;
* empty string;
* empty collection;
* omitted property without qualification.

An unknown value should preserve:

* reason;
* expected value type;
* affected property;
* source or analysis provenance;
* resolution condition where known.

---

# 20. Deferred Values

A deferred value must preserve:

* expected type;
* dependency;
* deferment reason;
* resume condition;
* affected downstream operations;
* source and analysis provenance.

Deferred does not mean invalid.

---

# 21. Invalid Values

An invalid semantic value may be included in a partial inventory only when:

* its invalid state is explicit;
* it cannot be confused with a valid value;
* its diagnostic is attached;
* the active profile permits it;
* blocked downstream operations are recorded.

---

# 22. Labels and Display Metadata

Labels are presentation-oriented semantic metadata.

They may include:

* canonical display name;
* short label;
* qualified name;
* human-readable title.

Labels must not be used as semantic identities.

Changing a label without changing meaning should not create a new semantic identity.

---

# 23. Source-Link Extraction

Each graph-eligible entity should preserve navigable source links.

A source link should include:

```text
SourceLink

├── artifact_identity
├── representation_identity
├── source_region
├── source_fingerprint
├── canonical_ast_identity
├── frontend_identity
├── normalization_rule_identity
└── compilation_identity
```

One semantic entity may have several source links.

---

# 24. Provenance Extraction

Every node-construction request must contain direct or inherited provenance sufficient to trace the entity's origin.

The extractor must preserve:

* authored origin;
* imported origin;
* generated origin;
* normalized origin;
* derived origin;
* inferred origin;
* compiler-construction rule;
* transformation lineage.

Missing required provenance must produce a diagnostic.

---

# 25. Authority Extraction

The extractor must copy effective authority from semantic analysis without promotion.

It must preserve, as applicable:

* authority class;
* assigning actor or process;
* adoption record;
* context;
* effective boundary;
* basis;
* authority conflict;
* source authority;
* derived authority.

Compilation and extraction do not increase authority.

---

# 26. Lifecycle Extraction

The extractor must preserve effective lifecycle state and lifecycle-related relationships.

Required distinctions include:

* draft;
* review;
* accepted;
* implemented;
* deprecated;
* superseded;
* withdrawn;
* archived.

Lifecycle must remain distinct from authority and implementation readiness.

---

# 27. Applicability Extraction

Context-dependent semantics must retain applicability.

Applicability may depend on:

* namespace;
* package;
* profile;
* feature;
* version;
* platform;
* environment;
* authority domain;
* organization;
* lifecycle interval;
* compilation unit.

The extractor must not flatten contextual claims into universal properties.

---

# 28. Evidence References

The extractor may attach references to existing analyzed evidence entities.

It must not create evidence relationships owned by WP-MSC-0003.

The node-construction request may identify evidence that:

* supports the entity;
* contradicts the entity;
* validates the entity;
* invalidates the entity;
* establishes adoption;
* establishes implementation.

Evidence identity and evidence state must remain explicit.

---

# 29. Completeness Classification

Every node-construction request must have an extraction completeness state.

Recommended values:

```text
complete
partial
unknown
deferred
unsupported
invalid
conflicting
blocked
```

Completeness describes available semantic information.

It does not establish authority or lifecycle.

---

# 30. Unsupported Entity Preservation

An unsupported semantic entity must remain visible when required by the active MSG profile.

Its record must include:

* source semantic identity;
* source semantic kind;
* source artifact;
* source location;
* unsupported capability;
* expected ontology module where known;
* affected semantics;
* affected outputs;
* diagnostic;
* provenance.

The extractor must not treat unsupported content as generic valid text knowledge.

---

# 31. Invalid Entity Preservation

An invalid analyzed entity may be preserved in a partial inventory when required for:

* diagnostics;
* explanation;
* editor experience;
* conflict analysis;
* incremental recovery.

The invalid entity record must never masquerade as a valid node request.

---

# 32. Compiler-Derived Entities

The extractor may include compiler-derived semantic entities such as:

* synthesized types;
* inferred declarations;
* normalized constraints;
* semantic conflict subjects;
* generated placeholders;
* compatibility findings.

Compiler-derived entities must identify:

* derivation rule;
* derivation inputs;
* rule version;
* authority;
* confidence where applicable;
* generated origin;
* reproducibility status.

Compiler-derived does not imply authoritative.

---

# 33. Placeholder Entities

A placeholder entity may preserve graph structure when a required semantic target is unavailable.

A placeholder must contain:

* placeholder identity input;
* expected semantic kind;
* expected identity or identity query;
* reason unavailable;
* originating dependency;
* affected relationships;
* operations blocked;
* replacement condition;
* provenance.

Placeholder creation must be deterministic.

---

# 34. Extension-Defined Entities

Extensions may provide entity-construction rules through a governed registry.

Extension rules must declare:

* extension identity;
* extension version;
* supported semantic kinds;
* produced ontology types;
* property mappings;
* determinism;
* resource requirements;
* trust class;
* compatibility ranges;
* diagnostics namespace.

Extensions must not bypass core identity, provenance, authority, lifecycle, completeness, or diagnostic rules.

---

# 35. Deterministic Extraction

Equivalent semantic-analysis snapshots and extraction configuration must produce semantically equivalent entity inventories.

Determinism includes:

* candidate traversal;
* rule selection;
* ontology-type selection;
* property ordering;
* set ordering;
* diagnostics ordering;
* excluded-state ordering;
* statistics.

Extraction must not depend silently on:

* map order;
* thread scheduling;
* filesystem enumeration;
* rule registration order;
* current time;
* random values;
* locale;
* machine identity.

---

# 36. Canonical Inventory Ordering

Observable inventory ordering should use stable keys:

1. source semantic identity;
2. source semantic kind;
3. requested ontology type;
4. construction-rule identity;
5. source artifact identity.

Semantic meaning must not depend on this order.

---

# 37. Extraction Diagnostics

Diagnostic categories should include:

```text
MSG-ENTITY-ELIGIBILITY
MSG-ENTITY-RULE
MSG-ENTITY-ONTOLOGY
MSG-ENTITY-PROPERTY
MSG-ENTITY-VALUE
MSG-ENTITY-SOURCE
MSG-ENTITY-PROVENANCE
MSG-ENTITY-AUTHORITY
MSG-ENTITY-LIFECYCLE
MSG-ENTITY-EVIDENCE
MSG-ENTITY-COMPLETENESS
MSG-ENTITY-UNSUPPORTED
MSG-ENTITY-EXTENSION
MSG-ENTITY-RESOURCE
MSG-ENTITY-INTERNAL
```

Every diagnostic must identify:

* code;
* severity;
* semantic subject;
* source location where available;
* construction rule where applicable;
* blocking effect;
* remediation guidance where practical.

---

# 38. Resource Controls

The extractor must observe declared limits including:

* maximum candidate entities;
* maximum extracted properties;
* maximum property depth;
* maximum value size;
* maximum source links;
* maximum provenance references;
* maximum evidence references;
* maximum extension payload size;
* maximum extraction diagnostics;
* maximum execution time.

Resource exhaustion must remain distinct from semantic invalidity.

---

# 39. Security Requirements

The extractor must defend against:

* malicious extension payloads;
* oversized values;
* recursive property structures;
* invalid identity inputs;
* provenance expansion attacks;
* source-link path leakage;
* sensitive-value leakage;
* excessive extension execution.

Secrets must not enter ordinary node-construction requests unless a secure profile explicitly authorizes them.

---

# 40. Implementation Boundaries

The implementation should provide boundaries equivalent to:

```text
entity/
├── coordinator
├── inventory
├── candidate
├── eligibility
├── rules
├── ontology
├── properties
├── values
├── source_links
├── provenance
├── governance
├── evidence
├── completeness
├── unsupported
├── diagnostics
├── statistics
└── fixtures
```

This is a logical decomposition, not a required filesystem layout.

---

# 41. Public Interface

A conceptual extraction interface should resemble:

```text
extract_entities(
    semantic_snapshot,
    ontology_registry,
    rule_registry,
    msg_profile,
    resource_policy
) -> EntityExtractionResult
```

The interface must not mutate its inputs.

The returned inventory must be immutable or frozen before downstream stages consume it.

---

# 42. Statistics

The result should report:

* total semantic candidates;
* graph-eligible entities;
* complete entities;
* partial entities;
* unsupported entities;
* invalid entities;
* deferred entities;
* compiler-only exclusions;
* profile exclusions;
* extension-defined entities;
* warnings;
* errors.

Statistics are reporting metadata.

They are not semantic graph content by default.

---

# 43. Acceptance Criteria

WP-MSC-0002 is complete when:

1. An immutable semantic entity inventory exists.
2. Every analyzed semantic candidate receives an explicit disposition.
3. Graph eligibility is rule-driven.
4. Compiler-only state is excluded explicitly.
5. Node-construction rules are registered and versioned.
6. Rule selection is deterministic.
7. Ontology-type resolution is implemented.
8. Node-construction requests are produced.
9. Canonical typed properties are extracted.
10. Unknown, deferred, invalid, and conflict values remain distinct.
11. Labels remain separate from identity.
12. Source links are extracted.
13. Provenance is preserved.
14. Authority is preserved without promotion.
15. Lifecycle is preserved.
16. Applicability is preserved.
17. Evidence references are preserved.
18. Completeness is classified.
19. Unsupported entities remain explicit.
20. Compiler-derived entities preserve derivation.
21. Placeholder entities preserve missing dependencies where permitted.
22. Extensions cannot bypass shared invariants.
23. Extraction is deterministic.
24. Resource limits are enforced.
25. Structured diagnostics are emitted.
26. Unit tests pass.
27. Integration tests pass.
28. Property-based determinism tests pass.
29. Conformance fixtures pass.
30. No relationship construction occurs in this subsystem.

---

# 44. Definition of Done

* [ ] Input contract implemented.
* [ ] Output contract implemented.
* [ ] Entity candidate inventory implemented.
* [ ] Eligibility dispositions implemented.
* [ ] Compiler-only exclusion rules implemented.
* [ ] Entity rule registry implemented.
* [ ] Deterministic rule selection implemented.
* [ ] Ontology-type resolution implemented.
* [ ] Node-construction request model implemented.
* [ ] Canonical property extraction implemented.
* [ ] Typed value extraction implemented.
* [ ] Unknown-value representation implemented.
* [ ] Deferred-value representation implemented.
* [ ] Invalid-value representation implemented.
* [ ] Label extraction implemented.
* [ ] Source-link extraction implemented.
* [ ] Provenance extraction implemented.
* [ ] Authority extraction implemented.
* [ ] Lifecycle extraction implemented.
* [ ] Applicability extraction implemented.
* [ ] Evidence-reference extraction implemented.
* [ ] Completeness classification implemented.
* [ ] Unsupported-entity preservation implemented.
* [ ] Invalid-entity preservation implemented.
* [ ] Compiler-derived entity handling implemented.
* [ ] Placeholder handling implemented.
* [ ] Extension entity rules implemented.
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

# 45. Required Tests

## Candidate Classification

* supported declaration becomes graph eligible;
* compiler-only object is excluded;
* profile-excluded entity is identified;
* unsupported entity is preserved;
* invalid entity is separated from valid requests.

## Rule Selection

* exact rule is selected;
* most-specific rule is selected;
* registration order does not affect selection;
* ambiguous rules produce a diagnostic;
* unavailable required rule blocks extraction.

## Ontology Resolution

* core type resolves;
* extension type resolves;
* unsupported ontology type remains explicit;
* incompatible ontology version blocks or diagnoses according to profile.

## Property Extraction

* typed values remain typed;
* required property is extracted;
* optional missing property remains absent;
* unknown is explicit;
* deferred is explicit;
* invalid is explicit.

## Provenance and Source

* artifact source link survives;
* canonical AST lineage survives;
* generated origin is identified;
* missing required provenance follows profile policy.

## Governance

* authority is copied without promotion;
* lifecycle is copied;
* deprecated entity remains graph eligible where profile requires;
* applicability remains contextual.

## Determinism

* repeated extraction produces equivalent inventory;
* parallel traversal produces equivalent inventory;
* randomized map order produces equivalent inventory;
* diagnostics order remains stable.

## Boundary

* no graph-local identity is finalized;
* no edges are constructed;
* input semantic snapshot remains unchanged;
* inventory is frozen before consumption.

---

# 46. Conformance Fixtures

At minimum, fixtures must include:

```text
fixtures/msg/entity-extraction/
├── artifact/
├── specification/
├── declaration/
├── type/
├── property/
├── requirement/
├── constraint/
├── diagnostic/
├── unsupported/
├── invalid/
├── unknown/
├── deferred/
├── generated/
├── extension/
└── deterministic/
```

Each fixture should identify:

* source input;
* analyzed semantic input;
* expected node-construction request;
* expected diagnostics;
* expected extraction status.

---

# 47. Risks

## Risk 1 — AST-Shaped Graph Extraction

The extractor may mechanically turn every canonical AST node into an MSG node.

**Mitigation**

Require explicit graph-eligibility and construction rules.

## Risk 2 — Compiler-State Leakage

Temporary semantic-analysis objects may become canonical graph entities.

**Mitigation**

Use an allow-listed entity-rule registry and explicit compiler-only dispositions.

## Risk 3 — Generic Fallback Abuse

Unsupported concepts may be mapped to a generic text node and appear semantically understood.

**Mitigation**

Require explicit unsupported representations and diagnostics.

## Risk 4 — Identity Coupling

The extractor may assign final graph-local or durable identities prematurely.

**Mitigation**

Output identity inputs and preserve source semantic identities; leave reconciliation to WP-MSC-0004.

## Risk 5 — Authority Inflation

Generated or inferred entities may inherit stronger authority accidentally.

**Mitigation**

Make governance extraction explicit and prohibit promotion.

## Risk 6 — Monolithic Rule Logic

A large conditional extractor may become difficult to extend and test.

**Mitigation**

Use registered, versioned construction rules.

## Risk 7 — Nondeterministic Rule Selection

Overlapping extension rules may produce unstable results.

**Mitigation**

Define specificity and ambiguity behavior independent of registration order.

## Risk 8 — Responsibility Creep

Entity extraction may absorb edge construction, validation, or snapshot finalization.

**Mitigation**

Enforce output as node-construction requests only.

---

# 48. Architectural Invariants

1. Extraction consumes analyzed meaning.
2. Extraction does not reparse source.
3. Extraction does not repeat semantic analysis.
4. Every candidate receives an explicit disposition.
5. Only graph-eligible semantics become node requests.
6. Compiler-memory existence does not imply graph eligibility.
7. Node construction is rule-driven.
8. Rule selection is deterministic.
9. Ontology types are explicit.
10. Unsupported semantics remain explicit.
11. Canonical values remain typed.
12. Unknown is not false or absent.
13. Deferred is not invalid.
14. Labels are not identities.
15. Provenance is preserved.
16. Authority is never promoted.
17. Lifecycle remains distinct from authority.
18. Applicability remains contextual.
19. Compiler-derived knowledge preserves derivation.
20. Extensions cannot bypass shared invariants.
21. Entity extraction creates no graph edges.
22. Entity extraction finalizes no graph-local identities.
23. Extraction results are immutable before downstream use.
24. Equivalent inputs produce equivalent inventories.
25. Resource exhaustion is not semantic invalidity.

---

# 49. Completion Outcome

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

# 50. Suggested Commit

Planning artifact:

```text
engineering(msc): add semantic entity extraction work packet
```

Future implementation:

```text
feat(msc): implement semantic entity extraction
```

---

# 51. Next Work

Upon completion of this planning artifact, generate:

```text
WP-MSC-0003 — Implement Semantic Relationship Construction
```

That work packet will transform analyzed ownership, references, dependencies, provenance, evidence, lifecycle, and other semantic relationships into MSG edge-construction and relationship-reification requests.

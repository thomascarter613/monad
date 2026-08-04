---

artifact:
id: MSL-CORE-0008
type: knowledge.specification
namespace: monad

metadata:
title: Canonical MSL Abstract Syntax Tree
version: 0.1.0
status: draft
created: 2026-08-04
authors:
- Monad Architecture Team
tags:
- msl
- canonical-ast
- semantic-model
- compiler
- normalization
- authority
- traceability

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
- MSL-CORE-0007
references:
- MKE-CORE-0002
- MKE-CORE-0003
- MKE-CORE-0004
- MKE-CORE-0005
- MKE-CORE-0008
- MKE-CORE-0009
- MKE-CORE-0010
enables:
- MSL-CORE-0009
- MSL-CORE-0010
- MSC-CORE
- KIR-CORE
- MSL-NORMALIZATION
- MSL-EDITOR
- MSL-CONFORMANCE

compilation:
language: msl-markdown
language_version: bootstrap
profile: machine
source_role: primary
status: bootstrap
-----------------

# MSL-CORE-0008 — Canonical MSL Abstract Syntax Tree

## 1. Purpose

This specification defines the canonical Abstract Syntax Tree of the Monad Specification Language.

The canonical MSL AST is the common language-level representation produced after source-specific structures have been normalized into registered MSL semantic concepts.

It establishes:

* the role of the canonical AST;
* canonical node identity;
* canonical node families;
* semantic declarations;
* authority and lifecycle;
* unresolved and partial semantics;
* metadata inheritance;
* requirements;
* relationships;
* references;
* constraints;
* invariants;
* conformance elements;
* provenance;
* normalization lineage;
* extension semantics;
* canonical AST validation;
* AST-to-KIR boundaries;
* compatibility and versioning.

The canonical MSL AST is the shared semantic input to the Monad Specification Compiler.

It is not the final normalized knowledge representation.

---

## 2. Context

MSL accepts input from multiple authoring and engineering surfaces.

These inputs may first produce:

* Markdown surface trees;
* OpenAPI surface trees;
* Terraform surface trees;
* source-code surface trees;
* conversational surface trees;
* semantic-editor operations.

The normalization pipeline maps those source-domain structures into common MSL semantics.

Without a canonical MSL AST, each source frontend or importer would need to participate directly in:

* identity binding;
* reference resolution;
* type checking;
* requirement analysis;
* authority validation;
* conflict detection;
* KIR generation.

That would fragment semantic compilation.

The canonical AST provides one coherent representation over which MSC performs language-wide semantic analysis.

---

## 3. Scope

This specification defines:

* canonical AST compilation units;
* canonical specifications;
* canonical nodes;
* semantic identities;
* node origin;
* authority;
* lifecycle;
* validity;
* declarations;
* metadata;
* requirements;
* types and values;
* relationships;
* references;
* constraints;
* invariants;
* behavior;
* states and transitions;
* conformance;
* provenance;
* diagnostics;
* extensions;
* normalization lineage;
* canonical traversal;
* canonical AST validation;
* KIR emission readiness.

This specification does not fully define:

* concrete `msl-markdown` syntax;
* complete type-system semantics;
* expression grammar;
* reference-resolution algorithms;
* KIR schemas;
* compiler implementation;
* optimization;
* persistence;
* backend generation.

---

## 4. Non-Goals

The canonical MSL AST is not:

* a source-format tree;
* a source-preserving Markdown representation;
* a universal external-format AST;
* KIR;
* an MKE storage schema;
* guaranteed to contain only fully valid nodes;
* required to resolve every reference;
* required to preserve all source trivia;
* a renderer format;
* a general-purpose programming-language AST.

---

## 5. Core Principle

> The canonical MSL AST represents shared language concepts before complete semantic resolution and normalization.

Surface ASTs preserve source-domain fidelity.

The canonical MSL AST provides one semantic vocabulary.

KIR contains resolved, typed, validated, normalized knowledge.

---

## 6. Architectural Position

```text
Source Artifact
    ↓
Surface Frontend
    ↓
Surface AST
    ↓
Normalizer
    ↓
Canonical MSL AST
    ↓
Binding, Resolution, Typing, and Validation
    ↓
KIR
    ↓
MKE
```

The canonical MSL AST is the authoritative compiler input for common MSL semantic analysis.

---

## 7. Terminology

### 7.1 Canonical AST

The source-independent MSL language AST produced by direct MSL authoring or surface normalization.

### 7.2 Canonical Node

A node whose kind belongs to the registered MSL semantic vocabulary or a registered MSL extension.

### 7.3 Canonical Node Kind

A stable semantic category recognized by the MSL language.

### 7.4 Canonical Compilation Unit

The set of canonical AST nodes compiled together under one language, registry, profile, and dependency context.

### 7.5 Semantic Declaration

A canonical node that introduces a named concept.

### 7.6 Semantic Member

A node owned structurally by a declaration.

### 7.7 Semantic Identity

A durable identity used to reference a language concept.

### 7.8 Canonical Origin

The authored, normalized, imported, generated, inferred, or migrated origin of a canonical node.

### 7.9 Bound Node

A canonical node whose declarations and references have been associated with symbols.

### 7.10 Typed Node

A canonical node whose type requirements have been determined.

### 7.11 KIR-Ready Node

A canonical node that satisfies requirements for semantic emission into KIR.

---

## 8. Canonical Compilation Unit

A canonical compilation unit conceptually contains:

```text
CanonicalCompilationUnit

├── unit_identity
├── msl_language_version
├── canonical_ast_schema_version
├── compilation_profile
├── registry_context
├── namespace_context
├── source_documents
├── normalized_sources
├── specification_declarations
├── extension_context
├── diagnostics
├── unresolved_nodes
├── conflicts
├── normalization_reports
├── source_map
└── provenance
```

A compilation unit may contain:

* one specification;
* a specification package;
* a specification series;
* selected workspace artifacts;
* normalized imported knowledge;
* partial semantic content.

---

## 9. Canonical Specification Node

A canonical specification node contains:

```text
SpecificationNode

├── node_id
├── artifact_identity
├── metadata
├── lifecycle
├── ownership
├── authority
├── provenance
├── compilation_declaration
├── scope
├── terminology
├── declarations
├── requirements
├── relationships
├── constraints
├── invariants
├── conformance
├── diagnostics
├── evolution
├── extensions
└── lineage
```

Exactly one primary specification node must own the canonical artifact identity of a logical specification.

---

## 10. Base Canonical Node Model

Every canonical node conceptually contains:

```text
CanonicalNode

├── node_id
├── kind
├── semantic_id
├── parent_id
├── authority
├── lifecycle
├── origin
├── validity
├── resolution
├── source_links
├── surface_lineage
├── transformation_lineage
├── annotations
├── extensions
└── diagnostics
```

Fields may be required, optional, inherited, synthesized, or unresolved depending on node kind.

---

## 11. Canonical Node Identity

Every canonical node must have compiler-visible node identity.

Durably referenceable nodes must also have semantic identity.

Examples:

```text
MSL-CANON-REQ-001
MSL-CANON-INV-001
MSL-CANON-AC-001
```

Canonical node identity must remain distinguishable from:

* source-node identity;
* surface-node identity;
* artifact identity;
* KIR identity;
* external identity.

---

## 12. Canonical Node Origin

Initial origin classes are:

```text
direct_msl
normalized
imported
generated
inferred
migrated
defaulted
recovered
```

### 12.1 Direct MSL

Created by a frontend that directly authors canonical MSL concepts.

### 12.2 Normalized

Produced from one or more surface nodes.

### 12.3 Imported

Adopted from an external knowledge artifact through an explicit import process.

### 12.4 Generated

Produced by deterministic automation.

### 12.5 Inferred

Proposed from evidence rather than explicitly represented by a source.

### 12.6 Migrated

Produced by a version or schema migration.

### 12.7 Defaulted

Produced from an applicable default rule.

### 12.8 Recovered

Produced to preserve compiler or editor structure after failure.

---

## 13. Canonical Node Families

The initial canonical node families are:

```text
Canonical MSL Nodes

├── Specification
├── Declaration
├── Metadata
├── Narrative
├── Requirement
├── Type
├── Value
├── Constraint
├── Invariant
├── Relationship
├── Reference
├── Behavior
├── State
├── Transition
├── Policy
├── Conformance
├── Diagnostic
├── Provenance
├── Lifecycle
├── Evolution
├── Conflict
├── Extension
├── Invalid
├── Missing
├── Unresolved
└── Opaque
```

---

## 14. Declaration Nodes

Declaration nodes introduce semantic concepts.

Initial declaration kinds include:

* specification;
* namespace;
* artifact;
* entity;
* type;
* field;
* interface;
* operation;
* requirement;
* relationship;
* state model;
* policy;
* diagnostic;
* profile;
* extension;
* waiver;
* conformance suite.

A declaration node should contain:

* declared semantic identity;
* declared kind;
* namespace;
* authority;
* lifecycle;
* members;
* source lineage.

---

## 15. Metadata Nodes

Canonical metadata nodes represent fields defined by the MSL metadata model.

A metadata node should preserve:

* field identity;
* effective value;
* explicit value;
* inherited value;
* value origin;
* merge strategy;
* authority;
* source lineage;
* validation state.

Effective metadata must not conceal whether a value was:

* authored;
* inherited;
* defaulted;
* generated;
* migrated.

---

## 16. Narrative Nodes

Canonical narrative nodes represent human-readable semantic content.

Initial kinds include:

* purpose;
* context;
* scope;
* non-goal;
* rationale;
* explanation;
* note;
* warning;
* example narrative;
* open question.

Narrative nodes are informative unless explicitly assigned another authority class.

Narrative structure should preserve enough ordering for coherent human rendering.

---

## 17. Requirement Nodes

A canonical requirement node contains:

```text
RequirementNode

├── requirement_id
├── statement
├── subject
├── obligation
├── predicate
├── target
├── conditions
├── applicability
├── authority
├── lifecycle
├── rationale
├── verification
├── exceptions
├── waivers
├── relationships
├── source_links
└── lineage
```

A requirement may remain partially structured.

For example, the statement may exist while the subject or predicate remains unresolved.

---

## 18. Type Declaration Nodes

Type declaration nodes introduce named type concepts.

Initial type-declaration categories may include:

* scalar;
* enumeration;
* record;
* object;
* union;
* intersection;
* collection;
* map;
* optional;
* reference;
* constrained type;
* domain type;
* artifact type.

Detailed type semantics are defined in `MSL-CORE-0010` and later specialized specifications.

---

## 19. Value Nodes

Canonical values may represent:

* null;
* boolean;
* integer;
* decimal;
* string;
* date;
* timestamp;
* duration;
* identifier;
* list;
* set;
* map;
* structured object;
* reference;
* expression;
* unknown;
* deferred value.

Values must retain declared or inferred type state.

---

## 20. Constraint Nodes

Constraint nodes restrict values, structures, behavior, relationships, or lifecycle.

Initial categories include:

* required;
* prohibited;
* equality;
* inequality;
* range;
* pattern;
* cardinality;
* uniqueness;
* membership;
* implication;
* compatibility;
* ordering;
* temporal;
* authority;
* lifecycle;
* dependency;
* custom extension constraint.

A constraint node must identify:

* target;
* constraint kind;
* expression or parameters;
* applicability;
* authority;
* diagnostics;
* verification method where applicable.

---

## 21. Invariant Nodes

An invariant defines a condition that must remain true within its applicability scope.

A canonical invariant contains:

```text
InvariantNode

├── invariant_id
├── subject
├── expression
├── applicability
├── authority
├── lifecycle
├── verification
├── diagnostic
├── source_links
└── lineage
```

An invariant may remain unresolved until its referenced declarations and types are bound.

---

## 22. Relationship Nodes

A canonical relationship node contains:

```text
RelationshipNode

├── relationship_id
├── relationship_type
├── source_reference
├── target_reference
├── qualifiers
├── direction
├── applicability
├── authority
├── lifecycle
├── provenance
├── source_links
└── lineage
```

Relationship source and target may remain unresolved in the canonical AST.

---

## 23. Reference Nodes

A canonical reference node contains:

```text
ReferenceNode

├── original_reference
├── canonical_candidate
├── namespace_context
├── version_constraint
├── expected_target_kind
├── resolution_state
├── candidate_targets
├── selected_target
├── source_links
└── diagnostics
```

Resolution states include:

* unresolved;
* candidate;
* resolved;
* ambiguous;
* missing;
* invalid;
* deferred.

---

## 24. Behavior Nodes

Behavior nodes represent intended or observed actions and outcomes.

Initial kinds include:

* operation;
* command;
* query;
* event;
* workflow;
* scenario;
* precondition;
* postcondition;
* effect;
* failure;
* compensation;
* interaction.

Behavior nodes may describe intent without defining executable implementation.

---

## 25. State Nodes

State nodes represent named semantic states.

Examples:

* artifact lifecycle states;
* workflow states;
* protocol states;
* operational states;
* domain entity states.

A state node may contain:

* identity;
* description;
* entry conditions;
* exit conditions;
* allowed transitions;
* invariants;
* authority;
* lifecycle.

---

## 26. Transition Nodes

Transition nodes represent state changes.

A transition contains:

```text
TransitionNode

├── transition_id
├── source_state
├── target_state
├── trigger
├── guard
├── effects
├── authority
├── lifecycle
├── verification
└── provenance
```

Transition source and target may be unresolved until binding.

---

## 27. Policy Nodes

Policy nodes represent decision rules governing permitted, prohibited, required, or preferred outcomes.

A policy node may contain:

* policy identity;
* subject;
* action;
* resource;
* condition;
* effect;
* priority;
* authority;
* lifecycle;
* decision diagnostics.

Policies must not be treated as executable general-purpose scripts.

---

## 28. Conformance Nodes

Initial canonical conformance nodes include:

* acceptance criterion;
* conformance profile;
* valid example;
* invalid example;
* expected diagnostic;
* verification declaration;
* evidence requirement;
* conformance result reference.

Acceptance criteria must remain traceable to requirements or other governed semantic elements where applicable.

---

## 29. Diagnostic Declaration Nodes

A diagnostic declaration defines an expected compiler, validator, or conformance message.

It contains:

* diagnostic ID;
* severity;
* title;
* condition;
* message template;
* related semantic kinds;
* remediation guidance;
* lifecycle;
* source lineage.

Declared diagnostics are distinct from diagnostics produced while compiling the declaration itself.

---

## 30. Provenance Nodes

Canonical provenance nodes represent:

* creation;
* authorship;
* contribution;
* normalization;
* import;
* inference;
* generation;
* migration;
* review;
* approval;
* transformation;
* adoption;
* source mapping.

Provenance may apply to:

* an entire specification;
* one declaration;
* one field;
* one relationship;
* one inferred value;
* one lifecycle transition.

---

## 31. Lifecycle Nodes

Canonical lifecycle nodes represent semantic lifecycle state.

Lifecycle must remain distinct from:

* parse validity;
* canonical AST validity;
* compilation status;
* publication status;
* deployment status;
* source-control status.

Lifecycle transitions should preserve authority and evidence.

---

## 32. Evolution Nodes

Evolution nodes represent change semantics.

Initial kinds include:

* revision;
* migration;
* deprecation;
* supersession;
* replacement;
* split;
* merge;
* restoration;
* compatibility declaration;
* breaking change;
* alias transition.

Evolution nodes preserve historical identity and lineage.

---

## 33. Conflict Nodes

A conflict node represents incompatible semantic claims that have not been resolved.

Conflict categories may include:

* identity;
* metadata;
* requirement;
* type;
* relationship;
* authority;
* lifecycle;
* normalization;
* version;
* policy.

A conflict node should preserve:

* competing claims;
* source provenance;
* authority;
* applicability overlap;
* conflict classification;
* resolution status;
* candidate resolutions.

Conflicts must not be flattened into arbitrary values.

---

## 34. Extension Nodes

Extensions may introduce namespaced canonical node kinds.

An extension declaration must define:

* namespace;
* extension version;
* node kinds;
* field schemas;
* type rules;
* authority behavior;
* KIR lowering behavior;
* unknown-extension fallback;
* compatibility.

Extensions must not redefine protected core node semantics.

---

## 35. Invalid, Missing, and Unresolved Nodes

The canonical AST must represent incomplete semantic state.

### 35.1 Invalid Node

Recognized canonical construct that violates active rules.

### 35.2 Missing Node

Required canonical element not supplied.

### 35.3 Unresolved Node

Valid structure whose meaning depends on unavailable binding, reference, type, authority, or confirmation.

These nodes permit editor and partial-compilation workflows.

They must not appear as valid KIR semantics.

---

## 36. Opaque Canonical Nodes

An opaque canonical node may preserve a registered extension or imported semantic payload that the active compiler cannot interpret fully.

It must identify:

* extension namespace;
* declared semantic kind;
* raw or structured payload;
* authority;
* required-for-compilation status;
* source lineage;
* preservation guarantee.

Required normative opaque nodes must block complete compilation.

---

## 37. Authority Model

Every canonical node must declare or inherit authority.

Initial authority classes are:

```text
informative
normative
machine_normative
provisional
deprecated
example
rationale
test_evidence
observed
inferred
```

### 37.1 Observed

Represents directly observed existing-system behavior or structure.

Observed does not automatically mean intended or required.

### 37.2 Inferred

Represents a proposed interpretation based on evidence.

Inferred content remains nonauthoritative unless adopted.

---

## 38. Authority Inheritance

Authority may be inherited from:

* parent specification;
* parent section;
* requirement group;
* imported policy;
* normalization profile;
* explicit adoption event.

The canonical AST must preserve:

* effective authority;
* authority source;
* inheritance path;
* override or transition evidence.

---

## 39. Lifecycle Model

Canonical nodes may have lifecycle states such as:

```text
proposed
draft
review
approved
active
deprecated
superseded
withdrawn
archived
```

Internal semantic elements may have lifecycle independent from their parent specification.

---

## 40. Validity Model

Canonical AST validity is multidimensional.

Dimensions include:

* structural;
* identity;
* metadata;
* authority;
* lifecycle;
* reference;
* type;
* constraint;
* profile;
* conflict;
* normalization;
* conformance.

Possible states:

```text
unknown
valid
invalid
partial
deferred
not_applicable
waived
```

A waiver must not convert invalid semantics into valid semantics.

It records permitted nonconformance under a defined scope.

---

## 41. Normalization Lineage

Every normalized canonical node must identify:

* contributing surface nodes;
* normalizer;
* mapping identity;
* mapping version;
* normalization profile;
* transformation event;
* losses;
* ambiguity;
* confirmation state.

Directly authored canonical MSL nodes must identify their frontend and source.

---

## 42. Multiple-Source Canonical Nodes

One canonical node may derive from multiple source nodes.

Example:

```text
OpenAPI Operation
+
OpenAPI Response
+
Security Scheme
    ↓
Canonical Interface Operation
```

All contributing sources must remain traceable.

Field-level provenance should be preserved when fields come from different sources.

---

## 43. Canonical Node Composition

Canonical nodes may be composed through:

* explicit declaration;
* supplementary sources;
* normalization enrichment;
* inheritance;
* imports;
* defaults;
* migrations;
* approved merges.

Composition must use field-specific rules.

Protected fields must not be overwritten silently.

---

## 44. Canonical Metadata Resolution

Canonical metadata should distinguish:

```text
declared value
inherited value
defaulted value
normalized value
effective value
```

The compiler must make the effective value inspectable.

It must also preserve why that value won.

---

## 45. Namespace Model

Canonical declarations exist in namespace context.

A namespace node may define:

* canonical namespace ID;
* parent namespace;
* imports;
* aliases;
* visibility;
* exports;
* resolution policy.

Namespace semantics are completed in `MSL-CORE-0010`.

---

## 46. Symbol Declarations

Declarations that can be referenced create symbols.

Examples:

* specification IDs;
* requirement IDs;
* type names;
* field names;
* interface names;
* operation names;
* state names;
* policy names;
* diagnostic IDs;
* profile IDs.

The canonical AST may contain symbols before they are fully bound.

---

## 47. Canonical AST Ordering

Some canonical AST collections are ordered.

Examples:

* narrative sections;
* workflow steps;
* priority lists;
* state-transition actions.

Others are semantically unordered.

Examples:

* tags;
* namespace imports;
* set-like requirements;
* relationship collections where order is irrelevant.

The canonical AST must declare collection semantics.

---

## 48. Canonical AST Traversal

Canonical AST tooling should support:

* declaration lookup;
* semantic-ID lookup;
* node-kind traversal;
* authority filtering;
* lifecycle filtering;
* unresolved-node discovery;
* conflict discovery;
* provenance traversal;
* source-to-canonical traversal;
* canonical-to-surface traversal;
* requirement indexing;
* relationship indexing;
* type-declaration indexing.

---

## 49. Canonical AST Transformations

Compiler phases may transform the canonical AST through:

* identity binding;
* namespace expansion;
* metadata inheritance;
* alias normalization;
* desugaring;
* reference binding;
* type annotation;
* constraint lowering;
* profile activation;
* authority validation;
* lifecycle validation;
* conflict construction;
* KIR lowering.

Every transformation must preserve lineage.

---

## 50. Bound Canonical AST

A bound canonical AST has:

* registered declarations;
* constructed symbol tables;
* associated references;
* resolved namespace contexts;
* normalized aliases;
* selected imports.

Binding may remain partial.

A bound node is not necessarily type-valid or KIR-ready.

---

## 51. Typed Canonical AST

A typed canonical AST has:

* resolved or constrained type expressions;
* checked field values;
* validated operators;
* typed references;
* typed constraints;
* typed invariant expressions.

Typing may produce:

* valid types;
* unknown types;
* error types;
* deferred types;
* union candidates.

---

## 52. Validated Canonical AST

A validated canonical AST has completed applicable:

* identity checks;
* metadata checks;
* authority checks;
* lifecycle checks;
* reference checks;
* type checks;
* constraint checks;
* profile checks;
* conflict checks;
* extension checks.

Validation does not imply successful KIR emission when required unresolved semantics remain.

---

## 53. KIR-Ready Nodes

A node is KIR-ready when:

* required identity is assigned;
* references required for meaning are resolved;
* required types are known;
* applicable constraints are valid;
* authority is valid;
* lifecycle permits emission;
* no blocking conflict exists;
* required extensions are available;
* source and transformation lineage are preserved.

Partial compilation may emit provisional KIR only if KIR rules explicitly permit it.

---

## 54. AST-to-KIR Lowering

Canonical AST lowering conceptually includes:

```text
Canonical Node
    ↓
Resolve Effective Metadata
    ↓
Bind Identity and References
    ↓
Check Types
    ↓
Evaluate Static Constraints
    ↓
Validate Authority and Lifecycle
    ↓
Normalize Semantic Form
    ↓
Emit KIR Element
```

Not all canonical nodes emit standalone KIR elements.

Some may:

* enrich another KIR element;
* remain publication-only;
* become diagnostics;
* become provenance;
* be omitted as presentation structure;
* block compilation.

---

## 55. Canonical AST Serialization

A canonical AST serialization may support:

* compiler fixtures;
* editor protocols;
* testing;
* process boundaries;
* caching;
* debugging;
* migrations.

Serialized canonical AST must declare:

* canonical AST schema version;
* MSL language version;
* source lineage schema;
* extension schemas;
* normalization records;
* authority classes;
* lifecycle vocabulary.

Serialized canonical AST is not automatically canonical authored source.

---

## 56. Canonical AST Versioning

Canonical AST schema version is distinct from:

* surface AST version;
* MSL language version;
* frontend version;
* normalizer version;
* compiler version;
* KIR version.

A language feature may require a canonical AST schema update.

A schema implementation update may not require a language-semantic change.

---

## 57. Canonical AST Compatibility

Compatible changes may include:

* optional fields;
* optional informative node kinds;
* additional diagnostics;
* additional provenance fields;
* namespaced extension support.

Breaking changes include:

* changing core node meaning;
* changing identity rules;
* changing authority semantics;
* changing required fields;
* changing AST-to-KIR contracts;
* changing reference or type interpretation.

Breaking changes require migration rules and compatibility diagnostics.

---

## 58. Canonical AST Conformance

Conformance must evaluate:

* node schema;
* identity;
* node-kind validity;
* authority;
* lifecycle;
* source lineage;
* normalization lineage;
* extension namespaces;
* invalid and unresolved-state representation;
* reference-state representation;
* composition;
* deterministic serialization where claimed;
* AST-to-KIR traceability.

---

## 59. Normative Requirements

### MSL-CANON-REQ-001

The canonical MSL AST **MUST** use a source-independent semantic vocabulary.

### MSL-CANON-REQ-002

Every canonical AST compilation unit **MUST** declare its MSL language version and canonical AST schema version.

### MSL-CANON-REQ-003

Every canonical node **MUST** have compiler-visible node identity.

### MSL-CANON-REQ-004

Every durably referenceable canonical node **MUST** have stable semantic identity in an appropriate scope.

### MSL-CANON-REQ-005

Canonical node identity **MUST** remain distinguishable from artifact, surface-node, external, and KIR identities.

### MSL-CANON-REQ-006

Every canonical node **MUST** declare or inherit authority deterministically.

### MSL-CANON-REQ-007

Every canonical node **MUST** preserve applicable source and transformation lineage.

### MSL-CANON-REQ-008

Every normalized canonical node **MUST** preserve all contributing surface-node references.

### MSL-CANON-REQ-009

Canonical nodes **MUST** distinguish authored, normalized, imported, generated, inferred, migrated, defaulted, and recovered origins.

### MSL-CANON-REQ-010

Inferred canonical nodes **MUST NOT** acquire normative or machine-normative authority without an authorized adoption process.

### MSL-CANON-REQ-011

Observed behavior **MUST NOT** be treated automatically as intended normative behavior.

### MSL-CANON-REQ-012

The canonical AST **MUST** represent invalid, missing, unresolved, conflict, and opaque semantic state explicitly.

### MSL-CANON-REQ-013

Blocking invalid, unresolved, conflicting, or opaque normative nodes **MUST** prevent full successful KIR emission.

### MSL-CANON-REQ-014

Canonical relationship nodes **MUST** preserve typed relationship identity, source reference, target reference, authority, lifecycle, and provenance.

### MSL-CANON-REQ-015

Canonical reference nodes **MUST** preserve original reference form, namespace context, expected target kind, and resolution state.

### MSL-CANON-REQ-016

Ambiguous references **MUST** preserve candidate targets.

### MSL-CANON-REQ-017

Canonical metadata composition **MUST** preserve explicit, inherited, defaulted, normalized, and effective values where they differ.

### MSL-CANON-REQ-018

Canonical metadata merges **MUST** use field-specific rules.

### MSL-CANON-REQ-019

Protected identity, authority, lifecycle, and provenance fields **MUST NOT** be overwritten silently.

### MSL-CANON-REQ-020

Canonical requirement nodes **MUST** preserve requirement identity, obligation, authority, lifecycle, source lineage, and verification state.

### MSL-CANON-REQ-021

Canonical invariant nodes **MUST** preserve invariant identity, expression, applicability, authority, and verification.

### MSL-CANON-REQ-022

Canonical conflict nodes **MUST** preserve all materially competing claims and provenance.

### MSL-CANON-REQ-023

Compiler transformations over the canonical AST **MUST** preserve transformation lineage.

### MSL-CANON-REQ-024

The canonical AST **MUST** distinguish structural parentage from semantic relationships.

### MSL-CANON-REQ-025

Canonical AST collections **MUST** declare or imply whether ordering is semantic.

### MSL-CANON-REQ-026

Unknown required core node kinds **MUST** be rejected.

### MSL-CANON-REQ-027

Unknown required machine-normative extension nodes **MUST NOT** be ignored.

### MSL-CANON-REQ-028

Extensions **MUST** use registered namespaces and versioned schemas.

### MSL-CANON-REQ-029

The canonical AST **MUST** preserve parent-child relationships between specifications and internal semantic elements.

### MSL-CANON-REQ-030

Canonical AST diagnostics **MUST** reference canonical node IDs and available source lineage.

### MSL-CANON-REQ-031

KIR elements **MUST** remain traceable to contributing canonical nodes.

### MSL-CANON-REQ-032

KIR elements derived from normalized sources **MUST** remain transitively traceable to surface nodes and original source artifacts.

### MSL-CANON-REQ-033

Presentation-only canonical nodes **MAY** be omitted from KIR when omission does not alter semantic meaning, authority, provenance, or traceability.

### MSL-CANON-REQ-034

The canonical AST **MUST** support partial compilation units without representing them as complete validated knowledge.

### MSL-CANON-REQ-035

A waiver **MUST NOT** change the validity of the waived requirement; it **MUST** record permitted scoped nonconformance.

### MSL-CANON-REQ-036

Canonical AST serialization **MUST** identify language, schema, extension, and lineage versions.

### MSL-CANON-REQ-037

Persisted canonical AST caches **MUST** be invalidated or migrated after incompatible language, schema, extension, mapping, or compiler changes.

### MSL-CANON-REQ-038

Canonical AST conformance **MUST** be testable through versioned fixtures.

### MSL-CANON-REQ-039

Canonical semantic equivalence **MUST** be determined independently from source formatting.

### MSL-CANON-REQ-040

Canonical nodes emitted from defaults **MUST** preserve the default rule and precedence source.

---

## 60. Conceptual Model

```text
CanonicalCompilationUnit

├── language and schema versions
├── registry and namespace context
├── specifications
│   ├── identity
│   ├── metadata
│   ├── requirements
│   ├── types
│   ├── relationships
│   ├── constraints
│   ├── invariants
│   ├── behaviors
│   ├── policies
│   ├── conformance
│   ├── provenance
│   └── lifecycle
│
├── unresolved nodes
├── invalid nodes
├── conflict nodes
├── extension nodes
├── normalization lineage
└── diagnostics
        │
        ▼
Binding
        │
        ▼
Typed Canonical AST
        │
        ▼
Validation
        │
        ▼
KIR
```

---

## 61. Machine Specification

```yaml
machine_spec:
  kind: canonical_msl_ast

  compilation_unit:
    required:
      - unit_identity
      - msl_language_version
      - canonical_ast_schema_version
      - compilation_profile
      - registry_context
      - namespace_context
      - provenance

  node:
    required:
      - node_id
      - kind
      - authority
      - origin
      - validity
      - lineage

    conditional:
      - semantic_id
      - parent_id
      - lifecycle
      - resolution
      - source_links
      - surface_lineage
      - transformation_lineage
      - annotations
      - extensions
      - diagnostics

  origin_classes:
    - direct_msl
    - normalized
    - imported
    - generated
    - inferred
    - migrated
    - defaulted
    - recovered

  authority_classes:
    - informative
    - normative
    - machine_normative
    - provisional
    - deprecated
    - example
    - rationale
    - test_evidence
    - observed
    - inferred

  node_families:
    - specification
    - declaration
    - metadata
    - narrative
    - requirement
    - type
    - value
    - constraint
    - invariant
    - relationship
    - reference
    - behavior
    - state
    - transition
    - policy
    - conformance
    - diagnostic
    - provenance
    - lifecycle
    - evolution
    - conflict
    - extension
    - invalid
    - missing
    - unresolved
    - opaque

  lifecycle_states:
    - proposed
    - draft
    - review
    - approved
    - active
    - deprecated
    - superseded
    - withdrawn
    - archived

  validity_dimensions:
    - structural
    - identity
    - metadata
    - authority
    - lifecycle
    - reference
    - type
    - constraint
    - profile
    - conflict
    - normalization
    - conformance

  validity_states:
    - unknown
    - valid
    - invalid
    - partial
    - deferred
    - not_applicable
    - waived

  kir_readiness:
    requires:
      - required_identity_bound
      - blocking_references_resolved
      - required_types_known
      - constraints_valid
      - authority_valid
      - lifecycle_allows_emission
      - no_blocking_conflict
      - required_extensions_available
      - lineage_complete
```

---

## 62. Invariants

```yaml
invariants:
  - id: MSL-CANON-INV-001
    expression: canonical_node.node_id != null
    description: Every canonical node has compiler-visible identity.

  - id: MSL-CANON-INV-002
    expression: durable_reference_target.semantic_id != null
    description: Durably referenced nodes possess semantic identity.

  - id: MSL-CANON-INV-003
    expression: canonical_node.authority != null
    description: Every node has effective authority.

  - id: MSL-CANON-INV-004
    expression: normalized_node.surface_lineage.count >= 1
    description: Normalized nodes retain source-surface lineage.

  - id: MSL-CANON-INV-005
    expression: inferred_node.authority not_in [normative, machine_normative]
    description: Unadopted inference is not authoritative.

  - id: MSL-CANON-INV-006
    expression: observed_behavior.implies_normative_intent == false
    description: Observation does not automatically establish intent.

  - id: MSL-CANON-INV-007
    expression: blocking_invalid_node.full_kir_emission == false
    description: Blocking invalid semantics prevent full emission.

  - id: MSL-CANON-INV-008
    expression: conflict_node.competing_claims.count >= 2
    description: Conflicts preserve competing claims.

  - id: MSL-CANON-INV-009
    expression: metadata.effective_value.origin != null
    description: Effective metadata retains provenance.

  - id: MSL-CANON-INV-010
    expression: transformation.lineage != null
    description: Canonical AST transformations remain traceable.

  - id: MSL-CANON-INV-011
    expression: structural_parentage != semantic_relationship_graph
    description: Tree ownership and semantic edges remain distinct.

  - id: MSL-CANON-INV-012
    expression: kir_element.canonical_sources.count >= 1
    description: KIR remains linked to canonical AST origin.

  - id: MSL-CANON-INV-013
    expression: waiver.mutates_requirement_validity == false
    description: Waivers permit nonconformance without redefining truth.

  - id: MSL-CANON-INV-014
    expression: extension_node.namespace != null
    description: Extension semantics are namespaced.

  - id: MSL-CANON-INV-015
    expression: source_formatting_change.semantic_equivalence_changed == false
    description: Presentation changes do not alter canonical meaning.
```

---

## 63. Diagnostics

### MSL0701 — Missing Canonical Node Identity

A canonical AST node lacks compiler-visible node identity.

### MSL0702 — Missing Durable Semantic Identity

A durably referenceable node lacks stable semantic identity.

### MSL0703 — Unsupported Canonical AST Version

The compiler does not support the declared canonical AST schema version.

### MSL0704 — Unknown Canonical Node Kind

A node uses an unsupported unnamespaced canonical kind.

### MSL0705 — Missing Canonical Authority

A node has no determinable authority classification.

### MSL0706 — Missing Canonical Lineage

A node cannot be traced to authored, normalized, imported, generated, migrated, inferred, defaulted, or recovered origin.

### MSL0707 — Surface Lineage Missing

A normalized node cannot be traced to contributing surface nodes.

### MSL0708 — Unauthorized Inferred Authority

An inferred node claims normative or machine-normative authority without adoption evidence.

### MSL0709 — Observed Behavior Misclassified

Observed implementation behavior was classified as normative intent without authority.

### MSL0710 — Blocking Invalid Node

A required semantic node is invalid and prevents KIR emission.

### MSL0711 — Blocking Unresolved Node

A required semantic node remains unresolved.

### MSL0712 — Blocking Conflict

Competing claims prevent deterministic semantic emission.

### MSL0713 — Opaque Required Extension

A required extension node cannot be interpreted.

### MSL0714 — Canonical Metadata Origin Missing

An effective metadata value lacks source, inheritance, default, or normalization lineage.

### MSL0715 — Protected Metadata Overwrite

Composition attempted to overwrite protected identity, authority, lifecycle, or provenance.

### MSL0716 — Missing Relationship Endpoint

A relationship lacks a resolvable source or target reference.

### MSL0717 — Missing Reference Resolution State

A reference node does not expose resolution status.

### MSL0718 — Ambiguous Reference Candidates Missing

An ambiguous reference does not preserve candidate targets.

### MSL0719 — Requirement Structure Incomplete

A requirement lacks mandatory identity, obligation, authority, statement, or lifecycle information.

### MSL0720 — Invariant Structure Incomplete

An invariant lacks identity, expression, authority, or applicability.

### MSL0721 — Conflict Evidence Missing

A conflict node does not preserve all materially competing values or provenance.

### MSL0722 — Transformation Lineage Missing

A transformed canonical node cannot be traced to its inputs.

### MSL0723 — Invalid Collection Ordering

A canonical collection violates declared ordering semantics.

### MSL0724 — KIR Readiness Failure

A node marked KIR-ready does not satisfy mandatory readiness conditions.

### MSL0725 — KIR Traceability Failure

An emitted KIR element cannot be traced to canonical source nodes.

### MSL0726 — Invalid Waiver Semantics

A waiver attempts to redefine a requirement as valid rather than permit scoped nonconformance.

### MSL0727 — Unknown Extension Schema

A namespaced canonical extension has no compatible schema.

### MSL0728 — Partial Compilation Misclassified

A partial canonical AST claims complete validated status.

### MSL0729 — Canonical AST Serialization Incomplete

Serialized canonical AST lacks required version, extension, or lineage metadata.

### MSL0730 — Incompatible Canonical AST Cache

A persisted canonical AST is incompatible with active language, schema, extension, mapping, or compiler state.

---

## 64. Acceptance Criteria

This specification is satisfied when:

1. the canonical MSL AST is clearly distinguished from surface ASTs and KIR;
2. compilation-unit and specification-root structures are defined;
3. every canonical node has node identity and applicable semantic identity;
4. canonical origin classes are explicit;
5. source and normalization lineage remain preserved;
6. canonical node families cover metadata, requirements, types, constraints, relationships, behavior, conformance, provenance, lifecycle, evolution, and conflicts;
7. observed and inferred semantics are distinguishable from intended normative semantics;
8. authority and lifecycle are represented on canonical nodes;
9. invalid, missing, unresolved, conflict, and opaque nodes are preserved;
10. metadata composition retains effective-value provenance;
11. references preserve original form, resolution state, and candidates;
12. conflicts preserve all competing claims;
13. AST transformations preserve lineage;
14. bound, typed, validated, and KIR-ready states are distinguishable;
15. KIR readiness has explicit conditions;
16. KIR emission remains traceable to canonical and original source nodes;
17. extension nodes are namespaced and versioned;
18. canonical AST serialization uses a distinct schema version;
19. partial canonical ASTs cannot masquerade as complete knowledge;
20. canonical conformance is testable through fixtures.

---

## 65. Conformance Examples

### 65.1 Valid Canonical Requirement Node

```yaml
canonical_node:
  node_id: canon-node-100
  kind: requirement
  semantic_id: EXAMPLE-REQ-001
  origin: direct_msl
  authority: normative
  lifecycle: draft

  fields:
    statement: The compiler must preserve source mappings.
    subject:
      reference: compiler
    obligation: must
    predicate: preserve
    target:
      reference: source_mappings

  resolution:
    state: partial

  source_links:
    - source: example.md
      start_line: 22
      end_line: 25
```

### 65.2 Valid Normalized Canonical Node

```yaml
canonical_node:
  node_id: canon-api-op-1
  kind: interface_operation
  semantic_id: API-OP-0001
  origin: normalized
  authority: machine_normative

  surface_lineage:
    - surface_node: openapi-operation-44
    - surface_node: openapi-response-45

  transformation_lineage:
    mapping: OPENAPI-MSL-MAP-0001
    mapping_version: 0.1.0
```

### 65.3 Invalid Missing Surface Lineage

```yaml
canonical_node:
  node_id: canon-api-op-2
  kind: interface_operation
  origin: normalized
```

Expected diagnostic:

```text
MSL0707: normalized canonical node lacks contributing surface-node lineage
```

### 65.4 Valid Observed Behavior

```yaml
canonical_node:
  node_id: observed-auth-1
  kind: behavior
  origin: inferred
  authority: observed

  fields:
    statement: Existing implementation rejects expired tokens.

  provenance:
    evidence:
      - rust-function-node-88
```

This does not become a normative requirement automatically.

### 65.5 Invalid Observed-to-Normative Conversion

```yaml
canonical_node:
  node_id: auth-req-1
  kind: requirement
  origin: inferred
  authority: normative
```

No adoption evidence exists.

Expected diagnostics:

```text
MSL0708: inferred node cannot claim normative authority
MSL0709: observed implementation behavior does not establish normative intent
```

### 65.6 Valid Conflict Node

```yaml
canonical_node:
  node_id: conflict-1
  kind: conflict
  authority: provisional

  fields:
    category: relationship

    claims:
      - value: depends_on DATABASE-A
        provenance: SPEC-A

      - value: depends_on DATABASE-B
        provenance: IMPORTED-CONFIG

    resolution_status: unresolved
```

### 65.7 Invalid Silent Conflict Flattening

The compiler retains only `DATABASE-B` and discards the approved `DATABASE-A` claim.

Expected diagnostic:

```text
MSL0721: conflict node does not preserve all materially competing claims
```

### 65.8 Valid Effective Metadata

```yaml
metadata_node:
  field: namespace

  explicit_value: null
  inherited_value: example
  effective_value: example

  provenance:
    inherited_from: repository-manifest
    precedence_rule: repository_default
```

### 65.9 Valid Partial Reference

```yaml
reference_node:
  original_reference: USER-TYPE
  namespace_context: example.auth
  expected_target_kind: type

  resolution:
    state: ambiguous
    candidates:
      - example.auth::USER-TYPE
      - example.shared::USER-TYPE
```

### 65.10 Invalid KIR-Ready Node

```yaml
canonical_node:
  node_id: canon-req-2
  kind: requirement
  kir_ready: true

  resolution:
    state: unresolved
```

Expected diagnostic:

```text
MSL0724: node is not KIR-ready because required references remain unresolved
```

---

## 66. Security and Trust Considerations

The canonical AST is a high-value trust boundary because it presents source-independent semantic structures to the compiler.

Threats include:

* forged normalization lineage;
* authority escalation;
* source-provenance removal;
* conflict suppression;
* identity substitution;
* extension-node injection;
* malicious serialized AST;
* cache poisoning;
* observed behavior represented as intended behavior;
* unsafe policy expressions;
* lifecycle forgery;
* KIR-readiness misclassification.

Implementations should:

* validate all canonical AST input;
* reject incompatible schema versions;
* preserve signed or fingerprinted lineage where available;
* enforce authority transitions;
* retain conflict evidence;
* validate extension namespaces;
* revalidate persisted AST caches;
* separate observed, inferred, proposed, and adopted knowledge;
* enforce node-count and graph limits;
* reject cyclic structural ownership;
* validate KIR-readiness independently rather than trusting a source flag.

---

## 67. Evolution and Compatibility

The canonical AST will evolve as MSL semantics mature.

Compatible changes may include:

* optional fields;
* new informative node kinds;
* additional provenance detail;
* new nonbreaking authority annotations;
* optional conformance metadata.

Breaking changes include:

* changing core node meaning;
* changing authority classes;
* changing identity rules;
* changing reference semantics;
* changing type-expression representation;
* changing KIR-lowering contracts;
* changing required lineage.

Breaking changes require:

* canonical AST schema-version change;
* migration specifications;
* compiler compatibility diagnostics;
* persisted-cache invalidation;
* fixture updates;
* preserved lineage.

---

## 68. Open Questions

1. Should canonical AST node IDs be stable across normalization reruns?
2. Which canonical nodes require globally durable semantic IDs?
3. Should narrative nodes remain in the canonical AST or a parallel document tree?
4. How should field-level provenance be represented efficiently?
5. Should conflicts be canonical nodes, separate compiler artifacts, or both?
6. How should canonical AST packages span multiple repositories?
7. Should bound and typed ASTs use separate schemas?
8. Which canonical AST state should semantic editors manipulate?
9. How should comments and review annotations attach to canonical nodes?
10. Should canonical AST serialization be JSON, Protobuf, MessagePack, or generated from MSL?
11. How are very large imported systems partitioned into compilation units?
12. How are lazy and deferred nodes represented?
13. Should canonical AST nodes support semantic hashing?
14. How are authority-transition workflows attached to nodes?
15. How should waived conflicts appear in KIR?
16. Can provisional KIR be emitted from partial canonical ASTs?
17. Which diagnostic declarations become KIR elements?
18. How should canonical AST extensions lower into KIR?
19. Should behavior, workflow, policy, and state models remain in MSL core?
20. What is the minimum canonical AST required for self-hosting MSC?
21. How should canonical AST diffs drive impact analysis?
22. How are external identities indexed?
23. Should one semantic element permit several simultaneous lifecycle views?
24. How should historical canonical AST snapshots be stored?
25. Which canonical structures are immutable after approval?

---

## 69. Related Specifications

This specification is extended by:

| ID            | Title                                                        |
| ------------- | ------------------------------------------------------------ |
| MSL-CORE-0009 | `msl-markdown` Concrete Syntax                               |
| MSL-CORE-0010 | Machine Semantics, Types, References, and Language Evolution |

Future specialized series should include:

| Series          | Purpose                                       |
| --------------- | --------------------------------------------- |
| MSL-AST         | Detailed canonical AST node schemas           |
| MSL-TYPE        | Full type and constraint system               |
| MSL-REFERENCE   | Binding, namespaces, packages, and references |
| MSL-CONFORMANCE | Acceptance criteria and verification          |
| MSC-CORE        | Compiler phases over the canonical AST        |
| KIR-CORE        | Typed normalized representation               |
| MKE             | Persistence, graph integration, and querying  |

---

## Status

Draft.

This document defines the source-independent canonical semantic AST consumed by the Monad Specification Compiler.

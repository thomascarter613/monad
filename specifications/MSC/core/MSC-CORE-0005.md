---
id: "MSC-CORE-0005"
title: "Declaration Collection and Symbol Binding"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 5
version: "0.1.0"
status: "draft"
created: "2026-08-05"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "declarations"
  - "symbols"
  - "binding"
  - "symbol-table"
  - "semantic-analysis"
  - "canonical-ast"
  - "compiler"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "ADR-0007"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MSL-CORE-0004"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE-0001"
  - "MSC-CORE-0002"
  - "MSC-CORE-0003"
  - "MSC-CORE-0004"
references:
  - "MART-CORE"
  - "MSG-CORE"
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSC-CORE-0006"
  - "MSC-CORE-0007"
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MSC-SYMBOL"
  - "MSC-NAMESPACE"
  - "MSC-REFERENCE"
  - "MSG-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0005 — Declaration Collection and Symbol Binding

## 1. Purpose

This specification defines how the Monad Specification Compiler identifies declarations in canonical MSL Abstract Syntax Trees, assigns compiler-visible symbols, establishes declaration ownership, records semantic identity claims, constructs symbol indexes, represents incomplete declarations, and detects declaration conflicts.

It establishes:

* declaration recognition;
* declaration inventories;
* declaration identity;
* symbol identity;
* declaration kinds;
* declaration ownership;
* structural and semantic scopes;
* symbol creation;
* symbol tables;
* member symbols;
* anonymous declarations;
* partial declarations;
* declaration fragments;
* declaration merging;
* duplicate detection;
* identity collisions;
* overload and variant sets;
* generated and inferred declarations;
* authority-aware binding;
* lifecycle-aware binding;
* binding states;
* symbol-table snapshots;
* incremental binding;
* binding diagnostics;
* binding conformance.

This specification governs the transformation:

```text
Canonical MSL AST
    ↓
Declaration Collection
    ↓
Declaration Inventory
    ↓
Symbol Creation
    ↓
Symbol Tables and Declaration Indexes
    ↓
Bound Declaration State
```

It does not perform final namespace import resolution, reference resolution, or type analysis.

---

## 2. Context

Canonical MSL ASTs contain common language concepts such as:

* specifications;
* artifacts;
* types;
* fields;
* requirements;
* interfaces;
* operations;
* policies;
* workflows;
* states;
* transitions;
* diagnostics;
* profiles;
* extensions;
* packages;
* modules;
* migrations;
* conformance suites.

Before MSC can resolve references or analyze types, it must determine:

* which nodes declare semantic concepts;
* which identity each declaration claims;
* which compiler symbol represents each declaration;
* which scope owns the declaration;
* whether several declarations are fragments of one concept;
* whether several declarations conflict;
* whether a declaration is complete enough for later analysis;
* whether authority or lifecycle permits its participation.

The canonical AST is organized primarily around authored and normalized structure.

A symbol system reorganizes that structure into compiler-visible semantic entities.

The AST answers:

> Which declarations were expressed?

The declaration index answers:

> Which semantic entities are available for binding?

The symbol table answers:

> Which compiler objects represent those entities in each scope?

These concerns must be resolved before final namespace, import, reference, and type analysis.

---

## 3. Scope

This specification defines:

* declaration discovery;
* declaration descriptors;
* declaration identity claims;
* symbol creation;
* symbol identity;
* symbol kinds;
* scope ownership;
* member ownership;
* declaration fragments;
* partial declarations;
* generated declarations;
* imported declaration placeholders;
* inferred declarations;
* aliases at declaration time;
* duplicate declarations;
* identity collisions;
* compatible declaration merging;
* conflicting declaration preservation;
* overload and variant groups;
* symbol-table construction;
* symbol-table snapshots;
* binding states;
* incremental invalidation;
* authority and lifecycle participation;
* diagnostics;
* conformance.

This specification does not fully define:

* namespace construction;
* import resolution;
* export resolution;
* final reference target selection;
* complete type semantics;
* constraint analysis;
* MSG schemas;
* KIR lowering;
* package-resolution algorithms;
* public compiler APIs.

---

## 4. Non-Goals

This specification does not:

* resolve every reference;
* equate declaration names with semantic identity;
* use source location as canonical declaration identity;
* make symbol IDs externally stable semantic IDs;
* merge declarations solely because their text is similar;
* permit source order to resolve identity conflicts;
* permit provider order to establish precedence;
* grant authority to generated or inferred declarations;
* require one global mutable symbol table;
* require one declaration per AST node;
* require every AST node to produce a symbol;
* collapse conflicting declarations into one arbitrary value;
* define general-purpose function overloading.

---

## 5. Core Principle

> Declarations introduce semantic entities; symbols represent those entities to the compiler.

A declaration may be:

* complete;
* partial;
* fragmented;
* generated;
* inferred;
* provisional;
* conflicting;
* invalid;
* unavailable.

A symbol must preserve that state.

Binding must never invent certainty that the declarations do not support.

---

## 6. Architectural Position

```text
Canonical MSL AST
    ↓
Canonicalization Barrier
    ↓
Declaration Recognition
    ↓
Declaration Descriptors
    ↓
Identity Claim Collection
    ↓
Scope Ownership Assignment
    ↓
Symbol Creation
    ↓
Duplicate and Conflict Analysis
    ↓
Declaration Fragment Composition
    ↓
Symbol-Table Construction
    ↓
Bound Declaration State
    ↓
Namespace, Import, and Reference Resolution
```

---

## 7. Terminology

### 7.1 Declaration

A canonical semantic construct that introduces a concept capable of identity, reference, ownership, membership, or semantic participation.

### 7.2 Declaration Node

A canonical AST node representing all or part of a declaration.

### 7.3 Declaration Descriptor

A compiler record summarizing a declaration before full symbol binding.

### 7.4 Declaration Fragment

One authored, imported, normalized, generated, or migrated contribution to a logical declaration.

### 7.5 Logical Declaration

The semantic declaration produced from one or more compatible declaration fragments.

### 7.6 Symbol

A compiler-visible representation of a declaration or declaration member.

### 7.7 Symbol Identity

The invocation- or snapshot-stable identity of a compiler symbol.

### 7.8 Semantic Identity

The durable identity of the semantic concept represented by the declaration.

### 7.9 Declared Name

The source-visible or author-visible name associated with a declaration.

### 7.10 Scope

A compiler context in which declarations and names participate.

### 7.11 Owner

The declaration, scope, artifact, package, module, or namespace structurally or semantically responsible for another declaration.

### 7.12 Member

A declaration owned by another declaration.

### 7.13 Binding

The association among AST declaration nodes, declaration descriptors, logical declarations, and compiler symbols.

### 7.14 Symbol Table

An index mapping identities, names, kinds, ownership, and scope to compiler symbols.

### 7.15 Declaration Index

A broader compiler index supporting declaration lookup independently from final reference-resolution semantics.

### 7.16 Identity Claim

A declaration's assertion that it represents a specific semantic identity.

### 7.17 Duplicate Declaration

A repeated declaration that is semantically equivalent or composition-compatible under active rules.

### 7.18 Identity Collision

Two or more incompatible declarations claiming the same semantic identity.

### 7.19 Overload Set

A group of declarations intentionally sharing a name while remaining distinguishable by a registered semantic signature.

### 7.20 Variant Set

A group of related declarations representing alternatives under explicit selection or applicability rules.

---

## 8. Declaration Recognition

Declaration recognition examines canonical AST node kinds and registered extensions.

Initial declaration-producing node kinds include:

```text
specification
artifact
namespace
package
module
entity
type
field
value
interface
operation
requirement
invariant
relationship_type
policy
workflow
state_model
state
event
diagnostic
profile
language
extension
migration
conformance_suite
waiver
```

Specialized MSL-family languages may register additional declaration kinds.

Unknown required declaration-producing node kinds must block complete binding.

---

## 9. Declaration Versus Non-Declaration Nodes

Not every canonical node introduces a declaration.

Examples of generally non-declaration nodes include:

* narrative paragraphs;
* source spans;
* literal values;
* anonymous expression nodes;
* comments;
* presentation-only headings;
* diagnostic instances;
* transformation records;
* source maps.

A node may become a declaration only if its language or extension contract defines declaration semantics.

---

## 10. Declaration Descriptor Model

A declaration descriptor conceptually contains:

```text
DeclarationDescriptor

├── descriptor_id
├── canonical_node_id
├── declaration_kind
├── semantic_identity_claim
├── declared_name
├── owner_candidate
├── scope_candidate
├── namespace_candidate
├── declared_type
├── language_origin
├── artifact_origin
├── authority
├── lifecycle
├── visibility_candidate
├── version
├── fragment_kind
├── origin
├── validity
├── source_lineage
├── transformation_lineage
├── annotations
├── extensions
└── diagnostics
```

A descriptor may remain partial.

---

## 11. Declaration Identity

A declaration may have:

* explicit semantic identity;
* inherited identity context;
* generated provisional semantic identity;
* external identity;
* declared name only;
* no durable semantic identity yet.

Durably referenceable declarations require semantic identity before authoritative MSG construction.

Local members may use owner-qualified identities when permitted.

---

## 12. Semantic Identity Sources

Semantic identity may derive from:

* explicit MSL metadata;
* artifact identity;
* registered naming policy;
* parent declaration and member identity;
* package or module identity;
* normalized external identity mapping;
* migration mapping;
* deterministic generation rule;
* authorized identity assignment.

The identity source must remain traceable.

---

## 13. Identity Generation

When a durable identity is required but absent, MSC may:

* report a missing-identity diagnostic;
* assign a provisional semantic identity;
* invoke a registered deterministic identity rule;
* request user or governance assignment;
* defer declaration participation;
* mark the declaration nonreferenceable.

Generated semantic identity must preserve:

* generating rule;
* rule version;
* inputs;
* scope;
* provisional or durable status;
* authority.

---

## 14. Provisional Semantic Identity

A provisional semantic identity allows continued partial compilation.

It must:

* remain distinguishable from approved durable identity;
* avoid collision where practical;
* preserve generating context;
* block outputs requiring durable identity;
* be replaceable through explicit identity resolution.

A provisional semantic identity must not be published as stable external identity without authorization.

---

## 15. Symbol Identity

Every compiler symbol must have symbol identity.

Symbol identity may be:

* invocation-stable;
* compilation-snapshot-stable;
* cache-stable;
* implementation-local.

Symbol identity must remain distinct from semantic identity.

Several symbols may temporarily relate to one claimed semantic identity while a collision is unresolved.

---

## 16. Stable Symbol Identity

Stable symbol identity supports:

* incremental compilation;
* editor references;
* diagnostic continuity;
* cache reuse;
* semantic diffs.

A stable symbol ID may derive from:

* semantic identity;
* declaration kind;
* owner identity;
* declaration-fragment identity;
* compilation-unit identity;
* symbol-schema version.

It must not depend on nondeterministic traversal order.

---

## 17. Symbol Model

A symbol conceptually contains:

```text
Symbol

├── symbol_id
├── semantic_identity
├── symbol_kind
├── declaration_kind
├── declared_name
├── owner_symbol
├── scope_id
├── namespace_id
├── declaration_fragments
├── authority
├── lifecycle
├── visibility
├── version
├── origin
├── validity
├── binding_state
├── type_state
├── conflict_state
├── annotations
├── provenance
└── diagnostics
```

---

## 18. Symbol Kinds

Initial symbol kinds include:

```text
artifact_symbol
specification_symbol
namespace_symbol
package_symbol
module_symbol
entity_symbol
type_symbol
field_symbol
value_symbol
interface_symbol
operation_symbol
requirement_symbol
invariant_symbol
relationship_type_symbol
policy_symbol
workflow_symbol
state_model_symbol
state_symbol
event_symbol
diagnostic_symbol
profile_symbol
language_symbol
extension_symbol
migration_symbol
conformance_symbol
alias_symbol
placeholder_symbol
conflict_symbol
```

A symbol kind is a compiler classification.

It does not replace declaration type or artifact type.

---

## 19. Declaration Inventory

Declaration collection produces a declaration inventory containing:

* descriptors;
* identity claims;
* name claims;
* owner candidates;
* scope candidates;
* fragment group candidates;
* duplicates;
* collisions;
* anonymous declarations;
* generated declarations;
* invalid declarations;
* unsupported declarations.

The inventory exists before final symbol-table construction.

---

## 20. Structural Ownership

Structural ownership follows canonical AST containment or explicit document composition.

Examples:

* specification owns requirement section;
* interface owns operation declarations;
* record type owns fields;
* state model owns states;
* workflow owns steps.

Structural ownership does not automatically imply semantic namespace ownership.

---

## 21. Semantic Ownership

Semantic ownership defines the declaring concept responsible for another declaration.

Examples:

```text
RecordType
    semantically_owns
Field

Interface
    semantically_owns
Operation

StateModel
    semantically_owns
State
```

Semantic ownership may differ from physical or document containment.

---

## 22. Artifact Ownership

Every declaration must remain traceable to one or more artifact origins.

A declaration may be:

* declared by one primary artifact;
* supplemented by another artifact;
* generated from a transformation artifact;
* migrated from an earlier artifact;
* normalized from an external artifact.

Artifact origin does not automatically determine semantic owner.

---

## 23. Scope Candidates

Declaration collection may identify preliminary scopes such as:

* compilation unit;
* artifact;
* specification;
* package;
* module;
* namespace;
* declaration member;
* embedded language region;
* local expression scope.

Final namespace and import resolution occur later.

---

## 24. Root Declarations

Root declarations include declarations not semantically owned by another declaration in the same compilation unit.

Examples:

* specification;
* package;
* module;
* top-level namespace;
* standalone type artifact;
* standalone policy artifact.

A unit may have several roots if its composition model permits them.

---

## 25. Member Declarations

Member declarations are owned by another declaration.

Examples:

* fields;
* operations;
* states;
* transitions with identity;
* workflow steps with identity;
* policy rules where independently referenceable.

A member's semantic identity may be owner-qualified.

---

## 26. Anonymous Declarations

Some declarations may lack a declared name.

Examples:

* anonymous constrained type;
* inline record;
* generated transition;
* local policy rule;
* anonymous conformance case.

Anonymous declarations still require compiler-visible node and symbol identity.

They receive durable semantic identity only when independently referenceable or governed.

---

## 27. Declaration Fragments

A logical declaration may be composed from several fragments.

Examples:

* primary specification plus supplementary machine semantics;
* type declaration plus documentation fragment;
* partial declaration across modules;
* generated constraints supplementing an authored type;
* migration fragment preserving historical aliases.

Every fragment must preserve its own:

* artifact origin;
* AST node;
* authority;
* lifecycle;
* version;
* provenance;
* contribution kind.

---

## 28. Fragment Kinds

Initial fragment kinds include:

```text
primary
supplementary
extension
augmentation
generated
inferred
migrated
observed
documentation
conformance
override_candidate
```

A fragment kind does not determine precedence alone.

---

## 29. Primary Declaration Fragment

A logical declaration should normally have one primary fragment.

Multiple primary fragments claiming one identity produce:

* a compatible co-declaration under an explicit rule;
* a declared partial declaration;
* an overload or variant group;
* or an identity collision.

The compiler must not choose a primary fragment by source order.

---

## 30. Partial Declarations

A language or extension may permit a declaration to be split across artifacts.

A partial-declaration contract must define:

* permitted declaration kinds;
* required shared identity;
* member merge behavior;
* metadata merge behavior;
* authority behavior;
* lifecycle behavior;
* version compatibility;
* conflict rules;
* completeness conditions.

Partial declarations are not inferred merely because names match.

---

## 31. Declaration Augmentation

Augmentation adds permitted information to an existing declaration.

Examples:

* documentation;
* examples;
* additional conformance evidence;
* registered extension metadata;
* supplementary constraints;
* implementation links.

Augmentation must not silently replace protected fields.

---

## 32. Protected Declaration Fields

Protected declaration fields include:

* semantic identity;
* declaration kind;
* authority;
* lifecycle;
* canonical namespace ownership;
* primary artifact origin;
* version lineage;
* provenance;
* protected type identity.

Protected fields require explicit merge or governance rules.

---

## 33. Merge Strategies

Field- or member-level declaration composition may use:

```text
reject
require_equal
select_by_authority
append
ordered_append
union
intersection
merge_by_identity
preserve_parallel
construct_conflict
replace_by_explicit_override
```

Merge strategy must be declared by the language, extension, field schema, or profile.

---

## 34. Declaration Compatibility

Fragments may compose when they are compatible in:

* semantic identity;
* declaration kind;
* owner;
* namespace;
* language version;
* artifact version;
* authority;
* lifecycle;
* member schema;
* extension requirements.

Compatibility must be deterministic.

---

## 35. Duplicate Declarations

A duplicate declaration may represent:

* repeated identical source;
* multiple representations of one declaration;
* generated mirror;
* imported copy;
* redundant compatible fragment.

Deduplication requires identity and provenance evidence.

Content similarity alone is insufficient for authoritative declarations.

---

## 36. Duplicate Handling

Duplicate handling may:

* collapse equivalent representation duplicates;
* preserve all physical representations;
* select one canonical fragment under declared rules;
* record equivalent fragments;
* emit a warning;
* retain provenance from all duplicates.

Deduplication must not erase artifact lineage.

---

## 37. Identity Collisions

An identity collision occurs when incompatible declarations claim the same semantic identity.

Collision causes may include:

* copied specifications;
* registry mismatch;
* conflicting imports;
* stale generated artifacts;
* manual identity reuse;
* migration error;
* malicious identity spoofing.

MSC must preserve every claimant.

---

## 38. Collision Representation

A collision record conceptually contains:

```text
DeclarationIdentityCollision

├── collision_id
├── claimed_semantic_identity
├── declaration_descriptors
├── claimant_artifacts
├── declaration_kinds
├── authorities
├── lifecycles
├── versions
├── fingerprints
├── overlapping_scopes
├── compatibility_analysis
├── resolution_state
├── provenance
└── diagnostics
```

---

## 39. Collision Resolution

Collision resolution may require:

* explicit precedence;
* identity migration;
* alias declaration;
* supersession;
* artifact withdrawal;
* version separation;
* namespace correction;
* governance decision.

MSC must not resolve collisions through:

* file ordering;
* provider ordering;
* response timing;
* lexical path;
* newest timestamp alone;
* probabilistic similarity alone.

---

## 40. Name Collisions

Several declarations may share the same declared name while having distinct semantic identities.

A name collision is not necessarily an identity collision.

Name collisions become relevant during namespace and reference resolution.

Declaration collection must preserve all name claims.

---

## 41. Overload Sets

An overload set is permitted only when a language contract defines:

* eligible declaration kinds;
* shared name behavior;
* distinguishing signature;
* applicability rules;
* ambiguity diagnostics;
* reference-selection rules.

Overload sets must not be invented for arbitrary conflicting declarations.

---

## 42. Variant Sets

A variant set groups alternatives selected by:

* profile;
* platform;
* environment;
* version;
* feature;
* applicability condition;
* target backend.

Each variant retains distinct identity or registered variant identity.

Variant selection occurs during later analysis.

---

## 43. Generated Declarations

Generated declarations may be produced by:

* deterministic defaults;
* schema expansion;
* normalization;
* migration;
* compiler synthesis;
* language desugaring.

Generated declarations must preserve:

* generator;
* rule;
* inputs;
* generated authority;
* regeneration policy;
* stable identity rule;
* provenance.

---

## 44. Synthesized Compiler Symbols

MSC may create symbols with no direct declaration node.

Examples:

* implicit namespace roots;
* generated package roots;
* error symbols;
* unresolved placeholders;
* overload-group symbols;
* collision symbols;
* synthetic members.

Synthetic symbols must be explicitly marked.

---

## 45. Inferred Declarations

Inferred declarations represent semantic proposals derived from evidence.

Examples:

* candidate requirement inferred from implementation;
* candidate type inferred from data;
* candidate relationship inferred from imports.

Inferred declarations must remain:

* provisional or inferred in authority;
* evidence-linked;
* distinguishable from authored declarations;
* subject to adoption.

---

## 46. Observed Declarations

Observed declarations describe existing structure or behavior.

Examples:

* observed API operation;
* observed source-code type;
* observed deployment resource;
* observed runtime endpoint.

Observed declarations do not automatically represent intended or approved semantics.

---

## 47. Imported Declarations

Imported declarations may originate from:

* another MSL package;
* external schema;
* registry artifact;
* prior semantic graph;
* MKE.

Declaration collection may create imported symbol placeholders before final import resolution.

Imported status must preserve external identity and source artifact.

---

## 48. Placeholder Symbols

Placeholder symbols permit partial compilation where a declaration is known to exist but is unavailable.

A placeholder may contain:

* expected semantic identity;
* expected kind;
* expected owner or namespace;
* dependency reference;
* availability state;
* required status;
* provenance.

A placeholder is not a resolved declaration.

---

## 49. Error Symbols

An error symbol permits analysis to continue after declaration failure.

It must preserve:

* failed declaration;
* diagnostic;
* expected symbol kind;
* scope;
* source lineage.

An error symbol must not become authoritative MSG or KIR output.

---

## 50. Symbol Tables

MSC may maintain several symbol tables or indexes.

Conceptual tables include:

```text
global semantic identity index
artifact declaration index
namespace symbol table
package symbol table
module symbol table
member symbol table
name index
kind index
external identity index
conflict index
placeholder index
```

The architecture does not require one monolithic table.

---

## 51. Global Semantic Identity Index

The global semantic identity index maps claimed semantic identities to:

* one compatible logical declaration;
* several unresolved claimants;
* a collision record;
* an unavailable placeholder.

It must not discard duplicate or conflicting claimants.

---

## 52. Name Index

The name index maps names to declaration candidates within scope contexts.

It preserves:

* exact spelling;
* canonicalized name where applicable;
* aliases;
* declaration kind;
* owner;
* namespace candidate;
* language origin;
* visibility candidate.

Final name resolution occurs in `MSC-CORE-0006`.

---

## 53. Member Index

The member index maps owner symbols to member symbols.

It supports:

* fields of types;
* operations of interfaces;
* states of state models;
* steps of workflows;
* rules of policies;
* members added through compatible augmentation.

Member ordering is preserved only where semantically meaningful.

---

## 54. External Identity Index

The external identity index maps external identifiers to declaration candidates.

Examples:

* OpenAPI operation IDs;
* Git object identities;
* source-code fully qualified names;
* Terraform addresses;
* external registry IDs.

External identity does not replace canonical semantic identity.

---

## 55. Symbol Table Snapshots

A symbol-table snapshot is an immutable or fingerprinted view used by downstream phases.

It contains:

* symbol schema version;
* compilation-unit identity;
* symbols;
* ownership;
* indexes;
* collisions;
* placeholders;
* diagnostics;
* input fingerprints;
* pass versions;
* provenance.

Downstream phases should consume a stable snapshot.

---

## 56. Mutable Construction and Immutable Consumption

Implementations may use mutable structures while collecting declarations.

Before dependent phases execute, MSC should freeze or fingerprint the symbol state.

This prevents concurrent mutation from changing reference-resolution outcomes.

---

## 57. Binding States

Initial declaration-binding states include:

```text
uncollected
collected
descriptor_valid
identity_pending
symbol_created
partially_bound
bound
duplicate
conflicting
placeholder
invalid
blocked
```

Binding state remains distinct from type state and reference state.

---

## 58. Declaration Completeness

Declaration completeness may include dimensions such as:

```text
identity
kind
ownership
namespace
members
metadata
authority
lifecycle
version
provenance
```

Possible states:

```text
unknown
complete
partial
invalid
deferred
blocked
```

A declaration may be symbol-bound while still semantically incomplete.

---

## 59. Binding Barrier

Before namespace and reference resolution, the binding barrier requires:

* all recognized declaration nodes collected;
* declaration descriptors validated;
* compiler symbol IDs assigned;
* semantic identity claims indexed;
* owner relationships represented;
* duplicates and collisions preserved;
* fragment groups constructed where permitted;
* placeholders explicit;
* unsupported required declaration kinds identified;
* binding snapshot fingerprinted.

---

## 60. Authority-Aware Binding

Authority affects declaration participation but not basic visibility of evidence.

Examples:

* approved declaration may be authoritative;
* inferred declaration remains candidate;
* deprecated declaration remains resolvable with warnings;
* withdrawn declaration may remain historical;
* generated declaration may be machine-derived.

Authority must not be used to erase lower-authority competing claims.

---

## 61. Lifecycle-Aware Binding

Lifecycle states may affect:

* active participation;
* default resolution preference;
* deprecation warnings;
* historical availability;
* supersession redirects;
* backend eligibility.

Declaration collection preserves lifecycle.

Final applicability is analyzed later.

---

## 62. Version-Aware Declaration Collection

Declarations may coexist across artifact or package versions.

The index must preserve:

* version domain;
* version;
* compatibility;
* package context;
* artifact context.

Different versions do not automatically collide if their scopes or package instances remain distinct.

---

## 63. Language-Origin Binding

Every declaration preserves its originating language.

Language origin informs:

* declaration-kind interpretation;
* member rules;
* overload contracts;
* type semantics;
* reference contracts;
* diagnostics.

Cross-language declarations enter shared indexes through registered integration contracts.

---

## 64. Extension Declarations

Extensions may define new declaration and symbol kinds.

An extension must provide:

* declaration recognition rules;
* descriptor schema;
* identity rules;
* ownership rules;
* merge rules;
* symbol kind;
* namespace behavior;
* reference contracts;
* type integration;
* MSG lowering;
* diagnostics;
* conformance fixtures.

Unknown required extensions block complete binding.

---

## 65. Deterministic Collection

Equivalent:

* canonical AST;
* compilation-unit snapshot;
* language registry;
* extension registry;
* profile;
* pass versions;

must produce equivalent declaration inventories and symbol snapshots.

AST traversal order must not determine semantic precedence.

---

## 66. Stable Ordering

Where stable output ordering is needed, MSC should order by declared keys such as:

1. canonical semantic identity;
2. declaration kind;
3. owner semantic identity;
4. artifact identity;
5. source location;
6. fragment identity.

Stable ordering supports serialization and diagnostics.

It must not imply semantic precedence unless declared.

---

## 67. Incremental Declaration Collection

Incremental collection should identify:

* added declaration nodes;
* removed declarations;
* changed identity claims;
* changed owners;
* changed declaration kinds;
* changed fragments;
* changed authority;
* changed lifecycle;
* changed extension semantics.

Only affected descriptors, symbols, indexes, and dependent phases should be invalidated where safe.

---

## 68. Symbol Invalidation

A symbol must be invalidated when relevant changes affect:

* semantic identity;
* declaration kind;
* owner;
* namespace candidate;
* member structure;
* authority;
* lifecycle;
* version;
* fragment composition;
* extension interpretation.

Presentation-only changes should not invalidate symbols when semantic equivalence is proven.

---

## 69. Identity Change

Changing semantic identity creates a semantic change.

MSC must record:

```text
old semantic identity
    changed_to
new semantic identity
```

when an explicit migration or rename relationship exists.

Otherwise the change may appear as removal plus addition.

---

## 70. Declaration Removal

Removing a declaration may affect:

* identity index;
* name index;
* owner members;
* references;
* type results;
* MSG nodes;
* KIR outputs;
* generated artifacts.

Removal invalidation propagates through semantic dependencies.

---

## 71. Declaration Movement

Moving a declaration between files does not necessarily change semantic identity.

Moving it between:

* owners;
* namespaces;
* packages;
* modules;
* versions;

may change semantics even when its name remains unchanged.

---

## 72. Binding Cache

Binding caches may store:

* declaration inventory;
* descriptors;
* fragment groups;
* symbol records;
* ownership graph;
* identity index;
* name index;
* collision records;
* diagnostics.

Cache validity depends on canonical AST, registry, profile, extension, and pass fingerprints.

---

## 73. Binding Provenance

Every symbol must remain traceable to:

* logical declaration;
* declaration fragments;
* canonical AST nodes;
* normalization or direct-authoring lineage;
* artifact origins;
* source representations.

Synthetic symbols must identify the compiler rule that created them.

---

## 74. Binding Diagnostics

Binding diagnostics are structured artifacts associated with:

* declaration descriptor;
* symbol;
* identity claim;
* fragment group;
* collision;
* owner;
* scope;
* source location.

Diagnostics must distinguish compiler binding errors from source syntax errors.

---

## 75. Explanation Support

MSC should explain:

* why a node was treated as a declaration;
* how semantic identity was determined;
* why a symbol ID was assigned;
* which fragments compose one declaration;
* why fragments failed to merge;
* why a collision exists;
* why a declaration is partial;
* why a placeholder was created;
* why a declaration is inactive or historical;
* which artifacts contributed to a symbol.

---

## 76. Declaration Collection Passes

The compiler may decompose binding into passes such as:

```text
recognize declarations
build declaration descriptors
collect identity claims
assign owner candidates
construct fragment groups
create symbols
build indexes
detect duplicates
construct identity collisions
validate binding barrier
```

Pass dependencies must remain explicit.

---

## 77. Declaration Table

A declaration table is a normalized compiler artifact containing declaration descriptors and logical declarations.

It is distinct from:

* canonical AST;
* symbol table;
* namespace graph;
* MSG.

The declaration table answers:

> Which declarations exist and how are their fragments composed?

---

## 78. Symbol Graph

The symbol system may be represented as a graph of:

* owner relationships;
* membership;
* aliases;
* fragments;
* conflicts;
* placeholders;
* variants;
* overload groups.

This compiler-internal symbol graph remains distinct from the final MSG.

---

## 79. Symbol Table Versus MSG

The symbol table is optimized for compiler lookup and binding.

MSG is optimized for durable resolved semantic meaning and querying.

Not every compiler symbol becomes a durable MSG node.

Examples that may remain compiler-internal:

* error symbol;
* overload-group symbol;
* temporary placeholder;
* synthetic scope symbol;
* collision helper symbol.

---

## 80. Declaration Promotion to Artifact

Some declarations may become first-class MART artifacts.

Promotion may be appropriate when a declaration has:

* durable identity;
* independent lifecycle;
* independent authority;
* independent version;
* external references;
* publication;
* ownership;
* governance.

Not every field or anonymous node must become an artifact.

MART specifications will define promotion rules.

---

## 81. Security Considerations

Declaration binding is vulnerable to:

* identity spoofing;
* namespace squatting;
* malicious fragment augmentation;
* generated-artifact laundering;
* authority escalation;
* lifecycle forgery;
* collision suppression;
* alias manipulation;
* declaration explosion;
* crafted ownership cycles;
* cache poisoning.

MSC must preserve all claimants and validate protected fields.

---

## 82. Ownership Cycles

Structural or semantic ownership cycles are invalid unless a language contract explicitly defines recursive containment semantics.

Examples of invalid ownership:

```text
Type A owns Type B
Type B owns Type A
```

Semantic references may be cyclic.

Ownership must remain acyclic under ordinary declaration composition.

---

## 83. Declaration Count Limits

Resource policies may limit:

* declarations per artifact;
* fragments per declaration;
* members per declaration;
* collision claimants;
* nesting depth;
* generated declarations.

Exceeding limits produces structured diagnostics rather than uncontrolled resource use.

---

## 84. Symbol Conformance

Symbol conformance evaluates:

* stable symbol identity;
* semantic identity preservation;
* declaration-kind correctness;
* owner correctness;
* fragment composition;
* collision preservation;
* authority and lifecycle preservation;
* deterministic indexes;
* source lineage;
* cache behavior;
* incremental invalidation.

---

## 85. Normative Requirements

### MSC-BIND-REQ-001

MSC **MUST** recognize declarations through registered canonical node, language, and extension contracts.

### MSC-BIND-REQ-002

Unknown required declaration-producing node kinds **MUST** block complete binding.

### MSC-BIND-REQ-003

Every recognized declaration node **MUST** produce a declaration descriptor or an explicit invalid-declaration record.

### MSC-BIND-REQ-004

Every declaration descriptor **MUST** preserve canonical-node and artifact lineage.

### MSC-BIND-REQ-005

Every compiler-visible declaration **MUST** receive compiler-visible symbol identity or an explicit invalid or deferred state.

### MSC-BIND-REQ-006

Symbol identity **MUST** remain distinct from semantic identity.

### MSC-BIND-REQ-007

Source path, source location, and declared name **MUST NOT** serve automatically as canonical semantic identity.

### MSC-BIND-REQ-008

Durably referenceable declarations **MUST** have durable or explicitly provisional semantic identity before authoritative semantic-graph construction.

### MSC-BIND-REQ-009

Generated semantic identity **MUST** preserve the identity rule, version, inputs, scope, authority, and provisional status.

### MSC-BIND-REQ-010

Provisional semantic identity **MUST NOT** be represented as approved durable identity.

### MSC-BIND-REQ-011

Every symbol **MUST** preserve declaration kind, owner, scope, authority, lifecycle, origin, validity, and provenance.

### MSC-BIND-REQ-012

Declaration collection **MUST** preserve structural ownership and semantic ownership as distinct relations.

### MSC-BIND-REQ-013

Artifact origin **MUST** remain distinct from semantic ownership.

### MSC-BIND-REQ-014

Every member declaration **MUST** identify or deterministically derive its owner candidate.

### MSC-BIND-REQ-015

Anonymous declarations **MUST** retain compiler-visible node and symbol identity.

### MSC-BIND-REQ-016

Anonymous declarations **MUST NOT** receive externally durable semantic identity unless required by registered language or governance rules.

### MSC-BIND-REQ-017

Declaration fragments **MUST** preserve independent artifact, source, authority, lifecycle, version, and provenance information.

### MSC-BIND-REQ-018

Partial declarations **MUST** be permitted only through an explicit language or extension contract.

### MSC-BIND-REQ-019

Partial declaration composition **MUST** define field, member, authority, lifecycle, version, conflict, and completeness behavior.

### MSC-BIND-REQ-020

Fragments **MUST NOT** be merged solely because their declared names match.

### MSC-BIND-REQ-021

Protected declaration fields **MUST NOT** be overwritten silently during composition.

### MSC-BIND-REQ-022

Declaration merge behavior **MUST** use registered field- and member-specific strategies.

### MSC-BIND-REQ-023

Duplicate handling **MUST** preserve all artifact and representation provenance.

### MSC-BIND-REQ-024

Probabilistic similarity **MUST NOT** silently merge authoritative declarations.

### MSC-BIND-REQ-025

Distinct incompatible declarations claiming one semantic identity **MUST** produce an identity-collision record.

### MSC-BIND-REQ-026

Identity collisions **MUST** preserve all claimants, artifacts, versions, authorities, lifecycles, fingerprints, and provenance.

### MSC-BIND-REQ-027

Identity collisions **MUST NOT** be resolved through source order, provider order, response timing, lexical path, or timestamp alone.

### MSC-BIND-REQ-028

Name collisions **MUST** remain distinguishable from semantic identity collisions.

### MSC-BIND-REQ-029

Overload sets **MUST** exist only under an explicit language contract defining distinguishing semantics.

### MSC-BIND-REQ-030

Variant sets **MUST** preserve each alternative and its applicability conditions.

### MSC-BIND-REQ-031

Generated declarations **MUST** preserve generator identity, rule, inputs, authority, regeneration policy, and provenance.

### MSC-BIND-REQ-032

Inferred declarations **MUST** remain provisional or inferred until adopted.

### MSC-BIND-REQ-033

Observed declarations **MUST NOT** be treated automatically as intended normative declarations.

### MSC-BIND-REQ-034

Imported declaration placeholders **MUST** remain distinguishable from resolved imported declarations.

### MSC-BIND-REQ-035

Placeholder symbols **MUST NOT** satisfy outputs requiring resolved declarations.

### MSC-BIND-REQ-036

Error symbols **MUST NOT** become successful authoritative MSG or KIR semantics.

### MSC-BIND-REQ-037

The global semantic identity index **MUST** preserve duplicate, conflicting, unavailable, and placeholder states.

### MSC-BIND-REQ-038

Name indexes **MUST** preserve all materially distinct candidates for later namespace and reference resolution.

### MSC-BIND-REQ-039

External identity indexes **MUST** preserve the distinction between external and canonical semantic identity.

### MSC-BIND-REQ-040

Symbol-table snapshots **MUST** identify schema, compilation unit, inputs, pass versions, indexes, conflicts, diagnostics, and provenance.

### MSC-BIND-REQ-041

Downstream resolution phases **MUST** consume a frozen, immutable, or completely fingerprinted symbol snapshot.

### MSC-BIND-REQ-042

Binding state **MUST** remain distinct from reference-resolution, type, lifecycle, and semantic-validity state.

### MSC-BIND-REQ-043

Binding-barrier success **MUST** require collection of all recognized declarations and explicit preservation of incomplete, unsupported, duplicate, and conflicting states.

### MSC-BIND-REQ-044

Authority-aware binding **MUST NOT** erase lower-authority competing declarations.

### MSC-BIND-REQ-045

Lifecycle-aware binding **MUST** preserve historical, deprecated, superseded, withdrawn, and inactive declarations where applicable.

### MSC-BIND-REQ-046

Declaration versions **MUST** remain scoped to their applicable version domain and package or artifact context.

### MSC-BIND-REQ-047

Equivalent deterministic inputs **MUST** produce semantically equivalent declaration inventories and symbol snapshots.

### MSC-BIND-REQ-048

AST traversal order and concurrent completion order **MUST NOT** establish semantic precedence.

### MSC-BIND-REQ-049

Incremental binding **MUST** invalidate symbols and indexes affected by changes to identity, kind, ownership, namespace candidate, fragments, authority, lifecycle, version, or extension interpretation.

### MSC-BIND-REQ-050

Every symbol **MUST** remain traceable to declaration fragments, canonical AST nodes, artifact origins, and source representations.

### MSC-BIND-REQ-051

Synthetic symbols **MUST** identify the compiler rule that created them.

### MSC-BIND-REQ-052

Ownership cycles **MUST** be rejected unless a registered language contract explicitly defines them.

### MSC-BIND-REQ-053

Untrusted declaration and extension inputs **MUST** be subject to identity, ownership, authority, lifecycle, and resource validation.

### MSC-BIND-REQ-054

Declaration collection and binding diagnostics **MUST** identify the relevant descriptor, symbol, identity claim, fragment, owner, artifact, and source location where available.

### MSC-BIND-REQ-055

Compiler explanations **MUST** be derivable for declaration recognition, identity assignment, fragment composition, symbol creation, duplicate handling, and conflict construction.

---

## 86. Conceptual Model

```text
Canonical MSL AST
        │
        ▼
Declaration Recognizer
├── core declaration kinds
├── language declaration kinds
└── extension declaration kinds
        │
        ▼
Declaration Inventory
├── descriptors
├── identity claims
├── names
├── owner candidates
├── scope candidates
├── fragments
└── invalid declarations
        │
        ▼
Fragment Composer
├── primary fragments
├── supplementary fragments
├── partial declarations
├── augmentations
├── duplicates
└── conflicts
        │
        ▼
Symbol Builder
├── symbol identities
├── semantic identities
├── owners
├── members
├── placeholders
├── error symbols
├── variant sets
└── overload sets
        │
        ▼
Compiler Indexes
├── semantic identity index
├── name index
├── member index
├── external identity index
├── conflict index
└── placeholder index
        │
        ▼
Bound Declaration Snapshot
        │
        ▼
Namespace and Reference Resolution
```

---

## 87. Machine Specification

```yaml
machine_spec:
  kind: declaration_collection_and_symbol_binding

  declaration_descriptor:
    required:
      - descriptor_id
      - canonical_node_id
      - declaration_kind
      - artifact_origin
      - authority
      - lifecycle
      - origin
      - validity
      - source_lineage
      - transformation_lineage

    conditional:
      - semantic_identity_claim
      - declared_name
      - owner_candidate
      - scope_candidate
      - namespace_candidate
      - declared_type
      - language_origin
      - version
      - fragment_kind
      - extensions
      - diagnostics

  core_declaration_kinds:
    - specification
    - artifact
    - namespace
    - package
    - module
    - entity
    - type
    - field
    - value
    - interface
    - operation
    - requirement
    - invariant
    - relationship_type
    - policy
    - workflow
    - state_model
    - state
    - event
    - diagnostic
    - profile
    - language
    - extension
    - migration
    - conformance_suite
    - waiver

  fragment_kinds:
    - primary
    - supplementary
    - extension
    - augmentation
    - generated
    - inferred
    - migrated
    - observed
    - documentation
    - conformance
    - override_candidate

  symbol_kinds:
    - artifact_symbol
    - specification_symbol
    - namespace_symbol
    - package_symbol
    - module_symbol
    - entity_symbol
    - type_symbol
    - field_symbol
    - value_symbol
    - interface_symbol
    - operation_symbol
    - requirement_symbol
    - invariant_symbol
    - relationship_type_symbol
    - policy_symbol
    - workflow_symbol
    - state_model_symbol
    - state_symbol
    - event_symbol
    - diagnostic_symbol
    - profile_symbol
    - language_symbol
    - extension_symbol
    - migration_symbol
    - conformance_symbol
    - alias_symbol
    - placeholder_symbol
    - conflict_symbol

  merge_strategies:
    - reject
    - require_equal
    - select_by_authority
    - append
    - ordered_append
    - union
    - intersection
    - merge_by_identity
    - preserve_parallel
    - construct_conflict
    - replace_by_explicit_override

  binding_states:
    - uncollected
    - collected
    - descriptor_valid
    - identity_pending
    - symbol_created
    - partially_bound
    - bound
    - duplicate
    - conflicting
    - placeholder
    - invalid
    - blocked

  completeness_dimensions:
    - identity
    - kind
    - ownership
    - namespace
    - members
    - metadata
    - authority
    - lifecycle
    - version
    - provenance

  completeness_states:
    - unknown
    - complete
    - partial
    - invalid
    - deferred
    - blocked

  required_indexes:
    - semantic_identity_index
    - name_index
    - member_index
    - external_identity_index
    - conflict_index
    - placeholder_index

  binding_pipeline:
    - recognize_declarations
    - build_declaration_descriptors
    - collect_identity_claims
    - assign_owner_candidates
    - assign_scope_candidates
    - construct_fragment_groups
    - compose_compatible_fragments
    - create_symbols
    - build_indexes
    - detect_duplicates
    - construct_identity_collisions
    - validate_binding_barrier
    - freeze_symbol_snapshot
```

---

## 88. Invariants

```yaml
invariants:
  - id: MSC-BIND-INV-001
    expression: compiler_symbol.symbol_id != null
    description: Every compiler symbol has compiler-visible identity.

  - id: MSC-BIND-INV-002
    expression: symbol_id != semantic_identity
    description: Compiler representation and durable semantic identity remain distinct.

  - id: MSC-BIND-INV-003
    expression: source_path.defines_semantic_identity == false
    description: Storage location does not define declaration identity.

  - id: MSC-BIND-INV-004
    expression: declaration_fragment.provenance != null
    description: Every fragment remains independently traceable.

  - id: MSC-BIND-INV-005
    expression: partial_declaration.explicit_contract != null
    description: Split declarations require language-defined composition.

  - id: MSC-BIND-INV-006
    expression: merge.protected_field_silent_overwrite == false
    description: Identity and governance fields cannot be replaced implicitly.

  - id: MSC-BIND-INV-007
    expression: identity_collision.claimants.count >= 2
    description: Collision records preserve competing declarations.

  - id: MSC-BIND-INV-008
    expression: identity_collision.arbitrary_winner == false
    description: Discovery or execution order cannot resolve identity.

  - id: MSC-BIND-INV-009
    expression: name_collision.implies_identity_collision == false
    description: Shared names and shared identities remain distinct conditions.

  - id: MSC-BIND-INV-010
    expression: inferred_declaration.authority not_in [normative, machine_normative]
    description: Inference remains nonauthoritative until adoption.

  - id: MSC-BIND-INV-011
    expression: observed_declaration.implies_intended_semantics == false
    description: Existing behavior does not establish intent.

  - id: MSC-BIND-INV-012
    expression: placeholder_symbol.is_resolved == false
    description: Placeholders cannot masquerade as declarations.

  - id: MSC-BIND-INV-013
    expression: error_symbol.successful_msg_output == false
    description: Binding recovery cannot become valid knowledge.

  - id: MSC-BIND-INV-014
    expression: downstream_resolution.symbol_snapshot_frozen == true
    description: Reference analysis consumes stable binding state.

  - id: MSC-BIND-INV-015
    expression: authority_filter.erases_competing_claim == false
    description: Governance does not remove evidence.

  - id: MSC-BIND-INV-016
    expression: ast_traversal_order.affects_precedence == false
    description: Traversal sequence has no semantic authority.

  - id: MSC-BIND-INV-017
    expression: symbol.lineage_complete == true
    description: Symbols remain traceable through all declaration layers.

  - id: MSC-BIND-INV-018
    expression: semantic_ownership.cycle == false
    description: Ordinary declaration ownership remains acyclic.
```

---

## 89. Diagnostics

### MSC0401 — Unknown Declaration Kind

A canonical node claims to introduce a declaration kind unsupported by the active language or extensions.

### MSC0402 — Declaration Descriptor Invalid

A declaration descriptor lacks required kind, origin, authority, lifecycle, validity, or provenance information.

### MSC0403 — Declaration Identity Missing

A durably referenceable declaration lacks semantic identity.

### MSC0404 — Provisional Identity Required

MSC assigned or requires a provisional semantic identity because durable identity is unavailable.

### MSC0405 — Identity Generation Rule Missing

A declaration requires generated identity, but no compatible identity rule is active.

### MSC0406 — Identity Generation Nondeterministic

Equivalent declaration inputs produced inconsistent generated identities.

### MSC0407 — Symbol Identity Missing

A collected declaration could not receive compiler-visible symbol identity.

### MSC0408 — Declaration Owner Missing

A member declaration lacks a valid owner candidate.

### MSC0409 — Declaration Owner Invalid

The selected owner cannot contain or govern the declaration kind.

### MSC0410 — Declaration Ownership Cycle

Structural or semantic declaration ownership forms an unsupported cycle.

### MSC0411 — Partial Declaration Contract Missing

Several fragments claim one declaration without an active partial-declaration contract.

### MSC0412 — Partial Declaration Incompatible

Declaration fragments are incompatible in identity, kind, owner, version, authority, lifecycle, schema, or language.

### MSC0413 — Primary Declaration Fragment Ambiguous

Several fragments claim primary status without a deterministic composition rule.

### MSC0414 — Protected Declaration Field Conflict

Fragments disagree about identity, kind, authority, lifecycle, ownership, provenance, or another protected field.

### MSC0415 — Declaration Merge Rule Missing

No merge strategy applies to a field or member contributed by several fragments.

### MSC0416 — Duplicate Declaration Detected

Several equivalent or redundant declarations were discovered.

### MSC0417 — Duplicate Declaration Unresolved

MSC cannot determine whether declarations are compatible duplicates or independent declarations.

### MSC0418 — Semantic Identity Collision

Incompatible declarations claim the same semantic identity.

### MSC0419 — Name Collision

Several declarations share a name in a preliminary scope.

### MSC0420 — Invalid Overload Set

Declarations share a name but no language contract permits overloading.

### MSC0421 — Variant Set Incomplete

A variant group lacks selection, identity, applicability, or compatibility information.

### MSC0422 — Generated Declaration Lineage Missing

A generated declaration lacks generator, rule, inputs, authority, or regeneration information.

### MSC0423 — Inferred Declaration Authority Invalid

An inferred declaration claims unsupported normative authority.

### MSC0424 — Observed Declaration Misclassified

Observed structure or behavior is represented as approved intended semantics.

### MSC0425 — Imported Declaration Placeholder

A required imported declaration remains unavailable and is represented only by a placeholder.

### MSC0426 — Placeholder Used as Resolved Declaration

A downstream operation treated a placeholder symbol as a resolved semantic declaration.

### MSC0427 — Error Symbol Escaped Binding

A compiler recovery symbol reached a representation requiring valid semantics.

### MSC0428 — Symbol Index Inconsistent

Symbol indexes disagree about identity, owner, name, kind, or membership.

### MSC0429 — Symbol Snapshot Incomplete

The binding snapshot omits required symbols, collisions, placeholders, indexes, fingerprints, diagnostics, or provenance.

### MSC0430 — Symbol Snapshot Mutated

A downstream phase observed undeclared mutation of a frozen binding snapshot.

### MSC0431 — Authority Conflict During Binding

Fragments or declarations claim incompatible authority without a merge or conflict rule.

### MSC0432 — Lifecycle Conflict During Binding

Fragments or declarations claim incompatible lifecycle states.

### MSC0433 — Version Context Missing

A versioned declaration lacks its version domain, package, artifact, or module context.

### MSC0434 — Extension Declaration Unsupported

A required extension declaration cannot be recognized or represented.

### MSC0435 — Binding Cache Stale

A cached declaration or symbol result is incompatible with current canonical AST, registry, profile, extension, or pass state.

### MSC0436 — Binding Invalidation Incomplete

A changed declaration did not invalidate affected symbols or indexes.

### MSC0437 — Ownership Depth Limit Exceeded

Declaration ownership or membership exceeds configured limits.

### MSC0438 — Declaration Count Limit Exceeded

The compiler exceeded configured declaration, fragment, member, or collision limits.

### MSC0439 — Binding Barrier Failed

The declaration and symbol state is not ready for namespace and reference resolution.

### MSC0440 — Binding Explanation Unavailable

MSC cannot explain declaration recognition, identity assignment, fragment composition, symbol creation, or conflict construction.

---

## 90. Acceptance Criteria

This specification is satisfied when:

1. canonical declarations are recognized through registered language contracts;
2. declaration descriptors preserve semantic and artifact lineage;
3. declaration, logical declaration, and symbol are distinct concepts;
4. symbol identity and semantic identity remain distinct;
5. identity sources and generated identity rules are explicit;
6. provisional identity supports partial compilation without claiming durability;
7. structural, semantic, and artifact ownership remain distinct;
8. anonymous declarations remain compiler-identifiable;
9. declaration fragments and partial declarations are represented;
10. partial declaration composition requires an explicit contract;
11. protected fields cannot be overwritten silently;
12. merge strategies are field- and member-specific;
13. duplicates and identity collisions remain distinct;
14. identity collisions preserve all claimants;
15. name collisions do not automatically imply identity collisions;
16. overload and variant sets require explicit language semantics;
17. generated, inferred, observed, imported, placeholder, and error declarations remain distinguishable;
18. symbol tables and declaration indexes have defined roles;
19. symbol snapshots support deterministic downstream analysis;
20. binding and declaration completeness are multidimensional;
21. authority and lifecycle remain visible without erasing competing evidence;
22. version contexts remain explicit;
23. incremental binding invalidates affected symbols and indexes;
24. symbol lineage remains complete;
25. ownership cycles and resource exhaustion are controlled;
26. binding diagnostics and explanations are structured;
27. later namespace, reference, type, MSG, and KIR work can build on a stable bound-declaration contract.

---

## 91. Conformance Examples

### 91.1 Valid Declaration Symbol

Canonical declaration:

```yaml
canonical_node:
  node_id: canon-type-001
  kind: type
  semantic_id: monad::ArtifactId
  authority: normative
  lifecycle: draft
```

Bound symbol:

```yaml
symbol:
  symbol_id: symbol:monad::ArtifactId:type
  semantic_identity: monad::ArtifactId
  symbol_kind: type_symbol
  declaration_kind: type
  binding_state: bound
  declaration_fragments:
    - canon-type-001
```

### 91.2 Invalid Path-Derived Identity

```yaml
declaration:
  semantic_identity: specifications/MSL/type/types.md:42
```

Expected diagnostic:

```text
MSC0403: source path and location cannot serve as durable semantic identity
```

### 91.3 Valid Partial Type Declaration

Primary fragment:

```yaml
fragment:
  semantic_identity: monad::Artifact
  kind: type
  fragment_kind: primary
```

Supplementary fragment:

```yaml
fragment:
  semantic_identity: monad::Artifact
  kind: type
  fragment_kind: documentation
```

The language contract permits documentation augmentation.

### 91.4 Invalid Name-Based Merge

Two declarations are named `Artifact` but have different semantic identities and owners.

MSC merges them because their names match.

Expected diagnostic:

```text
MSC0412: declarations cannot be composed solely by matching declared names
```

### 91.5 Valid Identity Collision

```yaml
collision:
  claimed_semantic_identity: monad::Artifact

  claimants:
    - declaration: artifact-type-v1
      artifact: MART-CORE-0001
      authority: normative

    - declaration: imported-artifact-type
      artifact: EXTERNAL-SCHEMA-001
      authority: provisional
```

No claimant is discarded.

### 91.6 Invalid Provider-Order Precedence

The filesystem declaration loads before the registry declaration and is selected automatically.

Expected diagnostic:

```text
MSC0418: provider or traversal order cannot resolve a semantic identity collision
```

### 91.7 Valid Placeholder Symbol

```yaml
symbol:
  symbol_id: placeholder:MSL-TYPE-0001
  semantic_identity: MSL-TYPE-0001
  symbol_kind: placeholder_symbol
  binding_state: placeholder
  expected_kind: specification
  required: true
```

The compiler may continue partially but cannot treat the placeholder as resolved.

### 91.8 Invalid Placeholder Use

A type reference resolves to a placeholder and KIR emission proceeds as though the type definition were available.

Expected diagnostic:

```text
MSC0426: placeholder symbol cannot satisfy a resolved declaration requirement
```

### 91.9 Valid Generated Declaration

```yaml
declaration:
  semantic_identity: monad::Artifact.version
  origin: generated
  authority: machine_normative

  generation:
    rule: artifact-core-default-members
    rule_version: 0.1.0
    inputs:
      - monad::Artifact
```

The generating rule is deterministic and authorized.

### 91.10 Invalid Inferred Normative Declaration

```yaml
declaration:
  semantic_identity: AUTH-REQ-001
  kind: requirement
  origin: inferred
  authority: normative
```

No adoption evidence exists.

Expected diagnostic:

```text
MSC0423: inferred declaration cannot claim normative authority without adoption
```

### 91.11 Valid Name Collision

Two modules declare types named `Config`:

```text
monad.compiler::Config
monad.backend::Config
```

This is not an identity collision.

Later namespace resolution determines which unqualified reference is valid.

### 91.12 Invalid Symbol Snapshot Mutation

Reference resolution begins, then an extension inserts another symbol into the active frozen table.

Expected diagnostic:

```text
MSC0430: symbol snapshot changed after the binding barrier
```

---

## 92. Security and Trust Considerations

Declaration collection is a critical semantic trust boundary.

Threats include:

* canonical identity spoofing;
* package or namespace squatting;
* malicious declaration augmentation;
* hidden protected-field replacement;
* generated-content laundering;
* observed behavior promoted to intent;
* collision suppression;
* cache substitution;
* ownership-cycle denial of service;
* declaration explosion;
* extension symbol injection;
* semantic-name confusion.

Implementations should:

* validate every identity claim;
* preserve all claimants;
* separate names from identities;
* enforce partial-declaration contracts;
* protect identity, authority, lifecycle, ownership, and provenance fields;
* constrain generated and inferred declarations;
* freeze symbol snapshots;
* limit declaration and fragment counts;
* validate extension contracts;
* fingerprint symbol indexes;
* preserve complete artifact and transformation lineage.

---

## 93. Evolution and Compatibility

The declaration and symbol architecture may evolve through:

* specialized symbol-table protocols;
* persistent symbol indexes;
* distributed package symbols;
* richer partial declarations;
* language-specific overload systems;
* symbolic query APIs;
* compiler-server snapshots;
* MART artifact promotion.

Compatible changes may add optional symbol metadata or nonbreaking indexes.

Breaking changes include:

* changing symbol identity rules;
* changing declaration recognition;
* changing partial-declaration composition;
* changing protected fields;
* changing collision semantics;
* changing ownership semantics;
* changing binding-barrier invariants.

Breaking changes require:

* MSC version updates;
* symbol-schema migration;
* binding-cache invalidation;
* conformance-fixture updates;
* downstream MSG and KIR compatibility analysis.

---

## 94. Open Questions

1. What exact data structure should the initial symbol table use?
2. Should symbol IDs be content-addressed, semantic-ID-derived, or assigned by the compiler?
3. Which declarations require durable semantic identity during bootstrap?
4. Should requirements always become symbols?
5. Should acceptance criteria become declarations or members?
6. Which internal document elements should become MART artifacts?
7. How should partial declarations be represented in MSL syntax?
8. Should one declaration permit several primary fragments under explicit co-ownership?
9. What authority rules govern machine-generated declaration members?
10. How should declaration variants interact with profiles?
11. Which declaration kinds permit overloading?
12. How should imported symbols be represented before package resolution?
13. Should the declaration table be serializable as a public compiler artifact?
14. Which indexes should persist between compiler runs?
15. How should symbol snapshots be shared with editor services?
16. How should identity migrations preserve symbol stability?
17. What is the minimum symbol schema for the first MSC implementation?
18. Should external identities be indexed globally or by authority?
19. How should extension-defined symbol kinds be sandboxed?
20. Which binding diagnostics should be stable public API?
21. Should lower-authority duplicates always remain visible to users?
22. Can one declaration have several simultaneous lifecycle views?
23. Should inactive declarations enter the active symbol table or a historical index?
24. How should declaration ownership differ from MSG containment?
25. Which binding invariants should be implemented first?

---

## 95. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

Future companion series should include:

| Series        | Purpose                                                       |
| ------------- | ------------------------------------------------------------- |
| MSC-SYMBOL    | Detailed symbol schemas, tables, indexes, snapshots, and APIs |
| MSC-DECL      | Declaration composition and augmentation                      |
| MSC-NAMESPACE | Namespace and scope graphs                                    |
| MSC-REFERENCE | Reference binding and resolution                              |
| MART-CORE     | Artifact promotion, identity, lineage, and ownership          |
| MSG-CORE      | Durable resolved semantic entities and relationships          |
| KIR-CORE      | Lowered symbol and declaration representations                |
| MSL-TYPE      | Type declaration and member semantics                         |
| MSL-PACKAGE   | Package, module, import, and export declarations              |

---

## Status

Draft.

This document defines how MSC converts canonical MSL declarations into stable, traceable, authority-aware compiler symbols and declaration indexes suitable for namespace, reference, type, and semantic-graph analysis.

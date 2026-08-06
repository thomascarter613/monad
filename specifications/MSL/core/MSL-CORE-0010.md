---
id: "MSL-CORE-0010"
title: "Core Semantic Integration, Types, References, and Evolution"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 10
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "semantic-integration"
  - "type-system"
  - "references"
  - "namespaces"
  - "language-evolution"
  - "compatibility"
  - "foundational"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0006"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSL-DOCUMENT"
  - "MSL-TYPE"
  - "MSL-EXPR"
  - "MSL-CONSTRAINT"
  - "MSL-POLICY"
  - "MSL-WORKFLOW"
  - "MSL-STATE"
  - "MSL-QUERY"
  - "MSL-PATTERN"
  - "MSL-TRANSFORM"
  - "MSL-PACKAGE"
  - "MSL-FRONTEND"
  - "MSL-CONFORMANCE"
  - "MSC-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0010 — Core Semantic Integration, Types, References, and Evolution

## 1. Purpose

This specification completes the initial MSL core by defining the shared semantic integration rules used across the MSL language platform.

It establishes the foundational model for:

* common semantic integration;
* core value and type categories;
* type identity;
* type compatibility;
* unknown and deferred types;
* references;
* namespaces;
* symbols;
* imports and exports;
* cross-language linking;
* semantic profiles;
* feature negotiation;
* extension integration;
* language and schema versioning;
* compatibility;
* deprecation;
* migration;
* evolution;
* bootstrap stability;
* self-hosting readiness.

This specification does not attempt to define the complete Type Language, Expression Language, reference linker, package system, or migration language.

Instead, it defines the core contracts those specialized specifications must preserve.

---

## 2. Context

The preceding MSL core specifications established:

* MSL as a language for engineering knowledge;
* the specification document model;
* normative requirement semantics;
* metadata and identity;
* multi-surface frontend architecture;
* AST boundaries;
* surface normalization;
* the canonical MSL AST;
* document and embedded-language composition.

The remaining foundational question is:

> How do independently authored and independently versioned language units become one coherent semantic system?

The MSL platform must integrate declarations originating from:

* different source formats;
* different MSL-family languages;
* different files;
* different packages;
* different repositories;
* different lifecycle states;
* different authority levels;
* different language versions;
* different normalization mappings;
* different compiler phases.

Without shared integration rules, the composable-language architecture would fragment into unrelated DSLs.

This document defines the common semantic contract binding them together.

---

## 3. Scope

This specification defines:

* semantic integration stages;
* declarations and symbols;
* type categories;
* type identity;
* type references;
* type compatibility;
* unknown, invalid, and deferred types;
* values;
* references;
* namespaces;
* imports;
* exports;
* visibility;
* cross-language linking;
* semantic profiles;
* feature negotiation;
* extension integration;
* language versions;
* AST and schema versions;
* compatibility classes;
* deprecation;
* migration;
* language evolution;
* self-hosting constraints.

This specification does not fully define:

* complete type grammar;
* generic type semantics;
* expression evaluation;
* constraint evaluation;
* package resolution;
* dependency-solving algorithms;
* migration syntax;
* KIR representation;
* binary compatibility;
* remote registry protocols;
* source-code language interoperation.

---

## 4. Non-Goals

This document does not:

* define one complete universal type system;
* require every embedded language to expose all types;
* permit unrestricted implicit conversion;
* define a general-purpose linker;
* equate name resolution with semantic validity;
* guarantee compatibility across all future language versions;
* require remote registries;
* make deprecated semantics disappear;
* allow extensions to redefine protected core concepts;
* claim MSL 1.0 stability during bootstrap.

---

## 5. Core Principle

> Independent language units may compose only through explicit identity, type, reference, authority, lifecycle, and compatibility contracts.

A declaration is not integrated merely because its name appears elsewhere.

A reference must be resolved.

A type must be compatible.

Authority and lifecycle must permit use.

Language and extension versions must be supported.

The complete integration decision must remain traceable.

---

## 6. Architectural Position

```text
Surface Inputs
    ↓
Surface ASTs
    ↓
Normalization
    ↓
Canonical MSL AST
    ↓
Declaration Registration
    ↓
Namespace Construction
    ↓
Import and Export Resolution
    ↓
Symbol Binding
    ↓
Reference Resolution
    ↓
Type Analysis
    ↓
Constraint and Authority Validation
    ↓
Compatibility Analysis
    ↓
KIR Emission
```

These stages may be incremental and partially interleaved, but their semantic responsibilities remain distinct.

---

## 7. Terminology

### 7.1 Declaration

A canonical semantic node that introduces a named or durably identifiable concept.

### 7.2 Symbol

A compiler-visible entry representing a declaration within a semantic scope.

### 7.3 Binding

The association of a declaration or reference with a symbol.

### 7.4 Reference

A semantic attempt to identify another declaration, artifact, value, type, member, or module.

### 7.5 Namespace

A semantic scope used to organize and resolve names and identities.

### 7.6 Import

A declaration making external semantics available within a scope.

### 7.7 Export

A declaration making local semantics available outside a scope.

### 7.8 Visibility

Rules determining where a declaration may be referenced.

### 7.9 Type

A semantic classification constraining the valid structure, values, operations, and relationships of a concept.

### 7.10 Type Identity

The stable semantic identity of a type declaration.

### 7.11 Type Expression

A reference to or composition of one or more types.

### 7.12 Type Compatibility

A determination that a value or declaration of one type may be used where another type is expected.

### 7.13 Assignability

A directional compatibility relation from a source type to a target type.

### 7.14 Equivalence

A relation indicating that two types represent the same semantic type under the active rules.

### 7.15 Unknown Type

A type not yet determined.

### 7.16 Error Type

A compiler-internal type used to continue analysis after a type failure.

### 7.17 Deferred Type

A type whose resolution is intentionally postponed.

### 7.18 Semantic Profile

A named collection of language features, rules, strictness levels, and conformance expectations.

### 7.19 Language Feature

A versioned semantic capability that may be required, optional, experimental, or disabled.

### 7.20 Compatibility

The ability of two language, schema, AST, extension, package, or semantic versions to interoperate under declared rules.

### 7.21 Migration

A traceable transformation from one semantic version or representation to another.

---

## 8. Shared Semantic Foundation

Every MSL-family language must integrate with the following core concepts:

* canonical identity;
* namespace;
* declaration;
* symbol;
* reference;
* type where applicable;
* authority;
* lifecycle;
* provenance;
* source lineage;
* diagnostics;
* version;
* feature declaration;
* extension namespace;
* compatibility;
* KIR lowering.

A specialized language may add semantic concepts.

It must not bypass the shared foundation when participating in cross-language composition.

---

## 9. Declaration Model

A declaration conceptually contains:

```text
Declaration

├── node_id
├── semantic_id
├── name
├── namespace
├── declaration_kind
├── declared_type
├── authority
├── lifecycle
├── visibility
├── version
├── members
├── annotations
├── provenance
├── source_lineage
└── extension_data
```

Not every declaration requires a human-readable name.

Durably referenceable declarations require stable semantic identity.

---

## 10. Declaration Categories

Initial declaration categories include:

* specification;
* namespace;
* artifact;
* entity;
* type;
* value;
* field;
* interface;
* operation;
* requirement;
* invariant;
* relationship type;
* policy;
* workflow;
* state model;
* state;
* event;
* diagnostic;
* profile;
* language;
* extension;
* package;
* module;
* migration;
* conformance suite.

Specialized languages may add categories through registered extensions.

---

## 11. Symbol Registration

Declarations create symbols during semantic binding.

A symbol record should preserve:

* symbol identity;
* declaration identity;
* canonical namespace;
* declaration kind;
* language origin;
* lifecycle;
* authority;
* visibility;
* version;
* source;
* type state;
* conflict state.

Duplicate names do not necessarily imply duplicate identity.

Duplicate canonical identities do imply a conflict within overlapping resolution scope.

---

## 12. Symbol Tables

A compiler may organize symbols through:

* lexical scopes;
* namespace scopes;
* module scopes;
* package scopes;
* artifact scopes;
* workspace registries;
* imported registries.

The implementation may use one or several symbol-table structures.

Resolution behavior must remain deterministic under equivalent semantic context.

---

## 13. Symbol States

Initial symbol states include:

```text
declared
partial
bound
conflicting
deprecated
superseded
unavailable
invalid
```

A symbol may exist before all of its type, reference, lifecycle, or authority information is resolved.

---

## 14. Core Type Model

The MSL platform defines a minimal shared type foundation.

Specialized type semantics belong to `MSL-TYPE`.

Initial core type categories are:

```text
Type

├── any
├── never
├── unknown
├── error
├── null
├── boolean
├── integer
├── decimal
├── string
├── identifier
├── date
├── timestamp
├── duration
├── enumeration
├── record
├── collection
├── set
├── map
├── tuple
├── union
├── intersection
├── optional
├── reference
├── constrained
├── semantic
└── extension
```

These categories establish integration points.

They do not fully define concrete syntax or all behaviors.

---

## 15. `any`

`any` represents a value accepted without useful static restriction.

Its use should be limited because it weakens validation.

`any` must not silently erase provenance, authority, or lifecycle rules.

---

## 16. `never`

`never` represents the absence of valid values.

It may be used for:

* impossible states;
* prohibited results;
* unreachable branches;
* empty compatibility intersections.

---

## 17. `unknown`

`unknown` represents a value whose type has not yet been established.

A value of type `unknown` cannot be used as a more specific type without narrowing, validation, or an explicit permitted conversion.

`unknown` is preferable to `any` for incomplete specifications because it preserves uncertainty.

---

## 18. `error`

`error` represents a type-analysis failure.

It allows the compiler to continue producing related diagnostics without treating the invalid value as valid.

An `error` type must not be emitted as successful normative KIR semantics.

---

## 19. `null` and Optionality

`null` is a value category.

Optionality indicates that a value may be absent.

These are related but not identical concepts.

A language may distinguish:

* missing;
* omitted;
* null;
* unknown;
* defaulted;
* deferred.

The canonical AST must not collapse them silently.

---

## 20. Scalar Types

Initial scalar types include:

* boolean;
* integer;
* decimal;
* string;
* identifier;
* date;
* timestamp;
* duration.

Specialized type specifications must define:

* ranges;
* precision;
* units;
* canonical forms;
* comparison behavior;
* serialization.

---

## 21. Identifier Type

An identifier value represents semantic identity or a validated identity fragment.

Identifier values should retain:

* namespace;
* syntax class;
* canonicalization state;
* resolved or unresolved status;
* target kind where applicable.

A plain string must not automatically be treated as a resolved identifier.

---

## 22. Enumeration Type

An enumeration defines a closed or declared set of named values.

An enumeration must define whether it is:

* closed;
* extensible;
* namespaced;
* versioned;
* ordered;
* case-sensitive.

Unknown enumeration values must not be accepted silently for closed enumerations.

---

## 23. Record Type

A record defines named fields.

Each field may declare:

* field identity;
* name;
* type;
* cardinality;
* required status;
* default;
* constraints;
* visibility;
* lifecycle;
* authority;
* provenance.

Field order is presentation-only unless explicitly declared semantic.

---

## 24. Collection Types

Initial collection types include:

* list;
* set;
* map;
* tuple.

Their semantics differ.

A list is ordered.

A set is unique and generally unordered.

A map associates keys with values.

A tuple has positionally defined members.

The compiler must not treat these categories interchangeably.

---

## 25. Union and Intersection Types

A union permits values conforming to at least one member type.

An intersection requires values to conform to all member types.

Ambiguous union resolution must remain explicit.

An empty intersection normalizes to `never`.

---

## 26. Reference Type

A reference type constrains a reference to a target kind or type.

Examples:

```text
reference<knowledge.specification>
reference<type>
reference<requirement>
reference<API-OP-0001>
```

Reference validity requires both identity resolution and target compatibility.

---

## 27. Constrained Type

A constrained type combines a base type with one or more restrictions.

Examples:

```text
integer where value >= 0
string matching artifact-id pattern
collection with cardinality 1..*
```

Constraint syntax and evaluation belong to specialized language specifications.

The core model requires constraints to preserve identity, authority, provenance, and diagnostics.

---

## 28. Semantic Type

A semantic type identifies a domain meaning beyond structural shape.

Examples:

* artifact ID;
* requirement ID;
* repository path;
* semantic version;
* source URI;
* lifecycle state;
* authority class.

Two semantic types may share the same underlying scalar representation while remaining incompatible without an explicit conversion.

---

## 29. Type Identity

Named types must have stable semantic identity.

Type identity remains distinct from:

* source spelling;
* alias;
* display name;
* structural fingerprint;
* serialization form;
* implementation-language type name.

Aliases may resolve to canonical type identities.

---

## 30. Structural and Nominal Typing

The MSL type system may support both:

### Nominal Compatibility

Types are compatible because of declared identity or inheritance.

### Structural Compatibility

Types are compatible because their required structures are compatible.

The active language or profile must declare which rules apply.

The compiler must not silently switch between nominal and structural interpretation.

---

## 31. Type Equivalence

Two types may be equivalent through:

* identical canonical identity;
* registered alias;
* explicit equivalence declaration;
* compatible normalization;
* structural equivalence under an active structural profile.

Type equivalence must be deterministic.

Probabilistic similarity is not type equivalence.

---

## 32. Assignability

Assignability is directional.

```text
Source Type
    assignable_to
Target Type
```

Potential rules include:

* exact identity;
* subtype relation;
* union membership;
* optional lifting;
* constrained-to-base conversion;
* registered conversion.

Implicit assignability must remain conservative.

---

## 33. Type Narrowing

A value of type `unknown`, union, or broad semantic type may be narrowed through:

* validated condition;
* pattern match;
* discriminator;
* explicit type assertion;
* confirmed reference target;
* constraint proof.

Narrowing evidence must remain traceable when it affects normative semantics.

---

## 34. Type Conversion

Conversions may be:

* identity-preserving;
* lossless;
* checked;
* lossy;
* prohibited.

A lossy conversion must be explicit and produce applicable diagnostics or evidence.

Conversions must not silently alter semantic identity, authority, units, or provenance.

---

## 35. Type Inference

Type inference may derive types from:

* literals;
* declarations;
* referenced symbols;
* field assignments;
* constraints;
* language-region context;
* normalization mappings.

Inferred types must preserve:

* inference source;
* certainty;
* unresolved alternatives;
* diagnostics.

AI-based type suggestions remain provisional until accepted or validated.

---

## 36. Value Model

A canonical value should preserve:

* value category;
* declared type;
* inferred type;
* normalized value;
* original source form;
* units where applicable;
* provenance;
* validity;
* authority;
* default or explicit status.

Formatting differences must not alter normalized value meaning.

---

## 37. Reference Model

A reference conceptually contains:

```text
Reference

├── reference_id
├── original_form
├── reference_kind
├── namespace_context
├── import_context
├── version_constraint
├── expected_target_kind
├── expected_target_type
├── resolution_state
├── candidate_targets
├── selected_target
├── authority
├── lifecycle_constraints
├── source_location
└── provenance
```

---

## 38. Reference Kinds

Initial reference kinds include:

* canonical identity;
* qualified name;
* unqualified name;
* alias;
* relative semantic path;
* external identity;
* package member;
* module member;
* type reference;
* value reference;
* relationship endpoint;
* source artifact;
* language-unit reference.

---

## 39. Reference Resolution Stages

Reference resolution conceptually performs:

```text
Read Original Reference
    ↓
Determine Reference Kind
    ↓
Apply Namespace Context
    ↓
Apply Imports and Aliases
    ↓
Query Local Symbols
    ↓
Query Package Exports
    ↓
Query Workspace Registry
    ↓
Query Permitted External Registries
    ↓
Filter by Version
    ↓
Filter by Kind and Type
    ↓
Validate Visibility
    ↓
Validate Lifecycle
    ↓
Select or Diagnose
```

---

## 40. Resolution Outcomes

Initial outcomes are:

```text
resolved
unresolved
missing
ambiguous
incompatible
invisible
deprecated
superseded
deferred
invalid
```

A deprecated target may still resolve while producing a warning or policy-dependent error.

A superseded target may resolve through compatibility rules or redirect to a replacement.

---

## 41. Namespaces

Namespaces organize canonical identities and names.

A namespace may contain:

* declarations;
* child namespaces;
* imports;
* exports;
* aliases;
* visibility rules;
* default language versions;
* extension activation;
* ownership;
* provenance.

Namespaces are semantic constructs, not merely directories.

---

## 42. Namespace Identity

Every namespace must have stable identity.

A namespace may be represented through:

* symbolic name;
* fully qualified identity;
* package identity;
* workspace identity;
* external authority.

Namespace aliases must resolve deterministically.

---

## 43. Namespace Nesting

Namespaces may be nested.

Conceptual example:

```text
monad
└── msl
    ├── core
    ├── type
    └── constraint
```

Nesting does not require matching filesystem directories.

The compiler may use directory conventions for discovery, but semantic namespace remains explicit.

---

## 44. Namespace Imports

Imports make declarations available within another scope.

An import must preserve:

* source namespace or artifact;
* import mode;
* version constraint;
* alias;
* visibility;
* authority policy;
* lifecycle policy;
* provenance.

Wildcard imports should be discouraged in high-assurance profiles because they make dependencies less explicit.

---

## 45. Exports

Exports define which declarations are available outside a package, module, or namespace.

An export may expose:

* one declaration;
* a declaration set;
* an alias;
* a profile;
* an extension;
* a language unit.

Export does not grant stronger authority than the underlying declaration.

---

## 46. Visibility

Initial visibility categories may include:

```text
private
artifact
module
package
workspace
public
```

Visibility controls semantic accessibility.

It does not replace security enforcement or publication classification.

---

## 47. Aliases

Aliases may apply to:

* namespaces;
* types;
* declarations;
* imports;
* external identities.

Aliases must preserve the canonical target.

Alias cycles and ambiguity must produce diagnostics.

---

## 48. Cross-Language Linking

Cross-language linking permits one MSL-family language to reference declarations from another.

Examples:

```text
Constraint → Type
Workflow → Operation
Policy → Resource
State Transition → Event
Query → Artifact Type
Transformation → Pattern
```

The linker must validate:

* target identity;
* language compatibility;
* target kind;
* type compatibility;
* visibility;
* version;
* lifecycle;
* authority where applicable.

---

## 49. Cross-Language Semantic Contracts

Each language manifest should declare:

* declarations it exports;
* references it may emit;
* target kinds it accepts;
* types it consumes;
* types it produces;
* KIR elements it lowers into;
* dependencies on other languages;
* permitted execution class.

This contract prevents hidden coupling.

---

## 50. Semantic Profiles

A semantic profile defines a coherent set of rules.

Profiles may control:

* strictness;
* permitted languages;
* required language versions;
* implicit conversions;
* unresolved-reference tolerance;
* lifecycle requirements;
* authority requirements;
* extension allowlists;
* compatibility behavior;
* diagnostic severity;
* KIR emission rules.

---

## 51. Initial Profiles

Initial conceptual profiles include:

```text
bootstrap
narrative
structured
normative
machine
executable
strict
migration
reverse_engineering
publication
```

The same source may compile differently under different profiles, but profile selection must remain explicit and traceable.

---

## 52. Profile Inheritance

Profiles may extend other profiles.

Example:

```text
machine
    extends
normative
```

Profile inheritance must be acyclic unless an explicit deterministic composition model exists.

Effective profile rules must remain inspectable.

---

## 53. Feature Declarations

MSL-family languages may expose versioned features.

Examples:

* type unions;
* cross-language imports;
* executable constraints;
* partial compilation;
* effect declarations;
* semantic fingerprints.

Features may be:

```text
required
optional
experimental
deprecated
removed
```

A compilation unit may require or prohibit features.

---

## 54. Feature Negotiation

Before compilation, MSC must compare:

* required source features;
* language support;
* frontend support;
* extension support;
* compiler support;
* profile policy;
* target KIR support.

Unsupported required features block complete compilation.

Unsupported optional informative features may be preserved opaquely under compatible profiles.

---

## 55. Core Extension Model

Extensions may add:

* node kinds;
* metadata fields;
* types;
* constraints;
* diagnostics;
* reference kinds;
* language features;
* KIR lowering rules;
* profiles.

Every extension must define:

* namespace;
* identity;
* version;
* owner;
* compatibility;
* authority behavior;
* lifecycle;
* source and canonical AST schemas;
* KIR integration;
* fallback behavior;
* security class.

---

## 56. Protected Core Semantics

Extensions must not redefine:

* canonical identity;
* namespace identity;
* core authority classes;
* lifecycle meaning;
* provenance requirements;
* source traceability;
* conflict preservation;
* reference-resolution integrity;
* version distinctions;
* KIR lineage requirements.

Extensions may refine behavior only through registered integration points.

---

## 57. Extension Activation

Extensions may be activated through:

* document declaration;
* package manifest;
* repository profile;
* workspace policy;
* language dependency;
* compiler configuration.

Activation must preserve:

* extension identity;
* extension version;
* source of activation;
* authority;
* compatibility;
* trust.

---

## 58. Unknown Extensions

Unknown extensions may be:

* rejected;
* preserved opaquely;
* delegated;
* disabled;
* tolerated as informative.

Unknown required machine-normative extensions must block complete compilation.

Unknown extensions must not be stripped silently when doing so would lose semantics.

---

## 59. Version Domains

MSL uses several distinct version domains:

```text
Artifact Version
MSL Platform Version
Language Version
Concrete Syntax Version
Frontend Version
Parser Version
Surface AST Version
Normalizer Version
Canonical AST Version
Compiler Version
KIR Version
Extension Version
Package Version
Registry Schema Version
Migration Version
```

These version domains must not be conflated.

---

## 60. Artifact Version

Artifact version describes the evolution of one specification or semantic artifact.

It does not define the language semantics used to parse it.

---

## 61. Platform Version

The MSL platform version identifies the shared core integration contract.

A platform version may coordinate compatible ranges of:

* Document Language;
* core metadata;
* canonical AST;
* namespace rules;
* authority semantics;
* lifecycle semantics.

---

## 62. Language Version

Each MSL-family language has an independent language version.

Language-version changes may affect:

* syntax;
* semantics;
* type rules;
* diagnostics;
* AST mappings;
* evaluation.

---

## 63. Schema Versions

ASTs, registries, mappings, and KIR use independent schema versions.

A schema-version change may occur without changing author-facing language semantics.

---

## 64. Version Constraints

References and dependencies may use version constraints.

A constraint must identify its version domain.

Conceptual examples:

```text
language msl.constraint >=0.2.0 <0.3.0
artifact MSL-TYPE-0001 ^1.0.0
canonical_ast 0.1.*
```

A bare version without domain context should be rejected when ambiguity is possible.

---

## 65. Compatibility Classes

Initial compatibility classes are:

```text
compatible
conditionally_compatible
migration_required
incompatible
unknown
```

Compatibility may be directional.

A newer compiler may read an older language version, while an older compiler cannot read the newer version.

---

## 66. Source Compatibility

Source compatibility means existing source remains accepted under a newer compatible language or frontend version.

Source compatibility does not guarantee identical diagnostics or generated presentation.

---

## 67. Semantic Compatibility

Semantic compatibility means the normalized meaning remains equivalent.

A syntax change may preserve semantic compatibility.

A seemingly small syntax change may break semantic compatibility if interpretation changes.

---

## 68. AST Compatibility

AST compatibility determines whether one compiler or tool can consume a serialized AST schema.

AST compatibility is not equivalent to source or semantic compatibility.

---

## 69. KIR Compatibility

KIR compatibility determines whether downstream consumers can process emitted KIR.

The KIR series will define detailed rules.

MSL evolution must identify when semantic changes require new KIR forms.

---

## 70. Backward Compatibility

Backward compatibility means a newer implementation can process artifacts produced for an older supported version.

The implementation must declare the supported range.

---

## 71. Forward Compatibility

Forward compatibility means an older implementation can preserve or partially process newer artifacts.

Forward compatibility may rely on:

* opaque extension preservation;
* optional fields;
* feature negotiation;
* graceful degradation.

Unknown required semantics cannot be considered safely forward compatible.

---

## 72. Deprecation

A language feature, type, field, reference form, or semantic rule may be deprecated.

Deprecation must identify:

* deprecated construct;
* version introduced;
* replacement;
* rationale;
* warning diagnostic;
* earliest removal version;
* migration guidance.

Deprecated constructs remain discoverable.

---

## 73. Removal

Removal means the construct is no longer accepted in the active language version.

Removal requires:

* prior deprecation except for urgent security reasons;
* breaking-version declaration;
* migration path where practical;
* preserved historical documentation;
* compatibility diagnostics.

---

## 74. Supersession

A semantic artifact may be superseded without being removed from history.

Supersession must preserve:

* previous identity;
* replacement identity;
* effective version;
* rationale;
* compatibility;
* migration guidance;
* historical references.

---

## 75. Migration Model

A migration transforms an artifact, source, AST, mapping, package, or semantic representation between versions.

A migration conceptually contains:

```text
Migration

├── migration_id
├── source_version_domain
├── source_version
├── target_version
├── applicability
├── preconditions
├── transformations
├── losses
├── diagnostics
├── validation
├── rollback
├── provenance
└── authority
```

---

## 76. Migration Categories

Initial migration categories include:

* source migration;
* metadata migration;
* identity migration;
* namespace migration;
* surface AST migration;
* canonical AST migration;
* language migration;
* extension migration;
* package migration;
* KIR migration;
* registry migration.

---

## 77. Migration Safety

A migration must not silently lose:

* canonical identity;
* authority;
* lifecycle;
* provenance;
* normative requirements;
* constraints;
* relationships;
* compatibility information.

Lossy migration requires an explicit loss report and applicable authorization.

---

## 78. Idempotence

A migration should be idempotent where practical.

Applying the same completed migration again should not continue altering the artifact.

Non-idempotent migrations must declare that property explicitly.

---

## 79. Reversibility

A migration may be:

```text
reversible
partially_reversible
irreversible
```

Irreversible migrations require stronger review and preserved pre-migration artifacts.

---

## 80. Migration Validation

After migration, the result must be validated under the target:

* language version;
* schema version;
* profile;
* extension set;
* registry context;
* KIR target where applicable.

A successful transformation without target validation is not a successful migration.

---

## 81. Evolution Events

Language evolution should produce first-class events for:

* feature addition;
* feature deprecation;
* feature removal;
* semantic correction;
* grammar change;
* type-system change;
* reference-rule change;
* compatibility change;
* security fix;
* migration publication.

Evolution events must preserve rationale and impact.

---

## 82. Compatibility Matrix

The project should maintain a generated compatibility matrix covering:

* platform versions;
* language versions;
* frontend versions;
* AST versions;
* compiler versions;
* KIR versions;
* extension versions;
* migration availability.

This matrix should eventually be generated from compiled specifications.

---

## 83. Bootstrap Stability

The initial MSL series uses:

```text
language_version: bootstrap
```

`bootstrap` is not a stable semantic-version release.

Bootstrap artifacts may change incompatibly.

Nevertheless, all changes must preserve:

* identity;
* provenance;
* migration history;
* architectural decisions;
* explicit diagnostics.

The project must not use bootstrap status as justification for silent destructive changes.

---

## 84. Pre-1.0 Evolution

Before MSL 1.0:

* breaking changes are permitted;
* migrations should be provided;
* compatibility promises must be explicit;
* deprecated bootstrap forms may be removed;
* architecture invariants from accepted ADRs remain binding unless superseded.

---

## 85. MSL 1.0 Readiness

MSL should not declare version 1.0 until at least:

1. the Document Language is specified;
2. the minimum Type and Constraint Languages are specified;
3. canonical AST schemas are defined;
4. a reference MSC parser and semantic compiler exist;
5. KIR core is defined;
6. conformance fixtures exist;
7. versioning and migration tooling exist;
8. the existing MKE corpus can be migrated;
9. diagnostics are stable enough for tooling;
10. the core series can compile through the reference pipeline;
11. the specification registry can be generated or validated automatically;
12. critical architecture invariants are machine-checkable.

---

## 86. Self-Hosting Readiness

The MSL platform approaches self-hosting when:

* MSL specifications define core MSL constructs;
* those specifications compile into the canonical AST;
* MSC validates the MSL specification corpus;
* KIR schemas derive from compiled specifications;
* conformance fixtures derive from acceptance criteria;
* language manifests are themselves managed as artifacts;
* migrations are specified using Monad-managed knowledge;
* registry records are generated from compiled artifacts.

Self-hosting must remain reproducible from a documented bootstrap toolchain.

---

## 87. Normative Requirements

### MSL-INTEGRATION-REQ-001

All MSL-family languages participating in canonical compilation **MUST** integrate with shared identity, namespace, authority, lifecycle, provenance, diagnostics, and version rules.

### MSL-INTEGRATION-REQ-002

Every durably referenceable declaration **MUST** have stable semantic identity.

### MSL-INTEGRATION-REQ-003

Every compiler-visible declaration **MUST** produce or correspond to a symbol within an applicable semantic scope.

### MSL-INTEGRATION-REQ-004

Symbol identity **MUST** remain distinguishable from declaration, source-node, canonical-node, artifact, and KIR identities.

### MSL-INTEGRATION-REQ-005

Duplicate canonical identities within overlapping resolution scope **MUST** produce a conflict diagnostic.

### MSL-INTEGRATION-REQ-006

The shared core type model **MUST** distinguish `any`, `unknown`, `error`, `never`, and `null`.

### MSL-INTEGRATION-REQ-007

Missing, null, unknown, defaulted, and deferred values **MUST NOT** be collapsed silently.

### MSL-INTEGRATION-REQ-008

Named types **MUST** have stable semantic identity.

### MSL-INTEGRATION-REQ-009

Type identity **MUST** remain distinct from source spelling, alias, display name, and structural shape.

### MSL-INTEGRATION-REQ-010

The active typing mode **MUST** declare whether compatibility is nominal, structural, or hybrid.

### MSL-INTEGRATION-REQ-011

The compiler **MUST NOT** switch silently between nominal and structural compatibility.

### MSL-INTEGRATION-REQ-012

Type assignability **MUST** be treated as directional.

### MSL-INTEGRATION-REQ-013

Lossy type conversions **MUST** be explicit and diagnostic.

### MSL-INTEGRATION-REQ-014

Type inference **MUST** preserve its evidence, state, and unresolved alternatives.

### MSL-INTEGRATION-REQ-015

AI-suggested type inference **MUST** remain provisional until validated or adopted.

### MSL-INTEGRATION-REQ-016

Every semantic reference **MUST** preserve original form, namespace context, expected target kind, and resolution state.

### MSL-INTEGRATION-REQ-017

Reference resolution **MUST** be deterministic under equivalent namespace, import, registry, package, version, and profile context.

### MSL-INTEGRATION-REQ-018

The compiler **MUST NOT** choose silently among materially ambiguous reference targets.

### MSL-INTEGRATION-REQ-019

Reference resolution **MUST** validate target visibility.

### MSL-INTEGRATION-REQ-020

Reference resolution **MUST** validate expected target kind and applicable type compatibility.

### MSL-INTEGRATION-REQ-021

Deprecated and superseded reference targets **MUST** remain historically traceable.

### MSL-INTEGRATION-REQ-022

Namespaces **MUST** have stable semantic identity independent from filesystem structure.

### MSL-INTEGRATION-REQ-023

Imports **MUST** declare target, version domain, version constraint, import mode, visibility, and provenance.

### MSL-INTEGRATION-REQ-024

Exports **MUST NOT** grant stronger authority than the underlying declarations.

### MSL-INTEGRATION-REQ-025

Alias resolution **MUST** preserve canonical target identity.

### MSL-INTEGRATION-REQ-026

Alias cycles and ambiguous aliases **MUST** produce deterministic diagnostics.

### MSL-INTEGRATION-REQ-027

Cross-language references **MUST** satisfy shared identity, visibility, version, lifecycle, and type contracts.

### MSL-INTEGRATION-REQ-028

Each MSL-family language **MUST** declare the semantic kinds it exports and references.

### MSL-INTEGRATION-REQ-029

Semantic profiles **MUST** declare their feature, strictness, unresolved-reference, authority, lifecycle, extension, compatibility, and KIR-emission policies.

### MSL-INTEGRATION-REQ-030

Profile inheritance **MUST** preserve origin and effective rules.

### MSL-INTEGRATION-REQ-031

Unsupported required language features **MUST** block complete compilation.

### MSL-INTEGRATION-REQ-032

Unsupported optional informative features **MAY** be preserved opaquely when permitted by the active profile.

### MSL-INTEGRATION-REQ-033

Extensions **MUST** use stable identity, namespace, version, ownership, compatibility, and security declarations.

### MSL-INTEGRATION-REQ-034

Extensions **MUST NOT** redefine protected core semantics.

### MSL-INTEGRATION-REQ-035

Unknown required machine-normative extensions **MUST** block complete compilation.

### MSL-INTEGRATION-REQ-036

Artifact, platform, language, syntax, frontend, parser, surface AST, normalizer, canonical AST, compiler, KIR, extension, package, registry, and migration versions **MUST** remain distinct.

### MSL-INTEGRATION-REQ-037

Version constraints **MUST** identify their version domain when ambiguity is possible.

### MSL-INTEGRATION-REQ-038

Compatibility determinations **MUST** identify the relevant compatibility domain.

### MSL-INTEGRATION-REQ-039

Deprecated constructs **MUST** identify replacement, rationale, diagnostic, and migration guidance when available.

### MSL-INTEGRATION-REQ-040

Removed constructs **MUST** remain historically documented.

### MSL-INTEGRATION-REQ-041

Semantic migrations **MUST** preserve identity, authority, lifecycle, provenance, requirements, constraints, and relationships unless explicit authorized loss is recorded.

### MSL-INTEGRATION-REQ-042

Lossy migrations **MUST** produce structured loss reports.

### MSL-INTEGRATION-REQ-043

Migration output **MUST** be validated under target semantic rules.

### MSL-INTEGRATION-REQ-044

Irreversible migrations **MUST** preserve pre-migration artifacts or equivalent recovery evidence.

### MSL-INTEGRATION-REQ-045

Compatibility matrices **SHOULD** be generated from versioned language and tooling declarations.

### MSL-INTEGRATION-REQ-046

Bootstrap status **MUST NOT** permit silent destructive semantic changes.

### MSL-INTEGRATION-REQ-047

MSL **MUST NOT** claim stable 1.0 compatibility before its declared readiness criteria are satisfied.

### MSL-INTEGRATION-REQ-048

Self-hosting claims **MUST** identify the complete reproducible bootstrap dependency chain.

### MSL-INTEGRATION-REQ-049

KIR emission **MUST** preserve the semantic integration decisions that determined identity, type, reference, authority, lifecycle, profile, and compatibility.

### MSL-INTEGRATION-REQ-050

Every failed integration decision **MUST** produce or contribute to a traceable diagnostic or unresolved semantic state.

---

## 88. Conceptual Model

```text
MSL Language Units

├── declarations
├── types
├── references
├── namespaces
├── imports
├── exports
├── profiles
├── features
├── extensions
└── versions
        │
        ▼
Semantic Integration

├── symbol registration
├── namespace construction
├── reference resolution
├── type analysis
├── compatibility analysis
├── authority validation
├── lifecycle validation
├── feature negotiation
└── migration handling
        │
        ▼
KIR-Ready Semantic Model
        │
        ▼
KIR
```

---

## 89. Machine Specification

```yaml
machine_spec:
  kind: core_semantic_integration

  declaration:
    required:
      - node_id
      - declaration_kind
      - semantic_identity
      - namespace
      - authority
      - lifecycle
      - provenance

  core_types:
    top_and_bottom:
      - any
      - never
      - unknown
      - error

    scalar:
      - null
      - boolean
      - integer
      - decimal
      - string
      - identifier
      - date
      - timestamp
      - duration

    composite:
      - enumeration
      - record
      - collection
      - set
      - map
      - tuple
      - union
      - intersection
      - optional
      - reference
      - constrained
      - semantic
      - extension

  type_compatibility_modes:
    - nominal
    - structural
    - hybrid

  reference_outcomes:
    - resolved
    - unresolved
    - missing
    - ambiguous
    - incompatible
    - invisible
    - deprecated
    - superseded
    - deferred
    - invalid

  visibility:
    - private
    - artifact
    - module
    - package
    - workspace
    - public

  semantic_profiles:
    - bootstrap
    - narrative
    - structured
    - normative
    - machine
    - executable
    - strict
    - migration
    - reverse_engineering
    - publication

  feature_states:
    - required
    - optional
    - experimental
    - deprecated
    - removed

  compatibility_classes:
    - compatible
    - conditionally_compatible
    - migration_required
    - incompatible
    - unknown

  migration_categories:
    - source
    - metadata
    - identity
    - namespace
    - surface_ast
    - canonical_ast
    - language
    - extension
    - package
    - kir
    - registry

  integration_pipeline:
    - declaration_registration
    - namespace_construction
    - import_resolution
    - export_resolution
    - symbol_binding
    - reference_resolution
    - type_analysis
    - compatibility_analysis
    - authority_validation
    - lifecycle_validation
    - profile_validation
    - feature_negotiation
    - kir_readiness
```

---

## 90. Invariants

```yaml
invariants:
  - id: MSL-INTEGRATION-INV-001
    expression: durable_declaration.semantic_identity != null
    description: Durable declarations have stable semantic identity.

  - id: MSL-INTEGRATION-INV-002
    expression: symbol.identity != declaration.semantic_identity
    description: Compiler symbols and semantic declarations remain distinct concepts.

  - id: MSL-INTEGRATION-INV-003
    expression: unknown != any
    description: Uncertainty is not unrestricted compatibility.

  - id: MSL-INTEGRATION-INV-004
    expression: error_type.successful_kir_emission == false
    description: Type errors do not become valid semantic output.

  - id: MSL-INTEGRATION-INV-005
    expression: missing != null
    description: Absence and explicit null remain distinct.

  - id: MSL-INTEGRATION-INV-006
    expression: type_identity.depends_on_source_spelling == false
    description: Type identity survives aliases and presentation changes.

  - id: MSL-INTEGRATION-INV-007
    expression: assignability.symmetric == false
    description: Assignability is directional unless equivalence is established.

  - id: MSL-INTEGRATION-INV-008
    expression: ambiguous_reference.silently_resolved == false
    description: Ambiguous references remain visible.

  - id: MSL-INTEGRATION-INV-009
    expression: namespace.identity.depends_on_directory == false
    description: Semantic namespaces are independent from filesystem layout.

  - id: MSL-INTEGRATION-INV-010
    expression: export.increases_authority == false
    description: Exporting does not strengthen authority.

  - id: MSL-INTEGRATION-INV-011
    expression: extension.redefines_core_semantics == false
    description: Extensions cannot redefine protected meaning.

  - id: MSL-INTEGRATION-INV-012
    expression: version_domains.conflated == false
    description: Distinct version domains remain explicit.

  - id: MSL-INTEGRATION-INV-013
    expression: lossy_migration.loss_report != null
    description: Migration loss remains explicit.

  - id: MSL-INTEGRATION-INV-014
    expression: migration.output.target_validation == passed
    description: Successful migration includes target validation.

  - id: MSL-INTEGRATION-INV-015
    expression: bootstrap_change.silent_destructive_semantics == false
    description: Bootstrap evolution remains traceable.

  - id: MSL-INTEGRATION-INV-016
    expression: kir_element.integration_lineage != null
    description: KIR preserves semantic integration decisions.
```

---

## 91. Diagnostics

### MSL0901 — Duplicate Semantic Declaration

Multiple declarations claim the same canonical identity within overlapping resolution scope.

### MSL0902 — Symbol Registration Failure

A declaration cannot be entered into the applicable symbol scope.

### MSL0903 — Unknown Core Type

A type expression refers to an unsupported unnamespaced core type.

### MSL0904 — Type Identity Missing

A named type lacks stable semantic identity.

### MSL0905 — Type Compatibility Mode Missing

The active profile does not identify nominal, structural, or hybrid compatibility behavior.

### MSL0906 — Type Mismatch

A source type is not assignable to the required target type.

### MSL0907 — Unsafe Implicit Conversion

A lossy or semantically unsafe conversion was attempted without explicit authorization.

### MSL0908 — Unknown Used as Specific Type

A value of unknown type was used without narrowing or validation.

### MSL0909 — Missing and Null Conflated

The semantic model treats omission and explicit null as equivalent without a declared rule.

### MSL0910 — Type Inference Unresolved

The compiler cannot determine one valid type.

### MSL0911 — AI Type Suggestion Misclassified

An AI-suggested type is represented as authoritative without validation or adoption.

### MSL0912 — Reference Missing

No compatible target exists for the reference.

### MSL0913 — Reference Ambiguous

More than one compatible target remains after resolution filtering.

### MSL0914 — Reference Target Kind Mismatch

The resolved declaration kind is incompatible with the expected target kind.

### MSL0915 — Reference Type Mismatch

The resolved target is not type-compatible with the referring construct.

### MSL0916 — Reference Target Invisible

The target exists but is not visible in the referring scope.

### MSL0917 — Namespace Collision

Two active namespaces claim the same semantic identity.

### MSL0918 — Alias Cycle

Alias resolution forms a cycle.

### MSL0919 — Alias Ambiguous

An alias resolves to more than one canonical target.

### MSL0920 — Import Version Domain Missing

An import version constraint does not identify what is being versioned.

### MSL0921 — Import Version Conflict

No compatible imported version satisfies the active constraints.

### MSL0922 — Export Authority Escalation

An export attempts to represent a declaration with stronger authority.

### MSL0923 — Cross-Language Contract Violation

A language reference violates the target language’s declared integration contract.

### MSL0924 — Profile Inheritance Cycle

Semantic profiles form an unsupported inheritance cycle.

### MSL0925 — Unsupported Required Feature

A required feature is unavailable in the active compiler, language, frontend, extension, profile, or KIR target.

### MSL0926 — Unknown Required Extension

A machine-normative extension cannot be loaded or interpreted.

### MSL0927 — Protected Core Semantic Override

An extension attempts to redefine a protected core concept.

### MSL0928 — Version Domain Confusion

A version from one domain is used as though it belonged to another.

### MSL0929 — Compatibility Unknown

The compiler cannot establish whether the participating versions are compatible.

### MSL0930 — Deprecated Construct

The source uses a deprecated construct.

### MSL0931 — Removed Construct

The active language version no longer supports the construct.

### MSL0932 — Migration Required

The artifact cannot compile under the target version without migration.

### MSL0933 — Migration Identity Loss

A migration failed to preserve canonical identity or its explicit replacement relationship.

### MSL0934 — Migration Authority Loss

A migration failed to preserve authority or adoption history.

### MSL0935 — Migration Provenance Loss

The migrated artifact cannot be traced to its source version.

### MSL0936 — Migration Loss Report Missing

A lossy migration did not declare its losses.

### MSL0937 — Migration Target Validation Failed

The migrated result is invalid under target rules.

### MSL0938 — Irreversible Migration Recovery Missing

An irreversible migration lacks preserved pre-migration evidence.

### MSL0939 — Unstable 1.0 Claim

The language claims stable 1.0 status without satisfying published readiness criteria.

### MSL0940 — Self-Hosting Chain Incomplete

A self-hosting claim omits one or more bootstrap dependencies or reproducibility steps.

---

## 92. Acceptance Criteria

This specification is satisfied when:

1. all MSL-family languages share one semantic integration foundation;
2. declarations and symbols are distinguished;
3. a minimal shared type model is defined;
4. `any`, `unknown`, `error`, `never`, `null`, missing, and deferred states remain distinct;
5. nominal, structural, and hybrid compatibility are explicit;
6. type identity is independent from spelling and structure;
7. assignability is directional;
8. lossy conversions require explicit handling;
9. references preserve complete resolution context and outcomes;
10. namespaces remain independent from filesystem layout;
11. imports, exports, aliases, and visibility are represented;
12. cross-language contracts validate target kinds and types;
13. profiles control strictness, features, authority, lifecycle, extensions, compatibility, and KIR emission;
14. required feature negotiation occurs before complete compilation;
15. extensions cannot redefine protected core semantics;
16. all major version domains remain distinct;
17. compatibility classes and domains are explicit;
18. deprecation, removal, supersession, and migration remain traceable;
19. lossy and irreversible migrations receive stronger controls;
20. bootstrap, 1.0 readiness, and self-hosting criteria are explicit;
21. KIR emission preserves semantic-integration lineage;
22. failed integration produces diagnostics or unresolved states rather than invented meaning.

---

## 93. Conformance Examples

### 93.1 Valid Unknown Type

```yaml
value:
  id: VALUE-001
  type:
    state: unknown
  provenance:
    source: imported-legacy-spec
```

The value remains available for partial analysis but cannot satisfy a specific typed requirement without narrowing.

### 93.2 Invalid `unknown` as `any`

```yaml
value:
  type: unknown
  used_as: approved_security_policy
```

No narrowing or validation exists.

Expected diagnostic:

```text
MSL0908: unknown value cannot be used as a validated security policy
```

### 93.3 Valid Semantic Type

```yaml
type:
  id: MSL-TYPE-ARTIFACT-ID
  kind: semantic
  base: string
  semantic_role: artifact_identifier
```

A plain string is not automatically assignable to this type without validation.

### 93.4 Valid Ambiguous Reference

```yaml
reference:
  original_form: User
  namespace_context: example.auth
  expected_target_kind: type

  resolution:
    state: ambiguous
    candidates:
      - example.auth::User
      - example.shared::User
```

Expected diagnostic:

```text
MSL0913: reference User resolves to multiple compatible type declarations
```

### 93.5 Valid Namespace Import

```yaml
import:
  target: monad::msl::type
  version_domain: artifact
  version: "^0.1.0"
  mode: type_only
  alias: types
  visibility: module
```

### 93.6 Invalid Version-Domain Ambiguity

```yaml
import:
  target: msl.constraint
  version: 0.1.0
```

It is unclear whether `0.1.0` refers to the language, package, or artifact.

Expected diagnostic:

```text
MSL0920: import version constraint must identify its version domain
```

### 93.7 Valid Deprecated Reference

```yaml
reference:
  original_form: OLD-TYPE
  resolution:
    state: deprecated
    selected_target: OLD-TYPE
    replacement: NEW-TYPE
```

The reference remains traceable and produces guidance.

### 93.8 Invalid Export Authority Escalation

Underlying declaration:

```yaml
authority: provisional
```

Export:

```yaml
authority: machine_normative
```

Expected diagnostic:

```text
MSL0922: export cannot increase declaration authority
```

### 93.9 Valid Lossy Migration

```yaml
migration:
  id: MIGRATION-MSL-0001
  source:
    language: bootstrap
  target:
    language: 0.1.0

  reversibility: partially_reversible

  losses:
    - category: source_trivia_loss
      description: Original YAML key ordering is not preserved.

  preserved:
    - canonical_identity
    - normative_requirements
    - authority
    - provenance
```

### 93.10 Invalid Migration Success Claim

The transformation completes, but the migrated artifact fails target reference validation.

Expected diagnostic:

```text
MSL0937: migrated artifact failed validation under target language rules
```

### 93.11 Valid Required Feature Declaration

```yaml
features:
  required:
    - cross_language_references
    - semantic_type_identity

  optional:
    - source_preserving_round_trip
```

Missing required features block complete compilation.

### 93.12 Valid Integration Traceability

```text
KIR Constraint
    derived_from
Typed Canonical Constraint Node
    references
Canonical Type Declaration
    bound_from
Imported Type Symbol
    normalized_from
Type Language Surface AST
    parsed_from
types/domain.mslt
```

---

## 94. Security and Trust Considerations

Semantic integration affects every downstream consumer.

Threats include:

* namespace spoofing;
* dependency confusion;
* malicious aliases;
* type confusion;
* unsafe implicit conversion;
* visibility bypass;
* lifecycle bypass;
* authority escalation;
* extension substitution;
* incompatible package loading;
* migration tampering;
* KIR compatibility forgery;
* self-hosting bootstrap compromise.

Implementations should:

* resolve through trusted registries;
* preserve canonical package and namespace identities;
* validate version domains;
* prefer conservative type compatibility;
* reject ambiguous references;
* enforce visibility;
* preserve lifecycle and authority;
* sandbox extension logic;
* fingerprint migrations;
* validate migration output;
* preserve pre-migration artifacts;
* produce reproducible compatibility reports;
* pin bootstrap toolchain versions;
* avoid accepting self-hosting claims without reproducible evidence.

---

## 95. Evolution and Compatibility

This specification defines the stable conceptual boundaries that later specialized series must refine.

Future work may add:

* generics;
* dependent constraints;
* richer subtyping;
* semantic units;
* package resolution;
* module linking;
* formal feature negotiation;
* typed extension protocols;
* migration DSLs;
* compatibility proofs.

Such additions must preserve the distinction between:

* identity and name;
* unknown and any;
* source and semantics;
* declarations and symbols;
* references and targets;
* artifact and language versions;
* authority and visibility;
* deprecation and deletion;
* migration and mutation;
* AST and KIR.

Any proposal violating these distinctions requires an explicit superseding ADR.

---

## 96. MSL-CORE Completion

The initial MSL-CORE series now consists of:

| ID            | Title                                                       |
| ------------- | ----------------------------------------------------------- |
| MSL-CORE-0001 | Monad Specification Language Vision                         |
| MSL-CORE-0002 | Specification Document Model                                |
| MSL-CORE-0003 | Normative Requirement Language                              |
| MSL-CORE-0004 | Metadata and Identity Model                                 |
| MSL-CORE-0005 | Language and Frontend Architecture                          |
| MSL-CORE-0006 | Abstract Syntax Tree Model                                  |
| MSL-CORE-0007 | Surface ASTs and Normalization Pipeline                     |
| MSL-CORE-0008 | Canonical MSL Abstract Syntax Tree                          |
| MSL-CORE-0009 | Document and Embedded Language Architecture                 |
| MSL-CORE-0010 | Core Semantic Integration, Types, References, and Evolution |

The core series establishes:

* the purpose of MSL;
* the document model;
* normative requirements;
* identity and metadata;
* frontend independence;
* source and canonical AST boundaries;
* normalization;
* composable language architecture;
* semantic integration;
* evolution and compatibility.

---

## 97. Recommended Next Specification Sequence

The next work should proceed in this order:

1. `KIR-CORE` — define the compiler’s normalized target.
2. `MSC-CORE` — define the compiler that transforms canonical MSL AST into KIR.
3. `MSL-DOCUMENT` — define the first concrete host language and `msl-markdown`.
4. `MSL-TYPE` — define the first full specialized semantic language.
5. `MSL-EXPR` — define bounded shared expressions.
6. `MSL-CONSTRAINT` — define executable constraints and invariants.
7. Migrate the existing MKE corpus.
8. Implement the minimum parser, validator, and compiler pipeline.
9. Resume the remaining MKE specification families against the executable specification model.

KIR should precede MSC because a compiler must have a defined target representation.

---

## 98. Related Future Series

| Series          | Purpose                                   |
| --------------- | ----------------------------------------- |
| KIR-CORE        | Normalized typed knowledge representation |
| MSC-CORE        | Specification compiler architecture       |
| MSL-DOCUMENT    | Document Language and `msl-markdown`      |
| MSL-TYPE        | Type declarations and compatibility       |
| MSL-EXPR        | Expression semantics                      |
| MSL-CONSTRAINT  | Constraints and invariants                |
| MSL-POLICY      | Policies and decision rules               |
| MSL-WORKFLOW    | Workflow semantics                        |
| MSL-STATE       | State machines                            |
| MSL-QUERY       | Knowledge query language                  |
| MSL-PATTERN     | Semantic pattern matching                 |
| MSL-TRANSFORM   | Controlled transformations                |
| MSL-PACKAGE     | Modules, packages, and distribution       |
| MSL-FRONTEND    | Frontend protocols                        |
| MSL-CONFORMANCE | Fixtures, verification, and compatibility |

---

## Status

Draft.

This document completes the initial MSL core and defines the shared semantic integration contract for the Monad engineering-language platform.

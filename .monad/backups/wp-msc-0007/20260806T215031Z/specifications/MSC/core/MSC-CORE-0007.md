---
id: "MSC-CORE-0007"
title: "Type, Constraint, and Semantic Analysis"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 7
version: "0.1.0"
status: "draft"
created: "2026-08-05"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "semantic-analysis"
  - "types"
  - "constraints"
  - "invariants"
  - "authority"
  - "lifecycle"
  - "compatibility"
  - "semantic-graphs"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "ADR-0007"
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
  - "MSC-CORE-0005"
  - "MSC-CORE-0006"
references:
  - "MART-CORE"
  - "MSG-CORE"
  - "KIR-CORE"
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MSC-TYPE"
  - "MSC-CONSTRAINT"
  - "MSC-SEMANTIC"
  - "MSL-TYPE"
  - "MSL-EXPR"
  - "MSL-CONSTRAINT"
  - "MSL-POLICY"
  - "MSG-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0007 — Type, Constraint, and Semantic Analysis

## 1. Purpose

This specification defines how the Monad Specification Compiler performs type analysis, constraint binding, invariant analysis, authority validation, lifecycle validation, compatibility analysis, profile evaluation, feature negotiation, semantic conflict analysis, and semantic-completeness determination.

It establishes:

* type references and type expressions;
* declared and inferred types;
* type identities;
* type variables and deferred types;
* nominal, structural, and hybrid typing;
* assignability and equivalence;
* type narrowing;
* conversions;
* semantic types;
* constraint binding;
* constraint targets;
* constraint evaluation classes;
* invariant analysis;
* static and deferred validation;
* authority analysis;
* lifecycle analysis;
* compatibility analysis;
* profile activation;
* feature negotiation;
* semantic conflicts;
* evidence and proof records;
* fixed-point analysis;
* partial semantic state;
* semantic-analysis snapshots;
* incrementality;
* diagnostics;
* conformance.

This specification governs the transformation:

```text
Resolved Declaration and Reference State
    ↓
Type Analysis
    ↓
Constraint and Invariant Analysis
    ↓
Authority and Lifecycle Analysis
    ↓
Compatibility and Profile Analysis
    ↓
Semantic Conflict Construction
    ↓
Analyzed Semantic State
```

The analyzed semantic state becomes the principal input to Monad Semantic Graph construction.

---

## 2. Context

After declaration collection and reference resolution, MSC knows:

* which declarations exist;
* which symbols represent them;
* which namespaces and scopes contain them;
* which imports make them visible;
* which references resolve;
* which references remain ambiguous, missing, deferred, or conflicting.

However, resolved references alone do not establish valid meaning.

MSC must still determine:

* whether values conform to their declared types;
* whether referenced declarations are type-compatible;
* whether constraints are well formed;
* whether invariants can be evaluated;
* whether lifecycle states permit current use;
* whether authority is sufficient;
* whether active profiles permit the construct;
* whether required features exist;
* whether language, schema, extension, and package versions are compatible;
* whether conflicting semantic claims remain;
* whether a semantic element is ready for MSG construction or KIR lowering.

The resolved-reference graph answers:

> Which declaration does this reference identify?

Type analysis answers:

> What semantic kind and value space does the declaration or expression inhabit?

Constraint analysis answers:

> Which conditions govern the declaration, and can they be validated?

Authority and lifecycle analysis answer:

> May this knowledge be treated as applicable and authoritative in this compilation?

Compatibility analysis answers:

> Can all participating versions, languages, schemas, extensions, and profiles interoperate?

Semantic analysis combines these decisions without erasing uncertainty, conflict, or provenance.

---

## 3. Scope

This specification defines:

* type-analysis inputs;
* type descriptors;
* type identities;
* type expressions;
* declared types;
* inferred types;
* unknown, error, and deferred types;
* primitive and composite categories;
* nominal and structural analysis;
* type equivalence;
* assignability;
* narrowing;
* conversions;
* generic and parameterized placeholders at the architectural level;
* constraint descriptors;
* constraint targets;
* constraint binding;
* static evaluation;
* deferred evaluation;
* invariant analysis;
* proof and evidence records;
* authority requirements;
* authority resolution;
* lifecycle requirements;
* lifecycle applicability;
* profile evaluation;
* feature negotiation;
* compatibility domains;
* semantic conflicts;
* fixed-point analysis;
* semantic readiness;
* partial analysis;
* snapshots;
* incrementality;
* diagnostics;
* conformance.

This specification does not fully define:

* the author-facing MSL Type Language;
* concrete expression syntax;
* the complete Constraint Language;
* runtime policy execution;
* theorem proving;
* backend-specific validation;
* KIR constraint encodings;
* MSG schemas;
* package-version solving algorithms;
* complete generic-type semantics.

---

## 4. Non-Goals

This specification does not:

* define one unrestricted universal type system;
* require every MSL-family language to share identical type syntax;
* permit implicit lossy conversion by default;
* treat `unknown` as `any`;
* treat constraint syntax as proof of validity;
* execute effectful constraints during semantic analysis;
* infer normative authority from implementation behavior;
* collapse lifecycle and authority into one status;
* permit profile defaults to erase explicit source declarations;
* resolve semantic conflicts through pass order;
* claim proof where only evaluation evidence exists;
* require complete analysis for every interactive editor operation.

---

## 5. Core Principle

> Semantic analysis determines what declarations and references mean under explicit type, constraint, authority, lifecycle, compatibility, and profile rules.

Semantic analysis must preserve:

* incomplete knowledge;
* uncertainty;
* alternatives;
* evidence;
* conflicts;
* deferred work;
* source lineage;
* transformation lineage.

It must not invent certainty merely to produce a complete graph.

---

## 6. Architectural Position

```text
Bound Declaration Snapshot
    +
Resolved Reference Snapshot
    ↓
Type Environment Construction
    ↓
Type Resolution
    ↓
Assignability and Conversion Analysis
    ↓
Constraint Collection and Binding
    ↓
Invariant Analysis
    ↓
Authority Resolution
    ↓
Lifecycle Applicability
    ↓
Profile and Feature Evaluation
    ↓
Compatibility Analysis
    ↓
Semantic Conflict Construction
    ↓
Semantic Readiness Evaluation
    ↓
Analyzed Semantic Snapshot
    ↓
Monad Semantic Graph Construction
```

---

## 7. Terminology

### 7.1 Type

A semantic classification constraining structure, values, operations, relationships, and compatibility.

### 7.2 Type Identity

The durable semantic identity of a named type.

### 7.3 Type Expression

A canonical representation referring to or composing types.

### 7.4 Type Descriptor

A compiler record representing a type before complete analysis.

### 7.5 Declared Type

A type explicitly assigned by authored or normalized semantics.

### 7.6 Inferred Type

A type derived from literals, assignments, references, constraints, or contextual evidence.

### 7.7 Effective Type

The type selected after declared, inferred, constrained, narrowed, and compatibility rules are applied.

### 7.8 Type Environment

The set of visible types, type variables, aliases, constraints, and compatibility rules governing one analysis context.

### 7.9 Type Variable

A placeholder type requiring later substitution or inference.

### 7.10 Unknown Type

A type not yet determined.

### 7.11 Error Type

A compiler recovery type representing failed analysis.

### 7.12 Deferred Type

A type whose resolution depends on unavailable or later semantic information.

### 7.13 Assignability

A directional relation indicating that a source value may be used where a target type is required.

### 7.14 Equivalence

A relation indicating that two types represent the same effective semantic type under active rules.

### 7.15 Narrowing

The process of refining a broad, union, unknown, or conditional type using validated evidence.

### 7.16 Conversion

A transformation from one type to another.

### 7.17 Constraint

A semantic condition restricting a declaration, value, relationship, state, operation, artifact, or graph.

### 7.18 Invariant

A constraint required to remain true throughout an applicable semantic domain or lifecycle interval.

### 7.19 Constraint Target

The declaration, value, relationship, graph region, or execution subject governed by a constraint.

### 7.20 Static Constraint

A constraint evaluable during compilation.

### 7.21 Deferred Constraint

A valid constraint requiring runtime, backend, environmental, or later compilation information.

### 7.22 Proof Record

Structured evidence that a semantic condition was established through a declared proof-capable process.

### 7.23 Evaluation Record

Structured evidence that a constraint was evaluated under specific inputs and conditions.

### 7.24 Semantic Conflict

A first-class representation of incompatible semantic claims or conclusions.

### 7.25 Semantic Readiness

The degree to which analyzed semantics are suitable for MSG construction, KIR lowering, or backend use.

---

## 8. Analysis Inputs

Semantic analysis consumes:

* canonical AST snapshot;
* declaration table;
* symbol-table snapshot;
* namespace graph;
* import graph;
* export surfaces;
* alias graph;
* resolved-reference snapshot;
* language manifests;
* type-system contracts;
* constraint-language contracts;
* profile definitions;
* feature declarations;
* compatibility matrices;
* authority rules;
* lifecycle rules;
* extension contracts;
* prior analysis caches;
* applicable evidence artifacts.

All input snapshots must be immutable or completely fingerprinted.

---

## 9. Type Environment

A type environment conceptually contains:

```text
TypeEnvironment

├── environment_id
├── source_scope
├── visible_type_symbols
├── type_aliases
├── type_parameters
├── type_variables
├── nominal_relations
├── structural_rules
├── conversions
├── constraints
├── semantic_type_rules
├── language_context
├── profile
├── feature_set
├── compatibility_context
├── provenance
└── diagnostics
```

Equivalent environments must produce equivalent deterministic type outcomes.

---

## 10. Core Type Categories

MSC recognizes the shared architectural categories established by MSL core:

```text
any
never
unknown
error
null
boolean
integer
decimal
string
identifier
date
timestamp
duration
enumeration
record
list
set
map
tuple
union
intersection
optional
reference
constrained
semantic
extension
```

Specialized languages may refine these categories.

Refinement must remain compatible with the shared semantic integration contract.

---

## 11. Type Descriptor Model

A type descriptor conceptually contains:

```text
TypeDescriptor

├── descriptor_id
├── type_kind
├── semantic_identity
├── declared_name
├── declaration_symbol
├── type_arguments
├── member_types
├── base_types
├── union_members
├── intersection_members
├── optionality
├── nullability
├── constraints
├── semantic_role
├── authority
├── lifecycle
├── version
├── language_origin
├── extension_origin
├── analysis_state
├── provenance
└── diagnostics
```

---

## 12. Type Identity

Named types require stable semantic identity.

Type identity remains distinct from:

* declared name;
* alias;
* structural fingerprint;
* source-language spelling;
* serialization format;
* host-language implementation type;
* compiler symbol identity.

A type may have several aliases while preserving one canonical semantic identity.

---

## 13. Anonymous Types

Anonymous types include:

* inline records;
* anonymous unions;
* constrained scalar forms;
* tuple forms;
* generated intermediate types.

They require compiler-visible identity.

They need durable semantic identity only when independently referenced, versioned, governed, serialized, or promoted to MART artifacts.

---

## 14. Type Aliases

A type alias introduces an alternate reference to another type.

An alias may be:

* transparent;
* nominal;
* migration;
* compatibility;
* historical.

Transparent aliases preserve target identity.

Nominal aliases introduce a distinct semantic type and require an explicit declaration contract.

---

## 15. Declared Types

Declared types may originate from:

* explicit type expressions;
* field declarations;
* operation signatures;
* artifact schemas;
* language-region declarations;
* external schema normalization;
* generated compiler rules.

Declared types preserve source and authority lineage.

---

## 16. Inferred Types

Inference may use:

* literals;
* referenced declarations;
* member assignments;
* collection elements;
* discriminators;
* constraints;
* operation signatures;
* language context;
* normalized external schemas.

Inference must preserve:

* evidence;
* inference rule;
* rule version;
* candidate types;
* certainty;
* conflicts;
* provisional state.

---

## 17. Type Precedence

Declared and inferred types may disagree.

The compiler must apply an explicit policy such as:

```text
require_compatible
declared_type_controls
inference_controls_only_when_undeclared
preserve_conflict
request_confirmation
profile_specific
```

Inference must not silently override an authoritative declared type.

---

## 18. Unknown Type

`unknown` means the compiler lacks sufficient type information.

A value of `unknown` may:

* be stored;
* be propagated;
* be narrowed;
* be preserved in partial MSG;
* block operations requiring a specific type.

`unknown` does not permit arbitrary operations.

---

## 19. Any Type

`any` explicitly disables useful static restrictions under the active language contract.

Use of `any` may be:

* permitted;
* discouraged;
* warned;
* prohibited by strict profiles.

`any` must not erase authority, lifecycle, provenance, or security constraints.

---

## 20. Error Type

`error` indicates failed type analysis.

It may prevent diagnostic cascades.

It must not:

* satisfy semantic conformance;
* become successful MSG meaning;
* lower into authoritative KIR;
* appear as a valid public type.

---

## 21. Deferred Type

A deferred type records:

* unresolved dependency;
* expected type domain;
* resume condition;
* affected declarations;
* permitted partial operations;
* blocking outputs.

Deferred types differ from unknown types because the missing resolution dependency is known.

---

## 22. Never Type

`never` represents no valid values.

It may result from:

* impossible intersections;
* prohibited branches;
* unsatisfiable constraints;
* unreachable semantic states.

A declaration requiring a value of `never` is generally unsatisfiable.

---

## 23. Null, Missing, and Optional

MSC must distinguish:

* explicit `null`;
* missing field;
* omitted value;
* optional field;
* unknown value;
* defaulted value;
* deferred value.

A language may define conversions among these states.

No conversion may occur silently unless the language contract explicitly permits it.

---

## 24. Primitive Types

Primitive types require language-defined behavior for:

* valid values;
* canonical representation;
* range;
* precision;
* ordering;
* equality;
* units;
* serialization;
* conversion.

MSC-CORE defines the architectural categories, not all detailed semantics.

---

## 25. Semantic Types

Semantic types refine structural types with domain meaning.

Examples:

* ArtifactId;
* RequirementId;
* NamespaceId;
* RepositoryPath;
* SemanticVersion;
* SourceUri;
* AuthorityClass;
* LifecycleState.

Two semantic types may share a string representation while remaining incompatible.

---

## 26. Record Types

A record type defines named members.

Analysis includes:

* member identity;
* field type;
* required status;
* optionality;
* default;
* cardinality;
* constraints;
* visibility;
* authority;
* lifecycle;
* inherited or augmented members.

Duplicate members require explicit merge rules.

---

## 27. Collection Types

Collection analysis distinguishes:

* ordered list;
* unique set;
* key-value map;
* positional tuple.

Compatibility must account for:

* element types;
* key types;
* cardinality;
* ordering;
* uniqueness;
* mutability where semantically relevant.

---

## 28. Union Types

A union accepts values compatible with at least one member.

Analysis must preserve:

* member identities;
* discriminators;
* overlapping members;
* ambiguity;
* narrowing rules;
* exhaustiveness where applicable.

An empty union normalizes to `never`.

---

## 29. Intersection Types

An intersection requires compatibility with all members.

Analysis must detect:

* incompatible member requirements;
* duplicate constraints;
* unsatisfiable combinations;
* member conflicts.

An unsatisfiable intersection normalizes to `never` with diagnostics.

---

## 30. Reference Types

A reference type constrains:

* target declaration kind;
* target type;
* target namespace;
* target lifecycle;
* target authority;
* cardinality;
* version;
* visibility.

Reference resolution and type analysis cooperate.

A resolved symbol of the wrong target type remains semantically invalid.

---

## 31. Constrained Types

A constrained type combines:

* base type;
* constraint set;
* authority;
* provenance;
* evaluation class.

Examples:

```text
integer where value >= 0
string where matches ArtifactId syntax
list where cardinality >= 1
reference where target.lifecycle == approved
```

Constraint syntax belongs to MSL-CONSTRAINT and MSL-EXPR.

---

## 32. Nominal Typing

Nominal compatibility depends on:

* canonical type identity;
* declared subtype relations;
* explicit equivalence;
* aliases;
* registered compatibility bridges.

Structural similarity alone does not establish nominal compatibility.

---

## 33. Structural Typing

Structural compatibility depends on:

* required members;
* member types;
* cardinality;
* constraints;
* variance rules;
* visibility where applicable.

The active profile or language must explicitly permit structural analysis.

---

## 34. Hybrid Typing

A hybrid system combines nominal and structural rules.

The contract must define:

* which declarations are nominal;
* which are structural;
* which relationships allow structural fallback;
* whether semantic types remain nominal;
* diagnostics for implicit structural compatibility.

---

## 35. Type Equivalence

Type equivalence may derive from:

* identical semantic identity;
* transparent alias;
* explicit equivalence declaration;
* canonical normalization;
* structural equivalence under an active structural contract.

Equivalence must be symmetric and deterministic.

---

## 36. Assignability

Assignability is directional:

```text
source_type → target_type
```

Possible rules include:

* identity;
* subtype;
* union membership;
* optional lifting;
* constrained-to-base;
* literal-to-compatible-scalar;
* registered conversion;
* structural satisfaction.

A target assignable to a source does not imply the reverse.

---

## 37. Variance

Parameterized and member-bearing types may require:

* covariance;
* contravariance;
* invariance;
* language-specific variance.

Variance rules must be registered.

MSC must not infer variance from implementation-language conventions.

---

## 38. Type Conversion

Conversions are classified as:

```text
identity
lossless
checked
lossy
unsafe
prohibited
```

Every non-identity conversion must declare:

* source type;
* target type;
* conditions;
* losses;
* failure behavior;
* authority implications;
* provenance behavior.

Lossy and unsafe conversions require explicit authorization.

---

## 39. Type Narrowing

Narrowing may derive from:

* validated predicate;
* pattern match;
* discriminator;
* successful reference-kind test;
* explicit assertion;
* constraint proof;
* lifecycle or authority filter.

Narrowing must preserve the evidence that justified it.

---

## 40. Type Widening

Widening moves a value to a broader compatible type.

Examples:

* literal integer to integer;
* subtype to base type;
* member type to union;
* constrained type to base type.

Widening may lose useful precision and should remain traceable when it affects downstream behavior.

---

## 41. Type Variables

Type variables may appear in:

* generic declarations;
* reusable constraints;
* workflow templates;
* package interfaces;
* compiler-generated intermediate forms.

A type-variable descriptor must preserve:

* identity;
* scope;
* bounds;
* variance;
* default;
* substitution state;
* provenance.

---

## 42. Type Substitution

Substitution must validate:

* bounds;
* variance;
* constraints;
* lifecycle;
* authority;
* language compatibility;
* version compatibility.

An unresolved type variable may remain deferred.

---

## 43. Recursive Types

Recursive types may be valid.

MSC must distinguish:

* direct recursive reference;
* indirect recursion;
* infinite structural expansion;
* invalid ownership cycle;
* valid semantic recursion.

Analysis should use graph-aware representations rather than infinite expansion.

---

## 44. Type Analysis States

Initial type-analysis states include:

```text
unresolved
declared
inferred
candidate
narrowed
effective
deferred
ambiguous
conflicting
invalid
error
blocked
```

A declaration may retain both declared and inferred types while its effective type remains conflicting.

---

## 45. Type Analysis Result

A type-analysis result conceptually contains:

```text
TypeAnalysisResult

├── subject_symbol
├── declared_type
├── inferred_types
├── effective_type
├── substitutions
├── conversions
├── narrowing_evidence
├── assignability_results
├── unresolved_dependencies
├── conflicts
├── analysis_state
├── provenance
└── diagnostics
```

---

## 46. Constraint Model

A constraint descriptor conceptually contains:

```text
ConstraintDescriptor

├── constraint_id
├── declaration_symbol
├── constraint_kind
├── language_id
├── language_version
├── expression_root
├── target_references
├── resolved_targets
├── input_types
├── result_type
├── evaluation_class
├── phase
├── severity
├── authority
├── lifecycle
├── required
├── evidence_requirements
├── execution_policy
├── analysis_state
├── provenance
└── diagnostics
```

---

## 47. Constraint Kinds

Initial constraint kinds include:

```text
value
type
cardinality
identity
reference
relationship
authority
lifecycle
compatibility
state
transition
workflow
policy
graph
conformance
security
extension
```

Specialized languages may define more precise categories.

---

## 48. Constraint Targets

A constraint may target:

* value;
* field;
* declaration;
* type;
* reference;
* relationship;
* artifact;
* package;
* namespace;
* workflow;
* state;
* transition;
* semantic graph region;
* KIR projection;
* backend output.

Targets must be resolved before authoritative evaluation.

---

## 49. Constraint Binding

Constraint binding determines:

* constraint language;
* expression type;
* target symbols;
* target kinds;
* required inputs;
* visible names;
* applicable functions;
* evaluation class;
* authority;
* lifecycle;
* execution restrictions.

A parsed constraint is not a bound constraint.

---

## 50. Constraint Evaluation Classes

Initial evaluation classes are:

```text
compile_time_static
compile_time_contextual
graph_validation
kir_validation
backend_validation
runtime_validation
external_evidence
manual_review
effectful_prohibited
```

The class determines where and how the condition may be established.

---

## 51. Static Constraints

A static constraint is evaluable from deterministic compiler-known inputs.

Examples:

* field cardinality;
* type compatibility;
* identity format;
* required metadata;
* acyclic containment;
* version-range satisfaction.

Static evaluation must record the input snapshot.

---

## 52. Contextual Constraints

A contextual compile-time constraint depends on declared environmental context such as:

* target platform;
* active profile;
* selected package versions;
* workspace policy;
* backend target.

The environment must participate in reproducibility fingerprints.

---

## 53. Deferred Constraints

A constraint is deferred when valid evaluation requires:

* runtime values;
* deployment environment;
* external service state;
* backend-generated artifacts;
* human approval;
* future evidence.

Deferred constraints must preserve:

* resume phase;
* required evidence;
* blocking outputs;
* enforcement target.

---

## 54. Effectful Constraints

Ordinary semantic analysis must not execute effectful behavior.

A condition requiring external mutation is not a compiler constraint evaluation.

It must be represented as:

* workflow;
* backend action;
* policy-controlled execution;
* runtime operation.

---

## 55. Constraint Result

Constraint results include:

```text
satisfied
violated
unknown
deferred
not_applicable
inconclusive
error
blocked
waived
```

`unknown`, `deferred`, and `inconclusive` are distinct.

---

## 56. Invariant Model

An invariant must declare:

* governed subject;
* applicability scope;
* lifecycle interval;
* required authority;
* evaluation class;
* violation severity;
* evidence requirements;
* enforcement phase.

An invariant may be compile-time, runtime, or cross-phase.

---

## 57. Invariant Applicability

An invariant may apply:

* always;
* while active;
* after approval;
* before publication;
* during migration;
* for specific profiles;
* for specific backends;
* within one package or namespace;
* across the entire MSG.

Applicability must be explicit.

---

## 58. Invariant Violation

A violation must identify:

* invariant;
* subject;
* evaluation inputs;
* evidence;
* phase;
* severity;
* authority;
* lifecycle context;
* remediation;
* waiver eligibility.

---

## 59. Proof and Evaluation Evidence

MSC must distinguish:

* direct static evaluation;
* solver result;
* theorem proof;
* test evidence;
* backend validation;
* runtime observation;
* manual approval;
* AI suggestion.

Only proof-capable processes may emit proof records.

Other processes emit evidence or evaluation records.

---

## 60. Constraint Dependencies

Constraints may depend on:

* types;
* references;
* other constraints;
* profiles;
* features;
* lifecycle;
* authority;
* graph structure;
* environment.

Constraint dependency cycles may require bounded fixed-point analysis or may be invalid.

---

## 61. Constraint Graph

MSC may construct a compiler constraint graph containing:

* constraints;
* targets;
* dependencies;
* evaluation phases;
* result states;
* evidence;
* conflicts.

The compiler constraint graph remains distinct from MSG.

Validated constraints and their semantic relationships may later be promoted into MSG.

---

## 62. Authority Model

Semantic analysis determines effective authority from:

* source authority;
* declaration authority;
* fragment authority;
* import policy;
* adoption evidence;
* normalization profile;
* generated or inferred origin;
* governance rules;
* waivers;
* supersession.

Authority must remain traceable to its basis.

---

## 63. Authority Classes

MSC consumes authority classes defined by MSL and governance specifications.

Conceptual classes may include:

```text
informative
observed
inferred
provisional
candidate
normative
machine_normative
approved
withdrawn
contested
```

The exact vocabulary may evolve.

MSC must not collapse authority to a Boolean trusted/untrusted state.

---

## 64. Effective Authority

Effective authority may be:

* inherited;
* explicitly declared;
* reduced by import mode;
* reduced by inference;
* increased only through authorized adoption;
* contested due to conflicting claims.

A compiler component's trust does not increase content authority.

---

## 65. Authority Requirements

A semantic operation may require authority.

Examples:

* authoritative MSG inclusion;
* KIR lowering;
* code generation;
* migration;
* publication;
* policy enforcement;
* external deployment.

Requirements derive from profiles and backend contracts.

---

## 66. Authority Conflicts

Authority conflicts occur when:

* fragments claim incompatible authority;
* generated content claims authored status;
* imported content is elevated without adoption;
* lower-authority content overrides normative content;
* approval evidence conflicts.

Conflicts must preserve all claims and evidence.

---

## 67. Lifecycle Model

Lifecycle analysis evaluates:

* declared state;
* inherited state;
* transition validity;
* applicability;
* deprecation;
* supersession;
* withdrawal;
* archival;
* migration state;
* historical accessibility.

Lifecycle remains distinct from authority.

---

## 68. Lifecycle Applicability

A declaration may be:

* resolvable historically;
* inactive for new normative use;
* eligible for migration;
* deprecated but supported;
* superseded with replacement;
* withdrawn and blocked;
* draft and permitted only in partial profiles.

Applicability is operation-specific.

---

## 69. Lifecycle Transitions

Transitions require:

* source state;
* target state;
* authorized actor or process;
* evidence;
* effective version;
* timestamp where semantically relevant;
* rationale;
* provenance.

Compilation does not perform lifecycle transitions silently.

---

## 70. Supersession Analysis

Supersession analysis determines:

* predecessor;
* replacement;
* effective boundary;
* compatibility;
* migration path;
* historical-reference behavior.

Supersession does not delete prior semantic identity.

---

## 71. Profile Model

A semantic profile defines a named analysis policy.

It may control:

* permitted languages;
* required languages;
* strictness;
* unresolved-reference tolerance;
* type mode;
* implicit conversions;
* authority thresholds;
* lifecycle thresholds;
* required constraints;
* feature set;
* extension allowlist;
* compatibility behavior;
* semantic readiness rules;
* KIR eligibility.

---

## 72. Profile Activation

Profiles may be activated by:

* invocation;
* artifact metadata;
* package;
* workspace;
* backend requirement;
* language region;
* migration context.

Effective profile selection and precedence must remain inspectable.

---

## 73. Profile Composition

Profiles may extend or compose other profiles.

Composition must define:

* conflict behavior;
* precedence;
* required features;
* authority rules;
* lifecycle rules;
* diagnostic severity;
* output readiness.

Profile cycles are invalid unless a deterministic fixed-point model is explicitly defined.

---

## 74. Feature Negotiation

Feature negotiation compares:

* source-required features;
* language support;
* frontend support;
* normalizer support;
* compiler support;
* extension support;
* profile policy;
* MSG target;
* KIR target;
* backend support.

Unsupported required features block dependent outputs.

---

## 75. Feature States

Features may be:

```text
required
optional
experimental
deprecated
removed
prohibited
```

Feature use must preserve:

* feature identity;
* version;
* source of activation;
* support result;
* fallback behavior;
* diagnostics.

---

## 76. Compatibility Domains

MSC analyzes compatibility across distinct domains:

```text
artifact
platform
language
syntax
frontend
surface_ast
normalizer
mapping
canonical_ast
compiler
extension
package
module
msg
kir
backend
migration
```

Compatibility in one domain does not imply compatibility in another.

---

## 77. Compatibility Result

Compatibility results include:

```text
compatible
conditionally_compatible
migration_required
incompatible
unknown
deferred
```

A result must identify:

* domain;
* source version;
* target version;
* conditions;
* migration;
* evidence;
* provenance.

---

## 78. Semantic Conflicts

Semantic conflicts may involve:

* type;
* value;
* identity;
* requirement;
* relationship;
* constraint;
* authority;
* lifecycle;
* profile;
* compatibility;
* feature;
* version;
* evidence.

Conflicts are semantic artifacts, not merely diagnostics.

---

## 79. Conflict Model

A semantic conflict conceptually contains:

```text
SemanticConflict

├── conflict_id
├── conflict_kind
├── subjects
├── claims
├── authorities
├── lifecycles
├── versions
├── evidence
├── applicability
├── blocking_outputs
├── resolution_state
├── provenance
└── diagnostics
```

---

## 80. Conflict Resolution

Conflict resolution may require:

* explicit authority-aware precedence;
* governance decision;
* source correction;
* migration;
* version separation;
* profile-specific selection;
* declaration withdrawal;
* preserved parallel semantics.

MSC must not resolve conflicts through pass order or arbitrary ranking.

---

## 81. Semantic Facts

Semantic analysis produces facts such as:

* effective type;
* assignability result;
* bound constraint;
* constraint outcome;
* effective authority;
* lifecycle applicability;
* compatibility result;
* active profile;
* supported feature;
* semantic conflict;
* readiness state.

Every fact must preserve derivation provenance.

---

## 82. Semantic Fact Confidence

Facts may be:

```text
certain
validated
inferred
provisional
contested
unknown
```

Deterministic compiler derivation may be certain or validated.

AI-assisted conclusions remain inferred or provisional unless independently validated.

---

## 83. Fixed-Point Analysis

Some analyses may require repeated propagation.

Examples:

* recursive types;
* mutually dependent constraints;
* profile propagation;
* lifecycle applicability;
* authority inheritance;
* cyclic type imports.

A fixed-point group must declare:

* monotonic state;
* pass set;
* stable ordering;
* termination condition;
* maximum iterations;
* nontermination diagnostic;
* cache behavior.

---

## 84. Non-Monotonic Analysis

Analysis involving retraction or changing conclusions must be isolated and explicitly modeled.

Examples:

* conflict resolution after adoption;
* profile-specific applicability;
* supersession migration;
* evidence invalidation.

Non-monotonic passes must not participate in ordinary fixed-point groups without a declared semantics.

---

## 85. Semantic Readiness

Semantic readiness is output-specific.

Initial readiness states include:

```text
unavailable
partial
bound
typed
constraint_bound
analyzed
validated
authoritative
msg_ready
kir_ready
backend_ready
blocked
```

A declaration may be MSG-ready while not KIR-ready for a specific backend.

---

## 86. MSG Readiness

A semantic element is generally MSG-ready when:

* identity is sufficient;
* declaration binding is valid or explicitly partial;
* references have explicit outcomes;
* effective type state is represented;
* applicable constraints are represented;
* authority and lifecycle are explicit;
* conflicts are represented;
* provenance is complete.

MSG may contain explicitly incomplete or contested semantics.

---

## 87. KIR Readiness

A semantic element is KIR-ready when the target lowering profile additionally requires:

* required references resolved;
* required types effective;
* blocking constraints satisfied or delegated;
* required authority met;
* lifecycle eligible;
* versions compatible;
* required features supported;
* blocking conflicts absent;
* deterministic lowering available.

---

## 88. Partial Semantic Analysis

Partial analysis may preserve:

* unknown types;
* deferred types;
* ambiguous candidates;
* unresolved optional constraints;
* provisional authority;
* draft lifecycle;
* compatibility unknowns;
* conflicts.

Partial output must declare blocked operations and unavailable guarantees.

---

## 89. Analysis Snapshot

An analyzed semantic snapshot conceptually contains:

```text
SemanticAnalysisSnapshot

├── snapshot_id
├── compilation_unit
├── input_snapshot_fingerprints
├── type_environment
├── type_results
├── constraint_graph
├── constraint_results
├── authority_results
├── lifecycle_results
├── profile_results
├── feature_results
├── compatibility_results
├── semantic_conflicts
├── readiness_results
├── diagnostics
├── pass_versions
├── provenance
└── fingerprint
```

---

## 90. Analysis Barrier

Before MSG construction, the analysis barrier requires:

* all required subjects analyzed or explicitly incomplete;
* type results assigned;
* constraints bound;
* applicable static constraints evaluated;
* deferred constraints classified;
* authority explicit;
* lifecycle applicability explicit;
* profile activation complete;
* feature negotiation complete;
* compatibility results recorded;
* conflicts represented;
* semantic readiness assigned;
* snapshot frozen or fingerprinted.

---

## 91. Deterministic Analysis

Equivalent:

* bound declaration snapshot;
* resolved-reference snapshot;
* language contracts;
* type-system contracts;
* constraint contracts;
* profiles;
* features;
* compatibility matrices;
* authority rules;
* lifecycle rules;
* extension set;
* environment declaration;

must produce semantically equivalent deterministic analysis results.

---

## 92. Incremental Type Analysis

Type invalidation may result from changes to:

* declaration type;
* referenced type;
* members;
* inheritance;
* alias;
* constraints;
* conversions;
* language version;
* profile;
* feature set;
* extension rules.

Affected dependents must be recomputed.

---

## 93. Incremental Constraint Analysis

Constraint invalidation may result from changes to:

* expression;
* target;
* target type;
* referenced values;
* evaluation class;
* authority;
* lifecycle;
* profile;
* environment;
* evidence;
* dependent constraints.

---

## 94. Incremental Authority and Lifecycle Analysis

Invalidation may result from:

* source authority;
* adoption evidence;
* import policy;
* fragment composition;
* lifecycle state;
* transition record;
* supersession;
* profile threshold;
* backend requirement.

---

## 95. Analysis Caching

Caches may store:

* type environments;
* type results;
* substitutions;
* assignability results;
* constraint bindings;
* static evaluation results;
* authority results;
* lifecycle results;
* profile results;
* feature results;
* compatibility results;
* readiness results.

Cache fingerprints must include every semantically relevant input.

---

## 96. Evidence Invalidation

A semantic conclusion derived from evidence must be invalidated when that evidence:

* changes;
* expires;
* is withdrawn;
* becomes inaccessible;
* is superseded;
* fails verification;
* is no longer applicable.

Evidence identity and validity must participate in fingerprints.

---

## 97. Explanation Support

MSC should explain:

* how a type was selected;
* why inference was accepted or rejected;
* why a conversion was required;
* why assignability failed;
* how narrowing occurred;
* which targets a constraint governs;
* why a constraint was deferred;
* why an invariant failed;
* how authority was derived;
* why lifecycle blocked use;
* which profile rules applied;
* why a feature was unavailable;
* why versions were incompatible;
* why a conflict blocks KIR but not MSG.

---

## 98. Security and Trust Considerations

Semantic analysis is vulnerable to:

* type confusion;
* unsafe conversion;
* constraint injection;
* solver denial of service;
* authority escalation;
* lifecycle forgery;
* profile substitution;
* feature laundering;
* compatibility forgery;
* malicious evidence;
* nontermination;
* extension-rule injection;
* stale analysis caches.

Implementations must validate all analysis contracts and bound expensive work.

---

## 99. Solver and Evaluator Isolation

Constraint solvers and evaluators may be third-party components.

They must declare:

* identity;
* version;
* supported language;
* supported logic;
* determinism;
* resource requirements;
* proof capability;
* trust;
* output schema;
* failure behavior.

Untrusted evaluators must execute under sandbox and resource limits.

---

## 100. Resource Controls

Resource policies may limit:

* type depth;
* union size;
* intersection size;
* generic expansion;
* recursion;
* conversion search;
* constraint count;
* expression size;
* solver time;
* fixed-point iterations;
* proof size;
* evidence count;
* conflict count.

Limit exhaustion produces structured partial or blocking diagnostics.

---

## 101. Normative Requirements

### MSC-SEM-REQ-001

MSC **MUST** perform semantic analysis against immutable or completely fingerprinted declaration and reference snapshots.

### MSC-SEM-REQ-002

Every named type **MUST** have stable semantic identity.

### MSC-SEM-REQ-003

Type identity **MUST** remain distinct from declared name, alias, structural fingerprint, source spelling, serialization, implementation type, and symbol identity.

### MSC-SEM-REQ-004

Anonymous types **MUST** retain compiler-visible identity.

### MSC-SEM-REQ-005

Transparent and nominal aliases **MUST** remain distinct.

### MSC-SEM-REQ-006

Declared and inferred types **MUST** preserve independent provenance.

### MSC-SEM-REQ-007

Inference **MUST NOT** silently override an authoritative declared type.

### MSC-SEM-REQ-008

`unknown`, `any`, `error`, `deferred`, `never`, and `null` **MUST** remain distinct type states.

### MSC-SEM-REQ-009

Missing, omitted, optional, null, unknown, defaulted, and deferred values **MUST NOT** be collapsed silently.

### MSC-SEM-REQ-010

Error types **MUST NOT** become successful authoritative MSG or KIR types.

### MSC-SEM-REQ-011

Deferred types **MUST** identify their unresolved dependency and resume condition.

### MSC-SEM-REQ-012

Semantic types sharing one structural representation **MUST NOT** become assignable automatically.

### MSC-SEM-REQ-013

The active typing mode **MUST** declare nominal, structural, or hybrid behavior.

### MSC-SEM-REQ-014

MSC **MUST NOT** switch typing modes silently.

### MSC-SEM-REQ-015

Type equivalence **MUST** be symmetric and deterministic.

### MSC-SEM-REQ-016

Assignability **MUST** be directional.

### MSC-SEM-REQ-017

Variance rules **MUST** be registered and explicit.

### MSC-SEM-REQ-018

Non-identity conversions **MUST** declare source, target, conditions, loss class, failure behavior, and provenance.

### MSC-SEM-REQ-019

Lossy or unsafe conversions **MUST** require explicit authorization.

### MSC-SEM-REQ-020

Type narrowing **MUST** preserve the evidence or proof that justified it.

### MSC-SEM-REQ-021

Type-variable substitution **MUST** validate bounds, constraints, variance, language, lifecycle, authority, and version compatibility.

### MSC-SEM-REQ-022

Recursive type analysis **MUST** use bounded graph-aware algorithms.

### MSC-SEM-REQ-023

Every type-analysis result **MUST** preserve declared, inferred, effective, conversion, narrowing, conflict, and provenance state where applicable.

### MSC-SEM-REQ-024

Every constraint **MUST** have compiler-visible identity.

### MSC-SEM-REQ-025

Every constraint descriptor **MUST** identify language, target references, evaluation class, phase, authority, lifecycle, required status, and provenance.

### MSC-SEM-REQ-026

Constraint parsing **MUST NOT** be treated as successful constraint binding.

### MSC-SEM-REQ-027

Constraint targets **MUST** resolve to compatible declaration, value, relationship, artifact, or graph subjects.

### MSC-SEM-REQ-028

Constraint evaluation class **MUST** be explicit.

### MSC-SEM-REQ-029

Ordinary semantic analysis **MUST NOT** execute effectful constraints or actions.

### MSC-SEM-REQ-030

Static constraint evaluation **MUST** preserve its complete deterministic input snapshot.

### MSC-SEM-REQ-031

Contextual constraint evaluation **MUST** include declared environment inputs in reproducibility fingerprints.

### MSC-SEM-REQ-032

Deferred constraints **MUST** identify enforcement phase, required evidence, resume condition, and blocked outputs.

### MSC-SEM-REQ-033

Constraint outcomes `unknown`, `deferred`, `inconclusive`, `error`, and `blocked` **MUST** remain distinct.

### MSC-SEM-REQ-034

Every invariant **MUST** declare subject, applicability, lifecycle interval, authority requirement, evaluation class, severity, and enforcement phase.

### MSC-SEM-REQ-035

Invariant violations **MUST** preserve evaluated inputs, evidence, semantic context, and remediation.

### MSC-SEM-REQ-036

MSC **MUST** distinguish proof records from evaluation evidence, test evidence, runtime observations, manual approval, and AI suggestions.

### MSC-SEM-REQ-037

Only declared proof-capable processes **MUST** emit proof records.

### MSC-SEM-REQ-038

Constraint dependency cycles **MUST** be classified and bounded.

### MSC-SEM-REQ-039

Unsupported cyclic constraint models **MUST** block dependent semantic outputs.

### MSC-SEM-REQ-040

Effective authority **MUST** preserve its complete derivation basis.

### MSC-SEM-REQ-041

Compiler-component trust **MUST NOT** increase semantic content authority.

### MSC-SEM-REQ-042

Inference and observation **MUST NOT** become normative without authorized adoption.

### MSC-SEM-REQ-043

Authority conflicts **MUST** preserve all claims, evidence, and applicability.

### MSC-SEM-REQ-044

Lifecycle **MUST** remain distinct from authority.

### MSC-SEM-REQ-045

Lifecycle applicability **MUST** be evaluated relative to the requested semantic operation.

### MSC-SEM-REQ-046

Compilation **MUST NOT** perform lifecycle transitions silently.

### MSC-SEM-REQ-047

Supersession **MUST** preserve predecessor identity, replacement identity, effective boundary, compatibility, migration, and historical behavior.

### MSC-SEM-REQ-048

Every active profile **MUST** have identity, version, rules, inheritance, and provenance.

### MSC-SEM-REQ-049

Profile composition conflicts **MUST** be explicit.

### MSC-SEM-REQ-050

Profile cycles **MUST** be rejected unless a deterministic bounded model is registered.

### MSC-SEM-REQ-051

Feature negotiation **MUST** compare source, language, frontend, normalizer, compiler, extension, MSG, KIR, profile, and backend capabilities where applicable.

### MSC-SEM-REQ-052

Unsupported required features **MUST** block dependent outputs.

### MSC-SEM-REQ-053

Feature identity, version, activation source, support state, and fallback behavior **MUST** remain traceable.

### MSC-SEM-REQ-054

Compatibility results **MUST** identify their version domain.

### MSC-SEM-REQ-055

Compatibility in one domain **MUST NOT** imply compatibility in another domain.

### MSC-SEM-REQ-056

Migration-required compatibility **MUST NOT** be represented as direct compatibility.

### MSC-SEM-REQ-057

Semantic conflicts **MUST** be represented as first-class compiler artifacts.

### MSC-SEM-REQ-058

Semantic conflicts **MUST NOT** be resolved by pass execution order, provider order, source order, or arbitrary ranking.

### MSC-SEM-REQ-059

Every semantic fact **MUST** preserve derivation provenance.

### MSC-SEM-REQ-060

AI-assisted semantic facts **MUST** remain inferred or provisional until independently validated or adopted.

### MSC-SEM-REQ-061

Fixed-point analysis **MUST** declare monotonic state, pass set, ordering, termination, maximum iterations, and nontermination behavior.

### MSC-SEM-REQ-062

Non-monotonic analysis **MUST** be isolated from ordinary monotonic fixed-point groups.

### MSC-SEM-REQ-063

Semantic readiness **MUST** be output-specific.

### MSC-SEM-REQ-064

MSG readiness **MUST** remain distinct from KIR and backend readiness.

### MSC-SEM-REQ-065

KIR readiness **MUST** require all target-specific blocking semantic conditions to be satisfied or explicitly delegated.

### MSC-SEM-REQ-066

Partial semantic analysis **MUST** identify unavailable guarantees and blocked operations.

### MSC-SEM-REQ-067

The semantic-analysis snapshot **MUST** preserve type, constraint, authority, lifecycle, profile, feature, compatibility, conflict, readiness, diagnostic, pass-version, and provenance state.

### MSC-SEM-REQ-068

The semantic-analysis snapshot **MUST** be frozen, immutable, or completely fingerprinted before MSG construction.

### MSC-SEM-REQ-069

Equivalent deterministic inputs **MUST** produce semantically equivalent analysis results.

### MSC-SEM-REQ-070

Incremental invalidation **MUST** include all changed type, reference, constraint, profile, feature, authority, lifecycle, compatibility, evidence, language, extension, and environment inputs.

### MSC-SEM-REQ-071

Evidence-derived conclusions **MUST** be invalidated when their evidence changes, expires, is withdrawn, becomes inaccessible, is superseded, or fails verification.

### MSC-SEM-REQ-072

Analysis caches **MUST** include all semantically relevant input and rule fingerprints.

### MSC-SEM-REQ-073

Untrusted solvers, evaluators, and semantic extensions **MUST** operate under sandbox, resource, timeout, and output-validation policies.

### MSC-SEM-REQ-074

Compiler explanations **MUST** be derivable for type selection, inference, conversion, narrowing, constraint binding, deferral, authority, lifecycle, profile, feature, compatibility, conflict, and readiness decisions.

---

## 102. Conceptual Model

```text
Resolved Semantic Inputs
        │
        ▼
Type Environment Builder
├── visible types
├── aliases
├── variables
├── inheritance
├── conversions
├── semantic types
└── language rules
        │
        ▼
Type Analyzer
├── declared types
├── inferred types
├── effective types
├── assignability
├── equivalence
├── narrowing
├── substitutions
└── conflicts
        │
        ▼
Constraint Analyzer
├── constraint collection
├── target binding
├── expression typing
├── evaluation classes
├── static evaluation
├── deferred evaluation
├── invariants
└── evidence
        │
        ▼
Governance Analyzer
├── authority
├── lifecycle
├── profiles
├── features
└── waivers
        │
        ▼
Compatibility Analyzer
├── language
├── package
├── schema
├── MSG
├── KIR
└── backend
        │
        ▼
Semantic Conflict Builder
        │
        ▼
Readiness Evaluator
├── MSG readiness
├── KIR readiness
└── backend readiness
        │
        ▼
Analyzed Semantic Snapshot
        │
        ▼
MSG Construction
```

---

## 103. Machine Specification

```yaml
machine_spec:
  kind: type_constraint_and_semantic_analysis

  type_states:
    - unresolved
    - declared
    - inferred
    - candidate
    - narrowed
    - effective
    - deferred
    - ambiguous
    - conflicting
    - invalid
    - error
    - blocked

  typing_modes:
    - nominal
    - structural
    - hybrid

  conversion_classes:
    - identity
    - lossless
    - checked
    - lossy
    - unsafe
    - prohibited

  constraint_kinds:
    - value
    - type
    - cardinality
    - identity
    - reference
    - relationship
    - authority
    - lifecycle
    - compatibility
    - state
    - transition
    - workflow
    - policy
    - graph
    - conformance
    - security
    - extension

  evaluation_classes:
    - compile_time_static
    - compile_time_contextual
    - graph_validation
    - kir_validation
    - backend_validation
    - runtime_validation
    - external_evidence
    - manual_review
    - effectful_prohibited

  constraint_outcomes:
    - satisfied
    - violated
    - unknown
    - deferred
    - not_applicable
    - inconclusive
    - error
    - blocked
    - waived

  compatibility_domains:
    - artifact
    - platform
    - language
    - syntax
    - frontend
    - surface_ast
    - normalizer
    - mapping
    - canonical_ast
    - compiler
    - extension
    - package
    - module
    - msg
    - kir
    - backend
    - migration

  compatibility_outcomes:
    - compatible
    - conditionally_compatible
    - migration_required
    - incompatible
    - unknown
    - deferred

  semantic_fact_confidence:
    - certain
    - validated
    - inferred
    - provisional
    - contested
    - unknown

  readiness_states:
    - unavailable
    - partial
    - bound
    - typed
    - constraint_bound
    - analyzed
    - validated
    - authoritative
    - msg_ready
    - kir_ready
    - backend_ready
    - blocked

  analysis_pipeline:
    - build_type_environments
    - resolve_declared_types
    - infer_candidate_types
    - compute_effective_types
    - analyze_assignability
    - apply_conversions
    - apply_narrowing
    - substitute_type_variables
    - collect_constraints
    - bind_constraint_targets
    - type_constraint_expressions
    - classify_constraint_evaluation
    - evaluate_static_constraints
    - classify_deferred_constraints
    - analyze_invariants
    - resolve_authority
    - evaluate_lifecycle
    - activate_profiles
    - negotiate_features
    - analyze_compatibility
    - construct_semantic_conflicts
    - evaluate_semantic_readiness
    - validate_analysis_barrier
    - freeze_analysis_snapshot
```

---

## 104. Invariants

```yaml
invariants:
  - id: MSC-SEM-INV-001
    expression: type.semantic_identity != type.symbol_id
    description: Semantic type identity and compiler representation remain distinct.

  - id: MSC-SEM-INV-002
    expression: unknown != any
    description: Missing knowledge is not unrestricted compatibility.

  - id: MSC-SEM-INV-003
    expression: error_type.successful_semantic_output == false
    description: Recovery values cannot become valid knowledge.

  - id: MSC-SEM-INV-004
    expression: inferred_type.overrides_authoritative_declared_type_silently == false
    description: Inference cannot erase declaration intent.

  - id: MSC-SEM-INV-005
    expression: assignability.symmetric == false
    description: Assignability remains directional.

  - id: MSC-SEM-INV-006
    expression: lossy_conversion.explicit_authorization != null
    description: Semantic loss requires consent.

  - id: MSC-SEM-INV-007
    expression: narrowing.evidence != null
    description: Type refinement remains explainable.

  - id: MSC-SEM-INV-008
    expression: parsed_constraint.is_bound == false
    description: Syntax alone does not establish semantic applicability.

  - id: MSC-SEM-INV-009
    expression: ordinary_analysis.executes_effectful_constraint == false
    description: Semantic validation does not cause external effects.

  - id: MSC-SEM-INV-010
    expression: proof_record.producer.proof_capable == true
    description: Proof claims require a proof-capable process.

  - id: MSC-SEM-INV-011
    expression: component_trust.increases_content_authority == false
    description: Trusted tools do not create normative truth.

  - id: MSC-SEM-INV-012
    expression: lifecycle == authority
    expected: false
    description: Applicability and normative standing remain distinct.

  - id: MSC-SEM-INV-013
    expression: compatibility.cross_domain_inference == false
    description: Compatibility remains domain-specific.

  - id: MSC-SEM-INV-014
    expression: semantic_conflict.arbitrary_winner == false
    description: Competing meaning remains explicit.

  - id: MSC-SEM-INV-015
    expression: fixed_point.iterations <= configured_maximum
    description: Recursive analysis remains bounded.

  - id: MSC-SEM-INV-016
    expression: msg_ready.implies_kir_ready == false
    description: Queryable meaning and deterministic lowering have different thresholds.

  - id: MSC-SEM-INV-017
    expression: evidence_changed.implies_derived_fact_invalidated == true
    description: Semantic conclusions track their evidence.

  - id: MSC-SEM-INV-018
    expression: analysis_snapshot.mutable_after_barrier == false
    description: Graph construction consumes stable analysis state.
```

---

## 105. Diagnostics

### MSC0601 — Type Declaration Missing

A declaration requiring a type has no declared, inferred, default, or deferred type.

### MSC0602 — Type Identity Missing

A named type lacks stable semantic identity.

### MSC0603 — Type Reference Unresolved

A type expression cannot resolve to a valid type symbol.

### MSC0604 — Type Reference Ambiguous

Several valid type targets remain.

### MSC0605 — Type Kind Invalid

The resolved declaration cannot serve as a type.

### MSC0606 — Typing Mode Missing

No nominal, structural, or hybrid type-analysis mode is active.

### MSC0607 — Declared and Inferred Type Conflict

The inferred type is incompatible with the authoritative declared type.

### MSC0608 — Unknown Used as Specific Type

An unknown value is used without validation or narrowing.

### MSC0609 — Any Type Prohibited

The active profile prohibits unrestricted `any`.

### MSC0610 — Error Type Escaped Analysis

An error type reached an output requiring valid semantics.

### MSC0611 — Deferred Type Blocks Output

A required type remains deferred for the requested output.

### MSC0612 — Missing and Null Conflated

The semantic model collapses absence and explicit null without a declared rule.

### MSC0613 — Semantic Type Mismatch

Structurally similar values have incompatible semantic types.

### MSC0614 — Type Equivalence Invalid

A claimed type equivalence is unsupported.

### MSC0615 — Type Assignability Failure

A source type cannot be used where the target type is required.

### MSC0616 — Variance Rule Missing

A parameterized compatibility decision requires an undeclared variance rule.

### MSC0617 — Unsafe Implicit Conversion

A lossy, unsafe, or checked conversion was applied without explicit handling.

### MSC0618 — Type Narrowing Evidence Missing

A narrowed type lacks supporting validation or proof.

### MSC0619 — Type Variable Bound Violation

A substitution does not satisfy declared bounds or constraints.

### MSC0620 — Recursive Type Analysis Unbounded

Recursive type analysis exceeded configured bounds or failed to stabilize.

### MSC0621 — Constraint Descriptor Invalid

A constraint lacks language, target, evaluation class, authority, lifecycle, required status, or provenance.

### MSC0622 — Constraint Language Unsupported

No compatible language implementation can analyze the constraint.

### MSC0623 — Constraint Target Missing

The constraint cannot resolve its governed subject.

### MSC0624 — Constraint Target Ambiguous

Several materially different valid targets remain.

### MSC0625 — Constraint Target Kind Invalid

The resolved subject cannot be governed by the constraint kind.

### MSC0626 — Constraint Expression Type Invalid

The expression does not produce the required result type.

### MSC0627 — Constraint Evaluation Class Missing

MSC cannot determine when or how the constraint should be evaluated.

### MSC0628 — Effectful Constraint Prohibited

A semantic constraint attempts to perform an external effect.

### MSC0629 — Static Constraint Violated

A compile-time constraint evaluated to false.

### MSC0630 — Static Constraint Inconclusive

A static constraint cannot be concluded from the available deterministic inputs.

### MSC0631 — Deferred Constraint Blocks Output

A required deferred constraint lacks a valid enforcement path for the requested output.

### MSC0632 — Invariant Applicability Missing

An invariant lacks a defined semantic domain, lifecycle interval, profile, or phase.

### MSC0633 — Invariant Violated

An applicable invariant does not hold.

### MSC0634 — Proof Claim Invalid

A process lacking proof capability emitted a proof record.

### MSC0635 — Constraint Dependency Cycle

Constraints form a cycle unsupported by the active evaluation model.

### MSC0636 — Constraint Fixed Point Unbounded

Constraint propagation failed to stabilize within configured bounds.

### MSC0637 — Authority Requirement Unsatisfied

A semantic operation requires stronger authority than the subject possesses.

### MSC0638 — Authority Escalation Invalid

Authority was increased without adoption or another authorized transition.

### MSC0639 — Authority Conflict

Competing authority claims remain unresolved.

### MSC0640 — Lifecycle State Inapplicable

A declaration's lifecycle does not permit the requested operation.

### MSC0641 — Lifecycle Transition Invalid

A lifecycle transition lacks a valid source, target, actor, evidence, or rule.

### MSC0642 — Supersession Mapping Invalid

A superseded declaration lacks a coherent replacement, boundary, compatibility, or migration record.

### MSC0643 — Profile Missing

The requested analysis requires an unavailable semantic profile.

### MSC0644 — Profile Composition Conflict

Active profiles impose incompatible rules.

### MSC0645 — Profile Inheritance Cycle

Profile composition forms an unsupported cycle.

### MSC0646 — Required Feature Unsupported

A required semantic feature is unavailable.

### MSC0647 — Prohibited Feature Used

The active profile prohibits a used feature.

### MSC0648 — Compatibility Domain Missing

A compatibility claim does not identify its version domain.

### MSC0649 — Version Incompatible

Participating versions cannot interoperate directly.

### MSC0650 — Migration Required

Semantic analysis requires a version or schema migration.

### MSC0651 — Compatibility Unknown

MSC cannot establish compatibility from available declarations.

### MSC0652 — Semantic Conflict

Incompatible semantic claims remain.

### MSC0653 — Semantic Fact Provenance Missing

A derived fact cannot be traced to rules and evidence.

### MSC0654 — AI Semantic Fact Misclassified

AI-derived analysis is represented as validated or authoritative without independent support.

### MSC0655 — Semantic Readiness Misclassified

A subject is marked MSG-, KIR-, or backend-ready without satisfying the applicable requirements.

### MSC0656 — Analysis Snapshot Incomplete

The snapshot omits required results, conflicts, fingerprints, diagnostics, or provenance.

### MSC0657 — Analysis Snapshot Mutated

A downstream phase observed mutation after the analysis barrier.

### MSC0658 — Analysis Cache Stale

A cached result no longer matches current semantic inputs.

### MSC0659 — Evidence Invalidated

Evidence supporting a semantic conclusion is no longer valid.

### MSC0660 — Semantic Explanation Unavailable

MSC cannot explain a type, constraint, authority, lifecycle, profile, compatibility, conflict, or readiness decision.

---

## 106. Acceptance Criteria

This specification is satisfied when:

1. type, constraint, authority, lifecycle, profile, feature, compatibility, conflict, and readiness analysis are explicit compiler responsibilities;
2. type identity remains distinct from names, symbols, source spelling, structure, and serialization;
3. declared, inferred, unknown, any, error, deferred, never, null, missing, and optional states remain distinct;
4. nominal, structural, and hybrid typing are explicit;
5. equivalence and assignability remain distinct;
6. assignability is directional;
7. conversions declare semantic loss and authorization;
8. narrowing preserves evidence;
9. type variables and recursive types use bounded analysis;
10. constraints have identity, language, targets, evaluation classes, authority, lifecycle, and provenance;
11. parsed and bound constraints remain distinct;
12. static, contextual, graph, KIR, backend, runtime, evidence, and manual-review constraints are represented;
13. effectful behavior is excluded from ordinary semantic analysis;
14. invariant applicability and violation evidence are explicit;
15. proof records and ordinary evidence remain distinct;
16. authority and lifecycle remain separate;
17. adoption is required for authority escalation;
18. profiles and features are versioned, composable, and inspectable;
19. compatibility remains domain-specific;
20. migration-required and direct compatibility remain distinct;
21. semantic conflicts are first-class artifacts;
22. fixed-point analysis is bounded;
23. MSG, KIR, and backend readiness have distinct thresholds;
24. partial analysis declares unavailable guarantees;
25. semantic-analysis snapshots are stable and reproducible;
26. evidence changes invalidate dependent facts;
27. untrusted evaluators and solvers are sandboxed;
28. semantic decisions remain explainable and traceable.

---

## 107. Conformance Examples

### 107.1 Valid Semantic Type

```yaml
type:
  id: monad::ArtifactId
  kind: semantic
  base: string
```

A plain string is not automatically assignable to `monad::ArtifactId`.

### 107.2 Invalid Unknown Use

```yaml
value:
  type: unknown
  used_as: machine_normative_policy
```

Expected diagnostic:

```text
MSC0608: unknown value must be narrowed or validated before use
```

### 107.3 Valid Directional Assignability

```text
ConstrainedPositiveInteger
    assignable_to
Integer
```

The reverse does not hold without validation.

### 107.4 Invalid Lossy Conversion

```text
decimal 10.75
    converted_to
integer 10
```

No explicit rounding or loss policy exists.

Expected diagnostic:

```text
MSC0617: lossy decimal-to-integer conversion requires explicit handling
```

### 107.5 Valid Narrowing

```text
value: unknown
constraint: value is ArtifactId
result: ArtifactId
```

The narrowing result retains the validation record.

### 107.6 Valid Static Constraint

```yaml
constraint:
  id: ARTIFACT-VERSION-NONEMPTY
  kind: value
  evaluation_class: compile_time_static
  target: monad::Artifact.version
  expression: value != ""
```

### 107.7 Invalid Effectful Constraint

```text
constraint:
    deploy the service if validation passes
```

Expected diagnostic:

```text
MSC0628: constraints cannot perform deployment effects during semantic analysis
```

### 107.8 Valid Deferred Constraint

```yaml
constraint:
  id: DEPLOYMENT-HEALTH
  evaluation_class: runtime_validation
  enforcement_phase: deployment
  required_evidence:
    - health-check-result
```

The constraint may be represented in MSG and lowered to an applicable runtime-validation plan.

### 107.9 Valid Authority Reduction

An approved external artifact is imported through an informative import.

```yaml
effective_authority: informative
```

The import does not change the source artifact's own authority; it limits its applicability in the importing context.

### 107.10 Invalid Authority Escalation

```yaml
origin: inferred
authority: machine_normative
adoption_evidence: null
```

Expected diagnostic:

```text
MSC0638: inferred semantics cannot become machine-normative without adoption
```

### 107.11 Valid Lifecycle Blocking

A withdrawn policy remains historically resolvable but cannot drive current KIR generation.

```yaml
msg_ready: true
kir_ready: false
```

### 107.12 Valid Compatibility Result

```yaml
compatibility:
  domain: canonical_ast
  source: 0.1.0
  target: 0.2.0
  result: migration_required
  migration: MIGRATION-CANON-AST-0001
```

### 107.13 Invalid Cross-Domain Compatibility

A compatible Markdown frontend version is used as evidence that KIR versions are compatible.

Expected diagnostic:

```text
MSC0648: compatibility must be established separately for the KIR domain
```

### 107.14 Valid Semantic Conflict

```yaml
conflict:
  kind: type
  subject: monad::Artifact.version
  claims:
    - type: string
      authority: normative
    - type: SemanticVersion
      authority: provisional
```

Both claims remain visible.

### 107.15 Valid MSG but Blocked KIR

```yaml
readiness:
  msg: ready_with_conflict
  kir: blocked

reason:
  - required type conflict
```

This is valid because MSG may represent contested knowledge while deterministic KIR cannot select one meaning.

---

## 108. Security and Trust Considerations

Type and semantic analysis directly affect generated outputs, policies, validation, and future execution.

Implementations should:

* reject unsafe implicit conversion;
* preserve semantic type identity;
* limit recursion and expansion;
* sandbox constraint evaluators;
* prevent authority escalation;
* validate lifecycle evidence;
* pin profile and feature definitions;
* preserve compatibility domains;
* treat external evidence as untrusted until validated;
* invalidate stale conclusions;
* bound fixed-point computation;
* preserve conflicts instead of suppressing them;
* validate every analysis result before MSG promotion.

---

## 109. Evolution and Compatibility

The semantic-analysis architecture may evolve through:

* richer generics;
* advanced subtyping;
* unit-aware numeric types;
* dependent constraints;
* formal verification;
* proof-carrying artifacts;
* external solver protocols;
* richer policy analysis;
* capability types;
* effect systems;
* temporal constraints.

Compatible additions may introduce optional type or constraint categories.

Breaking changes include:

* changing type identity;
* changing assignability;
* changing conversion safety;
* changing constraint outcomes;
* changing authority derivation;
* changing lifecycle applicability;
* changing profile composition;
* changing compatibility domains;
* changing semantic-readiness thresholds.

Breaking changes require:

* MSC version changes;
* semantic cache invalidation;
* conformance-fixture updates;
* MSG compatibility analysis;
* KIR lowering review;
* migration guidance.

---

## 110. Open Questions

1. What minimal type system should the first MSC implementation support?
2. Should bootstrap MSL use nominal typing by default?
3. Which canonical nodes always require types?
4. How should semantic type identities be declared?
5. Should requirements and policies have first-class types?
6. Which conversions should be built in?
7. How should cardinality integrate with collection types?
8. What generic features are needed before MSL 1.0?
9. Which constraint evaluator should the bootstrap compiler use?
10. Should static constraints use a dedicated expression evaluator?
11. Which constraints belong in MSG versus KIR only?
12. How should runtime constraints link to verification evidence?
13. Should waiver artifacts alter constraint results or only applicability?
14. What authority classes should become stable?
15. Which lifecycle states should block KIR by default?
16. Should profiles be first-class MART artifacts?
17. How should profile precedence interact with artifact authority?
18. What compatibility matrices must exist before self-hosting?
19. Should semantic conflicts always become MSG nodes?
20. Which partial type states are safe for documentation generation?
21. Can AI suggest conversions or narrowing evidence?
22. What proof-capable tools should Monad support eventually?
23. How should solver outputs be signed or verified?
24. Which analysis caches should persist in MKE?
25. Which semantic-analysis invariants should be implemented first?

---

## 111. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

Future companion series should include:

| Series         | Purpose                                                                |
| -------------- | ---------------------------------------------------------------------- |
| MSC-TYPE       | Type environments, equivalence, assignability, substitution, and APIs  |
| MSC-CONSTRAINT | Constraint binding, evaluators, evidence, and fixed-point analysis     |
| MSC-SEMANTIC   | Authority, lifecycle, profiles, features, compatibility, and readiness |
| MSL-TYPE       | Author-facing type declarations                                        |
| MSL-EXPR       | Bounded expression semantics                                           |
| MSL-CONSTRAINT | Constraint and invariant language                                      |
| MSL-POLICY     | Policy and authority rules                                             |
| MART-CORE      | Type, constraint, evidence, profile, and conflict artifacts            |
| MSG-CORE       | Durable analyzed semantic nodes and edges                              |
| KIR-CORE       | Lowered types, validations, constraints, and execution plans           |
| MKE            | Persistent analysis indexes and evidence retrieval                     |

---

## Status

Draft.

This document defines the type, constraint, invariant, authority, lifecycle, profile, feature, compatibility, conflict, and semantic-readiness analysis required before MSC constructs the Monad Semantic Graph.

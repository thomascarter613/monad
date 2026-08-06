---
id: "MSL-CORE-0003"
title: "Normative Requirement Language"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 3
version: "0.1.0"
status: "draft"
created: "2026-08-03"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "requirements"
  - "normative-language"
  - "conformance"
  - "diagnostics"
depends_on:
  - "ADR-0002"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
references:
  - "MKE-CORE-0003"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
enables:
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0009"
  - "MSC-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0003 — Normative Requirement Language

## 1. Purpose

This specification defines the normative requirement language used by the Monad Specification Language.

It establishes how MSL specifications express:

* mandatory behavior;
* prohibited behavior;
* recommended behavior;
* discouraged behavior;
* permitted behavior;
* conditional obligations;
* scoped obligations;
* requirement identity;
* requirement authority;
* verification expectations;
* implementation applicability;
* exceptions and waivers;
* requirement supersession and deprecation.

The normative requirement language provides the bridge between human-readable engineering intent and machine-verifiable conformance obligations.

---

## 2. Context

Many engineering documents contain statements that appear to be requirements but are expressed ambiguously.

Examples:

* “The service handles authentication securely.”
* “Requests should normally be retried.”
* “The system supports offline operation.”
* “Generated files are not edited manually.”
* “Administrators can revoke credentials.”

These statements may express intent, guidance, observation, aspiration, or binding obligation.

Without an explicit normative model, humans and tools cannot reliably determine:

* whether a statement is mandatory;
* which system or artifact it applies to;
* under what conditions it applies;
* how it is verified;
* whether an implementation conforms;
* what happens when requirements conflict;
* whether an exception has been authorized.

MSL therefore requires a controlled normative language with stable semantics.

---

## 3. Scope

This specification defines:

* normative requirement identity;
* requirement statements;
* normative keywords;
* requirement subjects and targets;
* conditions and applicability;
* obligation strength;
* requirement status;
* rationale and evidence;
* conflicts;
* exceptions;
* waivers;
* requirement grouping;
* traceability;
* requirement diagnostics;
* requirement-level conformance.

This specification does not fully define:

* the complete MSL expression language;
* the type system;
* acceptance-test syntax;
* implementation-specific verification engines;
* policy-evaluation backends;
* KIR serialization;
* natural-language processing algorithms.

---

## 4. Non-Goals

The normative requirement language is not:

* a replacement for legal contract drafting;
* a general-purpose logic-programming language;
* unrestricted natural-language interpretation;
* a test framework;
* a full policy engine;
* a source-code assertion language;
* a substitute for explicit acceptance criteria;
* a mechanism for hiding architectural decisions inside prose.

---

## 5. Core Principle

> Every binding obligation must be identifiable, scoped, interpretable, and verifiable.

A normative requirement must answer:

1. What is required?
2. Who or what must comply?
3. Under what conditions does it apply?
4. How strong is the obligation?
5. How can conformance be determined?
6. What authority established it?
7. What supersedes, modifies, or waives it?

---

## 6. Terminology

### 6.1 Requirement

A uniquely identifiable normative declaration governing the behavior, structure, quality, lifecycle, or operation of one or more subjects.

### 6.2 Requirement Subject

The entity expected to comply with the requirement.

Examples:

* compiler;
* service;
* artifact;
* repository;
* generator;
* user interface;
* workflow;
* organization.

### 6.3 Requirement Target

The behavior, property, artifact, operation, or outcome constrained by the requirement.

### 6.4 Obligation

The normative force applied by a requirement.

Initial obligations include:

* `must`;
* `must_not`;
* `should`;
* `should_not`;
* `may`.

### 6.5 Condition

A predicate determining when the requirement applies.

### 6.6 Applicability

The environment, profile, version, platform, lifecycle state, or feature set under which a requirement is relevant.

### 6.7 Rationale

Informative reasoning explaining why the requirement exists.

### 6.8 Verification Method

The declared means by which conformance may be established.

### 6.9 Exception

A defined circumstance built into the requirement under which the obligation does not apply.

### 6.10 Waiver

An authorized, traceable decision permitting temporary or scoped nonconformance.

### 6.11 Requirement Set

A named collection of related requirements.

### 6.12 Requirement Profile

A selection of requirements activated for a particular implementation, environment, maturity level, or use case.

---

## 7. Normative Keywords

MSL defines five core normative keywords.

### 7.1 MUST

`MUST` defines an unconditional binding obligation within the declared scope and applicability.

Failure to satisfy a `MUST` requirement is nonconformance.

Example:

> The compiler **MUST** preserve source mappings for emitted KIR elements.

### 7.2 MUST NOT

`MUST NOT` defines a prohibited condition or behavior.

Violation is nonconformance.

Example:

> A supplementary source **MUST NOT** redefine the canonical artifact identity.

### 7.3 SHOULD

`SHOULD` defines a strong recommendation.

An implementation may diverge only when it has a valid reason and records that reason where required by the active conformance profile.

Example:

> A specification **SHOULD** provide invalid conformance examples.

### 7.4 SHOULD NOT

`SHOULD NOT` defines a strongly discouraged behavior.

An implementation may perform the behavior only when justified and documented.

Example:

> A compiler **SHOULD NOT** continue code generation after unresolved normative conflicts.

### 7.5 MAY

`MAY` defines permission.

Implementations are free to support or omit the described behavior unless another requirement narrows that permission.

Example:

> A compiler **MAY** cache parsed source documents.

---

## 8. Keyword Semantics

Normative keywords must be interpreted only within content classified as normative or machine-normative.

The appearance of `must`, `should`, or `may` in:

* quotations;
* examples;
* rationale;
* historical discussion;
* code comments;
* informal prose;

does not automatically create a normative requirement.

Bootstrap `msl-markdown` specifications SHOULD capitalize normative keywords to make authority visible.

The compiler MUST use structural authority classification rather than capitalization alone.

---

## 9. Requirement Identity

Every normative requirement MUST have a stable identifier.

Recommended format:

```text
<SPECIFICATION-PREFIX>-REQ-<SEQUENCE>
```

Examples:

```text
MSL-NORM-REQ-001
MSC-PARSE-REQ-014
MKE-GRAPH-REQ-008
```

Requirement identity must remain stable across:

* wording clarification;
* file relocation;
* section reordering;
* formatting changes;
* compatible specification revisions.

A semantically new obligation must receive a new identifier.

A materially incompatible replacement should use a new requirement identifier and a `supersedes` relationship.

---

## 10. Requirement Anatomy

A normative requirement consists of:

```text
Requirement

├── Identity
├── Subject
├── Obligation
├── Predicate
├── Target
├── Conditions
├── Applicability
├── Authority
├── Status
├── Rationale
├── Verification
├── Relationships
├── Exceptions
├── Waivers
└── Source Map
```

The minimum machine-representable requirement contains:

* identity;
* obligation;
* normative statement;
* source location;
* authority class;
* lifecycle status.

Higher conformance profiles may require additional fields.

---

## 11. Human-Readable Requirement Form

The bootstrap human-readable form is:

```markdown
### MSL-NORM-REQ-001

The compiler **MUST** preserve source mappings for emitted semantic elements.
```

Optional supporting fields may follow:

```markdown
**Subject:** Compiler  
**Applies when:** Emitting KIR  
**Verification:** Inspect emitted source maps  
**Rationale:** Diagnostics and traceability require source lineage.
```

The exact concrete syntax remains provisional.

The semantic fields are not provisional.

---

## 12. Machine-Readable Requirement Form

A machine-normative representation may use:

```yaml
requirements:
  - id: MSL-NORM-REQ-001
    subject: compiler
    obligation: must
    predicate: preserve
    target: emitted_semantic_element.source_map
    applies_when:
      operation: emit_kir
    verification:
      method: structural_validation
    status: active
```

The compiler must associate the structured form with the corresponding human-readable requirement when both are present.

---

## 13. Requirement Statement Rules

A normative requirement SHOULD:

* express one primary obligation;
* identify a clear subject;
* use one core normative keyword;
* avoid undefined qualifiers;
* avoid combining unrelated conditions;
* be independently referenceable;
* define observable or inferable conformance;
* avoid implementation detail unless implementation detail is intentionally constrained.

Poor requirement:

> The engine MUST be fast, reliable, secure, simple, portable, and easy to maintain.

Improved requirements:

* The engine **MUST** reject invalid artifact identities.
* The engine **MUST** preserve committed knowledge when rebuilding indexes.
* The engine **SHOULD** complete local registry validation within the defined performance budget.
* The engine **MUST NOT** transmit repository content without authorization.

---

## 14. Atomicity

A requirement should express one independently assessable obligation.

A requirement is non-atomic when it contains multiple obligations that may pass or fail independently.

Example:

> The compiler MUST parse the document and emit KIR and publish diagnostics.

This should normally become:

* The compiler **MUST** parse conforming source documents.
* The compiler **MUST** emit KIR for successfully compiled specifications.
* The compiler **MUST** emit diagnostics for detected failures.

The compiler MAY warn when a requirement appears non-atomic.

---

## 15. Subjects

Every requirement SHOULD declare or permit deterministic inference of a subject.

Examples:

```yaml
subject: compiler
```

```yaml
subject:
  artifact_type: knowledge.specification
```

```yaml
subject:
  relationship: implements
  source_type: implementation.source_code
```

If a section establishes a common subject, child requirements may inherit it.

Inherited subjects must remain traceable and visible in compiled semantics.

---

## 16. Conditions

Requirements may be conditional.

Human-readable example:

> When incremental compilation is enabled, the compiler **MUST** invalidate dependent semantic units whose imported definitions changed.

Machine-readable example:

```yaml
condition:
  feature.incremental_compilation: enabled
```

Conditions must be:

* explicit;
* deterministic where machine-enforced;
* scoped;
* type-valid;
* free of hidden side effects.

A requirement without a condition is treated as unconditional within its applicability scope.

---

## 17. Applicability

Applicability narrows where a requirement governs.

Possible dimensions include:

* language version;
* specification version;
* conformance profile;
* operating system;
* architecture;
* deployment mode;
* implementation backend;
* lifecycle state;
* security classification;
* enabled feature;
* repository type.

Example:

```yaml
applies_to:
  profile:
    - machine
    - executable
  language_version: ">=0.1.0 <1.0.0"
```

A requirement must not be treated as globally applicable when its scope is explicitly constrained.

---

## 18. Obligation Strength and Precedence

The core precedence model is:

```text
MUST / MUST NOT
    stronger than
SHOULD / SHOULD NOT
    stronger than
MAY
```

This ordering does not automatically resolve conflicts.

A scoped `MUST` may apply only in one profile, while a global `MAY` applies elsewhere.

Conflict resolution must consider:

1. applicability;
2. authority;
3. lifecycle status;
4. version;
5. specificity;
6. explicit override relationships;
7. approved waivers.

The compiler MUST NOT resolve materially conflicting active `MUST` requirements through keyword strength alone.

---

## 19. Requirement Status

Requirements have lifecycle states independent from the containing document.

Initial requirement states:

* `proposed`;
* `draft`;
* `active`;
* `deprecated`;
* `superseded`;
* `withdrawn`;
* `archived`.

A specification may be active while containing a deprecated requirement retained for compatibility.

Requirement-level lifecycle must be represented explicitly when it differs from the parent specification.

---

## 20. Requirement Authority

A requirement may derive authority from:

* the containing approved specification;
* an imported policy;
* an adopted standard;
* a governing decision;
* a delegated authority;
* a domain extension.

Authority should identify:

```yaml
authority:
  source: MSL-CORE-0003
  level: normative
  adopted_by: Monad Architecture Team
```

Imported requirements must preserve their originating authority and adoption relationship.

---

## 21. Requirement Relationships

Requirements may participate in typed relationships.

Initial relationship types include:

* `depends_on`;
* `refines`;
* `implements`;
* `verifies`;
* `conflicts_with`;
* `supersedes`;
* `derived_from`;
* `constrained_by`;
* `waived_by`;
* `excepted_by`;
* `applies_to`;
* `satisfied_by`.

Example:

```yaml
relationships:
  refines:
    - MSL-VISION-REQ-003
  verified_by:
    - MSL-NORM-AC-001
```

---

## 22. Requirement Refinement

A requirement may refine another requirement by adding precision without contradicting it.

Parent:

> Specifications **MUST** support normative requirements.

Refinement:

> Every normative requirement **MUST** have a stable identifier.

A refinement does not replace its parent.

Both remain applicable unless another relationship indicates supersession.

---

## 23. Requirement Dependencies

A requirement may depend on another requirement.

Example:

```text
Requirement B depends on Requirement A
```

This means B cannot be interpreted, implemented, or verified correctly unless A is satisfied or available.

Dependency does not imply that satisfying A satisfies B.

---

## 24. Requirement Conflicts

Two requirements conflict when they cannot both be satisfied under overlapping applicability.

Example:

* The compiler **MUST** reject unknown fields.
* The compiler **MUST** preserve unknown extension fields.

These may conflict when applied to the same field category and language version.

The compiler MUST detect explicit conflicts.

It SHOULD detect structurally inferable conflicts.

It MUST NOT silently choose one active binding requirement over another without a defined precedence or override rule.

---

## 25. Exceptions

An exception is part of the requirement definition.

Example:

> The compiler **MUST** reject unresolved references, except when compiling a draft specification under the partial-compilation profile.

Machine representation:

```yaml
exceptions:
  - id: MSL-NORM-EXC-001
    when:
      lifecycle: draft
      compilation_mode: partial
```

Exceptions must be:

* explicit;
* bounded;
* traceable;
* testable where applicable.

An exception is not a waiver.

---

## 26. Waivers

A waiver authorizes scoped nonconformance without changing the underlying requirement.

A waiver must include:

* stable identity;
* waived requirement;
* scope;
* rationale;
* approver;
* issue date;
* expiration or review date;
* compensating controls where applicable;
* lifecycle status.

Example:

```yaml
waiver:
  id: WAIVER-0001
  requirement: MSL-NORM-REQ-011
  scope:
    artifact: LEGACY-SPEC-0004
  rationale: Migration pending
  approved_by: Monad Architecture Team
  expires: 2026-12-31
```

Waivers must be first-class artifacts or stable local semantic objects.

A waiver must not silently modify the requirement.

---

## 27. Requirement Groups

Related requirements may be grouped.

Examples:

* parser requirements;
* security requirements;
* lifecycle requirements;
* local-first requirements;
* conformance requirements.

A group may provide inherited:

* subject;
* applicability;
* authority;
* verification method;
* status;
* tags.

Inherited properties must be represented explicitly in compiled semantics.

---

## 28. Requirement Profiles

Profiles select or activate requirement sets for a defined context.

Example:

```yaml
profile:
  id: local-bootstrap
  activates:
    - MSL-CORE
    - MSL-NORM-LOCAL-FIRST
  excludes:
    - distributed-compilation
```

Profiles must not erase inactive requirements from history.

They determine applicability, not existence.

---

## 29. Rationale

Rationale is informative content explaining why a requirement exists.

Rationale must remain separate from the normative statement.

Example:

```markdown
### MSL-NORM-REQ-012

The compiler **MUST NOT** require cloud services for core validation.

**Rationale:** Monad must remain usable in local, offline, private, and restricted environments.
```

Changing rationale without changing normative meaning may be a compatible documentation update.

---

## 30. Verification

Each active normative requirement SHOULD identify one or more verification methods.

Initial verification methods include:

* static analysis;
* schema validation;
* graph validation;
* unit test;
* integration test;
* acceptance scenario;
* manual inspection;
* formal proof;
* runtime observation;
* audit evidence;
* delegated verification.

Example:

```yaml
verification:
  methods:
    - static_analysis
    - conformance_fixture
```

A requirement may be valid before a verifier exists, but its verification gap must remain visible.

---

## 31. Evidence

Verification produces evidence.

Evidence may include:

* passing test results;
* validation reports;
* signed approvals;
* benchmark records;
* generated traces;
* inspection records;
* formal proofs.

Evidence must identify:

* requirement;
* verifier;
* execution or review time;
* result;
* environment;
* artifact versions;
* provenance.

Evidence is not the requirement itself.

---

## 32. Traceability

Every normative requirement must be traceable to:

* its source specification;
* its source span;
* its authority;
* its version;
* its lifecycle state.

Where applicable, it should also trace to:

* rationale;
* parent requirements;
* implementing artifacts;
* verification artifacts;
* generated outputs;
* waivers;
* exceptions;
* superseding requirements.

---

## 33. Natural-Language Ambiguity

Natural-language requirements may contain ambiguity.

Ambiguous terms include:

* quickly;
* normally;
* appropriate;
* secure;
* intuitive;
* scalable;
* robust;
* significant;
* sufficient;
* minimal.

Such terms are not prohibited, but normative use should be supported by:

* definitions;
* measurable thresholds;
* domain standards;
* machine constraints;
* acceptance criteria.

The compiler SHOULD warn when undefined qualitative terms materially affect conformance.

---

## 34. Numeric and Measurable Requirements

Measurable requirements should declare:

* quantity;
* unit;
* comparator;
* tolerance;
* measurement conditions;
* aggregation method;
* observation window.

Example:

```yaml
constraint:
  metric: validation.duration
  comparator: less_than
  value: 2
  unit: seconds
  conditions:
    corpus_size: 1000_artifacts
    hardware_profile: reference_development_machine
```

A bare statement such as “validation MUST be fast” is insufficient for deterministic conformance.

---

## 35. Requirement Compilation

Compilation of normative requirements conceptually includes:

```text
Source Requirement
    ↓
Structural Recognition
    ↓
Identity Validation
    ↓
Keyword Interpretation
    ↓
Subject Resolution
    ↓
Condition and Applicability Resolution
    ↓
Relationship Resolution
    ↓
Conflict Analysis
    ↓
Normalized Requirement IR
```

The compiler must preserve both:

* the normalized semantic requirement;
* the original human-readable statement.

---

## 36. Requirement Normalization

Different surface forms may normalize to equivalent semantics.

Human form:

> The compiler **MUST NOT** discard unknown extension metadata.

Structured form:

```yaml
subject: compiler
obligation: must_not
predicate: discard
target: unknown_extension_metadata
```

Normalization must not invent semantics absent from the source.

When interpretation is uncertain, the compiler should emit a diagnostic rather than silently choose a meaning.

---

## 37. Normative Requirements

### MSL-NORM-REQ-001

Every normative requirement **MUST** have a stable identifier.

### MSL-NORM-REQ-002

Every normative requirement **MUST** declare or permit deterministic inference of an obligation.

### MSL-NORM-REQ-003

Every normative requirement **MUST** preserve its source specification and source span.

### MSL-NORM-REQ-004

A normative requirement **MUST** identify or permit deterministic inference of its subject.

### MSL-NORM-REQ-005

Conditional requirements **MUST** represent their conditions explicitly.

### MSL-NORM-REQ-006

Scoped requirements **MUST** represent applicability explicitly.

### MSL-NORM-REQ-007

A requirement claiming machine-verifiable conformance **MUST** define or reference a verification method.

### MSL-NORM-REQ-008

Requirements **MUST NOT** use filesystem location as identity.

### MSL-NORM-REQ-009

Two active requirements with overlapping applicability and incompatible obligations **MUST** produce a conflict diagnostic unless an explicit precedence rule resolves the conflict.

### MSL-NORM-REQ-010

A compiler **MUST NOT** infer normative authority solely from capitalization.

### MSL-NORM-REQ-011

A compiler **MUST** distinguish normative requirements from informative examples, quotations, and rationale.

### MSL-NORM-REQ-012

A waiver **MUST** preserve the original requirement unchanged.

### MSL-NORM-REQ-013

A waiver **MUST** declare scope, rationale, authority, and lifecycle.

### MSL-NORM-REQ-014

An exception **MUST** be distinguishable from a waiver.

### MSL-NORM-REQ-015

A materially new obligation **MUST** receive a new requirement identifier.

### MSL-NORM-REQ-016

Compatible wording clarification **MUST NOT** require a new requirement identifier when normative meaning remains unchanged.

### MSL-NORM-REQ-017

Deprecated and superseded requirements **MUST** remain historically discoverable.

### MSL-NORM-REQ-018

The compiler **MUST** preserve requirement-level lifecycle status in KIR.

### MSL-NORM-REQ-019

The compiler **MUST** preserve requirement relationships in KIR.

### MSL-NORM-REQ-020

The compiler **MUST NOT** silently discard duplicate requirement identifiers.

### MSL-NORM-REQ-021

Requirements **SHOULD** express one independently assessable primary obligation.

### MSL-NORM-REQ-022

Requirements **SHOULD** avoid undefined qualitative terms that materially affect conformance.

### MSL-NORM-REQ-023

Active requirements **SHOULD** identify verification methods.

### MSL-NORM-REQ-024

`SHOULD` and `SHOULD NOT` deviations **SHOULD** preserve justification when required by the active profile.

### MSL-NORM-REQ-025

Requirement groups **MAY** provide inherited properties.

### MSL-NORM-REQ-026

Inherited requirement properties **MUST** be explicit in normalized compiler output.

### MSL-NORM-REQ-027

Machine normalization **MUST NOT** invent a subject, condition, threshold, or exception that cannot be supported by the source.

### MSL-NORM-REQ-028

Uncertain requirement interpretation **MUST** produce a diagnostic or unresolved semantic state.

### MSL-NORM-REQ-029

Requirement evidence **MUST** reference the requirement and the evaluated artifact versions.

### MSL-NORM-REQ-030

Requirement profiles **MUST** determine applicability without deleting inactive requirements from historical knowledge.

---

## 38. Conceptual Model

```text
Normative Requirement

├── id
├── statement
├── subject
├── obligation
├── predicate
├── target
├── conditions
├── applicability
├── authority
├── status
├── rationale
├── verification
├── evidence
├── relationships
├── exceptions
├── waivers
└── source_map
        │
        ▼
Normalized Requirement IR
        │
        ├── Conflict Analysis
        ├── Traceability
        ├── Verification Planning
        ├── Test Generation
        ├── Policy Evaluation
        └── Conformance Reporting
```

---

## 39. Machine Specification

```yaml
machine_spec:
  kind: normative_requirement_language

  normative_keywords:
    must:
      strength: binding
      violation: nonconformance

    must_not:
      strength: prohibition
      violation: nonconformance

    should:
      strength: strong_recommendation
      deviation_requires_justification: profile_dependent

    should_not:
      strength: strong_discouragement
      deviation_requires_justification: profile_dependent

    may:
      strength: permission

  requirement:
    required:
      - id
      - statement
      - obligation
      - authority_class
      - lifecycle
      - source_map

    recommended:
      - subject
      - predicate
      - target
      - applicability
      - verification
      - rationale

    optional:
      - conditions
      - relationships
      - exceptions
      - waivers
      - evidence
      - tags

  lifecycle_states:
    - proposed
    - draft
    - active
    - deprecated
    - superseded
    - withdrawn
    - archived

  relationships:
    - depends_on
    - refines
    - implements
    - verifies
    - conflicts_with
    - supersedes
    - derived_from
    - constrained_by
    - waived_by
    - excepted_by
    - applies_to
    - satisfied_by

  verification_methods:
    - static_analysis
    - schema_validation
    - graph_validation
    - unit_test
    - integration_test
    - acceptance_scenario
    - manual_inspection
    - formal_proof
    - runtime_observation
    - audit_evidence
    - delegated_verification

  conflict_resolution_order:
    - applicability
    - authority
    - lifecycle
    - version
    - specificity
    - explicit_override
    - approved_waiver
```

---

## 40. Invariants

```yaml
invariants:
  - id: MSL-NORM-INV-001
    expression: requirement.id != null
    description: Every normative requirement has stable identity.

  - id: MSL-NORM-INV-002
    expression: requirement.obligation in normative_keywords
    description: Every requirement uses a recognized obligation.

  - id: MSL-NORM-INV-003
    expression: requirement.source_map != null
    description: Every requirement remains traceable to source.

  - id: MSL-NORM-INV-004
    expression: duplicate_active_requirement_id.count <= 1
    description: Active requirement identifiers are unique within scope.

  - id: MSL-NORM-INV-005
    expression: waiver.modifies_requirement == false
    description: Waivers do not mutate underlying requirements.

  - id: MSL-NORM-INV-006
    expression: exception.kind != waiver.kind
    description: Exceptions and waivers remain semantically distinct.

  - id: MSL-NORM-INV-007
    expression: normalized_requirement.invented_semantics == false
    description: Normalization does not invent unsupported semantics.

  - id: MSL-NORM-INV-008
    expression: superseded_requirement.discoverable == true
    description: Superseded requirements remain historically accessible.

  - id: MSL-NORM-INV-009
    expression: machine_verifiable_requirement.verification != null
    description: Machine-verifiable requirements identify verification.

  - id: MSL-NORM-INV-010
    expression: conflicting_binding_requirements.silently_resolved == false
    description: Binding conflicts are never silently resolved.
```

---

## 41. Diagnostics

### MSL0201 — Missing Requirement Identifier

A normative requirement lacks a stable identifier.

### MSL0202 — Duplicate Requirement Identifier

More than one requirement declares the same identifier in an overlapping scope.

### MSL0203 — Missing Normative Obligation

A normative declaration does not specify a recognized obligation.

### MSL0204 — Ambiguous Requirement Subject

The compiler cannot determine which entity must comply.

### MSL0205 — Ambiguous Conditional Requirement

Conditional language is present, but no deterministic condition can be resolved.

### MSL0206 — Invalid Applicability Scope

The requirement references an unknown or incompatible profile, version, platform, or feature.

### MSL0207 — Non-Atomic Requirement

A requirement appears to contain multiple independently assessable obligations.

### MSL0208 — Undefined Qualitative Constraint

A binding requirement uses an undefined qualitative term that prevents conformance evaluation.

### MSL0209 — Normative Requirement Conflict

Two active binding requirements are incompatible under overlapping applicability.

### MSL0210 — Invalid Waiver

A waiver lacks required scope, rationale, authority, lifecycle, or expiration information.

### MSL0211 — Waiver Mutates Requirement

A waiver attempts to rewrite the underlying normative obligation.

### MSL0212 — Invalid Exception

An exception is unbounded, untraceable, or indistinguishable from a waiver.

### MSL0213 — Missing Verification Method

A requirement claims machine-verifiable status without a verification method.

### MSL0214 — Normative Authority Inferred from Formatting

The source relies on capitalization or visual emphasis without structural authority declaration.

### MSL0215 — Unsupported Requirement Lifecycle

The requirement declares an unknown lifecycle state.

### MSL0216 — Untraceable Requirement

The compiler cannot preserve source mapping for the requirement.

### MSL0217 — Invalid Requirement Supersession

A requirement claims to supersede itself or creates an invalid supersession cycle.

### MSL0218 — Incomplete Measurement Definition

A measurable requirement omits a required unit, comparator, condition, or threshold.

### MSL0219 — Unsupported Obligation

The declared obligation is not recognized by the active MSL version or extension.

### MSL0220 — Unresolved Requirement Interpretation

The compiler cannot normalize the requirement without inventing semantics.

---

## 42. Acceptance Criteria

This specification is satisfied when:

1. the five core normative keywords have stable semantics;
2. every normative requirement requires stable identity;
3. requirement subjects, obligations, conditions, applicability, authority, and verification are represented conceptually;
4. normative content is distinguishable from informative prose and examples;
5. requirement lifecycle exists independently from document lifecycle;
6. requirements may refine, depend on, conflict with, supersede, and verify one another;
7. exceptions and waivers are distinct;
8. waivers preserve the original requirement;
9. binding conflicts produce deterministic diagnostics;
10. requirement normalization preserves both semantics and source text;
11. requirement profiles determine applicability without deleting historical knowledge;
12. machine-verifiable requirements identify verification methods;
13. generated KIR can retain requirement identity, status, relationships, authority, and source mapping;
14. ambiguous normalization produces diagnostics rather than invented meaning.

---

## 43. Conformance Examples

### 43.1 Valid Mandatory Requirement

```markdown
### EXAMPLE-REQ-001

The compiler **MUST** reject duplicate active artifact identities.
```

Structured form:

```yaml
requirements:
  - id: EXAMPLE-REQ-001
    subject: compiler
    obligation: must
    predicate: reject
    target: duplicate_active_artifact_identity
    verification:
      method: conformance_fixture
    status: active
```

### 43.2 Valid Prohibition

```markdown
### EXAMPLE-REQ-002

A supplementary source **MUST NOT** redefine the canonical specification identity.
```

### 43.3 Valid Conditional Requirement

```markdown
### EXAMPLE-REQ-003

When partial compilation is disabled, the compiler **MUST** reject unresolved mandatory references.
```

```yaml
condition:
  compilation.partial: false
```

### 43.4 Valid Recommendation

```markdown
### EXAMPLE-REQ-004

A normative requirement **SHOULD** define an explicit verification method.
```

### 43.5 Invalid Missing Identity

```markdown
The compiler **MUST** emit deterministic diagnostics.
```

Expected diagnostic:

```text
MSL0201: normative requirement is missing a stable identifier
```

### 43.6 Invalid Ambiguous Subject

```markdown
### EXAMPLE-REQ-006

Expired credentials **MUST** be rejected.
```

This may be resolvable from section scope. Without such scope, the subject is ambiguous.

Expected diagnostic:

```text
MSL0204: unable to determine the complying subject
```

### 43.7 Invalid Non-Atomic Requirement

```markdown
### EXAMPLE-REQ-007

The compiler **MUST** parse source, emit KIR, generate documentation, and publish reports.
```

Expected diagnostic:

```text
MSL0207: requirement contains multiple independently assessable obligations
```

### 43.8 Valid Exception

```yaml
requirements:
  - id: EXAMPLE-REQ-008
    obligation: must
    statement: The compiler must reject unresolved references.
    exceptions:
      - id: EXAMPLE-EXC-001
        when:
          lifecycle: draft
          compilation_mode: partial
```

### 43.9 Valid Waiver

```yaml
waiver:
  id: EXAMPLE-WAIVER-001
  requirement: EXAMPLE-REQ-008
  scope:
    artifact: LEGACY-SPEC-0001
  rationale: Migration has not yet established all external references.
  approved_by: architecture-team
  issued: 2026-08-03
  expires: 2026-10-01
  status: active
```

### 43.10 Invalid Conflict

```markdown
### EXAMPLE-REQ-010

The compiler **MUST** reject unknown extension fields.

### EXAMPLE-REQ-011

The compiler **MUST** preserve all unknown extension fields.
```

When both apply to the same extension class, expected diagnostic:

```text
MSL0209: conflicting active binding requirements
```

---

## 44. Security and Trust Considerations

Normative requirements may govern:

* generated code;
* infrastructure;
* security controls;
* access policies;
* AI actions;
* compliance evidence;
* operational workflows.

Threats include:

* hiding binding obligations in informative prose;
* creating conflicting requirements to influence compiler behavior;
* unauthorized waivers;
* forged approvals;
* malicious requirement imports;
* scope manipulation;
* indefinite waivers;
* ambiguous qualitative language;
* AI-generated requirements falsely marked as approved;
* deliberate omission of verification criteria.

Implementations should:

* preserve authority provenance;
* require authorization for lifecycle transitions and waivers;
* expose active conflicts;
* make inherited scope visible;
* prevent unsigned or untrusted imports from gaining authority silently;
* record AI authorship;
* reject cyclic supersession;
* validate waiver expiration;
* distinguish policy exceptions from operational failures;
* preserve complete requirement history.

---

## 45. Evolution and Compatibility

The normative requirement model may evolve by adding:

* new obligation classes;
* richer conditions;
* formal expressions;
* policy constructs;
* quantitative constraint types;
* domain-specific verification methods.

Adding a new obligation whose semantics do not alter existing obligations may be compatible when introduced through a namespaced extension.

Changing the meaning of `MUST`, `MUST NOT`, `SHOULD`, `SHOULD NOT`, or `MAY` is a breaking language change.

Requirement IDs must remain stable when wording changes without altering normative meaning.

Materially altered obligations require:

* a new requirement identity;
* an explicit `supersedes`, `replaces`, or `derived_from` relationship;
* migration guidance;
* impact analysis;
* preserved historical access.

---

## 46. Open Questions

1. Should MSL support additional core obligations such as `shall`, `recommended`, or `optional`?
2. Should requirement subjects always be explicit in the machine profile?
3. What expression language should represent conditions?
4. How are probabilistic requirements represented?
5. How should requirements over AI behavior express confidence and nondeterminism?
6. Should requirement IDs be globally unique or artifact-scoped with fully qualified names?
7. How should inherited applicability be displayed to authors?
8. How are organization-level policies imported into project specifications?
9. What formal conflict-detection capabilities are required before MSL 1.0?
10. How should temporal requirements be represented?
11. How should performance budgets reference reproducible hardware profiles?
12. Can one waiver cover multiple requirements?
13. How should emergency waivers differ from planned waivers?
14. What authorization model governs requirement approval?
15. How should implementation evidence expire or become stale?
16. Which requirement fields belong directly in KIR?
17. How should Gherkin scenarios map to normative requirements?
18. How should externally adopted standards preserve original section identifiers?
19. Can AI propose requirement normalization without human confirmation?
20. What minimum fields are required for requirements in narrative and structured profiles?

---

## 47. Related Specifications

This specification is extended by:

| ID            | Title                               |
| ------------- | ----------------------------------- |
| MSL-CORE-0004 | Metadata and Identity Model         |
| MSL-CORE-0005 | Structural Grammar                  |
| MSL-CORE-0006 | Machine Specification Blocks        |
| MSL-CORE-0007 | Type and Constraint System          |
| MSL-CORE-0008 | Relationship and Reference Syntax   |
| MSL-CORE-0009 | Conformance and Acceptance Criteria |
| MSL-CORE-0010 | Versioning and Evolution            |

It informs:

| Series     | Relevance                                                   |
| ---------- | ----------------------------------------------------------- |
| KIR-CORE   | Defines normalized requirement representation               |
| MSC-CORE   | Defines requirement parsing and semantic analysis           |
| MKE        | Stores, queries, and traces requirements                    |
| VALIDATION | Evaluates requirement conformance                           |
| GENERATION | Derives tests, code, and policies from requirements         |
| AI         | Grounds planning and reasoning in authoritative obligations |

---

## Status

Draft.

This document defines the normative requirement language of MSL.

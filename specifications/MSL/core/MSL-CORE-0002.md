---

artifact:
id: MSL-CORE-0002
type: knowledge.specification
namespace: monad

metadata:
title: Specification Document Model
version: 0.1.0
status: draft
created: 2026-08-03
authors:
- Monad Architecture Team
tags:
- msl
- specification
- document-model
- structure
- compilation

relationships:
depends_on:
- ADR-0002
- MSL-CORE-0001
- MKE-CORE-0002
- MKE-CORE-0005
references:
- MKE-ARTIFACT-0001
- MKE-ARTIFACT-0002
- MKE-ARTIFACT-0003
enables:
- MSL-CORE-0003
- MSL-CORE-0004
- MSL-CORE-0005
- MSL-CORE-0006
- MSL-CORE-0008
- MSL-CORE-0009

compilation:
language: msl-markdown
language_version: bootstrap
status: bootstrap
---

# MSL-CORE-0002 — Specification Document Model

## 1. Purpose

This specification defines the canonical conceptual model of a Monad Specification Language document.

It establishes:

* what constitutes an MSL specification document;
* which logical sections a specification may contain;
* which sections are required at each maturity level;
* how human-readable and machine-processable content coexist;
* how source documents map into a compiler-facing document model;
* how multiple source files may compose one logical specification;
* how specifications preserve identity, provenance, authority, and traceability.

This document defines the logical model of a specification.

It does not fully define the concrete syntax of `msl-markdown`. That responsibility belongs primarily to `MSL-CORE-0005`.

---

## 2. Context

A traditional technical document is generally treated as an ordered sequence of headings, paragraphs, code blocks, tables, and examples.

That model is useful for presentation but insufficient for compilation.

A Monad specification must serve several audiences simultaneously:

* human authors;
* human reviewers;
* compiler frontends;
* validators;
* knowledge-graph builders;
* generation engines;
* AI systems;
* publication systems;
* migration tools.

The specification document model must therefore distinguish between:

1. the source representation written by an author;
2. the logical specification represented by that source;
3. the semantic elements extracted by the compiler;
4. the normalized KIR emitted after successful compilation.

The order and appearance of a source document may assist human understanding, but semantic meaning must not depend exclusively on visual presentation.

---

## 3. Scope

This specification defines:

* source documents;
* logical specifications;
* document units;
* semantic sections;
* authority classes;
* maturity profiles;
* multi-file specifications;
* inclusions and attachments;
* source-location tracking;
* duplicate and conflicting declarations;
* document completeness;
* document-level compilation behavior.

This specification does not define:

* the complete metadata schema;
* normative-keyword semantics;
* machine-expression syntax;
* the MSL type system;
* cross-artifact reference syntax;
* KIR serialization;
* compiler implementation details.

Those topics are defined by later specifications.

---

## 4. Non-Goals

This document does not:

* mandate that all specifications use identical prose organization;
* require every specification to contain every possible section;
* define a general-purpose markup language;
* require one specification to exist in exactly one file;
* make Markdown heading order the canonical semantic model;
* permit arbitrary executable code inside specifications;
* define publication styling or website rendering;
* define domain-specific specification structures.

---

## 5. Core Principle

> An MSL source document is a human-oriented representation of a logical specification, not the specification's canonical semantic identity.

A specification may move between files, be split into modules, be rendered in different formats, or be generated through an interactive authoring tool without changing its identity.

The compiler must interpret the source into a structured document model before semantic compilation.

---

## 6. Terminology

### 6.1 Source Document

A physical or virtual authoring unit containing MSL syntax.

Examples:

* a Markdown file;
* a YAML document;
* a generated source buffer;
* a document produced by an interactive editor.

### 6.2 Logical Specification

The complete specification artifact identified by one canonical artifact ID.

A logical specification may be represented by one or more source documents.

### 6.3 Document Unit

A recognized structural element within a source document.

Examples:

* metadata block;
* purpose section;
* requirement declaration;
* machine-specification block;
* invariant;
* acceptance criterion;
* conformance example.

### 6.4 Semantic Section

A named logical category of specification content.

A semantic section is not necessarily equivalent to one Markdown heading.

### 6.5 Primary Source

The source document containing the canonical artifact declaration for a logical specification.

### 6.6 Supplementary Source

A source document contributing content to an existing logical specification without redefining its identity.

### 6.7 Attachment

A related artifact referenced by a specification but not compiled as part of its semantic body unless explicitly imported.

### 6.8 Compilation Unit

The complete set of source documents compiled together to produce one logical specification.

### 6.9 Source Span

A precise location in source material used for diagnostics and traceability.

A source span may include:

* source URI;
* file path;
* start line;
* start column;
* end line;
* end column;
* byte range;
* source fragment identity.

### 6.10 Authority Class

The semantic authority assigned to content, such as normative, informative, machine-normative, provisional, or deprecated.

---

## 7. Document Layers

An MSL specification document has four conceptual layers.

```text
Source Representation
        ↓
Structural Document Model
        ↓
Semantic Specification Model
        ↓
Knowledge Intermediate Representation
```

### 7.1 Source Representation

The concrete author-facing syntax.

For the bootstrap phase:

```text
Markdown
+
YAML front matter
+
Structured fenced blocks
```

### 7.2 Structural Document Model

The parsed arrangement of document units.

Examples:

* headings;
* paragraphs;
* metadata;
* requirement blocks;
* examples;
* machine-specification blocks.

### 7.3 Semantic Specification Model

The meaning extracted from the structural model.

Examples:

* identity;
* requirements;
* constraints;
* references;
* invariants;
* acceptance criteria;
* provenance.

### 7.4 KIR

The normalized compiler output independent of source presentation.

---

## 8. Logical Specification Model

A logical specification consists of the following top-level elements:

```text
Logical Specification

├── Identity
├── Metadata
├── Compilation Declaration
├── Provenance
├── Lifecycle
├── Relationships
├── Scope Definition
├── Terminology
├── Informative Content
├── Normative Requirements
├── Machine-Normative Content
├── Invariants
├── Diagnostics
├── Acceptance Criteria
├── Conformance Examples
├── Security Considerations
├── Evolution Rules
├── Open Questions
└── Source Map
```

Some elements are mandatory for all conforming specifications.

Others are required only by specific maturity profiles.

---

## 9. Required Core Elements

Every conforming MSL specification MUST contain or inherit the following logical elements:

1. canonical artifact identity;
2. title;
3. specification version;
4. lifecycle status;
5. declared MSL language and language version;
6. purpose;
7. source provenance;
8. at least one source location;
9. compilation profile;
10. explicit indication of normative authority.

A specification claiming a maturity level above `narrative` MUST satisfy the additional requirements of that profile.

---

## 10. Recommended Semantic Sections

The bootstrap document model recognizes the following recommended sections:

| Section                           | Primary Role                                |
| --------------------------------- | ------------------------------------------- |
| Purpose                           | Defines why the specification exists        |
| Context                           | Explains the problem and background         |
| Scope                             | Defines included concerns                   |
| Non-Goals                         | Defines excluded concerns                   |
| Terminology                       | Defines authoritative terms                 |
| Normative Requirements            | Declares required or permitted behavior     |
| Conceptual Model                  | Explains system structure                   |
| Machine Specification             | Declares enforceable structured semantics   |
| Invariants                        | Declares conditions that must remain true   |
| Diagnostics                       | Defines deterministic failures and warnings |
| Acceptance Criteria               | Defines observable conformance              |
| Conformance Examples              | Provides valid and invalid examples         |
| Security and Trust Considerations | Addresses risks and controls                |
| Evolution and Compatibility       | Defines versioning and migration behavior   |
| Open Questions                    | Records unresolved issues                   |
| Related Specifications            | Declares related knowledge                  |

The exact heading names may vary by surface syntax, but the semantic roles must remain distinguishable.

---

## 11. Document Maturity Profiles

MSL supports progressive formalization through maturity profiles.

The initial profiles are:

```text
narrative
structured
normative
machine
executable
```

### 11.1 Narrative Profile

A narrative specification captures a stable identity and human-readable intent.

Required elements:

* identity;
* title;
* status;
* version;
* purpose;
* provenance;
* source map.

A narrative specification is not considered machine-enforceable.

### 11.2 Structured Profile

A structured specification adds explicit sections, relationships, scope, and terminology.

Required additions:

* scope;
* non-goals or explicit absence;
* relationships;
* terminology when domain-specific terms exist;
* compilation declaration.

### 11.3 Normative Profile

A normative specification defines authoritative requirements.

Required additions:

* normative requirements;
* unique requirement identifiers;
* authority classification;
* acceptance criteria or explicit conformance delegation.

### 11.4 Machine Profile

A machine specification provides structured semantics that can be validated directly.

Required additions:

* machine-specification content;
* declared schema or semantic kind;
* constraints or invariants;
* deterministic diagnostics;
* machine-validation status.

### 11.5 Executable Profile

An executable specification can produce or verify concrete behavior through conformance tooling.

Required additions:

* executable acceptance criteria or tests;
* conformance fixtures;
* backend or verifier declarations;
* deterministic expected outcomes;
* traceable execution results.

A specification MAY declare a lower profile while containing elements from a higher profile.

It MUST NOT claim a higher profile unless all mandatory requirements of that profile are satisfied.

---

## 12. Primary and Supplementary Sources

A logical specification may be composed from multiple source documents.

### 12.1 Primary Source Requirements

Exactly one primary source MUST declare:

* canonical specification identity;
* title;
* version;
* lifecycle status;
* compilation profile.

### 12.2 Supplementary Sources

Supplementary sources MAY contribute:

* examples;
* requirement groups;
* machine-specification fragments;
* diagrams;
* domain-specific appendices;
* acceptance scenarios;
* migration tables.

Supplementary sources MUST identify the logical specification they extend.

### 12.3 Identity Redefinition

A supplementary source MUST NOT redefine:

* canonical identity;
* namespace;
* artifact type;
* authoritative version;
* primary lifecycle status.

Attempted redefinition is a compilation error unless an explicit merge rule permits the field.

### 12.4 Compilation Unit

The compiler MUST assemble the primary and supplementary sources into one compilation unit before semantic analysis.

---

## 13. Single-File and Multi-File Forms

### 13.1 Single-File Form

A complete specification may exist in one file.

```text
MSL-CORE-0002.md
```

This is the preferred bootstrap form.

### 13.2 Directory Form

A specification may later use a directory-based form:

```text
MSL-CORE-0002/
├── specification.md
├── requirements.msl.yaml
├── examples/
├── diagrams/
├── acceptance/
└── migrations/
```

The directory form represents one logical specification, not several independent artifacts, unless individual files explicitly declare separate artifact identities.

### 13.3 Manifested Composition

A multi-file specification SHOULD include a manifest declaring source order and semantic role.

Example:

```yaml
specification:
  id: MSL-CORE-0002

sources:
  - path: specification.md
    role: primary

  - path: requirements.msl.yaml
    role: normative

  - path: acceptance/
    role: conformance_suite
```

The exact manifest syntax is deferred to later specifications.

---

## 14. Semantic Section Identity

Important semantic sections SHOULD possess stable local identity.

Examples:

```text
MSL-DOC-REQ-001
MSL-DOC-INV-001
MSL-DOC-AC-001
```

Local semantic identifiers permit:

* precise references;
* diagnostic attribution;
* acceptance traceability;
* generated test naming;
* change-impact analysis;
* partial recompilation.

A heading name alone is not a stable semantic identifier.

---

## 15. Content Authority

Each document unit MUST have an authority class either explicitly declared or deterministically inferred.

Initial authority classes:

| Class             | Meaning                                              |
| ----------------- | ---------------------------------------------------- |
| informative       | Explanatory content without binding requirements     |
| normative         | Human-readable authoritative requirement             |
| machine_normative | Structured authoritative semantics                   |
| provisional       | Experimental or unresolved semantics                 |
| deprecated        | Retained for history or compatibility                |
| example           | Illustrative content not authoritative unless marked |
| rationale         | Reasoning supporting a decision                      |
| test_evidence     | Evidence produced by conformance execution           |

The compiler MUST NOT treat ordinary informative prose as machine-normative merely because it appears imperative.

---

## 16. Informative and Normative Separation

A specification SHOULD make the distinction between informative and normative content visible to human readers.

Valid strategies include:

* dedicated sections;
* explicit block annotations;
* requirement declarations;
* metadata annotations;
* surface-specific syntax.

The compiler MUST retain authority classification in KIR.

When informative prose conflicts with normative content, the compiler SHOULD emit a conflict diagnostic rather than guessing which meaning is intended.

Machine-normative content takes precedence over informative examples only when the specification explicitly declares that precedence.

---

## 17. Section Ordering

The `msl-markdown` bootstrap profile SHOULD use the following order:

1. metadata;
2. title;
3. purpose;
4. context;
5. scope;
6. non-goals;
7. terminology;
8. conceptual model;
9. normative requirements;
10. machine specification;
11. invariants;
12. diagnostics;
13. acceptance criteria;
14. conformance examples;
15. security considerations;
16. evolution and compatibility;
17. open questions;
18. related specifications;
19. status.

This ordering supports human readability but is not semantically canonical.

A compiler MUST identify semantic sections by parsed role, not by ordinal position alone.

---

## 18. Content Inclusion

A specification MAY include content from another source.

Inclusions must distinguish between:

### 18.1 Semantic Import

Imported content becomes part of the logical specification and participates in compilation.

### 18.2 Informative Include

Included material is displayed or referenced for human convenience but does not alter semantic compilation.

### 18.3 External Reference

The specification points to another artifact without incorporating its content.

The inclusion type MUST be explicit.

Ambiguous transclusion is not permitted in normative content.

---

## 19. Attachments

Attachments may include:

* diagrams;
* images;
* datasets;
* test fixtures;
* generated schemas;
* benchmark results;
* formal models;
* recorded conversations;
* source archives.

Attachments MUST have either:

* their own artifact identity; or
* a stable local attachment identity within the specification.

An attachment is not automatically authoritative.

Its authority and compilation role must be declared.

---

## 20. Source Mapping

Every semantic element emitted by the compiler MUST retain source mapping.

A source map SHOULD identify:

```yaml
source:
  uri: specifications/MSL/core/MSL-CORE-0002.md
  start:
    line: 1
    column: 1
  end:
    line: 20
    column: 1
```

For generated or transformed source, provenance SHOULD also include:

* originating artifact;
* transformation identity;
* generator version;
* generation timestamp;
* original source span when available.

Source maps enable:

* precise diagnostics;
* IDE navigation;
* traceability;
* incremental compilation;
* generated-artifact lineage;
* AI evidence citation.

---

## 21. Duplicate Declarations

The compiler MUST detect duplicate semantic declarations.

Examples include:

* duplicate requirement IDs;
* duplicate invariant IDs;
* multiple primary sources;
* conflicting metadata values;
* repeated field declarations in machine content;
* duplicate artifact identities.

Duplicate declarations may be:

* errors;
* warnings;
* permitted merges.

The behavior must be defined by the semantic construct or active profile.

The compiler MUST NOT silently discard conflicting declarations.

---

## 22. Partial Specifications

MSL supports partially complete specifications during early development.

A partial specification may contain unresolved:

* references;
* types;
* requirements;
* machine blocks;
* acceptance criteria;
* authority decisions.

Partial compilation MUST distinguish:

* tolerated incompleteness;
* invalid semantics;
* unresolved external dependencies;
* unsupported language features.

A partial specification MUST declare a lifecycle or compilation state that permits incompleteness.

An `approved` or `active` specification MUST NOT rely on unresolved mandatory semantics unless an explicit waiver exists.

---

## 23. Derived Sections

Some document views may be generated rather than authored.

Examples:

* table of contents;
* dependency summary;
* requirement index;
* diagnostic index;
* source map;
* referenced-by list;
* compilation report;
* conformance report;
* change history.

Derived sections SHOULD be marked as generated.

Generated views MUST NOT become an independent source of authoritative semantics unless explicitly adopted through a defined workflow.

---

## 24. Document Identity and File Location

The specification identity MUST remain independent from:

* filename;
* directory path;
* repository name;
* URL;
* publication slug.

The compiler may use paths for discovery, but path changes must not create a new logical specification.

Example:

```text
specifications/MSL/core/MSL-CORE-0002.md
```

may later become:

```text
specifications/MSL/core/MSL-CORE-0002/specification.md
```

without changing:

```text
MSL-CORE-0002
```

---

## 25. Document Status and Artifact Lifecycle

The document's source status and the logical specification lifecycle are related but distinct.

Examples:

* a source file may contain uncommitted edits while the last compiled specification remains `approved`;
* a published rendering may reflect version `1.0.0` while the source contains a `1.1.0-draft`;
* a migration source may coexist with an archived prior version.

Compiler and registry tooling must distinguish:

* source working state;
* declared lifecycle state;
* last validated state;
* last compiled state;
* last published state.

---

## 26. Normative Requirements

### MSL-DOC-REQ-001

Every logical specification **MUST** have exactly one canonical artifact identity.

### MSL-DOC-REQ-002

Every logical specification **MUST** have exactly one primary source within a compilation unit.

### MSL-DOC-REQ-003

Every conforming specification **MUST** declare an MSL language identifier and language version.

### MSL-DOC-REQ-004

Every conforming specification **MUST** declare a maturity profile.

### MSL-DOC-REQ-005

Every conforming specification **MUST** preserve source provenance and at least one source location.

### MSL-DOC-REQ-006

The compiler **MUST** distinguish source representation from logical specification semantics.

### MSL-DOC-REQ-007

The compiler **MUST** retain authority classification for semantic content.

### MSL-DOC-REQ-008

The compiler **MUST** detect conflicting primary identity declarations.

### MSL-DOC-REQ-009

The compiler **MUST NOT** use filesystem location as canonical artifact identity.

### MSL-DOC-REQ-010

The compiler **MUST** preserve source mapping for emitted semantic elements.

### MSL-DOC-REQ-011

A specification claiming the `normative` profile **MUST** contain uniquely identified normative requirements.

### MSL-DOC-REQ-012

A specification claiming the `machine` profile **MUST** contain valid machine-normative semantics.

### MSL-DOC-REQ-013

A specification claiming the `executable` profile **MUST** define executable conformance evidence or delegated executable verification.

### MSL-DOC-REQ-014

Supplementary sources **MUST NOT** silently redefine primary identity or lifecycle fields.

### MSL-DOC-REQ-015

Semantic imports **MUST** be distinguishable from informative includes and external references.

### MSL-DOC-REQ-016

Duplicate semantic identifiers **MUST** produce a deterministic diagnostic.

### MSL-DOC-REQ-017

Generated sections **MUST** be distinguishable from authored authoritative content.

### MSL-DOC-REQ-018

Approved or active specifications **MUST NOT** contain unresolved mandatory references without an explicit waiver.

### MSL-DOC-REQ-019

A compiler **SHOULD** support both single-file and multi-file specification forms.

### MSL-DOC-REQ-020

A compiler **SHOULD** support partial compilation for draft and provisional specifications.

### MSL-DOC-REQ-021

Semantic sections **SHOULD** use stable local identifiers when they may be referenced independently.

### MSL-DOC-REQ-022

The bootstrap `msl-markdown` frontend **SHOULD** recognize the recommended section order while remaining semantically independent of it.

### MSL-DOC-REQ-023

Attachments **MUST** declare identity, semantic role, or both.

### MSL-DOC-REQ-024

Informative prose **MUST NOT** silently override machine-normative declarations.

---

## 27. Conceptual Model

```text
Compilation Unit

├── Primary Source
│   ├── Artifact Declaration
│   ├── Metadata
│   ├── Purpose
│   ├── Normative Content
│   └── Source Map
│
├── Supplementary Source
│   ├── Requirements
│   ├── Examples
│   └── Acceptance Criteria
│
├── Attachments
│   ├── Diagrams
│   ├── Fixtures
│   └── Data
│
└── Imports
    ├── Semantic Imports
    ├── Informative Includes
    └── External References
            │
            ▼
Structural Document Model
            │
            ▼
Semantic Specification Model
            │
            ▼
KIR
```

---

## 28. Machine Specification

The following machine model is provisional.

```yaml
machine_spec:
  kind: specification_document_model

  specification:
    cardinality:
      canonical_identity: exactly_one
      primary_source: exactly_one
      supplementary_sources: zero_or_more
      attachments: zero_or_more
      semantic_imports: zero_or_more
      informative_includes: zero_or_more
      external_references: zero_or_more

    required_elements:
      - identity
      - title
      - version
      - lifecycle
      - language_declaration
      - maturity_profile
      - purpose
      - provenance
      - source_map
      - authority_declaration

  maturity_profiles:
    narrative:
      requires:
        - identity
        - title
        - version
        - lifecycle
        - purpose
        - provenance
        - source_map

    structured:
      extends: narrative
      requires:
        - scope
        - relationships
        - compilation_declaration

    normative:
      extends: structured
      requires:
        - normative_requirements
        - requirement_identifiers
        - acceptance_criteria

    machine:
      extends: normative
      requires:
        - machine_specification
        - constraints_or_invariants
        - diagnostics

    executable:
      extends: machine
      requires:
        - executable_conformance
        - deterministic_expected_results
        - execution_traceability

  authority_classes:
    - informative
    - normative
    - machine_normative
    - provisional
    - deprecated
    - example
    - rationale
    - test_evidence

  source_roles:
    - primary
    - supplementary
    - normative
    - informative
    - conformance_suite
    - attachment_manifest
    - migration

  inclusion_modes:
    - semantic_import
    - informative_include
    - external_reference

  semantic_sections:
    - purpose
    - context
    - scope
    - non_goals
    - terminology
    - conceptual_model
    - normative_requirements
    - machine_specification
    - invariants
    - diagnostics
    - acceptance_criteria
    - conformance_examples
    - security_considerations
    - evolution_and_compatibility
    - open_questions
    - related_specifications
    - status
```

---

## 29. Invariants

```yaml
invariants:
  - id: MSL-DOC-INV-001
    expression: specification.canonical_identity.count == 1
    description: A logical specification has exactly one canonical identity.

  - id: MSL-DOC-INV-002
    expression: compilation_unit.primary_source.count == 1
    description: A compilation unit has exactly one primary source.

  - id: MSL-DOC-INV-003
    expression: semantic_element.source_map != null
    description: Every emitted semantic element retains source traceability.

  - id: MSL-DOC-INV-004
    expression: artifact.identity.depends_on_path == false
    description: Specification identity is independent of source location.

  - id: MSL-DOC-INV-005
    expression: supplementary_source.redefines_primary_identity == false
    description: Supplementary sources cannot redefine primary identity.

  - id: MSL-DOC-INV-006
    expression: claimed_profile.requirements_satisfied == true
    description: A specification may claim only a profile whose requirements it satisfies.

  - id: MSL-DOC-INV-007
    expression: duplicate_semantic_identifier.count <= 1
    description: Semantic identifiers are unique within their declared scope.

  - id: MSL-DOC-INV-008
    expression: informative_content.overrides_machine_normative == false
    description: Informative content cannot silently override machine-normative semantics.

  - id: MSL-DOC-INV-009
    expression: generated_content.authority_explicit == true
    description: Generated content must declare its authority and derivation.

  - id: MSL-DOC-INV-010
    expression: inclusion.mode in allowed_inclusion_modes
    description: Every inclusion has an explicit semantic mode.
```

---

## 30. Diagnostics

### MSL0101 — Missing Primary Source

No primary source was identified for the logical specification.

### MSL0102 — Multiple Primary Sources

More than one source claims the primary role.

### MSL0103 — Conflicting Artifact Identity

Sources within the same compilation unit declare different canonical identities.

### MSL0104 — Missing Maturity Profile

The specification does not declare a maturity profile.

### MSL0105 — Unsatisfied Maturity Profile

The specification claims a profile whose required elements are absent or invalid.

### MSL0106 — Duplicate Semantic Identifier

Two semantic elements declare the same identifier within the same scope.

### MSL0107 — Missing Source Map

A semantic element cannot be traced to source material.

### MSL0108 — Ambiguous Inclusion Mode

An included source does not declare whether it is semantic, informative, or external.

### MSL0109 — Supplementary Identity Redefinition

A supplementary source attempts to redefine protected identity metadata.

### MSL0110 — Informative-Normative Conflict

Informative prose conflicts materially with normative or machine-normative content.

### MSL0111 — Unidentified Attachment

An attachment lacks a stable identity or declared local role.

### MSL0112 — Unresolved Mandatory Content

An approved or active specification contains unresolved mandatory semantics.

### MSL0113 — Generated Authority Not Declared

Generated content does not declare whether it is authoritative, provisional, or informative.

### MSL0114 — Missing Compilation Declaration

The specification does not declare its language, language version, or compilation mode.

### MSL0115 — Invalid Source Role

A source declares a role unsupported by the active language version or profile.

---

## 31. Acceptance Criteria

This specification is satisfied when:

1. a logical specification is distinguishable from its source files;
2. exactly one canonical identity is required;
3. exactly one primary source is required per compilation unit;
4. single-file and multi-file specifications are supported conceptually;
5. semantic sections are defined independently of Markdown heading order;
6. document maturity profiles are defined from narrative through executable;
7. informative, normative, and machine-normative authority classes are distinct;
8. semantic imports are distinguishable from informative includes and references;
9. every emitted semantic element retains source mapping;
10. duplicate and conflicting declarations produce deterministic diagnostics;
11. partial specifications can be represented without being mistaken for approved complete specifications;
12. generated sections and attachments preserve explicit authority and provenance;
13. filesystem location is not treated as artifact identity;
14. the model can compile into KIR without preserving irrelevant presentation details.

---

## 32. Conformance Examples

### 32.1 Valid Single-File Normative Specification

```yaml
artifact:
  id: EXAMPLE-AUTH-0001
  type: knowledge.specification
  namespace: example

metadata:
  title: Authentication Behavior
  version: 0.1.0
  status: draft

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: normative
  source_role: primary
```

```markdown
# EXAMPLE-AUTH-0001 — Authentication Behavior

## Purpose

Define credential-expiration behavior.

## Normative Requirements

### EXAMPLE-AUTH-REQ-001

The service MUST reject expired credentials.

## Acceptance Criteria

- Given an expired credential, authentication fails.
```

This is structurally valid for the normative profile, assuming all required provenance metadata is present.

### 32.2 Invalid Multiple-Primary Example

Source A:

```yaml
artifact:
  id: EXAMPLE-0001

compilation:
  source_role: primary
```

Source B:

```yaml
artifact:
  id: EXAMPLE-0001

compilation:
  source_role: primary
```

Expected diagnostic:

```text
MSL0102: multiple primary sources for EXAMPLE-0001
```

### 32.3 Invalid Identity Conflict

Primary source:

```yaml
artifact:
  id: EXAMPLE-0001
```

Supplementary source:

```yaml
artifact:
  id: EXAMPLE-0002

extends:
  specification: EXAMPLE-0001
```

Expected diagnostic:

```text
MSL0109: supplementary source redefines canonical identity
```

### 32.4 Invalid Machine-Profile Claim

```yaml
compilation:
  profile: machine
```

The document contains narrative and requirements but no machine-specification block, invariants, or diagnostics.

Expected diagnostic:

```text
MSL0105: machine profile requirements are not satisfied
```

### 32.5 Valid Semantic Import

```yaml
imports:
  - artifact: SHARED-SECURITY-0001
    mode: semantic_import
    expose:
      - password_policy
      - credential_rules
```

The imported declarations participate in semantic compilation.

### 32.6 Valid Informative Include

```yaml
includes:
  - artifact: SECURITY-GUIDE-0001
    mode: informative_include
```

The guide may be displayed to readers but does not alter normative semantics.

### 32.7 Invalid Ambiguous Include

```yaml
includes:
  - path: ../../shared/security.md
```

Expected diagnostic:

```text
MSL0108: inclusion mode must be declared
```

---

## 33. Security and Trust Considerations

Multi-file composition and document inclusion introduce security risks.

Potential threats include:

* replacing a supplementary source with malicious content;
* importing an untrusted specification;
* path traversal through relative includes;
* dependency confusion;
* hidden normative content in generated sections;
* conflicting identities;
* unauthorized lifecycle changes;
* source-map tampering;
* attachment substitution;
* maliciously large inclusion graphs.

Implementations should:

* resolve sources through canonical repository boundaries;
* validate checksums or Git identities where appropriate;
* preserve import provenance;
* reject unauthorized identity redefinitions;
* limit inclusion depth and total source size;
* make generated and imported authority visible;
* prevent external includes from silently becoming normative;
* validate all attachments and imports under applicable trust policies.

---

## 34. Evolution and Compatibility

The document model will evolve as MSL becomes more formal.

Compatibility concerns include:

* adding new semantic sections;
* adding maturity profiles;
* changing required metadata;
* changing multi-file manifest structure;
* introducing a dedicated textual syntax;
* replacing bootstrap fenced blocks;
* refining source-map representation.

New optional sections may be added compatibly.

Changing the meaning of an existing authority class, profile, or core section requires a language-version change and migration guidance.

The bootstrap section names and front-matter arrangement are provisional.

The logical distinctions defined by this document should remain stable even when concrete syntax changes.

---

## 35. Open Questions

1. Should one source document be permitted to contain multiple logical specifications?
2. Should requirements and invariants use globally unique IDs or specification-local IDs?
3. How should directory-form specifications declare their manifests?
4. What merge rules apply to metadata across supplementary sources?
5. How are source-generated fragments distinguished from checked-in sources?
6. Can machine-specification fragments be imported independently of their parent specification?
7. How should cyclic semantic imports be handled?
8. What is the maximum tolerated incompleteness for each lifecycle state?
9. How should waivers for unresolved approved content be represented?
10. Should publication renderings include generated indexes inside the source tree or only as build output?
11. How are binary attachments fingerprinted and versioned?
12. How should conversational authoring sessions map into primary and supplementary sources?
13. Can a logical specification span multiple repositories?
14. How should profile-specific validators be discovered?
15. Which document elements belong in core MSL versus extension vocabularies?

---

## 36. Related Specifications

This specification is extended by:

| ID            | Title                               |
| ------------- | ----------------------------------- |
| MSL-CORE-0003 | Normative Requirement Language      |
| MSL-CORE-0004 | Metadata and Identity Model         |
| MSL-CORE-0005 | Structural Grammar                  |
| MSL-CORE-0006 | Machine Specification Blocks        |
| MSL-CORE-0008 | Relationship and Reference Syntax   |
| MSL-CORE-0009 | Conformance and Acceptance Criteria |
| MSL-CORE-0010 | Versioning and Evolution            |

It informs:

| Series   | Relevance                                              |
| -------- | ------------------------------------------------------ |
| MSC-CORE | Defines parser and compilation-unit behavior           |
| KIR-CORE | Defines normalized specification representation        |
| MKE      | Stores logical specifications and source relationships |
| PUB      | Renders human-facing specification views               |
| CLI      | Exposes document validation and compilation commands   |

---

## Status

Draft.

This document defines the logical structure and maturity model of Monad specification documents.

---

artifact:
id: WP-MSL-0001
kind: work-packet
title: Bootstrap MSL Markdown Syntax Baseline
status: ready
version: 0.1.0
created: 2026-08-04
updated: 2026-08-04
owner: monad-project
execution_mode: supervised
implementation_required: false
------------------------------

# WP-MSL-0001 — Bootstrap MSL Markdown Syntax Baseline

## 1. Status

**Status:** Ready

**Execution mode:** Human-supervised documentation work

**Implementation permitted:** No

**Primary domain:** Monad Specification Language

## 2. Objective

Establish one internally consistent, machine-parseable bootstrap document format for Monad Specification Language documents.

Complete the bootstrap metadata and structural contracts defined by:

* `MSL-CORE-0004`
* `MSL-CORE-0005`

Normalize the existing bootstrap MSL documents and template so that they all conform to the same declared format.

The completed work must make it possible to implement a deterministic, read-only MSL parser and validator without requiring that the parser invent syntax or metadata semantics.

## 3. Background

The repository currently defines the architectural pipeline:

```text
MSL → MSC → KIR → MKE
```

However, no parser, compiler, validator, schema, or executable implementation currently exists.

The existing MSL bootstrap documents contain structural inconsistencies, including malformed front matter and incomplete metadata. The documents also reference metadata and syntax specifications that are empty or incomplete.

Implementation must not begin until the repository defines a minimum bootstrap contract that is:

* explicit;
* internally consistent;
* machine-parseable;
* deterministic;
* testable;
* versioned;
* capable of reporting source-located diagnostics.

This work packet establishes that contract.

## 4. Authoritative Inputs

The executor must read these documents before proposing changes:

1. `architecture/adrs/ADR-0001-knowledge-engine-core.md`
2. `architecture/adrs/ADR-0002-specifications-compile-to-knowledge-ir.md`
3. `architecture/overview.md`
4. `specifications/MSL/core/MSL-CORE-0001.md`
5. `specifications/MSL/core/MSL-CORE-0002.md`
6. `specifications/MSL/core/MSL-CORE-0004.md`
7. `specifications/MSL/core/MSL-CORE-0005.md`
8. `specifications/templates/bootstrap-specification.md`
9. `specifications/registry/specifications.yaml`

Historical build logs may be consulted for context but are not normative.

## 5. Authority Rules

For this work packet, authority is interpreted in the following order:

1. Accepted architecture decision records.
2. Explicit requirements in active MSL specifications.
3. This work packet.
4. The specification registry.
5. Bootstrap templates.
6. Historical build logs and journal material.

When two authoritative sources conflict, the executor must report the conflict instead of silently choosing one.

This work packet does not authorize modification of an accepted ADR.

## 6. In Scope

The following work is in scope:

1. Complete `MSL-CORE-0004` as the bootstrap metadata and artifact-identity contract.
2. Complete `MSL-CORE-0005` as the bootstrap Markdown structural grammar.
3. Define one valid YAML front-matter format.
4. Define the required bootstrap metadata fields.
5. Define the meaning and validation rules for every required field.
6. Define the minimum required Markdown document structure.
7. Define normalization rules that do not destroy author intent.
8. Define a minimal deterministic diagnostic record.
9. Define diagnostic ordering rules.
10. Normalize `MSL-CORE-0001`.
11. Normalize `MSL-CORE-0002`.
12. Normalize `bootstrap-specification.md`.
13. Reconcile the affected specification registry entries.
14. Document all unresolved questions that are intentionally deferred.

## 7. Out of Scope

The following work is explicitly out of scope:

* Implementing an MSL parser.
* Implementing an MSL validator.
* Selecting the compiler implementation language.
* Creating a package or workspace manifest.
* Defining the complete MSL language.
* Defining executable MSL semantics.
* Defining the complete KIR schema.
* Implementing MSL-to-KIR compilation.
* Implementing MKE storage or query behavior.
* Repairing unrelated MKE specification corruption.
* Reorganizing the repository.
* Creating CI workflows.
* Adding dependencies.
* Modifying accepted ADRs.
* Promoting bootstrap specifications to final standards.

## 8. Bootstrap Serialization Decisions

The completed specifications must encode the following baseline decisions unless an accepted ADR directly contradicts them.

### 8.1 Character Encoding

MSL Markdown documents must be encoded as UTF-8.

A UTF-8 byte-order mark is not permitted in canonical form.

### 8.2 Line Endings

Canonical documents use LF line endings.

A future parser may accept CRLF input and normalize it to LF, but canonical output must use LF.

### 8.3 Front Matter Position

A document must begin with YAML front matter at the first byte of the file.

No blank line, comment, byte-order mark, or prose may precede the opening delimiter.

### 8.4 Front Matter Delimiter

The opening and closing front-matter delimiter must be exactly:

```text
---
```

The delimiter must appear alone on its line.

Long dashed lines such as the following are invalid:

```text
-----------------
```

### 8.5 Bootstrap Metadata Shape

The bootstrap metadata must use this conceptual structure:

```yaml
---
artifact:
  id: MSL-CORE-0001
  kind: specification
  title: Monad Specification Language Core
  series: MSL-CORE
  sequence: 1
  status: draft
  profile: bootstrap
  version: 0.1.0
  created: 2026-08-03
  updated: 2026-08-04
  schema: monad.msl/document@0.1
provenance:
  source: specifications/MSL/core/MSL-CORE-0001.md
---
```

The specifications may refine field names only when necessary to resolve an explicit conflict or ambiguity. Any refinement must be documented in the execution record.

### 8.6 Required Artifact Fields

The bootstrap profile must require:

* `artifact.id`
* `artifact.kind`
* `artifact.title`
* `artifact.series`
* `artifact.sequence`
* `artifact.status`
* `artifact.profile`
* `artifact.version`
* `artifact.created`
* `artifact.updated`
* `artifact.schema`
* `provenance.source`

### 8.7 Identifier Rules

An artifact identifier must:

* use uppercase ASCII letters, digits, and hyphens;
* identify its series;
* contain a numeric sequence component;
* match the identifier declared in the document heading;
* match the corresponding registry identifier;
* be unique within the repository.

The detailed bootstrap pattern must be explicitly defined by `MSL-CORE-0004`.

### 8.8 Status Values

The bootstrap specification must define a closed initial set of status values.

At minimum, it must distinguish:

* `placeholder`
* `draft`
* `review`
* `accepted`
* `superseded`
* `deprecated`

The specification must explain that `accepted` is a governance state and must not be assigned merely because a file is syntactically valid.

### 8.9 Profile

The initial document profile is:

```text
bootstrap
```

The profile identifies the validation contract applied to the document. It does not describe the document’s governance status.

### 8.10 Provenance

`provenance.source` must contain the repository-relative canonical path of the authored document.

Runtime source spans, line numbers, and columns are generated by the parser and must not be manually maintained in front matter.

## 9. Bootstrap Structural Grammar

`MSL-CORE-0005` must define, at minimum:

1. Front matter.
2. Exactly one level-one title.
3. Identity agreement between front matter and title.
4. Permitted heading hierarchy.
5. Required bootstrap sections.
6. Requirement declaration format.
7. Code-block handling.
8. Cross-reference format.
9. Normative-keyword interpretation.
10. Duplicate-section behavior.
11. Unknown-section behavior.
12. Canonical whitespace and normalization behavior.

The bootstrap grammar should require enough structure for deterministic validation without forcing every specification series to use an identical detailed outline.

At minimum, every bootstrap specification must communicate:

* status;
* purpose;
* scope;
* terminology or conceptual model where applicable;
* normative requirements;
* conformance expectations;
* unresolved or deferred decisions where applicable.

The exact section names and alias policy must be explicitly defined in `MSL-CORE-0005`.

## 10. Requirement Identifiers

The specifications must define whether requirement identifiers are:

* globally unique;
* unique within an artifact;
* unique within a series; or
* unique within a requirement namespace.

The chosen rule must be deterministic and checkable without semantic inference.

Existing identifiers must not be silently renumbered unless duplicate or malformed identifiers make preservation impossible.

Any renumbering must be recorded in the execution report.

## 11. Diagnostic Contract

The completed work must define a minimal diagnostic model suitable for the first parser and validator.

The conceptual diagnostic record is:

```yaml
code: MSL0001
severity: error
message: Missing required artifact field: artifact.id
path: specifications/MSL/core/MSL-CORE-0001.md
artifact_id: null
rule: MSL-DOC-REQ-001
span:
  start:
    line: 1
    column: 1
  end:
    line: 1
    column: 4
```

The contract must define:

* diagnostic code;
* severity;
* human-readable message;
* repository-relative path;
* related artifact identifier when available;
* governing rule or requirement when available;
* source span;
* deterministic ordering.

The initial severities must be:

* `error`
* `warning`
* `info`

Diagnostics must be sorted deterministically by:

1. path;
2. start line;
3. start column;
4. severity;
5. diagnostic code.

The specification must distinguish validation failure from parser or tool failure, but detailed process exit codes may be deferred to the compiler implementation work packet.

## 12. Minimum Bootstrap Diagnostics

The specifications must reserve or define diagnostics for at least:

* invalid UTF-8;
* unexpected byte-order mark;
* missing front matter;
* invalid front-matter delimiter;
* invalid YAML;
* missing required metadata;
* invalid artifact identifier;
* identifier mismatch;
* source-path mismatch;
* invalid status;
* invalid profile;
* duplicate level-one heading;
* missing required section;
* duplicate requirement identifier;
* unresolved local artifact reference;
* registry mismatch.

Existing diagnostic identifiers already declared by active MSL specifications must be preserved where possible.

Conflicts between existing and proposed diagnostic identifiers must be recorded rather than silently overwritten.

## 13. Registry Reconciliation

The executor must reconcile the registry entries for:

* `MSL-CORE-0001`
* `MSL-CORE-0002`
* `MSL-CORE-0004`
* `MSL-CORE-0005`

For each entry, verify:

* identifier;
* title;
* path;
* series;
* sequence;
* status;
* version, when tracked;
* dependencies or references, when tracked.

The registry must not report an artifact as accepted unless the repository contains evidence of that governance decision.

## 14. Required Deliverables

This work packet must produce changes to:

1. `specifications/MSL/core/MSL-CORE-0004.md`
2. `specifications/MSL/core/MSL-CORE-0005.md`
3. `specifications/MSL/core/MSL-CORE-0001.md`
4. `specifications/MSL/core/MSL-CORE-0002.md`
5. `specifications/templates/bootstrap-specification.md`
6. `specifications/registry/specifications.yaml`

The executor may also add:

```text
engineering/reports/WP-MSL-0001-execution-report.md
```

No executable source code is authorized.

## 15. Acceptance Criteria

### AC-001 — Valid Front Matter

All four affected MSL core documents and the bootstrap template use:

* an opening `---` delimiter;
* valid YAML;
* correctly indented mappings;
* a closing `---` delimiter.

### AC-002 — Metadata Agreement

All affected files use the same required bootstrap metadata shape.

### AC-003 — Identity Agreement

For each affected MSL document:

* front-matter identifier;
* level-one heading identifier;
* filename identifier;
* registry identifier

must agree.

### AC-004 — Source Agreement

Each `provenance.source` value matches the document’s repository-relative path.

### AC-005 — Metadata Contract

`MSL-CORE-0004` defines every required field, its type, semantics, validation rules, and canonical representation.

### AC-006 — Structural Contract

`MSL-CORE-0005` defines the minimum parseable Markdown structure and all required bootstrap sections.

### AC-007 — Diagnostic Contract

The MSL specification set defines a minimal deterministic diagnostic representation and ordering rule.

### AC-008 — Requirement Identity

The uniqueness scope and valid format of requirement identifiers are explicitly defined.

### AC-009 — Registry Reconciliation

The registry entries for all affected documents agree with the filesystem and document metadata.

### AC-010 — No Premature Acceptance

Documents are not marked `accepted` without an explicit governance record authorizing that state.

### AC-011 — No Implementation

No parser, validator, compiler, package manifest, dependency, test framework, or executable source code is added.

### AC-012 — Reference Integrity

All references introduced or modified by this work resolve to an existing document, declared planned artifact, or explicitly marked deferred artifact.

### AC-013 — Deferred Decisions

Every material question not resolved by this work packet is recorded in a clearly identifiable deferred-decisions section.

### AC-014 — Diff Hygiene

The resulting Git diff contains no trailing whitespace, conflict markers, accidental generated files, or unrelated modifications.

## 16. Verification Procedure

Until an executable validator exists, verification is manual and repository-based.

The executor must perform:

```bash
git diff --check
git status --short
```

The executor must also verify:

1. All affected files begin with `---`.
2. Each front-matter block parses as valid YAML.
3. All required metadata fields are present.
4. Each artifact identifier agrees with its filename and heading.
5. Each source path agrees with the actual repository path.
6. Registry identifiers and paths agree with the filesystem.
7. All modified local references resolve.
8. No unrelated MKE content was modified.
9. No executable code or package manifests were introduced.

A temporary external YAML parser may be used for verification only when already available on the machine. No dependency may be committed solely for this work packet.

## 17. Stop Conditions

The executor must stop and report a blocker when:

* an accepted ADR directly contradicts this work packet;
* existing MSL requirements demand mutually exclusive formats;
* resolving a conflict would require changing an accepted ADR;
* a referenced authoritative file is missing;
* completing the work would require inventing KIR semantics;
* completing the work would require selecting an implementation language;
* completing the work would require modifying unrelated specification series;
* the proposed diff substantially exceeds the declared scope.

## 18. Completion Evidence

The execution report must include:

* files examined;
* files modified;
* metadata decisions made;
* structural decisions made;
* diagnostics defined;
* registry changes;
* requirement identifiers changed;
* unresolved conflicts;
* deferred decisions;
* verification commands run;
* verification results;
* acceptance-criterion status;
* final `git diff --stat`;
* explicit confirmation that no implementation code was added.

## 19. Definition of Done

This work packet is complete when the repository contains one coherent bootstrap MSL Markdown contract and the affected MSL documents demonstrably conform to that contract.

Completion of this work packet authorizes planning—but not automatic implementation—of:

```text
WP-MSC-0001 — Implement the Bootstrap MSL Parser and Validator
```

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
  priority: critical
  risk: medium
  profile: monad-work-packet
  schema: monad.engineering/work-packet@0.1
provenance:
  source: engineering/work-packets/WP-MSL-0001-bootstrap-msl-markdown-baseline.md
---

# WP-MSL-0001 — Bootstrap MSL Markdown Syntax Baseline

## 1. Work Packet Identity

| Field | Value |
|---|---|
| Identifier | `WP-MSL-0001` |
| Title | Bootstrap MSL Markdown Syntax Baseline |
| Status | Ready |
| Version | `0.1.0` |
| Priority | Critical |
| Risk level | Medium |
| Owner | Monad project |
| Execution mode | Human-supervised |
| Implementation required | No |
| Created | 2026-08-04 |
| Last updated | 2026-08-04 |

## 2. Status

**Current status:** Ready  
**Authorized activities:** Repository analysis and execution planning  
**Implementation permitted:** No  
**Execution authority:** Human reviewer acting for the Monad project  
**Primary domain:** Monad Specification Language

This packet may advance to `approved` only after its execution plan has been reviewed. No file modifications authorized by this packet may begin before that transition.

## 3. Objective

Establish one internally consistent, machine-parseable bootstrap document format for Monad Specification Language documents.

Complete the bootstrap metadata and structural contracts defined by `MSL-CORE-0004` and `MSL-CORE-0005`, then normalize the existing bootstrap MSL documents and template so they all conform to that declared format.

The completed work must make it possible to implement a deterministic, read-only MSL parser and validator without requiring the implementation to invent syntax or metadata semantics.

## 4. Problem Statement

The repository defines the architectural pipeline:

```text
MSL → MSC → KIR → MKE
```

No parser, compiler, validator, schema implementation, executable source, or automated conformance suite currently exists.

The active bootstrap MSL documents contain malformed or inconsistent front matter, incomplete metadata, and references to metadata and syntax specifications that are currently empty or incomplete. The repository therefore lacks a stable source-language contract against which a first parser can be implemented and scored.

Implementation must not begin until a minimum bootstrap contract is explicit, internally consistent, machine-parseable, deterministic, testable, versioned, and capable of supporting source-located diagnostics.

## 5. Desired Outcome

After this work packet is complete:

1. `MSL-CORE-0004` defines bootstrap metadata and artifact identity.
2. `MSL-CORE-0005` defines the bootstrap Markdown structural grammar.
3. `MSL-CORE-0001`, `MSL-CORE-0002`, and the bootstrap template conform to the same format.
4. A minimal deterministic diagnostic contract exists.
5. Registry entries for affected artifacts agree with the filesystem and metadata.
6. Planning may begin for a read-only parser and validator.

## 6. Architectural Position

```text
Authored MSL Markdown documents
              ↓
Bootstrap MSL document contract
              ↓
MSC parser and validator
              ↓
KIR emission and MKE consumption
```

This packet defines the source-document boundary only. It does not define KIR semantics or implement any compiler behavior.

## 7. Authority Hierarchy

Apply repository authority in this order:

1. Accepted architecture decision records.
2. Explicit requirements in active MSL specifications.
3. This work packet.
4. The specification registry.
5. Bootstrap templates.
6. Historical build logs and journal material.

When authoritative sources conflict, the executor must record the conflict and stop work on the affected decision rather than silently choosing an interpretation.

This packet does not authorize modification of an accepted ADR.

## 8. Authoritative Inputs

The executor must read:

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

## 9. Preconditions

Execution planning may begin when:

- [x] The two accepted ADRs are present.
- [x] The active MSL documents are present.
- [x] The registry and template are present.
- [x] No implementation work is required by this packet.
- [ ] A read-only execution plan has been produced.
- [ ] The execution plan has been reviewed and approved.

## 10. In Scope

1. Complete `MSL-CORE-0004` as the bootstrap metadata and artifact-identity contract.
2. Complete `MSL-CORE-0005` as the bootstrap Markdown structural grammar.
3. Define one valid YAML front-matter format.
4. Define required bootstrap metadata fields and their validation rules.
5. Define the minimum required Markdown document structure.
6. Define normalization rules that preserve author intent.
7. Define a minimal deterministic diagnostic record and ordering.
8. Normalize `MSL-CORE-0001`.
9. Normalize `MSL-CORE-0002`.
10. Normalize `specifications/templates/bootstrap-specification.md`.
11. Reconcile affected specification-registry entries.
12. Record intentionally deferred decisions.
13. Produce an execution report.

## 11. Out of Scope

- Implementing an MSL parser or validator.
- Selecting the compiler implementation language.
- Creating package or workspace manifests.
- Defining the complete MSL language.
- Defining executable MSL semantics.
- Defining the complete KIR schema.
- Implementing MSL-to-KIR compilation.
- Implementing MKE storage, query, or retrieval behavior.
- Repairing unrelated MKE specification corruption.
- Reorganizing the repository.
- Creating CI workflows.
- Adding dependencies.
- Modifying accepted ADRs.
- Promoting bootstrap specifications to final standards.
- Opportunistic cleanup outside the listed files.

## 12. Required Bootstrap Decisions

The completed specifications must encode the following baseline unless an accepted ADR directly contradicts it.

### DEC-001 — Character Encoding

Canonical MSL Markdown documents use UTF-8 without a byte-order mark.

### DEC-002 — Line Endings

Canonical documents use LF line endings. A future parser may accept CRLF and normalize it to LF, but canonical output uses LF.

### DEC-003 — Front-Matter Position

A document begins with YAML front matter at the first byte. No blank line, comment, byte-order mark, or prose precedes the opening delimiter.

### DEC-004 — Front-Matter Delimiter

The opening and closing delimiter is exactly:

```text
---
```

It appears alone on its line. Longer dashed lines are invalid.

### DEC-005 — Bootstrap Metadata Shape

The baseline conceptual form is:

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

The specifications may refine field names only when necessary to resolve an explicit conflict or ambiguity. Every refinement must be recorded in the execution report.

### DEC-006 — Required Metadata Fields

The bootstrap profile requires:

- `artifact.id`
- `artifact.kind`
- `artifact.title`
- `artifact.series`
- `artifact.sequence`
- `artifact.status`
- `artifact.profile`
- `artifact.version`
- `artifact.created`
- `artifact.updated`
- `artifact.schema`
- `provenance.source`

### DEC-007 — Artifact Identifier

An artifact identifier must:

- use uppercase ASCII letters, digits, and hyphens;
- identify its series;
- contain a numeric sequence component;
- match the identifier in the level-one heading;
- match the registry identifier;
- be unique within the repository.

`MSL-CORE-0004` must define the exact bootstrap pattern.

### DEC-008 — Status Values

The initial closed status set must distinguish at least:

- `placeholder`
- `draft`
- `review`
- `accepted`
- `superseded`
- `deprecated`

`accepted` is a governance state and must not be assigned merely because a file is syntactically valid.

### DEC-009 — Validation Profile

The initial profile is `bootstrap`. A profile identifies the validation contract applied to the document; it does not express governance status.

### DEC-010 — Provenance

`provenance.source` contains the authored document's repository-relative canonical path. Runtime source spans, line numbers, and columns are parser-generated and are not manually maintained in front matter.

### DEC-011 — Requirement Identity

The specification must define whether requirement identifiers are globally unique, artifact-local, series-local, or namespace-local. The chosen rule must be deterministic and checkable without semantic inference.

Existing identifiers must not be silently renumbered unless preservation is impossible. Every renumbering must be recorded.

## 13. Bootstrap Structural Grammar

`MSL-CORE-0005` must define at least:

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

The grammar must require enough structure for deterministic validation without requiring every specification series to use an identical detailed outline.

Every bootstrap specification must communicate, directly or through explicitly permitted aliases:

- status;
- purpose;
- scope;
- terminology or conceptual model where applicable;
- normative requirements;
- conformance expectations;
- unresolved or deferred decisions where applicable.

## 14. Diagnostic Contract

The work must define a minimal diagnostic model suitable for the first parser and validator.

Conceptual form:

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

- diagnostic code;
- severity;
- human-readable message;
- repository-relative path;
- related artifact identifier when available;
- governing rule or requirement when available;
- source span;
- deterministic ordering.

Initial severities:

- `error`
- `warning`
- `info`

Diagnostics are sorted by:

1. path;
2. start line;
3. start column;
4. severity;
5. diagnostic code.

The specification must distinguish validation failure from parser or tool failure. Detailed process exit codes may be deferred to the compiler implementation packet.

### 14.1 Minimum Diagnostic Conditions

Reserve or define diagnostics for at least:

- invalid UTF-8;
- unexpected byte-order mark;
- missing front matter;
- invalid front-matter delimiter;
- invalid YAML;
- missing required metadata;
- invalid artifact identifier;
- identifier mismatch;
- source-path mismatch;
- invalid status;
- invalid profile;
- duplicate level-one heading;
- missing required section;
- duplicate requirement identifier;
- unresolved local artifact reference;
- registry mismatch.

Existing diagnostic identifiers declared by active MSL specifications must be preserved where possible. Conflicts must be recorded rather than silently overwritten.

## 15. Registry Reconciliation

Reconcile entries for:

- `MSL-CORE-0001`
- `MSL-CORE-0002`
- `MSL-CORE-0004`
- `MSL-CORE-0005`

Verify identifier, title, path, series, sequence, status, version when tracked, and dependencies or references when tracked.

The registry must not report an artifact as accepted without repository evidence of that governance decision.

## 16. Required Deliverables

Modify:

1. `specifications/MSL/core/MSL-CORE-0004.md`
2. `specifications/MSL/core/MSL-CORE-0005.md`
3. `specifications/MSL/core/MSL-CORE-0001.md`
4. `specifications/MSL/core/MSL-CORE-0002.md`
5. `specifications/templates/bootstrap-specification.md`
6. `specifications/registry/specifications.yaml`

Add:

7. `engineering/reports/WP-MSL-0001-execution-report.md`

No executable source code is authorized.

## 17. Acceptance Criteria

### AC-001 — Valid Front Matter

All four affected MSL core documents and the template use an opening `---`, valid YAML, correctly indented mappings, and a closing `---`.

### AC-002 — Metadata Agreement

All affected files use the same required bootstrap metadata shape.

### AC-003 — Identity Agreement

For each affected MSL document, the front-matter identifier, level-one heading identifier, filename identifier, and registry identifier agree.

### AC-004 — Source Agreement

Each `provenance.source` value matches the document's repository-relative path.

### AC-005 — Metadata Contract

`MSL-CORE-0004` defines every required field, type, semantics, validation rules, and canonical representation.

### AC-006 — Structural Contract

`MSL-CORE-0005` defines the minimum parseable Markdown structure and required bootstrap sections.

### AC-007 — Diagnostic Contract

The MSL specification set defines a minimal deterministic diagnostic representation and ordering rule.

### AC-008 — Requirement Identity

The uniqueness scope and valid format of requirement identifiers are explicit.

### AC-009 — Registry Reconciliation

Registry entries for affected documents agree with the filesystem and metadata.

### AC-010 — No Premature Acceptance

No document is marked `accepted` without an explicit governance record.

### AC-011 — No Implementation

No parser, validator, compiler, package manifest, dependency, test framework, or executable source is added.

### AC-012 — Reference Integrity

Every introduced or modified reference resolves to an existing document, a declared planned artifact, or an explicitly deferred artifact.

### AC-013 — Deferred Decisions

Every material unresolved question is recorded in a clearly identifiable deferred-decisions section.

### AC-014 — Diff Hygiene

The diff contains no trailing whitespace, conflict markers, accidental generated files, or unrelated changes.

## 18. Verification Procedure

Until an executable validator exists, verification is manual and repository-based.

Run:

```bash
git diff --check
git status --short
```

Also verify:

1. All affected files begin with `---`.
2. Every front-matter block parses as valid YAML.
3. Every required metadata field is present.
4. Artifact identifiers agree with filenames and headings.
5. Source paths agree with repository paths.
6. Registry identifiers and paths agree with the filesystem.
7. Modified local references resolve.
8. No unrelated MKE content changed.
9. No executable code or package manifest was introduced.

A temporary external YAML parser may be used only if already available. No dependency may be committed solely for this packet.

## 19. Stop Conditions

Stop and report a blocker when:

- an accepted ADR directly contradicts this packet;
- existing MSL requirements demand mutually exclusive formats;
- resolution requires changing an accepted ADR;
- a referenced authoritative file is missing;
- completion requires inventing KIR semantics;
- completion requires selecting an implementation language;
- completion requires modifying unrelated specification series;
- the proposed diff materially exceeds scope.

## 20. Execution Evidence

The execution report must include:

- files examined and modified;
- metadata and structural decisions;
- diagnostics defined;
- registry changes;
- requirement identifiers changed;
- unresolved conflicts and deferred decisions;
- verification commands and results;
- AC-001 through AC-014 status and evidence;
- final `git diff --stat`;
- confirmation that no implementation code was added.

## 21. Definition of Done

This packet is complete when the repository contains one coherent bootstrap MSL Markdown contract and the affected MSL documents demonstrably conform to it.

Completion authorizes planning—but not automatic implementation—of:

```text
WP-MSC-0001 — Implement the Bootstrap MSL Parser and Validator
```

## 22. Status History

| Date | Previous Status | New Status | Actor | Reason |
|---|---|---|---|---|
| 2026-08-04 | — | Proposed | Monad project | Work packet created |
| 2026-08-04 | Proposed | Ready | Monad project | Scope and planning prerequisites defined |

## 23. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Monad project | Initial ready-for-planning work packet |

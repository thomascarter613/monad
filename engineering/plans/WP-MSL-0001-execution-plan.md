---
artifact:
  id: PLAN-WP-MSL-0001
  kind: execution-plan
  title: WP-MSL-0001 Execution Plan
  status: proposed
  version: 0.1.0
  created: 2026-08-04
  updated: 2026-08-04
  owner: monad-project
  execution_mode: supervised
  work_packet: WP-MSL-0001
provenance:
  source: engineering/plans/WP-MSL-0001-execution-plan.md
---

# PLAN-WP-MSL-0001 — Bootstrap MSL Markdown Syntax Baseline

## 1. Plan Status

**Status:** Proposed for review

**Work packet:** `WP-MSL-0001`

**Execution authorized:** No

**Implementation code authorized:** No

This plan defines the documentation-only execution sequence for establishing a coherent bootstrap `msl-markdown` source-document contract. It does not itself modify MSL specifications, registry state, executable code, package manifests, dependencies, tests, or CI.

## 2. Executive Summary

WP-MSL-0001 is executable without an ADR change and without choosing an implementation language.

No stop condition is currently triggered.

The central planning decision is to preserve the repository's existing grouped metadata model:

```yaml
artifact: {}
metadata: {}
relationships: {}
compilation: {}
provenance: {}
```

rather than replacing it with a second flattened model. The illustrative field grouping in WP-MSL-0001 will be refined under the work packet's explicit refinement allowance.

The work will:

1. author `MSL-CORE-0004` as the bootstrap metadata and artifact-identity contract;
2. author `MSL-CORE-0005` as the bootstrap Markdown structural grammar;
3. normalize `MSL-CORE-0001` and `MSL-CORE-0002` to conform;
4. normalize the bootstrap specification template;
5. reconcile registry records for `MSL-CORE-0001`, `0002`, `0004`, and `0005`;
6. define deterministic bootstrap diagnostics while preserving existing `MSL0101` through `MSL0115`;
7. create an execution report with evidence for AC-001 through AC-014.

## 3. Repository Facts

### RF-001 — Accepted architecture establishes MKE as the core

`architecture/adrs/ADR-0001-knowledge-engine-core.md`, under **Decision**, declares the Monad Knowledge Engine to be the foundational architectural subsystem.

This work must therefore preserve future compatibility with knowledge storage, provenance, relationships, validation, and traceability.

### RF-002 — MSL is an authoring surface, not the canonical representation

`architecture/adrs/ADR-0002-specifications-compile-to-knowledge-ir.md`, under **Decision** and **Monad Specification Language**, establishes:

```text
MSL → MSC → KIR → MKE
```

It states that Markdown with structured metadata is the initial surface syntax and that Markdown is not the canonical internal representation.

Therefore, WP-MSL-0001 may define deterministic source syntax without defining KIR semantics.

### RF-003 — The repository is in an explicit bootstrap stage

`architecture/adrs/ADR-0002-specifications-compile-to-knowledge-ir.md`, under **Migration Strategy**, requires MSL to be defined before KIR, MSC, corpus migration, and validation.

`specifications/MSL/core/MSL-CORE-0001.md`, under **Bootstrap Strategy**, likewise places authoring the initial MSL specification set and manually maintaining the registry before implementation of a minimal parser and validator.

### RF-004 — MSL-CORE-0001 declares the initial surface syntax

`specifications/MSL/core/MSL-CORE-0001.md`, under **Surface Syntax Strategy**, names the initial surface syntax `msl-markdown` and identifies Markdown, YAML front matter, normative requirement sections, machine-specification blocks, invariants, acceptance criteria, and conformance examples as intended elements.

### RF-005 — MSL-CORE-0001 separates identity, metadata, provenance, relationships, requirements, and diagnostics

`specifications/MSL/core/MSL-CORE-0001.md`, under **Specification Artifact Model**, describes a specification as containing identity, metadata, lifecycle, provenance, relationships, human-readable content, normative requirements, machine specification, invariants, diagnostics, acceptance criteria, and evolution information.

This supports grouped metadata rather than a single undifferentiated mapping.

### RF-006 — MSL-CORE-0002 delegates concrete syntax to MSL-CORE-0005

`specifications/MSL/core/MSL-CORE-0002.md`, under **Purpose**, states that it does not fully define concrete `msl-markdown` syntax and assigns that responsibility primarily to `MSL-CORE-0005`.

### RF-007 — MSL-CORE-0002 delegates complete metadata to a later specification

`specifications/MSL/core/MSL-CORE-0002.md`, under **Scope**, excludes the complete metadata schema. WP-MSL-0001 assigns that missing responsibility to `MSL-CORE-0004`.

### RF-008 — Current MSL source front matter is malformed

Both `specifications/MSL/core/MSL-CORE-0001.md` and `MSL-CORE-0002.md` begin with an opening `---`, but their nested mappings are not indented and their closing delimiter is a long dashed line rather than exactly `---`.

They therefore do not conform to the valid YAML-front-matter form already demonstrated by `specifications/templates/bootstrap-specification.md`.

### RF-009 — Required maturity and provenance information is absent

`MSL-DOC-REQ-003`, `MSL-DOC-REQ-004`, and `MSL-DOC-REQ-005` in `MSL-CORE-0002` require a language declaration, language version, maturity profile, source provenance, and at least one source location.

The current MSL documents declare language and language version, but use `compilation.status: bootstrap` instead of an explicit profile and omit a provenance mapping.

### RF-010 — Existing profile terminology conflicts with the bootstrap requirement

`MSL-CORE-0002`, under **Machine Specification**, currently lists `narrative`, `structured`, `normative`, `machine`, and `executable` maturity profiles.

WP-MSL-0001 requires an initial `bootstrap` profile.

The conflict can be resolved by defining `bootstrap` as a provisional source-document conformance profile used before the stable maturity-profile hierarchy is implemented. It will not replace the future profile hierarchy.

### RF-011 — Artifact lifecycle terminology is inconsistent

The bootstrap template and active MSL documents use `draft`. The registry uses `planned` for `MSL-CORE-0001`. `MSL-CORE-0002` prose refers to `approved` and `active` specifications. WP-MSL-0001 requires at least `placeholder`, `draft`, `review`, `accepted`, `superseded`, and `deprecated`.

A canonical bootstrap artifact lifecycle must distinguish artifact status from series status, source working state, validation state, compilation state, and publication state.

### RF-012 — MSL-CORE-0004 and MSL-CORE-0005 are empty placeholders

`specifications/MSL/core/MSL-CORE-0004.md` and `MSL-CORE-0005.md` are zero-length files.

There is no prior normative content in either file to preserve.

### RF-013 — Existing document diagnostics occupy MSL0101 through MSL0115

`MSL-CORE-0002`, under **Diagnostics**, defines `MSL0101` through `MSL0115` for logical document-model failures.

Bootstrap lexical, front-matter, identity, heading, and registry diagnostics must use a separate non-conflicting range.

### RF-014 — The registry is manual and filesystem-oriented

`specifications/registry/specifications.yaml` declares:

```yaml
source_of_truth: filesystem
generated: false
```

The registry contains records for `MSL-CORE-0001` and `MSL-CORE-0002`, but not `MSL-CORE-0004` or `MSL-CORE-0005`.

### RF-015 — The registry misstates MSL-CORE-0001 lifecycle

`MSL-CORE-0001.md` declares `draft`, while its registry entry declares `planned`.

Because the file is substantive and actively referenced, its registry lifecycle should be reconciled to `draft`.

## 4. Authority Review

The execution will apply authority in this order:

1. `ADR-0001` and `ADR-0002`.
2. Normative requirements in `MSL-CORE-0001` and `MSL-CORE-0002`.
3. `WP-MSL-0001`.
4. `specifications/registry/specifications.yaml`.
5. `specifications/templates/bootstrap-specification.md`.
6. Historical build logs and journals.

No accepted ADR requires modification.

The work packet's illustrative metadata shape is treated as a required conceptual field set, not an immutable serialization grouping, because the work packet explicitly permits field-name refinement where necessary to resolve repository conflicts.

## 5. Contradiction Register

### CR-001 — Grouped existing metadata versus flattened illustrative metadata

**Source A:** Current active MSL documents and bootstrap template group fields under `artifact`, `metadata`, `relationships`, and `compilation`.

**Source B:** WP-MSL-0001 illustrates many fields nested directly under `artifact`.

**Resolution:** Preserve the grouped model and require all conceptual fields from the work packet in semantically appropriate mappings. Record the refinement in the execution report.

**Blocking:** No.

### CR-002 — Bootstrap profile versus future maturity profiles

**Source A:** WP-MSL-0001 requires `bootstrap`.

**Source B:** MSL-CORE-0002 currently models profiles from `narrative` through `executable`.

**Resolution:** Add `bootstrap` as a provisional source-document conformance profile. State that it is not a level in the stable maturity hierarchy and will be retired or migrated by a later work packet.

**Blocking:** No.

### CR-003 — Artifact lifecycle terminology

**Source A:** WP-MSL-0001 requires canonical statuses including `accepted`.

**Source B:** MSL-CORE-0002 prose uses `approved` and `active`; registry series use `active`; one artifact registry record uses `planned`.

**Resolution:** Define a closed artifact lifecycle distinct from series and processing states. Use `accepted` as the canonical governance state. Replace artifact-level `approved`/`active` prose where necessary. Retain `active` only for series status. Reconcile MSL-CORE-0001 from `planned` to `draft`.

**Blocking:** No.

### CR-004 — Path independence versus provenance source-path validation

**Source A:** MSL-DOC-REQ-009 states filesystem location is not canonical identity.

**Source B:** WP-MSL-0001 requires `provenance.source` to match the repository-relative path.

**Resolution:** Define `provenance.source` as the current canonical authored source locator, not artifact identity. Moving a file requires updating provenance but does not change `artifact.id`.

**Blocking:** No.

### CR-005 — Source location requirement versus authored source spans

**Source A:** MSL-DOC-REQ-005 requires provenance and at least one source location.

**Source B:** WP-MSL-0001 prohibits manually maintained runtime line and column spans in front matter.

**Resolution:** The repository-relative `provenance.source` path satisfies the authored source-location requirement. Fine-grained spans are parser-generated and are not front-matter fields.

**Blocking:** No.

## 6. Stop Conditions

No stop condition is currently triggered.

The following decisions remain intentionally outside this packet and do not block it:

- implementation language;
- package/workspace layout;
- parser library;
- YAML library;
- KIR schema;
- process exit codes;
- stable multi-file import syntax;
- final maturity-profile migration semantics.

## 7. Proposed Bootstrap Metadata Schema

The canonical bootstrap source-document shape will be:

```yaml
---
artifact:
  id: MSL-CORE-0001
  type: knowledge.specification
  namespace: monad
  series: MSL-CORE
  sequence: 1

metadata:
  title: Monad Specification Language Vision
  version: 0.1.0
  status: draft
  created: 2026-08-03
  updated: 2026-08-04
  authors:
    - Monad Architecture Team
  tags:
    - msl

relationships:
  depends_on:
    - ADR-0001
    - ADR-0002
  references: []
  enables: []

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: bootstrap
  source_role: primary
  schema: monad.msl/document@0.1

provenance:
  source: specifications/MSL/core/MSL-CORE-0001.md
---
```

### 7.1 Required Fields

The `bootstrap` profile will require:

- `artifact.id`
- `artifact.type`
- `artifact.namespace`
- `artifact.series`
- `artifact.sequence`
- `metadata.title`
- `metadata.version`
- `metadata.status`
- `metadata.created`
- `metadata.updated`
- `compilation.language`
- `compilation.language_version`
- `compilation.profile`
- `compilation.source_role`
- `compilation.schema`
- `provenance.source`

### 7.2 Optional Fields

The bootstrap profile may permit:

- `metadata.authors`
- `metadata.tags`
- `relationships.depends_on`
- `relationships.references`
- `relationships.enables`
- `provenance.created_by`
- `provenance.reviewed_by`
- `provenance.derived_from`

Unknown fields will be permitted with an informational diagnostic during bootstrap unless they conflict with a reserved field or declared schema rule.

## 8. Field Types and Validation Rules

| Field | Type | Bootstrap Rule |
|---|---|---|
| `artifact.id` | string | Must match the artifact-ID grammar and agree with filename, H1, series, sequence, and registry. |
| `artifact.type` | string | Must equal `knowledge.specification` for MSL specification documents. |
| `artifact.namespace` | string | Non-empty lowercase identifier; bootstrap canonical value is `monad`. |
| `artifact.series` | string | Must match the artifact-ID prefix before the final numeric component. |
| `artifact.sequence` | integer | Non-negative; must equal the numeric suffix of `artifact.id`. |
| `metadata.title` | string | Non-empty and must agree exactly with the H1 title after normalization of surrounding whitespace. |
| `metadata.version` | string | SemVer-compatible string; bootstrap documents use `0.1.0`. |
| `metadata.status` | enum | One of the canonical artifact lifecycle values. |
| `metadata.created` | date | ISO 8601 calendar date, `YYYY-MM-DD`. |
| `metadata.updated` | date | ISO 8601 calendar date and not earlier than `created`. |
| `metadata.authors` | list[string] | Optional; entries must be non-empty. |
| `metadata.tags` | list[string] | Optional; lowercase kebab-case, unique in document order. |
| relationship lists | list[string] | Optional; unique stable artifact IDs or declared planned-series IDs. |
| `compilation.language` | string | Must equal `msl-markdown` for this frontend. |
| `compilation.language_version` | string | Must equal `bootstrap` for this contract. |
| `compilation.profile` | string | Must equal `bootstrap` for normalized bootstrap documents. |
| `compilation.source_role` | enum | Must equal `primary` for the single-file documents in scope. |
| `compilation.schema` | string | Must equal `monad.msl/document@0.1`. |
| `provenance.source` | string | Normalized repository-relative POSIX path; must match the current file path. |

YAML timestamps will be treated as lexical date values by the future parser contract; canonical serialization will retain `YYYY-MM-DD`.

## 9. Artifact Identifier Grammar

Canonical artifact IDs will match:

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*-[0-9]{4}$
```

Examples:

```text
MSL-CORE-0001
MKE-ARTIFACT-0004
ADR-0002
```

The final four-digit component is the artifact sequence.

For an artifact ID `MSL-CORE-0001`:

```text
artifact.series   = MSL-CORE
artifact.sequence = 1
filename          = MSL-CORE-0001.md
```

Identity agreement is exact and case-sensitive.

The title heading must use:

```text
# <ARTIFACT-ID> — <TITLE>
```

where the separator is one space, an em dash, and one space.

## 10. Artifact Status Lifecycle

The canonical bootstrap artifact statuses will be:

```text
placeholder → draft → review → accepted
```

Additional terminal or compatibility states are:

```text
superseded
deprecated
```

Rules:

- `placeholder` means the artifact identity is reserved but substantive content is absent.
- `draft` means substantive content exists but is not approved as governing architecture.
- `review` means the artifact is proposed for governance review.
- `accepted` means an explicit governance record authorizes the artifact as normative.
- `superseded` means another artifact or version replaces it.
- `deprecated` means it remains available but should not govern new work.

`planned` is not a canonical artifact lifecycle state in the bootstrap contract. Planning belongs in registry series, roadmap, or work-packet state.

`active` is not an artifact lifecycle state. It may continue to describe a registry series.

`approved` is not the canonical serialization value; artifact-level prose will use `accepted`.

Compilation, validation, publication, and source-working states remain separate dimensions.

## 11. Bootstrap Profile

The `bootstrap` profile is a provisional source-document conformance profile.

It requires:

1. valid UTF-8 without a BOM;
2. canonical YAML front matter;
3. the required metadata fields;
4. one canonical H1 title;
5. identity agreement;
6. required bootstrap sections;
7. uniquely identified normative requirements;
8. at least one acceptance criterion;
9. source provenance;
10. deterministic diagnostics for violations.

It does not claim full conformance with the future `narrative`, `structured`, `normative`, `machine`, or `executable` hierarchy.

## 12. Bootstrap Markdown Structural Grammar

### 12.1 Document Envelope

A canonical document consists of:

```text
YAML front matter
blank line
one H1 title
zero or more Markdown blocks organized under H2 sections
```

### 12.2 Front Matter

- The opening delimiter must be the first three bytes of the file: `---`.
- Opening and closing delimiters must appear alone on a line.
- No blank line may precede the opening delimiter.
- The front matter must parse as one YAML mapping.
- Duplicate YAML keys are invalid.
- Canonical line endings are LF.

### 12.3 Title

Exactly one H1 is permitted.

It must match:

```text
# <artifact.id> — <metadata.title>
```

### 12.4 Heading Hierarchy

- H2 defines top-level semantic or informative sections.
- H3 defines subsections, requirement declarations, invariant declarations, diagnostic declarations, or acceptance-criterion entries.
- Heading levels must not skip from H2 to H4 or deeper.
- H1 content may not appear inside fenced code blocks as a structural title.

### 12.5 Required Sections

The bootstrap profile requires semantic sections equivalent to:

- `Purpose`
- `Scope`
- `Normative Requirements`
- `Acceptance Criteria`
- `Status`

`Status` may be a final unnumbered H2 section.

The following sections are conditionally required:

- `Terminology` when terms have project-specific meanings;
- `Open Questions` when unresolved or deferred decisions exist;
- `Diagnostics` when the artifact defines validator or compiler behavior;
- `Security and Trust Considerations` when the artifact affects trust boundaries.

### 12.6 Recommended Order

The canonical template order is recommended but not semantically mandatory:

1. Purpose
2. Context
3. Scope
4. Non-Goals
5. Terminology
6. Normative Requirements
7. Conceptual Model
8. Machine Specification
9. Invariants
10. Diagnostics
11. Acceptance Criteria
12. Conformance Examples
13. Security and Trust Considerations
14. Evolution and Compatibility
15. Open Questions
16. Related Specifications
17. Status

### 12.7 Section Aliases

The initial bootstrap validator will use a closed alias table declared by MSL-CORE-0005. At minimum:

- `Security Considerations` aliases `Security and Trust Considerations`.
- `Evolution` aliases `Evolution and Compatibility` only when explicitly allowed by the active schema version.

Unknown H2 sections are permitted as informative extensions unless they duplicate or ambiguously alias a required semantic section.

### 12.8 Requirement Declarations

A normative requirement declaration uses an H3 heading containing only its identifier:

```markdown
### MSL-DOC-REQ-001
```

The immediately following content must contain at least one normative statement.

Requirement declarations inside fenced code blocks are examples and do not enter the semantic requirement index.

### 12.9 Code Fences

- Opening and closing fence lengths must match.
- Info strings are preserved.
- YAML machine blocks must be syntactically valid when declared machine-normative.
- Content inside code fences does not create document headings or requirements.

### 12.10 Cross-References

Bootstrap local artifact references are exact artifact-ID tokens.

A reference is resolvable when it matches:

- an existing registered artifact;
- an existing filesystem artifact awaiting registry reconciliation; or
- an explicitly declared planned series identifier where series-level references are permitted.

Full import syntax is deferred.

### 12.11 Normative Keywords

The bootstrap contract recognizes uppercase RFC-style terms:

- `MUST`
- `MUST NOT`
- `SHOULD`
- `SHOULD NOT`
- `MAY`

Lowercase prose does not automatically become normative.

### 12.12 Duplicate and Unknown Sections

- Duplicate required semantic sections are errors unless MSL-CORE-0005 explicitly declares them repeatable.
- Unknown sections are informative by default during bootstrap.
- Unknown sections cannot override normative or machine-normative declarations.

### 12.13 Canonicalization

Canonicalization may:

- convert CRLF to LF;
- ensure one terminal newline;
- normalize front-matter delimiters;
- normalize indentation in generated examples;
- sort diagnostics.

Canonicalization must not:

- reorder authored prose sections;
- renumber requirements silently;
- rewrite titles semantically;
- sort author or relationship lists unless a specification explicitly requires it;
- alter code-fence contents.

## 13. Requirement Identifier Rules

Canonical requirement IDs match:

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-REQ-[0-9]{3}$
```

Examples:

```text
MSL-DOC-REQ-001
WP-MSL-REQ-001
```

Rules:

1. Requirement IDs are globally unique within the compiled specification corpus.
2. A single-document parser must detect duplicates within its document.
3. A compilation-unit validator must detect duplicates across all sources in that unit.
4. A corpus validator must detect duplicates across registered artifacts.
5. Existing valid identifiers are preserved.
6. Renumbering requires an explicit migration record and must not occur silently.

The global uniqueness rule supports stable graph identity and cross-artifact references.

## 14. Diagnostic Contract

The bootstrap diagnostic record will contain:

```yaml
code: MSL0006
severity: error
message: "Missing required metadata field: artifact.id"
path: specifications/MSL/core/MSL-CORE-0001.md
artifact_id: null
rule: MSL-META-REQ-001
span:
  start:
    line: 1
    column: 1
  end:
    line: 1
    column: 4
```

Required fields:

- `code`
- `severity`
- `message`
- `path`
- `artifact_id`
- `rule`
- `span.start.line`
- `span.start.column`
- `span.end.line`
- `span.end.column`

`artifact_id` and `rule` may be null when unavailable.

Line and column numbers are one-based. End positions are exclusive.

Severities are:

- `error`
- `warning`
- `info`

Diagnostic ordering is ascending by:

1. normalized path;
2. start line;
3. start column;
4. severity rank: `error`, `warning`, `info`;
5. diagnostic code;
6. message as a final deterministic tie-breaker.

## 15. Bootstrap Diagnostic Allocation

The plan reserves `MSL0001` through `MSL0099` for lexical, source-document, metadata, Markdown-structure, and registry diagnostics.

Existing `MSL0101` through `MSL0115` remain unchanged.

Initial diagnostics:

| Code | Severity | Condition |
|---|---|---|
| `MSL0001` | error | Input is not valid UTF-8. |
| `MSL0002` | error | A UTF-8 BOM precedes the document. |
| `MSL0003` | error | Required front matter is absent. |
| `MSL0004` | error | A front-matter delimiter is malformed or misplaced. |
| `MSL0005` | error | Front matter is invalid YAML or is not a mapping. |
| `MSL0006` | error | A required metadata field is missing. |
| `MSL0007` | error | An artifact identifier is invalid. |
| `MSL0008` | error | Filename, metadata, H1, series, sequence, or registry identity disagrees. |
| `MSL0009` | error | `provenance.source` does not match the current repository-relative path. |
| `MSL0010` | error | Artifact lifecycle status is invalid. |
| `MSL0011` | error | Compilation profile is invalid or unsupported. |
| `MSL0012` | error | The document has zero or multiple structural H1 headings. |
| `MSL0013` | error | A required bootstrap semantic section is missing. |
| `MSL0014` | error | A requirement identifier is duplicated in its validation scope. |
| `MSL0015` | error | A local artifact reference is unresolved. |
| `MSL0016` | error | Registry identity, path, status, version, or series disagrees with the source document. |
| `MSL0017` | error | Heading hierarchy is invalid. |
| `MSL0018` | warning | An unknown front-matter field is present. |
| `MSL0019` | info | An unknown H2 section is treated as informative bootstrap content. |

The exact requirement-to-diagnostic mapping will be defined in MSL-CORE-0004 and MSL-CORE-0005.

## 16. Exact File-by-File Changes

### 16.1 `specifications/MSL/core/MSL-CORE-0004.md`

Create a complete draft bootstrap specification titled:

```text
MSL-CORE-0004 — Metadata and Artifact Identity
```

It will define:

- metadata group structure;
- required and optional fields;
- field types;
- artifact-ID grammar;
- title, filename, series, and sequence agreement;
- lifecycle status vocabulary;
- compilation declarations;
- profile semantics;
- source-role semantics;
- provenance source-path rules;
- relationship-list rules;
- canonical examples;
- normative requirements with stable IDs;
- invariants;
- `MSL0006` through `MSL0011`, `MSL0016`, and `MSL0018` applicability;
- acceptance criteria;
- valid and invalid examples;
- deferred metadata decisions.

Status remains `draft`.

### 16.2 `specifications/MSL/core/MSL-CORE-0005.md`

Create a complete draft bootstrap specification titled:

```text
MSL-CORE-0005 — MSL Markdown Structural Grammar
```

It will define:

- UTF-8 and BOM rules;
- LF canonical line endings;
- front-matter placement and delimiters;
- one-H1 rule;
- H1 identity/title grammar;
- heading hierarchy;
- required and conditional sections;
- recommended order;
- closed section-alias table;
- requirement declarations;
- code-fence handling;
- cross-reference recognition;
- normative keywords;
- duplicate/unknown-section behavior;
- canonicalization limits;
- normative requirements with stable IDs;
- invariants;
- `MSL0001` through `MSL0005`, `MSL0012` through `MSL0015`, `MSL0017`, and `MSL0019` applicability;
- acceptance criteria;
- valid and invalid examples;
- deferred grammar decisions.

Status remains `draft`.

### 16.3 `specifications/MSL/core/MSL-CORE-0001.md`

Modify only what is necessary for bootstrap conformance:

- repair YAML indentation;
- replace the malformed closing delimiter with `---`;
- add `artifact.series` and `artifact.sequence`;
- retain `artifact.type` and `artifact.namespace`;
- add `metadata.updated`;
- replace `compilation.status` with `compilation.profile`;
- add `compilation.source_role`;
- add `compilation.schema`;
- add `provenance.source`;
- verify H1 identity and title agreement;
- add or normalize a required `Scope` section if absent;
- ensure `Normative Requirements`, `Acceptance Criteria`, and `Status` sections are explicitly present;
- preserve all substantive architectural prose and existing valid requirement identifiers;
- avoid unrelated editorial rewriting.

### 16.4 `specifications/MSL/core/MSL-CORE-0002.md`

Modify only what is necessary for bootstrap conformance and terminology alignment:

- repair YAML indentation;
- replace the malformed closing delimiter with `---`;
- add `artifact.series` and `artifact.sequence`;
- retain `artifact.type` and `artifact.namespace`;
- add `metadata.updated`;
- replace `compilation.status` with `compilation.profile`;
- add `compilation.source_role`;
- add `compilation.schema`;
- add `provenance.source`;
- add `bootstrap` to the provisional profile model without replacing the future hierarchy;
- replace artifact-level `approved`/`active` terminology with canonical `accepted` where required;
- preserve `MSL-DOC-REQ-001` through `MSL-DOC-REQ-024`;
- preserve `MSL0101` through `MSL0115`;
- update examples to the canonical metadata shape;
- avoid unrelated conceptual changes.

### 16.5 `specifications/templates/bootstrap-specification.md`

Update the template to:

- use the canonical grouped metadata schema;
- include every required bootstrap field;
- include explicit placeholder values for series and sequence;
- include `compilation.profile: bootstrap`;
- include `compilation.source_role: primary`;
- include `compilation.schema: monad.msl/document@0.1`;
- include `provenance.source`;
- retain the canonical recommended section order;
- add a requirement-declaration example;
- clarify which sections are conditionally required;
- use only valid YAML and canonical delimiters.

### 16.6 `specifications/registry/specifications.yaml`

Reconcile records as follows:

- change `MSL-CORE-0001.lifecycle` from `planned` to `draft`;
- retain `MSL-CORE-0002.lifecycle: draft`;
- add `MSL-CORE-0004` with the exact title, path, version `0.1.0`, lifecycle `draft`, and compilation status `bootstrap`;
- add `MSL-CORE-0005` with the exact title, path, version `0.1.0`, lifecycle `draft`, and compilation status `bootstrap`;
- do not redesign the registry schema in this packet;
- do not repair unrelated MKE registry omissions.

### 16.7 `engineering/reports/WP-MSL-0001-execution-report.md`

Create the evidence report required by the work packet, including:

- authority review;
- files examined and modified;
- metadata decisions;
- structural decisions;
- diagnostic allocation;
- registry reconciliation;
- requirement identifier preservation;
- contradiction resolutions;
- deferred decisions;
- verification results;
- AC-001 through AC-014 matrix;
- final diff summary;
- explicit statement that no implementation code or dependency was added.

## 17. Registry Changes

The registry remains manually maintained and filesystem-backed.

No new registry schema fields are required for this packet.

The four affected records after execution will be:

| Artifact | Title | Lifecycle | Compilation Status |
|---|---|---|---|
| `MSL-CORE-0001` | Monad Specification Language Vision | `draft` | `bootstrap` |
| `MSL-CORE-0002` | Specification Document Model | `draft` | `bootstrap` |
| `MSL-CORE-0004` | Metadata and Artifact Identity | `draft` | `bootstrap` |
| `MSL-CORE-0005` | MSL Markdown Structural Grammar | `draft` | `bootstrap` |

`MSL-CORE-0003` is not added merely because it is referenced as planned; its reconciliation belongs to a separate corpus/registry packet unless execution discovers a direct requirement that cannot otherwise be satisfied.

## 18. References and Identifiers Requiring Correction

Expected corrections are limited to:

- malformed YAML nesting in MSL-CORE-0001 and MSL-CORE-0002;
- `compilation.status` renamed to `compilation.profile`;
- registry lifecycle mismatch for MSL-CORE-0001;
- absent registry records for MSL-CORE-0004 and MSL-CORE-0005;
- examples in MSL-CORE-0002 that omit newly required bootstrap fields;
- artifact-level `approved`/`active` wording where it conflicts with the canonical lifecycle.

Existing valid requirement, invariant, and diagnostic IDs will not be renumbered.

## 19. Deferred Decisions

The following are deferred:

| Decision | Future Work |
|---|---|
| Parser implementation language | WP-MSC-0001 |
| Root package/workspace layout | WP-MSC-0001 or prerequisite ADR |
| YAML and Markdown libraries | WP-MSC-0001 |
| CLI commands and exit codes | WP-MSC-0001 |
| KIR identity and source-map schema | KIR core work packets |
| Stable import syntax | Later MSL core specification |
| Multi-file compilation semantics | Later MSL/MSC work packets |
| Stable maturity-profile migration | Later MSL conformance work packet |
| Digital signatures and attestations | Later provenance/security specification |
| Registry generation and schema redesign | Registry implementation work packet |
| Automatic canonical rewriting | Later formatter work packet |

## 20. Execution Sequence

1. Record starting branch, commit, and working-tree status.
2. Re-read all authoritative inputs.
3. Create the execution report skeleton.
4. Author MSL-CORE-0004 using the approved metadata decisions.
5. Author MSL-CORE-0005 using the approved structural decisions.
6. Normalize front matter in MSL-CORE-0001.
7. Normalize front matter and terminology in MSL-CORE-0002.
8. Update examples in MSL-CORE-0002.
9. Update the bootstrap template.
10. Reconcile the four registry records.
11. Perform manual cross-file identity and source-path checks.
12. Parse all affected front matter with an already-available YAML parser when possible.
13. Search for malformed closing delimiters in affected files.
14. Search for duplicate requirement IDs in affected documents.
15. Verify introduced local references.
16. Run `git diff --check` and inspect `git status --short`.
17. Review the entire diff for scope compliance.
18. Complete the execution report and AC matrix.
19. Stop without committing or pushing.

## 21. Verification Procedure

### 21.1 Repository Checks

```bash
git status --short
git diff --stat
git diff --check
git diff
```

### 21.2 Front-Matter Checks

For each affected MSL document and the template:

- first line is exactly `---`;
- closing delimiter is exactly `---`;
- YAML parses as one mapping;
- no duplicate YAML keys exist;
- required paths exist;
- dates use `YYYY-MM-DD`;
- `updated` is not earlier than `created`.

### 21.3 Identity Checks

For each affected source document:

- filename stem equals `artifact.id`;
- H1 ID equals `artifact.id`;
- H1 title equals `metadata.title`;
- `artifact.series` equals the ID prefix;
- `artifact.sequence` equals the numeric suffix;
- registry ID, title, series, path, version, lifecycle, and compilation status agree.

### 21.4 Provenance Checks

- `provenance.source` equals the repository-relative POSIX path;
- no absolute or machine-specific path is committed;
- provenance path is not treated as artifact identity.

### 21.5 Structural Checks

- exactly one structural H1 exists;
- required H2 semantic sections exist;
- heading hierarchy does not skip levels;
- normative requirements have valid and unique identifiers;
- code-fence examples do not enter the semantic requirement index;
- status prose agrees with `metadata.status`.

### 21.6 Reference Checks

- references added or modified resolve to existing artifacts or explicitly planned series;
- no unrelated MKE reference cleanup occurs;
- no existing valid requirement or diagnostic ID is changed silently.

### 21.7 Scope Checks

Expected modified or added files are limited to:

```text
specifications/MSL/core/MSL-CORE-0001.md
specifications/MSL/core/MSL-CORE-0002.md
specifications/MSL/core/MSL-CORE-0004.md
specifications/MSL/core/MSL-CORE-0005.md
specifications/templates/bootstrap-specification.md
specifications/registry/specifications.yaml
engineering/reports/WP-MSL-0001-execution-report.md
```

The approved work packet and execution plan may be updated only to record approval/status or correct an error discovered during review.

## 22. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Metadata schema becomes a second incompatible artifact model | Medium | High | Preserve grouped existing structure and document the refinement. |
| Bootstrap profile is confused with stable maturity levels | Medium | Medium | Define it explicitly as provisional and source-oriented. |
| Normalization causes broad editorial churn | Medium | Medium | Limit MSL-CORE-0001/0002 body edits to conformance and terminology. |
| Requirement IDs are accidentally renumbered | Low | High | Preserve IDs and search duplicates before completion. |
| Registry cleanup expands into unrelated MKE repair | Medium | Medium | Modify only four MSL records. |
| YAML parser behavior treats dates unexpectedly | Medium | Low | Specify canonical lexical form and inspect serialized values. |
| Unknown section rules become too permissive | Low | Medium | Unknown sections are informative only and cannot override normative content. |
| Path provenance is mistaken for identity | Low | High | State separation explicitly in MSL-CORE-0004 and examples. |

## 23. Acceptance-Criteria Traceability

| Criterion | Planned Changes | Verification | Expected Evidence |
|---|---|---|---|
| AC-001 | Repair front matter in 0001/0002; author valid 0004/0005; update template. | YAML parse and delimiter review. | Execution-report front-matter matrix. |
| AC-002 | Apply one grouped required metadata shape to all affected files. | Field-by-field comparison. | Metadata conformance table. |
| AC-003 | Define identity grammar; align filename, H1, metadata, and registry. | Identity script/manual matrix. | Identity agreement table. |
| AC-004 | Add exact repository-relative `provenance.source` values. | Path comparison. | Provenance matrix. |
| AC-005 | Author MSL-CORE-0004 with types, semantics, validation, and canonical form. | Specification review against field inventory. | MSL-CORE-0004 requirement trace. |
| AC-006 | Author MSL-CORE-0005 with the complete bootstrap structure. | Grammar checklist. | MSL-CORE-0005 requirement trace. |
| AC-007 | Define diagnostic record, allocation, severities, spans, and ordering. | Diagnostic-table review. | Diagnostic allocation table. |
| AC-008 | Define artifact and requirement ID format and uniqueness scopes. | Regex examples and duplicate search. | Identity and requirement-ID evidence. |
| AC-009 | Reconcile 0001/0002 and add 0004/0005 records. | Registry-to-filesystem comparison. | Registry reconciliation table. |
| AC-010 | Keep all four MSL artifacts at `draft`. | Metadata and registry review. | Governance-status statement. |
| AC-011 | Add no executable code, manifest, dependency, or test framework. | Diff and changed-file review. | Explicit no-implementation declaration. |
| AC-012 | Resolve all modified references or mark planned series explicitly. | Reference search. | Reference-integrity table. |
| AC-013 | Record future decisions in Open Questions/Deferred Decisions. | Section review. | Deferred-decision table. |
| AC-014 | Keep diff clean and scoped. | `git diff --check`, status, full diff review. | Command output and diff stat. |

## 24. Approval Recommendation

**Recommendation:** Approve with the decisions in this plan.

The plan is bounded, compatible with accepted ADRs, and sufficient to make WP-MSC-0001 objectively scorable.

Approval should authorize documentation changes only. It should not authorize implementation of a parser, validator, compiler, KIR schema, MKE runtime, dependency installation, or CI.

## 25. Approval Record

Complete before execution:

| Field | Value |
|---|---|
| Decision | Pending |
| Approved by | — |
| Date | — |
| Required corrections | — |
| Authorized branch | — |
| Authorized executor | Human-supervised Codex or equivalent |

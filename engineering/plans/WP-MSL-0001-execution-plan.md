---
artifact:
  id: PLAN-WP-MSL-0001
  kind: execution-plan
  title: WP-MSL-0001 Execution Plan
  status: approved
  version: 0.1.1
  created: 2026-08-04
  updated: 2026-08-04
  owner: monad-project
  execution_mode: supervised
  work_packet: WP-MSL-0001
  approval_record: APPROVAL-WP-MSL-0001
provenance:
  source: engineering/plans/WP-MSL-0001-execution-plan.md
---

# PLAN-WP-MSL-0001 — Bootstrap MSL Markdown Syntax Baseline

## 1. Plan Status

**Status:** Approved and executed through verification

**Work packet:** `WP-MSL-0001`

**Execution authorized:** Yes, by `APPROVAL-WP-MSL-0001`

**Implementation code authorized:** No

This plan defines the documentation-only execution sequence for establishing a coherent bootstrap `msl-markdown` source-document contract. It does not authorize executable MSL, MSC, KIR, or MKE implementation.

## 2. Executive Summary

WP-MSL-0001 is executable without an ADR change and without choosing an implementation language.

No stop condition was triggered.

The central decision is to preserve the repository's existing grouped metadata model:

```yaml
artifact: {}
metadata: {}
relationships: {}
compilation: {}
provenance: {}
```

rather than replacing it with a second flattened model. The illustrative field grouping in WP-MSL-0001 is refined under the work packet's explicit refinement allowance.

The work:

1. authors `MSL-CORE-0004` as the bootstrap metadata and artifact-identity contract;
2. authors `MSL-CORE-0005` as the bootstrap Markdown structural grammar;
3. normalizes `MSL-CORE-0001` and `MSL-CORE-0002` to conform;
4. normalizes the bootstrap specification template;
5. reconciles registry records for `MSL-CORE-0001`, `0002`, `0004`, and `0005`;
6. defines deterministic bootstrap diagnostics while preserving `MSL0101` through `MSL0115`;
7. records execution evidence in `engineering/reports/WP-MSL-0001-execution-report.md`.

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

### RF-007 — MSL-CORE-0002 delegates complete metadata to MSL-CORE-0004

`specifications/MSL/core/MSL-CORE-0002.md`, under **Scope**, excludes the complete metadata schema and delegates it to `MSL-CORE-0004`.

### RF-008 — Original MSL source front matter was malformed

The original `MSL-CORE-0001.md` and `MSL-CORE-0002.md` used unindented nested mappings and a long dashed closing line rather than exactly `---`.

They have now been normalized to the valid bootstrap form.

### RF-009 — Required maturity and provenance information was absent

`MSL-DOC-REQ-003`, `MSL-DOC-REQ-004`, and `MSL-DOC-REQ-005` require a language declaration, language version, maturity or bootstrap profile, source provenance, and at least one source location.

The normalized documents now declare those fields.

### RF-010 — Existing profile terminology required a bootstrap refinement

`MSL-CORE-0002` models a future hierarchy from `narrative` through `executable`.

The work packet requires `bootstrap`.

The executed resolution defines `bootstrap` as a provisional source-document conformance profile, not a stable level in the future hierarchy.

### RF-011 — Artifact lifecycle terminology was inconsistent

The template and active MSL documents used `draft`; the registry used `planned` for MSL-CORE-0001; and prose used `approved` and `active` for artifacts.

The executed contract defines one artifact lifecycle and keeps series and processing states separate.

### RF-012 — MSL-CORE-0004 and MSL-CORE-0005 were empty placeholders

Both files were zero-length before execution.

They now contain complete draft bootstrap specifications.

### RF-013 — Existing document diagnostics occupy MSL0101 through MSL0115

`MSL-CORE-0002` defines `MSL0101` through `MSL0115` for logical document-model failures.

Those identifiers remain preserved.

### RF-014 — The registry is manual and filesystem-oriented

`specifications/registry/specifications.yaml` declares:

```yaml
source_of_truth: filesystem
generated: false
```

The affected records now agree with their source files.

### RF-015 — The original MSL-CORE-0001 registry lifecycle was incorrect

The source was `draft`, while the registry said `planned`.

The registry now says `draft`.

### RF-016 — A diagnostic collision was discovered during execution

The original draft of MSL-CORE-0001 used `MSL0001` through `MSL0010`, colliding with the approved bootstrap source-diagnostic range.

The vision-level diagnostics were explicitly migrated to `MSL1001` through `MSL1010` and the migration was recorded in the specification and execution report.

## 4. Authority Review

The execution applied authority in this order:

1. `ADR-0001` and `ADR-0002`.
2. Normative requirements in `MSL-CORE-0001` and `MSL-CORE-0002`.
3. `WP-MSL-0001`.
4. `specifications/registry/specifications.yaml`.
5. `specifications/templates/bootstrap-specification.md`.
6. Historical build logs and journals.

No accepted ADR required modification.

The work packet's illustrative metadata shape is treated as a required conceptual field set, not an immutable serialization grouping, because the packet permits refinement to resolve repository conflicts.

## 5. Contradiction Register

### CR-001 — Grouped Existing Metadata Versus Flattened Illustrative Metadata

**Resolution:** Preserve the grouped model and require all conceptual fields in semantically appropriate mappings.

**Blocking:** No.

### CR-002 — Bootstrap Profile Versus Future Maturity Profiles

**Resolution:** Define `bootstrap` as a provisional source-document profile that does not replace the future maturity hierarchy.

**Blocking:** No.

### CR-003 — Artifact Lifecycle Terminology

**Resolution:** Define a closed artifact lifecycle, use `accepted` as the governance state, retain `active` only for series status, and reconcile MSL-CORE-0001 from `planned` to `draft`.

**Blocking:** No.

### CR-004 — Path Independence Versus Provenance Source-Path Validation

**Resolution:** Define `provenance.source` as the current source locator, not artifact identity.

**Blocking:** No.

### CR-005 — Source Location Requirement Versus Authored Source Spans

**Resolution:** The repository-relative source path satisfies authored bootstrap provenance; fine-grained spans are parser-generated.

**Blocking:** No.

### CR-006 — Bootstrap Diagnostic Range Versus Vision Diagnostic Range

**Resolution:** Reserve `MSL0001` through `MSL0099` for bootstrap source-document diagnostics and migrate the draft vision diagnostics to `MSL1001` through `MSL1010`.

**Blocking:** No.

## 6. Stop Conditions

No work-packet stop condition was triggered.

The following decisions remain outside this packet:

- implementation language;
- package/workspace layout;
- parser and YAML libraries;
- KIR schema;
- process exit codes;
- stable import syntax;
- multi-file merge semantics;
- stable maturity-profile migration semantics.

## 7. Bootstrap Metadata Schema

The canonical source-document shape is:

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

The bootstrap profile requires:

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

The profile permits:

- `metadata.authors`
- `metadata.tags`
- `relationships.depends_on`
- `relationships.references`
- `relationships.enables`
- `provenance.created_by`
- `provenance.reviewed_by`
- `provenance.derived_from`

## 8. Field Types and Validation Rules

| Field | Type | Bootstrap Rule |
|---|---|---|
| `artifact.id` | string | Valid artifact ID agreeing with filename, H1, series, sequence, and registry. |
| `artifact.type` | string | `knowledge.specification`. |
| `artifact.namespace` | string | Canonical Monad value `monad`. |
| `artifact.series` | string | ID prefix before the final numeric component. |
| `artifact.sequence` | integer | Numeric value of the final four-digit component. |
| `metadata.title` | string | Non-empty and equal to the H1 title. |
| `metadata.version` | string | SemVer-compatible string. |
| `metadata.status` | enum | Canonical artifact lifecycle value. |
| `metadata.created` | date | ISO 8601 `YYYY-MM-DD`. |
| `metadata.updated` | date | ISO 8601 date not earlier than `created`. |
| `metadata.authors` | list of strings | Optional, non-empty entries. |
| `metadata.tags` | list of strings | Optional, lowercase kebab-case and unique. |
| relationship lists | list of identifiers | Optional, unique, authored-order stable. |
| `compilation.language` | string | `msl-markdown`. |
| `compilation.language_version` | string | `bootstrap`. |
| `compilation.profile` | string | `bootstrap`. |
| `compilation.source_role` | enum | `primary` for in-scope sources. |
| `compilation.schema` | string | `monad.msl/document@0.1`. |
| `provenance.source` | string | Normalized repository-relative POSIX path. |

## 9. Artifact Identifier Grammar

Canonical artifact IDs match:

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*-[0-9]{4}$
```

Identity agreement is exact and case-sensitive.

The title heading uses:

```text
# <ARTIFACT-ID> — <TITLE>
```

## 10. Artifact Status Lifecycle

The canonical bootstrap artifact statuses are:

```text
placeholder → draft → review → accepted
```

Additional terminal or compatibility states are:

```text
superseded
deprecated
```

Compilation, validation, publication, series, and source-working states remain separate dimensions.

## 11. Bootstrap Profile

The `bootstrap` profile is a provisional source-document conformance profile.

It requires:

1. UTF-8 without a BOM;
2. canonical YAML front matter;
3. required metadata;
4. one canonical H1;
5. identity agreement;
6. required semantic sections;
7. identified normative requirements;
8. acceptance criteria;
9. source provenance;
10. deterministic diagnostics.

It does not claim full conformance with the planned `narrative`, `structured`, `normative`, `machine`, or `executable` hierarchy.

## 12. Bootstrap Markdown Structural Grammar

### 12.1 Document Envelope

```text
YAML front matter
blank line
one H1 title
Markdown body organized under H2 sections
terminal newline
```

### 12.2 Required Sections

- `Purpose`
- `Scope`
- `Normative Requirements`
- `Acceptance Criteria`
- `Status`

### 12.3 Requirement Declarations

A normative requirement declaration uses an H3 containing only its identifier:

```markdown
### MSL-DOC-REQ-001
```

### 12.4 Requirement Identifier Grammar

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-REQ-[0-9]{3}$
```

Requirement IDs are globally unique in the compiled corpus.

### 12.5 Normative Keywords

- `MUST`
- `MUST NOT`
- `SHOULD`
- `SHOULD NOT`
- `MAY`

### 12.6 Canonicalization Boundaries

Canonicalization may normalize line endings, delimiters, indentation, terminal newline, and diagnostics.

It must not silently change identity, requirements, normative meaning, section authority, lifecycle, or code-fence content.

## 13. Diagnostic Contract

The bootstrap record includes:

- code;
- severity;
- message;
- repository-relative path;
- artifact identifier when available;
- governing rule when available;
- source span.

Diagnostics sort by:

1. path;
2. start line;
3. start column;
4. severity rank;
5. code;
6. message.

## 14. Diagnostic Allocation

| Range | Purpose |
|---|---|
| `MSL0001`–`MSL0099` | Bootstrap source, metadata, identity, structure, and registry diagnostics |
| `MSL0101`–`MSL0115` | Logical document-model diagnostics |
| `MSL1001`–`MSL1010` | Vision-level semantic diagnostics |

## 15. File-by-File Execution Result

### 15.1 `MSL-CORE-0004.md`

Authored a complete draft specification defining metadata groups, required and optional fields, identity, lifecycle, compilation declarations, provenance, relationships, serialization, requirements, invariants, diagnostics, examples, security, and deferred decisions.

### 15.2 `MSL-CORE-0005.md`

Authored a complete draft specification defining encoding, front matter, H1 syntax, heading hierarchy, semantic sections, requirement declarations, code fences, references, normative keywords, canonicalization, source spans, diagnostics, examples, security, and deferred decisions.

### 15.3 `MSL-CORE-0001.md`

Normalized metadata and structure, preserved `MSL-VISION-REQ-001` through `MSL-VISION-REQ-018`, and migrated draft diagnostics to `MSL1001` through `MSL1010`.

### 15.4 `MSL-CORE-0002.md`

Normalized metadata, profile and lifecycle terminology, and examples while preserving `MSL-DOC-REQ-001` through `MSL-DOC-REQ-024` and `MSL0101` through `MSL0115`.

### 15.5 Bootstrap Template

Updated the template to the complete grouped bootstrap metadata and canonical section structure.

### 15.6 Specification Registry

Reconciled MSL-CORE-0001, 0002, 0004, and 0005 without redesigning the registry or repairing unrelated MKE omissions.

## 16. Deferred Decisions

| Decision | Future Work |
|---|---|
| Parser implementation language | WP-MSC-0001 |
| Root package/workspace layout | WP-MSC-0001 or prerequisite ADR |
| YAML and Markdown libraries | WP-MSC-0001 |
| CLI and exit-code contract | WP-MSC-0001 |
| KIR identity and source-map schema | KIR core work |
| Stable import syntax | Later MSL core work |
| Multi-file compilation semantics | Later MSL/MSC work |
| Stable maturity-profile migration | Later conformance work |
| Signatures and attestations | Later provenance/security work |
| Registry generation | Registry implementation work |
| Canonical rewriting | Formatter work |

## 17. Execution and Verification Sequence

1. Review authoritative inputs.
2. Produce this execution plan.
3. Record approval.
4. Author MSL-CORE-0004 and MSL-CORE-0005.
5. Normalize MSL-CORE-0001 and MSL-CORE-0002.
6. Normalize the template and registry.
7. Review YAML, identities, requirements, diagnostics, references, and diff scope.
8. Correct the nested-fence defect found in MSL-CORE-0005.
9. Create the execution report.
10. Leave the PR unmerged pending local diff-hygiene verification.

## 18. Verification Status

Completed connector-backed checks:

- YAML front-matter review;
- required-field review;
- identity and provenance agreement;
- registry reconciliation;
- requirement identifier preservation;
- diagnostic collision resolution;
- changed-file scope review;
- no-implementation review;
- full PR diff review.

Required local checks:

```bash
git status --short
git diff main...HEAD --check
git diff main...HEAD --stat
```

The execution report records AC-014 as pending until `git diff --check` passes.

## 19. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Grouped schema becomes incompatible with later KIR | Low | High | Keep source schema separate from KIR. |
| Bootstrap profile is confused with stable maturity levels | Medium | Medium | Define it explicitly as provisional. |
| Normalization changes prose too broadly | Medium | Medium | Preserve requirements and architectural meaning; review the diff. |
| Requirement IDs are renumbered | Low | High | Inventory and preserve them. |
| Diagnostic IDs collide | Resolved | High | Use separate 0000, 0100, and 1000 ranges. |
| Registry cleanup expands into MKE repair | Low | Medium | Restrict changes to four MSL records. |
| Markdown hard-break spaces fail diff hygiene | Medium | Low | Run local `git diff --check` and remove reported trailing spaces. |

## 20. Acceptance-Criteria Traceability

| Criterion | Result | Evidence |
|---|---|---|
| AC-001 | Passed | Canonical valid front matter. |
| AC-002 | Passed | One grouped metadata shape. |
| AC-003 | Passed | Filename, H1, metadata, series, sequence, and registry agree. |
| AC-004 | Passed | Provenance paths match. |
| AC-005 | Passed | MSL-CORE-0004 defines the metadata contract. |
| AC-006 | Passed | MSL-CORE-0005 defines the structural contract. |
| AC-007 | Passed | Diagnostic representation and ordering are defined. |
| AC-008 | Passed | Requirement format and uniqueness are explicit. |
| AC-009 | Passed | Four registry records reconciled. |
| AC-010 | Passed | All four specifications remain draft. |
| AC-011 | Passed | No executable implementation added. |
| AC-012 | Passed with bootstrap qualification | References resolve to artifacts or planned series. |
| AC-013 | Passed | Deferred decisions are explicit. |
| AC-014 | Pending local verification | `git diff main...HEAD --check` remains required. |

## 21. Approval and Execution Record

| Field | Value |
|---|---|
| Decision | Approved |
| Approved by | Thomas Carter |
| Date | 2026-08-04 |
| Approval record | `engineering/approvals/WP-MSL-0001-approval.md` |
| Authorized branch | `agent/bootstrap-work-packet-governance` |
| Authorized executor | Human-supervised ChatGPT/Codex-equivalent workflow |
| Execution report | `engineering/reports/WP-MSL-0001-execution-report.md` |

## 22. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | 2026-08-04 | Monad project | Initial proposed execution plan |
| 0.1.1 | 2026-08-04 | Monad project | Record approval, execution results, diagnostic migration, and verification state |

---
artifact:
  id: MSL-CORE-0004
  type: knowledge.specification
  namespace: monad
  series: MSL-CORE
  sequence: 4

metadata:
  title: Metadata and Artifact Identity
  version: 0.1.0
  status: draft
  created: 2026-08-04
  updated: 2026-08-04
  authors:
    - Monad Architecture Team
  tags:
    - msl
    - metadata
    - identity
    - lifecycle
    - provenance
    - bootstrap

relationships:
  depends_on:
    - ADR-0001
    - ADR-0002
    - MSL-CORE-0001
    - MSL-CORE-0002
  references:
    - MSL-CORE-0005
    - MKE-CORE-0002
    - MKE-CORE-0005
  enables:
    - MSC-CORE
    - KIR-CORE

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: bootstrap
  source_role: primary
  schema: monad.msl/document@0.1

provenance:
  source: specifications/MSL/core/MSL-CORE-0004.md
---

# MSL-CORE-0004 — Metadata and Artifact Identity

## 1. Purpose

This specification defines the bootstrap metadata, identity, lifecycle, compilation, relationship, and source-provenance contract for Monad Specification Language documents authored using `msl-markdown`.

It establishes the minimum machine-parseable information required to:

- discover a specification;
- determine its stable artifact identity;
- distinguish identity from source location;
- select the applicable bootstrap validation profile;
- reconcile the source document with the Specification Registry;
- preserve traceability into future compiler and knowledge-engine stages;
- emit deterministic metadata diagnostics.

This specification defines source-document metadata. It does not define the complete KIR artifact representation.

## 2. Context

Monad treats specifications as compilable knowledge artifacts.

A source file requires enough explicit metadata to permit deterministic parsing, validation, identity registration, relationship discovery, lifecycle checks, source mapping, and later compilation.

The initial MSL documents predate an executable validator. Their metadata must therefore be self-describing, conservative, and manually verifiable.

The bootstrap metadata contract is intentionally smaller than the eventual artifact and KIR models. It exists to make the first MSL parser and validator implementable without forcing that implementation to infer semantics from filenames or prose.

## 3. Scope

This specification defines:

- the bootstrap YAML front-matter data model;
- required and optional metadata fields;
- field types and canonical values;
- artifact identifier syntax;
- series and sequence derivation;
- title and filename agreement;
- artifact lifecycle status;
- compilation declarations;
- the provisional `bootstrap` profile;
- source roles;
- relationship-list representation;
- repository-relative source provenance;
- metadata validation behavior;
- metadata and identity diagnostics.

## 4. Non-Goals

This specification does not define:

- Markdown body grammar, which is defined by `MSL-CORE-0005`;
- the complete MSL type system;
- KIR serialization;
- compiler implementation language or library choices;
- process exit codes;
- cryptographic signatures or attestations;
- full multi-file compilation semantics;
- stable import or package syntax;
- registry generation;
- artifact storage in MKE;
- publication metadata;
- implementation-specific caches or compiler state.

## 5. Core Principles

### 5.1 Identity Is Stable

The canonical artifact identifier represents the logical specification and does not depend on its current filename, directory, repository, URL, or publication location.

### 5.2 Source Location Is Explicit

The current authored source location is recorded explicitly for discovery, validation, and traceability.

Moving a document changes its source locator but does not create a new artifact identity.

### 5.3 Metadata Is Declarative

Bootstrap metadata declares facts and validation inputs. It must not contain executable code or model-dependent instructions.

### 5.4 Metadata Is Deterministic

Equivalent metadata under the same schema and language versions must validate equivalently and produce diagnostics in a stable order.

### 5.5 Governance State Is Distinct

Artifact lifecycle status is distinct from:

- series status;
- Git working-tree state;
- validation status;
- compilation status;
- publication status;
- runtime availability.

## 6. Bootstrap Front-Matter Model

A bootstrap MSL specification uses one YAML mapping with the following top-level groups:

```yaml
artifact: {}
metadata: {}
relationships: {}
compilation: {}
provenance: {}
```

The canonical shape is:

```yaml
---
artifact:
  id: MSL-CORE-0004
  type: knowledge.specification
  namespace: monad
  series: MSL-CORE
  sequence: 4

metadata:
  title: Metadata and Artifact Identity
  version: 0.1.0
  status: draft
  created: 2026-08-04
  updated: 2026-08-04
  authors:
    - Monad Architecture Team
  tags:
    - msl
    - metadata

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
  source: specifications/MSL/core/MSL-CORE-0004.md
---
```

The group boundaries are semantically meaningful and must be preserved by canonical serializers.

## 7. Required Fields

A primary source claiming the `bootstrap` profile MUST declare:

| Field | Type | Required Value or Rule |
|---|---|---|
| `artifact.id` | string | Valid artifact identifier. |
| `artifact.type` | string | `knowledge.specification`. |
| `artifact.namespace` | string | Non-empty namespace; canonical Monad value is `monad`. |
| `artifact.series` | string | Artifact-ID prefix before the final sequence component. |
| `artifact.sequence` | integer | Numeric value of the final four-digit ID component. |
| `metadata.title` | string | Non-empty title agreeing with the H1 title. |
| `metadata.version` | string | SemVer-compatible version. |
| `metadata.status` | string | Canonical artifact lifecycle value. |
| `metadata.created` | date | ISO 8601 calendar date. |
| `metadata.updated` | date | ISO 8601 calendar date not earlier than `created`. |
| `compilation.language` | string | `msl-markdown`. |
| `compilation.language_version` | string | `bootstrap`. |
| `compilation.profile` | string | `bootstrap`. |
| `compilation.source_role` | string | `primary` for the single-file bootstrap form. |
| `compilation.schema` | string | `monad.msl/document@0.1`. |
| `provenance.source` | string | Canonical repository-relative source path. |

## 8. Optional Fields

The bootstrap profile permits:

| Field | Type | Rule |
|---|---|---|
| `metadata.authors` | list of strings | Each entry must be non-empty. |
| `metadata.tags` | list of strings | Lowercase kebab-case; no duplicates. |
| `relationships.depends_on` | list of identifiers | Direct prerequisites. |
| `relationships.references` | list of identifiers | Informative or semantic references. |
| `relationships.enables` | list of identifiers | Artifacts or planned series enabled by this artifact. |
| `provenance.created_by` | string | Optional creator identity. |
| `provenance.reviewed_by` | list of strings | Optional reviewer identities. |
| `provenance.derived_from` | list of identifiers or locators | Optional derivation sources. |

Unknown fields MAY be preserved during bootstrap.

A validator SHOULD emit an informational diagnostic for an unknown field unless the field conflicts with a reserved field name, changes the interpretation of a required field, or violates YAML structure.

## 9. Artifact Identifier

### 9.1 Grammar

A bootstrap artifact identifier MUST match:

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z][A-Z0-9]*)*-[0-9]{4}$
```

Valid examples include:

```text
ADR-0002
MSL-CORE-0004
MKE-ARTIFACT-0004
```

Invalid examples include:

```text
msl-core-0004
MSL_CORE_0004
MSL-CORE-4
MSL-CORE-00004
-MSL-CORE-0004
```

### 9.2 Series

`artifact.series` MUST equal the artifact identifier with its final hyphen and four-digit sequence removed.

For `MSL-CORE-0004`:

```text
artifact.series = MSL-CORE
```

### 9.3 Sequence

`artifact.sequence` MUST be an integer equal to the numeric value of the final four-digit component.

For `MSL-CORE-0004`:

```text
artifact.sequence = 4
```

Leading zeros are preserved only in the string artifact identifier.

### 9.4 Filename Agreement

For the single-file primary-source form, the filename stem MUST equal `artifact.id`.

The `.md` extension is the canonical extension for the bootstrap `msl-markdown` source form.

### 9.5 Heading Agreement

The structural H1 MUST use the form:

```text
# <artifact.id> — <metadata.title>
```

Identity and title comparison is case-sensitive.

The separator is exactly one space, an em dash, and one space.

### 9.6 Registry Agreement

When the artifact is registered, the registry record's identifier, title, series, path, version, and lifecycle MUST agree with the source document.

A registry mismatch does not change artifact identity; it is a corpus-conformance failure.

## 10. Artifact Type and Namespace

### 10.1 Artifact Type

An MSL specification source MUST declare:

```yaml
artifact:
  type: knowledge.specification
```

The bootstrap profile does not define additional specification artifact types.

### 10.2 Namespace

`artifact.namespace` identifies the governing artifact namespace.

The canonical namespace for Monad's own specifications is:

```text
monad
```

A future namespace specification may define federated, organizational, or package-qualified namespaces.

## 11. Version

`metadata.version` MUST be a SemVer-compatible string.

Bootstrap specifications SHOULD begin at `0.1.0` unless a prior governed version exists.

Changing a file path alone MUST NOT require a version change.

Changing the artifact identifier creates a distinct artifact and is not a normal version update.

The compatibility meaning of major, minor, and patch increments is deferred to a later evolution specification.

## 12. Artifact Lifecycle

The bootstrap artifact lifecycle is a closed set:

```text
placeholder
draft
review
accepted
superseded
deprecated
```

### 12.1 Placeholder

`placeholder` reserves an identity and location but does not claim substantive specification content.

### 12.2 Draft

`draft` contains substantive content but is not yet a governing accepted specification.

### 12.3 Review

`review` indicates that the artifact has entered an explicit governance review process.

### 12.4 Accepted

`accepted` indicates an explicit governance decision authorizes the artifact as normative within its declared scope.

Syntactic validity alone MUST NOT promote a document to `accepted`.

### 12.5 Superseded

`superseded` indicates that another artifact or version replaces the artifact as the governing source.

A superseding relationship SHOULD be declared.

### 12.6 Deprecated

`deprecated` indicates that the artifact remains available for compatibility or history but should not govern new work.

### 12.7 Excluded Terms

The following are not canonical artifact lifecycle values in the bootstrap schema:

- `planned`;
- `active`;
- `approved`;
- `complete`;
- `valid`;
- `compiled`;
- `published`.

These terms may describe series, work packets, processing state, or publication state, but MUST NOT be serialized as `metadata.status` under this schema.

## 13. Dates

`metadata.created` and `metadata.updated` MUST use:

```text
YYYY-MM-DD
```

`metadata.updated` MUST NOT be earlier than `metadata.created`.

Dates represent declared document metadata and do not replace source-control history.

A canonical emitter MUST preserve the calendar-date lexical form rather than adding a time or timezone.

## 14. Compilation Declaration

### 14.1 Language

The bootstrap Markdown frontend is declared as:

```yaml
compilation:
  language: msl-markdown
```

### 14.2 Language Version

The initial language version is:

```yaml
compilation:
  language_version: bootstrap
```

### 14.3 Profile

The initial conformance profile is:

```yaml
compilation:
  profile: bootstrap
```

`bootstrap` is a provisional source-document conformance profile.

It does not replace the future maturity hierarchy described by `MSL-CORE-0002`.

### 14.4 Source Role

A single-file bootstrap specification MUST declare:

```yaml
compilation:
  source_role: primary
```

Supplementary-source semantics are deferred.

### 14.5 Schema

The schema identifier for this contract is:

```yaml
compilation:
  schema: monad.msl/document@0.1
```

The schema identifier selects the metadata and structural validation contract. It is not a network locator.

## 15. Relationships

Relationship values are ordered YAML lists of stable identifiers.

The bootstrap relationship keys are:

- `depends_on`;
- `references`;
- `enables`.

Each list MUST NOT contain duplicates.

Relationship ordering is authored order and MUST be preserved by canonicalization.

A relationship target is valid during bootstrap when it identifies:

- an existing repository artifact;
- a registered artifact;
- or an explicitly planned series identifier where a series-level relationship is meaningful.

The complete relationship taxonomy is defined outside this specification.

## 16. Source Provenance

### 16.1 Canonical Source Locator

A primary source MUST declare its repository-relative POSIX path:

```yaml
provenance:
  source: specifications/MSL/core/MSL-CORE-0004.md
```

The path:

- MUST be relative to the repository root;
- MUST use `/` separators;
- MUST NOT begin with `/`;
- MUST NOT contain `.` or `..` path segments;
- MUST NOT contain a URI scheme;
- MUST match the current source file location.

### 16.2 Provenance Is Not Identity

`provenance.source` records where the current source representation is located.

It MUST NOT be used as canonical artifact identity.

Moving a source document requires updating `provenance.source` and the registry path but MUST NOT alter `artifact.id` solely because of the move.

### 16.3 Source Spans

Fine-grained line, column, and byte spans are compiler-generated information.

They MUST NOT be manually maintained in bootstrap front matter.

The source path provides the minimum authored source location required during bootstrap.

## 17. Canonical Serialization

Canonical bootstrap metadata uses:

- UTF-8 without a byte-order mark;
- LF line endings;
- two-space YAML indentation;
- block-style mappings and lists;
- no duplicate keys;
- one terminal newline in the document;
- authored list order;
- exact lowercase enum values;
- unquoted scalar values where YAML interpretation is unambiguous;
- quoted values when needed to preserve string interpretation.

A formatter MUST NOT reorder author, tag, or relationship lists unless a later schema explicitly authorizes ordering.

## 18. Normative Requirements

### MSL-META-REQ-001

Every bootstrap MSL primary source **MUST** contain a YAML front-matter mapping with `artifact`, `metadata`, `compilation`, and `provenance` groups.

### MSL-META-REQ-002

Every bootstrap MSL primary source **MUST** declare every required field listed in this specification.

### MSL-META-REQ-003

`artifact.id` **MUST** match the bootstrap artifact identifier grammar.

### MSL-META-REQ-004

`artifact.series` and `artifact.sequence` **MUST** be derivable from and agree with `artifact.id`.

### MSL-META-REQ-005

The primary-source filename stem and structural H1 identifier **MUST** agree with `artifact.id`.

### MSL-META-REQ-006

The structural H1 title **MUST** agree with `metadata.title`.

### MSL-META-REQ-007

`artifact.type` **MUST** equal `knowledge.specification` for an MSL specification document.

### MSL-META-REQ-008

Monad-owned bootstrap specifications **MUST** declare `artifact.namespace: monad`.

### MSL-META-REQ-009

`metadata.status` **MUST** be one of the canonical bootstrap artifact lifecycle values.

### MSL-META-REQ-010

A document **MUST NOT** declare `accepted` without an explicit governance record.

### MSL-META-REQ-011

`metadata.created` and `metadata.updated` **MUST** be valid ISO 8601 calendar dates, and `updated` **MUST NOT** precede `created`.

### MSL-META-REQ-012

A bootstrap `msl-markdown` primary source **MUST** declare the language, language version, profile, source role, and schema values defined by this specification.

### MSL-META-REQ-013

`provenance.source` **MUST** be a normalized repository-relative path matching the current source location.

### MSL-META-REQ-014

`provenance.source` **MUST NOT** be treated as canonical artifact identity.

### MSL-META-REQ-015

Relationship lists **MUST NOT** contain duplicate target identifiers.

### MSL-META-REQ-016

When a registry record exists, its identity, title, series, path, version, and lifecycle **MUST** agree with the source document.

### MSL-META-REQ-017

Unknown bootstrap metadata fields **MAY** be preserved, but they **MUST NOT** override or change the interpretation of required fields.

### MSL-META-REQ-018

A canonical serializer **MUST** preserve semantically meaningful group and list ordering defined by this specification.

## 19. Machine Specification

```yaml
machine_spec:
  kind: msl_bootstrap_metadata
  schema: monad.msl/document@0.1

  required_groups:
    - artifact
    - metadata
    - compilation
    - provenance

  required_fields:
    artifact:
      - id
      - type
      - namespace
      - series
      - sequence
    metadata:
      - title
      - version
      - status
      - created
      - updated
    compilation:
      - language
      - language_version
      - profile
      - source_role
      - schema
    provenance:
      - source

  constants:
    artifact.type: knowledge.specification
    artifact.namespace: monad
    compilation.language: msl-markdown
    compilation.language_version: bootstrap
    compilation.profile: bootstrap
    compilation.source_role: primary
    compilation.schema: monad.msl/document@0.1

  lifecycle:
    - placeholder
    - draft
    - review
    - accepted
    - superseded
    - deprecated
```

## 20. Invariants

```yaml
invariants:
  - id: MSL-META-INV-001
    expression: artifact.id == filename.stem
    description: The primary-source filename identifies the declared artifact.

  - id: MSL-META-INV-002
    expression: artifact.id == heading.h1.artifact_id
    description: The H1 and metadata declare one identity.

  - id: MSL-META-INV-003
    expression: metadata.title == heading.h1.title
    description: The H1 and metadata declare one title.

  - id: MSL-META-INV-004
    expression: artifact.series == artifact.id.series_prefix
    description: Series agrees with the artifact identifier.

  - id: MSL-META-INV-005
    expression: artifact.sequence == artifact.id.sequence_integer
    description: Sequence agrees with the artifact identifier.

  - id: MSL-META-INV-006
    expression: metadata.updated >= metadata.created
    description: Updated date does not precede creation.

  - id: MSL-META-INV-007
    expression: provenance.source != artifact.id
    description: Source location and identity remain separate concepts.

  - id: MSL-META-INV-008
    expression: registry.record == null || registry.record.agrees_with(source.metadata)
    description: A present registry record agrees with source metadata.
```

## 21. Diagnostics

### MSL0006 — Missing Required Metadata

A required group or field is absent.

### MSL0007 — Invalid Artifact Identifier

`artifact.id` does not match the bootstrap identifier grammar.

### MSL0008 — Identity or Title Mismatch

Filename, H1, metadata, series, sequence, or registry identity does not agree.

### MSL0009 — Source Path Mismatch

`provenance.source` does not match the normalized repository-relative source path.

### MSL0010 — Invalid Artifact Lifecycle

`metadata.status` is not a canonical bootstrap artifact lifecycle value.

### MSL0011 — Invalid Compilation Profile

The declared language, language version, profile, source role, or schema is unsupported by the active bootstrap contract.

### MSL0016 — Registry Mismatch

A registry record disagrees with source identity, title, series, path, version, lifecycle, or compilation status.

### MSL0018 — Unknown Metadata Field

An unrecognized field is preserved as a bootstrap extension.

This diagnostic is informational unless the field conflicts with reserved semantics.

## 22. Diagnostic Record and Ordering

A metadata diagnostic uses the common bootstrap record:

```yaml
code: MSL0006
severity: error
message: "Missing required metadata field: artifact.id"
path: specifications/MSL/core/MSL-CORE-0004.md
artifact_id: null
rule: MSL-META-REQ-002
span:
  start:
    line: 1
    column: 1
  end:
    line: 1
    column: 4
```

Line and column values are one-based. End positions are exclusive.

Diagnostics are ordered by:

1. normalized path;
2. start line;
3. start column;
4. severity rank: `error`, `warning`, `info`;
5. diagnostic code;
6. message.

## 23. Acceptance Criteria

This specification is satisfied when:

1. the required bootstrap metadata groups and fields are explicit;
2. every field has a declared type and validation rule;
3. artifact identifiers have a deterministic grammar;
4. filename, heading, series, sequence, and registry agreement are defined;
5. artifact lifecycle values are closed and distinct from processing states;
6. `bootstrap` profile semantics are explicit and provisional;
7. source provenance is required without becoming identity;
8. relationship lists have a deterministic representation;
9. canonical serialization rules are documented;
10. diagnostics map metadata failures to stable codes;
11. valid and invalid examples are distinguishable without semantic inference;
12. the contract is sufficient to plan a read-only parser and validator.

## 24. Conformance Examples

### 24.1 Valid Metadata

```yaml
---
artifact:
  id: MSL-CORE-0004
  type: knowledge.specification
  namespace: monad
  series: MSL-CORE
  sequence: 4
metadata:
  title: Metadata and Artifact Identity
  version: 0.1.0
  status: draft
  created: 2026-08-04
  updated: 2026-08-04
compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: bootstrap
  source_role: primary
  schema: monad.msl/document@0.1
provenance:
  source: specifications/MSL/core/MSL-CORE-0004.md
---
```

### 24.2 Invalid Identifier

```yaml
artifact:
  id: msl_core_4
```

Expected diagnostic: `MSL0007`.

### 24.3 Invalid Lifecycle

```yaml
metadata:
  status: active
```

Expected diagnostic: `MSL0010`.

### 24.4 Invalid Source Path

```yaml
provenance:
  source: /home/user/monad/specifications/MSL/core/MSL-CORE-0004.md
```

Expected diagnostic: `MSL0009`.

### 24.5 Identity Mismatch

A file named `MSL-CORE-0004.md` declaring `artifact.id: MSL-CORE-0005` produces `MSL0008`.

## 25. Security and Trust Considerations

Metadata may influence compilation, generation, graph relationships, publication, and AI context selection.

Implementations must therefore treat source metadata as untrusted input until validated.

A validator must guard against:

- path traversal in provenance fields;
- duplicate YAML keys;
- malicious YAML tags;
- alias or anchor expansion attacks;
- misleading governance state;
- identity substitution;
- registry/source disagreement;
- relationship cycles that exhaust resources;
- hidden Unicode characters in identifiers;
- absolute or machine-specific path leakage.

Bootstrap YAML parsing should use a safe data-only mode and must not instantiate arbitrary application objects.

## 26. Evolution and Compatibility

The bootstrap schema identifier is versioned independently from document versions:

```text
monad.msl/document@0.1
```

Future schema versions may add fields or tighten validation.

A later migration specification must define:

- schema-version negotiation;
- compatibility windows;
- migration diagnostics;
- automated metadata rewriting;
- retirement of the bootstrap profile;
- compatibility with KIR identity and provenance.

Existing source history must be preserved during migration.

## 27. Open Questions

The following are intentionally deferred:

1. How namespaces are globally qualified across repositories.
2. Whether version constraints are allowed in relationship targets.
3. How supplementary sources declare protected versus overridable fields.
4. How cryptographic authorship and review attestations are represented.
5. Whether tags become registered vocabulary terms.
6. How schema identifiers are resolved without network access.
7. How corpus-wide identity collisions are reported across repositories.

## 28. Related Specifications

- `MSL-CORE-0001` — Monad Specification Language Vision
- `MSL-CORE-0002` — Specification Document Model
- `MSL-CORE-0005` — MSL Markdown Structural Grammar
- `ADR-0001` — The Knowledge Engine Is the Core of Monad
- `ADR-0002` — Specifications Compile to Knowledge IR

## Status

Draft.

---
artifact:
  id: MSL-CORE-0005
  type: knowledge.specification
  namespace: monad
  series: MSL-CORE
  sequence: 5

metadata:
  title: MSL Markdown Structural Grammar
  version: 0.1.0
  status: draft
  created: 2026-08-04
  updated: 2026-08-04
  authors:
    - Monad Architecture Team
  tags:
    - msl
    - markdown
    - grammar
    - parser
    - diagnostics
    - bootstrap

relationships:
  depends_on:
    - ADR-0002
    - MSL-CORE-0001
    - MSL-CORE-0002
    - MSL-CORE-0004
  references:
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
  source: specifications/MSL/core/MSL-CORE-0005.md
---

# MSL-CORE-0005 — MSL Markdown Structural Grammar

## 1. Purpose

This specification defines the bootstrap concrete source grammar for Monad Specification Language documents authored using `msl-markdown`.

It specifies the document envelope, YAML front-matter boundaries, structural title, heading hierarchy, semantic section recognition, normative requirement declarations, fenced block handling, local artifact references, normative keyword recognition, canonicalization boundaries, and deterministic source-structure diagnostics.

The purpose of this grammar is to make the first read-only MSL parser and validator objectively implementable and testable.

## 2. Context

`ADR-0002` establishes Markdown with structured metadata as the first MSL surface syntax while preserving KIR as the canonical internal representation.

Markdown is flexible by design. A compiler cannot safely derive authoritative semantics from arbitrary visual layout or informal conventions.

The bootstrap grammar therefore defines a constrained, human-readable subset of Markdown with explicit structural rules. It is not intended to become a general-purpose Markdown standard.

## 3. Scope

This specification defines:

- source encoding and line endings;
- the document envelope;
- front-matter placement and delimiters;
- YAML front-matter parsing boundaries;
- structural H1 syntax;
- heading hierarchy;
- required, conditional, optional, and unknown H2 sections;
- recommended section order;
- requirement declaration syntax;
- requirement identifier recognition;
- fenced code-block behavior;
- normative keyword recognition;
- local artifact-reference recognition;
- duplicate-section behavior;
- canonical whitespace and normalization behavior;
- source spans;
- deterministic diagnostics for structural failures.

## 4. Non-Goals

This specification does not define:

- the complete CommonMark or GitHub Flavored Markdown grammars;
- metadata field semantics, which are defined by `MSL-CORE-0004`;
- the full MSL semantic model;
- machine-expression syntax;
- stable import or module syntax;
- KIR serialization;
- parser implementation technology;
- syntax highlighting;
- publication styling;
- arbitrary executable code blocks;
- HTML sanitization rules for rendered publications;
- final multi-file compilation semantics.

## 5. Design Principles

### 5.1 Human-Readable Source

A conforming document remains understandable as ordinary Markdown.

### 5.2 Deterministic Structure

The same source bytes under the same language version must produce the same structural interpretation and diagnostic ordering.

### 5.3 Explicit Authority

Normative requirements must be explicitly identified and must not be inferred from ordinary prose alone.

### 5.4 Presentation Is Not Identity

Heading numbers, visual spacing, and publication styling do not define artifact identity.

### 5.5 Conservative Bootstrap

The grammar defines only the source structure required to validate the bootstrap corpus and implement the first frontend.

## 6. Source Encoding

A bootstrap `msl-markdown` document MUST be encoded as UTF-8.

A UTF-8 byte-order mark MUST NOT be present.

Invalid UTF-8 is a fatal source-decoding error.

Identifiers, field names, normative keywords, and syntax delimiters use ASCII characters except for the required em dash in the structural H1 separator.

Human-readable prose may use the full Unicode repertoire.

## 7. Line Endings and Terminal Newline

Canonical documents use LF line endings.

A parser MAY accept CRLF and normalize it to LF for structural processing.

A canonical formatter MUST emit LF.

A canonical document MUST end with exactly one newline.

Line-ending normalization MUST NOT alter content inside a byte-preserving attachment or external file that is not part of the Markdown source.

## 8. Document Envelope

A bootstrap document has the following ordered components:

```text
front_matter
blank_line
structural_h1
body
terminal_newline
```

In EBNF-like notation:

```text
document       = front_matter, line_break,
                 structural_h1, line_break,
                 body, terminal_newline ;

front_matter   = delimiter, line_break,
                 yaml_mapping,
                 delimiter ;

delimiter      = "---" ;
```

The notation is descriptive. Exact Markdown tokenization remains the responsibility of the future parser implementation.

## 9. Front Matter

### 9.1 Opening Position

The opening delimiter MUST begin at the first byte of the file.

No blank line, whitespace, comment, byte-order mark, or prose may precede it.

### 9.2 Delimiter

The opening and closing delimiters are exactly:

```text
---
```

Each delimiter appears alone on its line with no leading or trailing whitespace.

A longer dashed line is not a front-matter delimiter.

### 9.3 YAML Document

The content between delimiters MUST parse as one YAML mapping.

The bootstrap parser MUST use a safe data-only YAML mode.

The following are invalid:

- multiple YAML documents;
- a top-level sequence or scalar;
- duplicate mapping keys;
- application-specific object tags;
- unresolved aliases;
- resource-exhausting alias expansion;
- a missing closing delimiter.

### 9.4 Front-Matter Semantics

Field semantics are defined by `MSL-CORE-0004`.

The structural parser must preserve source spans for groups, fields, keys, values, and delimiters where practical.

## 10. Structural H1

Exactly one structural H1 MUST exist outside fenced code blocks.

It MUST be the first non-blank Markdown block after front matter.

The canonical form is:

```text
# <ARTIFACT-ID> — <TITLE>
```

Example:

```markdown
# MSL-CORE-0005 — MSL Markdown Structural Grammar
```

Rules:

- the marker is exactly one `#` followed by one space;
- the artifact ID is non-empty;
- the separator is one space, an em dash, and one space;
- the title is non-empty;
- no trailing attribute block is permitted during bootstrap;
- setext H1 syntax is not permitted;
- additional H1 headings are invalid;
- H1-like text inside a fenced block is not structural.

Artifact-ID and title agreement are validated using `MSL-CORE-0004`.

## 11. Heading Hierarchy

### 11.1 Levels

The bootstrap grammar recognizes:

- H1 for the structural document title;
- H2 for top-level sections;
- H3 for subsections and identified declarations;
- H4 through H6 for explanatory subdivision where needed.

### 11.2 No Skipped Levels

A heading level MUST NOT increase by more than one relative to the nearest preceding structural heading.

For example, an H4 cannot directly follow an H2.

### 11.3 Numbering

Section numbers are informative presentation text.

Both forms may be recognized:

```text
## 6. Normative Requirements
## Normative Requirements
```

Removing or changing a section number MUST NOT change the semantic section identity.

### 11.4 Fenced Content

Markdown heading markers inside fenced code blocks MUST NOT create structural headings.

## 12. Semantic Sections

H2 headings may map to semantic sections.

A semantic section is identified by its normalized heading label after removal of an optional leading decimal section number and surrounding whitespace.

### 12.1 Required Sections

The `bootstrap` profile requires exactly one section equivalent to each of:

- `Purpose`;
- `Scope`;
- `Normative Requirements`;
- `Acceptance Criteria`;
- `Status`.

### 12.2 Conditionally Required Sections

The following are required when the stated condition applies:

| Section | Condition |
|---|---|
| `Terminology` | The specification assigns project-specific meanings to terms. |
| `Diagnostics` | The specification defines validator, compiler, or runtime failure behavior. |
| `Security and Trust Considerations` | The specification affects trust, execution, data, authorization, or generated artifacts. |
| `Open Questions` | Unresolved or explicitly deferred decisions remain. |
| `Machine Specification` | The artifact claims machine-normative declarations. |
| `Invariants` | The artifact declares machine-checkable invariants. |

### 12.3 Optional Recognized Sections

The bootstrap vocabulary recognizes:

- `Context`;
- `Non-Goals`;
- `Conceptual Model`;
- `Conformance Examples`;
- `Evolution and Compatibility`;
- `Related Specifications`;
- `Implementation Guidance`;
- `Rationale`.

### 12.4 Section Aliases

The bootstrap alias table is closed:

| Alias | Canonical Section |
|---|---|
| `Security Considerations` | `Security and Trust Considerations` |
| `Evolution` | `Evolution and Compatibility` |
| `Related Documents` | `Related Specifications` |
| `Requirements` | `Normative Requirements` |

An alias and its canonical heading MUST NOT both occur in the same document.

### 12.5 Unknown Sections

An unknown H2 section is permitted as informative extension content during bootstrap.

An unknown section:

- does not satisfy a required semantic section;
- cannot override normative or machine-normative content;
- should produce `MSL0019` at informational severity;
- must still obey heading hierarchy and Markdown tokenization rules.

### 12.6 Duplicate Sections

Required semantic sections are non-repeatable.

A duplicate canonical section or alias-equivalent section is invalid.

Optional sections are also non-repeatable unless a later schema explicitly declares them repeatable.

## 13. Recommended Section Order

The following order is canonical for generated templates and recommended for authored specifications:

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

A parser MUST NOT assign semantic meaning based solely on this order.

A validator MAY report a non-canonical order as an informational or warning diagnostic in a future schema version. The bootstrap diagnostic set does not require such a diagnostic.

## 14. Normative Requirement Declarations

### 14.1 Declaration Heading

A requirement declaration is an H3 heading under the `Normative Requirements` semantic section whose normalized content is exactly one valid requirement identifier.

Example:

```markdown
### MSL-MD-REQ-001
```

### 14.2 Requirement Identifier Grammar

A requirement identifier MUST match:

```regex
^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-REQ-[0-9]{3}$
```

### 14.3 Requirement Body

The declaration body extends from the requirement heading to the next heading of equal or higher level.

It MUST contain at least one normative statement using a recognized uppercase keyword.

### 14.4 Uniqueness

Requirement identifiers are globally unique within the compiled corpus.

A single-document parser MUST detect duplicates in the current document.

A compilation-unit validator MUST detect duplicates across all sources in the unit.

A corpus validator MUST detect duplicates across registered artifacts.

### 14.5 Example Requirements

Requirement-like headings inside fenced code blocks or sections explicitly identified as conformance examples do not become declarations unless a future syntax marks them as machine-normative fixtures.

### 14.6 Preservation

A formatter or migration tool MUST NOT renumber requirement identifiers silently.

## 15. Normative Keywords

The bootstrap grammar recognizes the uppercase tokens:

- `MUST`;
- `MUST NOT`;
- `SHOULD`;
- `SHOULD NOT`;
- `MAY`.

`MUST NOT` and `SHOULD NOT` are recognized as two-word operators.

Keywords inside inline code, fenced code, quoted examples, or explicitly informative examples do not automatically establish normative authority.

Lowercase or title-case words such as `must` or `Should` remain ordinary prose.

The complete normative-keyword semantics may later be aligned with a dedicated authority specification.

## 16. Fenced Code Blocks

### 16.1 Fence Form

Backtick and tilde fences are permitted when supported by the selected Markdown tokenizer.

The closing fence MUST use the same character and at least the same length as the opening fence.

### 16.2 Information String

The optional information string is preserved exactly after surrounding whitespace normalization.

Common bootstrap values include:

- `yaml`;
- `json`;
- `text`;
- `markdown`;
- `regex`;
- `bash`.

### 16.3 Structural Isolation

Content inside a fenced block MUST NOT create:

- structural headings;
- semantic sections;
- requirement declarations;
- artifact references for corpus validation;
- front-matter delimiters.

### 16.4 Machine-Normative Blocks

A YAML or JSON block is not machine-normative merely because of its information string.

Authority is determined by the containing semantic section and future machine-block declarations.

When a block is declared machine-normative, its content MUST parse according to the declared data format.

### 16.5 Preservation

Canonicalization MUST NOT rewrite the semantic content of fenced blocks.

## 17. Local Artifact References

### 17.1 Recognition

A bootstrap artifact reference is an exact token matching the artifact-ID grammar or a declared planned series identifier where series references are permitted.

### 17.2 Resolution

A local reference is resolved when it identifies:

- an existing source artifact in the repository;
- a matching Specification Registry record;
- or an explicitly declared planned series.

### 17.3 Context

Artifact-like tokens inside fenced examples are not automatically resolved as semantic references.

The future compiler may use section authority and explicit relationship declarations to distinguish semantic references from prose mentions.

### 17.4 Unresolved References

An unresolved mandatory local reference is an error.

An unresolved informative prose mention may be a warning or info diagnostic in future versions. The bootstrap validator may limit `MSL0015` to front-matter relationships and explicitly structured references.

### 17.5 Imports

Reference recognition does not define import semantics.

Stable import syntax, version constraints, aliases, and transitive resolution are deferred.

## 18. Lists, Tables, Quotes, and Inline Syntax

Ordinary Markdown lists, tables, block quotes, emphasis, links, and inline code are permitted.

During bootstrap:

- list position does not create semantic identity unless a specification explicitly says otherwise;
- table column names are informative unless the containing section defines a machine-readable table contract;
- block quotes do not become normative merely because they contain normative keywords;
- inline code preserves literal text;
- HTML blocks are treated as opaque informative content and should be avoided in normative sections.

## 19. Comments and Hidden Content

The bootstrap grammar does not define semantic comments.

HTML comments MAY appear as informative authoring notes, but:

- they MUST NOT contain authoritative semantics;
- they MUST NOT redefine metadata or requirements;
- they MUST NOT be required for conformance;
- a publisher MAY omit them.

A future language version may define explicit comment syntax.

## 20. Canonicalization

A canonicalizer MAY:

- convert CRLF to LF;
- remove a UTF-8 BOM only as an explicitly reported repair;
- normalize front-matter delimiters;
- normalize YAML indentation;
- ensure one blank line between front matter and H1;
- ensure one terminal newline;
- normalize trailing whitespace outside fenced blocks;
- sort diagnostics.

A canonicalizer MUST NOT:

- reorder authored semantic sections;
- renumber sections unless explicitly requested;
- renumber requirements;
- rewrite normative keywords;
- change artifact identity or title;
- sort relationships, authors, or tags unless another specification requires it;
- change code-fence content;
- resolve contradictions by choosing one declaration silently;
- promote lifecycle status.

Every repair that changes source bytes SHOULD be reportable.

## 21. Source Spans

A parser should retain source spans for:

- front-matter delimiters;
- YAML groups, keys, and values;
- H1 identity and title;
- H2 semantic sections;
- H3 requirement identifiers;
- fenced blocks;
- explicit artifact references;
- diagnostics.

The bootstrap diagnostic record uses one-based line and column values and exclusive end positions.

When exact end positions are unavailable, the smallest stable enclosing span may be used and the implementation should document that limitation.

## 22. Normative Requirements

### MSL-MD-REQ-001

A bootstrap `msl-markdown` source **MUST** be valid UTF-8 and **MUST NOT** contain a UTF-8 byte-order mark.

### MSL-MD-REQ-002

Canonical bootstrap source **MUST** use LF line endings and exactly one terminal newline.

### MSL-MD-REQ-003

The front-matter opening delimiter **MUST** begin at the first byte of the file.

### MSL-MD-REQ-004

Opening and closing front-matter delimiters **MUST** be exactly `---` on otherwise empty lines.

### MSL-MD-REQ-005

Front matter **MUST** parse as one safe YAML mapping without duplicate keys.

### MSL-MD-REQ-006

A bootstrap document **MUST** contain exactly one structural H1 outside fenced content.

### MSL-MD-REQ-007

The structural H1 **MUST** use the canonical artifact-ID and title form.

### MSL-MD-REQ-008

Heading hierarchy **MUST NOT** skip structural levels.

### MSL-MD-REQ-009

A bootstrap document **MUST** contain each required semantic section exactly once.

### MSL-MD-REQ-010

Alias-equivalent semantic sections **MUST** be treated as duplicates.

### MSL-MD-REQ-011

Unknown H2 sections **MAY** be preserved as informative content but **MUST NOT** satisfy or override required semantic sections.

### MSL-MD-REQ-012

A normative requirement declaration **MUST** use a valid, stable, unique requirement identifier.

### MSL-MD-REQ-013

A normative requirement body **MUST** contain at least one recognized normative keyword outside example-only syntax.

### MSL-MD-REQ-014

Content inside fenced code blocks **MUST NOT** create structural headings, sections, or requirement declarations.

### MSL-MD-REQ-015

Machine-normative data blocks **MUST** parse according to their declared data format.

### MSL-MD-REQ-016

A structured mandatory local artifact reference **MUST** resolve to an existing artifact, registry record, or explicitly planned series.

### MSL-MD-REQ-017

Canonicalization **MUST NOT** silently alter artifact identity, requirement identity, normative meaning, section authority, or lifecycle status.

### MSL-MD-REQ-018

A parser **MUST** emit structural diagnostics in deterministic order.

### MSL-MD-REQ-019

A parser **MUST** preserve sufficient source spans to identify the source location of each emitted structural diagnostic.

### MSL-MD-REQ-020

Semantic interpretation **MUST NOT** depend solely on recommended section order or visual numbering.

## 23. Machine Specification

```yaml
machine_spec:
  kind: msl_markdown_bootstrap_grammar
  language: msl-markdown
  language_version: bootstrap
  schema: monad.msl/document@0.1

  encoding:
    charset: utf-8
    bom: forbidden
    canonical_line_ending: lf
    terminal_newline: exactly_one

  front_matter:
    required: true
    opening_offset: 0
    delimiter: "---"
    top_level_type: mapping
    duplicate_keys: forbidden

  title:
    count: exactly_one
    level: 1
    pattern: "# <ARTIFACT-ID> — <TITLE>"

  required_sections:
    - purpose
    - scope
    - normative_requirements
    - acceptance_criteria
    - status

  requirement_identifier:
    pattern: "^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-REQ-[0-9]{3}$"
    corpus_unique: true
```

## 24. Invariants

```yaml
invariants:
  - id: MSL-MD-INV-001
    expression: source.encoding == utf_8
    description: Bootstrap source is valid UTF-8.

  - id: MSL-MD-INV-002
    expression: source.bom == absent
    description: Canonical source contains no BOM.

  - id: MSL-MD-INV-003
    expression: front_matter.opening_offset == 0
    description: Front matter starts at the first byte.

  - id: MSL-MD-INV-004
    expression: structural_h1.count == 1
    description: A document has one structural title.

  - id: MSL-MD-INV-005
    expression: required_section.count == 1
    description: Each required semantic section occurs exactly once.

  - id: MSL-MD-INV-006
    expression: requirement.identifier.unique_within_corpus == true
    description: Requirement identity is stable and globally unique.

  - id: MSL-MD-INV-007
    expression: fenced_content.creates_structure == false
    description: Example code cannot alter document structure.

  - id: MSL-MD-INV-008
    expression: canonicalization.preserves_normative_meaning == true
    description: Canonicalization does not change authority or meaning.
```

## 25. Diagnostics

### MSL0001 — Invalid UTF-8

The source byte stream cannot be decoded as UTF-8.

### MSL0002 — Unexpected Byte-Order Mark

A UTF-8 BOM precedes the source document.

### MSL0003 — Missing Front Matter

The source does not begin with the required front-matter delimiter.

### MSL0004 — Invalid Front-Matter Delimiter

A front-matter delimiter is malformed, misplaced, or not alone on its line.

### MSL0005 — Invalid YAML Front Matter

Front matter is invalid YAML, contains duplicate keys, uses an unsafe feature, or is not a mapping.

### MSL0012 — Invalid Structural H1 Count

The document has zero or more than one structural H1 outside fenced content.

### MSL0013 — Missing or Duplicate Required Section

A required semantic section is absent, duplicated, or duplicated through an alias.

### MSL0014 — Duplicate Requirement Identifier

A requirement identifier is duplicated within the active validation scope.

### MSL0015 — Unresolved Local Artifact Reference

A structured mandatory local reference cannot be resolved.

### MSL0017 — Invalid Heading Hierarchy

A heading skips a structural level or violates the permitted hierarchy.

### MSL0019 — Unknown Informative Section

An unrecognized H2 section is preserved as informative bootstrap content.

## 26. Diagnostic Record and Ordering

A structural diagnostic uses:

```yaml
code: MSL0013
severity: error
message: "Missing required section: Scope"
path: specifications/MSL/core/MSL-CORE-0005.md
artifact_id: MSL-CORE-0005
rule: MSL-MD-REQ-009
span:
  start:
    line: 1
    column: 1
  end:
    line: 1
    column: 4
```

Diagnostics are ordered by:

1. normalized repository-relative path;
2. start line;
3. start column;
4. severity rank: `error`, `warning`, `info`;
5. diagnostic code;
6. message.

## 27. Acceptance Criteria

This specification is satisfied when:

1. a parser can identify the document envelope without semantic inference;
2. front-matter boundaries and YAML constraints are explicit;
3. exactly one structural H1 is required and parseable;
4. heading hierarchy is deterministic;
5. required and conditional semantic sections are defined;
6. aliases and duplicates have deterministic behavior;
7. requirement declarations and identifiers are parseable;
8. fenced examples cannot create source structure;
9. structured local references have a bootstrap resolution rule;
10. canonicalization boundaries preserve author intent and normative meaning;
11. structural diagnostics use stable codes and ordering;
12. valid and invalid conformance fixtures can be derived directly from the specification;
13. the grammar remains independent from KIR representation and parser implementation technology.

## 28. Conformance Examples

### 28.1 Valid Minimal Bootstrap Structure

```markdown
---
artifact:
  id: EXAMPLE-CORE-0001
  type: knowledge.specification
  namespace: monad
  series: EXAMPLE-CORE
  sequence: 1
metadata:
  title: Example Specification
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
  source: specifications/EXAMPLE/core/EXAMPLE-CORE-0001.md
---

# EXAMPLE-CORE-0001 — Example Specification

## Purpose

Define an example.

## Scope

This example covers one behavior.

## Normative Requirements

### EXAMPLE-CORE-REQ-001

A conforming implementation MUST produce the declared result.

## Acceptance Criteria

1. The declared result is observable.

## Status

Draft.
```

### 28.2 Invalid Long Delimiter

```text
-----------------
```

Expected diagnostic: `MSL0004`.

### 28.3 Invalid Duplicate H1

```markdown
# EXAMPLE-CORE-0001 — Example

# EXAMPLE-CORE-0001 — Duplicate
```

Expected diagnostic: `MSL0012`.

### 28.4 Heading Inside a Fence

````markdown
```text
# NOT-A-STRUCTURAL-HEADING
```
````

The fenced heading does not count as a structural H1.

### 28.5 Invalid Duplicate Requirement

Two declarations named `EXAMPLE-CORE-REQ-001` in the same document produce `MSL0014`.

## 29. Security and Trust Considerations

MSL source may influence generated code, infrastructure, policies, validation, publication, and AI context.

A parser and validator must consider:

- malicious YAML tags and alias expansion;
- oversized documents and deeply nested Markdown;
- pathological delimiter and fence inputs;
- hidden Unicode characters in identifiers;
- prompt injection embedded in informative prose;
- HTML or links that become unsafe when rendered;
- misleading normative keywords inside examples;
- path traversal in structured references;
- denial-of-service through excessive cross-references;
- source-span overflow or integer conversion defects.

The bootstrap parser should expose limits explicitly and fail safely without partially mutating repository state.

## 30. Evolution and Compatibility

The bootstrap grammar is versioned by:

```text
language: msl-markdown
language_version: bootstrap
schema: monad.msl/document@0.1
```

A later grammar version may introduce:

- explicit machine-block declarations;
- imports and modules;
- typed references;
- semantic comments;
- extension namespaces;
- richer requirement declarations;
- stable syntax for acceptance criteria and invariants;
- automatic formatting.

Future evolution must preserve source traceability and provide migration diagnostics.

Bootstrap source must not be silently reinterpreted under a later grammar version.

## 31. Open Questions

The following are deferred:

1. Whether only ATX headings remain permitted after bootstrap.
2. Whether explicit section IDs should be authorable.
3. How multi-file supplementary sources declare structural fragments.
4. How imports distinguish semantic inclusion from informative inclusion.
5. Whether normative statements require one statement per requirement declaration.
6. Whether tables can become machine-normative declarations.
7. How Markdown extensions are negotiated without implementation lock-in.
8. Which parser resource limits become part of the language conformance contract.

## 32. Related Specifications

- `MSL-CORE-0001` — Monad Specification Language Vision
- `MSL-CORE-0002` — Specification Document Model
- `MSL-CORE-0004` — Metadata and Artifact Identity
- `ADR-0002` — Specifications Compile to Knowledge IR

## Status

Draft.

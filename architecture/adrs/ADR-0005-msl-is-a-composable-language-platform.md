# ADR-0005 — MSL Is a Composable Language Platform

## Metadata

```yaml
id: ADR-0005
title: MSL Is a Composable Language Platform
status: Accepted
version: 1.0.0
created: 2026-08-04
decision_scope: foundational-language-architecture

depends_on:
  - ADR-0002
  - ADR-0003
  - ADR-0004

affects:
  - MSL
  - MSC
  - KIR
  - MKE
  - frontends
  - parsers
  - semantic-editors
  - extensions
  - language-services
  - generators
```

## Context

The Monad Specification Language was initially conceived as one language for expressing structured engineering knowledge.

As its required semantic scope became clearer, the language needed to express several distinct classes of knowledge:

* human-readable specification documents;
* type declarations;
* value expressions;
* constraints;
* invariants;
* policies;
* workflows;
* state machines;
* queries;
* patterns;
* transformations;
* package and module declarations.

These classes do not share one natural grammar.

A human-readable document language and a constraint-expression language have different authoring requirements.

A workflow language and a type language have different syntax, semantics, tooling, validation, and execution models.

Combining every construct into one monolithic grammar would create:

* parser complexity;
* ambiguous syntax;
* tight coupling;
* difficult language evolution;
* poor editor support;
* large compiler blast radii;
* limited extension capability;
* pressure to embed unrestricted scripting in the core language.

Monad requires a composable language architecture.

## Decision

MSL will be defined as a **composable engineering-language platform** rather than one monolithic grammar.

The MSL platform consists of:

1. a shared semantic foundation;
2. a document and composition language;
3. a family of embedded or associated domain-specific languages;
4. common identity, metadata, authority, provenance, lifecycle, and diagnostic rules;
5. independent parsers and ASTs;
6. normalization into the canonical MSL AST;
7. common lowering into KIR.

The conceptual language family is:

```text
MSL Platform

├── Document Language
├── Metadata Language
├── Type Language
├── Expression Language
├── Constraint Language
├── Policy Language
├── Workflow Language
├── State Machine Language
├── Query Language
├── Pattern Language
├── Transformation Language
├── Package and Module Language
└── Extension Languages
```

Not every member of this family belongs in the initial implementation.

The platform architecture must nevertheless permit them without redesigning the core compiler.

## Shared Semantic Foundation

All MSL-family languages share or integrate with:

* canonical identity;
* namespaces;
* metadata;
* authority;
* lifecycle;
* provenance;
* source mapping;
* diagnostics;
* versioning;
* extension registration;
* references;
* canonical AST lineage;
* KIR traceability.

A sublanguage may define specialized syntax and AST nodes while preserving these common rules.

## Document Language

The MSL Document Language organizes specifications and embeds or references other MSL-family languages.

Its responsibilities include:

* artifact declaration;
* metadata;
* human-readable narrative;
* semantic sections;
* normative requirements;
* embedded-language blocks;
* acceptance criteria;
* conformance examples;
* imports;
* attachments;
* document composition.

The bootstrap `msl-markdown` frontend is one concrete syntax for the Document Language.

Markdown is not the Document Language itself.

## Embedded Languages

A document may contain typed embedded-language regions.

Examples:

```text
Document Language
    contains
Constraint Language block
```

```text
Document Language
    contains
State Machine Language block
```

```text
Document Language
    references
Workflow Language artifact
```

Embedded regions must declare or permit deterministic identification of:

* language identity;
* language version;
* source span;
* authority;
* expected semantic role;
* extension requirements.

## Independent Parsing

Each language may own:

* lexical grammar;
* parser;
* surface AST;
* diagnostics;
* formatter;
* language service;
* conformance fixtures.

A host frontend coordinates embedded parsing but must not duplicate the embedded language's semantics.

The conceptual parse pipeline is:

```text
Host Document Source
        ↓
Document Parser
        ↓
Embedded Region Discovery
        ↓
Language Dispatch
        ↓
Embedded-Language Parser
        ↓
Document Surface AST
+
Embedded Surface ASTs
        ↓
Normalization
        ↓
Canonical MSL AST
```

## AST Boundaries

The following representations remain distinct:

```text
Document Surface AST
Embedded-Language Surface AST
Canonical MSL AST
Typed Semantic Representation
KIR
```

A constraint expression should not initially be represented as an untyped Markdown string in the canonical AST when a registered Constraint Language parser is available.

The canonical AST may contain typed embedded semantic nodes or references to separately compiled language units.

## Language Registration

Each MSL-family language must have a registered language manifest.

A language registration conceptually includes:

```yaml
language:
  id:
  version:
  family: MSL
  role:
  parser:
  surface_ast:
  canonical_node_mappings:
  extensions:
  diagnostics:
  formatter:
  compatibility:
  trust:
```

Language identity must remain distinct from:

* frontend identity;
* parser identity;
* syntax identity;
* AST schema identity;
* compiler identity;
* extension identity.

## Language Composition

Language composition may occur through:

* inline embedding;
* fenced blocks;
* referenced files;
* imported modules;
* typed fields;
* semantic-editor nodes;
* generated AST composition.

Composition must preserve:

* language boundaries;
* source spans;
* authority;
* diagnostics;
* version requirements;
* provenance;
* loss behavior.

## Embedded-Language Authority

An embedded block inherits authority only according to explicit host-language rules.

For example:

* a constraint block inside a machine-normative section may be machine-normative;
* the same block inside an informative example remains nonauthoritative;
* a policy block imported from an untrusted source remains provisional;
* an AI-generated workflow remains a proposal until adopted.

Syntax alone does not grant authority.

## Core Versus Specialized Languages

The stable MSL core defines:

* language composition;
* language identity;
* common metadata;
* authority;
* provenance;
* lifecycle;
* AST and KIR boundaries;
* diagnostics;
* extension rules.

Specialized series define detailed semantics for:

* types;
* constraints;
* expressions;
* policies;
* workflows;
* queries;
* state machines;
* transformations.

This prevents the core language from becoming a universal executable language.

## Initial Language Set

The minimum bootstrap language set is:

```text
MSL Document Language
MSL Metadata Structures
MSL Normative Requirement Model
Bootstrap Machine-Semantics Blocks
```

The following are planned but are not required for the first parser:

```text
MSL Type Language
MSL Expression Language
MSL Constraint Language
MSL Policy Language
MSL Workflow Language
MSL State Machine Language
MSL Query Language
MSL Transformation Language
```

## Consequences

### Positive

* MSL can grow without creating one monolithic grammar.
* Specialized languages can evolve independently.
* Parsers remain smaller and more focused.
* Language services can provide domain-specific completion and diagnostics.
* AI systems can generate or edit one semantic region without rewriting entire documents.
* Embedded languages retain explicit boundaries.
* Security policies can differ by language.
* Restricted declarative languages can be used instead of unrestricted scripting.
* The core language remains stable while specialized capabilities expand.
* Third parties can add registered domain languages.

### Negative

* Monad must maintain multiple language specifications and parsers.
* Language dispatch becomes part of frontend architecture.
* Cross-language references and typing require formal rules.
* Version compatibility becomes multidimensional.
* Editor and formatter integration becomes more complex.
* Error recovery must coordinate host and embedded parsers.
* Embedded-language security must be evaluated independently.
* The bootstrap Markdown frontend must identify and route embedded blocks.

## Alternatives Considered

### One Monolithic MSL Grammar

Rejected because the grammar and semantic model would grow without clear modular boundaries.

### General-Purpose Expression Language Everywhere

Rejected because unrestricted computation would create safety, determinism, portability, and validation risks.

### External Languages Only

Rejected because Monad requires shared language-family concepts, diagnostics, identity, and compiler integration.

### Treat Embedded Content as Opaque Strings

Rejected because machine validation, typing, diagnostics, and transformation require structured embedded ASTs.

### Independent Unrelated DSLs

Rejected because the languages must share identity, provenance, authority, references, KIR integration, and governance.

## Security Model

Each sublanguage must declare its execution and trust characteristics.

Potential classes include:

```text
descriptive
declarative
query_only
constraint_evaluation
transformation
effectful
```

Core MSL should prefer:

* deterministic semantics;
* side-effect-free evaluation;
* bounded computation;
* explicit resource limits;
* sandboxed extension execution;
* no ambient filesystem or network access.

An embedded language must not gain effectful capabilities merely because it appears inside a specification.

## Versioning Model

Versioning remains distinct across:

* MSL platform version;
* Document Language version;
* embedded-language version;
* concrete syntax version;
* parser version;
* surface AST version;
* canonical AST version;
* KIR version;
* extension version.

A document may declare compatible language versions independently.

Example:

```yaml
languages:
  document: 0.1.0
  constraint: 0.2.0
  workflow: 0.1.0
```

## Compatibility

Host and embedded languages must negotiate compatibility.

A frontend must reject or preserve as opaque any required embedded language it cannot parse safely.

Unknown informative embedded content may be preserved without blocking compilation when the active profile permits it.

Unknown machine-normative embedded content must block complete compilation.

## Revised Initial Roadmap

The final two `MSL-CORE` documents are now:

| ID            | Title                                                       |
| ------------- | ----------------------------------------------------------- |
| MSL-CORE-0009 | Document and Embedded Language Architecture                 |
| MSL-CORE-0010 | Core Semantic Integration, Types, References, and Evolution |

After `MSL-CORE`, specialized specification families should begin:

```text
MSL-DOCUMENT
MSL-TYPE
MSL-EXPR
MSL-CONSTRAINT
MSL-POLICY
MSL-WORKFLOW
MSL-STATE
MSL-QUERY
MSL-PATTERN
MSL-TRANSFORM
MSL-PACKAGE
MSL-FRONTEND
MSL-CONFORMANCE
```

The concrete `msl-markdown` grammar moves into:

```text
MSL-DOCUMENT
```

rather than remaining compressed into one core document.

## Migration Impact

Existing MSL core documents remain valid.

References to:

* machine-specification blocks;
* constraints;
* policies;
* workflows;
* expressions;

must now be interpreted as references to composable MSL-family languages or bootstrap embedded structures.

No existing specification is deleted.

The existing bootstrap fenced YAML structures remain provisional until the specialized language specifications define their replacements.

## Decision Invariants

1. MSL is a language platform, not one monolithic grammar.
2. The Document Language hosts or references specialized languages.
3. Each language has distinct identity and versioning.
4. Embedded-language boundaries remain explicit.
5. Specialized parsers produce their own surface ASTs.
6. All language-family semantics normalize into the canonical MSL AST or compatible canonical extensions.
7. Language composition preserves authority and provenance.
8. Syntax alone does not grant authority.
9. Unknown required machine-normative languages block complete compilation.
10. KIR elements remain traceable through language-specific ASTs to source.
11. Core MSL does not become an unrestricted general-purpose programming language.
12. New languages cannot silently redefine stable core semantics.

## Status

Accepted.

This ADR establishes MSL as a composable engineering-language platform with a document host language and independently specified embedded domain languages.

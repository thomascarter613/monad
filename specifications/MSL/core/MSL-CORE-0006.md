---
id: "MSL-CORE-0006"
title: "Abstract Syntax Tree Model"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 6
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "ast"
  - "compiler"
  - "syntax-tree"
  - "semantic-model"
  - "source-mapping"
  - "incremental-compilation"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0010"
enables:
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE"
  - "KIR-CORE"
  - "MSL-FRONTEND"
  - "MSL-EDITOR"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0006 — Abstract Syntax Tree Model

## 1. Purpose

This specification defines the abstract syntax tree used by the Monad Specification Language.

The MSL Abstract Syntax Tree, abbreviated **MSL AST**, is the structured representation produced by MSL frontends before complete semantic analysis and normalization.

The AST provides the boundary between:

* authoring surfaces;
* source parsers;
* semantic editors;
* importers;
* conversational authoring systems;
* the Monad Specification Compiler.

This specification establishes:

* AST design principles;
* node identity;
* source preservation;
* node categories;
* partial and invalid nodes;
* authority classification;
* unresolved references;
* extension nodes;
* edit operations;
* tree ownership;
* traversal;
* serialization boundaries;
* versioning;
* frontend compatibility;
* incremental-compilation support;
* transformation provenance.

The AST preserves authored structure and unresolved intent.

KIR represents resolved and normalized meaning.

---

## 2. Context

MSL is a multi-surface semantic language.

Its specifications may originate from:

* Markdown;
* YAML;
* JSON;
* graphical editors;
* terminal interfaces;
* AI dialogue;
* imported formats;
* generated structures.

These sources differ greatly in presentation.

They still need to produce one compiler-compatible representation.

Directly compiling each frontend into KIR would create several problems:

* every frontend would duplicate semantic analysis;
* unresolved source information would be lost too early;
* editor-oriented partial documents would be difficult to represent;
* source formatting and comments could not be preserved;
* importers might normalize semantics inconsistently;
* AI-generated proposals could appear falsely authoritative;
* frontend-specific diagnostics would become coupled to KIR.

The AST provides an intermediate representation designed for authorship and compilation.

---

## 3. Scope

This specification defines:

* the role of the MSL AST;
* AST documents and compilation units;
* nodes;
* node identity;
* node kinds;
* node fields;
* source locations;
* source trivia;
* authority;
* provenance;
* validity state;
* unresolved state;
* extension nodes;
* opaque nodes;
* node ordering;
* parent-child relationships;
* cross-node references;
* AST traversal;
* AST transformations;
* edit operations;
* AST validation;
* AST serialization expectations;
* AST compatibility;
* incremental compilation.

This specification does not fully define:

* concrete syntax parsing;
* machine-constraint expressions;
* complete semantic type rules;
* reference-resolution algorithms;
* KIR structure;
* editor network protocols;
* persistent AST database storage;
* source-control merge algorithms;
* compiler optimizations.

---

## 4. Non-Goals

The MSL AST is not:

* the canonical long-term knowledge representation;
* a graph database;
* a rendered document format;
* a replacement for source files;
* a complete semantic model;
* a backend-generation format;
* required to contain only valid nodes;
* required to discard comments and formatting;
* required to resolve all references;
* KIR under another name.

---

## 5. Core Principle

> The AST preserves what the author expressed; KIR represents what the compiler determined it means.

The AST may contain:

* unresolved references;
* invalid nodes;
* incomplete fields;
* frontend-specific trivia;
* comments;
* draft requirements;
* inferred-but-unconfirmed values;
* opaque extension nodes;
* source ordering;
* recovery nodes.

KIR should contain normalized, validated, semantically resolved knowledge.

---

## 6. Architectural Position

```text
Authoring Surface
    ↓
Frontend
    ↓
MSL AST
    ↓
Semantic Analysis
    ↓
Typed and Resolved AST
    ↓
Normalization
    ↓
KIR
    ↓
MKE
```

The compiler may use multiple internal AST stages.

Conceptually:

```text
Parsed AST
    ↓
Bound AST
    ↓
Typed AST
    ↓
Validated AST
    ↓
KIR
```

These stages may share node structures or use derived representations.

---

## 7. Terminology

### 7.1 AST

A structured representation of MSL source or semantic editing input.

### 7.2 AST Document

The AST representation derived from one source document or one semantic authoring surface.

### 7.3 AST Compilation Unit

The combined AST representation of all sources contributing to one logical specification or compilation target.

### 7.4 Node

A typed AST element.

Examples:

* specification;
* metadata field;
* requirement;
* invariant;
* relationship;
* paragraph;
* machine block;
* acceptance criterion.

### 7.5 Node Kind

The semantic or structural category of a node.

### 7.6 Node Identity

The identity used to track an AST node during editing, diagnostics, transformation, and compilation.

### 7.7 Semantic Identity

A durable MSL identity such as a requirement ID or artifact ID.

### 7.8 Ephemeral Node Identity

A temporary identity assigned to a node that does not yet possess durable semantic identity.

### 7.9 Source Trivia

Nonsemantic source details such as whitespace, comments, and formatting.

### 7.10 Invalid Node

A node known to violate structural or semantic requirements.

### 7.11 Missing Node

A placeholder representing required but absent input.

### 7.12 Unresolved Node

A structurally recognized node whose meaning depends on unavailable information.

### 7.13 Recovery Node

A node created during error recovery to preserve the surrounding AST.

### 7.14 Opaque Node

A node whose payload is preserved but not understood by the active frontend or compiler extension set.

### 7.15 Synthesized Node

A node generated by a frontend, migration, compiler phase, or editor rather than directly authored in source.

### 7.16 Green Tree

An immutable, shareable syntax-tree representation suitable for incremental parsing.

### 7.17 Red Tree

A contextual view over a green tree with parent relationships, offsets, or semantic helpers.

The reference implementation may use these patterns but is not required to.

---

## 8. AST Design Principles

### 8.1 Loss-Aware

The AST should preserve enough source information to support the declared round-trip mode.

### 8.2 Partial by Design

Incomplete drafts and editor buffers must be representable.

### 8.3 Source-Traceable

Every source-derived node should retain a source location.

### 8.4 Frontend-Neutral Core

Core AST nodes should not depend on Markdown, YAML, or GUI-specific presentation.

### 8.5 Extensible

Extensions must be representable without corrupting core semantics.

### 8.6 Immutable-Friendly

AST implementations should support immutable or persistent data structures to enable incremental compilation and editing.

### 8.7 Deterministic

Equivalent frontend inputs should produce semantically equivalent ASTs under equivalent configuration.

### 8.8 Provenance-Aware

Authored, imported, inferred, generated, and defaulted nodes must remain distinguishable.

### 8.9 Authority-Aware

Normative authority is part of the AST, not merely formatting.

### 8.10 Transformation-Traceable

AST rewrites must preserve or record node lineage.

---

## 9. AST Root Model

An AST compilation unit conceptually contains:

```text
CompilationUnit

├── identity
├── language_version
├── frontend_records
├── source_documents
├── specification_nodes
├── diagnostics
├── extension_context
├── symbol_declarations
├── unresolved_references
├── source_map
└── transformation_history
```

A compilation unit may contain:

* one logical specification;
* multiple specifications in package compilation;
* supplementary source fragments;
* imported declarations;
* partial documents.

The active compilation mode determines permitted cardinality.

---

## 10. AST Document Model

An AST document contains:

```text
AstDocument

├── document_id
├── source_identity
├── source_role
├── frontend_identity
├── frontend_version
├── language_version
├── root_nodes
├── source_text_reference
├── source_map
├── trivia
├── diagnostics
└── validity_state
```

The document identity is not necessarily the specification identity.

Multiple AST documents may contribute to one logical specification.

---

## 11. Base Node Model

Every AST node conceptually contains:

```text
AstNode

├── node_id
├── kind
├── semantic_id
├── parent_id
├── children
├── fields
├── source_location
├── provenance
├── authority
├── lifecycle
├── validity
├── resolution
├── annotations
├── extensions
├── trivia
└── transformation_lineage
```

Not every field is required for every node kind.

---

## 12. Node Identity

Every AST node must have a compiler-visible node identity.

Node identity supports:

* editing;
* diagnostics;
* incremental recompilation;
* source mapping;
* transformation tracking;
* AST diffs;
* editor synchronization.

Node identity may be:

* durable semantic identity;
* source-derived identity;
* editor-assigned identity;
* compiler-generated ephemeral identity.

Node identity must not be confused with canonical artifact identity.

---

## 13. Durable Semantic Identity

Nodes that may be referenced externally should possess durable semantic identity.

Examples:

```text
MSL-AST-REQ-001
MSL-AST-INV-001
MSL-AST-AC-001
```

Durable identity is required for:

* normative requirements;
* invariants;
* named types;
* relationships referenced independently;
* acceptance criteria;
* waivers;
* diagnostics defined by specification;
* extension declarations.

---

## 14. Ephemeral Node Identity

Nodes without durable semantic identity still require internal tracking.

Examples:

* paragraph;
* list item;
* title text;
* unresolved draft field;
* comment;
* source separator.

An ephemeral ID may be generated from:

* source identity and span;
* frontend edit identity;
* persistent editor UUID;
* deterministic syntax position;
* compiler allocation.

Ephemeral IDs may change across structurally significant edits unless a source-preserving editor stabilizes them.

---

## 15. Node Kind Taxonomy

The initial AST node families are:

```text
AST Nodes

├── Document
├── Declaration
├── Metadata
├── Narrative
├── Normative
├── Machine Semantic
├── Relationship
├── Conformance
├── Provenance
├── Lifecycle
├── Extension
├── Invalid
├── Missing
├── Unresolved
└── Trivia
```

---

## 16. Document Nodes

Document nodes represent structural composition.

Initial document node kinds:

* `compilation_unit`;
* `source_document`;
* `specification`;
* `section`;
* `source_include`;
* `semantic_import`;
* `attachment`;
* `appendix`.

Document nodes may retain source ordering.

Source ordering is not automatically semantic ordering.

---

## 17. Declaration Nodes

Declaration nodes introduce named semantic elements.

Initial declaration kinds:

* artifact declaration;
* namespace declaration;
* type declaration;
* field declaration;
* requirement declaration;
* invariant declaration;
* relationship declaration;
* acceptance-criterion declaration;
* diagnostic declaration;
* extension declaration;
* profile declaration;
* waiver declaration.

Declaration nodes should expose declared identity separately from node identity.

---

## 18. Metadata Nodes

Metadata nodes represent structured descriptive and operational fields.

Examples:

* title;
* version;
* status;
* owner;
* authors;
* tags;
* compilation profile;
* source role;
* namespace;
* frontend declaration.

Metadata nodes must retain:

* field name;
* value;
* source;
* inherited or explicit status;
* merge behavior where known;
* authority;
* schema namespace.

---

## 19. Narrative Nodes

Narrative nodes preserve human-readable content.

Initial narrative kinds:

* paragraph;
* heading;
* list;
* list item;
* table;
* quotation;
* code example;
* rationale;
* note;
* warning;
* explanation.

Narrative nodes are informative by default unless explicitly classified otherwise.

A frontend must not infer normative authority solely from imperative prose.

---

## 20. Normative Nodes

Normative nodes represent binding or permitted obligations.

Initial normative kinds:

* requirement;
* prohibition;
* recommendation;
* discouragement;
* permission;
* exception;
* waiver;
* requirement group;
* requirement profile.

A requirement node may contain structured child nodes for:

* subject;
* obligation;
* predicate;
* target;
* conditions;
* applicability;
* verification;
* rationale;
* relationships.

---

## 21. Machine-Semantic Nodes

Machine-semantic nodes represent structured semantics intended for direct compiler interpretation.

Initial machine-semantic kinds:

* machine block;
* entity declaration;
* type expression;
* constraint;
* invariant expression;
* state model;
* transition;
* policy;
* schema fragment;
* query;
* transformation declaration.

Detailed semantics are defined in `MSL-CORE-0008` and `MSL-CORE-0009`.

---

## 22. Relationship Nodes

Relationship nodes represent typed connections.

A relationship node contains:

```text
RelationshipNode

├── relationship_id
├── relationship_type
├── source_reference
├── target_reference
├── qualifiers
├── applicability
├── authority
├── lifecycle
├── source_location
└── provenance
```

Source and target references may remain unresolved in the initial AST.

---

## 23. Reference Nodes

A reference node represents an attempt to identify another artifact or semantic element.

Initial reference states:

```text
unresolved
resolved
ambiguous
missing
invalid
deferred
```

A reference node should preserve:

* original spelling;
* namespace context;
* version constraint;
* expected target kind;
* source location;
* resolution result;
* candidate targets;
* diagnostics.

---

## 24. Conformance Nodes

Conformance nodes represent verification intent and evidence structures.

Initial kinds:

* acceptance criterion;
* valid example;
* invalid example;
* test scenario;
* expected diagnostic;
* verifier declaration;
* evidence reference;
* conformance profile.

These nodes may remain nonexecutable until specialized conformance specifications are defined.

---

## 25. Provenance Nodes

Provenance nodes represent origin and transformation.

Initial kinds:

* authorship;
* contribution;
* import origin;
* generation record;
* migration record;
* review;
* approval;
* transformation event;
* source mapping.

Provenance nodes may attach to:

* documents;
* declarations;
* individual fields;
* generated nodes;
* groups of nodes.

---

## 26. Lifecycle Nodes

Lifecycle nodes represent semantic state and state transitions.

Initial kinds:

* lifecycle declaration;
* transition request;
* transition evidence;
* deprecation;
* supersession;
* archival;
* restoration;
* waiver lifecycle.

Lifecycle state must remain distinct from AST validity and compilation state.

---

## 27. Extension Nodes

Extensions may define new node kinds under registered namespaces.

Example:

```yaml
node:
  kind: extension
  namespace: org.monad.security
  extension_kind: threat_model
```

Extension nodes must declare:

* namespace;
* extension version;
* payload schema;
* authority;
* fallback behavior;
* compilation requirements.

---

## 28. Opaque Nodes

An opaque node preserves unsupported content.

An opaque node contains:

```text
OpaqueNode

├── namespace
├── declared_kind
├── raw_payload
├── source_location
├── authority
├── required_for_compilation
├── frontend_identity
└── preservation_status
```

Opaque normative content may prevent successful semantic compilation.

Opaque informative content may be retained without blocking compilation, subject to profile rules.

---

## 29. Invalid Nodes

An invalid node represents source recognized as belonging to an AST region but violating required structure or semantics.

It should preserve:

* original source;
* intended or inferred node kind;
* diagnostics;
* recoverable children;
* source span;
* recovery strategy.

Invalid nodes must not disappear silently during compilation.

---

## 30. Missing Nodes

A missing node is a placeholder for required absent input.

Examples:

* missing artifact ID;
* missing requirement obligation;
* missing target reference;
* missing closing delimiter;
* missing type annotation.

Missing nodes support editor diagnostics and structured completion.

They must not be emitted into final KIR as valid semantic elements.

---

## 31. Unresolved Nodes

Unresolved nodes are structurally valid but semantically incomplete.

Examples:

* unresolved identity reference;
* unknown type;
* unavailable imported namespace;
* deferred extension;
* pending user confirmation;
* unresolved profile inheritance.

Unresolved state must include a reason.

---

## 32. Synthesized Nodes

Synthesized nodes are generated rather than directly authored.

Sources include:

* defaults;
* metadata inheritance;
* parser recovery;
* migration;
* desugaring;
* frontend assistance;
* AI proposal;
* compiler expansion.

Synthesized nodes must identify:

* generator or phase;
* source inputs;
* synthesis reason;
* authority;
* user-confirmation state;
* whether they may enter KIR.

---

## 33. Defaulted Nodes

A defaulted node is a synthesized node derived from an explicit default rule.

Example:

```text
namespace inherited from repository manifest
```

Defaulted nodes must preserve:

* default source;
* rule identity;
* precedence;
* explicit-versus-inherited status.

A default must not masquerade as directly authored input.

---

## 34. Inferred Nodes

An inferred node is a candidate semantic node derived from surrounding content or AI analysis.

Examples:

* inferred subject of a requirement;
* inferred relationship;
* inferred classification;
* inferred title.

Inference must preserve:

* inference method;
* evidence;
* confidence where applicable;
* confirmation state;
* authority.

Unconfirmed inference must not become machine-normative authority.

---

## 35. Authority Model

Every AST node must have an authority classification or inherit one deterministically.

Initial authority classes:

* informative;
* normative;
* machine_normative;
* provisional;
* deprecated;
* example;
* rationale;
* test_evidence.

Authority may be explicit, inherited, or unresolved.

The AST must preserve the origin of authority inheritance.

---

## 36. Validity Model

AST validity is multidimensional.

A node may have states for:

```text
structural_validity
semantic_validity
reference_validity
type_validity
authority_validity
profile_validity
```

Possible values:

```text
unknown
valid
invalid
partial
deferred
not_applicable
```

A single boolean `valid` field is insufficient for editor and compiler workflows.

---

## 37. Resolution Model

Resolution applies to:

* references;
* identities;
* types;
* namespaces;
* extension schemas;
* profiles;
* imported declarations.

A node may move through:

```text
unresolved
    ↓
candidate
    ↓
resolved
```

or:

```text
unresolved
    ↓
ambiguous
```

or:

```text
unresolved
    ↓
missing
```

Resolution history should be inspectable in diagnostics and tooling.

---

## 38. Source Locations

Every source-derived node must retain a generalized source location.

Textual location:

```yaml
source_location:
  uri: specifications/MSL/core/MSL-CORE-0006.md
  start:
    line: 1
    column: 1
  end:
    line: 4
    column: 1
```

Semantic-editor location:

```yaml
source_location:
  editor_session: session-001
  node_path: requirements[3].verification
  edit_operation: op-018
```

Conversational location:

```yaml
source_location:
  session: dialogue-004
  turn: 12
  answer_fragment: 2
```

---

## 39. Source Text Preservation

A source frontend may preserve:

* original text;
* token stream;
* concrete syntax tree;
* trivia;
* node-to-source slices.

The AST does not require every implementation to retain complete source text.

A frontend claiming source-preserving round trip must retain enough information to satisfy that claim.

---

## 40. Concrete Syntax Tree Relationship

An implementation may use a Concrete Syntax Tree, or CST, before or alongside the AST.

```text
Source
  ↓
CST
  ↓
AST
```

The CST may preserve:

* exact tokens;
* punctuation;
* comments;
* delimiters;
* formatting;
* malformed source.

The AST represents language-level structure.

The core MSL architecture permits but does not require a distinct CST.

---

## 41. Parent-Child Ownership

Each AST node should have at most one structural parent within one AST tree.

Semantic relationships may form a graph independently.

Example:

```text
Specification
└── Requirements Section
    └── Requirement Node
```

while:

```text
Requirement Node
    depends_on
Another Requirement
```

is a semantic edge, not structural parentage.

---

## 42. Node Ordering

AST children may preserve source order.

Ordering may be:

* semantically meaningful;
* presentation-only;
* unordered by language definition.

Each child collection should declare or imply its ordering semantics.

Examples:

* state-machine transitions may be unordered;
* prose paragraphs preserve order;
* metadata tags may be set-like;
* requirement priority lists may be ordered.

KIR normalization may remove presentation-only ordering.

---

## 43. Node Fields

Node fields must have declared semantics.

A field may be:

* required;
* optional;
* repeated;
* inherited;
* computed;
* unresolved;
* extension-defined.

Field values may be:

* scalar;
* list;
* map;
* node reference;
* embedded node;
* expression;
* opaque payload.

The full type system is defined in `MSL-CORE-0009`.

---

## 44. Annotations

Annotations attach noncore information to nodes.

Examples:

* editor hints;
* lint suppressions;
* formatting instructions;
* migration notes;
* review comments;
* generated summaries.

Annotations must be namespaced when not part of core MSL.

Annotations must not silently alter normative semantics unless registered as semantic extensions.

---

## 45. Comments

Comments may be preserved as:

* trivia;
* comment nodes;
* annotations;
* source-only data.

Comments are informative by default.

A comment must not create normative semantics unless the language explicitly defines a semantic annotation form.

---

## 46. AST Traversal

AST APIs should support:

* preorder traversal;
* postorder traversal;
* child traversal;
* ancestor lookup;
* node-kind filtering;
* semantic-ID lookup;
* source-span lookup;
* invalid-node lookup;
* unresolved-node lookup;
* extension-node lookup.

Traversal order must be deterministic for deterministic ASTs.

---

## 47. AST Queries

Initial AST queries may include:

```text
find nodes by kind
find node by semantic ID
find nodes from source
find unresolved references
find invalid requirements
find machine-normative nodes
find generated nodes
find nodes requiring confirmation
```

AST querying is distinct from MKE graph querying.

AST queries operate on authoring and compilation structures.

---

## 48. AST Transformations

AST transformations may include:

* desugaring;
* metadata inheritance;
* import expansion;
* requirement decomposition;
* alias normalization;
* migration;
* formatting;
* semantic editing;
* recovery repair;
* extension lowering.

A transformation must preserve lineage.

---

## 49. Transformation Lineage

Each transformed node should identify:

```yaml
transformation:
  id:
  phase:
  input_nodes:
  output_nodes:
  tool:
  version:
  reason:
  loss:
```

One input node may produce multiple output nodes.

Multiple input nodes may combine into one output node.

Lineage must support both cases.

---

## 50. Desugaring

Desugaring converts convenient frontend forms into more explicit AST structures.

Example:

Human-readable requirement:

```text
The compiler MUST reject duplicate IDs.
```

may desugar into:

```text
RequirementNode
├── subject: compiler
├── obligation: must
├── predicate: reject
└── target: duplicate_ids
```

Desugaring must not invent unsupported semantics.

Uncertain desugaring must remain unresolved or diagnostic.

---

## 51. AST Editing

Semantic editors may manipulate AST nodes through typed operations.

An edit should identify:

* operation ID;
* actor;
* target node;
* prior state;
* requested state;
* timestamp;
* source;
* reason;
* authority.

AST editing should avoid replacing the entire tree when a localized operation is sufficient.

---

## 52. AST Diff

An AST diff describes semantic and structural changes.

Possible change kinds:

```text
node_added
node_removed
node_moved
field_changed
identity_changed
authority_changed
reference_changed
node_kind_changed
source_changed
trivia_changed
```

AST diffs should distinguish:

* semantic changes;
* presentation-only changes;
* provenance-only changes;
* lifecycle changes.

---

## 53. Incremental Compilation

The AST must support incremental compilation.

A compiler should be able to determine:

* which nodes changed;
* which symbols were affected;
* which references require rebinding;
* which constraints require reevaluation;
* which KIR fragments are stale;
* which diagnostics are invalidated.

Stable node identities improve incremental behavior.

---

## 54. Structural Fingerprints

Nodes may receive structural fingerprints.

A structural fingerprint may derive from:

* node kind;
* normalized fields;
* child fingerprints;
* extension payload;
* semantic identity.

Fingerprints may support:

* cache reuse;
* change detection;
* duplicate detection;
* incremental analysis.

Source trivia should not affect semantic fingerprints unless the syntax gives it semantic meaning.

---

## 55. AST Serialization

A standardized AST serialization may be introduced for:

* debugging;
* fixtures;
* editor integration;
* process boundaries;
* compiler plugins;
* migration tools.

Serialized AST must declare:

* AST schema version;
* MSL language version;
* frontend identity;
* source-map format;
* extension schemas;
* serialization format.

Serialized AST is not automatically canonical source.

---

## 56. AST Persistence

AST persistence is optional.

Potential uses:

* editor caches;
* incremental compiler caches;
* remote language services;
* collaborative editing;
* reproducible diagnostics;
* migration checkpoints.

Persisted AST must be invalidated or migrated when incompatible versions change.

The source specification remains authoritative unless an explicit semantic-editor workflow designates the AST-backed store as primary source.

---

## 57. AST Versioning

The AST schema has its own version.

AST version is distinct from:

* MSL language version;
* frontend version;
* specification version;
* compiler version;
* KIR version.

A frontend must declare which AST versions it can emit.

A compiler must declare which AST versions it accepts.

---

## 58. AST Compatibility

Compatibility may include:

* reading older AST versions;
* migrating older ASTs;
* preserving unknown extension nodes;
* rejecting unsupported required nodes;
* translating compatible field additions.

Unknown optional fields may be preserved.

Unknown machine-normative node kinds must not be ignored silently.

---

## 59. AST-to-KIR Boundary

The AST-to-KIR boundary includes:

```text
Identity Resolution
Reference Binding
Type Checking
Constraint Validation
Authority Validation
Conflict Analysis
Profile Resolution
Default Expansion
Semantic Normalization
KIR Emission
```

Not all AST nodes produce KIR nodes.

Examples that may be omitted or projected separately:

* presentation-only headings;
* comments;
* whitespace;
* source layout;
* editor hints;
* invalid recovery nodes.

Omission must not remove authoritative semantics.

---

## 60. KIR Traceability

Every KIR element must retain links to one or more AST nodes.

Traceability may be:

* direct;
* transformed;
* synthesized;
* aggregated;
* imported.

Example:

```text
KIR Requirement
    derived_from
AST Requirement Node
    sourced_from
Markdown Source Span
```

---

## 61. AST Security Considerations

AST structures may contain untrusted:

* source text;
* extension payloads;
* imported data;
* AI-generated values;
* file references;
* expressions;
* renderer hints.

AST consumers must not assume parsed nodes are safe or valid.

Parsing is not validation.

---

## 62. Normative Requirements

### MSL-AST-REQ-001

Every conforming MSL frontend **MUST** produce a versioned MSL AST or explicitly partial MSL AST.

### MSL-AST-REQ-002

Every AST compilation unit **MUST** declare the MSL language version it represents.

### MSL-AST-REQ-003

Every AST compilation unit **MUST** preserve the identity and version of each contributing frontend.

### MSL-AST-REQ-004

Every AST node **MUST** have compiler-visible node identity.

### MSL-AST-REQ-005

AST node identity **MUST** remain distinguishable from canonical artifact identity and durable semantic identity.

### MSL-AST-REQ-006

Every source-derived AST node **MUST** preserve a generalized source location when the source supports traceable location.

### MSL-AST-REQ-007

Every generated, imported, inferred, synthesized, or defaulted node **MUST** preserve applicable provenance.

### MSL-AST-REQ-008

Every AST node **MUST** declare or inherit authority classification deterministically.

### MSL-AST-REQ-009

The AST **MUST** represent invalid, missing, unresolved, recovery, and opaque nodes explicitly.

### MSL-AST-REQ-010

Invalid and unresolved nodes **MUST NOT** be silently dropped before diagnostics and lineage are preserved.

### MSL-AST-REQ-011

Opaque normative nodes that cannot be interpreted **MUST** prevent successful full semantic compilation.

### MSL-AST-REQ-012

The AST **MUST** preserve original reference spelling until reference resolution is complete.

### MSL-AST-REQ-013

Reference nodes **MUST** preserve resolution status and applicable candidates.

### MSL-AST-REQ-014

Synthesized nodes **MUST** identify the synthesis phase, source inputs, and authority.

### MSL-AST-REQ-015

Unconfirmed inferred nodes **MUST NOT** become authoritative machine-normative semantics.

### MSL-AST-REQ-016

AST transformations **MUST** preserve transformation lineage.

### MSL-AST-REQ-017

AST transformations **MUST NOT** silently change normative meaning.

### MSL-AST-REQ-018

AST structural parentage **MUST** remain distinct from semantic graph relationships.

### MSL-AST-REQ-019

AST collections **MUST** preserve or declare their ordering semantics.

### MSL-AST-REQ-020

The AST **MUST** support frontend and extension node namespaces without permitting redefinition of protected core node kinds.

### MSL-AST-REQ-021

AST schema version **MUST** remain distinct from MSL language version.

### MSL-AST-REQ-022

Serialized AST **MUST** identify its AST schema version, MSL version, and extension schemas.

### MSL-AST-REQ-023

AST-to-KIR compilation **MUST** preserve traceability from emitted KIR elements to contributing AST nodes.

### MSL-AST-REQ-024

Presentation-only nodes **MAY** be omitted from KIR when their omission does not alter semantic meaning or authority.

### MSL-AST-REQ-025

Source-preserving frontends **MUST** retain sufficient source information to satisfy their declared round-trip mode.

### MSL-AST-REQ-026

Editor-oriented AST implementations **SHOULD** support partial validity and localized diagnostics.

### MSL-AST-REQ-027

AST implementations **SHOULD** support stable node identity across localized edits when practical.

### MSL-AST-REQ-028

AST implementations **SHOULD** support incremental traversal and invalidation.

### MSL-AST-REQ-029

Semantic fingerprints **SHOULD NOT** change solely because of nonsemantic source trivia.

### MSL-AST-REQ-030

Persisted AST caches **MUST** be invalidated or migrated when incompatible AST, frontend, language, or extension versions change.

### MSL-AST-REQ-031

AST consumers **MUST NOT** treat structurally parsed content as semantically trusted without applicable validation.

### MSL-AST-REQ-032

Unknown required machine-normative node kinds **MUST NOT** be ignored.

### MSL-AST-REQ-033

Durably referenced semantic nodes **MUST** retain stable semantic identity.

### MSL-AST-REQ-034

Ephemeral node identities **MAY** change when source structure changes, but such changes **MUST NOT** be interpreted as canonical artifact replacement.

### MSL-AST-REQ-035

Defaulted nodes **MUST** preserve the origin and precedence of their default.

### MSL-AST-REQ-036

Authority inherited by an AST node **MUST** preserve the source of that inheritance.

### MSL-AST-REQ-037

AST diagnostics **MUST** reference node identities and source locations where available.

### MSL-AST-REQ-038

The AST **MUST** support multiple source documents contributing to one logical specification.

### MSL-AST-REQ-039

Supplementary AST documents **MUST NOT** silently redefine protected primary identity fields.

### MSL-AST-REQ-040

AST semantic equivalence **MUST** be evaluated independently from source formatting and trivia.

---

## 63. Conceptual Model

```text
AstCompilationUnit

├── language_version
├── ast_schema_version
├── frontend_records
├── source_documents
│   ├── primary_source
│   └── supplementary_sources
│
├── specification_nodes
│   ├── identity
│   ├── metadata
│   ├── narrative
│   ├── requirements
│   ├── machine_semantics
│   ├── relationships
│   ├── conformance
│   ├── provenance
│   └── lifecycle
│
├── invalid_nodes
├── unresolved_nodes
├── opaque_nodes
├── diagnostics
├── source_map
└── transformation_history
        │
        ▼
Semantic Analysis
        │
        ▼
Resolved and Typed AST
        │
        ▼
KIR
```

---

## 64. Machine Specification

```yaml
machine_spec:
  kind: msl_abstract_syntax_tree

  ast:
    root: compilation_unit
    versioned: true
    partial_supported: true
    source_traceable: true
    extension_aware: true
    incremental_friendly: true

  core_node_families:
    - document
    - declaration
    - metadata
    - narrative
    - normative
    - machine_semantic
    - relationship
    - reference
    - conformance
    - provenance
    - lifecycle
    - extension
    - invalid
    - missing
    - unresolved
    - recovery
    - opaque
    - synthesized
    - trivia

  base_node_fields:
    required:
      - node_id
      - kind
      - authority
      - validity
      - provenance

    conditional:
      - semantic_id
      - parent_id
      - children
      - fields
      - source_location
      - lifecycle
      - resolution
      - annotations
      - extensions
      - trivia
      - transformation_lineage

  validity_dimensions:
    - structural
    - semantic
    - reference
    - type
    - authority
    - profile

  validity_states:
    - unknown
    - valid
    - invalid
    - partial
    - deferred
    - not_applicable

  reference_states:
    - unresolved
    - candidate
    - resolved
    - ambiguous
    - missing
    - invalid
    - deferred

  node_origins:
    - authored
    - imported
    - generated
    - inferred
    - synthesized
    - defaulted
    - migrated
    - recovered

  transformation_kinds:
    - parse
    - desugar
    - inherit
    - bind
    - resolve
    - type
    - validate
    - normalize
    - migrate
    - edit
    - recover

  ast_to_kir:
    phases:
      - identity_resolution
      - reference_binding
      - type_checking
      - constraint_validation
      - authority_validation
      - conflict_analysis
      - profile_resolution
      - semantic_normalization
      - kir_emission
```

---

## 65. Invariants

```yaml
invariants:
  - id: MSL-AST-INV-001
    expression: ast_node.node_id != null
    description: Every AST node has compiler-visible identity.

  - id: MSL-AST-INV-002
    expression: ast_node.node_id != artifact.canonical_id
    description: Node identity and artifact identity are distinct concepts even when values may coincide.

  - id: MSL-AST-INV-003
    expression: source_derived_node.source_location != null
    description: Source-derived nodes remain traceable.

  - id: MSL-AST-INV-004
    expression: synthesized_node.provenance != null
    description: Synthesized nodes identify their origin.

  - id: MSL-AST-INV-005
    expression: invalid_node.silently_discarded == false
    description: Invalid nodes remain available for diagnostics.

  - id: MSL-AST-INV-006
    expression: opaque_required_normative_node.full_compilation_allowed == false
    description: Unknown required semantics block full compilation.

  - id: MSL-AST-INV-007
    expression: ast_transformation.lineage != null
    description: Transformations preserve input-output lineage.

  - id: MSL-AST-INV-008
    expression: unconfirmed_inference.machine_normative == false
    description: Unconfirmed inference does not gain authority.

  - id: MSL-AST-INV-009
    expression: structural_parentage != semantic_relationship_graph
    description: Tree structure and semantic edges are distinct.

  - id: MSL-AST-INV-010
    expression: kir_element.source_ast_nodes.count >= 1
    description: Emitted KIR remains linked to AST origin.

  - id: MSL-AST-INV-011
    expression: extension_node.namespace != null
    description: Extension nodes are namespaced.

  - id: MSL-AST-INV-012
    expression: ast_schema_version != msl_language_version
    description: AST and language versions remain distinct.

  - id: MSL-AST-INV-013
    expression: defaulted_node.default_origin != null
    description: Defaults retain their source and precedence.

  - id: MSL-AST-INV-014
    expression: authority_inheritance.origin != null
    description: Inherited authority remains traceable.

  - id: MSL-AST-INV-015
    expression: presentation_only_change.semantic_fingerprint_changed == false
    description: Nonsemantic formatting does not alter semantic identity.
```

---

## 66. Diagnostics

### MSL0501 — Missing AST Node Identity

An AST node lacks compiler-visible node identity.

### MSL0502 — Unsupported AST Version

The compiler cannot consume the declared AST schema version.

### MSL0503 — Missing Source Location

A source-derived node lacks required source traceability.

### MSL0504 — Missing Node Provenance

A generated, imported, synthesized, inferred, or migrated node lacks provenance.

### MSL0505 — Unknown Core Node Kind

A node claims an unsupported unnamespaced core kind.

### MSL0506 — Unnamespaced Extension Node

An extension node lacks a registered namespace.

### MSL0507 — Opaque Normative Node

A required normative node cannot be interpreted by the active compiler.

### MSL0508 — Invalid Node Silently Removed

A transformation attempted to discard an invalid node without preserving diagnostics or lineage.

### MSL0509 — Missing Transformation Lineage

A rewritten node cannot be traced to its input nodes.

### MSL0510 — Unauthorized Synthesized Authority

A synthesized or inferred node claims unsupported normative authority.

### MSL0511 — Invalid Parent Cycle

Structural parent relationships form a cycle.

### MSL0512 — Multiple Structural Parents

A node has more than one structural parent in the same tree.

### MSL0513 — Invalid Child Ordering

A collection violates the ordering semantics declared for its node kind.

### MSL0514 — Missing Reference State

A reference node does not expose its resolution state.

### MSL0515 — Ambiguous Reference Candidates Missing

An ambiguous reference does not preserve candidate targets.

### MSL0516 — Invalid Source Role Composition

AST documents contributing to one compilation unit violate primary or supplementary source rules.

### MSL0517 — Protected Identity Redefinition

A supplementary AST document attempts to redefine primary canonical identity.

### MSL0518 — AST Serialization Metadata Missing

A serialized AST lacks required schema, language, frontend, or extension-version declarations.

### MSL0519 — Incompatible Persisted AST

A persisted AST cannot be reused under the active language, frontend, compiler, or extension configuration.

### MSL0520 — KIR Traceability Lost

A KIR element cannot be traced to contributing AST nodes.

### MSL0521 — Invalid Missing Node

A required absence is represented without expected node kind or source context.

### MSL0522 — Recovery Node Unmarked

Parser recovery produced a node without identifying its recovery status.

### MSL0523 — Conflicting Durable Semantic Identity

Multiple active AST nodes claim the same durable semantic identity in overlapping scope.

### MSL0524 — Default Origin Missing

A defaulted node does not identify the source rule that produced it.

### MSL0525 — Authority Inheritance Untraceable

A node inherits authority without identifying the authority source.

---

## 67. Acceptance Criteria

This specification is satisfied when:

1. the AST is clearly distinguished from source, CST, KIR, and MKE storage;
2. AST documents and compilation units are represented;
3. every node has compiler-visible identity;
4. node identity, semantic identity, and artifact identity are distinguished;
5. source-derived nodes retain generalized source locations;
6. authored, imported, generated, inferred, synthesized, defaulted, migrated, and recovered nodes are distinguishable;
7. invalid, missing, unresolved, recovery, and opaque nodes are representable;
8. authority and validity are represented independently;
9. references retain original text and resolution state;
10. frontend-neutral core node families are defined;
11. extension nodes are namespaced;
12. AST transformations preserve lineage;
13. structural parentage is distinct from semantic graph relationships;
14. the AST supports source order without making all ordering semantic;
15. partial ASTs support interactive authoring;
16. incremental compilation can use node identity and fingerprints;
17. serialized AST declares its own schema version;
18. AST-to-KIR compilation preserves source traceability;
19. presentation-only nodes may be omitted from KIR without altering semantics;
20. unknown required normative nodes block full compilation.

---

## 68. Conformance Examples

### 68.1 Valid Requirement AST Node

```yaml
node:
  node_id: ast-node-1042
  kind: requirement
  semantic_id: EXAMPLE-REQ-001
  authority: normative

  fields:
    subject: compiler
    obligation: must
    predicate: preserve
    target: source_maps

  validity:
    structural: valid
    semantic: unknown
    reference: not_applicable

  source_location:
    uri: example.md
    start:
      line: 24
      column: 1
    end:
      line: 27
      column: 1

  provenance:
    origin: authored
    frontend: msl-markdown
```

### 68.2 Valid Partial Requirement Node

```yaml
node:
  node_id: ast-node-1043
  kind: requirement
  semantic_id: EXAMPLE-REQ-002

  fields:
    subject: compiler
    obligation: null
    predicate: reject
    target: duplicate_ids

  validity:
    structural: partial
    semantic: unknown

  children:
    - kind: missing
      expected: normative_obligation
```

This is valid as a partial AST node but cannot compile successfully into KIR.

### 68.3 Invalid Missing Provenance

```yaml
node:
  node_id: generated-44
  kind: requirement
  semantic_id: EXAMPLE-REQ-003
  origin: generated
```

No generator or source input is identified.

Expected diagnostic:

```text
MSL0504: generated AST node lacks provenance
```

### 68.4 Valid Opaque Informative Node

```yaml
node:
  node_id: opaque-1
  kind: opaque_extension
  namespace: org.example.editor
  authority: informative
  required_for_compilation: false
  raw_payload:
    display_group: advanced
```

The node may be preserved without blocking compilation.

### 68.5 Invalid Opaque Normative Node

```yaml
node:
  node_id: opaque-2
  kind: opaque_extension
  namespace: org.example.security
  authority: machine_normative
  required_for_compilation: true
```

The compiler lacks the extension.

Expected diagnostic:

```text
MSL0507: required machine-normative extension node cannot be interpreted
```

### 68.6 Valid Inferred Candidate

```yaml
node:
  node_id: inferred-1
  kind: requirement_subject
  value: compiler

  provenance:
    origin: inferred
    method: language_model
    evidence:
      - ast-node-1044
    user_confirmed: false

  authority: provisional
```

This may be shown to an author but must not silently become authoritative.

### 68.7 Valid Transformation Lineage

```yaml
transformation:
  id: transform-18
  phase: desugar
  input_nodes:
    - source-requirement-1
  output_nodes:
    - subject-node-1
    - obligation-node-1
    - predicate-node-1
    - target-node-1
  tool:
    id: msc
    version: 0.1.0
```

### 68.8 Invalid Structural Cycle

```text
Node A parent = Node B
Node B parent = Node A
```

Expected diagnostic:

```text
MSL0511: AST structural parent cycle detected
```

### 68.9 Valid Reference Node

```yaml
node:
  node_id: ref-44
  kind: reference

  original_text: MKE-CORE-0002
  expected_kind: knowledge.specification

  resolution:
    state: resolved
    canonical_target: monad::MKE-CORE-0002
```

### 68.10 Valid KIR Traceability

```yaml
kir_element:
  id: kir-requirement-88
  source_ast_nodes:
    - ast-node-1042
  source_locations:
    - uri: example.md
      start_line: 24
      end_line: 27
```

---

## 69. Security and Trust Considerations

ASTs are not trusted merely because they were parsed successfully.

Threats include:

* malicious node payloads;
* forged source maps;
* extension-node injection;
* hidden normative authority;
* oversized trees;
* cyclic structures;
* deeply nested structures;
* invalid serialized ASTs;
* cache poisoning;
* fabricated provenance;
* AI-generated authority escalation;
* transformation-lineage tampering;
* unsafe expression nodes;
* reference redirection;
* opaque-node smuggling.

Implementations should:

* validate AST schemas;
* enforce node-count and depth limits;
* reject structural cycles;
* validate extension namespaces;
* preserve immutable source references where practical;
* revalidate persisted AST caches;
* treat imported serialized AST as untrusted;
* separate parse success from semantic trust;
* validate authority transitions;
* fingerprint transformation inputs and outputs;
* sandbox extension processing;
* prevent opaque required semantics from bypassing validation.

---

## 70. Evolution and Compatibility

The AST model will evolve as MSL matures.

Compatible changes may include:

* adding optional node fields;
* adding optional informative node kinds;
* adding new validity dimensions;
* adding new provenance forms;
* adding new extension metadata.

Potentially breaking changes include:

* changing core node meaning;
* changing structural ownership rules;
* changing source-location semantics;
* changing authority classes;
* changing required fields;
* changing AST-to-KIR contracts.

Breaking AST changes require:

* AST schema-version increment;
* migration rules;
* compiler compatibility diagnostics;
* cache invalidation;
* fixture updates;
* preserved source lineage.

A language change does not necessarily require an AST schema change, and an AST implementation change does not necessarily require a language change.

---

## 71. Open Questions

1. Does MSL require a standardized CST in addition to the AST?
2. Should AST nodes use UUIDs, content-derived IDs, source-derived IDs, or hybrid IDs?
3. Which node IDs must remain stable across formatting changes?
4. Should every narrative paragraph be represented in the semantic AST?
5. How should comments attach to nodes?
6. Should AST fields be schema-generated from MSL specifications?
7. How should collaborative editors merge AST operations?
8. Should AST diffs be first-class artifacts?
9. What is the canonical serialized AST format?
10. Should AST serialization use JSON, MessagePack, Protobuf, or a custom format?
11. How should large binary attachments appear in the AST?
12. Should imported external declarations use a separate import AST?
13. How are macro-like extensions represented?
14. Should desugaring occur in the frontend or MSC?
15. Which transformations are reversible?
16. How should AI confidence be represented without implying semantic truth?
17. Should source maps include Git commit identities?
18. How are multiple source spans represented for merged nodes?
19. Can one AST node map to multiple KIR elements?
20. How should editor undo and redo preserve provenance?
21. Should validation diagnostics themselves appear as AST nodes?
22. How are waived invalid nodes represented?
23. What minimum AST subset is required for bootstrapping MSC?
24. Should persisted AST be checked into source control?
25. How will AST migrations be tested?

---

## 72. Related Specifications

This specification is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSL-CORE-0007 | `msl-markdown` Concrete Syntax                    |
| MSL-CORE-0008 | Machine Semantics and Constraint Blocks           |
| MSL-CORE-0009 | Type System and Semantic Validation               |
| MSL-CORE-0010 | References, Relationships, and Language Evolution |

Future specialized series should include:

| Series          | Purpose                                                 |
| --------------- | ------------------------------------------------------- |
| MSL-AST         | Detailed AST node schemas and serialization             |
| MSL-EDITOR      | Semantic editing and AST operations                     |
| MSL-FRONTEND    | Frontend-to-AST contracts                               |
| MSC-CORE        | Binding, type checking, normalization, and KIR emission |
| KIR-CORE        | Normalized semantic representation                      |
| MSL-CONFORMANCE | AST and frontend conformance fixtures                   |

---

## Status

Draft.

This document defines the source-aware, partial, extensible, and transformation-traceable Abstract Syntax Tree of the Monad Specification Language.

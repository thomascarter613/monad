---
artifact:
  id: MSC-CORE-0008
  type: knowledge.specification
  namespace: monad

metadata:
  title: Semantic Graph Construction
  version: 0.1.0
  status: draft
  created: 2026-08-06
  authors:
    - Monad Architecture Team
  tags:
    - msc
    - msg
    - semantic-graph
    - graph-construction
    - identity
    - provenance
    - authority
    - lifecycle
    - evidence
    - conflict
    - determinism
    - incrementality

relationships:
  depends_on:
    - ADR-0002
    - ADR-0003
    - ADR-0004
    - ADR-0005
    - ADR-0006
    - ADR-0007
    - MSL-CORE-0001
    - MSL-CORE-0002
    - MSL-CORE-0003
    - MSL-CORE-0004
    - MSL-CORE-0005
    - MSL-CORE-0006
    - MSL-CORE-0007
    - MSL-CORE-0008
    - MSL-CORE-0009
    - MSL-CORE-0010
    - MSC-CORE-0001
    - MSC-CORE-0002
    - MSC-CORE-0003
    - MSC-CORE-0004
    - MSC-CORE-0005
    - MSC-CORE-0006
    - MSC-CORE-0007
  references:
    - MART-CORE
    - MSG-CORE
    - MGO-CORE
    - MKE-CORE
    - KIR-CORE
    - MPE-CORE
    - MAE-CORE
  enables:
    - MSC-CORE-0009
    - MSC-CORE-0010
    - MSG-CORE
    - KIR-CORE
    - MKE-CORE
    - MPE-CORE
    - MAE-CORE

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: primary
  status: bootstrap
---

# MSC-CORE-0008 — Semantic Graph Construction


---

## 1. Purpose

This specification defines how the Monad Specification Compiler constructs the Monad Semantic Graph from the analyzed semantic state produced by declaration collection, symbol binding, reference resolution, type analysis, constraint analysis, authority analysis, lifecycle analysis, compatibility analysis, profile evaluation, feature negotiation, and semantic-conflict construction.

It establishes:

* the semantic graph construction boundary;
* the input contract from MSC semantic analysis;
* the output contract for immutable MSG snapshots;
* graph, node, edge, claim, value, evidence, conflict, and provenance models;
* semantic, source, representation, graph, node, edge, and claim identity;
* deterministic construction and canonicalization;
* partial, authoritative, publication, AI-context, and KIR-eligible profiles;
* unresolved, ambiguous, unknown, deferred, invalid, redacted, and contested semantics;
* artifact, package, namespace, containment, and ownership boundaries;
* graph validation, fingerprinting, incrementality, caching, extensions, and diagnostics.

The governed transformation is:

```text
Analyzed Semantic Snapshot
    ↓
Semantic Eligibility Selection
    ↓
Node Seed Construction
    ↓
Claim and Value Construction
    ↓
Relationship Construction
    ↓
Provenance and Evidence Attachment
    ↓
Conflict and Uncertainty Promotion
    ↓
Graph Canonicalization
    ↓
Graph Validation
    ↓
Immutable Monad Semantic Graph Snapshot
```

The resulting MSG becomes the principal semantic input to KIR lowering, MKE ingestion, publication projection, semantic query, graph diff, and AI-context assembly.


---

## 2. Context

MSC-CORE-0007 produces compiler-oriented semantic structures such as declaration tables, symbol tables, namespace graphs, resolved-reference records, type results, constraint results, authority results, lifecycle results, compatibility conclusions, semantic conflicts, readiness states, and diagnostics.

Those structures are necessary for compilation but are not yet Monad's canonical semantic knowledge representation. They may contain pass-local handles, implementation-specific indexes, recovery objects, caches, traversal state, and frontend-specific details.

MSG construction answers:

> What knowledge did this compilation establish, preserve, contest, defer, or reject, and how is that knowledge semantically related?

MSG is the boundary at which compiler analysis becomes an immutable, queryable, representation-neutral semantic snapshot.


---

## 3. Scope

This specification defines construction inputs, graph snapshots, graph identity, semantic elements, semantic values, provenance, evidence, authority, lifecycle, types, constraints, conflicts, graph profiles, artifact and package boundaries, external references, canonicalization, deduplication, graph validation, fingerprints, incrementality, extensions, diagnostics, and conformance.

It does not fully define the complete MSG ontology, MGO, persistent storage, graph-database technology, MKE transaction semantics, KIR schemas, backend lowering, publication rendering, graph-query syntax, or distributed graph replication.


---

## 4. Non-Goals

This specification does not:

* treat MSG as an AST, symbol table, KIR, database schema, or serialization of compiler memory;
* require every source token to become a graph element;
* erase uncertainty, invalidity, deferred work, alternatives, or conflict;
* infer authority from successful compilation;
* collapse semantic identity into a source path;
* collapse provenance into one source location;
* collapse lifecycle and authority;
* collapse evidence and proof;
* permit construction order to determine meaning;
* permit generated identifiers to become canonical without explicit rules.


---

## 5. Core Principle

> The Monad Semantic Graph is an immutable, deterministic, provenance-complete representation of the semantic knowledge established or preserved by one compilation snapshot.

MSG construction must preserve semantic identity, source lineage, transformation lineage, authority, lifecycle, evidence, uncertainty, unresolved state, conflicts, alternatives, invalidity, deferred evaluation, profile context, feature context, and compatibility conclusions.

It must not invent certainty, authority, resolution, equivalence, or truth.


---

## 6. Architectural Position

```text
Source Artifacts
    ↓
Frontends and Normalizers
    ↓
Canonical MSL AST
    ↓
Declaration Collection and Binding
    ↓
Namespace, Import, and Reference Resolution
    ↓
Type, Constraint, and Semantic Analysis
    ↓
Analyzed Semantic Snapshot
    ↓
Semantic Graph Construction
    ↓
Monad Semantic Graph Snapshot
    ├──→ KIR Lowering
    ├──→ MKE Ingestion
    ├──→ Publication Projection
    ├──→ AI Context Assembly
    └──→ Semantic Query and Graph Diff
```

MSG construction is semantic compilation. It is not persistence, execution, or presentation.


---

## 7. Terminology

### 7.1 Monad Semantic Graph

The canonical graph representation of compiled semantic knowledge for one immutable compilation snapshot.

### 7.2 MSG Snapshot

One immutable graph state produced from completely identified inputs and construction rules.

### 7.3 Semantic Node

A graph element representing a semantically identifiable entity, declaration, artifact, type, constraint, state, operation, or governed subject.

### 7.4 Semantic Edge

A directed, typed semantic relationship between subjects.

### 7.5 Semantic Claim

A first-class assertion connecting a subject, predicate, value or object, authority, lifecycle, evidence, and provenance.

### 7.6 Semantic Value

A canonical literal, structure, reference, expression, unknown, deferred, invalid, or redacted value.

### 7.7 Semantic Identity

Durable identity representing one semantic subject across representations and snapshots.

### 7.8 Representation Identity

Identity of one concrete representation of a semantic subject.

### 7.9 Source Identity

Identity of a source artifact, fragment, region, registry record, imported graph, or external record.

### 7.10 Graph Profile

A named policy controlling which semantic elements are included, required, tolerated, or blocked.

### 7.11 Partial Graph

An MSG that explicitly preserves incomplete, unresolved, deferred, invalid, or contested semantics.

### 7.12 Authoritative Graph

An MSG or subgraph satisfying a declared authority and validation profile.

### 7.13 Provenance

Structured lineage identifying origin, custody, transformation, derivation, and evidence.

### 7.14 Semantic Conflict

A first-class representation of incompatible semantic claims or conclusions.


---

## 8. Construction Inputs

MSG construction consumes an immutable or completely fingerprinted `SemanticAnalysisSnapshot` containing:

```text
SemanticAnalysisSnapshot
├── snapshot_id
├── compilation_unit
├── artifact_set
├── source_snapshot_fingerprints
├── canonical_ast_snapshot
├── declarations
├── symbols
├── namespaces
├── imports
├── exports
├── aliases
├── resolved_references
├── unresolved_references
├── ambiguous_references
├── type_results
├── constraints
├── constraint_results
├── invariants
├── authority_results
├── lifecycle_results
├── profile_results
├── feature_results
├── compatibility_results
├── semantic_conflicts
├── readiness_results
├── diagnostics
├── pass_versions
├── extension_set
├── provenance
└── fingerprint
```

Incomplete identity or fingerprint data blocks authoritative construction.


---

## 9. Output Contract

MSG construction produces:

```text
MonadSemanticGraphSnapshot
├── graph_id
├── graph_lineage
├── graph_version
├── schema_version
├── profile
├── compilation_unit
├── input_snapshot_id
├── input_fingerprints
├── artifact_membership
├── package_membership
├── namespace_membership
├── nodes
├── edges
├── claims
├── values
├── constraints
├── evidence
├── conflicts
├── provenance
├── indexes
├── diagnostics
├── completeness
├── readiness
├── construction_manifest
├── parent_graphs
└── graph_fingerprint
```

Every output field must have deterministic semantics. Absence and empty collections must remain distinguishable where they carry different meaning.


---

## 10. Boundary Distinctions

MSG is not an AST, compiler symbol table, KIR, MKE database schema, or publication page.

An AST preserves syntax. A symbol table supports lookup. KIR represents lowerable implementation intent. MKE persists and operates on knowledge. Publication renders selected knowledge.

MSG preserves compiled semantic meaning without requiring accidental implementation structure.


---

## 11. Snapshot and Identity Model

Every MSG is immutable, schema-versioned, profile-versioned, construction-rule-versioned, fingerprinted, and independently validatable.

Identity domains include:

```text
GraphLineageId
GraphSnapshotId
GraphFingerprint
SemanticIdentity
NodeId
EdgeId
ClaimId
SourceIdentity
RepresentationIdentity
ProvenanceId
```

These domains must remain distinct.

Equivalent compilations must assign equivalent identities. Identity must not depend on traversal order, scheduling, map iteration, memory address, random UUID generation, source discovery order, or serialization order.


---

## 12. Semantic Node Model

A semantic node conceptually contains:

```text
SemanticNode
├── node_id
├── semantic_identity
├── node_kind
├── semantic_role
├── canonical_name
├── aliases
├── artifact_membership
├── package_membership
├── namespace_membership
├── declaration_identity
├── type_state
├── authority
├── lifecycle
├── version
├── feature_requirements
├── compatibility_state
├── source_bindings
├── provenance
├── derivations
├── evidence
├── conflicts
├── readiness
├── extension_data
└── fingerprint
```

Durable semantic identity is required when a subject is independently referenced, versioned, governed, superseded, persisted, or published canonically. Other elements may use deterministic snapshot-local identity.


---

## 13. Core Node Kinds

Initial core node kinds include:

```text
artifact
artifact_fragment
package
module
namespace
declaration
symbol
type
field
value
parameter
operation
event
command
query
state
transition
workflow
policy
constraint
invariant
requirement
capability
feature
profile
version
authority_class
lifecycle_state
evidence
proof
conflict
external_subject
placeholder
extension
```

MSG-CORE and MGO may refine these kinds. Extensions must use registered namespaces.


---

## 14. Semantic Edge Model

A semantic edge conceptually contains:

```text
SemanticEdge
├── edge_id
├── edge_kind
├── source_node
├── target_node
├── direction
├── cardinality
├── qualifiers
├── authority
├── lifecycle
├── version
├── source_bindings
├── provenance
├── derivations
├── evidence
├── conflicts
├── extension_data
└── fingerprint
```

Edge identity must account for relationship kind, source, target, qualifiers, scope, and version where semantically relevant.


---

## 15. Core Edge Kinds

Initial core edge kinds include:

```text
contains
declares
defines
references
imports
exports
aliases
depends_on
requires
provides
implements
conforms_to
has_type
subtype_of
equivalent_to
assignable_to
constrained_by
governed_by
validated_by
evidenced_by
derived_from
generated_from
normalized_from
compiled_from
supersedes
deprecates
replaces
migrates_to
conflicts_with
compatible_with
incompatible_with
member_of
parameter_of
returns
accepts
transitions_to
triggered_by
produces
consumes
applies_to
enabled_by
blocked_by
related_to
```

Every edge kind must declare direction, inverse behavior, symmetry, transitivity, acyclicity, containment semantics, ownership semantics, and historical behavior where applicable.


---

## 16. Semantic Claim Model

A semantic claim conceptually contains:

```text
SemanticClaim
├── claim_id
├── subject
├── predicate
├── object_or_value
├── claim_kind
├── scope
├── conditions
├── authority
├── lifecycle
├── confidence
├── effective_interval
├── version
├── source_bindings
├── provenance
├── derivations
├── evidence
├── counterevidence
├── conflicts
├── validation_state
└── fingerprint
```

Claim kinds include declared, normalized, inferred, derived, observed, validated, approved, adopted, defaulted, generated, imported, external, historical, contested, rejected, and withdrawn.

Relationships with independently significant authority, lifecycle, evidence, conditions, confidence, or competing assertions must remain claim-addressable.


---

## 17. Semantic Value Model

A semantic value conceptually contains:

```text
SemanticValue
├── value_id
├── value_kind
├── type_identity
├── canonical_value
├── lexical_forms
├── unit
├── precision
├── language
├── structure
├── references
├── unknown_reason
├── deferred_dependency
├── invalid_reason
├── redaction_state
├── source_bindings
├── provenance
└── fingerprint
```

Value kinds include null, boolean, integer, decimal, string, identifier, date, timestamp, duration, enumeration, record, list, set, map, tuple, reference, expression, unknown, deferred, invalid, redacted, and extension.

Unknown, deferred, invalid, redacted, null, missing, and absent values must remain distinct.


---

## 18. Canonical Values

Canonical values must be representation-neutral.

Integer equality must not depend on digit separators. Timestamp values must preserve zone semantics. Durations must preserve unit semantics. Sets and maps require canonical ordering. Decimal values must preserve required precision. Lexical source forms belong in provenance and do not normally define semantic equality.


---

## 19. Artifact, Package, and Namespace Membership

MSG must represent artifact, package, and namespace membership independently.

Artifact membership must not be inferred solely from file containment. An artifact may span files, generated regions, embedded language regions, or imported fragments. A file may contain several artifacts or nonsemantic support material.

Package membership affects visibility, dependencies, compatibility, authority, lifecycle, publication, and lowering.

Namespace membership preserves canonical identity, parent namespace, aliases, visibility, imports, exports, package relation, authority, lifecycle, and version.


---

## 20. Containment and Ownership

The graph must distinguish:

* source containment;
* artifact containment;
* package containment;
* namespace containment;
* structural membership;
* semantic ownership;
* lifecycle aggregation.

These relations must not collapse into a generic parent-child relation.

Ownership may affect identity, deletion, versioning, visibility, authority, migration, and lowering. Ownership cycles must be validated separately from valid reference cycles.


---

## 21. Declaration and Symbol Projection

Every eligible semantic declaration must produce a node or schema-equivalent subject with identity, kind, canonical name, aliases, artifact membership, package membership, namespace membership, source bindings, authority, lifecycle, version, type, constraints, relationships, readiness, and provenance.

Compiler symbols may remain representation lineage. A symbol becomes independently addressable in MSG only when it has semantic significance, such as a public declaration, exported member, alias, unresolved target, overload candidate, or migration binding.


---

## 22. Reference Projection

A resolved reference must preserve reference identity, source subject, target semantic identity, reference kind, resolution path, alias use, import path, visibility, version, authority, lifecycle, type result, and provenance.

An unresolved reference must preserve authored target, normalized target, namespace context, candidate scopes, failure reason, expected target kind, resume condition, and blocked outputs.

An ambiguous reference must preserve all viable candidates and must not be resolved by pass order or convenience.


---

## 23. Placeholder and External Subjects

Placeholder nodes may represent unresolved exact targets, planned artifacts, external targets, unavailable packages, redacted subjects, or deferred graph imports.

A placeholder must declare placeholder kind, expected identity domain, expected node kind, creation reason, resolution condition, authority, lifecycle, and provenance. It must not silently satisfy exact-target requirements.

External subjects must preserve external identity scheme, source authority, source version, import policy, verification state, local alias, and provenance.


---

## 24. Type Projection

Type-analysis results must project declared types, inferred candidates, effective type, substitutions, assignability results, conversions, narrowing evidence, unknown state, deferred state, conflicts, and provenance.

Named types become durable semantic nodes. Anonymous types use deterministic snapshot-local identity unless independently referenced, versioned, governed, or promoted to MART.


---

## 25. Constraint and Invariant Projection

A constraint must preserve identity, kind, canonical expression, targets, evaluation class, applicability, authority, lifecycle, result, evidence, deferred requirements, waiver state, and provenance.

An invariant must preserve governed subject, scope, lifecycle interval, authority requirement, evaluation class, enforcement phase, result, evidence, violation state, waiver state, and provenance.

Compiler-only dependency structures remain implementation details unless their relationships are semantically significant.


---

## 26. Authority and Lifecycle Projection

Authority must remain structured semantic state, not a trusted Boolean. MSG preserves declared authority, inherited authority, effective authority, authority basis, reductions, contested authority, required authority, adoption evidence, and waivers.

Lifecycle preserves declared state, effective state, applicability, transition references, deprecation, supersession, withdrawal, archival, migration eligibility, and historical accessibility.

Authority and lifecycle remain independent.


---

## 27. Version, Compatibility, and Feature Projection

Version values must identify their domain, such as artifact, package, language, compiler, schema, graph, or claim.

Compatibility results preserve domain, source version, target version, conditions, migration, evidence, profile, and provenance.

Feature results preserve feature identity, version, required or optional state, activation source, support result, fallback, blocked outputs, and provenance.


---

## 28. Evidence, Proof, Derivation, and Provenance

Evidence remains first-class when it affects authority, validation, lifecycle, compatibility, constraints, confidence, adoption, supersession, or conflict resolution.

Proof records remain distinct from tests, observations, human review, backend validation, and AI suggestions.

Every derived semantic element must identify the derivation rule, rule version, inputs, outputs, and provenance when rule changes may alter meaning.

Provenance supports origin, custody, representation, transformation, derivation, evidence, authority, lifecycle, compilation, and projection. It may contain multiple lineage paths and must not erase earlier lineage.


---

## 29. Conflict Projection

Every semantic conflict produced by analysis must become a conflict node, claim, record, or schema-equivalent first-class graph element.

A conflict preserves identity, kind, subjects, claims, authorities, lifecycles, versions, evidence, applicability, blocked outputs, resolution state, and provenance.

Diagnostics alone are insufficient when downstream systems need conflict knowledge. Construction must preserve all competing claims unless an authorized resolution supersedes them.


---

## 30. Unknown, Deferred, Invalid, and Redacted Semantics

Unknown semantics preserve the unknown domain, known bounds, missing inputs, permitted operations, blocked operations, and provenance.

Deferred semantics preserve the dependency, expected domain, resume phase, resume condition, required evidence, blocked outputs, and provenance.

Invalid semantics may appear in partial MSG for explanation, editor support, migration, or history, but must remain visibly invalid and cannot satisfy authoritative or KIR-ready profiles.

Redacted semantics may preserve identity, existence, classification, redaction reason, redaction authority, access-policy reference, integrity commitment, and tombstone. Protected content must not leak through labels, provenance, diagnostics, indexes, identifiers, or exposed hashes.


---

## 31. Graph Profiles

Profiles are named, versioned, and fingerprinted.

The bootstrap profile supports artifacts, packages, namespaces, declarations, types, constraints, references, authority, lifecycle, provenance, unresolved placeholders, conflicts, and deterministic fingerprints.

The partial profile permits unresolved references, ambiguous candidates, unknown types, deferred constraints, provisional authority, draft lifecycle, conflicts, and invalid recovery nodes while declaring unavailable guarantees.

The authoritative profile requires stable identity, valid binding, required references resolved, effective types, required static constraints, authority threshold, lifecycle eligibility, compatibility, complete provenance, and no blocking conflict.

Publication inclusion may include incomplete or contested knowledge when clearly labeled and must not elevate authority.

AI-context selection must preserve status, authority, lifecycle, uncertainty, conflict, and provenance.

KIR eligibility is target-profile-specific and additionally requires all semantics required for deterministic lowering.


---

## 32. Construction Phase Model

Logical phases are:

```text
1. Validate construction inputs
2. Select construction profile
3. Establish graph identity context
4. Construct artifact, package, and namespace roots
5. Seed semantic nodes
6. Construct canonical values
7. Construct claims
8. Construct relationships
9. Attach types and constraints
10. Attach authority, lifecycle, compatibility, and features
11. Attach evidence, proof, derivation, and provenance
12. Promote conflicts and incomplete states
13. Resolve eligible aliases and coalescing
14. Canonicalize graph elements
15. Build derived indexes
16. Validate graph invariants
17. Compute fingerprints
18. Freeze the snapshot
```

Implementations may parallelize phases when logical dependencies and deterministic semantics are preserved.


---

## 33. Node Seeding and Enrichment

Node seeding establishes minimal stable identities and kinds before complete enrichment. This supports forward references, cycles, mutual recursion, parallel work, and placeholder resolution.

Enrichment attaches names, aliases, types, constraints, authority, lifecycle, versions, features, compatibility, evidence, conflicts, and readiness. Enrichment order must not affect final meaning.


---

## 34. Canonicalization

Canonicalization may normalize identifiers, aliases, edge direction, inverse representation, value encoding, unordered collections, qualifiers, empty optional fields, extension namespaces, provenance references, and canonical ordering.

Canonicalization must not resolve conflict, ambiguity, uncertainty, invalidity, or authority disagreement.


---

## 35. Validation and Finalization

Graph validation checks graph identity, identity uniqueness, exact targets, placeholder validity, memberships, provenance, authority, lifecycle, version domains, containment, ownership cycles, edge contracts, claim contracts, schema compatibility, extension contracts, profile requirements, and fingerprint consistency.

Finalization freezes graph collections, records completeness and blocked outputs, computes canonical ordering and fingerprints, records the construction manifest, and prevents mutation.


---

## 36. Construction Manifest

The manifest contains compiler identity and version, MSG schema version, construction-rule version, profile identity and version, extension set, input snapshot, input fingerprints, environment fingerprint, pass versions, resource policy, canonicalization version, fingerprint algorithm, diagnostics policy, and output fingerprint.


---

## 37. Determinism and Canonical Ordering

Equivalent semantic inputs and construction context must produce semantically equivalent snapshots.

Canonical ordering must be stable, locale-independent, and independent from display ordering. It may use semantic identity, element kind, source identity, target identity, claim identity, canonical value, and provenance identity.


---

## 38. Fingerprinting

Fingerprints may exist for values, nodes, edges, claims, evidence, conflicts, provenance, indexes, and the complete graph.

Algorithms must be deterministic, versioned, domain-separated, collision-resistant for their intended use, independent from serialization whitespace, and explicit about included fields.

Semantic fingerprints and representation fingerprints remain distinct. Different encodings may share a semantic fingerprint.


---

## 39. Duplicate Detection and Coalescing

Duplicate detection distinguishes:

* the same semantic identity and same claim;
* the same semantic identity with compatible enrichment;
* the same semantic identity with conflicting claims;
* distinct identities with equivalent structure;
* accidental duplicate representations.

Coalescing requires an explicit equivalence rule and preserves source bindings, provenance, authority, lifecycle, versions, evidence, and conflicts.

Identity collision produces a blocking diagnostic and conflict record. Last-write-wins is prohibited.


---

## 40. Aliases, Fragments, Imports, and Composition

Aliases preserve alias identity, canonical target, scope, version, lifecycle, authority, and source provenance.

Artifact fragments require explicit assembly order where semantically relevant, merge policy, authority, lifecycle, provenance, conflict behavior, and completeness. File order is not an implicit merge rule.

Imported graphs declare graph identity, schema version, fingerprint, authority, lifecycle, package relation, namespace mapping, compatibility, trust, and provenance. Parse success does not establish trust.

Graph composition preserves component identities and lineage.


---

## 41. Graph Lineage and Supersession

Snapshots may relate through parent, derived-from, recompiled-from, migrated-from, supersedes, branches-from, and merges relationships.

Supersession preserves predecessor, successor, scope, effective boundary, authority, compatibility, migration, and provenance. It does not delete predecessor identity.

Historical semantics may remain for audit, migration, explanation, and publication without becoming currently applicable.


---

## 42. Indexes, Completeness, and Readiness

Derived indexes may cover identity, kind, artifact, package, namespace, type, authority, lifecycle, version, relationship, provenance, evidence, conflict, and readiness. They must be rebuildable; index mismatch is an integrity error.

Completeness is multidimensional:

```text
identity_complete
binding_complete
reference_complete
type_complete
constraint_complete
authority_complete
lifecycle_complete
provenance_complete
evidence_complete
compatibility_complete
feature_complete
conflict_complete
profile_complete
```

Readiness states include partial, msg_valid, authoritative, kir_eligible, backend_eligible, publication_eligible, mke_ingestible, ai_context_eligible, and blocked.


---

## 43. Construction Barriers

Before snapshot freeze, all eligible declarations must be represented; exact identities must be unique; included relationships must exist; unresolved relationships must be explicit; required types and constraints must be represented; authority and lifecycle must be explicit; conflicts must be promoted; required provenance must exist; completeness must be recorded; validation must pass; and fingerprints must be computed.

MKE ingestion additionally requires supported schema, verified fingerprint, valid graph structure, explicit imported-graph trust, and redaction safety.

KIR lowering requires target-specific eligible subgraphs and is defined further by MSC-CORE-0010.


---

## 44. Incrementality and Invalidation

Incremental construction may reuse graph elements only when complete semantic dependencies are unchanged.

Invalidation sources include changes to source artifacts, identity, declarations, namespaces, imports, references, types, constraints, invariants, authority, lifecycle, profiles, features, compatibility, evidence, extensions, schemas, canonicalization rules, and construction profiles.

MSC must track enough dependencies to identify directly affected, transitively affected, and reusable elements.

Clean and incremental builds over equivalent inputs must produce semantically equivalent graphs and equal semantic fingerprints.


---

## 45. Caching and Parallelism

Caches may store node seeds, canonical values, claims, relationships, provenance, evidence, conflicts, fingerprints, and indexes. Cache keys include every semantically relevant dependency.

Parallel construction is permitted only when identity, ordering, conflict detection, diagnostics, merging, and fingerprints remain deterministic.


---

## 46. Extension Model

Extensions may define node kinds, edge kinds, claim kinds, value kinds, qualifiers, validation rules, canonicalization rules, indexes, and profiles.

Every extension declares identity, version, namespace, schema compatibility, rule ordering, determinism, trust, resource requirements, and failure behavior.

Unknown required extensions block dependent profiles. Unknown optional data may be preserved opaquely only when schema safety permits it.


---

## 47. Security and Trust Considerations

MSG construction is exposed to identity collision, alias poisoning, provenance forgery, authority escalation, lifecycle forgery, evidence spoofing, malicious graph imports, extension injection, graph explosion, cyclic containment, redaction leakage, stale-cache poisoning, and nondeterministic-output attacks.

All source data, imported graphs, evidence, and extension data are untrusted until validated.

Resource controls may limit node count, edge count, claim count, value size, provenance depth, evidence count, conflict count, alias count, import depth, graph depth, extension size, canonicalization work, fingerprint work, and diagnostics.


---

## 48. Explainability

MSC should explain why a node exists, how identity was selected, why fragments coalesced or did not coalesce, why an edge or claim exists, how authority and lifecycle were derived, why a placeholder was created, why an element is incomplete, why a conflict blocks an output, why a profile excluded an element, and why a graph fingerprint changed.


---

## 49. Diagnostics

Construction diagnostics identify code, severity, phase, graph element, source bindings, semantic identity, profile, blocked outputs, remediation, and provenance.

Diagnostic categories include input, identity, node, edge, claim, value, artifact, package, namespace, reference, type, constraint, authority, lifecycle, version, compatibility, feature, evidence, provenance, conflict, canonicalization, validation, fingerprint, incrementality, extension, security, and resource.

Diagnostics remain distinct from semantic conflicts.


---

## 50. Initial Diagnostic Codes

```text
MSC-MSG-INPUT-001     invalid analysis snapshot
MSC-MSG-INPUT-002     missing construction profile
MSC-MSG-INPUT-003     unsupported schema version
MSC-MSG-ID-001        missing required semantic identity
MSC-MSG-ID-002        semantic identity collision
MSC-MSG-ID-003        nondeterministic identity input
MSC-MSG-NODE-001      invalid node kind
MSC-MSG-NODE-002      missing required membership
MSC-MSG-EDGE-001      dangling exact target
MSC-MSG-EDGE-002      invalid edge kind
MSC-MSG-EDGE-003      invalid edge direction
MSC-MSG-CLAIM-001     incomplete required claim
MSC-MSG-VALUE-001     noncanonical value
MSC-MSG-REF-001       unresolved required reference
MSC-MSG-REF-002       ambiguous required reference
MSC-MSG-TYPE-001      invalid effective type
MSC-MSG-CONSTRAINT-001 missing required constraint result
MSC-MSG-AUTH-001      missing authority state
MSC-MSG-LIFE-001      missing lifecycle state
MSC-MSG-VERSION-001   ambiguous version domain
MSC-MSG-COMPAT-001    unresolved required compatibility
MSC-MSG-EVIDENCE-001  invalid evidence reference
MSC-MSG-PROV-001      incomplete required provenance
MSC-MSG-CONFLICT-001  unpromoted semantic conflict
MSC-MSG-CANON-001     canonicalization failure
MSC-MSG-VALID-001     graph invariant violation
MSC-MSG-HASH-001      fingerprint mismatch
MSC-MSG-INCR-001      incremental and clean mismatch
MSC-MSG-EXT-001       unknown required extension
MSC-MSG-SEC-001       redaction leakage risk
MSC-MSG-RESOURCE-001  graph construction resource limit
```


---

## 51. Normative Requirements

### MSC-MSG-REQ-001

MSC MUST construct MSG from an immutable or completely fingerprinted semantic-analysis snapshot.

### MSC-MSG-REQ-002

MSG construction MUST remain distinct from parsing, normalization, semantic analysis, KIR lowering, persistence, and publication.

### MSC-MSG-REQ-003

Every MSG snapshot MUST have stable graph identity, schema version, construction profile, construction-rule version, and semantic fingerprint.

### MSC-MSG-REQ-004

MSG snapshots MUST be immutable after finalization.

### MSC-MSG-REQ-005

Equivalent semantic inputs and construction context MUST produce semantically equivalent MSG snapshots.

### MSC-MSG-REQ-006

MSG identity and fingerprints MUST NOT depend on traversal order, scheduling, map iteration, memory address, randomness, or serialization whitespace.

### MSC-MSG-REQ-007

Semantic identity MUST remain distinct from source, representation, node, graph, storage, and route identity.

### MSC-MSG-REQ-008

Every independently addressable governed semantic subject MUST have durable semantic identity.

### MSC-MSG-REQ-009

Every graph element without durable semantic identity MUST have deterministic snapshot-local identity.

### MSC-MSG-REQ-010

Node, edge, and claim identities MUST remain stable across equivalent clean and incremental builds.

### MSC-MSG-REQ-011

Identity collisions MUST produce blocking diagnostics and first-class conflict information.

### MSC-MSG-REQ-012

Identity collisions MUST NOT be resolved through last-write-wins behavior.

### MSC-MSG-REQ-013

MSG MUST NOT be a direct serialization of compiler memory.

### MSC-MSG-REQ-014

Source syntax relevant to explanation MUST remain recoverable through source bindings or provenance.

### MSC-MSG-REQ-015

Every eligible semantic declaration MUST be represented by a node or schema-equivalent subject.

### MSC-MSG-REQ-016

Every node, edge, claim, and value MUST declare a valid kind.

### MSC-MSG-REQ-017

Relationships with independently significant authority, lifecycle, evidence, conditions, or conflict MUST remain claim-addressable.

### MSC-MSG-REQ-018

Unknown, deferred, invalid, redacted, null, missing, and absent values MUST remain distinct.

### MSC-MSG-REQ-019

Canonical values MUST be deterministic and representation-neutral.

### MSC-MSG-REQ-020

Artifact membership MUST be represented independently from file containment.

### MSC-MSG-REQ-021

Package membership and namespace membership MUST remain distinct.

### MSC-MSG-REQ-022

Source containment, artifact containment, package containment, namespace containment, structural membership, and semantic ownership MUST NOT be collapsed silently.

### MSC-MSG-REQ-023

Resolved references MUST preserve target identity and resolution provenance.

### MSC-MSG-REQ-024

Unresolved references included by profile MUST remain explicit.

### MSC-MSG-REQ-025

Ambiguous references MUST preserve every viable candidate.

### MSC-MSG-REQ-026

MSG construction MUST NOT select an ambiguous target merely to complete the graph.

### MSC-MSG-REQ-027

Type projection MUST preserve declared, inferred, effective, unknown, deferred, conversion, narrowing, and conflict state where applicable.

### MSC-MSG-REQ-028

Constraint projection MUST preserve targets, evaluation class, result, evidence, deferred requirements, and provenance.

### MSC-MSG-REQ-029

Invariant projection MUST preserve applicability, lifecycle interval, authority, enforcement phase, and result.

### MSC-MSG-REQ-030

Authority MUST remain a structured semantic state and MUST NOT be reduced to trusted or untrusted.

### MSC-MSG-REQ-031

Lifecycle and authority MUST remain independent.

### MSC-MSG-REQ-032

Version values MUST identify their compatibility domain.

### MSC-MSG-REQ-033

Compatibility conclusions MUST preserve domain, versions, conditions, migration, evidence, and provenance.

### MSC-MSG-REQ-034

Feature conclusions MUST preserve identity, version, activation source, support result, fallback, and blocked outputs.

### MSC-MSG-REQ-035

Evidence affecting semantic conclusions MUST remain first-class or independently addressable.

### MSC-MSG-REQ-036

Proof records MUST remain distinct from tests, observations, reviews, and AI suggestions.

### MSC-MSG-REQ-037

Every derived semantic element MUST preserve derivation identity and rule version when rule changes may alter meaning.

### MSC-MSG-REQ-038

Required provenance MUST identify source, process, transformation, and input fingerprints.

### MSC-MSG-REQ-039

Compiler-generated semantics MUST identify their generation rule and compiler version.

### MSC-MSG-REQ-040

Semantic conflicts MUST be promoted to first-class graph information.

### MSC-MSG-REQ-041

Invalid semantics included in partial MSG MUST remain visibly invalid and identify blocked outputs.

### MSC-MSG-REQ-042

Unknown semantics MUST identify the unknown domain and known bounds where available.

### MSC-MSG-REQ-043

Deferred semantics MUST identify resume condition and blocking dependency.

### MSC-MSG-REQ-044

Redacted semantics MUST NOT leak protected information through labels, provenance, diagnostics, indexes, identifiers, or exposed fingerprints.

### MSC-MSG-REQ-045

Placeholder nodes MUST declare placeholder kind, expected identity domain, expected node kind, reason, and resolution condition.

### MSC-MSG-REQ-046

Placeholder nodes MUST NOT satisfy exact-target requirements silently.

### MSC-MSG-REQ-047

External subjects MUST identify identity scheme, authority, version, verification state, and import provenance where applicable.

### MSC-MSG-REQ-048

Cross-artifact and cross-package relationships MUST preserve boundary, visibility, version, authority, lifecycle, and compatibility context.

### MSC-MSG-REQ-049

Semantic ownership cycles MUST be validated independently from ordinary reference cycles.

### MSC-MSG-REQ-050

Construction profiles MUST be named, versioned, and fingerprinted.

### MSC-MSG-REQ-051

A partial profile MUST declare unavailable guarantees and blocked operations.

### MSC-MSG-REQ-052

An authoritative profile MUST enforce identity, binding, references, types, constraints, authority, lifecycle, compatibility, provenance, and conflicts.

### MSC-MSG-REQ-053

KIR eligibility MUST remain target-profile-specific.

### MSC-MSG-REQ-054

Publication inclusion MUST NOT increase semantic authority.

### MSC-MSG-REQ-055

AI-context selection MUST preserve authority, lifecycle, uncertainty, conflict, and provenance.

### MSC-MSG-REQ-056

MSG construction MUST validate all required analysis barriers before authoritative graph construction.

### MSC-MSG-REQ-057

Node seeding MUST support forward references and recursive semantic structures.

### MSC-MSG-REQ-058

Enrichment order MUST NOT affect final semantic meaning.

### MSC-MSG-REQ-059

All required provenance MUST be attached before snapshot finalization.

### MSC-MSG-REQ-060

Canonicalization MUST NOT resolve semantic conflict or ambiguity.

### MSC-MSG-REQ-061

Graph validation MUST detect identity collisions, dangling exact targets, invalid memberships, invalid edge contracts, missing provenance, and schema incompatibility.

### MSC-MSG-REQ-062

Finalization MUST freeze graph content before computing the final fingerprint.

### MSC-MSG-REQ-063

Every MSG snapshot MUST include a construction manifest.

### MSC-MSG-REQ-064

Canonical ordering MUST be stable and locale-independent.

### MSC-MSG-REQ-065

Fingerprint algorithms MUST be deterministic, versioned, domain-separated, and explicit about included fields.

### MSC-MSG-REQ-066

Semantic and representation fingerprints MUST remain distinct.

### MSC-MSG-REQ-067

Duplicate detection MUST distinguish equivalent representation, compatible enrichment, conflicting claim, and distinct semantic identity.

### MSC-MSG-REQ-068

Coalescing MUST require an explicit equivalence rule and preserve provenance, authority, lifecycle, versions, evidence, and conflicts.

### MSC-MSG-REQ-069

Fragment assembly MUST use explicit merge rules and MUST NOT use file order as semantic precedence.

### MSC-MSG-REQ-070

Imported graphs MUST declare identity, schema, fingerprint, authority, compatibility, trust, and provenance.

### MSC-MSG-REQ-071

Imported graphs MUST NOT be trusted merely because they parse.

### MSC-MSG-REQ-072

Graph composition MUST preserve component identity and lineage.

### MSC-MSG-REQ-073

Supersession MUST preserve predecessor identity and historical accessibility.

### MSC-MSG-REQ-074

Derived indexes MUST be rebuildable from graph content.

### MSC-MSG-REQ-075

Index mismatches MUST be integrity errors.

### MSC-MSG-REQ-076

Completeness MUST be multidimensional.

### MSC-MSG-REQ-077

Readiness MUST be operation- and profile-specific.

### MSC-MSG-REQ-078

MKE-ingestible, authoritative, KIR-eligible, publication-eligible, and AI-context-eligible MUST remain distinct states.

### MSC-MSG-REQ-079

Incremental construction MUST reuse elements only when all semantically relevant dependencies are unchanged.

### MSC-MSG-REQ-080

Incremental construction MUST preserve stable identities for unchanged elements.

### MSC-MSG-REQ-081

Clean and incremental construction over equivalent inputs MUST produce equal semantic fingerprints.

### MSC-MSG-REQ-082

Cache keys MUST include every semantically relevant dependency.

### MSC-MSG-REQ-083

Parallel construction MUST preserve deterministic identity, ordering, conflict detection, diagnostics, and fingerprints.

### MSC-MSG-REQ-084

Every extension MUST declare identity, version, namespace, compatibility, determinism, trust, resources, and failure behavior.

### MSC-MSG-REQ-085

Unknown required extensions MUST block profiles that depend on them.

### MSC-MSG-REQ-086

All graph imports, source artifacts, evidence, and extension data MUST be treated as untrusted until validated.

### MSC-MSG-REQ-087

Construction resource limits MUST produce explicit partial or blocking diagnostics.

### MSC-MSG-REQ-088

Construction diagnostics MUST identify phase, graph element, source bindings, profile, blocked outputs, and remediation where available.

### MSC-MSG-REQ-089

Diagnostics MUST remain distinct from semantic conflict records.

### MSC-MSG-REQ-090

An MSG snapshot failing graph invariants MUST NOT be emitted as valid.

### MSC-MSG-REQ-091

A conforming implementation MUST demonstrate deterministic clean-build and incremental-build equivalence.


---

## 52. Machine Specification

```yaml
machine_spec:
  id: MSC-CORE-0008
  version: 0.1.0
  status: bootstrap

  input:
    kind: SemanticAnalysisSnapshot
    immutable_or_fingerprinted: true

  output:
    kind: MonadSemanticGraphSnapshot
    immutable: true
    deterministic: true
    fingerprinted: true

  core_elements:
    - node
    - edge
    - claim
    - value
    - evidence
    - proof
    - conflict
    - provenance

  construction_phases:
    - validate_inputs
    - select_profile
    - establish_graph_identity
    - construct_roots
    - seed_nodes
    - construct_values
    - construct_claims
    - construct_relationships
    - attach_types_and_constraints
    - attach_authority_and_lifecycle
    - attach_evidence_and_provenance
    - promote_conflicts
    - canonicalize
    - build_indexes
    - validate
    - fingerprint
    - freeze

  profiles:
    - bootstrap
    - partial
    - authoritative
    - kir_eligible
    - publication
    - ai_context
```

---

## 53. Graph Invariants

```yaml
invariants:
  - id: MSG-INV-001
    statement: Every graph snapshot has exactly one stable graph identity.
  - id: MSG-INV-002
    statement: Every graph element has deterministic identity within its identity domain.
  - id: MSG-INV-003
    statement: No two distinct semantic subjects share one canonical semantic identity.
  - id: MSG-INV-004
    statement: Every exact edge target resolves to a node in the graph or an explicitly imported graph.
  - id: MSG-INV-005
    statement: Every unresolved target is represented explicitly and never masquerades as resolved.
  - id: MSG-INV-006
    statement: Every authoritative claim has authority, lifecycle, and provenance.
  - id: MSG-INV-007
    statement: Every derived claim identifies its derivation rule and inputs.
  - id: MSG-INV-008
    statement: Every conflict preserves all conflicting claims available to the compiler.
  - id: MSG-INV-009
    statement: Canonicalization does not alter semantic meaning.
  - id: MSG-INV-010
    statement: The graph fingerprint changes when semantically relevant content changes.
  - id: MSG-INV-011
    statement: The semantic fingerprint does not change solely because serialization formatting changes.
  - id: MSG-INV-012
    statement: Clean and incremental construction produce equal semantic fingerprints for equivalent inputs.
  - id: MSG-INV-013
    statement: Generated projections and indexes are never canonical input to the same construction cycle.
  - id: MSG-INV-014
    statement: Redacted content cannot be reconstructed from unauthorized graph fields.
  - id: MSG-INV-015
    statement: An invalid graph is never labeled valid, authoritative, or KIR-eligible.
```

---

## 54. Conformance Example — Complete Declaration

```yaml
artifact:
  id: EXAMPLE-SERVICE-0001

declaration:
  id: service.customer
  kind: service
  authority: normative
  lifecycle: accepted
  requires:
    - capability.identity
```

Conceptual MSG:

```yaml
graph:
  id: msg:example-service:sha256:...
  profile: authoritative

nodes:
  - id: node:artifact:EXAMPLE-SERVICE-0001
    kind: artifact
    semantic_identity: EXAMPLE-SERVICE-0001
  - id: node:service:service.customer
    kind: declaration
    semantic_identity: service.customer
    authority: normative
    lifecycle: accepted
  - id: node:capability:capability.identity
    kind: capability
    semantic_identity: capability.identity

edges:
  - kind: declares
    source: node:artifact:EXAMPLE-SERVICE-0001
    target: node:service:service.customer
  - kind: requires
    source: node:service:service.customer
    target: node:capability:capability.identity
```

The exact serialization is non-normative.

---

## 55. Conformance Example — Unresolved Target

Under a partial profile, an unresolved capability must remain explicit:

```yaml
nodes:
  - id: node:service:service.billing
    kind: declaration
    semantic_identity: service.billing
  - id: placeholder:capability.future-ledger
    kind: placeholder
    expected_kind: capability
    reason: unresolved_reference

edges:
  - kind: requires
    source: node:service:service.billing
    target: placeholder:capability.future-ledger
    resolution_state: unresolved
```

The placeholder does not establish that the capability exists authoritatively.

---

## 56. Conformance Example — Competing Claims

```yaml
claims:
  - id: claim:component-x:lifecycle:accepted:source-a
    subject: component-x
    predicate: lifecycle
    value: accepted
    authority: normative
  - id: claim:component-x:lifecycle:withdrawn:source-b
    subject: component-x
    predicate: lifecycle
    value: withdrawn
    authority: normative

conflicts:
  - id: conflict:component-x:lifecycle
    kind: lifecycle
    claims:
      - claim:component-x:lifecycle:accepted:source-a
      - claim:component-x:lifecycle:withdrawn:source-b
    resolution_state: unresolved
```

MSC must not select one claim by pass order.

---

## 57. Invalid Examples

The following behaviors are nonconforming:

```text
last source processed silently wins;
random UUID defines reproducible node identity;
one file is assumed to equal one artifact;
a warning is emitted while competing claims are discarded;
a partial graph is labeled authoritative;
an imported graph is trusted because it parsed;
canonicalization removes ambiguity;
MKE is expected to repair invalid compiler semantics.
```

---

## 58. Minimum Bootstrap Conformance

The first bootstrap compiler is conforming at minimum when it can:

* consume one analyzed semantic snapshot;
* construct artifact, package, namespace, declaration, type, constraint, and placeholder nodes;
* construct contains, declares, references, depends_on, has_type, constrained_by, and conflicts_with edges;
* preserve authority and lifecycle;
* preserve source and derivation provenance;
* represent unresolved references and semantic conflicts;
* assign deterministic identities;
* emit canonical JSON;
* compute a deterministic semantic fingerprint;
* validate core graph invariants;
* reproduce the same graph through clean and equivalent incremental builds.

---

## 59. Test Matrix

| Test domain | Required demonstration |
|---|---|
| identity | Equivalent inputs produce equivalent graph-element identities |
| immutability | Finalized snapshots reject mutation |
| source independence | File rename does not change stable semantic identity |
| representation independence | Formatting changes do not alter semantic fingerprint |
| unresolved references | Partial profile preserves placeholders and blocked outputs |
| ambiguity | Every viable candidate remains represented |
| type projection | Declared, inferred, effective, unknown, deferred, and conflicting states remain distinct |
| constraints | Satisfied, violated, deferred, waived, unknown, and blocked remain distinct |
| authority | Compiler success does not elevate authority |
| lifecycle | Draft, accepted, deprecated, superseded, withdrawn, and archived remain distinct |
| provenance | Every derived fact traces to source and rule |
| evidence | Evidence and proof remain distinct |
| conflicts | Competing claims survive graph construction |
| canonicalization | Equivalent unordered inputs produce equal fingerprints |
| imports | Imported graph trust and compatibility are validated |
| incrementality | Clean and incremental fingerprints match |
| parallelism | Different scheduling produces equal fingerprints |
| redaction | Protected values do not leak |
| resource limits | Limit exhaustion produces structured partial or blocking output |
| extensions | Unknown required extensions block dependent profiles |

---

## 60. Acceptance Criteria

MSC-CORE-0008 is accepted when:

- [ ] The analyzed-semantic-state-to-MSG boundary is explicit.
- [ ] MSG is distinguished from AST, symbol tables, KIR, MKE, and publication.
- [ ] Graph, node, edge, claim, value, evidence, conflict, and provenance models are defined.
- [ ] Semantic, source, representation, node, edge, claim, and graph identities are distinguished.
- [ ] Deterministic construction requirements are complete.
- [ ] Artifact, package, namespace, containment, and ownership relationships are distinct.
- [ ] Resolved, unresolved, ambiguous, unknown, deferred, invalid, redacted, and contested semantics are represented.
- [ ] Type, constraint, invariant, authority, lifecycle, compatibility, feature, evidence, and conflict projection are defined.
- [ ] Construction phases, profiles, and barriers are defined.
- [ ] Canonicalization is bounded and cannot resolve semantic disagreement.
- [ ] Duplicate, coalescing, alias, fragment, import, and composition behavior is defined.
- [ ] Snapshot identity, fingerprints, ordering, and manifests are defined.
- [ ] Incremental and clean-build equivalence is required.
- [ ] Extension, security, resource, and redaction requirements are defined.
- [ ] Bootstrap conformance is implementable.
- [ ] MSC-CORE-0009 can define diagnostics and reproducibility without reopening the graph model.
- [ ] MSC-CORE-0010 can define KIR lowering without redefining MSG as executable IR.

---

## 61. Evolution and Compatibility

Future versions may refine the MSG ontology, claim representation, value encodings, provenance structure, profiles, canonicalization, fingerprints, indexes, and extensions.

Evolution must preserve semantic identity, graph lineage, historical interpretability, explicit schema versions, explicit migration, provenance, authority, lifecycle, and conflict preservation.

A schema migration must not silently alter semantic meaning.

---

## 62. Open Questions

1. Which structures belong in MSG-CORE versus MGO-CORE?
2. Which claim representation becomes canonical?
3. Which fingerprint algorithm is selected for bootstrap implementation?
4. Which canonical serialization is required for bootstrap exchange?
5. Which indexes are mandatory for MKE ingestion?
6. How are access-control annotations represented?
7. How are confidential hashes exposed safely?
8. Which ontology terms are fixed before self-hosting?
9. How are large external graphs referenced without eager materialization?
10. Which graph-diff primitives belong in MSC versus MKE?
11. Which historical claims should publication profiles include by default?
12. How are graph migrations represented as semantic artifacts?

These questions do not block the architecture established here.

---

## 63. Implementation Threshold Contribution

MSC-CORE-0008 establishes this threshold requirement:

```text
The bootstrap compiler must transform an analyzed semantic snapshot into a
deterministic, immutable, validated, fingerprinted partial MSG while preserving
identity, provenance, authority, lifecycle, unresolved references, constraints,
incomplete state, and conflicts.
```

Implementation must not lower directly from ad hoc compiler tables while bypassing the MSG boundary.

---

## 64. Relationship to MSC-CORE-0009

MSC-CORE-0009 must define unified diagnostic identity and stability, incremental invalidation, cache contracts, clean and incremental equivalence, reproducibility manifests, deterministic execution, and resource reporting.

MSC-CORE-0008 establishes the graph elements and invariants those mechanisms protect.

---

## 65. Relationship to MSC-CORE-0010

MSC-CORE-0010 must define selection of KIR-eligible MSG subgraphs, KIR lowering contracts, backend capability negotiation, generated-artifact provenance, and self-hosting boundaries.

MSC-CORE-0010 must not redefine MSG as KIR.

---

## 66. Final Statement

The Monad Semantic Graph is Monad's semantic compilation boundary.

It turns compiler analysis into an immutable knowledge snapshot without erasing where knowledge came from, how it was derived, what authority it has, where it applies, what remains unknown, what is deferred, what conflicts, what may be lowered, what may be persisted, what may be published, or what may be used as AI context.

A conforming compiler produces MSG through explicit, deterministic, validated construction.

---

## Status

Draft.

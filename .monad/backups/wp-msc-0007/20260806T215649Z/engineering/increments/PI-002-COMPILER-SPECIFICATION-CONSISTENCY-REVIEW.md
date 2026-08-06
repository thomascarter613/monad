---
artifact:
  id: PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW
  type: engineering.review
  namespace: monad

metadata:
  title: PI-002 Compiler Specification Consistency Review
  version: 0.1.0
  status: completed
  program_increment: PI-002
  milestone: M-002
  created: 2026-08-06
  reviewed: 2026-08-06
  reviewer: Principal Architecture Review

review_scope:
  - specifications/MSC/core/MSC-CORE-0001.md
  - specifications/MSC/core/MSC-CORE-0002.md
  - specifications/MSC/core/MSC-CORE-0003.md
  - specifications/MSC/core/MSC-CORE-0004.md
  - specifications/MSC/core/MSC-CORE-0005.md
  - specifications/MSC/core/MSC-CORE-0006.md
  - specifications/MSC/core/MSC-CORE-0007.md
  - specifications/MSC/core/MSC-CORE-0008.md
  - specifications/MSC/core/MSC-CORE-0009.md
  - specifications/MSC/core/MSC-CORE-0010.md
  - specifications/MSC/core/README.md
  - specifications/registry/specifications.yaml
  - vision/glossary.md
  - vision/architecture-map.md
  - vision/compiler-pipeline.md
  - engineering/PROJECT-STATUS.md
  - engineering/MILESTONES.md
  - engineering/work-packets/active.md

relationships:
  depends_on:
    - MSC-CORE-0001
    - MSC-CORE-0002
    - MSC-CORE-0003
    - MSC-CORE-0004
    - MSC-CORE-0005
    - MSC-CORE-0006
    - MSC-CORE-0007
    - MSC-CORE-0008
    - MSC-CORE-0009
    - MSC-CORE-0010
    - MONAD-VISION-GLOSSARY
    - MONAD-VISION-ARCHITECTURE-MAP
    - MONAD-VISION-COMPILER-PIPELINE
  enables:
    - WP-MSC-0007
    - PI-002-COMPILER-IMPLEMENTATION-THRESHOLD
    - M-003

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: review
  status: bootstrap
---

# PI-002 Compiler Specification Consistency Review

## Executive Summary

This review evaluates whether `MSC-CORE-0001` through `MSC-CORE-0010` form one coherent, implementable compiler architecture.

The series is substantively strong.

It establishes a consistent architecture for:

* artifact-oriented compilation;
* frontend and normalizer orchestration;
* canonical AST construction;
* declaration and symbol binding;
* namespace and reference resolution;
* type, constraint, authority, lifecycle, compatibility, and conflict analysis;
* Monad Semantic Graph construction;
* diagnostics, dependency tracking, invalidation, caching, and reproducibility;
* KIR lowering;
* backend generation;
* generated-artifact governance;
* staged self-hosting.

The documents repeatedly preserve the correct architectural commitments:

* artifacts are not files;
* syntax is not meaning;
* semantic identity is not source location;
* trust is not authority;
* lifecycle is not authority;
* partial knowledge remains explicit;
* conflicts are not resolved by pass order;
* MSG is canonical compiled meaning for one snapshot;
* generated artifacts remain derived projections;
* incremental compilation must preserve clean-build semantics;
* self-hosting does not exempt Monad from governance.

However, the series is not yet internally consistent enough to declare the compiler implementation threshold.

The review identifies:

```text
6 P0 blockers
12 P1 required amendments
7 P2 editorial or project-control corrections
```

The six P0 blockers are:

1. `MSC-CORE-0007` and `MSC-CORE-0008` define incompatible versions of the `SemanticAnalysisSnapshot` phase boundary.
2. `MSC-CORE-0001` places KIR between MSG and MKE, while the accepted architecture places MSG directly before MKE and treats KIR as a derived branch.
3. `MSC-CORE-0001` permits backends to consume MSG projections, while `MSC-CORE-0010` defines a backend as a governed KIR consumer.
4. `MSC-CORE-0010` calls KIR target-independent and leaves its name open, while the accepted glossary defines KIR as **Knowledge Intermediate Representation** and the architecture defines it as a target-oriented derived projection.
5. `MSC-CORE-0001` contains malformed and repeated dependency identifiers.
6. The specification registry does not yet register `MSC-CORE-0008` through `MSC-CORE-0010`, and those candidate files are not yet present on the repository default branch.

The outcome of this review is:

```text
RESULT: CONDITIONAL FAIL
IMPLEMENTATION THRESHOLD: NOT DECLARED
M-002: NOT YET COMPLETE
```

This is a reconciliation failure, not a rejection of the compiler architecture.

No redesign of the compiler is required.

A bounded amendment packet can resolve the blockers.

---

# 1. Purpose

Program Increment PI-002 completes the MSC-CORE specification series and is intended to establish the threshold for bootstrap compiler implementation.

This review determines whether:

* all ten specifications use compatible terminology;
* phase outputs satisfy downstream phase inputs;
* representation boundaries remain coherent;
* identity domains are stable;
* partial and authoritative states are compatible;
* authority and lifecycle rules do not create circular analysis;
* diagnostic and invalidation contracts are compiler-wide;
* MSG, MKE, KIR, and backend responsibilities remain distinct;
* generated-artifact behavior preserves provenance and ownership;
* self-hosting begins from a governable trust model;
* open questions are correctly classified;
* implementation may proceed without resolving architecture during coding.

This review is the formal consistency gate before the compiler implementation threshold.

---

# 2. Review Basis

## 2.1 Repository Documents

The default repository branch currently contains:

```text
MSC-CORE-0001 through MSC-CORE-0007
```

It also contains:

* the MSC-CORE series README;
* the bootstrap specification registry;
* the accepted Vision architecture;
* project-control artifacts.

## 2.2 Candidate Documents

The review also includes the complete candidate drafts produced in the current workstream:

```text
MSC-CORE-0008 — Semantic Graph Construction
MSC-CORE-0009 — Diagnostics, Incrementality, and Reproducibility
MSC-CORE-0010 — KIR Lowering, Backend Contracts, and Self-Hosting
```

At review time, these three candidates are not yet present on the repository default branch and are not yet registered in `specifications/registry/specifications.yaml`.

Their architecture is reviewed as proposed normative content.

Their repository integration is separately assessed as a release and governance requirement.

## 2.3 Authority Baseline

The review uses the frozen Vision architecture as the consistency baseline.

The controlling architecture is:

```text
MSL
  ↓
MSC
  ↓
MSG
  ↓
MKE
```

Derived paths include:

```text
MSG or persisted MKE knowledge
  ├──→ KIR
  ├──→ publication projections
  ├──→ AI context
  ├──→ search and analytics
  └──→ applications and integrations
```

KIR is canonically named:

```text
Knowledge Intermediate Representation
```

It is a derived target-oriented representation and is not the canonical semantic source of truth.

---

# 3. Review Method

The review compares the series across these dimensions:

1. terminology;
2. authority hierarchy;
3. responsibility ownership;
4. pipeline ordering;
5. phase input and output contracts;
6. representation identity;
7. artifact and semantic identity;
8. partial-state semantics;
9. authority and lifecycle;
10. profiles;
11. readiness;
12. validation barriers;
13. diagnostics;
14. dependency tracking;
15. invalidation;
16. caching;
17. reproducibility;
18. MSG construction;
19. KIR lowering;
20. backend behavior;
21. generated-artifact governance;
22. self-hosting;
23. security;
24. machine-readable document structure;
25. registry and project-control consistency.

Each issue is classified as:

| Severity | Meaning |
|---|---|
| P0 | Contradiction, phase-interface mismatch, identity failure, or governance defect that blocks the implementation threshold |
| P1 | Required amendment before the affected implementation slice is accepted |
| P2 | Editorial, registry, metadata, or project-control correction that does not change architecture |

---

# 4. Canonical Reconciled Architecture

The review establishes the following interpretation as the required reconciliation target.

## 4.1 Canonical Pipeline

```text
Compilation Invocation
    ↓
Artifact Discovery and Compilation Units
    ↓
Frontend and Surface AST
    ↓
Normalization and Canonical AST
    ↓
Declaration Collection and Symbol Binding
    ↓
Namespace, Import, Export, Alias, and Reference Resolution
    ↓
Type, Constraint, Authority, Lifecycle, Profile, Feature,
Compatibility, and Conflict Analysis
    ↓
Semantic Graph Construction
    ↓
Immutable MSG Snapshot
    ├──→ MKE Ingestion
    ├──→ KIR Lowering
    ├──→ Validation and Inspection Projections
    ├──→ Publication Projections
    └──→ AI Context and Other Semantic Projections
```

KIR continues:

```text
Eligible MSG Subgraph
    ↓
Backend-Neutral, Target-Oriented KIR
    ↓
KIR Backend
    ↓
Generated-Artifact Plan
    ↓
Preview, Apply, Verify, or Rollback
    ↓
Generated Artifacts
```

## 4.2 Canonical Responsibility Boundaries

| Component | Governing responsibility |
|---|---|
| MSL | Express engineering knowledge |
| MSC | Compile supported artifacts and construct MSG |
| MSG | Represent one immutable compiled semantic snapshot |
| MKE | Persist, version, index, query, and evolve graph snapshots |
| KIR | Represent a backend-neutral, target-oriented operational projection |
| KIR backend | Consume validated KIR and produce governed plans or outputs |
| MPE or publication projection | Produce publication models and rendered views |
| MAE or AI-context projection | Produce authority-aware semantic context |
| Generated artifact | Remain a derived representation with ownership and provenance |

## 4.3 Backend Taxonomy

The term `backend` must be typed by input contract.

### Compiler Pass

Consumes a compiler representation and produces another compiler representation or analysis result.

### MSG Consumer

Consumes MSG or persisted MKE knowledge for:

* ingestion;
* query;
* validation;
* publication;
* AI context;
* analysis;
* graph export.

An MSG consumer is not automatically a KIR backend.

### KIR Backend

Consumes validated KIR and produces:

* a generation plan;
* files;
* schemas;
* packages;
* migrations;
* validation evidence;
* deployment or publication effects when authorized.

### External Tool

Consumes a declared input under a tool contract and returns output or evidence.

This taxonomy resolves the current backend contradiction without changing the underlying architecture.

---

# 5. Review Matrix

## 5.1 Specification-Level Review

| Specification | Primary responsibility | Result |
|---|---|---|
| MSC-CORE-0001 | Compiler vision and architecture | FAIL — P0 amendments required |
| MSC-CORE-0002 | Pipeline and phase model | CONDITIONAL PASS |
| MSC-CORE-0003 | Artifact discovery and compilation units | PASS |
| MSC-CORE-0004 | Frontend and normalizer orchestration | PASS |
| MSC-CORE-0005 | Declaration collection and symbol binding | PASS |
| MSC-CORE-0006 | Namespace, import, and reference resolution | CONDITIONAL PASS |
| MSC-CORE-0007 | Type, constraint, and semantic analysis | FAIL — phase-interface amendment required |
| MSC-CORE-0008 | Semantic graph construction | FAIL — phase-interface amendment required |
| MSC-CORE-0009 | Diagnostics, incrementality, and reproducibility | CONDITIONAL PASS |
| MSC-CORE-0010 | KIR lowering, backends, and self-hosting | FAIL — KIR and backend amendments required |

## 5.2 Cross-Cutting Review

| Area | Result |
|---|---|
| Artifact-oriented compilation | PASS |
| Source, surface AST, canonical AST separation | PASS |
| Declaration and symbol separation | PASS |
| Namespace and reference model | PASS WITH CLARIFICATION |
| Type and constraint model | PASS |
| Authority and lifecycle separation | PASS WITH CLARIFICATION |
| Partial and contested semantics | PASS |
| Provenance and evidence | PASS |
| MSG construction principles | PASS |
| MSG input contract | FAIL |
| MSG/MKE/KIR dependency direction | FAIL |
| KIR definition | FAIL |
| Backend input boundary | FAIL |
| Generated-artifact governance | PASS |
| Diagnostics architecture | PASS WITH AMENDMENT |
| Incremental correctness | PASS |
| Reproducibility architecture | PASS |
| Self-hosting model | CONDITIONAL PASS |
| Machine-readable source shape | CONDITIONAL FAIL |
| Registry completeness | FAIL |
| Implementation readiness | FAIL |

---

# 6. Confirmed Consistent Architecture

The following areas are coherent across the series.

## 6.1 Artifacts Are Not Files

`MSC-CORE-0003` consistently defines artifacts as logical compiler inputs independent from physical representations and locations.

This agrees with:

* declaration ownership;
* MSG artifact membership;
* generated-artifact identity;
* source-move stability;
* self-hosting provenance.

No contradiction was found.

## 6.2 Representation Boundaries

The series consistently distinguishes:

```text
source
surface AST
canonical AST
bound declaration state
resolved reference state
analyzed semantic state
MSG
KIR
backend output
generated artifact
```

The remaining problems concern the dependency direction and input contract between these representations, not their existence.

## 6.3 Identity Domains

The series consistently distinguishes:

* artifact identity;
* source identity;
* representation identity;
* canonical-node identity;
* declaration identity;
* semantic identity;
* symbol identity;
* reference identity;
* graph identity;
* KIR identity;
* generated-artifact identity.

No specification treats a filename, local path, display name, map address, or random UUID as canonical semantic identity.

## 6.4 Provenance

Every major phase preserves:

* source lineage;
* transformation lineage;
* derivation;
* compiler rule versions;
* tool and backend identity;
* evidence;
* output lineage.

The generated-artifact and self-hosting provenance models are especially strong.

## 6.5 Trust, Authority, and Lifecycle

The series consistently preserves these distinctions:

```text
trust != authority
authority != correctness
authority != confidence
authority != lifecycle
lifecycle != visibility
visibility != access control
```

Generated and AI-produced knowledge does not gain authority automatically.

## 6.6 Partial Knowledge

The series consistently permits:

* incomplete documents;
* provisional identities;
* unresolved references;
* ambiguous candidates;
* unknown types;
* deferred constraints;
* contested authority;
* draft lifecycle;
* semantic conflicts;
* partial MSG;
* partial KIR.

Partial results must identify blocked outputs and unavailable guarantees.

## 6.7 Conflict Preservation

The series consistently prohibits:

* source-order precedence;
* provider-order precedence;
* pass-order conflict resolution;
* last-write-wins identity resolution;
* arbitrary alias selection;
* silent conflict flattening.

Semantic conflicts remain first-class knowledge.

## 6.8 Incremental Correctness

`MSC-CORE-0002`, `MSC-CORE-0003` through `MSC-CORE-0008`, and `MSC-CORE-0009` converge on the same invariant:

> Incrementality is an optimization over clean compilation and must preserve semantic equivalence.

The clean/incremental fingerprint requirement is coherent.

## 6.9 Security

The specifications consistently address:

* untrusted inputs;
* parser and extension isolation;
* resource limits;
* cache poisoning;
* identity spoofing;
* authority escalation;
* redaction leakage;
* unsafe filesystem mutation;
* external-tool trust;
* self-hosting trust attacks.

No specification authorizes unrestricted extension or backend execution.

## 6.10 Self-Hosting Governance

`MSC-CORE-0010` correctly treats self-hosting as staged and governed.

It requires:

* an independently implemented bootstrap compiler;
* explicit seed artifacts;
* complete provenance;
* equivalence comparison;
* reproducible builds;
* security review;
* human-authorized promotion;
* rollback;
* historical preservation.

A candidate compiler cannot promote itself.

---

# 7. P0 Blocking Findings

## P0-001 — `MSC-CORE-0007` to `MSC-CORE-0008` Phase Contract Mismatch

### Affected Artifacts

```text
specifications/MSC/core/MSC-CORE-0007.md
specifications/MSC/core/MSC-CORE-0008.md
```

### Conflict

`MSC-CORE-0007` defines `SemanticAnalysisSnapshot` with fields such as:

```text
snapshot_id
compilation_unit
input_snapshot_fingerprints
type_environment
type_results
constraint_graph
constraint_results
authority_results
lifecycle_results
profile_results
feature_results
compatibility_results
semantic_conflicts
readiness_results
diagnostics
pass_versions
provenance
fingerprint
```

`MSC-CORE-0008` states that MSG construction consumes a `SemanticAnalysisSnapshot` containing additional fields:

```text
artifact_set
canonical_ast_snapshot
declarations
symbols
namespaces
imports
exports
aliases
resolved_references
unresolved_references
ambiguous_references
constraints
invariants
extension_set
```

The two documents use the same type name for incompatible structures.

### Impact

An implementation cannot determine whether:

* `SemanticAnalysisSnapshot` owns all preceding compiler state;
* preceding snapshots are embedded;
* preceding snapshots are referenced;
* MSG construction receives a bundle;
* MSG construction reaches backward into mutable compiler state.

This violates the phase-barrier model of `MSC-CORE-0002`.

### Required Resolution

Adopt one explicit input contract:

```text
SemanticGraphConstructionInput
├── compilation_unit_snapshot
├── canonical_ast_snapshot
├── bound_declaration_snapshot
├── resolved_reference_snapshot
├── semantic_analysis_snapshot
├── construction_profile
├── extension_set
└── fingerprints
```

The recommended design is a bundle of immutable snapshot references.

Do not duplicate every preceding structure inside `SemanticAnalysisSnapshot`.

### Required Amendments

* Expand `MSC-CORE-0007` to define the output boundary explicitly.
* Change `MSC-CORE-0008` to consume `SemanticGraphConstructionInput`.
* Add fingerprint and schema compatibility requirements for every referenced snapshot.
* Add one machine-spec conformance fixture for the boundary.

### Severity

```text
P0
```

---

## P0-002 — Canonical MSG, KIR, and MKE Pipeline Contradiction

### Affected Artifacts

```text
MSC-CORE-0001
MSC-CORE-0008
MSC-CORE-0010
vision/architecture-map.md
vision/compiler-pipeline.md
engineering/PROJECT-STATUS.md
```

### Conflict

`MSC-CORE-0001` contains a primary architectural sequence equivalent to:

```text
Engineering Sources
    ↓
MSC
    ↓
MSG
    ↓
KIR
    ↓
MKE and Downstream Engines
```

The frozen architecture defines:

```text
MSL
    ↓
MSC
    ↓
MSG
    ↓
MKE
```

and treats KIR as a derived path from MSG or persisted MKE knowledge.

`MSC-CORE-0008` and `MSC-CORE-0010` also treat KIR lowering and MKE ingestion as separate consumers of MSG.

### Impact

The current text leaves unclear whether:

* MKE's canonical ingest format is MSG or KIR;
* KIR is mandatory before persistence;
* MKE stores semantic knowledge or operational projections;
* KIR can redefine the persisted graph;
* compilation without KIR can be persisted.

This crosses a frozen subsystem boundary.

### Required Resolution

The canonical architecture is:

```text
MSG
├──→ MKE ingestion
└──→ KIR lowering
```

MKE may also persist KIR as derived knowledge, but KIR is not the mandatory or canonical path into MKE.

### Required Amendments

Amend `MSC-CORE-0001`:

* the architectural-position diagram;
* the compiler-output discussion where needed;
* the MKE boundary;
* the conceptual model;
* machine-spec representation flow if it implies serial MSG→KIR→MKE ownership.

### Severity

```text
P0
```

---

## P0-003 — Backend Input Boundary Contradiction

### Affected Artifacts

```text
MSC-CORE-0001
MSC-CORE-0002
MSC-CORE-0010
vision/glossary.md
vision/architecture-map.md
```

### Conflict

`MSC-CORE-0001` defines backends broadly and requires backends to declare accepted:

```text
KIR versions
MSG projections
profiles
effects
outputs
```

It also groups:

* generators;
* validators;
* renderers;
* analyzers;
* target-specific backends.

`MSC-CORE-0010` defines:

> A backend is a governed KIR consumer.

and prohibits backends from reinterpreting arbitrary source or MSG.

The glossary uses `backend` more broadly as a component consuming an analyzed representation.

### Impact

An implementation cannot determine whether:

* publication rendering is a KIR backend;
* an MSG validator is a backend or compiler pass;
* an analyzer may consume MSG directly;
* a backend may bypass KIR;
* backend capability negotiation happens against MSG or KIR;
* backend cache keys must include KIR.

### Required Resolution

Introduce explicit backend classes:

```text
compiler pass
MSG consumer or projection engine
KIR backend
external tool
```

Within `MSC-CORE-0010`, use the term:

```text
KIR backend
```

unless the broader backend category is explicitly intended.

KIR generation backends must consume validated KIR.

MSG projection engines may consume MSG or persisted MKE knowledge through separate contracts.

### Required Amendments

* Amend `MSC-CORE-0001` backend registry and backend boundary.
* Amend `MSC-CORE-0010` terminology to `KIR backend`.
* Add a responsibility table.
* Add a conformance test proving a KIR backend cannot bypass KIR.

### Severity

```text
P0
```

---

## P0-004 — KIR Canonical Definition Contradiction

### Affected Artifacts

```text
MSC-CORE-0001
MSC-CORE-0010
vision/glossary.md
vision/architecture-map.md
specifications/registry/specifications.yaml
```

### Conflict A — Canonical Name

The accepted glossary and registry define:

```text
Knowledge Intermediate Representation
```

with abbreviation:

```text
KIR
```

`MSC-CORE-0010` lists as an open question:

> What exact expansion and canonical name will KIR use in all future artifacts?

That question has already been answered by a higher-level canonical terminology artifact.

### Conflict B — Target Independence

`MSC-CORE-0010` repeatedly calls KIR:

```text
target-independent
```

The same document also defines:

* target-specific eligibility;
* a target manifest;
* target requirements;
* target-aware types;
* target-specific closure;
* target-specific capability negotiation.

The architecture map defines KIR as:

```text
lowered target-oriented projections
```

### Impact

The current wording makes it unclear whether one KIR snapshot:

* is universal across every target;
* is scoped to a target family;
* is only backend-independent;
* may contain target constraints;
* can be reused across targets.

### Required Resolution

The canonical definition is:

> KIR, the Knowledge Intermediate Representation, is a backend-neutral, target-oriented operational projection derived from an eligible MSG subgraph.

This permits:

* one target or target family per KIR snapshot;
* several backend implementations for that target;
* backend-independent KIR semantics;
* target-specific eligibility and requirements.

### Required Amendments

* Remove the KIR naming open question from `MSC-CORE-0010`.
* Replace unqualified `target-independent` with `backend-neutral, target-oriented`.
* Define whether a KIR snapshot has exactly one target or one compatible target family.
* Update machine-spec and conformance wording.
* Preserve an ADR requirement for any future KIR rename.

### Severity

```text
P0
```

---

## P0-005 — Broken Relationship Identities in `MSC-CORE-0001`

### Affected Artifact

```text
specifications/MSC/core/MSC-CORE-0001.md
```

### Conflict

The frontmatter contains repeated malformed identifiers such as:

```text
MSL-CORE-000
MKE-CORE-000
```

The intended exact targets are not machine-resolvable.

The specification body and later MSC documents require stable exact artifact identity.

### Impact

The dependency graph cannot determine:

* which MSL specifications are required;
* which MKE specifications are referenced;
* whether dependencies exist;
* whether registry closure is complete.

A machine-compiled specification cannot preserve dependency correctness with malformed targets.

### Required Resolution

Replace every incomplete identifier with the exact intended artifact ID.

The apparent sequence suggests missing numbered installments, but the correction must be verified against the specification registry rather than inferred only from position.

### Required Amendments

* Correct all malformed identifiers.
* Remove duplicates.
* Validate every relationship target.
* Add a registry test prohibiting incomplete numbered identities.

### Severity

```text
P0
```

---

## P0-006 — MSC-CORE Registry and Repository State Are Incomplete

### Affected Artifacts

```text
specifications/registry/specifications.yaml
specifications/MSC/core/README.md
specifications/MSC/core/MSC-CORE-0008.md
specifications/MSC/core/MSC-CORE-0009.md
specifications/MSC/core/MSC-CORE-0010.md
```

### Conflict

The registry:

* marks `MSC-CORE` active;
* registers artifacts only through `MSC-CORE-0007`;
* does not register `MSC-CORE-0008`, `0009`, or `0010`;
* retains `MSC-CORE-0003` in `planned_artifacts` despite registering it as an existing artifact.

The repository default branch does not yet contain the three candidate documents.

### Impact

The project cannot truthfully claim:

```text
MSC-CORE-0001 through MSC-CORE-0010 accepted
```

while the canonical bootstrap registry and repository do not contain the final three artifacts.

### Required Resolution

Before re-review:

1. install `MSC-CORE-0008` through `MSC-CORE-0010`;
2. register them;
3. remove the stale planned entry for `MSC-CORE-0003`;
4. update the series README;
5. validate registry uniqueness and path existence;
6. record candidate-to-canonical promotion.

### Severity

```text
P0
```

---

# 8. P1 Required Amendments

## P1-001 — Frontmatter and Closing-Delimiter Shape Divergence

`MSC-CORE-0002` through `MSC-CORE-0007` use a flat bootstrap header shape beneath empty keys such as:

```yaml
artifact:
id: ...
```

and close metadata with long hyphen delimiters rather than the standard:

```text
---
```

`MSC-CORE-0001` and candidate `0008` through `0010` use nested frontmatter.

The project must either:

* normalize `0002` through `0007` to the canonical nested shape; or
* formally specify a legacy bootstrap compatibility grammar and canonical normalization result.

The publication compatibility layer proves the corpus can be projected, but projection tolerance is not a substitute for a compiler source contract.

---

## P1-002 — Validation Must Be Defined as Repeated Barriers

The documents use both:

* one `Validation` phase family;
* representation-specific validation.

The reconciled model should define:

```text
invocation validation
source validation
surface AST validation
canonicalization barrier
binding barrier
resolution barrier
semantic-analysis barrier
MSG validation
KIR validation
backend-output verification
cross-representation conformance
```

`Validation` is a cross-cutting phase family, not one single pass after MSG.

Update `MSC-CORE-0001` and `MSC-CORE-0002` to make this explicit.

---

## P1-003 — Profile Taxonomy and Precedence

The series defines:

* compilation profile;
* frontend or normalization profile;
* semantic profile;
* MSG construction profile;
* lowering profile;
* backend requirements;
* publication profile;
* AI-context profile.

The relationship among these profiles is not yet explicit.

Define:

```text
CompilationProfile
├── discovery_policy
├── frontend_policy
├── normalization_policy
├── semantic_analysis_profile
├── msg_construction_profile
├── lowering_profile
├── backend_policy
├── diagnostic_policy
└── reproducibility_policy
```

Define authority-aware precedence and conflict behavior.

---

## P1-004 — Readiness State Vocabulary Is Untyped

The series uses overlapping readiness vocabularies:

```text
validated
authoritative
msg_ready
msg_valid
kir_ready
kir_eligible
backend_ready
backend_eligible
backend_negotiable
plan_ready
apply_ready
```

These are not necessarily contradictory, but they are insufficiently typed.

Define distinct state types:

```text
SemanticReadiness
MSGReadiness
KIRReadiness
BackendReadiness
GeneratedArtifactReadiness
```

Provide a transition and mapping table.

Do not use a single unqualified `backend_ready` value across several representations.

---

## P1-005 — Preliminary Authority and Lifecycle Filtering Must Not Create Circular Resolution

`MSC-CORE-0006` filters reference candidates using authority and lifecycle requirements.

`MSC-CORE-0007` computes effective authority and lifecycle using imports, fragments, governance rules, adoption evidence, and semantic context.

Clarify:

* `MSC-CORE-0006` may use declared or preliminary authority and lifecycle for candidate admissibility;
* rejected candidates remain preserved;
* `MSC-CORE-0007` computes effective authority and lifecycle;
* a changed effective result invalidates dependent reference and semantic results where required;
* the system uses bounded revalidation or a declared fixed-point group rather than hidden circular evaluation.

---

## P1-006 — Diagnostic Code Namespace and Migration

Earlier documents use compact numeric codes such as:

```text
MSC0101
```

Later documents use structured codes such as:

```text
MSC-MSG-INPUT-001
MSC-DIAG-001
MSC-KIR-INPUT-001
```

`MSC-CORE-0009` requires stable unique codes but does not reconcile the existing code systems.

Define:

* the canonical code grammar;
* whether legacy codes remain canonical;
* alias and migration behavior;
* registry uniqueness;
* versioning rules.

Do not renumber published codes without a migration record.

---

## P1-007 — Manifest Hierarchy

The series defines:

* compilation manifest;
* compilation trace;
* reproducibility manifest;
* graph-construction manifest;
* lowering manifest;
* generated-artifact plan;
* generated-artifact manifest;
* self-hosting provenance.

Define their containment and identity relationships.

Recommended hierarchy:

```text
CompilationManifest
├── ReproducibilityManifest
├── PhaseRecords
├── DiagnosticSet
├── MSG Construction Manifest
├── Lowering Manifest
├── Backend Execution Record
└── Generated Artifact Manifest
```

The exact serialization may vary, but ownership must not.

---

## P1-008 — KIR Must Not Own Backend-Specific Generation Plans

`MSC-CORE-0001` states that KIR may contain generation plans.

`MSC-CORE-0010` correctly defines the generated-artifact plan as backend output.

Clarify:

* KIR may contain generation intent, operations, resources, effects, constraints, and target requirements;
* the backend creates the backend-specific generated-artifact plan;
* plan paths, tool invocations, overwrite operations, and rollback steps do not belong to generic KIR unless represented as abstract operations.

---

## P1-009 — Backend IR and Optimization Ownership

`MSC-CORE-0001` and `MSC-CORE-0002` include:

```text
KIR
↓
Optimization
↓
Backend IR
↓
Backend
```

`MSC-CORE-0010` does not define the ownership of backend IR or optimization.

Classify:

* canonical KIR optimization passes governed by KIR contracts;
* backend-internal IR, which is noncanonical and backend-owned;
* target adaptation, which must preserve KIR provenance;
* optimization effects on fingerprints and diagnostics.

This can be delegated to KIR-CORE, but the boundary must be explicit.

---

## P1-010 — Bootstrap Serialization and Minimum Schema Decisions

The architecture is sufficient to design implementation work packets, but the first semantic implementation slice still requires explicit bootstrap choices for:

* canonical AST serialization or in-memory schema;
* MSG bootstrap schema;
* KIR bootstrap schema;
* canonical JSON ordering;
* fingerprint algorithm;
* minimum KIR types;
* minimum KIR operations;
* source-map representation;
* diagnostic JSON schema.

These are not reasons to redesign MSC.

They are required implementation-threshold inputs.

Create one accepted bootstrap profile artifact or implementation specification before coding semantic serialization.

---

## P1-011 — ADR-0007 Dependency Metadata

`MSC-CORE-0003` onward explicitly depend on ADR-0007, which establishes artifact-oriented compilation.

`MSC-CORE-0001` and `MSC-CORE-0002` define the same architecture but do not list ADR-0007.

Update dependency metadata unless a documented authority reason excludes it.

---

## P1-012 — MSG Must Not Be Described Only as Resolved Knowledge

`MSC-CORE-0001` calls MSG the principal resolved semantic representation.

Later documents correctly allow MSG to contain:

* unresolved optional references;
* placeholders;
* ambiguity;
* unknown types;
* deferred constraints;
* conflicts;
* contested authority;
* invalid recovery elements in partial profiles.

Amend the wording to:

> MSG is the principal compiled semantic representation, including explicit resolved, unresolved, partial, historical, deferred, and contested state where the active profile permits it.

---

# 9. P2 Corrections

## P2-001 — Series README Status

After integration and acceptance, update the MSC-CORE README from planned titles to lifecycle-aware status for all ten artifacts.

## P2-002 — Project Status

Update `engineering/PROJECT-STATUS.md` only after the P0 amendments and re-review.

Do not mark M-002 complete before then.

## P2-003 — Active Work Queue

Replace the `MSC-CORE-0008` through `0010` drafting sequence with:

```text
MSC-CORE reconciliation amendments
re-review
implementation-threshold declaration
bootstrap work packets
```

## P2-004 — Registry Status

After acceptance:

```yaml
series:
  id: MSC-CORE
  status: complete
```

must be accompanied by artifact registration and validation evidence.

## P2-005 — Open-Question Cleanup

Remove questions already answered by accepted artifacts.

Classify every remaining open question by required milestone.

## P2-006 — Machine-Spec Shape

Align machine-spec fields across the ten documents:

* `id`;
* `version`;
* `status`;
* input schemas;
* output schemas;
* invariants;
* diagnostic namespace;
* conformance profile.

## P2-007 — Review Artifact Terminology

Use one canonical title:

```text
PI-002 Compiler Specification Consistency Review
```

and one canonical implementation-threshold artifact name.

---

# 10. Required File-Level Amendments

## 10.1 `MSC-CORE-0001`

Required:

* repair malformed dependencies;
* add ADR-0007 dependency where appropriate;
* correct MSG→MKE and MSG→KIR branching;
* type backend categories;
* remove backend permission to bypass KIR;
* clarify partial MSG;
* move backend-specific generation plans out of KIR;
* align KIR definition with the glossary.

## 10.2 `MSC-CORE-0002`

Required:

* define validation as repeated barriers;
* map generic representation readiness to typed readiness;
* distinguish KIR backend phases from MSG projection consumers;
* adopt diagnostic-code migration policy by reference to `MSC-CORE-0009`.

## 10.3 `MSC-CORE-0003`

No architectural amendment is required.

Metadata normalization and registry integration remain applicable.

## 10.4 `MSC-CORE-0004`

No architectural amendment is required.

Metadata normalization remains applicable.

## 10.5 `MSC-CORE-0005`

No architectural amendment is required.

Metadata normalization remains applicable.

## 10.6 `MSC-CORE-0006`

Required:

* define preliminary authority and lifecycle filtering;
* define revalidation after effective semantic analysis;
* prevent circular hidden resolution.

## 10.7 `MSC-CORE-0007`

Required:

* preserve the current `SemanticAnalysisSnapshot`;
* add references to preceding snapshots or define a graph-construction input bundle;
* map semantic readiness to MSG and KIR readiness;
* clarify semantic feature negotiation versus backend capability negotiation.

## 10.8 `MSC-CORE-0008`

Required:

* replace the overloaded `SemanticAnalysisSnapshot` input with `SemanticGraphConstructionInput`;
* align readiness terminology;
* preserve MSG→MKE and MSG→KIR branching.

## 10.9 `MSC-CORE-0009`

Required:

* define diagnostic-code registry compatibility;
* define manifest hierarchy;
* map invalidation rules to the graph-construction input bundle;
* preserve stable diagnostics across the amended boundaries.

## 10.10 `MSC-CORE-0010`

Required:

* affirm KIR as Knowledge Intermediate Representation;
* define KIR as backend-neutral and target-oriented;
* use `KIR backend` as the scoped term;
* separate abstract KIR operations from backend-specific plans;
* classify bootstrap serialization questions;
* remove the already-resolved KIR naming question;
* align threshold language with this review.

---

# 11. Open-Question Classification

## 11.1 Already Resolved

| Question | Resolution |
|---|---|
| What does KIR stand for? | Knowledge Intermediate Representation |
| Is KIR canonical semantic truth? | No; MSG is canonical compiled meaning |
| Does MKE require KIR before ingestion? | No; MKE ingests MSG |
| Can a candidate compiler promote itself? | No |

## 11.2 Blocking Before Bootstrap Semantic Implementation

| Question | Required before |
|---|---|
| Which canonical AST bootstrap schema is implemented? | canonical AST implementation |
| Which MSG bootstrap schema and serialization are implemented? | MSG construction |
| Which KIR bootstrap schema and serialization are implemented? | KIR lowering |
| Which minimum KIR types and operations are supported? | first KIR backend |
| Which fingerprint algorithm and canonical encoding are used? | reproducibility verification |
| Which diagnostic JSON schema is canonical? | stable machine diagnostics |

## 11.3 Blocking Before Effectful Backend Apply

| Question | Required before |
|---|---|
| Which filesystem mutation strategy is used? | apply mode |
| Which rollback mechanism is used? | apply mode |
| Which formatter and package-manager contracts are permitted? | corresponding tool effects |
| Which sandbox protects third-party backends? | third-party effectful backend execution |

## 11.4 Blocking Before Self-Hosting Promotion

| Question | Required before |
|---|---|
| Which equivalence classes are mandatory? | candidate promotion |
| Which diverse toolchain verifies trust? | trusted promotion |
| Which seed artifacts are accepted? | trusted self-hosting |
| How are backend manifests signed or attested? | distributed or externally trusted backend use |
| Which compiler components remain human-maintained? | mature self-hosting governance |

## 11.5 Nonblocking Implementation Choices

The following may be selected by implementation work packets without changing architecture:

* Stage 0 implementation language;
* first low-risk generated artifact;
* internal data structures;
* concurrency runtime;
* local cache storage library;
* CLI framework;
* test framework.

---

# 12. Required Reconciliation Work Packet

Create:

```text
engineering/work-packets/WP-MSC-0007.md
```

Recommended title:

```text
Reconcile MSC-CORE Phase, Representation, and Backend Contracts
```

The packet should:

1. apply the six P0 corrections;
2. apply the P1 amendments required for threshold declaration;
3. normalize source metadata or formalize legacy compatibility;
4. install and register `MSC-CORE-0008` through `0010`;
5. regenerate publication projections;
6. run content validation;
7. perform a second consistency review;
8. produce an implementation-threshold declaration only after the review passes.

---

# 13. Re-Review Acceptance Criteria

The MSC-CORE consistency review may pass only when:

- [ ] `MSC-CORE-0007` and `MSC-CORE-0008` share one exact phase input/output contract.
- [ ] The canonical pipeline places MSG before MKE and branches KIR from MSG or persisted MKE knowledge.
- [ ] KIR is canonically named Knowledge Intermediate Representation.
- [ ] KIR is defined as backend-neutral and target-oriented.
- [ ] KIR backend and MSG consumer responsibilities are distinct.
- [ ] `MSC-CORE-0001` contains no malformed relationship identity.
- [ ] `MSC-CORE-0008` through `0010` exist in the repository.
- [ ] `MSC-CORE-0008` through `0010` exist in the specification registry.
- [ ] The stale planned `MSC-CORE-0003` registry entry is removed.
- [ ] Validation barriers are explicit.
- [ ] Profile hierarchy is explicit.
- [ ] Readiness states are typed and mapped.
- [ ] Authority and lifecycle candidate filtering cannot create hidden circular analysis.
- [ ] Diagnostic codes have a compatibility policy.
- [ ] Manifest ownership is explicit.
- [ ] Bootstrap schemas and serialization choices are assigned to accepted implementation work.
- [ ] No unresolved P0 contradiction remains.
- [ ] All ten MSC-CORE artifacts are eligible to move from draft to review or accepted status under governance.

---

# 14. Implementation Threshold Decision

## Assessment

The compiler architecture is mature enough to reconcile.

It is not yet mature enough to freeze as an implementation contract.

The current contradictions affect:

* phase interfaces;
* dependency direction;
* canonical terminology;
* backend ownership;
* machine-resolvable dependencies;
* registry completeness.

These are architecture and contract issues, not implementation details.

## Decision

```text
DO NOT DECLARE THE COMPILER IMPLEMENTATION THRESHOLD YET.
```

## Authorized Work

The following work is authorized:

* specification reconciliation;
* metadata normalization;
* registry repair;
* conformance fixture design;
* bootstrap profile definition;
* implementation work-packet planning that remains explicitly provisional.

## Work Not Yet Authorized as Threshold Implementation

Do not claim conforming bootstrap implementation of:

* MSG construction;
* KIR lowering;
* KIR backend generation;
* self-hosting promotion;

until the P0 findings are resolved and the review passes.

---

# 15. M-002 Exit Assessment

| Requirement | Status |
|---|---|
| MSC-CORE-0008 drafted | PASS |
| MSC-CORE-0009 drafted | PASS |
| MSC-CORE-0010 drafted | PASS |
| MSG construction sufficiently explored | PASS |
| Diagnostics and incrementality sufficiently explored | PASS |
| KIR and backend boundary sufficiently explored | PASS |
| Cross-document terminology consistent | FAIL |
| Phase boundaries consistent | FAIL |
| Registry complete | FAIL |
| No P0 contradiction | FAIL |
| Compiler implementation threshold declared | BLOCKED |
| M-002 complete | NO |

---

# 16. Recommendation

The review recommends:

```text
RECONCILE, THEN RE-REVIEW
```

Do not discard or redesign the series.

The existing documents provide the correct architecture in nearly every major area.

Resolve the bounded contradictions, register the final artifacts, and perform a short second review focused on the six P0 findings.

---

# 17. Exit Decision

**Recommendation**

```text
CONDITIONAL FAIL
```

**PI-002 Status**

```text
ACTIVE
```

**M-002 Status**

```text
BLOCKED ON RECONCILIATION
```

**Implementation Threshold**

```text
NOT DECLARED
```

**Next Work Packet**

```text
WP-MSC-0007 — Reconcile MSC-CORE Phase, Representation, and Backend Contracts
```

---

# 18. Completion Record

**Reviewer**

Principal Architecture Review

**Review Date**

2026-08-06

**Reviewed Series**

MSC-CORE-0001 through MSC-CORE-0010

**Outcome**

Conditional Fail

**P0 Findings**

6

**P1 Findings**

12

**P2 Findings**

7

**Required Next Action**

Apply the reconciliation amendments and repeat the consistency gate.

---

# 19. Final Statement

The MSC-CORE series has reached architectural depth, but not yet architectural closure.

Its central design is coherent:

```text
Artifacts become canonical compiler representations.
Canonical representations become analyzed semantics.
Analyzed semantics become MSG.
MSG may be persisted in MKE or lowered into KIR.
KIR backends produce governed generated artifacts.
Every transition preserves identity, provenance, authority, lifecycle, diagnostics, and reproducibility.
```

The remaining work is not to invent another compiler architecture.

It is to make every document state that same architecture without contradiction.

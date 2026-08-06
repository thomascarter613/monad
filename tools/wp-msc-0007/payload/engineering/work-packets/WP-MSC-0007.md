---
artifact:
  id: WP-MSC-0007
  type: engineering.work-packet
  namespace: monad

metadata:
  title: Reconcile MSC-CORE Phase, Representation, and Backend Contracts
  version: 0.1.0
  status: ready
  priority: P0
  created: 2026-08-06
  updated: 2026-08-06
  owner: Monad Architecture Team
  program_increment: PI-002
  milestone: M-002
  execution_mode: human-supervised
  implementation_required: false
  implementation_permitted: false
  planning_complete: true
  execution_complete: false

relationships:
  depends_on:
    - PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW
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
    - MONAD-VISION-CONSTITUTION
  blocks:
    - PI-002-COMPILER-IMPLEMENTATION-THRESHOLD
    - M-002
    - WP-MSC-0001-ACTIVATION
    - WP-MSC-0002-ACTIVATION
    - WP-MSC-0003-ACTIVATION
    - WP-MSC-0004-ACTIVATION
    - WP-MSC-0005-ACTIVATION
    - WP-MSC-0006-ACTIVATION
  enables:
    - PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02
    - PI-002-COMPILER-IMPLEMENTATION-THRESHOLD
    - M-003-COMPILER-BOOTSTRAP
  supersedes: []
  superseded_by: []

produces:
  required:
    - specifications/MSC/core/MSC-CORE-0001.md
    - specifications/MSC/core/MSC-CORE-0002.md
    - specifications/MSC/core/MSC-CORE-0006.md
    - specifications/MSC/core/MSC-CORE-0007.md
    - specifications/MSC/core/MSC-CORE-0008.md
    - specifications/MSC/core/MSC-CORE-0009.md
    - specifications/MSC/core/MSC-CORE-0010.md
    - specifications/MSC/core/README.md
    - specifications/registry/specifications.yaml
    - engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02.md
    - engineering/reports/WP-MSC-0007-execution-report.md
  conditional:
    - engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md
    - engineering/PROJECT-STATUS.md
    - engineering/MILESTONES.md
    - engineering/increments/PI-002.md
    - engineering/work-packets/active.md
    - engineering/work-packets/backlog.md

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: work-packet
  status: bootstrap
---

# WP-MSC-0007 — Reconcile MSC-CORE Phase, Representation, and Backend Contracts

## 1. Status

| Field | Value |
| --- | --- |
| Work packet | **WP-MSC-0007** |
| Title | **Reconcile MSC-CORE Phase, Representation, and Backend Contracts** |
| Program increment | **PI-002 — Semantic Compiler Foundation** |
| Milestone | **M-002 — Compiler Specification Complete** |
| Priority | **P0** |
| Planning status | **Complete** |
| Execution status | **Ready; not started** |
| Implementation permitted | **No** |
| Primary work type | **Normative specification reconciliation** |
| Governing review | **PI-002 Compiler Specification Consistency Review** |
| Review outcome being remediated | **Conditional Fail** |
| P0 findings | **6** |
| P1 amendments | **12** |
| P2 corrections | **7** |
| Threshold state | **Blocked until re-review passes** |

Creation of this work packet completes planning only.

It does not resolve any finding, amend any specification, register `MSC-CORE-0008` through `MSC-CORE-0010`, declare the compiler implementation threshold, activate WP-MSC-0001 through WP-MSC-0006, implement MSG or KIR, or complete M-002.

Execution evidence is required before this packet may move from `ready` to `verification` or `completed`.

---

## 2. Objective

Reconcile `MSC-CORE-0001` through `MSC-CORE-0010` so the series defines one internally consistent, machine-resolvable, implementation-ready compiler contract.

The completed series must state one coherent architecture:

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

KIR processing must continue through a distinct path:

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

This packet must end with a second consistency review. Only a passing second review may authorize the compiler implementation-threshold declaration.

---

## 3. Problem Statement

The MSC-CORE series has reached architectural depth but not architectural closure.

The first combined consistency review found six P0 blockers:

1. `MSC-CORE-0007` and `MSC-CORE-0008` define incompatible `SemanticAnalysisSnapshot` phase contracts.
2. `MSC-CORE-0001` implies `MSG → KIR → MKE`, contradicting the accepted `MSG → MKE` and `MSG → KIR` branch.
3. `MSC-CORE-0001` permits broad MSG-consuming backends while `MSC-CORE-0010` defines every backend as a KIR consumer.
4. `MSC-CORE-0010` leaves KIR's name open and calls KIR target-independent despite accepted target-oriented terminology.
5. `MSC-CORE-0001` contains malformed and repeated relationship identities.
6. The registry and repository do not yet integrate `MSC-CORE-0008` through `MSC-CORE-0010`.

The review also identified twelve P1 amendments and seven P2 corrections concerning document shape, validation barriers, profiles, readiness, authority and lifecycle revalidation, diagnostics, manifests, generation-plan ownership, optimization, bootstrap decisions, dependency metadata, terminology, the registry, and project controls.

Implementation cannot safely begin while these contracts remain ambiguous.

This packet does not create a new compiler architecture. It makes every governing artifact state the same accepted architecture.

---

## 4. Governing Review Decision

The governing review concluded:

```text
RESULT: CONDITIONAL FAIL
IMPLEMENTATION THRESHOLD: NOT DECLARED
M-002: NOT YET COMPLETE
```

The review authorized specification reconciliation, metadata normalization, registry repair, conformance-fixture design, bootstrap-profile definition, and provisional implementation planning.

It did not authorize claiming conforming implementation of MSG construction, KIR lowering, KIR backend generation, or self-hosting promotion.

---

## 5. Authority Rules

Apply authority in this order:

1. Monad Laws.
2. Monad Architectural Constitution.
3. Accepted ADRs.
4. Accepted canonical terminology and frozen architecture documents.
5. Accepted normative specifications where they do not conflict with higher authority.
6. The completed PI-002 Compiler Specification Consistency Review.
7. This work packet.
8. Project-control artifacts.
9. Publication projections, journal entries, and explanatory documentation.

When a proposed amendment would change frozen architecture rather than reconcile it, stop and classify the change for constitutional governance.

No work packet may silently amend architecture.

---

## 6. Authoritative Inputs

The executor must read the complete current versions of:

```text
engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW.md

specifications/MSC/core/MSC-CORE-0001.md
specifications/MSC/core/MSC-CORE-0002.md
specifications/MSC/core/MSC-CORE-0003.md
specifications/MSC/core/MSC-CORE-0004.md
specifications/MSC/core/MSC-CORE-0005.md
specifications/MSC/core/MSC-CORE-0006.md
specifications/MSC/core/MSC-CORE-0007.md
specifications/MSC/core/MSC-CORE-0008.md
specifications/MSC/core/MSC-CORE-0009.md
specifications/MSC/core/MSC-CORE-0010.md
specifications/MSC/core/README.md

specifications/registry/specifications.yaml

vision/laws.md
vision/constitution.md
vision/glossary.md
vision/architecture-map.md
vision/compiler-pipeline.md
vision/knowledge-lifecycle.md
architecture/adrs/

engineering/PROJECT-STATUS.md
engineering/MILESTONES.md
engineering/increments/PI-002.md
engineering/work-packets/active.md
engineering/work-packets/backlog.md
engineering/work-cycles/WC-0001.md
engineering/work-cycles/WC-0001-SEMANTIC-GRAPH-CONSTRUCTION-REVIEW.md

engineering/work-packets/WP-MSC-0001.md
engineering/work-packets/WP-MSC-0002.md
engineering/work-packets/WP-MSC-0003.md
engineering/work-packets/WP-MSC-0004.md
engineering/work-packets/WP-MSC-0005.md
engineering/work-packets/WP-MSC-0006.md
```

Historical discussion may provide context but is not normative.

---

## 7. Governing Invariants

The reconciliation must preserve:

1. MSG is the canonical semantic output of one MSC compilation snapshot.
2. MSG is not an AST, symbol table, graph-database product, MKE store, KIR, or generated artifact.
3. MKE persists and evolves MSG snapshots; it does not perform MSC source compilation.
4. KIR is a derived operational projection.
5. KIR is canonically named Knowledge Intermediate Representation.
6. KIR is backend-neutral and target-oriented.
7. KIR backends consume validated KIR.
8. MSG consumers and KIR backends are distinct categories.
9. Semantic identity is distinct from representation, symbol, reference, graph-local, graph, KIR, and generated-artifact identity.
10. Graph identity is distinct from graph content fingerprint.
11. Trust is distinct from authority.
12. Authority is distinct from lifecycle, correctness, confidence, visibility, and access control.
13. Diagnostics remain distinct from semantic conflicts.
14. Partial, unresolved, ambiguous, historical, deferred, invalid-recovery, and contested state may remain explicit in MSG under profile control.
15. Partial or contested MSG state does not automatically become KIR-eligible.
16. Generated output does not become canonical source automatically.
17. Incremental execution must remain semantically equivalent to clean execution.
18. AI may propose or assist but has no independent authority.
19. Self-hosting does not exempt Monad from governance.
20. The Architecture Freeze remains intact unless amended through the Constitution.

---

## 8. Scope

### 8.1 In Scope

This packet authorizes:

* amendments to `MSC-CORE-0001`, `0002`, `0006`, `0007`, `0008`, `0009`, and `0010`;
* consistency-preserving metadata corrections to `0003` through `0005` when required;
* all six P0 corrections;
* all threshold-relevant P1 amendments;
* applicable P2 corrections;
* installation and registration of `MSC-CORE-0008` through `0010`;
* registry and README reconciliation;
* exact phase input/output contracts;
* MSG/MKE/KIR boundary corrections;
* compiler-pass, MSG-consumer, KIR-backend, and external-tool taxonomy;
* canonical KIR name and definition;
* profile and readiness harmonization;
* diagnostic-code compatibility;
* manifest ownership;
* KIR versus backend-plan ownership;
* optimization and backend-IR ownership;
* bootstrap-decision classification;
* non-executable conformance examples or fixtures;
* repository and publication validation;
* a second consistency review;
* a threshold declaration only after a passing review;
* project-control updates only after the review result is known.

### 8.2 Out of Scope

This packet does not authorize:

* production compiler code;
* parser, validator, MSG, KIR, backend, MKE, publication-engine, AI-engine, deployment, or self-hosting implementation;
* effectful backend apply;
* candidate compiler promotion;
* a permanent MSC implementation-language choice;
* changes to Laws, Constitution, or accepted ADRs;
* renaming KIR;
* replacing KIR with KPR;
* unrelated repository reorganization;
* committing, pushing, tagging, releasing, or opening a pull request without separate authorization.

Specification-level pseudocode, YAML, JSON, diagrams, and non-executable fixtures are permitted.

---

## 9. Execution Sequence

Execute in this order:

```text
Phase A — Freeze Inputs and Build Traceability Matrix
    ↓
Phase B — Resolve Six P0 Findings
    ↓
Phase C — Apply Threshold-Relevant P1 Amendments
    ↓
Phase D — Normalize or Formalize Source Document Shape
    ↓
Phase E — Install and Reconcile Registry State
    ↓
Phase F — Add Conformance Examples and Evidence
    ↓
Phase G — Validate Repository and Publication Projection
    ↓
Phase H — Perform Second Consistency Review
    ↓
Phase I — Declare Threshold and Update Project Control, only on PASS
```

A later phase must not conceal an unresolved earlier finding.

---

## 10. Phase A — Traceability and Baseline

Before editing, record:

* branch and commit;
* working-tree status;
* existing MSC-CORE files;
* registry entries;
* README series state;
* publication validation baseline;
* all P0, P1, and P2 findings;
* source fingerprints or revisions where available.

The execution report must include:

| Finding | Severity | Review section | Affected files | Required amendment | Acceptance criteria | Verification evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |

No finding may be marked resolved merely because related wording appears somewhere. The matrix must identify the exact reconciled clause.

---

## 11. P0 Remediation Contracts

## 11.1 P0-001 — Semantic Analysis to MSG Construction

Adopt:

```text
SemanticGraphConstructionInput
├── compilation_unit_snapshot
├── canonical_ast_snapshot
├── bound_declaration_snapshot
├── resolved_reference_snapshot
├── semantic_analysis_snapshot
├── construction_profile
├── extension_set
├── schema_versions
├── fingerprints
└── provenance
```

`MSC-CORE-0007` must retain ownership of `SemanticAnalysisSnapshot`, define its exact fields, schema, fingerprint, readiness output, and relationship to preceding snapshots.

`MSC-CORE-0008` must consume `SemanticGraphConstructionInput`, stop redefining `SemanticAnalysisSnapshot`, validate snapshot compatibility, and preserve every input identity and fingerprint.

Required examples:

* compatible complete bundle;
* compatible partial bundle;
* missing snapshot;
* compilation-unit mismatch;
* schema mismatch;
* fingerprint mismatch;
* unverified mutable input;
* profile mismatch.

## 11.2 P0-002 — MSG, MKE, and KIR Direction

The canonical boundary is:

```text
Immutable MSG Snapshot
├──→ MKE ingestion
└──→ KIR lowering
```

Correct every governing passage that implies `MSG → KIR → MKE`.

KIR is not required before MKE ingestion. MKE may preserve KIR as derived knowledge without making it canonical.

KIR lowering may begin from an immutable in-memory MSG snapshot or an equivalent persisted MSG snapshot supplied by MKE.

## 11.3 P0-003 — Consumer Taxonomy

Define:

```text
CompilerPass
MSGConsumer
KIRBackend
ExternalTool
```

A compiler pass transforms or analyzes compiler representations.

An MSG consumer ingests, queries, validates, publishes, exports, or assembles context from MSG or persisted MSG knowledge.

A KIR backend consumes validated KIR and produces governed plans, artifacts, verification evidence, or authorized effects.

An external tool operates under a declared tool contract.

A KIR backend must not read raw source or arbitrary MSG to invent semantics omitted from KIR.

## 11.4 P0-004 — KIR Name and Orientation

The canonical term is:

```text
Knowledge Intermediate Representation
```

The canonical definition is:

> KIR is a backend-neutral, target-oriented operational projection derived from an eligible MSG subgraph.

Remove the unresolved KIR-name question.

Define whether each KIR snapshot targets one target or one compatible target family.

Define when several backends may consume the same KIR and when target differences require separate KIR snapshots.

Any future rename requires an ADR, glossary amendment, registry migration, specification revisions, and compatibility policy.

## 11.5 P0-005 — Broken Relationship Identities

Repair malformed identifiers such as:

```text
MSL-CORE-000
MKE-CORE-000
```

Do not infer intended targets from list position alone.

Verify each target against the registry, referenced context, series, and dependency meaning.

After correction:

* every ID is complete;
* every active target resolves;
* every planned target is explicitly planned;
* no unexplained duplicate remains;
* no truncated numbered ID remains.

## 11.6 P0-006 — Repository and Registry Integration

Install:

```text
specifications/MSC/core/MSC-CORE-0008.md
specifications/MSC/core/MSC-CORE-0009.md
specifications/MSC/core/MSC-CORE-0010.md
```

Register all three.

Remove stale `MSC-CORE-0003` planned state.

Update the MSC-CORE README.

Registry invariants:

* exactly one entry for every `MSC-CORE-0001` through `0010`;
* every path exists;
* file ID, filename, heading, title, and registry ID agree;
* no existing artifact is also planned;
* series remains active until the second review passes;
* series becomes complete only after the passing review and threshold decision.

---

## 12. P1 Amendment Contracts

## 12.1 P1-001 — Source Document Shape

Choose and document one strategy.

### Normalize

Convert legacy MSC frontmatter to valid nested YAML with exact `---` delimiters.

### Formalize Compatibility

Define a normative legacy bootstrap grammar, canonical normalization, loss behavior, deprecation, and fixtures.

Prefer normalization unless it changes semantics, creates unacceptable risk, or violates an explicit historical-source requirement.

Publication tolerance is not itself the compiler source contract.

## 12.2 P1-002 — Repeated Validation Barriers

Define:

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

Validation is cross-cutting, not one single phase after MSG.

## 12.3 P1-003 — Profile Taxonomy

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

Define composition, precedence, conflict behavior, authority, scope, versioning, fingerprints, and explanation.

## 12.4 P1-004 — Typed Readiness

Define separate:

```text
SemanticReadiness
MSGReadiness
KIRReadiness
BackendReadiness
GeneratedArtifactReadiness
```

Map at least:

* semantic-analysis complete;
* MSG constructible;
* MSG valid;
* MSG authoritative in context;
* KIR eligible for target;
* KIR valid;
* backend-compatible;
* plan-ready;
* apply-ready;
* verify-only;
* blocked.

Do not use unqualified `backend_ready` across domains.

## 12.5 P1-005 — Authority and Lifecycle Revalidation

`MSC-CORE-0006` may use declared or preliminary authority and lifecycle for candidate admissibility.

`MSC-CORE-0007` computes effective authority and lifecycle.

Define preliminary versus effective state, preservation of rejected candidates, invalidation, bounded revalidation, fixed-point behavior, cycle diagnostics, and readiness effects.

## 12.6 P1-006 — Diagnostic-Code Compatibility

Reconcile compact codes such as:

```text
MSC0101
```

with structured codes such as:

```text
MSC-MSG-INPUT-001
MSC-DIAG-001
MSC-KIR-INPUT-001
```

Define canonical grammar, uniqueness, aliases, deprecation, migration, registry, serialization, rendering, suppression, and baselines.

Published diagnostic identities must not be silently renumbered.

## 12.7 P1-007 — Manifest Hierarchy

Define a hierarchy equivalent to:

```text
CompilationManifest
├── ReproducibilityManifest
├── CompilationTrace
├── PhaseRecords
├── DiagnosticSet
├── MSGConstructionManifest
├── LoweringManifest
├── BackendExecutionRecord
└── GeneratedArtifactManifest
```

Define owner, identity, version, fingerprint, invocation, nesting or references, lifecycle, provenance, and persistence boundary.

## 12.8 P1-008 — Generation-Plan Ownership

KIR may contain operational intent, target-oriented declarations, abstract operations, resources, effects, constraints, validations, and backend requirements.

The KIR backend owns concrete destination paths, file operations, formatter invocations, overwrite decisions, rollback operations, and generated-artifact-plan identity.

## 12.9 P1-009 — Optimization and Backend IR

Define KIR optimization as a governed semantics-preserving transformation participating in pass identity, fingerprints, diagnostics, provenance, and reproducibility.

Define backend-internal IR as noncanonical, backend-owned, KIR-derived, provenance-preserving, and output-affecting for cache and reproducibility purposes.

Detailed schemas may be delegated to KIR-CORE, but ownership must be explicit now.

## 12.10 P1-010 — Bootstrap Decision Assignment

Classify:

| Decision | Required before |
| --- | --- |
| Canonical AST bootstrap schema | canonical AST implementation |
| MSG bootstrap schema and serialization | MSG construction |
| KIR bootstrap schema and serialization | KIR lowering |
| Minimum KIR types | first KIR backend |
| Minimum KIR operations | first KIR backend |
| Canonical encoding | reproducibility verification |
| Fingerprint algorithm | reproducibility verification |
| Diagnostic JSON schema | stable machine diagnostics |
| Source-map representation | cross-representation diagnostics |
| First generated artifact | Stage 2 self-hosting |

No material question may remain unclassified.

## 12.11 P1-011 — ADR-0007 Metadata

Review whether `MSC-CORE-0001` and `MSC-CORE-0002` normatively depend on ADR-0007.

Add the dependency when required. If not added, record the reason.

## 12.12 P1-012 — Partial MSG Definition

Use a definition equivalent to:

> MSG is the principal compiled semantic representation for one compilation snapshot, including explicit resolved, unresolved, partial, historical, deferred, invalid-recovery, and contested state where the active profile permits it.

This does not make every partial element authoritative or KIR-eligible.

---

## 13. Machine-Readable Consistency

All ten documents must agree on:

* artifact ID;
* title;
* version;
* status;
* dependency IDs;
* reference IDs;
* series position;
* input representation names;
* output representation names;
* profile names;
* readiness type names;
* diagnostic namespaces;
* manifest names;
* KIR terminology;
* consumer terminology.

The execution report must include a canonical terminology table covering at least:

```text
CompilationProfile
SemanticAnalysisSnapshot
SemanticGraphConstructionInput
MonadSemanticGraphSnapshot
KIRSnapshot
MSGConsumer
KIRBackend
ExternalTool
CompilationManifest
ReproducibilityManifest
MSGConstructionManifest
LoweringManifest
GeneratedArtifactManifest
SemanticReadiness
MSGReadiness
KIRReadiness
BackendReadiness
GeneratedArtifactReadiness
```

---

## 14. Conformance Examples or Fixtures

Add non-executable examples for:

### Phase Boundary

* valid complete construction input;
* valid partial construction input;
* missing required snapshot;
* mismatched identity;
* mismatched fingerprint;
* incompatible schema.

### Architecture Boundary

* MSG ingested by MKE without KIR;
* MSG lowered without MKE persistence;
* persisted MSG lowered through MKE;
* KIR backend prohibited from raw-source reinterpretation.

### KIR

* same target with two compatible backends;
* two targets requiring distinct KIR;
* abstract KIR operation becoming a concrete backend plan;
* missing required capability;
* authorized lossy lowering.

### Readiness

* MSG-ready but not KIR-eligible;
* valid KIR without compatible backend;
* backend-negotiable but not apply-ready;
* verify-only output;
* publication-ready partial MSG blocked for generation.

### Diagnostics

* legacy code alias;
* duplicate code rejection;
* changed message with stable ID;
* semantic change requiring new ID.

### Registry

* complete series;
* duplicate ID;
* missing path;
* stale planned entry;
* file/registry ID mismatch.

No executable harness is required.

---

## 15. Required Deliverables

### Normative Specifications

```text
specifications/MSC/core/MSC-CORE-0001.md
specifications/MSC/core/MSC-CORE-0002.md
specifications/MSC/core/MSC-CORE-0006.md
specifications/MSC/core/MSC-CORE-0007.md
specifications/MSC/core/MSC-CORE-0008.md
specifications/MSC/core/MSC-CORE-0009.md
specifications/MSC/core/MSC-CORE-0010.md
```

Conditional metadata normalization:

```text
specifications/MSC/core/MSC-CORE-0003.md
specifications/MSC/core/MSC-CORE-0004.md
specifications/MSC/core/MSC-CORE-0005.md
```

### Series and Registry

```text
specifications/MSC/core/README.md
specifications/registry/specifications.yaml
```

### Evidence

```text
engineering/reports/WP-MSC-0007-execution-report.md
```

### Second Review

```text
engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02.md
```

This must preserve the first review as history.

### Conditional Threshold Declaration

Only after PASS:

```text
engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md
```

### Conditional Project Controls

Only after the review outcome:

```text
engineering/PROJECT-STATUS.md
engineering/MILESTONES.md
engineering/increments/PI-002.md
engineering/work-packets/active.md
engineering/work-packets/backlog.md
```

---

## 16. File-Level Change Contract

| File | Required amendment |
| --- | --- |
| `MSC-CORE-0001` | Repair relationships; add ADR-0007 if applicable; correct MSG/MKE/KIR branch; type consumers; align KIR and partial MSG; remove backend-specific plans from generic KIR |
| `MSC-CORE-0002` | Define repeated barriers; distinguish consumer classes; type readiness; align diagnostics and effects |
| `MSC-CORE-0003` | No architecture change; metadata normalization only if selected |
| `MSC-CORE-0004` | No architecture change; metadata normalization only if selected |
| `MSC-CORE-0005` | No architecture change; metadata normalization only if selected |
| `MSC-CORE-0006` | Define preliminary filtering, preservation, revalidation, and bounded cycles |
| `MSC-CORE-0007` | Own exact `SemanticAnalysisSnapshot`; define effective governance, typed readiness, and graph-input relationship |
| `MSC-CORE-0008` | Consume `SemanticGraphConstructionInput`; align readiness and branches |
| `MSC-CORE-0009` | Define diagnostic compatibility, manifest hierarchy, and invalidation over amended boundaries |
| `MSC-CORE-0010` | Affirm KIR name; backend-neutral target-oriented definition; KIR backend; plan ownership; optimization; bootstrap decisions; threshold alignment |
| `README.md` | Complete ten-document ledger and current lifecycle |
| `specifications.yaml` | Complete unique sequence, valid paths, no stale planned entry |

---

## 17. Acceptance Criteria

### Phase and Representation

- **AC-001:** `MSC-CORE-0007` defines one exact `SemanticAnalysisSnapshot`.
- **AC-002:** `MSC-CORE-0008` consumes one exact `SemanticGraphConstructionInput`.
- **AC-003:** Every referenced snapshot is immutable or completely fingerprinted.
- **AC-004:** Schema, compilation-unit identity, profile, extensions, and fingerprints are validated.
- **AC-005:** No hidden mutable state is required by MSG construction.

### MSG, MKE, and KIR

- **AC-006:** The canonical pipeline permits MKE ingestion directly from MSG.
- **AC-007:** KIR lowering is a derived branch from MSG or equivalent persisted MSG.
- **AC-008:** No governing text makes KIR canonical semantic truth.
- **AC-009:** No governing text makes KIR mandatory for MKE ingestion.
- **AC-010:** MKE and KIR responsibilities remain distinct.

### Consumers and KIR

- **AC-011:** Compiler pass, MSG consumer, KIR backend, and external tool are separately defined.
- **AC-012:** Every KIR backend consumes validated KIR.
- **AC-013:** A KIR backend cannot bypass KIR to invent source semantics.
- **AC-014:** KIR consistently expands to Knowledge Intermediate Representation.
- **AC-015:** KIR is consistently backend-neutral and target-oriented.
- **AC-016:** KIR target or target-family scope is explicit.
- **AC-017:** Concrete generated-artifact plans are backend outputs.

### Identity and Registry

- **AC-018:** `MSC-CORE-0001` contains no malformed numbered relationship ID.
- **AC-019:** Every active relationship target resolves.
- **AC-020:** Planned targets are explicitly planned.
- **AC-021:** `MSC-CORE-0008` through `0010` exist at canonical paths.
- **AC-022:** The registry contains exactly one entry for each `MSC-CORE-0001` through `0010`.
- **AC-023:** `MSC-CORE-0003` is not both existing and planned.
- **AC-024:** The README, registry, files, headings, titles, versions, and IDs agree.

### Cross-Cutting Contracts

- **AC-025:** The source-shape strategy is explicit and verified.
- **AC-026:** Normalized frontmatter is valid, or legacy compatibility is normatively specified.
- **AC-027:** Representation-specific validation barriers are explicit.
- **AC-028:** The profile hierarchy and precedence are explicit.
- **AC-029:** Semantic, MSG, KIR, backend, and generated-artifact readiness are distinct and mapped.
- **AC-030:** Preliminary authority/lifecycle filtering and effective analysis cannot create a hidden cycle.
- **AC-031:** Diagnostic-code grammar and migration are defined.
- **AC-032:** Published diagnostic IDs are not silently renumbered.
- **AC-033:** Manifest ownership and containment are explicit.
- **AC-034:** KIR optimization and backend-internal IR are separately owned.
- **AC-035:** Bootstrap decisions are assigned to gates.
- **AC-036:** MSG terminology includes explicit partial and contested state without implying universal readiness.

### Evidence and Governance

- **AC-037:** Required conformance examples or fixtures exist.
- **AC-038:** No ungoverned architecture redesign is introduced.
- **AC-039:** No production implementation code is added.
- **AC-040:** Repository and content validation report no introduced blocking error.
- **AC-041:** A new second consistency review exists.
- **AC-042:** The second review reports zero unresolved P0 findings.
- **AC-043:** Every threshold-relevant P1 finding is resolved or superseded by higher authority.
- **AC-044:** The threshold declaration exists only after PASS.
- **AC-045:** Project controls report the outcome honestly.
- **AC-046:** WP-MSC-0001 through `0006` remain planned until threshold authorization.
- **AC-047:** The first consistency review remains historically preserved.
- **AC-048:** The execution report includes every decision, change, command, result, and remaining question.
- **AC-049:** The final diff has no unrelated changes, conflict markers, trailing whitespace, or accidental files.
- **AC-050:** No commit, push, tag, release, or pull request occurs without separate authorization.

---

## 18. Verification Procedure

Run from the repository root unless stated otherwise.

### Repository State

```bash
cd /data/MONAD/monad

git status --short
git diff --check
git diff --stat
```

### Required Files

```bash
for n in $(seq -w 1 10); do
  test -f "specifications/MSC/core/MSC-CORE-00${n}.md"
done
```

### Malformed IDs

```bash
rg -n 'MSL-CORE-000([^0-9]|$)|MKE-CORE-000([^0-9]|$)' \
  specifications/MSC/core
```

Expected: no active malformed relationship.

### KIR Name

```bash
rg -n 'Knowledge Intermediate Representation|Knowledge Projection Representation|What exact expansion.*KIR' \
  specifications/MSC/core \
  vision/glossary.md \
  specifications/registry/specifications.yaml
```

Expected:

* Knowledge Intermediate Representation is canonical.
* KPR remains noncanonical unless governed separately.
* no unresolved KIR-name question remains.

### KIR Orientation

```bash
rg -n 'target-independent|target-oriented|backend-neutral' \
  specifications/MSC/core/MSC-CORE-0010.md
```

Normative wording must use `backend-neutral, target-oriented`. Any `target-independent` occurrence must be historical, rejected, or narrowly qualified.

### Phase Contracts

```bash
rg -n 'SemanticAnalysisSnapshot|SemanticGraphConstructionInput' \
  specifications/MSC/core/MSC-CORE-0007.md \
  specifications/MSC/core/MSC-CORE-0008.md \
  specifications/MSC/core/MSC-CORE-0009.md
```

Manually verify every definition and use agrees.

### Consumer Taxonomy

```bash
rg -n 'CompilerPass|MSGConsumer|KIRBackend|MSG consumer|KIR backend|ExternalTool' \
  specifications/MSC/core/MSC-CORE-0001.md \
  specifications/MSC/core/MSC-CORE-0002.md \
  specifications/MSC/core/MSC-CORE-0010.md
```

### Content Validation

```bash
cd /data/MONAD/monad/publication/site

bun run content:validate
```

Expected: zero blocking errors introduced by this packet.

### Release Validation

```bash
bun run verify:release
```

Classify each failure as introduced, pre-existing, environment-dependent, or unrelated.

### Second Review

The second review must report every first-review P0 as:

```text
resolved
not resolved
superseded by higher-authority decision
```

No finding may disappear from the matrix.

---

## 19. Second Review Contract

Create:

```text
engineering/increments/PI-002-COMPILER-SPECIFICATION-CONSISTENCY-REVIEW-02.md
```

The review must include:

* scope and authority;
* source revisions;
* every P0 disposition;
* every P1 disposition;
* applicable P2 disposition;
* phase-boundary verification;
* MSG/MKE/KIR verification;
* consumer-taxonomy verification;
* KIR terminology verification;
* identity and registry verification;
* profile and readiness verification;
* diagnostic and manifest verification;
* conformance-example verification;
* implementation-readiness decision;
* M-002 exit decision;
* explicit outcome.

Permitted outcomes:

```text
PASS
CONDITIONAL FAIL
FAIL
```

PASS requires zero unresolved P0 findings.

A non-PASS outcome must not produce the implementation-threshold declaration.

---

## 20. Threshold Declaration Contract

Only after PASS, create:

```text
engineering/increments/PI-002-COMPILER-IMPLEMENTATION-THRESHOLD.md
```

It must identify:

* accepted MSC-CORE revisions;
* canonical pipeline;
* exact phase contracts;
* fixed bootstrap decisions;
* decisions assigned to implementation packets;
* permitted implementation scope;
* prohibited effectful scope;
* required conformance evidence;
* WP-MSC-0001 through `0006` activation rules;
* M-003 relationship;
* rollback and amendment conditions.

It authorizes implementation to begin. It does not claim implementation exists.

---

## 21. Project-Control Rules

### On PASS

Update project controls to show:

* consistency gate passed;
* threshold declared;
* M-002 complete or ready for closure under milestone policy;
* WP-MSC-0007 completed;
* WP-MSC-0001 eligible for activation;
* WP-MSC-0002 through `0006` dependency-gated;
* compiler bootstrap is next.

### On Non-PASS

Update project controls to show:

* PI-002 active;
* M-002 blocked;
* threshold undeclared;
* unresolved findings;
* next remediation action;
* WP-MSC-0001 through `0006` still planned.

Do not report partial success as threshold completion.

---

## 22. Stop Conditions

Stop and report when:

1. A correction conflicts with a Law, Constitution, or accepted ADR.
2. The exact malformed relationship target cannot be determined.
3. A required MSC-CORE source is unavailable.
4. Authoritative artifacts require mutually exclusive phase contracts.
5. Reconciliation requires inventing a new subsystem.
6. Reconciliation requires renaming KIR.
7. Reconciliation requires selecting a permanent implementation language.
8. Reconciliation requires production code.
9. Registry repair would erase historical identity.
10. Frontmatter normalization would alter semantics.
11. Validation reveals destructive normalization.
12. The second review finds an unresolved P0.
13. The diff expands into unrelated work.
14. Required evidence cannot be produced.
15. A commit, push, release, or PR is requested without separate authorization.

A threshold-blocking issue may not be mislabeled as deferred merely to close the packet.

---

## 23. Risks

| Risk | Severity | Response |
| --- | ---: | --- |
| Reconciliation becomes redesign | High | Compare every change with frozen Vision and Constitution |
| Large diffs hide semantic changes | High | Maintain finding-to-clause traceability |
| Metadata normalization changes identity | High | Preserve IDs, versions, dates, and provenance |
| Registry claims acceptance early | High | Keep series active until PASS |
| KIR terminology remains contradictory | High | Enforce one definition and fixtures |
| Backend remains overloaded | High | Use explicit consumer taxonomy |
| Readiness remains untyped | Medium | Define domains and mapping |
| Diagnostic continuity is broken | High | Preserve aliases and stable IDs |
| Review closes without evidence | High | Require commands and execution report |
| Project status advances early | High | Conditional updates only |
| Existing publication warnings expand scope | Medium | Record but do not absorb unrelated cleanup |
| Planned packets are mistaken for complete | High | Preserve planning/implementation distinction |

---

## 24. Required Execution Report

Create:

```text
engineering/reports/WP-MSC-0007-execution-report.md
```

It must contain:

* execution identity, date, branch, base commit, and final state;
* files read and source revisions;
* all architecture and terminology decisions;
* source-shape decision and rationale;
* full P0/P1/P2 traceability matrix;
* files modified and sections changed;
* requirements added, changed, deprecated, or removed;
* registry changes;
* commands and exit statuses;
* warnings and classifications;
* second review path and outcome;
* remaining P0 and P1 findings;
* threshold decision;
* project-control updates;
* explicit version-control effect statement.

Expected default statement:

```text
No version-control publication effect was performed by this packet.
```

---

## 25. Definition of Done

WP-MSC-0007 is complete only when:

1. all six P0 findings are resolved;
2. every threshold-relevant P1 finding is resolved or superseded by higher authority;
3. applicable P2 corrections are applied;
4. all ten MSC-CORE files exist;
5. the registry contains the complete sequence;
6. README and registry agree;
7. the semantic-analysis-to-MSG contract is exact;
8. MSG→MKE and MSG→KIR branching is exact;
9. consumer categories are explicit;
10. KIR is consistently named and defined;
11. profiles and readiness are typed and mapped;
12. diagnostics and manifests have compatibility and ownership rules;
13. conformance examples exist;
14. repository and publication validation pass for the affected scope;
15. the execution report is complete;
16. the second review exists and reports PASS;
17. the threshold declaration exists;
18. project controls accurately reflect the result;
19. no production implementation code was added;
20. no unauthorized version-control publication effect occurred.

A non-PASS second review may move the packet to `blocked` or keep it in `verification`. It may not move it to `completed`.

---

## 26. Completion Meaning

Completion means:

* the MSC-CORE series is reconciled;
* M-002's consistency gate has passed;
* the compiler implementation threshold is declared;
* WP-MSC-0001 may become eligible for active execution;
* implementation may rely on stable phase and representation contracts.

Completion does not mean:

* a production MSC exists;
* canonical AST, MSG, KIR, backend, MKE, or self-hosting implementation exists;
* WP-MSC-0001 through `0006` are complete;
* effectful backend apply is authorized;
* generated artifacts are canonical source.

---

## 27. Promotion Gate

After a passing threshold declaration, the accepted implementation order remains:

```text
WP-MSC-0001
    ↓
WP-MSC-0002
    ↓
WP-MSC-0003
    ↓
WP-MSC-0004
    ↓
WP-MSC-0005
    ↓
WP-MSC-0006
```

WP-MSC-0007 does not replace those packets. It supplies the cross-series contract they require.

---

## 28. Acceptance Checklist

### P0

- [ ] P0-001 resolved.
- [ ] P0-002 resolved.
- [ ] P0-003 resolved.
- [ ] P0-004 resolved.
- [ ] P0-005 resolved.
- [ ] P0-006 resolved.

### P1

- [ ] P1-001 resolved.
- [ ] P1-002 resolved.
- [ ] P1-003 resolved.
- [ ] P1-004 resolved.
- [ ] P1-005 resolved.
- [ ] P1-006 resolved.
- [ ] P1-007 resolved.
- [ ] P1-008 resolved.
- [ ] P1-009 resolved.
- [ ] P1-010 resolved.
- [ ] P1-011 resolved.
- [ ] P1-012 resolved.

### Integration

- [ ] MSC-CORE-0008 installed.
- [ ] MSC-CORE-0009 installed.
- [ ] MSC-CORE-0010 installed.
- [ ] Registry complete.
- [ ] README complete.
- [ ] Stale planned entry removed.
- [ ] Relationship targets valid.
- [ ] Source-shape decision recorded.
- [ ] Conformance examples present.
- [ ] Content validation passes.

### Review and Threshold

- [ ] Execution report complete.
- [ ] Second review complete.
- [ ] Second review outcome is PASS.
- [ ] Zero unresolved P0 findings.
- [ ] Threshold declaration complete.
- [ ] Project controls updated.
- [ ] WP-MSC-0001 activation gate recorded.
- [ ] No production code added.
- [ ] No unauthorized commit, push, release, or PR performed.

---

## 29. Final Instruction

Reconcile first.

Validate second.

Review third.

Declare the implementation threshold only after the evidence supports it.

The packet must preserve the accepted architecture:

```text
Artifacts become compiler representations.
Compiler representations become analyzed semantic state.
Analyzed semantic state becomes MSG.
MSG may be persisted in MKE or lowered into KIR.
KIR backends produce governed generated artifacts.
Every transition preserves identity, provenance, authority,
lifecycle, diagnostics, and reproducibility.
```

The work is complete only when all ten MSC-CORE documents express that architecture without contradiction.

<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Reconciliation Amendment

This amendment is normative for `MSC-CORE-0001` and supersedes earlier conflicting architecture diagrams, untyped backend definitions, and wording that describes MSG only as resolved knowledge.

### Canonical Pipeline

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

MKE ingests MSG directly. KIR is an optional derived branch and is not required before persistence.

### Canonical KIR Definition

KIR means **Knowledge Intermediate Representation**. KIR is a backend-neutral, target-oriented operational projection derived from an eligible MSG subgraph.

### Consumer Types

```text
CompilerPass
MSGConsumer
KIRBackend
ExternalTool
```

Only a `KIRBackend` is required to consume validated KIR. An `MSGConsumer` may consume MSG or equivalent persisted MSG knowledge for ingestion, validation, publication, AI context, analytics, or graph export.

### Partial MSG

MSG is the principal compiled semantic representation for one compilation snapshot. Under profile control it may preserve explicit resolved, unresolved, partial, historical, deferred, invalid-recovery, and contested state. Such inclusion does not make every element authoritative, MKE-ingestible, or KIR-eligible.

### Validation Barriers

Validation is a repeated cross-cutting phase family:

```text
invocation → source → surface AST → canonicalization → binding → resolution
→ semantic analysis → MSG → KIR → backend output → cross-representation conformance
```

### Profile Composition

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

A lower-level profile cannot silently weaken a protected higher-level policy.

### Typed Readiness

```text
SemanticReadiness
MSGReadiness
KIRReadiness
BackendReadiness
GeneratedArtifactReadiness
```

Readiness values are scoped to their representation and requested operation.

### Manifest Ownership

```text
CompilationManifest
├── ReproducibilityManifest
├── CompilationTrace and PhaseRecords
├── DiagnosticSet
├── MSGConstructionManifest
├── LoweringManifest
├── BackendExecutionRecord
└── GeneratedArtifactManifest
```

### Dependency Reconciliation

`MSC-CORE-0001` normatively depends on `ADR-0007` for artifact-oriented compilation. Every active relationship must use an exact resolvable ID. Truncated identifiers such as `MSL-CORE-000` and `MKE-CORE-000` are invalid and are repaired by the WP-MSC-0007 execution procedure using verified existing series positions.

<!-- WP-MSC-0007:END -->

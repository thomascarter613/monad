# ADR-0007 — Monad Compiles Artifacts, Not Files

## Metadata

```yaml
id: ADR-0007
title: Monad Compiles Artifacts, Not Files
status: Accepted
version: 1.0.0
created: 2026-08-04
decision_scope: foundational-system-ontology

depends_on:
  - ADR-0002
  - ADR-0003
  - ADR-0004
  - ADR-0005
  - ADR-0006

affects:
  - MART
  - MSL
  - MSC
  - MSG
  - KIR
  - MKE
  - CLI
  - registries
  - frontends
  - normalizers
  - caches
  - backends
  - provenance
  - compilation
```

## Context

The Monad architecture initially described compiler inputs primarily as sources and files.

That model was sufficient during bootstrap because the first knowledge artifacts were Markdown files stored in a Git repository.

Monad’s intended scope is significantly broader.

Relevant engineering knowledge may originate from:

* files;
* directories;
* Git commits;
* Git trees;
* Git tags;
* issue trackers;
* pull requests;
* databases;
* object storage;
* APIs;
* message streams;
* editor buffers;
* diagrams;
* images;
* generated compiler representations;
* semantic graphs;
* AI conversations;
* runtime observations;
* remote registries;
* in-memory structures;
* dynamically generated projections.

Some of these inputs may never exist as conventional files.

The compiler also produces many non-file results:

* surface ASTs;
* canonical ASTs;
* symbol indexes;
* semantic graphs;
* KIR;
* diagnostics;
* compilation plans;
* conformance reports;
* source maps;
* generated code;
* documentation;
* diagrams;
* migration records;
* cache entries;
* backend execution plans.

Treating files as the primary abstraction would force every subsystem to invent separate models for non-file inputs and outputs.

A common ontology is required.

## Decision

Monad will treat an **artifact** as the universal unit of identity, provenance, transformation, storage, compilation, and relationship.

MSC compiles artifacts.

MKE stores and serves artifacts.

MSG relates semantic artifacts.

KIR represents lowered artifacts and transformations.

Backends consume artifacts and produce artifacts.

Files are one possible physical representation of artifacts.

The core processing model is:

```text
Artifact
    ↓
Transformation
    ↓
Artifact
```

A complete workflow forms an artifact-transformation graph:

```text
Source Artifact
    ↓
Frontend Transformation
    ↓
Surface AST Artifact
    ↓
Normalization Transformation
    ↓
Canonical AST Artifact
    ↓
Semantic Compilation Transformation
    ↓
Semantic Graph Artifact
    ↓
Lowering Transformation
    ↓
KIR Artifact
    ↓
Backend Transformation
    ↓
Generated Artifact
```

## Artifact Definition

An artifact is a durably identifiable unit of information, structure, behavior, evidence, state, or generated output that Monad may:

* discover;
* acquire;
* classify;
* parse;
* normalize;
* compile;
* validate;
* transform;
* relate;
* store;
* version;
* query;
* render;
* generate;
* migrate;
* publish;
* execute under explicit policy.

An artifact may be:

* authored;
* imported;
* observed;
* inferred;
* generated;
* compiled;
* derived;
* migrated;
* virtual;
* materialized;
* ephemeral;
* persistent.

## Artifact Versus Representation

An artifact is a logical entity.

A representation is one form in which an artifact is encoded or exposed.

For example:

```text
Logical Artifact
├── Markdown file representation
├── Canonical AST representation
├── HTML publication representation
├── Database record representation
└── API projection representation
```

A change of representation does not necessarily create a new logical artifact.

A transformation that changes semantic meaning may create a new artifact or new artifact version.

## Artifact Versus File

A file is a storage object identified through a filesystem path.

An artifact has semantic identity independent from its storage location.

A file may:

* contain one artifact;
* contain multiple artifacts;
* contain part of an artifact;
* represent a generated projection;
* serve as a container;
* have no standalone semantic artifact identity.

An artifact may:

* have no file;
* span multiple files;
* move between files;
* exist in memory;
* exist in a database;
* exist through a connector;
* be generated on demand.

Filesystem paths must not become canonical artifact identity.

## Artifact Model

Every artifact conceptually has:

```text
Artifact

├── artifact identity
├── artifact type
├── namespace
├── version
├── lifecycle
├── authority
├── provenance
├── representations
├── locations
├── relationships
├── content or payload
├── schema
├── integrity information
├── trust information
├── mutability classification
├── materialization state
└── extension metadata
```

The detailed model will be specified by `MART-CORE`.

## Artifact Classes

Initial conceptual artifact classes include:

```text
Artifact

├── Source Artifact
├── Document Artifact
├── Specification Artifact
├── Code Artifact
├── Configuration Artifact
├── Schema Artifact
├── Diagram Artifact
├── Conversation Artifact
├── Observation Artifact
├── Surface AST Artifact
├── Canonical AST Artifact
├── Semantic Graph Artifact
├── KIR Artifact
├── Compiler Plan Artifact
├── Diagnostic Artifact
├── Report Artifact
├── Evidence Artifact
├── Cache Artifact
├── Generated Artifact
├── Binary Artifact
├── Package Artifact
├── Registry Artifact
└── Virtual Artifact
```

Artifact classes are extensible through registered artifact types.

## Transformation Model

A transformation is itself a first-class artifact or durably identified semantic operation.

A transformation conceptually contains:

```text
Transformation

├── transformation identity
├── transformation type
├── implementation identity
├── implementation version
├── input artifacts
├── output artifacts
├── configuration
├── environment
├── authority
├── effects
├── determinism
├── losses
├── diagnostics
├── provenance
└── execution record
```

Examples include:

* parsing;
* normalization;
* binding;
* semantic analysis;
* graph construction;
* lowering;
* formatting;
* rendering;
* generation;
* migration;
* publication;
* deployment.

## Artifact Relationships

Initial relationship classes include:

```text
contains
contained_by
represents
represented_by
derived_from
generated_from
normalized_from
compiled_from
lowered_from
implements
verifies
references
depends_on
supersedes
replaces
conflicts_with
equivalent_to
version_of
projection_of
materialization_of
cached_from
published_as
```

Relationships must preserve provenance and applicable authority.

## Artifact Identity

Artifact identity remains independent from:

* location;
* file path;
* URL;
* representation;
* title;
* format;
* backend;
* storage mechanism;
* cache key.

An artifact may have several representations and locations while retaining one canonical identity.

## Artifact Versioning

Artifact version is distinct from representation version.

Example:

```text
Specification Artifact version: 1.2.0
Markdown syntax version: 0.1.0
Canonical AST schema version: 0.3.0
HTML renderer version: 2.0.0
```

Changing a renderer does not necessarily change the logical artifact version.

Changing normative semantic content generally does.

## Physical and Logical Artifacts

### Logical Artifact

A semantic entity managed by Monad.

Examples:

* requirement;
* specification;
* compiler plan;
* semantic graph;
* package.

### Physical Artifact

A materialized object containing or representing information.

Examples:

* file;
* Git blob;
* database row;
* object-store object;
* archive;
* binary.

A physical artifact may represent one or more logical artifacts.

The mapping must remain explicit.

## Materialized and Virtual Artifacts

### Materialized Artifact

Has a persisted or presently available representation.

### Virtual Artifact

Can be derived, queried, or generated but is not presently stored as an independent physical object.

Examples:

* generated dependency graph;
* filtered semantic-graph projection;
* on-demand report;
* editor view.

Virtual artifacts still require identity and provenance when they participate in durable workflows.

## Artifact Acquisition

Artifact acquisition replaces file-centric source acquisition.

Acquisition may retrieve artifacts from:

* local filesystem;
* Git;
* MKE;
* relational database;
* object store;
* editor session;
* connector;
* remote API;
* package registry;
* prior compiler cache;
* in-memory generation.

Every acquisition must record:

* artifact identity or provisional identity;
* locator;
* acquisition method;
* revision;
* integrity fingerprint;
* trust classification;
* access policy;
* provenance.

## Artifact Discovery

Artifact discovery identifies candidate artifacts and relationships.

Discovery may use:

* manifests;
* registries;
* conventions;
* repository scans;
* connectors;
* semantic indexes;
* explicit invocation arguments;
* generated dependency closure.

Discovery does not grant authority or establish semantic validity.

## Compilation Units

A compilation unit is a versioned artifact set selected for one coherent compilation context.

A compilation unit may contain:

* physical source artifacts;
* logical specification artifacts;
* embedded language units;
* imported semantic artifacts;
* generated artifacts;
* supplementary artifacts;
* dependency artifacts;
* prior compiled artifacts.

A compilation unit is itself an artifact.

## Compilation Invocation

A compiler invocation is a first-class artifact representing one attempted compilation.

It relates:

```text
Compilation Invocation
├── consumes → Input Artifacts
├── uses → Compiler and Pass Artifacts
├── uses → Configuration Artifacts
├── produces → Output Artifacts
├── emits → Diagnostic Artifacts
└── records → Execution and Provenance Artifacts
```

## Registries

A registry is an artifact that indexes other artifacts.

Registries may index:

* specifications;
* languages;
* frontends;
* normalizers;
* passes;
* extensions;
* backends;
* packages;
* compiler outputs;
* migrations.

Registry entries must not replace the canonical identity of registered artifacts.

## Caches

A cache entry is a derived artifact.

It must preserve:

* source artifact fingerprints;
* transformation identity;
* transformation version;
* configuration;
* environment;
* output identity;
* validity conditions;
* provenance.

A cache artifact must never become authoritative merely because it is reusable.

## Diagnostics

A diagnostic is an artifact describing an observed compiler, validation, compatibility, or conformance condition.

Diagnostics have:

* identity;
* type;
* severity;
* subject artifacts;
* source locations;
* semantic locations;
* phase;
* evidence;
* remediation;
* lifecycle;
* waiver state;
* provenance.

Diagnostics are not unstructured log lines.

## Reports

Compilation reports, validation reports, compatibility reports, and conformance reports are first-class artifacts.

They may be:

* stored;
* compared;
* signed;
* referenced;
* attached as evidence;
* published;
* queried.

## Generated Artifacts

Generated output must preserve:

* generated-artifact identity;
* generator identity;
* generator version;
* input artifact identities;
* transformation configuration;
* source and semantic lineage;
* generated status;
* overwrite policy;
* authority;
* lifecycle.

Generated artifacts must remain distinguishable from independently authored artifacts.

## MSL Impact

MSL specifications are artifact declarations.

MSL semantic elements may also be artifacts when they require:

* durable identity;
* independent lifecycle;
* independent authority;
* external references;
* provenance;
* publication;
* versioning.

Not every AST node must become a first-class artifact.

Artifact promotion rules will be defined later.

## MSC Impact

MSC terminology changes conceptually:

```text
Source Manager
    becomes
Artifact Manager

Source Discovery
    becomes
Artifact Discovery

Source Acquisition
    becomes
Artifact Acquisition

Source Inventory
    becomes
Artifact Inventory

Source Fingerprint
    becomes
Artifact Representation Fingerprint

Source Lineage
    becomes
Artifact Lineage
```

The compiler still uses the term `source artifact` for artifacts serving as compilation inputs.

## MSG Impact

MSG represents semantic artifacts and their relationships.

MSG must distinguish:

* artifact nodes;
* semantic-element nodes;
* representation nodes;
* transformation nodes;
* provenance nodes;
* execution records.

Not every graph node is necessarily an independently managed artifact.

## KIR Impact

KIR elements represent lowered artifacts, operations, values, and relationships.

KIR artifacts remain traceable to MSG artifacts and upstream input artifacts.

## MKE Impact

MKE is the principal artifact persistence, indexing, retrieval, and serving subsystem.

MKE may store:

* artifact metadata;
* representations;
* relationships;
* provenance;
* lifecycle;
* authority;
* MSG;
* KIR;
* diagnostics;
* reports;
* compilation records.

MKE is not limited to storing documents.

## Consequences

### Positive

* All Monad subsystems share one foundational abstraction.
* Files become implementation details rather than architectural constraints.
* Compiler inputs and outputs use one ontology.
* Provenance becomes consistent across every transformation.
* Non-file sources become first-class.
* Generated and virtual artifacts fit naturally.
* MKE, MSC, MSG, KIR, and registries align conceptually.
* Compilation units can contain heterogeneous artifact types.
* Diagnostics, reports, caches, plans, and invocations become queryable.
* Storage and transport mechanisms can evolve independently from artifact identity.
* Backend pipelines become artifact transformations rather than special cases.

### Negative

* A foundational artifact model must be specified carefully.
* Artifact identity and representation identity require clear separation.
* The term artifact may become overly broad without strong type discipline.
* Not every internal compiler value should become a first-class artifact.
* Artifact promotion and granularity require explicit policy.
* More metadata and provenance may increase implementation cost.
* Existing source-centric specifications require terminology review.
* Registries and caches must adopt artifact semantics.

## Alternatives Considered

### Files as the Primary Unit

Rejected because many inputs and outputs never exist as files.

### Documents as the Primary Unit

Rejected because code, graphs, binaries, diagnostics, plans, and execution records are not naturally documents.

### Graph Nodes as the Primary Unit

Rejected because storage and compiler representations require stable artifact identity beyond one graph implementation.

### Arbitrary Objects Without a Shared Model

Rejected because identity, provenance, versioning, and relationships would fragment across subsystems.

### Artifact Model Only Inside MKE

Rejected because MSC, KIR, frontends, backends, caches, and registries require the same abstraction.

## Revised Roadmap

The foundational sequence is now:

```text
MSL-CORE ✅
    ↓
MSC-CORE
    ↓
MART-CORE
    ↓
MSG-CORE
    ↓
KIR-CORE
    ↓
MSL-DOCUMENT
    ↓
MSL-TYPE
    ↓
MSL-EXPR
    ↓
MSL-CONSTRAINT
```

`MART-CORE` follows `MSC-CORE` because the current compiler series will identify the exact artifact requirements.

`MART-CORE` precedes `MSG-CORE` because MSG must know which semantic nodes represent first-class artifacts.

## Revised MSC-CORE Roadmap

The remaining compiler documents are:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0003 | Artifact Discovery and Compilation Units          |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration             |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding         |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

## Migration Impact

Existing specifications remain valid.

The term `source` continues to be valid where it refers specifically to an artifact serving as input.

The broader architecture must use `artifact` when the concept includes non-file inputs, intermediate representations, outputs, plans, diagnostics, caches, or generated results.

The following documents should later receive terminology and cross-reference reviews:

* `MSL-CORE-0004`;
* `MSL-CORE-0005`;
* `MSL-CORE-0006`;
* `MSL-CORE-0007`;
* `MSL-CORE-0008`;
* `MSC-CORE-0001`;
* `MSC-CORE-0002`;
* relevant MKE specifications.

No current document should be deleted or immediately rewritten.

## Decision Invariants

1. Monad’s universal managed unit is the artifact.
2. Files are possible artifact representations, not universal semantic identity.
3. Artifact identity remains independent from location and representation.
4. Compiler inputs, intermediates, outputs, diagnostics, plans, and reports may be artifacts.
5. Transformations preserve artifact lineage.
6. Transformations are durably identifiable.
7. Compilation units and compiler invocations are artifacts.
8. Generated artifacts remain distinguishable from authored artifacts.
9. Cache artifacts do not gain authority through reuse.
10. Registries index artifacts without replacing canonical identity.
11. Physical and logical artifacts remain distinguishable.
12. Virtual artifacts preserve identity and provenance when used durably.
13. Not every internal value automatically becomes a first-class artifact.
14. Artifact types remain explicit and registered.
15. MSL, MSC, MSG, KIR, MKE, frontends, and backends share the artifact model.

## Status

Accepted.

This ADR establishes the artifact as Monad’s universal unit of identity, transformation, compilation, provenance, storage, and relationship.

---

artifact:
id: MONAD-VISION-ECOSYSTEM
type: vision.ecosystem
namespace: monad

metadata:
title: Monad Ecosystem Overview
version: 0.1.0
status: draft
created: 2026-08-06
authors:
- Monad Architecture Team
tags:
- vision
- ecosystem
- architecture
- subsystems
- knowledge-platform

relationships:
depends_on:
- MONAD-VISION-MANIFESTO
- MONAD-VISION-PRINCIPLES
- MONAD-VISION-LAWS
- MONAD-VISION-GLOSSARY
enables:
- MONAD-VISION-ARCHITECTURE-MAP
- MONAD-VISION-COMPILER-PIPELINE
- MONAD-VISION-KNOWLEDGE-LIFECYCLE
- MONAD-VISION-CONSTITUTION
- MSC-CORE-0008
---------------

# Monad Ecosystem Overview

## 1. Purpose

This document provides the canonical high-level overview of the Monad ecosystem.

It explains:

* what Monad is;
* which major subsystems comprise it;
* what each subsystem is responsible for;
* how knowledge moves through the platform;
* which representations are canonical;
* which systems are implemented, specified, planned, provisional, or deferred;
* how users, contributors, tools, and external systems interact with Monad.

This document is architectural and explanatory.

It does not replace:

* architectural decision records;
* normative specifications;
* implementation plans;
* source code;
* deployment architecture.

Where this overview conflicts with an accepted ADR or normative specification, the accepted ADR or specification governs.

---

# 2. Monad in One Sentence

> Monad is an engineering knowledge compilation platform that transforms human and machine engineering information into canonical semantic graphs from which publication, execution, AI context, validation, analytics, and other engineering artifacts may be derived.

A shorter contributor-facing description is:

> Monad treats engineering knowledge the way a traditional compiler treats source code.

---

# 3. System Mission

Monad exists to make engineering knowledge:

* explicit;
* structured;
* compilable;
* traceable;
* versioned;
* queryable;
* reusable;
* explainable;
* durable.

Modern engineering work is distributed across:

* source code;
* architecture documents;
* specifications;
* issue trackers;
* pull requests;
* chat conversations;
* test suites;
* diagrams;
* deployment manifests;
* runtime observations;
* human memory.

Monad does not assume these artifacts are already coherent.

It provides a system for:

1. capturing engineering intent;
2. compiling supported representations;
3. resolving semantic relationships;
4. preserving provenance and uncertainty;
5. constructing a canonical semantic graph;
6. persisting semantic knowledge over time;
7. deriving purpose-specific projections;
8. enabling future systems to reason over the same knowledge.

---

# 4. Architectural Model

The ecosystem follows this high-level model:

```text
Knowledge Sources
      │
      ▼
Languages and Capture
      │
      ▼
Compilation
      │
      ▼
Semantic Knowledge
      │
      ▼
Persistence and Evolution
      │
      ▼
Knowledge Services and Projections
      │
      ▼
Applications and Experiences
```

Expanded:

```text
Human-authored knowledge
Machine-generated knowledge
Observed systems
External artifacts
Research and evidence
          │
          ▼
MSL and supported source representations
Import adapters
Frontends
Normalizers
          │
          ▼
MSC
Parsing
Canonicalization
Binding
Resolution
Type and constraint analysis
Semantic graph construction
          │
          ▼
MSG
Canonical semantic graph
for one compilation snapshot
          │
          ▼
MKE
Persistence
Versioning
Indexing
Query
History
Knowledge evolution
          │
          ├───────────────┬────────────────┬─────────────────┐
          ▼               ▼                ▼                 ▼
Publication          AI context       Execution         Analytics
and docs              and reasoning     projections       and search
          │               │                │                 │
          └───────────────┴────────────────┴─────────────────┘
                                  │
                                  ▼
                        User-facing applications
```

---

# 5. Architectural Layers

## Layer 0 — Vision and Governance

This layer defines why Monad exists and how its architecture evolves.

Primary artifacts include:

* Manifesto;
* Engineering Principles;
* Monad Laws;
* Canonical Glossary;
* Ecosystem Overview;
* Architecture Map;
* Constitution;
* ADRs.

Primary responsibility:

> Preserve architectural coherence.

This layer does not execute software or compile knowledge.

---

## Layer 1 — Knowledge Foundations

This layer defines the foundational concepts shared by the entire ecosystem.

Concepts include:

* artifact;
* identity;
* version;
* provenance;
* authority;
* lifecycle;
* evidence;
* relationships;
* ontology;
* semantic facts;
* uncertainty;
* conflict.

Primary responsibility:

> Define the semantic foundations required by languages, compilation, persistence, and projection.

Planned subsystem:

* MGO — Monad Graph Ontology.

---

## Layer 2 — Languages and Capture

This layer provides structured ways to express or import engineering knowledge.

Primary systems include:

* MSL — Monad Specification Language;
* future MPL — Monad Publication Language;
* import adapters;
* source-format frontends;
* semantic authoring interfaces.

Primary responsibility:

> Capture engineering knowledge and intent in forms that can be compiled.

This layer does not determine final semantic meaning by itself.

---

## Layer 3 — Compilation

This layer transforms source representations into analyzed semantic knowledge.

Primary system:

* MSC — Monad Specification Compiler.

Supporting compiler components include:

* artifact discovery;
* frontends;
* parsers;
* normalizers;
* canonical AST construction;
* declaration collection;
* symbol binding;
* namespace and import resolution;
* reference resolution;
* type analysis;
* constraint analysis;
* authority and lifecycle analysis;
* semantic graph construction;
* diagnostics;
* incremental compilation;
* lowering.

Primary responsibility:

> Compile supported engineering artifacts into analyzed semantic graphs and derived compiler representations.

---

## Layer 4 — Semantic Representation

This layer represents the result of semantic compilation.

Primary system:

* MSG — Monad Semantic Graph.

Primary responsibility:

> Represent one compiled semantic knowledge snapshot.

MSG is:

* logical;
* semantic;
* implementation-independent;
* graph-oriented;
* provenance-preserving;
* authority-aware;
* lifecycle-aware;
* conflict-aware;
* capable of representing partial knowledge.

MSG is not:

* a graph database product;
* a file format;
* a compiler symbol table;
* a source document;
* a publication;
* an execution plan.

---

## Layer 5 — Knowledge Kernel

This layer persists and evolves semantic knowledge.

Primary system:

* MKE — Monad Knowledge Engine.

Primary responsibility:

> Persist, version, index, query, govern, and evolve semantic knowledge.

MKE manages:

* graph snapshots;
* historical knowledge;
* semantic identity;
* version history;
* provenance;
* relationships;
* query;
* indexes;
* knowledge evolution;
* conflict history;
* derived views.

MKE does not replace MSC.

MSC constructs semantic graphs.

MKE persists and evolves them.

---

## Layer 6 — Knowledge Services and Projections

This layer derives purpose-specific representations and services from canonical semantic knowledge.

Planned services include:

* MPE — Monad Publication Engine;
* MAE — Monad AI Engine;
* semantic search;
* analytics;
* validation services;
* execution-oriented projections;
* backend generation;
* reporting;
* visualization.

Primary responsibility:

> Convert canonical semantic knowledge into purpose-specific views, context, analysis, or executable representations.

These services must not redefine canonical knowledge.

---

## Layer 7 — Applications and Experiences

This layer provides user-facing interactions with Monad.

Potential applications include:

* CLI;
* TUI;
* web application;
* IDE extensions;
* documentation site;
* agents;
* APIs;
* dashboards;
* desktop applications.

Primary responsibility:

> Enable people and systems to author, compile, query, inspect, project, and apply Monad knowledge.

Applications consume lower-level services.

They do not define the canonical semantic model.

---

# 6. Core Subsystems

## 6.1 MSL — Monad Specification Language

### Maturity

**In specification**

### Primary Responsibility

> Express engineering knowledge and specification intent.

### Consumes

* human-authored engineering intent;
* structured metadata;
* domain-specific declarations;
* imported or embedded semantic content.

### Produces

* authored source artifacts;
* source-language declarations;
* machine-readable specification structures.

### Explicitly Does Not

* perform compilation;
* resolve references;
* construct MSG;
* persist historical knowledge;
* render publications;
* execute workflows.

### Primary Dependencies

* foundational artifact model;
* identity;
* authority;
* lifecycle;
* language contracts;
* shared semantic concepts.

---

## 6.2 MSC — Monad Specification Compiler

### Maturity

**In specification**

### Primary Responsibility

> Compile supported engineering artifacts into analyzed semantic graphs and derived compiler representations.

### Consumes

* MSL artifacts;
* supported external artifacts;
* language manifests;
* compiler profiles;
* extension contracts;
* package and dependency context;
* prior compiler snapshots where incremental compilation is used.

### Produces

* canonical AST;
* declaration tables;
* symbol snapshots;
* namespace and scope graphs;
* import and reference graphs;
* type and constraint analysis;
* semantic conflicts;
* analyzed semantic snapshots;
* MSG;
* KIR or other lowered representations;
* diagnostics.

### Explicitly Does Not

* act as the long-term persistent knowledge store;
* own publication rendering;
* treat AI output as authoritative automatically;
* replace application interfaces;
* own project governance.

### Primary Dependencies

* MSL;
* artifact model;
* identity;
* provenance;
* authority;
* lifecycle;
* ontology;
* profiles;
* language and extension registries.

---

## 6.3 MSG — Monad Semantic Graph

### Maturity

**Accepted architecture; detailed specification pending**

### Primary Responsibility

> Represent one compiled semantic knowledge snapshot.

### Consumes

MSG is not an active engine.

It is constructed from:

* analyzed declarations;
* resolved references;
* semantic facts;
* constraints;
* authority;
* lifecycle;
* provenance;
* conflict;
* evidence;
* readiness state.

### Produces

MSG is itself the semantic output consumed by:

* MKE;
* publication systems;
* AI-context systems;
* analytics;
* semantic search;
* execution-projection systems;
* graph exporters;
* validation systems.

### Explicitly Does Not

* define its own persistence backend;
* parse source formats;
* replace compiler analysis;
* execute workflows;
* render documentation;
* erase uncertainty or conflict.

### Primary Dependencies

* ontology;
* semantic-analysis results;
* artifact identity;
* relationship semantics;
* provenance model;
* authority model;
* lifecycle model.

---

## 6.4 MKE — Monad Knowledge Engine

### Maturity

**In specification**

### Primary Responsibility

> Persist, version, index, query, govern, and evolve semantic knowledge.

### Consumes

* MSG snapshots;
* semantic migrations;
* evidence updates;
* lifecycle transitions;
* authority transitions;
* external knowledge imports;
* query requests.

### Produces

* persistent knowledge state;
* historical graph versions;
* semantic indexes;
* query results;
* dependency and lineage views;
* knowledge diffs;
* context projections;
* graph snapshots;
* knowledge events.

### Explicitly Does Not

* parse MSL directly as its core responsibility;
* perform source-language compilation;
* become a publication renderer;
* replace application-specific interfaces;
* grant authority merely because data was stored successfully.

### Primary Dependencies

* MSG schema and ontology;
* artifact model;
* identity;
* provenance;
* authority;
* lifecycle;
* storage and query abstractions.

---

# 7. Planned Supporting Subsystems

## 7.1 MGO — Monad Graph Ontology

### Maturity

**Planned**

### Primary Responsibility

> Define the foundational semantic vocabulary and relationship model of Monad knowledge graphs.

### Expected Scope

* entity classes;
* relationship types;
* semantic constraints;
* classification;
* artifact concepts;
* identity concepts;
* provenance concepts;
* authority concepts;
* lifecycle concepts;
* conflict concepts.

### Boundary

MGO defines what kinds of semantic things may exist.

MSG instantiates those concepts for one compilation snapshot.

---

## 7.2 MPL — Monad Publication Language

### Maturity

**Reserved**

### Primary Responsibility

> Express publication structure, audience, narrative, and publication intent.

### Expected Uses

* journal structures;
* documentation pages;
* books;
* presentations;
* tutorials;
* release notes;
* newsletters.

### Boundary

MPL describes publication intent.

It does not render output.

---

## 7.3 MPE — Monad Publication Engine

### Maturity

**Planned**

### Primary Responsibility

> Produce human-facing publication projections from semantic knowledge.

### Expected Outputs

* Markdown;
* HTML;
* documentation sites;
* PDFs;
* books;
* presentations;
* RSS;
* engineering journals;
* release notes.

### Boundary

MPE renders or assembles publications.

It does not own canonical knowledge.

---

## 7.4 MAE — Monad AI Engine

### Maturity

**Provisional**

### Primary Responsibility

> Assemble semantic context and support AI-assisted reasoning over Monad knowledge.

### Expected Capabilities

* semantic retrieval;
* context assembly;
* source grounding;
* explanation support;
* recommendation generation;
* engineering assistance;
* agent context.

### Boundary

MAE may propose or infer knowledge.

Its outputs remain inferred or provisional until independently validated or adopted.

---

## 7.5 KIR — Knowledge Intermediate Representation

### Maturity

**Accepted current term; detailed specification pending**

### Primary Responsibility

> Represent lowered, execution-oriented, transformation-oriented, or backend-oriented projections derived from analyzed semantic knowledge.

### Expected Uses

* source generation;
* backend generation;
* validation plans;
* execution plans;
* deployment projections;
* package-specific outputs;
* interoperability.

### Boundary

KIR is derived from analyzed knowledge.

It is not the canonical semantic source of truth.

The name KIR remains canonical unless changed by an accepted ADR.

---

## 7.6 Execution Runtime

### Maturity

**Deferred**

### Primary Responsibility

> Execute or enforce approved execution projections.

No canonical subsystem name is accepted yet.

A runtime must not be introduced until KIR and backend contracts demonstrate a concrete need.

---

# 8. Repository Knowledge Domains

Monad's repository structure organizes engineering knowledge by domain.

These domains do not automatically correspond one-to-one with runtime services.

## `vision/`

Answers:

> Why does Monad exist, and what must remain true?

Contains:

* manifesto;
* principles;
* laws;
* glossary;
* ecosystem;
* architecture map;
* constitution;
* roadmap-level vision.

---

## `adrs/` or Architecture Decisions

Answers:

> Which significant architectural decisions were made, and why?

Contains:

* context;
* alternatives;
* decisions;
* consequences;
* status.

---

## `specifications/`

Answers:

> What must the system mean or do?

Contains:

* MSL;
* MSC;
* MKE;
* MSG;
* KIR;
* MGO;
* future specification families;
* registries.

---

## `engineering/`

Answers:

> How is the work planned, executed, reviewed, and completed?

Contains:

* work packets;
* program increments;
* project status;
* milestones;
* roadmaps;
* implementation notes;
* experiments;
* engineering metrics.

---

## `research/`

Answers:

> Which evidence, alternatives, technologies, and unresolved questions inform the architecture?

Contains:

* technical investigations;
* comparative analyses;
* literature;
* prototypes;
* benchmarks;
* external references.

---

## `journal/`

Answers:

> How did Monad evolve, and what was learned?

Contains:

* engineering journal entries;
* narrative development history;
* architectural discoveries;
* tradeoffs;
* retrospectives.

---

## `knowledge/`

Answers:

> What compiled or persisted semantic knowledge exists?

During bootstrap, this directory may hold:

* generated graph snapshots;
* semantic exports;
* test fixtures;
* indexes;
* compiled knowledge artifacts.

Long-term, MKE rather than a directory becomes the persistent knowledge authority.

---

## Implementation Directories

Answer:

> Which executable components realize the accepted architecture?

Potential directories may include:

* compiler;
* engine;
* cli;
* tools;
* services;
* applications;
* packages.

Implementation layout remains subordinate to architectural responsibilities.

---

# 9. Canonical Representation Boundaries

Monad distinguishes the following representations.

## Source Artifact

The authored, imported, observed, or generated input representation.

Examples:

* Markdown;
* YAML;
* code;
* schema;
* issue;
* ADR;
* work packet.

It preserves human or source-system form.

---

## Surface AST

A structured representation preserving source-language concepts.

It is specific to a frontend or source language.

---

## Canonical AST

The common normalized compiler representation used by shared compiler passes.

It represents normalized source semantics, not final knowledge.

---

## Declaration and Symbol State

Compiler representations used to bind declarations, names, owners, scopes, and members.

These structures optimize compiler analysis.

They are not durable canonical knowledge.

---

## Reference and Analysis Graphs

Compiler graphs used for:

* resolution;
* type analysis;
* constraints;
* authority;
* lifecycle;
* compatibility;
* conflict.

These may contain compiler-only candidates, placeholders, and rejected paths.

---

## MSG

The canonical logical semantic graph for one compilation snapshot.

MSG is the first authoritative semantic representation produced by compilation.

It may include incomplete, provisional, historical, or contested knowledge when those states are explicit.

---

## MKE Persistent Knowledge

The versioned historical knowledge universe containing one or more semantic graph snapshots and their evolution over time.

MKE is the persistent source of truth for stored Monad knowledge.

---

## KIR

A derived lowered representation for execution, generation, transformation, validation, or backend consumption.

---

## Publication Projection

A derived representation for human communication.

Examples:

* documentation;
* article;
* book;
* slide deck;
* website;
* release note.

---

# 10. Dependency Direction

High-level dependency direction should follow:

```text
Vision and Governance
        ↓
Knowledge Foundations
        ↓
Languages
        ↓
Compilation
        ↓
Semantic Representation
        ↓
Knowledge Kernel
        ↓
Services and Projections
        ↓
Applications
```

This represents architectural dependency, not runtime call order in every case.

## Permitted Dependencies

* Applications may depend on services.
* Services may depend on MKE and MSG contracts.
* MKE may depend on MSG and foundational models.
* MSC may depend on language and ontology contracts.
* Languages may depend on foundational artifact and identity concepts.
* Governance artifacts may constrain all layers.

## Prohibited Dependency Inversions

* MSL must not depend on a specific user interface.
* MSC core must not depend on MPE or MAE.
* MSG must not depend on one database.
* MKE must not depend on one documentation renderer.
* Canonical knowledge must not depend on a publication format.
* Core compilation must not require an AI provider.
* Applications must not redefine ontology or semantic identity.
* A downstream projection must not become the source of canonical meaning.

---

# 11. Principal Knowledge Flow

## Capture

Knowledge enters through:

* authored MSL;
* imported specifications;
* source-code analysis;
* repository artifacts;
* issue trackers;
* research;
* runtime observations;
* external schemas;
* human decisions.

## Compilation

MSC:

* discovers artifacts;
* parses representations;
* normalizes source concepts;
* collects declarations;
* creates symbols;
* resolves namespaces and references;
* analyzes types and constraints;
* evaluates authority and lifecycle;
* constructs semantic knowledge.

## Semantic Representation

MSG captures:

* concepts;
* identities;
* relationships;
* constraints;
* evidence;
* provenance;
* authority;
* lifecycle;
* uncertainty;
* conflicts.

## Persistence

MKE:

* stores graph snapshots;
* versions changes;
* indexes semantics;
* tracks history;
* supports queries;
* preserves lineage.

## Projection

Knowledge services derive:

* documentation;
* execution plans;
* AI context;
* reports;
* search views;
* dashboards;
* diagrams;
* source code.

## Feedback

Execution, publication, review, and observation may produce new evidence or knowledge.

That knowledge re-enters the lifecycle through explicit capture and compilation.

---

# 12. User and Contributor Experiences

## CLI

Provides scriptable local access to:

* repository initialization;
* validation;
* compilation;
* inspection;
* querying;
* projection;
* status.

## TUI

Provides an interactive terminal experience for:

* configuration;
* guided authoring;
* repository planning;
* semantic inspection;
* workflow selection.

## Web Application

May provide:

* graph exploration;
* knowledge editing;
* dashboards;
* project status;
* publication preview;
* collaboration.

## IDE Integration

May provide:

* semantic navigation;
* diagnostics;
* reference lookup;
* hover explanations;
* specification assistance;
* work-packet context.

## Agents

May consume:

* semantic context;
* work-packet scope;
* architecture constraints;
* implementation requirements;
* provenance.

Agent outputs remain subject to validation and authority rules.

## Documentation Site

Presents human-facing projections of:

* vision;
* architecture;
* specifications;
* guides;
* references;
* journals;
* roadmap;
* project status.

The documentation site is not the canonical source of semantic truth.

## APIs

Expose:

* compilation;
* query;
* graph inspection;
* publication;
* context assembly;
* project status;
* integration.

---

# 13. External Integration Boundaries

Monad may integrate with external systems through explicit adapters.

## Source Control

Examples:

* Git;
* GitHub;
* GitLab;
* other repository hosts.

Potential knowledge:

* commits;
* branches;
* pull requests;
* diffs;
* authorship;
* release tags.

## Package Ecosystems

Examples:

* Cargo;
* npm;
* PyPI;
* Go modules;
* Maven.

Potential knowledge:

* package identity;
* versions;
* dependencies;
* compatibility;
* provenance.

## Language Toolchains

Examples:

* compilers;
* language servers;
* linters;
* test frameworks.

Potential knowledge:

* source symbols;
* diagnostics;
* build graphs;
* test results.

## Issue and Planning Systems

Examples:

* GitHub Issues;
* Jira;
* Linear;
* Monday.com.

Potential knowledge:

* work items;
* decisions;
* status;
* ownership;
* dependencies.

## CI and Operations Systems

Potential knowledge:

* builds;
* tests;
* deployments;
* incidents;
* metrics;
* runtime evidence.

## Document Formats

Potential inputs:

* Markdown;
* YAML;
* JSON;
* OpenAPI;
* AsyncAPI;
* diagrams;
* PDFs;
* office formats.

Support must be explicit.

Readable text is not automatically semantically understood.

## AI Providers

May support:

* extraction;
* classification;
* assistance;
* summarization;
* inference;
* planning.

Provider output must preserve origin and must not receive automatic authority.

## Storage Systems

MKE may support several storage implementations behind stable semantic contracts.

The ecosystem must not define MKE as one database product.

---

# 14. Self-Hosting

Monad's long-term self-hosting objective is for Monad to use its own architecture to manage its own development.

Stages may include:

## Stage 1 — Validate Monad Artifacts

Monad validates:

* specifications;
* ADR metadata;
* work-packet metadata;
* registry consistency.

## Stage 2 — Compile Monad Specifications

MSC compiles Monad's own MSL and MSC specifications into MSG.

## Stage 3 — Persist Monad Knowledge

MKE stores and versions the project's semantic knowledge.

## Stage 4 — Publish Monad Documentation

MPE derives:

* documentation;
* reference pages;
* architecture views;
* journal entries;
* project status.

## Stage 5 — Support Monad Engineering

Agents and tools consume semantic project context to:

* implement work packets;
* review changes;
* explain architecture;
* generate projections.

## Stage 6 — Evolve Monad Through Monad

Accepted changes to architecture, specifications, implementation, and publication are managed as linked semantic artifacts.

Self-hosting is a staged objective.

It must not be represented as a current capability until implemented and verified.

---

# 15. Ecosystem Invariants

The ecosystem must preserve the following invariants.

1. Knowledge has primacy over representation.
2. Every major subsystem has one primary responsibility.
3. MSL expresses knowledge but does not compile it.
4. MSC compiles knowledge but does not become the persistent knowledge store.
5. MSG represents one semantic snapshot but does not define a storage product.
6. MKE persists knowledge but does not replace compiler semantic analysis.
7. Projections derive from canonical knowledge and do not redefine it.
8. Publication is separate from canonical knowledge.
9. Execution representations remain derived.
10. AI-derived conclusions remain nonauthoritative until validated or adopted.
11. Repository taxonomy and runtime architecture remain distinct.
12. Foundational systems do not depend on presentation systems.
13. Core deterministic compilation does not require remote services.
14. Provenance must remain traceable.
15. Authority and lifecycle must remain distinct.
16. Uncertainty and conflict must not be erased silently.
17. Historical knowledge should be superseded, deprecated, withdrawn, or archived rather than deleted without trace.
18. Names must remain distinct from identities.
19. Compiler representations must remain distinct from durable semantic knowledge.
20. Every new subsystem must justify its existence through a unique primary responsibility.

---

# 16. Ecosystem Maturity

## Implemented

At the current architecture stage, implementation is limited and bootstrap-oriented.

Examples may include:

* repository structure;
* initial CLI prototypes;
* work-packet files;
* vision documents;
* specification artifacts.

No subsystem should be represented as fully implemented unless code, tests, and acceptance evidence support that claim.

## Partially Implemented

Potentially:

* CLI bootstrap;
* repository inspection;
* repository initialization experiments.

Exact status belongs in `engineering/PROJECT-STATUS.md`.

## Specified or In Specification

* MSL core;
* MSC core;
* MKE core;
* artifact and knowledge concepts.

## Accepted but Pending Detailed Specification

* MSG as the canonical semantic graph;
* MGO as the ontology layer;
* MPE as publication service;
* KIR as lowered representation.

## Planned

* persistent MKE implementation;
* publication pipeline;
* semantic documentation site;
* semantic search;
* AI context services;
* self-hosting.

## Provisional

* MAE naming and exact boundaries;
* broader execution-runtime architecture;
* KPR as a possible future replacement or generalization of KIR.

## Deferred

* distributed knowledge federation;
* formal proof infrastructure;
* full runtime execution environment;
* multi-organization governance;
* enterprise control plane.

---

# 17. Ecosystem Growth Rules

A new subsystem may be introduced only when:

1. it has one clear primary responsibility;
2. no existing subsystem already owns that responsibility;
3. its inputs and outputs can be stated clearly;
4. its dependency layer is known;
5. at least one concrete consumer exists;
6. its introduction reduces rather than increases ambiguity;
7. its maturity is represented honestly;
8. an ADR is created when the change is architecturally significant.

A new acronym must not be introduced merely to label a feature.

Features should remain within existing subsystem boundaries unless a new independent responsibility genuinely exists.

---

# 18. Contributor Orientation

A new contributor should read Monad in this order:

1. `README.md`
2. `vision/manifesto.md`
3. `vision/principles.md`
4. `vision/laws.md`
5. `vision/glossary.md`
6. `vision/ecosystem.md`
7. `vision/architecture-map.md`
8. accepted ADRs;
9. relevant specifications;
10. active work packet;
11. implementation code.

This order moves from:

* why;
* to vocabulary;
* to system shape;
* to decisions;
* to contracts;
* to current work;
* to implementation.

---

# 19. Summary Responsibility Matrix

| Subsystem       | Maturity                                 | Primary Responsibility                                       |
| --------------- | ---------------------------------------- | ------------------------------------------------------------ |
| MSL             | In specification                         | Express engineering knowledge and specification intent       |
| MSC             | In specification                         | Compile supported artifacts into analyzed semantic graphs    |
| MSG             | Accepted; pending detailed specification | Represent one compiled semantic knowledge snapshot           |
| MKE             | In specification                         | Persist, version, index, query, govern, and evolve knowledge |
| MGO             | Planned                                  | Define the graph's foundational semantic vocabulary          |
| MPL             | Reserved                                 | Express publication structure and intent                     |
| MPE             | Planned                                  | Produce human-facing projections from knowledge              |
| MAE             | Provisional                              | Assemble semantic context and support AI reasoning           |
| KIR             | Accepted current term                    | Represent lowered execution- or backend-oriented projections |
| CLI/TUI/Web/IDE | Planned or partial                       | Provide user-facing access to Monad capabilities             |

---

# 20. Status

Draft.

This document establishes the canonical bootstrap view of the Monad ecosystem.

It should be promoted to **Accepted** after:

* WP-AF-0006 completes the architecture map;
* WP-AF-0007 confirms the compiler pipeline;
* WP-AF-0008 confirms the knowledge lifecycle;
* the Architecture Freeze consistency review confirms that subsystem responsibilities and dependencies remain coherent.

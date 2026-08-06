---

artifact:
id: MONAD-VISION-GLOSSARY
type: vision.glossary
namespace: monad

metadata:
title: Monad Canonical Glossary
version: 0.1.0
status: draft
created: 2026-08-05
authors:
- Monad Architecture Team
tags:
- vision
- glossary
- terminology
- architecture
- knowledge

relationships:
depends_on:
- MONAD-VISION-MANIFESTO
- MONAD-VISION-PRINCIPLES
- MONAD-VISION-LAWS
enables:
- MONAD-VISION-ECOSYSTEM
- MONAD-VISION-ARCHITECTURE-MAP
- MSC-CORE-0008
- MSG-CORE
- MKE-CORE
----------

# Monad Canonical Glossary

## 1. Purpose

This glossary defines the canonical terminology used throughout the Monad ecosystem.

It exists to prevent architectural drift caused by:

* one term being used for several different concepts;
* several terms being used for the same concept;
* implementation terminology being confused with semantic terminology;
* storage, syntax, representation, and knowledge being treated as interchangeable;
* subsystem names changing without an explicit architectural decision.

Unless a specification provides a narrower domain-specific definition, the definitions in this glossary apply across:

* vision documents;
* architectural decision records;
* specifications;
* work packets;
* implementation;
* tests;
* documentation;
* publications;
* engineering journals;
* project governance.

A new architectural term should not become canonical merely because it appears in discussion or source code. It should be defined here, in a normative specification, or in an accepted ADR.

---

## 2. Terminology Rules

### 2.1 Canonical Term

A **canonical term** is the preferred term for a concept across the Monad ecosystem.

Canonical terms should be used in:

* specifications;
* source-code identifiers where practical;
* diagrams;
* documentation;
* work packets;
* public explanations.

### 2.2 Contextual Definition

A specification may define a more precise meaning for a term within its own domain.

A contextual definition must:

* remain compatible with the canonical definition;
* identify its narrower scope;
* avoid silently redefining the term for the rest of the ecosystem.

### 2.3 Deprecated Term

A **deprecated term** remains recognizable for historical compatibility but should not be introduced into new artifacts.

Deprecated terminology should identify its preferred replacement.

### 2.4 Reserved Term

A **reserved term** has been identified as architecturally significant but is not yet fully specified.

Reserved terms must not be treated as accepted subsystem contracts.

### 2.5 Working Term

A **working term** is provisional language used during research or architecture exploration.

A working term does not become canonical until accepted through the appropriate process.

---

# 3. Foundational Concepts

## Architecture

The durable organization of responsibilities, boundaries, dependencies, invariants, and interactions that determine how a system is structured and evolves.

Architecture is not merely:

* a directory tree;
* a diagram;
* a technology list;
* a deployment layout;
* a collection of implementation choices.

Architecture explains why responsibilities exist and why they are separated.

---

## Architecture Freeze

A project phase in which the fundamental architecture is treated as stable by default so implementation can proceed without continual structural redesign.

An architecture freeze does not mean architecture can never change.

It means architectural changes require evidence such as:

* a contradiction;
* an implementation blocker;
* a correctness problem;
* a security problem;
* a materially better design supported by analysis.

---

## Architecture Map

A high-level representation of the Monad ecosystem showing:

* architectural layers;
* subsystems;
* responsibilities;
* producers;
* consumers;
* dependency direction;
* boundaries.

The architecture map is explanatory. It does not replace normative specifications.

---

## Artifact

A bounded, identifiable product of engineering activity that may be authored, generated, observed, imported, compiled, stored, transformed, reviewed, or published.

Examples include:

* specifications;
* ADRs;
* work packets;
* source files;
* tests;
* diagrams;
* datasets;
* compiler outputs;
* semantic graphs;
* journal entries;
* releases.

An artifact may have:

* semantic identity;
* one or more representations;
* lifecycle;
* authority;
* provenance;
* version;
* relationships.

An artifact is not synonymous with a file.

---

## Artifact Identity

The stable identity assigned to an artifact independently of its current representation, storage location, filename, or serialization.

Artifact identity allows one artifact to survive:

* file moves;
* format changes;
* repository reorganization;
* database migration;
* publication into several outputs.

---

## Canonical

The accepted reference form or semantic authority for a particular purpose.

Canonical does not necessarily mean:

* only;
* immutable;
* original;
* human-authored;
* stored in one file.

The canonical object is the one other representations or processes must treat as the governing reference for the declared domain.

---

## Canonical Knowledge

The accepted semantic knowledge from which downstream projections are derived.

Canonical knowledge must preserve:

* identity;
* meaning;
* relationships;
* provenance;
* authority;
* lifecycle;
* uncertainty;
* conflict where unresolved.

Canonical knowledge is not equivalent to its storage serialization.

---

## Concept

A distinguishable unit of meaning.

A concept may be represented by:

* a semantic node;
* a declaration;
* an artifact;
* a type;
* a relationship;
* a term;
* a policy;
* an event.

Not every concept must be independently persisted.

---

## Context

The explicit semantic conditions under which knowledge is interpreted or applied.

Context may include:

* namespace;
* scope;
* package;
* version;
* profile;
* lifecycle;
* authority;
* target platform;
* active features;
* source artifact;
* user or agent intent.

Context must not be replaced by undocumented assumptions.

---

## Domain

A coherent area of knowledge, responsibility, or engineering concern.

Examples include:

* vision;
* specifications;
* engineering;
* research;
* publication;
* compilation;
* knowledge persistence.

A repository directory may correspond to a domain, but directories and domains are not inherently identical.

---

## Engineering Knowledge

Structured or unstructured knowledge relevant to understanding, creating, validating, operating, governing, or evolving an engineered system.

Engineering knowledge includes:

* requirements;
* constraints;
* decisions;
* rationale;
* assumptions;
* architecture;
* specifications;
* implementation relationships;
* tests;
* evidence;
* defects;
* work history;
* provenance;
* operational behavior.

Source code is one form of engineering knowledge, not the entirety of it.

---

## Evidence

Information used to support, challenge, validate, or qualify a claim.

Evidence may include:

* tests;
* measurements;
* observations;
* source artifacts;
* approvals;
* proofs;
* benchmarks;
* conformance results;
* runtime traces.

Evidence is not automatically proof.

---

## Fact

A semantic claim represented as true within an explicit context and authority model.

A fact must preserve:

* subject;
* predicate or property;
* value or object;
* provenance;
* authority;
* applicability;
* lifecycle;
* confidence or validation state where relevant.

A fact without provenance may still be represented, but its reliability must remain explicit.

---

## Information

Data that has been organized or interpreted enough to communicate meaning.

Information is not necessarily:

* validated;
* canonical;
* authoritative;
* connected to the wider semantic model.

Compilation may transform information into structured knowledge.

---

## Invariant

A condition required to remain true throughout a declared semantic domain, lifecycle interval, compiler phase, or execution context.

An invariant must identify:

* the governed subject;
* applicability;
* enforcement phase;
* violation behavior;
* evidence requirements where applicable.

---

## Knowledge

Meaningful, contextualized information whose identity, relationships, provenance, authority, lifecycle, and uncertainty can be represented and reasoned about.

Within Monad, knowledge is not merely:

* text;
* data;
* a file;
* a database row;
* a model output;
* a search result.

Knowledge becomes operationally useful when the system can answer:

* what it means;
* where it came from;
* what it relates to;
* whether it is applicable;
* how strongly it is supported;
* what depends upon it.

---

## Knowledge Domain

A coherent class of engineering knowledge with its own artifact types, relationships, lifecycle rules, and authority model.

Examples include:

* vision knowledge;
* specification knowledge;
* implementation knowledge;
* research knowledge;
* work-management knowledge;
* publication knowledge.

---

## Knowledge Lifecycle

The progression by which knowledge is:

1. observed or conceived;
2. captured;
3. represented;
4. compiled;
5. validated;
6. persisted;
7. versioned;
8. queried;
9. projected;
10. applied;
11. evaluated;
12. evolved.

The lifecycle is not necessarily linear. Knowledge may be revised, contested, superseded, or withdrawn.

---

## Meaning

The semantic interpretation of an artifact, declaration, statement, relationship, or value within a declared context.

Meaning is distinct from syntax and presentation.

Equivalent meaning may have several representations.

---

## Model

A structured representation of selected concepts and relationships for a particular purpose.

A model is necessarily selective. It does not reproduce reality in full.

Examples include:

* artifact model;
* type model;
* compiler model;
* ontology model;
* publication model.

---

## Projection

A derived view or representation produced from canonical knowledge for a defined consumer, purpose, or target.

Examples include:

* documentation pages;
* journal entries;
* source code;
* execution plans;
* reports;
* diagrams;
* presentations;
* AI context;
* search indexes.

A projection must not silently redefine canonical knowledge.

---

## Representation

A concrete form in which an artifact or knowledge structure is expressed, stored, transmitted, edited, or displayed.

Examples include:

* Markdown;
* YAML;
* JSON;
* an AST;
* a graph serialization;
* a database schema;
* HTML;
* a PDF;
* source code.

Representation is distinct from identity and meaning.

---

## Semantic Identity

A stable identity assigned to a concept based on what it is, rather than where or how it is represented.

Semantic identity must remain independent from:

* filename;
* source location;
* declared display name;
* database row ID;
* compiler memory address;
* serialization format.

---

## Source of Truth

The governing authority for a declared category of information or semantics.

Monad distinguishes several possible sources of truth:

* authored source representation;
* accepted specification;
* compiled semantic graph;
* persistent historical knowledge;
* generated projection.

A source of truth must always be qualified by domain.

For canonical compiled meaning, the Monad Semantic Graph is the source of truth for one compilation snapshot.

For persistent historical knowledge, the Monad Knowledge Engine is the source of truth across stored graph versions.

---

## System

A bounded collection of interacting components, rules, artifacts, and environments organized to achieve one or more purposes.

---

# 4. Identity, Provenance, Authority, and Lifecycle

## Adoption

An authorized process through which provisional, inferred, generated, observed, or imported knowledge gains a stronger accepted authority.

Adoption must preserve:

* prior authority;
* adopting actor or process;
* evidence;
* rationale;
* effective time or version;
* resulting authority.

---

## Authority

The recognized standing of a knowledge claim within a declared context.

Authority answers questions such as:

* Is this informative or normative?
* Is it approved?
* May it drive code generation?
* May it be published as canonical?
* May it override another claim?

Authority is distinct from:

* trust in the software component that produced it;
* correctness;
* confidence;
* lifecycle;
* visibility;
* access control.

---

## Authority Class

A named category of authority.

Potential classes include:

* informative;
* observed;
* inferred;
* provisional;
* candidate;
* normative;
* machine-normative;
* approved;
* contested;
* withdrawn.

The stable authority vocabulary must be defined by the relevant specifications.

---

## Confidence

A representation of how strongly a conclusion or inference is supported.

Confidence must not be confused with authority.

A high-confidence inference may still lack normative authority.

An authoritative declaration may later be shown to be incorrect.

---

## Derivation

A traceable process by which one semantic fact, artifact, or representation is produced from others.

A derivation must identify:

* inputs;
* rule or transformation;
* rule version;
* environment where relevant;
* output;
* losses;
* provenance.

---

## Lineage

The chain of origins and transformations connecting an artifact or semantic fact to its predecessors.

Lineage may include:

* source artifact;
* normalized representation;
* canonical AST;
* declaration;
* semantic node;
* publication projection.

---

## Lifecycle

The state and permitted evolution of an artifact, declaration, fact, or subsystem over time.

Typical lifecycle states may include:

* draft;
* review;
* accepted;
* implemented;
* deprecated;
* superseded;
* withdrawn;
* archived.

Lifecycle is distinct from authority.

---

## Origin

The immediate source or process from which an artifact or semantic item was obtained.

Examples include:

* authored;
* imported;
* generated;
* inferred;
* observed;
* migrated;
* normalized;
* compiled.

Origin is one part of provenance.

---

## Provenance

The complete traceable context explaining where an artifact or semantic claim came from and how it reached its current state.

Provenance may include:

* source identity;
* author or producing system;
* timestamps;
* transformation history;
* version;
* evidence;
* authority changes;
* adoption;
* migration;
* compilation invocation.

---

## Supersession

A lifecycle relationship in which one artifact, declaration, rule, or version replaces another for future applicability while preserving the prior item for history.

Supersession must retain:

* predecessor;
* successor;
* effective boundary;
* compatibility;
* migration guidance;
* historical-reference behavior.

---

## Traceability

The ability to navigate relationships among engineering artifacts and semantic claims.

Examples include tracing:

* requirement to design;
* design to implementation;
* implementation to test;
* test to evidence;
* specification to generated documentation;
* work packet to commit;
* journal entry to decisions and artifacts.

---

## Trust

The degree to which a component, provider, process, artifact source, or identity is permitted to participate in a system operation.

Trust is a security and policy concept.

Trust in a compiler plugin does not grant authority to the knowledge it produces.

---

## Validation

A process that determines whether an artifact, semantic item, or output satisfies applicable rules or constraints.

Validation may establish conformance but does not necessarily establish truth.

---

## Verification

A process that gathers evidence that an implementation, artifact, transformation, or result satisfies defined expectations.

Verification is broader than testing and may include:

* static checks;
* formal proof;
* conformance;
* runtime observation;
* review.

---

# 5. Artifact and Engineering-Process Terms

## Architectural Decision Record

An artifact that records a significant architectural decision, its context, considered alternatives, rationale, consequences, and status.

Canonical abbreviation: **ADR**.

An ADR records a decision. It does not replace the specification that defines resulting behavior.

---

## Backlog

The ordered or categorized set of identified work that has not yet become active.

The backlog is not canonical historical truth. It represents present planning state.

---

## Completion Report

The historical outcome section or projection of a completed work packet describing what actually happened.

Within the bootstrap Work Packet System, the completion report may exist inside the canonical work-packet artifact.

---

## Definition of Done

The explicit checklist or state conditions required for a unit of work to be considered complete.

The Definition of Done is broader than acceptance criteria and may include:

* review;
* tests;
* documentation;
* commit state;
* registry updates;
* cleanup.

---

## Deliverable

An artifact or measurable outcome that a work packet, increment, milestone, or project is expected to produce.

---

## Engineering Journal

A chronological or thematic narrative explaining the development of Monad.

The engineering journal emphasizes:

* discoveries;
* rationale;
* tradeoffs;
* mistakes;
* pivots;
* lessons;
* historical context.

The journal is not the normative specification set.

---

## Engineering Log

The broader body of records that preserves the history of engineering activity.

It may include:

* work packets;
* execution notes;
* journal entries;
* commits;
* decisions;
* experiments;
* milestones;
* status reports.

---

## Execution Record

The evolving record of what occurs while a work packet is active.

It may include:

* progress;
* blockers;
* discoveries;
* deviations;
* intermediate decisions;
* commit references.

Within the bootstrap model, the execution record may be maintained inside the canonical work packet.

---

## Implementation Threshold

A declared architectural and specification milestone at which enough is known to begin implementation without waiting for the entire future design to be completed.

Canonical abbreviation: **IT** followed by a sequence number, such as `IT-1`.

---

## Milestone

A named project checkpoint achieved through completion of a defined set of outcomes or work packets.

A milestone is outcome-oriented.

It is not synonymous with a calendar deadline.

---

## Planning Work Packet

The planning state of a work packet before execution begins.

It defines:

* purpose;
* scope;
* dependencies;
* tasks;
* risks;
* acceptance criteria;
* expected deliverables.

---

## Program

A coordinated body of related engineering work directed toward a broad strategic outcome.

---

## Program Increment

A bounded group of work packets executed together to produce an integrated project outcome.

Canonical abbreviation: **PI**.

A program increment should define:

* objectives;
* scope;
* included work packets;
* dependencies;
* exit criteria;
* follow-on increment.

---

## Project Status

The current summarized state of the engineering program, including:

* active phase;
* active milestone;
* active work packet;
* progress;
* blockers;
* next action;
* accepted architecture;
* implementation readiness.

The bootstrap project-status artifact is `engineering/PROJECT-STATUS.md`.

---

## Roadmap

A directional, ordered description of major future phases, milestones, and outcomes.

A roadmap is not a detailed execution plan.

---

## Work Packet

The canonical engineering artifact representing one bounded unit of work throughout planning, execution, review, and completion.

Canonical abbreviation: **WP**.

A work packet may include:

* machine-readable metadata;
* purpose;
* background;
* objectives;
* scope;
* inputs;
* deliverables;
* tasks;
* acceptance criteria;
* execution notes;
* completion outcome;
* commit references;
* follow-up work.

A work packet is larger than a commit and smaller than a milestone or program increment.

---

## Work Packet Status

The lifecycle state of a work packet.

Bootstrap states include:

* draft;
* planned;
* ready;
* active;
* blocked;
* review;
* completed;
* deferred;
* cancelled;
* superseded.

---

# 6. Language and Specification Terms

## Compilation Profile

A named policy controlling how compilation behaves for a particular purpose.

A profile may determine:

* strictness;
* required languages;
* permitted extensions;
* authority thresholds;
* lifecycle thresholds;
* unresolved-reference tolerance;
* output readiness;
* backend requirements.

---

## Domain-Specific Language

A language designed for a bounded problem domain rather than general-purpose computation.

Canonical abbreviation: **DSL**.

MSL is a family of domain-specific languages for expressing engineering knowledge.

---

## Grammar

The syntactic rules governing how valid language constructs are formed.

Grammar defines form, not complete meaning.

---

## Language

A versioned system of syntax, semantics, constraints, and interpretation rules used to express knowledge or computation.

A language may have several syntaxes or representations.

---

## Language Family

A coordinated set of related languages sharing foundational concepts, identities, compiler infrastructure, and semantic integration rules.

MSL is a language family.

---

## Machine-Normative

A form of authority indicating that a construct is intended to be consumed and enforced directly by machines.

Machine-normative content requires precise semantics and must not depend on ambiguous natural-language interpretation.

---

## Monad Publication Language

The proposed language family for expressing publication structures and publication intent.

Canonical abbreviation: **MPL**.

Status: reserved and not yet fully specified.

---

## Monad Specification Language

The language family used to express engineering knowledge and specification intent.

Canonical abbreviation: **MSL**.

MSL is not necessarily one concrete syntax. It may include specialized languages for:

* types;
* constraints;
* documents;
* policies;
* packages;
* workflows;
* other engineering domains.

---

## Normative

Intended to prescribe, constrain, or define accepted behavior or meaning.

Normative content may be human-readable, machine-readable, or both.

---

## Normative Requirement

A requirement expressed using enforceable terms such as:

* MUST;
* MUST NOT;
* SHOULD;
* SHOULD NOT;
* MAY.

Normative requirements should have stable identifiers where practical.

---

## Schema

A structured definition of permitted forms, fields, identities, constraints, and relationships for a representation or semantic model.

A schema does not necessarily define all semantic behavior.

---

## Specification

A versioned engineering artifact that defines expected semantics, behavior, structure, constraints, interfaces, or conformance requirements.

A specification is distinct from:

* a vision document;
* an ADR;
* a work packet;
* implementation;
* documentation.

---

## Syntax

The concrete form in which language constructs are written or serialized.

Syntax is distinct from semantics.

---

## Semantics

The meaning assigned to valid language constructs.

Semantics determine what a construct represents and how it participates in analysis, validation, and transformation.

---

# 7. Compiler Terms

## Abstract Syntax Tree

A structured representation of parsed syntax that omits some concrete presentation details.

Canonical abbreviation: **AST**.

Monad distinguishes:

* surface AST;
* canonical AST.

---

## Backend

A compiler or projection component that consumes an analyzed representation and produces a target-specific output.

Examples include:

* source-code backend;
* documentation backend;
* validation backend;
* execution backend;
* graph export backend.

---

## Binding

The compiler process of associating declarations, names, references, members, or expressions with compiler-visible semantic entities.

Binding is not synonymous with parsing or type checking.

---

## Canonical AST

The common semantic AST representation produced after normalization or direct canonical authoring.

The canonical AST provides a shared compiler input across different source representations.

It is not the canonical knowledge graph.

---

## Canonicalization Barrier

A compiler boundary that validates canonical structures before downstream semantic passes may consume them.

---

## Compilation

The deterministic or explicitly qualified transformation of authored, imported, observed, or generated engineering information into validated semantic representations and derived outputs.

Monad compilation may include:

* discovery;
* parsing;
* normalization;
* declaration collection;
* binding;
* reference resolution;
* type analysis;
* constraint analysis;
* graph construction;
* projection.

Compilation is broader than text parsing.

---

## Compilation Unit

A bounded set of artifacts and semantic context compiled as one coordinated unit.

A compilation unit defines the relevant:

* inputs;
* profiles;
* dependencies;
* namespaces;
* language set;
* output targets;
* snapshot.

---

## Compiler

A system that transforms source representations into validated semantic representations and projections according to explicit language and transformation rules.

---

## Compiler Pass

A bounded compiler operation that consumes one declared representation and produces or enriches another.

Examples include:

* declaration collection;
* symbol creation;
* type analysis;
* constraint binding;
* semantic graph construction.

---

## Compiler Snapshot

An immutable or completely fingerprinted representation of compiler state at a defined barrier.

Snapshots enable:

* deterministic downstream behavior;
* caching;
* incremental compilation;
* reproducibility;
* inspection.

---

## Declaration

A semantic construct that introduces an identifiable concept capable of ownership, reference, membership, or analysis.

---

## Diagnostic

A structured compiler or engineering report communicating:

* error;
* warning;
* information;
* advice;
* conflict;
* deferred state;
* limit condition.

A diagnostic is an artifact and should preserve provenance and subject identity.

---

## Frontend

A compiler component that interprets an artifact representation and produces a registered compiler representation.

A frontend may produce:

* surface AST;
* canonical AST;
* contained artifact descriptors;
* embedded regions.

---

## Incremental Compilation

Compilation that recomputes only those outputs affected by identified changes while preserving semantic equivalence with a complete rebuild.

---

## Intermediate Representation

A compiler representation designed to support analysis, transformation, optimization, lowering, or backend consumption.

Canonical abbreviation: **IR**.

Not every IR is canonical knowledge.

---

## Lowering

The transformation of a higher-level semantic representation into a more constrained or target-oriented representation.

Lowering should preserve required semantics and report losses.

---

## Monad Specification Compiler

The compiler that transforms supported engineering artifacts into canonical semantic knowledge and related compiler representations.

Canonical abbreviation: **MSC**.

---

## Normalization

The explicit, versioned mapping of a source-domain or surface representation into canonical MSL concepts.

Normalization must preserve provenance, ambiguity, unsupported constructs, and loss information.

---

## Normalizer

A compiler component that implements or executes a registered normalization mapping.

---

## Parser

A component that recognizes syntax and constructs a structured representation.

Parsing establishes structure, not complete semantic validity.

---

## Reproducibility

The property that equivalent declared inputs, versions, configuration, environment, and rules produce semantically equivalent outputs.

---

## Resolution

The process of selecting or identifying the semantic target of an import, alias, name, identity, member, or reference.

---

## Semantic Analysis

Compiler analysis that determines effective meaning after parsing, normalization, declaration collection, and reference resolution.

Semantic analysis may include:

* type analysis;
* constraint analysis;
* authority analysis;
* lifecycle analysis;
* compatibility;
* conflict construction;
* readiness.

---

## Surface AST

A structured representation preserving the concepts and organization of a particular source language or format.

A surface AST is an input to normalization.

---

## Symbol

A compiler-visible representation of a declaration or member.

A symbol is distinct from the durable semantic identity of the concept it represents.

---

## Symbol Table

A compiler index used to locate and organize symbols by identity, name, kind, scope, ownership, or membership.

---

# 8. Graph and Ontology Terms

## Edge

A graph relationship connecting nodes.

An edge may carry:

* identity;
* type;
* properties;
* authority;
* lifecycle;
* provenance;
* applicability.

---

## Graph

A structure composed of nodes and relationships.

In Monad, a graph is not merely a storage implementation. It is a natural representation of connected engineering meaning.

---

## Graph Ontology

The formal vocabulary defining which semantic concepts, relationship types, constraints, and classification rules may exist in a graph.

---

## Monad Graph Ontology

The planned ontology defining the foundational semantic vocabulary for Monad knowledge graphs.

Canonical abbreviation: **MGO**.

Status: planned.

MGO defines what kinds of knowledge may exist.

MSG instantiates that vocabulary for a compilation snapshot.

---

## Monad Semantic Graph

The canonical logical semantic graph produced by MSC for one compilation snapshot.

Canonical abbreviation: **MSG**.

MSG contains analyzed semantic knowledge, including where applicable:

* artifacts;
* declarations;
* identities;
* relationships;
* constraints;
* authority;
* lifecycle;
* provenance;
* conflict;
* uncertainty;
* readiness.

MSG is not a database product or serialization format.

---

## Node

A graph element representing a semantic entity, fact-bearing concept, conflict, event, declaration, artifact, or other ontology-defined construct.

---

## Ontology

A formal model of the kinds of concepts and relationships that exist within a domain, including classifications and semantic constraints.

An ontology defines vocabulary and meaning.

It does not itself represent one specific project state.

---

## Reference Graph

A compiler graph recording reference sites, candidate targets, selected targets, unresolved states, paths, and diagnostics.

The reference graph is compiler state, not the final MSG.

---

## Scope Graph

A compiler graph representing name-lookup contexts and permitted transitions between them.

---

## Semantic Graph

A graph whose nodes and edges represent analyzed meaning rather than merely syntax, storage adjacency, or document links.

---

## Subgraph

A semantically or structurally selected portion of a graph.

---

# 9. Knowledge Engine and Persistence Terms

## Historical Knowledge

Knowledge preserved from earlier versions, states, decisions, observations, or compilations.

Historical knowledge may be inactive while remaining queryable and traceable.

---

## Knowledge Engine

A system responsible for persisting, versioning, indexing, querying, relating, governing, and evolving semantic knowledge.

---

## Monad Knowledge Engine

The knowledge kernel of the Monad ecosystem.

Canonical abbreviation: **MKE**.

MKE is responsible for persistent knowledge across graph snapshots and time.

It does not replace MSC.

MSC constructs semantic graphs.

MKE stores and evolves them.

---

## Knowledge Kernel

The foundational system service that manages persistent semantic knowledge for the wider platform.

Within Monad, MKE is the knowledge kernel.

This term describes architectural responsibility, not necessarily an operating-system kernel implementation.

---

## Knowledge Snapshot

An immutable or versioned view of semantic knowledge at a defined point in time or compilation state.

---

## Persistence

The durable retention of knowledge or artifacts beyond the process that created them.

Persistence must preserve relevant identity, version, provenance, authority, and lifecycle.

---

## Query

A structured request for knowledge, relationships, evidence, history, status, or derived results.

---

## Semantic Index

An index organized around meaning, identity, type, relationship, or context rather than only textual tokens or storage location.

---

## Version History

The preserved sequence or graph of changes through which an artifact or knowledge state evolved.

---

# 10. Projection and Service Terms

## AI Context

A bounded, purpose-specific projection of semantic knowledge assembled for use by an AI model or automated reasoning process.

AI context should preserve enough identity, provenance, authority, and relationships to reduce unsupported inference.

---

## Monad AI Engine

The proposed system service for semantic retrieval, context assembly, AI-assisted analysis, and automated reasoning over Monad knowledge.

Canonical abbreviation: **MAE**.

Status: planned.

---

## Monad Publication Engine

The proposed system service for producing human-facing publication projections from semantic knowledge.

Canonical abbreviation: **MPE**.

Potential outputs include:

* documentation;
* journals;
* blogs;
* books;
* release notes;
* presentations;
* websites.

Status: planned.

---

## Publication

A human-facing projection prepared for communication, teaching, reference, review, or distribution.

---

## Publication Knowledge

Semantic knowledge describing:

* audience;
* narrative;
* structure;
* emphasis;
* ordering;
* publication intent;
* source relationships.

Publication knowledge is distinct from rendered output.

---

## Renderer

A component that transforms a publication or projection model into a concrete representation.

Examples include:

* Markdown renderer;
* HTML renderer;
* PDF renderer;
* slide renderer.

---

## View

A selected, organized, or transformed presentation of underlying knowledge without changing its canonical meaning.

---

# 11. Execution-Projection Terms

## Execution Projection

A derived representation optimized for execution, generation, validation, deployment, automation, or backend processing.

---

## Execution Plan

A structured representation of actions, dependencies, conditions, inputs, and expected outputs suitable for controlled execution.

---

## Knowledge Intermediate Representation

The existing name for the compiler representation used for lowering and backend consumption.

Canonical abbreviation: **KIR**.

Current status: retained as the accepted term until changed by an ADR.

KIR is derived from analyzed semantic knowledge and is not the canonical semantic source of truth.

---

## Knowledge Projection Representation

A proposed replacement or generalization of KIR emphasizing projection rather than intermediacy.

Canonical abbreviation: **KPR**.

Status: working term only.

It must not replace KIR in normative artifacts without an accepted ADR and migration plan.

---

## Runtime

A system responsible for executing or enforcing a compiled execution projection.

---

# 12. Repository and Organizational Terms

## Repository Taxonomy

The stable classification of repository content into knowledge and engineering domains.

Current top-level domains may include:

* `vision/`;
* `architecture/` or `adrs/`;
* `specifications/`;
* `engineering/`;
* `research/`;
* `journal/`;
* `knowledge/`;
* implementation directories.

The taxonomy reflects responsibility, not merely file type.

---

## Registry

A structured index of identified artifacts, implementations, languages, specifications, packages, mappings, or capabilities.

A registry entry is not a replacement for the registered artifact.

---

## Workspace

A coordinated set of packages, repositories, artifacts, or compilation units governed by shared configuration or policy.

---

# 13. State and Quality Terms

## Accepted

A maturity state indicating that an artifact has been approved as the current canonical version.

Accepted does not necessarily mean implemented.

---

## Archived

A lifecycle state indicating that an artifact is no longer active but remains preserved for historical access.

---

## Blocked

A work or semantic state in which progress cannot continue until a declared dependency or condition is satisfied.

---

## Complete

A work state indicating that applicable acceptance criteria and Definition of Done have been satisfied.

Complete is context-specific.

A completed specification may still be draft in maturity if review has not occurred.

---

## Conflict

A first-class state in which two or more semantic claims, requirements, values, identities, or conclusions cannot simultaneously be accepted under the active context.

Conflict must not be silently converted into precedence.

---

## Contested

An authority or semantic state indicating that a claim's acceptance is actively disputed.

---

## Deferred

A state indicating that a decision, validation, reference, constraint, or work item has been intentionally postponed until a declared dependency or condition is available.

Deferred does not mean invalid.

---

## Deprecated

A lifecycle state indicating that continued use is discouraged and a replacement may exist, while compatibility or historical use may remain supported.

---

## Deterministic

Producing semantically equivalent output from equivalent declared inputs and environment.

---

## Draft

A maturity state indicating that an artifact is an active working version expected to change.

---

## Implemented

A maturity state indicating that applicable behavior defined by an accepted artifact has been realized in the codebase or operational system.

---

## Incomplete

A state in which some required knowledge, validation, evidence, or work remains absent.

Incomplete knowledge may still be represented and queried.

---

## Invalid

A state indicating that an artifact or semantic item violates applicable structural or semantic rules.

---

## Partial

A state indicating that some valid result exists, but required portions remain unresolved, unsupported, deferred, or invalid.

---

## Ready

A work state indicating that a work packet has sufficient definition and satisfied dependencies to begin execution.

---

## Review

A maturity or work state indicating that an artifact or deliverable is technically complete and awaiting evaluation or acceptance.

---

## Superseded

A lifecycle state indicating that a newer artifact or semantic item has replaced the current one for future applicability.

---

## Unknown

A semantic state indicating insufficient information to determine a value or conclusion.

Unknown is not equivalent to false, null, any, missing, or invalid.

---

## Withdrawn

A lifecycle or authority state indicating that an artifact or claim has been formally removed from current applicability while remaining historically preserved.

---

# 14. Canonical Subsystem Definitions

## Monad

An engineering knowledge compilation platform and knowledge operating environment that transforms human and machine engineering information into canonical semantic graphs from which publications, execution projections, AI context, analytics, validation, and other engineering artifacts may be derived.

---

## MGO

**Monad Graph Ontology**

Defines the foundational vocabulary of semantic concepts and relationships that may exist in Monad knowledge graphs.

Status: planned.

---

## MKE

**Monad Knowledge Engine**

Persists, versions, indexes, queries, governs, and evolves semantic knowledge.

Architectural role: knowledge kernel.

---

## MPL

**Monad Publication Language**

The planned language family for expressing publication structures and intent.

Status: reserved.

---

## MPE

**Monad Publication Engine**

Produces publication-oriented projections from semantic knowledge.

Status: planned.

---

## MSC

**Monad Specification Compiler**

Compiles supported source artifacts into analyzed semantic graphs and derived compiler representations.

---

## MSG

**Monad Semantic Graph**

The canonical logical semantic graph produced by one MSC compilation snapshot.

---

## MSL

**Monad Specification Language**

The language family used to express structured engineering knowledge and specifications.

---

# 15. Distinctions That Must Be Preserved

The following concepts must not be treated as synonyms.

| Concept A         | Concept B           | Distinction                                                                            |
| ----------------- | ------------------- | -------------------------------------------------------------------------------------- |
| Artifact          | File                | An artifact may have many files or no file representation                              |
| Authority         | Trust               | Authority belongs to knowledge; trust governs participation of sources or components   |
| Authority         | Confidence          | A claim may be confident but nonauthoritative                                          |
| Canonical AST     | MSG                 | AST represents normalized source structure; MSG represents analyzed semantic knowledge |
| Compilation       | Parsing             | Parsing recognizes syntax; compilation constructs validated meaning and outputs        |
| Concept           | Representation      | A concept may have several representations                                             |
| Evidence          | Proof               | Proof is a specialized evidence class                                                  |
| Identity          | Name                | Names may change or collide; identity remains stable                                   |
| Import            | Inclusion           | Import establishes semantic availability; inclusion copies content                     |
| Information       | Knowledge           | Knowledge includes explicit context, identity, relationships, and provenance           |
| KIR               | MSG                 | KIR is derived for lowering; MSG is canonical semantic knowledge for a snapshot        |
| Language          | Syntax              | A language may have several syntaxes                                                   |
| Lifecycle         | Authority           | Lifecycle governs evolution and applicability; authority governs standing              |
| MKE               | MSG                 | MSG is one logical graph snapshot; MKE persists graphs across time                     |
| Model             | Reality             | A model is a selective representation                                                  |
| Namespace         | Directory           | Namespace is semantic; directory is storage organization                               |
| Projection        | Canonical Knowledge | A projection derives from knowledge and must not redefine it                           |
| Provenance        | Source Location     | Source location is only one part of provenance                                         |
| Semantic Identity | Symbol ID           | Semantic identity is durable meaning; symbol ID is compiler representation             |
| Specification     | Documentation       | A specification defines behavior; documentation explains or presents it                |
| Validation        | Truth               | Validation establishes rule conformance, not universal truth                           |
| Visibility        | Access Control      | Visibility governs semantic lookup; access control governs authorization               |
| Work Packet       | Issue               | A work packet preserves the complete lifecycle and engineering context of work         |

---

# 16. Deprecated and Provisional Terminology

## Deprecated: Documentation Generator

Preferred terms:

* publication engine;
* documentation projection;
* renderer.

Reason:

Monad is not centered on manually transforming documents into other documents.

---

## Deprecated: Universal Text Fallback

Preferred terms:

* opaque preservation;
* unsupported representation;
* explicit import adapter.

Reason:

Unsupported input must not be treated as semantically understood merely because it can be decoded as text.

---

## Provisional: Engineering Knowledge Operating System

This remains an accepted descriptive phrase, especially when explaining the complete ecosystem.

It is not currently the formal name of a specific executable subsystem.

---

## Provisional: Knowledge Projection Representation

Abbreviation: **KPR**.

This is a candidate future replacement or generalization of KIR.

It is not yet canonical for normative use.

---

## Provisional: Monad AI Engine

Abbreviation: **MAE**.

The subsystem concept is accepted provisionally, but its boundaries and specifications remain future work.

---

## Provisional: Monad Publication Engine

Abbreviation: **MPE**.

The subsystem concept is accepted provisionally, but its implementation and specifications remain future work.

---

# 17. Glossary Governance

## 17.1 Adding a Term

A term should be added when it:

* appears across several artifacts;
* affects architecture or implementation;
* is likely to be misunderstood;
* establishes a stable distinction;
* names a first-class Monad concept.

## 17.2 Changing a Definition

A definition change must identify whether it is:

* editorial clarification;
* compatible refinement;
* architectural change;
* breaking terminology change.

Breaking changes may require:

* an ADR;
* specification migration;
* code changes;
* glossary-version increase;
* deprecation guidance.

## 17.3 Removing a Term

Canonical terms should rarely be deleted.

Preferred handling:

* mark deprecated;
* identify replacement;
* preserve historical definition;
* record migration.

## 17.4 Subsystem Acronyms

A new subsystem acronym should not be introduced casually.

It must have:

* a full name;
* one primary responsibility;
* declared inputs;
* declared outputs;
* dependency placement;
* accepted architectural status.

---

# 18. Glossary Quality Criteria

This glossary is successful when:

1. major architectural documents use consistent terminology;
2. specifications do not repeatedly redefine foundational concepts;
3. subsystem boundaries can be explained using canonical terms;
4. names, identities, representations, and semantics remain distinct;
5. authority, lifecycle, provenance, evidence, and trust remain distinct;
6. compiler representations are not confused with persistent knowledge;
7. provisional terms remain visibly provisional;
8. future contributors can understand Monad without reconstructing vocabulary from scattered discussions.

---

# Status

Draft.

This glossary is the canonical bootstrap vocabulary for the Monad ecosystem. It should be reviewed during the Architecture Freeze consistency review and promoted to **Accepted** when its definitions align with the completed Vision and MSC-CORE documents.

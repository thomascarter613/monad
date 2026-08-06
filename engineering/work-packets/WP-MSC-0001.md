---

id: WP-MSC-0001
title: Semantic Graph Model
status: Ready
priority: P0
estimate: XL
owner: Unassigned

work_cycle: WC-0001
program_increment: PI-002
milestone: M-002

derived_from:

* MSC-CORE-0008

blocks:

* WP-MSC-0002
* WP-MSC-0003
* WP-MSC-0004
* WP-MSC-0005
* WP-MSC-0006

labels:

* compiler
* msg
* semantic-graph
* architecture
* bootstrap

---

# WP-MSC-0001 — Semantic Graph Model

## Objective

Design and implement the **canonical in-memory representation** of the Monad Semantic Graph (MSG).

This work packet establishes the core data model used by every subsequent compiler stage. It does **not** implement parsing, semantic analysis, persistence, or lowering. Its responsibility is to define the immutable graph object that those phases produce or consume.

The result of this work packet is the authoritative runtime model for semantic knowledge inside Monad.

---

# Scope

This work packet includes:

* graph root object
* node model
* edge model
* graph metadata
* graph identity
* graph-local identity
* graph fingerprint field
* provenance attachment points
* authority attachment points
* lifecycle attachment points
* evidence attachment points
* graph partitions
* graph statistics
* immutable construction API
* serialization interfaces
* builder interfaces
* validation interfaces

This work packet explicitly excludes:

* node extraction
* edge extraction
* semantic analysis
* ontology rules
* graph validation logic
* persistence
* KIR lowering
* graph querying
* diff algorithms

---

# Goals

The resulting model SHALL:

* represent every concept required by MSC-CORE-0008;
* be immutable after construction;
* be language-neutral in design;
* support deterministic serialization;
* support partial graphs;
* support future ontology evolution;
* support graph diffing;
* support graph versioning;
* support graph fingerprints;
* support extension metadata without polluting the core model.

---

# Deliverables

Upon completion, the repository SHALL contain:

```text
internal/msg/

    graph.*
    node.*
    edge.*
    identity.*
    fingerprint.*
    metadata.*
    builder.*
    serializer.*
    interfaces.*
```

(Language-specific filenames are implementation decisions.)

---

# Required Types

The following conceptual types MUST exist.

## MonadSemanticGraph

Owns the complete immutable graph.

Responsibilities:

* graph identity
* metadata
* node collection
* edge collection
* statistics
* graph fingerprint
* schema version
* ontology version

---

## MsgNode

Represents one semantic entity.

Required fields:

* semantic_id
* graph_local_id
* ontology_type
* labels
* properties
* provenance
* authority
* lifecycle
* completeness
* annotations

---

## MsgEdge

Represents one semantic relationship.

Required fields:

* semantic_id
* graph_local_id
* relationship_kind
* source_node
* target_node
* direction
* provenance
* authority
* lifecycle
* annotations

---

## GraphMetadata

Contains graph-level information.

Minimum fields:

* graph_identity
* compilation_identity
* schema_version
* ontology_version
* profile
* creation_time
* compiler_version
* completeness
* readiness

---

## GraphStatistics

Tracks summary information.

Minimum fields:

* node_count
* edge_count
* conflict_count
* unresolved_count
* external_reference_count
* provenance_count
* evidence_count

---

## GraphFingerprint

Represents canonical semantic identity of graph contents.

This object SHALL NOT compute fingerprints.

It stores the computed fingerprint.

Fingerprint generation belongs to WP-MSC-0006.

---

# Builder Pattern

Construction SHALL occur exclusively through a builder.

The graph object itself SHALL expose no mutating operations.

Conceptually:

```text
GraphBuilder

↓

addNode()

↓

addEdge()

↓

attachMetadata()

↓

validate()

↓

freeze()

↓

MonadSemanticGraph
```

After `freeze()`:

* no node insertion
* no edge insertion
* no metadata mutation
* no property mutation

---

# Immutability Rules

Every public collection SHALL become immutable.

Node objects SHALL become immutable.

Edge objects SHALL become immutable.

Metadata SHALL become immutable.

Graph statistics SHALL become immutable.

Any mutation requires constructing a new graph snapshot.

---

# Identity Model

Support BOTH:

## Semantic Identity

Stable across compilations.

Never reused for different concepts.

---

## Graph Local Identity

Valid only inside one graph snapshot.

Optimized for:

* lookup
* indexing
* adjacency
* serialization

Graph-local IDs SHALL NOT escape the snapshot boundary.

---

# Relationship Representation

Edges SHALL support:

* directed relationships
* undirected relationships (where ontology allows)
* edge metadata
* edge annotations

Complex relationships SHALL support later reification.

This work packet only provides the representation.

It does not decide when reification occurs.

---

# Property Representation

Properties SHALL support:

* typed values
* unknown
* unresolved
* deferred
* invalid
* conflict reference

Properties SHALL NOT collapse everything into strings.

---

# Collections

The implementation SHOULD optimize for:

* iteration
* lookup by semantic identity
* lookup by graph-local identity
* adjacency traversal
* deterministic ordering

Collection implementation is language-specific.

---

# Required Interfaces

The implementation SHALL expose conceptual interfaces equivalent to:

```text
Graph

GraphBuilder

Node

Edge

Serializer

GraphVisitor

GraphStatistics

GraphMetadata

Fingerprint
```

---

# Serialization Boundary

The graph SHALL NOT know about:

* JSON
* YAML
* CBOR
* protobuf

Instead:

```text
Graph

↓

Serializer Interface

↓

Concrete Serializer
```

Serialization becomes an adapter.

---

# Validation Boundary

The graph SHALL NOT validate ontology rules.

Instead:

```text
Graph

↓

GraphValidator

↓

Diagnostics
```

This keeps the model independent.

---

# Thread Safety

After freeze:

The graph SHALL be safe for concurrent read access.

No locking should be required for ordinary traversal.

---

# Extension Strategy

The model SHALL reserve extension storage.

Extensions SHALL NOT subclass core graph objects.

Instead:

```text
Node

↓

extension map

↓

extension payload
```

This keeps the model stable.

---

# Acceptance Tests

The implementation is complete when the following pass.

## Construction

* empty graph builds
* graph freezes
* graph rejects mutation

---

## Nodes

* node inserted
* node immutable
* node identity preserved

---

## Edges

* edge inserted
* endpoint references valid
* immutable after freeze

---

## Metadata

* metadata attached
* immutable after freeze

---

## Identity

* semantic identity lookup
* graph-local lookup

---

## Statistics

* counts correct
* immutable after freeze

---

## Serialization

Graph serializes through adapters.

Graph contains no serializer logic.

---

## Thread Safety

Concurrent readers cannot mutate graph state.

---

## Snapshot

Graph snapshot remains unchanged after builder destruction.

---

# Out of Scope

Specifically excluded:

* graph persistence
* graph database
* RDF
* Neo4j
* Kùzu
* KIR
* ontology validation
* semantic inference
* incremental compilation
* graph diff
* fingerprint generation

These belong to later work packets.

---

# Dependencies

Requires:

* MSC-CORE-0008

Enables:

* WP-MSC-0002
* WP-MSC-0003
* WP-MSC-0004
* WP-MSC-0005
* WP-MSC-0006

---

# Exit Criteria

This work packet is complete when:

* immutable graph model exists;
* builder API exists;
* node model exists;
* edge model exists;
* metadata model exists;
* graph statistics model exists;
* identity model exists;
* serialization boundary exists;
* validation boundary exists;
* extension boundary exists;
* unit tests pass;
* architecture review approves the design.

---

# Engineering Notes

This work packet deliberately separates **representation** from **construction**.

The graph is a value object, not a compiler phase.

Later work packets are responsible for discovering semantic entities, assigning identities, validating invariants, and producing finalized snapshots. By keeping the graph model free of compiler logic, the same representation can support persistence, inspection, semantic diffing, visualization, AI context generation, and KIR lowering without becoming coupled to any single downstream consumer.

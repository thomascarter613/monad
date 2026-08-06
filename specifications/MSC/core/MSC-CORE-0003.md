---
id: "MSC-CORE-0003"
title: "Artifact Discovery and Compilation Units"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 3
version: "0.1.0"
status: "draft"
created: "2026-08-04"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "artifacts"
  - "discovery"
  - "acquisition"
  - "compilation-units"
  - "dependency-closure"
  - "manifests"
  - "artifact-inventory"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "ADR-0007"
  - "MSL-CORE-0001"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE-0001"
  - "MSC-CORE-0002"
references:
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
  - "MART-CORE"
enables:
  - "MSC-CORE-0004"
  - "MSC-CORE-0005"
  - "MSC-CORE-0006"
  - "MSC-CORE-0007"
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MART-CORE"
  - "MSG-CORE"
  - "KIR-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0003 — Artifact Discovery and Compilation Units

## 1. Purpose

This specification defines how the Monad Specification Compiler discovers, identifies, acquires, classifies, inventories, selects, groups, and resolves artifacts into compilation units.

It establishes:

* artifact discovery;
* artifact locators;
* artifact providers;
* artifact acquisition;
* provisional and canonical identity;
* artifact classification;
* representations;
* discovery roots;
* manifests;
* explicit and implicit inclusion;
* exclusion;
* compilation-unit identity;
* primary and supplementary artifacts;
* dependencies;
* dependency closure;
* artifact roles;
* artifact-set determinism;
* duplicate detection;
* physical and logical artifact boundaries;
* virtual and generated artifacts;
* trust and access context;
* artifact fingerprints;
* compilation-unit validation;
* discovery diagnostics;
* incremental discovery.

This specification replaces file-centric compilation assumptions with an artifact-oriented model.

Files remain supported as physical representations of artifacts.

---

## 2. Context

MSC does not compile only files.

Its inputs may include:

* Markdown documents;
* repository manifests;
* Git objects;
* OpenAPI descriptions;
* source-code units;
* diagrams;
* database records;
* issue-tracker objects;
* pull requests;
* editor buffers;
* AI conversation records;
* MKE artifacts;
* prior surface ASTs;
* serialized canonical ASTs;
* semantic graph fragments;
* virtual projections;
* generated artifacts.

These inputs differ in:

* location;
* representation;
* identity;
* persistence;
* trust;
* authority;
* lifecycle;
* versioning;
* access mechanism;
* discovery semantics.

Before frontend selection or semantic compilation can occur, MSC must construct a deterministic artifact inventory and organize the selected artifacts into coherent compilation units.

A compiler that treats directory traversal as discovery would fail to represent:

* non-file artifacts;
* multi-file logical artifacts;
* one file containing several logical artifacts;
* remote or connector-provided artifacts;
* in-memory editor artifacts;
* generated dependency artifacts;
* virtual artifacts;
* explicit artifact relationships;
* artifact versions independent from locations.

Artifact discovery therefore requires a first-class architectural model.

---

## 3. Scope

This specification defines:

* discovery requests;
* discovery roots;
* artifact providers;
* artifact locators;
* discovery strategies;
* artifact descriptors;
* artifact acquisition;
* artifact representations;
* provisional identity;
* canonical identity association;
* artifact classification;
* artifact inventory;
* inclusion and exclusion;
* manifests;
* artifact roles;
* compilation-unit construction;
* dependency closure;
* duplicate and collision handling;
* virtual artifacts;
* generated artifacts;
* prior compiler artifacts;
* trust;
* access policy;
* fingerprinting;
* discovery caching;
* incremental rediscovery;
* validation and diagnostics.

This specification does not fully define:

* the complete MART artifact ontology;
* frontend selection;
* parsing;
* normalization;
* package resolution algorithms;
* remote connector protocols;
* MKE query interfaces;
* Git implementation;
* filesystem-watching implementation;
* artifact serialization;
* semantic import resolution after binding.

---

## 4. Non-Goals

This specification does not:

* equate artifacts with files;
* make directory layout canonical identity;
* require every artifact to be persisted;
* require all discovered artifacts to be compiled;
* grant authority to an artifact because it was discovered;
* guarantee semantic validity during discovery;
* require network access;
* permit discovery to execute arbitrary code;
* allow implicit discovery to override explicit exclusions silently;
* define one universal manifest format;
* require every provider to support mutation;
* treat cache artifacts as canonical source automatically.

---

## 5. Core Principle

> Discovery determines which artifacts are available; compilation-unit construction determines which artifacts participate together.

Discovery is not compilation.

Acquisition is not trust.

Presence is not authority.

Location is not identity.

Inclusion is not semantic adoption.

Each decision must remain explicit and traceable.

---

## 6. Architectural Position

```text
Compilation Invocation
    ↓
Discovery Request
    ↓
Discovery Roots and Artifact Providers
    ↓
Candidate Artifact Descriptors
    ↓
Artifact Acquisition
    ↓
Artifact Classification
    ↓
Artifact Inventory
    ↓
Inclusion and Exclusion Evaluation
    ↓
Dependency Expansion
    ↓
Compilation-Unit Construction
    ↓
Compilation-Unit Validation
    ↓
Frontend and Normalizer Orchestration
```

---

## 7. Terminology

### 7.1 Artifact Discovery

The process of identifying candidate artifacts relevant to a compiler invocation.

### 7.2 Discovery Request

A structured instruction describing which artifacts should be discovered and for what purpose.

### 7.3 Discovery Root

A starting context from which artifacts may be found.

Examples:

* repository;
* directory;
* workspace;
* package;
* registry;
* Git reference;
* MKE namespace;
* connector collection;
* explicit artifact identity.

### 7.4 Artifact Provider

A component capable of discovering or acquiring artifacts from a location or system.

### 7.5 Artifact Locator

A provider-specific means of locating one artifact representation.

Examples:

* filesystem path;
* Git object ID;
* URL;
* database key;
* connector object ID;
* MKE artifact identity;
* editor-buffer identity.

### 7.6 Artifact Descriptor

Metadata sufficient to identify, classify, acquire, or exclude a candidate artifact without necessarily loading its complete payload.

### 7.7 Artifact Acquisition

The process of obtaining an artifact representation or structured object.

### 7.8 Artifact Inventory

The normalized set of candidate and selected artifacts known to one compiler invocation.

### 7.9 Artifact Role

The purpose an artifact serves within a compilation unit.

### 7.10 Compilation Unit

A versioned, validated artifact set compiled under one coherent semantic context.

### 7.11 Primary Artifact

The artifact defining the principal identity or semantic root of a compilation unit.

### 7.12 Supplementary Artifact

An artifact contributing additional content to a primary artifact without replacing its identity.

### 7.13 Dependency Artifact

An artifact required to interpret, bind, validate, or lower another artifact.

### 7.14 Auxiliary Artifact

An artifact used for context, diagnostics, publication, evidence, or tooling but not required for core semantic compilation.

### 7.15 Generated Artifact

An artifact produced by a prior transformation.

### 7.16 Virtual Artifact

An artifact derivable or addressable without a currently persisted standalone representation.

### 7.17 Provisional Identity

A compiler-assigned identity used before canonical artifact identity is known.

### 7.18 Artifact Set

A deterministic collection of artifact identities, descriptors, roles, and relationships.

### 7.19 Discovery Closure

The complete set of artifacts selected after applying dependency and inclusion rules.

---

## 8. Discovery Request Model

A discovery request conceptually contains:

```text
DiscoveryRequest

├── request_id
├── invocation_id
├── mode
├── profile
├── explicit_artifacts
├── discovery_roots
├── include_rules
├── exclude_rules
├── dependency_policy
├── provider_policy
├── trust_policy
├── access_policy
├── representation_preferences
├── freshness_policy
├── cache_policy
├── resource_limits
└── provenance
```

The resolved request must be part of the compilation plan.

---

## 9. Explicit Artifacts

An invocation may identify artifacts explicitly through:

* canonical artifact identity;
* artifact locator;
* path;
* registry reference;
* package member;
* MKE reference;
* editor buffer;
* Git object;
* connector object.

Explicit artifacts have higher inclusion priority than conventionally discovered artifacts unless prohibited by policy.

Explicit inclusion does not bypass:

* access policy;
* trust policy;
* compatibility checks;
* exclusion by protected governance rules;
* artifact validation.

---

## 10. Discovery Roots

Initial root categories are:

```text
filesystem
repository
workspace
package
registry
git
mke
connector
editor
memory
generated
virtual
```

A root must declare:

* provider;
* locator;
* recursion behavior;
* trust context;
* access context;
* default namespace where applicable;
* discovery conventions;
* exclusions;
* provenance.

---

## 11. Artifact Providers

An artifact provider may support:

* enumeration;
* metadata lookup;
* acquisition;
* revision lookup;
* fingerprint lookup;
* relationship discovery;
* change notifications;
* access checks.

Provider capabilities must be declared.

A provider that supports discovery need not support writes.

---

## 12. Provider Manifest

A provider manifest conceptually contains:

```text
ArtifactProvider

├── provider_id
├── provider_version
├── supported_locator_schemes
├── supported_artifact_classes
├── discovery_capabilities
├── acquisition_capabilities
├── trust_class
├── access_model
├── determinism
├── caching
├── resource_requirements
├── effects
└── compatibility
```

Provider identity is distinct from artifact identity and locator scheme.

---

## 13. Provider Classes

Initial provider classes include:

* local filesystem provider;
* Git provider;
* MKE provider;
* registry provider;
* package provider;
* editor provider;
* database provider;
* object-store provider;
* connector provider;
* in-memory provider;
* generated-artifact provider.

Third-party providers must be registered and constrained by policy.

---

## 14. Artifact Locators

An artifact may have multiple locators.

Examples:

```text
file:///workspace/specifications/MSL/core/MSL-CORE-0001.md
git://repository/<object-id>
mke://monad/MSL-CORE-0001
editor://session-44/buffer-2
registry://specifications/MSL-CORE-0001
```

A locator identifies where or how a representation may be acquired.

It does not replace canonical artifact identity.

---

## 15. Locator Normalization

Providers should normalize locators to a provider-defined canonical form.

Normalization may resolve:

* relative paths;
* symbolic Git references;
* case rules;
* URI encoding;
* package aliases;
* connector object aliases.

Locator normalization must not change artifact identity claims silently.

---

## 16. Artifact Descriptor Model

A candidate descriptor conceptually contains:

```text
ArtifactDescriptor

├── descriptor_id
├── provisional_artifact_id
├── canonical_artifact_id
├── artifact_type_candidate
├── provider_id
├── locators
├── representation_type
├── media_type
├── version
├── revision
├── lifecycle_candidate
├── authority_candidate
├── size
├── content_fingerprint
├── metadata_fingerprint
├── parent_container
├── discovered_relationships
├── acquisition_state
├── trust
├── access
└── provenance
```

Fields may remain unresolved during early discovery.

---

## 17. Provisional Identity

MSC assigns provisional identity when canonical identity is not yet known.

Provisional identity may derive from:

* provider identity;
* normalized locator;
* representation fingerprint;
* container identity;
* discovery invocation.

Provisional identity must remain stable enough for one invocation and incremental comparison where practical.

It must not be presented as canonical semantic identity.

---

## 18. Canonical Identity Association

Canonical identity may become known through:

* artifact metadata;
* manifest declarations;
* parsed front matter;
* registry records;
* MKE records;
* package manifests;
* provider metadata;
* normalization.

When canonical identity becomes known, MSC must preserve the association:

```text
Provisional Artifact Identity
    resolves_to
Canonical Artifact Identity
```

The provisional record must not disappear without lineage.

---

## 19. Discovery Strategies

Initial discovery strategies include:

```text
explicit
manifest_driven
registry_driven
convention_driven
relationship_driven
dependency_driven
provider_enumeration
incremental_change
generated
```

### 19.1 Explicit

Uses invocation-specified artifacts.

### 19.2 Manifest-Driven

Reads artifact declarations from manifests.

### 19.3 Registry-Driven

Queries registered artifact records.

### 19.4 Convention-Driven

Applies configured naming or directory conventions.

### 19.5 Relationship-Driven

Follows declared artifact relationships.

### 19.6 Dependency-Driven

Expands required dependencies.

### 19.7 Provider Enumeration

Enumerates provider-visible candidates.

### 19.8 Incremental Change

Uses provider change records or prior inventory comparison.

### 19.9 Generated

Creates virtual or derived artifact descriptors required by the plan.

---

## 20. Discovery Precedence

Conceptual discovery precedence is:

```text
Explicit invocation
    over
Artifact manifest
    over
Package manifest
    over
Repository manifest
    over
Workspace manifest
    over
Registry configuration
    over
Configured conventions
    over
Provider defaults
```

This precedence affects candidate selection.

It does not permit lower-trust inputs to override protected artifact identity, authority, or lifecycle.

---

## 21. Manifests

Manifests may declare:

* artifact identities;
* artifact types;
* locators;
* representations;
* dependencies;
* compilation-unit membership;
* source roles;
* language versions;
* providers;
* include rules;
* exclude rules;
* profiles;
* extensions;
* generated artifacts.

A manifest is itself an artifact.

Manifest content must be versioned and validated.

---

## 22. Manifest Authority

A manifest may have authority over:

* discovery configuration;
* package membership;
* representation location;
* compilation defaults.

A manifest does not automatically have authority to redefine:

* canonical identity owned elsewhere;
* approved lifecycle;
* normative semantic content;
* trusted provenance.

Manifest authority must be scoped.

---

## 23. Discovery Conventions

Conventions may include:

* recognized filenames;
* recognized extensions;
* standard directories;
* artifact-ID filename patterns;
* embedded front-matter markers;
* package layouts;
* generated-output directories.

Conventions are defaults.

Explicit declarations override them where allowed.

Conventions must be configurable and inspectable.

---

## 24. Inclusion Rules

Inclusion rules may select by:

* artifact identity;
* artifact type;
* provider;
* locator pattern;
* namespace;
* package;
* lifecycle;
* authority;
* representation;
* language;
* tags;
* relationship;
* dependency role.

Rules must be deterministic under equivalent inventories.

---

## 25. Exclusion Rules

Exclusion rules may omit:

* generated outputs;
* caches;
* archives;
* vendor directories;
* temporary artifacts;
* private artifacts;
* unsupported formats;
* artifacts outside profile scope;
* artifacts denied by access policy.

Protected exclusions may not be bypassed by lower-precedence inclusion rules.

---

## 26. Include and Exclude Conflict

When inclusion and exclusion rules conflict, MSC must apply a declared precedence policy.

A recommended conceptual order is:

```text
Access denial
    over
Security exclusion
    over
Explicit protected exclusion
    over
Explicit invocation inclusion
    over
Manifest inclusion
    over
Convention inclusion
```

The final decision and its reason must be inspectable.

---

## 27. Artifact Acquisition

Acquisition may retrieve:

* bytes;
* text;
* structured objects;
* streams;
* AST serialization;
* graph serialization;
* database records;
* in-memory node structures.

The acquired representation must declare:

* provider;
* locator;
* revision;
* encoding or schema;
* fingerprint;
* acquisition timestamp where relevant;
* trust;
* provenance.

---

## 28. Lazy Acquisition

MSC may defer payload acquisition until:

* classification requires content;
* frontend selection requires inspection;
* dependency expansion selects the artifact;
* the artifact becomes part of a compilation unit.

Lazy acquisition improves performance.

It must not cause nondeterministic inclusion decisions.

---

## 29. Acquisition States

Initial acquisition states are:

```text
not_requested
planned
available
acquired
partial
unavailable
access_denied
failed
stale
```

A descriptor may exist without an acquired payload.

---

## 30. Artifact Representations

One logical artifact may have multiple representations.

Examples:

* Markdown source;
* AST serialization;
* rendered HTML;
* MKE record;
* Git blob;
* API projection.

Discovery must distinguish:

* artifact identity;
* representation identity;
* representation type;
* locator;
* revision;
* fingerprint.

---

## 31. Representation Selection

When several representations exist, MSC selects according to:

* requested compiler mode;
* profile;
* trust;
* freshness;
* compatibility;
* source authority;
* provider preference;
* round-trip requirements;
* cache policy.

A derived AST representation must not silently replace a newer authoritative authored representation.

---

## 32. Representation Preference

Conceptual preference examples:

### Authoring Compilation

Prefer authoritative authored source.

### Incremental Editor Compilation

Prefer current editor buffer over persisted file when the buffer is explicitly part of the invocation.

### Reproducible CI

Prefer pinned repository revisions and validated deterministic caches.

### Migration

Prefer original source plus applicable migration metadata.

Preferences must remain explicit.

---

## 33. Artifact Classification

Classification may determine:

* artifact type;
* representation type;
* source language;
* concrete syntax;
* media type;
* container status;
* generated status;
* source role;
* trust;
* likely authority;
* likely lifecycle;
* frontend candidates.

Classification can be:

```text
declared
provider_supplied
deterministic
heuristic
inferred
unknown
```

---

## 34. Classification Confidence

Heuristic or inferred classification should preserve confidence and evidence.

A low-confidence classification must not select an authoritative semantic path without validation.

Frontend parsing may confirm or reject the classification.

---

## 35. Artifact Inventory

The inventory contains every candidate artifact considered by the invocation.

Each entry records:

* discovery source;
* inclusion status;
* exclusion reason;
* descriptor;
* acquisition state;
* classification;
* identities;
* representations;
* compilation-unit memberships;
* dependency state;
* diagnostics.

Excluded artifacts may remain in the inventory for explanation.

---

## 36. Inventory States

An artifact inventory entry may be:

```text
candidate
selected
excluded
dependency
supplementary
duplicate
conflicting
unavailable
blocked
generated
virtual
```

These states are distinct from artifact lifecycle.

---

## 37. Inventory Determinism

Equivalent:

* discovery requests;
* provider snapshots;
* manifests;
* registries;
* access policies;
* profiles;
* compiler versions;

must produce equivalent selected artifact sets.

Provider enumeration order must not determine semantic inclusion.

---

## 38. Artifact Roles

Initial compilation roles include:

```text
primary
supplementary
dependency
import
extension
configuration
schema
evidence
conformance
context
generated_input
prior_compilation
auxiliary
excluded
```

An artifact may have different roles in different compilation units.

---

## 39. Primary Artifacts

A compilation unit normally has one or more declared semantic roots.

A primary artifact may define:

* artifact identity;
* specification identity;
* package identity;
* module identity;
* graph identity;
* migration target.

A compilation unit containing multiple primary artifacts must declare their composition model.

---

## 40. Supplementary Artifacts

Supplementary artifacts may provide:

* additional sections;
* examples;
* machine semantics;
* evidence;
* generated indexes;
* translations;
* diagrams;
* local overlays.

Supplementary artifacts must not silently redefine protected primary identity fields.

---

## 41. Dependency Artifacts

Dependency artifacts are required for:

* parsing;
* normalization;
* type resolution;
* reference resolution;
* extension interpretation;
* profile resolution;
* semantic validation;
* KIR lowering;
* backend execution.

Dependencies must identify their domain and purpose.

---

## 42. Configuration Artifacts

Configuration artifacts control compilation behavior.

Examples:

* workspace manifest;
* repository manifest;
* package manifest;
* profile declaration;
* trust policy;
* backend configuration.

Configuration artifacts must remain distinguishable from semantic artifacts.

---

## 43. Evidence Artifacts

Evidence artifacts support:

* conformance;
* approval;
* observed behavior;
* migration verification;
* test results;
* provenance;
* diagnostics.

Evidence does not automatically become normative intent.

---

## 44. Prior Compilation Artifacts

MSC may consume prior:

* surface ASTs;
* canonical ASTs;
* symbol indexes;
* MSG fragments;
* diagnostics;
* KIR;
* compilation manifests.

Such artifacts must be validated for:

* version compatibility;
* input fingerprints;
* compiler compatibility;
* profile compatibility;
* provenance;
* trust.

---

## 45. Virtual Artifacts

A virtual artifact may represent:

* computed dependency closure;
* semantic projection;
* generated compilation unit;
* editor-only document;
* graph query result;
* synthesized manifest.

Virtual artifacts participating in durable compilation must receive invocation-visible identity and provenance.

---

## 46. Generated Input Artifacts

A generated artifact may become a later compilation input.

MSC must preserve:

* generating invocation;
* generator;
* upstream inputs;
* generated status;
* freshness;
* authority;
* overwrite and regeneration policy.

Generated input must not automatically become authored authority.

---

## 47. Container Artifacts

A container artifact may contain other artifacts.

Examples:

* Markdown file containing several embedded semantic artifacts;
* archive;
* repository;
* package;
* database;
* document bundle.

Containment must remain distinct from semantic ownership.

---

## 48. Multi-Artifact Representations

One physical representation may expose several logical artifacts.

Example:

```text
specification.md

├── Specification Artifact
├── Requirement Artifact
├── Embedded Constraint Artifact
└── Conformance Example Artifact
```

Discovery may initially identify the container.

Parsing and normalization may promote internal elements to first-class artifact descriptors.

---

## 49. Multi-Representation Artifacts

One logical artifact may span several physical representations.

Example:

```text
API Specification Artifact

├── api.md
├── schema.yaml
├── diagram.mmd
└── examples.json
```

The compilation unit must preserve their roles and shared artifact relationship.

---

## 50. Compilation Unit Model

A compilation unit conceptually contains:

```text
CompilationUnit

├── unit_id
├── unit_version
├── unit_kind
├── invocation_id
├── semantic_root
├── artifact_members
├── artifact_roles
├── representations
├── dependencies
├── dependency_policy
├── namespace_context
├── package_context
├── language_context
├── profile
├── extensions
├── trust_context
├── access_context
├── configuration
├── fingerprints
├── completeness
├── diagnostics
└── provenance
```

---

## 51. Compilation Unit Identity

Every compilation unit must have compiler-visible identity.

A durable compilation-unit identity may derive from:

* package identity;
* specification identity;
* explicit manifest identity;
* workspace-defined identity.

An invocation-specific unit instance may also have a unique execution identity.

These identities must remain distinct.

---

## 52. Compilation Unit Kinds

Initial conceptual unit kinds include:

```text
artifact
specification
package
module
workspace
migration
validation
publication
reverse_engineering
backend_generation
editor
```

The unit kind affects membership and completeness rules.

---

## 53. Unit Membership

Membership may be:

* explicit;
* manifest-declared;
* dependency-derived;
* container-derived;
* profile-derived;
* generated.

Every membership decision must preserve its basis.

---

## 54. Unit Boundaries

Compilation-unit boundaries determine:

* declaration scope;
* namespace construction;
* cache boundaries;
* partial-failure isolation;
* dependency closure;
* output readiness;
* graph partitioning.

Boundaries must not be inferred solely from directory structure.

---

## 55. Unit Composition

Compilation units may compose through:

* nesting;
* package membership;
* workspace membership;
* imports;
* dependencies;
* overlays;
* supplementary artifacts;
* generated subunits.

A child unit may compile independently if its dependencies and contracts permit it.

---

## 56. Unit Completeness

Completeness dimensions may include:

```text
membership
acquisition
representation
dependency
language
configuration
trust
semantic
```

Possible states include:

```text
unknown
complete
partial
blocked
invalid
```

A unit may be complete for parsing but incomplete for semantic analysis.

---

## 57. Dependency Model

A dependency conceptually contains:

```text
ArtifactDependency

├── dependency_id
├── source_artifact
├── target_artifact_reference
├── dependency_kind
├── version_domain
├── version_constraint
├── required
├── phase_requirement
├── import_mode
├── visibility
├── lifecycle_policy
├── authority_policy
├── resolution_state
├── provenance
└── diagnostics
```

---

## 58. Dependency Kinds

Initial dependency kinds include:

```text
content
language
syntax
schema
type
reference
package
module
mapping
extension
profile
compiler_pass
msg
kir
backend
evidence
configuration
toolchain
```

A dependency must identify why it is required.

---

## 59. Dependency Phases

Dependencies may be required at different phases.

Examples:

* syntax dependency before parsing;
* mapping dependency before normalization;
* type dependency before type analysis;
* reference dependency before binding completion;
* KIR dependency before backend invocation.

The closure may expand progressively.

---

## 60. Dependency Resolution

Artifact discovery resolves only the artifact availability and representation aspects of dependencies.

Semantic import and reference resolution occur later.

Discovery may determine:

* candidate target;
* artifact existence;
* version availability;
* locator;
* representation;
* access;
* trust.

It must not claim final semantic binding prematurely.

---

## 61. Dependency Closure

Closure expansion conceptually performs:

```text
Selected Root Artifacts
    ↓
Read Declared Artifact Dependencies
    ↓
Resolve Available Candidate Artifacts
    ↓
Apply Version and Access Filters
    ↓
Add Required Artifacts
    ↓
Repeat Until Stable or Blocked
```

Closure computation must be bounded and deterministic.

---

## 62. Optional Dependencies

Optional dependencies may enrich:

* diagnostics;
* documentation;
* semantic relationships;
* conformance;
* publication.

Their absence must not change required core semantics invisibly.

The profile defines whether missing optional dependencies produce warnings.

---

## 63. Dependency Cycles

Artifact dependency cycles may be:

* valid;
* conditionally valid;
* invalid.

Examples:

* mutually referencing type modules may require later fixed-point resolution;
* cyclic package bootstrap dependencies may be prohibited;
* containment cycles are invalid;
* semantic relationship cycles may be valid.

Discovery must preserve cycles for later classification rather than breaking them arbitrarily.

---

## 64. Duplicate Artifacts

Duplicate candidates may arise from:

* multiple locators for one artifact;
* copied files;
* registry and filesystem discovery;
* caches;
* generated projections;
* provider aliases.

Deduplication may use:

* canonical identity;
* representation fingerprint;
* external identity;
* declared equivalence;
* provider metadata.

Similarity alone must not merge authoritative artifacts silently.

---

## 65. Identity Collision

An identity collision occurs when distinct artifacts claim the same canonical identity in overlapping scope.

MSC must preserve:

* all claimants;
* locators;
* representations;
* authority;
* lifecycle;
* fingerprints;
* provenance.

Collision resolution belongs to later semantic analysis or governance.

Discovery must not choose one arbitrarily.

---

## 66. Representation Duplicate

Two representations may be byte-identical or semantically equivalent while representing:

* the same artifact;
* independent copies;
* different artifact versions;
* generated mirrors.

The relationship must be established explicitly or through validated identity evidence.

---

## 67. Artifact Fingerprints

Fingerprint categories may include:

```text
content
metadata
representation
semantic
dependency
inventory
compilation_unit
```

### 67.1 Content Fingerprint

Derived from acquired payload.

### 67.2 Metadata Fingerprint

Derived from provider or descriptor metadata.

### 67.3 Representation Fingerprint

Derived from payload plus representation schema and encoding.

### 67.4 Semantic Fingerprint

Derived later from normalized meaning.

### 67.5 Inventory Fingerprint

Derived from selected artifact descriptors and membership decisions.

### 67.6 Compilation-Unit Fingerprint

Derived from unit membership, roles, dependencies, profile, versions, and configuration.

---

## 68. Fingerprint Stability

A representation fingerprint may change because of formatting.

A semantic fingerprint should not change when only nonsemantic presentation changes.

Discovery typically uses representation-level fingerprints.

Later compiler phases may refine invalidation using semantic fingerprints.

---

## 69. Freshness

Freshness may be evaluated through:

* revision IDs;
* timestamps;
* provider sequence numbers;
* ETags;
* content fingerprints;
* registry versions;
* cache manifests.

Timestamps alone should not be treated as definitive semantic freshness when stronger identifiers exist.

---

## 70. Artifact Trust

Discovery records trust in:

* provider;
* locator;
* representation;
* manifest;
* registry record;
* cache artifact.

Trust classifications may include:

```text
built_in
local_trusted
verified
reviewed
sandboxed
untrusted
unknown
```

Trust does not grant semantic authority.

---

## 71. Artifact Authority

Authority describes the semantic standing of artifact content.

Discovery may preserve declared or candidate authority.

Final authority validation occurs later.

A trusted provider may deliver nonauthoritative content.

An untrusted provider may deliver content claiming authority that MSC must reject or quarantine.

---

## 72. Access Policy

Access policy may restrict:

* artifact discovery;
* metadata visibility;
* payload acquisition;
* caching;
* publication;
* backend use;
* AI-context use.

An artifact denied by policy must not be acquired indirectly through another provider without authorization.

---

## 73. Sensitive Artifact Discovery

Inventories may reveal sensitive metadata even without payload acquisition.

Implementations should support:

* redacted descriptors;
* limited listings;
* access-filtered relationships;
* private cache handling;
* publication-safe inventories.

---

## 74. Discovery Effects

Discovery and acquisition may cause effects such as:

* filesystem reads;
* registry queries;
* network calls;
* connector access;
* cache writes.

Each provider must declare effects.

Offline or local-only profiles may prohibit remote discovery.

---

## 75. Offline Discovery

Offline discovery may use:

* local manifests;
* local filesystem;
* Git object database;
* local registries;
* local MKE snapshot;
* validated caches.

Missing remote artifacts must be reported as unavailable or deferred.

MSC must not fabricate their contents.

---

## 76. Incremental Discovery

Incremental discovery compares:

* prior inventory;
* provider change records;
* root fingerprints;
* manifest revisions;
* registry snapshots;
* explicit invocation changes.

It identifies:

* added artifacts;
* removed artifacts;
* changed representations;
* moved representations;
* identity changes;
* dependency changes;
* access changes.

---

## 77. Artifact Moves

A representation move changes its locator.

It should not change logical artifact identity when identity evidence remains stable.

The inventory should record:

```text
old locator
    relocated_to
new locator
```

---

## 78. Artifact Removal

Removal may mean:

* representation deleted;
* artifact withdrawn;
* provider unavailable;
* access revoked;
* artifact excluded;
* artifact superseded.

Discovery must not collapse these distinct conditions.

---

## 79. Watch Mode

Providers may support change notifications.

Watch mode may update the inventory and invalidate affected compilation units.

Notifications are hints.

MSC must validate resulting provider state before authoritative recompilation.

---

## 80. Discovery Caching

Discovery caches may store:

* root enumeration;
* descriptors;
* provider metadata;
* locators;
* fingerprints;
* manifest parses;
* membership results.

Cache validity depends on provider snapshots, manifests, policies, and compiler configuration.

---

## 81. Compilation-Unit Construction Algorithm

Conceptually:

```text
Resolve Discovery Request
    ↓
Discover Candidate Artifacts
    ↓
Acquire Required Descriptors
    ↓
Classify Candidates
    ↓
Apply Access and Trust Policy
    ↓
Apply Inclusion and Exclusion Rules
    ↓
Identify Semantic Roots
    ↓
Assign Artifact Roles
    ↓
Expand Dependency Closure
    ↓
Detect Duplicates and Collisions
    ↓
Partition into Compilation Units
    ↓
Calculate Unit Fingerprints
    ↓
Validate Unit Completeness
    ↓
Freeze Unit Snapshot
```

---

## 82. Frozen Unit Snapshot

Before frontend orchestration, the compiler should freeze or fingerprint the compilation-unit membership snapshot.

The snapshot contains:

* selected artifacts;
* roles;
* locators;
* revisions;
* fingerprints;
* dependencies;
* provider snapshots;
* profile;
* configuration.

Later provider changes must not silently alter an active invocation.

---

## 83. Dynamic Dependencies

Parsing or normalization may reveal previously unknown dependencies.

MSC may expand the unit through controlled replanning.

Dynamic expansion must:

* preserve the original plan;
* record the new dependency source;
* validate effects and trust;
* update fingerprints;
* avoid unbounded rediscovery;
* produce deterministic results.

---

## 84. Replanning

Replanning may occur when:

* a manifest is discovered;
* an embedded language requires a package;
* normalization requires a mapping;
* a reference reveals an artifact dependency;
* an extension is required.

Replanning must remain explicit in the compilation trace.

---

## 85. Compilation-Unit Validation

Unit validation checks:

* unit identity;
* root artifacts;
* membership consistency;
* role consistency;
* required dependencies;
* provider compatibility;
* representation availability;
* duplicate identities;
* access;
* trust policy;
* profile constraints;
* fingerprint completeness;
* provenance.

---

## 86. Compilation-Unit Conformance

A unit is suitable for frontend orchestration when:

* required input representations are available;
* selected artifacts have supported locator and representation metadata;
* required providers are available;
* protected exclusions were respected;
* membership is deterministic;
* required dependencies are present or explicitly deferred;
* collisions are represented;
* the unit snapshot is traceable.

---

## 87. Normative Requirements

### MSC-ARTDISC-REQ-001

MSC **MUST** treat artifacts, rather than files, as the universal compilation inputs and outputs.

### MSC-ARTDISC-REQ-002

Filesystem paths **MUST NOT** serve as canonical artifact identity.

### MSC-ARTDISC-REQ-003

Every discovery request **MUST** have compiler-visible identity.

### MSC-ARTDISC-REQ-004

Every discovery root **MUST** identify its provider, locator, trust context, access context, and provenance.

### MSC-ARTDISC-REQ-005

Every artifact provider **MUST** have stable identity and version.

### MSC-ARTDISC-REQ-006

Every artifact provider **MUST** declare supported locators, capabilities, effects, trust class, and compatibility.

### MSC-ARTDISC-REQ-007

Provider enumeration order **MUST NOT** determine semantic artifact selection.

### MSC-ARTDISC-REQ-008

Every candidate artifact **MUST** have a descriptor and provisional compiler-visible identity.

### MSC-ARTDISC-REQ-009

Provisional identity **MUST** remain distinguishable from canonical artifact identity.

### MSC-ARTDISC-REQ-010

When canonical identity becomes known, MSC **MUST** preserve its relationship to prior provisional identity.

### MSC-ARTDISC-REQ-011

Artifact locators **MUST** remain distinguishable from artifact identity.

### MSC-ARTDISC-REQ-012

Multiple locators for one artifact **MUST** be representable.

### MSC-ARTDISC-REQ-013

Multiple representations of one artifact **MUST** be representable without creating false artifact identities.

### MSC-ARTDISC-REQ-014

One physical representation containing multiple logical artifacts **MUST** be representable.

### MSC-ARTDISC-REQ-015

Artifact discovery **MUST NOT** grant semantic authority.

### MSC-ARTDISC-REQ-016

Artifact acquisition **MUST NOT** imply trust or semantic validity.

### MSC-ARTDISC-REQ-017

Every acquisition **MUST** record provider, locator, revision, representation, fingerprint, trust, and provenance where available.

### MSC-ARTDISC-REQ-018

Discovery strategies **MUST** be declared or derivable from inspectable configuration.

### MSC-ARTDISC-REQ-019

Explicit, manifest, registry, convention, relationship, and dependency discovery **MUST** remain distinguishable.

### MSC-ARTDISC-REQ-020

Inclusion and exclusion decisions **MUST** preserve the rule and precedence that determined them.

### MSC-ARTDISC-REQ-021

Protected access and security exclusions **MUST NOT** be overridden by lower-authority inclusion rules.

### MSC-ARTDISC-REQ-022

Every discovered manifest **MUST** be treated as an artifact.

### MSC-ARTDISC-REQ-023

Manifest authority **MUST** remain scoped and **MUST NOT** silently redefine protected artifact semantics.

### MSC-ARTDISC-REQ-024

Every artifact inventory **MUST** preserve selected, excluded, unavailable, duplicate, and conflicting candidates needed for explanation.

### MSC-ARTDISC-REQ-025

Equivalent discovery inputs and provider snapshots **MUST** produce equivalent selected artifact sets.

### MSC-ARTDISC-REQ-026

Every compilation unit **MUST** have compiler-visible identity and versioned membership state.

### MSC-ARTDISC-REQ-027

Every artifact member **MUST** have an explicit or deterministically derived role within each compilation unit.

### MSC-ARTDISC-REQ-028

Compilation-unit membership **MUST** preserve the basis for inclusion.

### MSC-ARTDISC-REQ-029

Compilation-unit boundaries **MUST NOT** depend solely on filesystem directories.

### MSC-ARTDISC-REQ-030

Supplementary artifacts **MUST NOT** silently redefine protected primary artifact identity.

### MSC-ARTDISC-REQ-031

Dependencies **MUST** identify dependency kind, phase requirement, required status, version domain, and provenance.

### MSC-ARTDISC-REQ-032

Discovery-layer dependency resolution **MUST NOT** claim final semantic reference resolution.

### MSC-ARTDISC-REQ-033

Dependency closure **MUST** be deterministic and bounded.

### MSC-ARTDISC-REQ-034

Dependency cycles **MUST** be preserved for classification and **MUST NOT** be broken arbitrarily.

### MSC-ARTDISC-REQ-035

Artifact identity collisions **MUST** preserve all claimants and **MUST NOT** be resolved through provider order.

### MSC-ARTDISC-REQ-036

Probabilistic similarity **MUST NOT** silently deduplicate authoritative artifacts.

### MSC-ARTDISC-REQ-037

Artifact inventories **MUST** distinguish artifact lifecycle from inventory state.

### MSC-ARTDISC-REQ-038

Virtual artifacts used durably by compilation **MUST** preserve identity and provenance.

### MSC-ARTDISC-REQ-039

Generated input artifacts **MUST** preserve generator and upstream-artifact lineage.

### MSC-ARTDISC-REQ-040

Generated artifacts **MUST NOT** gain authored authority merely by becoming compilation inputs.

### MSC-ARTDISC-REQ-041

Compilation-unit fingerprints **MUST** include membership, roles, artifact revisions, dependencies, profile, and semantically relevant configuration.

### MSC-ARTDISC-REQ-042

Active compilation-unit membership **MUST** be frozen or fingerprinted before dependent frontend execution.

### MSC-ARTDISC-REQ-043

Dynamic dependency expansion **MUST** be recorded as explicit replanning.

### MSC-ARTDISC-REQ-044

Replanning **MUST** preserve original and revised compilation-plan lineage.

### MSC-ARTDISC-REQ-045

Artifact access policy **MUST** be enforced during discovery and acquisition.

### MSC-ARTDISC-REQ-046

Denied artifacts **MUST NOT** be acquired through alternate providers without applicable authorization.

### MSC-ARTDISC-REQ-047

Provider effects **MUST** be declared and governed by the active operational profile.

### MSC-ARTDISC-REQ-048

Offline discovery **MUST NOT** fabricate unavailable remote artifacts or metadata.

### MSC-ARTDISC-REQ-049

Incremental discovery **MUST** distinguish added, removed, changed, relocated, inaccessible, and reclassified artifacts.

### MSC-ARTDISC-REQ-050

A compilation unit **MUST NOT** proceed to frontend orchestration when mandatory membership, representation, access, or dependency invariants are unsatisfied.

---

## 88. Conceptual Model

```text
Compilation Invocation
        │
        ▼
Discovery Request
├── explicit artifacts
├── roots
├── providers
├── include rules
├── exclude rules
├── profile
├── trust
└── access policy
        │
        ▼
Artifact Discovery
├── manifests
├── registries
├── conventions
├── provider enumeration
├── relationships
└── dependency expansion
        │
        ▼
Artifact Inventory
├── candidates
├── descriptors
├── locators
├── representations
├── identities
├── selected artifacts
├── excluded artifacts
├── duplicates
├── conflicts
└── unavailable artifacts
        │
        ▼
Compilation-Unit Builder
├── semantic roots
├── member roles
├── dependencies
├── namespace context
├── profile
├── fingerprints
└── completeness
        │
        ▼
Frozen Compilation Unit
        │
        ▼
Frontend Orchestration
```

---

## 89. Machine Specification

```yaml
machine_spec:
  kind: artifact_discovery_and_compilation_units

  discovery_request:
    required:
      - request_id
      - invocation_id
      - mode
      - profile
      - provider_policy
      - trust_policy
      - access_policy
      - provenance

  discovery_root_kinds:
    - filesystem
    - repository
    - workspace
    - package
    - registry
    - git
    - mke
    - connector
    - editor
    - memory
    - generated
    - virtual

  discovery_strategies:
    - explicit
    - manifest_driven
    - registry_driven
    - convention_driven
    - relationship_driven
    - dependency_driven
    - provider_enumeration
    - incremental_change
    - generated

  provider_capabilities:
    - enumerate
    - describe
    - acquire
    - revision
    - fingerprint
    - relationships
    - watch

  artifact_descriptor:
    required:
      - descriptor_id
      - provisional_artifact_id
      - provider_id
      - locators
      - representation_type
      - acquisition_state
      - trust
      - provenance

    optional:
      - canonical_artifact_id
      - artifact_type_candidate
      - media_type
      - version
      - revision
      - lifecycle_candidate
      - authority_candidate
      - size
      - content_fingerprint
      - metadata_fingerprint
      - parent_container
      - discovered_relationships

  artifact_roles:
    - primary
    - supplementary
    - dependency
    - import
    - extension
    - configuration
    - schema
    - evidence
    - conformance
    - context
    - generated_input
    - prior_compilation
    - auxiliary
    - excluded

  inventory_states:
    - candidate
    - selected
    - excluded
    - dependency
    - supplementary
    - duplicate
    - conflicting
    - unavailable
    - blocked
    - generated
    - virtual

  acquisition_states:
    - not_requested
    - planned
    - available
    - acquired
    - partial
    - unavailable
    - access_denied
    - failed
    - stale

  compilation_unit:
    required:
      - unit_id
      - unit_version
      - unit_kind
      - invocation_id
      - artifact_members
      - artifact_roles
      - dependency_policy
      - profile
      - trust_context
      - access_context
      - fingerprints
      - completeness
      - provenance

  compilation_unit_kinds:
    - artifact
    - specification
    - package
    - module
    - workspace
    - migration
    - validation
    - publication
    - reverse_engineering
    - backend_generation
    - editor

  completeness_dimensions:
    - membership
    - acquisition
    - representation
    - dependency
    - language
    - configuration
    - trust
    - semantic

  completeness_states:
    - unknown
    - complete
    - partial
    - blocked
    - invalid

  dependency_kinds:
    - content
    - language
    - syntax
    - schema
    - type
    - reference
    - package
    - module
    - mapping
    - extension
    - profile
    - compiler_pass
    - msg
    - kir
    - backend
    - evidence
    - configuration
    - toolchain

  fingerprint_kinds:
    - content
    - metadata
    - representation
    - semantic
    - dependency
    - inventory
    - compilation_unit
```

---

## 90. Invariants

```yaml
invariants:
  - id: MSC-ARTDISC-INV-001
    expression: artifact.identity != artifact.locator
    description: Artifact identity remains independent from location.

  - id: MSC-ARTDISC-INV-002
    expression: file_path.canonical_artifact_identity == false
    description: Filesystem paths do not define semantic identity.

  - id: MSC-ARTDISC-INV-003
    expression: candidate_artifact.provisional_identity != null
    description: Every candidate is trackable before semantic parsing.

  - id: MSC-ARTDISC-INV-004
    expression: canonical_identity_resolution.provisional_lineage_preserved == true
    description: Identity refinement remains traceable.

  - id: MSC-ARTDISC-INV-005
    expression: discovery.grants_authority == false
    description: Artifact presence does not establish authority.

  - id: MSC-ARTDISC-INV-006
    expression: acquisition.grants_trust == false
    description: Successful retrieval does not establish trust.

  - id: MSC-ARTDISC-INV-007
    expression: provider_enumeration_order.affects_selection == false
    description: Provider ordering has no semantic precedence.

  - id: MSC-ARTDISC-INV-008
    expression: protected_exclusion.overridden_by_lower_precedence == false
    description: Access and security exclusions remain authoritative.

  - id: MSC-ARTDISC-INV-009
    expression: compilation_unit.member.role != null
    description: Every unit member has an explicit semantic purpose.

  - id: MSC-ARTDISC-INV-010
    expression: supplementary_artifact.redefines_primary_identity == false
    description: Supplementary content cannot silently replace the root.

  - id: MSC-ARTDISC-INV-011
    expression: artifact_identity_collision.arbitrary_winner == false
    description: Collisions preserve all claimants.

  - id: MSC-ARTDISC-INV-012
    expression: generated_input.authored_authority_implied == false
    description: Generated content remains generated.

  - id: MSC-ARTDISC-INV-013
    expression: active_unit.membership_snapshot != null
    description: Compilation proceeds against a stable artifact set.

  - id: MSC-ARTDISC-INV-014
    expression: dynamic_dependency.replanning_record != null
    description: Late dependency expansion remains visible.

  - id: MSC-ARTDISC-INV-015
    expression: denied_artifact.acquired_without_authorization == false
    description: Alternate providers cannot bypass policy.

  - id: MSC-ARTDISC-INV-016
    expression: offline_mode.fabricates_remote_artifact == false
    description: Unavailable knowledge remains unavailable.

  - id: MSC-ARTDISC-INV-017
    expression: compilation_unit.frontend_ready_implies_required_inputs_available == true
    description: Frontend execution starts only from a valid unit.

  - id: MSC-ARTDISC-INV-018
    expression: inventory_state != artifact.lifecycle
    description: Discovery state and semantic lifecycle remain distinct.
```

---

## 91. Diagnostics

### MSC0201 — Discovery Request Invalid

The discovery request lacks required identity, profile, provider, trust, access, or provenance information.

### MSC0202 — Discovery Root Invalid

A discovery root lacks a compatible provider or valid locator.

### MSC0203 — Artifact Provider Missing

No registered provider supports the root or locator.

### MSC0204 — Artifact Provider Incompatible

The provider does not support the requested capability, representation, profile, or version.

### MSC0205 — Artifact Provider Unauthorized

The active policy prohibits use of the selected provider.

### MSC0206 — Artifact Descriptor Invalid

A candidate descriptor lacks required identity, locator, representation, trust, acquisition, or provenance fields.

### MSC0207 — Artifact Acquisition Failed

A selected artifact representation could not be acquired.

### MSC0208 — Artifact Access Denied

Access policy prohibits descriptor inspection or payload acquisition.

### MSC0209 — Artifact Classification Ambiguous

The artifact cannot be classified deterministically enough for frontend selection.

### MSC0210 — Artifact Type Unsupported

The classified artifact type is unsupported under the active compilation profile.

### MSC0211 — Artifact Locator Ambiguous

A locator resolves to multiple incompatible representations.

### MSC0212 — Artifact Identity Collision

Distinct discovered artifacts claim the same canonical identity.

### MSC0213 — Artifact Duplicate Unresolved

MSC cannot determine whether candidates are representations of one artifact or independent artifacts.

### MSC0214 — Manifest Invalid

A discovered manifest is structurally invalid or incompatible.

### MSC0215 — Manifest Authority Violation

A manifest attempts to redefine metadata outside its authority scope.

### MSC0216 — Include and Exclude Conflict

Artifact-selection rules conflict without a deterministic precedence result.

### MSC0217 — Protected Exclusion Override

A lower-authority rule attempts to include a protected excluded artifact.

### MSC0218 — Primary Artifact Missing

A compilation unit lacks a required semantic root.

### MSC0219 — Multiple Primary Artifacts Undefined

A unit contains multiple primary artifacts without a composition model.

### MSC0220 — Supplementary Identity Override

A supplementary artifact attempts to redefine protected primary identity.

### MSC0221 — Required Dependency Missing

A required artifact dependency cannot be discovered or acquired.

### MSC0222 — Dependency Version Conflict

No available artifact satisfies the required version constraint.

### MSC0223 — Dependency Closure Unbounded

Dependency expansion exceeds configured bounds or fails to stabilize.

### MSC0224 — Dependency Cycle Requires Classification

A dependency cycle exists and requires a later semantic rule before compilation can continue.

### MSC0225 — Generated Artifact Lineage Missing

A generated input does not identify its generator or upstream artifacts.

### MSC0226 — Prior Compilation Artifact Stale

A prior AST, MSG, KIR, diagnostic, or compilation artifact does not match current semantic inputs.

### MSC0227 — Compilation Unit Identity Missing

The unit lacks compiler-visible identity.

### MSC0228 — Compilation Unit Membership Invalid

Artifact roles or membership rules are inconsistent.

### MSC0229 — Compilation Unit Incomplete

Required artifacts, representations, configuration, dependencies, trust, or access conditions are incomplete.

### MSC0230 — Compilation Unit Snapshot Changed

The artifact set changed after the active unit snapshot was frozen.

### MSC0231 — Dynamic Replanning Required

A newly discovered dependency requires explicit compilation-plan revision.

### MSC0232 — Dynamic Replanning Failed

The revised plan cannot satisfy the newly discovered artifact dependency.

### MSC0233 — Inventory Fingerprint Incomplete

The inventory fingerprint omits a selected artifact, role, dependency, provider snapshot, or policy input.

### MSC0234 — Artifact Relocation Unresolved

MSC cannot determine whether a new locator represents a moved artifact or a different artifact.

### MSC0235 — Artifact Removal Ambiguous

MSC cannot classify whether an artifact was deleted, withdrawn, inaccessible, excluded, or superseded.

### MSC0236 — Offline Artifact Unavailable

A required artifact is remote-only and unavailable under offline mode.

### MSC0237 — Provider Effect Prohibited

Discovery or acquisition requires an effect disallowed by the active profile.

### MSC0238 — Virtual Artifact Provenance Missing

A virtual artifact used in compilation lacks derivation provenance.

### MSC0239 — Frontend Readiness Failed

The compilation unit does not satisfy prerequisites for frontend orchestration.

### MSC0240 — Artifact Inventory Nondeterministic

Equivalent discovery inputs produced materially different selected artifact sets.

---

## 92. Acceptance Criteria

This specification is satisfied when:

1. artifact discovery replaces file discovery as the broad compiler abstraction;
2. files remain valid artifact representations;
3. discovery requests, roots, providers, locators, descriptors, inventories, and compilation units are represented;
4. provisional and canonical artifact identities are distinguished;
5. identity refinement preserves lineage;
6. discovery, acquisition, trust, authority, and semantic validity remain separate;
7. explicit, manifest, registry, convention, relationship, dependency, and incremental discovery are represented;
8. inclusion and exclusion decisions are deterministic and explainable;
9. access and security exclusions cannot be bypassed;
10. one artifact may have multiple representations and locators;
11. one representation may contain multiple artifacts;
12. artifact roles within compilation units are explicit;
13. primary, supplementary, dependency, configuration, evidence, generated, and auxiliary artifacts are distinguished;
14. compilation-unit identity, membership, completeness, and fingerprinting are defined;
15. dependency closure is bounded and phase-aware;
16. discovery-layer dependency resolution remains distinct from semantic reference resolution;
17. duplicates and identity collisions are preserved rather than arbitrarily flattened;
18. generated, virtual, and prior compiler artifacts retain lineage;
19. artifact-set snapshots support reproducibility;
20. dynamic dependencies trigger explicit replanning;
21. offline discovery reports unavailable artifacts honestly;
22. incremental discovery distinguishes changes, relocation, removal, access changes, and reclassification;
23. a unit must pass readiness validation before frontend orchestration;
24. later MART specifications can refine the artifact ontology without invalidating the compiler contracts defined here.

---

## 93. Conformance Examples

### 93.1 Valid Explicit File Artifact

```yaml
artifact:
  provisional_id: artifact:file:specifications/MSC/core/MSC-CORE-0003.md
  provider: local-filesystem
  locator: file:///repo/specifications/MSC/core/MSC-CORE-0003.md
  representation: msl-markdown
  role: primary
```

After front-matter inspection:

```yaml
identity_resolution:
  provisional: artifact:file:specifications/MSC/core/MSC-CORE-0003.md
  canonical: monad::MSC-CORE-0003
```

### 93.2 Valid Non-File Artifact

```yaml
artifact:
  provisional_id: artifact:editor:session-18-buffer-2
  provider: editor
  locator: editor://session-18/buffer-2
  representation: text-buffer
  role: primary
  materialization: virtual
```

The artifact may compile without first being written to a file.

### 93.3 Invalid Path Identity

```yaml
artifact:
  canonical_id: /repo/specifications/MSC/core/MSC-CORE-0003.md
```

Expected diagnostic:

```text
MSC0206: filesystem path cannot serve as canonical artifact identity
```

### 93.4 Valid Supplementary Artifact

```yaml
compilation_unit:
  primary:
    - monad::API-SPEC-0001

  supplementary:
    - monad::API-SPEC-0001-DIAGRAMS
    - monad::API-SPEC-0001-EXAMPLES
```

The supplementary artifacts may enrich the specification while preserving the primary identity.

### 93.5 Invalid Supplementary Override

Primary artifact:

```yaml
artifact:
  id: API-SPEC-0001
```

Supplementary artifact:

```yaml
artifact:
  id: API-SPEC-0002
  source_role: supplementary
```

It attempts to replace the compilation unit's protected primary identity.

Expected diagnostic:

```text
MSC0220: supplementary artifact cannot redefine primary compilation identity
```

### 93.6 Valid Multiple Representations

```yaml
artifact:
  canonical_id: monad::MSL-CORE-0001

  representations:
    - type: msl-markdown
      locator: file:///repo/specifications/MSL/core/MSL-CORE-0001.md
      authority: authored

    - type: canonical-ast
      locator: cache://ast/MSL-CORE-0001
      authority: derived
```

The compiler may reuse the AST only when its fingerprint and compiler contract remain valid.

### 93.7 Invalid Cache Authority

```yaml
artifact:
  type: canonical-ast
  origin: cache
  authority: authored
```

Expected diagnostic:

```text
MSC0226: derived cached representation cannot claim authored authority
```

### 93.8 Valid Dependency Closure

```text
MSC-CORE-0003
    depends_on
ADR-0007
    depends_on
ADR-0006
```

The unit includes both ADRs as dependency artifacts under the bootstrap profile.

### 93.9 Invalid Provider-Order Resolution

The filesystem and registry providers return different artifacts claiming `MSL-CORE-0001`.

The compiler chooses whichever provider responds first.

Expected diagnostics:

```text
MSC0212: multiple artifacts claim monad::MSL-CORE-0001
MSC0240: provider response timing cannot determine artifact selection
```

### 93.10 Valid Identity Collision Record

```yaml
collision:
  canonical_identity: monad::MSL-CORE-0001

  claimants:
    - provider: filesystem
      locator: file:///repo/specifications/MSL/core/MSL-CORE-0001.md
      fingerprint: sha256:aaa

    - provider: registry
      locator: registry://specifications/MSL-CORE-0001
      fingerprint: sha256:bbb
```

Both claimants remain available for semantic or governance resolution.

### 93.11 Valid Offline Failure

```yaml
dependency:
  artifact: org.example::SECURITY-POLICY-0001
  required: true
  available_only_from: remote-registry
```

Under offline mode:

```text
MSC0236: required artifact is unavailable under offline discovery
```

MSC does not fabricate or silently omit the dependency.

### 93.12 Valid Dynamic Replanning

Parsing a document reveals:

```yaml
languages:
  constraint: 0.2.0
```

MSC adds the Constraint Language package as a required artifact dependency, records the revised plan, and recalculates the unit fingerprint.

---

## 94. Security and Trust Considerations

Artifact discovery exposes the compiler to untrusted locations, providers, metadata, payloads, and dependency graphs.

Threats include:

* path traversal;
* malicious symlinks;
* provider spoofing;
* registry poisoning;
* dependency confusion;
* locator substitution;
* manifest injection;
* unauthorized remote acquisition;
* artifact identity spoofing;
* cache poisoning;
* denial of service through enumeration;
* cyclic dependency expansion;
* sensitive inventory disclosure;
* generated-artifact laundering;
* alternate-provider access bypass.

Implementations should:

* normalize and validate locators;
* constrain filesystem roots;
* avoid following untrusted links automatically;
* validate provider manifests;
* pin trusted provider versions;
* enforce access policy before acquisition;
* limit enumeration and dependency depth;
* fingerprint acquired representations;
* preserve identity claims and conflicts;
* separate trust from authority;
* redact sensitive inventory fields where required;
* validate cached descriptors;
* prevent provider fallback from bypassing access denial;
* record remote and connector effects;
* freeze provider snapshots for reproducible compilation.

---

## 95. Evolution and Compatibility

The discovery architecture may evolve through:

* additional artifact providers;
* richer locator schemes;
* provider federation;
* artifact-resolution services;
* distributed inventories;
* streaming acquisition;
* package-aware discovery;
* semantic artifact indexes;
* finer-grained incremental discovery.

Compatible changes may add optional descriptor fields or provider capabilities.

Breaking changes include:

* changing locator semantics;
* changing artifact identity association;
* changing inclusion precedence;
* changing compilation-unit membership rules;
* changing dependency closure behavior;
* changing fingerprint composition;
* changing provider trust contracts.

Breaking changes require:

* MSC version changes;
* provider-manifest migration;
* cache invalidation;
* inventory migration;
* conformance-fixture updates;
* reproducibility impact analysis.

---

## 96. Open Questions

1. What concrete artifact locator syntax should Monad standardize?
2. Should provisional IDs be UUID-based, locator-derived, content-derived, or hybrid?
3. How should the first implementation model multi-file logical artifacts?
4. Which artifact providers are required for the minimum viable compiler?
5. Should Git discovery operate on the working tree, object database, or both?
6. How should symlinks be represented?
7. Should ignored files appear in the inventory as excluded candidates?
8. What default repository conventions should Monad support?
9. Which manifest is authoritative for compilation-unit membership?
10. How should nested repositories interact with workspace discovery?
11. Should registry records identify preferred representations?
12. How should artifact freshness work across providers?
13. What provider snapshot guarantees are required for reproducible CI?
14. How should editor buffers override persisted file representations?
15. When should internal document elements become first-class artifacts?
16. Which dependency types can be discovered before parsing?
17. How should dynamic dependency replanning be bounded?
18. Should compilation units be persisted as MART artifacts?
19. How should one artifact participate in several compilation units?
20. What is the minimum compilation-unit fingerprint?
21. Should provider enumeration results be stored in MKE?
22. How should remote artifact access credentials remain outside reproducibility records?
23. Should negative discovery results be cached?
24. How should access revocation invalidate prior compiler artifacts?
25. Which artifact-discovery invariants should be implemented first?

---

## 97. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0004 | Frontend and Normalizer Orchestration             |
| MSC-CORE-0005 | Declaration Collection and Symbol Binding         |
| MSC-CORE-0006 | Namespace, Import, and Reference Resolution       |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

It provides compiler requirements for:

| Series       | Purpose                                                                   |
| ------------ | ------------------------------------------------------------------------- |
| MART-CORE    | Full artifact identity, representation, lineage, and transformation model |
| MSG-CORE     | Semantic artifact and relationship construction                           |
| KIR-CORE     | Lowered artifact representations                                          |
| MSL-PACKAGE  | Package and module artifact discovery                                     |
| MSL-FRONTEND | Representation-to-AST frontend contracts                                  |
| MKE          | Artifact storage, lookup, and retrieval                                   |
| CLI          | Discovery, inventory, unit inspection, and compilation commands           |

---

## Status

Draft.

This document defines the artifact-oriented discovery, acquisition, inventory, dependency-closure, and compilation-unit architecture of MSC.

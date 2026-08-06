---
id: "MSL-CORE-0004"
title: "Metadata and Identity Model"
type: "knowledge.specification"
namespace: "monad"
series: "MSL-CORE"
series_position: 4
version: "0.1.0"
status: "draft"
created: "2026-08-03"
authors:
  - "Monad Architecture Team"
tags:
  - "msl"
  - "metadata"
  - "identity"
  - "provenance"
  - "namespaces"
  - "artifact-model"
depends_on:
  - "ADR-0002"
  - "MSL-CORE-0001"
  - "MSL-CORE-0002"
  - "MSL-CORE-0003"
  - "MKE-CORE-0002"
  - "MKE-CORE-0005"
references:
  - "MKE-ARTIFACT-0001"
  - "MKE-ARTIFACT-0002"
  - "MKE-ARTIFACT-0003"
enables:
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0008"
  - "MSL-CORE-0010"
  - "KIR-CORE"
  - "MSC-CORE"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSL-CORE-0004 — Metadata and Identity Model

## 1. Purpose

This specification defines the metadata and identity model used by the Monad Specification Language.

It establishes how MSL specifications and their internal semantic elements declare and preserve:

* canonical identity;
* namespaces;
* artifact type;
* titles and descriptions;
* language and schema versions;
* lifecycle state;
* maturity profile;
* ownership;
* authorship;
* provenance;
* timestamps;
* classification;
* tags;
* aliases;
* source locations;
* registry information;
* compilation state;
* extension metadata.

The model defined here allows specifications to remain stable, traceable, discoverable, and machine-processable as files, repositories, formats, implementations, and organizations evolve.

---

## 2. Context

Traditional documents are frequently identified by filenames and directory paths.

Examples:

```text
authentication-design.md
authentication-design-final.md
authentication-design-v2-final.md
```

These names are convenient for humans but do not provide stable semantic identity.

Files may be:

* renamed;
* moved;
* split;
* merged;
* copied;
* generated;
* published under different URLs;
* represented in multiple formats;
* distributed across repositories.

A specification must remain the same logical artifact despite such changes.

Monad therefore separates:

```text
Artifact Identity
        from
Source Location
        from
Rendered Location
```

Metadata provides the descriptive, operational, historical, and compilation context needed to manage that identity.

---

## 3. Scope

This specification defines:

* identity components;
* canonical identifiers;
* namespaces;
* identity scopes;
* semantic-element identifiers;
* metadata categories;
* required metadata;
* optional metadata;
* metadata inheritance;
* aliases;
* ownership;
* provenance;
* lifecycle metadata;
* compilation metadata;
* registry metadata;
* source metadata;
* extension metadata;
* metadata validation;
* metadata merge behavior.

This specification does not fully define:

* the concrete grammar of YAML front matter;
* registry storage implementation;
* cryptographic identity;
* distributed identity federation;
* access-control policy;
* complete lifecycle-transition rules;
* KIR serialization;
* Git object identity;
* package-resolution algorithms.

---

## 4. Non-Goals

This specification does not:

* make filenames canonical identifiers;
* require every metadata field to be authored manually;
* define a universal personal identity system;
* replace Git history;
* require globally centralized identifier allocation;
* define publication URLs;
* prescribe one database schema;
* permit arbitrary metadata to override core semantics;
* equate artifact version with MSL language version;
* equate artifact lifecycle with compiler working state.

---

## 5. Core Principles

### 5.1 Identity Is Stable

A specification’s canonical identity must remain stable throughout its logical lifetime.

### 5.2 Location Is Mutable

A file path, URL, repository, or rendering location may change without changing artifact identity.

### 5.3 Metadata Has Authority

Metadata fields must have defined semantics, ownership, and merge behavior.

### 5.4 Provenance Is Mandatory

Authoritative knowledge must retain information about its origin and transformations.

### 5.5 Identity Is Layered

Specifications, requirements, invariants, acceptance criteria, examples, waivers, and other semantic elements may each possess identity at appropriate scopes.

### 5.6 Versions Are Distinct

The following versions must remain distinguishable:

* artifact version;
* MSL language version;
* metadata schema version;
* machine-specification schema version;
* compiler version;
* KIR version;
* registry schema version;
* extension version.

### 5.7 Extensions Are Namespaced

Extension metadata must not silently collide with or redefine stable core fields.

---

## 6. Terminology

### 6.1 Canonical Identity

The permanent semantic identity of an artifact.

### 6.2 Canonical Identifier

The human-readable identifier used to reference the artifact within a namespace.

Example:

```text
MSL-CORE-0004
```

### 6.3 Namespace

A named identity domain within which identifiers are resolved.

Example:

```text
monad
```

### 6.4 Fully Qualified Identity

The combination of namespace and canonical identifier.

Conceptually:

```text
monad::MSL-CORE-0004
```

### 6.5 Local Identifier

An identifier unique within a parent artifact or semantic scope.

Example:

```text
MSL-META-REQ-001
```

### 6.6 Alias

A noncanonical name that resolves to a canonical identity.

### 6.7 Identity Scope

The domain in which an identifier must be unique.

Possible scopes include:

* global;
* workspace;
* repository;
* namespace;
* specification;
* requirement set;
* source document.

### 6.8 Metadata

Structured information describing an artifact or semantic element.

### 6.9 Core Metadata

Metadata whose semantics are defined by MSL.

### 6.10 Extension Metadata

Namespaced metadata defined outside the stable MSL core.

### 6.11 Provenance

Information describing where an artifact or semantic element came from and how it was produced or transformed.

### 6.12 Ownership

Responsibility for maintenance, review, approval, or governance.

### 6.13 Source Identity

The identity of the physical or virtual source representation.

### 6.14 Registry Record

A catalog entry mapping identity to metadata, location, lifecycle, and compilation state.

---

## 7. Identity Model

The conceptual identity model is:

```text
Artifact Identity

├── Namespace
├── Canonical Identifier
├── Artifact Kind
├── Identity Scope
├── Creation Record
├── Aliases
└── Historical Identity Relationships
```

A minimal identity declaration contains:

```yaml
artifact:
  id: MSL-CORE-0004
  type: knowledge.specification
  namespace: monad
```

---

## 8. Canonical Identifier

A canonical identifier must be:

* stable;
* unique within its namespace and scope;
* deterministic in interpretation;
* human-readable where practical;
* independent of storage location;
* immutable after assignment, except through explicit identity migration.

The canonical identifier should communicate classification without embedding mutable metadata such as:

* current title;
* owner;
* lifecycle state;
* file path;
* implementation language;
* publication date.

---

## 9. Identifier Syntax

The bootstrap identifier form for specification artifacts is:

```text
<SERIES>-<CATEGORY>-<SEQUENCE>
```

Example:

```text
MSL-CORE-0004
```

Components:

| Component | Meaning                           |
| --------- | --------------------------------- |
| `MSL`     | Specification domain or subsystem |
| `CORE`    | Series category                   |
| `0004`    | Stable sequence number            |

Other artifact families may use forms such as:

```text
ADR-0002
MJ-0001
BL-0002
```

The grammar of identifier forms may vary by registered artifact type.

Each form must remain deterministic and validated.

---

## 10. Fully Qualified Identity

A canonical identifier may be resolved within an implicit namespace.

For cross-workspace or distributed use, a fully qualified identity should be available.

Conceptual form:

```text
<namespace>::<canonical-id>
```

Example:

```text
monad::MSL-CORE-0004
```

A future federated form may include an authority or registry:

```text
org.monad::specification::MSL-CORE-0004
```

The bootstrap phase uses the `namespace` field rather than requiring fully qualified identifiers in all references.

---

## 11. Identity Scope

Each identity must declare or inherit a uniqueness scope.

Initial scopes:

```text
global
workspace
repository
namespace
specification
local
```

### 11.1 Global Scope

Intended to be unique across all participating registries.

Global scope is not required during bootstrap.

### 11.2 Workspace Scope

Unique within a Monad workspace containing one or more repositories.

### 11.3 Repository Scope

Unique within one repository.

### 11.4 Namespace Scope

Unique within a declared semantic namespace.

### 11.5 Specification Scope

Unique within one logical specification.

Examples:

* requirement IDs;
* invariant IDs;
* acceptance-criterion IDs.

### 11.6 Local Scope

Unique only within an explicitly declared parent semantic element.

Local scope should be avoided for elements requiring durable external references.

---

## 12. Artifact Identity Versus Semantic-Element Identity

A specification artifact has canonical artifact identity:

```text
MSL-CORE-0004
```

Internal semantic elements may have their own identities:

```text
MSL-META-REQ-001
MSL-META-INV-001
MSL-META-AC-001
```

Internal identities enable:

* direct references;
* diagnostics;
* traceability;
* impact analysis;
* generated test names;
* requirement verification;
* partial recompilation.

The compiler must preserve the parent-child relationship between a specification and its internal semantic elements.

---

## 13. Identity Immutability

Once assigned and published into the registry, canonical identity must not change merely because:

* wording changes;
* metadata changes;
* the artifact moves;
* the source format changes;
* the artifact receives a new version;
* the artifact is deprecated;
* the artifact is archived;
* ownership changes.

An identity may change only through an explicit identity-migration event.

Identity migration must preserve:

* original identity;
* replacement identity;
* migration reason;
* authority;
* effective version;
* source history;
* aliases;
* relationships.

---

## 14. Aliases

Aliases provide alternate references to a canonical identity.

Example:

```yaml
identity:
  aliases:
    - MSL-METADATA
    - SPEC-LANGUAGE-METADATA
```

Aliases may support:

* historical names;
* imported identifiers;
* friendly names;
* compatibility references;
* prior registry schemes.

An alias must not:

* become ambiguous;
* conceal a different canonical identity;
* silently redirect without provenance;
* replace canonical identity in compiler output.

The compiler should normalize aliases to canonical identities during reference resolution.

---

## 15. Titles and Names

A title is descriptive metadata, not identity.

Example:

```yaml
metadata:
  title: Metadata and Identity Model
```

Titles may change compatibly when meaning remains stable.

A specification may also declare:

* short title;
* display name;
* subtitle;
* slug;
* abbreviation.

These fields must not be used as canonical identity unless explicitly registered as aliases.

---

## 16. Metadata Categories

MSL metadata is divided into the following categories:

```text
Metadata

├── Identity
├── Descriptive
├── Classification
├── Lifecycle
├── Versioning
├── Ownership
├── Authorship
├── Provenance
├── Relationships
├── Compilation
├── Source
├── Registry
├── Publication
├── Security
└── Extensions
```

---

## 17. Required Core Metadata

Every conforming specification must declare or inherit:

```yaml
artifact:
  id:
  type:
  namespace:

metadata:
  title:
  version:
  status:

compilation:
  language:
  language_version:
  profile:
  source_role:
```

It must also preserve:

* creation provenance;
* at least one source location;
* active metadata schema version, directly or through the compiler profile.

---

## 18. Descriptive Metadata

Descriptive metadata may include:

```yaml
metadata:
  title:
  short_title:
  subtitle:
  description:
  summary:
  tags: []
  keywords: []
```

Descriptive metadata assists:

* discovery;
* rendering;
* indexing;
* search;
* AI context assembly;
* registry presentation.

Descriptive metadata is generally informative unless a field is explicitly assigned normative semantics.

---

## 19. Classification Metadata

Classification metadata identifies semantic role.

Example:

```yaml
artifact:
  type: knowledge.specification

metadata:
  domain: specification-language
  category: core
  maturity: foundational
```

Classification fields may include:

* artifact type;
* domain;
* category;
* subtype;
* criticality;
* audience;
* confidentiality;
* compliance classification.

Artifact type must come from a registered artifact-type vocabulary.

---

## 20. Lifecycle Metadata

Lifecycle metadata describes authoritative artifact state.

Example:

```yaml
metadata:
  status: draft
```

A richer form may be:

```yaml
lifecycle:
  state: draft
  entered_at: 2026-08-03
  authority: Monad Architecture Team
```

Lifecycle state must remain distinguishable from:

* working-tree state;
* review result;
* compilation status;
* publication status;
* deployment state;
* validation state.

---

## 21. Version Metadata

A specification may declare several version fields.

Example:

```yaml
metadata:
  version: 0.1.0

compilation:
  language_version: bootstrap
  metadata_schema_version: 0.1.0
```

Potential version fields include:

| Field                   | Meaning                             |
| ----------------------- | ----------------------------------- |
| artifact version        | Version of the specification itself |
| language version        | MSL language semantics              |
| metadata schema version | Metadata-field schema               |
| machine schema version  | Machine-block semantic schema       |
| compiler version        | MSC implementation version          |
| KIR version             | Emitted intermediate representation |
| registry version        | Registry record schema              |
| extension version       | Version of a namespaced extension   |

The compiler must not substitute one version category for another.

---

## 22. Ownership Metadata

Ownership identifies responsibility.

Example:

```yaml
ownership:
  owner: Monad Architecture Team
  maintainers:
    - specification-language-working-group
  reviewers:
    - compiler-working-group
  approvers:
    - architecture-council
```

Ownership roles may include:

* owner;
* maintainer;
* reviewer;
* approver;
* steward;
* security contact;
* domain expert.

Ownership does not necessarily indicate authorship.

---

## 23. Authorship Metadata

Authorship identifies contributors to the content.

Example:

```yaml
authorship:
  authors:
    - type: human
      name: Thomas Carter

  contributors:
    - type: ai
      provider: OpenAI
      model_family: GPT
      role: drafting-assistance
```

Authorship should distinguish:

* original author;
* contributor;
* editor;
* reviewer;
* translator;
* generator;
* AI assistant.

Authorship metadata must not falsely attribute AI-generated content to a human.

---

## 24. Provenance Metadata

Provenance describes origin and transformation.

Conceptually:

```text
Provenance

├── Creation
├── Inputs
├── Transformations
├── Tools
├── Authors
├── Reviews
├── Approvals
├── Imports
├── Migrations
└── Source Maps
```

Example:

```yaml
provenance:
  created:
    at: 2026-08-03
    method: human_ai_collaboration

  inputs:
    - ADR-0002
    - MSL-CORE-0001

  transformations: []
```

---

## 25. Creation Metadata

Creation metadata should include:

* creation timestamp;
* creation method;
* creator identity or role;
* originating system;
* initial source artifact;
* applicable tool version.

Creation method values may include:

```text
authored
generated
imported
migrated
derived
reconstructed
transcribed
```

---

## 26. Modification Metadata

Modification history may include:

```yaml
history:
  - event: created
    at: 2026-08-03
    version: 0.1.0

  - event: revised
    at: 2026-08-10
    version: 0.2.0
    reason: Clarified namespace resolution
```

Git history may supply part of this information.

Semantic history must preserve events that Git alone cannot infer reliably, such as:

* lifecycle approval;
* supersession;
* migration;
* waiver;
* imported authority;
* identity remapping.

---

## 27. Timestamps

Timestamps should use an unambiguous standard representation.

Recommended form:

```text
YYYY-MM-DD
```

for date-only metadata, and:

```text
YYYY-MM-DDTHH:MM:SSZ
```

or another explicit offset form for precise timestamps.

A timestamp must identify its semantic meaning.

Examples:

* created;
* modified;
* approved;
* validated;
* compiled;
* published;
* deprecated;
* archived.

The compiler must not infer semantic meaning from a bare timestamp field.

---

## 28. Compilation Metadata

Compilation metadata describes how source should be interpreted.

Example:

```yaml
compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: primary
  status: bootstrap
```

Future fields may include:

```yaml
compilation:
  feature_flags: []
  extensions: []
  target_kir_version:
  partial: false
  strictness: standard
```

Compilation metadata is distinct from artifact metadata because it governs compiler behavior rather than artifact meaning alone.

---

## 29. Compilation Status

Initial compilation states:

```text
planned
bootstrap
pre_normative
parsed
validated
compiled
failed
stale
migrating
unsupported
```

Compilation status is operational metadata.

It must not be confused with lifecycle status.

Example:

```text
Artifact lifecycle: approved
Compilation status: stale
```

This means an approved artifact requires recompilation, not that its approval was revoked.

---

## 30. Source Metadata

Source metadata identifies physical or virtual representations.

Example:

```yaml
source:
  uri: specifications/MSL/core/MSL-CORE-0004.md
  role: primary
  format: msl-markdown
```

Source metadata may include:

* URI;
* repository;
* path;
* revision;
* content hash;
* source role;
* encoding;
* media type;
* generated status;
* line ending;
* source-map information.

Source location is mutable and must not replace canonical identity.

---

## 31. Registry Metadata

Registry metadata connects artifacts to the Specification Registry.

Example:

```yaml
registry:
  registry_id: MONAD-SPEC-REGISTRY
  record_status: registered
  registered_at: 2026-08-03
```

Registry metadata may include:

* registry identity;
* record version;
* registration timestamp;
* resolution scope;
* canonical location;
* discovered locations;
* compilation state;
* dependency state;
* checksum;
* registry provenance.

The registry is initially maintained manually.

Future tooling should derive registry records from compiled specifications.

---

## 32. Relationship Metadata

Relationships should use typed declarations.

Example:

```yaml
relationships:
  depends_on:
    - MSL-CORE-0001
    - MSL-CORE-0002

  enables:
    - MSL-CORE-0005
```

A relationship declaration must preserve:

* relationship type;
* target identity;
* source identity;
* source span;
* authority;
* optional version constraint;
* optional rationale.

The detailed syntax is defined by `MSL-CORE-0008`.

---

## 33. Security Metadata

Security-related metadata may include:

```yaml
security:
  classification: public
  contains_sensitive_content: false
  trust_level: reviewed
```

Potential fields include:

* confidentiality classification;
* integrity requirements;
* permitted audiences;
* trust level;
* signing state;
* redaction state;
* sensitive-data indicators;
* execution-risk classification.

Security metadata must not itself grant access without enforcement by an applicable security subsystem.

---

## 34. Publication Metadata

Publication metadata may include:

```yaml
publication:
  status: unpublished
  canonical_slug: metadata-and-identity-model
  audience:
    - software-architects
    - compiler-engineers
```

Publication metadata is a projection concern.

It must not alter canonical specification identity.

---

## 35. Extension Metadata

Custom metadata must be namespaced.

Example:

```yaml
extensions:
  org.monad.compiler:
    optimization_profile: bootstrap
```

or:

```yaml
x-monad-compiler:
  optimization_profile: bootstrap
```

The final syntax will be defined later.

Extension metadata must declare:

* namespace;
* owner;
* version;
* schema;
* authority;
* compatibility behavior.

Unknown extension metadata should be preserved when safe, even when not semantically interpreted.

---

## 36. Reserved Metadata Names

Core MSL fields are reserved.

Extensions must not redefine:

```text
artifact
metadata
identity
lifecycle
version
relationships
provenance
ownership
authorship
compilation
source
registry
security
extensions
```

A compiler must reject or isolate extension attempts to redefine protected core semantics.

---

## 37. Metadata Inheritance

Some metadata may be inherited from:

* workspace configuration;
* repository manifest;
* specification-series defaults;
* package manifest;
* parent specification;
* source manifest;
* compilation profile.

Potentially inheritable fields include:

* namespace;
* default owner;
* language version;
* metadata schema version;
* security classification;
* extension activation.

Protected fields should not be inherited silently when ambiguity would affect identity or authority.

---

## 38. Metadata Precedence

The bootstrap precedence order is conceptually:

```text
Explicit semantic-element metadata
    over
Explicit specification metadata
    over
Primary source manifest
    over
Series defaults
    over
Repository defaults
    over
Workspace defaults
```

Higher-precedence metadata may override lower-precedence defaults only where the field permits overrides.

Canonical identity must not be overridden through ordinary inheritance.

The compiler must make effective inherited metadata inspectable.

---

## 39. Metadata Merge Rules

Metadata fields require defined merge strategies.

Possible strategies:

```text
replace
append
set_union
deep_merge
forbid_override
require_consensus
```

Examples:

| Field              | Strategy                               |
| ------------------ | -------------------------------------- |
| canonical identity | forbid override                        |
| title              | replace by primary authority           |
| tags               | set union                              |
| authors            | append with deduplication              |
| lifecycle state    | require authorized explicit transition |
| dependencies       | set union with validation              |
| namespace          | inherit unless explicitly fixed        |
| extension blocks   | namespaced deep merge                  |

The compiler must not apply generic deep merge to all metadata.

---

## 40. Duplicate Metadata

Duplicate metadata declarations may be:

* equivalent;
* compatible;
* conflicting.

Equivalent duplicate declarations may be normalized.

Compatible declarations may be merged under field-specific rules.

Conflicting protected declarations must produce errors.

Example:

```yaml
metadata:
  version: 0.1.0
```

conflicting with:

```yaml
metadata:
  version: 0.2.0
```

in a supplementary source must not be resolved silently.

---

## 41. Metadata Authority

Each metadata field may have an authority source.

Example:

```yaml
metadata_authority:
  lifecycle:
    controlled_by: architecture-council

  publication:
    controlled_by: publishing-team
```

A contributor authorized to edit tags may not necessarily be authorized to approve lifecycle transitions.

Future governance specifications may formalize field-level authority.

---

## 42. Identity Resolution

Identity resolution conceptually proceeds through:

```text
Reference
    ↓
Current Namespace
    ↓
Imported Namespaces
    ↓
Workspace Registry
    ↓
Repository Registry
    ↓
Configured External Registries
    ↓
Alias Normalization
    ↓
Canonical Identity
```

Resolution must be deterministic under the same registry state and configuration.

Ambiguous resolution must produce a diagnostic.

---

## 43. Namespace Imports

A specification may import a namespace or selected identities.

Conceptual example:

```yaml
imports:
  namespaces:
    - id: monad.mke
      alias: mke
```

Reference:

```text
mke::MKE-CORE-0002
```

Namespace imports must not allow an imported alias to shadow a protected local identity without an explicit rule.

---

## 44. Identity Collisions

A collision occurs when multiple active artifacts claim the same canonical identity within the same resolution scope.

The compiler or registry must:

* detect the collision;
* preserve both source records for diagnosis;
* refuse canonical resolution;
* identify conflicting locations;
* prevent silent overwrite.

Identity collision is distinct from alias collision.

Both require deterministic diagnostics.

---

## 45. Semantic Fingerprints

Future implementations may generate semantic fingerprints.

A semantic fingerprint may represent:

* normalized metadata;
* normalized requirements;
* normalized machine semantics;
* dependency closure;
* emitted KIR.

Example:

```yaml
fingerprints:
  source_sha256:
  semantic_sha256:
```

Source and semantic fingerprints are distinct.

Formatting-only source changes may alter the source fingerprint without altering the semantic fingerprint.

Fingerprints support:

* incremental compilation;
* duplicate detection;
* cache validation;
* synchronization;
* provenance;
* reproducibility.

---

## 46. Human and AI Identity

Authorship metadata may identify humans, AI systems, organizations, and tools.

Contributor identities should include a type.

Example:

```yaml
contributors:
  - type: human
    name: Thomas Carter
    role: author

  - type: ai
    provider: OpenAI
    model_family: GPT
    role: drafting-assistance

  - type: tool
    id: monad-migrator
    version: 0.1.0
    role: transformation
```

An AI model identity is not equivalent to a legal or organizational approver.

---

## 47. Metadata Privacy

Metadata may itself contain sensitive information.

Examples:

* personal names;
* internal team names;
* security classifications;
* private repository URLs;
* incident references;
* model prompts;
* customer identifiers.

Implementations must support:

* redaction;
* visibility controls;
* export filtering;
* private metadata extensions;
* safe publication projections.

Removing sensitive metadata from a public projection must not alter the canonical internal artifact identity.

---

## 48. Normative Requirements

### MSL-META-REQ-001

Every conforming MSL specification **MUST** declare a canonical artifact identifier.

### MSL-META-REQ-002

Every conforming MSL specification **MUST** declare an artifact namespace.

### MSL-META-REQ-003

Every conforming MSL specification **MUST** declare a registered artifact type.

### MSL-META-REQ-004

Canonical artifact identity **MUST NOT** depend on filesystem path, URL, title, lifecycle state, or ownership.

### MSL-META-REQ-005

Canonical identity **MUST** remain stable across compatible revisions.

### MSL-META-REQ-006

Canonical identity **MUST NOT** be changed without an explicit identity-migration record.

### MSL-META-REQ-007

An identity migration **MUST** preserve the prior identity and its relationship to the replacement identity.

### MSL-META-REQ-008

Every conforming specification **MUST** declare an artifact version.

### MSL-META-REQ-009

Artifact version **MUST** remain distinguishable from language, compiler, KIR, registry, and extension versions.

### MSL-META-REQ-010

Every conforming specification **MUST** declare a lifecycle state.

### MSL-META-REQ-011

Lifecycle state **MUST** remain distinguishable from compilation, publication, validation, and source-working states.

### MSL-META-REQ-012

Every conforming specification **MUST** declare the MSL language and language version used by its primary source.

### MSL-META-REQ-013

Every conforming specification **MUST** preserve creation provenance.

### MSL-META-REQ-014

AI-generated or AI-assisted content **MUST** preserve applicable AI provenance.

### MSL-META-REQ-015

Source locations **MUST** remain distinct from canonical identity.

### MSL-META-REQ-016

Aliases **MUST** resolve to exactly one canonical identity within an active resolution scope.

### MSL-META-REQ-017

Ambiguous aliases **MUST** produce a deterministic diagnostic.

### MSL-META-REQ-018

Duplicate canonical identities within one resolution scope **MUST** produce a deterministic collision diagnostic.

### MSL-META-REQ-019

Extension metadata **MUST** be namespaced.

### MSL-META-REQ-020

Extension metadata **MUST NOT** silently redefine reserved core metadata semantics.

### MSL-META-REQ-021

Metadata inheritance **MUST** preserve the origin of inherited values.

### MSL-META-REQ-022

The compiler **MUST** make effective metadata available in normalized output.

### MSL-META-REQ-023

Field-specific merge rules **MUST** govern metadata composition.

### MSL-META-REQ-024

Protected metadata conflicts **MUST NOT** be resolved through generic deep merging.

### MSL-META-REQ-025

Every semantic element with durable external references **MUST** have stable identity in an appropriate scope.

### MSL-META-REQ-026

The compiler **MUST** preserve parent-child identity relationships for internal semantic elements.

### MSL-META-REQ-027

A title **MUST NOT** be treated as canonical identity unless explicitly registered as an alias.

### MSL-META-REQ-028

Unknown extension metadata **SHOULD** be preserved when preservation does not violate security or compatibility policy.

### MSL-META-REQ-029

Metadata fields containing sensitive information **SHOULD** support controlled redaction in derived projections.

### MSL-META-REQ-030

Identity resolution **MUST** be deterministic under the same registry state and compiler configuration.

### MSL-META-REQ-031

The compiler **MUST NOT** silently choose among ambiguous identity matches.

### MSL-META-REQ-032

Registry records **MUST** preserve canonical identity independently from canonical location.

### MSL-META-REQ-033

Generated metadata **MUST** declare its derivation or generator provenance.

### MSL-META-REQ-034

Timestamps **MUST** declare or imply a defined semantic role.

### MSL-META-REQ-035

Metadata schema version **MUST** be discoverable for machine-profile specifications.

### MSL-META-REQ-036

Canonical identity **SHOULD** be human-readable where doing so does not compromise stability or uniqueness.

### MSL-META-REQ-037

Metadata defaults **MAY** be inherited from registered parent scopes.

### MSL-META-REQ-038

Inherited protected fields **MUST NOT** override explicit authoritative declarations.

---

## 49. Conceptual Model

```text
Specification Artifact

├── Canonical Identity
│   ├── Namespace
│   ├── Identifier
│   ├── Type
│   ├── Scope
│   └── Aliases
│
├── Descriptive Metadata
├── Classification Metadata
├── Version Metadata
├── Lifecycle Metadata
├── Ownership Metadata
├── Authorship Metadata
├── Provenance Metadata
├── Relationship Metadata
├── Compilation Metadata
├── Source Metadata
├── Registry Metadata
├── Security Metadata
├── Publication Metadata
└── Extension Metadata
        │
        ▼
Metadata Validation
        │
        ▼
Identity Resolution
        │
        ▼
Normalized Metadata IR
```

---

## 50. Machine Specification

```yaml
machine_spec:
  kind: metadata_and_identity_model

  identity:
    required:
      - namespace
      - canonical_id
      - artifact_type
      - scope

    immutable:
      - namespace
      - canonical_id

    mutable:
      - title
      - description
      - aliases
      - location
      - ownership
      - lifecycle

    scopes:
      - global
      - workspace
      - repository
      - namespace
      - specification
      - local

    supports:
      aliases: true
      migration: true
      semantic_element_identity: true
      fully_qualified_identity: true

  metadata_categories:
    - identity
    - descriptive
    - classification
    - lifecycle
    - versioning
    - ownership
    - authorship
    - provenance
    - relationships
    - compilation
    - source
    - registry
    - publication
    - security
    - extensions

  required_specification_metadata:
    artifact:
      - id
      - type
      - namespace

    metadata:
      - title
      - version
      - status

    compilation:
      - language
      - language_version
      - profile
      - source_role

    provenance:
      - creation

    source:
      - at_least_one_location

  merge_strategies:
    canonical_identity: forbid_override
    namespace: protected_inherit
    title: replace_by_primary
    tags: set_union
    authors: append_deduplicate
    dependencies: set_union_validate
    lifecycle: authorized_transition
    extensions: namespaced_deep_merge

  reserved_core_fields:
    - artifact
    - metadata
    - identity
    - lifecycle
    - version
    - relationships
    - provenance
    - ownership
    - authorship
    - compilation
    - source
    - registry
    - security
    - extensions

  compilation_states:
    - planned
    - bootstrap
    - pre_normative
    - parsed
    - validated
    - compiled
    - failed
    - stale
    - migrating
    - unsupported
```

---

## 51. Invariants

```yaml
invariants:
  - id: MSL-META-INV-001
    expression: artifact.canonical_identity != null
    description: Every specification has canonical identity.

  - id: MSL-META-INV-002
    expression: artifact.identity.depends_on_location == false
    description: Identity is independent of path and URL.

  - id: MSL-META-INV-003
    expression: artifact.canonical_identity.changes_without_migration == false
    description: Canonical identity changes only through explicit migration.

  - id: MSL-META-INV-004
    expression: artifact.version != compilation.language_version
    description: Artifact and language versions remain semantically distinct.

  - id: MSL-META-INV-005
    expression: lifecycle.state != compilation.status
    description: Lifecycle and compilation states remain distinct.

  - id: MSL-META-INV-006
    expression: alias.resolves_to.count == 1
    description: An active alias resolves unambiguously.

  - id: MSL-META-INV-007
    expression: extension.namespace != null
    description: Extension metadata is namespaced.

  - id: MSL-META-INV-008
    expression: extension.redefines_reserved_core_field == false
    description: Extensions cannot redefine core metadata.

  - id: MSL-META-INV-009
    expression: inherited_metadata.origin != null
    description: Inherited values retain origin information.

  - id: MSL-META-INV-010
    expression: protected_metadata.generic_deep_merge == false
    description: Protected fields use explicit merge rules.

  - id: MSL-META-INV-011
    expression: ai_contribution.provenance != null
    description: AI contributions retain provenance.

  - id: MSL-META-INV-012
    expression: identity_resolution.ambiguous_result == false
    description: Successful resolution produces one canonical result.

  - id: MSL-META-INV-013
    expression: semantic_element.parent_identity != null
    description: Internal semantic identities remain linked to their parent.

  - id: MSL-META-INV-014
    expression: registry_record.canonical_identity != registry_record.location
    description: Registry identity and location are distinct fields.
```

---

## 52. Diagnostics

### MSL0301 — Missing Canonical Identifier

The artifact does not declare a canonical identifier.

### MSL0302 — Missing Namespace

The artifact does not declare or inherit a valid namespace.

### MSL0303 — Unknown Artifact Type

The declared artifact type is not registered.

### MSL0304 — Identity Collision

Multiple active artifacts claim the same canonical identity within one resolution scope.

### MSL0305 — Ambiguous Alias

An alias resolves to more than one canonical identity.

### MSL0306 — Invalid Identifier Syntax

The identifier does not conform to the grammar registered for its artifact type.

### MSL0307 — Illegal Identity Mutation

A source attempts to change canonical identity without a migration record.

### MSL0308 — Missing Artifact Version

The specification does not declare an artifact version.

### MSL0309 — Version Category Confusion

A field uses a language, compiler, KIR, or registry version where an artifact version is required, or vice versa.

### MSL0310 — Missing Lifecycle State

The specification lacks a lifecycle declaration.

### MSL0311 — Lifecycle and Compilation State Confused

A compilation state is used as artifact lifecycle or the reverse.

### MSL0312 — Missing Creation Provenance

The artifact has no traceable creation origin.

### MSL0313 — Missing AI Provenance

AI-generated or AI-assisted content lacks required provenance.

### MSL0314 — Unnamespaced Extension Metadata

Custom metadata is declared without an extension namespace.

### MSL0315 — Reserved Core Field Override

An extension attempts to redefine protected core metadata.

### MSL0316 — Conflicting Protected Metadata

Primary and supplementary sources declare incompatible protected metadata.

### MSL0317 — Invalid Metadata Merge

Metadata is combined using a merge strategy not permitted for the field.

### MSL0318 — Missing Metadata Schema Version

A machine-profile specification does not expose its metadata schema version.

### MSL0319 — Ambiguous Identity Resolution

A reference cannot resolve deterministically to one canonical identity.

### MSL0320 — Invalid Identity Scope

The declared identity scope is unsupported or incompatible with the artifact type.

### MSL0321 — Missing Semantic-Element Identity

A durable externally referenced semantic element lacks stable identity.

### MSL0322 — Untraceable Inherited Metadata

An inherited value has no identifiable origin.

### MSL0323 — Alias Cycle

Aliases form a cycle that prevents canonical resolution.

### MSL0324 — Invalid Identity Migration

An identity migration lacks authority, source identity, replacement identity, reason, or history preservation.

### MSL0325 — Sensitive Metadata Exposure

A public projection contains metadata classified for restricted visibility.

---

## 53. Acceptance Criteria

This specification is satisfied when:

1. canonical identity is independent of file path, URL, title, ownership, and lifecycle;
2. namespace, canonical ID, artifact type, and identity scope are represented;
3. specification identity and internal semantic-element identity are distinguished;
4. aliases normalize to canonical identity;
5. identity changes require explicit migrations;
6. artifact, language, compiler, KIR, registry, schema, and extension versions remain distinct;
7. lifecycle, compilation, validation, publication, and working states remain distinct;
8. ownership and authorship are distinct;
9. human, AI, organization, and tool provenance can be represented;
10. metadata categories and minimum required fields are defined;
11. metadata inheritance preserves source origin;
12. metadata composition uses field-specific merge strategies;
13. extension metadata is namespaced and cannot redefine core fields;
14. identity resolution is deterministic;
15. collisions and ambiguities produce deterministic diagnostics;
16. registry identity remains distinct from registry location;
17. source and semantic fingerprints can be added without redefining canonical identity;
18. privacy-sensitive metadata can be excluded from public projections without changing the underlying artifact.

---

## 54. Conformance Examples

### 54.1 Valid Bootstrap Specification Metadata

```yaml
artifact:
  id: EXAMPLE-CORE-0001
  type: knowledge.specification
  namespace: example

metadata:
  title: Example Core Specification
  version: 0.1.0
  status: draft

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: structured
  source_role: primary
```

This defines stable identity separately from the source path.

### 54.2 Valid File Relocation

Original:

```text
specifications/example/EXAMPLE-CORE-0001.md
```

Relocated:

```text
specifications/example/core/EXAMPLE-CORE-0001/specification.md
```

Identity remains:

```text
example::EXAMPLE-CORE-0001
```

No identity migration is required.

### 54.3 Invalid Path-Based Identity

```yaml
artifact:
  id: specifications/example/core/specification.md
```

Expected diagnostic:

```text
MSL0306: canonical artifact identity must not be a filesystem path
```

### 54.4 Invalid Identity Collision

Source A:

```yaml
artifact:
  id: EXAMPLE-CORE-0001
  namespace: example
```

Source B:

```yaml
artifact:
  id: EXAMPLE-CORE-0001
  namespace: example
```

Both claim primary active identity.

Expected diagnostic:

```text
MSL0304: identity collision for example::EXAMPLE-CORE-0001
```

### 54.5 Valid Alias

```yaml
identity:
  aliases:
    - EXAMPLE-METADATA
```

Reference:

```text
EXAMPLE-METADATA
```

resolves to:

```text
example::EXAMPLE-CORE-0001
```

### 54.6 Invalid Ambiguous Alias

Artifact A:

```yaml
aliases:
  - CORE-SPEC
```

Artifact B:

```yaml
aliases:
  - CORE-SPEC
```

Expected diagnostic:

```text
MSL0305: alias CORE-SPEC resolves to multiple canonical identities
```

### 54.7 Valid Namespaced Extension

```yaml
extensions:
  org.example.compiler:
    optimization_level: bootstrap
```

### 54.8 Invalid Core Override

```yaml
extensions:
  artifact:
    id: REPLACEMENT-ID
```

Expected diagnostic:

```text
MSL0315: extension attempts to redefine reserved core field artifact
```

### 54.9 Valid Distinct Versions

```yaml
metadata:
  version: 0.2.0

compilation:
  language_version: 0.1.0
  metadata_schema_version: 0.1.0
  target_kir_version: 0.1.0
```

### 54.10 Invalid Version Confusion

```yaml
metadata:
  version: bootstrap
```

when the artifact-version grammar requires semantic versioning.

Expected diagnostic:

```text
MSL0309: bootstrap is a language-stage identifier, not a valid artifact version
```

### 54.11 Valid AI Provenance

```yaml
authorship:
  authors:
    - type: human
      name: Thomas Carter

  contributors:
    - type: ai
      provider: OpenAI
      model_family: GPT
      role: drafting-assistance
```

### 54.12 Invalid AI Attribution

```yaml
authorship:
  authors:
    - type: human
      name: Thomas Carter

provenance:
  creation_method: ai_generated
```

with no AI contributor metadata.

Expected diagnostic:

```text
MSL0313: AI-generated content lacks AI provenance
```

---

## 55. Security and Trust Considerations

Metadata and identity are security-sensitive.

Threats include:

* identity spoofing;
* registry poisoning;
* alias hijacking;
* malicious namespace shadowing;
* forged ownership;
* false approval state;
* omitted AI provenance;
* source-location substitution;
* metadata injection;
* extension-field collisions;
* identity migration used to conceal history;
* sensitive metadata leakage;
* dependency redirection.

Implementations should:

* validate registry authority;
* preserve canonical identity history;
* make aliases inspectable;
* reject ambiguous resolution;
* restrict protected metadata transitions;
* record identity migrations;
* preserve source hashes where practical;
* expose inherited metadata origins;
* separate publication metadata from internal metadata;
* redact sensitive metadata only in projections;
* prevent imported metadata from silently gaining local authority;
* distinguish trusted, reviewed, generated, and unverified metadata;
* support signed or attestable registry records in later versions.

---

## 56. Evolution and Compatibility

The metadata model will evolve as Monad approaches self-hosting.

Compatible evolution may include:

* adding optional descriptive fields;
* adding namespaced extension fields;
* adding optional registry metadata;
* introducing additional provenance events;
* adding new compilation states.

Potentially breaking changes include:

* changing canonical identifier grammar;
* changing namespace-resolution rules;
* changing merge behavior of protected fields;
* changing lifecycle semantics;
* changing required metadata;
* changing alias precedence;
* changing version interpretation.

Breaking metadata changes require:

* a metadata-schema version change;
* migration rules;
* compiler diagnostics;
* registry migration;
* preserved historical metadata;
* impact analysis.

Artifact identity must survive metadata-schema migrations.

---

## 57. Open Questions

1. Should fully qualified identities include registry authority?
2. Should namespaces use URI, reverse-domain, package-style, or symbolic syntax?
3. Should artifact IDs be globally unique or only namespace-unique?
4. Should requirement IDs be fully qualified by specification ID in KIR?
5. What fields are permitted to inherit from repository defaults?
6. How should metadata authority be delegated?
7. Should aliases expire?
8. How should alias reuse be prevented?
9. What cryptographic attestations should protect registry records?
10. How should offline registries reconcile identity conflicts?
11. Should semantic fingerprints be mandatory before MSL 1.0?
12. What metadata belongs in source versus generated registry records?
13. How should anonymous or pseudonymous authorship be represented?
14. How should model version, provider, and interaction IDs be recorded for AI contributions?
15. Should all lifecycle transitions be first-class artifacts?
16. How should public projections represent redacted provenance?
17. What identity rules apply to generated transient artifacts?
18. Can one logical specification have multiple simultaneous source formats?
19. How should imported external standards retain their original identifiers?
20. What is the canonical timestamp precision for reproducible builds?

---

## 58. Related Specifications

This specification is extended by:

| ID            | Title                               |
| ------------- | ----------------------------------- |
| MSL-CORE-0005 | Structural Grammar                  |
| MSL-CORE-0006 | Machine Specification Blocks        |
| MSL-CORE-0007 | Type and Constraint System          |
| MSL-CORE-0008 | Relationship and Reference Syntax   |
| MSL-CORE-0009 | Conformance and Acceptance Criteria |
| MSL-CORE-0010 | Versioning and Evolution            |

It informs:

| Series   | Relevance                                                   |
| -------- | ----------------------------------------------------------- |
| KIR-CORE | Defines normalized identity and metadata representation     |
| MSC-CORE | Defines metadata parsing, merging, and identity resolution  |
| MKE      | Stores identities, aliases, provenance, and metadata        |
| Registry | Catalogs canonical identities and locations                 |
| PUB      | Produces metadata-aware publication projections             |
| CLI      | Supports inspect, resolve, validate, and migrate operations |
| Security | Governs metadata authority and restricted visibility        |

---

## Status

Draft.

This document defines the metadata, namespace, provenance, and identity foundation of the Monad Specification Language.

---

id: WP-MSC-0004
title: Implement Semantic Identity Assignment
program: Semantic Compiler Foundation
phase: Compiler Implementation
work_cycle: WC-0001
program_increment: PI-002
milestone: M-003
priority: P0
status: planned

owner: Thomas Carter

created: 2026-08-06
started:
completed:

produces:

* reconciled semantic identity inventory
* deterministic graph-local identity map
* identity alias inventory
* authorized equivalence inventory
* identity collision inventory
* identity lineage records
* identity assignment diagnostics
* identity conformance fixtures

consumes:

* specifications/MSC/core/MSC-CORE-0008.md
* semantic-analysis snapshot
* semantic entity inventory
* semantic relationship inventory
* entity identity inputs
* relationship identity inputs
* artifact identity registry
* declaration identity inventory
* imported semantic identities
* alias graph
* equivalence-analysis results
* provenance index
* lifecycle-analysis results
* active ontology registry
* active MSG profile
* prior MSG identity map where incrementality is enabled

depends_on:

* WP-MSC-0001
* WP-MSC-0002
* WP-MSC-0003

blocks:

* WP-MSC-0005
* WP-MSC-0006

related:

* MSC-CORE-0004
* MSC-CORE-0005
* MSC-CORE-0006
* MSC-CORE-0007
* MSC-CORE-0008
* MSC-CORE-0009
* WP-MSC-0001
* WP-MSC-0002
* WP-MSC-0003
* WP-MSC-0005
* WP-MSC-0006

supersedes: []
superseded_by: []

tags:

* compiler
* msc
* msg
* semantic-identity
* graph-local-identity
* aliases
* equivalence
* collisions
* determinism
* lineage
* incremental-compilation

---

# WP-MSC-0004 — Implement Semantic Identity Assignment

## Executive Summary

Implement the identity-reconciliation and assignment stage for Monad Semantic Graph construction.

This stage receives semantic entity and relationship inventories whose source identities, authored identifiers, imported identities, derivation inputs, aliases, and equivalence findings have already been collected.

It must convert those identity inputs into a coherent identity model suitable for MSG materialization.

The implementation must:

* preserve existing durable semantic identities;
* distinguish semantic identity from declaration, artifact, representation, symbol, and graph-local identity;
* assign deterministic semantic identities where controlled derivation is permitted;
* refuse to invent durable identity where no valid policy exists;
* preserve aliases without silently merging concepts;
* merge identities only through explicit, authorized equivalence;
* detect and expose identity collisions;
* preserve identity lineage;
* allocate deterministic graph-local node and edge identifiers;
* support stable incremental reuse without tying semantic identity to a prior physical graph layout;
* produce an immutable identity map for graph materialization.

This stage is the principal defense against accidental identity based on filenames, source positions, traversal order, memory addresses, or storage implementation details.

---

# 1. Objective

Create a deterministic identity subsystem that reconciles all identity-bearing semantic inputs and produces the final identity assignments required to materialize MSG nodes, edges, and reified relationships.

The subsystem must ensure that:

1. one durable concept is not accidentally represented as several unrelated concepts;
2. several distinct concepts are not silently collapsed into one;
3. aliases remain distinguishable from identity equality;
4. graph-local IDs remain internal to one graph snapshot;
5. semantic identity survives representation movement and formatting changes;
6. collisions and uncertainty remain explicit;
7. identity assignment is reproducible;
8. incremental compilation preserves stable identity where meaning remains stable.

---

# 2. Primary Responsibility

The identity subsystem has one primary responsibility:

> Reconcile, preserve, derive, validate, and assign semantic and graph-local identities for graph construction without changing semantic meaning.

It owns:

* identity candidate inventory;
* identity-kind classification;
* identity-policy selection;
* authored identity preservation;
* imported identity preservation;
* deterministic identity derivation;
* alias preservation;
* equivalence authorization;
* identity representative selection;
* collision detection;
* collision classification;
* identity lineage;
* graph-local node ID allocation;
* graph-local edge ID allocation;
* graph-local reified-relationship ID allocation;
* prior-snapshot identity reuse evaluation;
* identity diagnostics;
* identity statistics.

It does not own:

* semantic entity extraction;
* semantic relationship extraction;
* name lookup;
* reference resolution;
* semantic equivalence inference not already authorized;
* ontology-wide validation;
* graph materialization;
* graph normalization;
* graph fingerprinting;
* immutable snapshot finalization;
* MKE identity persistence;
* cross-repository identity federation.

---

# 3. Architectural Position

```text
Entity Construction Requests
              │
Relationship Construction Requests
              │
              ▼
    Semantic Identity Reconciliation
              │
              ├── Semantic Identity Map
              ├── Alias Map
              ├── Equivalence Map
              ├── Collision Inventory
              └── Graph-Local ID Map
              │
              ▼
       Graph Materialization
              │
              ▼
       Graph Validation
              │
              ▼
       Snapshot Finalization
```

Identity reconciliation occurs after semantic candidates and relationships have been identified, but before graph elements are materialized.

---

# 4. Scope

## Included

This work packet includes:

* identity-assignment invocation;
* semantic identity candidates;
* entity identities;
* relationship identities;
* reified-relationship identities;
* explicit authored identities;
* imported persistent identities;
* canonical declaration identities;
* generated semantic identities;
* deterministic derived identities;
* anonymous structural identities;
* graph-local node identities;
* graph-local edge identities;
* identity namespaces;
* identity domains;
* identity versions;
* aliases;
* redirects;
* equivalence;
* merges;
* representative selection;
* collisions;
* identity ambiguity;
* identity invalidity;
* identity lineage;
* prior-snapshot reuse;
* incremental identity stability;
* extension identity providers;
* deterministic allocation;
* diagnostics;
* resource and security controls;
* identity tests and fixtures.

## Excluded

This work packet excludes:

* general symbol-table creation;
* source-language name resolution;
* reference resolution;
* ontology inference of equivalence;
* persistent MKE identity transactions;
* distributed identity federation;
* global public identifier registration;
* cryptographic identity signing;
* user account identity;
* authentication and authorization;
* graph validation beyond identity-specific checks;
* final graph fingerprinting;
* graph serialization.

---

# 5. Required Deliverables

## 5.1 Implementation Components

The implementation should provide language-neutral components equivalent to:

```text
Semantic Identity System
│
├── IdentityAssignmentCoordinator
├── IdentityCandidateInventory
├── IdentityKindClassifier
├── IdentityPolicyRegistry
├── ExplicitIdentityPreserver
├── ImportedIdentityPreserver
├── DerivedIdentityBuilder
├── AnonymousIdentityBuilder
├── AliasReconciler
├── EquivalenceAuthorizer
├── IdentityRepresentativeSelector
├── IdentityCollisionDetector
├── IdentityLineageBuilder
├── PriorSnapshotIdentityMatcher
├── GraphLocalIdentityAllocator
├── IdentityValidator
├── IdentityDiagnosticEmitter
├── IdentityStatisticsCollector
└── ReconciledIdentityInventory
```

## 5.2 Identity Conformance Fixtures

Fixtures must cover:

* explicit authored identity;
* imported persistent identity;
* canonical declaration identity;
* deterministic derived identity;
* representation movement;
* source formatting changes;
* aliasing;
* alias chains;
* authorized equivalence;
* unauthorized equivalence;
* semantic collision;
* duplicate assertion;
* anonymous structural identity;
* reified relationship identity;
* prior-snapshot reuse;
* graph-local allocation;
* deterministic parallel allocation;
* extension-defined identity policy.

## 5.3 Identity Policy Reference

The implementation should maintain a reference mapping:

```text
semantic kind
      ↓
identity requirement
      ↓
identity source priority
      ↓
derivation policy
      ↓
collision policy
      ↓
graph-local allocation policy
```

---

# 6. Identity Domains

The implementation must distinguish the following identity domains.

| Identity Domain         | Represents                                        |
| ----------------------- | ------------------------------------------------- |
| Artifact identity       | One engineering artifact across representations   |
| Representation identity | One concrete encoding or version of an artifact   |
| Declaration identity    | One declared compiler-level semantic construct    |
| Symbol identity         | One compiler-visible binding object               |
| Semantic identity       | One durable concept independent of representation |
| Relationship identity   | One durable semantic relationship or claim        |
| Compilation identity    | One compiler invocation and result set            |
| MSG identity            | One semantic graph snapshot                       |
| Graph-local identity    | One element address within one MSG snapshot       |
| MKE identity            | One persistent knowledge object or snapshot       |
| Projection identity     | One derived output                                |
| Evidence identity       | One evidence artifact                             |

These identity domains must not be represented by one overloaded untyped identifier.

---

# 7. Core Identity Rules

The implementation must preserve the following rules:

1. Names are not identities.
2. Paths are not identities.
3. Source positions are not identities.
4. Content hashes are not semantic identities.
5. Symbol identities are not semantic identities.
6. Graph-local identities are not semantic identities.
7. Database row identities are not semantic identities.
8. Aliases are not identity equality.
9. Similarity is not identity equality.
10. Equivalent display text is not identity equality.
11. Repeated assertion is not identity equality.
12. Identity merge requires explicit authorization.
13. Semantic identity must remain stable when meaning remains stable.
14. Meaningful semantic replacement normally requires a new identity or an explicit version/supersession relationship.
15. Identity collisions must never be resolved through ordering.

---

# 8. Input Contract

The identity subsystem must consume immutable or observationally stable inputs.

Conceptually:

```text
IdentityAssignmentInput

├── compilation_identity
├── semantic_snapshot_identity
├── entity_inventory
├── relationship_inventory
├── reification_inventory
├── explicit_identity_index
├── artifact_identity_index
├── declaration_identity_index
├── imported_identity_index
├── alias_graph
├── equivalence_results
├── provenance_index
├── lifecycle_results
├── ontology_registry
├── identity_policy_registry
├── active_msg_profile
├── prior_msg_identity_map
├── resource_policy
└── reproducibility_context
```

The subsystem must not mutate any input.

---

# 9. Output Contract

The subsystem must return an immutable result.

Conceptually:

```text
IdentityAssignmentResult

├── assignment_identity
├── compilation_identity
├── semantic_snapshot_identity
├── status
├── entity_identity_map
├── relationship_identity_map
├── reification_identity_map
├── alias_map
├── equivalence_map
├── representative_map
├── collision_inventory
├── unresolved_identity_inventory
├── graph_local_node_map
├── graph_local_edge_map
├── identity_lineage
├── diagnostics
├── statistics
├── reproducibility_record
└── downstream_availability
```

---

# 10. Assignment Status

The result status must use:

```text
success
success_with_warnings
partial
blocked
failed
cancelled
resource_exhausted
internal_error
```

## Success

Every required semantic graph element has a valid identity assignment.

## Success with Warnings

All required assignments exist, but nonblocking diagnostics are present.

## Partial

A stable identity inventory exists while some optional or explicitly incomplete identities remain unresolved, provisional, colliding, or unavailable.

## Blocked

A required identity policy, namespace, registry, equivalence decision, or prior assignment dependency is unavailable.

## Failed

Input-controlled identity errors prevent a coherent identity map.

## Cancelled

The operation was intentionally cancelled.

## Resource Exhausted

A declared resource limit prevented completion.

## Internal Error

The identity subsystem violated an internal invariant.

---

# 11. Identity Candidate Inventory

The subsystem must inventory identity candidates from:

* explicit source identifiers;
* artifact metadata;
* declaration IDs;
* imported semantic IDs;
* prior MSG snapshots;
* ontology-defined keys;
* package-qualified identities;
* relationship identity inputs;
* generated semantic constructs;
* placeholder inputs;
* extension providers.

Every candidate must identify:

* candidate value;
* candidate domain;
* candidate source;
* semantic subject;
* policy;
* provenance;
* authority;
* stability class;
* confidence or ambiguity where applicable.

---

# 12. Identity Requirement Classification

Every graph element candidate must be classified as one of:

```text
durable_semantic_identity_required
durable_relationship_identity_required
deterministic_structural_identity_permitted
graph_local_identity_only
external_identity_reference
identity_not_applicable
identity_blocked
```

First-class semantic entities require durable semantic identity.

First-class claims and independently governed relationships require durable relationship identity.

Purely structural helper elements may use deterministic structural identity only when the ontology permits it.

---

# 13. Identity Source Priority

Identity policy must define an explicit source priority.

A recommended default priority is:

1. accepted persistent semantic identity;
2. explicit authored semantic identity;
3. imported identity accepted by policy;
4. canonical registry identity;
5. canonical declaration identity;
6. deterministic ontology-defined identity;
7. controlled generated identity;
8. deterministic structural identity;
9. unresolved identity record.

Higher-priority identity must not automatically replace a lower-priority identity if doing so would erase a distinct semantic concept.

Priority selects among candidates for the same concept only after sameness has been established.

---

# 14. Explicit Authored Identity

An explicit authored identity must be preserved when it:

* satisfies the applicable identity format;
* belongs to an allowed namespace;
* is valid for the semantic kind;
* does not create an unresolved collision;
* does not violate registry or lifecycle rules.

Invalid explicit identity must produce a diagnostic.

The subsystem must not silently rewrite it into another identifier.

A corrected or normalized form may be proposed separately when policy allows.

---

# 15. Imported Identity

An imported semantic identity must preserve:

* external domain;
* identity value;
* version or scope;
* source system;
* import policy;
* authority;
* provenance;
* local adoption state;
* compatibility.

Imported identity may be:

* preserved directly;
* namespaced;
* mapped to a local semantic identity;
* retained as an external reference;
* rejected;
* marked provisional.

Import mode must be explicit.

---

# 16. Canonical Declaration Identity

A canonical declaration identity may seed semantic identity when the declaration identity policy guarantees semantic stability.

The subsystem must evaluate whether the declaration identity depends on unstable representation details.

A declaration identity based solely on:

* file path;
* line number;
* declaration order;
* generated parser index

must not become a durable semantic identity.

---

# 17. Deterministic Derived Identity

A derived semantic identity is permitted only under a registered identity policy.

Conceptually:

```text
DerivedIdentityPolicy

├── policy_identity
├── version
├── supported_semantic_kind
├── namespace
├── required_inputs
├── canonicalization_rule
├── derivation_algorithm
├── collision_policy
├── stability_guarantee
├── migration_policy
├── extension_origin
└── determinism_declaration
```

The derived identity must depend only on stable semantic inputs.

---

# 18. Stable Derivation Inputs

Permitted derivation inputs may include:

* owning semantic identity;
* semantic kind;
* canonical local key;
* package identity;
* namespace identity;
* explicitly ordered qualifier set;
* target-independent role;
* ontology-defined discriminator;
* relationship endpoint identities;
* relationship kind;
* context fingerprint.

Unstable derivation inputs include:

* source line;
* traversal index;
* map iteration position;
* current timestamp;
* random value without persisted assignment;
* memory address;
* thread identifier;
* absolute temporary path.

---

# 19. Controlled Generated Identity

When deterministic derivation is impossible but durable identity is required, a generated identity may be assigned only when the assignment can be preserved beyond the current compilation.

A generated identity policy must specify:

* generator identity;
* generated namespace;
* persistence destination;
* assignment record;
* collision handling;
* reuse behavior;
* migration behavior;
* offline behavior.

A random identity generated and then forgotten is not a stable semantic identity.

For bootstrap compilation without persistent assignment, such a case should normally remain blocked or provisional.

---

# 20. Anonymous Structural Identity

An ontology may permit a graph element without durable semantic identity when it is purely structural.

Its identity must be deterministically derived from:

* owning semantic identity;
* structural role;
* canonical index where order is semantically defined;
* canonical value or qualifier.

Anonymous structural identity must not be externally referenceable as a durable concept.

---

# 21. Relationship Identity

A relationship requires durable semantic identity when it:

* is independently referenceable;
* has lifecycle;
* has authority;
* has evidence;
* has supersession;
* is the subject of another claim;
* represents a decision, event, adoption, validation, or first-class claim.

Simple derived structural edges may use deterministic graph-local identity where permitted.

---

# 22. Reified Relationship Identity

A reified relationship node must have a semantic identity.

Its identity policy may use:

* explicit relationship ID;
* imported relationship ID;
* canonical claim ID;
* source and target semantic identities;
* relationship kind;
* context;
* canonical qualifier set;
* owning artifact or decision identity.

The derivation must avoid collapsing independently asserted claims merely because their subject, predicate, and object are equal.

Provenance and authority distinctions may require separate claim identities.

---

# 23. Alias Model

An alias is an alternate reference to a semantic identity.

Conceptually:

```text
IdentityAlias

├── alias_identity
├── alias_value
├── target_semantic_identity
├── namespace
├── scope
├── lifecycle
├── provenance
├── authority
└── resolution_policy
```

Aliases must remain distinct from the target identity.

---

# 24. Alias Chains

Alias chains must be:

* finite;
* cycle-checked;
* deterministic;
* explainable;
* profile-compatible.

The subsystem should normalize alias lookup to a final semantic identity while preserving the original chain for provenance and explanation.

An alias cycle must produce a diagnostic.

---

# 25. Redirects

A redirect differs from an alias when it represents identity movement, migration, or replacement.

A redirect should preserve:

* prior identifier;
* target identifier;
* reason;
* effective boundary;
* lifecycle;
* migration provenance.

Redirects must not silently imply semantic equivalence when they actually represent supersession.

---

# 26. Equivalence

Identity equivalence asserts that two identity-bearing records represent the same durable semantic concept.

Equivalence may originate from:

* explicit authored equivalence;
* accepted registry mapping;
* governed import mapping;
* ontology-defined equivalence;
* MKE identity reconciliation;
* approved migration;
* authorized human decision.

Similarity, shared names, shared content, or inferred resemblance are insufficient by themselves.

---

# 27. Equivalence Authorization

An equivalence decision must include:

```text
IdentityEquivalence

├── equivalence_identity
├── left_identity
├── right_identity
├── basis
├── authorizing_rule_or_actor
├── authority
├── applicability
├── lifecycle
├── provenance
├── compatibility
└── status
```

Only accepted and applicable equivalence may cause identity merging.

Provisional equivalence must remain a claim rather than an automatic merge.

---

# 28. Representative Selection

When equivalent identities are merged for graph materialization, one representative identity may be selected.

Representative selection must be deterministic and policy-driven.

A recommended order is:

1. accepted persistent identity;
2. explicit canonical identity;
3. accepted registry identity;
4. locally canonical identity;
5. stable imported identity;
6. deterministic derived identity.

All nonrepresentative identities must remain preserved as aliases, historical identities, or equivalence members.

---

# 29. Identity Merge

Identity merge must preserve:

* every source identity;
* every alias;
* equivalence basis;
* authorizing authority;
* provenance;
* lifecycle;
* affected references;
* representative selection rationale;
* migration effects.

Identity merge must not erase contradictory semantic claims associated with the merged identity.

---

# 30. Identity Collision

An identity collision occurs when one identity value is assigned to semantic subjects that have not been established as equivalent.

Collision classes should include:

```text
duplicate_equivalent
duplicate_corroborating
namespace_collision
kind_collision
ownership_collision
version_collision
import_collision
derived_identity_collision
graph_local_collision
invalid_reuse
ambiguous_collision
```

---

# 31. Collision Handling

A collision must not be resolved by:

* first writer wins;
* last writer wins;
* source order;
* file order;
* registration order;
* automatic suffixing;
* random regeneration;
* silent overwrite.

The subsystem must:

1. identify all participants;
2. classify the collision;
3. preserve provenance;
4. determine whether equivalence is authorized;
5. merge only when authorized;
6. otherwise retain an explicit collision;
7. block affected graph materialization where necessary.

---

# 32. Automatic Suffixing

Automatic suffixing such as `name-2` or `id-3` must not be used to resolve durable semantic identity collisions.

It may be used only for graph-local display labels or temporary diagnostics where it cannot be confused with semantic identity.

---

# 33. Ambiguous Identity

An identity is ambiguous when several candidate assignments remain viable.

An ambiguous identity record must preserve:

* semantic subject;
* candidate identities;
* candidate sources;
* candidate policies;
* ambiguity reason;
* affected graph elements;
* diagnostics;
* resume condition.

Ambiguity must not be resolved through ordering.

---

# 34. Unresolved Identity

A required identity may remain unresolved only when the active MSG profile permits partial graph construction.

An unresolved identity record must include:

* semantic subject;
* required identity domain;
* attempted sources;
* missing dependency;
* affected relationships;
* blocked downstream outputs;
* provenance;
* diagnostics.

A finalized ordinary MSG node must not pretend an unresolved identity is durable.

---

# 35. Invalid Identity

An identity is invalid when it violates:

* format;
* namespace;
* kind restrictions;
* ownership requirements;
* lifecycle requirements;
* compatibility requirements;
* registry rules;
* security policy.

An invalid identity must remain explicit and must not be silently normalized into validity.

---

# 36. Identity Lineage

Every derived, mapped, merged, redirected, or reused identity must preserve lineage.

Conceptually:

```text
IdentityLineageRecord

├── subject_identity
├── operation
├── input_identities
├── output_identity
├── policy
├── policy_version
├── actor_or_system
├── compilation_identity
├── prior_snapshot
├── provenance
├── authority
└── explanation
```

Identity lineage supports:

* semantic diff;
* migration;
* debugging;
* historical queries;
* self-hosting;
* conformance.

---

# 37. Prior-Snapshot Identity Reuse

Where incremental compilation supplies a prior MSG identity map, the subsystem may reuse prior identity assignments when semantic continuity is established.

Reuse requires:

* same semantic concept;
* compatible identity policy;
* compatible namespace;
* unchanged identity-defining inputs;
* no supersession or replacement;
* no conflicting explicit identity;
* valid prior lineage.

Prior assignment must not override a new explicit identity automatically.

---

# 38. Semantic Continuity

Semantic continuity may be established through:

* explicit stable semantic identity;
* unchanged accepted registry identity;
* stable deterministic derivation;
* authorized migration mapping;
* accepted equivalence;
* persistent MKE identity record.

Text similarity or file movement alone may support investigation but does not prove continuity.

---

# 39. Representation Movement

Moving an artifact or declaration to another file or directory must not change semantic identity when:

* explicit identity remains;
* ownership remains semantically equivalent;
* namespace remains equivalent or migrated explicitly;
* identity policy does not define location as semantic.

Any location-dependent identity behavior must be explicit and justified.

---

# 40. Renaming

A name change does not automatically change semantic identity.

The identity subsystem must distinguish:

* display-name change;
* alias addition;
* canonical-name change;
* semantic replacement;
* namespace movement;
* identity migration.

A rename may be breaking for references without being a new semantic concept.

---

# 41. Versioning

Version changes do not automatically create new semantic identity.

Identity policy must distinguish:

* version of the same concept;
* incompatible successor;
* fork;
* variant;
* revision;
* replacement.

Version relationships should be represented semantically rather than encoded ambiguously into identity alone.

---

# 42. Forks and Branches

A fork may retain or change semantic identities according to explicit policy.

The subsystem must not assume that identical source ancestry means permanent identity equality.

Fork handling may require:

* new identity domain;
* retained origin relationship;
* equivalence claim;
* divergence boundary;
* authority separation.

---

# 43. Graph-Local Identity

Every materialized graph node and edge must receive a graph-local ID.

Graph-local IDs serve:

* efficient lookup;
* adjacency;
* serialization references;
* internal indexing;
* compact storage.

They are valid only within one MSG snapshot.

---

# 44. Graph-Local Node IDs

Graph-local node allocation must be deterministic under equivalent identity inputs.

A recommended strategy is to sort nodes by:

1. representative semantic identity;
2. ontology type;
3. stable construction-rule identity;
4. canonical secondary discriminator.

Then assign compact local IDs.

The exact strategy may differ, but it must be deterministic and collision-free.

---

# 45. Graph-Local Edge IDs

Graph-local edge allocation should use canonical ordering over:

1. source semantic identity;
2. relationship kind;
3. target semantic identity;
4. relationship semantic identity where available;
5. context fingerprint;
6. construction-rule identity.

Edge-local identity must remain stable under equivalent semantic graph content when the canonical allocation profile requires stability.

---

# 46. Reified Relationship Local IDs

A reified relationship node receives a graph-local node ID using the same node-allocation rules as other nodes.

Its endpoint-link edges receive graph-local edge IDs separately.

---

# 47. Graph-Local Stability

Graph-local IDs may change when unrelated graph content changes unless the selected profile promises stable local allocation.

Therefore:

* downstream persistent systems must use semantic identity for durable correspondence;
* external references must not rely on graph-local IDs;
* diagnostics may use graph-local IDs only alongside semantic identity;
* graph diffs must not treat local-ID changes alone as semantic changes.

---

# 48. Stable Local-ID Profile

An optional stable-local-ID profile may attempt to preserve prior graph-local IDs during incremental compilation.

Such reuse must not:

* create duplicate local IDs;
* change semantic identity;
* make graph meaning depend on prior physical layout;
* prevent deterministic clean construction;
* cause incremental and clean semantic divergence.

Clean-build canonical equivalence remains mandatory.

---

# 49. Identity Namespaces

Every durable identity should belong to an explicit or inferable namespace.

A namespace policy must define:

* namespace identity;
* permitted semantic kinds;
* uniqueness scope;
* case sensitivity;
* normalization;
* version behavior;
* federation behavior;
* collision domain.

Namespace must not be inferred solely from a directory unless the architecture explicitly defines that directory as semantically meaningful.

---

# 50. Identity Canonicalization

Identity canonicalization may normalize:

* scheme casing where defined;
* namespace prefixes;
* URI normalization;
* delimiter rules;
* Unicode normalization;
* canonical version encoding;
* percent encoding where specified.

Canonicalization must not change semantic identity meaning.

The original authored identity should remain available in provenance when normalization occurs.

---

# 51. Case Sensitivity

Case sensitivity must be defined per identity namespace.

The subsystem must not apply one global case-folding policy.

Case collisions must produce explicit diagnostics according to namespace policy.

---

# 52. Unicode

Unicode identity handling must define:

* normalization form;
* confusable-character policy;
* allowed character classes;
* display-versus-canonical form;
* security diagnostics.

Visually similar identifiers must not be treated as equivalent automatically.

---

# 53. External Identities

An external identity must preserve:

* external domain;
* identity scheme;
* identity value;
* version or scope;
* resolution status;
* authority assumptions;
* provenance;
* local mapping where present.

An unresolved external identity must not be allocated as an internal semantic identity without an explicit import policy.

---

# 54. Extension Identity Providers

Extensions may register identity policies and providers.

They must declare:

* extension identity;
* version;
* supported semantic kinds;
* identity namespace;
* derivation inputs;
* determinism;
* collision policy;
* migration policy;
* compatibility;
* trust requirements;
* diagnostics namespace.

Extensions must not:

* override explicit accepted identity silently;
* erase aliases;
* merge identities without authorization;
* use unstable hidden inputs;
* allocate durable identities that cannot be reproduced or persisted;
* depend on registration order.

---

# 55. Determinism

Equivalent identity inputs and configuration must produce semantically equivalent identity assignments.

Determinism includes:

* policy selection;
* canonicalization;
* derived identities;
* representative selection;
* alias resolution;
* collision classification;
* graph-local allocation;
* diagnostics ordering;
* statistics.

Assignment must not depend silently on:

* hash-map order;
* thread scheduling;
* filesystem enumeration;
* rule registration order;
* current time;
* random values without persisted assignment;
* machine hostname;
* locale;
* temporary paths.

---

# 56. Canonical Processing Order

Observable identity processing should use stable ordering:

1. identity domain;
2. semantic subject identity input;
3. semantic kind;
4. namespace;
5. policy identity;
6. candidate identity value;
7. provenance fingerprint.

Meaning must remain independent of processing order.

---

# 57. Identity Validation

Identity validation must include:

## 57.1 Format Validation

* syntax;
* length;
* character rules;
* namespace prefix;
* scheme.

## 57.2 Domain Validation

* valid identity domain;
* valid semantic kind;
* valid namespace;
* permitted relationship identity.

## 57.3 Stability Validation

* no unstable derivation input;
* compatible policy version;
* persistent generated assignment where required.

## 57.4 Collision Validation

* duplicate identity;
* incompatible kinds;
* incompatible owners;
* conflicting imports;
* derived collision.

## 57.5 Alias Validation

* target exists or remains external;
* no illegal cycle;
* scope is valid;
* lifecycle is valid.

## 57.6 Equivalence Validation

* authorization exists;
* applicability is active;
* provenance is present;
* no prohibited cross-domain merge.

## 57.7 Local-ID Validation

* uniqueness;
* endpoint compatibility;
* deterministic allocation;
* no escape as durable ID.

---

# 58. Identity Diagnostics

Diagnostic categories should include:

```text
MSG-IDENTITY-MISSING
MSG-IDENTITY-INVALID
MSG-IDENTITY-NAMESPACE
MSG-IDENTITY-DERIVATION
MSG-IDENTITY-UNSTABLE
MSG-IDENTITY-COLLISION
MSG-IDENTITY-AMBIGUOUS
MSG-IDENTITY-ALIAS
MSG-IDENTITY-ALIAS-CYCLE
MSG-IDENTITY-EQUIVALENCE
MSG-IDENTITY-MERGE
MSG-IDENTITY-IMPORT
MSG-IDENTITY-MIGRATION
MSG-IDENTITY-PRIOR-SNAPSHOT
MSG-IDENTITY-LOCAL
MSG-IDENTITY-EXTENSION
MSG-IDENTITY-SECURITY
MSG-IDENTITY-RESOURCE
MSG-IDENTITY-INTERNAL
```

Every diagnostic must identify:

* code;
* severity;
* semantic subject;
* identity domain;
* candidate identity where safe;
* namespace;
* policy;
* provenance;
* blocking effect;
* remediation where practical.

Sensitive identity values may require redaction.

---

# 59. Resource Controls

The subsystem must enforce declared limits including:

* maximum identity candidates;
* maximum aliases;
* maximum alias-chain depth;
* maximum equivalence group size;
* maximum collision participants;
* maximum identity length;
* maximum namespace count;
* maximum prior-snapshot mappings;
* maximum extension-provider calls;
* maximum diagnostics;
* maximum execution time.

Resource exhaustion must remain distinct from invalid identity.

---

# 60. Security Requirements

The identity subsystem must defend against:

* namespace spoofing;
* Unicode confusables;
* path injection;
* URI injection;
* alias cycles;
* identity-collision attacks;
* oversized identity values;
* hash-collision abuse;
* malicious extension providers;
* untrusted prior-snapshot mappings;
* sensitive identity disclosure;
* cross-tenant or cross-domain identity confusion.

Identity values are data.

They must not be interpreted as executable paths, commands, or queries without a governed adapter.

---

# 61. Implementation Boundaries

The implementation should provide logical boundaries equivalent to:

```text
identity/
├── coordinator
├── candidates
├── domains
├── kinds
├── policies
├── explicit
├── imported
├── derived
├── anonymous
├── aliases
├── equivalence
├── representative
├── collisions
├── lineage
├── prior_snapshot
├── local_node_ids
├── local_edge_ids
├── canonicalization
├── validation
├── diagnostics
├── statistics
└── fixtures
```

This is not a mandatory filesystem layout.

---

# 62. Public Interface

A conceptual interface should resemble:

```text
assign_identities(
    semantic_snapshot,
    entity_inventory,
    relationship_inventory,
    identity_registry,
    identity_policy_registry,
    ontology_registry,
    prior_msg_identity_map,
    msg_profile,
    resource_policy
) -> IdentityAssignmentResult
```

The interface must not mutate its inputs.

The result must be immutable or frozen before graph materialization.

---

# 63. Statistics

The result should report:

* total identity subjects;
* explicit identities preserved;
* imported identities preserved;
* declaration identities promoted;
* deterministic identities derived;
* generated assignments;
* anonymous structural identities;
* aliases;
* alias cycles;
* equivalence groups;
* identity merges;
* collisions;
* ambiguous identities;
* unresolved identities;
* prior assignments reused;
* graph-local node IDs allocated;
* graph-local edge IDs allocated;
* warnings;
* errors.

Statistics are reporting metadata and are not canonical graph knowledge by default.

---

# 64. Acceptance Criteria

WP-MSC-0004 is complete when:

1. Identity domains are represented distinctly.
2. Every graph element candidate receives an identity requirement classification.
3. Explicit semantic identities are preserved.
4. Imported identities retain domain and provenance.
5. Declaration identities are promoted only when stable.
6. Deterministic derivation policies are registered and versioned.
7. Derived identities use stable semantic inputs.
8. Generated durable identities require persistent assignments.
9. Anonymous structural identities are bounded and deterministic.
10. Relationship identities are assigned where required.
11. Reified relationships receive semantic identities.
12. Aliases remain distinct from semantic identity.
13. Alias chains are validated.
14. Alias cycles are diagnosed.
15. Equivalence requires explicit authorization.
16. Representative selection is deterministic.
17. Identity merges preserve lineage.
18. Collisions are classified explicitly.
19. Collisions are never resolved by ordering.
20. Ambiguous identities remain explicit.
21. Unresolved identities block affected materialization correctly.
22. Invalid identities cannot masquerade as valid.
23. Identity lineage is recorded.
24. Prior-snapshot reuse is policy-controlled.
25. Representation movement preserves identity where meaning remains stable.
26. Renames remain distinguishable from replacements.
27. Version changes follow identity policy.
28. Graph-local node IDs are unique and deterministic.
29. Graph-local edge IDs are unique and deterministic.
30. Graph-local IDs do not escape as durable identity.
31. Identity namespaces are explicit.
32. Canonicalization is namespace-specific.
33. Unicode and confusable-character policy is enforced.
34. Extension providers cannot bypass core identity invariants.
35. Identity assignment is deterministic.
36. Resource limits are enforced.
37. Security controls are implemented.
38. Structured diagnostics are emitted.
39. Unit tests pass.
40. Integration tests pass.
41. Property-based tests pass.
42. Incremental identity stability tests pass.
43. Conformance fixtures pass.
44. No graph snapshot is finalized by this subsystem.

---

# 65. Definition of Done

* [ ] Input contract implemented.
* [ ] Output contract implemented.
* [ ] Identity-domain model implemented.
* [ ] Identity requirement classification implemented.
* [ ] Candidate inventory implemented.
* [ ] Identity policy registry implemented.
* [ ] Explicit identity preservation implemented.
* [ ] Imported identity preservation implemented.
* [ ] Declaration identity promotion implemented.
* [ ] Deterministic derivation implemented.
* [ ] Generated identity assignment policy implemented.
* [ ] Anonymous structural identity implemented.
* [ ] Relationship identity handling implemented.
* [ ] Reified relationship identity handling implemented.
* [ ] Alias model implemented.
* [ ] Alias-chain resolution implemented.
* [ ] Alias-cycle detection implemented.
* [ ] Redirect model implemented.
* [ ] Equivalence authorization implemented.
* [ ] Representative selection implemented.
* [ ] Identity merge implemented.
* [ ] Collision classification implemented.
* [ ] Collision handling implemented.
* [ ] Ambiguous identity preservation implemented.
* [ ] Unresolved identity handling implemented.
* [ ] Invalid identity handling implemented.
* [ ] Identity lineage implemented.
* [ ] Prior-snapshot matching implemented.
* [ ] Semantic continuity rules implemented.
* [ ] Rename and movement handling implemented.
* [ ] Version identity rules implemented.
* [ ] Graph-local node allocation implemented.
* [ ] Graph-local edge allocation implemented.
* [ ] Stable-local-ID profile implemented or explicitly deferred.
* [ ] Namespace model implemented.
* [ ] Canonicalization implemented.
* [ ] Case-sensitivity policies implemented.
* [ ] Unicode policies implemented.
* [ ] External identity handling implemented.
* [ ] Extension provider contract implemented.
* [ ] Deterministic processing implemented.
* [ ] Identity validation implemented.
* [ ] Resource controls implemented.
* [ ] Security controls implemented.
* [ ] Structured diagnostics implemented.
* [ ] Statistics implemented.
* [ ] Unit tests completed.
* [ ] Integration tests completed.
* [ ] Property tests completed.
* [ ] Incremental stability tests completed.
* [ ] Conformance fixtures completed.
* [ ] Architecture review completed.
* [ ] Completion outcome recorded.
* [ ] Project status updated.
* [ ] Changes committed.

---

# 66. Required Tests

## Explicit Identity

* valid authored identity is preserved;
* invalid authored identity is diagnosed;
* explicit identity survives file movement;
* display-name change does not alter semantic identity.

## Imported Identity

* accepted external identity is preserved;
* namespaced import remains traceable;
* prohibited import is rejected;
* provisional mapping does not merge automatically.

## Derived Identity

* equivalent inputs produce equal derived identity;
* changed semantic key changes derived identity;
* source line changes do not alter identity;
* map order does not alter identity;
* unstable derivation input is rejected.

## Aliases

* alias resolves to target;
* alias remains represented;
* alias chain resolves deterministically;
* alias cycle is diagnosed;
* alias does not merge distinct identities.

## Equivalence

* authorized equivalence merges representatives;
* provisional equivalence remains unmerged;
* representative selection is deterministic;
* all source identities remain in lineage;
* cross-domain prohibited merge is rejected.

## Collisions

* equivalent duplicate is classified correctly;
* unrelated subjects sharing identity produce collision;
* collision does not use first-writer selection;
* automatic suffixing is not used;
* derived collision is diagnosed.

## Prior Snapshot

* unchanged concept reuses prior identity;
* changed identity-defining input invalidates reuse;
* new explicit identity supersedes prior derived assignment only through policy;
* untrusted prior map is validated.

## Graph-Local IDs

* every node gets one local ID;
* every edge gets one local ID;
* local IDs are unique;
* equivalent clean builds allocate deterministic local IDs;
* local IDs do not appear as semantic identities.

## Security

* Unicode confusable warning is emitted;
* oversized identity is rejected;
* malicious URI remains data;
* extension cannot override accepted identity silently.

## Boundary

* semantic inventories remain unchanged;
* no graph elements are materially finalized;
* no graph fingerprint is produced;
* no MKE identity transaction occurs.

---

# 67. Property-Based Tests

Property-based tests should verify:

* deterministic identity derivation;
* canonicalization idempotence;
* alias resolution termination;
* alias-cycle detection;
* equivalence relation consistency where authorized;
* graph-local uniqueness;
* representative-selection stability;
* collision preservation;
* incremental and clean identity equivalence;
* serialization round-trip of identity records.

---

# 68. Conformance Fixtures

At minimum:

```text
fixtures/msg/identity-assignment/
├── explicit/
├── imported/
├── declaration/
├── derived/
├── generated/
├── anonymous/
├── relationship/
├── reified/
├── aliases/
├── alias-cycles/
├── redirects/
├── equivalence/
├── merges/
├── collisions/
├── ambiguous/
├── unresolved/
├── invalid/
├── prior-snapshot/
├── movement/
├── rename/
├── versioning/
├── local-ids/
├── unicode/
├── extension/
└── deterministic/
```

Each fixture should identify:

* entity and relationship inputs;
* identity candidates;
* identity policy;
* expected semantic identity assignments;
* expected aliases or equivalence;
* expected graph-local assignments;
* expected collisions;
* expected diagnostics;
* expected status.

---

# 69. Risks

## Risk 1 — Path-Based Semantic Identity

Implementation may use paths because they are easy and locally unique.

**Mitigation**

Reject location-only durable identity and test file movement.

## Risk 2 — Content Hash as Identity

Identical content may be mistaken for identical concepts.

**Mitigation**

Use hashes for integrity and fingerprints, not semantic identity.

## Risk 3 — Silent Alias Merge

Aliases may cause distinct concepts to collapse.

**Mitigation**

Keep aliases separate and require explicit equivalence.

## Risk 4 — Automatic Collision Repair

The implementation may append suffixes to make IDs unique.

**Mitigation**

Prohibit suffix-based semantic identity repair.

## Risk 5 — Lost Identity Lineage

Merges may preserve only the chosen representative.

**Mitigation**

Make lineage and equivalence members mandatory outputs.

## Risk 6 — Incremental Identity Drift

Small representation changes may generate new identities.

**Mitigation**

Base identity on stable semantic inputs and compare clean versus incremental builds.

## Risk 7 — Prior Snapshot Dominance

Old assignments may override new authored intent.

**Mitigation**

Make prior reuse lower priority than valid explicit current identity.

## Risk 8 — Graph-Local Leakage

Compact local IDs may leak into external APIs or persistence as durable identity.

**Mitigation**

Use distinct types and prohibit external durable references to local IDs.

## Risk 9 — Extension Namespace Capture

An extension may claim identities belonging to a core or another extension namespace.

**Mitigation**

Validate namespace ownership and provider authority.

## Risk 10 — Identity Overengineering

The first implementation may attempt global federation before local compilation works.

**Mitigation**

Use a bounded bootstrap identity profile and defer federation.

---

# 70. Bootstrap Identity Profile

The initial compiler should implement a bounded identity profile.

## Required

* explicit artifact IDs;
* explicit specification IDs;
* canonical declaration IDs;
* deterministic local semantic IDs;
* relationship identity for reified claims;
* alias preservation;
* collision diagnostics;
* deterministic graph-local node IDs;
* deterministic graph-local edge IDs;
* identity lineage;
* file-movement stability tests.

## May Defer

* global identity federation;
* persistent generated-ID registry;
* cross-organization equivalence;
* cryptographic identity proofs;
* distributed namespace resolution;
* sophisticated identity migration automation;
* stable graph-local IDs across unrelated graph revisions.

## Bootstrap Rule

Where durable identity cannot be assigned soundly, the bootstrap compiler must preserve an unresolved identity state or block strict MSG construction rather than invent unstable identity.

---

# 71. Architectural Invariants

1. Semantic identity is not a name.
2. Semantic identity is not a path.
3. Semantic identity is not a source position.
4. Semantic identity is not a content hash.
5. Semantic identity is not a symbol ID.
6. Semantic identity is not a graph-local ID.
7. Existing valid semantic identity is preserved.
8. Derived identity uses stable semantic inputs.
9. Generated durable identity requires preserved assignment.
10. Aliases do not imply equivalence.
11. Equivalence requires authorization.
12. Identity merge preserves all lineage.
13. Representative selection is deterministic.
14. Collisions remain explicit.
15. Ordering never resolves identity collision.
16. Automatic suffixing does not repair semantic identity.
17. Ambiguous identity remains ambiguous.
18. Unresolved identity does not masquerade as durable identity.
19. Graph-local IDs are snapshot-scoped.
20. Durable correspondence uses semantic identity.
21. Representation movement does not change meaning automatically.
22. Rename does not imply replacement.
23. Version change does not imply new concept automatically.
24. Namespace semantics are explicit.
25. Canonicalization is idempotent and namespace-specific.
26. Extension providers cannot override core identity silently.
27. Prior-snapshot reuse is conditional, not authoritative.
28. Equivalent inputs produce equivalent assignments.
29. Resource exhaustion is not invalid identity.
30. Identity assignment does not finalize MSG.

---

# 72. Completion Outcome

To be completed after implementation.

## Actual Deliverables

Pending.

## Deviations from Plan

Pending.

## Test Evidence

Pending.

## Architectural Findings

Pending.

## Follow-Up Actions

Pending.

## Commits

Pending.

## Final Status

Planned.

---

# 73. Suggested Commit

Planning artifact:

```text
engineering(msc): add semantic identity assignment work packet
```

Future implementation:

```text
feat(msc): implement semantic identity assignment
```

---

# 74. Next Work

Upon completion of this planning artifact, generate:

```text
WP-MSC-0005 — Implement Semantic Graph Validation
```

That work packet will materialize and validate graph structure, ontology constraints, endpoint integrity, provenance, governance, conflict preservation, profile requirements, and MSG invariants before snapshot finalization.

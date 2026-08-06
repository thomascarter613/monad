---
artifact:
  id: MSC-CORE-0009
  type: knowledge.specification
  namespace: monad

metadata:
  title: Diagnostics, Incrementality, and Reproducibility
  version: 0.1.0
  status: draft
  created: 2026-08-06
  authors:
    - Monad Architecture Team
  tags:
    - msc
    - diagnostics
    - incrementality
    - reproducibility
    - determinism
    - caching
    - invalidation
    - fingerprints
    - observability
    - concurrency
    - security
    - semantic-graph

relationships:
  depends_on:
    - ADR-0002
    - ADR-0003
    - ADR-0004
    - ADR-0005
    - ADR-0006
    - ADR-0007
    - MSL-CORE-0001
    - MSL-CORE-0002
    - MSL-CORE-0003
    - MSL-CORE-0004
    - MSL-CORE-0005
    - MSL-CORE-0006
    - MSL-CORE-0007
    - MSL-CORE-0008
    - MSL-CORE-0009
    - MSL-CORE-0010
    - MSC-CORE-0001
    - MSC-CORE-0002
    - MSC-CORE-0003
    - MSC-CORE-0004
    - MSC-CORE-0005
    - MSC-CORE-0006
    - MSC-CORE-0007
    - MSC-CORE-0008
  references:
    - MART-CORE
    - MSG-CORE
    - MGO-CORE
    - MKE-CORE
    - KIR-CORE
    - MPE-CORE
    - MAE-CORE
  enables:
    - MSC-CORE-0010
    - MSC-DIAGNOSTIC
    - MSC-INCREMENTAL
    - MSC-CACHE
    - MSC-REPRODUCIBILITY
    - MSC-OBSERVABILITY
    - KIR-CORE
    - MKE-CORE

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: primary
  status: bootstrap
---

# MSC-CORE-0009 — Diagnostics, Incrementality, and Reproducibility


---

## 1. Purpose

This specification defines the compiler-wide contracts by which the Monad Specification Compiler:

* reports diagnostics;
* assigns stable diagnostic identity;
* preserves diagnostic provenance and semantic context;
* distinguishes diagnostics from semantic conflicts;
* suppresses, waives, escalates, groups, and explains diagnostics;
* tracks semantic dependencies;
* detects source and environment changes;
* determines precise invalidation;
* safely reuses prior compiler state;
* schedules clean and incremental work;
* executes deterministically under parallelism;
* records reproducibility manifests;
* verifies clean-build and incremental-build equivalence;
* verifies cross-machine and cross-process equivalence;
* controls nondeterministic inputs;
* exposes performance and resource evidence without affecting meaning;
* protects caches and diagnostic output against security and privacy failures.

This specification governs the cross-cutting transformation:

```text
Declared Compiler Inputs
    ↓
Input Identity and Fingerprinting
    ↓
Phase Execution
    ↓
Structured Diagnostics and Dependency Evidence
    ↓
Invalidation and Reuse Decisions
    ↓
Deterministic Scheduling and Parallel Execution
    ↓
Output Fingerprinting and Reproducibility Verification
    ↓
Compilation Result and Reproducibility Manifest
```

It applies to every compiler phase from discovery through MSG construction and to KIR lowering where MSC-CORE-0010 adopts these contracts.


---

## 2. Context

MSC-CORE-0001 through MSC-CORE-0008 define discovery, compilation units, frontend orchestration, normalization, declaration collection, binding, reference resolution, semantic analysis, and MSG construction.

Those phases produce compiler state and diagnostics, but the compiler still requires one coherent architecture for answering:

* What is a diagnostic?
* How is the same diagnostic recognized across repeated builds?
* When does one source change invalidate another artifact?
* Which cached result is safe to reuse?
* How does a fast incremental build prove equivalence to a clean build?
* Which environment inputs affect semantics?
* How can parallel execution remain deterministic?
* How are clocks, randomness, locale, filesystem ordering, and network access controlled?
* How does an implementation explain why work was rerun or reused?
* How can a user trust that two identical declared inputs produce the same semantic output?

Without this specification, each phase could invent incompatible diagnostic formats, invalidation rules, cache keys, ordering behavior, and reproducibility assumptions.


---

## 3. Scope

This specification defines:

* diagnostic identity, structure, severity, lifecycle, provenance, rendering, grouping, suppression, waivers, and stability;
* diagnostic relationships to source regions, semantic subjects, graph elements, phases, and outputs;
* dependency graphs and invalidation;
* source, artifact, package, namespace, symbol, semantic, graph, profile, extension, and environment dependencies;
* change detection;
* content and semantic fingerprints;
* clean, incremental, resumed, and cached compilation modes;
* cache identity, validity, corruption detection, eviction, and portability;
* deterministic scheduling;
* concurrency, cancellation, interruption, and recovery;
* reproducibility manifests;
* hermetic and declared-environment compilation;
* cross-process and cross-machine reproducibility;
* output comparison;
* explanation and observability;
* security and privacy;
* conformance.

It does not fully define KIR lowering, backend execution, remote execution protocols, distributed cache protocols, persistent MKE storage, IDE transport protocols, or one mandatory hash algorithm.


---

## 4. Non-Goals

This specification does not:

* require diagnostics to be rendered only as text;
* equate a diagnostic with a semantic conflict;
* guarantee byte-identical outputs when the chosen representation explicitly permits equivalent encodings;
* require every build to be fully hermetic;
* permit undeclared environment state to affect semantic outputs;
* permit caches to establish correctness;
* treat cache hits as evidence of semantic validity;
* require invalidating the entire workspace for every change;
* require one task scheduler or concurrency library;
* allow performance optimizations to change semantic results;
* allow unstable diagnostic ordering;
* expose secrets in diagnostics, manifests, or cache keys;
* require wall-clock timestamps to participate in semantic fingerprints.


---

## 5. Core Principles

> Diagnostics are stable, structured compiler products, not incidental log messages.

> Incrementality is a correctness-preserving optimization over the clean compilation semantics.

> Reproducibility means equivalent declared inputs and compiler contracts produce semantically equivalent outputs and stable diagnostics.

> A cache may reuse proven results but may never define truth.

> Parallel execution may change timing but may not change meaning, identity, ordering, or fingerprints.


---

## 6. Architectural Position

```text
Discovery
    ↓
Frontend and Normalization
    ↓
Declaration and Binding
    ↓
Resolution
    ↓
Semantic Analysis
    ↓
MSG Construction
    ↓
KIR Lowering and Backends

Across every phase:
    diagnostics
    dependency recording
    fingerprints
    invalidation
    cache lookup and write
    deterministic scheduling
    reproducibility evidence
```

The contracts in this specification are compiler-wide and phase-independent.


---

## 7. Terminology

### 7.1 Diagnostic

A structured compiler product describing a condition requiring attention, explanation, or machine action.

### 7.2 Diagnostic Identity

A stable identity for one logical diagnostic occurrence under a declared identity policy.

### 7.3 Diagnostic Code

A stable, documented identifier for one diagnostic class.

### 7.4 Diagnostic Instance

One occurrence of a diagnostic code applied to a specific subject and context.

### 7.5 Primary Location

The most relevant source or semantic location associated with a diagnostic.

### 7.6 Related Location

An additional location necessary to understand the diagnostic.

### 7.7 Semantic Subject

The declaration, symbol, reference, type, constraint, graph element, artifact, package, or other semantic entity governed by a diagnostic.

### 7.8 Suppression

A declared policy preventing a diagnostic from being emitted or surfaced in a context.

### 7.9 Waiver

An explicit, reviewable, typically expiring authorization to tolerate a known diagnostic condition.

### 7.10 Invalidation

The determination that a prior compiler result may no longer be reused.

### 7.11 Dependency

A semantically relevant relation from one computed result to an input or another result.

### 7.12 Fingerprint

A deterministic digest over a declared set of semantically relevant inputs.

### 7.13 Cache Entry

A stored compiler result bound to complete identity and fingerprint metadata.

### 7.14 Clean Compilation

Compilation that derives results without reusing prior semantic phase results.

### 7.15 Incremental Compilation

Compilation that reuses valid prior results and recomputes invalidated results.

### 7.16 Resumed Compilation

Compilation continuing from a durable checkpoint after interruption.

### 7.17 Reproducibility

The property that equivalent declared inputs and contracts produce semantically equivalent outputs.

### 7.18 Hermetic Compilation

Compilation whose semantically relevant inputs are fully declared and isolated from undeclared environment state.

### 7.19 Reproducibility Manifest

A structured record of compiler identity, inputs, environment, rules, dependencies, outputs, and fingerprints sufficient to explain or verify a compilation.

### 7.20 Nondeterministic Input

An input such as current time, randomness, network state, filesystem iteration, process identity, or locale whose uncontrolled use may alter results.


---

## 8. Compilation Result Model

A compilation result conceptually contains:

```text
CompilationResult
├── compilation_id
├── mode
├── status
├── requested_outputs
├── produced_outputs
├── blocked_outputs
├── phase_results
├── diagnostics
├── dependency_snapshot
├── cache_report
├── reproducibility_manifest
├── performance_report
├── resource_report
├── output_fingerprints
└── integrity
```

Compilation status must distinguish success, partial, blocked, failed, cancelled, interrupted, and internal error.


---

## 9. Diagnostic Model

A diagnostic conceptually contains:

```text
Diagnostic
├── diagnostic_id
├── code
├── schema_version
├── severity
├── category
├── phase
├── message_key
├── message_arguments
├── summary
├── detail
├── primary_location
├── related_locations
├── semantic_subjects
├── graph_elements
├── evidence
├── causes
├── consequences
├── blocked_outputs
├── remediation
├── fixes
├── suppression_state
├── waiver_state
├── stability
├── provenance
└── fingerprint
```

Human-readable text is a rendering of structured diagnostic data, not the sole canonical form.


---

## 10. Diagnostic Codes

A diagnostic code must be:

* globally unique within its namespace;
* stable after publication;
* documented;
* machine-readable;
* independent from localized wording;
* associated with one semantic class of condition;
* versioned when meaning changes incompatibly.

A code must not be reused for an unrelated condition.


---

## 11. Diagnostic Identity

Diagnostic identity should be stable when the same logical condition persists across repeated builds.

Identity inputs may include:

* diagnostic code;
* semantic subject identity;
* primary source identity and stable region identity;
* relevant related subject identities;
* phase;
* profile;
* target;
* distinguishing parameters.

Diagnostic identity must not ordinarily depend on rendered wording, absolute local path, wall-clock time, thread order, or process ID.


---

## 12. Diagnostic Stability Classes

Diagnostics may declare:

```text
stable
conditionally_stable
ephemeral
aggregate
internal
```

Stable diagnostics are suitable for baselines, waivers, IDE tracking, and CI comparison.

Ephemeral diagnostics may describe transient cancellation, resource pressure, or internal tracing and must not masquerade as stable source diagnostics.


---

## 13. Severity Model

Initial severities are:

```text
fatal
error
warning
advice
information
debug
```

Severity reflects consequence under the active profile, not the emotional importance of wording.

Profiles may adjust severity only through explicit policy. A phase must not silently downgrade another phase's diagnostic.


---

## 14. Diagnostic Categories

Initial categories include:

```text
discovery
source
syntax
normalization
identity
artifact
package
namespace
binding
reference
type
constraint
authority
lifecycle
compatibility
feature
semantic
msg
kir
backend
cache
incrementality
reproducibility
security
resource
internal
```

Categories support filtering but do not replace diagnostic codes.


---

## 15. Locations and Subjects

A diagnostic may point to source text, artifact identity, declaration identity, graph element, generated output, external source, or compiler configuration.

Locations must distinguish:

* canonical source identity;
* representation identity;
* URI or repository-relative path;
* region identity;
* byte range;
* character range;
* line and column rendering;
* semantic subject.

Line and column are presentation aids and may change when unrelated text is edited. Stable diagnostic identity should prefer semantic and region identities where available.


---

## 16. Related Locations

Related locations explain duplicate declarations, conflicting claims, shadowing, import chains, type origins, evidence sources, supersession, and generated consequences.

Each related location must identify its role, such as:

```text
previous_declaration
conflicting_claim
import_origin
type_origin
constraint_origin
superseding_artifact
generated_output
evidence_source
```


---

## 17. Causes and Consequences

Diagnostics may form a causal graph.

A root diagnostic identifies the primary condition. Derived diagnostics may identify affected outputs or dependent failures.

The compiler should avoid diagnostic cascades by recording causal relationships rather than emitting many unrelated-looking errors.

Suppressing a root diagnostic must not automatically hide safety-critical consequences unless policy explicitly permits it.


---

## 18. Diagnostics and Semantic Conflicts

A diagnostic reports a compiler condition.

A semantic conflict is first-class knowledge representing incompatible claims or conclusions.

One conflict may produce diagnostics, but dismissing or suppressing those diagnostics must not remove the conflict from MSG.

A diagnostic may refer to a conflict identity.


---

## 19. Diagnostic Rendering

Renderers may produce:

* terminal text;
* JSON;
* SARIF;
* IDE protocol messages;
* HTML;
* Markdown;
* machine-event streams.

Rendering must preserve code, severity, identity, locations, subjects, fixes, and suppression or waiver state.

Localization may change wording but must not change diagnostic identity or machine semantics.


---

## 20. Diagnostic Ordering

Diagnostic ordering must be deterministic.

A canonical order may use:

1. artifact identity;
2. source identity;
3. primary region;
4. phase order;
5. severity rank;
6. diagnostic code;
7. semantic subject;
8. diagnostic identity.

Emission timing under parallel execution must not determine final presentation order.


---

## 21. Diagnostic Deduplication

Deduplication must distinguish:

* repeated emission of the same logical diagnostic;
* distinct subjects with identical wording;
* one root cause and multiple consequences;
* one diagnostic reported through several representations;
* a recurring condition across snapshots.

Rendered-message equality alone is insufficient for deduplication.


---

## 22. Diagnostic Fixes

A diagnostic fix must declare:

* fix identity;
* title;
* applicability;
* source preconditions;
* edits or semantic operation;
* safety class;
* affected artifacts;
* expected diagnostic effect;
* compatibility impact;
* provenance.

Fix classes include safe, review_required, migration, destructive, and unavailable.

A fix must not be applied when its precondition fingerprint no longer matches.


---

## 23. Suppression

Suppression must be explicit and scoped by diagnostic code, subject, source region, artifact, package, profile, or invocation.

Suppressions must preserve auditability.

Broad wildcard suppression should be prohibited in strict profiles.

Suppressing a diagnostic must not change semantic analysis or graph construction unless the suppression contract explicitly represents a waiver affecting semantics.


---

## 24. Waivers

A waiver is stronger than presentation suppression.

A waiver may affect whether a violated constraint blocks an output. It must include identity, diagnostic or constraint target, scope, rationale, authority, owner, creation date, expiration, follow-up, and provenance.

Expired waivers must not remain effective.

Waivers must not authorize identity collision, compiler corruption, fingerprint mismatch, redaction leakage, or invalid graph integrity.


---

## 25. Diagnostic Baselines

A baseline records an accepted set of stable diagnostic identities for comparison.

Baselines must include:

* compiler and schema version;
* profile;
* source snapshot;
* diagnostic identities;
* diagnostic fingerprints;
* creation authority;
* expiration or review policy.

A baseline must not convert new diagnostics into accepted conditions automatically.


---

## 26. Diagnostic Lifecycle

A diagnostic instance may transition among:

```text
new
persistent
changed
resolved
suppressed
waived
expired_waiver
regressed
```

Lifecycle comparison must use stable identity and fingerprint, not rendered text alone.


---

## 27. Diagnostic Integrity and Privacy

Diagnostics must not expose secrets, redacted source, credentials, private paths, environment tokens, or protected evidence.

Sensitive values should be replaced by redaction-safe references.

Diagnostic fingerprints exposed outside trusted contexts must not enable reconstruction of secret inputs.


---

## 28. Dependency Model

Incrementality depends on explicit semantic dependencies.

A dependency record conceptually contains:

```text
DependencyRecord
├── dependent
├── dependency
├── dependency_kind
├── phase
├── scope
├── sensitivity
├── fingerprint
├── reason
├── provenance
└── invalidation_rule
```

Dependencies must reflect meaning, not merely file access.


---

## 29. Dependency Kinds

Initial dependency kinds include:

```text
content
identity
representation
artifact_membership
package_membership
namespace
import
export
symbol
reference
type
constraint
authority
lifecycle
profile
feature
compatibility
evidence
extension
schema
compiler_rule
environment
target
backend
provenance
diagnostic_policy
```

A representation dependency may be weaker than a semantic dependency.


---

## 30. Dependency Graphs

MSC may maintain phase-specific dependency graphs and a compiler-wide dependency index.

The system must distinguish:

* source-to-artifact dependencies;
* artifact-to-declaration dependencies;
* declaration-to-symbol dependencies;
* reference dependencies;
* semantic dependencies;
* MSG element dependencies;
* output dependencies;
* diagnostic dependencies;
* cache dependencies.

The dependency graph is compiler state, not automatically MSG knowledge.


---

## 31. Change Model

A change record conceptually contains:

```text
ChangeRecord
├── changed_subject
├── change_kind
├── old_identity
├── new_identity
├── old_fingerprint
├── new_fingerprint
├── semantic_effect
├── affected_profiles
├── affected_targets
├── source
└── provenance
```

Change kinds include addition, removal, content edit, representation-only edit, identity change, move, rename, metadata change, authority change, lifecycle change, dependency change, schema change, extension change, environment change, and compiler-rule change.


---

## 32. Representation-Only Changes

A representation-only change does not alter semantic meaning under the active language and normalization contracts.

Examples may include formatting, comments without semantic role, or key ordering where maps are unordered.

Representation-only classification must be proven by the frontend and normalizer contracts. The incremental engine must not guess.


---

## 33. Semantic Changes

A semantic change affects identity, declarations, bindings, references, types, constraints, authority, lifecycle, compatibility, features, evidence, graph elements, or requested outputs.

Semantic changes invalidate every dependent result whose dependency sensitivity includes the changed semantic domain.


---

## 34. Invalidation

Invalidation determines which prior results cannot be reused.

Invalidation must be:

* sound;
* explainable;
* deterministic;
* phase-aware;
* profile-aware;
* target-aware;
* transitive where required;
* bounded where possible.

Under-invalidation is a correctness failure. Over-invalidation is a performance defect unless it changes observable semantics or resource behavior.


---

## 35. Invalidation Units

Possible units include:

* workspace;
* compilation request;
* compilation unit;
* artifact;
* fragment;
* package;
* namespace;
* declaration;
* symbol;
* reference;
* type result;
* constraint result;
* semantic fact;
* MSG element;
* graph index;
* KIR unit;
* backend output;
* diagnostic.

The implementation must choose the smallest unit it can invalidate soundly.


---

## 36. Invalidation Propagation

Propagation follows declared dependencies.

The system must prevent cycles from causing nontermination. Cyclic dependency groups may be invalidated as one strongly connected component or recomputed through a bounded fixed-point contract.

Propagation order must not affect the final invalidated set.


---

## 37. Phase Invalidation

Each phase must declare:

* consumed input domains;
* produced output domains;
* dependency recording;
* invalidation triggers;
* reusable granularity;
* cache key components;
* output fingerprint;
* equivalence checks.

A phase may not claim incremental support without declaring these contracts.


---

## 38. Discovery Invalidation

Discovery is invalidated by changes to source roots, include and exclude rules, artifact locators, manifests, package membership, symlink policy, filesystem case rules, external source registrations, and discovery extensions.

Unrelated file timestamp changes must not invalidate semantic discovery when content and membership are unchanged.


---

## 39. Frontend and Normalizer Invalidation

Frontend and normalization results are invalidated by source content, language identity, language version, frontend version, parser options, normalization profile, embedded-language boundaries, extension set, or relevant environment declarations.

Formatting-only changes may reuse later semantic phases only when the normalizer proves canonical AST equivalence.


---

## 40. Binding and Resolution Invalidation

Binding and resolution are invalidated by declaration identity, names, scopes, namespaces, imports, exports, aliases, visibility, package versions, reference syntax, resolution policy, and candidate sets.

A local body edit must not invalidate unrelated namespaces when exported semantic surfaces are unchanged.


---

## 41. Semantic Analysis Invalidation

Type and semantic analysis are invalidated by types, members, constraints, conversions, authority, lifecycle, profiles, features, compatibility matrices, evidence, extension rules, and referenced semantic facts.

Evidence expiration and withdrawal participate in invalidation.


---

## 42. MSG Invalidation

MSG elements are invalidated by every semantically relevant input identified in MSC-CORE-0008, including source bindings, semantic identity, claims, relationships, types, constraints, authority, lifecycle, evidence, conflicts, profiles, schema, canonicalization rules, and extension contracts.

Derived indexes may be rebuilt independently when graph content remains stable.


---

## 43. Invalidation Explanation

The compiler should explain why a result was invalidated.

An explanation should include changed subject, changed fingerprint domain, dependency path, invalidated result, invalidation rule, and whether the invalidation was direct or transitive.


---

## 44. Cache Model

A cache entry conceptually contains:

```text
CacheEntry
├── cache_key
├── cache_namespace
├── compiler_identity
├── compiler_version
├── phase
├── result_kind
├── input_identities
├── input_fingerprints
├── profile
├── target
├── extension_set
├── environment_fingerprint
├── output_fingerprint
├── dependency_summary
├── result
├── created_by
├── integrity
└── portability
```

A cache entry is valid only when every semantically relevant key component matches.


---

## 45. Cache Key Requirements

Cache keys must include:

* compiler and phase contract versions;
* input identities and fingerprints;
* language and schema versions;
* profile;
* feature set;
* extension set;
* target and backend where relevant;
* semantic environment;
* diagnostic policy when diagnostics are cached;
* canonicalization and fingerprint versions;
* security domain where required.

Absolute workspace paths must not participate unless path identity is semantically relevant.


---

## 46. Cache Validity

A cache hit is a candidate for reuse, not proof of correctness.

Before reuse, MSC must verify cache namespace, key, integrity, schema compatibility, output fingerprint, dependency compatibility, security domain, and portability policy.

Corrupt or unverifiable entries must be rejected and diagnosed.


---

## 47. Cache Portability

Cache entries may be:

```text
process_local
workspace_local
machine_local
platform_portable
cross_platform
remote_portable
nonportable
```

Portability must be explicit.

A cache entry containing local absolute paths, machine-specific handles, native-endian values, or undeclared environment state cannot claim broad portability.


---

## 48. Cache Writes

Cache writes must be atomic or transactionally safe.

Interrupted writes must not appear valid.

Concurrent writers must either produce equivalent content or be isolated by complete keys.

A cache write must never mutate a finalized semantic result.


---

## 49. Cache Eviction

Eviction is a storage policy and must not affect correctness.

Evicted results are recomputed.

Eviction policy may use age, size, cost, frequency, namespace, or explicit pinning, but must not alter semantic outputs.


---

## 50. Negative Caching

Failures and missing results may be cached only when their complete dependencies and expiration conditions are known.

Network failures, unavailable external sources, expired evidence, and time-sensitive conditions require bounded negative-cache validity.


---

## 51. Clean Compilation

A clean compilation computes required phase results without reusing prior semantic results.

It may reuse immutable tool assets or standard-library resources only when those assets are declared inputs and not prior results for the same compilation state.

Clean compilation is the semantic reference behavior for validating incrementality.


---

## 52. Incremental Compilation

Incremental compilation may reuse valid prior phase results and compute only invalidated results.

It must produce the same semantic outputs and stable diagnostics as clean compilation over equivalent declared inputs.

Differences in performance reports, cache reports, and operational timing are permitted.


---

## 53. Resumed Compilation

A resumed compilation continues from a durable checkpoint.

Checkpoints must include compilation identity, phase boundary, inputs, fingerprints, dependencies, profile, targets, compiler version, extension set, integrity, and cancellation state.

A checkpoint from an incompatible compiler contract must be rejected.


---

## 54. Clean and Incremental Equivalence

Equivalence comparison must distinguish:

* semantic output equivalence;
* stable diagnostic equivalence;
* graph fingerprint equality;
* representation equality;
* performance differences;
* operational metadata differences.

For canonical MSG output, clean and incremental semantic fingerprints must match.


---

## 55. Reproducibility Model

Reproducibility applies to:

* source discovery;
* canonical AST;
* declarations;
* bindings;
* resolution;
* semantic analysis;
* MSG;
* diagnostics;
* KIR;
* generated outputs where their contracts require it.

A reproducible result identifies every semantically relevant input and rule.


---

## 56. Reproducibility Levels

Initial levels are:

```text
declared_input_reproducible
workspace_reproducible
machine_reproducible
platform_reproducible
cross_platform_reproducible
hermetic
verified_reproducible
```

A compiler must not claim a stronger level than it can demonstrate.


---

## 57. Reproducibility Manifest

A manifest conceptually contains:

```text
ReproducibilityManifest
├── manifest_id
├── compiler_identity
├── compiler_version
├── phase_contract_versions
├── source_snapshot
├── artifact_set
├── package_selection
├── language_versions
├── schema_versions
├── profiles
├── features
├── extensions
├── targets
├── declared_environment
├── undeclared_input_report
├── dependency_snapshot
├── cache_usage
├── scheduling_policy
├── resource_policy
├── clock_policy
├── randomness_policy
├── network_policy
├── filesystem_policy
├── locale_policy
├── canonicalization_versions
├── fingerprint_algorithms
├── output_fingerprints
├── diagnostic_fingerprint
├── reproducibility_level
└── integrity
```


---

## 58. Declared Environment

Semantically relevant environment inputs must be explicit.

They may include target platform, architecture, operating-system contract, locale, timezone, line-ending policy, filesystem case behavior, path normalization, environment variables, external tool versions, available features, and backend configuration.

Undeclared environment access must be prohibited, recorded, or downgrade the reproducibility level.


---

## 59. Time

Current wall-clock time must not affect semantic outputs unless time is an explicit declared input.

Timestamps used for audit or logs must remain outside semantic fingerprints unless their value is part of the governed semantics.

Tests must support a deterministic clock.


---

## 60. Randomness

Randomness must not affect semantic identity, ordering, diagnostics, or output fingerprints unless an explicit seed is a declared semantic input.

Operational correlation IDs may use randomness when kept outside reproducible semantic domains.

Tests must support deterministic seeded randomness.


---

## 61. Filesystem Behavior

MSC must control or declare:

* directory iteration order;
* symlink policy;
* case sensitivity;
* Unicode normalization;
* path separators;
* absolute versus relative paths;
* timestamp use;
* permission effects;
* hidden-file policy.

Filesystem enumeration order must not affect compilation meaning.


---

## 62. Locale and Encoding

Parsing, identifier comparison, canonical ordering, case folding, numeric formatting, date handling, and diagnostics must use declared locale and encoding rules.

Canonical semantic ordering must be locale-independent unless the language contract explicitly says otherwise.


---

## 63. Network Access

Network access is prohibited in hermetic compilation unless mediated through declared, content-addressed inputs.

Nonhermetic network inputs must record URI, identity, version, integrity, retrieval policy, and cache policy.

Mutable remote content without integrity identity downgrades reproducibility.


---

## 64. External Tools

External tools must declare identity, version, invocation contract, inputs, outputs, environment, determinism, resource behavior, and failure behavior.

Tool discovery through uncontrolled `PATH` must not affect hermetic results.


---

## 65. Ordering

Source discovery, phase scheduling, graph construction, diagnostics, manifests, and serialization require deterministic canonical ordering.

Parallel completion order must not determine output order.


---

## 66. Concurrency

MSC may execute independent work concurrently.

Concurrency contracts must define task identity, dependencies, isolation, shared-state policy, cancellation, error propagation, resource limits, deterministic merge, and result ordering.

Shared mutable semantic state should be avoided.


---

## 67. Deterministic Scheduling

A deterministic scheduler need not execute tasks in one fixed physical order.

It must ensure that every permitted schedule produces equivalent semantic results and canonical output ordering.

Where operations are not commutative, an explicit logical order is required.


---

## 68. Cancellation

Cancellation must distinguish:

* user cancellation;
* superseded request;
* resource policy;
* dependency failure;
* shutdown;
* internal error.

Cancellation must not publish incomplete results as complete.

Reusable completed subresults may be cached only when their inputs and integrity are complete.


---

## 69. Interruption and Recovery

Unexpected interruption must not corrupt caches, checkpoints, manifests, or outputs.

Temporary artifacts must be isolated from finalized outputs.

Recovery must verify checkpoint and cache integrity before reuse.


---

## 70. Error Isolation

A failure in one independent compilation unit should not block unrelated units unless the requested output requires a complete workspace result.

Partial results must identify missing guarantees and blocked outputs.


---

## 71. Observability

MSC should expose structured events for phase start and completion, cache lookup, cache hit and miss, invalidation, task scheduling, resource-limit events, cancellation, diagnostics, output emission, and reproducibility verification.

Observability data must not affect semantic results.


---

## 72. Performance Evidence

Performance reports may include duration, CPU time, memory, I/O, cache statistics, invalidation counts, task counts, graph sizes, and output sizes.

Performance evidence must distinguish measurement from semantics and should identify measurement uncertainty and environment.


---

## 73. Resource Accounting

Resource accounting may govern CPU, memory, open files, graph size, recursion, solver time, cache size, output size, diagnostic count, network bytes, and external-tool execution.

Resource-limit exhaustion must produce structured partial or blocking diagnostics.


---

## 74. Security Considerations

Threats include cache poisoning, dependency omission, forged fingerprints, path confusion, symlink attacks, malicious manifests, diagnostic injection, secret leakage, nondeterministic extension behavior, remote-input substitution, race conditions, checkpoint tampering, hash collision attacks, and denial of service.

Every cache, checkpoint, imported manifest, and remote input must be integrity-checked within its trust domain.


---

## 75. Trust Domains

Caches and manifests may belong to user, workspace, organization, CI, remote service, or public trust domains.

A result from a broader or weaker trust domain must not be reused in a stronger domain without policy and verification.

Secrets must not enter shared cache keys or portable artifacts.


---

## 76. Explanation Requirements

MSC should explain:

* why a diagnostic exists;
* why its identity remained stable or changed;
* why a result was invalidated;
* which dependency path caused invalidation;
* why a cache entry was accepted or rejected;
* why a task was rerun;
* which undeclared input downgraded reproducibility;
* why clean and incremental outputs differed;
* why two machines produced different results;
* which phase or extension introduced nondeterminism.


---

## 77. Internal Compiler Errors

Internal errors must receive stable codes distinct from user-source diagnostics.

They should include phase, operation, safe context, compiler version, and correlation identity while avoiding secret or source leakage.

An internal error must not be converted into a source error merely to continue compilation.


---

## 78. Initial Compiler-Wide Diagnostic Codes

Initial codes include:

```text
MSC-DIAG-001  malformed diagnostic
MSC-DIAG-002  duplicate diagnostic identity
MSC-DIAG-003  unstable diagnostic identity
MSC-DIAG-004  invalid suppression
MSC-DIAG-005  expired waiver
MSC-DIAG-006  unsafe fix precondition
MSC-INCR-001  incomplete dependency record
MSC-INCR-002  invalidation inconsistency
MSC-INCR-003  stale result reused
MSC-INCR-004  clean and incremental mismatch
MSC-CACHE-001 cache key incomplete
MSC-CACHE-002 cache integrity failure
MSC-CACHE-003 incompatible cache entry
MSC-CACHE-004 corrupt cache write
MSC-REPRO-001 undeclared semantic input
MSC-REPRO-002 nondeterministic output
MSC-REPRO-003 manifest incomplete
MSC-REPRO-004 cross-process mismatch
MSC-REPRO-005 cross-machine mismatch
MSC-REPRO-006 uncontrolled clock access
MSC-REPRO-007 uncontrolled randomness
MSC-REPRO-008 uncontrolled network input
MSC-REPRO-009 unstable filesystem ordering
MSC-REPRO-010 locale-dependent semantic ordering
MSC-CONCUR-001 nondeterministic merge
MSC-CONCUR-002 unsafe shared mutation
MSC-RESOURCE-001 compiler resource limit
MSC-INTERNAL-001 internal compiler invariant failure
```


---

## 79. Normative Requirements

### MSC-DIR-REQ-001

MSC MUST represent diagnostics as structured compiler products rather than unstructured log text.

### MSC-DIR-REQ-002

Every published diagnostic class MUST have a stable, unique diagnostic code.

### MSC-DIR-REQ-003

A diagnostic code MUST NOT be reused for an unrelated condition.

### MSC-DIR-REQ-004

Diagnostic identity MUST remain independent from localized wording and ordinary rendering changes.

### MSC-DIR-REQ-005

Stable diagnostic identity MUST use semantic subject and stable source-region identity where available.

### MSC-DIR-REQ-006

Diagnostic identity MUST NOT ordinarily depend on wall-clock time, process ID, thread order, or absolute local paths.

### MSC-DIR-REQ-007

Every diagnostic MUST declare severity, category, phase, code, and provenance.

### MSC-DIR-REQ-008

Every source diagnostic MUST identify a primary source or semantic subject.

### MSC-DIR-REQ-009

Related locations MUST identify their semantic role.

### MSC-DIR-REQ-010

Diagnostics and semantic conflicts MUST remain distinct.

### MSC-DIR-REQ-011

Suppressing a diagnostic MUST NOT remove an underlying semantic conflict.

### MSC-DIR-REQ-012

Diagnostic ordering MUST be deterministic and independent from parallel emission timing.

### MSC-DIR-REQ-013

Diagnostic deduplication MUST use identity and semantic context rather than rendered-message equality alone.

### MSC-DIR-REQ-014

Diagnostic fixes MUST declare applicability, safety class, precondition fingerprint, and affected artifacts.

### MSC-DIR-REQ-015

A diagnostic fix MUST NOT be applied when its precondition fingerprint no longer matches.

### MSC-DIR-REQ-016

Suppressions MUST be explicit, scoped, and auditable.

### MSC-DIR-REQ-017

Strict profiles MUST prohibit broad wildcard suppression unless separately authorized.

### MSC-DIR-REQ-018

Waivers MUST declare identity, scope, rationale, authority, owner, creation, expiration, and provenance.

### MSC-DIR-REQ-019

Expired waivers MUST NOT remain effective.

### MSC-DIR-REQ-020

Waivers MUST NOT authorize identity collision, fingerprint mismatch, graph corruption, or redaction leakage.

### MSC-DIR-REQ-021

Diagnostic baselines MUST record compiler, schema, profile, source snapshot, and stable diagnostic identities.

### MSC-DIR-REQ-022

Baselines MUST NOT automatically accept new diagnostics.

### MSC-DIR-REQ-023

Diagnostic lifecycle comparison MUST use stable identity and fingerprint.

### MSC-DIR-REQ-024

Diagnostics MUST NOT expose secrets, redacted content, credentials, or protected environment values.

### MSC-DIR-REQ-025

Diagnostic rendering MUST preserve machine semantics across terminal, JSON, SARIF, IDE, HTML, and Markdown forms.

### MSC-DIR-REQ-026

Localization MUST NOT change diagnostic identity or code semantics.

### MSC-DIR-REQ-027

MSC MUST record semantically relevant dependencies for every incrementally reusable result.

### MSC-DIR-REQ-028

Dependency records MUST identify dependent, dependency, kind, phase, fingerprint, reason, and invalidation rule.

### MSC-DIR-REQ-029

Dependency graphs MUST distinguish representation, identity, artifact, package, namespace, symbol, reference, semantic, environment, and output dependencies.

### MSC-DIR-REQ-030

Change detection MUST distinguish representation-only changes from semantic changes.

### MSC-DIR-REQ-031

Representation-only classification MUST be established by language and normalization contracts rather than guessed by the incremental engine.

### MSC-DIR-REQ-032

Invalidation MUST be sound, deterministic, explainable, phase-aware, profile-aware, and target-aware.

### MSC-DIR-REQ-033

Under-invalidation MUST be treated as a correctness failure.

### MSC-DIR-REQ-034

Over-invalidation MUST be treated as a performance defect when semantics remain correct.

### MSC-DIR-REQ-035

Every incremental phase MUST declare inputs, outputs, dependencies, invalidation triggers, reuse granularity, cache key components, and output fingerprint.

### MSC-DIR-REQ-036

Invalidation propagation MUST be independent from traversal order.

### MSC-DIR-REQ-037

Cyclic dependency groups MUST use an explicit strongly connected component or fixed-point policy.

### MSC-DIR-REQ-038

Discovery invalidation MUST account for source roots, membership, manifests, symlink policy, and discovery extensions.

### MSC-DIR-REQ-039

Frontend and normalization invalidation MUST account for source content, language, frontend, normalization, embedded boundaries, and extensions.

### MSC-DIR-REQ-040

Binding and resolution invalidation MUST account for declarations, scopes, namespaces, imports, exports, aliases, visibility, versions, and candidate sets.

### MSC-DIR-REQ-041

Semantic-analysis invalidation MUST account for types, constraints, conversions, authority, lifecycle, profiles, features, compatibility, evidence, and extensions.

### MSC-DIR-REQ-042

MSG invalidation MUST account for every semantically relevant construction input defined by MSC-CORE-0008.

### MSC-DIR-REQ-043

Evidence expiration, withdrawal, and invalidation MUST participate in incremental invalidation.

### MSC-DIR-REQ-044

MSC SHOULD explain the dependency path responsible for invalidation.

### MSC-DIR-REQ-045

Every cache entry MUST be bound to complete compiler, phase, input, profile, target, extension, environment, and fingerprint metadata.

### MSC-DIR-REQ-046

A cache hit MUST be treated as a reuse candidate rather than proof of correctness.

### MSC-DIR-REQ-047

MSC MUST verify cache identity, integrity, compatibility, dependency state, security domain, and portability before reuse.

### MSC-DIR-REQ-048

Corrupt or unverifiable cache entries MUST be rejected.

### MSC-DIR-REQ-049

Cache portability MUST be declared explicitly.

### MSC-DIR-REQ-050

A cache entry containing undeclared machine-specific state MUST NOT claim cross-machine portability.

### MSC-DIR-REQ-051

Cache writes MUST be atomic or transactionally safe.

### MSC-DIR-REQ-052

Interrupted cache writes MUST NOT appear valid.

### MSC-DIR-REQ-053

Concurrent writers MUST be isolated by complete keys or produce equivalent content.

### MSC-DIR-REQ-054

Cache eviction MUST NOT affect correctness.

### MSC-DIR-REQ-055

Negative caching MUST declare complete dependencies and expiration conditions.

### MSC-DIR-REQ-056

Clean compilation MUST compute semantic results without reusing prior semantic phase results.

### MSC-DIR-REQ-057

Incremental compilation MUST preserve clean compilation semantics.

### MSC-DIR-REQ-058

Clean and incremental compilation over equivalent inputs MUST produce equivalent semantic outputs.

### MSC-DIR-REQ-059

Clean and incremental canonical MSG outputs MUST have equal semantic fingerprints.

### MSC-DIR-REQ-060

Stable diagnostics from clean and incremental builds MUST be equivalent under the same profile.

### MSC-DIR-REQ-061

Operational timing and cache reports MAY differ between clean and incremental builds.

### MSC-DIR-REQ-062

Resumed compilation checkpoints MUST record identity, phase boundary, inputs, fingerprints, profile, targets, compiler version, extensions, and integrity.

### MSC-DIR-REQ-063

Incompatible or unverifiable checkpoints MUST be rejected.

### MSC-DIR-REQ-064

Every reproducible compilation MUST identify all semantically relevant inputs and rule versions.

### MSC-DIR-REQ-065

Reproducibility claims MUST declare their supported reproducibility level.

### MSC-DIR-REQ-066

A compiler MUST NOT claim a stronger reproducibility level than it can demonstrate.

### MSC-DIR-REQ-067

Every reproducibility manifest MUST identify compiler, phase contracts, sources, packages, languages, schemas, profiles, features, extensions, targets, environment, policies, dependencies, and outputs.

### MSC-DIR-REQ-068

Semantically relevant environment inputs MUST be explicit.

### MSC-DIR-REQ-069

Undeclared semantic environment access MUST be prohibited, diagnosed, or downgrade reproducibility.

### MSC-DIR-REQ-070

Wall-clock time MUST NOT affect semantic outputs unless declared as a semantic input.

### MSC-DIR-REQ-071

Audit timestamps MUST remain outside semantic fingerprints unless semantically relevant.

### MSC-DIR-REQ-072

Randomness MUST NOT affect semantic identity, ordering, diagnostics, or fingerprints unless an explicit seed is a declared semantic input.

### MSC-DIR-REQ-073

Filesystem enumeration order MUST NOT affect compilation meaning.

### MSC-DIR-REQ-074

Filesystem case behavior, Unicode normalization, path normalization, and symlink policy MUST be declared or controlled.

### MSC-DIR-REQ-075

Canonical semantic ordering MUST be locale-independent unless a language contract explicitly requires locale semantics.

### MSC-DIR-REQ-076

Network access in hermetic compilation MUST use declared, integrity-identified inputs.

### MSC-DIR-REQ-077

Mutable remote content without integrity identity MUST downgrade reproducibility or block strict profiles.

### MSC-DIR-REQ-078

External tools MUST declare identity, version, invocation contract, inputs, environment, determinism, and failure behavior.

### MSC-DIR-REQ-079

Uncontrolled PATH discovery MUST NOT affect hermetic results.

### MSC-DIR-REQ-080

Parallel completion order MUST NOT determine output or diagnostic order.

### MSC-DIR-REQ-081

Concurrent execution MUST preserve semantic equivalence across all permitted schedules.

### MSC-DIR-REQ-082

Noncommutative operations MUST declare explicit logical ordering.

### MSC-DIR-REQ-083

Cancellation MUST NOT publish incomplete results as complete.

### MSC-DIR-REQ-084

Completed subresults from a cancelled build MAY be cached only when their inputs and integrity are complete.

### MSC-DIR-REQ-085

Unexpected interruption MUST NOT corrupt caches, checkpoints, manifests, or finalized outputs.

### MSC-DIR-REQ-086

Partial results MUST identify missing guarantees and blocked outputs.

### MSC-DIR-REQ-087

Observability and performance evidence MUST NOT affect semantic results.

### MSC-DIR-REQ-088

Resource-limit exhaustion MUST produce structured partial or blocking diagnostics.

### MSC-DIR-REQ-089

All caches, checkpoints, manifests, remote inputs, and extensions MUST be validated within their trust domain.

### MSC-DIR-REQ-090

Results from a weaker trust domain MUST NOT be reused in a stronger domain without verification and policy.

### MSC-DIR-REQ-091

Secrets MUST NOT enter shared cache keys or portable manifests.

### MSC-DIR-REQ-092

Internal compiler errors MUST remain distinct from user-source diagnostics.

### MSC-DIR-REQ-093

An internal compiler error MUST NOT be relabeled as a source error.

### MSC-DIR-REQ-094

MSC MUST provide a verification mode comparing clean and incremental semantic outputs.

### MSC-DIR-REQ-095

MSC MUST provide a way to compare reproducibility manifests and identify differing input domains.

### MSC-DIR-REQ-096

A conforming implementation MUST demonstrate repeated-build determinism.

### MSC-DIR-REQ-097

A conforming implementation MUST demonstrate parallel-schedule determinism.

### MSC-DIR-REQ-098

A conforming implementation MUST demonstrate clean and incremental equivalence.

### MSC-DIR-REQ-099

A conforming implementation MUST demonstrate cache corruption rejection.

### MSC-DIR-REQ-100

A conforming implementation MUST demonstrate undeclared-input detection or reproducibility downgrade.


---

## 80. Machine Specification

```yaml
machine_spec:
  id: MSC-CORE-0009
  version: 0.1.0
  status: bootstrap

  diagnostics:
    structured: true
    stable_codes: true
    stable_identity: true
    deterministic_ordering: true
    formats:
      - terminal
      - json
      - sarif
      - ide
      - markdown

  compilation_modes:
    - clean
    - incremental
    - resumed

  dependency_domains:
    - source
    - representation
    - identity
    - artifact
    - package
    - namespace
    - symbol
    - reference
    - type
    - constraint
    - authority
    - lifecycle
    - profile
    - feature
    - compatibility
    - evidence
    - extension
    - environment
    - msg
    - target
    - backend

  reproducibility_levels:
    - declared_input_reproducible
    - workspace_reproducible
    - machine_reproducible
    - platform_reproducible
    - cross_platform_reproducible
    - hermetic
    - verified_reproducible

  required_verification:
    - repeated_clean_build
    - clean_incremental_equivalence
    - parallel_schedule_equivalence
    - cache_integrity
    - manifest_comparison
```

---

## 81. Compiler-Wide Invariants

```yaml
invariants:
  - id: MSC-DIR-INV-001
    statement: The same logical diagnostic has stable identity under equivalent semantic context.
  - id: MSC-DIR-INV-002
    statement: Diagnostic ordering is independent from execution timing.
  - id: MSC-DIR-INV-003
    statement: Every reused result has a complete and valid dependency proof.
  - id: MSC-DIR-INV-004
    statement: No stale result is reused after a semantically relevant dependency changes.
  - id: MSC-DIR-INV-005
    statement: Cache absence or eviction never changes semantic correctness.
  - id: MSC-DIR-INV-006
    statement: Clean and incremental compilation produce equivalent semantic outputs.
  - id: MSC-DIR-INV-007
    statement: Parallel scheduling does not change meaning, stable diagnostics, ordering, or fingerprints.
  - id: MSC-DIR-INV-008
    statement: Undeclared environment state cannot silently alter strict-profile semantic output.
  - id: MSC-DIR-INV-009
    statement: A finalized result has a complete reproducibility manifest for its claimed level.
  - id: MSC-DIR-INV-010
    statement: Corrupt caches, checkpoints, manifests, and remote inputs are never accepted as valid.
  - id: MSC-DIR-INV-011
    statement: Cancellation and interruption never publish incomplete output as complete.
  - id: MSC-DIR-INV-012
    statement: Secrets and redacted values do not leak through diagnostics, cache keys, or manifests.
```

---

## 82. Diagnostic Example

```yaml
diagnostic:
  diagnostic_id: diag:MSC-REF-001:service.billing:capability.ledger
  code: MSC-REF-001
  severity: error
  category: reference
  phase: reference_resolution
  message_key: reference.target.not_found
  message_arguments:
    target: capability.ledger
  primary_location:
    source: artifact:billing-service
    region: region:requires-ledger
  semantic_subjects:
    - service.billing
  blocked_outputs:
    - authoritative_msg
    - kir
  remediation:
    - declare the missing capability
    - correct the reference
    - mark the target as planned under a partial profile
```

A terminal renderer may format this differently without changing its identity or semantics.

---

## 83. Invalidation Example

```text
Change:
  package payments exports a new declaration

Direct invalidation:
  payments export surface

Transitive invalidation:
  import resolution for packages importing payments
  reference candidate sets depending on that export surface
  affected type and constraint results
  affected MSG elements

Not invalidated:
  unrelated packages with no dependency path to payments
```

The compiler must be able to explain this path.

---

## 84. Cache-Key Example

```yaml
cache_key:
  phase: semantic_analysis
  compiler_contract: msc-semantic-v1
  inputs:
    declaration_snapshot: sha256:...
    reference_snapshot: sha256:...
    profile: strict
    language_versions:
      msl-markdown: bootstrap
    extensions:
      - id: ext.example
        version: 1.2.0
    environment: sha256:...
```

A key omitting profile, extensions, or environment is invalid when those inputs affect meaning.

---

## 85. Reproducibility Example

Two builds may differ in:

```text
wall-clock duration
cache-hit count
thread scheduling
temporary directory
operational correlation ID
```

while remaining reproducible if they produce equivalent:

```text
discovered artifact set
canonical AST fingerprints
declaration and resolution snapshots
semantic analysis fingerprints
MSG semantic fingerprint
stable diagnostic set
KIR fingerprint where requested
```

---

## 86. Invalid Examples

The following are nonconforming:

```text
diagnostic identity is a random UUID;
diagnostics are sorted by thread completion time;
a cache key omits the active profile;
a stale result is reused because the source file timestamp did not change;
a clean build and incremental build produce different MSG fingerprints;
filesystem directory order changes declaration precedence;
current time changes generated semantic identity;
network content is fetched without integrity identity in a hermetic build;
an expired waiver still suppresses a blocking error;
a cancelled build publishes a partially written graph as complete;
an internal compiler panic is reported as a user syntax error.
```

---

## 87. Minimum Bootstrap Conformance

The bootstrap compiler is conforming at minimum when it can:

* emit structured diagnostics with stable codes and deterministic ordering;
* render diagnostics as terminal text and JSON;
* record source and semantic subjects;
* build a dependency graph at artifact and declaration granularity;
* compute source, phase-input, phase-output, and MSG fingerprints;
* invalidate changed artifacts and dependent declarations;
* reuse valid frontend, normalization, binding, analysis, and MSG results;
* reject corrupt cache entries;
* run clean and incremental compilation;
* compare clean and incremental MSG fingerprints;
* record compiler, source, profile, extension, environment, dependency, cache, and output data in a reproducibility manifest;
* control filesystem ordering, locale, clock, and randomness;
* execute independent work concurrently without changing canonical outputs;
* explain cache reuse and invalidation;
* preserve partial results safely after cancellation.

---

## 88. Test Matrix

| Domain | Required demonstration |
|---|---|
| diagnostic code | Codes are unique and stable |
| diagnostic identity | Equivalent conditions retain identity across edits and builds |
| rendering | Text and JSON preserve equivalent machine semantics |
| ordering | Parallel timing does not change final diagnostic order |
| deduplication | Distinct subjects are not merged by equal wording |
| suppression | Scope is explicit and auditable |
| waiver | Expiration and authority are enforced |
| privacy | Secrets and redacted content do not appear |
| dependencies | Every reused result traces to complete dependencies |
| representation edit | Formatting-only change avoids unnecessary semantic invalidation when proven |
| semantic edit | Dependents are invalidated transitively |
| cache integrity | Corrupt entries are rejected |
| cache portability | Machine-specific entries are not reused cross-machine |
| clean build | Produces canonical outputs without prior semantic results |
| incremental build | Matches clean semantic output |
| resumed build | Invalid checkpoints are rejected |
| clock | Frozen and real clocks produce same semantic result unless time is declared |
| randomness | Scheduling and random correlation IDs do not affect semantics |
| filesystem | Enumeration permutations produce equal outputs |
| locale | Locale changes do not affect canonical ordering |
| network | Undeclared remote input blocks or downgrades reproducibility |
| concurrency | Different legal schedules produce equal fingerprints |
| cancellation | Incomplete output is never finalized |
| manifests | Input-domain differences are explainable |
| cross-process | Repeated processes produce equivalent outputs |
| cross-machine | Claimed portability level is verified |
| security | Poisoned cache and forged manifest are rejected |

---

## 89. Acceptance Criteria

MSC-CORE-0009 is accepted when:

- [ ] Diagnostic code, identity, structure, severity, location, subject, ordering, rendering, deduplication, fixes, suppression, waivers, baselines, lifecycle, privacy, and integrity are defined.
- [ ] Diagnostics are clearly distinguished from semantic conflicts.
- [ ] Dependency, change, and invalidation models are defined.
- [ ] Every prior compiler phase has an invalidation contract.
- [ ] Cache identity, validity, portability, writes, eviction, and negative caching are defined.
- [ ] Clean, incremental, and resumed compilation are distinguished.
- [ ] Clean and incremental semantic equivalence is normative.
- [ ] Reproducibility levels and manifests are defined.
- [ ] Environment, time, randomness, filesystem, locale, network, and external tools are governed.
- [ ] Concurrency, deterministic scheduling, cancellation, interruption, and recovery are defined.
- [ ] Observability, performance evidence, resource accounting, security, and trust domains are defined.
- [ ] Bootstrap conformance is implementable.
- [ ] MSC-CORE-0010 can adopt the same diagnostic, invalidation, cache, and reproducibility contracts for KIR and backends.

---

## 90. Evolution and Compatibility

Future versions may refine diagnostic schemas, stable-region identity, cache protocols, dependency granularity, manifests, reproducibility levels, remote execution, and distributed caching.

Evolution must preserve:

* diagnostic-code meaning;
* baseline interpretability;
* cache namespace safety;
* manifest versioning;
* clean-build reference semantics;
* explicit migration;
* provenance;
* integrity.

An incompatible diagnostic meaning requires a new code or schema migration.

---

## 91. Open Questions

1. Which stable source-region identity algorithm is selected for bootstrap?
2. Which canonical diagnostic interchange format is primary?
3. Which hash algorithm is selected for bootstrap fingerprints?
4. Which cache layers are enabled in the first implementation?
5. Which results are portable across operating systems?
6. How are remote caches authenticated and authorized?
7. Which dependency granularity is required before the first editor integration?
8. Which performance regressions become release blockers?
9. Which reproducibility level is required for official releases?
10. Which external tools are permitted in hermetic bootstrap builds?
11. How are diagnostic baselines governed by work packets and releases?
12. How are reproducibility manifests persisted in MKE after self-hosting?

These questions do not block the architecture defined here.

---

## 92. Implementation Threshold Contribution

MSC-CORE-0009 establishes this threshold requirement:

```text
The bootstrap compiler must emit stable structured diagnostics, record complete
semantic dependencies, perform sound incremental invalidation, safely reuse
fingerprinted results, and prove clean/incremental equivalence through deterministic
MSG fingerprints and a reproducibility manifest.
```

An implementation that is fast but cannot explain or verify reuse is not conforming.

---

## 93. Relationship to MSC-CORE-0010

MSC-CORE-0010 must apply these contracts to:

* KIR-lowering diagnostics;
* target and backend dependency tracking;
* KIR and generated-output cache keys;
* backend invalidation;
* generated-artifact fingerprints;
* external-tool manifests;
* backend reproducibility;
* self-hosting equivalence.

MSC-CORE-0010 must not introduce a separate incompatible diagnostic or reproducibility system.

---

## 94. Final Statement

Diagnostics, incrementality, and reproducibility are one correctness system.

Diagnostics explain the compiler's conclusions. Dependencies explain what those conclusions depend on. Invalidation prevents stale conclusions from surviving change. Caches reuse conclusions only when their complete basis still holds. Reproducibility proves that execution strategy, scheduling, machine state, and optimization have not changed meaning.

A conforming Monad Specification Compiler is not merely deterministic when convenient.

It can identify its inputs, explain its work, verify its reuse, reject corruption, and demonstrate that clean, incremental, resumed, cached, and parallel execution preserve the same semantic contract.

---

<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Reconciliation Amendment

### Diagnostic Code Compatibility

The canonical diagnostic-code grammar is:

```text
MSC-<DOMAIN>-<CLASS>-<NNN>
```

A previously published compact code such as `MSC0101` remains a stable legacy alias. An alias maps to one canonical diagnostic identity; it is not silently renumbered, reused, or assigned new meaning. Diagnostic registries must reject duplicate canonical codes, duplicate aliases, and aliases that map to several canonical identities.

Diagnostic identity remains independent from localized text, renderer, absolute path, process identity, scheduling, and wall-clock time.

### Manifest Hierarchy

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

A child may be embedded or content-addressed. Every child identifies its parent compilation, schema version, fingerprint, provenance, and lifecycle. The compilation manifest coordinates these records but does not become semantic authority.

### Reconciled Invalidation Boundary

MSG invalidation depends on the complete `SemanticGraphConstructionInput`, including every referenced snapshot, construction profile, schema version, extension set, and fingerprint. A change to any semantically relevant member invalidates affected MSG elements and their derived KIR and backend results.

### Additional Requirements

* Legacy diagnostic aliases **MUST** remain baseline- and suppression-compatible.
* A change in diagnostic wording alone **MUST NOT** create a new diagnostic identity.
* A semantic change in diagnostic meaning **MUST** use a new canonical code or explicit versioned migration.
* Manifest nesting **MUST NOT** obscure phase ownership or provenance.
* Clean and incremental execution **MUST** produce equivalent stable diagnostics after the reconciled phase-boundary amendments.

<!-- WP-MSC-0007:END -->

## Status

Draft.

---
artifact:
  id: MSC-CORE-0010
  type: knowledge.specification
  namespace: monad

metadata:
  title: KIR Lowering, Backend Contracts, and Self-Hosting
  version: 0.1.0
  status: draft
  created: 2026-08-06
  authors:
    - Monad Architecture Team
  tags:
    - msc
    - kir
    - lowering
    - backend
    - generation
    - provenance
    - reproducibility
    - capability-negotiation
    - self-hosting
    - bootstrap
    - generated-artifacts
    - security

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
    - MSC-CORE-0009
  references:
    - MART-CORE
    - MSG-CORE
    - MGO-CORE
    - MKE-CORE
    - KIR-CORE
    - MPE-CORE
    - MAE-CORE
  enables:
    - KIR-CORE
    - KIR-BACKEND
    - KIR-GENERATION
    - MKE-CORE
    - MPE-CORE
    - MAE-CORE
    - MSC-BOOTSTRAP
    - MONAD-SELF-HOSTING

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: machine
  source_role: primary
  status: bootstrap
---

# MSC-CORE-0010 — KIR Lowering, Backend Contracts, and Self-Hosting


---

## 1. Purpose

This specification defines how the Monad Specification Compiler lowers eligible portions of the Monad Semantic Graph into KIR, invokes governed backends, emits generated artifacts, preserves complete provenance, and progresses from bootstrap implementation toward initial self-hosting.

It establishes:

* the boundary between MSG and KIR;
* KIR eligibility and graph selection;
* lowering requests, profiles, targets, and contexts;
* target-independent KIR structure;
* lowering phases and invariants;
* target and backend capability negotiation;
* backend identity, manifests, lifecycle, trust, and execution;
* generated-artifact identity, ownership, provenance, integrity, and lifecycle;
* plan, preview, apply, verify, rollback, and regeneration behavior;
* manual-edit and overlay boundaries;
* deterministic emission, cache reuse, invalidation, and reproducibility;
* external-tool and sandbox contracts;
* backend diagnostics and conformance;
* bootstrap implementation stages;
* compiler trust bootstrap;
* self-hosting inputs, outputs, equivalence, promotion, and rollback;
* the compiler implementation threshold completed by the MSC-CORE series.

The governed transformation is:

```text
Immutable MSG Snapshot
    ↓
Lowering Request and Target Selection
    ↓
KIR-Eligibility Validation
    ↓
MSG Subgraph Selection and Closure
    ↓
Target-Independent KIR Construction
    ↓
KIR Validation and Fingerprinting
    ↓
Backend Capability Negotiation
    ↓
Backend Planning
    ↓
Generated-Artifact Plan
    ↓
Preview, Apply, or Verify
    ↓
Generated Artifacts with Provenance
```

For self-hosting:

```text
Monad Specifications
    ↓
Bootstrap MSC
    ↓
MSG
    ↓
KIR
    ↓
Compiler Backend
    ↓
Candidate MSC
    ↓
Equivalence and Conformance Verification
    ↓
Governed Promotion
```


---

## 2. Context

MSC-CORE-0008 defines immutable MSG construction. MSC-CORE-0009 defines stable diagnostics, dependency tracking, sound invalidation, safe caching, and reproducibility.

Those specifications establish what the compiler knows and how it preserves correctness across execution modes. They do not yet define how semantic knowledge becomes an operational intermediate representation suitable for backend execution.

MSG may contain:

* historical knowledge;
* unresolved and ambiguous references;
* competing claims;
* provisional authority;
* draft lifecycle states;
* publication-only relationships;
* non-executable constraints;
* alternative designs;
* external semantic subjects;
* explanatory evidence.

A backend cannot safely interpret all MSG content as an instruction to generate, mutate, execute, deploy, or persist.

KIR lowering is the governed boundary that selects an eligible semantic subgraph and transforms it into a target-independent operational contract.

Backends consume KIR. They do not reinterpret arbitrary MSG independently.


---

## 3. Scope

This specification defines:

* lowering requests and profiles;
* target identity and target context;
* MSG graph selection and closure;
* eligibility, readiness, and blocking;
* KIR modules, units, declarations, operations, values, resources, constraints, dependencies, effects, validations, and provenance;
* lowering passes;
* capability negotiation;
* backend contracts;
* generated-artifact plans;
* filesystem and repository mutation;
* plan/apply/verify behavior;
* ownership, overlays, manual edits, conflicts, regeneration, and rollback;
* external tools;
* sandboxing;
* diagnostics;
* caching, invalidation, and reproducibility;
* self-hosting stages and promotion;
* minimum bootstrap conformance.

This specification does not fully define:

* the complete KIR ontology or serialization;
* every programming-language backend;
* package-manager behavior;
* deployment providers;
* MKE persistence schemas;
* publication rendering;
* AI model execution;
* one permanent plugin ABI;
* remote-execution protocol details;
* organizational release governance;
* source-control hosting policy.


---

## 4. Non-Goals

This specification does not:

* redefine MSG as executable IR;
* permit backends to establish canonical semantic meaning;
* permit code generation directly from raw source while bypassing MSG and KIR;
* require every MSG node to lower;
* require one backend language;
* require generated files to become canonical sources;
* treat successful generation as semantic validation;
* permit a backend to elevate authority;
* permit manual edits to generated files to silently alter source knowledge;
* require immediate full self-hosting;
* allow a newly generated compiler to promote itself automatically;
* require byte-identical output across backends with different declared representations;
* permit backend order, filesystem order, or concurrency timing to alter results.


---

## 5. Core Principles

> MSG is canonical semantic knowledge; KIR is a derived operational projection.

> Lowering selects only semantics that satisfy an explicit target profile.

> Backends implement declared capabilities; they do not invent source semantics.

> Every generated artifact remains traceable to source artifacts, MSG elements, KIR elements, lowering rules, backend identity, and toolchain versions.

> Generated outputs are replaceable projections unless explicitly re-adopted through the knowledge lifecycle.

> Self-hosting is a governed equivalence process, not a compiler generating itself and declaring success.


---

## 6. Architectural Position

```text
Canonical Sources
    ↓
MSC Frontends and Normalizers
    ↓
Canonical AST
    ↓
Binding and Semantic Analysis
    ↓
Immutable MSG
    ↓
KIR Lowering
    ↓
Validated Target-Independent KIR
    ↓
Backend Planning and Capability Negotiation
    ↓
Backend-Specific Generation
    ↓
Generated Artifacts
    ↓
Verification Evidence
```

KIR lowering belongs to MSC.

Backend implementation may be packaged separately, but its invocation and conformance remain governed by this contract.


---

## 7. Terminology

### 7.1 KIR

A target-independent operational intermediate representation derived from an eligible MSG subgraph.

### 7.2 Lowering

The deterministic transformation from selected MSG semantics into KIR.

### 7.3 Lowering Request

A declaration of desired output, target, profile, roots, options, and operational mode.

### 7.4 Lowering Profile

A named, versioned policy defining MSG eligibility, KIR requirements, permitted effects, strictness, and output guarantees.

### 7.5 Target

The declared destination domain for generated or validated output, such as a language, framework, platform, schema, publication format, or compiler stage.

### 7.6 Backend

A governed implementation that consumes validated KIR and produces a plan, generated artifacts, validation results, or another declared output.

### 7.7 Backend Manifest

A machine-readable declaration of backend identity, version, capabilities, inputs, outputs, constraints, determinism, trust, and execution requirements.

### 7.8 Generated Artifact

An artifact produced by a backend from KIR.

### 7.9 Generated-Artifact Plan

A deterministic proposal describing files, operations, content identities, ownership, conflicts, and verification steps before mutation.

### 7.10 Effect

A declared operation that may observe or change external state.

### 7.11 Overlay

A human-maintained or separately governed layer intentionally composed with generated output.

### 7.12 Regeneration

Recomputing generated artifacts from canonical sources, MSG, KIR, and backend contracts.

### 7.13 Self-Hosting

The governed use of Monad's compiler pipeline to produce, validate, or evolve implementation artifacts of Monad itself.

### 7.14 Bootstrap Compiler

The independently implemented compiler used to establish the first trusted self-hosting cycle.

### 7.15 Candidate Compiler

A compiler produced through the Monad pipeline that has not yet been promoted as trusted.

### 7.16 Promotion

The governed act of accepting a verified candidate compiler as an authorized compiler implementation.


---

## 8. Lowering Inputs

KIR lowering consumes:

```text
LoweringInput
├── msg_snapshot
├── lowering_request
├── lowering_profile
├── target_manifest
├── backend_requirements
├── active_features
├── active_extensions
├── environment_declaration
├── prior_kir_cache
├── prior_generation_manifest
├── policy_context
└── reproducibility_context
```

The MSG snapshot must be immutable and fingerprint-verified.

Every semantically relevant input must participate in the lowering fingerprint.


---

## 9. Lowering Request Model

A lowering request conceptually contains:

```text
LoweringRequest
├── request_id
├── graph_id
├── root_subjects
├── requested_outputs
├── target_id
├── target_version
├── backend_id
├── backend_version
├── lowering_profile
├── feature_set
├── extension_set
├── operation_mode
├── destination
├── policy_context
├── security_context
├── environment
├── resource_policy
├── conflict_policy
├── overwrite_policy
├── verification_policy
└── provenance
```

Operation modes include plan, preview, apply, verify, diff, and clean.


---

## 10. Target Model

A target identifies the semantic and operational domain for lowering.

A target manifest conceptually contains:

```text
TargetManifest
├── target_id
├── target_kind
├── version
├── compatibility_range
├── required_kir_features
├── optional_kir_features
├── prohibited_features
├── type_mapping_requirements
├── effect_policy
├── artifact_kinds
├── path_policy
├── naming_policy
├── formatting_policy
├── verification_requirements
├── backend_requirements
└── provenance
```

Target identity remains distinct from backend identity. Several backends may implement one target.


---

## 11. Lowering Profile

A lowering profile defines:

* eligible MSG readiness states;
* authority threshold;
* lifecycle threshold;
* conflict tolerance;
* unknown and deferred tolerance;
* required constraints;
* permitted waivers;
* required evidence;
* selected root closure;
* KIR feature set;
* effect permissions;
* output guarantees;
* validation strictness;
* reproducibility level;
* security requirements.

Profiles must be named, versioned, fingerprinted, and inspectable.


---

## 12. KIR Eligibility

An MSG element is KIR-eligible only when the active profile and target permit it.

Eligibility may depend on:

* semantic identity;
* declaration binding;
* reference resolution;
* effective type;
* constraint result;
* authority;
* lifecycle;
* compatibility;
* feature support;
* conflict state;
* evidence;
* provenance;
* target capability;
* backend capability.

Eligibility is target-specific.

An element may be eligible for documentation projection while ineligible for code generation.


---

## 13. Blocking Conditions

Initial lowering-blocking conditions include:

```text
missing_required_identity
unresolved_required_reference
ambiguous_required_reference
invalid_effective_type
violated_blocking_constraint
missing_required_authority
ineligible_lifecycle
incompatible_version
unsupported_required_feature
unresolved_blocking_conflict
missing_required_provenance
unsupported_extension
target_capability_missing
backend_capability_missing
security_policy_violation
```

Profiles may add stricter blockers but must not silently remove mandatory safety blockers.


---

## 14. Partial Lowering

Partial lowering may be permitted for editor previews, migration planning, diagnostics, or non-authoritative scaffolding.

A partial KIR must declare:

* incomplete regions;
* unresolved inputs;
* placeholders;
* omitted semantics;
* blocked effects;
* unavailable guarantees;
* prohibited backends;
* diagnostics.

Partial KIR must not be treated as production-ready or authoritative output.


---

## 15. MSG Subgraph Selection

Lowering begins by selecting root subjects and computing a target-specific semantic closure.

Selection must preserve:

* root identity;
* inclusion reason;
* exclusion reason;
* dependency path;
* authority and lifecycle context;
* profile;
* target;
* provenance.

Graph traversal order must not affect the selected subgraph.


---

## 16. Closure Kinds

Closure may include:

```text
identity_closure
type_closure
reference_closure
dependency_closure
constraint_closure
authority_closure
lifecycle_closure
feature_closure
compatibility_closure
evidence_closure
generation_closure
verification_closure
```

A lowering profile must declare which closures are required.


---

## 17. Closure Boundaries

Closure must stop at explicit boundaries such as:

* external runtime dependency;
* backend-provided standard library;
* imported binary or package;
* deferred deployment resource;
* external schema;
* human-maintained overlay;
* MKE-resolved runtime reference.

Every boundary must be represented, not silently dropped.


---

## 18. KIR Snapshot Model

Lowering produces an immutable KIR snapshot:

```text
KIRSnapshot
├── kir_id
├── kir_lineage
├── schema_version
├── lowering_profile
├── target
├── backend_requirements
├── source_msg
├── selected_roots
├── modules
├── units
├── declarations
├── types
├── values
├── operations
├── resources
├── dependencies
├── constraints
├── validations
├── effects
├── placeholders
├── source_maps
├── provenance
├── diagnostics
├── readiness
├── lowering_manifest
└── fingerprint
```

KIR snapshots are immutable and fingerprinted.


---

## 19. KIR Identity

KIR identity must distinguish:

* KIR lineage;
* one immutable KIR snapshot;
* one serialization;
* one backend plan;
* one generated-artifact set.

Equivalent lowering inputs must produce equivalent KIR identity and semantic fingerprint.


---

## 20. KIR Is Derived

KIR is derived from MSG and must remain traceable to it.

KIR may omit semantic knowledge irrelevant to the target.

KIR must not:

* become the canonical authority for source meaning;
* erase source or MSG provenance;
* elevate authority;
* rewrite lifecycle;
* hide conflicts used to block lowering;
* claim semantics not justified by MSG and lowering rules.


---

## 21. KIR Module Model

A KIR module groups target-independent operational units.

```text
KIRModule
├── module_id
├── semantic_roots
├── package_context
├── namespace_context
├── imports
├── exports
├── units
├── target_requirements
├── initialization
├── finalization
├── provenance
└── fingerprint
```

Module boundaries derive from explicit package, namespace, target, and backend rules rather than source-file boundaries alone.


---

## 22. KIR Unit Model

A KIR unit is the smallest independently lowerable or cacheable operational unit.

```text
KIRUnit
├── unit_id
├── unit_kind
├── semantic_subjects
├── declarations
├── operations
├── resources
├── dependencies
├── constraints
├── effects
├── validations
├── target_requirements
├── backend_requirements
├── source_maps
├── provenance
├── readiness
└── fingerprint
```

Unit granularity must support sound invalidation and deterministic composition.


---

## 23. KIR Declarations

KIR declarations represent operationally relevant declarations selected from MSG.

They preserve:

* semantic identity;
* declaration kind;
* effective type;
* visibility;
* version;
* constraints;
* authority basis;
* lifecycle eligibility;
* source mapping;
* provenance.

KIR declaration identity remains linked to, but distinct from, MSG node identity.


---

## 24. KIR Type System

KIR types are target-independent operational types.

They may include:

```text
void
never
boolean
integer
decimal
string
bytes
identifier
timestamp
duration
enumeration
record
tuple
list
set
map
optional
union
reference
result
stream
resource
capability
opaque
extension
```

KIR type lowering must preserve semantic-type distinctions required by the target.

Unsupported precision or semantics must produce an explicit conversion, adapter requirement, migration, or blocker.


---

## 25. Type Lowering

Type lowering determines:

* KIR type;
* target requirements;
* representation constraints;
* conversion requirements;
* loss class;
* validation obligations;
* serialization obligations;
* provenance.

Lossy or unsafe lowering requires explicit authorization and must remain visible in the plan and generated-artifact manifest.


---

## 26. KIR Values

KIR values are canonical operational values.

They preserve type, precision, units, encoding requirements, redaction state, default status, runtime binding, and provenance.

Secrets should be represented by secret references or capability bindings rather than embedded plaintext.


---

## 27. KIR Operations

A KIR operation conceptually contains:

```text
KIROperation
├── operation_id
├── operation_kind
├── inputs
├── outputs
├── preconditions
├── postconditions
├── effects
├── errors
├── retries
├── idempotency
├── transaction_boundary
├── concurrency
├── security
├── observability
├── provenance
└── fingerprint
```

Operation kinds may include compute, validate, transform, read, write, emit, invoke, generate, migrate, deploy, and verify.


---

## 28. Effects

Effects must be explicit.

Initial effect classes include:

```text
pure
read_source
read_environment
read_network
read_secret
write_file
delete_file
execute_tool
write_network
write_database
deploy
publish
mutate_repository
human_approval
```

A backend may perform only effects authorized by the lowering request, profile, security context, and backend manifest.


---

## 29. Resources

KIR resources represent operational dependencies such as files, directories, packages, services, schemas, secrets, databases, queues, endpoints, build tools, runtimes, and deployment targets.

A resource must declare identity, kind, ownership, lifecycle, acquisition mode, compatibility, security, mutability, provenance, and validation requirements.


---

## 30. Dependencies

KIR dependencies may be semantic, operational, build-time, runtime, optional, peer, development, migration, or external.

Dependency lowering must preserve:

* target identity;
* version range;
* capability;
* scope;
* optionality;
* source justification;
* compatibility result;
* provenance.

A backend must not invent dependencies silently.


---

## 31. Constraints and Validations

KIR preserves constraints that must be:

* statically validated;
* delegated to backend validation;
* emitted as runtime validation;
* represented as tests;
* represented as policy;
* deferred to deployment;
* satisfied by external evidence.

Delegation must identify the responsible phase and required evidence.


---

## 32. KIR Effects and Authority

KIR execution permission is not derived solely from semantic authority.

An authoritative declaration may still be prohibited from deployment by security policy.

A low-authority or draft declaration must not gain effect permission through lowering.

The effective permission is the intersection of semantic authority, lifecycle eligibility, profile policy, user authorization, backend trust, and target policy.


---

## 33. Lowering Pass Model

Initial logical lowering passes include:

```text
validate_request
select_roots
compute_closure
evaluate_eligibility
construct_kir_modules
lower_declarations
lower_types
lower_values
lower_constraints
lower_operations
lower_resources
lower_dependencies
lower_effects
attach_source_maps
attach_provenance
canonicalize
validate_kir
compute_fingerprints
freeze
```

Pass identity and version participate in reproducibility.


---

## 34. Lowering Determinism

Equivalent MSG, request, profile, target, backend requirements, extensions, and declared environment must produce semantically equivalent KIR.

Lowering must not depend on traversal order, map iteration, thread timing, local absolute paths, current time, randomness, cache state, or backend discovery order.


---

## 35. KIR Canonicalization

Canonicalization may normalize module order, unit order, type forms, dependency order, operation order, validation order, source-map references, and extension namespaces.

Canonicalization must not:

* erase operationally significant order;
* hide lossy conversion;
* resolve semantic conflict;
* remove provenance;
* change effect semantics;
* merge resources without an explicit equivalence rule.


---

## 36. KIR Validation

KIR validation checks:

* identity uniqueness;
* schema conformance;
* target-independent type validity;
* dependency closure;
* operation signatures;
* effect declarations;
* constraint delegation;
* source-map completeness;
* provenance;
* target requirements;
* backend requirements;
* security policy;
* deterministic fingerprints;
* profile readiness.

Invalid KIR must not be passed to a production backend.


---

## 37. KIR Readiness

Initial KIR readiness states are:

```text
partial
valid
backend_negotiable
backend_ready
plan_ready
apply_ready
verify_only
blocked
```

Readiness is target-, backend-, and operation-mode-specific.


---

## 38. Lowering Manifest

A lowering manifest conceptually contains:

```text
LoweringManifest
├── compiler_identity
├── compiler_version
├── source_msg
├── source_msg_fingerprint
├── selected_roots
├── lowering_profile
├── lowering_pass_versions
├── target
├── backend_requirements
├── features
├── extensions
├── environment_fingerprint
├── resource_policy
├── security_policy
├── canonicalization_version
├── fingerprint_algorithm
├── diagnostics
└── kir_fingerprint
```


---

## 39. Backend Model

A backend is a governed KIR consumer.

A backend may:

* produce a generation plan;
* render files;
* invoke declared external tools;
* validate target-specific constraints;
* package artifacts;
* publish artifacts;
* deploy resources;
* emit migration plans;
* produce verification evidence.

A backend may not reinterpret arbitrary source or MSG to bypass KIR.


---

## 40. Backend Manifest

A backend manifest conceptually contains:

```text
BackendManifest
├── backend_id
├── version
├── implementation_identity
├── supported_kir_versions
├── supported_targets
├── capabilities
├── required_features
├── optional_features
├── prohibited_features
├── accepted_extensions
├── input_contract
├── output_contract
├── effect_contract
├── determinism
├── reproducibility_level
├── portability
├── external_tools
├── sandbox_requirements
├── resource_requirements
├── security_properties
├── diagnostics_contract
├── failure_behavior
└── provenance
```


---

## 41. Backend Identity

Backend identity is stable across installations.

Implementation identity, package identity, executable identity, and backend semantic identity must remain distinguishable.

A backend version change that can alter output must participate in cache keys, plans, manifests, and fingerprints.


---

## 42. Backend Capabilities

Initial capability categories include:

```text
render_files
render_directories
generate_source
generate_configuration
generate_schema
generate_tests
generate_documentation
format_output
validate_output
invoke_tools
package_output
publish_output
deploy_output
migrate_output
reverse_map
verify_round_trip
self_host_compiler
```

Capabilities must be explicit, versioned, and target-scoped.


---

## 43. Capability Negotiation

Negotiation compares:

* KIR-required capabilities;
* target-required capabilities;
* backend-provided capabilities;
* profile policy;
* security policy;
* environment capabilities;
* external-tool availability;
* version compatibility.

Negotiation results include supported, supported-with-adapter, degraded, deferred, unavailable, and prohibited.


---

## 44. Capability Adapters

An adapter may bridge a capability mismatch only when it declares:

* adapter identity and version;
* source and target capability;
* semantic preservation;
* losses;
* added effects;
* dependencies;
* security implications;
* provenance;
* verification.

Adapters must not be inserted silently.


---

## 45. Backend Selection

Backend selection must be explicit or deterministically policy-driven.

Selection evidence must include candidates, versions, compatibility, capabilities, trust, priority policy, and reason.

Discovery order must not determine selection.


---

## 46. Backend Lifecycle

Backend lifecycle states include:

```text
experimental
candidate
approved
deprecated
withdrawn
blocked
```

A target profile may require an approved backend.

Deprecated backends may remain available for migration or historical regeneration.


---

## 47. Backend Trust

Backend trust is distinct from source authority.

Trust may depend on signature, provenance, review, sandboxing, reproducibility, conformance evidence, publisher, and policy.

An untrusted backend may be restricted to plan-only execution.


---

## 48. Backend Execution

Backend execution consumes a validated KIR snapshot and execution context.

It must produce:

* backend result;
* generated-artifact plan or set;
* diagnostics;
* external-tool evidence;
* effect log;
* verification evidence;
* backend manifest reference;
* fingerprints;
* provenance.

Execution must not mutate finalized KIR.


---

## 49. Plan Before Apply

Mutating backends must support a deterministic plan before apply.

The plan must identify:

* artifact creates;
* updates;
* deletes;
* moves;
* directory operations;
* external-tool invocations;
* dependency changes;
* package-manager operations;
* conflicts;
* protected paths;
* manual files;
* expected fingerprints;
* rollback data;
* verification steps.

Apply must verify that plan preconditions still hold.


---

## 50. Generated-Artifact Plan

A generated-artifact plan conceptually contains:

```text
GeneratedArtifactPlan
├── plan_id
├── kir_snapshot
├── backend
├── target
├── destination
├── operations
├── artifacts
├── conflicts
├── protected_paths
├── overlay_bindings
├── external_tools
├── effect_summary
├── preconditions
├── rollback_plan
├── verification_plan
├── diagnostics
├── provenance
└── fingerprint
```


---

## 51. Artifact Operation Kinds

Initial operation kinds include:

```text
create
replace
patch
merge
move
delete
mkdir
chmod
symlink
format
validate
package
publish
deploy
noop
conflict
```

Each operation must declare preconditions, effects, reversibility, ownership, and verification.


---

## 52. Generated-Artifact Identity

Generated artifacts require identity distinct from their path.

Identity may derive from:

* semantic roots;
* KIR unit;
* backend;
* target artifact kind;
* logical role;
* generation rule;
* destination context.

Path changes do not necessarily change artifact identity.

Two generated artifacts must not claim one identity.


---

## 53. Generated-Artifact Manifest

Every generated artifact set must include a manifest containing:

```text
GeneratedArtifactManifest
├── generation_id
├── source_artifacts
├── source_msg
├── source_kir
├── backend
├── target
├── generated_artifacts
├── ownership
├── operation_mode
├── external_tools
├── environment
├── effect_log
├── verification_results
├── diagnostics
├── fingerprints
├── rollback_reference
└── provenance
```


---

## 54. Generated-Artifact Provenance

Every generated artifact must trace to:

* canonical source artifact identities;
* relevant MSG subjects and claims;
* KIR module and unit identities;
* lowering profile and pass versions;
* backend identity and version;
* target identity and version;
* external tools;
* generation options;
* environment;
* content fingerprint.

Generated headers may summarize provenance, but a full manifest remains authoritative for generation lineage.


---

## 55. Ownership

Generated artifacts must declare ownership:

```text
fully_generated
generated_with_regions
generated_base_with_overlay
human_maintained
external
vendored
```

Ownership controls overwrite, deletion, merge, regeneration, and conflict policy.


---

## 56. Fully Generated Artifacts

A fully generated artifact may be replaced when:

* generation identity matches;
* the destination is owned by the same generation contract;
* precondition fingerprints match or overwrite policy permits;
* protected manual changes are absent;
* plan approval exists when required.

Unexpected manual modifications must produce a conflict or explicit adoption workflow.


---

## 57. Generated Regions

A file may contain generated regions only when the region protocol declares:

* stable region identity;
* delimiters or structural markers;
* nesting rules;
* ownership;
* merge behavior;
* corruption behavior;
* language syntax;
* formatting interaction.

String search alone is insufficient when structural editing is required.


---

## 58. Overlays

Overlays preserve human-maintained or separately governed customizations.

An overlay contract declares:

* base identity;
* overlay identity;
* composition order;
* allowed overrides;
* conflicts;
* validation;
* provenance;
* regeneration behavior.

An overlay must not silently override a prohibited invariant.


---

## 59. Manual Edits

Manual edits to generated artifacts do not automatically become canonical knowledge.

The system must classify manual changes as:

* permitted overlay;
* generated-region violation;
* local patch;
* candidate reverse mapping;
* adopted source change;
* conflict;
* disposable modification.

Reverse adoption requires explicit review and provenance.


---

## 60. Reverse Mapping

A backend may support reverse mapping from generated output to KIR or source proposals.

Reverse mapping must be:

* explicitly supported;
* target-aware;
* partial when necessary;
* provenance-preserving;
* conflict-aware;
* non-authoritative until adopted.

Round-trip support must not be claimed where information is lost.


---

## 61. Regeneration

Regeneration recomputes output from canonical inputs.

Regeneration must:

* verify ownership;
* compare prior manifest;
* compute a plan;
* preserve permitted overlays;
* detect manual conflicts;
* apply atomically where possible;
* update manifests;
* verify outputs;
* support rollback.

Generated output must not become a hidden input to its own regeneration cycle.


---

## 62. Clean Generation

Clean generation constructs output in a new or logically empty destination and then compares or promotes it.

It is the reference behavior for verifying incremental generation and in-place updates.


---

## 63. Incremental Generation

Incremental generation may reuse unchanged KIR units, backend plans, rendered fragments, formatted artifacts, and verification results.

Equivalent clean and incremental generation must produce semantically equivalent artifacts and equal canonical content fingerprints where the target contract requires canonical content.


---

## 64. Apply Semantics

Apply executes an approved plan.

Before every effect, the backend must verify relevant preconditions.

Apply must produce an effect log and final verification result.

A failed apply must identify completed, failed, skipped, and rolled-back operations.


---

## 65. Atomicity

Backends should use temporary locations, atomic rename, transactional APIs, or equivalent strategies.

When full atomicity is impossible, the backend must declare the boundary and provide recovery evidence.

Partially written output must not be presented as a successful artifact set.


---

## 66. Idempotency

Repeated apply with the same validated KIR, backend, target, destination state, and options should produce no semantic change after the first successful application.

Non-idempotent effects must be explicit and require stronger authorization.


---

## 67. Delete Semantics

Deletion requires:

* owned artifact identity;
* prior manifest evidence;
* current-state fingerprint;
* explicit plan entry;
* policy permission;
* rollback or recovery strategy where required.

A backend must not delete unknown files merely because they are absent from the new plan.


---

## 68. Filesystem Safety

Path handling must prevent:

* traversal outside the destination;
* symlink escape;
* case-collision overwrite;
* reserved-name conflicts;
* Unicode normalization collision;
* device-file creation;
* unauthorized permission changes;
* hidden protected-path mutation.

Path policy must be target- and platform-aware.


---

## 69. Repository Mutation

Repository mutation may include files, directories, dependency manifests, lockfiles, generated registries, and configuration.

A backend must distinguish canonical source, generated output, vendor content, cache, build output, and user-maintained files.

Branching, committing, pushing, or opening pull requests are separate authorized effects and are not implied by generation.


---

## 70. External Tools

A backend may invoke an external tool only when the tool contract declares:

* identity;
* version;
* executable resolution;
* inputs;
* outputs;
* environment;
* determinism;
* sandbox;
* resource limits;
* diagnostics;
* failure behavior;
* provenance.

Uncontrolled `PATH` discovery is prohibited in hermetic modes.


---

## 71. Formatting

Formatting is a declared generation phase.

Formatter identity, version, configuration, input, output, and determinism participate in reproducibility.

Formatting must not alter semantics beyond the target language's formatting contract.


---

## 72. Package Managers

Package-manager invocation must declare:

* manager identity and version;
* registry configuration;
* lockfile policy;
* network policy;
* integrity policy;
* lifecycle scripts;
* environment;
* reproducibility level.

Lifecycle scripts and arbitrary package execution are effects requiring explicit authorization.


---

## 73. Backend Diagnostics

Backend diagnostics adopt MSC-CORE-0009.

They must preserve stable codes, identity, target, backend, KIR subject, generated-artifact subject, source mapping, blocked effects, remediation, and provenance.

Backend diagnostics must not be emitted only as unstructured subprocess text.


---

## 74. Backend Caching

Backend cache keys include KIR fingerprint, backend identity and version, target, capabilities, options, formatter and tool versions, environment, destination semantics, and security domain.

A cached rendered artifact may be reused only when its complete generation contract matches.


---

## 75. Backend Invalidation

Backend results are invalidated by changes to:

* KIR unit;
* backend version;
* target version;
* capability selection;
* generation options;
* templates;
* formatter;
* external tools;
* environment;
* path policy;
* ownership;
* overlays;
* security policy;
* verification policy.

Destination-state changes may invalidate an apply plan even when rendered content remains reusable.


---

## 76. Backend Reproducibility

A backend must declare its reproducibility level.

Reproducible generation controls time, randomness, path embedding, filesystem ordering, locale, environment, network inputs, external tools, package registries, and formatting.

Nondeterministic metadata must be separated from canonical artifact content or declared explicitly.


---

## 77. Backend Sandbox

Backends should execute with least privilege.

Sandbox policy may restrict:

* filesystem roots;
* network;
* environment variables;
* secrets;
* subprocesses;
* CPU;
* memory;
* time;
* open files;
* system calls;
* deployment credentials.

Plan-only operation should require fewer privileges than apply.


---

## 78. Backend Failure Model

Backend result states include:

```text
planned
previewed
applied
verified
partial
blocked
failed
cancelled
rolled_back
rollback_failed
internal_error
```

Failure must preserve effect evidence and safe recovery instructions.


---

## 79. Verification

Verification may include:

* content fingerprint checks;
* syntax checks;
* type checks;
* tests;
* schema validation;
* package validation;
* build checks;
* policy checks;
* deployment checks;
* round-trip checks;
* self-hosting equivalence.

Verification evidence must identify tool, version, inputs, outputs, environment, and result.


---

## 80. Rollback

Rollback must be planned before mutating effects when required by policy.

Rollback may restore prior content, remove newly created artifacts, reverse moves, restore manifests, or invoke target-specific compensation.

Rollback does not erase the failed effect history.


---

## 81. KIR and MKE

KIR may be persisted in or referenced by MKE as derived knowledge.

MKE persistence does not make KIR canonical source knowledge.

KIR lineage must remain linked to its source MSG and lowering manifest.


---

## 82. KIR and Publication

Publication backends may consume KIR for operational rendering plans.

Publication content authority derives from MSG and source artifacts, not from rendering success.

Generated publication files remain projections.


---

## 83. KIR and AI

AI-assisted backends may propose KIR adapters, templates, mappings, or generated artifacts.

AI outputs remain generated or inferred, must preserve model and context provenance, and require deterministic validation before authoritative use.

An AI backend must not receive undeclared secrets or hidden source context.


---

## 84. Self-Hosting Thesis

Self-hosting closes the loop in which Monad represents, compiles, lowers, and generates selected parts of Monad itself.

Self-hosting must strengthen traceability and conformance.

It must not create an autonomous compiler authority or bypass human governance.


---

## 85. Self-Hosting Scope

Initial self-hosting may include:

* compiling selected MSL and MSC specifications;
* constructing MSG for those specifications;
* lowering compiler architecture into KIR;
* generating compiler data types;
* generating schemas;
* generating diagnostics registries;
* generating pass registries;
* generating test fixtures;
* generating documentation;
* generating portions of compiler implementation;
* verifying generated artifacts.

Full compiler implementation generation is not required for initial self-hosting.


---

## 86. Bootstrap Stages

Initial stages are:

```text
Stage 0 — Independently implemented bootstrap compiler
Stage 1 — Bootstrap compiler compiles selected Monad specifications
Stage 2 — Pipeline generates non-executable compiler artifacts
Stage 3 — Pipeline generates executable compiler components
Stage 4 — Candidate compiler compiles the same corpus
Stage 5 — Bootstrap and candidate outputs are compared
Stage 6 — Candidate compiler is governed, reviewed, and promoted
Stage 7 — Promoted compiler participates in future self-hosting
```

Promotion criteria become stricter as generated responsibility increases.


---

## 87. Stage 0

The Stage 0 compiler is implemented independently from generated compiler output.

Its trusted basis includes source code, toolchain, tests, specifications, review, and reproducible builds.

Stage 0 must implement enough of MSC-CORE to produce deterministic MSG and KIR for the bootstrap corpus.


---

## 88. Stage 1

Stage 1 demonstrates that the bootstrap compiler can compile selected Monad specifications into MSG without special-case semantic shortcuts.

The selected corpus, exclusions, unsupported features, and partial semantics must be explicit.


---

## 89. Stage 2

Stage 2 generates lower-risk compiler artifacts such as:

* diagnostic code registries;
* schema types;
* serialization models;
* pass metadata;
* test vectors;
* documentation indexes;
* conformance matrices.

Generated artifacts must be compared against hand-maintained equivalents where applicable.


---

## 90. Stage 3

Stage 3 may generate executable compiler components only after:

* KIR contracts are stable;
* backend conformance is demonstrated;
* generated code is reviewable;
* source maps are complete;
* tests are generated or preserved;
* deterministic clean generation passes;
* security review passes;
* rollback exists.

Generated responsibility must increase incrementally.


---

## 91. Candidate Compiler

A candidate compiler must declare:

* source specification snapshot;
* source MSG;
* source KIR;
* compiler backend;
* generated source artifacts;
* human-maintained runtime dependencies;
* toolchain;
* build environment;
* tests;
* reproducibility manifest;
* known divergences;
* trust status.

It must not call itself trusted solely because it compiles.


---

## 92. Self-Compilation

A candidate compiler should compile the same declared corpus as the bootstrap compiler.

Comparison may include:

* discovered artifacts;
* canonical AST fingerprints;
* declarations;
* reference outcomes;
* semantic analysis;
* MSG fingerprint;
* KIR fingerprint;
* stable diagnostics;
* generated artifacts;
* performance evidence.

Differences must be classified and explained.


---

## 93. Equivalence Classes

Self-hosting comparison distinguishes:

```text
byte_identical
representation_equivalent
semantic_equivalent
behaviorally_equivalent
diagnostically_equivalent
not_equivalent
unknown
```

Promotion policy must declare which equivalence classes are required for each output.


---

## 94. Diverse Double Compilation

Where practical, Monad should support diverse double compilation or an equivalent trust-diversity process:

1. build the candidate compiler using one trusted path;
2. rebuild it through an independently diverse trusted path;
3. compare resulting compiler behavior or binaries under a declared equivalence contract;
4. investigate unexplained divergence.

This reduces dependence on one compiler binary or toolchain lineage.


---

## 95. Trust Bootstrap

Self-hosting trust must account for:

* bootstrap compiler source;
* compiler binary;
* host compiler;
* runtime;
* operating system;
* external tools;
* backend;
* generated source;
* package dependencies;
* build scripts;
* signatures;
* reproducibility evidence.

Trust is explicit and layered, not absolute.


---

## 96. Promotion

Promotion of a candidate compiler requires:

* accepted work packet;
* conformance review;
* security review;
* reproducible build evidence;
* clean and incremental equivalence;
* bootstrap and candidate comparison;
* diagnostic comparison;
* generated-artifact provenance;
* rollback plan;
* authority approval;
* version assignment;
* release evidence.

A compiler cannot promote itself.


---

## 97. Promotion Boundary

Promotion changes governance status.

It does not rewrite history.

The bootstrap compiler, candidate compiler, test evidence, divergences, approvals, and release artifacts must remain historically accessible.


---

## 98. Self-Hosting Rollback

If a promoted compiler later fails conformance or security review, governance may:

* suspend it;
* revert to the prior trusted compiler;
* retain it for investigation;
* rebuild through a different toolchain;
* invalidate generated artifacts;
* regenerate affected outputs;
* publish a corrected release.

Rollback must preserve all evidence.


---

## 99. Circularity Control

Self-hosting introduces dependency cycles.

The system must distinguish:

* semantic self-description;
* build-time self-dependency;
* runtime self-dependency;
* generated-source dependency;
* compiler-binary dependency;
* schema dependency;
* test dependency.

Bootstrap cycles must be broken through explicit staged artifacts and trusted seeds.


---

## 100. Seed Artifacts

A seed artifact is an independently provided artifact required to start self-hosting.

Seeds must declare:

* identity;
* version;
* source;
* authority;
* trust;
* integrity;
* purpose;
* replacement condition;
* lifecycle;
* provenance.

Seeds must be minimized over time but not hidden.


---

## 101. Self-Hosting Provenance

Every self-hosted artifact must trace through:

```text
canonical Monad sources
    ↓
bootstrap compiler
    ↓
MSG
    ↓
KIR
    ↓
compiler backend
    ↓
generated compiler artifacts
    ↓
host build toolchain
    ↓
candidate compiler
    ↓
verification and promotion
```

Missing lineage blocks trusted promotion.


---

## 102. Self-Hosting Diagnostics

Diagnostics must distinguish:

* source defect;
* bootstrap compiler defect;
* generated compiler defect;
* backend defect;
* host-toolchain defect;
* equivalence failure;
* reproducibility failure;
* trust failure;
* promotion-policy failure.

Blame must not be assigned solely from the phase where failure surfaced.


---

## 103. Self-Hosting Security

Threats include:

* trusting-trust attacks;
* compromised bootstrap binaries;
* malicious backends;
* generated-code injection;
* dependency substitution;
* build-script execution;
* poisoned caches;
* hidden nondeterminism;
* forged equivalence evidence;
* signature compromise;
* secret leakage.

Self-hosting requires reproducibility, provenance, sandboxing, diverse verification, and human governance.


---

## 104. Compiler Implementation Threshold

Completion of MSC-CORE-0001 through MSC-CORE-0010 establishes the specification threshold for bootstrap compiler implementation when:

* cross-document consistency review passes;
* open questions are classified as blocking or nonblocking;
* required bootstrap profile is explicit;
* implementation work packets are approved;
* no unresolved P0 contradiction exists;
* the architecture constitution authorizes implementation.

The threshold authorizes implementation. It does not declare the compiler complete.


---

## 105. Bootstrap Implementation Slice

The first implementation slice should support:

```text
discover canonical Markdown artifacts
parse bootstrap frontmatter and body structure
normalize to canonical AST
collect declarations
bind symbols
resolve local references
perform minimum semantic analysis
construct deterministic partial MSG
lower a selected MSG subgraph to bootstrap KIR
invoke a plan-only filesystem backend
emit generated schemas or registries
verify clean/incremental equivalence
record full provenance and manifests
```

This slice should avoid deployment, unrestricted network access, and autonomous mutation.


---

## 106. Diagnostics

KIR and backend diagnostics adopt MSC-CORE-0009 and add target, KIR unit, backend, generated-artifact, effect, and self-hosting subjects.

Initial categories include:

```text
lowering
eligibility
closure
kir_identity
kir_type
kir_operation
kir_effect
target
backend
capability
generation
ownership
overlay
filesystem
external_tool
verification
rollback
self_hosting
promotion
trust
```


---

## 107. Initial Diagnostic Codes

```text
MSC-KIR-INPUT-001       invalid MSG input
MSC-KIR-ELIG-001        MSG element not eligible
MSC-KIR-CLOSURE-001     incomplete lowering closure
MSC-KIR-ID-001          KIR identity collision
MSC-KIR-TYPE-001        unsupported type lowering
MSC-KIR-TYPE-002        lossy lowering not authorized
MSC-KIR-EFFECT-001      undeclared effect
MSC-KIR-EFFECT-002      effect not authorized
MSC-KIR-VALID-001       KIR invariant violation
MSC-KIR-HASH-001        KIR fingerprint mismatch
MSC-BACKEND-001         backend incompatible
MSC-BACKEND-002         required capability missing
MSC-BACKEND-003         backend manifest invalid
MSC-BACKEND-004         backend trust insufficient
MSC-GEN-PLAN-001        generation precondition failed
MSC-GEN-OWN-001         generated ownership conflict
MSC-GEN-PATH-001        unsafe destination path
MSC-GEN-MANUAL-001      unexpected manual modification
MSC-GEN-TOOL-001        external tool contract failure
MSC-GEN-VERIFY-001      generated artifact verification failed
MSC-GEN-ROLLBACK-001    rollback failed
MSC-SELF-001            bootstrap and candidate mismatch
MSC-SELF-002            self-hosting provenance incomplete
MSC-SELF-003            candidate promotion blocked
MSC-SELF-004            trusted seed invalid
MSC-SELF-005            reproducibility verification failed
```


---

## 108. Normative Requirements

### MSC-KIR-REQ-001

MSC MUST lower only from an immutable, fingerprint-verified MSG snapshot.

### MSC-KIR-REQ-002

KIR lowering MUST remain distinct from MSG construction, backend execution, persistence, and publication.

### MSC-KIR-REQ-003

KIR MUST remain a derived operational projection and MUST NOT become canonical semantic authority.

### MSC-KIR-REQ-004

Every lowering request MUST identify roots, outputs, target, profile, operation mode, policy, and provenance.

### MSC-KIR-REQ-005

Every lowering profile MUST be named, versioned, fingerprinted, and inspectable.

### MSC-KIR-REQ-006

KIR eligibility MUST be evaluated against identity, binding, references, types, constraints, authority, lifecycle, compatibility, features, conflicts, evidence, and provenance.

### MSC-KIR-REQ-007

Eligibility MUST remain target-specific.

### MSC-KIR-REQ-008

Publication eligibility MUST NOT imply KIR eligibility.

### MSC-KIR-REQ-009

An unresolved required reference MUST block strict KIR lowering.

### MSC-KIR-REQ-010

An ambiguous required reference MUST block strict KIR lowering.

### MSC-KIR-REQ-011

A violated blocking constraint MUST block dependent KIR output.

### MSC-KIR-REQ-012

Unsupported required features or extensions MUST block dependent lowering.

### MSC-KIR-REQ-013

Partial lowering MUST declare incomplete regions, placeholders, blocked effects, unavailable guarantees, and prohibited backends.

### MSC-KIR-REQ-014

Partial KIR MUST NOT be labeled production-ready or authoritative.

### MSC-KIR-REQ-015

MSG subgraph selection MUST record roots, closure kinds, inclusion reasons, exclusion reasons, and dependency paths.

### MSC-KIR-REQ-016

Graph traversal order MUST NOT affect lowering selection.

### MSC-KIR-REQ-017

Every external closure boundary MUST be represented explicitly.

### MSC-KIR-REQ-018

Every KIR snapshot MUST have stable identity, lineage, schema version, profile, target, source MSG, manifest, and fingerprint.

### MSC-KIR-REQ-019

KIR snapshots MUST be immutable after finalization.

### MSC-KIR-REQ-020

Equivalent lowering inputs MUST produce semantically equivalent KIR.

### MSC-KIR-REQ-021

KIR identity MUST NOT depend on traversal order, scheduling, randomness, local absolute paths, current time, or cache state.

### MSC-KIR-REQ-022

KIR modules and units MUST derive from explicit semantic and target rules rather than source-file boundaries alone.

### MSC-KIR-REQ-023

Every KIR declaration MUST preserve its source semantic identity and provenance.

### MSC-KIR-REQ-024

KIR declaration identity MUST remain distinct from MSG node identity.

### MSC-KIR-REQ-025

KIR type lowering MUST preserve target-relevant semantic-type distinctions.

### MSC-KIR-REQ-026

Unsupported type semantics MUST produce an explicit adapter, migration, conversion, or blocker.

### MSC-KIR-REQ-027

Lossy or unsafe type lowering MUST require explicit authorization.

### MSC-KIR-REQ-028

Every lossy lowering MUST remain visible in plans, diagnostics, and provenance.

### MSC-KIR-REQ-029

KIR values MUST preserve type, precision, units, encoding, redaction, default, runtime binding, and provenance where applicable.

### MSC-KIR-REQ-030

Secrets MUST be represented through governed secret references or capability bindings rather than embedded plaintext when possible.

### MSC-KIR-REQ-031

Every KIR operation MUST declare inputs, outputs, errors, effects, constraints, security, and provenance.

### MSC-KIR-REQ-032

Every effect MUST be explicit and classified.

### MSC-KIR-REQ-033

A backend MUST perform only effects authorized by the request, profile, security context, and backend manifest.

### MSC-KIR-REQ-034

Semantic authority alone MUST NOT grant operational effect permission.

### MSC-KIR-REQ-035

Low-authority or lifecycle-ineligible semantics MUST NOT gain effect permission through lowering.

### MSC-KIR-REQ-036

Every KIR resource MUST declare identity, kind, ownership, lifecycle, compatibility, security, and provenance.

### MSC-KIR-REQ-037

Every dependency introduced into KIR MUST be justified by MSG, target rules, or an explicit adapter.

### MSC-KIR-REQ-038

A backend MUST NOT invent undeclared dependencies silently.

### MSC-KIR-REQ-039

Every constraint delegated beyond MSC MUST identify responsible phase, required evidence, and blocking behavior.

### MSC-KIR-REQ-040

Every lowering pass MUST have stable identity and version.

### MSC-KIR-REQ-041

Lowering canonicalization MUST NOT resolve semantic conflict, hide loss, remove provenance, or alter effect semantics.

### MSC-KIR-REQ-042

KIR validation MUST check identity, schema, types, dependencies, operations, effects, constraints, provenance, target requirements, backend requirements, and security.

### MSC-KIR-REQ-043

Invalid KIR MUST NOT be passed to a production backend.

### MSC-KIR-REQ-044

Every KIR snapshot MUST include a lowering manifest.

### MSC-KIR-REQ-045

KIR canonical ordering MUST be deterministic and locale-independent.

### MSC-KIR-REQ-046

KIR fingerprints MUST be deterministic, versioned, domain-separated, and representation-aware.

### MSC-KIR-REQ-047

Clean and incremental lowering over equivalent inputs MUST produce equal semantic KIR fingerprints.

### MSC-KIR-REQ-048

A backend MUST consume validated KIR rather than reinterpret arbitrary source or MSG.

### MSC-KIR-REQ-049

Every backend MUST publish a machine-readable manifest.

### MSC-KIR-REQ-050

A backend manifest MUST declare identity, version, supported KIR versions, targets, capabilities, effects, determinism, trust, tools, sandbox, resources, diagnostics, and failure behavior.

### MSC-KIR-REQ-051

Backend semantic identity MUST remain distinct from executable, package, and implementation identity.

### MSC-KIR-REQ-052

Backend versions capable of changing output MUST participate in cache keys, plans, manifests, and fingerprints.

### MSC-KIR-REQ-053

Backend capabilities MUST be explicit, versioned, and target-scoped.

### MSC-KIR-REQ-054

Capability negotiation MUST compare KIR, target, backend, profile, security, environment, external tools, and versions.

### MSC-KIR-REQ-055

Capability adapters MUST declare identity, semantic preservation, losses, effects, dependencies, security, provenance, and verification.

### MSC-KIR-REQ-056

Capability adapters MUST NOT be inserted silently.

### MSC-KIR-REQ-057

Backend selection MUST be explicit or deterministically policy-driven.

### MSC-KIR-REQ-058

Backend discovery order MUST NOT determine selection.

### MSC-KIR-REQ-059

Backend lifecycle and trust MUST remain explicit.

### MSC-KIR-REQ-060

An untrusted backend MAY be restricted to plan-only operation.

### MSC-KIR-REQ-061

Backend execution MUST produce diagnostics, effect evidence, verification evidence, fingerprints, and provenance.

### MSC-KIR-REQ-062

Mutating backends MUST support deterministic plan-before-apply behavior.

### MSC-KIR-REQ-063

Every generation plan MUST identify operations, artifacts, conflicts, protected paths, tools, effects, preconditions, rollback, and verification.

### MSC-KIR-REQ-064

Apply MUST verify that plan preconditions still hold.

### MSC-KIR-REQ-065

Every artifact operation MUST declare preconditions, effects, reversibility, ownership, and verification.

### MSC-KIR-REQ-066

Generated artifact identity MUST remain distinct from destination path.

### MSC-KIR-REQ-067

Every generated artifact set MUST include a generated-artifact manifest.

### MSC-KIR-REQ-068

Every generated artifact MUST trace to source artifacts, MSG, KIR, lowering rules, backend, target, tools, environment, and content fingerprint.

### MSC-KIR-REQ-069

Generated provenance headers MUST NOT replace the full generated-artifact manifest.

### MSC-KIR-REQ-070

Every generated artifact MUST declare an ownership class.

### MSC-KIR-REQ-071

A fully generated artifact MUST NOT overwrite unexpected manual modifications silently.

### MSC-KIR-REQ-072

Generated-region protocols MUST declare stable region identity, markers, nesting, ownership, merge, corruption, and formatting behavior.

### MSC-KIR-REQ-073

Overlays MUST declare base, overlay identity, composition, allowed overrides, conflicts, validation, provenance, and regeneration behavior.

### MSC-KIR-REQ-074

Manual edits to generated output MUST NOT automatically become canonical knowledge.

### MSC-KIR-REQ-075

Reverse mapping MUST remain non-authoritative until explicitly adopted.

### MSC-KIR-REQ-076

Round-trip capability MUST NOT be claimed when required information is lost.

### MSC-KIR-REQ-077

Regeneration MUST verify ownership, compute a plan, preserve permitted overlays, detect conflicts, update manifests, verify output, and support rollback.

### MSC-KIR-REQ-078

Generated output MUST NOT become a hidden canonical input to its own generation cycle.

### MSC-KIR-REQ-079

Clean generation MUST provide the reference behavior for incremental or in-place generation.

### MSC-KIR-REQ-080

Equivalent clean and incremental generation MUST produce semantically equivalent generated artifacts.

### MSC-KIR-REQ-081

Apply MUST record completed, failed, skipped, and rolled-back operations.

### MSC-KIR-REQ-082

Partially written output MUST NOT be presented as a successful artifact set.

### MSC-KIR-REQ-083

Repeated apply under equivalent inputs and destination state SHOULD be idempotent.

### MSC-KIR-REQ-084

Non-idempotent effects MUST be explicit and strongly authorized.

### MSC-KIR-REQ-085

Deletion MUST require ownership evidence, prior manifest, current fingerprint, policy permission, plan entry, and recovery strategy.

### MSC-KIR-REQ-086

A backend MUST NOT delete unknown files merely because they are absent from a new plan.

### MSC-KIR-REQ-087

Filesystem operations MUST prevent traversal, symlink escape, case collision, Unicode collision, protected-path mutation, and unauthorized permission changes.

### MSC-KIR-REQ-088

Generation MUST distinguish canonical sources, generated outputs, vendor content, caches, build outputs, and user-maintained files.

### MSC-KIR-REQ-089

Generation MUST NOT imply branching, committing, pushing, or pull-request creation.

### MSC-KIR-REQ-090

External tools MUST declare identity, version, inputs, outputs, environment, determinism, sandbox, resources, diagnostics, failure, and provenance.

### MSC-KIR-REQ-091

Uncontrolled PATH discovery MUST NOT affect hermetic generation.

### MSC-KIR-REQ-092

Formatter identity, version, configuration, and output MUST participate in reproducibility.

### MSC-KIR-REQ-093

Package-manager lifecycle scripts MUST require explicit effect authorization.

### MSC-KIR-REQ-094

Backend diagnostics MUST adopt stable identity, ordering, rendering, and provenance contracts from MSC-CORE-0009.

### MSC-KIR-REQ-095

Backend cache keys MUST include KIR, backend, target, capabilities, options, tools, environment, destination semantics, and security domain.

### MSC-KIR-REQ-096

Destination-state changes MUST invalidate stale apply plans.

### MSC-KIR-REQ-097

Backends MUST declare their supported reproducibility level.

### MSC-KIR-REQ-098

Nondeterministic metadata MUST be separated from canonical artifact content or declared explicitly.

### MSC-KIR-REQ-099

Backends SHOULD execute with least privilege and declared sandbox policy.

### MSC-KIR-REQ-100

Plan-only operation SHOULD require fewer privileges than apply.

### MSC-KIR-REQ-101

Backend failures MUST preserve effect evidence and recovery instructions.

### MSC-KIR-REQ-102

Verification evidence MUST identify tool, version, inputs, outputs, environment, and result.

### MSC-KIR-REQ-103

Rollback MUST preserve failed effect history.

### MSC-KIR-REQ-104

KIR persisted in MKE MUST remain identified as derived from MSG.

### MSC-KIR-REQ-105

Publication success MUST NOT elevate source authority.

### MSC-KIR-REQ-106

AI-assisted backends MUST preserve model and context provenance and MUST undergo deterministic validation.

### MSC-KIR-REQ-107

AI backends MUST NOT receive undeclared secrets or hidden source context.

### MSC-KIR-REQ-108

Self-hosting MUST remain governed by human-approved architecture, work packets, conformance, security, and promotion.

### MSC-KIR-REQ-109

Initial self-hosting MAY generate selected compiler artifacts without generating the complete compiler.

### MSC-KIR-REQ-110

Bootstrap stages MUST be explicit and progressively increase generated responsibility.

### MSC-KIR-REQ-111

The Stage 0 compiler MUST be independently implemented from generated compiler output.

### MSC-KIR-REQ-112

Stage 1 MUST compile a declared bootstrap corpus without hidden semantic shortcuts.

### MSC-KIR-REQ-113

Executable compiler generation MUST require stable KIR, backend conformance, source maps, tests, reproducibility, security review, and rollback.

### MSC-KIR-REQ-114

Every candidate compiler MUST declare its complete source, MSG, KIR, backend, toolchain, generated artifacts, tests, manifests, divergences, and trust status.

### MSC-KIR-REQ-115

A candidate compiler MUST NOT be considered trusted merely because it compiles.

### MSC-KIR-REQ-116

Bootstrap and candidate compilers MUST compile the same declared comparison corpus.

### MSC-KIR-REQ-117

Self-hosting comparison MUST classify byte, representation, semantic, behavioral, and diagnostic equivalence.

### MSC-KIR-REQ-118

Promotion policy MUST declare required equivalence classes.

### MSC-KIR-REQ-119

Monad SHOULD support diverse double compilation or an equivalent independent trust-diversity process.

### MSC-KIR-REQ-120

Self-hosting trust MUST account for bootstrap source and binary, host compiler, runtime, OS, tools, backend, generated source, dependencies, and build scripts.

### MSC-KIR-REQ-121

A candidate compiler MUST NOT promote itself.

### MSC-KIR-REQ-122

Promotion MUST require conformance, security, reproducibility, equivalence, provenance, rollback, authority approval, and release evidence.

### MSC-KIR-REQ-123

Promotion MUST preserve bootstrap, candidate, divergence, approval, and release history.

### MSC-KIR-REQ-124

Self-hosting rollback MUST preserve evidence and support return to a prior trusted compiler.

### MSC-KIR-REQ-125

Bootstrap dependency cycles MUST be broken through explicit stages and declared trusted seeds.

### MSC-KIR-REQ-126

Every trusted seed MUST declare identity, source, authority, trust, integrity, purpose, replacement condition, lifecycle, and provenance.

### MSC-KIR-REQ-127

Missing self-hosting lineage MUST block trusted promotion.

### MSC-KIR-REQ-128

Self-hosting diagnostics MUST distinguish source, bootstrap compiler, generated compiler, backend, host toolchain, equivalence, reproducibility, trust, and promotion failures.

### MSC-KIR-REQ-129

Self-hosting security MUST address trusting-trust attacks, compromised binaries, malicious backends, generated-code injection, dependency substitution, poisoned caches, hidden nondeterminism, and forged evidence.

### MSC-KIR-REQ-130

Completion of MSC-CORE-0001 through MSC-CORE-0010 MUST be followed by a compiler cross-document consistency review.

### MSC-KIR-REQ-131

Bootstrap implementation MUST NOT begin under a claimed threshold while a P0 architectural contradiction remains unresolved.

### MSC-KIR-REQ-132

A conforming bootstrap implementation MUST produce deterministic MSG and KIR and a plan-only generated artifact with complete provenance.


---

## 109. Machine Specification

```yaml
machine_spec:
  id: MSC-CORE-0010
  version: 0.1.0
  status: bootstrap

  input:
    kind: MonadSemanticGraphSnapshot
    immutable: true
    fingerprint_verified: true

  intermediate:
    kind: KIRSnapshot
    immutable: true
    deterministic: true
    fingerprinted: true

  operation_modes:
    - plan
    - preview
    - apply
    - verify
    - diff
    - clean

  lowering_phases:
    - validate_request
    - select_roots
    - compute_closure
    - evaluate_eligibility
    - construct_modules
    - lower_declarations
    - lower_types
    - lower_values
    - lower_constraints
    - lower_operations
    - lower_resources
    - lower_dependencies
    - lower_effects
    - attach_source_maps
    - attach_provenance
    - canonicalize
    - validate
    - fingerprint
    - freeze

  backend_lifecycle:
    - experimental
    - candidate
    - approved
    - deprecated
    - withdrawn
    - blocked

  self_hosting_stages:
    - stage_0_bootstrap
    - stage_1_compile_specs
    - stage_2_generate_non_executable
    - stage_3_generate_executable
    - stage_4_candidate_compiles
    - stage_5_equivalence
    - stage_6_promotion
    - stage_7_continuing_self_host
```

---

## 110. KIR and Backend Invariants

```yaml
invariants:
  - id: MSC-KIR-INV-001
    statement: Every KIR snapshot traces to exactly one declared source MSG snapshot.
  - id: MSC-KIR-INV-002
    statement: KIR never establishes semantic authority independently from MSG.
  - id: MSC-KIR-INV-003
    statement: Every effect is explicit and authorized.
  - id: MSC-KIR-INV-004
    statement: Every generated artifact has stable identity, ownership, provenance, and fingerprint.
  - id: MSC-KIR-INV-005
    statement: Backends never interpret undeclared source semantics outside KIR.
  - id: MSC-KIR-INV-006
    statement: Plan preconditions are verified before apply.
  - id: MSC-KIR-INV-007
    statement: Unknown files are never deleted merely because they are absent from a generation plan.
  - id: MSC-KIR-INV-008
    statement: Generated output is never hidden canonical input to its own generation cycle.
  - id: MSC-KIR-INV-009
    statement: Clean and incremental lowering produce equal semantic KIR fingerprints.
  - id: MSC-KIR-INV-010
    statement: Clean and incremental generation produce equivalent canonical generated artifacts.
  - id: MSC-KIR-INV-011
    statement: A partial or failed apply is never reported as complete.
  - id: MSC-KIR-INV-012
    statement: A candidate compiler never promotes itself.
  - id: MSC-KIR-INV-013
    statement: Every promoted self-hosted compiler has complete bootstrap and equivalence provenance.
  - id: MSC-KIR-INV-014
    statement: Rollback never erases failed-generation or failed-promotion evidence.
```

---

## 111. Conformance Example — Plan-Only Backend

```yaml
lowering_request:
  roots:
    - MSC-DIAGNOSTIC-REGISTRY
  target: rust-source
  backend: monad.backend.rust
  profile: bootstrap
  operation_mode: plan

plan:
  operations:
    - kind: create
      artifact_id: generated:diagnostic-registry
      path: crates/monad-diagnostics/src/generated.rs
      ownership: fully_generated
      expected_fingerprint: sha256:...
  effects:
    - write_file
  apply_authorized: false
```

The backend may render and preview content but must not mutate the repository without an authorized apply request.

---

## 112. Conformance Example — Manual Modification Conflict

Prior manifest:

```yaml
artifact:
  id: generated:diagnostic-registry
  fingerprint: sha256:old-generated
  ownership: fully_generated
```

Current destination fingerprint:

```text
sha256:manual-change
```

New plan must report an ownership conflict. It must not overwrite silently.

---

## 113. Conformance Example — Self-Hosting Promotion

```text
bootstrap compiler compiles corpus C
candidate compiler compiles corpus C
MSG fingerprints match
KIR fingerprints match
stable diagnostic sets match
generated compiler artifacts satisfy declared equivalence
security review passes
reproducible builds pass
promotion work packet is approved
candidate version is promoted
```

Any unexplained mismatch blocks promotion.

---

## 114. Invalid Examples

The following behaviors are nonconforming:

```text
backend reads raw specification files to invent additional semantics;
generated files are treated as canonical because they compile;
apply mutates files without a reviewed plan;
unknown files are deleted during clean generation;
backend selection depends on plugin discovery order;
current time is embedded in canonical output without declaration;
manual changes to fully generated files are overwritten silently;
an AI backend introduces an undeclared dependency;
candidate compiler declares itself trusted after compiling once;
self-hosting promotion proceeds despite unexplained MSG divergence;
rollback deletes evidence of the failed promotion.
```

---

## 115. Minimum Bootstrap Conformance

The bootstrap compiler and first backend are conforming at minimum when they can:

* consume one verified MSG snapshot;
* select one declared root and compute closure;
* evaluate bootstrap KIR eligibility;
* construct deterministic modules and units;
* lower declarations, types, references, constraints, and provenance;
* emit immutable canonical KIR JSON;
* compute a KIR semantic fingerprint;
* load one backend manifest;
* negotiate capabilities;
* generate a deterministic plan;
* preview at least one fully generated schema, registry, or source artifact;
* refuse unauthorized apply;
* detect manual destination modification;
* record generated-artifact identity and full provenance;
* verify clean and incremental KIR equivalence;
* run without unrestricted network or deployment effects.

---

## 116. Test Matrix

| Domain | Required demonstration |
|---|---|
| eligibility | Ineligible MSG elements are blocked or explicitly partial |
| closure | Selected roots produce deterministic target-specific closure |
| KIR identity | Equivalent inputs produce equivalent KIR identities |
| types | Lossless, checked, lossy, unsupported, and opaque lowering remain distinct |
| effects | Undeclared and unauthorized effects fail |
| resources | Resource identity and security survive lowering |
| constraints | Delegated validation has an owner and evidence contract |
| determinism | Scheduling and cache state do not alter KIR fingerprint |
| backend manifest | Invalid or incompatible manifests fail |
| capabilities | Missing capabilities are diagnosed deterministically |
| planning | Same inputs produce the same plan |
| preconditions | Changed destination invalidates stale apply plan |
| ownership | Manual changes to generated artifacts cause conflict |
| overlays | Allowed overlays survive regeneration |
| deletion | Unknown files are preserved |
| filesystem | Traversal and symlink escape are rejected |
| tools | Uncontrolled or mismatched tools fail strict mode |
| caching | Backend cache invalidation includes all output-affecting inputs |
| reproducibility | Clean and incremental output are equivalent |
| rollback | Failed apply preserves evidence and restores recoverable state |
| self-hosting | Bootstrap and candidate compile the same corpus |
| equivalence | Divergence is classified and blocks promotion when required |
| trust | Candidate cannot self-promote |
| seeds | Trusted seed identity and integrity are verified |
| security | Malicious backend and poisoned cache are rejected |

---

## 117. Acceptance Criteria

MSC-CORE-0010 is accepted when:

- [ ] MSG and KIR responsibilities are unambiguous.
- [ ] Lowering requests, profiles, targets, eligibility, blocking, partial lowering, selection, and closure are defined.
- [ ] KIR snapshot, module, unit, declaration, type, value, operation, effect, resource, dependency, constraint, validation, source-map, provenance, and readiness models are defined.
- [ ] Lowering phases, determinism, canonicalization, validation, manifest, caching, invalidation, and reproducibility are defined.
- [ ] Backend manifests, identity, capabilities, negotiation, selection, lifecycle, trust, execution, diagnostics, caching, sandboxing, and failure behavior are defined.
- [ ] Generated-artifact plans, operations, identity, manifests, provenance, ownership, generated regions, overlays, manual edits, reverse mapping, regeneration, apply, atomicity, idempotency, deletion, filesystem safety, tools, verification, and rollback are defined.
- [ ] Self-hosting thesis, scope, stages, trust bootstrap, candidate compiler, equivalence, diverse verification, promotion, rollback, circularity, seeds, provenance, diagnostics, and security are defined.
- [ ] Minimum bootstrap conformance is implementable.
- [ ] The compiler implementation threshold contribution is explicit.
- [ ] No backend may bypass MSG and KIR to establish source meaning.
- [ ] A candidate compiler cannot promote itself.

---

## 118. MSC-CORE Series Completion

With MSC-CORE-0010, the MSC-CORE series defines:

```text
MSC-CORE-0001  Vision and architecture
MSC-CORE-0002  Pipeline and phases
MSC-CORE-0003  Discovery and compilation units
MSC-CORE-0004  Frontends and normalizers
MSC-CORE-0005  Declarations and binding
MSC-CORE-0006  Namespaces, imports, and resolution
MSC-CORE-0007  Types, constraints, and semantic analysis
MSC-CORE-0008  Semantic graph construction
MSC-CORE-0009  Diagnostics, incrementality, and reproducibility
MSC-CORE-0010  KIR lowering, backends, and self-hosting
```

The next mandatory activity is a compiler-specification cross-document consistency review.

---

## 119. Required Consistency Review

The review must verify:

* terminology;
* phase boundaries;
* snapshot inputs and outputs;
* identity domains;
* provenance flow;
* authority and lifecycle;
* partial-state behavior;
* diagnostics;
* dependency and invalidation contracts;
* fingerprint domains;
* profile composition;
* extension behavior;
* security boundaries;
* MSG-to-KIR eligibility;
* KIR-to-backend contracts;
* bootstrap implementation slice;
* self-hosting stages;
* unresolved P0 contradictions.

The review must not treat document count as evidence of consistency.

---

## 120. Open Questions

1. What exact expansion and canonical name will KIR use in all future artifacts?
2. Which KIR serialization is selected for bootstrap exchange?
3. Which KIR types and operations are mandatory for the first backend?
4. Which backend implementation language is selected for Stage 0?
5. Which generated artifact is the first self-hosted output?
6. Which formatter and package-manager contracts are permitted initially?
7. Which filesystem mutation library or strategy is selected?
8. Which sandbox mechanism is required for third-party backends?
9. Which equivalence classes are mandatory for compiler promotion?
10. Which diverse toolchain is used for independent compiler verification?
11. Which seed artifacts are accepted for Stage 0?
12. How are backend manifests signed or attested?
13. Which KIR and generation manifests are persisted in MKE?
14. Which generated source regions, if any, are permitted in the bootstrap compiler?
15. Which compiler components remain permanently human-maintained?

These questions must be classified during consistency review and implementation planning.

---

## 121. Final Statement

KIR lowering is the boundary between what Monad knows and what Monad is authorized to do with that knowledge.

Backends operate only on an explicit, validated, target-independent contract. Generated artifacts remain projections with complete identity, ownership, provenance, and lifecycle. Mutation is planned, authorized, verified, and recoverable.

Self-hosting closes the engineering loop only when the compiler can explain its source, preserve its semantic lineage, reproduce its outputs, compare independent compiler paths, survive rollback, and remain subject to human governance.

MSC-CORE-0010 completes the compiler-core specification series and establishes the final architecture required before the compiler implementation threshold can be declared.

---

## Status

Draft.

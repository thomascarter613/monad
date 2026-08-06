---
id: "MSC-CORE-0006"
title: "Namespace, Import, and Reference Resolution"
type: "knowledge.specification"
namespace: "monad"
series: "MSC-CORE"
series_position: 6
version: "0.1.0"
status: "draft"
created: "2026-08-05"
authors:
  - "Monad Architecture Team"
tags:
  - "msc"
  - "namespaces"
  - "imports"
  - "exports"
  - "references"
  - "resolution"
  - "scope-graph"
  - "dependency-graph"
  - "semantic-analysis"
depends_on:
  - "ADR-0002"
  - "ADR-0003"
  - "ADR-0004"
  - "ADR-0005"
  - "ADR-0006"
  - "ADR-0007"
  - "MSL-CORE-0004"
  - "MSL-CORE-0005"
  - "MSL-CORE-0006"
  - "MSL-CORE-0007"
  - "MSL-CORE-0008"
  - "MSL-CORE-0009"
  - "MSL-CORE-0010"
  - "MSC-CORE-0001"
  - "MSC-CORE-0002"
  - "MSC-CORE-0003"
  - "MSC-CORE-0004"
  - "MSC-CORE-0005"
references:
  - "MART-CORE"
  - "MSG-CORE"
  - "KIR-CORE"
  - "MKE-CORE-0002"
  - "MKE-CORE-0003"
  - "MKE-CORE-0004"
  - "MKE-CORE-0005"
  - "MKE-CORE-0008"
  - "MKE-CORE-0009"
  - "MKE-CORE-0010"
enables:
  - "MSC-CORE-0007"
  - "MSC-CORE-0008"
  - "MSC-CORE-0009"
  - "MSC-CORE-0010"
  - "MSC-NAMESPACE"
  - "MSC-REFERENCE"
  - "MSC-PACKAGE"
  - "MSG-CORE"
  - "KIR-CORE"
  - "MSL-PACKAGE"
  - "MSL-TYPE"
  - "MSL-EXPR"
  - "MSL-CONSTRAINT"
compilation_language: "msl-markdown"
compilation_language_version: "bootstrap"
compilation_profile: "machine"
compilation_source_role: "primary"
compilation_status: "bootstrap"
---

# MSC-CORE-0006 — Namespace, Import, and Reference Resolution

## 1. Purpose

This specification defines how the Monad Specification Compiler constructs namespace and scope graphs, resolves imports and exports, expands aliases, evaluates visibility, binds references to declaration symbols, preserves ambiguity, detects dependency cycles, and produces a stable resolved-reference state for later semantic analysis.

It establishes:

* namespace identity;
* namespace construction;
* lexical and semantic scopes;
* package and module scopes;
* namespace graphs;
* import declarations;
* export declarations;
* import modes;
* aliases;
* visibility;
* reference kinds;
* reference candidates;
* resolution contexts;
* resolution ordering;
* version filtering;
* target-kind filtering;
* lifecycle filtering;
* authority-aware resolution;
* cross-language references;
* unresolved and deferred references;
* ambiguous references;
* superseded and deprecated references;
* cyclic imports;
* dependency graphs;
* scope-graph snapshots;
* incremental resolution;
* reference diagnostics;
* resolution conformance.

This specification governs the transformation:

```text
Bound Declaration Snapshot
    ↓
Namespace and Scope Construction
    ↓
Import and Export Resolution
    ↓
Alias Expansion
    ↓
Reference Candidate Discovery
    ↓
Candidate Filtering
    ↓
Reference Binding
    ↓
Resolved Reference Graph
```

It does not perform complete type checking or constraint evaluation.

---

## 2. Context

After declaration collection, MSC knows:

* which declarations exist;
* which semantic identities they claim;
* which compiler symbols represent them;
* which artifacts contributed them;
* which ownership relationships exist;
* which names are available as candidates;
* which collisions and placeholders remain.

However, declarations do not become usable merely because they exist.

MSC must still determine:

* which namespaces and scopes contain them;
* which declarations are visible from a reference site;
* which package or module exports them;
* which imports make them available;
* which aliases apply;
* which version satisfies the reference;
* which target kind is expected;
* whether the target lifecycle allows use;
* whether several candidates remain;
* whether the reference is unresolved, deferred, deprecated, or conflicting.

The declaration table answers:

> What declarations exist?

The namespace graph answers:

> In which semantic contexts do they exist?

The import graph answers:

> Which external declarations are made available?

The reference graph answers:

> Which declaration does each reference mean?

These graphs are necessary before type, constraint, semantic, and MSG construction phases can operate reliably.

---

## 3. Scope

This specification defines:

* namespace declarations;
* implicit namespaces;
* namespace identity;
* namespace ownership;
* scope construction;
* lexical scopes;
* semantic scopes;
* package scopes;
* module scopes;
* artifact scopes;
* member scopes;
* language-region scopes;
* imports;
* exports;
* aliases;
* visibility;
* dependency closure;
* reference descriptors;
* reference identity;
* candidate discovery;
* candidate ranking;
* candidate filtering;
* resolution outcomes;
* ambiguous references;
* unresolved references;
* deferred references;
* placeholder targets;
* deprecated and superseded targets;
* cross-language references;
* extension-defined references;
* cycle detection;
* stable snapshots;
* incremental invalidation;
* diagnostics;
* conformance.

This specification does not fully define:

* package installation;
* remote registry protocols;
* complete version solving;
* type-system assignability;
* expression name lookup;
* runtime dynamic dispatch;
* KIR linking;
* MSG query semantics;
* source-language-specific import syntax.

---

## 4. Non-Goals

This specification does not:

* equate namespace identity with filesystem paths;
* equate import with textual inclusion;
* make every visible declaration automatically authoritative;
* resolve ambiguous references by source order;
* choose the newest version automatically without policy;
* permit wildcard imports to hide dependencies;
* infer imports silently from naming similarity;
* make a placeholder equivalent to a resolved target;
* define runtime service discovery;
* define unrestricted dynamic name resolution;
* permit extension reference rules to bypass core identity and visibility contracts;
* guarantee that every unresolved reference is an error in every profile.

---

## 5. Core Principle

> A reference resolves only through an explicit semantic context, a deterministic candidate process, and validated target compatibility.

Reference resolution is not string matching.

It is a governed process involving:

* identity;
* namespace;
* scope;
* imports;
* aliases;
* visibility;
* version;
* target kind;
* lifecycle;
* authority;
* language contract;
* artifact availability.

If that process cannot select one valid target, MSC must preserve uncertainty rather than invent meaning.

---

## 6. Architectural Position

```text
Canonical MSL AST
    ↓
Declaration Collection
    ↓
Bound Declaration Snapshot
    ↓
Namespace Construction
    ↓
Scope Graph Construction
    ↓
Import and Export Resolution
    ↓
Alias Graph Construction
    ↓
Reference Candidate Discovery
    ↓
Candidate Filtering and Ranking
    ↓
Reference Resolution
    ↓
Resolved Reference Graph
    ↓
Type, Constraint, and Semantic Analysis
```

---

## 7. Terminology

### 7.1 Namespace

A semantically identified container used to organize declarations and establish qualified names.

### 7.2 Scope

A compiler context controlling declaration lookup and visibility.

### 7.3 Lexical Scope

A scope determined by structural nesting or language syntax.

### 7.4 Semantic Scope

A scope determined by namespace, package, module, artifact, ownership, profile, or language rules.

### 7.5 Namespace Graph

The graph of namespaces, declarations, parent relationships, imports, exports, aliases, and visibility boundaries.

### 7.6 Scope Graph

The compiler graph representing lookup contexts and transitions among scopes.

### 7.7 Import

A declaration that makes selected external semantics available in a local scope.

### 7.8 Export

A declaration that makes selected local semantics visible outside their defining scope.

### 7.9 Alias

An alternate name or path resolving to a canonical namespace, declaration, import, or external identity.

### 7.10 Visibility

A rule determining where a declaration may participate in lookup.

### 7.11 Reference

A semantic request to identify another declaration, member, artifact, value, type, module, language unit, or namespace.

### 7.12 Reference Site

The canonical node and semantic context from which a reference originates.

### 7.13 Reference Descriptor

A compiler record describing a reference before final target selection.

### 7.14 Candidate

A declaration symbol that may satisfy a reference.

### 7.15 Candidate Set

The deterministic set of potential targets discovered before final filtering.

### 7.16 Resolution Context

The namespaces, scopes, imports, versions, profiles, language rules, and expectations governing one reference.

### 7.17 Qualified Reference

A reference containing an explicit namespace, package, module, or owner path.

### 7.18 Unqualified Reference

A reference relying on local scopes, imports, defaults, or aliases.

### 7.19 Canonical Reference

A reference directly identifying a semantic identity.

### 7.20 External Reference

A reference using an identity from an external system.

### 7.21 Resolution Outcome

The final compiler state of a reference after applicable analysis.

---

## 8. Namespace Model

A namespace conceptually contains:

```text
Namespace

├── namespace_id
├── semantic_identity
├── declared_name
├── parent_namespace
├── owning_artifact
├── owning_package
├── owning_module
├── declarations
├── child_namespaces
├── imports
├── exports
├── aliases
├── visibility
├── version_context
├── authority
├── lifecycle
├── language_context
├── extensions
├── provenance
└── diagnostics
```

Namespaces are semantic entities.

Their physical representation may span directories, files, packages, databases, or generated artifacts.

---

## 9. Namespace Identity

Every namespace must have compiler-visible identity.

Durable namespaces require stable semantic identity.

Namespace identity remains distinct from:

* directory path;
* package locator;
* module file;
* declared display name;
* registry key;
* symbol-table ID.

A directory may suggest a namespace convention, but it does not define canonical namespace identity automatically.

---

## 10. Namespace Sources

Namespaces may be:

* explicitly declared;
* inherited from artifact metadata;
* introduced by a package;
* introduced by a module;
* generated as a compilation-unit root;
* synthesized for an embedded language region;
* imported from another namespace;
* migrated from a prior namespace identity.

The source of namespace identity must remain traceable.

---

## 11. Implicit Namespace Roots

MSC may synthesize namespace roots for:

* compilation units;
* packages;
* modules;
* standalone artifacts;
* anonymous embedded regions;
* migration contexts;
* generated artifacts.

An implicit namespace must be:

* explicitly marked synthetic;
* deterministically identified;
* scoped appropriately;
* excluded from external publication unless promoted.

---

## 12. Namespace Parentage

A namespace may have one semantic parent under the ordinary hierarchical model.

Additional relationships may include:

* imported namespace;
* alias target;
* package membership;
* overlay;
* compatibility bridge;
* migration predecessor.

Parentage must remain distinct from imports and aliases.

---

## 13. Namespace Graph

The namespace graph contains:

* namespace nodes;
* declaration membership;
* parent-child edges;
* package and module ownership;
* import edges;
* export edges;
* alias edges;
* visibility constraints;
* version contexts;
* lifecycle state;
* provenance.

The graph may contain cycles through imports or aliases.

Parent-child namespace containment must remain acyclic.

---

## 14. Scope Model

A scope conceptually contains:

```text
Scope

├── scope_id
├── scope_kind
├── owner_symbol
├── namespace_id
├── parent_scopes
├── local_symbols
├── imported_symbols
├── aliases
├── visibility_context
├── version_context
├── language_context
├── profile
├── lookup_rules
├── provenance
└── diagnostics
```

---

## 15. Scope Kinds

Initial scope kinds include:

```text
global
workspace
repository
compilation_unit
package
module
namespace
artifact
specification
declaration
member
embedded_language
expression
generated
migration
historical
```

A reference may traverse several scope kinds.

---

## 16. Lexical and Semantic Scope

Lexical scope follows syntactic or structural nesting.

Semantic scope follows meaning, ownership, imports, and namespace rules.

Examples:

* a field may be structurally nested in a type and semantically owned by that type;
* an imported type may be semantically visible without lexical containment;
* a supplementary document section may be lexically separate but semantically part of one specification.

MSC must preserve both relationships where they differ.

---

## 17. Scope Graph

The scope graph represents permitted lookup transitions.

Edges may include:

```text
lexical_parent
semantic_parent
namespace_parent
owner_scope
package_scope
module_scope
artifact_scope
imported_scope
prelude_scope
historical_scope
extension_scope
```

Each edge kind has declared lookup semantics and precedence.

---

## 18. Scope Construction

Scope construction uses:

* declaration ownership;
* namespace declarations;
* package and module context;
* artifact boundaries;
* language-region boundaries;
* compilation-unit roots;
* extension rules;
* generated synthetic scopes.

Every scope must identify the rule that created it.

---

## 19. Scope Precedence

A conceptual unqualified-name lookup order may be:

```text
local member scope
    ↓
owning declaration scope
    ↓
current lexical scope
    ↓
current namespace
    ↓
explicit imports
    ↓
package or module imports
    ↓
declared prelude
    ↓
parent semantic scopes
```

The exact order is language- and profile-specific.

It must be registered, deterministic, and inspectable.

---

## 20. Prelude Scopes

A language or profile may provide a prelude containing common declarations.

A prelude must declare:

* identity;
* version;
* exported declarations;
* language applicability;
* profile applicability;
* precedence;
* authority;
* lifecycle;
* provenance.

Prelude declarations are not magical globals.

They are imported through a registered scope rule.

---

## 21. Import Model

An import conceptually contains:

```text
ImportDeclaration

├── import_id
├── source_scope
├── target_reference
├── import_mode
├── version_domain
├── version_constraint
├── selected_version
├── alias
├── member_selection
├── wildcard_policy
├── visibility
├── reexport
├── authority_policy
├── lifecycle_policy
├── required
├── resolution_state
├── provenance
└── diagnostics
```

---

## 22. Import Modes

Initial import modes include:

```text
semantic
namespace
artifact
package
module
type_only
value_only
constraint_only
policy_only
workflow_only
reference_only
extension
conformance
informative
historical
```

Import mode constrains which declarations become available and how they may be used.

---

## 23. Import Is Not Inclusion

An import does not copy source text into the importing artifact.

It establishes semantic availability.

The imported artifact or declaration retains:

* identity;
* authority;
* lifecycle;
* version;
* provenance;
* ownership.

The importer does not become the owner merely by importing.

---

## 24. Explicit Imports

Explicit imports are declared by:

* canonical import nodes;
* package manifests;
* module manifests;
* artifact metadata;
* registered language constructs.

Explicit imports should be preferred in high-assurance profiles.

---

## 25. Implicit Imports

Implicit imports may arise from:

* language preludes;
* package defaults;
* workspace policy;
* generated migration compatibility;
* embedded language host context.

Implicit imports must remain visible in the resolved scope graph.

A compiler must be able to explain them.

---

## 26. Wildcard Imports

Wildcard imports make several exported declarations available.

They may introduce:

* ambiguity;
* accidental dependency growth;
* unstable resolution after dependency changes;
* namespace pollution.

Strict profiles may prohibit wildcard imports.

When permitted, wildcard expansion must be recorded deterministically.

---

## 27. Selective Imports

A selective import identifies:

* exact declarations;
* declaration kinds;
* names;
* aliases;
* semantic identities;
* version ranges.

Selective imports are preferable where reproducibility and auditability are important.

---

## 28. Reexports

A reexport makes an imported declaration available through the importing package, module, or namespace.

A reexport must preserve:

* canonical target identity;
* original authority;
* original lifecycle;
* original version;
* original provenance;
* reexport path.

Reexporting must not strengthen authority or erase original ownership.

---

## 29. Import Authority

An import's authority governs the import declaration itself.

It does not automatically change the authority of the imported declaration.

A provisional import of an approved declaration may remain provisional in applicability.

An approved import must not convert provisional imported content into normative knowledge.

---

## 30. Import Lifecycle

The lifecycle of an import is distinct from the lifecycle of its target.

Examples:

* active import of deprecated target;
* deprecated import of active target;
* historical import of superseded target;
* draft import of approved package.

MSC must preserve both states.

---

## 31. Export Model

An export conceptually contains:

```text
ExportDeclaration

├── export_id
├── source_scope
├── exported_symbols
├── export_mode
├── alias
├── visibility
├── version
├── authority
├── lifecycle
├── provenance
└── diagnostics
```

---

## 32. Export Modes

Initial export modes include:

```text
public
package
workspace
module
namespace
type_only
interface_only
conformance
historical
alias
reexport
```

Exports must remain deterministic and versioned where applicable.

---

## 33. Default Export Policy

A package, module, or namespace may define:

* explicit exports only;
* all public declarations;
* declared kinds only;
* no exports;
* profile-specific exports.

The effective export policy must be visible.

---

## 34. Visibility Model

Initial visibility classes include:

```text
private
member
artifact
specification
module
package
namespace
workspace
repository
public
historical
```

Visibility controls lookup accessibility.

It does not define:

* confidentiality;
* data access authorization;
* publication state;
* semantic authority.

Those concerns remain separate.

---

## 35. Visibility Evaluation

Visibility evaluation considers:

* declaring scope;
* reference scope;
* owner relationships;
* package and module membership;
* namespace relationship;
* import mode;
* reexport;
* profile;
* lifecycle;
* extension rules.

A declaration may exist and still be invisible to a reference.

---

## 36. Alias Model

Aliases may target:

* namespace;
* package;
* module;
* declaration;
* member;
* import;
* external identity;
* prior semantic identity.

An alias conceptually contains:

```text
Alias

├── alias_id
├── alias_name
├── source_scope
├── target_reference
├── alias_kind
├── version
├── lifecycle
├── authority
├── resolution_state
├── provenance
└── diagnostics
```

---

## 37. Alias Kinds

Initial alias kinds include:

```text
local_name
namespace_alias
import_alias
package_alias
module_alias
member_alias
external_identity_alias
migration_alias
compatibility_alias
historical_alias
```

Aliases must preserve the canonical target.

---

## 38. Alias Chains

Aliases may form chains.

MSC must:

* preserve each alias step;
* detect cycles;
* enforce maximum depth;
* resolve the canonical target;
* retain historical aliases where applicable.

Alias chain length must not affect semantic precedence.

---

## 39. Alias Cycles

Alias cycles are invalid unless a specialized language explicitly defines a nonresolution semantic relationship.

For ordinary resolution:

```text
A → B
B → A
```

must produce a cycle diagnostic.

MSC must not choose one endpoint arbitrarily.

---

## 40. Reference Model

A reference descriptor conceptually contains:

```text
ReferenceDescriptor

├── reference_id
├── canonical_node_id
├── reference_kind
├── original_form
├── source_symbol
├── source_scope
├── namespace_context
├── import_context
├── language_context
├── profile
├── expected_target_kind
├── expected_target_type
├── version_domain
├── version_constraint
├── lifecycle_requirement
├── authority_requirement
├── visibility_requirement
├── required
├── candidate_set
├── selected_target
├── resolution_state
├── source_lineage
├── provenance
└── diagnostics
```

---

## 41. Reference Identity

Every compiler-visible reference must have reference identity.

Reference identity supports:

* incremental compilation;
* diagnostics;
* editor navigation;
* reference graphs;
* cache reuse;
* semantic diffs.

Reference identity remains distinct from its target identity.

---

## 42. Reference Kinds

Initial reference kinds include:

```text
canonical_identity
qualified_name
unqualified_name
relative_name
member
namespace
package
module
artifact
type
value
requirement
relationship_endpoint
language_unit
external_identity
alias
historical_identity
versioned_identity
extension
```

Specialized languages may define additional reference kinds.

---

## 43. Canonical Identity References

A canonical identity reference directly requests a semantic identity.

Resolution still validates:

* existence;
* version context;
* target kind;
* visibility where applicable;
* lifecycle;
* authority;
* compatibility.

Canonical identity does not bypass semantic validation.

---

## 44. Qualified References

A qualified reference includes an explicit path.

Conceptual forms:

```text
monad::msl::core::Artifact
package::module::Type
Interface.Operation
StateModel::Running
```

Qualification rules must be language-specific and registered.

---

## 45. Unqualified References

An unqualified reference relies on the active scope graph.

Examples:

```text
Artifact
User
Config
validate
```

Unqualified resolution is more sensitive to imports and namespace evolution.

Strict profiles may require qualification where ambiguity risk is high.

---

## 46. Relative References

Relative references resolve from:

* current declaration;
* current namespace;
* current module;
* current artifact;
* registered relative root.

Relative resolution must identify its starting scope explicitly.

---

## 47. Member References

A member reference identifies a declaration owned by another declaration.

Examples:

```text
Artifact.version
Interface::Operation
StateModel.Running
```

Member resolution requires:

* owner target;
* member scope;
* expected member kind;
* visibility;
* version and lifecycle compatibility.

---

## 48. External Identity References

External identity references use identifiers from external systems.

Examples:

* OpenAPI operation ID;
* Rust fully qualified path;
* Terraform resource address;
* Git object identity;
* external registry key.

Resolution uses the external identity index.

The resolved declaration retains its canonical semantic identity.

---

## 49. Historical References

Historical references intentionally identify:

* deprecated declaration;
* superseded declaration;
* archived artifact;
* prior version;
* migration predecessor.

A historical reference must not be redirected silently to the current replacement when the historical identity is semantically relevant.

---

## 50. Reference Collection

Reference collection identifies canonical nodes containing references.

It produces reference descriptors before final resolution.

Reference-producing constructs include:

* imports;
* type expressions;
* relationship endpoints;
* requirement subjects;
* constraint targets;
* policy resources;
* workflow operations;
* state transitions;
* provenance links;
* lifecycle replacement links;
* extension-defined references.

---

## 51. Resolution Context

The resolution context includes:

* source symbol;
* source scope;
* current namespace;
* package;
* module;
* artifact;
* imports;
* aliases;
* language;
* profile;
* version constraints;
* target expectations;
* lifecycle requirements;
* authority requirements;
* registry snapshot.

Equivalent contexts must produce equivalent candidate sets.

---

## 52. Candidate Discovery

Candidate discovery may query:

* local member symbols;
* lexical parent scopes;
* semantic owner scopes;
* current namespace;
* explicit imports;
* reexports;
* package exports;
* module exports;
* preludes;
* workspace indexes;
* permitted external registries;
* historical indexes;
* extension indexes.

Each candidate must preserve the path by which it became visible.

---

## 53. Candidate Path

A candidate path conceptually records:

```text
Reference Site
    ↓
Scope Transition
    ↓
Import or Alias
    ↓
Namespace or Package
    ↓
Export
    ↓
Candidate Symbol
```

The selected resolution must preserve this path.

---

## 54. Candidate Set

The candidate set preserves:

* candidate symbol;
* lookup path;
* declaration kind;
* semantic identity;
* version;
* visibility;
* lifecycle;
* authority;
* language origin;
* compatibility state;
* rejection reasons.

Rejected candidates may remain available for explanation.

---

## 55. Candidate Filtering

Candidate filtering may apply:

1. canonical identity match;
2. qualification path;
3. expected target kind;
4. import mode;
5. visibility;
6. version constraint;
7. package or module instance;
8. lifecycle requirement;
9. authority requirement;
10. language compatibility;
11. expected type where available;
12. profile rules.

Filtering order must be deterministic and documented.

---

## 56. Candidate Ranking

Ranking applies only after incompatible candidates are removed.

Ranking may consider:

* exact canonical identity;
* exact qualification;
* local declaration;
* explicit import;
* selective import;
* package-local export;
* prelude;
* deprecated fallback;
* historical fallback.

Ranking must not use:

* provider response timing;
* AST traversal order;
* filesystem path order;
* newest timestamp alone;
* probabilistic similarity alone.

---

## 57. Exact Identity Priority

A valid exact canonical identity target should outrank name-based candidates.

However, if several claimants share that identity because of an unresolved identity collision, the reference remains conflicting or ambiguous.

Exact identity cannot erase a declaration collision.

---

## 58. Locality Priority

A language may prefer declarations in a nearer scope.

Locality rules must be explicit.

A nearer but incompatible declaration must not hide a farther compatible declaration without a diagnostic or language-defined shadowing rule.

---

## 59. Shadowing

Shadowing allows a nearer declaration to hide another declaration with the same name.

A shadowing contract must define:

* eligible scopes;
* eligible declaration kinds;
* warning behavior;
* interaction with qualification;
* interaction with imports;
* lifecycle behavior;
* ambiguity behavior.

Shadowing affects name lookup.

It does not change semantic identities.

---

## 60. Version Filtering

Version filtering requires:

* version domain;
* version constraint;
* available versions;
* compatibility rules;
* package or artifact context;
* selection policy.

A bare version without domain context must be rejected where ambiguity exists.

---

## 61. Version Selection

Version selection may use:

* exact pin;
* compatible range;
* package lock;
* workspace resolution;
* artifact manifest;
* migration profile;
* explicit invocation.

The compiler must preserve:

* candidates considered;
* selected version;
* selection policy;
* rejected versions;
* compatibility result.

---

## 62. Multiple Versions

Several versions of one semantic identity may coexist if isolated by:

* package instance;
* module instance;
* namespace;
* artifact version;
* compatibility context.

The reference context determines which version is eligible.

Multiple visible compatible versions without a selection rule produce ambiguity.

---

## 63. Target-Kind Filtering

A reference may expect:

* type;
* value;
* operation;
* requirement;
* namespace;
* artifact;
* policy;
* state;
* workflow;
* diagnostic;
* extension.

A target of the wrong declaration kind cannot satisfy the reference even if its name matches.

---

## 64. Lifecycle Filtering

Lifecycle may affect target eligibility.

Examples:

* active target preferred;
* deprecated target permitted with warning;
* superseded target redirected only under declared compatibility;
* withdrawn target blocked for new normative use;
* archived target available for historical reference.

Lifecycle filtering must preserve excluded historical candidates.

---

## 65. Authority-Aware Resolution

Authority may affect applicability but must not erase lower-authority evidence.

Examples:

* machine-normative reference may require an approved target;
* analysis profile may allow provisional targets;
* reverse-engineering profile may resolve observed declarations;
* historical profile may resolve deprecated or withdrawn targets.

Authority requirements must be explicit in the reference context or active profile.

---

## 66. Cross-Language Resolution

Cross-language references require a registered integration contract declaring:

* source language;
* reference kind;
* permitted target languages;
* expected declaration kinds;
* identity mapping;
* type interaction;
* lifecycle behavior;
* KIR and MSG implications.

A language must not target arbitrary declarations from another language without a contract.

---

## 67. Extension References

Extensions may define new reference forms and lookup behavior.

They must provide:

* reference schema;
* collection rules;
* context requirements;
* candidate sources;
* filtering rules;
* target contracts;
* diagnostics;
* incremental invalidation;
* conformance fixtures.

Extensions must not bypass core identity, version, visibility, lifecycle, authority, or provenance rules.

---

## 68. Resolution Outcomes

Initial resolution outcomes include:

```text
resolved
resolved_deprecated
resolved_superseded
resolved_historical
ambiguous
conflicting
missing
invisible
incompatible_kind
incompatible_version
incompatible_language
incompatible_lifecycle
incompatible_authority
placeholder
deferred
invalid
blocked
```

---

## 69. Resolved Reference

A resolved reference must preserve:

* selected target symbol;
* selected semantic identity;
* resolution path;
* context;
* version;
* visibility decision;
* lifecycle decision;
* authority decision;
* rejected candidates;
* provenance;
* diagnostics.

---

## 70. Ambiguous Reference

A reference is ambiguous when several materially valid candidates remain.

MSC must preserve:

* all remaining candidates;
* candidate paths;
* versions;
* identities;
* authorities;
* lifecycles;
* reasons they remain eligible.

Ambiguity must not be resolved by arbitrary ranking.

---

## 71. Conflicting Reference

A reference is conflicting when it targets an unresolved identity collision or incompatible declaration set.

A conflicting reference differs from ordinary name ambiguity.

Ambiguity means several possible targets.

Conflict means the target identity or declaration itself is contested.

---

## 72. Missing Reference

A reference is missing when no candidate declaration is available.

The diagnostic should distinguish:

* artifact unavailable;
* import missing;
* version unavailable;
* declaration absent;
* provider inaccessible;
* package unresolved;
* target removed.

---

## 73. Invisible Reference

A reference is invisible when the target exists but is inaccessible from the reference scope.

Visibility errors should preserve the candidate target for explanation.

---

## 74. Placeholder Reference

A reference may bind provisionally to a placeholder when the dependency is declared but unavailable.

Placeholder binding may support partial compilation.

It cannot satisfy outputs requiring resolved semantic targets.

---

## 75. Deferred Reference

A reference may be deferred when resolution depends on:

* later package loading;
* type analysis;
* profile selection;
* feature selection;
* migration completion;
* user confirmation;
* external availability.

Deferral must identify the dependency and resume condition.

---

## 76. Deprecated Reference

A deprecated target may resolve while producing:

* warning;
* replacement suggestion;
* migration link;
* policy-specific error.

The reference remains linked to the actual deprecated target unless an explicit rewrite occurs.

---

## 77. Superseded Reference

A superseded target may have a replacement.

MSC must distinguish:

* resolving the historical target;
* following a compatibility alias;
* migrating the reference;
* resolving directly to the replacement.

These are not equivalent operations.

---

## 78. Import Resolution

Import resolution determines:

* target artifact, namespace, package, or module;
* compatible version;
* exported declarations;
* alias;
* import mode;
* visibility;
* reexport behavior;
* lifecycle;
* authority;
* dependency state.

An unresolved required import blocks dependent references.

---

## 79. Export Resolution

Export resolution determines:

* declarations eligible for export;
* aliases;
* visibility;
* reexports;
* versioned export surface;
* deprecated exports;
* historical exports.

Export surfaces should be fingerprinted for incrementality.

---

## 80. Import Graph

The import graph contains:

* importing scope;
* imported artifact or scope;
* import mode;
* version;
* alias;
* reexport status;
* required status;
* lifecycle;
* authority;
* provenance.

Import cycles are preserved for classification.

---

## 81. Import Cycles

Import cycles may be:

* valid;
* conditionally valid;
* invalid.

Examples:

* mutually referencing type modules may be valid under fixed-point type analysis;
* configuration imports may be invalid;
* package initialization cycles may be prohibited;
* historical references may form benign cycles.

MSC must classify cycles using package, language, and profile rules.

It must not break cycles arbitrarily.

---

## 82. Namespace Cycles

Namespace parentage cycles are invalid.

Alias and import edges may cycle but must be bounded and classified.

Containment such as:

```text
namespace A parent B
namespace B parent A
```

must fail namespace construction.

---

## 83. Reference Graph

The resolved-reference graph contains:

* reference nodes;
* source symbols;
* selected target symbols;
* candidate edges;
* resolution paths;
* unresolved states;
* ambiguous sets;
* conflict links;
* dependency links;
* provenance.

This graph is a compiler semantic artifact.

It remains distinct from MSG.

---

## 84. Reference Graph Versus MSG

The reference graph is optimized for compiler binding and diagnostics.

MSG records durable resolved semantic relationships.

Compiler-only elements may include:

* rejected candidates;
* lookup paths;
* placeholder bindings;
* error references;
* temporary deferred references;
* shadowing records.

Only valid or explicitly represented incomplete semantics are promoted into MSG.

---

## 85. Resolution Barrier

Before type and constraint analysis, the resolution barrier requires:

* namespace graph constructed;
* scope graph constructed;
* imports resolved or explicitly incomplete;
* exports indexed;
* aliases expanded or diagnosed;
* all required references collected;
* reference descriptors validated;
* candidate sets constructed;
* resolution outcomes assigned;
* blocking ambiguities and conflicts identified;
* reference snapshot frozen or fingerprinted.

---

## 86. Partial Resolution

A partial reference snapshot may contain:

* resolved references;
* unresolved references;
* deferred references;
* placeholders;
* ambiguous references;
* blocked imports;
* unavailable dependencies.

It must declare which downstream analyses remain permitted.

---

## 87. Deterministic Resolution

Equivalent:

* bound declaration snapshot;
* namespace graph;
* import graph;
* package context;
* registry snapshot;
* language rules;
* profile;
* version policy;
* extension set;

must produce semantically equivalent reference outcomes.

---

## 88. Stable Candidate Ordering

Candidate sets should be serialized using stable keys such as:

1. semantic identity;
2. declaration kind;
3. package and module identity;
4. version;
5. resolution path;
6. symbol identity.

Stable ordering supports reproducibility.

It does not establish precedence unless the language contract says so.

---

## 89. Incremental Namespace Resolution

Namespace invalidation may result from changes to:

* namespace identity;
* parentage;
* ownership;
* package membership;
* module membership;
* visibility;
* exports;
* aliases;
* lifecycle;
* authority.

Affected scope and reference results must be recomputed.

---

## 90. Incremental Import Resolution

Import invalidation may result from:

* target identity;
* version constraint;
* lock state;
* import mode;
* alias;
* member selection;
* target export surface;
* lifecycle;
* authority;
* package availability.

Only dependent reference contexts should rerun where safe.

---

## 91. Incremental Reference Resolution

A reference must be invalidated when changes affect:

* source scope;
* original form;
* expected target kind;
* imports;
* aliases;
* candidate declarations;
* visibility;
* version;
* lifecycle;
* authority;
* language contract;
* profile.

---

## 92. Negative Resolution Caching

MSC may cache missing or incompatible resolution results.

Negative cache validity must include:

* declaration index;
* scope graph;
* import graph;
* registry state;
* package state;
* version policy;
* profile.

A newly available declaration or import must invalidate the negative result.

---

## 93. Resolution Fingerprints

Reference-resolution fingerprints may include:

* reference descriptor;
* source scope;
* namespace graph fingerprint;
* import graph fingerprint;
* export-surface fingerprints;
* alias graph fingerprint;
* symbol snapshot fingerprint;
* version policy;
* profile;
* language and extension versions.

---

## 94. Explanation Support

MSC should explain:

* which scope lookup began in;
* which scopes were searched;
* which imports participated;
* which aliases expanded;
* which candidates were found;
* why candidates were rejected;
* why one target was selected;
* why ambiguity remained;
* why a target was invisible;
* why a version failed;
* why a deprecated target resolved;
* why a reference was deferred.

---

## 95. Reference Diagnostics

Reference diagnostics must associate with:

* reference descriptor;
* canonical node;
* source symbol;
* source scope;
* candidate set;
* selected target;
* import path;
* alias chain;
* package or module;
* source location;
* provenance.

---

## 96. Security and Trust Considerations

Namespace and reference resolution are vulnerable to:

* namespace squatting;
* dependency confusion;
* alias spoofing;
* malicious reexports;
* visibility bypass;
* version substitution;
* stale lock state;
* registry poisoning;
* identity collision suppression;
* package shadowing;
* import explosion;
* cycle denial of service;
* historical-reference laundering;
* authority escalation;
* external identity spoofing.

MSC must preserve candidate evidence and validate every resolution path.

---

## 97. Resource Controls

Resource policies may limit:

* namespace count;
* scope count;
* imports per scope;
* alias-chain length;
* candidate-set size;
* lookup depth;
* import-closure depth;
* cycle-analysis size;
* external registry queries;
* resolution retries.

Exceeding a limit produces structured partial or blocking diagnostics.

---

## 98. Namespace Conformance

Namespace conformance evaluates:

* stable identity;
* parentage;
* ownership;
* acyclic containment;
* declared scopes;
* visibility;
* imports;
* exports;
* aliases;
* provenance;
* deterministic graph construction.

---

## 99. Import Conformance

Import conformance evaluates:

* target identity;
* version domain;
* version constraint;
* import mode;
* alias;
* visibility;
* selected export surface;
* lifecycle;
* authority;
* dependency state;
* provenance.

---

## 100. Reference Conformance

Reference conformance evaluates:

* descriptor validity;
* identity;
* source context;
* candidate discovery;
* filtering;
* target kind;
* visibility;
* version;
* lifecycle;
* authority;
* language compatibility;
* resolution outcome;
* lineage;
* deterministic behavior.

---

## 101. Normative Requirements

### MSC-RESOLVE-REQ-001

MSC **MUST** construct explicit namespace and scope graphs before final common reference resolution.

### MSC-RESOLVE-REQ-002

Namespace identity **MUST** remain distinct from filesystem path, package locator, module file, display name, and symbol identity.

### MSC-RESOLVE-REQ-003

Every namespace **MUST** have compiler-visible identity and provenance.

### MSC-RESOLVE-REQ-004

Durable namespaces **MUST** have stable semantic identity.

### MSC-RESOLVE-REQ-005

Synthetic namespaces and scopes **MUST** identify the compiler rule that created them.

### MSC-RESOLVE-REQ-006

Namespace containment **MUST** remain distinct from imports, aliases, ownership, and package membership.

### MSC-RESOLVE-REQ-007

Namespace parentage cycles **MUST** be rejected.

### MSC-RESOLVE-REQ-008

Every scope **MUST** identify its kind, owner, namespace, lookup rules, language context, and provenance.

### MSC-RESOLVE-REQ-009

Lexical and semantic scope **MUST** remain distinguishable where they differ.

### MSC-RESOLVE-REQ-010

Scope lookup precedence **MUST** be registered, deterministic, and inspectable.

### MSC-RESOLVE-REQ-011

Prelude declarations **MUST** enter scope through explicit registered rules.

### MSC-RESOLVE-REQ-012

Every import **MUST** have compiler-visible identity.

### MSC-RESOLVE-REQ-013

Every import **MUST** declare target reference, import mode, version domain, version constraint, visibility, required status, authority policy, lifecycle policy, and provenance where applicable.

### MSC-RESOLVE-REQ-014

Import **MUST NOT** be modeled as source-text inclusion.

### MSC-RESOLVE-REQ-015

Imported declarations **MUST** retain canonical identity, ownership, authority, lifecycle, version, and provenance.

### MSC-RESOLVE-REQ-016

Implicit imports **MUST** remain visible in the scope and import graphs.

### MSC-RESOLVE-REQ-017

Wildcard import expansion **MUST** be deterministic and recorded.

### MSC-RESOLVE-REQ-018

Profiles **MAY** prohibit wildcard imports.

### MSC-RESOLVE-REQ-019

Reexports **MUST** preserve the original target identity and provenance.

### MSC-RESOLVE-REQ-020

Reexports **MUST NOT** strengthen imported declaration authority.

### MSC-RESOLVE-REQ-021

Import lifecycle **MUST** remain distinct from target lifecycle.

### MSC-RESOLVE-REQ-022

Every export **MUST** identify its source scope, exported symbols, visibility, authority, lifecycle, version, and provenance.

### MSC-RESOLVE-REQ-023

Effective export policy **MUST** be inspectable.

### MSC-RESOLVE-REQ-024

Visibility **MUST** remain distinct from confidentiality, access authorization, publication, and semantic authority.

### MSC-RESOLVE-REQ-025

Every alias **MUST** preserve its canonical target and alias provenance.

### MSC-RESOLVE-REQ-026

Alias chains **MUST** be bounded and traceable.

### MSC-RESOLVE-REQ-027

Alias cycles **MUST** produce deterministic diagnostics.

### MSC-RESOLVE-REQ-028

Every compiler-visible reference **MUST** have reference identity.

### MSC-RESOLVE-REQ-029

Every reference descriptor **MUST** preserve original form, source symbol, source scope, namespace context, language context, profile, target expectations, version context, required status, and provenance.

### MSC-RESOLVE-REQ-030

Reference identity **MUST** remain distinct from selected target identity.

### MSC-RESOLVE-REQ-031

Reference collection **MUST** use registered canonical-node, language, and extension contracts.

### MSC-RESOLVE-REQ-032

Unknown required reference-producing constructs **MUST** block complete resolution.

### MSC-RESOLVE-REQ-033

Equivalent resolution contexts **MUST** produce equivalent candidate sets.

### MSC-RESOLVE-REQ-034

Every candidate **MUST** preserve the lookup path through which it became visible.

### MSC-RESOLVE-REQ-035

Candidate sets **MUST** preserve materially relevant rejected candidates and rejection reasons for explanation.

### MSC-RESOLVE-REQ-036

Candidate filtering **MUST** validate target kind, visibility, version, lifecycle, authority, language compatibility, and applicable profile rules.

### MSC-RESOLVE-REQ-037

Candidate selection **MUST NOT** depend on provider response timing, AST traversal order, filesystem ordering, or registration order.

### MSC-RESOLVE-REQ-038

Probabilistic similarity **MUST NOT** select an authoritative reference target silently.

### MSC-RESOLVE-REQ-039

An exact canonical identity reference **MUST NOT** conceal an unresolved semantic identity collision.

### MSC-RESOLVE-REQ-040

Shadowing **MUST** occur only under registered language rules.

### MSC-RESOLVE-REQ-041

Version constraints **MUST** identify their version domain where ambiguity is possible.

### MSC-RESOLVE-REQ-042

Version selection **MUST** preserve candidates, policy, selected version, rejected versions, and compatibility results.

### MSC-RESOLVE-REQ-043

Multiple visible compatible versions without a deterministic selection rule **MUST** produce ambiguity.

### MSC-RESOLVE-REQ-044

Targets of incompatible declaration kinds **MUST NOT** satisfy a reference.

### MSC-RESOLVE-REQ-045

Lifecycle filtering **MUST** preserve deprecated, superseded, withdrawn, archived, and historical candidates for explanation.

### MSC-RESOLVE-REQ-046

Authority-aware resolution **MUST NOT** erase lower-authority evidence or competing candidates.

### MSC-RESOLVE-REQ-047

Cross-language references **MUST** use registered source-language and target-language integration contracts.

### MSC-RESOLVE-REQ-048

Extension-defined reference resolution **MUST NOT** bypass core identity, visibility, version, lifecycle, authority, provenance, or determinism requirements.

### MSC-RESOLVE-REQ-049

A resolved reference **MUST** preserve target, resolution path, context, selected version, visibility decision, lifecycle decision, authority decision, rejected candidates, and provenance.

### MSC-RESOLVE-REQ-050

Materially ambiguous references **MUST NOT** be resolved silently.

### MSC-RESOLVE-REQ-051

Ambiguous references **MUST** preserve every materially valid remaining candidate and lookup path.

### MSC-RESOLVE-REQ-052

References to unresolved identity collisions **MUST** remain conflicting.

### MSC-RESOLVE-REQ-053

Missing, invisible, incompatible, placeholder, deferred, ambiguous, conflicting, deprecated, superseded, and historical reference states **MUST** remain distinct.

### MSC-RESOLVE-REQ-054

Placeholder references **MUST NOT** satisfy outputs requiring resolved semantic targets.

### MSC-RESOLVE-REQ-055

Deferred references **MUST** identify the dependency and condition required for resumed resolution.

### MSC-RESOLVE-REQ-056

Deprecated references **MUST** preserve the actual deprecated target and applicable replacement guidance.

### MSC-RESOLVE-REQ-057

Supersession resolution, compatibility redirection, and reference migration **MUST** remain distinct operations.

### MSC-RESOLVE-REQ-058

Required unresolved imports **MUST** block dependent references.

### MSC-RESOLVE-REQ-059

Import and alias cycles **MUST** be preserved and classified rather than broken arbitrarily.

### MSC-RESOLVE-REQ-060

Unsupported cyclic import models **MUST** block dependent analysis.

### MSC-RESOLVE-REQ-061

The reference graph **MUST** remain distinct from the durable Monad Semantic Graph.

### MSC-RESOLVE-REQ-062

Compiler-only rejected candidates, lookup paths, error references, and temporary placeholders **MUST NOT** become successful durable MSG semantics.

### MSC-RESOLVE-REQ-063

The resolution barrier **MUST** require complete reference collection and explicit outcomes for all required references.

### MSC-RESOLVE-REQ-064

Partial resolution snapshots **MUST** identify permitted and blocked downstream analyses.

### MSC-RESOLVE-REQ-065

Reference-resolution snapshots **MUST** be frozen, immutable, or completely fingerprinted before dependent semantic analysis.

### MSC-RESOLVE-REQ-066

Equivalent deterministic inputs **MUST** produce semantically equivalent namespace, import, alias, and reference results.

### MSC-RESOLVE-REQ-067

Incremental invalidation **MUST** include relevant changes to namespaces, scopes, imports, exports, aliases, declarations, versions, lifecycle, authority, profiles, languages, and extensions.

### MSC-RESOLVE-REQ-068

Negative resolution caches **MUST** be invalidated when candidate availability or lookup context changes.

### MSC-RESOLVE-REQ-069

Every resolved reference **MUST** remain traceable to canonical AST, source artifacts, symbol snapshots, scope transitions, imports, aliases, and target declarations.

### MSC-RESOLVE-REQ-070

Compiler explanations **MUST** be derivable for scope traversal, import participation, alias expansion, candidate discovery, rejection, selection, ambiguity, invisibility, version failure, and deferral.

---

## 102. Conceptual Model

```text
Bound Declaration Snapshot
        │
        ▼
Namespace Builder
├── explicit namespaces
├── package namespaces
├── module namespaces
├── synthetic roots
└── parentage
        │
        ▼
Scope Graph Builder
├── lexical scopes
├── semantic scopes
├── owner scopes
├── artifact scopes
├── language scopes
└── prelude scopes
        │
        ▼
Import and Export Resolver
├── target resolution
├── version selection
├── export surfaces
├── aliases
├── reexports
└── dependency cycles
        │
        ▼
Reference Collector
├── imports
├── types
├── members
├── relationships
├── constraints
├── policies
└── extensions
        │
        ▼
Candidate Resolver
├── scope traversal
├── import traversal
├── alias expansion
├── version filtering
├── kind filtering
├── visibility
├── lifecycle
├── authority
└── language contracts
        │
        ▼
Reference Graph
├── resolved
├── ambiguous
├── conflicting
├── missing
├── invisible
├── placeholder
├── deferred
├── deprecated
└── superseded
        │
        ▼
Resolution Barrier
        │
        ▼
Type, Constraint, and Semantic Analysis
```

---

## 103. Machine Specification

```yaml
machine_spec:
  kind: namespace_import_and_reference_resolution

  namespace:
    required:
      - namespace_id
      - semantic_identity
      - declarations
      - imports
      - exports
      - aliases
      - visibility
      - authority
      - lifecycle
      - provenance

  scope_kinds:
    - global
    - workspace
    - repository
    - compilation_unit
    - package
    - module
    - namespace
    - artifact
    - specification
    - declaration
    - member
    - embedded_language
    - expression
    - generated
    - migration
    - historical

  scope_edges:
    - lexical_parent
    - semantic_parent
    - namespace_parent
    - owner_scope
    - package_scope
    - module_scope
    - artifact_scope
    - imported_scope
    - prelude_scope
    - historical_scope
    - extension_scope

  import_modes:
    - semantic
    - namespace
    - artifact
    - package
    - module
    - type_only
    - value_only
    - constraint_only
    - policy_only
    - workflow_only
    - reference_only
    - extension
    - conformance
    - informative
    - historical

  export_modes:
    - public
    - package
    - workspace
    - module
    - namespace
    - type_only
    - interface_only
    - conformance
    - historical
    - alias
    - reexport

  visibility:
    - private
    - member
    - artifact
    - specification
    - module
    - package
    - namespace
    - workspace
    - repository
    - public
    - historical

  alias_kinds:
    - local_name
    - namespace_alias
    - import_alias
    - package_alias
    - module_alias
    - member_alias
    - external_identity_alias
    - migration_alias
    - compatibility_alias
    - historical_alias

  reference_kinds:
    - canonical_identity
    - qualified_name
    - unqualified_name
    - relative_name
    - member
    - namespace
    - package
    - module
    - artifact
    - type
    - value
    - requirement
    - relationship_endpoint
    - language_unit
    - external_identity
    - alias
    - historical_identity
    - versioned_identity
    - extension

  resolution_outcomes:
    - resolved
    - resolved_deprecated
    - resolved_superseded
    - resolved_historical
    - ambiguous
    - conflicting
    - missing
    - invisible
    - incompatible_kind
    - incompatible_version
    - incompatible_language
    - incompatible_lifecycle
    - incompatible_authority
    - placeholder
    - deferred
    - invalid
    - blocked

  candidate_filters:
    - canonical_identity
    - qualification
    - expected_target_kind
    - import_mode
    - visibility
    - version
    - package_instance
    - module_instance
    - lifecycle
    - authority
    - language_compatibility
    - expected_type
    - profile

  resolution_pipeline:
    - construct_namespaces
    - construct_scopes
    - resolve_namespace_parentage
    - resolve_import_targets
    - build_export_surfaces
    - construct_alias_graph
    - classify_cycles
    - collect_references
    - build_reference_descriptors
    - discover_candidates
    - filter_candidates
    - rank_compatible_candidates
    - assign_resolution_outcomes
    - build_reference_graph
    - validate_resolution_barrier
    - freeze_reference_snapshot
```

---

## 104. Invariants

```yaml
invariants:
  - id: MSC-RESOLVE-INV-001
    expression: namespace.semantic_identity != namespace.filesystem_path
    description: Namespace meaning is independent from storage layout.

  - id: MSC-RESOLVE-INV-002
    expression: namespace_parentage.cycle == false
    description: Namespace containment remains acyclic.

  - id: MSC-RESOLVE-INV-003
    expression: lexical_scope != semantic_scope
    description: Syntax and semantic visibility remain distinct concepts.

  - id: MSC-RESOLVE-INV-004
    expression: import.copies_semantic_ownership == false
    description: Importing does not transfer declaration ownership.

  - id: MSC-RESOLVE-INV-005
    expression: reexport.strengthens_authority == false
    description: Reexporting cannot elevate knowledge.

  - id: MSC-RESOLVE-INV-006
    expression: visibility == confidentiality
    description: Visibility and access security remain separate.
    expected: false

  - id: MSC-RESOLVE-INV-007
    expression: alias.canonical_target != null
    description: Every resolved alias preserves its canonical target.

  - id: MSC-RESOLVE-INV-008
    expression: ordinary_alias_graph.cycle == false
    description: Alias lookup remains terminating.

  - id: MSC-RESOLVE-INV-009
    expression: reference.reference_id != reference.selected_target.semantic_identity
    description: Reference identity and target identity remain distinct.

  - id: MSC-RESOLVE-INV-010
    expression: candidate.discovery_path != null
    description: Candidate visibility is explainable.

  - id: MSC-RESOLVE-INV-011
    expression: candidate_selection.depends_on_runtime_order == false
    description: Execution timing cannot determine meaning.

  - id: MSC-RESOLVE-INV-012
    expression: exact_identity_reference.hides_identity_collision == false
    description: Direct identity does not erase contested declarations.

  - id: MSC-RESOLVE-INV-013
    expression: ambiguous_reference.silently_selected == false
    description: Material ambiguity remains explicit.

  - id: MSC-RESOLVE-INV-014
    expression: placeholder_reference.is_resolved == false
    description: Unavailable dependencies cannot masquerade as targets.

  - id: MSC-RESOLVE-INV-015
    expression: deprecated_reference.target_preserved == true
    description: Deprecation guidance does not rewrite history.

  - id: MSC-RESOLVE-INV-016
    expression: lower_authority_candidate.erased == false
    description: Authority filters preserve evidence.

  - id: MSC-RESOLVE-INV-017
    expression: resolution_snapshot.mutable_after_barrier == false
    description: Semantic analysis consumes stable resolution state.

  - id: MSC-RESOLVE-INV-018
    expression: resolved_reference.lineage_complete == true
    description: Every resolution remains traceable through scopes and artifacts.
```

---

## 105. Diagnostics

### MSC0501 — Namespace Identity Missing

A namespace lacks compiler-visible or required semantic identity.

### MSC0502 — Namespace Parent Missing

A nested namespace lacks a valid parent under the active model.

### MSC0503 — Namespace Parentage Cycle

Namespace containment forms an invalid cycle.

### MSC0504 — Synthetic Namespace Rule Missing

MSC created or requires an implicit namespace without a registered deterministic rule.

### MSC0505 — Scope Construction Failed

A declaration or reference cannot be assigned to a valid lookup scope.

### MSC0506 — Scope Lookup Rule Missing

A scope kind lacks deterministic lookup and precedence rules.

### MSC0507 — Prelude Unavailable

A required language or profile prelude cannot be resolved.

### MSC0508 — Import Declaration Invalid

An import lacks target, mode, version, visibility, required status, authority, lifecycle, or provenance information.

### MSC0509 — Import Target Missing

The imported artifact, package, module, namespace, or declaration cannot be found.

### MSC0510 — Import Target Ambiguous

Several candidate import targets remain.

### MSC0511 — Import Version Domain Missing

An import version constraint does not identify the applicable version domain.

### MSC0512 — Import Version Conflict

No available version satisfies the import constraint and compatibility policy.

### MSC0513 — Import Mode Incompatible

The selected target cannot participate under the declared import mode.

### MSC0514 — Wildcard Import Prohibited

The active profile prohibits wildcard imports.

### MSC0515 — Wildcard Import Ambiguous

Wildcard expansion introduces materially ambiguous declarations.

### MSC0516 — Reexport Authority Escalation

A reexport attempts to strengthen target authority.

### MSC0517 — Export Declaration Invalid

An export lacks valid source scope, exported symbols, visibility, authority, lifecycle, or provenance.

### MSC0518 — Export Target Invisible

A declaration cannot be exported from the current scope.

### MSC0519 — Alias Target Missing

An alias cannot resolve to a canonical target.

### MSC0520 — Alias Target Ambiguous

An alias resolves to several candidate targets.

### MSC0521 — Alias Cycle

Alias expansion forms an unsupported cycle.

### MSC0522 — Alias Depth Limit Exceeded

Alias expansion exceeded configured bounds.

### MSC0523 — Reference Descriptor Invalid

A reference lacks identity, original form, source context, target expectations, or provenance.

### MSC0524 — Reference Target Missing

No candidate satisfies the reference.

### MSC0525 — Reference Target Ambiguous

Several materially valid candidates remain after filtering.

### MSC0526 — Reference Target Conflicting

The reference targets an unresolved semantic identity collision.

### MSC0527 — Reference Target Invisible

A matching declaration exists but is not visible from the source scope.

### MSC0528 — Reference Target Kind Mismatch

Candidates exist, but none has a compatible declaration kind.

### MSC0529 — Reference Version Mismatch

Candidates exist, but none satisfies the required version constraint.

### MSC0530 — Reference Language Contract Missing

A cross-language reference lacks a registered integration contract.

### MSC0531 — Reference Language Incompatible

The target language or declaration does not satisfy the source language's reference contract.

### MSC0532 — Reference Lifecycle Incompatible

A candidate exists but cannot be used under the required lifecycle policy.

### MSC0533 — Reference Authority Incompatible

A candidate exists but lacks authority required by the reference or active profile.

### MSC0534 — Placeholder Reference

The reference binds only to an unavailable placeholder declaration.

### MSC0535 — Deferred Reference

Resolution is postponed pending a declared dependency or condition.

### MSC0536 — Deprecated Reference

The selected target is deprecated.

### MSC0537 — Superseded Reference

The selected target is superseded and has replacement or migration information.

### MSC0538 — Import Cycle Unsupported

The import graph contains a cycle unsupported by active language or package rules.

### MSC0539 — Import Cycle Requires Fixed Point

An import cycle requires later bounded mutual semantic analysis.

### MSC0540 — Reference Candidate Limit Exceeded

Candidate discovery exceeded configured limits.

### MSC0541 — Scope Lookup Depth Exceeded

Resolution exceeded permitted scope traversal depth.

### MSC0542 — Reference Graph Inconsistent

Reference nodes, candidates, targets, paths, or outcomes are internally inconsistent.

### MSC0543 — Resolution Snapshot Incomplete

The snapshot omits required namespaces, scopes, imports, aliases, references, outcomes, fingerprints, diagnostics, or provenance.

### MSC0544 — Resolution Snapshot Mutated

A downstream phase observed undeclared mutation after the resolution barrier.

### MSC0545 — Negative Resolution Cache Stale

A prior missing or incompatible result was reused after candidate availability or context changed.

### MSC0546 — Resolution Invalidation Incomplete

A namespace, import, alias, declaration, visibility, version, lifecycle, authority, language, or profile change did not invalidate affected references.

### MSC0547 — Historical Reference Redirected

A historical reference was silently rewritten to a current replacement.

### MSC0548 — Shadowing Rule Missing

A nearer declaration hides another candidate without a registered shadowing rule.

### MSC0549 — Resolution Barrier Failed

Namespace, import, alias, or reference state is not ready for semantic analysis.

### MSC0550 — Resolution Explanation Unavailable

MSC cannot explain scope traversal, candidate discovery, filtering, selection, ambiguity, invisibility, version failure, or deferral.

---

## 106. Acceptance Criteria

This specification is satisfied when:

1. namespace identity is independent from storage layout;
2. namespace, scope, package, module, artifact, and ownership relationships remain distinct;
3. lexical and semantic scopes are represented;
4. scope-graph construction and lookup precedence are deterministic;
5. preludes enter through explicit registered rules;
6. imports preserve identity, ownership, authority, lifecycle, version, and provenance;
7. imports are not textual inclusion;
8. explicit, implicit, wildcard, selective, and reexport behavior are defined;
9. export surfaces are versioned and inspectable;
10. visibility remains distinct from access control and authority;
11. aliases preserve canonical targets and detect cycles;
12. every reference has identity and a structured descriptor;
13. canonical, qualified, unqualified, relative, member, external, and historical references are represented;
14. candidate discovery preserves lookup paths;
15. candidate filtering validates kind, visibility, version, lifecycle, authority, language, and profile;
16. selection is independent from execution and provider ordering;
17. exact identity references do not suppress identity collisions;
18. ambiguity and conflict remain distinct;
19. missing, invisible, incompatible, placeholder, deferred, deprecated, superseded, and historical outcomes remain distinct;
20. import and alias cycles are classified rather than broken arbitrarily;
21. reference graphs remain distinct from MSG;
22. resolution barriers protect type and semantic analysis;
23. partial resolution is explicit;
24. incremental invalidation includes all relevant scope and semantic context;
25. negative caches are invalidated correctly;
26. every resolution remains explainable and traceable;
27. later type, constraint, MSG, and KIR specifications can consume a stable resolution contract.

---

## 107. Conformance Examples

### 107.1 Valid Namespace Declaration

```yaml
namespace:
  id: monad::msc
  name: msc
  parent: monad
  visibility: public
  lifecycle: draft
```

The namespace identity remains independent from `specifications/MSC`.

### 107.2 Invalid Directory Namespace

```yaml
namespace:
  id: specifications/MSC/core
```

Expected diagnostic:

```text
MSC0501: filesystem path cannot serve as canonical namespace identity
```

### 107.3 Valid Selective Import

```yaml
import:
  id: import:msl-types
  target: monad::msl::type
  mode: type_only
  members:
    - ArtifactId
    - SemanticVersion
  version_domain: artifact
  version: "^0.1.0"
  visibility: module
```

### 107.4 Invalid Authority Escalation Through Reexport

Imported declaration:

```yaml
authority: provisional
```

Reexport:

```yaml
authority: machine_normative
```

Expected diagnostic:

```text
MSC0516: reexport cannot strengthen imported declaration authority
```

### 107.5 Valid Namespace Alias

```yaml
alias:
  name: types
  kind: namespace_alias
  target: monad::msl::type
```

A reference to `types::ArtifactId` retains the canonical target `monad::msl::type::ArtifactId`.

### 107.6 Invalid Alias Cycle

```text
A → B
B → C
C → A
```

Expected diagnostic:

```text
MSC0521: alias expansion contains a cycle
```

### 107.7 Valid Unqualified Reference

Reference:

```yaml
reference:
  original_form: ArtifactId
  kind: unqualified_name
  expected_target_kind: type
```

Candidate search:

```text
local scope
→ current namespace
→ explicit type import
→ monad::msl::type::ArtifactId
```

The complete lookup path is retained.

### 107.8 Invalid Arbitrary Candidate Selection

Two imported packages export compatible declarations named `Config`.

MSC selects the first package loaded.

Expected diagnostic:

```text
MSC0525: reference Config remains ambiguous
```

### 107.9 Valid Canonical Reference to Collision

Reference:

```yaml
reference:
  original_form: monad::Artifact
  kind: canonical_identity
```

Two incompatible declarations claim `monad::Artifact`.

Expected diagnostic:

```text
MSC0526: canonical identity monad::Artifact has unresolved declaration claimants
```

### 107.10 Valid Placeholder Resolution

```yaml
reference:
  original_form: MSL-TYPE-0001
  resolution_state: placeholder
  selected_target: placeholder:MSL-TYPE-0001
```

The compiler may continue partially but cannot perform complete dependent type analysis.

### 107.11 Valid Deprecated Reference

```yaml
reference:
  original_form: OLD-ARTIFACT-TYPE
  resolution_state: resolved_deprecated
  selected_target: OLD-ARTIFACT-TYPE
  replacement: ARTIFACT-TYPE
```

The reference still identifies the deprecated declaration.

### 107.12 Invalid Historical Redirect

A migration document explicitly references version `1.0.0`, but MSC silently binds it to `2.0.0`.

Expected diagnostic:

```text
MSC0547: historical reference must not be redirected without an explicit migration operation
```

### 107.13 Valid Cross-Language Reference

Constraint Language reference:

```text
artifact.version >= MinimumVersion
```

`MinimumVersion` resolves to a Value Language or Type Language declaration through a registered MSL cross-language contract.

### 107.14 Invalid Cross-Language Guess

A workflow operation name resembles a policy rule name, so MSC binds them using semantic similarity.

Expected diagnostic:

```text
MSC0530: no registered cross-language reference contract permits this binding
```

### 107.15 Valid Import Cycle Requiring Fixed Point

```text
module A imports type B
module B imports type A
```

The language permits mutual type declarations.

MSC records:

```yaml
cycle:
  classification: fixed_point_required
  maximum_iterations: 32
```

### 107.16 Invalid Resolution Snapshot Mutation

Type analysis begins and a plugin injects an additional import into the active scope graph.

Expected diagnostic:

```text
MSC0544: resolution snapshot changed after the barrier
```

---

## 108. Security and Trust Considerations

Namespace and reference resolution control which declarations influence compiled meaning.

Threats include:

* namespace hijacking;
* dependency confusion;
* malicious package shadowing;
* reexport laundering;
* visibility bypass;
* authority escalation;
* lifecycle bypass;
* alias poisoning;
* import graph explosion;
* historical-identity rewriting;
* registry substitution;
* stale negative caches;
* external identity spoofing;
* ambiguous-target suppression.

Implementations should:

* pin namespace, package, module, and registry identities;
* validate import and export surfaces;
* preserve candidate and rejection evidence;
* reject arbitrary ranking;
* bound scope, alias, import, and candidate traversal;
* keep authority separate from provider trust;
* preserve historical identities;
* fingerprint scope and import graphs;
* invalidate negative caches aggressively when context changes;
* sandbox extension-defined lookup behavior;
* freeze resolution snapshots before dependent analysis.

---

## 109. Evolution and Compatibility

The namespace and resolution architecture may evolve through:

* full package solving;
* persistent scope graphs;
* distributed registries;
* version-lock artifacts;
* language-specific shadowing models;
* richer visibility categories;
* capability-based imports;
* symbolic query APIs;
* lazy reference loading;
* remote semantic indexes.

Compatible changes may add optional scope or reference metadata.

Breaking changes include:

* changing namespace identity;
* changing scope precedence;
* changing import semantics;
* changing export visibility;
* changing alias behavior;
* changing candidate filtering;
* changing version selection;
* changing lifecycle or authority resolution;
* changing resolution outcomes;
* changing the resolution barrier.

Breaking changes require:

* MSC version updates;
* scope-graph migration;
* reference-cache invalidation;
* package-lock reevaluation;
* conformance-fixture updates;
* downstream MSG and KIR compatibility analysis.

---

## 110. Open Questions

1. What concrete syntax should MSL use for namespaces and imports?
2. Should namespaces always be declarations and MART artifacts?
3. Which scope kinds are required for the first compiler implementation?
4. Should workspace and repository scopes participate in semantic lookup by default?
5. What default visibility should declarations receive?
6. Should wildcard imports be disabled in strict mode from the beginning?
7. How should package lock state be represented?
8. What version-solving algorithm should bootstrap MSC use?
9. Should the compiler support several package instances of one versioned identity?
10. How should reexports appear in MSG?
11. Which aliases are durable semantic artifacts?
12. Should migration aliases expire?
13. How should shadowing work across MSL-family languages?
14. Which references require canonical identities rather than names?
15. Should requirement references permit unqualified lookup?
16. How should reference candidate sets be exposed to editors?
17. Should missing-reference results be cached?
18. How should scope graph snapshots be serialized?
19. What is the minimum reference graph schema?
20. How should external registries participate in offline resolution?
21. When may a superseded target redirect automatically?
22. Which lifecycle states block machine-normative use by default?
23. Should authority filtering occur before or after type filtering?
24. How should cyclic type imports integrate with fixed-point type analysis?
25. Which resolution invariants should be implemented first?

---

## 111. Related Specifications

This document is extended by:

| ID            | Title                                             |
| ------------- | ------------------------------------------------- |
| MSC-CORE-0007 | Type, Constraint, and Semantic Analysis           |
| MSC-CORE-0008 | Semantic Graph Construction                       |
| MSC-CORE-0009 | Diagnostics, Incrementality, and Reproducibility  |
| MSC-CORE-0010 | KIR Lowering, Backend Contracts, and Self-Hosting |

Future companion series should include:

| Series        | Purpose                                                      |
| ------------- | ------------------------------------------------------------ |
| MSC-NAMESPACE | Namespace and scope graph schemas                            |
| MSC-REFERENCE | Reference descriptors, candidates, binding, and APIs         |
| MSC-PACKAGE   | Package, module, version, import, and export resolution      |
| MSL-PACKAGE   | Author-facing package and module language                    |
| MSL-TYPE      | Type references and member lookup                            |
| MSL-EXPR      | Expression scope and value references                        |
| MART-CORE     | Namespace, package, import, export, and resolution artifacts |
| MSG-CORE      | Durable resolved semantic relationships                      |
| KIR-CORE      | Lowered references and linkage                               |
| MKE           | Persistent namespace and reference indexes                   |

---

## Status

Draft.

This document defines the deterministic, version-aware, lifecycle-aware, authority-aware, and provenance-preserving namespace, import, export, alias, scope, and reference-resolution architecture of MSC.

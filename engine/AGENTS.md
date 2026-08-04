# Monad Engine Agent Instructions

## Scope

These instructions apply to files under `engine/`.

They supplement the repository-root `AGENTS.md`. All repository-wide safety, authority, validation, and reporting rules remain in force.

## Engine Responsibility

The Monad engine contains deterministic repository-domain and application behavior for inspecting, planning, generating, applying, validating, and evolving repositories.

The engine must not be treated as a miscellaneous location for logic that lacks another home.

Keep clear boundaries among:

- domain models,
- use cases,
- planning,
- validation,
- generation,
- application,
- persistence,
- filesystem adapters,
- process execution,
- native-tool integrations,
- AI-provider integrations,
- presentation layers.

## Deterministic Core

Given equivalent:

- repository inputs,
- configuration,
- selected capabilities,
- toolchain metadata,
- templates,
- explicit environment inputs,

the engine should produce equivalent plans and outputs.

Control nondeterminism explicitly.

Sources of nondeterminism include:

- current time,
- random identifiers,
- map iteration,
- filesystem traversal order,
- process environment,
- network responses,
- AI output,
- host-specific paths,
- locale,
- platform-specific line endings,
- dependency resolution.

When nondeterminism is required, inject it through an explicit interface and test it with controlled values.

Do not call an AI provider from deterministic core logic.

## Language Neutrality

Core models must describe repository intent without assuming an idiomatic layout from one programming language.

Use language-specific adapters, packs, providers, or integrations to translate logical concepts into target-specific layouts and native-tool commands.

Do not encode assumptions such as:

- every project has `src/`,
- every workspace has `package.json`,
- every package is a crate,
- every build uses a single root manifest,
- every repository has one language,
- every dependency graph uses the same semantics.

Polyglot repositories are first-class.

## Planning and Application

Planning and application are separate responsibilities.

### Planning

Planning must:

- inspect current repository state,
- validate inputs,
- calculate intended operations,
- detect conflicts,
- produce a stable, reviewable representation,
- avoid mutating repository state.

A planning path must not create directories, write files, install dependencies, run mutating native-tool commands, or persist applied state.

Temporary read-only computation is permitted only when it does not alter the repository.

### Application

Application must:

- consume an approved or validated plan,
- verify relevant preconditions,
- detect stale assumptions,
- apply only planned operations,
- use safe write behavior,
- report each result,
- preserve recoverability,
- produce evidence or state required by the governing specification.

Do not recalculate a materially different plan silently during application.

If repository state changed after planning, follow the approved stale-plan or conflict behavior.

## Operation Model

Represent repository changes explicitly.

Operations may include concepts such as:

- create directory,
- create file,
- modify owned region,
- move path,
- delete generated artifact,
- invoke native tool,
- update state,
- record evidence.

Do not reduce all changes to unstructured shell commands.

Each operation should define, where applicable:

- target,
- ownership,
- preconditions,
- intended result,
- conflict behavior,
- rollback or recovery behavior,
- evidence,
- deterministic identity.

## Ownership and Conflict Policy

Before changing a file, determine whether it is:

- absent,
- Monad-owned,
- user-owned,
- shared,
- generated,
- generated but editable,
- externally managed,
- unknown.

Unknown ownership must not default to safe-to-overwrite.

Conflict handling must be explicit and testable.

Possible outcomes may include:

- create,
- update,
- skip,
- merge through an approved strategy,
- require user decision,
- fail safely.

Do not silently replace user-authored content.

If managed regions are supported, markers and merge behavior must be versioned and validated.

## Filesystem Safety

All engine filesystem operations must account for:

- path normalization,
- path traversal,
- absolute paths,
- repository-root containment,
- symbolic links,
- case-sensitive and case-insensitive filesystems,
- file permissions,
- interrupted writes,
- temporary files,
- existing targets,
- partial failure,
- platform path differences.

Use atomic replacement where practical for durable state and important manifests.

Validate before mutation and revalidate critical assumptions immediately before application.

Do not follow symbolic links outside the authorized workspace unless an approved specification explicitly permits it.

## Generated Artifacts

Generation must separate:

- logical repository model,
- selected target capabilities,
- template or generator implementation,
- generation plan,
- rendered output,
- application,
- validation.

Generated output must have a clear provenance.

Where applicable, record:

- generator identity and version,
- template or pack identity and version,
- inputs,
- output ownership,
- checksums,
- applied operations,
- validation evidence.

Do not include volatile timestamps or random values in generated output unless required.

Do not render placeholder content as though it were a completed implementation.

## Native Tool Integration

Native tools are external boundaries.

A native-tool adapter must define:

- capability provided,
- supported versions or detection rules,
- command construction,
- working directory,
- environment handling,
- input and output contracts,
- exit-code interpretation,
- timeout or interruption behavior,
- error mapping,
- mutation classification.

Do not scatter direct process execution throughout domain logic.

Do not parse human-oriented tool output when a stable structured format is available.

Do not assume a native tool is installed without detection or a documented prerequisite.

## AI Integration

AI-assisted engine behavior must remain outside deterministic core paths.

An AI integration must define:

- provider-neutral interface,
- required capability,
- inputs shared with the provider,
- output validation,
- failure and timeout behavior,
- offline behavior,
- fallback behavior,
- privacy implications,
- reproducibility limitations,
- user approval boundaries.

AI output is untrusted input.

Validate AI-generated plans, specifications, code, paths, and commands before use.

Do not apply AI-proposed repository mutations without the same planning, conflict, and validation rules used for deterministic operations.

## State

Engine state must have explicit:

- schema,
- ownership,
- lifecycle,
- versioning,
- migration behavior,
- validation,
- corruption behavior,
- concurrency assumptions.

Distinguish durable state from disposable cache.

Cache loss must not destroy authoritative repository information.

Do not treat an in-memory agent conversation as durable Monad state.

## Error Model

Use errors that preserve domain meaning.

Distinguish, where applicable:

- invalid input,
- unsupported capability,
- invalid repository,
- incompatible version,
- conflict,
- stale plan,
- permission failure,
- native-tool failure,
- validation failure,
- partial application,
- corrupted state,
- internal invariant violation.

Do not convert every error into a generic string at the engine boundary.

Errors crossing public boundaries should be stable enough for callers to map appropriately.

## Concurrency

Do not introduce concurrent mutation without an explicit requirement and conflict model.

When concurrency is used:

- identify shared state,
- define ordering,
- define cancellation,
- define partial-failure behavior,
- preserve deterministic result presentation,
- prevent concurrent writes to the same target,
- test race-sensitive behavior.

Parallel inspection or rendering must not change semantic output.

## Tests

Engine changes should include the relevant subset of:

- domain unit tests,
- planning tests,
- no-side-effect planning tests,
- operation-model tests,
- conflict-policy tests,
- filesystem integration tests,
- path-safety tests,
- interruption or partial-failure tests,
- native-tool adapter tests,
- deterministic-output tests,
- golden-output tests,
- cross-platform tests,
- property tests where invariants benefit from them.

Tests must verify that planning does not mutate the repository.

Golden files must be reviewed as public or semi-public generated contracts. Do not update them blindly.

## Engine Review Rules

When reviewing engine code, flag:

- filesystem or process access inside domain logic,
- AI calls inside deterministic paths,
- planning code that mutates state,
- application code that deviates from its plan,
- silent overwrites,
- unvalidated paths,
- symlink escapes,
- nondeterministic ordering,
- hidden time or randomness,
- language-specific assumptions in core models,
- unstructured shell-command plans,
- cache treated as canonical state,
- partial writes without recovery behavior,
- generic errors that discard domain meaning,
- tests that do not verify side effects.

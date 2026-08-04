# Monad Specification Agent Instructions

## Scope

These instructions apply to files under `specifications/`.

They supplement the repository-root `AGENTS.md`. All repository-wide authority, safety, validation, and reporting rules remain in force.

## Purpose of Specifications

A Monad specification defines required behavior precisely enough that:

- implementation can be planned,
- acceptance criteria can be derived,
- tests can demonstrate conformance,
- reviewers can identify incomplete or incorrect behavior,
- different implementations can preserve the same contract.

A specification is not a brainstorm, implementation journal, marketing description, or substitute for an ADR.

## Normative Language

Use normative terms consistently:

- **MUST** or **SHALL**: required for conformance.
- **MUST NOT** or **SHALL NOT**: prohibited for conformance.
- **SHOULD**: recommended; deviations require a documented reason.
- **SHOULD NOT**: normally prohibited; deviations require a documented reason.
- **MAY**: optional.
- **CAN**: statement of capability, not a requirement.

Avoid using normative capitalization casually in explanatory prose.

Requirements should be independently understandable and testable.

## Specification Identity

Follow the repository's established identification and naming convention.

A specification should clearly identify, as applicable:

- stable identifier,
- title,
- version,
- status,
- authorship or ownership,
- created date,
- last revised date,
- governing ADRs,
- related specifications,
- superseded documents,
- implementation status.

Do not renumber an established specification merely to improve ordering.

Do not reuse an identifier for a different subject.

## Status

Use the repository's established status model.

At minimum, distinguish among states equivalent to:

- Draft,
- Proposed,
- Accepted or Approved,
- Implementing,
- Implemented,
- Deprecated,
- Superseded,
- Rejected.

Do not mark a specification implemented without repository evidence.

Do not describe a draft requirement as an accepted contract.

## Required Specification Content

A substantial behavioral specification should include the relevant subset of:

- purpose,
- problem statement,
- scope,
- non-goals,
- terminology,
- actors,
- assumptions,
- dependencies,
- user scenarios,
- functional requirements,
- invariants,
- state transitions,
- data contracts,
- input validation,
- output behavior,
- error behavior,
- security and privacy requirements,
- performance constraints,
- compatibility requirements,
- migration behavior,
- observability or evidence requirements,
- acceptance criteria,
- test traceability,
- unresolved questions.

Do not add empty sections without value.

## Requirement Quality

Each normative requirement should:

- have a stable requirement identifier when the repository convention supports it,
- state one primary obligation,
- identify the responsible system or component,
- define observable behavior,
- define relevant conditions,
- avoid subjective language,
- avoid unnecessary implementation details,
- be testable or verifiable.

Avoid requirements such as:

- “The system should be robust.”
- “The command should work correctly.”
- “The user experience must be intuitive.”
- “Errors should be handled gracefully.”

Replace them with observable behavior.

## Scope and Non-Goals

State what the specification governs.

State important exclusions explicitly.

Do not allow a specification to absorb adjacent capabilities merely because they are related.

A specification for one command, manifest, component, or lifecycle phase should reference rather than duplicate adjacent specifications.

## Behavior and Failure Semantics

Specify unsuccessful behavior, not only the successful path.

Address, where relevant:

- invalid input,
- missing files,
- incompatible versions,
- unsupported capabilities,
- conflicts,
- permission failures,
- partial state,
- stale plans,
- native-tool failures,
- interrupted execution,
- malformed external output,
- unavailable network or AI provider,
- corrupted state.

Do not leave error behavior entirely to implementation discretion when it affects users, automation, state integrity, or compatibility.

## Determinism

For deterministic functionality, identify:

- inputs that affect results,
- ordering rules,
- normalization rules,
- permitted environmental variation,
- prohibited nondeterminism,
- how timestamps or identifiers are supplied when required.

If reproducibility is not possible, identify why and define the evidence that must be retained.

## AI-Related Requirements

An AI-assisted specification must distinguish:

- deterministic behavior,
- AI-assisted behavior,
- provider responsibility,
- validation responsibility,
- user approval boundary,
- offline behavior,
- fallback behavior,
- data-sharing implications,
- unsupported guarantees.

Do not specify an AI model as the only possible provider unless an accepted architectural decision requires it.

Do not treat AI output as trusted or automatically valid.

## Architecture Versus Behavior

Specifications define required behavior and contracts.

ADRs define significant architectural decisions.

A specification may reference an architecture constraint, but should not hide a major architectural decision inside a behavioral requirement.

When a new requirement requires a significant architectural decision:

1. identify the decision,
2. reference or propose the necessary ADR,
3. avoid prematurely fixing the implementation in the specification.

Implementation detail is appropriate only when it is itself a required compatibility, security, performance, interoperability, or governance constraint.

## Acceptance Criteria

Acceptance criteria must demonstrate the normative requirements.

Each criterion should identify:

- initial state,
- action or input,
- expected result,
- relevant output or state,
- failure condition when applicable.

Acceptance criteria should cover:

- primary success behavior,
- important alternative paths,
- required failures,
- invariants,
- compatibility,
- deterministic behavior,
- state integrity.

Do not use “implementation exists” as an acceptance criterion.

## Test Traceability

Where the repository supports traceability, map:

- specification requirement,
- acceptance criterion,
- work packet,
- test,
- evidence.

Do not claim full conformance when requirements lack evidence.

A unit test may not be sufficient evidence for a public CLI, manifest, generation, or filesystem contract.

## Changes to Approved Specifications

Do not silently rewrite an approved requirement.

Before changing an approved specification:

1. identify the current requirement.
2. explain why it must change.
3. identify affected ADRs, implementations, tests, docs, schemas, and consumers.
4. determine compatibility and migration impact.
5. update version or change history according to repository policy.
6. preserve historical traceability.

A typo, formatting correction, or clarified example may be corrected without semantic versioning only when meaning does not change.

If meaning changes, treat it as a contract change.

## Planned Versus Implemented Behavior

Specifications may describe target behavior, but status must remain honest.

Use explicit implementation-status tracking rather than altering requirement language to match incomplete code.

Do not weaken requirements to make current implementation appear conformant.

Do not document planned behavior in user-facing present tense without a clear status marker.

## Placeholders and Open Questions

Draft specifications may contain unresolved questions when clearly marked.

Approved specifications must not contain unresolved placeholders that materially affect conformance, such as:

- TBD,
- TODO,
- “implementation-defined” without boundaries,
- unspecified exit codes,
- unspecified conflict behavior,
- unresolved schema fields,
- unresolved ownership.

Resolve or explicitly defer such matters to a named future specification before approval.

## Specification Review Rules

When reviewing specifications, flag:

- untestable requirements,
- multiple obligations hidden in one requirement,
- undefined terminology,
- inconsistent normative language,
- missing error behavior,
- missing state transitions,
- hidden architectural decisions,
- accidental provider or language coupling,
- unspecified determinism,
- acceptance criteria that do not prove requirements,
- approved documents containing material placeholders,
- planned behavior presented as implemented,
- silent semantic changes to approved requirements,
- duplication or contradiction with another specification.

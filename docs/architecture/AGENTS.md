# Monad Architecture Documentation Agent Instructions

## Scope

These instructions apply to files under `architecture/`.

They supplement the repository-root `AGENTS.md`. All repository-wide safety, authority, validation, and reporting rules remain in force.

## Purpose of This Directory

The `architecture/` directory explains Monad's system structure, boundaries, responsibilities, interactions, runtime behavior, architectural principles, and significant technical constraints.

Architecture documentation must help a reader determine:

- what the system is,
- where responsibilities belong,
- how components interact,
- which constraints govern implementation,
- which decisions are already settled,
- which questions remain unresolved,
- which behavior is current versus planned.

## Architectural Authority

Accepted ADRs remain the authority for accepted architectural decisions.

Architecture documentation may:

- explain an accepted decision,
- show how multiple accepted decisions fit together,
- describe component boundaries,
- illustrate data and control flow,
- document constraints and consequences,
- identify unresolved decisions.

Architecture documentation must not:

- silently supersede an accepted ADR,
- introduce a new binding decision without the required ADR,
- describe a proposed design as accepted,
- rewrite history to make the implementation appear consistent,
- treat current implementation accidents as permanent architecture.

When architecture documentation conflicts with an accepted ADR, report the conflict and follow the ADR until the conflict is resolved.

When architecture documentation conflicts with an approved behavioral specification, distinguish architectural intent from required observable behavior and report the conflict.

## Document Classification

Every substantial architecture document should make its status clear.

Use an existing repository convention where one exists. Otherwise identify the document as one of:

- Current,
- Proposed,
- Experimental,
- Historical,
- Superseded,
- Reference.

Do not use future tense ambiguously. Explicitly distinguish:

- current implementation,
- accepted target architecture,
- proposed future architecture,
- illustrative possibilities.

## Required Architectural Content

When creating or substantially revising an architecture document, include the relevant subset of:

- purpose,
- scope,
- context,
- system boundary,
- responsibilities,
- non-responsibilities,
- components,
- interfaces,
- dependencies,
- data flow,
- control flow,
- state ownership,
- persistence,
- lifecycle,
- failure behavior,
- security boundaries,
- trust assumptions,
- concurrency assumptions,
- consistency model,
- determinism requirements,
- offline and network behavior,
- extension points,
- compatibility constraints,
- operational implications,
- unresolved questions,
- linked ADRs and specifications.

Do not add empty sections solely to satisfy a template.

## Boundary Discipline

Each component description should define:

- what the component owns,
- what it does not own,
- inputs,
- outputs,
- allowed dependencies,
- prohibited dependencies,
- state it reads,
- state it writes,
- failure modes,
- extension mechanism when applicable.

Avoid overlapping ownership.

Do not use vague components such as `manager`, `helper`, `processor`, or `service` without defining their domain responsibility.

Keep deterministic domain logic separate from:

- filesystem access,
- process execution,
- network access,
- AI providers,
- user interfaces,
- persistence adapters,
- language-specific toolchains.

## Monad-Specific Architectural Principles

Architecture changes must preserve or explicitly challenge through the decision process:

- deterministic core behavior,
- AI-optional operation,
- local-first workflows,
- language-neutral domain models,
- provider-neutral AI integration,
- native-tool coordination,
- explicit state ownership,
- inspectable plan/apply workflows,
- reproducible generation,
- honest capability reporting,
- controlled repository mutation.

Do not place a hosted service, AI model, particular language, or particular build tool at the center of the architecture unless an accepted decision requires it.

## Diagrams

Prefer text-based, version-controlled diagram sources.

When using Mermaid, DOT, PlantUML, or another diagram language:

- keep the source in the repository,
- use domain names consistent with the prose,
- label important boundaries,
- show directionality,
- distinguish data flow from control flow when relevant,
- avoid diagrams that merely repeat a directory tree,
- update the diagram when the accompanying prose changes.

A diagram is explanatory. It does not replace required semantics in prose.

Do not commit only a rendered binary image when an editable source format is practical.

## Cross-References

Link architecture documents to:

- governing ADRs,
- governing specifications,
- component documentation,
- relevant schemas,
- implementation locations when stable,
- operational documentation when applicable.

Use repository-relative links where appropriate.

Do not duplicate the full content of an ADR or specification. Summarize and link instead.

## Change Rules

Before changing architecture documentation:

1. Identify the governing decision or requirement.
2. Determine whether the change is explanatory or decision-changing.
3. Inspect related architecture documents for duplicated descriptions.
4. Identify diagrams and indexes that also require updates.
5. Verify that current and planned behavior remain clearly distinguished.

A decision-changing edit requires the appropriate ADR process.

Do not alter an architecture description solely to match an implementation that violated the accepted design. Report the mismatch.

## Review Rules

When reviewing architecture changes, flag:

- contradictions with accepted ADRs,
- contradictions with approved specifications,
- unclear component ownership,
- cyclic or prohibited dependencies,
- hidden network requirements,
- hidden nondeterminism,
- AI-provider coupling,
- language-specific assumptions in the core model,
- unspecified state ownership,
- missing failure behavior,
- missing migration consequences,
- diagrams inconsistent with prose,
- planned behavior presented as implemented,
- duplicate concepts with inconsistent names.

For each finding, identify the conflicting document, decision, boundary, or requirement.
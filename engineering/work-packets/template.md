---
artifact:
  id: WP-<DOMAIN>-<NNNN>
  kind: work-packet
  title: <Concise Work Packet Title>
  status: proposed
  version: 0.1.0
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  owner: <owner-or-team>
  execution_mode: supervised
  implementation_required: false
  priority: normal
  risk: medium
  profile: monad-work-packet
  schema: monad.engineering/work-packet@0.1
provenance:
  source: engineering/work-packets/<filename>.md
---

# WP-<DOMAIN>-<NNNN> — <Concise Work Packet Title>

## 1. Work Packet Identity

| Field | Value |
|---|---|
| Identifier | `WP-<DOMAIN>-<NNNN>` |
| Title | <Concise Work Packet Title> |
| Status | Proposed |
| Version | `0.1.0` |
| Priority | Normal |
| Risk level | Medium |
| Owner | <Owner or responsible team> |
| Execution mode | Human-supervised |
| Implementation required | No |
| Created | YYYY-MM-DD |
| Last updated | YYYY-MM-DD |

## 2. Status

**Current status:** Proposed

**Authorized activities:** Analysis and planning only

**Implementation permitted:** No

**Execution authority:** <Person, role, or governance body>

**Primary domain:** <MSL, MSC, KIR, MKE, CLI, architecture, governance, documentation, infrastructure, or other>

### 2.1 Status Lifecycle

```text
proposed → ready → planning → approved → in-progress → verification → completed
```

Alternative terminal states:

```text
blocked | cancelled | superseded | rejected
```

Every status transition must be recorded in the status history.

## 3. Objective

<Describe the single concrete outcome this work packet must produce.>

The objective must identify:

- what will exist when the work is complete;
- what problem the work resolves;
- which repository or system boundary is affected;
- what downstream work becomes possible.

The packet is complete only when the objective and all mandatory acceptance criteria are satisfied.

## 4. Problem Statement

<Describe the current condition that makes this work necessary.>

Distinguish direct repository facts from interpretation. Include missing functionality, conflicting specifications, invalid state, absent validation, operational risk, or blocked downstream work where relevant.

## 5. Desired Outcome

After this work packet is completed:

1. <Expected outcome one>
2. <Expected outcome two>
3. <Expected outcome three>

The resulting state must be explicit, deterministic, reviewable, testable, documented, reproducible, and consistent with accepted architecture.

## 6. Background and Context

<Explain the architectural, historical, or operational context required to understand the work.>

Include only context materially relevant to execution. Historical material may inform the work but is not automatically authoritative.

## 7. Architectural Position

```text
<Upstream input>
        ↓
<Current component or layer>
        ↓
<Downstream consumer>
```

### 7.1 Upstream Dependencies

- <Upstream specification, artifact, decision, or component>
- <Upstream specification, artifact, decision, or component>

### 7.2 Downstream Consumers

- <Downstream specification, artifact, component, or workflow>
- <Downstream specification, artifact, component, or workflow>

### 7.3 Architectural Boundaries

This work packet must preserve:

- <Boundary one>
- <Boundary two>
- <Boundary three>

## 8. Motivation

This work is necessary because:

1. <Reason one>
2. <Reason two>
3. <Reason three>

Without this work:

- <Blocked capability>
- <Architectural risk>
- <Operational or maintenance risk>

## 9. Authority Hierarchy

Apply repository authority in the following order unless an accepted governance artifact defines another hierarchy:

1. Accepted architecture decision records.
2. Accepted specifications and standards.
3. Explicit requirements in this work packet.
4. Referenced active draft specifications.
5. Registry records and repository manifests.
6. Templates and examples.
7. Historical build logs, journals, and discussions.

When authoritative sources conflict, the executor must:

1. stop work on the affected decision;
2. record the conflict;
3. identify the conflicting sources;
4. explain why they cannot both be satisfied;
5. request or propose an explicit resolution.

The executor must not silently choose an interpretation.

## 10. Authoritative Inputs

The executor must read these artifacts before planning or changing files:

1. `<path/to/authoritative-input>`
2. `<path/to/authoritative-input>`
3. `<path/to/authoritative-input>`

| Input | Authority | Relevance |
|---|---|---|
| `<path>` | Accepted / Draft / Informational | <Why it matters> |

## 11. Informational Inputs

The following may be consulted for context but are not normative:

- `<path/to/contextual-document>`
- `<path/to/historical-record>`
- `<path/to/example>`

Informational sources must not override authoritative requirements.

## 12. Preconditions

Execution may begin only when:

- [ ] All authoritative inputs exist and are readable.
- [ ] The packet is approved for the requested activity.
- [ ] The current branch and working-tree state are understood.
- [ ] Required predecessor packets are complete.
- [ ] No unresolved blocker prevents deterministic execution.
- [ ] Applicable repository instructions have been read.
- [ ] An execution plan has been approved when required.

## 13. Dependencies

### 13.1 Required Predecessors

| Dependency | Required State | Reason |
|---|---|---|
| `<artifact-or-work-packet>` | Completed / Accepted | <Reason> |

### 13.2 Related Work Packets

- `WP-<DOMAIN>-<NNNN>` — <Relationship>
- `WP-<DOMAIN>-<NNNN>` — <Relationship>

### 13.3 Successor Work

Completion may authorize planning for:

- `WP-<DOMAIN>-<NNNN>` — <Expected successor>
- <Future capability or milestone>

Completion does not automatically authorize successor implementation.

## 14. Assumptions

This packet assumes:

1. <Assumption one>
2. <Assumption two>
3. <Assumption three>

Each assumption must be verified before it materially influences execution. An invalid assumption must be reported as a blocker or converted into an explicit decision.

## 15. Constraints

### 15.1 Architectural Constraints

- <Constraint>
- <Constraint>

### 15.2 Technical Constraints

- <Constraint>
- <Constraint>

### 15.3 Governance Constraints

- Accepted ADRs must not be modified without authorization.
- Governance status must not change without supporting evidence.
- Contradictions must be surfaced rather than silently resolved.
- The active work packet defines the execution boundary.

### 15.4 Repository Constraints

- Use repository-relative paths in committed metadata.
- Do not modify unrelated files.
- Distinguish generated artifacts from authored artifacts.
- Do not commit temporary or machine-specific files.

### 15.5 Determinism Constraints

- Equivalent inputs must produce equivalent results.
- Validation and diagnostic ordering must be stable.
- Hidden environmental state must not alter canonical behavior.
- Time, randomness, network access, and machine-specific paths must not affect canonical output unless explicitly specified.

### 15.6 AI Constraints

When AI assistance is used:

- AI output remains advisory until reviewed.
- AI-generated decisions must be grounded in repository authority.
- AI assistance must not become a mandatory runtime dependency unless authorized.
- Model-specific behavior must not define canonical semantics.
- Unsupported assumptions must be reported.

## 16. In Scope

The following work is authorized:

1. <In-scope activity>
2. <In-scope activity>
3. <In-scope activity>

### 16.1 Files Expected to Be Examined

- `<path>`
- `<path>`

### 16.2 Files Expected to Be Modified

- `<path>`
- `<path>`

### 16.3 Files That May Be Added

- `<path>`
- `<path>`

The execution report must explain any deviation from these expectations.

## 17. Out of Scope

The following work is prohibited unless the packet is amended and reapproved:

- <Out-of-scope activity>
- unrelated refactoring;
- repository-wide formatting;
- dependency upgrades not required by the objective;
- accepted ADR changes;
- unrelated specification changes;
- broad directory reorganization;
- speculative future functionality;
- opportunistic cleanup;
- commits, pushes, merges, rebases, or history rewriting by an automated executor unless explicitly authorized.

Out-of-scope defects must be recorded rather than repaired opportunistically.

## 18. Non-Goals

This packet does not attempt to:

- <Non-goal>
- <Non-goal>
- solve every adjacent architectural problem;
- finalize intentionally deferred behavior;
- implement downstream capabilities not required by the objective.

## 19. Required Decisions

### DEC-001 — <Decision Title>

**Question:** <Decision that must be made>

**Permitted options:**

1. <Option>
2. <Option>
3. <Option>

**Decision criteria:**

- <Criterion>
- <Criterion>

**Required output:** <Where the decision must be recorded>

### DEC-002 — <Decision Title>

**Question:** <Decision that must be made>

**Required output:** <Where the decision must be recorded>

Decisions outside this list must not be invented unless unavoidable for satisfying an acceptance criterion.

## 20. Deferred Decisions

| Decision | Deferred To | Reason |
|---|---|---|
| <Decision> | `<future artifact or work packet>` | <Reason> |

Deferred decisions must not be resolved implicitly by implementation detail.

## 21. Functional Requirements

### WP-<DOMAIN>-REQ-001 — <Requirement Title>

The resulting system or document **MUST** <requirement>.

**Rationale:** <Why this is required>

**Verification:** <How compliance will be demonstrated>

### WP-<DOMAIN>-REQ-002 — <Requirement Title>

The resulting system or document **MUST** <requirement>.

**Rationale:** <Why this is required>

**Verification:** <How compliance will be demonstrated>

### WP-<DOMAIN>-REQ-003 — <Requirement Title>

The resulting system or document **SHOULD** <requirement>.

**Rationale:** <Why this is recommended>

**Verification:** <How compliance will be evaluated>

## 22. Nonfunctional Requirements

### 22.1 Correctness

- <Correctness requirement>

### 22.2 Determinism

- <Determinism requirement>

### 22.3 Reliability

- <Reliability requirement>

### 22.4 Security

- <Security requirement>

### 22.5 Portability

- <Portability requirement>

### 22.6 Maintainability

- <Maintainability requirement>

### 22.7 Observability

- <Logging, diagnostics, evidence, or traceability requirement>

### 22.8 Performance

- <Performance requirement or explicit statement that performance is not material>

### 22.9 Compatibility

- <Backward-compatibility, migration, or format-stability requirement>

## 23. Required Behavior

### Scenario 1 — <Scenario Name>

**Given:** <Initial condition>

**When:** <Action occurs>

**Then:** <Required result>

### Scenario 2 — <Scenario Name>

**Given:** <Initial condition>

**When:** <Action occurs>

**Then:** <Required result>

### Scenario 3 — <Failure Scenario>

**Given:** <Invalid or exceptional condition>

**When:** <Action occurs>

**Then:** <Required diagnostic, error, or safe behavior>

## 24. Data and Schema Requirements

When structured data is involved, define:

### 24.1 Input Schema

```yaml
<example input>
```

### 24.2 Output Schema

```yaml
<example output>
```

### 24.3 Validation Rules

- <Rule>
- <Rule>

### 24.4 Canonicalization Rules

- <Rule>
- <Rule>

### 24.5 Compatibility Rules

- <Rule>
- <Rule>

When structured data is not involved, state:

> This work packet introduces no structured data contract.

## 25. Interface Requirements

When a user-facing or programmatic interface is affected, define:

### 25.1 Commands or Operations

```text
<command or operation syntax>
```

### 25.2 Inputs

- <Input>
- <Input>

### 25.3 Outputs

- <Output>
- <Output>

### 25.4 Result Semantics

| Condition | Result |
|---|---|
| Success | <Result> |
| Validation failure | <Result> |
| Tool or internal failure | <Result> |

### 25.5 Compatibility Expectations

- <Expectation>
- <Expectation>

When no public interface is affected, state:

> This work packet introduces no public interface change.

## 26. Diagnostic Requirements

Diagnostics introduced or modified by this work must define:

- a stable identifier;
- severity;
- human-readable message semantics;
- relevant source or artifact;
- source location when available;
- governing rule when available;
- deterministic ordering;
- machine-readable representation when required.

### 26.1 Diagnostic Table

| Code | Severity | Condition | Required Message Semantics |
|---|---|---|---|
| `<CODE>` | Error | <Condition> | <Meaning> |
| `<CODE>` | Warning | <Condition> | <Meaning> |

### 26.2 Ordering

Diagnostics sort by:

1. <Primary key>
2. <Secondary key>
3. <Tertiary key>

## 27. Error and Failure Handling

Define behavior for:

- invalid input;
- missing input;
- malformed configuration;
- unresolved references;
- incompatible versions;
- duplicate identities;
- unavailable dependencies;
- internal failures;
- partial operations;
- interrupted operations.

Failures must not leave persistent state partially mutated unless explicitly designed and documented.

## 28. Security Considerations

Consider:

- path traversal;
- unintended filesystem access;
- command injection;
- untrusted input;
- unsafe deserialization;
- secret exposure;
- network access;
- dependency provenance;
- privilege escalation;
- destructive mutations;
- generated-content trust boundaries.

Record whether each concern is applicable.

## 29. Compatibility and Migration

### 29.1 Existing Behavior

<Describe the existing behavior or state.>

### 29.2 Required Compatibility

<Describe what must remain compatible.>

### 29.3 Breaking Changes

<Describe any explicitly authorized breaking changes.>

### 29.4 Migration

<Describe required migration steps or state that none are needed.>

Breaking changes not authorized by this packet are prohibited.

## 30. Implementation Guidance

This section may describe an expected approach without prescribing unnecessary implementation details.

Recommended sequence:

1. inspect authoritative inputs;
2. confirm current behavior or document state;
3. identify contradictions;
4. produce or update the execution plan;
5. make the smallest coherent change;
6. add or update verification artifacts;
7. run required checks;
8. review the complete diff;
9. record evidence;
10. stop without committing or pushing unless authorized.

Guidance does not override requirements or scope.

## 31. Execution Plan Requirement

An execution plan is mandatory when any of these conditions applies:

- multiple architectural layers are affected;
- a public contract changes;
- more than one authoritative specification changes;
- migration is required;
- a dependency is introduced;
- risk is medium or high;
- this packet explicitly requires planning.

The plan must include:

1. repository facts;
2. contradictions;
3. files and symbols or sections expected to change;
4. execution sequence;
5. verification strategy;
6. compatibility and security risks;
7. assumptions and deferred decisions;
8. evidence mapped to acceptance criteria.

Implementation must not begin until the plan is approved.

## 32. Required Deliverables

The packet must produce:

1. <Deliverable>
2. <Deliverable>
3. <Deliverable>

### 32.1 Modified Artifacts

- `<path>`
- `<path>`

### 32.2 New Artifacts

- `<path>`
- `<path>`

### 32.3 Evidence Artifacts

- `engineering/reports/WP-<DOMAIN>-<NNNN>-execution-report.md`
- <Additional evidence artifact>

## 33. Acceptance Criteria

### AC-001 — <Criterion Title>

<Precise, observable completion condition.>

**Evidence required:** <Evidence>

### AC-002 — <Criterion Title>

<Precise, observable completion condition.>

**Evidence required:** <Evidence>

### AC-003 — Scope Compliance

The resulting diff contains no unrelated implementation, documentation, restructuring, or cleanup.

**Evidence required:** Reviewed diff and execution report.

### AC-004 — Authority Compliance

The work is consistent with applicable accepted ADRs and specifications.

**Evidence required:** Authority review in the execution report.

### AC-005 — Verification

All required verification commands complete successfully.

**Evidence required:** Commands and results in the execution report.

### AC-006 — Documentation Agreement

Modified documentation agrees with resulting behavior and repository state.

**Evidence required:** Reference review and diff inspection.

### AC-007 — No Silent Contradictions

No authoritative contradiction is resolved without explicit documentation.

**Evidence required:** Contradiction register.

### AC-008 — Diff Hygiene

The final diff contains no trailing whitespace, conflict markers, temporary files, accidental generated files, or unrelated changes.

**Evidence required:** `git diff --check` and final repository inspection.

Add criteria as required.

## 34. Acceptance-Criteria Traceability

| Criterion | Requirement or Decision | Deliverable | Verification |
|---|---|---|---|
| AC-001 | WP-<DOMAIN>-REQ-001 | `<artifact>` | `<command or review>` |
| AC-002 | DEC-001 | `<artifact>` | `<command or review>` |
| AC-003 | Scope rules | Complete diff | Diff review |

Every mandatory criterion must map to explicit evidence.

## 35. Test Requirements

### 35.1 Unit Tests

- <Required unit test>

### 35.2 Integration Tests

- <Required integration test>

### 35.3 Conformance Tests

- <Required conformance fixture or test>

### 35.4 Negative Tests

- <Invalid-input or failure-path case>

### 35.5 Regression Tests

- <Previously failing or vulnerable case>

### 35.6 Documentation-Only Work

When no executable code is authorized, state:

> No implementation tests are required. Verification is document-, schema-, registry-, reference-, and repository-based.

## 36. Verification Commands

Run applicable repository checks:

```bash
git status --short
git diff --check
```

Add project-specific commands:

```bash
<format command>
<lint command>
<unit test command>
<integration test command>
<validation command>
<build command>
```

Commands that are not applicable must be marked `not applicable` in the execution report rather than omitted without explanation.

## 37. Manual Verification

- [ ] All affected files were reviewed.
- [ ] Metadata agrees with filenames and registry entries.
- [ ] Local references resolve.
- [ ] Public behavior matches documentation.
- [ ] Every acceptance criterion has evidence.
- [ ] No unrelated file changed.
- [ ] No temporary file is present.
- [ ] No accidental dependency was introduced.
- [ ] No unresolved contradiction was hidden.
- [ ] The final diff is understandable without chat history.

## 38. Review Requirements

Review the completed change for:

### 38.1 Scope

- Did execution remain within the packet?
- Were unrelated defects changed?

### 38.2 Architecture

- Are accepted boundaries preserved?
- Was an undocumented architectural decision introduced?

### 38.3 Correctness

- Does the result satisfy every criterion?
- Do tests or evidence prove the required behavior?

### 38.4 Determinism

- Are outputs, diagnostics, and ordering stable?
- Does behavior depend on hidden state?

### 38.5 Security

- Did trust or access boundaries expand?
- Is untrusted input handled safely?

### 38.6 Documentation

- Do specifications, examples, registries, and implementation agree?

### 38.7 Repository Hygiene

- Are generated, temporary, and machine-specific files excluded?
- Is the diff minimal and intentional?

## 39. Risk Register

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---|---|---|---|
| <Risk> | Low / Medium / High | Low / Medium / High | <Mitigation> | Open |
| <Risk> | Low / Medium / High | Low / Medium / High | <Mitigation> | Open |

High-impact unresolved risks must block completion unless explicitly accepted.

## 40. Contradiction Register

| ID | Source A | Source B | Conflict | Resolution |
|---|---|---|---|---|
| CR-001 | `<path>` | `<path>` | <Description> | Open |

Known contradictions must not be omitted because they fall outside implementation scope.

## 41. Open Questions

1. <Open question>
2. <Open question>

Classify each as blocking, non-blocking, deferred, or informational.

## 42. Stop Conditions

The executor must stop and report a blocker when:

- an accepted ADR contradicts the work;
- two authoritative requirements are mutually exclusive;
- a required authoritative input is missing;
- an unauthorized architectural decision is required;
- scope must expand materially;
- a new production dependency is required but not authorized;
- unrelated systems must be modified;
- a broader test failure cannot be fixed within scope;
- repository state differs materially from assumptions;
- security or data-loss risk cannot be controlled;
- verification cannot be completed;
- destructive or irreversible action would be required.

A stop report must identify the trigger, affected criteria, repository evidence, resolution options, and smallest decision needed to continue.

## 43. Prohibited Actions

Unless separately authorized, the executor must not:

- commit;
- push;
- merge;
- rebase;
- rewrite history;
- delete branches;
- publish packages;
- deploy;
- modify external services;
- access secrets;
- enable unrestricted network access;
- bypass sandbox or approval controls;
- add unrelated dependencies;
- alter accepted ADRs;
- promote artifact governance status;
- perform repository-wide cleanup;
- modify files outside the declared workspace.

## 44. Execution Evidence

The execution report must contain:

### 44.1 Repository State

- starting branch and commit;
- initial working-tree status;
- final branch and working-tree status.

### 44.2 Files

- files examined;
- files added;
- files modified;
- files deleted;
- files intentionally left unchanged.

### 44.3 Decisions

- decisions made;
- decisions deferred;
- assumptions validated or invalidated.

### 44.4 Verification

- commands run and results;
- manual checks;
- tests added and results;
- skipped checks and reasons.

### 44.5 Acceptance Criteria

| Criterion | Status | Evidence |
|---|---|---|
| AC-001 | Passed / Failed / Blocked | <Evidence> |

### 44.6 Diff Summary

Include:

```bash
git diff --stat
```

Also record unrelated changes, temporary files, generated files, dependency changes, and public-contract changes.

## 45. Required Execution Report

Create or update:

```text
engineering/reports/WP-<DOMAIN>-<NNNN>-execution-report.md
```

The report must be understandable without access to chat history and contain:

1. executive summary;
2. repository state;
3. authority review;
4. work performed;
5. files changed;
6. decisions made;
7. contradictions found;
8. deferred decisions;
9. verification results;
10. acceptance-criteria matrix;
11. remaining risks;
12. final disposition.

## 46. Handoff Requirements

When execution stops or completes, provide:

- current packet status;
- branch and commit;
- completed and incomplete work;
- blockers;
- uncommitted changes;
- commands already run;
- failing checks;
- exact next action;
- files the next executor must read first.

The next executor must not depend on unstated conversational context.

## 47. Completion Checklist

### Authority and Scope

- [ ] All authoritative inputs reviewed.
- [ ] No accepted ADR modified without authorization.
- [ ] No contradiction silently resolved.
- [ ] Work remained within scope.
- [ ] Out-of-scope findings recorded separately.

### Deliverables

- [ ] All required deliverables exist.
- [ ] File deviations are explained.
- [ ] Registry and metadata agree with the filesystem.
- [ ] Documentation agrees with resulting behavior.

### Verification

- [ ] Formatting checks pass.
- [ ] Lint checks pass or are not applicable.
- [ ] Unit tests pass or are not applicable.
- [ ] Integration tests pass or are not applicable.
- [ ] Conformance checks pass or are not applicable.
- [ ] Manual verification is complete.
- [ ] `git diff --check` passes.

### Evidence

- [ ] Every criterion has evidence.
- [ ] The execution report is complete.
- [ ] Remaining risks are documented.
- [ ] Deferred decisions are documented.
- [ ] Final repository status is recorded.

### Repository Hygiene

- [ ] No temporary files are present.
- [ ] No accidental generated files are present.
- [ ] No unrelated changes are present.
- [ ] No unauthorized dependency changes are present.
- [ ] No unauthorized commit, push, or merge was performed.

## 48. Definition of Done

The packet is complete only when:

1. the objective is achieved;
2. every mandatory deliverable exists;
3. every mandatory acceptance criterion passes;
4. required tests and checks pass;
5. the execution report contains sufficient evidence;
6. no unresolved blocking contradiction remains;
7. no unauthorized scope expansion occurred;
8. the repository state is internally consistent;
9. a human reviewer approves completion;
10. status is changed to `completed`.

Passing tests alone does not establish completion.

## 49. Completion Authorization

Completion authorizes:

- <Authorized follow-up planning>
- <Authorized successor work>

Completion does not automatically authorize downstream implementation, deployment, publication, governance acceptance, breaking changes, or work outside the listed successor scope.

## 50. Final Disposition

Complete when work ends:

| Field | Value |
|---|---|
| Final status | Completed / Blocked / Cancelled / Superseded |
| Completed by | <Name or executor> |
| Reviewed by | <Reviewer> |
| Completion date | YYYY-MM-DD |
| Final commit | `<commit>` or `uncommitted` |
| Execution report | `<path>` |
| Successor work packet | `<identifier or none>` |

### 50.1 Final Summary

<Concise description of the resulting repository state.>

### 50.2 Remaining Work

- <Remaining item>
- <Remaining item>

### 50.3 Final Recommendation

<Recommended next action.>

## 51. Status History

| Date | Previous Status | New Status | Actor | Reason |
|---|---|---|---|---|
| YYYY-MM-DD | — | Proposed | <Actor> | Work packet created |
| YYYY-MM-DD | Proposed | Ready | <Actor> | Preconditions satisfied |
| YYYY-MM-DD | Ready | Planning | <Actor> | Plan started |
| YYYY-MM-DD | Planning | Approved | <Actor> | Execution authorized |
| YYYY-MM-DD | Approved | In Progress | <Actor> | Execution started |
| YYYY-MM-DD | In Progress | Verification | <Actor> | Deliverables produced |
| YYYY-MM-DD | Verification | Completed | <Actor> | Acceptance criteria verified |

## 52. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | YYYY-MM-DD | <Author> | Initial work packet |

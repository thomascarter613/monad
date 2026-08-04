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

## 4. Problem Statement

<Describe the current condition that makes this work necessary.>

Distinguish direct repository facts from interpretation. Include missing functionality, conflicting specifications, invalid state, absent validation, operational risk, or blocked downstream work where relevant.

## 5. Desired Outcome

After this work packet is completed:

1. <Expected outcome>
2. <Expected outcome>
3. <Expected outcome>

The resulting state must be explicit, deterministic, reviewable, testable, documented, reproducible, and consistent with accepted architecture.

## 6. Background and Context

<Provide only the architectural, historical, and operational context materially relevant to execution.>

Historical material may inform the work but is not automatically authoritative.

## 7. Architectural Position

```text
<Upstream input>
        ↓
<Current component or layer>
        ↓
<Downstream consumer>
```

### 7.1 Upstream Dependencies

- <Input, artifact, decision, or component>

### 7.2 Downstream Consumers

- <Artifact, component, or workflow>

### 7.3 Architectural Boundaries

This work must preserve:

- <Boundary>
- <Boundary>

## 8. Motivation

This work is necessary because:

1. <Reason>
2. <Reason>

Without this work:

- <Blocked capability or risk>
- <Blocked capability or risk>

## 9. Authority Hierarchy

Unless an accepted governance document defines otherwise, apply repository authority in this order:

1. Accepted architecture decision records.
2. Accepted specifications and standards.
3. Explicit requirements in this work packet.
4. Active draft specifications referenced by this work packet.
5. Registry records and repository manifests.
6. Templates and examples.
7. Historical build logs, journals, and discussions.

When authoritative sources conflict, the executor must stop work on the affected decision, record the conflict, identify the sources, explain why both cannot be satisfied, and request or propose an explicit resolution. The executor must not silently choose a preferred interpretation.

## 10. Authoritative Inputs

The executor must read these inputs before planning or modifying files:

1. `<path/to/authoritative-input>`
2. `<path/to/authoritative-input>`

| Input | Authority | Relevance |
|---|---|---|
| `<path>` | Accepted / Draft / Informational | <Why it matters> |

## 11. Informational Inputs

These inputs may be consulted for context but are not normative:

- `<path/to/contextual-document>`
- `<path/to/historical-record>`

## 12. Preconditions

Execution may begin only when:

- [ ] All authoritative inputs exist and are readable.
- [ ] The work packet status is `approved`.
- [ ] The working tree state is understood.
- [ ] Required predecessor work is complete.
- [ ] No unresolved blocker prevents deterministic execution.
- [ ] Applicable repository instructions are understood.
- [ ] An execution plan has been reviewed when required.

## 13. Dependencies

### 13.1 Required Predecessors

| Dependency | Required State | Reason |
|---|---|---|
| `<artifact-or-work-packet>` | Completed / Accepted | <Reason> |

### 13.2 Related Work Packets

- `WP-<DOMAIN>-<NNNN>` — <Relationship>

### 13.3 Successor Work

Completion may authorize planning for:

- `WP-<DOMAIN>-<NNNN>` — <Expected successor>

Completion does not automatically authorize successor implementation.

## 14. Assumptions

1. <Assumption>
2. <Assumption>

Each assumption must be verified before materially influencing implementation. An invalid assumption must be reported as a blocker or converted into an explicit decision.

## 15. Constraints

### 15.1 Architectural Constraints

- <Constraint>

### 15.2 Technical Constraints

- <Constraint>

### 15.3 Governance Constraints

- Accepted ADRs must not be modified without explicit authorization.
- Unrelated requirements must not be introduced.
- Governance status must not change without evidence.
- Contradictions must be surfaced rather than silently resolved.

### 15.4 Repository Constraints

- Use repository-relative paths in committed metadata.
- Do not modify unrelated files.
- Distinguish generated artifacts from authored artifacts.
- Do not commit temporary files.

### 15.5 Determinism Constraints

- Equivalent inputs must produce equivalent results.
- Validation and diagnostic ordering must be stable.
- Hidden environmental state must not alter defined behavior.
- Time, randomness, network access, and machine-specific paths must not affect canonical output unless explicitly specified.

### 15.6 AI Constraints

- AI output is advisory until reviewed.
- AI-generated decisions must be grounded in repository authority.
- AI assistance must not become a mandatory runtime dependency unless explicitly authorized.
- Model-specific behavior must not define canonical semantics.
- Unsupported assumptions must be reported.

## 16. In Scope

Authorized work:

1. <In-scope activity>
2. <In-scope activity>

### 16.1 Files Expected to Be Examined

- `<path>`

### 16.2 Files Expected to Be Modified

- `<path>`

### 16.3 Files That May Be Added

- `<path>`

The execution report must explain material deviation from these expectations.

## 17. Out of Scope

The following are prohibited unless the packet is amended and reapproved:

- <Out-of-scope activity>
- unrelated refactoring;
- repository-wide formatting;
- unnecessary dependency upgrades;
- changes to accepted ADRs;
- changes to unrelated specification series;
- broad directory reorganization;
- speculative future functionality;
- opportunistic cleanup;
- automated commits, pushes, rebases, or history rewriting.

Out-of-scope defects must be recorded separately rather than repaired opportunistically.

## 18. Non-Goals

This work packet does not attempt to:

- <Non-goal>
- finalize deferred future behavior;
- implement downstream capabilities not required for the objective.

## 19. Required Decisions

### DEC-001 — <Decision Title>

**Question:** <Decision that must be made>

**Permitted options:**

1. <Option>
2. <Option>

**Decision criteria:**

- <Criterion>

**Required output:** <Where the decision must be recorded>

## 20. Deferred Decisions

| Decision | Deferred To | Reason |
|---|---|---|
| <Decision> | `<future artifact or work packet>` | <Reason> |

Deferred decisions must not be implicitly resolved by implementation details.

## 21. Functional Requirements

### WP-<DOMAIN>-REQ-001 — <Requirement Title>

The result **MUST** <requirement>.

**Rationale:** <Why this is required>  
**Verification:** <How compliance will be demonstrated>

### WP-<DOMAIN>-REQ-002 — <Requirement Title>

The result **SHOULD** <requirement>.

**Rationale:** <Why this is recommended>  
**Verification:** <How compliance will be evaluated>

## 22. Nonfunctional Requirements

### 22.1 Correctness

- <Requirement>

### 22.2 Determinism

- <Requirement>

### 22.3 Reliability

- <Requirement>

### 22.4 Security

- <Requirement>

### 22.5 Portability

- <Requirement>

### 22.6 Maintainability

- <Requirement>

### 22.7 Observability

- <Diagnostics, evidence, logging, or traceability requirement>

### 22.8 Performance

- <Requirement or explicit statement that performance is not material>

### 22.9 Compatibility

- <Compatibility or migration requirement>

## 23. Required Behavior

### Scenario 1 — <Scenario Name>

**Given** <initial condition>  
**When** <action occurs>  
**Then** <required result>

### Scenario 2 — <Failure Scenario>

**Given** <invalid or exceptional condition>  
**When** <action occurs>  
**Then** <required diagnostic, error, or safe behavior>

## 24. Data and Schema Requirements

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

### 24.4 Canonicalization Rules

- <Rule>

### 24.5 Compatibility Rules

- <Rule>

When structured data is not involved, state: **This work packet introduces no structured data contract.**

## 25. Interface Requirements

### 25.1 Commands

```text
<command syntax>
```

### 25.2 Inputs

- <Input>

### 25.3 Outputs

- <Output>

### 25.4 Exit or Result Semantics

| Condition | Result |
|---|---|
| Success | <Result> |
| Validation failure | <Result> |
| Tool or internal failure | <Result> |

When no public interface is affected, state: **This work packet introduces no public interface change.**

## 26. Diagnostic Requirements

Diagnostics must define a stable identifier, severity, human-readable message, source or artifact, source location when available, governing rule when available, deterministic ordering, and a machine-readable form when required.

| Code | Severity | Condition | Required Message Semantics |
|---|---|---|---|
| `<CODE>` | Error | <Condition> | <Meaning> |

Diagnostics must be sorted by:

1. <Primary key>
2. <Secondary key>
3. <Tertiary key>

## 27. Error and Failure Handling

Define behavior for applicable cases:

- invalid or missing input;
- malformed configuration;
- unresolved references;
- incompatible versions;
- duplicate identities;
- unavailable dependencies;
- internal failures;
- partial or interrupted operations.

Failures must not leave persistent state partially mutated unless explicitly designed and documented.

## 28. Security Considerations

Evaluate applicability of:

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

## 29. Compatibility and Migration

### 29.1 Existing Behavior

<Describe current behavior or state.>

### 29.2 Required Compatibility

<Describe what must remain compatible.>

### 29.3 Authorized Breaking Changes

<Describe authorized breaking changes or state `None`.>

### 29.4 Migration

<Describe migration or state that none is needed.>

Breaking changes not explicitly authorized are prohibited.

## 30. Implementation Guidance

Recommended sequence:

1. Inspect authoritative inputs.
2. Confirm current behavior or document state.
3. Identify contradictions.
4. Produce or update the execution plan.
5. Make the smallest coherent change.
6. Add or update verification artifacts.
7. Run required checks.
8. Review the complete diff.
9. Record evidence.
10. Stop without committing unless explicitly authorized.

## 31. Execution Plan Requirement

An approved execution plan is required when the work affects multiple architectural layers, changes a public contract, modifies multiple authoritative specifications, includes migration, introduces a dependency, is medium/high risk, or explicitly requires planning.

The plan must include:

1. repository facts;
2. contradictions;
3. files and symbols or sections to change;
4. implementation sequence;
5. verification strategy;
6. compatibility and security risks;
7. assumptions and deferred decisions;
8. evidence mapped to acceptance criteria.

## 32. Required Deliverables

1. <Deliverable>
2. <Deliverable>

### 32.1 Modified Artifacts

- `<path>`

### 32.2 New Artifacts

- `<path>`

### 32.3 Evidence Artifacts

- `engineering/reports/WP-<DOMAIN>-<NNNN>-execution-report.md`

## 33. Acceptance Criteria

### AC-001 — <Criterion Title>

<Precise, observable completion condition.>

**Evidence required:** <Evidence>

### AC-002 — <Criterion Title>

<Precise, observable completion condition.>

**Evidence required:** <Evidence>

### AC-003 — Scope Compliance

The diff contains no unrelated implementation, documentation, restructuring, or cleanup.

**Evidence required:** Reviewed diff and execution report.

### AC-004 — Authority Compliance

The work is consistent with all applicable accepted ADRs and specifications.

**Evidence required:** Authority review in the execution report.

### AC-005 — Verification

All required verification commands complete successfully.

**Evidence required:** Commands and results in the execution report.

### AC-006 — No Silent Contradictions

No known authoritative contradiction is resolved without explicit documentation.

**Evidence required:** Contradiction register.

### AC-007 — Diff Hygiene

The final diff contains no trailing whitespace, conflict markers, temporary files, accidental generated files, or unrelated changes.

**Evidence required:** `git diff --check` and repository inspection.

## 34. Acceptance-Criteria Traceability

| Acceptance Criterion | Requirement or Decision | Deliverable | Verification |
|---|---|---|---|
| AC-001 | WP-<DOMAIN>-REQ-001 | `<artifact>` | `<command or review>` |

Every mandatory criterion must map to explicit evidence.

## 35. Test Requirements

### 35.1 Unit Tests

- <Required test or `Not applicable`>

### 35.2 Integration Tests

- <Required test or `Not applicable`>

### 35.3 Conformance Tests

- <Required fixture or `Not applicable`>

### 35.4 Negative Tests

- <Invalid-input or failure-path test>

### 35.5 Regression Tests

- <Regression test>

For documentation-only work, state: **No implementation tests are required. Verification is document-, schema-, registry-, and repository-based.**

## 36. Verification Commands

```bash
git status --short
git diff --check
<format command>
<lint command>
<unit test command>
<integration test command>
<validation command>
<build command>
```

Commands that are not applicable must be marked `not applicable` in the execution report.

## 37. Manual Verification

- [ ] All affected files were reviewed.
- [ ] Metadata agrees with filenames and registry entries.
- [ ] Local references resolve.
- [ ] Public behavior matches documentation.
- [ ] Every acceptance criterion has evidence.
- [ ] No unrelated files changed.
- [ ] No temporary or accidental generated files are present.
- [ ] No unauthorized dependency was introduced.
- [ ] No unresolved contradiction was hidden.
- [ ] The final diff is understandable without chat history.

## 38. Review Requirements

Review scope, architecture, correctness, determinism, security, documentation agreement, repository hygiene, and whether tests actually prove the required behavior.

## 39. Risk Register

| Risk | Likelihood | Impact | Mitigation | Status |
|---|---|---|---|---|
| <Risk> | Low / Medium / High | Low / Medium / High | <Mitigation> | Open |

High-impact unresolved risks block completion unless explicitly accepted.

## 40. Contradiction Register

| ID | Source A | Source B | Conflict | Resolution |
|---|---|---|---|---|
| CR-001 | `<path>` | `<path>` | <Description> | Open |

## 41. Open Questions

1. <Question — blocking, non-blocking, deferred, or informational>

## 42. Stop Conditions

Stop and report a blocker when:

- an accepted ADR contradicts the required work;
- authoritative requirements are mutually exclusive;
- a required authoritative input is missing;
- an unauthorized architectural decision is required;
- scope must expand materially;
- an unauthorized production dependency is required;
- unrelated systems must be modified;
- verification cannot be completed;
- repository state differs materially from assumptions;
- uncontrolled security or data-loss risk exists;
- a destructive or irreversible action is required.

Record the trigger, affected criteria, repository evidence, resolution options, and smallest decision needed to continue.

## 43. Prohibited Actions

Unless separately authorized, do not:

- commit, push, merge, rebase, or rewrite history;
- delete branches;
- publish or deploy;
- modify external services;
- access secrets;
- enable unrestricted network access;
- bypass sandbox or approval controls;
- add unrelated dependencies;
- alter accepted ADRs;
- mark artifacts accepted;
- perform repository-wide cleanup;
- modify files outside the declared workspace.

## 44. Execution Evidence

Record:

- starting branch and commit;
- initial and final working-tree status;
- files examined, added, modified, deleted, and intentionally unchanged;
- decisions made and deferred;
- assumptions validated or invalidated;
- commands run and results;
- tests added, passed, failed, or skipped with reasons;
- acceptance-criterion status and evidence;
- `git diff --stat`;
- unrelated changes, dependency changes, and public-contract changes.

## 45. Required Execution Report

Create or update:

```text
engineering/reports/WP-<DOMAIN>-<NNNN>-execution-report.md
```

The report must be understandable without chat history and contain:

1. executive summary;
2. repository state;
3. authority review;
4. work performed;
5. files changed;
6. decisions and contradictions;
7. deferred decisions;
8. verification results;
9. acceptance-criteria matrix;
10. remaining risks;
11. final disposition.

## 46. Handoff Requirements

At stop or completion, provide:

- current status;
- branch and commit;
- completed and incomplete work;
- blockers and uncommitted changes;
- commands already run and failing checks;
- exact next action;
- files the next executor must read first.

## 47. Completion Checklist

### Authority and Scope

- [ ] All authoritative inputs were reviewed.
- [ ] No accepted ADR was modified without authorization.
- [ ] No contradiction was silently resolved.
- [ ] Work remained within scope.
- [ ] Out-of-scope findings were recorded separately.

### Deliverables and Verification

- [ ] All required deliverables exist.
- [ ] Metadata and registry records agree with the filesystem.
- [ ] Documentation agrees with resulting behavior.
- [ ] Applicable checks pass.
- [ ] `git diff --check` passes.
- [ ] Every acceptance criterion has evidence.
- [ ] The execution report is complete.

### Repository Hygiene

- [ ] No temporary, accidental generated, unrelated, or unauthorized dependency changes are present.
- [ ] No automated commit or push occurred unless explicitly authorized.

## 48. Definition of Done

This work packet is complete only when:

1. the objective is achieved;
2. all mandatory deliverables exist;
3. all mandatory acceptance criteria pass;
4. required tests and checks pass;
5. sufficient evidence is recorded;
6. no blocking contradiction remains;
7. no unauthorized scope expansion occurred;
8. the repository is internally consistent;
9. a human reviewer approves completion;
10. status is changed to `completed`.

Passing tests alone does not establish completion.

## 49. Completion Authorization

Completion authorizes:

- <Authorized follow-up planning>

Completion does not automatically authorize downstream implementation, deployment, publication, governance acceptance, breaking changes, or work outside listed successor scope.

## 50. Final Disposition

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

<Concise resulting repository state.>

### 50.2 Remaining Work

- <Remaining item>

### 50.3 Final Recommendation

<Recommended next action.>

## 51. Status History

| Date | Previous Status | New Status | Actor | Reason |
|---|---|---|---|---|
| YYYY-MM-DD | — | Proposed | <Actor> | Work packet created |

## 52. Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | YYYY-MM-DD | <Author> | Initial work packet |

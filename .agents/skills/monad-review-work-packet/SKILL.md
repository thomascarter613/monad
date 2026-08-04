---
name: monad-review-work-packet
description: Review a Monad work packet and its implementation against scope, acceptance criteria, architecture, tests, documentation, command contracts, and Definition of Done. Use for review, audit, QA, or verification requests concerning a named work packet. Default to read-only and produce prioritized, file-and-line findings. Do not implement fixes or close the packet unless explicitly requested.
---

# Monad Review Work Packet

Perform an evidence-based review of one work packet. Default to read-only.

## Operating principles

Apply these rules throughout this skill:

1. Work from the repository root returned by `git rev-parse --show-toplevel`.
2. Read the applicable `AGENTS.md` files before changing anything.
3. Inspect `git status --short --branch` and preserve unrelated user changes.
4. Treat the repository as the source of truth. Prefer existing templates, schemas, naming rules, and nearby examples over assumptions in this skill.
5. Use `rg`, `rg --files`, and narrow file reads before broad scans.
6. Make the smallest coherent change that satisfies the requested outcome.
7. Do not run destructive Git commands, rewrite history, commit, push, merge, or open a pull request unless the user explicitly requests it.
8. Do not silently migrate repository structure, manifest formats, identifiers, or status vocabularies.
9. When a command may mutate repository state, prefer its plan or dry-run mode first when available.
10. Record the commands run, their results, files changed, and any unverified assumptions in the final response.

## Repository discovery

Before applying the workflow:

1. Identify the repository root and current branch.
2. Read the nearest relevant `AGENTS.md`.
3. Locate the governing material, when present:
   - `README.md`
   - architecture overviews and principles
   - ADR indexes, templates, and accepted ADRs
   - work-packet standards, Definition of Ready, and Definition of Done
   - command-contract documentation
   - manifest schemas and examples
   - test strategy and validation scripts
4. Search for the exact identifier or subject before creating a new artifact.
5. If two files claim to be authoritative and the repository does not resolve the conflict, stop the mutation and report the ambiguity.


## Resolve the review target

1. Locate the exact work packet.
2. Determine its current status.
3. Read the entire packet and all linked ADRs, specifications, contracts, schemas, and dependencies.
4. Determine the implementation range using the strongest available evidence:
   - branch or worktree
   - commits named by the packet
   - pull request
   - packet-linked files
   - working-tree diff
5. Do not assume all uncommitted changes belong to the packet.
6. If no reliable change boundary exists, state the boundary used and its limitations.

## Review contract

Extract a checklist from:

- objective
- in-scope work
- out-of-scope work
- acceptance criteria
- deliverables
- non-functional requirements
- risk controls
- Definition of Done
- required verification commands

Review the implementation against that checklist, not against personal preference.

## Review dimensions

### Correctness

Check for:

- incorrect behavior
- missing edge cases
- state-transition errors
- partial-write behavior
- non-idempotent mutation
- invalid error handling or exit codes
- human/JSON/Markdown output disagreement
- stale generated artifacts
- manifest precedence or resolution errors

### Architecture

Check for:

- business logic placed in the CLI instead of a core layer
- dependencies pointing in the wrong direction
- language-specific implementation details leaking into language-neutral models
- native tools being replaced where Monad is meant to coordinate them
- conflicts with accepted ADRs
- undocumented architectural decisions

### Scope

Check for:

- omitted acceptance criteria
- unapproved breaking changes
- unrelated refactors
- speculative enhancements
- changes to locked terminology or taxonomy
- silent migration of manifest or documentation structures

### Tests and evidence

Check for:

- no test for a changed behavior
- tests that assert implementation details rather than contract behavior
- missing negative cases
- snapshots updated without behavioral justification
- tests not executed
- pre-existing failures presented as new success
- acceptance criteria without traceable evidence

### Documentation and contracts

Check for:

- CLI help that differs from docs
- outdated examples, paths, names, statuses, or identifiers
- missing frontmatter
- broken relative links
- command contract changes without contract tests
- stale schema or manifest examples
- prohibited or superseded document-series names

### Safety and repository hygiene

Check for:

- secrets or personal data
- destructive Git operations
- generated caches or binaries
- accidental changes
- unresolved merge markers
- formatting or whitespace errors
- files written outside intended boundaries

## Validation

Run relevant read-only checks when feasible:

```bash
git diff --check
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
monad check
monad docs check
```

Run narrower tests first. Do not edit files merely to make the review cleaner.

## Finding severity

Use these levels:

- **Blocker** — unsafe, data-loss risk, security exposure, invalid architecture decision, or impossible acceptance criterion
- **Major** — functional defect, missing required behavior, contract break, or failed required validation
- **Minor** — limited correctness, maintainability, documentation, or test gap
- **Note** — non-blocking observation or follow-up

Each finding must include:

1. severity
2. concise title
3. file and line, command output, or packet section
4. why it violates the packet or repository contract
5. the smallest viable correction

Do not create findings without evidence. Do not bury blockers in prose.

## Review decision

End with exactly one recommendation:

- **Pass for closeout**
- **Changes required**
- **Blocked by missing evidence**
- **Blocked by packet ambiguity**

A pass means all acceptance criteria have credible evidence, required checks pass, and no Blocker or Major findings remain. A pass does not itself close the packet.

## Final response

Present:

1. recommendation
2. findings ordered by severity
3. acceptance-criteria coverage table
4. validation commands and results
5. scope or evidence limitations
6. residual risks
7. next action

When no findings exist, say so explicitly and still list validation performed.

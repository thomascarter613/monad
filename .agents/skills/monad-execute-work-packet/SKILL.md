---
name: monad-execute-work-packet
description: Execute a specific Monad work packet from planned work through implementation and verification. Use only when the user explicitly asks to implement, execute, continue, or complete a named work packet. Enforce scope, Definition of Ready, acceptance criteria, tests, documentation, and status transitions. Do not use to invent a new work packet, review-only work, or close a packet.
---

# Monad Execute Work Packet

Execute one approved work packet without expanding its scope or closing it prematurely.

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


## Invocation boundary

This is a mutating skill. Use it only for an explicitly identified work packet or when the request clearly names the packet to continue.

This skill may transition a packet through:

```text
planned -> active -> verification
```

It must not transition a packet to `closeout`. Use `$monad-close-work-packet` for closure.

## Resolve the work packet

1. Locate the packet by exact identifier, title, path, issue link, or current active status.
2. Read the entire packet and all linked specifications, ADRs, command contracts, and dependencies.
3. Read the repository's:
   - work hierarchy
   - work-packet standard
   - Definition of Ready
   - Definition of Done
   - testing strategy
4. Identify:
   - objective
   - in-scope and out-of-scope work
   - acceptance criteria
   - deliverables
   - dependencies
   - risks
   - required evidence
   - validation commands
5. If more than one packet could be the target, do not guess.

## Readiness gate

Before editing implementation files, verify that the packet is ready.

The packet is not ready when any material condition is true:

- status is not `planned` or `active`
- objective or acceptance criteria are missing or contradictory
- required ADR or command contract is unresolved
- dependencies are unavailable
- the requested work conflicts with accepted architecture
- the packet depends on uncommitted user changes that are not understood
- the packet would require an unapproved destructive migration
- the packet's verification method is impossible to perform

When not ready, stop before mutation and produce a readiness report with exact blockers.

## Establish the baseline

1. Capture `git status --short --branch`.
2. Run the narrow existing tests for the affected area.
3. Record pre-existing failures separately.
4. Inspect the current command, schema, snapshot, or behavior being changed.
5. Use a plan or dry-run command when the packet or CLI provides one.
6. If the repository generates work-packet plans, preserve expected outputs such as:
   - `.monad/reports/work-packet-plan.md`
   - `.monad/reports/work-packet-plan.json`

Do not claim a regression was introduced by this packet when it existed in the baseline.

## Activate the packet

When the readiness gate passes:

1. Change status from `planned` to `active` using the repository's established mechanism.
2. Record the activation date or progress entry only if the packet format requires it.
3. Do not rewrite the original objective or acceptance criteria to fit the implementation.

## Execute

1. Convert acceptance criteria into a concrete implementation checklist.
2. Work in the smallest dependency-respecting sequence.
3. Keep the CLI thin and place domain behavior in the appropriate core layer.
4. Preserve language-neutral architecture; map to language-specific layouts only at generator or adapter boundaries.
5. Add or update tests alongside behavior.
6. Update command contracts, schemas, snapshots, fixtures, examples, and docs when the behavior affects them.
7. Preserve backward compatibility unless the packet explicitly authorizes a breaking change.
8. Do not implement out-of-scope enhancements merely because they are nearby.
9. Record newly discovered work as follow-up candidates rather than silently absorbing it.
10. After each coherent change, run the narrowest relevant validation.

## Mutation safety

For commands that write files or repository state:

- preserve dry-run and plan behavior
- verify idempotency when required
- avoid partial writes
- use atomic replacement where the project already does so
- return non-zero exit status on failure
- keep human-readable and structured output contracts synchronized
- never expose secrets in logs, reports, fixtures, or generated context

## Verification gate

Before transitioning to `verification`:

1. Re-read every acceptance criterion.
2. Map each criterion to evidence:
   - implementation path
   - test
   - generated artifact
   - command output
   - documentation
3. Run relevant checks, commonly:

```bash
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
monad check
monad docs check
```

4. Run command-contract, snapshot, schema, manifest-resolution, documentation-consistency, handoff, and mutation-safety tests when affected.
5. Inspect `git diff --check`.
6. Inspect the complete diff for accidental, generated, secret, or unrelated files.
7. Confirm that pre-existing failures are still distinguished from new failures.

Transition the packet to `verification` only when all acceptance criteria have evidence and no blocking validation fails.

## Stop conditions

Stop and report rather than improvising when:

- execution requires a new architectural decision
- the work packet must materially change scope
- a dependency or schema is missing
- validation reveals an unrelated systemic failure
- user edits overlap the same lines in a way that cannot be preserved
- an irreversible or externally visible action is required
- credentials, production access, publishing, merging, or deployment is required but not explicitly authorized

## Final response

Report:

1. packet identifier, title, and resulting status
2. readiness result
3. acceptance-criterion evidence
4. implementation summary
5. files changed
6. commands run and results
7. pre-existing failures
8. remaining risks and follow-up work
9. whether the packet is ready for `$monad-review-work-packet`

Do not call the packet closed.

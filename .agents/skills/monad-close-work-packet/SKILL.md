---
name: monad-close-work-packet
description: Close a verified Monad work packet only after acceptance criteria, Definition of Done, review, tests, documentation, and required validation all pass. Use only when the user explicitly asks to close, finalize, or complete a named work packet. Produce closeout evidence and a handoff, then transition status to `closeout`. Do not close packets with blockers or missing evidence.
---

# Monad Close Work Packet

Close one work packet conservatively. Closure is an evidence gate, not an administrative label change.

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

This is a mutating skill and must be explicitly invoked or clearly requested for a named packet.

The only successful transition performed by this skill is:

```text
verification -> closeout
```

Do not use `closed`, `done`, or `complete` as a replacement status unless the repository has explicitly changed its status model.

## Resolve the packet

1. Locate the exact packet.
2. Read the complete packet, review findings, linked ADRs, specifications, command contracts, and validation evidence.
3. Verify current status is exactly `verification`.
4. Identify the implementation boundary and current working-tree state.
5. Read the Definition of Done and closeout requirements.

If the packet is `planned` or `active`, do not skip directly to closeout.

## Closure preconditions

Every applicable precondition must pass:

- objective remains satisfied
- every acceptance criterion has traceable evidence
- all required deliverables exist
- no Blocker or Major review finding remains
- required tests pass
- formatting and static checks pass
- command contracts match implementation
- documentation is consistent
- manifests validate when touched
- no unresolved merge markers or accidental files exist
- no secrets are present
- out-of-scope work has not been silently included
- follow-up work is recorded without being misrepresented as complete
- user changes are preserved
- closeout can be reproduced from repository evidence

A waived check must be explicitly authorized and recorded. Do not silently waive checks.

## Independent final review

Perform or apply the procedure from `$monad-review-work-packet`.

A packet is not closable when the review recommendation is:

- Changes required
- Blocked by missing evidence
- Blocked by packet ambiguity

Do not modify review standards to obtain a pass.

## Required validation

Run the packet's declared commands plus relevant repository gates:

```bash
git diff --check
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
monad check
monad docs check
```

When applicable, run:

- command-contract tests
- snapshot tests
- schema tests
- manifest-resolution tests
- lock determinism tests
- documentation consistency tests
- handoff tests
- mutation-safety tests
- end-to-end CLI tests

Record exact command results. Distinguish pre-existing failures. A required failing check blocks closure unless an explicit repository-approved exception exists.

## Evidence matrix

Create or update a closeout evidence section that maps:

| Acceptance criterion | Evidence | Result |
|---|---|---|
| exact criterion | file/test/command/artifact | pass/fail |

Do not use vague evidence such as "implemented" or "tested."

## Closeout handoff

Apply the procedure from `$monad-generate-handoff`.

When no stronger convention exists, create:

```text
.monad/work-packets/<packet-id>-closeout-handoff.md
```

Include:

- packet identity and final status
- objective
- delivered changes
- decision links
- changed files
- validation evidence
- known residual risks
- deferred work
- exact next recommended packet or action
- restart prompt when follow-up work exists

Exclude secrets and unverified claims.

## Transition and final updates

Only after all gates pass:

1. set status to `closeout`
2. record closeout date if required
3. complete the evidence matrix
4. link the closeout handoff
5. update packet indexes or dashboards
6. update related docs that still describe the packet as active or in verification
7. preserve the packet's original scope and acceptance criteria
8. rerun documentation consistency checks

Do not commit, merge, push, tag, release, or deploy unless separately requested.

## Failure behavior

When closure is blocked:

1. leave status unchanged
2. do not create a misleading final handoff
3. report the exact failed gate
4. point to evidence
5. provide the smallest remediation sequence
6. state which checks must be rerun

A partial closeout is not a closeout.

## Final response

On success, report:

1. packet identifier and title
2. transition `verification -> closeout`
3. acceptance-criterion evidence summary
4. review recommendation
5. validation commands and results
6. closeout handoff path
7. files changed
8. deferred work and residual risks

On failure, begin with **Closure blocked** and name the first blocking gate.

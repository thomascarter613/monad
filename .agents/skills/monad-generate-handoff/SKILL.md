---
name: monad-generate-handoff
description: Generate a factual Monad engineering handoff or context pack that another human or Codex session can resume without reconstructing the work. Use when pausing work, changing agents, ending a session, summarizing current repository state, or producing a work-packet closeout handoff. Exclude secrets and distinguish completed, in-progress, blocked, and unverified work.
---

# Monad Generate Handoff

Create a concise but operationally complete handoff grounded in repository evidence.

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


## Select the handoff type

Choose the narrowest applicable type:

1. **Session handoff** — current work, state, risks, and next actions
2. **Context pack** — broader repository and command-surface context
3. **Work-packet handoff** — one packet's execution or verification state
4. **Closeout handoff** — closure evidence and follow-up work

Follow existing repository paths and templates.

When no stronger convention exists:

- latest context pack: `.monad/context/latest-context-pack.md`
- work-packet closeout handoff: `.monad/work-packets/<packet-id>-closeout-handoff.md`

Do not create duplicate competing "latest" files.

## Gather evidence

Collect, as relevant:

- repository identity and root
- current branch and HEAD
- `git status --short --branch`
- active work packet and exact status
- objective and scope
- completed changes
- in-progress changes
- files changed
- current command surface
- accepted decisions
- manifest model
- validation commands and results
- pre-existing failures
- blockers
- known risks
- missing or unverified information
- exact next actions
- restart command or suggested first prompt

Read actual files and command output. Do not rely on memory when repository evidence is available.

## Secret and privacy boundary

Never include secret contents.

Exclude or redact:

- `.env` values
- API keys and tokens
- private keys such as `id_rsa`
- authentication cookies
- credential files
- password-manager data
- private user data
- full environment dumps
- remote URLs containing credentials

It is acceptable to state that a required secret is missing or that a variable name must be configured. Do not include its value.

## Generation procedure

1. Check whether `monad context handoff` exists.
2. If it exists, inspect help and use its dry-run or output-path controls when available.
3. Generate into the repository's established handoff path.
4. Add YAML frontmatter when Markdown under `.monad` requires it.
5. Use explicit timestamps with timezone when the format requires a timestamp.
6. Separate facts from interpretation.
7. Mark each item as one of:
   - complete
   - in progress
   - blocked
   - deferred
   - unverified
8. Include exact paths, identifiers, and commands.
9. Keep command outputs summarized; include only the lines needed to diagnose or resume.
10. Make next steps executable and ordered.
11. Include a restart prompt that names the work packet, status, first file to read, and first verification command.
12. If a previous latest handoff exists, replace or archive it only according to repository policy.

## Minimum handoff structure

When no repository template exists, use:

```markdown
---
kind: monad-handoff
status: current
created_at: <timestamp>
repository: <name>
branch: <branch>
head: <sha>
work_packet: <id-or-null>
---

# Monad Handoff

## Resume Here
## Repository State
## Current Objective
## Completed
## In Progress
## Decisions and Constraints
## Command Surface
## Files Changed
## Validation Evidence
## Known Failures
## Risks and Missing Information
## Next Actions
## Restart Prompt
```

Omit empty optional sections only when the repository template permits.

## Quality checks

Verify:

- every important claim has repository evidence
- paths and identifiers exist
- status matches the work packet
- command names match current help or contract docs
- validation results identify when they were run
- secret patterns are absent
- unresolved items are not described as complete
- the handoff can be understood without the prior chat

Useful checks may include:

```bash
monad context handoff --help
monad docs check
git diff --check
```

Search the generated file for likely secret markers before finishing.

## Final response

Report:

1. handoff type and path
2. repository/branch/HEAD recorded
3. work packet and status
4. validation evidence included
5. redactions or intentionally omitted sensitive sources
6. the first recommended next action

Do not paste secret-adjacent environment output into the response.

---
name: monad-update-command-contract
description: Add or change a Monad CLI command contract and synchronize implementation, help, structured output, errors, tests, schemas, snapshots, examples, and documentation. Use when the user asks to add, rename, remove, or change a `monad` command, subcommand, option, output mode, exit code, or side effect. Do not use for internal refactors that leave observable command behavior unchanged.
---

# Monad Update Command Contract

Treat the CLI surface as a public behavioral contract, not merely parser configuration.

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


## Resolve the requested change

Identify:

- command path, such as `monad adr new`
- user goal
- current behavior
- requested behavior
- compatibility expectation
- affected output modes
- mutation behavior
- status of implementation versus documentation

Search the entire repository for the command name, aliases, help text, examples, snapshots, schemas, and tests before editing.

## Inventory the current contract

Document the current observable behavior:

| Contract element | Questions |
|---|---|
| Invocation | What command path and aliases exist? |
| Arguments | Which positional arguments are required or optional? |
| Options | Names, short flags, defaults, conflicts, and repeatability? |
| Input | TTY dialogue, stdin, files, environment, manifests? |
| Output | stdout formats, stderr diagnostics, ordering, stability? |
| Exit status | Success, usage error, validation error, internal error? |
| Side effects | Files, directories, state, cache, network, Git? |
| Safety | Dry-run, plan, confirmation, idempotency, rollback? |
| Compatibility | Existing scripts, snapshots, schemas, docs, aliases? |
| Examples | Do examples execute exactly as documented? |

Locate both human-readable and machine-readable contract definitions.

## Design rules

1. Keep the CLI thin. Parsing and presentation may live in the CLI; durable business behavior belongs in the appropriate core or engine layer.
2. Preserve existing behavior unless the request explicitly authorizes a breaking change.
3. Prefer additive evolution:
   - add new option before changing a default
   - deprecate before removing
   - retain an alias when repository policy permits
4. Stable structured output must not depend on terminal width, color, locale, or incidental ordering.
5. Diagnostics go to stderr; requested results go to stdout.
6. Return meaningful non-zero exit codes for usage, validation, conflict, and execution failures according to repository conventions.
7. Mutating commands should support plan or dry-run behavior when practical and required by project policy.
8. Re-running an idempotent command must not corrupt or duplicate state.
9. Never make network access, AI use, telemetry, or external side effects implicit when the command contract says local-first.
10. Do not implement domain policy as command-handler conditionals when it belongs in a reusable service.

## Contract update procedure

1. Produce a concise before/after contract table.
2. Determine whether an ADR is required. Invoke or recommend `$monad-create-adr` when the change introduces a durable architectural or compatibility decision.
3. Update the canonical command-contract document or schema first when the project uses contract-first development.
4. Update parser and dispatch wiring.
5. Implement or adapt core behavior.
6. Update:
   - help text
   - shell completion definitions
   - man pages or reference docs
   - examples
   - structured-output schemas
   - snapshots and fixtures
   - error messages and exit-code tests
7. For command families, preserve consistent nouns and verbs. Established examples may include:
   - `monad adr list|new|supersede`
   - `monad workpacket list|new|plan`
   - `monad context handoff`
   - `monad docs check`
8. Keep names aligned across source, docs, tests, and generated artifacts.
9. If the command replaces another command, add explicit deprecation behavior and migration notes rather than silently changing semantics.

## Required test coverage

Cover relevant cases:

- top-level and subcommand help
- valid minimal invocation
- valid full invocation
- missing required arguments
- unknown option
- conflicting options
- invalid manifest or state
- dry-run or plan behavior
- mutation success
- partial-failure safety
- idempotent repeat
- human-readable output
- JSON output
- Markdown output when supported
- stdout/stderr separation
- exit codes
- snapshots or golden files
- backward-compatibility alias or deprecation

Do not update snapshots blindly. Inspect and justify every observable change.

## Validation

Run targeted tests and then applicable repository checks:

```bash
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
monad check
monad docs check
git diff --check
```

Also run the changed command manually in a temporary fixture or isolated directory when safe.

For a mutating command, verify the filesystem before and after, and confirm dry-run does not mutate.

## Final response

Report:

1. command path
2. before/after contract
3. compatibility classification: additive, deprecating, or breaking
4. implementation and documentation files changed
5. tests added or updated
6. commands run and results
7. migration notes
8. unresolved contract questions

Do not call a breaking change backward-compatible.

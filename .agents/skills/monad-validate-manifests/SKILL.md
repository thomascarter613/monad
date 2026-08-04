---
name: monad-validate-manifests
description: Validate Monad repository manifests and derived state without silently rewriting them. Use when the user mentions monad.toml, monad.yaml, workspace manifests, monad.lock, .monad manifest/state files, manifest parsing, repository identity, workspace membership, schema errors, or `monad check`. Default to read-only; do not migrate formats unless explicitly requested.
---

# Monad Validate Manifests

Validate syntax, schema, semantics, precedence, references, and derived state across Monad manifests.

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


## Authority discovery

Do not infer authority from filenames alone. Read accepted ADRs, manifest documentation, schemas, and implementation code.

When the repository has not yet documented another rule, use this fallback model:

- `monad.toml` — canonical public project manifest
- `workspace.toml` — compatibility mirror, not an independent source of truth
- `monad.lock` — resolved deterministic state
- `.monad/` — local state, cache, reports, and context

Recognize bootstrap or legacy files without silently converting them:

- `monad.yaml`
- `workspace.yaml`
- `.monad/manifest.yaml`
- `.monad/repository.yaml`
- `.monad/identity.yaml`
- `.monad/state.yaml`

If accepted repository policy differs, follow it. If two formats are simultaneously authoritative and conflict, report the conflict and stop short of rewriting.

## Inventory

Locate:

1. all root and nested Monad manifests
2. workspace membership files
3. lockfiles
4. schemas
5. generated or compatibility mirrors
6. local state and identity files
7. manifest fixtures and tests
8. code that resolves precedence and defaults

Classify each file as:

- canonical input
- compatibility input
- derived output
- local mutable state
- immutable identity
- cache
- test fixture
- unknown

## Validation layers

### 1. Parse validation

Verify:

- TOML/YAML syntax
- duplicate keys
- malformed scalars
- invalid quoting or indentation
- unsupported top-level types
- file encoding and line endings when relevant

Use the project's parser or CLI before generic parsers when available.

### 2. Schema validation

Verify:

- required fields
- allowed fields
- type correctness
- enum values
- semantic version format
- identifier format
- relative versus absolute path rules
- unknown-field policy
- schema version compatibility

Do not accept an unknown field merely because the parser ignores it.

### 3. Semantic validation

Verify:

- repository name and identity agreement
- workspace member uniqueness
- member paths exist and stay within permitted boundaries
- no duplicate artifact identities
- package/component names do not collide
- dependency references resolve
- generated directories are not mistaken for source members
- root taxonomy remains language-neutral
- target-language layouts are represented as mappings rather than root architectural policy

### 4. Precedence and mirror validation

Verify:

- the canonical manifest wins when a mirror differs
- compatibility mirrors are reproducible from the canonical source
- no circular precedence exists
- nested manifests inherit or override only as documented
- defaults are deterministic
- environment or CLI overrides are explicit and testable

### 5. Lock and derived-state validation

Verify:

- `monad.lock` corresponds to canonical inputs
- lock generation is deterministic
- stale entries are reported
- local mutable state does not leak into versioned canonical configuration
- immutable identity is not regenerated casually
- caches can be removed without loss of canonical information

### 6. Safety validation

Verify that manifests, lockfiles, and state do not expose:

- secrets
- tokens
- private keys
- `.env` contents
- machine-specific absolute paths unless explicitly allowed
- user-specific transient data in canonical files

## Commands

Prefer repository-native commands:

```bash
monad check
monad inspect
monad validate
```

Use only commands that exist. When the repository is a Rust workspace, relevant checks may include:

```bash
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
```

Run manifest parser, schema, resolution, lock determinism, and fixture tests when present.

For a mutating validation command, use dry-run or plan mode first.

## Diagnostics

For each failure, report:

- severity
- file and field path
- observed value
- expected rule
- source of the rule
- smallest safe fix
- whether the failure blocks other validation

Distinguish:

- parse errors
- schema errors
- semantic errors
- precedence conflicts
- drift
- warnings
- informational legacy-format observations

Do not rewrite files by default. When the user asks for fixes, preserve comments and formatting where practical and make the minimal correction.

## Final response

Report:

1. overall result: pass, pass with warnings, or fail
2. manifest inventory and classification
3. canonical source and precedence model discovered
4. diagnostics grouped by layer
5. commands run and results
6. files changed, normally none
7. safe next steps

Never claim a manifest is valid when only its syntax was checked.

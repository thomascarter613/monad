---
name: monad-create-adr
description: Create a Monad architecture decision record (ADR), including the next identifier, repository-standard frontmatter, decision analysis, consequences, alternatives, links, and validation. Use when the user asks to record, formalize, accept, supersede, or document an architectural decision. Do not use for ordinary design notes, implementation plans, or editing an unrelated existing ADR.
---

# Monad Create ADR

Create one decision record that is historically durable, narrowly scoped, and consistent with the repository.

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


## Inputs to resolve

Determine from the request and repository:

- the decision being made
- the problem and decision drivers
- the chosen option
- meaningful alternatives
- consequences and follow-up work
- intended status
- related ADRs, specifications, work packets, commands, manifests, and components
- whether the new ADR supersedes an earlier ADR

Do not fabricate deciders, dates, benchmarks, compatibility guarantees, or implementation status. Use visible placeholders only when a minor field is required but unknown.

## Locate the ADR system

Use this priority:

1. Follow an explicit ADR path or template named by `AGENTS.md` or accepted repository policy.
2. Otherwise, use an existing ADR collection such as:
   - `docs/06-adrs/`
   - `adrs/`
3. If both exist, determine which is current from indexes, links, recent files, or accepted ADRs. Do not create a third location.
4. Match the dominant filename, frontmatter, heading, status, and section conventions.

Expected filename pattern when no stronger convention exists:

```text
ADR-####-<kebab-case-slug>.md
```

Determine the next identifier from the highest existing numeric ADR identifier. Do not reuse an identifier. Do not renumber older ADRs.

## Status rules

Preserve the repository's exact status vocabulary and capitalization.

When no repository rule exists:

- use `Proposed` for a newly drafted decision
- use `Accepted` only when the user explicitly states that the decision is accepted
- represent supersession explicitly rather than deleting or rewriting history

Do not mark an ADR accepted merely because its implementation exists.

## Drafting procedure

1. Search for existing ADRs and specifications that already decide or constrain the topic.
2. Summarize the decision in one declarative sentence.
3. Separate the enduring architectural decision from temporary implementation detail.
4. Copy the current ADR template if one exists.
5. Create frontmatter if repository Markdown requires it.
6. Write the ADR using the repository template. When no template exists, use:
   - Context
   - Decision
   - Consequences
   - Alternatives Considered
   - Follow-Up Actions
7. In **Context**, explain the forces that make the decision necessary.
8. In **Decision**, state what Monad will do, what it will not do, and where the boundary lies.
9. In **Consequences**, include positive, negative, operational, compatibility, migration, and testing consequences that are actually relevant.
10. In **Alternatives Considered**, explain why each serious alternative was not selected.
11. In **Follow-Up Actions**, reference concrete work without pretending it is already complete.
12. Add links to related ADRs, specifications, command contracts, or work packets using repository-relative links.
13. Update the ADR index, navigation, or cross-references when the repository maintains them.
14. When superseding an ADR:
    - update the old ADR only as much as needed to record its superseded status and replacement link
    - preserve its original decision text
    - add a reciprocal link from the new ADR

## Monad invariants to preserve

Unless an accepted ADR says otherwise:

- Monad is the unified product name.
- Knowledge is a primary artifact.
- The repository is the source of truth.
- Work packets are the primary delivery unit.
- The CLI should remain thin; domain behavior belongs in durable core components.
- Monad coordinates native tools rather than replacing them by default.
- The system is local-first, provider-agnostic, language-agnostic, and human-supervised.
- Language-specific layouts are generator mappings, not the root architectural taxonomy.
- Existing pre-normative MKE documents must not be silently reclassified or renamed.
- Do not introduce the deprecated series name `MKE-SPEC`; use the repository's current series taxonomy.

These are constraints, not boilerplate. Mention only those that materially affect the decision.

## Validation

Run the narrowest available checks, then broader checks when feasible:

```bash
monad docs check
monad check
cargo fmt --all --check
cargo check --workspace
cargo test --workspace
```

Only run commands that exist and are relevant. Also verify:

- the identifier and filename are unique
- frontmatter parses
- required sections exist
- relative links resolve
- indexes and navigation reference the new ADR
- status and supersession links are internally consistent
- the ADR does not claim implementation evidence that is absent

## Final response

Report:

1. ADR identifier, title, status, and path
2. the decision in one sentence
3. related or superseded ADRs
4. files created or updated
5. validation commands and results
6. follow-up actions or unresolved questions

Do not paste the entire ADR unless the user requests it.

---
title: "Monad Implementation Epics and Slices"
description: "Ordered implementation roadmap for Monad from approved product charter through MVP readiness."
project_name: "Monad"
project_slug: "monad"
document_type: "implementation-roadmap"
document_status: "approved"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "implementation"
canonical_path: "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/roadmap/ROADMAP.md"
  - "docs/ai/CURRENT_STATE.md"
tags:
  - monad
  - implementation
  - roadmap
  - epics
  - slices
  - rust
  - cli
  - repo-runtime
  - mvp
---

# Monad Implementation Epics and Slices

## 1. Purpose

This document is the ordered implementation map for Monad.

It exists to answer:

- where we are;
- what has already been completed;
- what comes next;
- which epic each implementation slice belongs to;
- what commit should be made for each slice;
- how Monad progresses from approved product direction to MVP readiness.

This document should be updated as implementation progresses.

## 2. Scope

This roadmap covers Monad from the approved pre-implementation planning foundation through the first credible MVP.

It includes:

1. foundational documentation;
2. accepted architecture decisions;
3. Rust workspace scaffold;
4. CLI bootstrap;
5. manifest handling;
6. diagnostics;
7. command smoke tests;
8. local verification;
9. CI;
10. adapter foundation;
11. native tool coordination;
12. task/check execution;
13. graph generation;
14. file operations;
15. templates;
16. repo evolution;
17. AI-readable context;
18. policy and governance;
19. release and packaging;
20. MVP hardening.

This document is intentionally slice-based. Each slice should be small enough to implement, verify, and commit atomically.

## 3. Status Legend

| Status | Meaning |
| --- | --- |
| Done | Completed and accepted. |
| Current | The slice currently being implemented or reviewed. |
| Next | The next recommended slice. |
| Planned | Not started yet. |
| Deferred | Intentionally postponed. |
| Revisit | Requires future review before implementation. |

## 4. Current Position

As of this document version, Monad is in:

```text
Epic E1 — Runtime Foundation & CLI Bootstrap
```

Current completed implementation slices are assumed to include:

1. Rust workspace scaffold.
2. CLI command parsing.
3. Workspace root detection.
4. Monad manifest detection.
5. Initial manifest parsing.
6. Basic diagnostics model.
7. Doctor command.
8. Check command skeleton.

The next recommended slice is:

```text
E1-S9 — test(cli): add command smoke tests
```

Approximate MVP completion:

```text
~11%
```

This percentage is approximate. It reflects the number of completed planning and implementation slices relative to the total MVP roadmap, not production maturity.

## 5. Slice Completion Rules

A slice is complete when:

1. the code or documentation has been written;
2. formatting passes;
3. tests pass;
4. Clippy passes with warnings denied;
5. the relevant command has been manually exercised where applicable;
6. the commit is atomic;
7. the commit message follows Conventional Commits;
8. future work is clearly identified.

Standard verification command until `tools/scripts/verify.sh` exists:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once available, the preferred command becomes:

```bash
./tools/scripts/verify.sh
```

---

# Epic E0 — Project Framing and Architecture Decisions

## Goal

Establish Monad’s canonical product direction and pre-code architecture constraints.

## Status

Done.

## Slices

| Slice  | Status  | Commit                                                  | Goal                                              |
| ------ | ------- | ------------------------------------------------------- | ------------------------------------------------- |
| E0-S1  | Done    | `docs(project): add Monad project intake`               | Establish initial project intake.                 |
| E0-S2  | Done    | `docs(project): add Monad product charter`              | Establish approved product mandate.               |
| E0-S3  | Done    | `docs(adr): add architecture decision record index`     | Create ADR governance system.                     |
| E0-S4  | Done    | `docs(adr): record Rust runtime decision`               | Record Rust as the primary runtime language.      |
| E0-S5  | Done    | `docs(adr): record native tool coordination decision`   | Record native-tool coordination strategy.         |
| E0-S6  | Done    | `docs(adr): record multi-crate Rust workspace decision` | Record initial multi-crate workspace structure.   |
| E0-S7  | Done    | `docs(adr): record latest stable Rust MSRV policy`      | Record latest stable Rust policy.                 |
| E0-S8  | Done    | `docs(adr): record immediate Tokio runtime decision`    | Record Tokio runtime decision.                    |
| E0-S9  | Done    | `docs(adr): record monad manifest decision`             | Record `monad.toml` decision.                     |
| E0-S10 | Done    | `docs(adr): record Monad lock and state file decision`  | Record `monad.lock` and `.monad/` state model.    |
| E0-S11 | Done    | `docs(adr): record graph output format decision`        | Record multi-format graph output decision.        |
| E0-S12 | Done    | `docs(adr): update accepted architecture decisions`     | Update ADR index after ADR-0001 through ADR-0008. |
| E0-S13 | Done | `docs(roadmap): add implementation epics and slices`    | Add this roadmap document.                        |

---

# Epic E1 — Runtime Foundation and CLI Bootstrap

## Goal

Create a compileable Rust CLI foundation with basic workspace, manifest, diagnostics, and command skeleton behavior.

## Status

In progress.

## Slices

| Slice  | Status          | Commit                                           | Goal                                                                           |
| ------ | --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| E1-S1  | Done            | `chore(repo): add Rust workspace scaffold`       | Add root Rust workspace, `monad-cli`, `monad-core`, Tokio, and toolchain file. |
| E1-S2  | Done            | `docs(adr): record CLI command parsing decision` | Record `clap` as CLI parser.                                                   |
| E1-S3  | Done            | `feat(cli): add Monad CLI command parsing`       | Add `clap`, `monad --help`, `monad --version`, and `monad info`.               |
| E1-S4  | Done            | `feat(workspace): detect workspace root`         | Detect root using `monad.toml`, `.git`, or Cargo workspace.                    |
| E1-S5  | Done            | `feat(manifest): detect monad manifest`          | Detect root-level `monad.toml`.                                                |
| E1-S6  | Done            | `feat(manifest): parse initial monad manifest`   | Parse initial TOML manifest with schema version support.                       |
| E1-S7  | Done            | `feat(diagnostics): add basic diagnostics model` | Add typed diagnostics and summaries.                                           |
| E1-S8  | Done            | `feat(cli): add doctor command`                  | Add `monad doctor` for basic health checks.                                    |
| E1-S9  | Done            | `feat(cli): add check command skeleton`          | Add `monad check` skeleton over manifest-defined check IDs.                    |
| E1-S10 | Next            | `test(cli): add command smoke tests`             | Add CLI smoke tests for help/version/info/doctor/check.                        |
| E1-S11 | Planned         | `chore(verify): add local verification script`   | Add `tools/scripts/verify.sh`.                                                 |
| E1-S12 | Planned         | `ci: add initial verification workflow`          | Add GitHub Actions workflow using the local verification script.               |
| E1-S13 | Planned         | `refactor(cli): extract command handlers`        | Move growing command logic out of `main.rs`.                                   |
| E1-S14 | Planned         | `docs(dev): add initial development workflow`    | Document local development and verification commands.                          |

## Definition of Done

Epic E1 is complete when:

1. `monad --help` works.
2. `monad --version` works.
3. `monad info` works.
4. `monad doctor` works.
5. `monad check` works as a skeleton.
6. CLI smoke tests exist.
7. `tools/scripts/verify.sh` exists.
8. GitHub Actions runs verification.
9. `main.rs` is not overloaded with all command logic.
10. Developer setup is documented.

---

# Epic E2 — Manifest, State, and Configuration Foundation

## Goal

Turn `monad.toml` from a parsed file into a validated source of repo-level intent, then introduce the first lock/state model.

## Slices

| Slice  | Status  | Commit                                          | Goal                                                                  |
| ------ | ------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| E2-S1  | Planned | `docs(spec): add initial monad manifest schema` | Document `monad.toml` schema v0.1.                                    |
| E2-S2  | Planned | `feat(manifest): add validated manifest model`  | Separate raw parsed manifest from validated manifest.                 |
| E2-S3  | Planned | `feat(manifest): add manifest diagnostics`      | Emit structured diagnostics for schema and validation issues.         |
| E2-S4  | Planned | `feat(manifest): validate workspace section`    | Validate workspace name, kind, and root.                              |
| E2-S5  | Planned | `feat(manifest): validate adapter section`      | Validate known adapter names and enabled flags.                       |
| E2-S6  | Planned | `feat(manifest): validate command identifiers`  | Validate command IDs such as `rust:fmt`.                              |
| E2-S7  | Planned | `feat(manifest): add manifest path override`    | Support explicit manifest path flag later, such as `--manifest-path`. |
| E2-S8  | Planned | `feat(state): add monad lock model`             | Introduce first typed `monad.lock` model.                             |
| E2-S9  | Planned | `feat(state): write initial monad lock`         | Generate minimal lock file.                                           |
| E2-S10 | Planned | `feat(state): detect stale monad lock`          | Compare lock state against manifest fingerprint.                      |
| E2-S11 | Planned | `feat(state): add state diagnostics`            | Report missing, invalid, or stale lock state.                         |
| E2-S12 | Planned | `test(manifest): add manifest fixture tests`    | Add valid/invalid manifest fixtures.                                  |
| E2-S13 | Planned | `test(state): add lock state fixture tests`     | Add valid/missing/stale lock fixtures.                                |
| E2-S14 | Planned | `docs(reference): document monad manifest`      | Add user-facing manifest reference.                                   |

---

# Epic E3 — Diagnostics, Output, and CLI UX

## Goal

Make command output clearer, more consistent, and ready for human-readable and machine-readable modes.

## Slices

| Slice  | Status  | Commit                                           | Goal                                        |
| ------ | ------- | ------------------------------------------------ | ------------------------------------------- |
| E3-S1  | Planned | `docs(adr): record CLI output format policy`     | Decide human text and JSON output rules.    |
| E3-S2  | Planned | `feat(cli): add global verbose flag`             | Add `--verbose`.                            |
| E3-S3  | Planned | `feat(cli): add global quiet flag`               | Add `--quiet`.                              |
| E3-S4  | Planned | `feat(cli): add json output flag`                | Add `--json` for supported commands.        |
| E3-S5  | Planned | `feat(output): add human diagnostic renderer`    | Centralize text rendering for diagnostics.  |
| E3-S6  | Planned | `feat(output): add json diagnostic renderer`     | Add machine-readable diagnostic output.     |
| E3-S7  | Planned | `feat(output): add stable command result model`  | Model command results before rendering.     |
| E3-S8  | Planned | `feat(cli): add color mode flag`                 | Add `--color` / `--no-color` or equivalent. |
| E3-S9  | Planned | `feat(cli): add exit code policy`                | Introduce stable exit codes.                |
| E3-S10 | Planned | `test(output): add output snapshot tests`        | Snapshot output for stable CLI behavior.    |
| E3-S11 | Planned | `docs(cli): document command output conventions` | Document output contract.                   |
| E3-S12 | Planned | `docs(adr): record exit code policy`             | Record exit semantics if consequential.     |

---

# Epic E4 — Ecosystem Adapter Foundation

## Goal

Introduce the adapter abstraction that lets Monad detect and coordinate native tools without replacing them.

## Slices

| Slice  | Status  | Commit                                           | Goal                                                  |
| ------ | ------- | ------------------------------------------------ | ----------------------------------------------------- |
| E4-S1  | Planned | `docs(adr): record adapter architecture`         | Decide initial adapter model and capability strategy. |
| E4-S2  | Planned | `feat(adapter): add adapter capability model`    | Define adapter capabilities.                          |
| E4-S3  | Planned | `feat(adapter): add adapter registry`            | Add registry for enabled/detected adapters.           |
| E4-S4  | Planned | `feat(adapter): add tool detection model`        | Model native tool presence/version.                   |
| E4-S5  | Planned | `feat(adapter): add command identifier model`    | Model IDs like `rust:fmt`, `bun:test`.                |
| E4-S6  | Planned | `feat(adapter-rust): detect cargo workspace`     | Detect Cargo workspace information.                   |
| E4-S7  | Planned | `feat(adapter-rust): detect rust toolchain`      | Detect Rust/Cargo/rustfmt/clippy availability.        |
| E4-S8  | Planned | `feat(adapter-rust): map rust check commands`    | Map `rust:fmt`, `rust:clippy`, `rust:test`.           |
| E4-S9  | Planned | `feat(adapter-bun): detect bun workspace`        | Detect Bun/package.json workspace information.        |
| E4-S10 | Planned | `feat(adapter-bun): detect bun toolchain`        | Detect Bun availability and version.                  |
| E4-S11 | Planned | `feat(adapter-bun): map bun check commands`      | Map `bun:typecheck`, `bun:lint`, `bun:test` later.    |
| E4-S12 | Planned | `feat(doctor): report adapter health`            | Extend `doctor` with adapter status.                  |
| E4-S13 | Planned | `feat(info): report detected adapters`           | Extend `info` with adapter inventory.                 |
| E4-S14 | Planned | `test(adapter): add adapter fixture tests`       | Add fixtures for Rust and Bun.                        |
| E4-S15 | Planned | `docs(adapter): document adapter model`          | Document adapter purpose and boundaries.              |
| E4-S16 | Planned | `docs(adr): record native tool detection policy` | Record missing-tool behavior if needed.               |

---

# Epic E5 — Command Execution, Task Planning, and Check Runner

## Goal

Turn configured command identifiers into real native tool execution through safe, inspectable command plans.

## Slices

| Slice  | Status  | Commit                                           | Goal                                                |
| ------ | ------- | ------------------------------------------------ | --------------------------------------------------- |
| E5-S1  | Planned | `docs(adr): record process execution model`      | Decide command execution and output capture policy. |
| E5-S2  | Planned | `feat(exec): add command plan model`             | Represent commands before running them.             |
| E5-S3  | Planned | `feat(exec): add command runner`                 | Execute native commands.                            |
| E5-S4  | Planned | `feat(exec): capture command output`             | Capture stdout/stderr/status.                       |
| E5-S5  | Planned | `feat(exec): add dry-run command plans`          | Show commands without running them.                 |
| E5-S6  | Planned | `feat(check): resolve check command identifiers` | Resolve manifest check IDs through adapters.        |
| E5-S7  | Planned | `feat(check): run rust fmt check`                | Execute `cargo fmt --check`.                        |
| E5-S8  | Planned | `feat(check): run rust clippy check`             | Execute Clippy.                                     |
| E5-S9  | Planned | `feat(check): run rust test check`               | Execute Rust tests.                                 |
| E5-S10 | Planned | `feat(check): report check results`              | Report per-command success/failure.                 |
| E5-S11 | Planned | `feat(check): fail on check failures`            | Return failure exit code for failed checks.         |
| E5-S12 | Planned | `feat(check): add check json output`             | Emit structured check result output.                |
| E5-S13 | Planned | `test(check): add check runner fixtures`         | Test success/failure/missing-tool cases.            |
| E5-S14 | Planned | `docs(check): document check command`            | Document `monad check`.                             |
| E5-S15 | Planned | `feat(run): add run command skeleton`            | Add initial `monad run`.                            |
| E5-S16 | Planned | `feat(run): run resolved command by id`          | Run a single resolved task.                         |

---

# Epic E6 — Workspace Graph and Project Intelligence

## Goal

Build the foundation for `monad graph` and project/dependency intelligence.

## Slices

| Slice  | Status  | Commit                                      | Goal                                  |
| ------ | ------- | ------------------------------------------- | ------------------------------------- |
| E6-S1  | Planned | `docs(spec): add graph model draft`         | Document graph node/edge model.       |
| E6-S2  | Planned | `feat(graph): add graph domain model`       | Add typed graph nodes and edges.      |
| E6-S3  | Planned | `feat(graph): add workspace graph builder`  | Build graph from detected workspace.  |
| E6-S4  | Planned | `feat(graph): add deterministic ordering`   | Ensure stable graph output.           |
| E6-S5  | Planned | `feat(cli): add graph command skeleton`     | Add `monad graph`.                    |
| E6-S6  | Planned | `feat(graph): render text output`           | Add human-readable graph output.      |
| E6-S7  | Planned | `feat(graph): render json output`           | Add JSON graph output.                |
| E6-S8  | Planned | `feat(graph): render mermaid output`        | Add Mermaid graph output.             |
| E6-S9  | Planned | `feat(graph): render dot output`            | Add DOT graph output.                 |
| E6-S10 | Planned | `feat(graph): add format flag`              | Add `--format text/json/mermaid/dot`. |
| E6-S11 | Planned | `feat(graph): add output file option`       | Add `--output`.                       |
| E6-S12 | Planned | `test(graph): add graph renderer snapshots` | Add deterministic renderer tests.     |
| E6-S13 | Planned | `docs(graph): document graph command`       | Document graph formats and use cases. |
| E6-S14 | Planned | `feat(state): record graph fingerprint`     | Connect graph to lock/state model.    |

---

# Epic E7 — Safe File Operations, Templates, and Repo Evolution

## Goal

Create the safe write/generation foundation for `monad init`, `monad sync`, `monad add`, and `monad upgrade`.

## Slices

| Slice  | Status  | Commit                                               | Goal                                              |
| ------ | ------- | ---------------------------------------------------- | ------------------------------------------------- |
| E7-S1  | Planned | `docs(adr): record safe file operation policy`       | Decide create/copy/render/patch/skip/diff policy. |
| E7-S2  | Planned | `feat(file-ops): add file operation model`           | Add typed file operation plans.                   |
| E7-S3  | Planned | `feat(file-ops): add dry-run renderer`               | Render file operations without writing.           |
| E7-S4  | Planned | `feat/file-ops): add safe write support`             | Write files safely.                               |
| E7-S5  | Planned | `feat(file-ops): add conflict detection`             | Detect existing file conflicts.                   |
| E7-S6  | Planned | `feat(templates): add embedded template registry`    | Add offline templates.                            |
| E7-S7  | Planned | `feat(templates): render basic template`             | Render template variables.                        |
| E7-S8  | Planned | `feat(init): add init command skeleton`              | Add `monad init`.                                 |
| E7-S9  | Planned | `feat(init): generate monad manifest`                | Generate minimal `monad.toml`.                    |
| E7-S10 | Planned | `feat(sync): add sync command skeleton`              | Add `monad sync`.                                 |
| E7-S11 | Planned | `feat(sync): refresh lock state`                     | Sync manifest to lock/state.                      |
| E7-S12 | Planned | `feat(add): add add command skeleton`                | Add `monad add`.                                  |
| E7-S13 | Planned | `feat(upgrade): add upgrade command skeleton`        | Add `monad upgrade`.                              |
| E7-S14 | Planned | `feat(provenance): record generated file provenance` | Record generation metadata.                       |
| E7-S15 | Planned | `test(file-ops): add safe write fixtures`            | Test dry-run/conflict/write behavior.             |
| E7-S16 | Planned | `docs(evolution): document repo evolution commands`  | Document `init`, `sync`, `add`, and `upgrade`.    |

---

# Epic E8 — AI Context and Memory Foundation

## Goal

Add repo-native AI context generation and the beginning of Monad’s AI memory system without requiring an LLM provider.

## Slices

| Slice  | Status  | Commit                                      | Goal                                            |
| ------ | ------- | ------------------------------------------- | ----------------------------------------------- |
| E8-S1  | Planned | `docs(adr): record AI context strategy`     | Decide AI context/memory boundaries.            |
| E8-S2  | Planned | `docs(ai): add bootstrap prompt`            | Add `docs/ai/BOOTSTRAP_PROMPT.md`.              |
| E8-S3  | Planned | `docs(ai): add current state document`      | Add `docs/ai/CURRENT_STATE.md`.                 |
| E8-S4  | Planned | `feat(ai): add context model`               | Model AI context artifacts.                     |
| E8-S5  | Planned | `feat(ai): generate repo summary`           | Generate repo summary from manifest/docs/state. |
| E8-S6  | Planned | `feat(ai): generate command inventory`      | Generate command inventory.                     |
| E8-S7  | Planned | `feat(ai): generate ADR summary`            | Generate accepted ADR summary.                  |
| E8-S8  | Planned | `feat(ai): generate graph summary`          | Generate graph-based AI context.                |
| E8-S9  | Planned | `feat(ai): add context command skeleton`    | Add `monad context` or equivalent.              |
| E8-S10 | Planned | `feat(ai): write context files`             | Write repo-native context artifacts.            |
| E8-S11 | Planned | `feat(ai): add memory index model`          | Add initial memory index structure.             |
| E8-S12 | Planned | `feat(ai): record memory provenance`        | Track source files for memory/context.          |
| E8-S13 | Planned | `feat(check): verify AI context freshness`  | Add freshness check.                            |
| E8-S14 | Planned | `test(ai): add context generation fixtures` | Test context generation.                        |
| E8-S15 | Planned | `docs(ai): document AI context workflow`    | Document AI workflows.                          |
| E8-S16 | Planned | `docs(adr): record AI memory state policy`  | Record durable AI memory model if needed.       |

---

# Epic E9 — Policy, Governance, and Architecture Boundaries

## Goal

Introduce the governance-grade repo contract and policy checks that make Monad more than a command wrapper.

## Slices

| Slice  | Status  | Commit                                             | Goal                                   |
| ------ | ------- | -------------------------------------------------- | -------------------------------------- |
| E9-S1  | Planned | `docs(spec): add repo contract draft`              | Define expected repo invariants.       |
| E9-S2  | Planned | `feat(policy): add policy model`                   | Add core policy structures.            |
| E9-S3  | Planned | `feat(policy): add repo contract checks`           | Validate required files and structure. |
| E9-S4  | Planned | `feat(policy): add documentation checks`           | Check docs/frontmatter expectations.   |
| E9-S5  | Planned | `feat(policy): add ADR checks`                     | Validate ADR index/status consistency. |
| E9-S6  | Planned | `feat(policy): add manifest-state checks`          | Validate manifest/lock relationship.   |
| E9-S7  | Planned | `feat(policy): add architecture boundary model`    | Model boundaries.                      |
| E9-S8  | Planned | `feat(policy): check architecture boundaries`      | Enforce basic boundaries.              |
| E9-S9  | Planned | `feat(check): include policy checks`               | Add policy checks to `monad check`.    |
| E9-S10 | Planned | `feat(policy): add policy json output`             | Emit machine-readable policy results.  |
| E9-S11 | Planned | `test(policy): add policy fixture tests`           | Add valid/invalid repo fixtures.       |
| E9-S12 | Planned | `docs(policy): document policy system`             | Document governance-grade checks.      |
| E9-S13 | Planned | `docs(adr): record policy engine design`           | Record major policy decision.          |
| E9-S14 | Planned | `docs(governance): add contribution quality gates` | Add project quality gate guidance.     |

---

# Epic E10 — Release, Packaging, and Distribution

## Goal

Prepare Monad to be built, versioned, packaged, and distributed as a serious Rust CLI.

## Slices

| Slice   | Status  | Commit                                              | Goal                                       |
| ------- | ------- | --------------------------------------------------- | ------------------------------------------ |
| E10-S1  | Planned | `docs(adr): record release strategy`                | Decide release and distribution direction. |
| E10-S2  | Planned | `chore(release): add version metadata`              | Add version metadata conventions.          |
| E10-S3  | Planned | `feat(cli): add version details`                    | Expand `--version` or `info` metadata.     |
| E10-S4  | Planned | `chore(ci): add release build workflow`             | Build release binaries in CI.              |
| E10-S5  | Planned | `chore(ci): add cross-platform checks`              | Add Linux/macOS/Windows matrix.            |
| E10-S6  | Planned | `chore(packaging): add install script draft`        | Add install guidance/script.               |
| E10-S7  | Planned | `chore(packaging): add shell completion generation` | Generate shell completions.                |
| E10-S8  | Planned | `docs(install): add installation guide`             | Document install options.                  |
| E10-S9  | Planned | `docs(release): add release process`                | Document release checklist.                |
| E10-S10 | Planned | `chore(release): add changelog foundation`          | Add changelog policy/file.                 |
| E10-S11 | Planned | `chore(security): add supply-chain checks`          | Add cargo audit/deny or equivalent.        |
| E10-S12 | Planned | `chore(ci): add artifact upload`                    | Upload binaries in release workflow.       |
| E10-S13 | Planned | `test(release): verify release binary smoke tests`  | Test release-mode binary.                  |
| E10-S14 | Planned | `docs(adr): record packaging policy`                | Record final packaging policy if needed.   |

---

# Epic E11 — MVP Hardening and Public Readiness

## Goal

Make Monad’s MVP coherent, tested, documented, and usable across real repositories.

## Slices

| Slice   | Status  | Commit                                                | Goal                                                    |
| ------- | ------- | ----------------------------------------------------- | ------------------------------------------------------- |
| E11-S1  | Planned | `docs(roadmap): define MVP acceptance criteria`       | Lock MVP acceptance criteria.                           |
| E11-S2  | Planned | `test(fixtures): add realistic polyglot repo fixture` | Add Rust+Bun fixture repo.                              |
| E11-S3  | Planned | `test(e2e): add MVP command flow test`                | Test info/doctor/check/graph/sync flow.                 |
| E11-S4  | Planned | `docs(tutorial): add first Monad walkthrough`         | Add user tutorial.                                      |
| E11-S5  | Planned | `docs(reference): add CLI command reference`          | Add command reference.                                  |
| E11-S6  | Planned | `docs(reference): add manifest reference`             | Finalize manifest docs.                                 |
| E11-S7  | Planned | `docs(reference): add adapter reference`              | Document adapter behavior.                              |
| E11-S8  | Planned | `docs(architecture): add MVP architecture`            | Add architecture document.                              |
| E11-S9  | Planned | `docs(ai): update current state for MVP`              | Update AI context state.                                |
| E11-S10 | Planned | `chore(repo): add repository hygiene files`           | Add contributing/security/license/codeowners as needed. |
| E11-S11 | Planned | `chore(ci): harden verification workflow`             | Harden CI checks.                                       |
| E11-S12 | Planned | `refactor(core): clean MVP module boundaries`         | Clean module boundaries before tagging.                 |
| E11-S13 | Planned | `test: increase MVP coverage`                         | Fill high-value test gaps.                              |
| E11-S14 | Planned | `docs(mvp): add MVP release notes`                    | Add release notes.                                      |
| E11-S15 | Planned | `chore(release): prepare MVP tag`                     | Prepare first MVP tag.                                  |
| E11-S16 | Planned | `release: tag Monad MVP`                              | Tag MVP release.                                        |

---

## 8. Maintenance Rule

After each completed implementation slice, update this document only when one of the following changes:

1. a slice status changes;
2. a slice is inserted;
3. a slice is removed;
4. a slice is renamed;
5. an epic boundary changes;
6. the next recommended slice changes;
7. a new ADR changes implementation order.

Minor progress updates may instead be recorded in:

```text
docs/ai/CURRENT_STATE.md
```

once that file exists.
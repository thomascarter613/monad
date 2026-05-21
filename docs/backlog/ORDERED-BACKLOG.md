---
title: "Monad Ordered Backlog"
description: "Strict implementation backlog for Monad, ordered by recommended implementation sequence."
project_name: "Monad"
project_slug: "monad"
document_type: "ordered-backlog"
document_status: "approved"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "implementation"
canonical_path: "docs/backlog/ORDERED-BACKLOG.md"
depends_on:
  - "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
  - "docs/work-packets/README.md"
tags:
  - monad
  - backlog
  - implementation
  - ordered-work
  - roadmap
  - work-packets
---

# Monad Ordered Backlog

## 1. Purpose

This document is the strict ordered backlog for Monad.

It translates the implementation epics and slices into one sequential implementation queue.

Use this document when deciding what to implement next.

## 2. Backlog Rules

1. Implement items in order unless an ADR, defect, security issue, or blocking dependency requires resequencing.
2. Each backlog item should become one atomic commit unless explicitly marked as documentation-only or housekeeping.
3. Each implementation item should have a work packet before substantial work begins.
4. Each item should pass verification before commit.
5. Completed items should remain listed for historical continuity.
6. New backlog items should be inserted where they belong, not appended randomly.
7. Any major change to ordering should be reflected in this document and, if architectural, in an ADR.

## 3. Status Legend

| Status | Meaning |
| --- | --- |
| Done | Completed and committed. |
| Current | In progress now. |
| Next | Next recommended item. |
| Planned | Not started. |
| Blocked | Cannot proceed until a dependency is resolved. |
| Deferred | Intentionally postponed. |

## 4. Current Position

```text
Current epic: E1 — Runtime Foundation & CLI Bootstrap
Current backlog item: E1-S10
Next commit: test(cli): add command smoke tests
Approximate MVP progress: ~11%
```

---

# 5. Ordered Backlog

## Completed Planning Foundation

| Order | ID     | Status  | Commit                                                  | Work                                      |
| ----: | ------ | ------- | ------------------------------------------------------- | ----------------------------------------- |
|     1 | E0-S1  | Done    | `docs(project): add Monad project intake`               | Add project intake.                       |
|     2 | E0-S2  | Done    | `docs(project): add Monad product charter`              | Add product charter.                      |
|     3 | E0-S3  | Done    | `docs(adr): add architecture decision record index`     | Add ADR index.                            |
|     4 | E0-S4  | Done    | `docs(adr): record Rust runtime decision`               | Accept Rust runtime decision.             |
|     5 | E0-S5  | Done    | `docs(adr): record native tool coordination decision`   | Accept native-tool coordination decision. |
|     6 | E0-S6  | Done    | `docs(adr): record multi-crate Rust workspace decision` | Accept multi-crate workspace decision.    |
|     7 | E0-S7  | Done    | `docs(adr): record latest stable Rust MSRV policy`      | Accept Rust toolchain policy.             |
|     8 | E0-S8  | Done    | `docs(adr): record immediate Tokio runtime decision`    | Accept Tokio decision.                    |
|     9 | E0-S9  | Done    | `docs(adr): record monad manifest decision`             | Accept `monad.toml` decision.             |
|    10 | E0-S10 | Done    | `docs(adr): record Monad lock and state file decision`  | Accept `monad.lock` / `.monad/` decision. |
|    11 | E0-S11 | Done    | `docs(adr): record graph output format decision`        | Accept graph output format decision.      |
|    12 | E0-S12 | Done    | `docs(adr): update accepted architecture decisions`     | Update ADR index through ADR-0008.        |
|    13 | E0-S13 | Current | `docs(roadmap): add implementation epics and slices`    | Add roadmap document.                     |
|    14 | E0-S14 | Current | `docs(backlog): add ordered implementation backlog`     | Add this ordered backlog.                 |
|    15 | E0-S15 | Current | `docs(work-packets): add work packet system`            | Add work-packet system.                   |

## Epic E1 — Runtime Foundation and CLI Bootstrap

| Order | ID     | Status  | Commit                                           | Work                                                                      |
| ----: | ------ | ------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
|    16 | E1-S1  | Done    | `chore(repo): add Rust workspace scaffold`       | Add Rust workspace, `monad-cli`, `monad-core`, Tokio, and toolchain file. |
|    17 | E1-S2  | Done    | `docs(adr): record CLI command parsing decision` | Record `clap` decision.                                                   |
|    18 | E1-S3  | Done    | `feat(cli): add Monad CLI command parsing`       | Add `clap`, `--help`, `--version`, and `info`.                            |
|    19 | E1-S4  | Done    | `feat(workspace): detect workspace root`         | Detect workspace root.                                                    |
|    20 | E1-S5  | Done    | `feat(manifest): detect monad manifest`          | Detect `monad.toml`.                                                      |
|    21 | E1-S6  | Done    | `feat(manifest): parse initial monad manifest`   | Parse initial manifest.                                                   |
|    22 | E1-S7  | Done    | `feat(diagnostics): add basic diagnostics model` | Add diagnostics model.                                                    |
|    23 | E1-S8  | Done    | `feat(cli): add doctor command`                  | Add `doctor`.                                                             |
|    24 | E1-S9  | Done    | `feat(cli): add check command skeleton`          | Add `check` skeleton.                                                     |
|    25 | E1-S10 | Next    | `test(cli): add command smoke tests`             | Add command smoke tests.                                                  |
|    26 | E1-S11 | Planned | `chore(verify): add local verification script`   | Add `tools/scripts/verify.sh`.                                            |
|    27 | E1-S12 | Planned | `ci: add initial verification workflow`          | Add GitHub Actions verification workflow.                                 |
|    28 | E1-S13 | Planned | `refactor(cli): extract command handlers`        | Move command handlers out of `main.rs`.                                   |
|    29 | E1-S14 | Planned | `docs(dev): add initial development workflow`    | Document local development workflow.                                      |

## Epic E2 — Manifest, State, and Configuration Foundation

| Order | ID     | Status  | Commit                                          | Work                                        |
| ----: | ------ | ------- | ----------------------------------------------- | ------------------------------------------- |
|    30 | E2-S1  | Planned | `docs(spec): add initial monad manifest schema` | Document manifest schema v0.1.              |
|    31 | E2-S2  | Planned | `feat(manifest): add validated manifest model`  | Separate raw and validated manifest models. |
|    32 | E2-S3  | Planned | `feat(manifest): add manifest diagnostics`      | Add manifest-specific diagnostics.          |
|    33 | E2-S4  | Planned | `feat(manifest): validate workspace section`    | Validate workspace section.                 |
|    34 | E2-S5  | Planned | `feat(manifest): validate adapter section`      | Validate adapter section.                   |
|    35 | E2-S6  | Planned | `feat(manifest): validate command identifiers`  | Validate command identifiers.               |
|    36 | E2-S7  | Planned | `feat(manifest): add manifest path override`    | Add manifest path override.                 |
|    37 | E2-S8  | Planned | `feat(state): add monad lock model`             | Add typed `monad.lock` model.               |
|    38 | E2-S9  | Planned | `feat(state): write initial monad lock`         | Generate minimal lock file.                 |
|    39 | E2-S10 | Planned | `feat(state): detect stale monad lock`          | Detect stale lock file.                     |
|    40 | E2-S11 | Planned | `feat(state): add state diagnostics`            | Add lock/state diagnostics.                 |
|    41 | E2-S12 | Planned | `test(manifest): add manifest fixture tests`    | Add manifest fixtures.                      |
|    42 | E2-S13 | Planned | `test(state): add lock state fixture tests`     | Add lock/state fixtures.                    |
|    43 | E2-S14 | Planned | `docs(reference): document monad manifest`      | Add manifest reference.                     |

## Epic E3 — Diagnostics, Output, and CLI UX

| Order | ID     | Status  | Commit                                           | Work                           |
| ----: | ------ | ------- | ------------------------------------------------ | ------------------------------ |
|    44 | E3-S1  | Planned | `docs(adr): record CLI output format policy`     | Record output policy.          |
|    45 | E3-S2  | Planned | `feat(cli): add global verbose flag`             | Add `--verbose`.               |
|    46 | E3-S3  | Planned | `feat(cli): add global quiet flag`               | Add `--quiet`.                 |
|    47 | E3-S4  | Planned | `feat(cli): add json output flag`                | Add `--json`.                  |
|    48 | E3-S5  | Planned | `feat(output): add human diagnostic renderer`    | Add human diagnostic renderer. |
|    49 | E3-S6  | Planned | `feat(output): add json diagnostic renderer`     | Add JSON diagnostic renderer.  |
|    50 | E3-S7  | Planned | `feat(output): add stable command result model`  | Add command result model.      |
|    51 | E3-S8  | Planned | `feat(cli): add color mode flag`                 | Add color mode flag.           |
|    52 | E3-S9  | Planned | `feat(cli): add exit code policy`                | Add stable exit code policy.   |
|    53 | E3-S10 | Planned | `test(output): add output snapshot tests`        | Add output snapshots.          |
|    54 | E3-S11 | Planned | `docs(cli): document command output conventions` | Document output conventions.   |
|    55 | E3-S12 | Planned | `docs(adr): record exit code policy`             | Record exit code policy.       |

## Epic E4 — Ecosystem Adapter Foundation

| Order | ID     | Status  | Commit                                           | Work                                  |
| ----: | ------ | ------- | ------------------------------------------------ | ------------------------------------- |
|    56 | E4-S1  | Planned | `docs(adr): record adapter architecture`         | Record adapter architecture.          |
|    57 | E4-S2  | Planned | `feat(adapter): add adapter capability model`    | Add adapter capability model.         |
|    58 | E4-S3  | Planned | `feat(adapter): add adapter registry`            | Add adapter registry.                 |
|    59 | E4-S4  | Planned | `feat(adapter): add tool detection model`        | Add tool detection model.             |
|    60 | E4-S5  | Planned | `feat(adapter): add command identifier model`    | Add command identifier model.         |
|    61 | E4-S6  | Planned | `feat(adapter-rust): detect cargo workspace`     | Detect Cargo workspace.               |
|    62 | E4-S7  | Planned | `feat(adapter-rust): detect rust toolchain`      | Detect Rust toolchain.                |
|    63 | E4-S8  | Planned | `feat(adapter-rust): map rust check commands`    | Map Rust check commands.              |
|    64 | E4-S9  | Planned | `feat(adapter-bun): detect bun workspace`        | Detect Bun workspace.                 |
|    65 | E4-S10 | Planned | `feat(adapter-bun): detect bun toolchain`        | Detect Bun toolchain.                 |
|    66 | E4-S11 | Planned | `feat(adapter-bun): map bun check commands`      | Map Bun check commands.               |
|    67 | E4-S12 | Planned | `feat(doctor): report adapter health`            | Extend `doctor` with adapter health.  |
|    68 | E4-S13 | Planned | `feat(info): report detected adapters`           | Extend `info` with adapter inventory. |
|    69 | E4-S14 | Planned | `test(adapter): add adapter fixture tests`       | Add adapter fixture tests.            |
|    70 | E4-S15 | Planned | `docs(adapter): document adapter model`          | Document adapter model.               |
|    71 | E4-S16 | Planned | `docs(adr): record native tool detection policy` | Record native tool detection policy.  |

## Epic E5 — Command Execution, Task Planning, and Check Runner

| Order | ID     | Status  | Commit                                           | Work                            |
| ----: | ------ | ------- | ------------------------------------------------ | ------------------------------- |
|    72 | E5-S1  | Planned | `docs(adr): record process execution model`      | Record process execution model. |
|    73 | E5-S2  | Planned | `feat(exec): add command plan model`             | Add command plan model.         |
|    74 | E5-S3  | Planned | `feat(exec): add command runner`                 | Add command runner.             |
|    75 | E5-S4  | Planned | `feat(exec): capture command output`             | Capture command output.         |
|    76 | E5-S5  | Planned | `feat(exec): add dry-run command plans`          | Add dry-run command plans.      |
|    77 | E5-S6  | Planned | `feat(check): resolve check command identifiers` | Resolve check command IDs.      |
|    78 | E5-S7  | Planned | `feat(check): run rust fmt check`                | Run `cargo fmt --check`.        |
|    79 | E5-S8  | Planned | `feat(check): run rust clippy check`             | Run Clippy.                     |
|    80 | E5-S9  | Planned | `feat(check): run rust test check`               | Run Rust tests.                 |
|    81 | E5-S10 | Planned | `feat(check): report check results`              | Report check results.           |
|    82 | E5-S11 | Planned | `feat(check): fail on check failures`            | Fail on check failures.         |
|    83 | E5-S12 | Planned | `feat(check): add check json output`             | Add check JSON output.          |
|    84 | E5-S13 | Planned | `test(check): add check runner fixtures`         | Add check runner fixtures.      |
|    85 | E5-S14 | Planned | `docs(check): document check command`            | Document `monad check`.         |
|    86 | E5-S15 | Planned | `feat(run): add run command skeleton`            | Add `monad run`.                |
|    87 | E5-S16 | Planned | `feat(run): run resolved command by id`          | Run resolved command by ID.     |

## Epic E6 — Workspace Graph and Project Intelligence

| Order | ID     | Status  | Commit                                      | Work                               |
| ----: | ------ | ------- | ------------------------------------------- | ---------------------------------- |
|    88 | E6-S1  | Planned | `docs(spec): add graph model draft`         | Add graph model draft.             |
|    89 | E6-S2  | Planned | `feat(graph): add graph domain model`       | Add graph domain model.            |
|    90 | E6-S3  | Planned | `feat(graph): add workspace graph builder`  | Add workspace graph builder.       |
|    91 | E6-S4  | Planned | `feat(graph): add deterministic ordering`   | Add deterministic graph ordering.  |
|    92 | E6-S5  | Planned | `feat(cli): add graph command skeleton`     | Add `monad graph`.                 |
|    93 | E6-S6  | Planned | `feat(graph): render text output`           | Render text graph output.          |
|    94 | E6-S7  | Planned | `feat(graph): render json output`           | Render JSON graph output.          |
|    95 | E6-S8  | Planned | `feat(graph): render mermaid output`        | Render Mermaid graph output.       |
|    96 | E6-S9  | Planned | `feat(graph): render dot output`            | Render DOT graph output.           |
|    97 | E6-S10 | Planned | `feat(graph): add format flag`              | Add graph format flag.             |
|    98 | E6-S11 | Planned | `feat(graph): add output file option`       | Add graph output file option.      |
|    99 | E6-S12 | Planned | `test(graph): add graph renderer snapshots` | Add graph renderer snapshots.      |
|   100 | E6-S13 | Planned | `docs(graph): document graph command`       | Document graph command.            |
|   101 | E6-S14 | Planned | `feat(state): record graph fingerprint`     | Record graph fingerprint in state. |

## Epic E7 — Safe File Operations, Templates, and Repo Evolution

| Order | ID     | Status  | Commit                                               | Work                               |
| ----: | ------ | ------- | ---------------------------------------------------- | ---------------------------------- |
|   102 | E7-S1  | Planned | `docs(adr): record safe file operation policy`       | Record safe file operation policy. |
|   103 | E7-S2  | Planned | `feat(file-ops): add file operation model`           | Add file operation model.          |
|   104 | E7-S3  | Planned | `feat(file-ops): add dry-run renderer`               | Add dry-run renderer.              |
|   105 | E7-S4  | Planned | `feat(file-ops): add safe write support`             | Add safe write support.            |
|   106 | E7-S5  | Planned | `feat(file-ops): add conflict detection`             | Add conflict detection.            |
|   107 | E7-S6  | Planned | `feat(templates): add embedded template registry`    | Add embedded template registry.    |
|   108 | E7-S7  | Planned | `feat(templates): render basic template`             | Render basic template.             |
|   109 | E7-S8  | Planned | `feat(init): add init command skeleton`              | Add `monad init`.                  |
|   110 | E7-S9  | Planned | `feat(init): generate monad manifest`                | Generate `monad.toml`.             |
|   111 | E7-S10 | Planned | `feat(sync): add sync command skeleton`              | Add `monad sync`.                  |
|   112 | E7-S11 | Planned | `feat(sync): refresh lock state`                     | Refresh lock state.                |
|   113 | E7-S12 | Planned | `feat(add): add add command skeleton`                | Add `monad add`.                   |
|   114 | E7-S13 | Planned | `feat(upgrade): add upgrade command skeleton`        | Add `monad upgrade`.               |
|   115 | E7-S14 | Planned | `feat(provenance): record generated file provenance` | Record generated file provenance.  |
|   116 | E7-S15 | Planned | `test(file-ops): add safe write fixtures`            | Add safe write fixtures.           |
|   117 | E7-S16 | Planned | `docs(evolution): document repo evolution commands`  | Document repo evolution commands.  |

## Epic E8 — AI Context and Memory Foundation

| Order | ID     | Status  | Commit                                      | Work                           |
| ----: | ------ | ------- | ------------------------------------------- | ------------------------------ |
|   118 | E8-S1  | Planned | `docs(adr): record AI context strategy`     | Record AI context strategy.    |
|   119 | E8-S2  | Planned | `docs(ai): add bootstrap prompt`            | Add AI bootstrap prompt.       |
|   120 | E8-S3  | Planned | `docs(ai): add current state document`      | Add current state document.    |
|   121 | E8-S4  | Planned | `feat(ai): add context model`               | Add AI context model.          |
|   122 | E8-S5  | Planned | `feat(ai): generate repo summary`           | Generate repo summary.         |
|   123 | E8-S6  | Planned | `feat(ai): generate command inventory`      | Generate command inventory.    |
|   124 | E8-S7  | Planned | `feat(ai): generate ADR summary`            | Generate ADR summary.          |
|   125 | E8-S8  | Planned | `feat(ai): generate graph summary`          | Generate graph summary.        |
|   126 | E8-S9  | Planned | `feat(ai): add context command skeleton`    | Add AI context command.        |
|   127 | E8-S10 | Planned | `feat(ai): write context files`             | Write context files.           |
|   128 | E8-S11 | Planned | `feat(ai): add memory index model`          | Add memory index model.        |
|   129 | E8-S12 | Planned | `feat(ai): record memory provenance`        | Record memory provenance.      |
|   130 | E8-S13 | Planned | `feat(check): verify AI context freshness`  | Verify AI context freshness.   |
|   131 | E8-S14 | Planned | `test(ai): add context generation fixtures` | Add AI context fixtures.       |
|   132 | E8-S15 | Planned | `docs(ai): document AI context workflow`    | Document AI context workflow.  |
|   133 | E8-S16 | Planned | `docs(adr): record AI memory state policy`  | Record AI memory state policy. |

## Epic E9 — Policy, Governance, and Architecture Boundaries

| Order | ID     | Status  | Commit                                             | Work                             |
| ----: | ------ | ------- | -------------------------------------------------- | -------------------------------- |
|   134 | E9-S1  | Planned | `docs(spec): add repo contract draft`              | Add repo contract draft.         |
|   135 | E9-S2  | Planned | `feat(policy): add policy model`                   | Add policy model.                |
|   136 | E9-S3  | Planned | `feat(policy): add repo contract checks`           | Add repo contract checks.        |
|   137 | E9-S4  | Planned | `feat(policy): add documentation checks`           | Add documentation checks.        |
|   138 | E9-S5  | Planned | `feat(policy): add ADR checks`                     | Add ADR checks.                  |
|   139 | E9-S6  | Planned | `feat(policy): add manifest-state checks`          | Add manifest/state checks.       |
|   140 | E9-S7  | Planned | `feat(policy): add architecture boundary model`    | Add architecture boundary model. |
|   141 | E9-S8  | Planned | `feat(policy): check architecture boundaries`      | Check architecture boundaries.   |
|   142 | E9-S9  | Planned | `feat(check): include policy checks`               | Add policy checks to `check`.    |
|   143 | E9-S10 | Planned | `feat(policy): add policy json output`             | Add policy JSON output.          |
|   144 | E9-S11 | Planned | `test(policy): add policy fixture tests`           | Add policy fixtures.             |
|   145 | E9-S12 | Planned | `docs(policy): document policy system`             | Document policy system.          |
|   146 | E9-S13 | Planned | `docs(adr): record policy engine design`           | Record policy engine design.     |
|   147 | E9-S14 | Planned | `docs(governance): add contribution quality gates` | Add contribution quality gates.  |

## Epic E10 — Release, Packaging, and Distribution

| Order | ID      | Status  | Commit                                              | Work                             |
| ----: | ------- | ------- | --------------------------------------------------- | -------------------------------- |
|   148 | E10-S1  | Planned | `docs(adr): record release strategy`                | Record release strategy.         |
|   149 | E10-S2  | Planned | `chore(release): add version metadata`              | Add version metadata.            |
|   150 | E10-S3  | Planned | `feat(cli): add version details`                    | Add version details.             |
|   151 | E10-S4  | Planned | `chore(ci): add release build workflow`             | Add release build workflow.      |
|   152 | E10-S5  | Planned | `chore(ci): add cross-platform checks`              | Add cross-platform CI matrix.    |
|   153 | E10-S6  | Planned | `chore(packaging): add install script draft`        | Add install script draft.        |
|   154 | E10-S7  | Planned | `chore(packaging): add shell completion generation` | Add shell completion generation. |
|   155 | E10-S8  | Planned | `docs(install): add installation guide`             | Add installation guide.          |
|   156 | E10-S9  | Planned | `docs(release): add release process`                | Add release process.             |
|   157 | E10-S10 | Planned | `chore(release): add changelog foundation`          | Add changelog foundation.        |
|   158 | E10-S11 | Planned | `chore(security): add supply-chain checks`          | Add supply-chain checks.         |
|   159 | E10-S12 | Planned | `chore(ci): add artifact upload`                    | Add artifact upload.             |
|   160 | E10-S13 | Planned | `test(release): verify release binary smoke tests`  | Add release binary smoke tests.  |
|   161 | E10-S14 | Planned | `docs(adr): record packaging policy`                | Record packaging policy.         |

## Epic E11 — MVP Hardening and Public Readiness

| Order | ID      | Status  | Commit                                                | Work                            |
| ----: | ------- | ------- | ----------------------------------------------------- | ------------------------------- |
|   162 | E11-S1  | Planned | `docs(roadmap): define MVP acceptance criteria`       | Define MVP acceptance criteria. |
|   163 | E11-S2  | Planned | `test(fixtures): add realistic polyglot repo fixture` | Add realistic polyglot fixture. |
|   164 | E11-S3  | Planned | `test(e2e): add MVP command flow test`                | Add MVP command flow test.      |
|   165 | E11-S4  | Planned | `docs(tutorial): add first Monad walkthrough`         | Add first tutorial.             |
|   166 | E11-S5  | Planned | `docs(reference): add CLI command reference`          | Add CLI reference.              |
|   167 | E11-S6  | Planned | `docs(reference): add manifest reference`             | Add manifest reference.         |
|   168 | E11-S7  | Planned | `docs(reference): add adapter reference`              | Add adapter reference.          |
|   169 | E11-S8  | Planned | `docs(architecture): add MVP architecture`            | Add MVP architecture.           |
|   170 | E11-S9  | Planned | `docs(ai): update current state for MVP`              | Update AI current state.        |
|   171 | E11-S10 | Planned | `chore(repo): add repository hygiene files`           | Add repo hygiene files.         |
|   172 | E11-S11 | Planned | `chore(ci): harden verification workflow`             | Harden CI workflow.             |
|   173 | E11-S12 | Planned | `refactor(core): clean MVP module boundaries`         | Clean MVP module boundaries.    |
|   174 | E11-S13 | Planned | `test: increase MVP coverage`                         | Increase MVP coverage.          |
|   175 | E11-S14 | Planned | `docs(mvp): add MVP release notes`                    | Add MVP release notes.          |
|   176 | E11-S15 | Planned | `chore(release): prepare MVP tag`                     | Prepare MVP tag.                |
|   177 | E11-S16 | Planned | `release: tag Monad MVP`                              | Tag MVP release.                |

---

## 6. Maintenance

Update this document when:

1. an item status changes;
2. an item is inserted;
3. an item is removed;
4. an item is renamed;
5. implementation order changes;
6. a new ADR changes the roadmap;
7. an epic boundary changes.
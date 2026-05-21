---
title: "Monad Roadmap"
description: "High-level product roadmap for Monad, a Rust-native polyglot repo runtime and developer-experience CLI."
project_name: "Monad"
project_slug: "monad"
document_type: "roadmap"
document_status: "approved"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "implementation"
canonical_path: "docs/roadmap/ROADMAP.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
related_documents:
  - "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
  - "docs/backlog/ORDERED-BACKLOG.md"
  - "docs/work-packets/README.md"
  - "docs/project/02-requirements/SOFTWARE-REQUIREMENTS-SPECIFICATION.md"
  - "docs/architecture/ARCHITECTURE.md"
  - "docs/ai/CURRENT_STATE.md"
tags:
  - monad
  - roadmap
  - product-roadmap
  - milestones
  - rust
  - cli
  - repo-runtime
  - polyglot
  - mvp
---

# Monad Roadmap

## 1. Purpose

This document is the high-level product roadmap for Monad.

Monad is a Rust-native polyglot repo runtime and developer-experience CLI. Its purpose is to give developers one coherent command surface for initializing, understanding, checking, running, evolving, and governing complex repositories while coordinating native ecosystem tools rather than replacing them recklessly.

This roadmap explains the major product milestones from project foundation through MVP and beyond.

For detailed implementation slices, see:

```text
docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md
```

For the strict ordered backlog, see:

```text
docs/backlog/ORDERED-BACKLOG.md
```

For atomic implementation planning, see:

```text
docs/work-packets/README.md
```

## 2. Roadmap Principles

Monad’s roadmap follows these principles:

1. Build the repo runtime foundation before advanced features.
2. Keep each implementation slice atomic and verifiable.
3. Coordinate native tools rather than replacing them recklessly.
4. Keep the CLI useful before making it broad.
5. Treat documentation, ADRs, tests, and verification as first-class work.
6. Build local-first behavior before hosted or networked behavior.
7. Make AI support repo-native and optional, not subscription-required.
8. Preserve safe, additive, non-destructive repo evolution.
9. Grow adapters incrementally.
10. Avoid Bazel, Pants, Buck2, and Nx dependencies by default.

## 3. Current Roadmap Position

Monad is currently in the early runtime foundation phase.

Current focus:

```text
Epic E1 — Runtime Foundation and CLI Bootstrap
```

Recently completed or in-progress capabilities include:

1. Rust workspace scaffold.
2. `monad-cli` and `monad-core` crate split.
3. Tokio runtime foundation.
4. Clap-based command parsing.
5. `monad info`.
6. Workspace root detection.
7. `monad.toml` detection.
8. Initial `monad.toml` parsing.
9. Basic diagnostics model.
10. `monad doctor`.
11. `monad check` skeleton.

Next focus:

```text
test(cli): add command smoke tests
```

Approximate MVP progress:

```text
~11%
```

This percentage is approximate and should be updated as larger roadmap milestones are completed.

## 4. Milestone M0 — Product and Architecture Foundation

### 4.1 Goal

Establish Monad’s canonical product direction, architecture constraints, and initial decision record before implementation proceeds too far.

### 4.2 Status

Mostly complete.

### 4.3 Includes

1. Project intake.
2. Product charter.
3. ADR index.
4. Rust runtime decision.
5. Native-tool coordination decision.
6. Multi-crate Rust workspace decision.
7. Latest stable Rust toolchain policy.
8. Tokio runtime decision.
9. `monad.toml` manifest decision.
10. `monad.lock` / `.monad/` state model decision.
11. Multiple graph output format decision.
12. CLI command parsing decision.
13. Implementation epics and slices document.
14. Ordered backlog.
15. Work-packet system.

### 4.4 Completion Criteria

M0 is complete when:

1. foundational planning documents exist;
2. accepted ADRs are indexed correctly;
3. the implementation roadmap exists;
4. the ordered backlog exists;
5. the work-packet system exists;
6. the project is ready for repeatable slice-based implementation.

## 5. Milestone M1 — Runtime Foundation and CLI Bootstrap

### 5.1 Goal

Create a working Rust CLI foundation with basic repo intelligence, manifest handling, diagnostics, and verification.

### 5.2 Status

In progress.

### 5.3 Includes

1. Root Rust workspace.
2. `monad-cli` binary crate.
3. `monad-core` library crate.
4. Stable Rust toolchain config.
5. Tokio entrypoint.
6. Clap command parsing.
7. `monad --help`.
8. `monad --version`.
9. `monad info`.
10. `monad doctor`.
11. `monad check` skeleton.
12. Workspace root detection.
13. `monad.toml` detection.
14. Initial `monad.toml` parsing.
15. Basic diagnostics model.
16. CLI smoke tests.
17. Local verification script.
18. Initial GitHub Actions workflow.

### 5.4 Completion Criteria

M1 is complete when:

1. `cargo test --workspace` passes;
2. Clippy passes with warnings denied;
3. `monad --help` works;
4. `monad --version` works;
5. `monad info` works;
6. `monad doctor` works;
7. `monad check` works as a skeleton;
8. CLI smoke tests exist;
9. local verification exists;
10. CI verification exists.

## 6. Milestone M2 — Manifest, State, and Configuration Foundation

### 6.1 Goal

Turn `monad.toml` into a validated source of repo-level intent and introduce the first generated state/lock model.

### 6.2 Status

Planned.

### 6.3 Includes

1. Manifest schema documentation.
2. Raw parsed manifest model.
3. Validated manifest model.
4. Manifest diagnostics.
5. Workspace section validation.
6. Adapter section validation.
7. Command identifier validation.
8. Manifest path override support.
9. Initial `monad.lock` model.
10. Minimal lock generation.
11. Stale lock detection.
12. Lock/state diagnostics.
13. Manifest fixture tests.
14. Lock/state fixture tests.
15. Manifest reference documentation.

### 6.4 Completion Criteria

M2 is complete when:

1. `monad.toml` schema v0.1 is documented;
2. manifest parsing and validation are separate;
3. invalid manifests produce useful diagnostics;
4. `monad.lock` has a minimal model;
5. stale state can be detected;
6. manifest and state fixture tests exist.

## 7. Milestone M3 — Output, Diagnostics, and CLI UX

### 7.1 Goal

Make Monad’s command output consistent, readable, testable, and ready for machine-readable use.

### 7.2 Status

Planned.

### 7.3 Includes

1. CLI output policy ADR.
2. Human diagnostic renderer.
3. JSON diagnostic renderer.
4. Stable command result model.
5. Global `--json` flag.
6. Global `--verbose` flag.
7. Global `--quiet` flag.
8. Color mode flag.
9. Exit code policy.
10. Output snapshot tests.
11. CLI output documentation.

### 7.4 Completion Criteria

M3 is complete when:

1. supported commands have consistent output;
2. JSON output exists for core diagnostic paths;
3. exit behavior is predictable;
4. output snapshots protect against accidental regressions.

## 8. Milestone M4 — Adapter Foundation

### 8.1 Goal

Introduce the architecture that lets Monad understand and coordinate native ecosystem tools.

### 8.2 Status

Planned.

### 8.3 Includes

1. Adapter architecture ADR.
2. Adapter capability model.
3. Adapter registry.
4. Tool detection model.
5. Command identifier model.
6. Rust/Cargo adapter foundation.
7. Bun/TypeScript adapter foundation.
8. Adapter health reporting in `doctor`.
9. Adapter inventory reporting in `info`.
10. Adapter fixture tests.
11. Adapter documentation.

### 8.4 Completion Criteria

M4 is complete when:

1. adapters have a typed capability model;
2. Rust/Cargo can be detected;
3. Bun can be detected;
4. `doctor` reports adapter health;
5. `info` reports detected adapters;
6. missing native tools produce clear diagnostics.

## 9. Milestone M5 — Check Runner and Native Command Execution

### 9.1 Goal

Turn configured command identifiers into actual native tool execution through safe command plans.

### 9.2 Status

Planned.

### 9.3 Includes

1. Process execution ADR.
2. Command plan model.
3. Command runner.
4. Output capture.
5. Dry-run command plans.
6. Check command resolution.
7. Rust format check.
8. Rust Clippy check.
9. Rust test check.
10. Check result reporting.
11. Failure exit behavior.
12. Check JSON output.
13. Check runner fixture tests.
14. `monad check` documentation.
15. Initial `monad run` skeleton.

### 9.4 Completion Criteria

M5 is complete when:

1. `monad check` can run configured Rust checks;
2. command plans can be printed before execution;
3. failed native commands cause `monad check` to fail;
4. output and diagnostics are clear;
5. tests cover success, failure, and missing-tool scenarios.

## 10. Milestone M6 — Graph and Project Intelligence

### 10.1 Goal

Build the foundation for `monad graph` and repo relationship intelligence.

### 10.2 Status

Planned.

### 10.3 Includes

1. Graph model draft.
2. Typed graph node and edge model.
3. Workspace graph builder.
4. Deterministic ordering.
5. `monad graph` skeleton.
6. Text graph output.
7. JSON graph output.
8. Mermaid graph output.
9. DOT graph output.
10. `--format` flag.
11. `--output` option.
12. Graph renderer snapshot tests.
13. Graph command documentation.
14. Graph fingerprint state integration.

### 10.4 Completion Criteria

M6 is complete when:

1. `monad graph` exists;
2. graph output supports text, JSON, Mermaid, and DOT;
3. output ordering is deterministic;
4. graph output is testable;
5. graph output can support docs and AI context.

## 11. Milestone M7 — Safe Repo Evolution

### 11.1 Goal

Add safe file operations, embedded templates, and the foundation for `init`, `sync`, `add`, and `upgrade`.

### 11.2 Status

Planned.

### 11.3 Includes

1. Safe file operation ADR.
2. File operation model.
3. Dry-run renderer.
4. Safe write support.
5. Conflict detection.
6. Embedded template registry.
7. Basic template rendering.
8. `monad init` skeleton.
9. Manifest generation.
10. `monad sync` skeleton.
11. Lock refresh.
12. `monad add` skeleton.
13. `monad upgrade` skeleton.
14. Generated file provenance.
15. Safe write fixture tests.
16. Repo evolution documentation.

### 11.4 Completion Criteria

M7 is complete when:

1. Monad can plan file changes safely;
2. dry-run output works;
3. file conflicts are detected;
4. templates can be rendered offline;
5. `init` can generate a minimal `monad.toml`;
6. `sync` can refresh state safely.

## 12. Milestone M8 — AI Context and Memory Foundation

### 12.1 Goal

Add repo-native AI context generation and the initial full AI memory foundation without requiring a hosted LLM provider.

### 12.2 Status

Planned.

### 12.3 Includes

1. AI context strategy ADR.
2. AI bootstrap prompt.
3. Current state document.
4. AI context model.
5. Repo summary generation.
6. Command inventory generation.
7. ADR summary generation.
8. Graph summary generation.
9. AI context command skeleton.
10. Context file writing.
11. Memory index model.
12. Memory provenance.
13. AI context freshness checks.
14. AI context fixture tests.
15. AI workflow documentation.

### 12.4 Completion Criteria

M8 is complete when:

1. Monad can generate AI-readable repo context;
2. generated context is based on repo files and accepted decisions;
3. context generation does not require an LLM provider;
4. freshness can be checked;
5. AI context files can support future assisted development.

## 13. Milestone M9 — Governance and Policy

### 13.1 Goal

Introduce repo contracts, policy checks, documentation checks, ADR checks, and architecture-boundary checks.

### 13.2 Status

Planned.

### 13.3 Includes

1. Repo contract draft.
2. Policy model.
3. Repo contract checks.
4. Documentation checks.
5. ADR checks.
6. Manifest-state checks.
7. Architecture boundary model.
8. Architecture boundary checks.
9. Policy checks integrated into `monad check`.
10. Policy JSON output.
11. Policy fixture tests.
12. Policy documentation.
13. Policy engine ADR.
14. Contribution quality gates.

### 13.4 Completion Criteria

M9 is complete when:

1. Monad can check repository structure;
2. ADR consistency can be checked;
3. documentation expectations can be checked;
4. policy results are included in `monad check`;
5. architecture-boundary checks have a first implementation.

## 14. Milestone M10 — Release and Distribution

### 14.1 Goal

Prepare Monad for serious CLI packaging, release, and installation workflows.

### 14.2 Status

Planned.

### 14.3 Includes

1. Release strategy ADR.
2. Version metadata.
3. Expanded version details.
4. Release build workflow.
5. Cross-platform CI matrix.
6. Installation guide.
7. Shell completion generation.
8. Release process documentation.
9. Changelog foundation.
10. Supply-chain checks.
11. Release artifact upload.
12. Release binary smoke tests.
13. Packaging policy ADR.

### 14.4 Completion Criteria

M10 is complete when:

1. release binaries can be built;
2. release verification exists;
3. installation is documented;
4. release process is repeatable;
5. basic supply-chain checks are present.

## 15. Milestone M11 — MVP Hardening

### 15.1 Goal

Make Monad’s MVP coherent, tested, documented, and usable on real repositories.

### 15.2 Status

Planned.

### 15.3 Includes

1. MVP acceptance criteria.
2. Realistic polyglot fixture.
3. End-to-end MVP command flow test.
4. First tutorial.
5. CLI command reference.
6. Manifest reference.
7. Adapter reference.
8. MVP architecture document.
9. AI current state update.
10. Repository hygiene files.
11. Hardened CI workflow.
12. MVP module boundary cleanup.
13. Coverage improvements.
14. MVP release notes.
15. MVP release tag.

### 15.4 Completion Criteria

M11 is complete when:

1. the core MVP flow works end-to-end;
2. docs are sufficient for a new developer to try Monad;
3. tests cover the MVP path;
4. CI is stable;
5. the MVP can be tagged and described clearly.

## 16. MVP Definition

Monad reaches MVP when it can:

1. initialize or recognize a Monad-aware repository;
2. load and validate `monad.toml`;
3. detect workspace root;
4. detect Rust and Bun toolchains;
5. report repository health through `doctor`;
6. run configured checks through `check`;
7. generate graph output in at least text and JSON, ideally Mermaid and DOT as well;
8. safely generate or update basic repo files;
9. maintain minimal lock/state;
10. generate basic AI-readable context;
11. pass local verification and CI;
12. provide enough documentation for another developer to use it.

## 17. Post-MVP Direction

After MVP, Monad may expand toward:

1. Python adapter.
2. Go adapter.
3. Java adapter.
4. PHP adapter.
5. richer task graph execution;
6. release orchestration;
7. plugin system;
8. remote cache exploration;
9. local TUI or web UI;
10. deeper AI memory system;
11. policy pack ecosystem;
12. repo-readiness scanning;
13. enterprise governance profiles.

These are not required for the first MVP.

## 18. Maintenance

Update this roadmap when:

1. milestone scope changes;
2. MVP definition changes;
3. an ADR changes product direction;
4. an epic is added or removed;
5. implementation reality significantly diverges from the roadmap;
6. a milestone is completed.

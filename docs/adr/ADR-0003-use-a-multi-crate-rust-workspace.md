---
title: "ADR-0003: Use a Multi-Crate Rust Workspace"
description: "Records the decision to structure Monad as a Rust multi-crate workspace from the beginning."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approvet"
adr_number: "ADR-0003"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
tags:
  - monad
  - adr
  - rust
  - workspace
  - multi-crate
  - architecture
  - crate-boundaries
  - repo-runtime
  - developer-experience
---

# ADR-0003: Use a Multi-Crate Rust Workspace

## 1. Status

Approved. Accepted.

This ADR records a decision already established by the approved Monad product charter: Monad shall begin with a multi-crate Rust workspace.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad is expected to grow beyond a small command-line wrapper. It will eventually include:

1. CLI command routing.
2. Workspace root detection.
3. Manifest loading and validation.
4. Ecosystem adapter interfaces.
5. Toolchain detection.
6. Task planning.
7. Process execution coordination.
8. File operation planning and execution.
9. Dry-run and diff behavior.
10. Diagnostics and reporting.
11. Verification orchestration.
12. Graph construction.
13. Provenance and state recording.
14. Embedded template handling.
15. Policy checks.
16. Architecture-boundary checks.
17. AI-readable context generation.
18. A full AI memory system.
19. Repo evolution workflows.
20. Release workflow support.

These capabilities are related, but they are not all the same concern.

A single-crate Rust project would be simple at the very beginning, but it would likely become harder to maintain as Monad grows. A large monolithic crate could blur boundaries between CLI presentation, domain logic, manifest handling, adapters, file operations, diagnostics, and execution planning.

A multi-crate workspace gives Monad a better foundation for separation of concerns, testability, reuse, and future evolution.

At the same time, Monad should not split into too many crates too early. The initial workspace should be intentionally small and expanded only when boundaries become real.

## 3. Decision

Monad shall use a Rust multi-crate workspace from the beginning.

The initial workspace should contain a small number of crates that establish clear boundaries without over-fragmenting the codebase.

The initial recommended crate layout is:

```text
crates/
  monad-cli/
  monad-core/
```

The workspace root should contain the root `Cargo.toml`.

The `monad-cli` crate shall own:

1. The `monad` binary.
2. CLI argument parsing.
3. CLI command routing.
4. Human-facing command output.
5. Process exit code mapping.
6. Top-level command composition.

The `monad-core` crate shall own:

1. Core domain types.
2. Workspace context resolution.
3. Manifest detection and loading foundations.
4. Diagnostics domain models.
5. Adapter traits and early adapter abstractions.
6. File operation abstractions.
7. Shared execution planning types.
8. Shared result and error models.
9. Testable runtime logic independent from CLI argument parsing.

Additional crates should be added later only when the boundary is justified by implementation pressure, complexity, reuse, compile-time concerns, or independent testing needs.

Potential later crates include:

```text
crates/
  monad-manifest/
  monad-workspace/
  monad-adapters/
  monad-exec/
  monad-templates/
  monad-policy/
  monad-graph/
  monad-diagnostics/
  monad-ai-context/
```

These later crates are not approved by this ADR as immediate scaffold requirements. They are candidates for future extraction.

## 4. Rationale

A multi-crate workspace fits Monad’s product shape.

Monad is not only a small CLI. It is intended to become a repo runtime with serious internal subsystems. The codebase should therefore begin with enough separation to avoid collapsing all concerns into one crate.

The chosen initial split, `monad-cli` and `monad-core`, gives the project the best early balance:

1. It keeps the initial scaffold simple.
2. It establishes a clean CLI/core boundary.
3. It makes core logic testable without invoking the CLI.
4. It prevents command-line parsing from leaking into domain logic.
5. It allows future crates to be extracted deliberately.
6. It avoids premature over-splitting into many empty crates.
7. It supports the single-binary product shape.
8. It allows the CLI binary to remain thin.
9. It gives future architecture documentation a real boundary to describe.
10. It aligns with governance-grade implementation discipline.

The most important initial architectural boundary is between:

```text
CLI interface / command shell
```

and:

```text
repo runtime core / domain logic
```

This ADR establishes that boundary from the start.

## 5. Alternatives Considered

### 5.1 Single Crate

Monad could begin as a single Rust crate containing both the binary and all core logic.

This was rejected.

Advantages:

1. Simpler initial setup.
2. Fewer files.
3. Fewer Cargo workspace concerns.
4. Faster for a very small prototype.

Disadvantages:

1. Encourages mixing CLI parsing with core logic.
2. Makes later extraction more painful.
3. Makes architecture boundaries less explicit.
4. Makes governance-grade separation harder.
5. Risks becoming a large monolithic crate.
6. Does not reflect Monad’s long-term runtime scope.

A single crate would be acceptable for a throwaway prototype, but Monad is not intended to be a throwaway prototype.

### 5.2 Many Crates Immediately

Monad could begin with many crates, such as:

```text
monad-cli
monad-core
monad-manifest
monad-workspace
monad-adapters
monad-exec
monad-templates
monad-policy
monad-graph
monad-diagnostics
monad-ai-context
```

This was rejected for the initial scaffold.

Advantages:

1. Very explicit architectural separation.
2. Clear future subsystem names.
3. Encourages strong boundaries from day one.

Disadvantages:

1. Too much empty structure too early.
2. Slower initial implementation.
3. More boilerplate.
4. Premature boundary decisions.
5. More dependency management overhead.
6. More refactoring if early assumptions are wrong.

Monad should acknowledge these future boundaries but not create all of them before the code proves they are needed.

### 5.3 CLI Crate Plus Many Domain Crates

Monad could begin with `monad-cli` plus several domain crates, such as `monad-manifest`, `monad-workspace`, and `monad-adapters`.

This was deferred.

This may become the correct structure soon, but the first implementation slice only needs enough structure to prove the CLI/core boundary. Domain crates can be extracted after the initial `monad info`, workspace detection, manifest detection, diagnostics, and adapter foundations exist.

### 5.4 Workspace with Root Binary Only

Monad could place the binary at the workspace root and add library crates later.

This was rejected.

The root should remain a workspace coordination layer. The binary should live in a dedicated crate so that the workspace shape stays clear as the project grows.

## 6. Consequences

### 6.1 Positive Consequences

Using a multi-crate workspace gives Monad:

1. Clearer architecture from the beginning.
2. A clean CLI/core boundary.
3. Better testability.
4. Better future modularity.
5. A natural place for future subsystem extraction.
6. Better alignment with a serious Rust developer-tooling project.
7. Better support for governance-grade boundaries.
8. Easier future crate-level documentation.
9. More explicit dependency management.
10. A better foundation for adapter and policy architecture.

### 6.2 Negative Consequences

Using a multi-crate workspace also creates costs:

1. Slightly more initial setup.
2. More files than a single-crate project.
3. More Cargo workspace configuration.
4. More decisions about crate dependencies.
5. Potential risk of premature abstraction if not managed carefully.
6. More care needed to prevent circular dependencies.
7. More care needed to keep crate boundaries meaningful.

### 6.3 Neutral Consequences

This decision does not require publishing multiple crates.

Monad may remain distributed as a single binary even though the source code uses multiple crates.

This decision also does not lock the final crate structure forever. Future ADRs may add, merge, split, rename, or remove crates as the architecture matures.

## 7. Implementation Guidance

### 7.1 Initial Workspace Tree

The initial implementation should create:

```text
Cargo.toml
crates/
  monad-cli/
    Cargo.toml
    src/
      main.rs
  monad-core/
    Cargo.toml
    src/
      lib.rs
```

The root `Cargo.toml` should define the workspace.

The `monad-cli` crate should define the binary named:

```text
monad
```

The `monad-cli` crate should depend on `monad-core`.

The `monad-core` crate should not depend on `monad-cli`.

### 7.2 Dependency Direction

Dependency direction must be:

```text
monad-cli -> monad-core
```

The reverse dependency is forbidden.

Core logic must not depend on CLI presentation concerns.

### 7.3 Root Cargo Manifest

The root `Cargo.toml` should use Cargo workspace configuration.

It should define:

1. Workspace members.
2. Shared package metadata where appropriate.
3. Shared dependency versions where appropriate.
4. Shared lint configuration where appropriate.
5. Resolver version.

The workspace should use the current Cargo resolver appropriate for modern Rust workspaces.

### 7.4 Crate Naming

Crate names should use kebab case:

```text
monad-cli
monad-core
```

Rust module paths will use underscore form automatically when imported:

```rust
monad_core
```

### 7.5 CLI Crate Responsibilities

`monad-cli` should remain thin.

It should handle:

1. Parsing CLI arguments.
2. Mapping parsed commands to core operations.
3. Rendering output.
4. Mapping errors to exit codes.
5. Initializing tracing/logging.
6. Managing top-level async runtime entry, if required.

It should not own core business logic.

### 7.6 Core Crate Responsibilities

`monad-core` should own the early runtime model.

It should handle:

1. Workspace discovery.
2. Workspace context models.
3. Manifest detection primitives.
4. Diagnostic models.
5. Adapter traits.
6. File operation models.
7. Execution planning models.
8. Core errors.
9. Testable pure logic where possible.

### 7.7 Future Extraction Rule

A new crate should be introduced when at least one of the following is true:

1. The module has a stable conceptual boundary.
2. The module has significant dependencies not needed by the rest of core.
3. The module needs independent test fixtures.
4. The module is likely to become independently reusable.
5. The module is creating compile-time or dependency bloat in `monad-core`.
6. The module has a distinct domain vocabulary.
7. The module has architecture significance requiring separate documentation.

A new crate should not be introduced merely because a future diagram contains a box for it.

### 7.8 Internal Module Structure

Before extracting crates, `monad-core` may use internal modules such as:

```text
src/
  lib.rs
  diagnostics/
  workspace/
  manifest/
  adapters/
  file_ops/
  exec/
```

These modules can later become crates if justified.

### 7.9 Testing Guidance

Unit tests for core logic should live close to the code in `monad-core`.

CLI behavior tests should live in integration tests that execute the `monad` binary.

Fixture-based tests should be introduced early for:

1. Empty repository.
2. Repository with `monad.toml`.
3. Rust/Cargo workspace.
4. Bun/TypeScript workspace.
5. Missing native tool scenario.
6. Invalid manifest scenario.

### 7.10 Documentation Guidance

Each crate should eventually have a crate-level documentation comment explaining its purpose.

Example:

```rust
//! Core runtime library for Monad.
//!
//! This crate contains workspace discovery, manifest handling,
//! diagnostics, adapter traits, and testable repo-runtime logic.
```

## 8. Verification

This ADR is satisfied when:

1. The root `Cargo.toml` defines a Rust workspace.
2. The workspace includes `crates/monad-cli`.
3. The workspace includes `crates/monad-core`.
4. `monad-cli` defines a binary named `monad`.
5. `monad-cli` depends on `monad-core`.
6. `monad-core` does not depend on `monad-cli`.
7. `cargo check --workspace` succeeds.
8. `cargo test --workspace` succeeds.
9. `cargo fmt --check` succeeds.
10. `cargo clippy --workspace --all-targets --all-features -- -D warnings` succeeds once Clippy is introduced into verification.
11. Documentation identifies the crate boundary.

Initial verification commands:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once the root verification script exists, the preferred command should be:

```bash
./tools/scripts/verify.sh
```

## 9. Related Decisions

This ADR is related to:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`
3. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
4. `ADR-0005-introduce-tokio-immediately.md`
5. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

Future ADRs may refine:

1. Final crate boundaries.
2. Workspace dependency policy.
3. Public API policy between internal crates.
4. Plugin crate strategy.
5. Adapter crate strategy.
6. Release and publishing strategy.

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | Approved. Accepted. |
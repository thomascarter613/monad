---
title: "ADR-0005: Introduce Tokio Immediately"
description: "Records the decision to introduce Tokio immediately as Monad's async runtime foundation."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0005"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0005-introduce-tokio-immediately.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
  - "docs/adr/ADR-0006-use-monad-toml-as-canonical-manifest.md"
tags:
  - monad
  - adr
  - rust
  - tokio
  - async-runtime
  - process-execution
  - task-execution
  - adapters
  - repo-runtime
  - developer-experience
---

# ADR-0005: Introduce Tokio Immediately

## 1. Status

approved. accepted.

This ADR records a decision already established by the approved Monad product charter: Monad shall introduce Tokio immediately.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad is expected to coordinate repository operations that may involve:

1. Inspecting many files.
2. Detecting multiple language ecosystems.
3. Checking native tool availability.
4. Reading manifests.
5. Running external commands.
6. Coordinating package-level tasks.
7. Running checks across workspaces.
8. Producing diagnostics.
9. Building project and task graphs.
10. Generating files.
11. Recording provenance.
12. Producing AI-readable context.
13. Supporting future plugin or adapter workflows.
14. Supporting future release workflows.
15. Supporting future policy and architecture-boundary checks.

Many early operations can be written synchronously. However, Monad’s product direction strongly suggests that async process execution and concurrent coordination will become necessary.

Examples include:

1. Checking multiple tool versions.
2. Running independent diagnostics.
3. Running package-level checks across multiple projects.
4. Coordinating external commands.
5. Reading or scanning files concurrently.
6. Supporting future long-running processes.
7. Handling child process output.
8. Supporting cancellation or timeouts.
9. Supporting structured execution plans.
10. Supporting richer runtime orchestration.

The approved product charter closes the decision that Tokio should be introduced immediately. This ADR records that decision as an architectural constraint.

## 3. Decision

Monad shall introduce Tokio immediately as its async runtime foundation.

The initial `monad-cli` binary should use Tokio for the top-level async runtime.

The initial command entrypoint may use:

```rust
#[tokio::main]
async fn main() -> std::process::ExitCode {
    // command routing
}
```

or an equivalent runtime setup.

Tokio shall be treated as the default async runtime for Monad’s internal runtime orchestration, especially for future work involving:

1. Process execution.
2. Concurrent diagnostics.
3. Toolchain checks.
4. Task scheduling.
5. Command planning.
6. Adapter execution.
7. Timeout handling.
8. Cancellation-aware workflows.
9. Async filesystem operations where justified.
10. Future long-running local services, if introduced.

Monad should not use Tokio as an excuse to make every function async unnecessarily. Pure computation, manifest data modeling, validation logic, graph algorithms, and deterministic transformations should remain synchronous unless async behavior is genuinely needed.

## 4. Rationale

Introducing Tokio immediately is the correct decision because Monad’s likely execution model will need async capabilities early.

Monad is not merely a static parser. It is a repo runtime that will coordinate native tools, run checks, perform diagnostics, and eventually execute graph-aware tasks.

Retrofitting async later can be disruptive. It can force large signature changes, command-routing changes, adapter trait changes, test rewrites, and architecture churn.

Introducing Tokio early provides:

1. A stable runtime foundation.
2. Early clarity for command signatures.
3. A natural foundation for process execution.
4. Better future support for concurrent diagnostics.
5. Better future support for timeouts and cancellation.
6. Cleaner design for adapter traits that may need async operations.
7. Better alignment with a serious runtime-oriented tool.
8. Reduced architectural churn later.

Tokio is mature, widely used, well-documented, and appropriate for Rust developer tooling that needs async process and IO coordination.

## 5. Alternatives Considered

### 5.1 Start Synchronous and Add Tokio Later

Monad could begin with purely synchronous command execution and introduce Tokio only when async needs become unavoidable.

This was rejected.

Advantages:

1. Simpler initial code.
2. Fewer dependencies at the first scaffold.
3. Easier mental model for very early commands.
4. Avoids async trait complexity temporarily.

Disadvantages:

1. Likely future refactor across command routing.
2. Likely future refactor across adapter traits.
3. Harder to design process execution correctly from the start.
4. More risk of blocking assumptions becoming embedded.
5. More churn once concurrent diagnostics and task execution appear.
6. The approved product charter already closes the decision to introduce Tokio immediately.

Starting synchronous may be appropriate for a tiny CLI. Monad is intended to become a repo runtime.

### 5.2 Use Another Async Runtime

Monad could use another Rust async runtime instead of Tokio.

This was rejected for the initial direction.

Tokio is the strongest default because:

1. It is widely adopted.
2. It has mature process support.
3. It has strong ecosystem compatibility.
4. It has broad documentation.
5. It is familiar to many Rust developers.
6. It supports the kind of runtime coordination Monad is likely to need.

Other runtimes may be evaluated later only if a strong reason emerges.

### 5.3 Avoid Async Entirely

Monad could avoid async and rely on threads or sequential process execution.

This was rejected.

Reasons:

1. Monad will likely need concurrent diagnostics.
2. Monad will likely need process timeout and cancellation behavior.
3. Monad will likely need structured orchestration.
4. Future graph-aware task execution benefits from async foundations.
5. Avoiding async would limit runtime design unnecessarily.

### 5.4 Use Threads Directly

Monad could use OS threads directly for concurrency.

This was rejected as the primary model.

Threads may still be useful for CPU-bound work or blocking operations, but Tokio provides a better foundation for async process execution, IO coordination, timeouts, and future runtime orchestration.

### 5.5 Hide Runtime Choice Behind a Custom Runtime Abstraction Immediately

Monad could create its own runtime abstraction to avoid depending directly on Tokio in core types.

This was deferred.

An abstraction may become useful later, but creating one before the runtime needs are better understood risks unnecessary complexity.

Monad should use Tokio directly where it is appropriate and avoid leaking Tokio-specific details into pure domain models unnecessarily.

## 6. Consequences

### 6.1 Positive Consequences

Introducing Tokio immediately gives Monad:

1. A mature async foundation.
2. Cleaner future process execution design.
3. Better support for concurrent diagnostics.
4. Better support for timeouts.
5. Better support for cancellation-aware workflows.
6. Better alignment with adapter-based execution.
7. Less architectural churn later.
8. Better support for graph-aware task execution in future phases.
9. A clear runtime model from the first scaffold.
10. Good compatibility with Rust ecosystem libraries that expect Tokio.

### 6.2 Negative Consequences

Introducing Tokio immediately also creates costs:

1. Adds a dependency before the first command strictly requires it.
2. Requires async-aware testing patterns.
3. Can encourage unnecessary async if not disciplined.
4. Can make simple early code slightly more complex.
5. Requires care to avoid blocking inside async contexts.
6. May require using `spawn_blocking` or equivalent for blocking work later.
7. May influence adapter trait design before all adapter needs are known.

### 6.3 Neutral Consequences

This decision does not require every internal API to be async.

This decision does not require all file operations to use async filesystem APIs.

This decision does not decide the final task scheduler.

This decision does not decide the full process execution model.

This decision does not decide whether Monad will run tasks concurrently by default.

Those decisions should be made separately as implementation needs become concrete.

## 7. Implementation Guidance

### 7.1 CLI Runtime

The `monad-cli` crate should initialize Tokio at the top-level binary entrypoint.

A reasonable initial pattern is:

```rust
#[tokio::main]
async fn main() -> std::process::ExitCode {
    monad_cli::run().await
}
```

The exact function organization may vary, but the top-level runtime should be clear.

### 7.2 Runtime Ownership

The CLI crate may own the top-level runtime initialization.

The core crate may expose async functions for operations that require process execution, concurrent IO, or runtime orchestration.

Pure domain logic in `monad-core` should remain synchronous.

### 7.3 Avoid Async Pollution

Do not make a function async merely because Tokio exists.

A function should be async when it:

1. Awaits external command execution.
2. Performs async IO.
3. Coordinates concurrent tasks.
4. Uses timeouts.
5. Uses cancellation-aware runtime behavior.
6. Calls other genuinely async functions.

A function should generally remain synchronous when it:

1. Parses data already in memory.
2. Validates a manifest model.
3. Builds a small data structure.
4. Computes a deterministic result.
5. Formats diagnostic data.
6. Performs pure transformations.
7. Contains domain rules independent from IO.

### 7.4 Process Execution

Tokio should be the default foundation for future external process execution.

When Monad runs native tools such as Cargo, Bun, Python tooling, Go tooling, TypeScript, Docker, Terraform/OpenTofu, or other commands, the implementation should eventually support:

1. Capturing stdout.
2. Capturing stderr.
3. Streaming output where appropriate.
4. Timeouts.
5. Cancellation.
6. Exit-code mapping.
7. Structured diagnostics.
8. Dry-run command plans.
9. Provenance records.
10. Machine-readable reports.

The exact process execution abstraction should be designed later.

### 7.5 Blocking Work

Blocking operations should not be performed carelessly inside async contexts.

When blocking work is necessary, Monad should consider:

1. Keeping it synchronous before entering async orchestration.
2. Using `tokio::task::spawn_blocking`.
3. Using dedicated worker threads for CPU-heavy operations.
4. Avoiding unnecessary async wrappers around simple operations.
5. Documenting blocking behavior in core runtime modules.

### 7.6 Adapter Traits

Adapter traits may eventually need async methods for operations such as:

1. Tool version detection.
2. Workspace inspection.
3. Task execution.
4. Diagnostics.
5. Graph contribution.
6. Context generation.

The initial adapter design should account for this possibility.

However, the adapter API should not become more complex than necessary before the first concrete adapters exist.

### 7.7 Testing

Async command behavior should be testable through:

1. `cargo test`.
2. async unit tests using Tokio test utilities where needed.
3. CLI integration tests using command execution helpers.
4. fixture workspaces.
5. missing-tool scenarios.
6. timeout scenarios eventually.
7. command-output capture eventually.

### 7.8 Dependency Configuration

The initial dependency should avoid enabling unnecessary Tokio features.

A reasonable starting point may be:

```toml
tokio = { version = "...", features = ["macros", "rt-multi-thread", "process", "time", "io-util"] }
```

The exact version and feature set should be selected during implementation.

If the first scaffold only needs the runtime macro, the feature set may begin smaller and expand as needed.

### 7.9 Observability

Tokio should be compatible with Monad’s future tracing and diagnostics story.

Monad should eventually use structured tracing for command execution and diagnostics, but this ADR does not decide the tracing framework or output format.

### 7.10 Cross-Platform Behavior

Tokio process execution should be implemented with cross-platform behavior in mind.

Monad should avoid shell-specific assumptions such as requiring Bash for core runtime logic.

Where shell commands are necessary, they should be explicit and documented.

## 8. Verification

This ADR is satisfied when:

1. `tokio` is included as a dependency where appropriate.
2. The `monad` binary initializes a Tokio runtime.
3. The CLI can run successfully under the Tokio runtime.
4. `cargo check --workspace` succeeds.
5. `cargo test --workspace` succeeds.
6. At least one async test or async command path is supported once useful.
7. The codebase avoids making pure domain logic unnecessarily async.
8. Documentation identifies Tokio as the selected async runtime foundation.

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
3. `ADR-0003-use-a-multi-crate-rust-workspace.md`
4. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
5. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

Future ADRs may refine:

1. process execution model
2. task scheduling model
3. adapter trait async behavior
4. cancellation and timeout policy
5. command streaming output policy
6. structured logging and tracing policy
7. long-running service or daemon behavior, if introduced

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | approved. accepted. |
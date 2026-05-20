---
title: "ADR-0009: Use clap for CLI Command Parsing"
description: "Records the decision to use clap as Monad's Rust CLI command parsing framework, using derive-based parsing for the initial static command surface."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0009"
adr_status: "accepted."
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0009-use-clap-for-cli-command-parsing.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
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
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
tags:
  - monad
  - adr
  - rust
  - cli
  - clap
  - command-parsing
  - developer-experience
  - repo-runtime
---

# ADR-0009: Use clap for CLI Command Parsing

## 1. Status

approved. accepted.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

The initial Rust workspace has been approved as a multi-crate workspace with:

```text
crates/
  monad-cli/
  monad-core/
```

The `monad-cli` crate owns the command-line interface, while `monad-core` owns testable runtime logic.

Monad’s expected command surface includes:

```bash
monad init
monad add
monad run
monad check
monad sync
monad doctor
monad graph
monad release
monad upgrade
monad info
```

The earliest implementation should focus on:

```bash
monad --help
monad info
monad doctor
monad check
```

Before implementing real CLI behavior, Monad needs an accepted decision for command parsing.

The CLI framework should support:

1. Clear help output.
2. Subcommands.
3. Global flags.
4. Version output.
5. Structured command modeling.
6. Testable command parsing.
7. Good Rust ecosystem support.
8. Long-term maintainability.
9. Compatibility with Tokio-based command execution.
10. A strong developer experience for contributors.

## 3. Decision

Monad shall use `clap` as its CLI command parsing framework.

Monad shall initially use `clap`’s derive-based API for the static core command surface.

The initial dependency should be declared through workspace dependencies:

```toml
clap = { version = "4", features = ["derive"] }
```

The initial command model should live in `monad-cli`, not `monad-core`.

The `monad-cli` crate may define parsing structs such as:

```rust
#[derive(clap::Parser)]
struct Cli {
    #[command(subcommand)]
    command: Option<Command>,
}
```

The core runtime should not depend on `clap`.

The dependency direction remains:

```text
monad-cli -> monad-core
```

`monad-core` must remain independent of CLI parsing concerns.

## 4. Rationale

`clap` is the strongest default choice for Monad because it is mature, widely used, well-documented, and idiomatic for serious Rust CLI applications.

It supports:

1. Subcommands.
2. Arguments.
3. Flags.
4. Environment integration.
5. Help text generation.
6. Version output.
7. Shell completions eventually.
8. Typed derive-based command models.
9. Builder-style command construction when needed.
10. Good testability.

Using `clap` lets Monad build a professional CLI without spending early engineering effort on custom parser behavior.

Using derive-based parsing is appropriate for Monad’s initial static command surface because the early commands are known and should be type-checked.

Monad can still use builder-style APIs later if dynamic command generation, plugin commands, or adapter-provided command surfaces require it.

## 5. Alternatives Considered

### 5.1 Hand-Written Argument Parsing

Monad could parse `std::env::args()` manually.

This was rejected.

Advantages:

1. No dependency.
2. Full control.
3. Simple for a tiny prototype.

Disadvantages:

1. Poor long-term maintainability.
2. Easy to implement inconsistently.
3. Requires custom help output.
4. Requires custom error handling.
5. Requires custom subcommand parsing.
6. Not appropriate for Monad’s expected command surface.

Monad is not a throwaway prototype, so hand-written parsing is the wrong foundation.

### 5.2 `argh`

`argh` is a lightweight Rust argument parsing library.

This was considered but rejected for Monad’s primary CLI.

Advantages:

1. Small.
2. Simple.
3. Derive-based.
4. Good for compact command surfaces.

Disadvantages:

1. Less feature-rich than `clap`.
2. Less suitable for a large long-term CLI.
3. Less flexible for future command complexity.
4. Weaker fit for Monad’s expected developer-tooling scope.

### 5.3 `bpaf`

`bpaf` is a capable parser-combinator-style CLI library.

This was considered but rejected for the initial direction.

Advantages:

1. Powerful.
2. Composable.
3. Type-safe.
4. Good for complex parser design.

Disadvantages:

1. Less familiar to many Rust developers.
2. Higher learning curve for contributors.
3. Less conventional for mainstream Rust CLIs.
4. Less aligned with the simple initial command needs.

### 5.4 `structopt`

`structopt` was considered historically, but it has effectively been absorbed into modern `clap` derive usage.

This was rejected in favor of `clap` directly.

### 5.5 Builder-Only `clap`

Monad could use `clap`’s builder API from the beginning.

This was deferred.

Advantages:

1. More dynamic.
2. Useful for generated command surfaces.
3. Useful for plugin-provided commands eventually.

Disadvantages:

1. More verbose for known static commands.
2. Less ergonomic for the initial CLI.
3. More boilerplate.
4. Less direct mapping to command structs.

Monad may use builder APIs later where justified, but derive-based parsing is the best initial default.

## 6. Consequences

### 6.1 Positive Consequences

Using `clap` gives Monad:

1. Professional help output.
2. Idiomatic Rust CLI parsing.
3. Strong support for subcommands.
4. Typed command structures.
5. Better testability.
6. Better contributor familiarity.
7. Future support for shell completions.
8. Future support for global flags.
9. Clear command modeling.
10. Reduced custom parsing code.

### 6.2 Negative Consequences

Using `clap` also creates costs:

1. Adds a dependency.
2. Couples CLI parsing syntax to `clap` APIs.
3. Requires care to keep `clap` out of `monad-core`.
4. Derive macros add some compile-time cost.
5. Dynamic plugin commands may require later use of builder APIs or another abstraction.

### 6.3 Neutral Consequences

This decision does not define the full command surface.

This decision does not decide the final output format policy.

This decision does not decide structured JSON output conventions.

This decision does not decide shell completion generation.

This decision does not decide plugin command registration.

Those decisions can be handled later.

## 7. Implementation Guidance

### 7.1 Workspace Dependency

The root `Cargo.toml` should include:

```toml
[workspace.dependencies]
clap = { version = "4", features = ["derive"] }
```

### 7.2 CLI Crate Dependency

`crates/monad-cli/Cargo.toml` should include:

```toml
[dependencies]
clap.workspace = true
monad-core.workspace = true
tokio.workspace = true
```

### 7.3 Keep `clap` Out of `monad-core`

`monad-core` must not depend on `clap`.

The core crate should expose runtime functions and domain types that can be called from CLI commands, tests, future UI layers, or future automation surfaces.

### 7.4 Initial Command Shape

The first real command shape should support:

```bash
monad --help
monad --version
monad info
```

It may also include placeholder command shells for:

```bash
monad doctor
monad check
```

However, placeholder commands should avoid pretending to perform checks before the underlying core logic exists.

### 7.5 Global Flags

Monad should eventually support global flags such as:

```bash
--json
--verbose
--quiet
--no-color
--color
--manifest-path
--workspace-root
```

These do not need to be implemented in the first CLI commit unless they are directly useful.

### 7.6 Exit Codes

The CLI should map command results to `std::process::ExitCode`.

Initial successful commands should return:

```rust
ExitCode::SUCCESS
```

Failure mapping can be refined when diagnostics and error models are introduced.

### 7.7 Async Compatibility

The CLI entrypoint should remain compatible with Tokio:

```rust
#[tokio::main]
async fn main() -> std::process::ExitCode {
    // parse and dispatch
}
```

Not every command handler needs to be meaningfully async at first, but command routing should be ready for async operations.

### 7.8 Help Text Quality

Help text is part of Monad’s developer experience.

Command descriptions should be clear, restrained, and accurate.

The CLI should avoid marketing-heavy help text. It should explain what the command does.

### 7.9 Testing

The CLI should include tests that verify:

1. `monad --help` succeeds.
2. `monad --version` succeeds.
3. `monad info` succeeds.
4. Unknown commands fail.
5. Help output includes core command names.

These tests may be implemented with `assert_cmd` or similar tooling in a later test-focused slice.

## 8. Verification

This ADR is satisfied when:

1. `clap` is included as a workspace dependency.
2. `monad-cli` depends on `clap`.
3. `monad-core` does not depend on `clap`.
4. `monad --help` works.
5. `monad --version` works.
6. `monad info` is parsed as a real subcommand.
7. `cargo check --workspace` succeeds.
8. `cargo test --workspace` succeeds.
9. `cargo clippy --workspace --all-targets --all-features -- -D warnings` succeeds.
10. The CLI/core dependency boundary remains intact.

Initial verification commands:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo run -p monad-cli --bin monad -- --help
cargo run -p monad-cli --bin monad -- --version
cargo run -p monad-cli --bin monad -- info
```

Once the root verification script exists, the preferred command should be:

```bash
./tools/scripts/verify.sh
```

## 9. Related Decisions

This ADR is related to:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0003-use-a-multi-crate-rust-workspace.md`
3. `ADR-0005-introduce-tokio-immediately.md`
4. `ADR-0006-use-monad-toml-as-canonical-manifest.md`

Future ADRs or specs may define:

1. CLI output format policy.
2. Error and diagnostics model.
3. Exit code policy.
4. Shell completion generation.
5. Plugin command registration.
6. Global flag policy.
7. Structured JSON output conventions.
8. Command naming conventions.

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | approved. accepted. |
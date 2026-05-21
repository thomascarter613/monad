---
title: "WP-E1-S10: Add CLI Command Smoke Tests"
description: "Work packet for adding smoke tests for Monad's initial CLI command surface."
project_name: "Monad"
project_slug: "monad"
document_type: "work-packet"
document_status: "ready"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
canonical_path: "docs/work-packets/active/WP-E1-S10-cli-command-smoke-tests.md"
work_packet_id: "WP-E1-S10"
epic_id: "E1"
slice_id: "S10"
status: "ready"
related_backlog_item: "E1-S10"
recommended_commit: "test(cli): add command smoke tests"
tags:
  - monad
  - work-packet
  - cli
  - tests
  - smoke-tests
  - rust
---

# WP-E1-S10: Add CLI Command Smoke Tests

## 1. Status

```text
Ready
```

## 2. Position

```text
Epic: E1 — Runtime Foundation and CLI Bootstrap
Slice: E1-S10 — test(cli): add command smoke tests
Backlog order: 25
Approximate MVP progress before: ~11%
Approximate MVP progress after: ~12%
```

## 3. Goal

Add CLI smoke tests for Monad's initial command surface.

The tests should verify that the compiled `monad` binary can run the first supported commands successfully and fail correctly for an unknown command.

## 4. Non-Goals

This work packet does not:

1. add new CLI commands;
2. change command output format;
3. add JSON output;
4. add command snapshot tests;
5. add adapter tests;
6. implement real check execution;
7. refactor command handlers.

## 5. Why This Matters

Monad now has a real CLI surface. Before expanding the CLI further, we need tests that prove the binary starts and the basic commands work.

This protects:

1. `monad --help`;
2. `monad --version`;
3. `monad info`;
4. `monad doctor`;
5. `monad check`;
6. unknown command failure behavior.

## 6. Relevant Decisions and Constraints

Relevant documents:

* `docs/project/01-charter/PRODUCT-CHARTER.md`
* `docs/adr/ADR-0001-use-rust-for-monad-runtime.md`
* `docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md`
* `docs/adr/ADR-0005-introduce-tokio-immediately.md`
* `docs/adr/ADR-0009-use-clap-for-cli-command-parsing.md`
* `docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md`
* `docs/backlog/ORDERED-BACKLOG.md`

## 7. Files Expected to Change

```text
Cargo.toml
crates/monad-cli/Cargo.toml
crates/monad-cli/tests/cli_smoke.rs
Cargo.lock
```

## 8. Files That Must Not Change

```text
crates/monad-core/src/manifest.rs
crates/monad-core/src/workspace.rs
crates/monad-core/src/diagnostics.rs
crates/monad-cli/src/main.rs
crates/monad-cli/src/cli.rs
```

## 9. Implementation Plan

1. Add `assert_cmd` as a workspace dev/test dependency.
2. Add `predicates` as a workspace dev/test dependency.
3. Add `assert_cmd` and `predicates` as `monad-cli` dev-dependencies.
4. Create `crates/monad-cli/tests/cli_smoke.rs`.
5. Add smoke tests for help, version, info, doctor, check, and unknown commands.
6. Run full verification.
7. Commit with the recommended Conventional Commit message.

## 10. Rust Learning Notes

This slice introduces Rust integration tests.

Important concepts:

1. Files under `tests/` are integration tests.
2. Integration tests compile as separate crates.
3. `assert_cmd` runs the compiled CLI binary.
4. `predicates` checks stdout/stderr content.
5. Tests can return `Result<(), Box<dyn Error>>` so `?` can be used instead of `unwrap()` or `expect()`.
6. Avoiding `unwrap()` and `expect()` matters because Monad denies Clippy warnings during verification.

## 11. Verification

Run:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Manual checks:

```bash
cargo run -p monad-cli --bin monad -- --help
cargo run -p monad-cli --bin monad -- --version
cargo run -p monad-cli --bin monad -- info
cargo run -p monad-cli --bin monad -- doctor
cargo run -p monad-cli --bin monad -- check
```

## 12. Expected Output

`cargo test --workspace` should include integration tests from:

```text
crates/monad-cli/tests/cli_smoke.rs
```

The smoke tests should pass.

## 13. Definition of Done

This packet is done when:

1. CLI smoke tests exist;
2. all smoke tests pass;
3. formatting passes;
4. Cargo check passes;
5. Clippy passes with warnings denied;
6. manual command checks pass;
7. commit is made with the recommended commit message.

## 14. Recommended Commit

```bash
git add Cargo.toml Cargo.lock crates/monad-cli/Cargo.toml crates/monad-cli/tests/cli_smoke.rs
git commit -m "test(cli): add command smoke tests"
```

## 15. Next Work Packet

```text
WP-E1-S11-local-verification-script
```

## 16. Notes

After this slice, the next step is to add `tools/scripts/verify.sh` so local verification has one canonical command.

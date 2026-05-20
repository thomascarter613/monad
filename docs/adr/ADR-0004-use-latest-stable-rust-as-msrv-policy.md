---
title: "ADR-0004: Use Latest Stable Rust as MSRV Policy"
description: "Records the decision that Monad will target the latest stable Rust toolchain as its minimum supported Rust version policy during early development."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "accepted"
adr_number: "ADR-0004"
adr_status: "approved"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
tags:
  - monad
  - adr
  - rust
  - msrv
  - rust-toolchain
  - stable-rust
  - toolchain-policy
  - developer-experience
  - repo-runtime
---

# ADR-0004: Use Latest Stable Rust as MSRV Policy

## 1. Status

Approved. Accepted.

This ADR records a decision already established by the approved Monad product charter: Monad shall use the latest stable Rust toolchain as its minimum supported Rust version policy during early development.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad’s early development will involve:

1. CLI command parsing.
2. Workspace root detection.
3. Manifest loading and validation.
4. Ecosystem adapter design.
5. Toolchain detection.
6. Process execution.
7. Async orchestration.
8. File operation planning.
9. Dry-run and diff behavior.
10. Diagnostics.
11. Graph construction.
12. Provenance and state files.
13. Embedded templates.
14. Policy checks.
15. AI-readable context generation.
16. A full AI memory system.

The project is still pre-implementation. At this stage, Monad should optimize for forward progress, strong Rust ergonomics, modern dependency compatibility, and reduced friction when adopting current Rust ecosystem libraries.

A strict older MSRV policy would create unnecessary constraints before Monad has public consumers, published crates, downstream library users, or enterprise compatibility obligations.

Monad is currently a product/runtime first, not a public Rust library ecosystem with broad semver compatibility commitments.

## 3. Decision

Monad shall target the latest stable Rust toolchain as its Rust version policy during early development.

This means:

1. Monad may use features available in the current stable Rust release.
2. Monad is not required to support older stable Rust versions during the early pre-1.0 phase.
3. Monad’s local development environment should use the stable Rust channel.
4. Monad’s CI should use the stable Rust channel unless a later ADR pins a specific version.
5. Monad may add a `rust-toolchain.toml` file declaring the stable channel.
6. Monad may revisit this policy before a public v1.0 release.
7. Monad may later adopt a fixed MSRV window if the project becomes a published library, a widely consumed CLI, or a compatibility-sensitive tool.

The initial toolchain policy should be represented as:

```toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy"]
```

This belongs in:

```text
rust-toolchain.toml
```

This ADR intentionally defines a moving latest-stable policy rather than a fixed numeric Rust version.

## 4. Rationale

Using latest stable Rust is the correct early policy for Monad because the project should prioritize:

1. Development velocity.
2. Modern Rust ergonomics.
3. Compatibility with current crate ecosystem expectations.
4. Simpler dependency selection.
5. Reduced overhead from supporting older compiler versions.
6. Strong local and CI consistency.
7. Better access to current diagnostics, lints, language improvements, and tooling behavior.
8. Cleaner implementation of a complex developer tool.

Monad’s initial challenge is not supporting old Rust compilers. Monad’s initial challenge is building a correct, useful, trustworthy repo runtime.

A strict older MSRV policy is valuable for mature libraries with downstream consumers. Monad is not there yet.

During early development, latest stable Rust gives Monad the best balance of seriousness and speed.

## 5. Alternatives Considered

### 5.1 Pin a Specific Rust Version Immediately

Monad could pin a specific version such as `1.xx.x` in `rust-toolchain.toml`.

This was rejected for the initial phase.

Advantages:

1. Maximum reproducibility.
2. Exact local/CI match.
3. Avoids unexpected compiler changes.
4. Makes version-related debugging easier.

Disadvantages:

1. Requires active version bump maintenance.
2. Can lag behind dependency requirements.
3. Can create unnecessary friction during early development.
4. Creates a false impression of long-term compatibility commitment.
5. May require updating the pin frequently anyway.

A specific pinned version may become appropriate later, especially near release hardening.

### 5.2 Support an Older Conservative MSRV

Monad could promise compatibility with an older stable Rust version.

This was rejected.

Advantages:

1. Friendlier to users on older environments.
2. Aligns with some library ecosystem norms.
3. Reduces compiler upgrade pressure for contributors.

Disadvantages:

1. Slows early development.
2. Constrains dependency selection.
3. Increases CI matrix complexity.
4. Adds compatibility work before Monad has public compatibility obligations.
5. Creates maintenance burden too early.

This policy may be revisited if Monad becomes widely distributed or if downstream packaging requires it.

### 5.3 Use Rust Nightly

Monad could use nightly Rust to access unstable features.

This was rejected.

Advantages:

1. Access to experimental features.
2. Potentially earlier access to compiler capabilities.
3. Some advanced tooling options.

Disadvantages:

1. Reduced stability.
2. Higher contributor friction.
3. Greater CI unpredictability.
4. Worse fit for a serious developer tool.
5. Unnecessary for Monad’s known requirements.

Monad should use stable Rust unless a later ADR explicitly allows nightly-only tooling for a narrow purpose.

### 5.4 No Toolchain Policy

Monad could avoid specifying a toolchain policy.

This was rejected.

Advantages:

1. Fewer files.
2. Less upfront decision-making.

Disadvantages:

1. Contributors may use inconsistent compiler versions.
2. CI and local behavior may drift.
3. Formatting and linting behavior may differ.
4. Toolchain expectations become implicit.
5. AI assistants and future contributors have less precise context.

A toolchain policy is necessary for a governance-grade repo runtime.

## 6. Consequences

### 6.1 Positive Consequences

Using latest stable Rust gives Monad:

1. Faster implementation progress.
2. Cleaner access to modern stable Rust features.
3. Better compatibility with current dependencies.
4. Less early maintenance burden.
5. Simpler CI configuration.
6. Clear local toolchain expectations.
7. Better alignment with Rust-first developer tooling.
8. More flexibility before v1.0.
9. Fewer artificial constraints on architecture.
10. A straightforward path for future hardening.

### 6.2 Negative Consequences

This decision also creates costs:

1. Monad does not promise compatibility with older Rust versions.
2. Some users on older environments may need to update Rust.
3. Builds may change behavior as stable Rust evolves.
4. Reproducibility is slightly weaker than exact version pinning.
5. Future release hardening may require revisiting this policy.
6. Packagers may eventually request a fixed MSRV.

### 6.3 Neutral Consequences

This decision does not require nightly Rust.

This decision does not prevent future adoption of a fixed MSRV.

This decision does not prevent pinning a specific stable version for release builds later.

This decision does not decide Monad’s release strategy, packaging strategy, CI matrix, crate publishing policy, or distribution channels.

Those decisions should be handled separately.

## 7. Implementation Guidance

### 7.1 Add `rust-toolchain.toml`

The repository should include:

```text
rust-toolchain.toml
```

Initial contents:

```toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy"]
```

This ensures local development uses the stable toolchain and has the required formatting and linting components.

### 7.2 Avoid Nightly-Only Features

Monad should not use nightly-only Rust features in production code.

If a nightly-only tool is considered for development, testing, benchmarking, or documentation, that choice requires explicit review and may require a separate ADR.

### 7.3 Use Stable-Compatible Dependencies

Dependencies should work on stable Rust.

A dependency that requires nightly Rust should not be used unless a later ADR explicitly accepts that trade-off.

### 7.4 CI Should Use Stable Rust

The initial GitHub Actions workflow should use stable Rust.

CI should run at least:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once the repository has a verification script, CI should prefer that script so local and CI verification stay aligned.

### 7.5 Document Toolchain Expectations

The project README or developer setup documentation should eventually state:

1. Install Rust through `rustup`.
2. Use the repository’s `rust-toolchain.toml`.
3. Ensure `rustfmt` and `clippy` are installed.
4. Run the project verification command before committing.

### 7.6 Revisit Before Public Stability

Before Monad reaches public v1.0, the project should revisit whether to keep latest-stable policy or adopt a fixed MSRV.

The decision should consider:

1. User base.
2. Packaging channels.
3. Distribution strategy.
4. Dependency stability.
5. Contributor expectations.
6. Whether Monad exposes public Rust library crates.
7. Whether external crates depend on Monad crates.
8. Release cadence.
9. Security update requirements.
10. Enterprise or downstream packaging needs.

### 7.7 Version Metadata

When Monad adds `monad info` or `monad doctor`, those commands should eventually report:

1. Detected Rust compiler version.
2. Active toolchain channel.
3. Whether `rustfmt` is available.
4. Whether `clippy` is available.
5. Whether the detected toolchain satisfies Monad’s policy.

### 7.8 Lockfile and Reproducibility

This ADR only governs the Rust compiler policy.

Dependency reproducibility should be supported through:

```text
Cargo.lock
```

Because Monad is an application/runtime binary, `Cargo.lock` should be committed.

Lockfile policy may be formalized in a later ADR if needed.

## 8. Verification

This ADR is satisfied when:

1. `rust-toolchain.toml` exists.
2. `rust-toolchain.toml` uses the stable channel.
3. `rust-toolchain.toml` includes `rustfmt`.
4. `rust-toolchain.toml` includes `clippy`.
5. CI uses the stable Rust toolchain.
6. `cargo fmt --check` succeeds.
7. `cargo check --workspace` succeeds.
8. `cargo test --workspace` succeeds.
9. `cargo clippy --workspace --all-targets --all-features -- -D warnings` succeeds once the Rust workspace exists.
10. Documentation identifies latest stable Rust as the current toolchain policy.

Initial verification commands:

```bash
rustup show
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
4. `ADR-0005-introduce-tokio-immediately.md`
5. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

Future ADRs may refine:

1. release toolchain pinning
2. packaging policy
3. CI matrix strategy
4. public crate compatibility policy
5. dependency update policy
6. security update policy

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | Approved. Accepted. |
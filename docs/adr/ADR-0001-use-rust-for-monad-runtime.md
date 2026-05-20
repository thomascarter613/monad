---
title: "ADR-0001: Use Rust for Monad Runtime"
description: "Records the decision to implement Monad primarily in Rust as a fast, local-first, single-binary polyglot repo runtime."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0001"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
tags:
  - monad
  - adr
  - rust
  - runtime
  - cli
  - single-binary
  - local-first
  - polyglot
  - repo-runtime
  - developer-experience
---

# ADR-0001: Use Rust for Monad Runtime

## 1. Status

Approved. Accepted.

This ADR records a decision already established by the Monad project intake and approved product charter: Monad shall be implemented primarily in Rust.

## 2. Context

Monad is a new developer tooling project intended to become a Rust-native polyglot repo runtime and developer-experience CLI.

Monad’s product mandate is to provide a fast, local-first, single-binary repo runtime that coordinates native ecosystem tools through a coherent CLI while also supporting workspace intelligence, safe repo evolution, governance-grade verification, and AI-ready repository context.

Monad is expected to inspect repositories, detect workspaces, load manifests, coordinate native tools, run checks, produce diagnostics, manage safe file operations, generate templates, build graphs, record provenance, and eventually support richer repo evolution and AI-readable context generation.

This creates several technical requirements:

1. Monad must be fast enough for frequent local use.
2. Monad must be reliable enough to modify and verify repositories safely.
3. Monad must be suitable for cross-platform distribution.
4. Monad must support filesystem-heavy workflows.
5. Monad must support process execution and tool coordination.
6. Monad must be maintainable as a serious long-lived CLI product.
7. Monad must be able to ship as a single binary by default.
8. Monad must support strong internal modeling of manifests, adapters, diagnostics, policies, tasks, graphs, and file operations.
9. Monad must remain local-first and not require a hosted service.
10. Monad must be suitable for eventual plugin, adapter, and policy architectures.

Because Monad is itself a developer tool that will coordinate other tools, the implementation language must be appropriate for systems-level CLI work, process orchestration, strong correctness boundaries, cross-platform packaging, and long-term maintainability.

## 3. Decision

Monad shall be implemented primarily in Rust.

The primary executable shall be a CLI binary named:

```text
monad
```

Rust shall be used for Monad’s core runtime, including but not limited to:

1. CLI command routing.
2. Manifest loading and validation.
3. Workspace root detection.
4. Project discovery.
5. Ecosystem adapter interfaces.
6. Toolchain detection.
7. Task planning.
8. Process execution coordination.
9. File operation planning and execution.
10. Dry-run and diff behavior.
11. Diagnostics and reporting.
12. Verification orchestration.
13. Graph construction.
14. Provenance and state recording.
15. Embedded template handling.
16. Policy and architecture-boundary checks.
17. AI-readable context generation.

Other languages may still appear in the repository where appropriate, especially for fixture repositories, generated examples, documentation tooling, integration tests, sample workspaces, and ecosystem-specific test projects.

However, Monad’s product runtime is Rust-first.

## 4. Rationale

Rust is the strongest implementation language for Monad’s core runtime because Monad needs the combination of:

1. High performance.
2. Memory safety.
3. Strong type modeling.
4. Excellent CLI suitability.
5. Cross-platform binary distribution.
6. Predictable local execution.
7. Mature ecosystem support for parsing, serialization, diagnostics, filesystem traversal, and command execution.
8. Long-term maintainability for a serious developer tool.
9. A credible foundation for governance-grade repo modification and verification.

Monad’s desired product shape is not a hosted web service, a JavaScript package-only tool, a Python script collection, or a language-specific framework helper. Monad is intended to be a serious local runtime for repositories.

Rust aligns with that product shape.

## 5. Alternatives Considered

### 5.1 Go

Go was considered because it is popular for CLIs, cross-platform tools, and single-binary distribution.

Go has strengths:

1. Fast compilation.
2. Simple deployment.
3. Good standard library.
4. Good concurrency model.
5. Good CLI ecosystem.
6. Common use in infrastructure tools.

Go was rejected as Monad’s primary implementation language because Rust better fits the desired combination of strong type modeling, correctness discipline, safety, long-term runtime architecture, and high-assurance file operation behavior.

Go would still be a reasonable language for many CLI tools, but Monad’s governance-grade ambitions make Rust the stronger choice.

### 5.2 TypeScript / Node / Bun

TypeScript was considered because Monad will support JavaScript and TypeScript workspaces, and because TypeScript is excellent for developer tooling in web-centric repositories.

TypeScript has strengths:

1. Strong ecosystem familiarity.
2. Excellent JSON and package tooling.
3. Easy integration with JavaScript projects.
4. Rapid iteration.
5. Large developer community.

TypeScript was rejected as Monad’s primary implementation language because Monad should not be dependent on Node, Bun, npm, pnpm, or yarn for its own core runtime.

Monad should coordinate JavaScript and TypeScript tooling without being trapped inside that ecosystem.

A TypeScript implementation would weaken the single-binary, ecosystem-neutral, polyglot-runtime posture.

### 5.3 Python

Python was considered because it is widely used for automation, scripting, AI workflows, and developer tooling.

Python has strengths:

1. Rapid development.
2. Excellent scripting ergonomics.
3. Large ecosystem.
4. Strong AI and data tooling.
5. Good readability.

Python was rejected as Monad’s primary implementation language because Monad requires a serious distributable CLI runtime, strong cross-platform packaging, fast startup, robust typing, and safe repository-modification behavior.

Python may still be supported through adapters and fixtures, but it should not host Monad’s core runtime.

### 5.4 Java / Kotlin

Java and Kotlin were considered because they have strong ecosystems, mature build tools, and good cross-platform support.

They were rejected for the initial runtime because Monad should be a lightweight local CLI with straightforward single-binary distribution. JVM-based distribution would add runtime and packaging complexity that conflicts with the desired product shape.

### 5.5 Shell Scripts

Shell scripts were rejected because Monad requires structured parsing, cross-platform behavior, reliable testing, safe file operations, strong diagnostics, and long-term maintainability.

Shell may be used for small repository helper scripts, but it is not suitable for the core runtime.

### 5.6 Hybrid Runtime

A hybrid runtime was considered, where core logic might be split among Rust, TypeScript, Python, and shell.

This was rejected for the product runtime because Monad should have a coherent, reliable, easily distributable core.

Monad may coordinate many tools, but Monad itself should not begin as a fragmented runtime.

## 6. Consequences

### 6.1 Positive Consequences

Using Rust gives Monad:

1. A strong foundation for a single-binary CLI.
2. High performance for repository scanning and graph construction.
3. Strong type safety for manifests, adapters, tasks, policies, and diagnostics.
4. Memory safety without a garbage collector.
5. Good cross-platform potential.
6. A serious systems-tooling posture.
7. Excellent support for structured errors and diagnostics.
8. Good support for embedded assets and templates.
9. Good support for process execution and filesystem work.
10. Long-term credibility as a developer infrastructure tool.

### 6.2 Negative Consequences

Using Rust also creates costs:

1. Initial implementation may be slower than TypeScript, Go, or Python.
2. Contributor onboarding may be harder for developers unfamiliar with Rust.
3. Compile times may become a concern as the project grows.
4. Some ecosystem integrations may require more adapter code than they would in native ecosystem languages.
5. Some plugin designs may require additional care to avoid forcing all extensions to be Rust-native.
6. The repository must maintain strong Rust tooling discipline from the start.

### 6.3 Neutral Consequences

The Rust decision does not mean Monad must reimplement all native tooling in Rust.

Monad will still coordinate external tools such as Cargo, Bun, Python tooling, Go tooling, TypeScript tooling, formatters, linters, test runners, and build systems where appropriate.

This ADR decides Monad’s primary runtime language. It does not decide the full adapter architecture, plugin architecture, manifest schema, lockfile design, or task execution model.

Those decisions require separate ADRs.

## 7. Implementation Guidance

### 7.1 CLI Binary

The primary binary name shall be:

```text
monad
```

The CLI should eventually support commands such as:

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

The earliest implementation should prioritize:

```bash
monad --help
monad info
monad doctor
monad check
```

### 7.2 Rust Workspace

Monad should use a Rust workspace.

The approved product charter has closed the direction that the initial Rust workspace should use a multi-crate layout. That decision should be formalized separately in `ADR-0003-use-a-multi-crate-rust-workspace.md`.

### 7.3 Minimum Supported Rust Version

The approved product charter has closed the direction that Monad’s minimum supported Rust version policy should track latest stable Rust.

That decision should be formalized separately in `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`.

### 7.4 Async Runtime

The approved product charter has closed the direction that Tokio should be introduced immediately.

That decision should be formalized separately in `ADR-0005-introduce-tokio-immediately.md`.

### 7.5 Initial Candidate Dependencies

Initial Rust dependencies may include, pending dedicated ADRs or implementation validation:

```text
clap
serde
toml
serde_json
thiserror
anyhow
miette
tracing
tokio
camino
walkdir
ignore
globset
assert_cmd
trycmd
insta
tempfile
```

These candidates should not be treated as permanently locked by this ADR except where later ADRs explicitly accept them.

### 7.6 No Node Dependency for Core Runtime

Monad’s core runtime should not require Node, Bun, npm, pnpm, or yarn to run.

Monad may call Bun, npm, pnpm, yarn, TypeScript, or other tools when coordinating JavaScript and TypeScript repositories, but those are ecosystem tools being coordinated, not runtime requirements for Monad itself.

### 7.7 No Python Dependency for Core Runtime

Monad’s core runtime should not require Python to run.

Monad may call Python tooling when coordinating Python repositories, but Python should not be required for Monad’s own execution.

### 7.8 No Shell Dependency for Core Runtime Logic

Monad’s core runtime logic should not depend on shell-specific behavior.

Repository helper scripts may exist, but core command behavior should be implemented in Rust to preserve cross-platform reliability.

### 7.9 External Tool Coordination

Rust should host the coordination layer.

External ecosystem tools should remain external unless a later ADR explicitly decides that a capability should be absorbed into Monad.

This keeps Monad aligned with its native-tool coordination philosophy.

## 8. Verification

This ADR is satisfied when the repository includes:

1. A Rust workspace.
2. A CLI binary target named `monad`.
3. A command that can run `monad --help`.
4. A command that can run at least one initial CLI command, such as `monad info`.
5. Automated tests that verify the CLI binary starts successfully.
6. A local verification command that runs Rust checks.
7. A CI workflow that runs Rust checks.
8. Documentation that identifies Rust as the primary implementation language.

Initial verification commands should eventually include:

```bash
cargo fmt --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace --all-features
```

Once a root verification script exists, the preferred developer-facing command should be:

```bash
./tools/scripts/verify.sh
```

or the project-approved equivalent.

## 9. Related Decisions

This ADR is related to:

1. `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`
2. `ADR-0003-use-a-multi-crate-rust-workspace.md`
3. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
4. `ADR-0005-introduce-tokio-immediately.md`
5. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | Approved. Accepted. |

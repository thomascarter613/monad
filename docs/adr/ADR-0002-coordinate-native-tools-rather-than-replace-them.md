---
title: "ADR-0002: Coordinate Native Tools Rather Than Replace Them"
description: "Records the decision that Monad will coordinate ecosystem-native tools rather than recklessly replacing package managers, build tools, test runners, formatters, linters, and language runtimes."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0002"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0006-use-monad-toml-as-canonical-manifest.md"
  - "docs/adr/ADR-0007-maintain-a-monad-lock-or-state-file.md"
tags:
  - monad
  - adr
  - native-tools
  - tool-coordination
  - ecosystem-adapters
  - polyglot
  - repo-runtime
  - developer-experience
  - rust
  - monorepo
---

# ADR-0002: Coordinate Native Tools Rather Than Replace Them

## 1. Status

Approved. Accepted.

This ADR records a decision already established by the Monad project intake and approved product charter: Monad shall coordinate native ecosystem tools rather than recklessly replacing them.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad is intended to provide one coherent command surface for initializing, understanding, checking, running, evolving, and governing complex repositories.

Modern repositories commonly use many different tools:

1. Language runtimes.
2. Package managers.
3. Build tools.
4. Test runners.
5. Type checkers.
6. Formatters.
7. Linters.
8. Documentation generators.
9. Code generators.
10. Container tools.
11. Infrastructure tools.
12. CI/CD systems.
13. Release systems.
14. AI-assisted development tools.

A serious polyglot repository may include Rust, TypeScript, Python, Go, Java, PHP, Ruby, .NET, Kotlin, Swift, Docker, Terraform/OpenTofu, Kubernetes, Markdown, Mermaid, and many other tools or formats.

Each ecosystem already has mature native tools. Examples include:

1. Cargo for Rust.
2. Bun for JavaScript and TypeScript.
3. Python package and environment tooling.
4. Go tooling.
5. TypeScript tooling.
6. Java build tools.
7. PHP package tooling.
8. Container and infrastructure tools.
9. Documentation and static-site tooling.

Monad’s goal is not to rewrite all of these tools.

Monad’s goal is to make repositories that use these tools coherent, inspectable, reproducible, safer to evolve, and easier to operate.

This requires a clear architectural decision: Monad should sit above native ecosystem tools as a coordination, inspection, verification, execution, and evolution layer.

## 3. Decision

Monad shall coordinate native ecosystem tools rather than replacing them wholesale.

Monad shall treat mature ecosystem tools as the default execution substrate for ecosystem-specific behavior.

For example:

1. Rust builds should use Cargo.
2. Rust tests should use Cargo unless a project explicitly configures otherwise.
3. Bun workspaces should use Bun.
4. TypeScript checks should use TypeScript tooling.
5. Python projects should use the selected Python provider or project toolchain.
6. Go projects should use Go tooling.
7. Formatters and linters should remain ecosystem-native unless Monad has a specific reason to provide additional behavior.
8. Infrastructure workflows should coordinate native tools rather than absorb them by default.

Monad shall add value by:

1. Discovering tools.
2. Detecting versions.
3. Detecting project boundaries.
4. Reading native manifests.
5. Resolving workspace context.
6. Planning cross-project tasks.
7. Sequencing commands.
8. Normalizing command intent.
9. Validating repo structure.
10. Producing diagnostics.
11. Explaining failures.
12. Capturing provenance.
13. Generating safe repo changes.
14. Providing dry-run previews.
15. Building repo and task graphs.
16. Enforcing repo policies.
17. Producing AI-readable context.

Monad may absorb a native-tool capability only when there is a strong product, safety, portability, performance, or governance reason to do so.

Absorbing a major native-tool capability requires a later ADR.

## 4. Rationale

Monad’s value is not in pretending every ecosystem starts from zero.

Monad’s value is in making many existing ecosystem tools work together through one coherent repository runtime.

Replacing every native tool would create several problems:

1. Enormous implementation scope.
2. Slow product delivery.
3. Reduced ecosystem compatibility.
4. Lower trust from experienced developers.
5. Increased maintenance burden.
6. More bugs in functionality already solved elsewhere.
7. Harder adoption in existing repositories.
8. Greater risk of architectural drift.
9. Unnecessary competition with mature tools.
10. Higher barrier to cross-language support.

Coordinating native tools gives Monad a more realistic and more powerful path.

It allows Monad to focus on the layer that is currently weak in many repositories: the repo-level command surface, workspace intelligence, cross-tool consistency, safe evolution, verification, policy, provenance, and AI-readable context.

## 5. Alternatives Considered

### 5.1 Replace Every Tool Internally

Monad could attempt to implement its own package management, build logic, test running, formatting, linting, graphing, release, and project generation capabilities for every supported ecosystem.

This was rejected.

Reasons:

1. It would be too large for the initial product.
2. It would duplicate mature ecosystem tools.
3. It would create poor compatibility with existing projects.
4. It would require constant maintenance across many ecosystems.
5. It would slow delivery of the actual repo-runtime value.
6. It would make Monad less trustworthy to ecosystem experts.
7. It would create a high risk of becoming a worse version of many tools at once.

### 5.2 Become a Heavy Build System

Monad could attempt to become a Bazel/Pants/Buck2-style build system.

This was rejected for the initial product direction.

Reasons:

1. The user explicitly wants to avoid Bazel, Pants, Buck2, and Nx dependencies by default.
2. Heavy build systems impose high conceptual overhead.
3. Heavy build systems often require significant repo restructuring.
4. Heavy build systems frequently require custom build metadata.
5. Monad’s initial value should come from coordination, inspection, verification, and safe evolution rather than hermetic build-system depth.

Monad may learn from serious build systems, but it should not initially become one.

### 5.3 Be Only a Thin Command Wrapper

Monad could become a thin wrapper around package scripts and shell commands.

This was rejected.

Reasons:

1. A thin wrapper would not provide enough value.
2. It would not provide strong workspace intelligence.
3. It would not produce reliable repo graphs.
4. It would not support governance-grade verification.
5. It would not support safe repo evolution.
6. It would not provide a serious AI-readable context foundation.
7. It would be too similar to Make, Just, Task, or package-manager scripts.

Monad must be more than a wrapper.

### 5.4 Be Only a Generator

Monad could focus only on project scaffolding and repo evolution.

This was rejected.

Reasons:

1. Monad is intended to be a runtime-oriented repo command surface.
2. Generators are important but insufficient.
3. A repository needs ongoing inspection, execution, verification, and diagnostics after generation.
4. The approved product charter positions Monad as broader than Foundry-style generation.

### 5.5 Be Only an AI Memory or Context Tool

Monad could focus only on AI-readable repo context and memory.

This was rejected.

Reasons:

1. AI context is important but should be grounded in real repo inspection and verification.
2. Monad must remain useful without AI.
3. The repo runtime should be the foundation; AI context should build on top of reliable workspace intelligence.
4. The approved product charter requires AI-friendly but AI-optional behavior.

## 6. Consequences

### 6.1 Positive Consequences

This decision gives Monad:

1. Realistic implementation scope.
2. Strong compatibility with existing repositories.
3. Better adoption path.
4. Less duplication of mature ecosystem behavior.
5. Faster path to MVP.
6. Better long-term maintainability.
7. Better trust from developers who already rely on native tools.
8. Clearer adapter boundaries.
9. A product identity centered on repo intelligence and coordination.
10. A safer path to polyglot support.

### 6.2 Negative Consequences

This decision also creates costs:

1. Monad must handle external tool availability.
2. Monad must detect missing tools and explain how to fix them.
3. Monad must tolerate version differences across machines.
4. Monad must parse and interpret multiple ecosystem manifest formats.
5. Monad must handle inconsistent command behavior across ecosystems.
6. Monad may inherit limitations of native tools.
7. Some workflows may be slower than fully integrated internal implementations.
8. Cross-platform process execution requires care.
9. Adapter behavior must be tested with realistic fixtures.
10. Users may still need to install ecosystem tools for ecosystem-specific commands.

### 6.3 Neutral Consequences

This decision does not prevent Monad from implementing internal capabilities.

Monad should still implement internal logic for:

1. Manifest schema handling.
2. Workspace context resolution.
3. Adapter capability modeling.
4. Task planning.
5. Command routing.
6. Safe file operation planning.
7. Dry-run previews.
8. Diff summaries.
9. Provenance recording.
10. Graph construction.
11. Policy evaluation.
12. Diagnostics.
13. AI-readable context generation.

The decision only says Monad should not recklessly replace mature ecosystem tools where coordination is the better product and architecture choice.

## 7. Implementation Guidance

### 7.1 Adapter Boundary

Monad should use ecosystem adapters to interact with native tools.

An adapter should generally be responsible for:

1. Detecting whether an ecosystem is present.
2. Detecting relevant manifests.
3. Detecting relevant lockfiles.
4. Detecting tool versions.
5. Identifying projects or packages.
6. Identifying common commands.
7. Describing supported capabilities.
8. Planning commands.
9. Executing or delegating commands.
10. Parsing important output when useful.
11. Reporting diagnostics.
12. Contributing graph information.
13. Contributing AI-readable context.

### 7.2 Adapter Responsibilities

Adapters should answer questions such as:

1. Is this ecosystem present in the repository?
2. Which native tool should be used?
3. Is the native tool installed?
4. Is the installed version acceptable?
5. What projects does this ecosystem define?
6. What tasks are available?
7. What files define the workspace?
8. What commands should Monad run for build, test, lint, format, check, or package?
9. What errors can Monad explain better than the raw tool output?
10. What repo graph edges can be inferred?

### 7.3 Tool Availability

Native tools should not all be required for Monad to start.

The `monad` binary should run even if Cargo, Bun, Python, Go, Java, Docker, or other ecosystem tools are missing.

However, commands that require specific ecosystem tools may fail with clear diagnostics.

For example:

1. `monad info` should be able to report that Bun is not installed.
2. `monad doctor` should report missing or mismatched tools.
3. `monad check` should skip, warn, or fail according to configured policy when required tools are missing.
4. `monad run build --project web` should fail clearly if the required JavaScript toolchain is missing.

### 7.4 Runtime Dependency Policy

Monad’s core runtime should not require Node, Bun, Python, Go, Java, PHP, Ruby, Docker, Terraform, Kubernetes, or other ecosystem tools merely to start.

Those tools are ecosystem dependencies, not Monad core runtime dependencies.

Monad’s core runtime is the Rust binary.

### 7.5 No Default Bazel, Pants, Buck2, or Nx Dependency

Monad must not require Bazel, Pants, Buck2, or Nx by default.

Monad may study these tools and may optionally coordinate with them in future repositories if explicitly configured, but they are not part of Monad’s default runtime model.

### 7.6 Command Intent Normalization

Monad should normalize command intent without hiding native tools.

For example:

```bash
monad check
```

may coordinate native commands such as:

```bash
cargo fmt --check
cargo clippy --workspace --all-targets --all-features -- -D warnings
cargo test --workspace --all-features
bun run typecheck
bun run lint
bun test
```

Monad should explain what it is running.

Monad should not make command execution opaque.

### 7.7 Human-Readable and Machine-Readable Output

Monad should provide human-readable output by default.

Where appropriate, commands should also support structured output.

Examples:

```bash
monad info --json
monad doctor --json
monad graph --format json
monad graph --format mermaid
monad graph --format dot
```

Specific output formats should be governed by later ADRs.

### 7.8 Dry-Run and Preview Behavior

For repo evolution commands, Monad should provide dry-run or preview behavior wherever practical.

Examples:

```bash
monad init --dry-run
monad sync --dry-run
monad add service api --dry-run
monad upgrade --dry-run
```

Dry-run behavior should show intended file changes, command plans, and risks before writing.

Specific dry-run and diff behavior should be governed by a later ADR.

### 7.9 Native Manifest Respect

Monad should respect native manifests.

Examples:

1. `Cargo.toml`
2. `package.json`
3. `bun.lock`
4. `pyproject.toml`
5. `go.mod`
6. Java build files
7. PHP package files
8. Docker files
9. Terraform/OpenTofu files
10. Kubernetes manifests

Monad may read and interpret these files, but it should not duplicate all of their configuration inside `monad.toml`.

### 7.10 `monad.toml` Role

`monad.toml` should express Monad-level repository intent.

It should not become a complete replacement for native ecosystem configuration.

The manifest may describe:

1. workspace identity
2. enabled adapters
3. project metadata
4. task aliases
5. policies
6. generation choices
7. verification behavior
8. graph behavior
9. AI context behavior
10. release behavior

The exact manifest schema requires a later ADR.

### 7.11 Capability-Based Adapter Design

Adapters should declare capabilities.

Example capabilities may include:

1. `detect`
2. `list-projects`
3. `list-tasks`
4. `run-task`
5. `check`
6. `format`
7. `lint`
8. `test`
9. `build`
10. `graph`
11. `generate`
12. `diagnose`
13. `context`

Capability declarations should allow Monad to explain what each adapter can and cannot do.

### 7.12 Explicit Absorption Policy

Monad may implement a capability internally when:

1. native tools do not provide the capability;
2. native tools provide the capability inconsistently;
3. internal implementation is necessary for safety;
4. internal implementation is necessary for cross-platform behavior;
5. internal implementation is necessary for provenance;
6. internal implementation is necessary for policy enforcement;
7. internal implementation is necessary for AI-readable context;
8. internal implementation materially improves the repo-runtime experience.

Major absorption decisions require ADRs.

## 8. Verification

This ADR is satisfied when Monad’s implementation demonstrates that:

1. The core CLI can run without requiring Bun, Python, Go, Java, Docker, or other ecosystem tools.
2. Ecosystem-specific commands check for required native tools before execution.
3. Missing tools produce clear diagnostics.
4. At least one adapter delegates to a native ecosystem tool.
5. `monad info` reports detected tools and missing tools.
6. `monad doctor` reports toolchain health.
7. `monad check` coordinates native commands instead of replacing them wholesale.
8. Tests verify behavior when a native tool is present.
9. Tests verify behavior when a native tool is missing.
10. Documentation explains that native tools are coordinated, not replaced.

Initial verification should include fixture repositories for:

1. Rust / Cargo.
2. JavaScript / TypeScript with Bun.

Future verification should add fixtures for:

1. Python.
2. Go.
3. Java.
4. PHP.
5. Docker / Compose.
6. Terraform / OpenTofu.
7. Kubernetes.
8. Documentation toolchains.

## 9. Related Decisions

This ADR is related to:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0003-use-a-multi-crate-rust-workspace.md`
3. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
4. `ADR-0005-introduce-tokio-immediately.md`
5. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

This ADR should also inform future ADRs about:

1. adapter architecture
2. task execution model
3. plugin architecture
4. policy engine design
5. dry-run and diff behavior
6. provenance model
7. AI context generation
8. release workflow support

## 10. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | Approved. Accepted. |
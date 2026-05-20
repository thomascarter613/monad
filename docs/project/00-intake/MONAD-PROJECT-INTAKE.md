---
title: "Monad Project Intake"
description: "Initial project intake for Monad, a Rust-native polyglot repo runtime and developer-experience CLI."
project_name: "Monad"
project_slug: "monad"
document_type: "project-intake"
document_status: "draft"
version: "0.1.0"
created: "2026-05-20"
last_updated: "2026-05-20"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "pre-implementation"
canonical_path: "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
related_documents:
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/project/02-requirements/SOFTWARE-REQUIREMENTS-SPECIFICATION.md"
  - "docs/architecture/ARCHITECTURE.md"
  - "docs/adr/README.md"
  - "docs/roadmap/ROADMAP.md"
tags:
  - monad
  - rust
  - polyglot
  - monorepo
  - developer-experience
  - cli
  - workspace-runtime
  - repo-runtime
  - governance-grade
---

# Monad Project Intake

## 1. Intake Summary

Monad is a new Rust-native developer tooling project intended to become a single-binary polyglot repo runtime, workspace orchestrator, and developer-experience CLI.

The project exists to solve a recurring problem: modern software projects often require many tools, languages, package managers, task runners, build systems, test runners, formatters, linters, generators, documentation systems, release systems, and CI conventions. Existing high-power monorepo tools are often either too narrow, too complex, too opinionated, too difficult to adopt, or too costly in cognitive overhead.

Monad should provide a better path: a fast, understandable, eject-free, governance-grade runtime that coordinates the native tools already used by each ecosystem while giving the developer a single coherent interface.

Monad is not intended to replace every language ecosystem’s native tooling. It is intended to coordinate, normalize, inspect, verify, and evolve polyglot repositories through a superior developer experience.

## 2. Project Name

### 2.1 Name

**Monad**

### 2.2 Working Meaning

The name “Monad” is suitable because the project aims to compose many independent tools, languages, packages, tasks, repositories, and workflows into a coherent developer experience.

The name suggests composition, sequencing, context propagation, and controlled execution.

### 2.3 Project Slug

```text
monad
````

### 2.4 Repository Name

```text
monad
```

### 2.5 GitHub Repository

```text
https://github.com/thomascarter613/monad.git
```

This should be updated if the final GitHub organization, owner, or repository path differs.

## 3. Project Type

Monad is a:

* Rust CLI application
* single-binary developer tool
* polyglot monorepo runtime
* workspace orchestration layer
* task graph coordinator
* repo intelligence tool
* project evolution tool
* generator/runtime hybrid
* governance-grade verification layer

## 4. Primary Implementation Language

Monad shall be implemented primarily in:

```text
Rust
```

Rust is the correct primary language for this project because Monad should be:

* fast
* reliable
* distributable as a single binary
* suitable for cross-platform developer machines
* suitable for systems-level workspace inspection
* capable of strong error handling
* capable of safe concurrent execution
* capable of long-term maintainability
* appropriate for a serious CLI/runtime product

## 5. Product Thesis

Monad should become the developer’s command center for a polyglot repository.

The central thesis is:

A polyglot repository should not require the developer to manually coordinate dozens of unrelated tools. The repository should expose one coherent runtime interface while still preserving the strengths of each language ecosystem’s native tools.

Monad should make a repository feel intentional, inspectable, reproducible, evolvable, and easier to operate without forcing developers into a heavy build-system universe like Bazel, Pants, or Buck2.

## 6. Core Problem

Modern repositories suffer from recurring coordination problems:

1. Different languages use different package managers.
2. Different ecosystems use different test runners.
3. Different tools expose inconsistent command names.
4. Cross-package task orchestration is fragmented.
5. Monorepo task graphs are hard to understand.
6. Repository structure is often undocumented or unenforced.
7. Generators and scaffolding tools are disconnected from architecture.
8. CI workflows drift from local development workflows.
9. Documentation does not stay aligned with implementation.
10. Developers have to memorize too many commands.
11. Onboarding becomes slow and brittle.
12. Existing monorepo tools are often powerful but difficult to use.
13. Build systems that solve coordination frequently impose too much complexity.
14. AI-assisted development lacks reliable repo-native context and verification boundaries.

Monad exists to address these coordination, consistency, and developer-experience problems.

## 7. Target Users

### 7.1 Primary User

The primary user is a software developer, including but not limited to a software engineer, founder, staff engineer, principal engineer, or technical lead building or maintaining a serious polyglot repository.

This user may be working alone, on a small team, or in an early-stage company where tooling quality matters but the team cannot afford excessive complexity.

### 7.2 Secondary Users

Secondary users include:

* platform engineers
* DevOps engineers
* framework authors
* open-source maintainers
* AI-assisted development practitioners
* teams maintaining multiple apps and services
* developers building portfolio-grade or production-grade monorepos
* teams that want Nx-like convenience without Nx-like friction
* teams that want some Pants/Bazel-style awareness without adopting Pants/Bazel/Buck2

### 7.3 Future Users

Future users may include:

* enterprise platform teams
* internal developer platform teams
* agencies
* consulting teams
* AI coding tool developers
* teams building repo-readiness scanners
* teams building governance-grade software factories

## 8. User Pain Statements

Monad should address these user pains:

1. “I have too many commands to remember.”
2. “Every package has its own scripts and conventions.”
3. “The repo works on one machine but not another.”
4. “I want monorepo power without adopting Bazel.”
5. “I tried Nx and found it difficult or frustrating.”
6. “I want the tool to understand Python, Go, Rust, TypeScript, and eventually more.”
7. “I do not want the tool to replace every ecosystem tool.”
8. “I want it to coordinate native tools correctly.”
9. “I want a single command to check the whole repo.”
10. “I want a clear project graph.”
11. “I want safe repo evolution commands.”
12. “I want generators that respect architecture.”
13. “I want local development and CI to agree.”
14. “I want AI assistants to understand the repo structure.”
15. “I want verification to be built in from the beginning.”

## 9. Vision Statement

Monad is a Rust-native polyglot repo runtime that gives developers one coherent command surface for initializing, understanding, checking, running, evolving, and governing complex repositories.

It should feel like:

* the ergonomics people wanted from Nx
* the language awareness people wanted from Pants or Bazel
* the toolchain friendliness people like in Moon
* the evolution/generator discipline envisioned for Foundry
* the repo-native context discipline envisioned for Charon
* the verification and governance posture expected from high-assurance software projects

Monad should remain simpler to adopt than heavy build systems and more general-purpose than ecosystem-specific CLIs.

## 10. Product Positioning

### 10.1 One-Sentence Description

Monad is a Rust-based single-binary polyglot repo runtime that coordinates native ecosystem tools through one coherent developer-experience CLI.

### 10.2 Short Description

Monad helps developers initialize, inspect, run, check, graph, evolve, and govern polyglot repositories without forcing them to adopt a heavy build system or abandon native ecosystem tooling.

### 10.3 Long Description

Monad is a developer-experience runtime for modern polyglot repositories. It provides a unified CLI and manifest-driven coordination layer over existing language tools such as Bun, Cargo, Python tooling, Go tooling, and future Java/PHP ecosystems. Instead of replacing every tool, Monad understands the repository, resolves workspace context, coordinates commands, manages additive configuration, provides architecture-aware generators, builds dependency and task graphs, and enforces repo-level verification policies.

## 11. What Monad Is

Monad is:

* a Rust CLI
* a single-binary repo runtime
* a workspace intelligence layer
* a polyglot task coordinator
* a toolchain adapter framework
* a repo graph builder
* a repo verification layer
* a generator and evolution engine
* a manifest-driven orchestration tool
* a governance-grade developer-experience system
* an AI-friendly repo context foundation

## 12. What Monad Is Not

Monad is not:

* a replacement for Rust Cargo
* a replacement for Bun
* a replacement for npm, pnpm, or yarn
* a replacement for Python package managers
* a replacement for Go tooling
* a replacement for Java build tools
* a replacement for every test runner
* a replacement for every bundler
* a Bazel clone
* a Pants clone
* a Buck2 clone
* an Nx fork
* a package registry
* a hosted SaaS product in its initial form
* a required AI subscription product
* a tool that requires users to abandon their existing ecosystem conventions

## 13. Core Design Philosophy

Monad should follow these principles:

### 13.1 Coordinate, Do Not Recklessly Replace

Monad should delegate to native tools where those tools are already excellent.

For example:

* Rust builds should use Cargo.
* Bun workspaces should use Bun.
* Go projects should use Go tooling.
* Python projects should use the selected Python tooling provider.
* TypeScript checks should use TypeScript tooling.
* Formatting and linting should use the configured formatter/linter.

Monad should add value by discovering, coordinating, validating, sequencing, normalizing, and explaining these tools.

### 13.2 Single Coherent Interface

Developers should be able to use commands such as:

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

These commands should work across the repository in a predictable way.

### 13.3 Eject-Free by Default

Monad should not trap the user.

Generated files should remain understandable. Native ecosystem files should remain present where useful. The repo should not become unusable without Monad unless the user explicitly opts into Monad-specific behavior.

### 13.4 Additive and Non-Destructive

Monad should prefer additive changes.

When modifying an existing repository, Monad should:

* inspect before writing
* explain intended changes
* avoid destructive overwrites
* preserve user edits
* provide diffs or previews
* record provenance
* support dry runs where practical

### 13.5 Manifest as Intent

Monad should use a canonical repo manifest, likely:

```text
monad.toml
```

The manifest should describe project intent, workspace structure, language adapters, tasks, policies, generators, and repo-level conventions.

The manifest should not become a dumping ground for every underlying tool’s internal configuration.

### 13.6 Native Tools Underneath

Monad should run native tools underneath rather than absorbing every implementation internally.

This keeps Monad realistic, maintainable, and ecosystem-compatible.

### 13.7 Language-Aware, Not Language-Naive

Monad should understand enough about each supported ecosystem to make good decisions.

For example, it should eventually understand:

* package boundaries
* dependency relationships
* workspace membership
* test commands
* build commands
* lockfiles
* language-specific manifests
* common project layouts
* expected generated files
* tool availability
* version mismatches

### 13.8 Governance-Grade Verification

Monad should treat verification as a first-class product feature.

It should support:

* repository contract checks
* architecture boundary checks
* workspace integrity checks
* task graph validation
* documentation presence checks
* policy checks
* generated file provenance
* CI/local parity checks

### 13.9 AI-Friendly but AI-Optional

Monad should be designed for AI-assisted development but should not require AI.

The CLI should work without an LLM provider. However, the repository structure, manifest, docs, state files, and command outputs should be suitable for AI agents and assistants to consume.

## 14. Initial Product Scope

The initial scope should be intentionally narrow enough to build but strong enough to prove the thesis.

### 14.1 Phase 0 Scope

Phase 0 should establish:

1. Rust project scaffold
2. initial CLI binary
3. repository documentation foundation
4. `monad.toml` manifest draft
5. workspace context resolver
6. file operation engine
7. embedded template engine
8. first ecosystem adapter interface
9. initial Node/Bun adapter
10. initial Rust/Cargo adapter
11. `monad info`
12. `monad doctor`
13. `monad check` skeleton
14. basic verification script
15. basic CI workflow

### 14.2 Phase 1 Scope

Phase 1 should establish:

1. `monad init`
2. `monad sync`
3. `monad run`
4. task discovery
5. workspace graph foundation
6. package/app/service detection
7. additive file generation
8. dry-run support
9. provenance logging
10. repo contract validation
11. basic embedded templates

### 14.3 Phase 2 Scope

Phase 2 should add:

1. `monad add`
2. project generators
3. Python adapter
4. Go adapter
5. richer task graph
6. dependency graph output
7. policy checks
8. documentation generation
9. architecture boundary checks
10. CI integration helpers

### 14.4 Later Scope

Later phases may include:

1. Java adapter
2. PHP adapter
3. release orchestration
4. versioning support
5. package publishing workflows
6. AI context pack generation
7. repo-readiness scanning
8. plugin system
9. marketplace-ready provider architecture
10. local web UI or TUI
11. remote cache integration
12. advanced task scheduling
13. enterprise policy packs

## 15. Initial Non-Goals

Monad should not initially attempt to:

1. replace Cargo
2. replace Bun
3. replace TypeScript
4. replace every package manager
5. implement a full build system
6. implement a remote execution system
7. implement remote caching in v0
8. become a SaaS product immediately
9. support every language immediately
10. support every monorepo topology immediately
11. generate every possible app framework
12. compete directly with Bazel on hermetic builds at v0
13. compete directly with Nx on mature plugin ecosystem at v0
14. solve distributed CI at v0
15. implement a full AI agent runtime at v0

## 16. Strategic Differentiators

Monad should differentiate through:

1. Rust single-binary distribution
2. polyglot-first design
3. native-tool coordination
4. better developer experience than existing heavy monorepo tools
5. clear manifest-driven intent
6. additive repo evolution
7. governance-grade verification
8. AI-ready repo context
9. strong docs/spec-driven workflow
10. architecture-aware generators
11. local-first usability
12. no forced SaaS dependency
13. no forced LLM subscription
14. no Bazel/Pants/Buck2 requirement
15. no Nx dependency

## 17. Comparative Positioning

### 17.1 Compared to Nx

Monad should provide some Nx-like benefits:

* project graph
* task orchestration
* generators
* affected-style workflows eventually
* developer convenience

But Monad should avoid:

* excessive complexity
* poor fit for non-JS ecosystems
* confusing plugin behavior
* opaque configuration
* difficult adoption path

### 17.2 Compared to Bazel

Monad may learn from Bazel’s rigor but should not initially attempt to become Bazel.

Monad should avoid:

* high adoption friction
* large conceptual overhead
* mandatory build file rewrites
* excessive hermeticity requirements in early versions

### 17.3 Compared to Pants

Monad may learn from Pants’s language awareness but should remain simpler and more transparent.

### 17.4 Compared to Buck2

Monad may learn from Buck2’s performance ambitions but should not begin as a massive build system.

### 17.5 Compared to Moon

Monad should learn from Moon’s toolchain ergonomics and workspace approach while pursuing a broader repo-runtime vision.

### 17.6 Compared to Foundry

Monad includes what Foundry was intended to become, a monorepo generator and repo evolution CLI, but expands upon that concept.

Monad will absorb the best Foundry ideas, especially, but not limited to:

* generators
* repo evolution
* provenance
* docs/spec-first workflows
* verification discipline

Monad should be a combination of runtime-oriented and workspace-execution-oriented with monorepo generator and repo evolution features.

### 17.7 Compared to Charon

Charon is a context bridge / repo-native memory system for AI assistants.

Monad will include Charon-like context generation.

## 18. Core Commands

The following commands are currently envisioned:

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

### 18.1 `monad init`

Initializes a Monad-aware repository or adds Monad to an existing repository.

### 18.2 `monad add`

Adds a project, package, app, service, tool, provider, or capability.

### 18.3 `monad run`

Runs tasks across the workspace.

### 18.4 `monad check`

Runs repo-level verification.

### 18.5 `monad sync`

Synchronizes manifest intent with repo files in an additive, non-destructive way.

### 18.6 `monad doctor`

Diagnoses workspace problems, missing tools, version mismatches, invalid manifests, and environment issues.

### 18.7 `monad graph`

Builds and displays the workspace graph.

### 18.8 `monad release`

Coordinates release and versioning workflows.

### 18.9 `monad upgrade`

Safely evolves an existing Monad repository.

### 18.10 `monad info`

Displays repository, workspace, adapter, manifest, and environment information.

## 19. Initial Architecture Hypothesis

Monad should be composed of the following internal subsystems:

1. CLI entrypoint
2. command router
3. manifest engine
4. workspace context resolver
5. ecosystem adapter registry
6. tool coordinator
7. task planner
8. execution engine
9. file operation engine
10. embedded template registry
11. graph engine
12. verification engine
13. policy engine
14. diagnostics engine
15. provenance/audit logger
16. reporting/output layer

This is an initial hypothesis and should be refined through architecture documentation and ADRs.

## 20. Initial Crate Hypothesis

The Rust codebase may begin with a simple crate structure and split only when justified.

A possible future structure:

```text
crates/
  monad-cli/
  monad-core/
  monad-manifest/
  monad-workspace/
  monad-adapters/
  monad-exec/
  monad-templates/
  monad-policy/
  monad-graph/
  monad-diagnostics/
```

However, the initial implementation should avoid premature over-splitting.

A reasonable starting point may be:

```text
crates/
  monad-cli/
  monad-core/
```

Or even one crate until boundaries become clearer.

This decision should be captured in an ADR before implementation hardens.

## 21. Initial Technology Assumptions

### 21.1 Language

```text
Rust
```

### 21.2 CLI Framework

Likely candidate:

```text
clap
```

### 21.3 Serialization

Likely candidates:

```text
serde
toml
serde_json
```

### 21.4 Diagnostics and Errors

Likely candidates:

```text
anyhow
thiserror
miette
tracing
```

### 21.5 File Operations

Likely candidates:

```text
walkdir
ignore
globset
camino
fs_extra
similar
```

### 21.6 Process Execution

Likely candidates:

```text
std::process
duct
xshell
tokio::process
```

The final choice should be made through implementation experiments and ADRs.

### 21.7 Async Runtime

Use tokio as an async runtime when justified.

```text
tokio
```

### 21.8 Configuration Format

```text
monad.toml
```

### 21.9 Template Strategy

Initial candidate:

```text
embedded templates using Rust include_dir or equivalent
```

Templates should work offline.

### 21.10 Test Strategy

Initial candidates:

```text
cargo test
insta snapshot tests
trycmd or assert_cmd for CLI tests
tempfile for fixture workspaces
```

## 22. Ecosystem Adapter Strategy

Monad should use adapters for language ecosystems.

Initial adapters should include:

1. Rust / Cargo
2. JavaScript / TypeScript with Bun first
3. Python
4. Go
5. Java
6. PHP
7. Ruby
8. .NET
9. Kotlin
10. Swift
11. Docker/Compose
12. Terraform/OpenTofu
13. Kubernetes
14. documentation toolchains

## 23. JavaScript and TypeScript Position

Monad should prefer Bun for new JavaScript/TypeScript workspaces, while allowing other package managers where needed.

Initial preference:

```text
Bun
```

Acceptable compatibility:

```text
pnpm
npm
yarn
```

Monad should not become dependent on Node-based internals for its own core runtime.

## 24. Build System Position

Monad should not require:

```text
Bazel
Pants
Buck2
Nx
```

These tools may be studied for ideas but should not be required.

The project’s posture is:

Learn from serious monorepo tools, but do not force their adoption.

## 25. Repo Manifest Hypothesis

The initial manifest may be named:

```text
monad.toml
```

It may eventually describe:

```toml
[workspace]
name = "monad"
kind = "polyglot-runtime"
version = "0.1.0"

[tools]
rust = true
bun = true
python = false
go = false

[policy]
non_destructive_sync = true
require_dry_run_for_existing_repos = true
record_provenance = true

[commands]
check = ["rust:test", "rust:fmt", "rust:clippy"]
```

This is illustrative only. The manifest schema must be designed carefully and versioned.

## 26. Repo Values

Monad should optimize for:

1. clarity
2. correctness
3. speed
4. reproducibility
5. inspectability
6. safety
7. local-first operation
8. low-friction adoption
9. predictable command behavior
10. architecture discipline
11. long-term maintainability
12. AI-readability
13. high-quality documentation

## 27. Nonfunctional Requirements

### 27.1 Performance

Monad should feel fast.

Common operations such as `monad info`, `monad doctor`, and basic workspace detection should complete quickly on small and medium repositories.

### 27.2 Reliability

Monad should fail safely and clearly.

Errors should explain:

* what failed
* why it failed
* where it failed
* how to fix it
* whether any files were changed

### 27.3 Cross-Platform Support

Monad should aim to support:

* Linux
* macOS
* Windows

Initial development may prioritize Linux, but architectural decisions should not unnecessarily block cross-platform support.

### 27.4 Offline Support

Monad should work offline for core commands and embedded templates.

Network access should not be required for normal local operations unless the command explicitly requires it.

### 27.5 Reproducibility

Monad should produce predictable outputs from the same manifest, templates, and inputs.

### 27.6 Safety

Monad should avoid destructive operations by default.

Potentially destructive actions should require explicit confirmation, flags, or dry-run preview depending on the command.

### 27.7 Observability

Monad should provide useful logs and diagnostics.

Output should support both human-readable and machine-readable modes where appropriate.

### 27.8 Testability

Monad should be built with fixture-based tests, command tests, integration tests, and snapshot tests where useful.

### 27.9 Documentation Quality

Monad should treat documentation as part of the product.

### 27.10 AI Compatibility

Monad should generate outputs, manifests, docs, and state files that are easy for AI assistants to parse and use safely.

## 28. Governance-Grade Requirements

Monad should include governance-grade discipline from the start.

This means:

1. ADRs for major technical decisions
2. versioned manifest schema
3. documented command behavior
4. documented repo invariants
5. explicit safety rules
6. clear testing strategy
7. traceable implementation slices
8. reproducible verification commands
9. atomic Conventional Commits
10. generated artifact provenance
11. changelog discipline
12. release discipline

## 29. Initial Documentation Set

The project should begin with a small but strong documentation foundation.

Recommended initial docs:

```text
docs/project/00-intake/MONAD-PROJECT-INTAKE.md
docs/project/01-charter/PRODUCT-CHARTER.md
docs/project/02-requirements/SOFTWARE-REQUIREMENTS-SPECIFICATION.md
docs/architecture/ARCHITECTURE.md
docs/adr/README.md
docs/adr/ADR-0001-use-rust-for-monad-runtime.md
docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md
docs/roadmap/ROADMAP.md
docs/ai/BOOTSTRAP_PROMPT.md
docs/ai/CURRENT_STATE.md
```

This intake document is the first canonical artifact.

## 30. First Implementation Slice

The first implementation slice should not attempt to build the whole product.

The first slice should establish:

1. Rust workspace scaffold
2. CLI binary named `monad`
3. `monad --help`
4. `monad info`
5. basic workspace root detection
6. basic `monad.toml` detection
7. basic diagnostics output
8. tests proving the CLI starts
9. verification command
10. first passing CI workflow

## 31. First Commit Recommendation

The first commit should contain this intake document only.

Recommended command:

```bash
git add docs/project/00-intake/MONAD-PROJECT-INTAKE.md
git commit -m "docs(project): add Monad project intake"
```

## 32. Suggested Commit Sequence After Intake

After this document, a disciplined early sequence would be:

1. `docs(project): add Monad project intake`
2. `docs(project): add product charter`
3. `docs(adr): record Rust runtime decision`
4. `docs(adr): record native tool coordination decision`
5. `chore(repo): add Rust workspace scaffold`
6. `feat(cli): add Monad CLI entrypoint`
7. `feat(cli): add info command`
8. `feat(workspace): detect workspace root`
9. `feat(manifest): load initial monad manifest`
10. `test(cli): add command smoke tests`
11. `ci: add initial verification workflow`

## 33. Early Risks

### 33.1 Scope Creep

Monad could become too ambitious too quickly.

Mitigation:

* define strict implementation slices
* require roadmap discipline
* avoid supporting every language immediately
* defer advanced features until core commands work

### 33.2 Reimplementing Too Much

Monad could accidentally attempt to replace mature ecosystem tools.

Mitigation:

* use native-tool coordination as a core architectural principle
* document adapter boundaries
* require ADRs before absorbing functionality

### 33.3 Configuration Complexity

The manifest could become too complicated.

Mitigation:

* version the schema
* keep initial manifest minimal
* separate intent from tool-specific config
* avoid duplicating native config unnecessarily

### 33.4 Poor Developer Experience

Monad could become powerful but hard to understand.

Mitigation:

* prioritize clear command output
* design excellent errors
* write docs as product
* test commands with real fixture repositories

### 33.5 Cross-Platform Surprises

Process execution and filesystem behavior can differ by OS.

Mitigation:

* use cross-platform Rust libraries
* avoid shell-specific assumptions in core logic
* add platform CI over time

### 33.6 Tool Version Drift

Different machines may have different Bun, Rust, Python, or Go versions.

Mitigation:

* implement `monad doctor`
* detect versions
* explain mismatches
* support toolchain declarations

### 33.7 AI Overreach

AI-related features could distract from the core runtime.

Mitigation:

* keep AI support optional
* focus first on repo-readable state and context files
* do not require LLM access for core functionality

## 34. Early Open Questions

The following questions should be resolved through docs, ADRs, or implementation spikes:

1. Should the initial Rust workspace use one crate or multiple crates?
2. What is the exact first version of the `monad.toml` schema?
3. Should command execution be sync first or async first?
4. Should Monad use `clap` derive or builder style?
5. What is the initial output format contract?
6. Should `monad graph` initially output text, JSON, Mermaid, DOT, or all later?
7. What should be the minimum supported Rust version?
8. What should be the release/distribution strategy?
9. Should templates be compiled into the binary from day one?
10. How much repo policy should be included in v0?
11. How should adapter capability detection work?
12. Should Bun support be first-class before pnpm/npm compatibility?
13. Should Monad use its own lock/state file?
14. How should generated-file provenance be recorded?
15. How should dry-run diffs be represented?

## 35. Assumptions

This intake assumes:

1. The project name is Monad.
2. The repository name is `monad`.
3. The implementation language is Rust.
4. The CLI binary should be named `monad`.
5. The project should be single-binary-first.
6. The tool should coordinate native tools rather than replace them wholesale.
7. The user prefers not to use Bazel.
8. The user has had poor experiences with Bazel, Pants, and Buck2.
9. The user finds Nx difficult and wants a better developer experience.
10. The user prefers Bun over pnpm for JavaScript/TypeScript workspaces.
11. The project should be AI-friendly but not AI-required.
12. The project should include governance-grade documentation and verification.
13. The project should be built through atomic commits.
14. The project should avoid premature overengineering while preserving architectural seriousness.

## 36. Constraints

Monad should observe these constraints:

1. No Bazel dependency by default.
2. No Pants dependency by default.
3. No Buck2 dependency by default.
4. No Nx dependency by default.
5. Rust is the primary implementation language.
6. Bun should be treated as the preferred JS/TS package manager for greenfield workspaces.
7. Native tools should remain accessible and understandable.
8. Core functionality should work without a paid AI/LLM subscription.
9. Core functionality should work without a hosted SaaS dependency.
10. Destructive file operations should be avoided by default.
11. Major decisions should be documented in ADRs.
12. The project should remain suitable for portfolio-grade and production-grade use.

## 37. Definition of Done for Intake

This intake is complete when:

1. The document exists at `docs/project/00-intake/MONAD-PROJECT-INTAKE.md`.
2. The document identifies Monad as Rust-first.
3. The document states the product thesis.
4. The document defines what Monad is and is not.
5. The document captures core assumptions.
6. The document captures early scope and non-goals.
7. The document identifies risks and open questions.
8. The document recommends the first implementation slice.
9. The document is committed as the first project artifact.

## 38. Immediate Next Step

After committing this intake, the next document should be:

```text
docs/project/01-charter/PRODUCT-CHARTER.md
```

The product charter should convert this intake into a clearer product mandate, including:

* product vision
* mission
* target users
* strategic positioning
* success criteria
* MVP definition
* product principles
* first roadmap boundary

## 39. Principal Engineer Recommendation

The correct first move is to commit this intake before writing code.

This gives the project a canonical starting point and prevents immediate architectural drift.

The first implementation should come only after at least these decisions are captured:

1. Rust is the primary implementation language.
2. Monad coordinates native tools rather than replacing them.
3. `monad.toml` is the likely manifest source of truth.
4. The initial CLI should be small.
5. The first implementation slice should prove command startup, workspace detection, manifest detection, and diagnostics.

## 40. Current Intake Status

Status:

```text
Ready for initial commit.
```
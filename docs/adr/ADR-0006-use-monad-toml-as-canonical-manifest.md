---
title: "ADR-0006: Use monad.toml as Canonical Manifest"
description: "Records the decision to use monad.toml as Monad's canonical repository-level manifest for workspace intent, adapter configuration, task coordination, policy, and repo evolution."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0006"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0006-use-monad-toml-as-canonical-manifest.md"
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
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
  - "docs/adr/ADR-0007-maintain-a-monad-lock-or-state-file.md"
tags:
  - monad
  - adr
  - manifest
  - monad-toml
  - toml
  - workspace-intent
  - repo-runtime
  - native-tool-coordination
  - policy
  - repo-evolution
  - ai-ready
---

# ADR-0006: Use monad.toml as Canonical Manifest

## 1. Status

approved, accepted.

This ADR records a decision already established by the approved Monad product charter: Monad shall use `monad.toml` as the canonical repository-level manifest.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad is intended to provide one coherent command surface for initializing, understanding, checking, running, evolving, and governing complex repositories.

Monad must be able to understand repository-level intent that is not fully represented by any one native ecosystem file.

Native ecosystem files such as `Cargo.toml`, `package.json`, `pyproject.toml`, `go.mod`, Docker files, Terraform/OpenTofu files, Kubernetes manifests, CI workflow files, and documentation configuration files all describe part of a repository.

However, none of them should become Monad’s canonical source of repo-level intent.

Monad needs a dedicated manifest that can describe:

1. Repository identity.
2. Workspace type.
3. Enabled capabilities.
4. Enabled ecosystem adapters.
5. Project discovery rules.
6. Task aliases and command intent.
7. Verification policy.
8. File generation policy.
9. Repo evolution policy.
10. Documentation scaffolding policy.
11. Architecture-boundary policy.
12. AI-readable context behavior.
13. AI memory system configuration.
14. Graph behavior.
15. Release workflow behavior.
16. Lock or state file relationship.
17. Compatibility and schema version.

The manifest must be human-readable, easy to edit, easy to parse in Rust, friendly to source control, and suitable for a local-first CLI.

## 3. Decision

Monad shall use a repository-root manifest named:

```text
monad.toml
```

`monad.toml` shall be the canonical manifest for Monad-level repository intent.

Monad shall use TOML as the manifest format.

The manifest shall describe Monad-level intent and configuration. It shall not duplicate every detail of native ecosystem configuration.

`monad.toml` should eventually describe:

1. Workspace identity.
2. Manifest schema version.
3. Enabled adapters.
4. Workspace layout.
5. Project discovery rules.
6. Task aliases.
7. Verification behavior.
8. Policy settings.
9. Repo evolution behavior.
10. Generator configuration.
11. Provenance behavior.
12. Graph output preferences.
13. AI context generation.
14. AI memory system settings.
15. Release workflow configuration.
16. Lock or state file policy.

The exact `monad.toml` schema is not fully defined by this ADR.

This ADR decides the manifest name, role, format, and authority. A later schema document or ADR should define the first versioned schema in detail.

## 4. Rationale

Monad needs its own manifest because it is not limited to any single language ecosystem.

A polyglot repo runtime cannot rely exclusively on `Cargo.toml`, `package.json`, `pyproject.toml`, `go.mod`, or any other ecosystem-specific manifest.

Monad must coordinate across ecosystems.

The manifest must answer questions that native manifests do not answer consistently:

1. Which repo-level capabilities are enabled?
2. Which adapters should Monad use?
3. Which projects belong to the workspace?
4. Which commands represent repo-level intent?
5. Which checks define a healthy repository?
6. Which files may Monad generate or update?
7. Which policies constrain repo evolution?
8. Which graph formats should be emitted?
9. Which AI-readable context files should be generated?
10. Which state or lock files should Monad maintain?

TOML is the correct initial format because it is readable, familiar to Rust developers, widely used in Rust tooling, comments well, and maps cleanly to structured configuration.

The name `monad.toml` is explicit, discoverable, and consistent with common tool-specific manifest conventions.

## 5. Alternatives Considered

### 5.1 Use `Cargo.toml`

Monad could store its own configuration inside the root `Cargo.toml`.

This was rejected.

Advantages:

1. Natural for Rust projects.
2. Already present in Monad’s own repository.
3. Easy to parse with Rust tooling.
4. Familiar to Rust developers.

Disadvantages:

1. Monad is a polyglot repo runtime, not only a Rust tool.
2. Many target repositories may not have a root `Cargo.toml`.
3. Overloading `Cargo.toml` would make Monad feel Rust-only.
4. It would mix Monad-level repo intent with Cargo-specific configuration.
5. It would not be appropriate for non-Rust repositories.

### 5.2 Use `package.json`

Monad could store its own configuration in `package.json`.

This was rejected.

Advantages:

1. Familiar to JavaScript and TypeScript developers.
2. Common place for tool configuration.
3. Already present in many web-focused repositories.

Disadvantages:

1. Monad is not a JavaScript-only tool.
2. Monad’s core runtime should not be Node-dependent.
3. `package.json` is less ideal for comments and human-authored policy.
4. It would make Monad appear JS-centric.
5. It would not be appropriate for many Rust, Go, Python, Java, or infrastructure-heavy repositories.

### 5.3 Use YAML

Monad could use `monad.yaml` or `monad.yml`.

This was rejected for the initial manifest.

Advantages:

1. Familiar for CI, Kubernetes, and infrastructure configuration.
2. Supports hierarchical configuration.
3. Common in DevOps workflows.

Disadvantages:

1. YAML has more parsing ambiguity.
2. YAML has more footguns around types and indentation.
3. YAML can become difficult to maintain in large configurations.
4. Rust ecosystem support and convention favor TOML for this kind of tool manifest.
5. TOML is better aligned with the Rust-first nature of Monad’s runtime.

YAML may still be supported later for generated reports, interop, or user-facing exports where useful.

### 5.4 Use JSON

Monad could use `monad.json`.

This was rejected.

Advantages:

1. Simple machine parsing.
2. Familiar across ecosystems.
3. Good for generated files.
4. Useful for structured output.

Disadvantages:

1. Poor human authoring experience.
2. No comments in standard JSON.
3. Less pleasant for long-lived configuration.
4. More verbose for repo policy and intent.
5. Not ideal as a primary hand-edited manifest.

JSON should be supported for machine-readable command output, not as the primary manifest format.

### 5.5 Use a Hidden Directory Manifest

Monad could store canonical config in a hidden path such as:

```text
.monad/config.toml
```

This was rejected for the primary manifest.

Advantages:

1. Keeps root directory cleaner.
2. Allows multiple Monad-specific files under one directory.
3. Similar to many tool state directories.

Disadvantages:

1. Less discoverable.
2. More likely to feel like hidden tool state.
3. Worse for a canonical manifest.
4. Less clear to humans and AI assistants scanning the repo.
5. Confuses manifest intent with implementation state.

A hidden `.monad/` directory may still be used for state, cache, generated metadata, or provenance if approved by later ADRs.

### 5.6 Infer Everything Without a Manifest

Monad could attempt to infer all configuration from the repository without a canonical manifest.

This was rejected.

Advantages:

1. Zero initial config.
2. Good for first-run discovery.
3. Lower barrier for inspection commands.

Disadvantages:

1. Inference alone cannot represent explicit intent.
2. Inference can be wrong or ambiguous.
3. Policy needs explicit configuration.
4. Generators need explicit choices.
5. AI context behavior needs explicit settings.
6. Repo evolution needs stable rules.
7. CI/local parity cannot depend only on guesses.
8. Users need a reviewable source of truth.

Monad should support inspection and inference, but canonical intent must be explicit.

## 6. Consequences

### 6.1 Positive Consequences

Using `monad.toml` gives Monad:

1. A clear source of repo-level intent.
2. A human-readable configuration file.
3. A stable manifest name.
4. A Rust-friendly format.
5. A place to define adapter behavior.
6. A place to define repo-level commands and checks.
7. A place to define policy settings.
8. A place to define generator behavior.
9. A place to define AI context behavior.
10. A place to connect to a lock or state file.
11. A better foundation for reproducibility.
12. A better foundation for documentation and onboarding.
13. A better foundation for AI assistants.

### 6.2 Negative Consequences

This decision also creates costs:

1. Monad must design and maintain a schema.
2. Monad must validate the manifest carefully.
3. Users must learn another configuration file.
4. Schema migration may eventually be needed.
5. The manifest could become too complex if not governed.
6. The manifest could duplicate native tool config if boundaries are not enforced.
7. Changes to the manifest may require lock or state file updates.
8. Invalid manifest files must produce excellent diagnostics.

### 6.3 Neutral Consequences

This decision does not define the full schema.

This decision does not define the lock or state file format.

This decision does not decide whether Monad will use `.monad/` for generated state.

This decision does not prevent Monad from reading native ecosystem manifests.

This decision does not prevent Monad from generating JSON, YAML, Markdown, Mermaid, DOT, SARIF, JUnit, or other output formats.

Those decisions should be handled separately.

## 7. Manifest Authority

`monad.toml` shall represent explicit Monad-level intent.

Native ecosystem manifests shall remain authoritative for their ecosystems.

For example:

1. `Cargo.toml` remains authoritative for Cargo package and workspace behavior.
2. `package.json` remains authoritative for JavaScript package scripts and dependencies.
3. `pyproject.toml` remains authoritative for Python project metadata where applicable.
4. `go.mod` remains authoritative for Go module behavior.
5. Docker files remain authoritative for container build behavior.
6. Terraform/OpenTofu files remain authoritative for infrastructure definitions.
7. CI workflow files remain authoritative for CI execution configuration.

`monad.toml` coordinates across these files. It does not replace them.

## 8. Initial Manifest Shape

The first manifest schema should be minimal.

An illustrative early `monad.toml` may look like:

```toml
schema_version = "0.1"

[workspace]
name = "monad"
kind = "polyglot-repo-runtime"
root = "."

[adapters]
rust = true
bun = true
python = false
go = false

[policy]
non_destructive_sync = true
record_provenance = true
require_dry_run_for_existing_repos = true

[commands]
check = ["rust:fmt", "rust:clippy", "rust:test"]
```

This is illustrative only.

The accepted schema should be defined in a later schema document or implementation slice.

The first implemented schema should be deliberately smaller than the long-term manifest vision.

## 9. Schema Versioning

`monad.toml` shall include an explicit schema version.

The initial key should be:

```toml
schema_version = "0.1"
```

Schema versioning is required because Monad will evolve.

Future manifest versions may add, change, deprecate, or remove keys.

Monad should validate schema versions and produce clear diagnostics when the manifest is missing, invalid, unsupported, or ambiguous.

## 10. Manifest Loading Rules

Monad should initially look for `monad.toml` at the repository root.

The repository root may be determined by:

1. Current working directory.
2. Git root detection.
3. Upward search for `monad.toml`.
4. Explicit command-line override, eventually.
5. Workspace context rules, eventually.

The exact root detection policy should be implemented carefully and may be refined by later ADRs.

Initial behavior should prefer simple and predictable rules.

## 11. Manifest Validation Rules

Monad should validate `monad.toml` before relying on it.

Validation should eventually cover:

1. File existence.
2. TOML syntax.
3. Required keys.
4. Schema version.
5. Unknown keys policy.
6. Type correctness.
7. Adapter names.
8. Command aliases.
9. Policy values.
10. Project references.
11. Path references.
12. Conflicting settings.
13. Deprecated keys.
14. Migration hints.

Diagnostics should explain:

1. What is wrong.
2. Where it is wrong.
3. Why it matters.
4. How to fix it.

## 12. Unknown Key Policy

The initial unknown key policy should be conservative.

Monad should avoid silently ignoring likely mistakes in `monad.toml`.

Recommended initial behavior:

1. Unknown top-level sections should produce warnings or errors.
2. Unknown required-domain keys should produce diagnostics.
3. Experimental sections may be allowed only under an explicit experimental namespace.
4. Future compatibility behavior should be documented.

The exact unknown key policy may be finalized with the first schema implementation.

## 13. Relationship to Lock or State File

`monad.toml` shall represent user-authored or user-reviewed intent.

A lock or state file shall represent resolved, generated, or observed state if such a file is introduced.

The approved product charter already closes the decision that Monad should maintain a lock or state file. That decision should be recorded separately in:

```text
docs/adr/ADR-0007-maintain-a-monad-lock-or-state-file.md
```

The distinction should be:

```text
monad.toml        -> intent
Monad state/lock  -> resolved or observed state
```

The exact state or lock file path and format are not defined by this ADR.

## 14. Relationship to AI Context and Memory

`monad.toml` should eventually configure AI-readable context generation and AI memory behavior.

Examples may include:

```toml
[ai.context]
enabled = true
output_dir = "docs/ai"
include_graph = true
include_commands = true
include_adrs = true

[ai.memory]
enabled = true
mode = "repo-native"
```

This is illustrative only.

AI configuration should remain optional from a runtime dependency perspective.

Monad should not require an LLM provider merely to parse or use `monad.toml`.

## 15. Relationship to Repo Evolution

`monad.toml` should eventually guide repo evolution commands such as:

```bash
monad init
monad sync
monad add
monad upgrade
```

For repo evolution, the manifest may define:

1. Enabled generator families.
2. Default package manager.
3. Preferred project layout.
4. Documentation policy.
5. Verification policy.
6. Provenance policy.
7. Safe-write behavior.
8. Dry-run behavior.
9. Architecture boundary rules.
10. CI/local parity expectations.

Repo evolution commands should never treat the manifest as permission to behave destructively without explicit safeguards.

## 16. Relationship to Native Tool Coordination

`monad.toml` should configure native-tool coordination at the Monad level.

It may define that a repository uses Bun as the preferred JS/TS provider, but it should not duplicate all `package.json` details.

It may define that Rust checks are part of `monad check`, but it should not duplicate all Cargo package metadata.

It may define adapter enablement, task aliases, and policy, but native files remain authoritative for native tool internals.

This preserves the decision from `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`.

## 17. Implementation Guidance

### 17.1 File Name

The manifest file name must be:

```text
monad.toml
```

### 17.2 Location

The initial expected location is the repository root:

```text
./monad.toml
```

### 17.3 Parsing

Manifest parsing should be implemented in Rust using `serde` and a TOML parser.

Candidate crates:

```text
serde
toml
```

The final dependency choices may be confirmed during implementation.

### 17.4 Domain Model

Manifest parsing should map into strongly typed Rust structs.

The implementation should distinguish:

1. Raw parsed manifest.
2. Validated manifest.
3. Effective configuration.
4. Diagnostics.

This prevents invalid configuration from being treated as valid runtime state.

### 17.5 Error Handling

Manifest errors should be high-quality.

Examples:

1. Manifest not found.
2. Invalid TOML.
3. Unsupported schema version.
4. Missing required key.
5. Unknown adapter.
6. Invalid command alias.
7. Invalid path.
8. Conflicting settings.
9. Deprecated key.
10. Experimental key used without opt-in.

### 17.6 CLI Behavior

Initial command behavior should be:

1. `monad info` reports whether `monad.toml` was found.
2. `monad doctor` validates `monad.toml` if present.
3. `monad check` validates `monad.toml` before running manifest-driven checks.
4. `monad init` eventually creates `monad.toml`.
5. `monad sync` eventually reconciles `monad.toml` with repo files.
6. `monad upgrade` eventually migrates manifest schema versions.

### 17.7 Missing Manifest Behavior

Monad should support useful behavior even when `monad.toml` is missing.

For example:

1. `monad info` can inspect and report detected repo characteristics.
2. `monad doctor` can report that no Monad manifest exists.
3. `monad init` can create one.
4. Commands requiring explicit intent may fail clearly.

A missing manifest should not prevent all inspection commands from running.

### 17.8 Generated Manifest Behavior

When Monad generates `monad.toml`, it should:

1. Use a minimal valid schema.
2. Preserve comments where practical.
3. Avoid destructive overwrites.
4. Support dry-run preview.
5. Explain generated choices.
6. Record provenance if provenance is enabled.
7. Avoid duplicating native tool internals.

### 17.9 Formatting

Generated `monad.toml` should be stable and readable.

Monad should avoid unnecessary reordering or formatting churn.

If the manifest is later rewritten by Monad, the command should preserve user intent and minimize diff noise.

### 17.10 Documentation

The manifest schema should eventually be documented in:

```text
docs/reference/monad-toml.md
```

or another approved canonical path.

The documentation should include:

1. Overview.
2. Schema version.
3. Required fields.
4. Optional fields.
5. Examples.
6. Validation rules.
7. Migration guidance.
8. Relationship to native manifests.
9. Relationship to state or lock files.

## 18. Verification

This ADR is satisfied when:

1. `monad.toml` is documented as the canonical Monad manifest.
2. Monad can detect whether `monad.toml` exists.
3. Monad can parse valid TOML.
4. Monad can validate the initial schema version.
5. Monad can produce diagnostics for invalid TOML.
6. Monad can produce diagnostics for unsupported schema versions.
7. `monad info` reports manifest presence.
8. `monad doctor` validates manifest health.
9. Tests cover a valid manifest fixture.
10. Tests cover a missing manifest fixture.
11. Tests cover an invalid TOML fixture.
12. Tests cover an unsupported schema version fixture.

Initial verification commands should eventually include:

```bash
cargo test --workspace manifest
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once the root verification script exists, the preferred command should be:

```bash
./tools/scripts/verify.sh
```

## 19. Related Decisions

This ADR is related to:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`
3. `ADR-0003-use-a-multi-crate-rust-workspace.md`
4. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
5. `ADR-0005-introduce-tokio-immediately.md`
6. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
7. `ADR-0008-support-multiple-graph-output-formats.md`

Future ADRs or specs should define:

1. Initial manifest schema.
2. Manifest validation policy.
3. Unknown key policy.
4. Manifest migration policy.
5. State or lock file relationship.
6. Generator configuration.
7. AI context and memory configuration.
8. Policy configuration.
9. Release workflow configuration.

## 20. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | approved, accepted |
---
title: "Monad Architecture Decision Records"
description: "Index, policy, and operating rules for Monad architecture decision records."
project_name: "Monad"
project_slug: "monad"
document_type: "adr-index"
document_status: "approved"
version: "0.1.0"
created: "2026-05-20"
last_updated: "2026-05-20"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/README.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
  - "docs/project/02-requirements/SOFTWARE-REQUIREMENTS-SPECIFICATION.md"
  - "docs/architecture/ARCHITECTURE.md"
  - "docs/roadmap/ROADMAP.md"
tags:
  - monad
  - architecture
  - adr
  - decision-records
  - governance
  - rust
  - polyglot
  - repo-runtime
---

# Monad Architecture Decision Records

## 1. Purpose

This directory contains Architecture Decision Records, also known as ADRs, for Monad.

ADRs are the canonical record of consequential product, architecture, engineering, runtime, repository, and governance decisions made during Monad’s development.

Monad is intended to be a governance-grade Rust-native polyglot repo runtime. Its own repository should therefore preserve important decisions in a form that is readable by humans, useful to AI assistants, traceable over time, and reviewable during implementation.

ADRs prevent architectural drift by answering:

- What decision was made?
- Why was it made?
- What alternatives were considered?
- What consequences follow from it?
- What later work depends on it?
- What would need to happen to supersede it?

## 2. ADR Policy

Monad shall use ADRs for decisions that materially affect the shape, behavior, safety, compatibility, maintainability, or long-term direction of the project.

An ADR is required for decisions involving:

- primary implementation language
- runtime architecture
- crate structure
- command surface
- CLI framework
- manifest schema
- lockfile or state-file behavior
- adapter architecture
- tool execution model
- task graph model
- graph output formats
- file operation behavior
- dry-run and diff behavior
- provenance model
- generated artifact policy
- verification strategy
- policy engine design
- architecture boundary enforcement
- AI context or memory strategy
- plugin strategy
- release strategy
- compatibility guarantees
- major dependency choices
- security-sensitive behavior
- destructive or potentially destructive operations

Small implementation details do not require ADRs unless they establish a durable pattern or constraint.

## 3. ADR Goals

Monad’s ADR system should optimize for:

1. Clarity.
2. Traceability.
3. Design discipline.
4. Implementation guidance.
5. Future maintainability.
6. AI-readable project state.
7. Explicit trade-off analysis.
8. Prevention of accidental architectural drift.
9. Safe evolution as decisions change.
10. A reliable historical record of why the project is shaped the way it is.

## 4. ADR Non-Goals

ADRs are not intended to replace:

- issue tracking
- pull request discussion
- inline code comments
- implementation documentation
- user documentation
- release notes
- roadmap documents
- detailed technical specifications

An ADR records a durable decision. It should not become a dumping ground for every detail of implementation.

## 5. ADR Status Values

Each ADR must use one of the following statuses.

### 5.1 Proposed

The decision is being considered but has not yet been accepted.

```text
proposed
```

### 5.2 Accepted

The decision is approved and should guide implementation.

```text
accepted
```

### 5.3 Superseded

The decision has been replaced by a later ADR.

```text
superseded
```

### 5.4 Amended

The decision remains accepted, but a later ADR or revision has modified part of its interpretation.

```text
amended
```

### 5.5 Deprecated

The decision is no longer recommended for new work but may still describe existing behavior.

```text
deprecated
```

### 5.6 Rejected

The decision was considered and explicitly not adopted.

```text
rejected
```

## 6. ADR Numbering

ADRs must be numbered sequentially using four digits.

Format:

```text
ADR-0001-short-kebab-case-title.md
ADR-0002-short-kebab-case-title.md
ADR-0003-short-kebab-case-title.md
```

Rules:

1. ADR numbers are never reused.
2. ADR numbers are assigned when the ADR file is created.
3. Superseded or rejected ADRs remain in the repository.
4. New decisions receive new ADRs rather than rewriting history.
5. Minor typo, formatting, or metadata corrections may be made in place.
6. Material changes should be captured as amendments or superseding ADRs.

## 7. ADR File Naming Convention

ADR filenames must use:

```text
ADR-NNNN-short-kebab-case-title.md
```

Examples:

```text
ADR-0001-use-rust-for-monad-runtime.md
ADR-0002-coordinate-native-tools-rather-than-replace-them.md
ADR-0003-use-multi-crate-rust-workspace.md
```

The title should be short, descriptive, and stable.

## 8. ADR Frontmatter

Every ADR must include YAML frontmatter.

Required fields:

```yaml
---
title: ""
description: ""
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: ""
adr_number: ""
adr_status: ""
date_proposed: ""
date_accepted: ""
date_superseded: null
owner: "Thomas Carter"
review_cycle: ""
canonical_path: ""
depends_on: []
supersedes: []
superseded_by: []
related_documents: []
tags: []
---
```

The `document_status` field describes the document lifecycle.

The `adr_status` field describes the decision lifecycle.

For most accepted ADRs, use:

```yaml
document_status: "approved"
adr_status: "accepted"
```

For review drafts, use:

```yaml
document_status: "draft-for-review"
adr_status: "proposed"
```

## 9. ADR Body Format

Each ADR should use the following structure:

```markdown
# ADR-NNNN: Decision Title

## 1. Status

## 2. Context

## 3. Decision

## 4. Rationale

## 5. Alternatives Considered

## 6. Consequences

## 7. Implementation Guidance

## 8. Verification

## 9. Related Decisions

## 10. Revision History
```

Sections may be expanded when needed, but ADRs should remain focused.

## 10. ADR Writing Standard

ADRs should be written in clear, direct language.

Each ADR should:

1. State the decision explicitly.
2. Explain the problem that forced the decision.
3. Identify the constraints.
4. List serious alternatives.
5. Explain why the selected option was chosen.
6. Describe positive consequences.
7. Describe negative consequences.
8. Provide implementation guidance.
9. Identify verification expectations.
10. Link to related documents and decisions.

ADRs should not hide trade-offs.

A strong ADR makes future disagreement easier to resolve because the original reasoning is visible.

## 11. Decision Authority

During the early solo/principal-engineer phase of Monad, decisions are approved by the project owner.

The default owner is:

```text
Thomas Carter
```

As the project matures, decision authority may evolve to include maintainers, reviewers, or a formal governance process.

Any change to ADR decision authority should itself be recorded in an ADR.

## 12. ADR Review Process

The normal ADR process is:

1. Identify a consequential decision.
2. Draft an ADR with status `proposed`.
3. Review alternatives and consequences.
4. Revise until the decision is clear.
5. Accept, reject, or defer the ADR.
6. Commit the ADR with an atomic Conventional Commit.
7. Update this ADR index.
8. Ensure implementation follows the accepted decision.

For urgent implementation work, an ADR may be created immediately after the decision if delaying the work would create unnecessary friction. However, undocumented architectural decisions should not remain undocumented.

## 13. ADR Change Policy

Accepted ADRs should not be rewritten to change history.

Allowed in-place edits:

* typo fixes
* formatting fixes
* broken link fixes
* metadata corrections
* clarifying language that does not change the decision

Material changes require one of the following:

1. a new superseding ADR
2. an amendment ADR
3. an explicit revision history entry if the change is minor but meaningful

## 14. ADR Relationship to Requirements

ADRs do not replace the Software Requirements Specification.

The SRS should describe what Monad must do.

ADRs should explain major decisions about how Monad is shaped and why those decisions were made.

When an ADR creates, modifies, or constrains a requirement, the relevant requirements document should be updated.

## 15. ADR Relationship to Architecture

ADRs do not replace the architecture document.

The architecture document should describe the current architecture as a coherent whole.

ADRs should record the important decisions that produced that architecture.

When accepted ADRs change architectural direction, `docs/architecture/ARCHITECTURE.md` should be updated.

## 16. ADR Relationship to Roadmap

ADRs do not replace the roadmap.

The roadmap should describe sequencing.

ADRs should describe durable decisions that constrain or inform that sequencing.

When an ADR changes implementation order or product scope, `docs/roadmap/ROADMAP.md` should be updated.

## 17. ADR Relationship to AI Context

Monad is intended to be AI-ready and eventually include AI-readable context generation.

ADRs are part of that AI-readable project memory.

AI assistants working in this repository should read:

1. `docs/project/00-intake/MONAD-PROJECT-INTAKE.md`
2. `docs/project/01-charter/PRODUCT-CHARTER.md`
3. `docs/adr/README.md`
4. accepted ADRs relevant to the current task
5. `docs/architecture/ARCHITECTURE.md`
6. `docs/ai/CURRENT_STATE.md`, once present

ADRs should be written clearly enough that an AI assistant can use them as durable project constraints.

## 18. Initial ADR Backlog

The initial ADR backlog has been completed through ADR-0008.

| ADR | Title | Status | Purpose |
| --- | --- | --- | --- |
| ADR-0001 | Use Rust for Monad runtime | Accepted | Records the Rust-first implementation decision. |
| ADR-0002 | Coordinate native tools rather than replace them | Accepted | Records the native-tool coordination strategy. |
| ADR-0003 | Use a multi-crate Rust workspace | Accepted | Records the approved multi-crate workspace direction. |
| ADR-0004 | Use latest stable Rust as MSRV policy | Accepted | Records the minimum supported Rust version policy. |
| ADR-0005 | Introduce Tokio immediately | Accepted | Records the async runtime decision. |
| ADR-0006 | Use `monad.toml` as the canonical manifest | Accepted | Records the manifest source-of-truth decision. |
| ADR-0007 | Maintain a Monad lock or state file | Accepted | Records the lock/state file decision. |
| ADR-0008 | Support multiple graph output formats | Accepted | Records the `monad graph` output-format decision. |

Only ADR-0001 and ADR-0002 are required before the first code scaffold, unless a later implementation step depends on one of the other decisions being formalized first.

Future ADRs should be added as new architectural decisions become necessary.   |

## 19. ADR Index

| ADR | Title | Status | Date | File |
| --- | --- | --- | --- | --- |
| ADR-0001 | Use Rust for Monad runtime | Accepted | 2026-05-20 | `docs/adr/ADR-0001-use-rust-for-monad-runtime.md` |
| ADR-0002 | Coordinate native tools rather than replace them | Accepted | 2026-05-20 | `docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md` |
| ADR-0003 | Use a multi-crate Rust workspace | Accepted | 2026-05-20 | `docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md` |
| ADR-0004 | Use latest stable Rust as MSRV policy | Accepted | 2026-05-20 | `docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md` |
| ADR-0005 | Introduce Tokio immediately | Accepted | 2026-05-20 | `docs/adr/ADR-0005-introduce-tokio-immediately.md` |
| ADR-0006 | Use `monad.toml` as canonical manifest | Accepted | 2026-05-20 | `docs/adr/ADR-0006-use-monad-toml-as-canonical-manifest.md` |
| ADR-0007 | Maintain a Monad lock or state file | Accepted | 2026-05-20 | `docs/adr/ADR-0007-maintain-a-monad-lock-or-state-file.md` |
| ADR-0008 | Support multiple graph output formats | Accepted | 2026-05-20 | `docs/adr/ADR-0008-support-multiple-graph-output-formats.md` |         |

## 20. Initial Accepted Decisions from Product Charter

The approved product charter already establishes several project-level decisions that should be recorded in ADRs.

These include:

1. Monad is Rust-first.
2. Monad is single-binary-first.
3. Monad coordinates native ecosystem tools.
4. Monad avoids Bazel, Pants, Buck2, and Nx dependencies by default.
5. Monad uses a multi-crate Rust workspace.
6. Monad targets latest stable Rust as the MSRV policy.
7. Monad introduces Tokio immediately.
8. Monad uses `monad.toml` as the canonical manifest name.
9. Monad maintains a lock or state file.
10. `monad graph` should support multiple output formats.
11. Monad includes AI-readable context generation and a full AI memory system from the beginning.
12. Monad includes repo evolution, provenance, policy checks, architecture-boundary checks, documentation scaffolding, CI/local parity, and release workflow support in its initial product scope.

This ADR index exists to ensure these decisions become traceable implementation constraints rather than loose planning notes.

## 21. Required ADRs Before Initial Code Scaffold

The required pre-scaffold ADRs have been accepted.

The following foundational decisions are now available as implementation constraints:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`
3. `ADR-0003-use-a-multi-crate-rust-workspace.md`
4. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
5. `ADR-0005-introduce-tokio-immediately.md`
6. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
7. `ADR-0007-maintain-a-monad-lock-or-state-file.md`
8. `ADR-0008-support-multiple-graph-output-formats.md`

The repository may now proceed to the initial Rust workspace scaffold.

## 22. Conventional Commit Guidance

When adding this ADR index, use:

```bash
git add docs/adr/README.md
git commit -m "docs(adr): add architecture decision record index"
```

When adding individual ADRs, use:

```bash
git add docs/adr/ADR-0001-use-rust-for-monad-runtime.md
git commit -m "docs(adr): record Rust runtime decision"
```

```bash
git add docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md
git commit -m "docs(adr): record native tool coordination decision"
```

## 23. Definition of Done

This ADR index is complete when:

1. `docs/adr/README.md` exists.
2. The ADR purpose is clearly stated.
3. ADR status values are defined.
4. ADR numbering rules are defined.
5. ADR naming rules are defined.
6. ADR frontmatter requirements are defined.
7. ADR body structure is defined.
8. The ADR review process is defined.
9. The initial ADR backlog is listed.
10. The ADR index table is present.
11. Required ADRs before code scaffold are identified.
12. The document is reviewed and accepted.

## 24. Current Status

Status:

```text
Approved and updated through ADR-0008.
```
```
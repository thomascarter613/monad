---
title: "Monad Work Packet System"
description: "Defines Monad's lightweight work-packet system for implementing ordered backlog items through atomic, verifiable slices."
project_name: "Monad"
project_slug: "monad"
document_type: "work-packet-system"
document_status: "approved"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
review_cycle: "implementation"
canonical_path: "docs/work-packets/README.md"
depends_on:
  - "docs/backlog/ORDERED-BACKLOG.md"
  - "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
related_documents:
  - "docs/backlog/ORDERED-BACKLOG.md"
  - "docs/roadmap/IMPLEMENTATION-EPICS-AND-SLICES.md"
  - "docs/work-packets/templates/WORK-PACKET-TEMPLATE.md"
tags:
  - monad
  - work-packets
  - implementation
  - backlog
  - verification
  - atomic-commits
---

# Monad Work Packet System

## 1. Purpose

Work packets are Monad's implementation control units.

A work packet turns one backlog slice into a concrete, verifiable unit of work.

A work packet answers:

- what are we doing;
- why are we doing it;
- which files may change;
- which files must not change;
- what tests prove it works;
- what command verifies it;
- what commit message should be used;
- what comes next.

## 2. Work Packet Directory Layout

Monad work packets live under:

```text
docs/work-packets/
```

Recommended structure:

```text
docs/work-packets/
  README.md
  templates/
    WORK-PACKET-TEMPLATE.md
  active/
    WP-E1-S10-cli-command-smoke-tests.md
  completed/
    WP-E1-S09-check-command-skeleton.md
```

## 3. Work Packet Lifecycle

| Status      | Meaning                                              |
| ----------- | ---------------------------------------------------- |
| Draft       | Packet is being written.                             |
| Ready       | Packet is ready to implement.                        |
| In Progress | Work is underway.                                    |
| Blocked     | Work cannot proceed.                                 |
| Review      | Implementation is ready for review.                  |
| Done        | Work has passed verification and has been committed. |
| Superseded  | Packet was replaced by another packet.               |

## 4. When to Create a Work Packet

Create a work packet for:

1. every implementation slice;
2. every non-trivial documentation slice;
3. every ADR that changes implementation order;
4. every bug fix that changes architecture or tests;
5. every refactor with meaningful risk;
6. every release or packaging slice;
7. every policy or governance slice.

A tiny typo fix does not need a work packet.

## 5. Work Packet Naming

Use this format:

```text
WP-<EPIC>-<SLICE>-<short-kebab-title>.md
```

Examples:

```text
WP-E1-S10-cli-command-smoke-tests.md
WP-E2-S01-initial-monad-manifest-schema.md
WP-E4-S02-adapter-capability-model.md
```

## 6. Work Packet Placement

Active packets go here:

```text
docs/work-packets/active/
```

Completed packets move here:

```text
docs/work-packets/completed/
```

A completed packet should not be deleted. It becomes part of the implementation record.

## 7. Work Packet Rules

1. One work packet should usually map to one backlog slice.
2. One work packet should usually map to one atomic commit.
3. Work packets should be small enough to verify locally.
4. Work packets should name exact files expected to change.
5. Work packets should identify files that must not change.
6. Work packets should include verification commands.
7. Work packets should include the exact Conventional Commit message.
8. Work packets should state the next recommended packet.
9. Work packets should be updated when the implementation differs materially from the plan.

## 8. Work Packet and Git Commits

Each work packet should recommend one commit message.

Example:

```bash
git commit -m "test(cli): add command smoke tests"
```

If a work packet must be split into multiple commits, each commit should be listed in the packet before implementation continues.

## 9. Work Packet and Verification

Every implementation packet should include verification.

Default Rust verification:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once `tools/scripts/verify.sh` exists, prefer:

```bash
./tools/scripts/verify.sh
```

A packet should not be marked Done unless verification passes.

## 10. Work Packet and AI Assistance

Work packets are designed to help both humans and AI assistants.

An AI assistant should be able to read a packet and know:

1. the exact task;
2. the current context;
3. relevant ADR constraints;
4. allowed file changes;
5. implementation steps;
6. verification commands;
7. commit message;
8. what comes next.

## 11. Initial Next Work Packet

The next recommended work packet is:

```text
docs/work-packets/active/WP-E1-S10-cli-command-smoke-tests.md
```

It should implement:

```text
E1-S10 — test(cli): add command smoke tests
```

Recommended commit:

```bash
git commit -m "test(cli): add command smoke tests"
```

## 12. Maintenance

Update this document when:

1. work packet statuses change;
2. the directory layout changes;
3. verification rules change;
4. the backlog system changes;
5. the commit policy changes.
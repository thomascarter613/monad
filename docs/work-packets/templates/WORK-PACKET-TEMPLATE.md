---
title: "WP-EPIC-SLICE: Work Packet Title"
description: "Work packet template for one atomic Monad implementation slice."
project_name: "Monad"
project_slug: "monad"
document_type: "work-packet"
document_status: "template"
version: "0.1.0"
created: "2026-05-21"
last_updated: "2026-05-21"
owner: "Thomas Carter"
primary_language: "Rust"
canonical_path: "docs/work-packets/templates/WORK-PACKET-TEMPLATE.md"
work_packet_id: "WP-EXAMPLE"
epic_id: "EX"
slice_id: "SX"
status: "template"
related_backlog_item: ""
recommended_commit: ""
tags:
  - monad
  - work-packet
  - template
---

# WP-EPIC-SLICE: Work Packet Title

## 1. Status

```text
Template
```

## 2. Position

```text
Epic:
Slice:
Backlog order:
Approximate MVP progress before:
Approximate MVP progress after:
```

## 3. Goal

State the goal of this work packet.

## 4. Non-Goals

State what this packet must not do.

## 5. Why This Matters

Explain why this slice exists and what future work depends on it.

## 6. Relevant Decisions and Constraints

List relevant docs and ADRs.

Example:

* `docs/project/01-charter/PRODUCT-CHARTER.md`
* `docs/adr/ADR-0001-use-rust-for-monad-runtime.md`
* `docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md`

## 7. Files Expected to Change

```text
path/to/file
path/to/other-file
```

## 8. Files That Must Not Change

```text
path/to/file-that-should-not-change
```

## 9. Implementation Plan

1. Step one.
2. Step two.
3. Step three.

## 10. Rust Learning Notes

Use this section when the work packet includes Rust source code.

Explain:

1. new Rust concepts introduced;
2. ownership/borrowing implications;
3. module boundaries;
4. error-handling patterns;
5. testing patterns.

## 11. Verification

Run:

```bash
cargo fmt --check
cargo check --workspace
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Additional manual checks:

```bash
cargo run -p monad-cli --bin monad -- --help
```

## 12. Expected Output

Paste or describe expected output.

## 13. Definition of Done

This packet is done when:

1. implementation is complete;
2. formatting passes;
3. tests pass;
4. Clippy passes;
5. manual command checks pass;
6. changed files match the packet scope;
7. commit is made with the recommended commit message.

## 14. Recommended Commit

```bash
git add <files>
git commit -m "<type(scope): message>"
```

## 15. Next Work Packet

```text
WP-...
```

## 16. Notes

Add implementation notes, deviations, or follow-up items here.
---
title: "Active Engineering Work"
description: "Canonical register of work currently authorized or in progress."
date: 2026-08-06
status: active
program_increment: PI-002
milestone: M-002
current_work_cycle: WC-0002
---

# Active Engineering Work

## Current focus

| Field | State |
| --- | --- |
| Program increment | **PI-002 — Semantic Compiler Foundation** |
| Milestone | **M-002 — Compiler Specification Complete** |
| Active work cycle | **WC-0002 — Diagnostics, Incrementality, and Reproducibility** |
| Immediate specification | **MSC-CORE-0009 of 10** |
| Implementation packets in progress | **None recorded** |

The active engineering stream is specification work for MSC-CORE-0009. WC-0001 is planning-complete and is not active implementation work. WP-MSC-0001 through WP-MSC-0006 remain in the backlog until implementation is explicitly started and an owner, execution state, and evidence path are recorded.

## Active control item

| ID | Type | Title | State | Required outcome |
| --- | --- | --- | --- | --- |
| WC-0002 | Work cycle | Diagnostics, Incrementality, and Reproducibility | Active / next for execution | Specify MSC-CORE-0009 and reconcile compiler-wide reproducibility with MSC-CORE-0008 |

## Entry criteria for implementation packets

A WP-MSC packet may move from `backlog.md` into this register only when:

1. implementation work has been explicitly authorized;
2. its prerequisite packets and specification dependencies are satisfied or explicitly waived through governance;
3. an accountable owner or execution agent is recorded;
4. acceptance criteria and required evidence are linked; and
5. its state is accurately set to ready, in progress, blocked, or review.

Moving a packet here does not imply completion. Completion requires accepted source changes, automated tests, conformance evidence, and a packet-specific acceptance result.

## Current blockers

No P0 or P1 planning blocker was identified by the WC-0001 construction review. The remaining open gates are planned work rather than recorded blockers:

- completion and review of MSC-CORE-0009;
- completion and review of MSC-CORE-0010;
- the combined MSC-CORE-0008–0010 consistency review; and
- an explicit compiler implementation-threshold decision.

## Next update trigger

Update this register when WC-0002 formally begins, an implementation packet is authorized, an active item becomes blocked or enters review, or MSC-CORE-0009 receives a disposition.

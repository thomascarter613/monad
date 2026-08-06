# Active Work Packets

**Project:** Monad Engineering Program  
**Current Program Increment:** PI-002 — Semantic Compiler Foundation  
**Current Milestone:** M-002 — Compiler Specification Complete  
**Status:** Active

## Current Objective

Complete the final MSC-CORE specifications required to authorize compiler-bootstrap implementation.

## Active Queue

| Order | Work Packet / Artifact | Status | Priority |
|---:|---|---|---:|
| 1 | MSC-CORE-0008 — Semantic Graph Construction | Active | P0 |
| 2 | MSC-CORE-0009 — Diagnostics, Incrementality, and Reproducibility | Ready | P0 |
| 3 | MSC-CORE-0010 — KIR Lowering, Backend Contracts, and Self-Hosting | Ready | P0 |
| 4 | PI-002 Compiler Consistency Review | Planned | P0 |
| 5 | Compiler Implementation Threshold Declaration | Planned | P0 |
| 6 | Compiler Bootstrap Work Packet Set | Planned | P1 |

## Execution Order

```text
MSC-CORE-0008
        ↓
MSC-CORE-0009
        ↓
MSC-CORE-0010
        ↓
Compiler consistency review
        ↓
Implementation threshold
        ↓
Compiler bootstrap work packets
```

## Completed Architecture Freeze Work

WP-AF-0001 through WP-AF-0009 have moved to `completed.md`.

## Current Blockers

None.

## Activation Rule

Do not activate unrelated subsystem work until the compiler implementation threshold is declared, except for work required to resolve a P0 contradiction or security issue.

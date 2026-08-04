---
id: ADR-0001
title: The Knowledge Engine Is the Core of Monad
status: Accepted
version: 1.0.0
created: 2026-08-03
decision_scope: foundational-architecture

depends_on:
  - NA

affects:
  - MSL
  - MSC
  - KIR
  - MKE
  - generators
  - validators
  - publishing
  - artificial-intelligence
---

# ADR-0001 — The Knowledge Engine Is the Core of Monad

Status: Accepted

Date: 2026-08-03

## Context

Monad requires a system capable of understanding software
projects as interconnected bodies of knowledge.

## Decision

The Monad Knowledge Engine (MKE) is the foundational
architectural subsystem.

All Monad capabilities consume, create, or transform
knowledge.

## Consequences

Positive:

- Traceability
- AI context retrieval
- Impact analysis
- Living documentation

Negative:

- Increased initial complexity
- Requires disciplined artifact management


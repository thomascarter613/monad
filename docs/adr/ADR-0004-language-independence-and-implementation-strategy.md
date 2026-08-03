# ADR-0004 — Language Independence and Implementation Strategy

* Status: Accepted
* Date: 2026-08-02
* Decision Makers: Monad Core Maintainers

## Context

Monad is intended to generate and manage software ecosystems written in many languages.

A Go-only architecture would conflict with this goal.

## Decision

Monad will define capabilities independently from programming languages.

Language-specific implementations are adapters around logical capabilities.

Examples:

```
Manifest System
    |
    +-- Go implementation
    +-- Rust implementation
    +-- Python implementation
```

No language is considered the permanent implementation language of Monad.

## Consequences

### Positive

* Supports polyglot ecosystems.
* Prevents early language lock-in.

### Negative

* Requires additional abstraction layers.
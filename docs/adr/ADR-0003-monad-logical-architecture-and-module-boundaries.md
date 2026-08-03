# ADR-0003 — Monad Logical Architecture and Module Boundaries

* Status: Accepted
* Date: 2026-08-02
* Decision Makers: Monad Core Maintainers

## Context

Monad must support multiple implementation languages and evolve beyond its initial Go implementation.

Physical source organization should not define the architecture.

## Decision

Monad will separate logical architecture from implementation architecture.

The logical kernel consists of:

1. Repository
2. Manifest
3. Workspace
4. Generator
5. Validator
6. CLI

These are capabilities, not language packages.

Implementation details may change.

Example:

Logical capability:

```
Repository
```

may eventually become:

```
Go package
Rust crate
Python module
TypeScript package
```

without changing the architecture.

## Architectural Principle

The logical architecture is permanent.

The implementation architecture is replaceable.

## Consequences

### Positive

* Language independence.
* Easier evolution.
* Reduced coupling to implementation choices.

### Negative

* Requires stronger abstraction discipline.

# ADR-0005 — Repository Identity and Artifact Model

* Status: Accepted
* Date: 2026-08-02
* Decision Makers: Monad Core Maintainers

## Context

Monad needs a way to uniquely identify and manage software artifacts.

A repository name is insufficient because names change and multiple repositories may share similar names.

## Decision

Every Monad-managed artifact receives an immutable identity.

Identity is stored in:

```
.monad/identity.yaml
```

Identity contains:

* unique identifier
* artifact type
* creation metadata

Mutable information is stored separately in:

```
.monad/state.yaml
```

## Identity Principles

Artifact identity:

* is created once
* should not change
* is independent from location
* is independent from implementation language

## Consequences

### Positive

* Enables artifact tracking.
* Supports migration and evolution.
* Allows repositories to move without losing identity.

### Negative

* Requires identity lifecycle management.

## Future Considerations

Identity may eventually integrate with:

* artifact registry
* dependency graph
* provenance tracking
* supply chain security

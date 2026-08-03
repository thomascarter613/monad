# ADR-0002 — Bootstrap Command and Repository Generation Model

* Status: Accepted
* Date: 2026-08-02
* Decision Makers: Monad Core Maintainers

## Context

Monad must be capable of creating the initial structure required for a Monad-managed repository.

The bootstrap process represents Monad's first self-hosting capability. The design must establish clear ownership boundaries between user-managed project files and Monad-managed internal files.

## Decision

The `monad bootstrap` command will create the canonical Monad repository structure.

Bootstrap operates on the current directory by default.

Generated structure:

```
project/
├── monad.yaml
├── workspace.yaml
└── .monad/
    ├── identity.yaml
    ├── state.yaml
    └── cache/
```

The bootstrap process creates only the minimum required files.

Additional directories and artifacts are created only when their capabilities are introduced.

## File Ownership

User-owned:

* monad.yaml
* workspace.yaml

Monad-owned:

* .monad/identity.yaml
* .monad/state.yaml
* .monad/cache/

## Consequences

### Positive

* Clear ownership boundaries.
* Reduced accidental modification of internal state.
* Enables future self-management.

### Negative

* Additional concepts must be understood by users.

## Future Considerations

Bootstrap may eventually support:

* templates
* interactive configuration
* project generators
* workspace initialization

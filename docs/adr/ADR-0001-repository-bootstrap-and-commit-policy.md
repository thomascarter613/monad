# ADR-0001 — Repository Bootstrap and Commit Policy

* Status: Accepted
* Date: 2026-08-02
* Decision Makers: Monad Core Maintainers

## Context

Monad is intended to become a self-hosting software ecosystem operating system. Because Monad's purpose is to create, manage, validate, and evolve software systems, the development process used to build Monad must itself demonstrate the principles Monad will eventually enforce.

Early development must avoid unnecessary complexity while establishing strong engineering discipline.

Two foundational decisions are required:

1. How changes are recorded and reviewed.
2. What repository is considered the canonical bootstrap implementation of Monad.

## Decision

### 1. Atomic Conventional Commits

Monad will use atomic commits following the Conventional Commits specification.

Each commit must represent one logical change.

Commit format:

```
<type>(<scope>): <description>
```

Examples:

```
chore(repo): initialize repository
docs: add initial documentation
feat(cli): add version command
feat(bootstrap): create repository structure
fix(manifest): handle invalid yaml
refactor(core): extract lifecycle model
```

Commits should:

* be small and focused
* describe the intent of the change
* leave the repository in a working state
* avoid temporary or experimental states on the main branch

The main branch must always remain buildable.

## 2. Canonical Bootstrap Repository

The canonical Monad bootstrap repository is:

```
https://github.com/thomascarter613/monad
```

The Go module identifier is:

```
github.com/thomascarter613/monad
```

This repository represents the initial Monad kernel implementation.

Future Monad ecosystem components may eventually become independent repositories, but this repository remains the origin point from which the ecosystem grows.

## 3. Build Integrity Requirement

Every commit merged into the main branch must successfully:

```
go build ./...
go test ./...
```

As the project evolves, additional validation requirements may be added.

## Consequences

### Positive

* Git history remains understandable.
* Changes are easier to review and revert.
* Automated tooling can determine release impact.
* Monad demonstrates the engineering practices it will eventually automate.

### Negative

* More commits are required.
* Developers must spend more time structuring changes correctly.
* Larger features require multiple incremental commits.

## Future Considerations

As Monad matures, this policy may evolve into automated repository governance enforced by Monad itself.

The long-term goal is for Monad to validate its own development process.

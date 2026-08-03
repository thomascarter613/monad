# Monad Specification Registry

The Monad Specification Registry is the bootstrap catalog of the Monad
specification corpus.

It records:

- canonical artifact identity
- title
- owning series
- filesystem location
- version
- lifecycle state
- compilation status

During the bootstrap phase, this file is maintained manually.

Future Monad tooling will:

1. discover specification sources,
2. validate their metadata,
3. resolve dependencies,
4. compile them into KIR,
5. generate this registry as a derived projection.

The filesystem remains the current source of persistence. Artifact identity,
not file location, is the permanent identity of a specification.
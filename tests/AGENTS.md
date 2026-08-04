# Monad Test Agent Instructions

## Scope

These instructions apply to files under `tests/`.

They supplement the repository-root `AGENTS.md`. All repository-wide safety, authority, validation, and reporting rules remain in force.

When tests live beside implementation rather than under `tests/`, apply these principles to those tests as well.

## Purpose of Tests

Tests provide executable evidence that the implementation conforms to requirements and preserves important behavior.

Tests are not a substitute for specifications.

Existing tests may describe current behavior, but they do not automatically override accepted ADRs or approved specifications.

When a test conflicts with an authoritative requirement, report the conflict rather than automatically changing either side.

## Test Design Principles

Tests should be:

- deterministic,
- isolated,
- readable,
- behavior-focused,
- repeatable,
- appropriately scoped,
- explicit about inputs and expected results,
- independent of execution order.

A failing test should identify a meaningful behavioral regression.

Do not create tests whose primary purpose is increasing coverage metrics without verifying useful behavior.

## Test Levels

Use the narrowest test level that proves the behavior, while testing public contracts at their actual boundaries.

### Unit tests

Use unit tests for:

- domain rules,
- parsers,
- validators,
- state transitions,
- deterministic transformations,
- error mapping,
- isolated planning logic.

### Integration tests

Use integration tests for:

- filesystem behavior,
- persistence,
- process execution adapters,
- component collaboration,
- manifests,
- native-tool integrations,
- plan/apply behavior.

### Contract tests

Use contract tests for:

- CLI syntax,
- exit codes,
- standard output,
- standard error,
- structured output,
- schemas,
- serialized state,
- plugin interfaces,
- generated repository layouts.

### End-to-end tests

Use end-to-end tests selectively for critical user journeys that cannot be proven adequately at a lower level.

Do not rely exclusively on end-to-end tests for core domain behavior.

## Requirement Traceability

When requirement identifiers or work-packet identifiers exist, reference them according to repository convention.

A test name or nearby documentation should make clear:

- behavior being proven,
- relevant condition,
- expected outcome.

Do not add meaningless identifiers that are not connected to an actual specification.

## Determinism

Tests must not depend on uncontrolled:

- current time,
- random values,
- filesystem traversal order,
- map ordering,
- network services,
- AI responses,
- machine-specific paths,
- user configuration,
- locale,
- timezone,
- execution order,
- installed global tools.

Inject or control time and randomness.

Sort results before comparison only when the contract defines order as irrelevant. Do not hide an ordering defect by sorting test output when output order is part of the contract.

## Filesystem Tests

Filesystem tests must use isolated temporary workspaces or fixtures.

They must not:

- modify the developer's repository,
- depend on files outside the fixture,
- follow links into unrelated directories,
- write to the user's home directory,
- assume a particular absolute path,
- leave temporary state after completion.

Test, where relevant:

- absent target,
- existing target,
- user-owned content,
- generated content,
- conflicts,
- read-only paths,
- invalid paths,
- path traversal,
- symbolic links,
- interrupted or partial operations,
- reruns and idempotence.

## Process and Native-Tool Tests

Prefer controlled fakes or fixture executables for error paths and command construction.

When invoking a real native tool:

- declare the prerequisite,
- isolate the working directory,
- control the environment,
- avoid network access,
- avoid modifying global configuration,
- capture stdout, stderr, and exit code,
- make unsupported-platform behavior explicit.

Do not make ordinary unit-test suites depend on optional external tools.

## CLI Tests

CLI contract tests should verify, as applicable:

- command parsing,
- help behavior,
- success exit code,
- failure exit code,
- standard output,
- standard error,
- structured output validity,
- no diagnostic contamination of structured output,
- noninteractive behavior,
- color-disabled behavior,
- invalid input,
- unsupported capability,
- partial-failure reporting,
- filesystem results.

When testing JSON or another structured format, parse the output and assert semantic fields.

Use exact text assertions when wording, formatting, or ordering is part of the public contract.

## Planning and Application Tests

Planning tests must verify that planning does not mutate repository state.

Plan/apply tests should verify:

- stable plan generation,
- explicit operations,
- conflict detection,
- stale-plan behavior,
- application of only planned operations,
- correct final state,
- evidence generation,
- interrupted or partial application behavior,
- repeated application behavior where idempotence is required.

A test that validates only the final files is insufficient when the operation plan is itself a contract.

## AI-Related Tests

Do not call live AI services from deterministic test suites.

AI integrations should use:

- controlled provider fakes,
- recorded fixtures when permitted,
- contract tests for request construction,
- validation tests for malformed and adversarial output,
- timeout and unavailable-provider tests,
- offline behavior tests.

Never place real API keys, user prompts, private repository content, or production responses in fixtures.

## Fixtures

Fixtures should be:

- minimal,
- understandable,
- version controlled,
- free of secrets,
- explicit about ownership,
- limited to behavior under test.

Do not use a full real-world repository fixture when a small synthetic repository proves the behavior.

When a fixture represents a versioned schema or historical repository state, label the version clearly.

Do not mutate a shared fixture in place during a test.

## Golden Files and Snapshots

Use golden files or snapshots when they improve reviewability of a meaningful stable artifact.

Appropriate examples include:

- generated repository trees,
- manifest serialization,
- command help,
- structured plans,
- rendered templates.

Do not use snapshots to avoid writing meaningful assertions.

Before updating a golden file:

1. inspect the full semantic diff,
2. identify the governing requirement,
3. explain why the change is expected,
4. verify that unrelated output did not change.

Never update all snapshots automatically merely to make a suite pass.

## Failure-Path Testing

Behavioral changes should test important failures.

Relevant failures may include:

- malformed input,
- missing configuration,
- unsupported versions,
- permission denial,
- file conflicts,
- path escape attempts,
- corrupted state,
- invalid generated content,
- native-tool failure,
- interrupted operation,
- stale plan,
- unavailable network,
- unavailable AI provider,
- partial application.

Do not test only the happy path for repository mutation.

## Flaky Tests

Do not respond to a flaky test by:

- adding arbitrary sleep calls,
- increasing retries without diagnosis,
- widening assertions,
- skipping the test,
- disabling parallel execution globally,
- ignoring the failure.

Identify and control the unstable dependency.

If a flaky test cannot be corrected within the current scope, report it clearly and avoid claiming the full suite is reliable.

## Skips and Conditional Tests

Do not add a skipped, ignored, quarantined, or conditionally disabled test without:

- a documented reason,
- a clear enabling condition,
- a linked issue or work item when repository practice supports it.

A skipped test is not evidence that a requirement is satisfied.

Do not silently skip because an optional tool is absent unless the test category and reporting make that behavior explicit.

## Assertion Quality

Assertions should prove behavior directly.

Avoid:

- asserting only that no exception occurred,
- broad substring checks when exact structure matters,
- assertions against internal implementation details without need,
- swallowing errors inside test helpers,
- helpers that make failures difficult to diagnose,
- excessive mocks that reproduce the implementation.

Failure messages should expose the relevant expected and actual behavior without leaking secrets.

## Test Changes During Bug Fixes

For a bug fix:

1. add or identify a test that reproduces the failure,
2. verify that it fails for the expected reason when practical,
3. implement the correction,
4. verify that the test passes,
5. run relevant regression tests.

Do not rewrite an existing valid test to match the buggy behavior.

## Validation Reporting

When reporting test results, identify:

- exact command,
- working directory when relevant,
- pass or fail result,
- number or category of tests when available,
- skipped tests,
- environmental limitations,
- failures unrelated to the current change.

Do not claim that “all tests pass” when only a targeted subset was run.

## Test Review Rules

When reviewing tests, flag:

- missing requirement coverage,
- tests that bypass the changed public boundary,
- nondeterministic dependencies,
- live network or AI calls,
- mutation of developer or user state,
- assertions weakened to accommodate implementation,
- blind snapshot updates,
- hidden skipped tests,
- missing failure-path coverage,
- tests dependent on execution order,
- shared mutable fixtures,
- tests that verify implementation structure instead of behavior,
- success claims unsupported by executed tests.
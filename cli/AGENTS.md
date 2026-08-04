# Monad CLI Agent Instructions

## Scope

These instructions apply to files under `cli/`.

They supplement the repository-root `AGENTS.md`. All repository-wide safety, authority, validation, and reporting rules remain in force.

## CLI Responsibility

The Monad CLI is a user-facing adapter over Monad application and domain capabilities.

The CLI may:

- parse commands and options,
- resolve CLI-specific configuration inputs,
- invoke application use cases,
- render human-readable output,
- render machine-readable output,
- coordinate interactive terminal behavior,
- translate domain errors into stable CLI outcomes.

The CLI should not contain core domain policy that belongs in the engine or another domain component.

Keep command parsing, application orchestration, domain logic, and output rendering separable.

## Public Command Contract

Treat all of the following as public contracts:

- executable name,
- command names,
- subcommand names,
- flags,
- positional arguments,
- aliases,
- defaults,
- environment variables,
- configuration precedence,
- prompts,
- exit codes,
- standard output,
- standard error,
- JSON or other structured output,
- generated files,
- help text examples.

Do not change any of these accidentally.

A public CLI change requires:

- a governing requirement,
- compatibility analysis,
- command-contract tests,
- user documentation updates,
- migration guidance when applicable.

## Command Design

Commands should:

- use consistent terminology from the Monad domain model,
- perform one coherent user-level operation,
- provide actionable help,
- validate inputs before mutation,
- report what was changed,
- expose noninteractive operation where automation is expected,
- produce stable machine-readable output where specified,
- distinguish inspection, planning, application, and verification.

Avoid commands that combine unrelated lifecycle phases without an explicit design.

Where an operation mutates repository state, prefer a workflow such as:

1. inspect,
2. plan,
3. review,
4. apply,
5. verify.

Do not bypass an approved plan/apply contract for implementation convenience.

## Output Channels

Use output channels deliberately.

### Standard output

Standard output is for the command's requested result.

When structured output is requested, standard output must contain only the structured payload unless the governing contract explicitly says otherwise.

Do not mix progress messages, warnings, banners, or debug output into machine-readable standard output.

### Standard error

Standard error is for:

- diagnostics,
- warnings,
- progress information when permitted,
- actionable error explanations.

Do not rely on terminal color as the only way to communicate meaning.

## Structured Output

Structured output must be:

- syntactically valid,
- deterministic,
- documented,
- versioned when required,
- stable in field names and value meaning,
- free from terminal escape sequences,
- free from unrelated log messages.

Use deterministic ordering for collections unless ordering is explicitly undefined.

Do not serialize internal implementation types directly when that would expose unstable details. Define an explicit output contract.

## Exit Codes

Exit codes must be deliberate and tested.

At minimum, distinguish successful completion from failure.

Where specifications define a richer exit-code taxonomy, implement it consistently across commands.

Do not return success when:

- required work was skipped,
- validation failed,
- only a partial mutation occurred without an accepted partial-success contract,
- a placeholder path was reached,
- an unsupported feature was requested.

Errors should include enough context for the user to determine the next action.

## Interactive and Noninteractive Behavior

Interactive behavior must not make automation unreliable.

Commands should:

- detect noninteractive execution where practical,
- avoid prompting when input cannot be supplied,
- support explicit noninteractive options where specified,
- fail clearly when required information is absent,
- avoid indefinite waits,
- make defaults visible.

Never choose a destructive default merely because the command is interactive.

Do not require a TUI for behavior that is also expected in CI or scripts.

## Terminal Presentation

Color and formatting are presentation layers.

When color is supported:

- respect explicit color settings,
- respect established no-color conventions where supported by the repository,
- avoid color in structured output,
- ensure output remains understandable without color,
- avoid unstable animations in tests and logs.

Help text should be concise, accurate, and consistent with actual behavior.

Do not advertise commands or options that are stubs unless they are explicitly marked experimental or unavailable.

## Filesystem Mutation

Before a CLI command changes repository files, it must:

- resolve and validate the workspace,
- validate target paths,
- identify conflicts,
- preserve user-owned content according to policy,
- produce an inspectable plan when required,
- apply changes atomically where practical,
- report partial failure honestly,
- leave recoverable state after interruption.

Do not silently overwrite an existing manifest, configuration file, or user-authored source file.

Do not report that a repository was initialized when only directories or placeholders were created.

## Configuration

Configuration behavior must be explicit.

When adding or changing configuration handling:

- define supported sources,
- define precedence,
- define merge behavior,
- define validation behavior,
- define unknown-key behavior,
- define path resolution,
- define environment-variable handling,
- define whether values are persisted.

Do not invent configuration precedence inside one command.

Shared configuration resolution belongs in an appropriate reusable component.

## Error Handling

Map domain and infrastructure errors to clear CLI diagnostics without discarding their meaning.

Errors should ordinarily identify:

- the failed operation,
- the affected resource,
- the reason,
- the corrective action when known.

Avoid:

- generic `operation failed` messages,
- printing raw stack traces during normal use,
- swallowing underlying errors,
- exposing secrets,
- returning different messages nondeterministically for the same condition.

Debug details may be exposed through an explicit diagnostic mode when approved.

## Tests

CLI changes should include the relevant subset of:

- parser tests,
- command-dispatch tests,
- help-text tests,
- exit-code tests,
- standard-output tests,
- standard-error tests,
- structured-output tests,
- interactive/noninteractive tests,
- filesystem fixture tests,
- failure-path tests,
- compatibility tests.

Tests should invoke the CLI at the most appropriate boundary. Do not test only internal functions when the public command contract changed.

For structured output, parse and assert the structure rather than relying only on raw string matching.

Normalize only genuinely unstable values such as approved timestamps or temporary paths. Do not normalize away meaningful differences.

## Documentation

When command behavior changes, inspect and update:

- command reference,
- getting-started material,
- examples,
- shell-completion definitions when present,
- manifest or configuration references,
- work-packet evidence,
- release or migration notes when applicable.

Examples must match the current executable and command grammar.

## CLI Review Rules

When reviewing CLI code, flag:

- domain logic embedded in command handlers,
- undocumented command or flag changes,
- unstable exit codes,
- diagnostics mixed into structured standard output,
- success returned for partial or failed work,
- prompts in noninteractive mode,
- unsafe default mutations,
- ignored filesystem conflicts,
- nondeterministic output ordering,
- help text that overstates implementation,
- terminal escape sequences in machine output,
- tests that bypass the public CLI boundary,
- platform-specific assumptions without guards.
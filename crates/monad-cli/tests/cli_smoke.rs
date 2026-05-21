// Import Rust's standard error trait.
//
// Each test returns `Result<(), Box<dyn Error>>`. That lets us use `?` for
// fallible operations instead of calling `unwrap()` or `expect()`.
use std::error::Error;

// Import `Command` from `assert_cmd`.
//
// `assert_cmd` lets integration tests run the compiled `monad` binary the same
// way a user would run it from a terminal.
use assert_cmd::Command;

// Import predicate helpers.
//
// A predicate is a reusable condition. Here we use string predicates to assert
// that stdout or stderr contains expected text.
use predicates::prelude::*;

/// Creates a command pointed at the compiled `monad` binary.
///
/// This function returns `Result` because locating the compiled binary can fail.
/// Returning `Result` lets callers use `?` instead of `unwrap()` or `expect()`.
fn monad_command() -> Result<Command, Box<dyn Error>> {
    // `cargo_bin("monad")` asks Cargo/assert_cmd for the binary named `monad`.
    //
    // This works because `crates/monad-cli/Cargo.toml` defines:
    //
    // [[bin]]
    // name = "monad"
    // path = "src/main.rs"
    let command = Command::cargo_bin("monad")?;

    // Return the command to the caller.
    Ok(command)
}

/// Verifies `monad --help` succeeds and shows the initial command surface.
#[test]
fn help_command_succeeds() -> Result<(), Box<dyn Error>> {
    // Build a command for the compiled `monad` binary.
    let mut command = monad_command()?;

    // Add the `--help` argument.
    command.arg("--help");

    // Run the command and assert its behavior.
    command.assert().success().stdout(
        // Clap shows the `long_about` text in full help output, so the test
        // checks the actual full-help description rather than the short
        // `about` text.
        predicate::str::contains(
            "Monad coordinates native ecosystem tools through one coherent CLI",
        )
        // The help output should include the usage line.
        .and(predicate::str::contains("Usage: monad [COMMAND]"))
        // It should list the `info` subcommand.
        .and(predicate::str::contains("info"))
        // It should list the `doctor` subcommand.
        .and(predicate::str::contains("doctor"))
        // It should list the `check` subcommand.
        .and(predicate::str::contains("check")),
    );

    Ok(())
}

/// Verifies `monad --version` succeeds and prints the binary name/version.
#[test]
fn version_command_succeeds() -> Result<(), Box<dyn Error>> {
    let mut command = monad_command()?;

    command.arg("--version");

    command.assert().success().stdout(
        predicate::str::contains("monad")
            // The workspace version is currently `0.1.0`.
            .and(predicate::str::contains("0.1.0")),
    );

    Ok(())
}

/// Verifies `monad info` succeeds and prints core repository/runtime facts.
#[test]
fn info_command_succeeds() -> Result<(), Box<dyn Error>> {
    let mut command = monad_command()?;

    command.arg("info");

    command.assert().success().stdout(
        predicate::str::contains("name: monad")
            .and(predicate::str::contains("version: 0.1.0"))
            .and(predicate::str::contains("primary_language: Rust"))
            .and(predicate::str::contains("manifest: monad.toml"))
            .and(predicate::str::contains("workspace_root:"))
            .and(predicate::str::contains("monad_manifest_status:"))
            .and(predicate::str::contains("diagnostics_total:")),
    );

    Ok(())
}

/// Verifies `monad doctor` succeeds in the current repository.
#[test]
fn doctor_command_succeeds() -> Result<(), Box<dyn Error>> {
    let mut command = monad_command()?;

    command.arg("doctor");

    command.assert().success().stdout(
        predicate::str::contains("doctor: monad workspace health")
            .and(predicate::str::contains("workspace_root:"))
            .and(predicate::str::contains("workspace_root_marker:"))
            .and(predicate::str::contains("monad_manifest_status:"))
            .and(predicate::str::contains("diagnostics_total:"))
            .and(predicate::str::contains("doctor_status: ok")),
    );

    Ok(())
}

/// Verifies `monad check` succeeds as the current check skeleton.
#[test]
fn check_command_succeeds() -> Result<(), Box<dyn Error>> {
    let mut command = monad_command()?;

    command.arg("check");

    command.assert().success().stdout(
        predicate::str::contains("check: monad repository checks")
            .and(predicate::str::contains("workspace_root:"))
            .and(predicate::str::contains("workspace_root_marker:"))
            .and(predicate::str::contains("configured_check_count:"))
            .and(predicate::str::contains("configured_check_commands:"))
            .and(predicate::str::contains("diagnostics_total:"))
            .and(predicate::str::contains("check_status: ok")),
    );

    Ok(())
}

/// Verifies an unknown subcommand fails.
///
/// This protects the CLI from accidentally accepting invalid command names.
#[test]
fn unknown_command_fails() -> Result<(), Box<dyn Error>> {
    let mut command = monad_command()?;

    command.arg("definitely-not-a-command");

    command
        .assert()
        .failure()
        .stderr(predicate::str::contains("unrecognized subcommand"));

    Ok(())
}
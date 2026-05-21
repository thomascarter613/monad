#![forbid(unsafe_code)]

// Declare the local `cli` module.
//
// Rust will look for this module in `crates/monad-cli/src/cli.rs`.
mod cli;

// Import `ExitCode`, the standard-library type used by CLI programs to tell
// the operating system whether a command succeeded or failed.
use std::process::ExitCode;

// Import Clap traits.
//
// `Parser` gives us `Cli::parse()`.
// `CommandFactory` gives us `Cli::command()` for rendering help manually.
use clap::{CommandFactory, Parser};

// Import our CLI argument structs and command enum from the local `cli` module.
use crate::cli::{Cli, Commands};

// Import diagnostic types from `monad-core`.
//
// `Diagnostic` represents one structured diagnostic message.
// `DiagnosticReport` collects multiple diagnostics from one command run.
use monad_core::diagnostics::{Diagnostic, DiagnosticReport};

/// Initial Monad CLI entrypoint.
///
/// `#[tokio::main]` starts the Tokio async runtime before running `main`.
///
/// Even though these first commands are mostly synchronous, Tokio is already
/// present because Monad will eventually coordinate external tools, async
/// process execution, timeouts, and concurrent diagnostics.
#[tokio::main]
async fn main() -> ExitCode {
    // Parse command-line arguments into our typed `Cli` struct.
    //
    // Clap reads `std::env::args()` internally and converts the user input
    // into the Rust data structure we defined in `cli.rs`.
    let cli = Cli::parse();

    // Dispatch based on which subcommand was provided.
    match cli.command {
        // If the user ran `monad info`, print repository/runtime information.
        Some(Commands::Info) => print_info(),

        // If the user ran `monad doctor`, diagnose basic repo health.
        Some(Commands::Doctor) => print_doctor(),

        // If the user ran only `monad`, show help instead of doing nothing.
        None => print_help(),
    }
}

/// Prints initial Monad runtime and workspace information.
///
/// `info` is descriptive. It should tell the user what Monad sees.
/// It may include diagnostics, but it should remain mostly informational.
fn print_info() -> ExitCode {
    // Create a diagnostic report for this command run.
    //
    // This gives us one place to collect useful observations, warnings,
    // and errors while the command executes.
    let mut diagnostics = DiagnosticReport::new();

    // Ask `monad-core` to detect the workspace context.
    //
    // This keeps repository discovery logic out of the CLI crate.
    let workspace_context = match monad_core::workspace::detect_workspace_context_from_current_dir()
    {
        Ok(context) => {
            // Record a successful workspace-root detection diagnostic.
            diagnostics.info(
                "workspace.root_detected",
                format!(
                    "workspace root detected using marker '{}'",
                    context.root_marker
                ),
            );

            context
        }
        Err(error) => {
            // If Monad cannot even read the current directory, this command
            // cannot continue usefully.
            diagnostics.push(
                Diagnostic::error(
                    "workspace.current_directory_unavailable",
                    format!("failed to detect workspace context: {error}"),
                )
                .with_help("check that the current directory exists and is accessible"),
            );

            print_diagnostics(&diagnostics);

            return ExitCode::FAILURE;
        }
    };

    // Copy core values into local variables so the later `println!` calls are
    // easy to read.
    let name = monad_core::NAME;
    let version = monad_core::VERSION;
    let description = monad_core::runtime_description();
    let manifest = monad_core::MANIFEST_FILE_NAME;
    let workspace_root = workspace_context.root_dir.display();
    let workspace_root_marker = workspace_context.root_marker;
    let monad_manifest_found = workspace_context.has_manifest();
    let monad_manifest_status = workspace_context.manifest.status();
    let monad_manifest_expected_path = workspace_context.manifest.expected_path.display();

    // Print basic static runtime identity.
    println!("name: {name}");
    println!("version: {version}");
    println!("description: {description}");
    println!("primary_language: Rust");
    println!("manifest: {manifest}");

    // Print workspace detection information.
    println!("workspace_root: {workspace_root}");
    println!("workspace_root_marker: {workspace_root_marker}");
    println!("monad_manifest_found: {monad_manifest_found}");
    println!("monad_manifest_status: {monad_manifest_status}");
    println!("monad_manifest_expected_path: {monad_manifest_expected_path}");

    // If a manifest was found, print its path and try to parse it.
    if let Some(manifest_path) = workspace_context.manifest.found_path() {
        let monad_manifest_path = manifest_path.display();

        println!("monad_manifest_path: {monad_manifest_path}");

        // Record that the manifest was found before parsing it.
        diagnostics.info(
            "manifest.found",
            format!("Monad manifest found at {monad_manifest_path}"),
        );

        // Load and parse `monad.toml`.
        //
        // If parsing fails, the command fails because an invalid manifest is a
        // real repository health problem.
        let parsed_manifest = match monad_core::manifest::load_monad_manifest(manifest_path) {
            Ok(manifest) => {
                diagnostics.info(
                    "manifest.parsed",
                    format!(
                        "Monad manifest parsed with schema version '{}'",
                        manifest.schema_version
                    ),
                );

                manifest
            }
            Err(error) => {
                diagnostics.push(
                    Diagnostic::error(
                        "manifest.load_failed",
                        format!("failed to load Monad manifest: {error}"),
                    )
                    .with_help("fix monad.toml and run the command again"),
                );

                print_diagnostics(&diagnostics);

                return ExitCode::FAILURE;
            }
        };

        // Print parsed manifest details.
        println!(
            "monad_manifest_schema_version: {}",
            parsed_manifest.schema_version
        );
        println!("workspace_name: {}", parsed_manifest.workspace.name);
        println!("workspace_kind: {}", parsed_manifest.workspace.kind);
        println!("workspace_manifest_root: {}", parsed_manifest.workspace.root);
        println!("adapter_rust_enabled: {}", parsed_manifest.adapters.rust);
        println!("adapter_bun_enabled: {}", parsed_manifest.adapters.bun);
        println!("adapter_python_enabled: {}", parsed_manifest.adapters.python);
        println!("adapter_go_enabled: {}", parsed_manifest.adapters.go);
        println!(
            "policy_non_destructive_sync: {}",
            parsed_manifest.policy.non_destructive_sync
        );
        println!(
            "policy_record_provenance: {}",
            parsed_manifest.policy.record_provenance
        );
        println!(
            "policy_require_dry_run_for_existing_repos: {}",
            parsed_manifest.policy.require_dry_run_for_existing_repos
        );
        println!("command_check: {}", parsed_manifest.commands.check.join(","));
    } else {
        // If no manifest was found, this is not necessarily fatal for `info`.
        //
        // Monad can still inspect the repository. Later commands like `check`
        // may choose to require a manifest.
        diagnostics.push(
            Diagnostic::warning(
                "manifest.missing",
                format!("Monad manifest was not found at {monad_manifest_expected_path}"),
            )
            .with_help("run `monad init` later once initialization is implemented"),
        );
    }

    // Print the diagnostics report after the main info output.
    print_diagnostics(&diagnostics);

    // Tell the operating system the command succeeded.
    ExitCode::SUCCESS
}

/// Diagnoses basic Monad workspace and manifest health.
///
/// `doctor` is evaluative. Unlike `info`, it should tell the user whether
/// the current repository is healthy enough for Monad operations.
fn print_doctor() -> ExitCode {
    // Create a fresh diagnostics report for the doctor command.
    let mut diagnostics = DiagnosticReport::new();

    // Print a simple heading.
    //
    // We are keeping output plain for now so it is easy to read and test.
    println!("doctor: monad workspace health");

    // Detect the workspace context from the current process directory.
    let workspace_context = match monad_core::workspace::detect_workspace_context_from_current_dir()
    {
        Ok(context) => {
            diagnostics.info(
                "workspace.root_detected",
                format!(
                    "workspace root detected at {} using marker '{}'",
                    context.root_dir.display(),
                    context.root_marker
                ),
            );

            context
        }
        Err(error) => {
            diagnostics.push(
                Diagnostic::error(
                    "workspace.current_directory_unavailable",
                    format!("failed to detect workspace context: {error}"),
                )
                .with_help("check that the current directory exists and is accessible"),
            );

            print_diagnostics(&diagnostics);

            return ExitCode::FAILURE;
        }
    };

    // Report core workspace facts in key/value form.
    println!("workspace_root: {}", workspace_context.root_dir.display());
    println!("workspace_root_marker: {}", workspace_context.root_marker);

    // Diagnose manifest presence.
    if let Some(manifest_path) = workspace_context.manifest.found_path() {
        diagnostics.info(
            "manifest.found",
            format!("Monad manifest found at {}", manifest_path.display()),
        );

        println!("monad_manifest_status: found");
        println!("monad_manifest_path: {}", manifest_path.display());

        // Diagnose whether the manifest can be parsed and validated.
        match monad_core::manifest::load_monad_manifest(manifest_path) {
            Ok(manifest) => {
                diagnostics.info(
                    "manifest.parsed",
                    format!(
                        "Monad manifest parsed with supported schema version '{}'",
                        manifest.schema_version
                    ),
                );

                println!("monad_manifest_schema_version: {}", manifest.schema_version);
                println!("workspace_name: {}", manifest.workspace.name);
                println!("workspace_kind: {}", manifest.workspace.kind);
            }
            Err(error) => {
                diagnostics.push(
                    Diagnostic::error(
                        "manifest.load_failed",
                        format!("failed to load Monad manifest: {error}"),
                    )
                    .with_help("fix monad.toml before running Monad workspace operations"),
                );
            }
        }
    } else {
        let expected_path = workspace_context.manifest.expected_path.display();

        diagnostics.push(
            Diagnostic::warning(
                "manifest.missing",
                format!("Monad manifest was not found at {expected_path}"),
            )
            .with_help("run `monad init` later once initialization is implemented"),
        );

        println!("monad_manifest_status: missing");
        println!("monad_manifest_expected_path: {expected_path}");
    }

    // Print diagnostics after all doctor checks have run.
    print_diagnostics(&diagnostics);

    // Summarize the doctor result.
    if diagnostics.has_errors() {
        println!("doctor_status: error");

        // Return failure when doctor finds blocking errors.
        ExitCode::FAILURE
    } else {
        println!("doctor_status: ok");

        // Return success when doctor found no blocking errors.
        //
        // Warnings are allowed for now. Later we may add stricter modes.
        ExitCode::SUCCESS
    }
}

/// Prints CLI help when the user runs `monad` without a subcommand.
fn print_help() -> ExitCode {
    // Ask Clap to construct the command metadata from our derive structs.
    let mut command = Cli::command();

    // Print Clap-generated help.
    match command.print_help() {
        Ok(()) => {
            // Add a trailing newline because `print_help()` does not always
            // produce the final formatting we want.
            println!();

            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("failed to render help output: {error}");

            ExitCode::FAILURE
        }
    }
}

/// Prints a diagnostic report in the current simple key/value CLI style.
///
/// This is deliberately plain for now. Later we can add richer human output
/// and structured JSON output.
fn print_diagnostics(report: &DiagnosticReport) {
    // Build a summary of diagnostic counts.
    let summary = report.summary();

    // Print summary counts first.
    println!("diagnostics_total: {}", summary.total);
    println!("diagnostics_infos: {}", summary.infos);
    println!("diagnostics_warnings: {}", summary.warnings);
    println!("diagnostics_errors: {}", summary.errors);

    // Print each diagnostic.
    for diagnostic in report.diagnostics() {
        println!(
            "diagnostic: {} {} {}",
            diagnostic.severity, diagnostic.code, diagnostic.message
        );

        // Print optional help text when present.
        if let Some(help) = &diagnostic.help {
            println!("diagnostic_help: {} {}", diagnostic.code, help);
        }
    }
}
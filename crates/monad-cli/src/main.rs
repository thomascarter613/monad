#![forbid(unsafe_code)]

// Declare the local `cli` module.
//
// Rust will look for this module in `crates/monad-cli/src/cli.rs`.
mod cli;

// Import `ExitCode`, the standard way for a Rust CLI to report success/failure.
use std::process::ExitCode;

// Import Clap traits.
//
// `Parser` gives us `Cli::parse()`.
// `CommandFactory` gives us `Cli::command()` for rendering help manually.
use clap::{CommandFactory, Parser};

// Import our CLI argument structs and command enum from the local `cli` module.
use crate::cli::{Cli, Commands};

/// Initial Monad CLI entrypoint.
///
/// `#[tokio::main]` starts the Tokio async runtime before running `main`.
/// Even though this command is still mostly synchronous, Tokio is introduced
/// immediately because the accepted ADRs require it.
#[tokio::main]
async fn main() -> ExitCode {
    // Parse command-line arguments into our typed `Cli` struct.
    let cli = Cli::parse();

    // Dispatch based on which subcommand was provided.
    match cli.command {
        // If the user ran `monad info`, print repository/runtime information.
        Some(Commands::Info) => print_info(),

        // If the user ran only `monad`, show help instead of doing nothing.
        None => print_help(),
    }
}

/// Prints initial Monad runtime and workspace information.
fn print_info() -> ExitCode {
    // Ask monad-core to detect the workspace context.
    //
    // This keeps repository discovery logic out of the CLI crate.
    let workspace_context = match monad_core::workspace::detect_workspace_context_from_current_dir()
    {
        Ok(context) => context,
        Err(error) => {
            eprintln!("failed to detect workspace context: {error}");
            return ExitCode::FAILURE;
        }
    };

    // Copy core values into local variables so the later println! calls are
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

        // Load and parse `monad.toml`.
        //
        // If parsing fails, the command fails because an invalid manifest is a
        // real repository health problem.
        let parsed_manifest = match monad_core::manifest::load_monad_manifest(manifest_path) {
            Ok(manifest) => manifest,
            Err(error) => {
                eprintln!("failed to load Monad manifest: {error}");
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
            parsed_manifest
                .policy
                .require_dry_run_for_existing_repos
        );
        println!(
            "command_check: {}",
            parsed_manifest.commands.check.join(",")
        );
    }

    // Tell the operating system the command succeeded.
    ExitCode::SUCCESS
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
#![forbid(unsafe_code)]

mod cli;

use std::process::ExitCode;

use clap::{CommandFactory, Parser};

use crate::cli::{Cli, Commands};

/// Initial Monad CLI entrypoint.
///
/// This commit introduces real command parsing through `clap` while keeping
/// the command surface intentionally small. Runtime behavior will be expanded
/// in later implementation slices.
#[tokio::main]
async fn main() -> ExitCode {
    let cli = Cli::parse();

    match cli.command {
        Some(Commands::Info) => print_info(),
        None => print_help(),
    }
}

fn print_info() -> ExitCode {
    let workspace_context = match monad_core::workspace::detect_workspace_context_from_current_dir()
    {
        Ok(context) => context,
        Err(error) => {
            eprintln!("failed to detect workspace context: {error}");
            return ExitCode::FAILURE;
        }
    };

    let name = monad_core::NAME;
    let version = monad_core::VERSION;
    let description = monad_core::runtime_description();
    let manifest = monad_core::MANIFEST_FILE_NAME;
    let workspace_root = workspace_context.root_dir.display();
    let workspace_root_marker = workspace_context.root_marker;
    let monad_manifest_found = workspace_context.has_manifest();
    let monad_manifest_status = workspace_context.manifest.status();
    let monad_manifest_expected_path = workspace_context.manifest.expected_path.display();

    println!("name: {name}");
    println!("version: {version}");
    println!("description: {description}");
    println!("primary_language: Rust");
    println!("manifest: {manifest}");
    println!("workspace_root: {workspace_root}");
    println!("workspace_root_marker: {workspace_root_marker}");
    println!("monad_manifest_found: {monad_manifest_found}");
    println!("monad_manifest_status: {monad_manifest_status}");
    println!("monad_manifest_expected_path: {monad_manifest_expected_path}");

    if let Some(manifest_path) = workspace_context.manifest.found_path() {
        let monad_manifest_path = manifest_path.display();
        println!("monad_manifest_path: {monad_manifest_path}");
    }

    ExitCode::SUCCESS
}

fn print_help() -> ExitCode {
    let mut command = Cli::command();

    match command.print_help() {
        Ok(()) => {
            println!();
            ExitCode::SUCCESS
        }
        Err(error) => {
            eprintln!("failed to render help output: {error}");
            ExitCode::FAILURE
        }
    }
}
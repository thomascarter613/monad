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

    println!("name: {}", monad_core::NAME);
    println!("version: {}", monad_core::VERSION);
    println!("description: {}", monad_core::runtime_description());
    println!("primary_language: Rust");
    println!("manifest: {}", monad_core::MANIFEST_FILE_NAME);
    println!(
        "workspace_root: {}",
        workspace_context.root_dir.display()
    );
    println!("workspace_root_marker: {}", workspace_context.root_marker);
    println!("monad_manifest_found: {}", workspace_context.has_manifest());

    if let Some(manifest_path) = workspace_context.manifest_path {
        println!("monad_manifest_path: {}", manifest_path.display());
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
use clap::{Parser, Subcommand};

/// Monad is a Rust-native polyglot repo runtime and developer-experience CLI.
#[derive(Debug, Parser)]
#[command(
    name = "monad",
    version,
    about = "Rust-native polyglot repo runtime and developer-experience CLI",
    long_about = "Monad coordinates native ecosystem tools through one coherent CLI for polyglot repositories."
)]
pub struct Cli {
    /// Command to execute.
    #[command(subcommand)]
    pub command: Option<Commands>,
}

/// Monad command surface.
#[derive(Debug, Subcommand)]
pub enum Commands {
    /// Display repository/runtime information detected by Monad.
    Info,
}

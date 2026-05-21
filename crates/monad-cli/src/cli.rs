// Import Clap's derive macros and traits.
//
// `Parser` lets us define the top-level CLI shape as a Rust struct.
// `Subcommand` lets us define subcommands as a Rust enum.
use clap::{Parser, Subcommand};

/// Monad is a Rust-native polyglot repo runtime and developer-experience CLI.
///
/// This struct describes the top-level `monad` command.
///
/// The `#[derive(Parser)]` macro asks Clap to generate command-line parsing
/// code for this struct at compile time.
#[derive(Debug, Parser)]
#[command(
    // Sets the command name displayed in help output.
    name = "monad",

    // Enables `monad --version` using the Cargo package version.
    version,

    // Short help text shown by `monad --help`.
    about = "Rust-native polyglot repo runtime and developer-experience CLI",

    // Longer help text shown in expanded help output.
    long_about = "Monad coordinates native ecosystem tools through one coherent CLI for polyglot repositories."
)]
pub struct Cli {
    /// Command to execute.
    ///
    /// `Option<Commands>` means the user may either:
    /// - provide a subcommand, such as `monad info`;
    /// - or provide no subcommand, such as just `monad`.
    ///
    /// When no subcommand is provided, `command` will be `None`.
    #[command(subcommand)]
    pub command: Option<Commands>,
}

/// Monad command surface.
///
/// Each enum variant becomes a subcommand.
///
/// For example:
/// - `Info` becomes `monad info`;
/// - `Doctor` becomes `monad doctor`;
/// - `Check` becomes `monad check`.
#[derive(Debug, Subcommand)]
pub enum Commands {
    /// Display repository/runtime information detected by Monad.
    Info,

    /// Diagnose basic Monad workspace and manifest health.
    Doctor,

    /// Run the initial Monad repository check skeleton.
    Check,
}
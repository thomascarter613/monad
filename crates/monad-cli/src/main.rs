#![forbid(unsafe_code)]

use std::process::ExitCode;

/// Initial Monad CLI entrypoint.
///
/// This deliberately does not implement the final command surface yet.
/// The purpose of this scaffold is to prove that:
///
/// 1. the Rust workspace compiles;
/// 2. the `monad` binary exists;
/// 3. `monad-cli` depends on `monad-core`;
/// 4. Tokio is introduced immediately.
#[tokio::main]
async fn main() -> ExitCode {
    println!("{} {}", monad_core::NAME, monad_core::VERSION);
    println!("{}", monad_core::runtime_description());

    ExitCode::SUCCESS
}

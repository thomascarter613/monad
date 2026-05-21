#![forbid(unsafe_code)]

//! Core runtime library for Monad.
//!
//! `//!` comments are crate-level documentation comments.
//! They document the crate itself rather than one specific item.
//!
//! This crate will contain workspace discovery, manifest handling,
//! diagnostics, adapter traits, file operation models, execution planning,
//! graph construction, policy foundations, and AI-readable context support.
//!
//! The CLI crate should depend on this crate. This crate must not depend on
//! the CLI crate.

/// Exposes the manifest module to other crates.
///
/// `pub mod manifest;` means:
/// - Rust should compile `manifest.rs`;
/// - other crates may access it as `monad_core::manifest`.
pub mod manifest;

/// Exposes the workspace module to other crates.
///
/// This lets the CLI call workspace discovery logic without owning that logic.
pub mod workspace;

/// Canonical product/runtime name.
///
/// `pub const` creates a public compile-time constant.
pub const NAME: &str = "monad";

/// Current crate version, inherited from Cargo package metadata.
///
/// `env!` is a compile-time macro. Cargo sets `CARGO_PKG_VERSION`
/// automatically from the package version.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

/// Canonical Monad manifest filename.
///
/// This keeps the filename in one place so the rest of the code does not
/// hard-code `"monad.toml"` repeatedly.
pub const MANIFEST_FILE_NAME: &str = "monad.toml";

/// Returns a short runtime description used by the initial CLI.
///
/// `#[must_use]` asks the compiler to warn if callers ignore the return value.
#[must_use]
pub fn runtime_description() -> &'static str {
    // `&'static str` means this string lives for the entire program.
    "Rust-native polyglot repo runtime and developer-experience CLI"
}

/// Tests that belong to this file.
///
/// `#[cfg(test)]` means Rust only compiles this module during `cargo test`.
#[cfg(test)]
mod tests {
    // `use super::*;` imports the public items from the parent module.
    use super::*;

    /// Verifies the core runtime identity constants are exposed correctly.
    #[test]
    fn exposes_runtime_identity() {
        assert_eq!(NAME, "monad");
        assert!(!VERSION.is_empty());
        assert!(runtime_description().contains("polyglot repo runtime"));
    }

    /// Verifies the canonical manifest filename remains stable.
    #[test]
    fn exposes_manifest_file_name() {
        assert_eq!(MANIFEST_FILE_NAME, "monad.toml");
    }
}
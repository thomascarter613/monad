#![forbid(unsafe_code)]

//! Core runtime library for Monad.
//!
//! This crate will contain workspace discovery, manifest handling,
//! diagnostics, adapter traits, file operation models, execution planning,
//! graph construction, policy foundations, and AI-readable context support.
//!
//! The CLI crate should depend on this crate. This crate must not depend on
//! the CLI crate.

/// Canonical product/runtime name.
pub const NAME: &str = "monad";

/// Current crate version, inherited from Cargo package metadata.
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

/// Returns a short runtime description used by the initial CLI scaffold.
///
/// This is intentionally small. Real command behavior will be introduced in
/// later implementation commits.
#[must_use]
pub fn runtime_description() -> &'static str {
    "Rust-native polyglot repo runtime and developer-experience CLI"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn exposes_runtime_identity() {
        assert_eq!(NAME, "monad");
        assert!(!VERSION.is_empty());
        assert!(runtime_description().contains("polyglot repo runtime"));
    }
}

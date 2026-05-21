// Import standard library traits and types used by this module.
use std::error::Error;
use std::fmt;
use std::fs;
use std::path::{Path, PathBuf};

// Import `Deserialize`, the derive trait that lets Serde parse TOML into structs.
use serde::Deserialize;

// Import the canonical manifest filename from the crate root.
use crate::MANIFEST_FILE_NAME;

/// The only manifest schema version this first parser accepts.
///
/// Keeping this as a constant avoids scattering `"0.1"` throughout the code.
pub const SUPPORTED_SCHEMA_VERSION: &str = "0.1";

/// Detection status for the canonical Monad manifest.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MonadManifestStatus {
    /// `monad.toml` exists at the expected location.
    Found,

    /// `monad.toml` does not exist at the expected location.
    Missing,
}

impl MonadManifestStatus {
    /// Returns a stable machine-readable label for this status.
    #[must_use]
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::Found => "found",
            Self::Missing => "missing",
        }
    }
}

/// Implements user-facing string formatting for `MonadManifestStatus`.
///
/// This lets us print the enum with `{}` in `println!`.
impl fmt::Display for MonadManifestStatus {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.as_str())
    }
}

/// Result of detecting the canonical Monad manifest at a workspace root.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct MonadManifestDetection {
    /// Expected location of the canonical Monad manifest.
    pub expected_path: PathBuf,

    /// Found manifest path, if the manifest exists.
    pub found_path: Option<PathBuf>,
}

impl MonadManifestDetection {
    /// Creates a manifest detection result for a found manifest.
    #[must_use]
    pub fn found(path: PathBuf) -> Self {
        Self {
            expected_path: path.clone(),
            found_path: Some(path),
        }
    }

    /// Creates a manifest detection result for a missing manifest.
    #[must_use]
    pub const fn missing(expected_path: PathBuf) -> Self {
        Self {
            expected_path,
            found_path: None,
        }
    }

    /// Returns whether the manifest was found.
    #[must_use]
    pub fn is_found(&self) -> bool {
        self.found_path.is_some()
    }

    /// Returns the manifest detection status.
    #[must_use]
    pub fn status(&self) -> MonadManifestStatus {
        if self.is_found() {
            MonadManifestStatus::Found
        } else {
            MonadManifestStatus::Missing
        }
    }

    /// Returns the found manifest path, if present.
    ///
    /// `as_deref()` converts `Option<PathBuf>` into `Option<&Path>`.
    /// That lets callers borrow the path without taking ownership of it.
    #[must_use]
    pub fn found_path(&self) -> Option<&Path> {
        self.found_path.as_deref()
    }
}

/// Parsed representation of `monad.toml`.
///
/// `#[serde(deny_unknown_fields)]` makes parsing fail if the TOML file contains
/// unknown keys. This is intentional because Monad should not silently ignore
/// likely typos in governance-grade configuration.
///
/// `Deserialize` lets Serde construct this struct from TOML.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct MonadManifest {
    /// Manifest schema version, for example `"0.1"`.
    pub schema_version: String,

    /// Workspace-level manifest section.
    pub workspace: ManifestWorkspace,

    /// Enabled ecosystem adapters.
    pub adapters: ManifestAdapters,

    /// Repo safety and evolution policy settings.
    pub policy: ManifestPolicy,

    /// Repo-level command aliases.
    pub commands: ManifestCommands,
}

/// Parsed `[workspace]` section from `monad.toml`.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ManifestWorkspace {
    /// Human-readable workspace name.
    pub name: String,

    /// Workspace kind, such as `"polyglot-repo-runtime"`.
    pub kind: String,

    /// Workspace root as written in the manifest.
    pub root: String,
}

/// Parsed `[adapters]` section from `monad.toml`.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ManifestAdapters {
    /// Whether the Rust/Cargo adapter is enabled.
    pub rust: bool,

    /// Whether the Bun/TypeScript adapter is enabled.
    pub bun: bool,

    /// Whether the Python adapter is enabled.
    pub python: bool,

    /// Whether the Go adapter is enabled.
    pub go: bool,
}

/// Parsed `[policy]` section from `monad.toml`.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ManifestPolicy {
    /// Whether repo sync/evolution should avoid destructive behavior by default.
    pub non_destructive_sync: bool,

    /// Whether Monad should record provenance for generated or changed artifacts.
    pub record_provenance: bool,

    /// Whether existing repos should require dry-run behavior before mutation.
    pub require_dry_run_for_existing_repos: bool,
}

/// Parsed `[commands]` section from `monad.toml`.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ManifestCommands {
    /// Ordered command identifiers that make up `monad check`.
    pub check: Vec<String>,
}

/// Error type for loading and parsing `monad.toml`.
///
/// This is intentionally not a plain string. Rust error enums let callers match
/// on specific failure kinds later.
#[derive(Debug)]
pub enum MonadManifestLoadError {
    /// The manifest file could not be read from disk.
    Read {
        /// Path that failed to read.
        path: PathBuf,

        /// Original IO error from the standard library.
        source: std::io::Error,
    },

    /// The manifest file was read but could not be parsed as valid TOML
    /// matching the expected struct shape.
    Parse {
        /// Path that failed to parse.
        path: PathBuf,

        /// Original TOML parser error.
        source: toml::de::Error,
    },

    /// The manifest parsed successfully, but the schema version is unsupported.
    UnsupportedSchemaVersion {
        /// Path containing the unsupported schema version.
        path: PathBuf,

        /// Schema version found in the file.
        found: String,

        /// Schema version supported by this implementation.
        supported: &'static str,
    },
}

/// Implements user-facing error messages for manifest loading failures.
impl fmt::Display for MonadManifestLoadError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Read { path, source } => {
                write!(
                    formatter,
                    "failed to read Monad manifest at {}: {source}",
                    path.display()
                )
            }
            Self::Parse { path, source } => {
                write!(
                    formatter,
                    "failed to parse Monad manifest at {}: {source}",
                    path.display()
                )
            }
            Self::UnsupportedSchemaVersion {
                path,
                found,
                supported,
            } => {
                write!(
                    formatter,
                    "unsupported Monad manifest schema version at {}: found {found}, supported {supported}",
                    path.display()
                )
            }
        }
    }
}

/// Implements the standard Rust error trait.
///
/// This lets `MonadManifestLoadError` work with normal Rust error handling,
/// including `Box<dyn Error>` in tests and future higher-level diagnostics.
impl Error for MonadManifestLoadError {
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        match self {
            Self::Read { source, .. } => Some(source),
            Self::Parse { source, .. } => Some(source),
            Self::UnsupportedSchemaVersion { .. } => None,
        }
    }
}

/// Detects `monad.toml` at a workspace root.
#[must_use]
pub fn detect_monad_manifest_at(root_dir: &Path) -> MonadManifestDetection {
    // Construct the expected root-level path: `<root>/monad.toml`.
    let expected_path = root_dir.join(MANIFEST_FILE_NAME);

    // If the path is a file, return a "found" detection result.
    if expected_path.is_file() {
        MonadManifestDetection::found(expected_path)
    } else {
        // Otherwise return a "missing" detection result with the expected path.
        MonadManifestDetection::missing(expected_path)
    }
}

/// Loads, parses, and validates a Monad manifest from disk.
pub fn load_monad_manifest(path: &Path) -> Result<MonadManifest, MonadManifestLoadError> {
    // Read the file contents into a string.
    //
    // If reading fails, convert the standard IO error into our domain error.
    let contents = fs::read_to_string(path).map_err(|source| MonadManifestLoadError::Read {
        path: path.to_path_buf(),
        source,
    })?;

    // Parse the TOML string into our strongly typed Rust struct.
    //
    // If parsing fails, convert the TOML parser error into our domain error.
    let manifest =
        parse_monad_manifest_str(&contents).map_err(|source| MonadManifestLoadError::Parse {
            path: path.to_path_buf(),
            source,
        })?;

    // Validate the schema version before returning the manifest.
    validate_manifest_schema_version(path, &manifest)?;

    // Return the parsed and validated manifest.
    Ok(manifest)
}

/// Parses TOML text into a `MonadManifest`.
///
/// This function does not read from disk. That makes it easy to unit test.
pub fn parse_monad_manifest_str(contents: &str) -> Result<MonadManifest, toml::de::Error> {
    toml::from_str(contents)
}

/// Validates that a parsed manifest uses the supported schema version.
fn validate_manifest_schema_version(
    path: &Path,
    manifest: &MonadManifest,
) -> Result<(), MonadManifestLoadError> {
    // If the schema version matches the supported version, validation succeeds.
    if manifest.schema_version == SUPPORTED_SCHEMA_VERSION {
        return Ok(());
    }

    // Otherwise return a domain error with enough information to explain the
    // problem to the user.
    Err(MonadManifestLoadError::UnsupportedSchemaVersion {
        path: path.to_path_buf(),
        found: manifest.schema_version.clone(),
        supported: SUPPORTED_SCHEMA_VERSION,
    })
}

/// Tests for manifest detection and parsing.
#[cfg(test)]
mod tests {
    // Import standard test helpers.
    use std::error::Error;
    use std::fs::{self, File};

    // Import the module items under test.
    use super::*;

    /// A valid initial Monad manifest used by parser tests.
    const VALID_MANIFEST: &str = r#"
schema_version = "0.1"

[workspace]
name = "monad"
kind = "polyglot-repo-runtime"
root = "."

[adapters]
rust = true
bun = true
python = false
go = false

[policy]
non_destructive_sync = true
record_provenance = true
require_dry_run_for_existing_repos = true

[commands]
check = ["rust:fmt", "rust:clippy", "rust:test"]
"#;

    /// Verifies detection succeeds when `monad.toml` exists.
    #[test]
    fn detects_found_manifest() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let manifest_path = temp_dir.path().join(MANIFEST_FILE_NAME);

        File::create(&manifest_path)?;

        let detection = detect_monad_manifest_at(temp_dir.path());

        assert_eq!(detection.expected_path, manifest_path);
        assert_eq!(detection.found_path(), Some(manifest_path.as_path()));
        assert_eq!(detection.status(), MonadManifestStatus::Found);
        assert!(detection.is_found());

        Ok(())
    }

    /// Verifies detection reports missing when `monad.toml` does not exist.
    #[test]
    fn detects_missing_manifest() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let expected_path = temp_dir.path().join(MANIFEST_FILE_NAME);

        let detection = detect_monad_manifest_at(temp_dir.path());

        assert_eq!(detection.expected_path, expected_path);
        assert_eq!(detection.found_path(), None);
        assert_eq!(detection.status(), MonadManifestStatus::Missing);
        assert!(!detection.is_found());

        Ok(())
    }

    /// Verifies stable status labels remain unchanged.
    #[test]
    fn exposes_stable_status_labels() {
        assert_eq!(MonadManifestStatus::Found.as_str(), "found");
        assert_eq!(MonadManifestStatus::Missing.as_str(), "missing");
    }

    /// Verifies valid TOML parses into strongly typed Rust structs.
    #[test]
    fn parses_valid_manifest_contents() -> Result<(), Box<dyn Error>> {
        let manifest = parse_monad_manifest_str(VALID_MANIFEST)?;

        assert_eq!(manifest.schema_version, "0.1");
        assert_eq!(manifest.workspace.name, "monad");
        assert_eq!(manifest.workspace.kind, "polyglot-repo-runtime");
        assert_eq!(manifest.workspace.root, ".");
        assert!(manifest.adapters.rust);
        assert!(manifest.adapters.bun);
        assert!(!manifest.adapters.python);
        assert!(!manifest.adapters.go);
        assert!(manifest.policy.non_destructive_sync);
        assert!(manifest.policy.record_provenance);
        assert!(manifest.policy.require_dry_run_for_existing_repos);
        assert_eq!(manifest.commands.check.len(), 3);
        assert!(manifest
            .commands
            .check
            .iter()
            .any(|command| command == "rust:test"));

        Ok(())
    }

    /// Verifies loading from disk succeeds for a valid manifest.
    #[test]
    fn loads_valid_manifest_from_disk() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let manifest_path = temp_dir.path().join(MANIFEST_FILE_NAME);

        fs::write(&manifest_path, VALID_MANIFEST)?;

        let manifest = load_monad_manifest(&manifest_path)?;

        assert_eq!(manifest.schema_version, SUPPORTED_SCHEMA_VERSION);
        assert_eq!(manifest.workspace.name, "monad");

        Ok(())
    }

    /// Verifies unsupported schema versions produce a typed error.
    #[test]
    fn rejects_unsupported_schema_version() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let manifest_path = temp_dir.path().join(MANIFEST_FILE_NAME);

        let unsupported_manifest = VALID_MANIFEST.replace(
            r#"schema_version = "0.1""#,
            r#"schema_version = "999.0""#,
        );

        fs::write(&manifest_path, unsupported_manifest)?;

        let result = load_monad_manifest(&manifest_path);

        match result {
            Err(MonadManifestLoadError::UnsupportedSchemaVersion {
                found, supported, ..
            }) => {
                assert_eq!(found, "999.0");
                assert_eq!(supported, SUPPORTED_SCHEMA_VERSION);
            }
            other => {
                panic!("expected unsupported schema version error, got {other:?}");
            }
        }

        Ok(())
    }

    /// Verifies unknown fields fail parsing.
    ///
    /// This protects against typos silently passing validation.
    #[test]
    fn rejects_unknown_fields() {
        let manifest_with_unknown_field = r#"
schema_version = "0.1"
unknown = true

[workspace]
name = "monad"
kind = "polyglot-repo-runtime"
root = "."

[adapters]
rust = true
bun = true
python = false
go = false

[policy]
non_destructive_sync = true
record_provenance = true
require_dry_run_for_existing_repos = true

[commands]
check = ["rust:fmt"]
"#;

        let result = parse_monad_manifest_str(manifest_with_unknown_field);

        assert!(result.is_err());
    }
}
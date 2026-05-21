use std::fmt;
use std::path::{Path, PathBuf};

use crate::MANIFEST_FILE_NAME;

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
    #[must_use]
    pub fn found_path(&self) -> Option<&Path> {
        self.found_path.as_deref()
    }
}

/// Detects `monad.toml` at a workspace root.
#[must_use]
pub fn detect_monad_manifest_at(root_dir: &Path) -> MonadManifestDetection {
    let expected_path = root_dir.join(MANIFEST_FILE_NAME);

    if expected_path.is_file() {
        MonadManifestDetection::found(expected_path)
    } else {
        MonadManifestDetection::missing(expected_path)
    }
}

#[cfg(test)]
mod tests {
    use std::error::Error;
    use std::fs::File;

    use super::*;

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

    #[test]
    fn exposes_stable_status_labels() {
        assert_eq!(MonadManifestStatus::Found.as_str(), "found");
        assert_eq!(MonadManifestStatus::Missing.as_str(), "missing");
    }
}
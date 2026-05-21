use std::env;
use std::error::Error;
use std::fmt;
use std::fs;
use std::path::{Path, PathBuf};

use crate::MANIFEST_FILE_NAME;
use crate::manifest::{MonadManifestDetection, detect_monad_manifest_at};

/// Describes how Monad identified the workspace root.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WorkspaceRootMarker {
    /// A `monad.toml` manifest was found.
    MonadManifest,

    /// A `.git` directory or file was found.
    GitDirectory,

    /// A Cargo manifest containing a `[workspace]` table was found.
    CargoWorkspaceManifest,

    /// No known root marker was found, so Monad fell back to the start directory.
    CurrentDirectory,
}

impl WorkspaceRootMarker {
    /// Returns a stable machine-readable label for the marker.
    #[must_use]
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::MonadManifest => "monad-manifest",
            Self::GitDirectory => "git-directory",
            Self::CargoWorkspaceManifest => "cargo-workspace-manifest",
            Self::CurrentDirectory => "current-directory",
        }
    }
}

impl fmt::Display for WorkspaceRootMarker {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.as_str())
    }
}

/// Repository workspace context detected by Monad.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WorkspaceContext {
    /// Directory from which detection began.
    pub start_dir: PathBuf,

    /// Detected workspace root directory.
    pub root_dir: PathBuf,

    /// Marker used to identify the root directory.
    pub root_marker: WorkspaceRootMarker,

    /// Detection result for the canonical Monad manifest.
    pub manifest: MonadManifestDetection,
}

impl WorkspaceContext {
    /// Returns whether a Monad manifest was found at the detected workspace root.
    #[must_use]
    pub fn has_manifest(&self) -> bool {
        self.manifest.is_found()
    }
}

/// Error returned when Monad cannot detect workspace context.
#[derive(Debug)]
pub enum WorkspaceDetectionError {
    /// The current process directory could not be read.
    CurrentDirectoryUnavailable(std::io::Error),
}

impl fmt::Display for WorkspaceDetectionError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::CurrentDirectoryUnavailable(error) => {
                write!(formatter, "failed to read current directory: {error}")
            }
        }
    }
}

impl Error for WorkspaceDetectionError {
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        match self {
            Self::CurrentDirectoryUnavailable(error) => Some(error),
        }
    }
}

/// Detects the workspace context from the current process directory.
pub fn detect_workspace_context_from_current_dir()
-> Result<WorkspaceContext, WorkspaceDetectionError> {
    let current_dir = env::current_dir().map_err(WorkspaceDetectionError::CurrentDirectoryUnavailable)?;

    Ok(detect_workspace_context_from(&current_dir))
}

/// Detects the workspace context from a specific starting directory.
///
/// Detection priority is:
///
/// 1. nearest ancestor containing `monad.toml`;
/// 2. nearest ancestor containing `.git`;
/// 3. nearest ancestor containing a Cargo manifest with `[workspace]`;
/// 4. the provided starting directory.
#[must_use]
pub fn detect_workspace_context_from(start_dir: &Path) -> WorkspaceContext {
    let start_dir = start_dir.to_path_buf();

    if let Some(root_dir) = find_ancestor_with_monad_manifest(&start_dir) {
        return build_context(start_dir, root_dir, WorkspaceRootMarker::MonadManifest);
    }

    if let Some(root_dir) = find_ancestor_with_git_marker(&start_dir) {
        return build_context(start_dir, root_dir, WorkspaceRootMarker::GitDirectory);
    }

    if let Some(root_dir) = find_ancestor_with_cargo_workspace_manifest(&start_dir) {
        return build_context(
            start_dir,
            root_dir,
            WorkspaceRootMarker::CargoWorkspaceManifest,
        );
    }

    build_context(
        start_dir.clone(),
        start_dir,
        WorkspaceRootMarker::CurrentDirectory,
    )
}

fn build_context(
    start_dir: PathBuf,
    root_dir: PathBuf,
    root_marker: WorkspaceRootMarker,
) -> WorkspaceContext {
    let manifest = detect_monad_manifest_at(&root_dir);

    WorkspaceContext {
        start_dir,
        root_dir,
        root_marker,
        manifest,
    }
}

fn find_ancestor_with_monad_manifest(start_dir: &Path) -> Option<PathBuf> {
    start_dir
        .ancestors()
        .find(|candidate| candidate.join(MANIFEST_FILE_NAME).is_file())
        .map(Path::to_path_buf)
}

fn find_ancestor_with_git_marker(start_dir: &Path) -> Option<PathBuf> {
    start_dir
        .ancestors()
        .find(|candidate| candidate.join(".git").exists())
        .map(Path::to_path_buf)
}

fn find_ancestor_with_cargo_workspace_manifest(start_dir: &Path) -> Option<PathBuf> {
    start_dir
        .ancestors()
        .find(|candidate| cargo_manifest_declares_workspace(&candidate.join("Cargo.toml")))
        .map(Path::to_path_buf)
}

fn cargo_manifest_declares_workspace(path: &Path) -> bool {
    let Ok(contents) = fs::read_to_string(path) else {
        return false;
    };

    contents.lines().any(|line| line.trim() == "[workspace]")
}

#[cfg(test)]
mod tests {
    use std::fs::{self, File};

    use crate::manifest::MonadManifestStatus;

    use super::*;

    #[test]
    fn detects_monad_manifest_before_git_marker() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let root = temp_dir.path();
        let manifest_path = root.join(MANIFEST_FILE_NAME);

        fs::create_dir(root.join(".git"))?;
        File::create(&manifest_path)?;

        let nested = root.join("crates").join("monad-cli").join("src");
        fs::create_dir_all(&nested)?;

        let context = detect_workspace_context_from(&nested);

        assert_eq!(context.start_dir, nested);
        assert_eq!(context.root_dir, root);
        assert_eq!(context.root_marker, WorkspaceRootMarker::MonadManifest);
        assert_eq!(context.manifest.found_path(), Some(manifest_path.as_path()));
        assert_eq!(context.manifest.status(), MonadManifestStatus::Found);
        assert!(context.has_manifest());

        Ok(())
    }

    #[test]
    fn detects_git_marker_when_monad_manifest_is_absent() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let root = temp_dir.path();

        fs::create_dir(root.join(".git"))?;

        let nested = root.join("crates").join("monad-core").join("src");
        fs::create_dir_all(&nested)?;

        let context = detect_workspace_context_from(&nested);

        assert_eq!(context.start_dir, nested);
        assert_eq!(context.root_dir, root);
        assert_eq!(context.root_marker, WorkspaceRootMarker::GitDirectory);
        assert_eq!(context.manifest.found_path(), None);
        assert_eq!(context.manifest.status(), MonadManifestStatus::Missing);
        assert!(!context.has_manifest());

        Ok(())
    }

    #[test]
    fn detects_cargo_workspace_manifest_when_git_marker_is_absent() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let root = temp_dir.path();

        fs::write(
            root.join("Cargo.toml"),
            r#"
[workspace]
members = ["crates/example"]
"#,
        )?;

        let nested = root.join("crates").join("example").join("src");
        fs::create_dir_all(&nested)?;

        let context = detect_workspace_context_from(&nested);

        assert_eq!(context.start_dir, nested);
        assert_eq!(context.root_dir, root);
        assert_eq!(
            context.root_marker,
            WorkspaceRootMarker::CargoWorkspaceManifest
        );
        assert_eq!(context.manifest.found_path(), None);

        Ok(())
    }

    #[test]
    fn falls_back_to_start_directory_when_no_marker_exists() -> Result<(), Box<dyn Error>> {
        let temp_dir = tempfile::tempdir()?;
        let start = temp_dir.path().join("standalone");
        fs::create_dir_all(&start)?;

        let context = detect_workspace_context_from(&start);

        assert_eq!(context.start_dir, start);
        assert_eq!(context.root_dir, context.start_dir);
        assert_eq!(context.root_marker, WorkspaceRootMarker::CurrentDirectory);
        assert_eq!(context.manifest.found_path(), None);

        Ok(())
    }
}
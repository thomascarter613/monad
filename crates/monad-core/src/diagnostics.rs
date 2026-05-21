// Import `fmt` from Rust's standard library.
//
// The `fmt` module lets us implement `Display`, which controls how a type is
// printed with `{}` in macros like `println!`.
use std::fmt;

/// Severity level for a Monad diagnostic.
///
/// A diagnostic is a structured message about repository health, command
/// behavior, configuration, or runtime state.
///
/// `Copy` is safe here because this enum is tiny and contains no heap data.
/// `Eq` and `PartialEq` let us compare severities in tests.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DiagnosticSeverity {
    /// Informational diagnostic.
    ///
    /// This means Monad observed something useful, but not problematic.
    Info,

    /// Warning diagnostic.
    ///
    /// This means something may need attention, but the command can usually
    /// continue.
    Warning,

    /// Error diagnostic.
    ///
    /// This means something is invalid, broken, or blocking.
    Error,
}

impl DiagnosticSeverity {
    /// Returns a stable machine-readable label for the severity.
    ///
    /// We use lowercase strings because these are friendly for CLI output,
    /// JSON output, logs, snapshots, and future machine-readable reports.
    #[must_use]
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::Info => "info",
            Self::Warning => "warning",
            Self::Error => "error",
        }
    }
}

/// Implements user-facing string formatting for `DiagnosticSeverity`.
///
/// After this implementation, we can write:
///
/// ```rust
/// # use monad_core::diagnostics::DiagnosticSeverity;
/// println!("{}", DiagnosticSeverity::Info);
/// ```
///
/// and it will print:
///
/// ```text
/// info
/// ```
impl fmt::Display for DiagnosticSeverity {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.as_str())
    }
}

/// A single Monad diagnostic.
///
/// This struct is intentionally small for now. It gives us a typed foundation
/// that future commands can reuse without committing to a final diagnostics UI.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    /// Stable diagnostic code.
    ///
    /// Codes should be stable enough for tests, docs, and future JSON output.
    /// Example: `"workspace.root_detected"`.
    pub code: String,

    /// Diagnostic severity.
    pub severity: DiagnosticSeverity,

    /// Human-readable diagnostic message.
    pub message: String,

    /// Optional suggested next action.
    ///
    /// `Option<String>` means:
    /// - `Some(value)` when help text exists;
    /// - `None` when there is no help text.
    pub help: Option<String>,
}

impl Diagnostic {
    /// Creates a generic diagnostic.
    ///
    /// The `impl Into<String>` parameters let callers pass either:
    /// - a `String`;
    /// - or a string literal like `"hello"`.
    ///
    /// Rust converts the value into a `String` inside this function.
    #[must_use]
    pub fn new(
        severity: DiagnosticSeverity,
        code: impl Into<String>,
        message: impl Into<String>,
    ) -> Self {
        Self {
            code: code.into(),
            severity,
            message: message.into(),
            help: None,
        }
    }

    /// Creates an informational diagnostic.
    #[must_use]
    pub fn info(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self::new(DiagnosticSeverity::Info, code, message)
    }

    /// Creates a warning diagnostic.
    #[must_use]
    pub fn warning(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self::new(DiagnosticSeverity::Warning, code, message)
    }

    /// Creates an error diagnostic.
    #[must_use]
    pub fn error(code: impl Into<String>, message: impl Into<String>) -> Self {
        Self::new(DiagnosticSeverity::Error, code, message)
    }

    /// Adds help text to a diagnostic.
    ///
    /// This method takes ownership of `self`, modifies it, and returns it.
    /// That allows a builder-style pattern:
    ///
    /// ```rust
    /// # use monad_core::diagnostics::Diagnostic;
    /// let diagnostic = Diagnostic::warning("code", "message")
    ///     .with_help("try this");
    /// ```
    #[must_use]
    pub fn with_help(mut self, help: impl Into<String>) -> Self {
        self.help = Some(help.into());
        self
    }
}

/// Summary counts for a diagnostic report.
///
/// This is useful for command output such as:
///
/// ```text
/// diagnostics_total: 3
/// diagnostics_errors: 0
/// diagnostics_warnings: 1
/// diagnostics_infos: 2
/// ```
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DiagnosticSummary {
    /// Total number of diagnostics.
    pub total: usize,

    /// Number of informational diagnostics.
    pub infos: usize,

    /// Number of warning diagnostics.
    pub warnings: usize,

    /// Number of error diagnostics.
    pub errors: usize,
}

impl DiagnosticSummary {
    /// Returns whether the summary contains at least one error.
    #[must_use]
    pub const fn has_errors(&self) -> bool {
        self.errors > 0
    }

    /// Returns whether the summary contains at least one warning.
    #[must_use]
    pub const fn has_warnings(&self) -> bool {
        self.warnings > 0
    }
}

/// Collection of diagnostics emitted during one operation.
///
/// For example, `monad info` can build one report containing:
/// - workspace root detection result;
/// - manifest detection result;
/// - manifest parsing result.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct DiagnosticReport {
    /// Internal list of diagnostics.
    diagnostics: Vec<Diagnostic>,
}

impl DiagnosticReport {
    /// Creates an empty diagnostic report.
    #[must_use]
    pub const fn new() -> Self {
        Self {
            diagnostics: Vec::new(),
        }
    }

    /// Adds one diagnostic to the report.
    pub fn push(&mut self, diagnostic: Diagnostic) {
        self.diagnostics.push(diagnostic);
    }

    /// Adds an informational diagnostic.
    pub fn info(&mut self, code: impl Into<String>, message: impl Into<String>) {
        self.push(Diagnostic::info(code, message));
    }

    /// Adds a warning diagnostic.
    pub fn warning(&mut self, code: impl Into<String>, message: impl Into<String>) {
        self.push(Diagnostic::warning(code, message));
    }

    /// Adds an error diagnostic.
    pub fn error(&mut self, code: impl Into<String>, message: impl Into<String>) {
        self.push(Diagnostic::error(code, message));
    }

    /// Returns all diagnostics as a borrowed slice.
    ///
    /// A slice, `&[Diagnostic]`, lets callers read the diagnostics without
    /// taking ownership of the internal vector.
    #[must_use]
    pub fn diagnostics(&self) -> &[Diagnostic] {
        &self.diagnostics
    }

    /// Returns the number of diagnostics in the report.
    #[must_use]
    pub fn len(&self) -> usize {
        self.diagnostics.len()
    }

    /// Returns whether the report is empty.
    #[must_use]
    pub fn is_empty(&self) -> bool {
        self.diagnostics.is_empty()
    }

    /// Returns whether the report contains any error diagnostics.
    #[must_use]
    pub fn has_errors(&self) -> bool {
        self.diagnostics
            .iter()
            .any(|diagnostic| diagnostic.severity == DiagnosticSeverity::Error)
    }

    /// Builds a count summary for the report.
    #[must_use]
    pub fn summary(&self) -> DiagnosticSummary {
        // Start all counts at zero.
        let mut infos = 0;
        let mut warnings = 0;
        let mut errors = 0;

        // Visit each diagnostic and increment the matching counter.
        for diagnostic in &self.diagnostics {
            match diagnostic.severity {
                DiagnosticSeverity::Info => infos += 1,
                DiagnosticSeverity::Warning => warnings += 1,
                DiagnosticSeverity::Error => errors += 1,
            }
        }

        DiagnosticSummary {
            total: self.diagnostics.len(),
            infos,
            warnings,
            errors,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn severity_has_stable_string_labels() {
        assert_eq!(DiagnosticSeverity::Info.as_str(), "info");
        assert_eq!(DiagnosticSeverity::Warning.as_str(), "warning");
        assert_eq!(DiagnosticSeverity::Error.as_str(), "error");
    }

    #[test]
    fn creates_info_warning_and_error_diagnostics() {
        let info = Diagnostic::info("test.info", "info message");
        let warning = Diagnostic::warning("test.warning", "warning message");
        let error = Diagnostic::error("test.error", "error message");

        assert_eq!(info.severity, DiagnosticSeverity::Info);
        assert_eq!(warning.severity, DiagnosticSeverity::Warning);
        assert_eq!(error.severity, DiagnosticSeverity::Error);
    }

    #[test]
    fn diagnostic_can_include_help_text() {
        let diagnostic =
            Diagnostic::warning("test.warning", "warning message").with_help("try this");

        assert_eq!(diagnostic.help.as_deref(), Some("try this"));
    }

    #[test]
    fn report_tracks_diagnostics_and_summary_counts() {
        let mut report = DiagnosticReport::new();

        assert!(report.is_empty());
        assert_eq!(report.len(), 0);
        assert!(!report.has_errors());

        report.info("test.info", "info message");
        report.warning("test.warning", "warning message");
        report.error("test.error", "error message");

        let summary = report.summary();

        assert_eq!(report.len(), 3);
        assert!(!report.is_empty());
        assert!(report.has_errors());
        assert!(summary.has_errors());
        assert!(summary.has_warnings());
        assert_eq!(summary.total, 3);
        assert_eq!(summary.infos, 1);
        assert_eq!(summary.warnings, 1);
        assert_eq!(summary.errors, 1);
    }

    #[test]
    fn report_exposes_diagnostics_without_giving_up_ownership() {
        let mut report = DiagnosticReport::new();

        report.info("test.info", "info message");

        let diagnostics = report.diagnostics();

        assert_eq!(diagnostics.len(), 1);
        assert_eq!(diagnostics[0].code, "test.info");
    }
}
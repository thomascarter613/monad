---
title: "ADR-0008: Support Multiple Graph Output Formats"
description: "Records the decision that monad graph will support multiple output formats for human review, machine consumption, documentation, visualization, CI, and AI-readable context."
project_name: "Monad"
project_slug: "monad"
document_type: "architecture-decision-record"
document_status: "approved"
adr_number: "ADR-0008"
adr_status: "accepted"
date_proposed: "2026-05-20"
date_accepted: "2026-05-20"
date_superseded: null
owner: "Thomas Carter"
review_cycle: "pre-implementation"
canonical_path: "docs/adr/ADR-0008-support-multiple-graph-output-formats.md"
depends_on:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
supersedes: []
superseded_by: []
related_documents:
  - "docs/project/00-intake/MONAD-PROJECT-INTAKE.md"
  - "docs/project/01-charter/PRODUCT-CHARTER.md"
  - "docs/adr/README.md"
  - "docs/adr/ADR-0001-use-rust-for-monad-runtime.md"
  - "docs/adr/ADR-0002-coordinate-native-tools-rather-than-replace-them.md"
  - "docs/adr/ADR-0003-use-a-multi-crate-rust-workspace.md"
  - "docs/adr/ADR-0004-use-latest-stable-rust-as-msrv-policy.md"
  - "docs/adr/ADR-0005-introduce-tokio-immediately.md"
  - "docs/adr/ADR-0006-use-monad-toml-as-canonical-manifest.md"
  - "docs/adr/ADR-0007-maintain-a-monad-lock-or-state-file.md"
tags:
  - monad
  - adr
  - graph
  - graph-output
  - mermaid
  - dot
  - json
  - repo-runtime
  - workspace-graph
  - task-graph
  - ai-ready
  - documentation
---

# ADR-0008: Support Multiple Graph Output Formats

## 1. Status

approved, accepted.

This ADR records a decision already established by the approved Monad product charter: `monad graph` shall support multiple output formats.

## 2. Context

Monad is a Rust-native polyglot repo runtime and developer-experience CLI.

Monad is expected to inspect repositories, discover projects, coordinate ecosystem adapters, understand workspace structure, run checks, support repo evolution, and generate AI-readable context.

A core part of this product vision is graph awareness.

Monad will eventually need to represent several kinds of graphs:

1. Workspace graph.
2. Project graph.
3. Package graph.
4. Dependency graph.
5. Task graph.
6. Adapter capability graph.
7. Documentation relationship graph.
8. Policy relationship graph.
9. Generated artifact provenance graph.
10. AI context dependency graph.

Different users and systems need graph data in different forms.

A human working locally may need a readable terminal summary.

A documentation workflow may need Mermaid.

A graph visualization tool may need DOT.

A CI workflow or downstream tool may need JSON.

An AI assistant may need structured graph context.

Therefore, `monad graph` should not be designed around a single output format.

## 3. Decision

Monad shall support multiple graph output formats.

The `monad graph` command should eventually support at least:

```text
text
json
mermaid
dot
```

The initial command shape should be designed to allow explicit format selection.

A likely interface is:

```bash
monad graph
monad graph --format text
monad graph --format json
monad graph --format mermaid
monad graph --format dot
```

The default format should be human-readable text unless a later implementation decision chooses another default.

Structured output formats should be stable enough for use by scripts, CI, documentation generation, and AI-readable context generation.

The internal graph model should be separated from graph rendering so Monad can add or refine output formats without rewriting graph construction logic.

## 4. Rationale

Monad’s graph output has multiple audiences.

A single output format would force one audience’s needs onto all others.

Text is useful for humans in a terminal.

JSON is useful for tools, tests, CI, integrations, and AI assistants.

Mermaid is useful for Markdown documentation and rendered project docs.

DOT is useful for Graphviz and graph visualization workflows.

Supporting multiple formats from the beginning of the command design prevents Monad from hardcoding a narrow graph model into a single renderer.

This decision also supports Monad’s broader goals:

1. Human-friendly developer experience.
2. Machine-readable repo intelligence.
3. Documentation as product.
4. Governance-grade verification.
5. AI-readable context generation.
6. CI/local parity.
7. Future ecosystem integrations.

## 5. Alternatives Considered

### 5.1 Text Only

Monad could initially support only human-readable terminal output.

This was rejected as the long-term graph strategy.

Advantages:

1. Easiest first implementation.
2. Good local developer experience.
3. Simple to inspect manually.
4. Low initial complexity.

Disadvantages:

1. Poor machine readability.
2. Harder to test precisely.
3. Harder to integrate with CI.
4. Harder to feed AI context.
5. Harder to use in documentation pipelines.
6. Requires later redesign if the internal model is not separated from rendering.

Text output should exist, but it should not be the only supported format.

### 5.2 JSON Only

Monad could support only JSON and let other tools render it.

This was rejected.

Advantages:

1. Excellent for machines.
2. Easier to test.
3. Useful for CI.
4. Useful for AI context.
5. Stable integration surface.

Disadvantages:

1. Poor default human experience.
2. Requires extra tools for visualization.
3. Less useful directly in Markdown documentation.
4. Makes `monad graph` feel too low-level for everyday use.

JSON should be supported, but not as the only format.

### 5.3 Mermaid Only

Monad could support Mermaid first because Markdown documentation is important.

This was rejected as the only graph format.

Advantages:

1. Excellent for docs.
2. Good fit for Markdown.
3. Useful for architecture documentation.
4. Readable enough for humans.
5. Renderable in many documentation systems.

Disadvantages:

1. Not ideal for machine consumption.
2. Not ideal for large graphs.
3. Less precise as a stable API format.
4. Not as universal for graph tooling as DOT or JSON.

Mermaid should be supported, but not as the only format.

### 5.4 DOT Only

Monad could support only DOT / Graphviz output.

This was rejected.

Advantages:

1. Mature graph visualization ecosystem.
2. Good for complex graphs.
3. Useful for generated diagrams.
4. Widely understood by graph tooling.

Disadvantages:

1. Less friendly to many developers than Mermaid.
2. Not ideal as a default terminal format.
3. Not ideal for AI-readable structured context.
4. Requires external rendering tools.

DOT should be supported, but not as the only format.

### 5.5 Defer Graph Output Formats Entirely

Monad could defer graph output format decisions until after graph construction exists.

This was rejected.

Reasons:

1. The output model affects internal graph design.
2. The command interface should not be designed too narrowly.
3. Documentation and AI context are core product concerns.
4. Early tests benefit from JSON snapshots.
5. Graph rendering separation should be designed from the beginning.

This ADR does not require the full graph engine immediately. It only requires the architecture to support multiple output formats.

## 6. Consequences

### 6.1 Positive Consequences

Supporting multiple graph output formats gives Monad:

1. Better human usability.
2. Better documentation generation.
3. Better CI integration.
4. Better machine-readable outputs.
5. Better AI-readable context.
6. Better testability.
7. Better future visualization options.
8. Better separation between graph model and graph rendering.
9. Better fit for governance-grade repo analysis.
10. More credible repo-runtime behavior.

### 6.2 Negative Consequences

This decision also creates costs:

1. More implementation work.
2. More tests.
3. More format-specific edge cases.
4. Need for stable output contracts.
5. Need to avoid renderer drift.
6. Need to document output semantics.
7. Need to handle large graphs carefully.
8. Potential user confusion if formats differ in visible detail.

### 6.3 Neutral Consequences

This decision does not require all formats to be implemented in the first scaffold.

This decision does not define the complete graph schema.

This decision does not decide whether graph data is cached in `monad.lock` or `.monad/`.

This decision does not decide the final graph algorithm.

This decision does not decide whether graph rendering requires external tools.

Those decisions may be refined later.

## 7. Graph Types

Monad should eventually distinguish graph types.

Potential graph types include:

### 7.1 Workspace Graph

Shows the repository’s projects, packages, apps, services, tools, documentation areas, and infrastructure components.

### 7.2 Dependency Graph

Shows dependencies between projects, packages, services, or modules.

### 7.3 Task Graph

Shows task relationships and execution ordering.

### 7.4 Adapter Graph

Shows detected ecosystems and adapter capabilities.

### 7.5 Policy Graph

Shows policy relationships, architecture boundaries, and verification gates.

### 7.6 Provenance Graph

Shows generated artifacts, commands, templates, inputs, and outputs.

### 7.7 AI Context Graph

Shows the relationship between docs, ADRs, manifests, state files, project summaries, current-state files, and AI handoff artifacts.

The initial implementation may begin with only one graph type, but the command and data model should not prevent later expansion.

## 8. Initial Command Design

The initial command interface should allow format selection.

Possible examples:

```bash
monad graph
monad graph --format text
monad graph --format json
monad graph --format mermaid
monad graph --format dot
```

Future command options may include:

```bash
monad graph --type workspace
monad graph --type dependency
monad graph --type task
monad graph --type provenance
monad graph --output docs/architecture/graphs/workspace.mmd
monad graph --format json --output .monad/graph/workspace.json
```

The exact command syntax should be validated during implementation.

## 9. Default Output Format

The default `monad graph` output should be human-readable text.

Rationale:

1. `monad graph` without flags should be useful in a terminal.
2. Human-readable output is best for exploratory local use.
3. Structured formats can be requested explicitly.
4. This matches the general CLI principle that default output should be helpful to humans.

A later ADR or implementation decision may revise this default if there is strong reason.

## 10. JSON Output

JSON output should be treated as the primary machine-readable graph format.

JSON should be suitable for:

1. Tests.
2. CI.
3. Tooling integrations.
4. AI context generation.
5. Future UI or TUI.
6. State comparison.
7. Graph export pipelines.

JSON output should include explicit schema/version metadata.

Example shape:

```json
{
  "schema_version": "0.1",
  "graph_type": "workspace",
  "nodes": [],
  "edges": [],
  "generated_by": "monad",
  "generated_at": "..."
}
```

This example is illustrative only.

The final schema should be defined during graph implementation.

## 11. Mermaid Output

Mermaid output should be supported for Markdown documentation.

Mermaid output should be suitable for:

1. Architecture docs.
2. README diagrams.
3. Generated documentation.
4. AI-readable Markdown context.
5. Project onboarding materials.

Example command:

```bash
monad graph --format mermaid --output docs/architecture/graphs/workspace.mmd
```

Monad should generate Mermaid that is readable and stable enough to review in Git diffs.

## 12. DOT Output

DOT output should be supported for Graphviz and graph visualization workflows.

DOT output should be suitable for:

1. Larger graph visualization.
2. Generated diagrams.
3. External graph tooling.
4. Advanced visualization pipelines.

Example command:

```bash
monad graph --format dot --output .monad/graph/workspace.dot
```

Monad should not require Graphviz to emit DOT.

Graphviz is only required if the user wants to render DOT externally.

## 13. Text Output

Text output should be optimized for terminal readability.

It should help users quickly understand:

1. Detected projects.
2. Detected relationships.
3. Graph summary.
4. Missing or ambiguous relationships.
5. Warnings.
6. Suggested next commands.

Text output should not be treated as a stable machine API.

Scripts and AI tools should prefer JSON.

## 14. Output Destination

Graph output should support writing to stdout by default.

Future support should include writing to a file:

```bash
monad graph --format json --output .monad/graph/workspace.json
monad graph --format mermaid --output docs/architecture/graphs/workspace.mmd
monad graph --format dot --output .monad/graph/workspace.dot
```

When writing files, Monad should follow safe file operation principles:

1. Avoid destructive writes.
2. Support dry-run where practical.
3. Avoid unnecessary diff churn.
4. Explain what was written.
5. Create parent directories only when appropriate.
6. Record provenance where appropriate.

## 15. Relationship to `monad.lock` and `.monad/`

Graph data may eventually relate to `monad.lock` and `.monad/`.

Potential responsibilities:

1. `monad.lock` may store graph fingerprints or resolved graph metadata.
2. `.monad/graph/` may store generated graph exports.
3. `.monad/reports/` may store graph diagnostics.
4. `.monad/context/` may store AI-readable graph summaries.
5. Generated documentation may store Mermaid graphs under `docs/`.

The exact storage policy should be defined later.

This ADR only decides that multiple graph output formats are supported.

## 16. Relationship to AI Context and Memory

Graph output is important to Monad’s AI-readable context and full AI memory system.

AI assistants need structured context to avoid guessing.

Graph outputs can help AI assistants understand:

1. Project boundaries.
2. Dependency relationships.
3. Task relationships.
4. Documentation relationships.
5. ADR relationships.
6. Manifest-to-state relationships.
7. Generated artifact provenance.
8. Architecture boundaries.

For AI workflows, JSON should be the preferred structured graph format.

Mermaid may be useful for AI-readable Markdown context and human review.

## 17. Relationship to Documentation

Mermaid graph output should support documentation workflows.

Potential generated docs may include:

```text
docs/architecture/graphs/workspace.mmd
docs/architecture/graphs/dependencies.mmd
docs/architecture/graphs/tasks.mmd
docs/architecture/graphs/provenance.mmd
```

Generated documentation files should include clear headers if they are generated.

Monad should avoid overwriting hand-written diagrams without explicit safe-write behavior.

## 18. Relationship to Verification

`monad check` may eventually verify that graph outputs are current.

Possible checks:

1. Graph can be generated successfully.
2. JSON graph schema is valid.
3. Mermaid graph generation succeeds.
4. DOT graph generation succeeds.
5. Committed graph outputs are not stale.
6. Graph fingerprints match lock/state metadata.
7. Graph output does not contain invalid project references.
8. Graph output respects architecture-boundary policy.

This should be introduced gradually.

## 19. Implementation Guidance

### 19.1 Separate Graph Model from Renderers

Monad should separate graph construction from graph rendering.

Conceptual structure:

```text
graph model -> text renderer
graph model -> json renderer
graph model -> mermaid renderer
graph model -> dot renderer
```

The internal graph model should not be coupled to a single output format.

### 19.2 Typed Graph Model

Graph nodes and edges should be strongly typed.

Potential node kinds:

1. Workspace.
2. Project.
3. Package.
4. App.
5. Service.
6. Tool.
7. Task.
8. Adapter.
9. Document.
10. Policy.
11. Generated artifact.

Potential edge kinds:

1. Depends on.
2. Contains.
3. Runs.
4. Generates.
5. Verifies.
6. Uses adapter.
7. References.
8. Supersedes.
9. Produces.
10. Requires.

The final model should be defined during implementation.

### 19.3 Stable Identifiers

Graph nodes should have stable identifiers.

Stable IDs are important for:

1. Repeatable output.
2. Clean diffs.
3. Tests.
4. AI context.
5. State comparison.
6. Lock/state fingerprints.

### 19.4 Deterministic Ordering

Graph output should be deterministic.

Nodes and edges should be sorted consistently to avoid noisy diffs.

### 19.5 Format-Specific Escaping

Renderers must handle format-specific escaping.

Examples:

1. JSON string escaping.
2. Mermaid label escaping.
3. DOT identifier and label escaping.
4. Text wrapping and indentation.

### 19.6 Large Graph Handling

Monad should eventually handle large graphs gracefully.

Possible future behavior:

1. Filtering by project.
2. Filtering by adapter.
3. Filtering by graph type.
4. Depth limits.
5. Output summaries.
6. Warnings for extremely large diagrams.
7. Separate graph export files.

### 19.7 Testing

Each renderer should have tests.

Recommended test styles:

1. Unit tests for graph model construction.
2. Snapshot tests for text output.
3. JSON schema or golden-file tests for JSON output.
4. Snapshot tests for Mermaid output.
5. Snapshot tests for DOT output.
6. Fixture repositories for graph discovery.
7. Tests for deterministic ordering.

### 19.8 Error Handling

Graph generation should produce clear diagnostics for:

1. Missing manifests.
2. Invalid manifests.
3. Ambiguous project boundaries.
4. Missing native tool data.
5. Cycles where cycles are invalid.
6. Unknown project references.
7. Unsupported output format.
8. File write failures.
9. Renderer failures.

### 19.9 Future Format Extensibility

Monad may later support additional formats such as:

1. SARIF.
2. JUnit-style reports.
3. HTML.
4. SVG through external rendering.
5. Markdown tables.
6. YAML.
7. GraphML.
8. OpenTelemetry-related trace exports.
9. Custom AI context packets.

Additional formats should be introduced only when there is a clear user or integration need.

## 20. Verification

This ADR is satisfied when Monad eventually supports:

1. A `monad graph` command.
2. A graph model independent from renderers.
3. Human-readable text graph output.
4. JSON graph output.
5. Mermaid graph output.
6. DOT graph output.
7. Explicit `--format` selection.
8. Clear diagnostics for unsupported formats.
9. Deterministic output ordering.
10. Tests for each supported output format.
11. Documentation explaining graph formats and intended use cases.

Initial verification commands may eventually include:

```bash
cargo test --workspace graph
cargo test --workspace
cargo clippy --workspace --all-targets --all-features -- -D warnings
```

Once the root verification script exists, the preferred command should be:

```bash
./tools/scripts/verify.sh
```

## 21. Related Decisions

This ADR is related to:

1. `ADR-0001-use-rust-for-monad-runtime.md`
2. `ADR-0002-coordinate-native-tools-rather-than-replace-them.md`
3. `ADR-0003-use-a-multi-crate-rust-workspace.md`
4. `ADR-0004-use-latest-stable-rust-as-msrv-policy.md`
5. `ADR-0005-introduce-tokio-immediately.md`
6. `ADR-0006-use-monad-toml-as-canonical-manifest.md`
7. `ADR-0007-maintain-a-monad-lock-or-state-file.md`

Future ADRs or specs may define:

1. Graph schema.
2. Node and edge taxonomy.
3. Task graph model.
4. Dependency graph model.
5. Graph cache policy.
6. Graph state/lock integration.
7. Graph output file conventions.
8. AI context graph generation.
9. Documentation graph generation.
10. Architecture-boundary graph checks.

## 22. Revision History

| Date | Version | Change |
| --- | --- | --- |
| 2026-05-20 | 0.1.0 | Initial draft proposed. |
| 2026-05-20 | 0.1.0 | approved, accepted. |
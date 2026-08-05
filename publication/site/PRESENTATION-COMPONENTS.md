# Monad presentation component contract

SITE-0007 defines the semantic component vocabulary used by the Monad Engineering Log and reference documentation.

## Principles

1. Canonical Markdown remains readable in GitHub, editors, and terminals.
2. Presentation meaning is semantic rather than decorative.
3. Color never carries meaning by itself.
4. Components print without hiding essential content.
5. Ordinary headings, lists, tables, links, code fences, and blockquotes remain valid.
6. Custom MDX imports are unnecessary; components are registered centrally.

## Canonical Markdown callouts

Canonical `.md` documents can use blockquote markers. The generated projection converts recognized markers into MDX components.

```markdown
> [!DECISION]
> **Title:** Keep the manifest language-neutral
>
> The root manifest describes repository intent rather than a language-specific workspace.
```

Recognized markers:

| Marker | Generated component |
|---|---|
| `DECISION` | `Decision` |
| `CONSTRAINT`, `DESIGN_CONSTRAINT` | `Constraint` |
| `EXPERIMENT` | `Experiment` |
| `FAILURE`, `FAILURE_LOG` | `FailureLog` |
| `IMPLEMENTATION`, `IMPLEMENTATION_NOTE` | `ImplementationNote` |
| `ACTION`, `REPOSITORY_ACTION` | `RepositoryAction` |
| `CHECKPOINT`, `READER_CHECKPOINT` | `ReaderCheckpoint` |
| `RESULT` | `Result` |
| `EVIDENCE`, `VERIFICATION_EVIDENCE` | `VerificationEvidence` |
| `FIGURE`, `ARCHITECTURE_FIGURE` | `ArchitectureFigure` |

Unknown markers remain unchanged. An architecture figure requires a title.

## Terminal sessions

Add the standalone `terminal` token to an ordinary fenced-code metadata string:

````markdown
```console terminal title="Inspect Monad" prompt="$"
$ monad inspect
Repository: monad
```
````

The projection wraps the highlighted code block in `TerminalSession`. The code itself is not rewritten.

## File trees

The official Fumadocs file-tree remark plugin is enabled:

````markdown
```files
project
├── src
│   └── index.ts
└── package.json
```
````

## Diffs

Use a normal diff code fence. Fumadocs provides syntax highlighting and copy behavior:

````markdown
```diff title="Manifest update"
- status: proposed
+ status: accepted
```
````

## Direct MDX components

Canonical `.mdx` documents and site-owned pages may use these globally registered components without imports:

- `Decision`
- `Constraint`
- `Experiment`
- `FailureLog`
- `ImplementationNote`
- `RepositoryAction`
- `ReaderCheckpoint`
- `Result`
- `VerificationEvidence`
- `TerminalSession`
- `ArtifactReference`
- `ArtifactReferences`
- `Timeline`
- `TimelineEvent`
- `ArchitectureFigure`
- `SpecificationSummary`
- Fumadocs `Tabs`, `Tab`, `Accordions`, `Accordion`, `Files`, `Folder`, and `File`

## Artifact references

```mdx
<ArtifactReference id="ADR-0001" />
<ArtifactReference id="ADR-0001" compact />
<ArtifactReferences ids={['ADR-0001', 'MKE-CORE-0001']} />
```

Artifact references resolve against `.generated/registry/documents.json`. Unknown identifiers render a visible missing-reference state instead of producing a broken link.

## Timeline events

```mdx
<Timeline title="Decision history">
  <TimelineEvent date="2026-08-03" label="Proposed" status="complete">
    The initial decision was recorded.
  </TimelineEvent>
  <TimelineEvent date="2026-08-04" label="Accepted" status="current">
    The decision became authoritative.
  </TimelineEvent>
</Timeline>
```

Allowed event states are `complete`, `current`, `planned`, and `blocked`.

## Architecture figures

`ArchitectureFigure` supplies a semantic `<figure>` and `<figcaption>`. Its children may be an image, Mermaid output, SVG, HTML diagram, or another accessible visualization.

Every figure must provide:

- A concise `title`
- Visible or assistive explanatory content
- A text alternative when its child is visual
- An optional `source` when derived from a canonical artifact

## Projection boundary

Generated documents always use `.mdx`, regardless of whether the canonical source uses `.md` or `.mdx`. The public route does not depend on the generated extension.

The projection performs presentation-only transformations after content governance. It must not change document identity, lifecycle, relationships, or canonical source content.

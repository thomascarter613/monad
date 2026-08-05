# Monad Publication Visual System

**Packet:** SITE-0006  
**Version:** 1.0  
**Scope:** Website foundations, responsive documentation layouts, accessibility states, dark mode, and print-aware base styles.

## Design position

The Monad Engineering Log is presented as an editorial engineering record rather than a generic product-marketing site. Its visual system combines:

- the readability of a technical book;
- the traceability of an engineering notebook;
- the restraint of an archival publication;
- the navigability of a modern documentation application.

The system avoids ornamental futurism, neon AI imagery, glass-heavy SaaS styling, and dependence on external font services.

## Typography

Three durable system stacks are used:

- **Editorial:** Charter, Bitstream Charter, Sitka Text, Cambria, Georgia, serif.
- **Interface:** Inter when locally available, then the operating-system sans stack.
- **Technical:** SF Mono, Cascadia Code, Roboto Mono, Consolas, Liberation Mono, monospace.

No web font is downloaded at build or runtime. This preserves offline builds, privacy, and local-first operation. A future brand-font packet may replace the stacks only if the font files are licensed, repository-managed, and reproducible.

## Core palette

The base palette uses warm paper, near-black ink, muted graphite, and a restrained copper publication accent. Dark mode uses charcoal rather than absolute black and warm off-white rather than pure white.

Fumadocs tokens are overridden through `styles/tokens.css`. The visual system keeps Fumadocs component behavior while replacing its generic neutral appearance.

## Section identities

Each major information surface inherits its own accent:

| Section | Meaning | Accent family |
|---|---|---|
| Start | Reader orientation | Teal |
| Building Monad | Chronological narrative | Amber |
| System | Stable conceptual reference | Blue |
| Artifacts | Governed records | Violet |
| Project | Operational state | Green |

Section color communicates location; it never carries status or severity by itself.

## Layout

- Global publication width: `--monad-content-max`.
- Fumadocs layout width: `--fd-layout-width`.
- Long-form reading measure: `--monad-reading-measure`.
- Technical-grid backgrounds are decorative and intentionally low contrast.
- Article headings use the editorial stack; navigation and controls use the interface stack.
- Document identifiers remain monospace and visually prominent.

## Accessibility contract

The visual layer includes:

- a keyboard-visible skip link;
- visible `:focus-visible` treatment;
- light and dark color-scheme declarations;
- reduced-motion support;
- forced-colors focus support;
- text wrapping for headings and body copy;
- minimum primary action heights near the 44 CSS-pixel target;
- print styles that remove interactive navigation and preserve readable content.

Color must never be the sole indicator of status, validity, or relationship type.

## Visual regression workflow

Visual tests are opt-in because screenshots vary across operating systems and browser revisions.

Create or update baselines:

```bash
bun run test:visual:update
```

Compare against committed baselines:

```bash
bun run test:visual
```

The suite currently covers:

- publication home in light mode;
- System reference in dark mode;
- mobile reading paths.

Do not update snapshots automatically after a failure. Review the rendered change and image diff first.

## Print boundary

SITE-0006 provides only foundational print behavior. Publication-grade pagination, generated covers, running headers, footnotes, PDF metadata, and volume assembly remain part of SITE-0011.

## Semantic engineering components

SITE-0007 extends the visual system with explicitly labeled decision, constraint, experiment, failure, action, result, and evidence surfaces. Each component uses text and structure as the primary semantic signal; color remains supplementary. Terminal transcripts, timelines, artifact references, architecture figures, and specification summaries share the publication's typography and print behavior.

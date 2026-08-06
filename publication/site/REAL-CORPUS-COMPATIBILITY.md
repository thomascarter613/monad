# STAB-0002 — Real Corpus Compatibility

SITE-0012 was first exercised against Monad's complete canonical corpus on
2026-08-05. STAB-0001 corrected source classification, grouped flat
frontmatter, long closing delimiters, and index-file identity inference.

STAB-0002 extends the same compatibility layer to Markdown-style list bullets
inside canonical frontmatter. Monad work packets use `* item` lists as well as
YAML-style `- item` lists. The parser now accepts `-`, `*`, and `+` list markers
without rewriting canonical files.

## Corrections

1. ADRs stored beneath `engineering/adrs/` are classified as decisions.
2. Grouped flat metadata and unindented lists are accepted.
3. Long hyphen closing delimiters are accepted.
4. Index-like files do not inherit identifiers merely mentioned in body text.
5. Frontmatter list values accept Markdown bullets: `-`, `*`, and `+`.

## Remaining warnings

Empty placeholders, untracked supporting files, unresolved planned references,
and intentional series gaps remain warnings. They do not block ordinary
`bun run build`; strict validation can continue to surface them as governance
work for the canonical corpus.

## STAB-0003: identity-bearing locations only

Document identity is inferred only from explicit frontmatter, the canonical path or filename,
the document title, or an explicit leading `ID:`, `Document ID:`, or `Artifact ID:` declaration.
References appearing elsewhere in body content are relationship evidence, not document identity.
This prevents status dashboards such as `engineering/PROJECT-STATUS.md` from adopting the ID of
the current work packet they mention.

## STAB-0004: MDX-safe projection and deterministic source regeneration

Generated publication pages now use JSX comments (`{/* ... */}`) rather than
HTML comments (`<!-- ... -->`). MDX parses angle-bracket syntax as JSX, so raw
HTML comment markers are not valid in projected `.mdx` documents.

The production build now synchronizes canonical content, removes `.source` and
`.next`, and then invokes Next.js. The type-generation command also removes
`.source` before running `fumadocs-mdx`. This prevents deleted or renamed
projection files from surviving as stale imports in `.source/server.ts`.


## STAB-0005 — Template placeholder positions

Identifiers ending in `-0000` represent templates or placeholders. They remain valid artifact identities but do not claim series position zero. Generated Fumadocs frontmatter therefore omits `series.position` for these documents, preserving the positive-position schema used by real installments.


## STAB-0006 — Type Contract Stabilization

The first dependency-backed production build reached TypeScript validation after successful content and MDX compilation. STAB-0006 aligns optional page descriptions, EPUB processed-Markdown adapters, print query narrowing, React 19 image source types, publication-page casts, and JavaScript-backed unit-test inference with the pinned Next.js and Fumadocs toolchain.


## STAB-0007 — Release Gate and Biome Stabilization

The dependency-backed release verification reached the Biome quality gate after successful
content validation. STAB-0007 migrates Biome 2.5 configuration to the `preset` contract,
enables Tailwind CSS directive parsing, corrects accessibility semantics, scopes intentional
JSON-LD and native-MDX-image suppressions, removes ambiguous type names and explicit `any`
values, and makes iterable callbacks return `void`.

The patch also records the intentional independence of BEM-scoped CSS selectors so
`noDescendingSpecificity` does not report false overlap across unrelated components.

## STAB-0008 — Semantic Grouping Release-Gate Fix

Biome 2.5 correctly rejected generic `div` elements carrying `role="group"` where semantic
elements were available. The Building Monad status metrics now use a labelled `section`, and
search facets use a `fieldset` with a visually hidden `legend`. Fieldset browser defaults are
reset without changing the existing search-filter layout. The remaining `!important` findings
are non-blocking warnings tied to print and third-party-style overrides.


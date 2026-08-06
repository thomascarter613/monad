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


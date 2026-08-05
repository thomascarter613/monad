# SITE-0010 — Search, feeds, AI-readable endpoints, and SEO

This packet adds a publication-wide discovery layer without changing the canonical ownership of Monad documents.

## Public discovery surfaces

- `/search` — governed faceted search across the publication corpus.
- `/api/search` — Fumadocs full-text search, including section tags.
- `/api/discovery` — registry-backed faceted search and filter metadata.
- `/feeds/building-monad.rss.xml` — RSS 2.0 feed.
- `/feeds/building-monad.atom.xml` — Atom 1.0 feed.
- `/llms.txt` — compact AI-oriented publication index.
- `/llms-full.txt` — processed Markdown for the full publication.
- `<document-route>.md` — the processed Markdown representation of a page.
- `/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest` — standards-based discovery metadata.

## Content negotiation boundary

HTML routes remain canonical. Markdown is exposed through explicit `.md` URLs rather than automatic `Accept` negotiation so CDN behavior remains deterministic and ordinary browser responses do not depend on a `Vary` header.

## Generated discovery index

`.generated/registry/discovery.json` contains a disposable search read model. It includes normalized searchable text, excerpts, facets, and governed metadata. The document registry remains authoritative for identity and lifecycle.

## Social previews

`/social-card` renders a parameterized 1200×630 image for Open Graph and Twitter metadata. Page metadata points at this endpoint using the document title, identifier, and publication surface.

# Monad derived-publication system

SITE-0011 turns the governed documentation corpus into reproducible editions without moving or rewriting canonical Markdown.

## Outputs

Each configured edition can produce:

- a tagged, outlined PDF volume;
- optional per-document PDFs;
- a standards-oriented EPUB through `fumadocs-epub`;
- a self-contained offline HTML archive;
- a canonical-source archive with referenced local assets;
- a machine-readable manifest and SHA-256 checksums.

## Configuration

Edit `editions.config.mjs` to define stable publication profiles. Selectors operate on generated registry metadata rather than physical website directories.

## Build

```bash
bun run publication:plan
bun run publication:build -- --edition building-monad
bun run publication:build -- --edition complete --version 0.1.0 --article-pdfs
```

The site must have a production build before PDF, EPUB, or offline generation. The package scripts perform that build automatically.

## Reproducibility

Set `SOURCE_DATE_EPOCH` to normalize archive timestamps and the manifest generation time:

```bash
SOURCE_DATE_EPOCH=1785826800 bun run publication:build -- --edition complete --version 0.1.0
```

Canonical source archives are deterministic for identical source content, configuration, and `SOURCE_DATE_EPOCH`. PDF and EPUB bytes can still differ across browser or exporter versions, so the derived manifest records the source digest, toolchain, repository commit, file sizes, and output hashes.

## Export policy

Dynamic EPUB endpoints can be disabled or protected:

```dotenv
MONAD_EDITION_EXPORT_ENABLED=true
MONAD_EDITION_EXPORT_SECRET=
```

When a secret is configured, clients must send `Authorization: Bearer <secret>`.

## Output location

```text
dist/publications/<edition>/<version>/
├── <edition>-<version>.pdf
├── <edition>-<version>.epub
├── <edition>-<version>-offline.tar.gz
├── <edition>-<version>-source.tar.gz
├── <edition>-<version>-manifest.json
└── SHA256SUMS.txt
```

The `dist/` directory is disposable and excluded from version control.

<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Bootstrap Metadata Compatibility Amendment

The bootstrap Markdown frontend may recognize legacy MSC-CORE metadata with flat keys following empty grouping keys and a long hyphen closing delimiter. The frontend must normalize that representation into the canonical nested metadata model before canonical AST construction.

Compatibility parsing is permitted only when:

* reconstruction is deterministic;
* no key has two possible parents;
* identity, version, lifecycle, relationships, compilation status, and provenance are preserved;
* the canonical output uses exact `---` delimiters and nested mappings;
* a compatibility diagnostic records the legacy representation.

The frontend must reject ambiguous legacy metadata and must not emit the legacy form.

<!-- WP-MSC-0007:END -->

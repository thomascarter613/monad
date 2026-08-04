---
name: monad-audit-doc-consistency
description: Audit Monad Markdown and documentation metadata for cross-document consistency, including identifiers, titles, statuses, paths, links, command names, manifests, ADR references, work-packet references, and specification-series taxonomy. Use for documentation audits, `monad docs check`, stale-doc detection, or consistency reviews. Default to read-only; do not mass-rewrite documents unless explicitly requested.
---

# Monad Audit Documentation Consistency

Audit the documentation system as a graph of claims, identifiers, links, and authorities.

## Operating principles

Apply these rules throughout this skill:

1. Work from the repository root returned by `git rev-parse --show-toplevel`.
2. Read the applicable `AGENTS.md` files before changing anything.
3. Inspect `git status --short --branch` and preserve unrelated user changes.
4. Treat the repository as the source of truth. Prefer existing templates, schemas, naming rules, and nearby examples over assumptions in this skill.
5. Use `rg`, `rg --files`, and narrow file reads before broad scans.
6. Make the smallest coherent change that satisfies the requested outcome.
7. Do not run destructive Git commands, rewrite history, commit, push, merge, or open a pull request unless the user explicitly requests it.
8. Do not silently migrate repository structure, manifest formats, identifiers, or status vocabularies.
9. When a command may mutate repository state, prefer its plan or dry-run mode first when available.
10. Record the commands run, their results, files changed, and any unverified assumptions in the final response.

## Repository discovery

Before applying the workflow:

1. Identify the repository root and current branch.
2. Read the nearest relevant `AGENTS.md`.
3. Locate the governing material, when present:
   - `README.md`
   - architecture overviews and principles
   - ADR indexes, templates, and accepted ADRs
   - work-packet standards, Definition of Ready, and Definition of Done
   - command-contract documentation
   - manifest schemas and examples
   - test strategy and validation scripts
4. Search for the exact identifier or subject before creating a new artifact.
5. If two files claim to be authoritative and the repository does not resolve the conflict, stop the mutation and report the ambiguity.


## Scope discovery

Determine the documentation roots from the repository. Likely areas include:

- `README.md`
- `architecture/`
- `adrs/`
- `docs/`
- `engineering/`
- `journal/`
- `knowledge/`
- `research/`
- `specifications/`
- `work/`
- Markdown under `.monad/`

Include generated docs only when the repository treats them as versioned artifacts. Exclude vendor, build, target, cache, and dependency directories.

## Establish authorities

For each audited subject, identify the authoritative source:

- product and architecture principles
- ADR status and decision
- work-packet status
- command contract
- manifest format and precedence
- specification-series name and document position
- implementation status
- public user documentation

A document may summarize an authority but must not silently override it.

When two documents conflict and no authority rule resolves them, report a contradiction rather than choosing one.

## Audit dimensions

### Identity and numbering

Check:

- duplicate ADR, work-packet, specification, build-log, or journal identifiers
- missing or reused numbers
- filename identifier differs from frontmatter or heading
- title differs across index, file, and links
- series position such as `MSL-CORE-0015 of N` is inconsistent
- renamed identifiers leave stale references

Do not require contiguous numbering unless repository policy does.

### Status consistency

Check:

- frontmatter status differs from body or index
- work-packet status is not one of the established values
- packet status transition is impossible
- ADR marked superseded without a replacement link
- implementation described as complete while acceptance evidence is absent
- pre-normative documents described as normative

Established work-packet status values are:

```text
planned
active
verification
closeout
```

Preserve exact repository capitalization when another explicit convention exists.

### Paths and links

Check:

- broken relative links
- wrong case
- moved documents
- links to legacy paths presented as canonical
- directory trees that no longer match the repository
- anchors that do not exist
- duplicate "canonical" pages

### Terminology and taxonomy

Check:

- Monad product naming
- CLI command spelling
- component names
- manifest names
- language-neutral root taxonomy
- specification series names
- pre-normative versus normative classification

Preserve existing MKE documents as pre-normative where established. Do not introduce or normalize to `MKE-SPEC`; use the current taxonomy such as MSL, MSC, KIR, MKE, and PUB only as established by the repository.

### Command-contract drift

Compare documentation and examples with:

- parser definitions
- `--help` output
- command-contract schemas
- snapshots
- completion definitions
- tests

Pay special attention to established command families such as:

- `monad adr`
- `monad workpacket`
- `monad context handoff`
- `monad docs check`

### Manifest drift

Compare documentation with accepted manifest policy and implementation:

- canonical manifest
- compatibility mirror
- lockfile
- `.monad` state
- legacy YAML examples
- precedence rules
- workspace membership

Do not assume legacy files are invalid merely because newer files exist.

### Frontmatter and structure

Check Markdown under governed roots for:

- missing frontmatter when required
- malformed YAML
- missing required fields
- inconsistent dates
- invalid identifiers
- duplicate keys
- required headings
- stale generated timestamps

### Claim consistency

Search for high-impact claims such as:

- "implemented"
- "complete"
- "canonical"
- "source of truth"
- "deprecated"
- "required"
- "not supported"
- "default"

Verify those claims against code, tests, ADRs, or current docs.

## Tooling

Use repository-native tooling first:

```bash
monad docs check
monad check
```

Also use targeted searches and link checkers already present in the repository. Useful generic checks include:

```bash
git diff --check
rg -n 'MKE-SPEC|workspace\.yaml|workspace\.toml|monad\.yaml|monad\.toml'
rg -n 'planned|active|verification|closeout'
```

Adapt searches to the repository; do not treat every match as an error.

## Findings

Classify each finding:

- **Contradiction** — two active sources make incompatible claims
- **Broken reference** — path, anchor, or identifier does not resolve
- **Stale claim** — documentation describes an older implementation or policy
- **Metadata defect** — frontmatter, status, identifier, or index mismatch
- **Coverage gap** — required behavior or decision lacks documentation
- **Duplication risk** — multiple pages appear authoritative
- **Advisory** — improvement with no current inconsistency

For each finding include:

- severity
- category
- files and lines
- conflicting claims
- authority used
- minimal remediation
- whether an ADR or migration plan is required

## Mutation boundary

Default to read-only.

When explicitly asked to fix findings:

1. fix the authoritative source first
2. update summaries and indexes
3. preserve historical records
4. avoid mass wording changes unrelated to consistency
5. do not rename a series or move a documentation root without an explicit migration decision
6. rerun the full audit

## Final response

Report:

1. overall result
2. audited roots and exclusions
3. authoritative sources discovered
4. findings ordered by severity
5. broken-link and identifier summary
6. command and manifest drift summary
7. commands run and results
8. prioritized remediation sequence

When no inconsistencies are found, state the scope and evidence; do not claim proof beyond what was checked.

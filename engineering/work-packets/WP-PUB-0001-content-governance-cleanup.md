---

id: WP-PUB-0001
title: Establish Publication Content Governance and Eliminate Unclassified Warnings
program: Publication Governance
phase: Content Governance
milestone: M-005
priority: P1
status: planned

owner: Thomas Carter

created: 2026-08-06
started:
completed:

produces:

* engineering/reviews/PUB-CONTENT-GOVERNANCE-BASELINE.md
* engineering/reviews/PUB-CONTENT-GOVERNANCE-CLOSURE.md
* publication/site/config/content-governance.mjs
* publication/site/tests/unit/content-governance-policy.test.ts
* corrected canonical metadata across governed publication sources
* deterministic warning-disposition evidence

consumes:

* engineering/MILESTONES.md
* engineering/PROJECT-STATUS.md
* engineering/ROADMAP.md
* engineering/work-packets/active.md
* engineering/work-packets/backlog.md
* engineering/work-packets/completed.md
* publication/site/package.json
* publication/site/source.config.ts
* publication/site/scripts/content/sync.mjs
* publication/site/scripts/content/lib/governance.mjs
* publication/site/scripts/content/lib/normalize.mjs
* publication/site/scripts/content/lib/project.mjs
* publication/site/tests/unit/content-normalize.test.ts
* publication/site/tests/unit/content-governance.test.ts
* specifications/registry/specifications.yaml
* the canonical Markdown corpus under architecture/, engineering/, specifications/, and publication/

depends_on:

* WP-AF-0009

related:

* M-002
* M-005
* PI-002
* PUB-CORE-0010
* PUB-CORE-0011
* PUB-CORE-0012
* SITE-0012
* STAB-0001
* STAB-0002
* STAB-0003
* STAB-0004
* STAB-0005
* STAB-0006
* STAB-0007
* STAB-0008

supersedes: []
superseded_by: []

tags:

* publication
* governance
* content
* metadata
* identity
* relationships
* series
* validation
* warnings
* provenance
* quality
* release
* projection
* registry

---

# WP-PUB-0001 — Establish Publication Content Governance and Eliminate Unclassified Warnings

## Executive Summary

Establish a complete, explicit, and testable governance model for the canonical documents published through the Monad Engineering Log.

The publication system now synchronizes the real Monad corpus, generates MDX projections, compiles successfully, and participates in the release-verification pipeline. During stabilization, the content validator reached a healthy operational state:

```text
137 canonical document(s)
17 series
0 redirect(s)
260 warning(s)
0 error(s)
```

The absence of errors confirms that the publication system can ingest the corpus without violating its current hard constraints.

The remaining warnings reveal a different class of work.

They identify unresolved governance questions concerning:

* canonical document identity;
* support-document identity;
* required identity within normative source roots;
* empty and placeholder artifacts;
* missing or future relationship targets;
* series gaps and reserved positions;
* incomplete symbolic references;
* aliases and family-level references;
* planned-but-not-yet-created artifacts;
* template identities;
* publication eligibility;
* lifecycle state;
* warning ownership;
* warning expiration;
* validation policy.

This work packet will not silence those warnings globally, weaken validation, or normalize ambiguity into accepted behavior.

It will:

1. capture a reproducible warning baseline;
2. classify every warning;
3. distinguish defects from intentional states;
4. repair canonical source metadata where the source is wrong or incomplete;
5. introduce explicit metadata for intentional placeholders, support documents, reserved series positions, and planned references;
6. refine validator behavior only where the current diagnostic is semantically incorrect;
7. require ownership, rationale, and expiration for every temporary waiver;
8. add regression tests for every accepted governance rule;
9. produce closure evidence demonstrating that no warning remains unclassified.

The target is not merely a lower warning count.

The target is a governed corpus in which every published artifact has an explicit identity and lifecycle, every relationship has a declared semantic status, every series gap has a documented disposition, and every remaining diagnostic represents actionable information rather than accepted background noise.

---

# Scheduling and Activation

## Current Status

This work packet is **planned**.

It is not active during the current PI-002 compiler-specification sequence.

## Activation Gate

Activate WP-PUB-0001 after the Compiler Implementation Threshold has been declared, unless an observed publication warning is reclassified as:

* a P0 architectural contradiction;
* a security issue;
* a release-integrity defect;
* a source-corruption risk;
* a blocker for an active compiler specification.

## Milestone Alignment

This work primarily supports:

```text
M-005 — Projection Bootstrap Operational
```

It also supports M-002 by improving the reliability and discoverability of compiler specifications without changing their normative content.

## Non-Interference Rule

Execution of this work packet must not displace or alter the ordered PI-002 sequence:

```text
MSC-CORE-0008
        ↓
MSC-CORE-0009
        ↓
MSC-CORE-0010
        ↓
Compiler consistency review
        ↓
Implementation threshold
```

Publication cleanup may proceed earlier only when required to preserve the correctness of that sequence.

---

# Problem Statement

The publication validator currently reports a large number of nonblocking warnings.

These warnings are not homogeneous.

Some are canonical-source defects:

* a required document lacks a stable identifier;
* a relationship uses an incomplete identifier such as `MKE-CORE-000`;
* a source claims a target that does not exist;
* a document body is unexpectedly empty;
* a series position is missing accidentally.

Some are intentional but not explicitly modeled:

* a support document does not belong to a numbered series;
* a grammar or AST file is a bootstrap placeholder;
* a future specification is referenced before creation;
* a series position is reserved;
* a template uses a non-installment placeholder identity;
* a relation points to a family, namespace, or conceptual subsystem rather than one concrete artifact.

Some may be validator-model defects:

* a valid family-level relationship is interpreted as a missing document;
* a planned target is interpreted as a broken target;
* a support document is treated as a required normative specification;
* an intentionally empty placeholder is treated as an accidental empty document;
* a reserved series position is treated as an unexplained gap.

Without a governing policy, these classes are rendered as one undifferentiated warning stream.

That creates several risks:

1. Real defects become difficult to see among accepted warnings.
2. Contributors learn to ignore validation output.
3. The release gate cannot distinguish debt from corruption.
4. New warnings can enter without ownership.
5. Temporary conditions can become permanent through inertia.
6. Validator changes can suppress useful evidence.
7. Canonical sources can be altered merely to satisfy tooling rather than preserve meaning.
8. Generated `UNTRACKED-*` identifiers can become de facto identities without architectural approval.
9. Planned relationships can be mistaken for broken references.
10. Empty artifacts can appear published and authoritative despite containing no substantive contract.
11. The publication registry can diverge from the specification registry.
12. Warning-count reduction can be mistaken for governance completion.

Monad requires a content-governance layer that preserves the distinction between:

```text
invalid
incomplete
planned
reserved
placeholder
supporting
informative
normative
withdrawn
superseded
unpublished
```

---

# Governing Principle

> No publication diagnostic may be ignored merely because it is nonblocking.

Every warning must result in exactly one governed disposition:

1. **Correct the canonical source.**
2. **Represent the intentional state explicitly.**
3. **Correct the validator's semantic model.**
4. **Exclude an ineligible source through an explicit publication rule.**
5. **Grant a temporary, owned, expiring waiver.**
6. **Escalate the condition to an error.**

A warning must never disappear through:

* a broad ignore pattern;
* an undocumented allowlist;
* deletion of useful validation;
* arbitrary generated metadata;
* source changes that alter meaning merely to satisfy tooling;
* reclassification without tests;
* permanent waiver without review.

---

# Objectives

This work packet has the following objectives:

1. Capture the complete content-warning baseline in a machine-readable and human-readable form.
2. Assign each warning a stable diagnostic key and source location.
3. Classify every warning by semantic category.
4. Determine whether each warning is a source defect, intentional state, validator defect, publication-policy issue, or temporary exception.
5. Define canonical identity requirements by artifact class and source root.
6. Define the status of stable generated `UNTRACKED-*` identifiers.
7. Define explicit identity for support and index documents.
8. Define publication eligibility for templates, placeholders, registries, indexes, and operational documents.
9. Define lifecycle metadata for empty and incomplete artifacts.
10. Define reserved series positions.
11. Define the distinction between missing, planned, reserved, family-level, alias, external, and withdrawn relationship targets.
12. Define how future references are represented.
13. Define how incomplete symbolic references are detected and corrected.
14. Reconcile the publication registry with the specification registry where their scopes overlap.
15. Add owner, rationale, creation date, and expiration to temporary waivers.
16. Prevent warning-count regressions.
17. Preserve all valid historical and architectural relationships.
18. Keep source documents canonical and generated projections disposable.
19. Make release-verification output actionable.
20. Establish closure criteria based on governance coverage, not cosmetic warning reduction.
21. Produce a reusable policy for future self-hosted publication.
22. Provide implementation requirements suitable for future MPE and MKE integration.

---

# Required Outcome

At completion, a contributor must be able to answer:

* Which documents require governed canonical identifiers?
* Which support documents may exist outside numbered series?
* Are `UNTRACKED-*` identifiers canonical, provisional, or projection-local?
* How is a README published without pretending it is a normative specification?
* How is an empty bootstrap file distinguished from an accidentally empty file?
* How is a template identified?
* Can a template use a `-0000` identifier?
* How is a reserved series position declared?
* How is an accidental series gap detected?
* How is a future relationship different from a broken relationship?
* How is a family-level reference such as `KIR-CORE` represented?
* How is an alias resolved?
* How is a withdrawn or archived target represented?
* Which missing targets are errors?
* Which missing targets are warnings?
* Which planned targets are informational?
* What metadata is required for a warning waiver?
* Who owns each unresolved warning?
* When does a waiver expire?
* How does CI detect a new unclassified warning?
* How are warning changes reviewed?
* How does the publication registry relate to `specifications.yaml`?
* How do canonical corrections preserve document history?
* What evidence proves the warning-governance work is complete?

---

# Scope

## Included

This work packet includes:

* content-validator warning inventory;
* publication identity rules;
* support-document identity;
* template identity;
* placeholder identity;
* publication eligibility;
* lifecycle and maturity metadata;
* series positions;
* reserved positions;
* series completeness;
* relationship-target classification;
* planned relationships;
* aliases;
* family and namespace references;
* external references;
* withdrawn and superseded targets;
* empty-document policy;
* warning waivers;
* diagnostic severity;
* warning ownership;
* warning expiration;
* validator configuration;
* registry reconciliation;
* regression tests;
* CI and release-gate evidence;
* canonical source corrections;
* publication-projection regeneration;
* documentation of governance decisions.

## Excluded

This work packet does not include:

* authoring the substantive content of every planned MKE specification;
* completing MSC-CORE-0008 through MSC-CORE-0010;
* creating all future KIR, MSG, MGO, MPE, or MAE specifications;
* redesigning the publication website;
* changing the accepted Monad architecture;
* changing normative specification semantics without an authorizing ADR or specification revision;
* replacing the specification registry;
* implementing MKE;
* implementing the complete MPE subsystem;
* designing permanent contributor governance;
* suppressing all warnings;
* converting warnings to errors without impact analysis;
* renumbering accepted series artifacts merely to remove gaps;
* rewriting repository history;
* treating generated projections as canonical sources.

Substantive missing documents discovered during this work must be assigned to separate work packets unless the correction is strictly metadata-level or editorial.

---

# Baseline

## Observed Baseline

The initial baseline for this work packet is the release-verification content report observed on 2026-08-06:

```text
137 canonical document(s)
17 series
0 redirect(s)
260 warning(s)
0 error(s)
```

The count is evidence, not a permanent invariant.

The corpus may change before activation.

## Baseline Capture Requirement

When this work packet begins, regenerate the baseline from the current branch:

```bash
cd publication/site

bun run content:validate 2>&1 \
  | tee ../../engineering/reviews/PUB-CONTENT-GOVERNANCE-BASELINE.raw.txt
```

The implementation must also produce a structured report containing at least:

```yaml
baseline:
  generated_at: <timestamp>
  git_commit: <commit>
  canonical_documents: <count>
  series: <count>
  redirects: <count>
  warnings: <count>
  errors: <count>

diagnostics:
  - code: CONTENT_ID_INFERRED
    source: engineering/PROJECT-STATUS.md
    line: null
    severity: warning
    classification: support_document_identity
    disposition: pending
    owner: null
    expires: null
```

## Baseline Immutability

The original baseline report must not be overwritten.

Subsequent runs must create comparison reports so reviewers can determine:

* warnings removed;
* warnings added;
* warnings reclassified;
* warnings waived;
* warnings escalated;
* warnings resolved through source correction;
* warnings resolved through explicit metadata;
* warnings resolved through validator correction.

---

# Warning Taxonomy

Every warning must belong to exactly one primary class.

## Class A — Canonical Source Defect

The canonical source is wrong, malformed, internally inconsistent, or incomplete relative to its declared authority.

Examples:

* malformed identifier;
* incomplete identifier;
* relation typo;
* duplicate identity;
* invalid series position;
* required normative document without identity;
* accidental empty body;
* undeclared supersession;
* incorrect canonical path.

Required action:

```text
Correct the canonical source.
```

## Class B — Intentional Transitional State

The condition is valid but temporary and must be represented explicitly.

Examples:

* planned future specification;
* bootstrap placeholder;
* reserved series position;
* provisional relationship;
* deferred content;
* pending migration.

Required action:

```text
Add explicit lifecycle or planning metadata.
```

## Class C — Intentional Permanent State

The condition is valid and expected indefinitely.

Examples:

* collection index;
* support README;
* publication operations page;
* template;
* family-level relationship;
* external standard reference.

Required action:

```text
Model the permanent state explicitly so it is not emitted as an unresolved warning.
```

## Class D — Validator Semantic Defect

The validator is interpreting valid source semantics incorrectly.

Examples:

* family reference treated as missing artifact;
* planned relation treated as broken relation;
* template identity treated as installment zero;
* support document treated as normative specification.

Required action:

```text
Correct validator semantics and add a regression test.
```

## Class E — Publication-Scope Defect

The source should not be published under its current collection or policy.

Examples:

* internal implementation note accidentally included;
* template projected into reader navigation despite being authoring-only;
* generated file rediscovered as canonical input;
* cache or backup file entering source discovery.

Required action:

```text
Correct publication eligibility or source-root policy explicitly.
```

## Class F — Temporary Waiver

The warning is understood but cannot be resolved within the current work packet.

Required action:

```text
Create a narrow, owned, expiring waiver with a linked follow-up work packet.
```

## Class G — Severity Defect

The condition is too serious or too weak for its current severity.

Examples:

* duplicate canonical ID reported as warning;
* malformed required identity reported as warning;
* optional description reported as error;
* planned target reported as ordinary missing target.

Required action:

```text
Reclassify severity with tests and documented rationale.
```

---

# Current Warning Families

The baseline is expected to include at least the following warning families.

## `CONTENT_SERIES_POSITION_GAP`

Observed examples include:

* ADR positions 4 and 6;
* BL positions 3 and 4.

Possible dispositions:

* the positions are accidentally missing;
* the positions are intentionally reserved;
* artifacts existed and were withdrawn;
* artifacts were renumbered incorrectly;
* the series is noncontiguous by policy.

Required governance:

* never infer the answer from absence alone;
* inspect repository history and canonical registries;
* record reserved or withdrawn positions explicitly;
* do not renumber accepted artifacts solely to create contiguous numbering.

## `CONTENT_EMPTY_BODY`

Observed examples include:

* `engineering/increments/PI-001.md`;
* increment support files;
* MKE bootstrap documents;
* MSL grammar and AST placeholders.

Possible dispositions:

* accidental truncation;
* placeholder;
* generated stub;
* intentionally metadata-only document;
* publication-ineligible internal file.

Required governance:

* substantive normative artifacts must not publish as apparently complete when empty;
* placeholders must declare lifecycle and placeholder intent;
* accidental emptiness must be corrected or escalated;
* publication-ineligible files must be excluded through explicit scope policy;
* empty-body status must remain queryable.

## `CONTENT_ID_INFERRED`

Observed examples include:

* engineering status documents;
* work-packet indexes;
* roadmap and milestone support documents;
* templates.

Possible dispositions:

* assign canonical support-document identity;
* declare projection-local identity policy;
* mark as noncanonical collection index;
* remove from governed publication scope.

Required governance:

* stable hashing is not automatically canonical identity;
* a generated identifier must not silently acquire architectural authority;
* support-document identity rules must be deterministic and documented.

## `CONTENT_REQUIRED_ID_INFERRED`

Observed examples include files under normative specification roots.

This warning is stronger than ordinary inferred identity.

Required governance:

* normative artifacts must receive explicit governed identifiers;
* support files under normative roots must be classified explicitly;
* moving a support file may be preferable to pretending it is a specification;
* broad exemptions for an entire source root are prohibited.

## `CONTENT_RELATION_TARGET_MISSING`

Observed examples include:

* future work packets;
* future MSC-CORE installments;
* family symbols such as `KIR-CORE`;
* incomplete symbols such as `MKE-CORE-000`;
* subsystem concepts;
* unregistered support artifacts.

Required governance:

* distinguish exact artifact targets from family targets;
* distinguish planned targets from broken targets;
* detect malformed and incomplete identifiers;
* support aliases only through explicit declarations;
* preserve useful forward references without reporting them as indistinguishable breakage.

---

# Identity Governance

## Identity Classes

The policy must define at least these identity classes:

| Identity class | Purpose | Canonical? | Example |
|---|---|---:|---|
| governed artifact ID | Stable identity for an authoritative artifact | Yes | `MSC-CORE-0008` |
| governed support ID | Stable identity for a project support document | Yes | `MONAD-ENGINEERING-ROADMAP` |
| collection identity | Identity for an index or collection view | Yes, at collection level | `MONAD-WORK-PACKETS-INDEX` |
| template identity | Identity for an authoring template | Yes, as template | `MONAD-SPECIFICATION-TEMPLATE` |
| placeholder identity | Stable identity for a planned artifact stub | Provisional | `MKE-GRAPH-0001` |
| projection identity | Identity of one generated representation | Derived | content hash or projection URI |
| synthetic navigation ID | Generated UI-only identity | No | internal route key |
| untracked fallback ID | Diagnostic continuity for unidentified source | No | `UNTRACKED-FB0E29BDDE` |

## `UNTRACKED-*` Rule

`UNTRACKED-*` identifiers:

* may be used to stabilize diagnostics;
* may be used to avoid collisions during projection;
* must remain visibly noncanonical;
* must not be referenced as normative identities;
* must not satisfy a required-ID policy;
* must not be persisted as final artifact identity;
* must disappear when an explicit identity is assigned;
* must be reproducible for the same canonical path while needed;
* must not change merely because body prose changes.

## Support-Document Identity

Support documents should receive explicit, descriptive identities when they are:

* published;
* linked;
* included in search;
* used as project authority;
* referenced by other artifacts;
* included in release editions.

Examples:

```yaml
artifact:
  id: MONAD-ENGINEERING-PROJECT-STATUS
  type: engineering.project-status
  namespace: monad
```

A support document must not be forced into an unrelated numbered specification series.

## Template Identity

Templates must be identified by role rather than installment position.

A template identity such as:

```text
SERIES-CATEGORY-0000
```

may appear inside example content, but publication metadata must classify the artifact as a template and must not treat `0000` as a real series installment.

## Identity Migration

When replacing an inferred identity with an explicit identity:

1. preserve the old inferred identifier in migration evidence;
2. update registry entries;
3. regenerate projections;
4. verify that canonical URLs remain stable or provide redirects;
5. verify that relationships resolve;
6. ensure search indexes no longer expose the old identity as canonical;
7. record the migration in the closure report.

---

# Lifecycle and Placeholder Governance

## Required Lifecycle States

The publication policy must distinguish at least:

```text
draft
review
accepted
implemented
placeholder
planned
deferred
deprecated
superseded
withdrawn
archived
```

## Placeholder Requirements

A placeholder artifact must declare:

```yaml
publication:
  lifecycle: placeholder
  publishable: true
  substantive: false
  placeholder_reason: <reason>
  planned_completion:
    milestone: <milestone or null>
    work_packet: <work packet or null>
```

Equivalent metadata may be used if it aligns with the canonical artifact schema.

A placeholder must not appear visually indistinguishable from an accepted substantive specification.

## Empty-Body Rules

An empty body is:

* an **error** for an accepted normative artifact;
* an **error** for an implemented contract;
* a **warning** for an undeclared draft;
* allowed for an explicitly declared placeholder;
* allowed for a deliberately metadata-only artifact type;
* excluded when the file is not publication-eligible.

## Placeholder Completion

When substantive content is added:

* remove or update placeholder metadata;
* preserve creation history;
* retain the same artifact identity unless governance requires replacement;
* rerun relationship and series validation;
* update the registry.

---

# Series Governance

## Series Record

Every governed series must declare:

```yaml
series:
  id: ADR
  title: Architectural Decision Records
  numbering:
    width: 4
    starts_at: 1
    contiguous: true
  reserved_positions: []
  withdrawn_positions: []
```

Equivalent configuration may be used.

## Gap Dispositions

Every missing position must be one of:

```text
accidental
reserved
withdrawn
historical
not-applicable
```

## Reserved Position Requirements

A reserved position must include:

* series ID;
* position;
* reason;
* owner;
* date reserved;
* intended artifact or purpose, if known;
* review date;
* expiration or permanent status.

## Withdrawn Position Requirements

A withdrawn position must preserve:

* former identity;
* title, if known;
* withdrawal reason;
* withdrawal authority;
* replacement or superseding artifact;
* historical source location, if available.

## Renumbering Rule

Accepted artifacts must not be renumbered merely to eliminate gaps.

Renumbering requires explicit migration analysis because identity, URLs, references, citations, and history may depend on the existing number.

---

# Relationship Governance

## Relationship Target Classes

A relationship target must be classified as one of:

| Target class | Meaning |
|---|---|
| exact | One canonical artifact |
| alias | Alternate identifier resolving to one canonical artifact |
| family | A governed artifact family or series |
| namespace | A semantic namespace |
| planned | A specific future artifact |
| external | A URI or external standard |
| withdrawn | A historical target no longer active |
| unresolved | Unknown or malformed target |

## Exact Relationships

Exact targets must resolve to one canonical artifact.

Failure to resolve an exact target is an error unless a temporary waiver exists.

## Planned Relationships

Planned targets must declare enough information to distinguish intention from breakage:

```yaml
relationships:
  planned:
    - target: MSC-CORE-0008
      expected_milestone: M-002
      reason: Required future compiler contract
```

Planned relationships must be reviewed when the target is created or when the expected milestone closes.

## Family Relationships

Family targets such as:

```text
KIR-CORE
MSG-CORE
MKE-CORE
```

must resolve through an explicit family registry.

They must not be interpreted as missing exact document IDs.

## Incomplete Identifiers

Identifiers such as:

```text
MKE-CORE-000
MSL-CORE-000
```

must be treated as malformed or incomplete unless the grammar explicitly defines them as patterns.

They must not be silently reclassified as families.

## Aliases

Aliases must be explicit, unique, and reversible:

```yaml
aliases:
  - MSC-CORE
```

An alias must resolve to no more than one canonical target within the applicable context.

## External Relationships

External targets must use a URI or a registered external-reference identifier and must record:

* source;
* version, when applicable;
* access or publication date, when applicable;
* relationship type.

## Withdrawn Relationships

A relationship to a withdrawn artifact must remain historically resolvable and should expose:

* withdrawal status;
* replacement;
* effective date.

---

# Publication Eligibility

## Eligibility Classes

Every discovered source must be classifiable as:

```text
publish
publish-as-placeholder
publish-as-support
publish-as-template
index-only
internal-only
exclude
```

## Explicit Exclusion

Exclusion rules must be:

* path-specific or artifact-class-specific;
* documented;
* tested;
* visible in configuration;
* independent of generated output state.

## Prohibited Discovery

The canonical source scanner must never ingest:

* `.generated/`;
* `.source/`;
* `.next/`;
* backups;
* coverage output;
* downloaded release artifacts;
* generated editions;
* caches;
* temporary files.

---

# Registry Governance

## Registry Responsibilities

The publication registry and specification registry serve different purposes but must not contradict each other.

The governance model must define:

* which registry owns canonical artifact identity;
* which registry owns publication routes;
* which registry owns series metadata;
* which registry owns lifecycle;
* how aliases are synchronized;
* how planned artifacts are represented;
* how withdrawn artifacts remain discoverable;
* how generated registry output is distinguished from canonical registry input.

## Reconciliation Report

Produce a report identifying:

* artifacts present in both registries;
* artifacts present only in the specification registry;
* artifacts present only in the publication registry;
* identity disagreements;
* title disagreements;
* status disagreements;
* series disagreements;
* path disagreements;
* relationship disagreements.

No automated reconciliation may overwrite canonical metadata without review.

---

# Warning Waivers

## Waiver Policy

Waivers are temporary governance artifacts, not ignore comments.

Every waiver must include:

```yaml
id: PUB-WAIVER-0001
diagnostic: CONTENT_RELATION_TARGET_MISSING
source: specifications/example.md
target: FUTURE-CORE-0001
reason: Target is authorized but scheduled for a later milestone
owner: Thomas Carter
created: 2026-08-06
expires: 2026-09-30
follow_up: WP-EXAMPLE-0001
```

## Waiver Constraints

A waiver must be:

* narrow;
* source-specific;
* diagnostic-specific;
* owned;
* dated;
* justified;
* linked to follow-up work;
* expiring.

## Prohibited Waivers

The following are prohibited:

* wildcard waiver for all missing relationships;
* waiver without owner;
* waiver without expiration;
* waiver for duplicate canonical identity;
* waiver for malformed required identity;
* waiver used to publish corrupted source;
* waiver created solely to reach zero warnings.

## Expired Waivers

An expired waiver must fail validation until it is:

* resolved;
* renewed through review;
* replaced by an explicit permanent governance rule.

---

# Diagnostic Severity Policy

## Error

A diagnostic must be an error when it indicates:

* duplicate canonical identity;
* invalid frontmatter that prevents trustworthy interpretation;
* malformed required identifier;
* unresolved exact relationship in an accepted normative artifact;
* empty body in accepted normative content;
* projection collision;
* canonical path collision;
* invalid series position;
* expired waiver;
* registry contradiction affecting identity;
* generated source entering canonical discovery.

## Warning

A diagnostic may remain a warning when it indicates:

* undeclared placeholder;
* draft support document without explicit identity;
* accidental series gap under investigation;
* planned target without planning metadata;
* registry mismatch not affecting identity;
* temporary incomplete metadata.

## Information

A diagnostic should be informational when it reports an explicitly governed state such as:

* declared placeholder;
* reserved position;
* planned relationship;
* support-document identity migration;
* intentional collection index;
* active nonexpired waiver.

The ordinary release output should emphasize errors and unclassified warnings while allowing verbose modes to display informational governance states.

---

# Configuration Deliverable

Create:

```text
publication/site/config/content-governance.mjs
```

The configuration should contain or compile:

* artifact-class identity rules;
* source-root rules;
* publication eligibility;
* series definitions;
* reserved and withdrawn positions;
* family targets;
* aliases;
* external references;
* waiver records;
* severity overrides;
* governance-policy version.

Example conceptual shape:

```js
export const contentGovernance = {
  version: '1.0.0',
  identities: {
    requiredRoots: ['specifications'],
    supportDocuments: {},
  },
  publication: {
    eligibility: [],
  },
  series: {},
  relationships: {
    families: {},
    aliases: {},
    planned: {},
  },
  waivers: [],
};
```

The final shape must follow repository conventions and remain deterministic.

---

# Implementation Plan

## Phase 1 — Reproduce and Freeze the Baseline

1. Run content validation from a clean worktree.
2. Capture raw output.
3. Capture structured diagnostics.
4. Record the commit SHA and tool versions.
5. Group diagnostics by code.
6. Group diagnostics by source root.
7. Record document, series, redirect, warning, and error totals.
8. Store the immutable baseline review artifact.

Deliverable:

```text
engineering/reviews/PUB-CONTENT-GOVERNANCE-BASELINE.md
```

## Phase 2 — Classify Every Diagnostic

For every warning:

1. assign one taxonomy class;
2. assign one owner;
3. select one disposition;
4. assign a target milestone or follow-up work packet;
5. record whether source semantics will change;
6. record whether an ADR or specification amendment is required;
7. record expected diagnostic behavior after resolution.

No warning may remain classified as merely “known.”

## Phase 3 — Resolve Identity Warnings

1. Inventory all inferred IDs.
2. Separate support documents from normative artifacts.
3. assign explicit support-document identities where appropriate;
4. preserve `UNTRACKED-*` values in migration evidence;
5. correct required identities;
6. define template identity;
7. verify canonical route stability;
8. update registries;
9. add regression tests.

## Phase 4 — Resolve Empty-Body Warnings

1. Determine whether each empty file is accidental, placeholder, metadata-only, or ineligible.
2. Recover accidental truncation where evidence exists.
3. Add placeholder metadata where authorized.
4. create follow-up work packets for substantive authoring.
5. exclude internal-only stubs where appropriate.
6. ensure placeholder pages are visibly identified.
7. add lifecycle tests.

## Phase 5 — Resolve Series Warnings

1. Investigate ADR positions 4 and 6.
2. Investigate BL positions 3 and 4.
3. inspect repository history and references;
4. classify each gap;
5. record reserved or withdrawn positions;
6. avoid renumbering accepted artifacts;
7. add series-policy tests.

## Phase 6 — Resolve Relationship Warnings

1. Parse and classify every missing target.
2. correct typos and malformed IDs;
3. register family targets;
4. register aliases;
5. mark planned exact targets;
6. link future targets to milestones or work packets;
7. preserve withdrawn-target history;
8. escalate unresolved exact targets in accepted normative artifacts;
9. add relationship-resolution tests.

## Phase 7 — Reconcile Registries

1. Compare specification and publication registries.
2. identify scope differences;
3. resolve identity contradictions;
4. resolve lifecycle contradictions;
5. record intentional asymmetry;
6. prevent generated registry data from replacing canonical source;
7. add reconciliation tests.

## Phase 8 — Implement Waiver Governance

1. Create the waiver schema.
2. migrate any legitimate temporary exceptions;
3. reject broad or permanent waivers;
4. add expiration validation;
5. add owner and follow-up validation;
6. add CI tests for expired waivers.

## Phase 9 — Harden the Release Gate

1. Make unclassified warnings fail the governance check.
2. make new warning codes fail until classified;
3. produce concise summary output;
4. retain verbose reports as artifacts;
5. compare the current warning set with the approved baseline;
6. prevent warning-count growth without review;
7. run the full release-verification pipeline.

## Phase 10 — Review and Close

1. Generate the final diagnostic inventory.
2. compare it with the baseline;
3. verify every warning disposition;
4. verify no validation rule was broadly weakened;
5. verify canonical sources remain authoritative;
6. verify release checks;
7. produce the closure review.

Deliverable:

```text
engineering/reviews/PUB-CONTENT-GOVERNANCE-CLOSURE.md
```

---

# Required Decision Record

The implementation must produce a warning-disposition table containing at least:

| Diagnostic | Source | Classification | Disposition | Owner | Follow-up | Final severity |
|---|---|---|---|---|---|---|
| `CONTENT_ID_INFERRED` | `engineering/PROJECT-STATUS.md` | permanent support state | assign support ID | Thomas Carter | none | none/info |
| `CONTENT_EMPTY_BODY` | `specifications/MKE/...` | transitional placeholder | declare placeholder | Thomas Carter | future MKE packet | info |
| `CONTENT_SERIES_POSITION_GAP` | ADR 4 | pending investigation | reserve, restore, or withdraw | Thomas Carter | review item | none/info/error |
| `CONTENT_RELATION_TARGET_MISSING` | exact future MSC target | planned relation | declare planned target | Thomas Carter | M-002 | info |
| `CONTENT_RELATION_TARGET_MISSING` | `MKE-CORE-000` | source defect | correct identifier | Thomas Carter | none | error until fixed |

The completed table must cover the entire baseline.

---

# Required Tests

## Identity Tests

Test that:

* explicit IDs remain canonical;
* support IDs are accepted;
* required roots reject missing canonical IDs;
* `UNTRACKED-*` remains noncanonical;
* body references cannot establish identity;
* template examples do not establish installment identity;
* identity migration does not create collisions.

## Placeholder Tests

Test that:

* accepted empty normative artifacts fail;
* declared placeholders pass;
* undeclared empty drafts warn;
* placeholder pages expose lifecycle metadata;
* placeholder completion removes obsolete warnings.

## Series Tests

Test that:

* accidental gaps warn or fail according to policy;
* reserved positions pass;
* withdrawn positions remain historically visible;
* position zero is invalid for installments;
* templates are not installments;
* duplicate positions fail.

## Relationship Tests

Test that:

* exact targets resolve;
* aliases resolve uniquely;
* families resolve through the family registry;
* planned targets are distinguished from missing targets;
* malformed identifiers fail;
* withdrawn targets remain resolvable;
* missing exact targets in accepted normative artifacts fail;
* external URIs validate.

## Waiver Tests

Test that:

* narrow active waivers pass;
* expired waivers fail;
* ownerless waivers fail;
* waivers without follow-up fail when follow-up is required;
* wildcard waivers fail;
* duplicate-ID waivers are prohibited.

## Registry Tests

Test that:

* identity contradictions fail;
* intentional scope differences are representable;
* generated registries cannot become canonical input;
* alias and lifecycle values reconcile deterministically.

## Regression Tests

Add one regression test for each validator defect corrected during execution.

---

# Validation Commands

The completed work must pass:

```bash
cd publication/site

bun run content:validate
bun run check
bun run typecheck
bun run test:coverage
bun run build
bun run verify:release
```

Where supported, also run the strict content-governance check:

```bash
bun run content:validate --strict
```

If a dedicated command is introduced, it should be named clearly, for example:

```bash
bun run content:governance
```

---

# Acceptance Criteria

WP-PUB-0001 is complete only when all of the following are true.

## Baseline and Classification

- [ ] A reproducible baseline report exists.
- [ ] The baseline records commit and tool versions.
- [ ] Every baseline warning has one primary classification.
- [ ] Every baseline warning has one disposition.
- [ ] Every unresolved item has an owner.
- [ ] Every deferred item has a follow-up work packet or milestone.
- [ ] No warning is categorized merely as “known.”

## Identity

- [ ] Every normative artifact requiring identity has an explicit governed ID.
- [ ] Support-document identity policy is documented.
- [ ] Template identity policy is documented.
- [ ] `UNTRACKED-*` is formally noncanonical.
- [ ] No canonical relationship targets an `UNTRACKED-*` identifier.
- [ ] Identity migrations are recorded.
- [ ] No duplicate identity exists.

## Empty and Placeholder Content

- [ ] Every empty artifact is classified.
- [ ] Accidental empty artifacts are restored or blocked.
- [ ] Intentional placeholders declare lifecycle state.
- [ ] Accepted normative artifacts cannot be empty.
- [ ] Placeholder pages are visibly identified.
- [ ] Substantive authoring is assigned to separate work where required.

## Series

- [ ] ADR positions 4 and 6 have explicit dispositions.
- [ ] BL positions 3 and 4 have explicit dispositions.
- [ ] Reserved-position policy exists.
- [ ] Withdrawn-position policy exists.
- [ ] Accepted artifacts were not renumbered merely to hide gaps.
- [ ] Series validation is covered by tests.

## Relationships

- [ ] Every malformed or incomplete identifier is corrected.
- [ ] Exact targets resolve or fail appropriately.
- [ ] Planned targets are explicitly declared.
- [ ] Family targets are explicitly registered.
- [ ] Aliases are explicit and unique.
- [ ] External references are typed.
- [ ] Withdrawn targets remain historically resolvable.
- [ ] No accepted normative artifact contains an unexplained missing exact target.

## Waivers

- [ ] Every waiver is narrow.
- [ ] Every waiver has an owner.
- [ ] Every waiver has a reason.
- [ ] Every waiver has an expiration.
- [ ] Every waiver has follow-up work where required.
- [ ] Expired waivers fail validation.
- [ ] No prohibited waiver exists.

## Registries

- [ ] Registry responsibilities are documented.
- [ ] Publication and specification registries are reconciled.
- [ ] Identity contradictions are resolved.
- [ ] Intentional scope differences are recorded.
- [ ] Generated registry output is not canonical input.

## Tooling and Release

- [ ] New warning codes cannot enter silently.
- [ ] Unclassified warnings fail the governance gate.
- [ ] Warning reports are deterministic.
- [ ] Regression tests cover every validator semantic correction.
- [ ] `bun run content:validate` passes with zero errors.
- [ ] `bun run check` passes.
- [ ] `bun run typecheck` passes.
- [ ] `bun run test:coverage` passes.
- [ ] `bun run build` passes.
- [ ] `bun run verify:release` passes.
- [ ] The closure review is accepted.

---

# Quantitative Completion Standard

The original baseline contains 260 warnings.

Completion does not require an arbitrary numerical reduction alone.

It requires:

```text
unclassified warnings = 0
unowned warnings = 0
expired waivers = 0
malformed required identifiers = 0
duplicate canonical identifiers = 0
unexplained series gaps = 0
unexplained empty accepted artifacts = 0
unexplained missing exact targets = 0
```

Residual diagnostics may exist only as explicitly modeled informational states or active temporary waivers.

The ordinary release summary should not present governed informational states as unresolved warnings.

---

# Nonfunctional Requirements

## Determinism

The same source tree and governance configuration must produce the same:

* identities;
* classifications;
* warning keys;
* registry entries;
* report ordering;
* projection paths.

## Traceability

Every diagnostic disposition must trace to:

* source location;
* policy rule;
* owner;
* decision;
* follow-up;
* test.

## Reversibility

Canonical-source corrections must be reviewable and reversible through version control.

Generated projections must remain disposable.

## Performance

Governance validation must remain practical for local development and CI.

Any material increase in synchronization time must be measured and justified.

## Portability

The policy must not depend on one deployment provider.

## Human Readability

Reports and configuration must be understandable without reading validator implementation code.

---

# Risks

## Risk 1 — Warning Suppression Masquerades as Completion

Mitigation:

* prohibit broad suppression;
* require disposition records;
* review validator diffs;
* compare baseline and closure behavior.

## Risk 2 — Tooling Changes Canonical Meaning

Mitigation:

* require semantic review for source changes;
* separate metadata corrections from normative revisions;
* require ADR or specification authority where meaning changes.

## Risk 3 — Premature Identity Assignment

Mitigation:

* define support and provisional identity classes;
* keep `UNTRACKED-*` noncanonical;
* require migration evidence.

## Risk 4 — Future References Are Deleted

Mitigation:

* represent planned relations explicitly;
* preserve architecture intent;
* link planned targets to milestones and work packets.

## Risk 5 — Placeholder Stubs Appear Normative

Mitigation:

* require placeholder lifecycle metadata;
* render visible placeholder status;
* prevent accepted empty documents.

## Risk 6 — Series History Is Rewritten

Mitigation:

* investigate gaps;
* reserve or withdraw positions;
* prohibit cosmetic renumbering.

## Risk 7 — Waivers Become Permanent

Mitigation:

* require expiration;
* fail expired waivers;
* require owner and follow-up.

## Risk 8 — Publication Registry Becomes a Competing Source of Truth

Mitigation:

* define registry responsibilities;
* reconcile rather than overwrite;
* keep generated data derived.

## Risk 9 — Work Distracts from PI-002

Mitigation:

* keep status planned;
* enforce activation gate;
* permit only P0 contradiction, security, or release-integrity exceptions.

---

# Rollback Strategy

If a governance-policy change produces incorrect publication behavior:

1. revert the policy change;
2. restore the prior canonical source;
3. delete `.generated`, `.source`, and `.next`;
4. rerun synchronization;
5. rerun release verification;
6. preserve the failed diagnostic report;
7. add a regression test before retrying.

Suggested commands:

```bash
cd publication/site

rm -rf .generated .source .next
bun run content:sync
bun run verify:release
```

Rollback must not restore a known duplicate identity, malformed required identifier, or source-corruption condition without an explicit emergency record.

---

# Deliverables

## Primary Deliverables

```text
engineering/reviews/PUB-CONTENT-GOVERNANCE-BASELINE.md
engineering/reviews/PUB-CONTENT-GOVERNANCE-CLOSURE.md
publication/site/config/content-governance.mjs
publication/site/tests/unit/content-governance-policy.test.ts
```

## Canonical Source Corrections

Corrections may affect:

```text
architecture/
engineering/
specifications/
publication/
```

Every source correction must be enumerated in the closure report.

## Generated Evidence

The implementation should generate:

```text
publication/site/.generated/reports/content-governance.json
publication/site/.generated/reports/content-governance.md
```

Generated evidence must not become canonical input.

---

# Closure Review Requirements

The closure review must include:

1. executive summary;
2. baseline counts;
3. final counts;
4. diagnostic changes by code;
5. source files changed;
6. identities assigned;
7. identities migrated;
8. placeholders declared;
9. series gaps dispositioned;
10. relationships corrected;
11. planned relationships registered;
12. family and alias targets registered;
13. waivers created;
14. waiver expirations;
15. registry reconciliation;
16. validator semantic changes;
17. regression tests added;
18. release-verification evidence;
19. unresolved follow-up work;
20. explicit statement that validation was not broadly weakened.

---

# Definition of Done

This work packet is done when Monad's publication warning stream is governed rather than merely tolerated.

The final state must satisfy:

```text
Every published source has an explicit publication role.
Every authoritative artifact has an explicit canonical identity.
Every empty artifact has an explicit lifecycle disposition.
Every series gap is explained.
Every relationship target has a semantic class.
Every temporary exception has an owner and expiration.
Every validator correction has a regression test.
Every remaining diagnostic is actionable or explicitly informational.
No warning is ignored by convention.
```

---

# Expected Follow-Up Work

WP-PUB-0001 may produce separate work packets for:

* substantive completion of MKE placeholders;
* substantive completion of MSL grammar and AST artifacts;
* restoration or formal withdrawal of missing ADRs;
* restoration or formal withdrawal of missing build-log installments;
* specification-family registry design;
* canonical support-document identity migration;
* publication-registry generation;
* MPE governance implementation;
* self-hosted content-governance compilation.

Those packets must remain separate from the metadata and policy work defined here.

---

# Final Completion Evidence

Completion requires a final command transcript showing:

```bash
bun run content:validate
bun run check
bun run typecheck
bun run test:coverage
bun run build
bun run verify:release
```

and a closure summary showing:

```text
0 errors
0 unclassified warnings
0 unexplained missing exact targets
0 unexplained series gaps
0 unexplained empty accepted artifacts
0 expired waivers
release verification passed
```

---

# Status

Planned.

Activation is gated by the PI-002 compiler implementation threshold unless an earlier P0 contradiction, security issue, release-integrity defect, or active-specification blocker requires execution.


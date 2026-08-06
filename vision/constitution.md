---

artifact:
id: MONAD-VISION-CONSTITUTION
type: vision.constitution
namespace: monad

metadata:
title: Monad Architectural Constitution
version: 0.1.0
status: draft
created: 2026-08-06
authors:
- Monad Architecture Team
tags:
- vision
- architecture
- constitution
- governance
- authority
- amendments
- compatibility
- conformance

relationships:
depends_on:
- MONAD-VISION-MANIFESTO
- MONAD-VISION-PRINCIPLES
- MONAD-VISION-LAWS
- MONAD-VISION-GLOSSARY
- MONAD-VISION-ECOSYSTEM
- MONAD-VISION-ARCHITECTURE-MAP
- MONAD-VISION-COMPILER-PIPELINE
- MONAD-VISION-KNOWLEDGE-LIFECYCLE
governs:
- MONAD-ARCHITECTURAL-DECISIONS
- MONAD-SPECIFICATIONS
- MONAD-ARCHITECTURAL-CHANGE
- MONAD-IMPLEMENTATION-CONFORMANCE
- MONAD-SELF-HOSTING-GOVERNANCE
-------------------------------

# Monad Architectural Constitution

## Preamble

Monad exists to make engineering knowledge explicit, compilable, traceable, durable, and reusable.

That mission requires more than specifications and software. It requires a disciplined method for determining:

* which architectural ideas are authoritative;
* how significant decisions are made;
* how normative behavior is established;
* how incompatible artifacts are reconciled;
* how architecture may evolve;
* how history is preserved;
* how implementation remains accountable to accepted intent.

This Constitution establishes that method.

It does not freeze Monad permanently. It creates a presumption of architectural stability while preserving a governed path for evidence-based evolution.

No artifact, implementation, contributor, automation, or AI system may silently acquire architectural authority merely by producing output, gaining adoption, or becoming operationally convenient.

Architectural authority must be explicit, traceable, reviewable, and preserved in the repository.

---

# Article I — Constitutional Purpose

## Section 1. Scope

This Constitution governs:

* architectural authority;
* architectural artifact precedence;
* architectural amendments;
* terminology governance;
* subsystem governance;
* dependency governance;
* representation governance;
* normative specification governance;
* architectural compatibility;
* implementation conformance;
* emergency architectural deviations;
* architecture-freeze procedures;
* AI participation in architectural work;
* self-hosting governance.

## Section 2. Exclusions

This Constitution does not govern:

* corporate ownership;
* legal-entity governance;
* employment;
* compensation;
* contributor conduct;
* licensing;
* trademarks;
* community moderation;
* general security incident response;
* release signing;
* jurisdiction-specific legal compliance.

Those matters require separate artifacts.

## Section 3. Architectural Domain

For purposes of this Constitution, architecture includes durable decisions concerning:

* subsystem responsibilities;
* canonical representations;
* semantic identity;
* provenance;
* authority;
* lifecycle;
* dependency direction;
* compiler stages;
* persistence boundaries;
* projection boundaries;
* trust boundaries;
* compatibility commitments;
* extension contracts;
* local-first guarantees;
* self-hosting responsibilities.

Routine implementation choices inside accepted boundaries are not automatically architectural.

---

# Article II — Foundational Commitments

Monad architecture must remain consistent with the following commitments.

## Section 1. Knowledge Primacy

Engineering knowledge is primary.

Files, databases, source code, documentation, interfaces, and generated outputs are representations or projections of engineering knowledge.

## Section 2. Explicit Meaning

Meaning must not depend silently on:

* filenames;
* directory location;
* source order;
* plugin registration order;
* database row identity;
* undocumented convention;
* remote provider behavior.

## Section 3. Stable Identity

Semantic identity must survive representation and storage changes.

## Section 4. Provenance

Every meaningful transformation, derivation, adoption, and lifecycle transition must remain traceable.

## Section 5. Canonical and Derived Separation

Canonical semantic knowledge must remain distinct from:

* compiler-internal state;
* persistent storage schemas;
* lowered representations;
* generated code;
* publications;
* AI context;
* application views.

## Section 6. Authority Discipline

Compilation, persistence, publication, repetition, popularity, or AI generation do not automatically grant authority.

## Section 7. Historical Preservation

Architectural decisions and semantic history must be superseded or withdrawn explicitly rather than silently erased.

## Section 8. Local-First Core

Core deterministic operation should remain possible without mandatory cloud services, remote AI providers, or proprietary infrastructure.

## Section 9. Honest Maturity

Planned, provisional, specified, accepted, implemented, deprecated, and superseded states must not be conflated.

## Section 10. Governed Evolution

Architecture may change when evidence justifies change, but the change must follow a process proportional to its impact.

---

# Article III — Sources of Architectural Authority

Architectural artifacts have distinct responsibilities.

No artifact should be used as a permanent substitute for another artifact class.

## Section 1. Monad Laws

The Monad Laws establish the highest foundational architectural invariants.

They describe what must remain true across the ecosystem.

They do not define detailed implementation contracts.

## Section 2. Architectural Constitution

This Constitution governs:

* authority;
* amendment;
* precedence;
* conformance;
* architectural change procedures.

It does not replace subsystem specifications.

## Section 3. Architectural Decision Records

An Architectural Decision Record records:

* a significant architectural question;
* alternatives;
* the accepted decision;
* rationale;
* consequences;
* status.

An ADR establishes an accepted architectural decision within the constraints of the Laws and Constitution.

## Section 4. Normative Specifications

A normative specification defines required:

* semantics;
* behavior;
* structures;
* interfaces;
* invariants;
* compatibility;
* conformance.

An ADR determines architectural direction.

A specification defines the resulting contract.

## Section 5. Canonical Glossary

The Canonical Glossary defines shared architectural terminology.

A specification may define a narrower contextual meaning but may not silently redefine a canonical term.

## Section 6. Accepted Architecture Documents

Accepted architecture documents explain:

* subsystem placement;
* responsibilities;
* boundaries;
* dependencies;
* knowledge flow;
* compiler flow;
* lifecycle.

They reflect accepted architecture and guide interpretation, but detailed normative specifications govern implementation behavior.

## Section 7. Work Packets

A work packet authorizes a bounded unit of engineering work.

It may implement accepted architecture or propose a change.

It does not independently amend architecture.

## Section 8. Program Increments and Milestones

Program increments and milestones coordinate outcomes.

They do not independently establish architecture or normative behavior.

## Section 9. Implementation

Implementation realizes accepted architecture and specifications.

Implementation provides evidence.

It does not silently become authoritative architecture through precedent.

## Section 10. Tests

Tests provide conformance evidence.

A test may reveal:

* an implementation defect;
* an inconsistent specification;
* an incorrect assumption;
* a missing requirement.

A test does not independently define architecture.

## Section 11. Documentation and Projections

Documentation explains or projects accepted knowledge.

Documentation cannot override accepted architecture or normative specifications.

## Section 12. Journal and Research

Journal and research artifacts preserve:

* evidence;
* alternatives;
* history;
* rationale;
* discoveries.

They inform decisions but do not establish architecture alone.

## Section 13. AI Output

AI output may propose, analyze, draft, review, or implement.

It has no independent acceptance authority.

---

# Article IV — Architectural Authority and Precedence

## Section 1. Precedence Order

When governing artifacts conflict, the following order applies:

```text
Monad Laws
    ↓
Architectural Constitution
    ↓
Accepted ADRs and Accepted Normative Specifications
    ↓
Canonical Glossary and Accepted Architecture Documents
    ↓
Accepted Work Packets and Program Increments
    ↓
Implementation and Tests
    ↓
Generated Documentation and Other Projections
    ↓
Journal, Research, Discussion, and Proposals
```

This order does not make ADRs and specifications interchangeable.

They occupy the same general authority tier but serve different roles.

## Section 2. Law Conflict

No lower-level artifact may knowingly violate a Monad Law.

A proposed violation requires amendment of the affected Law under the constitutional-amendment procedure before dependent changes may be accepted.

## Section 3. Constitutional Conflict

An ADR, specification, work packet, or implementation that conflicts with this Constitution is invalid to the extent of that conflict unless the Constitution is amended first.

## Section 4. ADR and Specification Conflict

When an accepted ADR and accepted specification conflict materially:

1. the conflict must be recorded;
2. new implementation of the disputed behavior must pause where practical;
3. the intended architectural decision must be determined;
4. the incorrect or obsolete artifact must be amended or superseded;
5. compatibility consequences must be evaluated;
6. historical versions must be preserved.

An ADR cannot remain a permanent substitute for a required normative specification.

## Section 5. Specification and Implementation Conflict

Accepted specification represents intended behavior.

Implementation divergence must be classified as:

* defect;
* incomplete implementation;
* temporary deviation;
* unsupported feature;
* obsolete implementation;
* evidence that the specification requires amendment.

Implementation does not override the specification merely because it exists or has users.

## Section 6. Glossary Conflict

A lower artifact must use canonical terminology consistently.

A narrower contextual definition must:

* be explicit;
* identify scope;
* remain compatible with the canonical concept.

A breaking glossary change must follow the relevant architectural-change procedure.

## Section 7. Documentation Conflict

Documentation, generated sites, summaries, diagrams, and articles do not override canonical architecture.

A discovered discrepancy must be corrected at the appropriate source.

## Section 8. Work-Packet Conflict

A work packet that requires architecture different from accepted architecture must:

* identify the conflict;
* create or reference the required ADR;
* identify affected specifications;
* remain blocked from architectural implementation until authorization exists.

---

# Article V — Normative Language

The following meanings apply to normative Monad artifacts.

## MUST

An absolute requirement.

Conforming implementations or artifacts are required to comply.

## MUST NOT

An absolute prohibition.

## SHOULD

A strong recommendation.

Deviation is permitted only with understood and documented justification.

## SHOULD NOT

A strong discouragement.

Deviation requires justification.

## MAY

A permitted option.

The presence of MAY does not create an implementation obligation unless required by a selected profile.

## SHALL and SHALL NOT

These terms should be avoided in new Monad specifications unless required by an external standard.

When inherited from an external standard, they are interpreted according to that standard.

## Informative Text

Text not intended to create conformance requirements must be identifiable as explanatory, illustrative, or non-normative where ambiguity could arise.

---

# Article VI — Artifact Maturity and Status

## Section 1. Draft

An active working artifact expected to change.

Draft artifacts are not canonical merely because they are stored in the repository.

## Section 2. Review

Technically complete and awaiting evaluation or acceptance.

## Section 3. Accepted

Approved as the current canonical version for its declared scope.

## Section 4. Implemented

Accepted behavior or architecture has been realized with supporting evidence.

## Section 5. Deprecated

Continued use is discouraged.

A replacement or removal path should be identified.

## Section 6. Superseded

Replaced for future applicability by a newer artifact.

The superseded artifact remains part of history.

## Section 7. Withdrawn

Formally removed from current applicability.

Withdrawal does not imply deletion.

## Section 8. Archived

Inactive but preserved for historical access.

## Section 9. Status Independence

Artifact maturity, semantic lifecycle, authority, implementation status, and publication status are independent axes.

One status field must not be overloaded to represent them all.

---

# Article VII — Architectural Change Classes

Every material change must be classified before acceptance.

## Class 0 — Editorial Change

Changes presentation without intended semantic impact.

Examples:

* spelling;
* formatting;
* link repair;
* nonsemantic organization;
* grammar.

Requirements:

* ordinary review;
* no ADR;
* no compatibility plan.

## Class 1 — Clarification

Makes accepted meaning clearer without changing required behavior.

Requirements:

* consistency review;
* evidence that existing intent is preserved;
* affected cross-references updated.

## Class 2 — Compatible Refinement

Adds precision or capability without invalidating previously conforming behavior.

Examples:

* optional metadata;
* new diagnostic context;
* additive extension;
* improved implementation preserving semantics.

Requirements may include:

* work packet;
* specification amendment;
* conformance tests;
* ADR if architectural boundaries change.

## Class 3 — Additive Architecture

Introduces a new subsystem, extension point, architectural service, canonical relationship, or representation.

Requires:

* ADR;
* responsibility analysis;
* layer placement;
* dependency analysis;
* maturity classification;
* specification plan;
* compatibility review;
* security review where applicable.

## Class 4 — Behavioral Change

Changes accepted semantics or observable behavior.

Requires:

* affected specification revisions;
* ADR where architectural;
* compatibility classification;
* test changes;
* effective version;
* migration or release guidance.

## Class 5 — Breaking Architectural Change

Invalidates an accepted assumption, contract, identity, dependency, data model, semantic rule, or integration.

Requires:

* explicit breaking-change proposal;
* ADR;
* specification amendments;
* impact analysis;
* migration plan;
* deprecation strategy where feasible;
* implementation plan;
* verification plan;
* release-version assessment.

## Class 6 — Constitutional Amendment

Changes:

* authority hierarchy;
* amendment procedure;
* artifact precedence;
* acceptance authority;
* emergency rules;
* conformance duties;
* AI-governance rules;
* self-hosting accountability.

Requires the highest project review threshold.

## Emergency Deviation

A temporary exception needed for urgent security, integrity, legal, operational, or severe correctness reasons.

It does not become permanent architecture automatically.

---

# Article VIII — Architectural Decision Records

## Section 1. Mandatory ADR Conditions

An ADR is required when a change:

1. creates a first-class subsystem;
2. removes, splits, or merges a first-class subsystem;
3. changes a subsystem's primary responsibility;
4. changes architectural dependency direction;
5. changes a canonical semantic representation;
6. changes the MSC-to-MSG boundary;
7. changes the MSG-to-MKE boundary;
8. changes the MSG-to-KIR boundary;
9. changes semantic identity foundations;
10. changes provenance, authority, lifecycle, or evidence foundations;
11. introduces a mandatory external provider;
12. changes local-first guarantees;
13. introduces a foundational technology with substantial lock-in;
14. establishes a significant security or trust boundary;
15. reverses an accepted ADR;
16. creates a breaking architectural change;
17. materially interprets or changes constitutional governance.

## Section 2. ADRs Normally Unnecessary

An ADR is normally unnecessary for:

* editorial changes;
* routine implementation detail;
* internal refactoring that preserves contracts;
* tests;
* documentation rendering;
* ordinary work planning;
* bug fixes conforming to accepted behavior.

## Section 3. ADR Contents

A complete ADR should identify:

* decision;
* status;
* context;
* problem;
* constraints;
* alternatives;
* rationale;
* consequences;
* compatibility impact;
* migration impact;
* affected artifacts;
* effective version;
* dissent or unresolved concerns.

## Section 4. ADR Lifecycle

Permitted ADR states include:

* proposed;
* accepted;
* rejected;
* deprecated;
* superseded;
* withdrawn.

An accepted ADR may be replaced only through an explicit superseding decision.

---

# Article IX — Normative Specifications

## Section 1. Specification Requirement

A normative specification is required when behavior must be:

* implemented consistently;
* validated;
* tested for conformance;
* consumed independently;
* versioned;
* preserved across implementations;
* exposed to users or integrations;
* compiled or projected automatically.

## Section 2. Specification Authority

A specification may define behavior only within architecture authorized by higher-level artifacts and accepted decisions.

## Section 3. Specification Contents

A normative specification should define, as applicable:

* scope;
* terminology;
* identities;
* syntax;
* semantics;
* invariants;
* inputs;
* outputs;
* lifecycle;
* authority;
* error behavior;
* compatibility;
* conformance;
* security;
* extension points;
* versioning.

## Section 4. Specification Changes

A specification change must identify:

* change class;
* affected versions;
* compatibility domain;
* implementation impact;
* migration impact;
* test impact;
* effective boundary.

## Section 5. Unfinished Specifications

Implementation may begin under an unfinished specification when:

1. the architectural boundary is accepted;
2. the implementation target is explicitly bounded;
3. unresolved details are identified;
4. implementation is not falsely represented as final conformance;
5. reversal cost is understood;
6. the work packet records assumptions;
7. implementation evidence may inform the specification.

---

# Article X — Terminology Governance

## Section 1. Canonical Terms

A canonical term must have:

* one preferred name;
* a clear definition;
* declared scope;
* related concepts;
* distinctions from commonly confused terms.

## Section 2. Adding Terms

A new canonical term should be added only when it:

* names a first-class concept;
* is needed across several artifacts;
* prevents ambiguity;
* lacks a suitable existing term.

## Section 3. Clarifying Definitions

A definition may be clarified without an ADR when its semantic intent remains unchanged.

## Section 4. Breaking Definition Changes

A definition change is breaking when it changes:

* architectural responsibility;
* normative interpretation;
* identity;
* compatibility;
* public contract;
* accepted subsystem meaning.

Breaking definition changes require:

* impact analysis;
* ADR where architectural;
* affected specification updates;
* deprecation or alias guidance;
* migration plan.

## Section 5. Deprecated Terms

Deprecated terms should remain documented with:

* replacement;
* reason;
* compatibility expectations;
* removal or retention plan.

## Section 6. Acronym Discipline

A new subsystem acronym requires:

* full name;
* primary responsibility;
* inputs;
* outputs;
* consumers;
* architectural layer;
* maturity;
* accepted decision where required.

An acronym must not be introduced merely to brand a feature.

---

# Article XI — Subsystem Governance

## Section 1. Subsystem Definition

A first-class subsystem owns one durable architectural responsibility.

## Section 2. Required Subsystem Record

A proposed subsystem must identify:

```text
name
full_name
maturity
primary_responsibility
inputs
outputs
consumers
dependencies
prohibited_responsibilities
failure_boundary
versioning_boundary
security_boundary
implementation_plan
```

## Section 3. Acceptance Conditions

A subsystem may be accepted only when:

1. its primary responsibility is unique;
2. an existing subsystem does not already own that responsibility;
3. at least one concrete consumer exists;
4. its layer is known;
5. its dependencies are legal;
6. its outputs are distinguishable;
7. its introduction reduces ambiguity;
8. its maturity is represented honestly;
9. an ADR authorizes it where required.

## Section 4. Splitting a Subsystem

A split requires evidence that:

* responsibilities are materially independent;
* lifecycle or release boundaries differ;
* security or failure boundaries require separation;
* independent consumers exist.

## Section 5. Merging Subsystems

A merge requires evidence that:

* boundaries are artificial or duplicative;
* responsibilities remain coherent;
* compatibility can be preserved or migrated;
* implementation simplification outweighs coupling risk.

## Section 6. Retiring a Subsystem

Retirement requires:

* replacement or removal rationale;
* dependent-system analysis;
* migration plan;
* specification updates;
* deprecation period where feasible;
* historical preservation.

---

# Article XII — Dependency Governance

## Section 1. Dependency Record

A new architectural dependency must identify:

* source;
* target;
* purpose;
* required or optional status;
* build-time or runtime nature;
* failure behavior;
* version relationship;
* security implications;
* local/offline implications;
* replacement strategy.

## Section 2. Direction

Dependencies must respect the accepted architectural layering.

Foundational architecture must not depend on application or presentation details.

## Section 3. Circular Responsibility

Circular ownership is prohibited.

Bidirectional runtime exchange is permitted only when ownership remains unambiguous and interfaces are explicit.

## Section 4. External Dependencies

A mandatory external service requires explicit evaluation of:

* availability;
* privacy;
* security;
* cost;
* lock-in;
* offline behavior;
* replacement;
* reproducibility.

## Section 5. Dependency Inversion

Reversing a canonical dependency direction requires an ADR and cross-artifact consistency review.

---

# Article XIII — Representation Governance

## Section 1. Source Representation

Source formats are authoring or import representations.

They do not independently define canonical semantic meaning.

## Section 2. Surface AST

A surface AST is source-language-specific and frontend-owned.

## Section 3. Canonical AST

The canonical AST is MSC's common compiler representation.

Changes require:

* compiler-pass impact analysis;
* compatibility analysis;
* migration of fixtures and caches;
* versioning.

## Section 4. Monad Semantic Graph

MSG is the canonical semantic representation for one compilation snapshot.

A material MSG change requires:

* ontology impact analysis;
* MKE impact analysis;
* projection impact analysis;
* migration strategy;
* conformance fixtures;
* versioning.

## Section 5. MKE Persistence

MKE storage must preserve semantic meaning and history independently of backend-specific schemas.

A storage implementation must not become the ontology.

## Section 6. Knowledge Intermediate Representation

KIR is a derived target-oriented representation.

KIR must not redefine MSG semantics.

Losses, target defaults, and unsupported semantics must remain explicit.

## Section 7. Publication Representations

Publications and documentation are derived.

Renderer changes generally do not require architectural amendments unless they alter:

* publication contracts;
* authority assumptions;
* source-of-truth boundaries;
* required semantic coverage.

---

# Article XIV — Compatibility Governance

## Section 1. Compatibility Domains

Compatibility must be evaluated separately for:

* source syntax;
* source semantics;
* canonical AST;
* MSG;
* MKE ingestion;
* persisted MKE history;
* KIR;
* backend interfaces;
* CLI;
* API;
* manifests;
* extensions;
* generated outputs;
* publication schemas.

## Section 2. Compatibility Questions

Every material change must ask:

1. Can older producers work with newer consumers?
2. Can newer producers work with older consumers?
3. Are semantic identities preserved?
4. Is migration required?
5. Are previously valid artifacts invalid?
6. Are previously invalid artifacts valid?
7. Have defaults changed?
8. Have diagnostics changed materially?
9. Has deterministic ordering changed?
10. Are projections reproducible?
11. Is local operation affected?
12. Are external integrations affected?

## Section 3. Breaking Changes

A breaking change must identify:

* affected domain;
* affected versions;
* migration mechanism;
* compatibility window;
* deprecation period where feasible;
* rollback strategy;
* verification evidence.

## Section 4. Versioning

Every compatibility-affecting artifact must have an explicit versioning policy appropriate to its domain.

One global version number must not substitute for domain-specific compatibility analysis.

---

# Article XV — Amendment Procedure

A material architectural change follows this process.

```text
Observation or Proposal
        ↓
Work Packet or Architecture Proposal
        ↓
Change Classification
        ↓
Research and Alternatives
        ↓
Draft ADR and Specification Amendments
        ↓
Cross-Artifact Consistency Review
        ↓
Acceptance Decision
        ↓
Implementation Work Packet
        ↓
Implementation and Migration
        ↓
Conformance Verification
        ↓
Documentation and Status Updates
        ↓
Completion and Historical Record
```

## Section 1. Proposal

A proposal must identify:

* problem;
* affected architecture;
* change class;
* urgency;
* evidence;
* alternatives;
* expected benefit;
* expected cost;
* known risks.

## Section 2. Impact Analysis

The proposal must consider effects on:

* Laws;
* Constitution;
* Glossary;
* architecture documents;
* ADRs;
* specifications;
* implementation;
* compatibility;
* security;
* data;
* projections;
* users;
* self-hosting.

## Section 3. Decision Artifacts

Required ADRs and amendments must be drafted before implementation is treated as accepted architecture.

## Section 4. Review

Review must assess:

* architectural consistency;
* semantic correctness;
* migration feasibility;
* testability;
* implementation cost;
* local-first impact;
* security;
* privacy;
* historical preservation;
* operational risk.

## Section 5. Acceptance

Acceptance must record:

* accepting authority;
* date or version;
* rationale;
* dissent;
* conditions;
* effective boundary;
* required follow-up work.

## Section 6. Implementation

Implementation proceeds through authorized work packets.

## Section 7. Verification

Verification may include:

* tests;
* conformance suites;
* migration evidence;
* compatibility results;
* runtime evidence;
* reproducibility checks;
* implementation review.

## Section 8. Closure

Closure requires applicable updates to:

* ADRs;
* specifications;
* glossary;
* architecture documents;
* work packets;
* project status;
* release notes;
* journal.

---

# Article XVI — Acceptance Authority

## Section 1. Bootstrap Stage

During Monad's founder-led bootstrap stage, Thomas Carter is the final project-level acceptance authority for architecture.

## Section 2. Engineering Assistance

Engineering contributors and AI systems may:

* analyze;
* recommend;
* draft;
* challenge;
* review;
* implement;
* produce evidence.

They do not acquire final acceptance authority unless it is delegated explicitly.

## Section 3. Repository Requirement

A decision is not durably accepted merely because it occurred in conversation.

Significant acceptance must be reflected in repository artifacts.

## Section 4. Delegation

Acceptance authority may later be delegated to:

* subsystem maintainers;
* specification editors;
* architecture reviewers;
* release maintainers;
* a governance council.

Delegation must identify:

* scope;
* authority;
* duration;
* revocation conditions;
* escalation path.

## Section 5. Authority Limits

No delegate may amend higher-level authority beyond the scope granted.

---

# Article XVII — Review Proportionality

Review intensity must be proportional to impact.

| Change                   | Minimum Review                                                    |
| ------------------------ | ----------------------------------------------------------------- |
| Editorial                | Correctness check                                                 |
| Clarification            | Artifact and terminology review                                   |
| Compatible refinement    | Specification and implementation review                           |
| Additive architecture    | ADR and cross-subsystem review                                    |
| Behavioral change        | ADR/specification, compatibility, and migration review            |
| Breaking architecture    | Full architectural, security, migration, and release review       |
| Constitutional amendment | Highest available project-level review                            |
| Emergency deviation      | Immediate authorized review followed by retrospective full review |

Governance must not impose constitutional procedure on trivial changes.

Likewise, convenience must not reduce review for consequential changes.

---

# Article XVIII — Dissent and Alternatives

## Section 1. Preservation

Architectural decisions should preserve:

* alternatives considered;
* reasons rejected;
* dissenting analysis;
* unresolved risks;
* assumptions;
* evidence that could trigger reconsideration.

## Section 2. Effect of Dissent

Dissent does not automatically block acceptance.

It must remain visible.

## Section 3. Reconsideration

A rejected alternative may be reconsidered when:

* assumptions change;
* implementation evidence emerges;
* costs change;
* dependencies change;
* risks materialize;
* earlier constraints disappear.

## Section 4. Historical Integrity

Rejected alternatives must not be rewritten as though they were never considered.

---

# Article XIX — Emergency Architectural Deviations

## Section 1. Permitted Causes

An emergency deviation may address:

* critical security vulnerability;
* data corruption or loss;
* urgent legal requirement;
* severe operational incident;
* catastrophic correctness defect.

## Section 2. Required Record

An emergency deviation must identify:

```text
deviation_id
reason
scope
authorizer
affected_contracts
temporary_behavior
risk
start_boundary
expiration
remediation_work_packet
retrospective_review
```

## Section 3. Rules

1. Scope must be minimal.
2. Duration must be bounded.
3. The deviation must be visible.
4. It must not silently become permanent.
5. A retrospective review is mandatory.
6. Permanent adoption requires the ordinary amendment process.
7. Removal or adoption must occur before expiration.
8. Sensitive technical details may be restricted without concealing the deviation's existence.

## Section 4. Expiration

Expired deviations become nonconformities unless:

* removed;
* extended through explicit renewed authorization;
* adopted through the ordinary process.

---

# Article XX — Conformance

## Section 1. Conformance Basis

Implementation conforms when it satisfies applicable:

* Laws;
* Constitution;
* accepted ADRs;
* normative specifications;
* selected profiles;
* compatibility requirements;
* security constraints.

## Section 2. Evidence

Conformance evidence may include:

* tests;
* compiler validation;
* static analysis;
* formal proof;
* runtime observation;
* review;
* migration results;
* reproducibility results.

## Section 3. Nonconformance Categories

A divergence must be classified as:

* defect;
* incomplete implementation;
* temporary deviation;
* unsupported capability;
* obsolete implementation;
* disputed specification;
* incorrect architectural assumption.

## Section 4. Known Nonconformance

Known nonconformance must identify:

* scope;
* impact;
* owner;
* remediation;
* expiration or review date;
* blocked claims of conformance.

## Section 5. Implementation Status

An artifact must not be marked Implemented without reasonable conformance evidence.

---

# Article XXI — Provisional Architecture

## Section 1. Maturity Progression

```text
reserved
   ↓
provisional
   ↓
planned
   ↓
accepted
   ↓
implemented
```

Stages may be skipped only when sufficient evidence exists.

## Section 2. Reserved

A term or architectural area is held for future work.

No implementation obligation exists.

## Section 3. Provisional

A working concept exists but remains subject to material change.

It must not be treated as a stable external contract.

## Section 4. Planned

Responsibility and architectural direction are accepted, while specification or implementation remains incomplete.

## Section 5. Accepted

The architecture is approved as canonical for its scope.

## Section 6. Implemented

The accepted architecture is realized with evidence.

## Section 7. No Promotion by Accident

Implementation, popularity, documentation, or repeated use cannot promote provisional architecture automatically.

Promotion must be recorded.

---

# Article XXII — Deprecation, Supersession, and Reversal

## Section 1. Deprecation

Deprecation should identify:

* deprecated subject;
* replacement;
* rationale;
* introduction boundary;
* warning behavior;
* compatibility duration;
* migration guidance;
* planned removal boundary.

## Section 2. Supersession

Supersession requires:

* replacement decision;
* predecessor reference;
* rationale;
* compatibility impact;
* migration plan;
* effective version;
* specification updates;
* preserved history.

## Section 3. Reversal

Reversing an accepted decision requires explanation of why the prior reasoning no longer governs.

## Section 4. Immediate Removal

Immediate removal may occur when required by:

* security;
* law;
* data integrity;
* severe correctness;
* impossibility of safe continued support.

The exception must be documented.

## Section 5. Historical Preservation

Deprecated, superseded, rejected, and withdrawn artifacts remain preserved unless deletion policy requires otherwise.

---

# Article XXIII — AI Participation

## Section 1. Permitted Roles

AI systems may:

* draft;
* summarize;
* analyze alternatives;
* identify contradictions;
* generate diagrams;
* write work packets;
* suggest specifications;
* review consistency;
* implement code;
* generate tests.

## Section 2. Prohibited Authority

AI systems may not independently:

* accept architecture;
* grant normative authority;
* amend this Constitution;
* approve their own output;
* conceal uncertainty;
* silently modify canonical artifacts;
* substitute confidence for evidence.

## Section 3. Provenance

AI-produced artifacts should preserve, where practical:

* generation origin;
* model or provider;
* context sources;
* review state;
* authority state;
* adopting actor;
* relevant tool use.

## Section 4. Adoption

AI output becomes accepted only through the same governed adoption process used for other proposals.

## Section 5. Automated Enforcement

AI or automated tooling may enforce accepted rules.

It may not create new rules merely through enforcement behavior.

---

# Article XXIV — Self-Hosting Governance

When Monad compiles and manages its own artifacts:

1. authored source artifacts remain governed inputs;
2. compiled MSG remains canonical for its snapshot;
3. MKE preserves project knowledge history;
4. generated documentation remains a projection;
5. generated project status remains traceable;
6. generated work recommendations remain proposals;
7. AI-generated changes remain nonauthoritative until adopted;
8. automated checks enforce accepted rules only;
9. compiler changes follow ordinary governance;
10. self-hosting creates no privileged path around accountability.

Monad may automate:

* consistency checks;
* registry updates;
* dependency analysis;
* conformance validation;
* publication;
* status reporting;
* amendment impact analysis.

Monad must not automate away acceptance responsibility.

---

# Article XXV — Work-Packet Governance

## Section 1. Purpose

A work packet is the canonical engineering artifact for one bounded unit of work.

## Section 2. Authority

A work packet authorizes execution within accepted architecture.

It does not independently create architectural authority.

## Section 3. Architectural Work

A work packet proposing architecture must identify:

* affected constitutional provisions;
* required ADRs;
* affected specifications;
* change class;
* compatibility impact;
* required review.

## Section 4. Completion

A work packet must not be marked complete without:

* deliverables;
* acceptance-criteria evidence;
* completion outcome;
* repository changes;
* identified follow-up work.

## Section 5. Lifecycle Integrity

Planning, execution, and historical outcomes should remain preserved in the work packet or its governed projections.

---

# Article XXVI — Program-Increment and Milestone Governance

## Section 1. Program Increment

A program increment coordinates related work packets toward an integrated outcome.

It may define:

* objectives;
* scope;
* work packets;
* risks;
* exit criteria;
* follow-on work.

It cannot independently amend architecture.

## Section 2. Milestone

A milestone records achievement of a defined outcome.

It is not merely a date.

## Section 3. Closure

A PI or milestone may close only when:

* exit criteria are met;
* incomplete work is carried forward explicitly;
* contradictions are recorded;
* status artifacts are updated;
* resulting architecture and implementation states are represented honestly.

---

# Article XXVII — Architecture Freeze

## Section 1. Meaning

An architecture freeze establishes a presumption that foundational architecture is stable.

It does not make architecture immutable.

## Section 2. During a Freeze

During an architecture freeze:

* implementation may proceed within accepted boundaries;
* contradictions must be reported;
* new architecture requires explicit justification;
* speculative expansion should be deferred;
* accepted responsibilities and dependencies should not move casually.

## Section 3. Permitted Change

Architecture may change during a freeze when required by:

* contradiction;
* implementation blocker;
* security;
* correctness;
* legal obligation;
* compelling evidence of a materially superior architecture.

## Section 4. Freeze Violation

A change that bypasses required freeze governance must be classified as a nonconformity or emergency deviation.

---

# Article XXVIII — PI-001 Exit Criteria

Program Increment PI-001 may close when:

1. `vision/manifesto.md` exists.
2. `vision/principles.md` exists.
3. `vision/laws.md` exists.
4. `vision/glossary.md` exists.
5. `vision/ecosystem.md` exists.
6. `vision/architecture-map.md` exists.
7. `vision/compiler-pipeline.md` exists.
8. `vision/knowledge-lifecycle.md` exists.
9. `vision/constitution.md` exists.
10. WP-AF-0001 through WP-AF-0009 are completed.
11. A cross-document consistency review is complete.
12. Material contradictions are resolved or recorded as blockers.
13. Maturity classifications are honest.
14. Project-control artifacts are current.
15. No unresolved P0 Architecture Freeze blocker remains.
16. Remaining compiler-specification work is assigned to PI-002.
17. PI-001 completion is recorded with an outcome summary.

Vision artifacts may remain Draft pending reconciliation with MSC-CORE-0008 through MSC-CORE-0010, provided:

* their provisional status is explicit;
* no false acceptance claim is made;
* required acceptance work is assigned.

---

# Article XXIX — Constitutional Amendment

## Section 1. Amendment Triggers

A constitutional amendment is required to change:

* architectural authority hierarchy;
* artifact precedence;
* acceptance authority;
* amendment procedure;
* conformance obligations;
* emergency-deviation rules;
* AI-governance rules;
* self-hosting-accountability rules;
* constitutional scope.

## Section 2. Amendment Proposal

An amendment proposal must contain:

* identified deficiency;
* affected provisions;
* replacement language;
* architectural consequences;
* authority consequences;
* compatibility consequences;
* alternatives;
* transition plan;
* acceptance record.

## Section 3. Review

A constitutional amendment receives the highest available project-level review.

During the founder-led bootstrap stage, final acceptance rests with Thomas Carter.

## Section 4. Effective Boundary

Every amendment must identify the version, date, or project boundary at which it becomes effective.

## Section 5. Historical Record

The prior Constitution must remain preserved and linked through supersession.

---

# Article XXX — Constitutional Invariants

The following conditions govern all architectural evolution:

1. Architecture changes are explicit.
2. Architectural authority is traceable.
3. Conversation alone is not the permanent architectural source of truth.
4. Laws constrain lower-level artifacts.
5. This Constitution governs architectural change.
6. ADRs record significant decisions.
7. Specifications define normative contracts.
8. The Glossary defines canonical terminology.
9. Architecture maps explain accepted structural relationships.
10. Work packets authorize work but do not silently amend architecture.
11. Implementation does not override accepted architecture through precedent.
12. Tests provide evidence but do not independently establish architecture.
13. Documentation and projections do not define canonical meaning.
14. AI systems possess no independent acceptance authority.
15. Breaking changes require compatibility and migration analysis.
16. Emergency deviations are visible, bounded, and reviewed.
17. Dissent and rejected alternatives remain preserved.
18. Accepted architecture may be superseded but not silently erased.
19. Provisional concepts do not become obligations automatically.
20. Maturity states must be represented honestly.
21. Self-hosting does not bypass governance.
22. Every architectural change has an effective boundary.
23. Every significant change identifies affected artifacts.
24. Conformance is evidence-based.
25. Governance is proportional to impact.
26. Architecture Freeze creates stability rather than permanent immobility.
27. Legal, security, privacy, and integrity duties may require controlled exceptions.
28. Constitutional amendments receive the highest project-level review.
29. Historical preservation remains subject to valid deletion and redaction obligations.
30. No actor, tool, model, or implementation is above the governed architecture.

---

# Ratification

This Constitution becomes operative for the Monad Engineering Program when:

* it is reviewed;
* its status is changed to Accepted;
* its acceptance is recorded in the repository;
* the approving authority is identified.

Until ratification, this document remains the draft constitutional framework produced during PI-001.

---

# Status

**Draft**

This document completes the planned Vision-layer artifacts for the Architecture Freeze program increment.

Its next required action is a PI-001 cross-document consistency review followed by:

* correction of identified contradictions;
* project-control updates;
* WP-AF-0009 completion;
* PI-001 closure;
* activation of PI-002.

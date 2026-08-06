---
title: "Building Monad #012 — Designing Diagnostics, Incrementality, and Reproducibility"
description: "Why trustworthy compiler diagnostics, safe incremental reuse, verified caching, deterministic execution, and reproducibility must be designed as one system."
date: 2026-08-06
series: "Building Monad"
entry: 12
status: draft
work_cycle: WC-0002
program_increment: PI-002
milestone: M-002
implements:
  - MSC-CORE-0009
related_work_packets:
  - WP-MSC-0007
  - WP-MSC-0008
  - WP-MSC-0009
  - WP-MSC-0010
  - WP-MSC-0011
  - WP-MSC-0012
  - WP-MSC-0013
references:
  - specifications/MSC/core/MSC-CORE-0008.md
  - specifications/MSC/core/MSC-CORE-0009.md
  - engineering/increments/PI-002.md
  - journal/011-designing-the-semantic-graph.md
---

# Building Monad #012 — Designing Diagnostics, Incrementality, and Reproducibility

A compiler can be fast and still be wrong in a uniquely dangerous way.

It can return an old answer quickly.

That possibility connects three concerns that are often designed separately. Diagnostics are treated as user-interface messages. Incremental compilation is treated as a performance feature. Reproducibility is treated as a release-engineering exercise performed after the compiler works. In a compiler for governed engineering knowledge, those separations do not hold.

A reused result is safe only if the compiler knows every fact on which that result depended. A diagnostic is trustworthy only if it appears, disappears, and retains its identity for semantic reasons rather than because a cache was warm or tasks finished in a different order. A reproducibility claim is meaningful only if the compiler records the normalized inputs, decisions, outputs, and limitations needed to compare one run with another.

Monad therefore treats diagnostics, incrementality, caching, deterministic execution, and reproducibility as one trust system.

The governing rule is simple:

> Optimization may change how MSC reaches a result. It must not change the observable meaning of that result.

For MSC, observable meaning includes more than a generated artifact. It includes the normalized diagnostic set, whether an MSG snapshot was produced, the MSG fingerprint when one exists, consumer-specific output availability, partiality, failure state, and reproducibility disposition. If a clean run and an incremental run disagree on any of those surfaces for equivalent inputs, the optimization is incorrect.

MSC-CORE-0009 turns that principle into a compiler-wide contract. It does not promise that Monad has already implemented an incremental compiler. It defines the conditions under which one could be trusted.

## Diagnostics are compiler output

Most compiler interfaces present diagnostics as prose: a severity label, a message, a path, and a line number. That presentation is useful to a person, but it is a poor canonical model.

Prose changes. A message may be clarified, localized, shortened for a terminal, expanded for an editor, or explained by an AI assistant. Absolute paths change when a workspace moves. Line numbers change after unrelated edits. If any of those presentation details define the identity of a finding, the same problem appears to be a new problem from run to run.

Monad instead needs a diagnostic to be structured knowledge about a compilation finding. Its stable core includes a namespaced rule identity, a subject, normalized locations, provenance, evidence, parameters, severity, blocking scope, lifecycle, and any related locations or fix proposals. Renderers turn that structure into terminal text, editor data, CI annotations, reports, or explanations. Rendering does not modify the finding.

This distinction gives diagnostics a lifecycle. A tool can recognize that a finding persisted after a source move, that a prior finding was resolved, or that two findings share a rule but concern different semantic subjects. Reproducibility comparison can compare normalized findings rather than English sentences. Cache entries can retain the diagnostics produced with a phase result instead of recreating them opportunistically.

It also prevents a subtle governance error: **severity and blocking scope are not the same fact**. A warning may block a particular publication profile while leaving semantic inspection available. An error in one backend may block that target without invalidating the canonical MSG. A high-severity governance finding may require explicit disposition without meaning that every consumer must receive no result.

Collapsing these dimensions into `warning` and `error` would throw away information that downstream systems need. MSC-CORE-0009 therefore makes both explicit.

## Stable identity does not mean frozen location

Suppose a source file contains a reference to an unknown policy:

```msl
service BillingApi {
  governed_by MissingRetentionPolicy
}
```

A clean compilation reports an unresolved-reference diagnostic. The author then inserts comments above the declaration, moves the file from `services/` to `domains/billing/`, and runs MSC from a different absolute workspace path. The semantic problem has not changed. A stable diagnostic occurrence should remain recognizable even though its display span and local path changed.

Now suppose the author changes the missing name from `MissingRetentionPolicy` to `TemporaryRetentionPolicy`. The governing rule may be the same, but the occurrence subject has changed. The compiler must not preserve identity merely because the diagnostic text is similar.

That is why MSC separates a **rule identity** from a **diagnostic occurrence identity**. The rule says what class of invariant was violated. The occurrence says which normalized finding happened to which semantic or source subject under which relevant provenance. Neither identity is the rendered message, and neither is the MSG graph identity, MSG fingerprint, compilation-manifest digest, diagnostic-set digest, or compilation-run identity.

Domain separation among these identities is not pedantry. It prevents one convenient hash from slowly becoming the identifier for everything. A manifest digest identifies the declared compilation contract. An MSG fingerprint summarizes canonical semantic content. A diagnostic-set digest summarizes normalized findings. A run identity denotes one attempt. Substituting one for another would create false conclusions—for example, claiming identical semantic graphs merely because two runs had the same manifest, or claiming different semantic meaning because diagnostic policy changed.

## A manifest defines the compilation contract

Safe reuse begins before compilation work begins. MSC must know what compilation it is being asked to perform.

The raw command line is not enough. Two differently spelled requests may mean the same thing. A source path may be absolute on one machine and workspace-relative on another. Directory enumeration order may vary. A plugin may read configuration that the command line never mentions. Locale, timezone, environment variables, feature flags, graph profiles, extension versions, and diagnostic policies may affect behavior.

MSC-CORE-0009 introduces an immutable **compilation manifest** as the normalized declaration of that contract. It inventories logical inputs and their content digests; identifies compiler, language, profile, extension, plugin, schema, and algorithm versions; records semantic configuration and diagnostic policy; classifies environment inputs; and names the requested outputs and consumer profiles.

The manifest answers a question that every later optimization depends on:

> Which declared facts are allowed to influence this compilation?

Environment-derived values fall into three categories. A declared semantic input may affect meaning and therefore participates in the manifest and relevant reuse keys. A declared operational input may affect execution—thread count, temporary directory, or timing—but is forbidden from changing normalized results. A prohibited input must not be read, or the run becomes nonconforming.

This classification protects both portability and honesty. A plugin that silently reads an undeclared environment variable cannot produce a reusable result, because MSC cannot prove that the result's dependency record is complete. An undeclared network response cannot participate in a reproducible compilation merely because it happened to return the same bytes twice. The response must become an immutable verified input, or the run must record taint or unavailability.

The manifest is evidence, not magic. Recording inputs does not prove the compiler used them correctly. It establishes the contract against which dependencies, cache compatibility, and reproducibility can be checked.

## Incrementality is a dependency proof

Incremental compilation is often described as rebuilding only what changed. That description skips the hard part: determining what **could have been affected** by a change.

Imagine three governed artifacts:

```text
RetentionPolicy ──governs──▶ BillingApi ──used-by──▶ BillingRunbook
```

Changing prose in the runbook may require only local diagnostics and publication work. Changing the internal body of `BillingApi` might leave its semantic interface stable, allowing some dependent work to be reused. Changing the policy's applicability could invalidate the service analysis and every downstream result that relied on that relationship. Deleting or renaming the policy may also invalidate prior diagnostics: an old finding must disappear, and new unresolved-reference findings may appear.

File timestamps cannot answer these questions. Neither can a list of imported filenames. MSC needs normalized dependency observations that record what a reusable phase actually read or relied upon: source content, declarations, resolved symbols, semantic interfaces, configuration, profiles, extensions, plugins, external artifacts, environment inputs, and diagnostic policy where relevant.

Each reusable result therefore carries a proof obligation. It must declare its direct inputs, dependency observations, diagnostics, output digest, completeness, compatibility, and taint state. When an input changes, the invalidation engine classifies the change and computes a conservative transitive closure over the dependency graph.

“Conservative” is important. False-positive invalidation costs time by recomputing safe work. False-negative invalidation returns stale meaning. Monad accepts the first cost to avoid the second.

If MSC cannot prove a dependency observation complete, it must widen invalidation or mark the result non-reusable. If it does not understand a change class, it recomputes. If an imported semantic interface cannot be compared at fine granularity, the bootstrap compiler may invalidate at the module or file boundary. Coarse honesty is safer than precise-looking guesswork.

## Clean compilation is the oracle

An incremental compiler needs a definition of correctness that does not depend on its own reuse decisions. MSC keeps clean compilation available as that oracle.

For the same normalized manifest, a clean compilation and a valid incremental compilation must be observationally equivalent. The comparison covers:

- normalized diagnostics and their deterministic order;
- MSG production or declared absence;
- canonical MSG fingerprint when produced;
- output-availability and partiality state; and
- reproducibility disposition, allowing only documented differences caused by the verification act itself.

Internal execution does not have to be identical. The incremental run may skip parsing an unchanged module, reuse a validated analysis result, load an immutable cache entry, or schedule tasks differently. It may have different elapsed time, cache-hit counts, worker assignments, logs, and run IDs. Those are operational differences.

This is **observational equivalence**, not byte-for-byte equality of every trace.

The distinction keeps the contract strict where meaning lives and flexible where implementation strategy lives. It also makes failure diagnosable. When results differ, the comparison should identify the first known contract surface: manifest normalization, dependency set, diagnostic set, MSG fingerprint, or output availability. “The builds differ” is not enough evidence to repair an incremental compiler.

Clean fallback is part of the design, not an embarrassing slow path. A corrupt cache entry, incompatible schema, incomplete dependency record, or unsupported change class should cause safe recomputation when possible. The compiler may diagnose repeated infrastructure failures, but it must not convert uncertainty into a successful stale hit.

## A cache is untrusted memoization

A compiler cache can look like a storage feature: calculate a key, save bytes, retrieve them later. In Monad, the interesting question is not whether bytes exist. It is whether those bytes are a compatible, complete, verified result for this phase under this manifest.

A conforming cache entry includes or securely references its key, compatibility envelope, serialized result, dependency observations, normalized diagnostics, completeness and taint state, integrity data, producer provenance, and schema version. Before reuse, MSC validates all of them.

The cache key must cover every contract dimension capable of changing the result: phase and result schema, compiler compatibility, direct inputs, relevant dependencies or semantic-interface fingerprints, configuration, profiles, extensions, plugins, diagnostic policy, and canonicalization algorithms. Keys are domain-separated by artifact kind and version so that a digest valid in one context cannot be mistaken for another.

Consider a cache entry whose key matches but whose dependency record is truncated. Treating the matching key as sufficient would make the missing evidence invisible. MSC must reject the entry. The same is true if the payload fails integrity checks, the schema is incompatible, the result was partial but labeled complete, or the producer does not satisfy the requested trust policy.

Local and remote caches obey the same semantic acceptance rules. Remote caching adds authentication, authorization, confidentiality, tenancy, and safe-deserialization concerns, but local origin does not make a result semantically trustworthy. A damaged local entry is still damaged. A valid remote entry is still reusable only after verification.

Entries are immutable and published atomically after validation. Cancelled or partially written work cannot masquerade as a completed result. Eviction changes performance only: deleting the entire cache must leave clean compilation possible from authoritative inputs.

That final rule preserves the architectural boundary established in the previous journal entry. The compiler cache is not MKE, not MSG lineage storage, and not an authority for governed knowledge. It is verified memoization.

## Parallel execution must converge

Incrementality and caching remove work. Parallelism reorders work. Both can expose hidden nondeterminism.

Thread scheduling, work stealing, remote worker completion, map iteration, filesystem enumeration, and lock acquisition are operational facts. If any of them changes diagnostic ordering, graph-local allocation, canonical serialization, or an MSG fingerprint, the compiler has allowed execution history to leak into semantic output.

MSC therefore requires deterministic traversal, merge, and reduction at every observable boundary. Semantically unordered collections receive canonical order before stable identifiers are allocated, diagnostics are emitted, results are serialized, or fingerprints are computed. Concurrent workers may discover findings in any order, but publication imposes the specified order.

The same rule applies to time and randomness. Wall-clock timestamps and run identifiers may appear in operational records excluded from semantic comparison. They do not enter canonical results. A randomized algorithm whose choices could become observable needs a manifest-declared seed or a normalization step that guarantees deterministic equivalence.

This does not require a deterministic operating system. It requires the compiler to prevent operational nondeterminism from crossing the semantic boundary.

## Reproducibility is evidence with levels

“Reproducible” is too often used as a binary adjective without saying what was compared.

MSC-CORE-0009 defines explicit levels:

| Level | Claim |
| --- | --- |
| `unverified` | The run completed, but no equivalence comparison was performed. |
| `manifest-reproducible` | The normalized manifest and accepted toolchain contract are sufficient under the declared support policy. |
| `verified-reproducible` | An independent clean or policy-approved comparison produced equivalent observable results. |
| `non-reproducible` | Comparison differed or an uncontrolled semantic influence was found. |

An unverified result is not necessarily wrong. It simply has not earned a stronger claim. Likewise, an attestation does not manufacture correctness. A signature can prove that a named actor asserted something about recorded evidence; it cannot prove that the compiler's semantics were correct.

Every completed run emits a reproducibility record connecting the manifest digest, toolchain and contract identities, normalized input and dependency digests, diagnostic-set digest, MSG fingerprint or reason for absence, output availability, cache and incremental decisions, environment classification, taints, level, and comparison references.

The record keeps operational metadata available without confusing it with semantic evidence. Two runs can have different timestamps, worker layouts, absolute paths, and cache-hit patterns while producing equivalent observable results. Conversely, two runs can finish successfully while differing semantically; success alone is not reproducibility.

This evidence model will matter later for self-hosting. Building Monad with Monad may require several separate claims: that the compiler produces equivalent semantic knowledge, that lowering produces equivalent KIR, and perhaps that a backend produces identical binaries. MSC-CORE-0009 owns the first comparison framework. MSC-CORE-0010 must define the downstream claims without collapsing them together.

## Partial results require honest diagnostics

Compilers do not always end with a single success or failure bit. Monad may know enough to produce a partial MSG for inspection while refusing a publication or target. One consumer may be ready while another is blocked. A cancellation may occur after some independently reusable phases completed. A cache may contain a valid early-phase result even though the prior run never completed.

MSC makes these states explicit. A run ends completed with outputs available, completed with partial or consumer-specific availability, failed with diagnostics, cancelled, or in internal failure. Process exit code alone does not define the outcome.

Partial MSG behavior remains governed by MSC-CORE-0008. MSC-CORE-0009 governs the diagnostics and reuse rules surrounding it. Reuse must preserve the partial result's limitations and cannot upgrade it to complete. Diagnostics state what is incomplete, invalid, unresolved, unsupported, or conflicting and which consumers are blocked.

Cancellation follows the same honesty rule. A phase result completed and validated before cancellation may be retained if it does not depend on incomplete mutable state. The cancelled run cannot publish a completed compilation result, and an interrupted cache write cannot become reusable.

This is another reason diagnostics belong to the compiler contract. They are how partial knowledge remains inspectable without being misrepresented as ready knowledge.

## AI may explain evidence, not create authority

Structured diagnostics and reproducibility records make valuable AI assistance possible. An AI system can group findings, explain a rule, propose a bounded edit, compare decision reports, or help investigate why two runs diverged.

It must not silently cross the authority boundary.

An AI-generated fix proposal identifies exact edits and includes preconditions so stale proposals can be rejected. It does not edit governed source or accept its own result without authorized action. An AI explanation cannot suppress a diagnostic. An AI assessment cannot assert verified reproducibility without the required comparison evidence.

This preserves the constitutional rule carried into the semantic graph: AI may assist and propose, but it does not acquire independent acceptance authority.

## From specification to seven work packets

MSC-CORE-0009 becomes implementable through seven packets. Their order follows the evidence chain rather than grouping everything into one “incremental compiler” project:

```text
WP-MSC-0007 Diagnostics ─┐
                        ├─▶ WP-MSC-0010 Incremental planning
WP-MSC-0008 Manifests ─▶ WP-MSC-0009 Dependencies ─┘
                                      ↓
                         WP-MSC-0011 Verified caching
                                      ↓
                  WP-MSC-0012 Determinism and reproducibility
                                      ↓
                         WP-MSC-0013 Conformance suite
```

### WP-MSC-0007 — Implement Structured Diagnostics

This packet builds the renderer-neutral diagnostic model, catalog, rule and occurrence identities, ordering, deduplication, suppression, fix proposals, and lifecycle behavior. It supplies stable findings to phase results, caches, reproducibility comparisons, and later backend diagnostics.

It begins independently because diagnostics are not an accessory to incremental compilation. Every later packet needs a normalized way to explain its decisions and failures.

### WP-MSC-0008 — Implement Compilation Manifests

This packet builds request normalization, logical input inventories, environment classification, manifest identities, canonical encoding, and phase-result envelopes. It defines what a compilation means before any reusable work is accepted.

It also preserves the identity boundaries with MSC-CORE-0008: manifest digest, run identity, diagnostic-set digest, MSG graph identity, and MSG fingerprint remain separate.

### WP-MSC-0009 — Implement Dependency Observation and Invalidation

With manifests available, this packet records declared and discovered dependencies, classifies changes, computes conservative transitive invalidation, handles additions, deletions, renames, cycles, and unknowns, and explains reuse eligibility.

Its most important negative requirement is that incomplete observation cannot be presented as precise reuse. Unsupported precision widens invalidation or disables reuse.

### WP-MSC-0010 — Implement Incremental Planning

This packet combines normalized inputs, diagnostics, and invalidation decisions into an inspectable plan. Each unit is reused, recomputed, invalidated, or unavailable for a recorded reason. Execution can fall back cleanly when proof is missing.

The plan is operational evidence. It coordinates compilation without changing canonical MSG content.

### WP-MSC-0011 — Implement Verified Compilation Caching

This packet implements domain-separated keys, immutable entries, compatibility and integrity validation, atomic publication, storage interfaces, corruption handling, and safe rejection. It treats cache contents as untrusted until accepted by the phase contract.

Local caching can satisfy the bootstrap profile. Remote caching may come later, but it cannot weaken the acceptance rules.

### WP-MSC-0012 — Implement Deterministic Execution and Reproducibility

This packet prevents schedule, filesystem, time, randomness, and other operational variation from changing normalized output. It builds reproducibility records, result comparison, mismatch diagnostics, taint handling, and optional attestation boundaries.

It hands the comparison model forward to MSC-CORE-0010, where self-hosting and backend evidence will require additional downstream definitions.

### WP-MSC-0013 — Build the Conformance Suite

The final packet attempts to falsify the entire design. It compares clean, incremental, cached, serial, parallel, relocated, repeated, and supported cross-platform compilations. It injects corrupt and malicious entries, missing dependency observations, cancellation, plugin failures, schema changes, and schedule variation. Mutation tests intentionally omit dependency edges to prove stale reuse is detectable.

The suite closes implementation evidence only after WP-MSC-0007 through WP-MSC-0012 have accepted implementations. Its existence as a plan is not evidence that any of those tests currently pass.

## The bootstrap compiler can be coarse, not careless

Monad does not need its most sophisticated incremental engine on the first day. The bootstrap MSC profile may invalidate entire files or modules. It may use a local content-addressed cache. It may defer remote caching, cross-machine verification, signed attestations, and semantic-interface-level reuse.

It may not defer the invariants that make those later features safe.

The bootstrap profile still needs normalized manifests, structured diagnostics, complete observations at its declared granularity, conservative invalidation, clean/incremental equivalence, cache integrity checks, deterministic ordering, MSG fingerprint agreement, and reproducibility records.

This is the same principle used for the bootstrap semantic graph: start with a bounded implementation that tells the truth. Fine-grained reuse is an optimization that can be added after evidence supports it. A compiler that invalidates too much is slow. A compiler that silently invalidates too little is untrustworthy.

## What this design buys Monad

This design makes performance explainable.

When MSC reuses work, it can say which normalized contract matched, which dependencies remained valid, which cache entry passed verification, and why the result is observationally equivalent to a clean run. When it recomputes, it can explain the invalidating change or missing evidence. When two runs disagree, it can locate the first differing contract surface. When a result is partial or unverified, it says so without upgrading the claim.

The costs are real. The compiler must inventory inputs, observe dependencies, version schemas and algorithms, maintain stable diagnostic identities, validate cache entries, canonicalize concurrent reductions, record decisions, and continuously compare optimized execution against a clean oracle. This work may initially make MSC slower and more complex than a compiler with an ad hoc cache.

But the alternative complexity does not disappear. It emerges later as stale policy findings, irreproducible graphs, cache poisoning, intermittent ordering failures, broken history, and unexplained differences between developer machines and CI. In a system that turns engineering knowledge into governed operational output, those failures are architectural failures.

The semantic graph defined what one compilation means. MSC-CORE-0009 defines how that meaning remains visible and stable when the compiler becomes fast.

WP-MSC-0007 through WP-MSC-0013 provide the implementation path. WC-0002 must now review the specification, decomposition, and this narrative together; verify their boundaries against MSC-CORE-0008 and the future MSC-CORE-0010; and decide whether the design is coherent enough to proceed without changing the Architecture Freeze.

---

## Governing artifacts

- [MSC-CORE-0009 — Diagnostics, Incrementality, and Reproducibility](../specifications/MSC/core/MSC-CORE-0009.md)
- [Building Monad #011 — Designing the Semantic Graph](011-designing-the-semantic-graph.md)
- [PI-002 — Semantic Compiler Foundation](../engineering/increments/PI-002.md)
- [Monad Engineering Project Status](../engineering/PROJECT-STATUS.md)
- [WP-MSC-0007 — Implement Structured Diagnostics](../engineering/work-packets/WP-MSC-0007.md)
- [WP-MSC-0008 — Implement Compilation Manifests](../engineering/work-packets/WP-MSC-0008.md)
- [WP-MSC-0009 — Implement Dependency Observation and Invalidation](../engineering/work-packets/WP-MSC-0009.md)
- [WP-MSC-0010 — Implement Incremental Planning](../engineering/work-packets/WP-MSC-0010.md)
- [WP-MSC-0011 — Implement Verified Compilation Caching](../engineering/work-packets/WP-MSC-0011.md)
- [WP-MSC-0012 — Implement Deterministic Execution and Reproducibility](../engineering/work-packets/WP-MSC-0012.md)
- [WP-MSC-0013 — Build Incremental and Reproducibility Conformance Suite](../engineering/work-packets/WP-MSC-0013.md)

## Work-cycle status

At publication of this draft:

- PI-001 — Architecture Freeze is complete.
- PI-002 — Semantic Compiler Foundation is active.
- WC-0001 — Semantic Graph Construction is planning-complete; implementation has not started.
- WC-0002 — Diagnostics, Incrementality, and Reproducibility is the active specification stream.
- MSC-CORE-0009 remains a normative draft pending WC-0002 review.
- WP-MSC-0007 through WP-MSC-0013 are planned and unassigned; their implementation checklists are incomplete.
- No structured-diagnostic, incremental-compilation, compilation-cache, deterministic-execution, or reproducibility implementation is claimed by this article.
- Architecture Freeze remains intact; this design proposes no amendment.
- Final cross-specification reconciliation with MSC-CORE-0008 and MSC-CORE-0010 remains open under PI-002.

The next required artifact is:

```text
engineering/work-cycles/WC-0002-DIAGNOSTICS-INCREMENTALITY-AND-REPRODUCIBILITY-REVIEW.md
```

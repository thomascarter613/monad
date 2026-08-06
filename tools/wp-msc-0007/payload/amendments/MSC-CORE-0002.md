<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Reconciliation Amendment

### Repeated Validation Barriers

Validation is a phase family invoked at representation boundaries rather than one pass after MSG. Required barriers are invocation, source, surface AST, canonicalization, binding, resolution, semantic analysis, MSG, KIR, backend-output, and cross-representation conformance validation.

### Profile Composition

A `CompilationProfile` coordinates discovery, frontend, normalization, semantic-analysis, MSG-construction, lowering, backend, diagnostic, and reproducibility policies. Each child policy is independently versioned and fingerprinted. Conflict resolution follows authority and rejects silent weakening.

### Typed Readiness Mapping

```text
SemanticReadiness.semantic_analysis_complete
    → MSGReadiness.constructible
    → MSGReadiness.valid
    → KIRReadiness.eligible_for_target
    → KIRReadiness.valid
    → BackendReadiness.compatible
    → GeneratedArtifactReadiness.plan_ready
    → GeneratedArtifactReadiness.apply_ready | verify_only | blocked
```

No unqualified `backend_ready` value crosses these domains.

### Invocation Categories

Compiler passes, MSG consumers, KIR backends, and external tools are distinct invocation classes. Projection consumers do not enter KIR backend phases unless they consume KIR.

### Optimization Boundary

Governed KIR optimization preserves KIR semantics and participates in pass identity, diagnostics, fingerprints, provenance, and reproducibility. Backend-internal IR is noncanonical and backend-owned.

### Legacy Bootstrap Metadata Compatibility

Until MSC-CORE source documents are normalized, the bootstrap compatibility profile may accept the historical flat metadata layout and long closing delimiter only when normalization is deterministic and lossless. Canonical normalized metadata uses nested mappings and exact `---` delimiters. Ambiguous reconstruction is an error. The compatibility form is deprecated and must never be emitted as canonical output.

<!-- WP-MSC-0007:END -->

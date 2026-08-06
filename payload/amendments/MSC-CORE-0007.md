<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Reconciliation Amendment

### Exact Semantic Analysis Output

`MSC-CORE-0007` owns the immutable `SemanticAnalysisSnapshot`:

```text
SemanticAnalysisSnapshot
├── snapshot_id
├── schema_version
├── compilation_unit
├── input_snapshot_references
├── input_snapshot_fingerprints
├── type_environment
├── type_results
├── constraint_graph
├── constraint_results
├── authority_results
├── lifecycle_results
├── profile_results
├── feature_results
├── compatibility_results
├── semantic_conflicts
├── semantic_readiness
├── diagnostics
├── pass_versions
├── extension_set
├── provenance
└── fingerprint
```

The snapshot references but does not redefine canonical AST, bound declaration, or resolved reference snapshots.

### MSG Construction Handoff

`MSC-CORE-0008` receives a separate `SemanticGraphConstructionInput` bundle containing the compilation-unit, canonical AST, bound declaration, resolved reference, and semantic-analysis snapshots plus construction profile, extension set, schema versions, fingerprints, and provenance.

### Semantic Readiness

`SemanticReadiness` values include:

```text
partial
semantic_analysis_complete
authoritative_for_context
msg_constructible
blocked
```

They do not imply KIR, backend, plan, or apply readiness.

### Feature and Capability Boundary

Semantic feature negotiation determines whether language and semantic features are understood and represented. Backend capability negotiation occurs after KIR construction and determines whether a particular KIR backend can realize the requested target contract.

<!-- WP-MSC-0007:END -->

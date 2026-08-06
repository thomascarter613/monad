<!-- WP-MSC-0007:BEGIN -->

---

## WP-MSC-0007 Reconciliation Amendment

### Preliminary and Effective Authority/Lifecycle

Reference resolution may use `PreliminaryAuthorityState` and `PreliminaryLifecycleState` derived from explicit declarations and already-valid governing context. These states determine candidate admissibility but do not establish final authority or lifecycle.

Semantic analysis computes `EffectiveAuthorityState` and `EffectiveLifecycleState` using imports, fragments, adoption evidence, governance, profiles, compatibility, and semantic context.

All rejected candidates remain represented with rejection evidence. A changed effective result invalidates dependent resolution and semantic results.

### Bounded Revalidation

When effective authority or lifecycle can change candidate applicability, MSC executes a declared bounded revalidation group:

```text
candidate discovery
→ preliminary filtering
→ semantic authority/lifecycle analysis
→ affected-reference revalidation
→ stability check
```

The process terminates when the affected candidate and effective-state fingerprints stabilize. Repeated state or a configured iteration limit produces a cycle diagnostic and blocks affected authoritative output. Pass order must not choose the result.

<!-- WP-MSC-0007:END -->

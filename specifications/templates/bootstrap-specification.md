---
artifact:
  id: SERIES-CATEGORY-0000
  type: knowledge.specification
  namespace: monad
  series: SERIES-CATEGORY
  sequence: 0

metadata:
  title: Specification Title
  version: 0.1.0
  status: draft
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  authors:
    - Author or Team
  tags:
    - bootstrap

relationships:
  depends_on: []
  references: []
  enables: []

compilation:
  language: msl-markdown
  language_version: bootstrap
  profile: bootstrap
  source_role: primary
  schema: monad.msl/document@0.1

provenance:
  source: specifications/SERIES/category/SERIES-CATEGORY-0000.md
---

# SERIES-CATEGORY-0000 — Specification Title

## 1. Purpose

State the single primary purpose of this specification.

Explain what contract, behavior, model, language feature, or system boundary the specification defines.

## 2. Context

Describe the problem, architectural background, and repository state that make the specification necessary.

Separate direct facts from interpretation where the distinction matters.

## 3. Scope

Define what this specification governs.

- In-scope concern one.
- In-scope concern two.
- In-scope concern three.

## 4. Non-Goals

Define what is intentionally excluded.

- Non-goal one.
- Non-goal two.
- Deferred concern.

## 5. Terminology

Include this section when terms have project-specific meanings.

### Term

Definition.

## 6. Normative Requirements

Use stable, globally unique requirement identifiers.

Use uppercase normative terms deliberately:

- `MUST`;
- `MUST NOT`;
- `SHOULD`;
- `SHOULD NOT`;
- `MAY`.

### SERIES-CATEGORY-REQ-001

A conforming system **MUST** state one observable requirement.

### SERIES-CATEGORY-REQ-002

A conforming system **MUST NOT** rely on unspecified behavior.

### SERIES-CATEGORY-REQ-003

A conforming system **SHOULD** provide deterministic evidence of conformance.

## 7. Conceptual Model

Describe the human-readable model.

```text
Input
  ↓
Transformation
  ↓
Output
```

## 8. Machine Specification

Include this section when the artifact defines machine-normative declarations.

```yaml
machine_spec:
  kind: example
  status: bootstrap
```

## 9. Invariants

Include this section when machine-checkable invariants are declared.

```yaml
invariants:
  - id: SERIES-CATEGORY-INV-001
    expression: true
    description: Replace with a meaningful invariant.
```

## 10. Diagnostics

Include this section when the specification defines validator, compiler, or runtime failures.

### CODE0001 — Diagnostic Title

Describe the triggering condition, severity, message semantics, governing requirement, and source span.

## 11. Acceptance Criteria

Define observable conformance conditions.

This specification is satisfied when:

1. the required contract is explicit;
2. valid and invalid states are distinguishable;
3. normative requirements are traceable to evidence;
4. deterministic diagnostics are defined where applicable;
5. deferred decisions are recorded without being resolved implicitly.

## 12. Conformance Examples

Provide valid and invalid examples.

### 12.1 Valid Example

```yaml
valid: true
```

### 12.2 Invalid Example

```yaml
valid: false
```

State the expected diagnostic or conformance failure.

## 13. Security and Trust Considerations

Include this section when the specification affects trust, execution, data, authorization, generated artifacts, publication, or AI context.

Consider:

- untrusted input;
- unsafe deserialization;
- path traversal;
- authority confusion;
- provenance loss;
- resource exhaustion;
- generated-content trust boundaries.

## 14. Evolution and Compatibility

Describe:

- versioning;
- compatibility expectations;
- migration;
- deprecation;
- schema or language-version interaction;
- historical preservation.

## 15. Open Questions

Include this section when unresolved or deferred decisions remain.

1. Open or deferred question.
2. Open or deferred question.

## 16. Related Specifications

- `RELATED-ARTIFACT-0001` — Relationship description.

## Status

Draft.

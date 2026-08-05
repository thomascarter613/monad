# Monad Documentation Operations

SITE-0012 closes the initial documentation-platform implementation series.

## Operational commands

```bash
bun run operations:doctor
bun run verify:ci
bun run verify:operations
bun run operations:report
```

## Release procedure

1. Ensure the worktree is clean.
2. Run `bun run release:plan -- --edition complete --version X.Y.Z`.
3. Run `bun run verify:release`.
4. Create and push `docs-vX.Y.Z`, or dispatch **Documentation Release**.
5. Verify the generated checksums and download the retained workflow artifact.
6. Confirm the public site health endpoint after deployment.

## Rollback

### Vercel

Promote the previous known-good deployment in Vercel, then investigate the failed commit without rewriting publication history.

### Container

Redeploy the previous immutable image digest. Do not rebuild an old tag and assume it is identical.

### Publication release

GitHub release artifacts are immutable evidence. Correct errors by publishing a new patch edition rather than replacing an already distributed edition.

## Incident triage

1. Check `/api/health`.
2. Review the Documentation CI and deployment workflow runs.
3. Download `docs-browser-*` operational reports.
4. Check content validation before debugging rendering.
5. Roll back deployment before making speculative production edits.

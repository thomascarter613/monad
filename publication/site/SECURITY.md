# Documentation Site Security

The Monad Engineering Log is a public read-only publication. It must not store credentials, reader accounts, or private repository content.

## Security controls

- Restrictive response headers and CSP
- No `X-Powered-By` disclosure
- Read-only, unprivileged container runtime
- Opt-in deployment workflows
- Least-privilege GitHub workflow permissions
- Export endpoints can be disabled or bearer-token protected
- No secrets are exposed by `/api/health` or `/api/operations`

## Reporting

Do not include credentials, private content, or active exploit details in a public issue. Use the repository owner's private security-reporting channel when one is configured.

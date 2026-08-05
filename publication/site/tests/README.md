# Publication Site Tests

## Unit tests

Vitest covers typed configuration, environment parsing, and route-contract invariants.

```bash
bun run test:unit
bun run test:coverage
```

## Browser smoke tests

Playwright verifies the public landing page, the Fumadocs reference route, and the controlled 404 experience.

Install the Chromium test browser once:

```bash
bun run test:e2e:install
```

Then run:

```bash
bun run test:e2e
```

Set `PLAYWRIGHT_BASE_URL` to test an already deployed site instead of starting a local development server.

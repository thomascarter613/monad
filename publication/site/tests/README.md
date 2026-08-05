# Publication-site tests

## Unit coverage

The unit suite covers:

- Environment parsing
- Route and information-architecture contracts
- Reading-path and navigation-manifest generation
- Frontmatter parsing
- Canonical slug and identifier inference
- Content ingestion and link rewriting
- Identifier families and lifecycle transitions
- Series, aliases, supersession, and reverse references

## Browser coverage

The Playwright smoke suite verifies:

- Landing page and all primary publication surfaces
- Audience reading paths
- Fumadocs system rendering and canonical metadata
- Generated collection and project pages
- Registry and navigation APIs
- Controlled not-found behavior

Install Chromium once with `bun run test:e2e:install`, then run `bun run verify:full`.

## SITE-0006 visual and accessibility tests

- `accessibility.spec.ts` verifies the skip link, primary heading discipline, color-scheme metadata, and primary target sizing.
- `visual.spec.ts` is opt-in and uses Playwright screenshot comparisons for representative desktop, dark-mode, and mobile surfaces.
- `visual-system.test.ts` checks the design-token and media-query contract without launching a browser.
- `projection-presentation.test.ts` ensures canonical level-one titles are not duplicated after the governed article header is rendered.

## SITE-0007 presentation tests

- `presentation-projection.test.ts` validates Markdown-to-MDX enrichment.
- `presentation-components.test.ts` protects central component registration and style contracts.
- `presentation-components.spec.ts` verifies the rendered component reference page.

## SITE-0008 Building Monad tests

- `building-monad-normalize.test.ts` validates publication, reading-time, and repository-state normalization.
- `building-monad-manifest.test.ts` validates chronology, project-phase grouping, continuity, and connected artifacts.
- `building-monad-presentation.test.ts` protects the browser-local reading-state and series-style contracts.
- `building-monad-series.spec.ts` verifies the generated API, series index, article progress, and installment navigation.


## SITE-0009 artifact exploration tests

- `exploration-manifest.test.ts` validates facets, relationships, supersession lineage, series progress, and chronology.
- `exploration-contract.test.ts` validates routes, generated contracts, commands, and visual imports.
- `artifact-exploration.spec.ts` exercises the artifact catalog and project timeline.

SITE-0012 adds `operations.spec.ts` plus unit contracts for deployment and security configuration.

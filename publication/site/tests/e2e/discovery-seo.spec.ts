import { expect, test } from '@playwright/test';

test('renders governed faceted search', async ({ page }) => {
  await page.goto('/search');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Search Monad');
  await expect(page.getByLabel('Search the publication')).toBeVisible();
  await expect(page.getByLabel('Surface')).toBeVisible();
});

test('publishes machine-readable discovery surfaces', async ({ request }) => {
  for (const [route, contentType] of [
    ['/llms.txt', 'text/plain'],
    ['/llms-full.txt', 'text/plain'],
    ['/feeds/building-monad.rss.xml', 'application/rss+xml'],
    ['/feeds/building-monad.atom.xml', 'application/atom+xml'],
    ['/sitemap.xml', 'application/xml'],
    ['/robots.txt', 'text/plain'],
  ] as const) {
    const response = await request.get(route);
    expect(response.ok(), route).toBe(true);
    expect(response.headers()['content-type']).toContain(contentType);
  }
});

test('publishes Markdown for a document URL', async ({ request }) => {
  const response = await request.get('/system.md');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('text/markdown');
  expect(await response.text()).toContain('# Understand Monad');
});

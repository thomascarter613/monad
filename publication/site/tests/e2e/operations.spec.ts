import { expect, test } from '@playwright/test';

test('publishes operational status without secrets', async ({ request }) => {
  const response = await request.get('/api/health');
  expect([200, 503]).toContain(response.status());
  const body = await response.json();
  expect(body.service).toBe('monad-engineering-log');
  expect(JSON.stringify(body)).not.toContain('VERCEL_TOKEN');
});

test('publishes security headers', async ({ page }) => {
  const response = await page.goto('/project/operations');
  expect(response?.status()).toBe(200);
  expect(response?.headers()['content-security-policy']).toContain("default-src 'self'");
  expect(response?.headers()['x-content-type-options']).toBe('nosniff');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Publication Operations' }),
  ).toBeVisible();
});

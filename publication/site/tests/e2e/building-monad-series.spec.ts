import { expect, test } from '@playwright/test';

test('Building Monad exposes its chronological series experience', async ({ page, request }) => {
  const response = await request.get('/api/building-monad');
  expect(response.ok()).toBe(true);
  const manifest = await response.json();

  await page.goto('/building-monad');
  await expect(page.getByRole('heading', { level: 1, name: 'Building Monad' })).toBeVisible();
  await expect(page.getByText('Chronology first; durable artifacts beside it')).toBeVisible();

  if (manifest.installments.length === 0) return;
  const first = manifest.installments[0];
  await expect(page.getByRole('link', { name: new RegExp(first.title) }).first()).toBeVisible();

  await page.goto(first.route);
  await expect(page.getByRole('heading', { level: 1, name: first.title })).toBeVisible();
  await expect(page.getByRole('progressbar', { name: new RegExp('Reading progress') })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Building Monad installment navigation' })).toBeVisible();
});

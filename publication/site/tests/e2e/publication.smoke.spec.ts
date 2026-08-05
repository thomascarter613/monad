import { expect, test } from '@playwright/test';

test('renders the publication landing page and active content surfaces', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Building Monad in public, with the reasoning intact.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Building Monad' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'System' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Artifacts' })).toBeVisible();
});

test('renders the system reference through Fumadocs', async ({ page }) => {
  await page.goto('/system');

  await expect(page.getByRole('heading', { level: 1, name: 'Understand Monad' })).toBeVisible();
  await expect(page).toHaveTitle(/Understand Monad/);
});

test('renders generated collection indexes even before canonical sources exist', async ({ page }) => {
  await page.goto('/building-monad');
  await expect(page.getByRole('heading', { level: 1, name: 'Building Monad' })).toBeVisible();

  await page.goto('/artifacts');
  await expect(page.getByRole('heading', { level: 1, name: 'Artifacts' })).toBeVisible();
});

test('renders the controlled not-found experience', async ({ page }) => {
  const response = await page.goto('/route-that-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'This publication route does not exist yet.',
    }),
  ).toBeVisible();
});

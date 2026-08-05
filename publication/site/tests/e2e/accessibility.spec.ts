import { expect, test } from '@playwright/test';

test('offers a keyboard-visible skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Skip to main content' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await expect(skipLink).toHaveAttribute('href', '#main-content');
});

test('preserves a single primary heading across key surfaces', async ({ page }) => {
  for (const route of ['/', '/start', '/system', '/artifacts', '/project']) {
    await page.goto(route);
    await expect(page.locator('h1')).toHaveCount(1);
  }
});

test('publishes light and dark color-scheme support', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('meta[name="color-scheme"]')).toHaveAttribute('content', /light dark/);
});

test('uses readable minimum target sizes for primary calls to action', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: 'Choose a reading path' });
  const box = await link.boundingBox();

  expect(box).not.toBeNull();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(40);
});

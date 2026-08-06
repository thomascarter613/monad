import { expect, test } from '@playwright/test';

test('publication editions are discoverable and printable', async ({ page }) => {
  await page.goto('/editions');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Editions of the Monad engineering record/i,
    }),
  ).toBeVisible();
  await page
    .getByRole('link', { name: /Open edition/i })
    .first()
    .click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('link', { name: 'Print preview' }).click();
  await expect(page.locator('.monad-edition-print')).toBeVisible();
});

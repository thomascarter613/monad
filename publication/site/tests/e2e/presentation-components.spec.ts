import { expect, test } from '@playwright/test';

test.describe('presentation components', () => {
  test('renders the component reference page', async ({ page }) => {
    await page.goto('/system/presentation-components');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Presentation Components' }),
    ).toBeVisible();
    await expect(page.getByText('Keep canonical documents renderer-independent')).toBeVisible();
    await expect(page.getByText('Inspect the repository')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Publication evolution' })).toBeVisible();
  });

  test('semantic notes expose explicit labels', async ({ page }) => {
    await page.goto('/system/presentation-components');

    await expect(page.getByText('Decision', { exact: true })).toBeVisible();
    await expect(page.getByText('Design constraint', { exact: true })).toBeVisible();
    await expect(page.getByText('Reader checkpoint', { exact: true })).toBeVisible();
  });
});

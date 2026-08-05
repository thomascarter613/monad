import { expect, test } from '@playwright/test';

test('artifact explorer exposes registry-backed filters and document inspection', async ({
  page,
  request,
}) => {
  const response = await request.get('/api/exploration');
  expect(response.ok()).toBe(true);
  const manifest = await response.json();

  await page.goto('/artifacts/explore');
  await expect(page.getByRole('heading', { level: 1, name: 'Artifact Explorer' })).toBeVisible();
  await expect(page.getByTestId('artifact-explorer')).toBeVisible();
  await expect(page.getByLabel('Search the corpus')).toBeVisible();

  if (manifest.documents.length > 0) {
    await page.getByLabel('Search the corpus').fill(manifest.documents[0].id);
    await expect(page.getByText(manifest.documents[0].title).first()).toBeVisible();
  }
});

test('project timeline exposes dated and undated records', async ({ page }) => {
  await page.goto('/project/timeline');
  await expect(page.getByRole('heading', { level: 1, name: 'Project Timeline' })).toBeVisible();
  await expect(page.getByTestId('project-timeline')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Undated documents' })).toBeVisible();
});

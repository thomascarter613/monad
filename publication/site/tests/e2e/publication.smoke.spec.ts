import { expect, test } from '@playwright/test';

test('renders the publication landing page and complete public surfaces', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Building Monad in public, with the reasoning intact.',
    }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Choose a reading path' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Building Monad', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'System', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Artifacts', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Project', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Search', exact: true })).toBeVisible();
});

test('renders audience-specific reading paths', async ({ page }) => {
  await page.goto('/start');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Choose the path');
  await expect(page.getByRole('heading', { name: "Builder's Path" })).toBeVisible();
  await expect(page.getByRole('heading', { name: "Architect's Path" })).toBeVisible();
});

test('renders the system reference through Fumadocs', async ({ page }) => {
  await page.goto('/system');
  await expect(page.getByRole('heading', { level: 1, name: 'Understand Monad' })).toBeVisible();
  await expect(page).toHaveTitle(/Understand Monad/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/system$/);
});

test('renders every generated collection index before canonical sources exist', async ({
  page,
}) => {
  for (const [route, heading] of [
    ['/building-monad', 'Building Monad'],
    ['/artifacts', 'Artifacts'],
    ['/project', 'Project'],
    ['/project/status', 'Current Status'],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
  }
});

test('exposes registry and navigation manifests', async ({ page }) => {
  const registryResponse = await page.request.get('/api/registry');
  expect(registryResponse.ok()).toBe(true);
  expect((await registryResponse.json()).schemaVersion).toBe(2);

  const discoveryResponse = await page.request.get('/api/discovery');
  expect(discoveryResponse.ok()).toBe(true);
  expect((await discoveryResponse.json()).schemaVersion).toBe(1);

  const navigationResponse = await page.request.get('/api/navigation');
  expect(navigationResponse.ok()).toBe(true);
  const navigation = await navigationResponse.json();
  expect(navigation.schemaVersion).toBe(1);
  expect(navigation.routes.some((route: { route: string }) => route.route === '/project')).toBe(
    true,
  );
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

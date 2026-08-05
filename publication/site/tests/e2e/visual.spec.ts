import { expect, test } from '@playwright/test';

const visualTestsEnabled = process.env.MONAD_VISUAL_TESTS === '1';

test.describe('visual contracts', () => {
  test.skip(!visualTestsEnabled, 'Set MONAD_VISUAL_TESTS=1 to execute visual comparisons.');

  test('publication home in light mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('publication-home-light.png', {
      animations: 'disabled',
      fullPage: true,
    });
  });

  test('system reference in dark mode', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/system');
    await expect(page).toHaveScreenshot('system-reference-dark.png', {
      animations: 'disabled',
      fullPage: true,
    });
  });

  test('reading paths at mobile width', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/start');
    await expect(page).toHaveScreenshot('reading-paths-mobile.png', {
      animations: 'disabled',
      fullPage: true,
    });
  });
});

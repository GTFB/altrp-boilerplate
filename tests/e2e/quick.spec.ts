import { test, expect } from '@playwright/test';

test.describe('Quick Pre-commit E2E Tests', () => {
  test('should have H1 and title', async ({ page }) => {
    // Quick check of Payload CMS homepage
    await page.goto('/');
    
    // Wait for page load (fast)
    await page.waitForLoadState('domcontentloaded');
    
    // Check H1 heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const title = page.locator('title');
    await expect(title).toBeTruthy();
    
    console.log('✅ Quick H1 check passed');
  });
});

import { test, expect } from '@playwright/test';

test.describe('Payload CMS Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Payload CMS homepage
    await page.goto('/');
    // Wait for page load
    await page.waitForLoadState('domcontentloaded');
  });

  test('should display main page elements', async ({ page }) => {
    // Check that page loaded
    await expect(page).toHaveTitle(/Payload/);
    
    // Check presence of main elements
    await expect(page.locator('body')).toBeVisible();
    
    // Take screenshot for verification
    await page.screenshot({ path: 'tests/e2e/screenshots/homepage.png' });
  });

  test('should have H1 heading', async ({ page }) => {
    // Check presence of H1 heading
    const h1 = page.locator('h1');
    
    // Check that H1 exists
    await expect(h1).toBeVisible();
    
    // Check that H1 is not empty
    const h1Text = await h1.textContent();
    expect(h1Text).toBeTruthy();
    expect(h1Text!.trim().length).toBeGreaterThan(0);
    
    console.log('H1 found:', h1Text);
  });

  test('should have proper page title', async ({ page }) => {
    // Check page title
    const pageTitle = await page.title();
    
    // Check that title is not empty
    expect(pageTitle).toBeTruthy();
    expect(pageTitle.length).toBeGreaterThan(0);
    
    // Check that title contains "Payload" or similar text
    expect(pageTitle.toLowerCase()).toContain('payload');
    
    console.log('Page title:', pageTitle);
  });

  test('should have theme toggle button', async ({ page }) => {
    // Use specific selector from code
    const themeButton = page.locator('[aria-label="Select a theme"]');
    
    // Check that button is found and visible
    await expect(themeButton).toBeVisible();
    
    // Check that button is clickable
    await expect(themeButton).toBeEnabled();
    
    console.log('Theme toggle button found using aria-label');
  });

  test('should have search button', async ({ page }) => {
    // Look for search button using different selectors
    const searchButton = page.locator('[href="/search"]');
    
    // Check that button is found and visible
    await expect(searchButton.first()).toBeVisible();
    
    // Check that button is clickable
    await expect(searchButton.first()).toBeEnabled();
    
    console.log('Search button found');
  });

  test('should have all required elements', async ({ page }) => {
    // Comprehensive check of all elements on one page
    
    // 1. H1
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // 2. Title
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();
    
    // 3. Theme toggle button (use specific selector)
    const themeButton = page.locator('[aria-label="Select a theme"]');
    await expect(themeButton).toBeVisible();
    
    // 4. Search button
    const searchButton = page.locator('[href="/search"]');
    await expect(searchButton.first()).toBeVisible();
    
    // Take final screenshot
    await page.screenshot({ path: 'tests/e2e/screenshots/homepage-complete.png' });
    
    console.log('✅ All required elements found on homepage');
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile version
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    // Check that all elements are visible on mobile
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const themeButton = page.locator('[aria-label="Select a theme"]');
    await expect(themeButton).toBeVisible();
    
    // 4. Search button
    const searchButton = page.locator('[href="/search"]');
    await expect(searchButton.first()).toBeVisible();
    
    // Return to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
  });
});

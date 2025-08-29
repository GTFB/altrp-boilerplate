import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'payload-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'payload-firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'payload-webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'payload-Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'payload-Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'npm run dev:payload',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  
  // Report settings
  outputDir: 'test-results/',
  
  // Timeouts
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
});

import { defineConfig, devices } from '@playwright/test';
import Config from './config/settings.js';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',

  // Maximum time one test can run
  timeout: Config.DEFAULT_TIMEOUT,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporting
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    baseURL: Config.BASE_UI_URL,
    trace: 'on-first-retry',
    screenshot: Config.SCREENSHOT_ON_FAILURE ? 'only-on-failure' : 'off',
    video: 'retain-on-failure',
  },

  // Configure browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices.Desktop, browser: 'chromium' },
    },
    {
      name: 'firefox',
      use: { ...devices.Desktop, browser: 'firefox' },
    },
    {
      name: 'webkit',
      use: { ...devices.Desktop, browser: 'webkit' },
    },
  ],

  // Run your local dev server before starting tests
  webServer: undefined, // Set to dev server config if needed
});


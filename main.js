import { chromium, firefox, webkit } from '@playwright/test';
import Config from './config/settings.js';
import Logger from './utils/logger.js';

const logger = Logger.getInstance();

/**
 * Quick start demo to verify setup
 */
async function demoUIAutomation() {
  logger.info('='.repeat(50));
  logger.info('Starting UI Automation Demo');
  logger.info('='.repeat(50));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Example Domain
    logger.info('Navigating to https://example.com');
    await page.goto('https://example.com');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Get page title
    const title = await page.title();
    logger.info(`✓ Page title: ${title}`);

    // Get heading
    const heading = await page.textContent('h1');
    logger.info(`✓ Page heading: ${heading}`);

    // Get paragraph content
    const paragraph = await page.textContent('p');
    logger.info(`✓ Page content preview: ${paragraph?.substring(0, 50)}...`);

    // Take screenshot
    await page.screenshot({ path: 'test-results/screenshots/demo.png' });
    logger.info('✓ Screenshot taken');
  } catch (error) {
    logger.error(`UI Demo Error: ${error.message}`);
  } finally {
    await context.close();
    await browser.close();
  }
}

/**
 * API demo
 */
async function demoAPIAutomation() {
  logger.info('='.repeat(50));
  logger.info('Starting API Automation Demo');
  logger.info('='.repeat(50));

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();

    if (response.ok) {
      logger.info('✓ GET /posts/1 - Status: 200');
      logger.info(`✓ Post ID: ${data.id}`);
      logger.info(`✓ Post Title: ${data.title}`);
      logger.info(`✓ Post Body: ${data.body.substring(0, 50)}...`);
    } else {
      logger.error(`API Demo Error: Status ${response.status}`);
    }
  } catch (error) {
    logger.error(`API Demo Error: ${error.message}`);
  }
}

/**
 * Main demo function
 */
async function main() {
  logger.info('Playwright Demo - Configuration Check');
  logger.info(`Base UI URL: ${Config.BASE_UI_URL}`);
  logger.info(`API Base URL: ${Config.API_BASE_URL}`);
  logger.info(`Browser: ${Config.BROWSER}`);
  logger.info(`Headless: ${Config.HEADLESS}`);
  logger.info('');

  await demoUIAutomation();
  logger.info('');
  await demoAPIAutomation();

  logger.info('');
  logger.info('✓ Demo completed successfully!');
  logger.info('Run "npm test" to execute full test suite');
}

main().catch(error => {
  logger.error(`Fatal error: ${error.message}`);
  process.exit(1);
});


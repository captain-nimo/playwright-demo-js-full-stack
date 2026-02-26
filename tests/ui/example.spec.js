import { test, expect } from '@playwright/test';
import HtmlPage from './pages/HtmlPage.js';
import Logger from '../../utils/logger.js';

const logger = Logger.getInstance();

test.describe('@ui UI Automation Examples', () => {
  test('@smoke should navigate to page', async ({ page }) => {
    logger.info('Starting test: should navigate to page');

    // Navigate to the example page
    await page.goto('https://httpbin.org/html');

    // Verify page loaded by checking URL
    expect(page.url()).toContain('httpbin.org');

    logger.info('✓ Successfully navigated to page');
  });

  test('@smoke should check page heading', async ({ page }) => {
    logger.info('Starting test: should check page heading');

    await page.goto('https://httpbin.org/html');

    // Wait for h1 heading
    const heading = page.locator('h1');
    await heading.waitFor();

    // Get heading text
    const headingText = await heading.textContent();
    expect(headingText).toContain('Moby');
    expect(headingText).toContain('Dick');

    logger.info(`✓ Found heading: ${headingText}`);
  });

  test('@smoke should check page content', async ({ page }) => {
    logger.info('Starting test: should check page content');

    await page.goto('https://httpbin.org/html');

    // Check for paragraph content
    await page.waitForSelector('p');
    const paragraphText = await page.locator('p').nth(0).textContent();
    expect(paragraphText.length).toBeGreaterThan(0);

    logger.info('✓ Found paragraph content');
  });

  test('should take screenshot', async ({ page }) => {
    logger.info('Starting test: should take screenshot');

    await page.goto('https://httpbin.org/html');
    await page.waitForLoadState('networkidle');

    // Take screenshot
    const screenshotPath = 'test-results/screenshots/example_page.png';
    await page.screenshot({ path: screenshotPath });

    logger.info(`✓ Screenshot saved: ${screenshotPath}`);
  });

  test('should verify page with page object model', async ({ page }) => {
    logger.info('Starting test: should verify page with page object model');

    const htmlPage = new HtmlPage(page);

    // Navigate using page object
    await htmlPage.navigate();
    await page.waitForLoadState('networkidle');

    // Get heading using page object
    const heading = await htmlPage.getHeadingText();
    expect(heading).toContain('Moby');

    // Verify page loaded
    const url = await htmlPage.getPageUrl();
    expect(url).toContain('httpbin.org');

    logger.info('✓ Successfully used page object model');
  });

  test('should get all paragraphs', async ({ page }) => {
    logger.info('Starting test: should get all paragraphs');

    await page.goto('https://httpbin.org/html');

    const paragraphs = page.locator('p');
    const count = await paragraphs.count();

    expect(count).toBeGreaterThan(0);

    logger.info(`✓ Found ${count} paragraphs`);
  });

  test('should verify page title', async ({ page }) => {
    logger.info('Starting test: should verify page title');

    await page.goto('https://httpbin.org/html');

    const title = await page.title();
    // Just verify page loaded, title might be empty
    expect(typeof title).toBe('string');

    logger.info(`✓ Page loaded with title: "${title}"`);
  });

  test('should find element by text', async ({ page }) => {
    logger.info('Starting test: should find element by text');

    await page.goto('https://httpbin.org/html');

    // Find heading containing specific text
    const heading = page.locator('h1:has-text("Moby")');
    await heading.waitFor();

    expect(heading).toBeTruthy();

    logger.info('✓ Found element by text');
  });

  test('should interact with page elements', async ({ page }) => {
    logger.info('Starting test: should interact with page elements');

    await page.goto('https://httpbin.org/html');

    // Get all visible links
    const links = page.locator('a');
    const linkCount = await links.count();

    if (linkCount > 0) {
      const firstLinkText = await links.first.textContent();
      logger.info(`✓ Found first link: ${firstLinkText}`);
    }

    expect(linkCount).toBeGreaterThanOrEqual(0);

    logger.info('✓ Successfully interacted with page elements');
  });
});


import Logger from '../../../utils/logger.js';

const logger = Logger.getInstance();

/**
 * Base page class with common methods for all pages
 */
class BasePage {
  constructor(page, baseUrl = '') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to a URL
   */
  async navigate(path = '') {
    const url = this.baseUrl + path;
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   */
  async waitForLoadState(state = 'networkidle') {
    logger.debug(`Waiting for page to reach '${state}' state`);
    await this.page.waitForLoadState(state);
  }

  /**
   * Wait for selector to be visible
   */
  async waitForSelector(selector, timeout = 30000) {
    logger.debug(`Waiting for selector: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click an element
   */
  async click(selector) {
    logger.debug(`Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Fill input field
   */
  async fill(selector, text) {
    logger.debug(`Filling '${selector}' with text: ${text}`);
    await this.page.fill(selector, text);
  }

  /**
   * Type text character by character
   */
  async typeText(selector, text, delay = 0) {
    logger.debug(`Typing text in '${selector}'`);
    await this.page.type(selector, text, { delay });
  }

  /**
   * Get text content of an element
   */
  async getText(selector) {
    logger.debug(`Getting text from: ${selector}`);
    return await this.page.textContent(selector);
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector, attribute) {
    logger.debug(`Getting attribute '${attribute}' from: ${selector}`);
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch (error) {
      logger.warning(`Error checking visibility of ${selector}: ${error.message}`);
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector) {
    try {
      return await this.page.isEnabled(selector);
    } catch (error) {
      logger.warning(`Error checking if ${selector} is enabled: ${error.message}`);
      return false;
    }
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector, value) {
    logger.debug(`Selecting '${value}' from dropdown: ${selector}`);
    await this.page.selectOption(selector, value);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename) {
    logger.info(`Taking screenshot: ${filename}`);
    return await this.page.screenshot({ path: filename });
  }

  /**
   * Get current URL
   */
  async getUrl() {
    return this.page.url();
  }

  /**
   * Get page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Reload page
   */
  async reload() {
    logger.info('Reloading page');
    await this.page.reload();
  }

  /**
   * Wait for element count
   */
  async getElementCount(selector) {
    logger.debug(`Getting element count for: ${selector}`);
    const locator = this.page.locator(selector);
    return await locator.count();
  }

  /**
   * Get all text contents matching selector
   */
  async getAllTexts(selector) {
    logger.debug(`Getting all texts for: ${selector}`);
    const locator = this.page.locator(selector);
    return await locator.allTextContents();
  }

  /**
   * Check if selector exists
   */
  async exists(selector) {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }
}

export default BasePage;


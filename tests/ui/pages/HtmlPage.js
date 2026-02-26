import BasePage from './BasePage.js';
import Logger from '../../../utils/logger.js';

const logger = Logger.getInstance();

/**
 * HTML page object for httpbin.org/html
 * Demonstrates the Page Object Model pattern
 */
class HtmlPage extends BasePage {
  // Locators
  HEADING = 'h1';
  PARAGRAPH = 'p';
  LINK = 'a';

  constructor(page, baseUrl = 'https://httpbin.org/html') {
    super(page, baseUrl);
  }

  /**
   * Get page heading text
   */
  async getHeadingText() {
    logger.debug('Getting heading text');
    return await this.getText(this.HEADING);
  }

  /**
   * Get paragraph text
   */
  async getParagraphText() {
    logger.debug('Getting paragraph text');
    return await this.getText(this.PARAGRAPH);
  }

  /**
   * Get all links on page
   */
  async getAllLinks() {
    logger.debug('Getting all links');
    const locator = this.page.locator(this.LINK);
    const count = await locator.count();
    const links = [];

    for (let i = 0; i < count; i++) {
      const href = await locator.nth(i).getAttribute('href');
      if (href) {
        links.push(href);
      }
    }

    return links;
  }

  /**
   * Click link by text
   */
  async clickLink(linkText) {
    logger.debug(`Clicking link: ${linkText}`);
    await this.page.click(`text=${linkText}`);
  }

  /**
   * Get current page URL
   */
  async getPageUrl() {
    logger.debug('Getting page URL');
    return this.page.url();
  }
}

export default HtmlPage;


import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

class Config {
  // Browser settings
  static BROWSER = process.env.BROWSER || 'chromium';
  static HEADLESS = process.env.HEADLESS !== 'false';
  static SLOW_MO = parseInt(process.env.SLOW_MO || 0, 10);

  // Timeout settings (in milliseconds)
  static DEFAULT_TIMEOUT = parseInt(process.env.TIMEOUT || 30000, 10);
  static NAVIGATION_TIMEOUT = parseInt(process.env.NAVIGATION_TIMEOUT || 30000, 10);

  // URLs
  static BASE_UI_URL = process.env.BASE_UI_URL || 'https://httpbin.org/html';
  static API_BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

  // API settings
  static API_TIMEOUT = parseInt(process.env.API_TIMEOUT || 10000, 10);

  // Logging
  static LOG_LEVEL = process.env.LOG_LEVEL || 'INFO';

  // Screenshot settings
  static SCREENSHOT_ON_FAILURE = process.env.SCREENSHOT_ON_FAILURE !== 'false';
  static SCREENSHOTS_DIR = process.env.SCREENSHOTS_DIR || 'test-results/screenshots';

  /**
   * Get browser launch options
   */
  static getBrowserLaunchOptions() {
    const options = {
      headless: this.HEADLESS,
      slowMo: this.SLOW_MO,
    };

    // Add flags for headless environments (e.g., GitHub Actions)
    if (this.HEADLESS) {
      options.args = ['--disable-gpu', '--no-sandbox'];
    }

    return options;
  }

  /**
   * Get browser context options
   */
  static getContextOptions() {
    return {
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
    };
  }
}

export default Config;


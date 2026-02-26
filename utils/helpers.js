/**
 * Helper functions for test automation
 */

class Helpers {
  /**
   * Sleep for specified milliseconds
   */
  static async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry a function with exponential backoff
   */
  static async retry(fn, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }
        await this.sleep(delay * attempt);
      }
    }
  }

  /**
   * Generate random string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(domain = 'example.com') {
    const randomString = this.generateRandomString(10);
    return `test.${randomString}@${domain}`;
  }

  /**
   * Parse response headers
   */
  static parseHeaders(headers) {
    const parsed = {};
    if (!headers) return parsed;

    Object.entries(headers).forEach(([key, value]) => {
      parsed[key.toLowerCase()] = value;
    });
    return parsed;
  }

  /**
   * Validate JSON response
   */
  static isValidJSON(data) {
    try {
      JSON.parse(JSON.stringify(data));
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Helpers;


import axios from 'axios';
import Config from '../../../config/settings.js';
import Logger from '../../../utils/logger.js';

const logger = Logger.getInstance();

/**
 * Base API client with common methods
 */
class ApiClient {
  constructor(baseUrl = null, timeout = null, headers = null) {
    this.baseUrl = baseUrl || Config.API_BASE_URL;
    this.timeout = timeout || Config.API_TIMEOUT;

    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        'User-Agent': 'Playwright-Demo/1.0',
        'Accept': 'application/json',
        ...headers,
      },
    });

    // Setup interceptors
    this.setupInterceptors();

    logger.info(`Initialized API client with base URL: ${this.baseUrl}`);
  }

  /**
   * Setup axios interceptors for logging
   */
  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        logger.info(`${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error(`Request error: ${error.message}`);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        logger.debug(`Response status: ${response.status}`);
        return response;
      },
      (error) => {
        if (error.response) {
          logger.error(`Response error: ${error.response.status} - ${error.message}`);
        } else {
          logger.error(`Request error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Build full URL from endpoint
   */
  buildUrl(endpoint) {
    if (endpoint.startsWith('http')) {
      return endpoint;
    }
    return `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;
  }

  /**
   * Make a GET request
   */
  async get(endpoint, params = null, config = {}) {
    try {
      const response = await this.client.get(endpoint, {
        params,
        ...config,
      });
      return response;
    } catch (error) {
      logger.error(`GET request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make a POST request
   */
  async post(endpoint, jsonData = null, config = {}) {
    try {
      const response = await this.client.post(endpoint, jsonData, config);
      return response;
    } catch (error) {
      logger.error(`POST request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make a PUT request
   */
  async put(endpoint, jsonData = null, config = {}) {
    try {
      const response = await this.client.put(endpoint, jsonData, config);
      return response;
    } catch (error) {
      logger.error(`PUT request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make a PATCH request
   */
  async patch(endpoint, jsonData = null, config = {}) {
    try {
      const response = await this.client.patch(endpoint, jsonData, config);
      return response;
    } catch (error) {
      logger.error(`PATCH request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Make a DELETE request
   */
  async delete(endpoint, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return response;
    } catch (error) {
      logger.error(`DELETE request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Set custom header
   */
  setHeader(key, value) {
    this.client.defaults.headers.common[key] = value;
  }

  /**
   * Remove custom header
   */
  removeHeader(key) {
    delete this.client.defaults.headers.common[key];
  }

  /**
   * Set multiple headers
   */
  setHeaders(headers) {
    Object.entries(headers).forEach(([key, value]) => {
      this.setHeader(key, value);
    });
  }
}

export default ApiClient;


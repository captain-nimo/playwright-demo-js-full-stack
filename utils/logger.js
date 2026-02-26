import Config from '../config/settings.js';

class Logger {
  static instance = null;

  constructor() {
    this.logLevel = {
      DEBUG: 0,
      INFO: 1,
      WARNING: 2,
      ERROR: 3,
    };
    this.currentLevel = this.logLevel[Config.LOG_LEVEL] || this.logLevel.INFO;
  }

  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Format log message with timestamp
   */
  formatMessage(level, message) {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    return `[${timestamp}] [${level}] ${message}`;
  }

  /**
   * Log debug message
   */
  debug(message) {
    if (this.logLevel.DEBUG >= this.currentLevel) {
      console.log(this.formatMessage('DEBUG', message));
    }
  }

  /**
   * Log info message
   */
  info(message) {
    if (this.logLevel.INFO >= this.currentLevel) {
      console.log(this.formatMessage('INFO', message));
    }
  }

  /**
   * Log warning message
   */
  warning(message) {
    if (this.logLevel.WARNING >= this.currentLevel) {
      console.warn(this.formatMessage('WARNING', message));
    }
  }

  /**
   * Log error message
   */
  error(message) {
    if (this.logLevel.ERROR >= this.currentLevel) {
      console.error(this.formatMessage('ERROR', message));
    }
  }
}

export default Logger;


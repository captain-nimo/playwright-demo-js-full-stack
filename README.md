# Playwright JavaScript Full Stack Demo

A comprehensive demonstration of **Playwright** with JavaScript, showcasing both **UI automation** and **API automation** with best practices, testing frameworks, and production-ready patterns.

## 🎯 Features

- ✅ **UI Automation**: Browser automation with Playwright (Chrome, Firefox, Safari, WebKit)
- ✅ **API Automation**: REST API testing with axios
- ✅ **Page Object Model (POM)**: Scalable and maintainable test structure
- ✅ **Playwright Test**: Modern testing framework with built-in features
- ✅ **Test Parallelization**: Run tests in parallel with configurable workers
- ✅ **HTML Reports**: Generate beautiful test reports
- ✅ **CI/CD Ready**: GitHub Actions workflow included
- ✅ **Best Practices**: Environment configuration, logging, and error handling

## 📋 Project Structure

```
.
├── tests/
│   ├── ui/                          # UI automation tests
│   │   ├── example.spec.js          # Example UI tests
│   │   └── pages/                   # Page Object Models
│   │       ├── BasePage.js          # Base page with common methods
│   │       └── HtmlPage.js          # HTML page object model
│   ├── api/                         # API automation tests
│   │   ├── example.spec.js          # Example API tests
│   │   └── clients/                 # API client classes
│   │       └── ApiClient.js         # Base API client
│   └── fixtures/
│       └── fixtures.js              # Test fixtures and setup
├── utils/
│   ├── logger.js                    # Logging utility
│   └── helpers.js                   # Common helper functions
├── config/
│   ├── settings.js                  # Configuration management
│   └── .env.example                 # Environment variables template
├── scripts/
│   └── check-env.js                 # Environment check script
├── playwright.config.js             # Playwright configuration
├── main.js                          # Quick start example
├── package.json                     # Project dependencies
├── .gitignore                       # Git ignore file
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (Node.js 20+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd playwright-demo-js-full-stack
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Configure environment variables**
```bash
cp config/.env.example config/.env
# Edit config/.env with your settings
```

## 📝 Usage

### Running All Tests
```bash
npm test
```

### Running UI Tests Only
```bash
npm run test:ui
```

### Running API Tests Only
```bash
npm run test:api
```

### Running Smoke Tests
```bash
npm run test:smoke
```

### Running Tests in Parallel
```bash
npm run test:parallel
```

### Running Tests in Debug Mode
```bash
npm run test:debug
```

### Generating and Viewing HTML Report
```bash
npm test
npm run test:report
```

### Running Specific Test
```bash
npx playwright test tests/ui/example.spec.js
npx playwright test tests/api/example.spec.js
```

### Quick Demo
```bash
node main.js
```

## 🧪 Test Examples

### UI Automation Example
Tests demonstrate:
- Browser navigation
- Element interaction (click, type, select)
- Waiting for elements
- Taking screenshots
- Form submissions
- Assertion patterns

### API Automation Example
Tests demonstrate:
- GET requests
- POST requests with JSON payloads
- PUT/DELETE operations
- Response validation
- Status code assertions
- Error handling

## 🔧 Configuration

### Environment Variables
Create a `config/.env` file based on the template:
```
BASE_UI_URL=https://httpbin.org/html
API_BASE_URL=https://jsonplaceholder.typicode.com
BROWSER=chromium
HEADLESS=true
TIMEOUT=30000
SCREENSHOT_ON_FAILURE=true
API_TIMEOUT=10000
```

**Note**: The default URLs point to public test APIs:
- `httpbin.org`: For UI automation testing
- `jsonplaceholder.typicode.com`: For API testing (fake JSON API)

### Playwright Configuration
See `playwright.config.js` for detailed configuration options.

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @playwright/test | 1.50.0+ | Browser automation and testing framework |
| axios | 1.7.7+ | HTTP API testing |
| dotenv | 16.4.5+ | Environment configuration |
| eslint | 9.15.0+ | Code linting |
| prettier | 3.3.3+ | Code formatting |

## 🎓 Learning Resources

- [Playwright JavaScript Documentation](https://playwright.dev/)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [Axios Documentation](https://axios-http.com/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 🔒 Security

- Never commit `.env` files with sensitive data
- Use `config/.env.example` as a template
- Store credentials in CI/CD secrets

## 📊 CI/CD Integration

This project is ready for GitHub Actions. See `.github/workflows/` for automated test execution.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Testing! 🎭**

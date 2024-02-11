module.exports = {
    // Jest configuration options
    verbose: true,
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    "moduleNameMapper": {
      "^axios$": "axios/dist/node/axios.cjs",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    },
    "collectCoverage": true,
    "coverageReporters": ["json", "lcov", "text", "clover"],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
    // Other configuration options...
  };
  
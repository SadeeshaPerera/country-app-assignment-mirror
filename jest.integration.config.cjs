module.exports = {
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/tests/integration/**/*.test.js"], // Match integration test files
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

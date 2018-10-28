module.exports = {
  "testMatch": ["**/test/*.test.js"],
  "testEnvironment": "node",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
    "lib/*.js"
  ]
}

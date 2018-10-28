module.exports = {
  testMatch: ['**/test/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '.ts': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: ['lib/*.ts'],
}

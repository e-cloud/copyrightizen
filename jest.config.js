module.exports = {
  testMatch: ['**/{test,e2e}/*.test.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupTestFrameworkScriptFile: './test/jest.setup.ts',
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
  collectCoverageFrom: ['lib/**/*.ts'],
}

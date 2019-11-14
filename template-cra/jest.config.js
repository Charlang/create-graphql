module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.ts',
  testPathIgnorePatterns: ['/node_modules/', 'mock'],
  moduleFileExtensions: ['ts', 'tsx', 'json'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules'],
};

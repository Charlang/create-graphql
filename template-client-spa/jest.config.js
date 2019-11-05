module.exports = {
  preset: 'ts-jest',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(js|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^(?!.*\\.(js|ts|tsx|json)$)': '<rootDir>/mocks/jest.fileTransform.js',
  },
  testMatch: ['<rootDir>/src/**/tests/**/*.(tsx|ts)', '<rootDir>/src/**/?(*.)(spec|test).(tsx|ts)'],
  transformIgnorePatterns: ['node_modules/(?!(@airwallex|lodash-es)/)', 'mocks'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules'],
};

module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  rootDir: './',
  globals: {
    'ts-jest': {
      babelConfig: true,
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: [ 'json', 'lcov', 'text' ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  reporters: [ 'default', 'jest-junit' ],
  transformIgnorePatterns: [
    '/coverage/',
    '/dist/',
    '/node_modules/',
  ],
  testMatch: null,
  testRegex: 'tests/.*?\\.(spec|test)\\.(j|t)sx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
    'jsx',
  ],
}

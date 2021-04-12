module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
    moduleDirectories: ['node_modules', 'src'],
    coverageReporters: [
      'text', 'text-summary',
    ],
    collectCoverageFrom: [
      "<rootDir>/src/**/*.ts",
      '!**/tests/**',
      '!**/node_modules/**'
    ],
};

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/components/**',
    '!**/src/components/index.js',
    '!**/src/components/index.ts',
    '!**/App.{vue}',
    '!**/wrapper.js',
    '!**/node_modules/**',
    '!<rootDir>/dist/**',
    '!<rootDir>/src/plugins/**',
    '!<rootDir>/tests/unit/**'
  ],
  coverageReporters: ['lcov', 'text-summary']
}

module.exports = {
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/", "/mocks/", "/config/", "/migrations/", "/pagination/", "/utils/", "/errors/",
    "/entities/"
  ],
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  clearMocks: true,
  testTimeout: 50000, // Define um limite máximo de 50 s
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};

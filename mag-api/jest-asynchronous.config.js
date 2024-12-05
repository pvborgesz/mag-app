const config = require('./jest.config');
config.testMatch = [
  '<rootDir>/src/infra/database/postgres/typeorm/**/__tests__/*.test.ts',
  '<rootDir>/src/infra/database/postgres/typeorm/**/?(*.)+(spec|test).ts',
  '<rootDir>/src/main/routes/**/__tests__/*.test.ts',
  '<rootDir>/src/main/routes/**/?(*.)+(spec|test).ts',
],
config.collectCoverage = true,
module.exports = config;


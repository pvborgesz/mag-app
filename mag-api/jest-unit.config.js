const config = require('./jest.config');
config.testMatch = ['**/*.spec.ts'];
config.collectCoverage = true,
module.exports = config

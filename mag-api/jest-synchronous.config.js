const config = require('./jest.config');
config.testPathIgnorePatterns = ['/routes/', '/repositories/'],
config.collectCoverage = true,
module.exports = config

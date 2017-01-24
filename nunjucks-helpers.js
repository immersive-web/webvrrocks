var includeData = require('nunjucks-includeData');

module.exports = function (nunjucksEnv) {
  includeData.install(nunjucksEnv);
};

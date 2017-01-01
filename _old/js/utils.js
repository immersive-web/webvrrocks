module.exports.collapse = function (str) {
  return (str || '').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
};

module.exports.strip = function (str) {
  return (str || '').replace(/\s+/g, ' ').trim();
};

module.exports.splitByComma = function (str) {
  return (str || '').trim().replace(/\s*,\s*/g, ',').trim().split(',');
};

module.exports.splitByLine = function (str) {
  return (str || '').trim().replace(/\s*\n\s*/g, '\n').trim().split('\n');
};

const internalIp = require('internal-ip');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = (ctx) => {
  var options = {
    'plugins': {
      'posthtml-head-elements': {
        'headElements': 'public/_head_elements.json'
      },
      'posthtml-include': {
        'root': 'public'
      }
    }
  };
  if (IS_DEV) {
    // Enable LiveReload PostHTML plugin for only local development.
    options.plugins['posthtml-livereload'] = {
      'hostname': internalIp.v4(),
      'port': 3000
    };
  }
  return options;
};

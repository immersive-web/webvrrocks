var domready = require('domready');

require('./js/vendor/pjax-standalone');  // NOTE: module does not support CommonJS atm.

domready(() => {
  window.pjax.connect({container: 'main'});
});

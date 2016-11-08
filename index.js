var domready = require('domready');
require('delayed-scroll-restoration-polyfill');

require('./js/vendor/pjax-standalone');  // NOTE: module does not support CommonJS atm.

domready(() => {
  window.pjax.connect({container: 'main', returnToTop: false});
});

var domready = require('domready');
var delayedScrollRestorationPolyfill = require('./vendor/delayed-scroll-restoration-polyfill');

// TODO: Tinker.
delayedScrollRestorationPolyfill.polyfill({
  timeout: 100
});

require('./vendor/pjax-standalone');  // NOTE: module does not support CommonJS atm.

domready(() => {
  window.pjax.connect({container: 'main', returnToTop: false});
});

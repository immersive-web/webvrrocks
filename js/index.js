var domready = require('domready');
// require('delayed-scroll-restoration-polyfill');

require('./vendor/pjax-standalone');  // NOTE: module does not support CommonJS atm.

domready(() => {
  window.pjax.connect({
    container: 'main',
    returnToTop: true,
    complete: function () {
      var elWithPagePath = document.querySelector('[data-current-file]');
      if (elWithPagePath) {
        var editPageLink = document.querySelector('#edit-page-link');
        if (editPageLink) {
          editPageLink.setAttribute('href', editPageLink.getAttribute('data-default-href').replace('{path}', elWithPagePath.getAttribute('data-current-file')));
        }
      }
    }
  });
});

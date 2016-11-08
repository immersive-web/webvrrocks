/* global ga */
var domready = require('domready');
// require('delayed-scroll-restoration-polyfill');

/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){  // eslint-disable-line
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),    // eslint-disable-line
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  // eslint-disable-line
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');  // eslint-disable-line
/* jshint ignore:end */

ga('create', 'UA-86987247-1', 'auto');
ga('send', 'pageview');

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

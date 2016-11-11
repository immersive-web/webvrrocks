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
  var html = document.documentElement;
  var nav = document.querySelector('#nav');
  var navToggleAnchor = nav.querySelector('#nav-toggle-anchor');

  navToggleAnchor.addEventListener('click', e => {
    e.preventDefault();
    html.setAttribute('data-nav-open', html.getAttribute('data-nav-open') === 'true' ? 'false' : 'true');
  });

  // TODO: Debounce.
  window.addEventListener('resize', () => {
// - document.querySelector('#nav-footer').offsetHeight

    if (nav.scrollHeight > nav.clientHeight) {
      nav.classList.add('elastic');
    } else {
      nav.classList.remove('elastic');
    }

  });

  // window.pjax.connect({
  //   container: 'main',
  //   returnToTop: true,
  //   excludeClass: 'nav-toggle-anchor',
  //   complete: () => {
  //     var elWithPagePath = document.querySelector('[data-current-file]');
  //     if (elWithPagePath) {
  //       var editPageLink = document.querySelector('#edit-page-link');
  //       if (editPageLink) {
  //         editPageLink.setAttribute('href', editPageLink.getAttribute('data-default-href').replace('{path}', elWithPagePath.getAttribute('data-current-file')));
  //       }
  //     }
  //   },
  //   success: () => {
  //     html.setAttribute('data-nav-open', false);
  //   },
  //   error: event => {
  //     console.error(event);
  //     console.log('Fallback to synchronous page load', event.data.url);
  //     window.location.href = event.data.url;
  //   }
  // });
});

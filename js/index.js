/* global ga */
var domready = require('domready');

/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){  // eslint-disable-line
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),    // eslint-disable-line
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  // eslint-disable-line
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');  // eslint-disable-line
/* jshint ignore:end */

ga('create', 'UA-86987247-1', 'auto');
ga('send', 'pageview');

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
    if (nav.scrollHeight > nav.clientHeight) {
      nav.classList.add('elastic');
    } else {
      nav.classList.remove('elastic');
    }
  });
});

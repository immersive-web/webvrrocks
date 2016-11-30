/* global ga, URLSearchParams */
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
  var cssMain = document.head.querySelector('link[href*="/styles/index.css"]');
  var cssLoaded = cssMain ? cssMain.sheet.cssRules.length : false;
  var hash = window.location.hash;
  var html = document.documentElement;
  var navToggle = document.querySelector('#nav-toggle');
  var nav = document.querySelector('#nav');
  var navOpen = false;
  var directory = require('./directory');

  var setNav = shouldOpenNav => {
    html.setAttribute('data-nav-open', shouldOpenNav);
    navToggle.classList.toggle('is-active', shouldOpenNav);
    nav.setAttribute('aria-expanded', shouldOpenNav);
    navOpen = shouldOpenNav;
  };
  var openNav = () => setNav(true);
  var closeNav = () => setNav(false);
  var toggleNav = forceOpen => {
    var shouldOpenNav = !!(forceOpen || html.getAttribute('data-nav-open') !== 'true');
    setNav(shouldOpenNav);
  };

  nav.addEventListener('click', e => {
    var clickedEl = e.target;
    if (clickedEl.matches && clickedEl.matches('.nav-item-page a')) {
      clickedEl.classList.add('active');
      return;
    }
    if (navOpen && !clickedEl.closest('#nav')) {
      closeNav();
    }
  });

  window.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      // Exit nav when Escape key pressed.
      closeNav();
    }
  });

  var addNavToggleListener = () => {
    navToggle.addEventListener('click', e => {
      e.preventDefault();
      toggleNav();
    });
  };

  var handleNavHash = event => {
    if (!cssLoaded) {
      return;
    }
    hash = window.location.hash;
    if (hash === '#nav' || event && event.type === 'click') {
      window.history.replaceState({}, document.title,
        window.location.pathname + window.location.search);
      toggleNav(true);
    }
  };

  // When the hamburger menu in the nav is clicked,
  // remove the `#nav` hash from the URL.
  handleNavHash();
  window.addEventListener('hashchange', handleNavHash);

  if (cssLoaded) {
    addNavToggleListener();
  } else {
    cssMain.addEventListener('load', () => {
      cssLoaded = true;
      addNavToggleListener();
    });
  }

  if (window.location.pathname.indexOf('/directory') === 0) {
    directory.init();
  }
});

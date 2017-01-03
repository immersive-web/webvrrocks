(function () {
  var html = document.documentElement;
  var hash = window.location.hash.substr(1);

  var onhashchange = function () {
    hash = window.location.hash.substr(1);
    if (hash) {
      html.setAttribute('data-hash', hash);
    }
  };

  var onclick = function (e) {
    // if (e.target.matches && e.target.matches('a[href="#' + hash + '"]')) {
    //   e.preventDefault();
    //   window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    // }
  };

  onhashchange();

  window.addEventListener('hashchange', onhashchange);

  document.body.addEventListener('click', onclick);
})();

var formSerialize = require('form-serialize');
var firebase = require('firebase');

var utils = require('./utils');

var secondLoad = false;

var internal = {};

internal.config = {
  firebase: {
    apiKey: 'AIzaSyCfMvL2DsldNeLy3LMC6gFrMD_HAFOLT-M',
    authDomain: 'webvr-6345b.firebaseapp.com',
    databaseURL: 'https://webvr-6345b.firebaseio.com',
    storageBucket: 'webvr-6345b.appspot.com',
    messagingSenderId: '689640619063'
  },
  firebasePathDirectory: 'webvrrocks/webvr_scenes',
  formSelectorDirectory: '#directory-form',
  containerSelectorDirectory: '#directory-list',
};

var refreshParams = () => {
  if (!window.URLSearchParams) {
    return;
  }

  console.log('refreshParams');

  var searchParams = new window.URLSearchParams(window.location.search);

  var htmlEl = document.documentElement;
  var htmlElAttrs = htmlEl.attributes;

  for (var i = 0; i < htmlElAttrs.length; i++) {
    var attr = htmlElAttrs[i].name;

    var key = attr.replace(/^data-qs-/, '');
    console.log('key', key, 'attr', attr);

    if (attr.indexOf('data-qs-') !== 0) {
      continue;
    }

    if (!searchParams.has(key)) {
      console.log('removing attr', attr);
      htmlEl.removeAttribute(attr);
      continue;
    }

    var newValue = searchParams.get(key);
    if (htmlEl.attributes[attr] === newValue) {
      continue;
    }

    htmlEl.setAttribute(attr, newValue);
  }

  for (var key of searchParams.keys()) {
    var value = searchParams.get(key);
    htmlEl.setAttribute('data-qs-' + key, value);
  }
};

module.exports.init = function () {
  var firebaseApp;

  if (!secondLoad) {
    // Initialise Firebase.
    firebaseApp = firebase.initializeApp(internal.config.firebase);

    var form = document.querySelector(internal.config.formSelectorDirectory);

    form.addEventListener('change', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var serializedFormURLEncoded = formSerialize(form);
      var destinationUrl = window.location.pathname + (serializedFormURLEncoded ? '?' + serializedFormURLEncoded : '');
      history.pushState(null, null, destinationUrl);
      e.target.blur();
      refreshParams();
      // TODO: Use `pushState` and update `<html>`'s dataset values.
    });

    window.addEventListener('popstate', refreshParams);

    secondLoad = true;
  }

  var container = document.querySelector(internal.config.containerSelectorDirectory);

  firebaseApp.database().ref(internal.config.firebasePathDirectory).on('value', snapshot => {
    var items = snapshot.val();
    console.log('value', items);
  }, function (err) {
    console.error('Could not fetch scenes from Firebase:', err.code);
  });
};

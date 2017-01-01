var path = require('path');

var express = require('express');
// var easyLivereload = require('easy-livereload');
var yonder = require('yonder');

var app = express();

var IS_DEV = app.get('env') === 'development';
var PORT = process.env.WEBVRROCKS_PORT || process.env.PORT || 3000;

// Serve static files (very similar to how Surge and GitHub Pages do).
// See http://expressjs.com/en/starter/static-files.html for usage.
app.use(express.static('public', {
  extensions: [
    'html',
    'htm'
  ]
}));

// // Live-reloading (for rapid development).
// // See https://github.com/huanz/express-static-livereload#readme
// if (IS_DEV) {
//   app.use(easyLivereload({
//     watchDirs: [
//       path.join(__dirname, 'public')
//     ],
//     port: PORT,
//     extensions: [
//       'html',
//       'htm'
//     ]
//   }));
// }

// Create server-side redirects (defined in the `ROUTER` file).
// See https://github.com/sintaxi/yonder#readme for usage.
app.use(yonder.middleware(__dirname + '/public/ROUTER'));

// CORS headers.
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  next();
});

var listener = app.listen(PORT, function () {
  console.log('Listening on port %s', listener.address().port);
});

module.exports = app;

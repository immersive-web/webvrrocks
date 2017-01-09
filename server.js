const fs = require('fs');
const path = require('path');
const urllib = require('url');

const electricity = require('electricity');
const express = require('express');
// const Gun = require('gun');
const posthtmlrc = require('posthtml-load-config');
const internalIp = require('internal-ip');
const tinylr = require('tiny-lr');
const yonder = require('yonder');

var app = express();

const IS_DEV = app.get('env') === 'development';
const PORT_SERVER = process.env.WEBVRROCKS_PORT || process.env.PORT || 3000;
const PORT_LR = process.env.WEBVRROCKS_LR_PORT || process.env.LR_PORT || process.env.PORT || 35729;
const POSTHTML_EXT = '.html';
const PUBLIC_DIR = path.join(__dirname, IS_DEV ? 'public' : '_prod');
const ROUTER_PATH = path.join(PUBLIC_DIR, 'ROUTER');

// Live-reloading (for local development).
// See https://github.com/mklabs/tiny-lr for usage.
if (IS_DEV) {
  app.use(tinylr.middleware({app: app, dashboard: true}));
}

// var gun = Gun({});

// gun.wsp(app);

app.initServer = function () {
  // Serve static files (very similar to how Surge and GitHub Pages do).
  // See http://expressjs.com/en/starter/static-files.html for usage.
  return posthtmlrc({ext: POSTHTML_EXT}).then(({plugins, options}) => {
    var electricityOptions = {
      'hashify': false,
      'headers': {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }
    };
    if (IS_DEV) {
      electricityOptions.livereload = {
        'enabled': true,
        'listener': tinylr
      };
      electricityOptions.posthtml = {
        'enabled': true,
        'plugins': plugins,
        'options': options
      };
    }
    // NOTE: These headers disable the aggressive caching set by `electricity`
    // (since this server should never run in production anyway).
    electricityOptions.headers['Cache-Control'] = 'max-age=-1';
    electricityOptions.headers['Expires'] = '0';

    var serveStatic = electricity.static(PUBLIC_DIR, electricityOptions);
    app.use(serveStatic);

    // Create server-side redirects (defined in the `ROUTER` file).
    // See https://github.com/sintaxi/yonder#readme for usage.
    if (fs.existsSync(ROUTER_PATH)) {
      app.use(yonder.middleware(ROUTER_PATH));
    }

    app.use(function (req, res, next) {
      res.status(404);

      if (req.accepts('html')) {
        res.sendFile('404.html', {root: PUBLIC_DIR});
        return;
      }

      res.type('txt').send('Not found');
    });

    if (!module.parent) {
      let listener = app.listen(PORT_SERVER, function () {
        console.log('Listening on port http://%s:%s', internalIp.v4(), listener.address().port);
      });
    }

    return app;
  }).catch(console.error.bind(console));
};

app.initServer();

module.exports = app;

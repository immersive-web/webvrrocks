var fsExtra = require('fs-extra');
var path = require('path');
var urllib = require('url');

var budo = require('budo');
var shell = require('shelljs');
var yonder = require('yonder');

var browserify = require('browserify');
var UglifyJS = require('uglify-js');

// In dev -> run budo
// In production -> run templates and browserify+uglify
var isProduction = process.env.NODE_ENV === 'production';

var OPTS = {
  entry: 'public/media/js/main.js',
  entryRelative: 'media/js/main.js', // for the <script> tag in budo
  assets: {
    glob: {
      strict: true,
      cwd: path.resolve(__dirname, 'public'),
      include: '**/*',
      ignore: '**/*.html',
      nonull: true
    },
    inputDir: path.resolve(__dirname, 'public'),
    outputDir: path.resolve(__dirname, '_prod')
  },
  nunjucks: {
    glob: {
      include: '**/*.html'
    },
    extensionsFile: path.resolve(__dirname, 'nunjucks-helpers.js'),
    inputDir: path.resolve(__dirname, 'public'),
    outputDir: path.resolve(__dirname, '_prod')
  }
};
OPTS.routerPath = path.join(OPTS.assets.inputDir, 'ROUTER');

var budoMiddleware = [
  staticMiddlewareForFilesWithoutTrailingSlashes
];

// Create server-side redirects (defined in the `ROUTER` file).
// See https://github.com/sintaxi/yonder#readme for usage.
if (fsExtra.existsSync(OPTS.routerPath)) {
  budoMiddleware.push(yonder.middleware(OPTS.routerPath));
}

// run dev script
if (isProduction) {
  // Generate nunjucks and bundle our entry file
  initialBuild(() => {
    console.log('Bundling %s...', OPTS.entry);
    browserify(OPTS.entry, {
      debug: false // no source mapping for now...
    }).bundle((err, src) => {
      if (err) throw err;
      console.log('Compressing bundle...');
      const result = UglifyJS.minify(src.toString(), { fromString: true }).code;
      // Writes to nunjucks output, not assets output !
      var outFile = path.resolve(OPTS.nunjucks.outputDir, OPTS.entryRelative);
      fsExtra.writeFile(outFile, result, err => {
        if (err) throw err;
      });
    });
  });
} else {
  initialBuild(() => startServer());
}

function startServer () {
  var app = budo(OPTS.entry, {
    serve: OPTS.entryRelative,
    port: 3000,
    dir: '_prod',
    cors: true,
    stream: process.stdout,
    verbose: true,
    middleware: budoMiddleware
  })
    .live() // we specify LiveReload *manually*, not in budo options!
    .watch([ // enable the chokidar file watcher
      'public/**/*', // only watch public for source changes
      '_prod/**/*.{html,css}' // only trigger LiveReload on HTML/CSS changes
    ])
    .on('watch', function (ev, file) {
      file = path.resolve(file);

      var isEntry = file === path.resolve(OPTS.entry);
      var isInput = [
        OPTS.assets.inputDir, OPTS.nunjucks.inputDir
      ].some(dir => {
        return file.toLowerCase().indexOf(dir.toLowerCase()) === 0;
      });

      if (isEntry) {
        // Special case for the bundle, the bundle.js is "virtual"
        // and not rendered to disk
        app.reload();
      } else if (isInput) {
        // Input file changed, decide what to re-build
        var ext = path.extname(file);
        if (!ext) return; // ignore files without extension ?
        var isHTML = /\.html?$/i.test(ext);

        var isSharedTemplate = isHTML && path.basename(file).charAt(0) === '_';
        if (isSharedTemplate || /\.json$/i.test(ext)) {
          regenerateAllNunjucksTemplates();
        } else if (isHTML) {
          var fileRelativeNunjucks = path.relative(OPTS.nunjucks.inputDir, file);
          regenerateTemplate(fileRelativeNunjucks);
        } else {
          // Just assume it's any other file type.
          var parentFolder = file.toLowerCase().indexOf(OPTS.nunjucks.inputDir.toLowerCase()) === 0
            ? OPTS.nunjucks.inputDir
            : OPTS.assets.inputDir;
          var fileRelative = path.relative(parentFolder, file);
          var fileOutput = path.join(OPTS.assets.outputDir, fileRelative);
          var fileOutputDir = path.dirname(fileOutput);
          console.log('Copying: %s', fileRelative);
          fsExtra.mkdirp(fileOutputDir, err => {
            if (err) return console.error(err);
            fsExtra.copy(file, fileOutput, err => {
              if (err) console.error(err);
              // This might be useful if you copy over a binary file,
              // SVG, image, or whatever. You could make this only
              // reload on certain file types instead...
              if (!/\.css$/i.test(ext)) app.reload();
            });
          });
        }
      } else {
        // Output file changed, trigger LiveReload
        app.reload(file);
      }
    });
}

function initialBuild (cb) {
  fsExtra.remove(OPTS.assets.outputDir, err => {
    if (err) console.error(err);
    fsExtra.remove(OPTS.nunjucks.outputDir, err => {
      if (err) console.error(err);
      fsExtra.copy(OPTS.assets.inputDir, OPTS.assets.outputDir, err => {
        if (err) console.error(err);
        // finally regenerate all templates
        regenerateAllNunjucksTemplates();
        cb(null);
      });
    });
  });
}

/**
 * Serves nice URLs (à la GitHub Pages & Surge).
 *
 * For example, `/firefox` will be served from `/firefox.html`, and
 * `/firefox/` will be served from `/firefox/index.html`,
 * preserving the URLs.
 */
function staticMiddlewareForFilesWithoutTrailingSlashes (req, res, next) {
  var parsedUrl = urllib.parse(req.url);
  var pathname = parsedUrl.pathname;
  var ext = path.extname(pathname);
  if (ext || pathname.substr(-1) === '/') {
    next();
    return;
  }
  var fileRelative = path.join(OPTS.assets.inputDir, pathname + '.html');
  fsExtra.exists(fileRelative, function (exists) {
    if (exists) {
      req.url = pathname + '.html' + (parsedUrl.search || '') + (parsedUrl.hash || '');
    }
    next();
  });
}

function regenerateAllNunjucksTemplates () {
  return shell.exec(`node ./node_modules/.bin/nunjucks "${OPTS.nunjucks.glob.include}" --path ${OPTS.nunjucks.inputDir} --unsafe --extensions ${OPTS.nunjucks.extensionsFile} --out ${OPTS.nunjucks.outputDir}`);
}

function regenerateTemplate (fileRelative) {
  return shell.exec(`node ./node_modules/.bin/nunjucks ${fileRelative} --path ${OPTS.nunjucks.inputDir} --unsafe --extensions ${OPTS.nunjucks.extensionsFile} --out ${OPTS.nunjucks.outputDir}`);
}

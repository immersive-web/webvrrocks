#!/usr/bin/env node

require('es6-promise').polyfill();

const fs = require('fs');
const path = require('path');

const nunjucks = require('nunjucks');

const context = {
  browsers: {
    'carmel': {},
    'chrome': {},
    'chrome-android': {},
    'chrome-daydream': {},
    'chromium': require('../browsers/chromium/download.json'),
    'daydream': {},
    'edge': {},
    'firefox': {},
    'samsung': {},
    'samsung-internet-browser-for-gear-vr': {},
    'servo': {}
  }
};

const TEMPLATES = {
  'ROUTER.njx': {
    outputFilename: '_prod/ROUTER',
    context: {
      browsers: context.browsers
    }
  }
};

var outputFilename;
var promsTemplatesRendered = Object.keys(TEMPLATES).map(function (basenameTemplate) {
  return new Promise(function (resolve, reject) {
    let templatePath = path.resolve(__dirname, '..', basenameTemplate);

    let templateInfo = TEMPLATES[basenameTemplate];
    templateInfo.outputPath = path.resolve(__dirname, '..', templateInfo.outputFilename);

    nunjucks.render(templatePath, templateInfo.context || {}, function (err, res) {
      if (err) {
        reject({
          templateInfo: templateInfo,
          error: err
        });
        return;
      }
      resolve({
        templateInfo: templateInfo,
        body: res
      });
    });
  });
});

Promise.all(promsTemplatesRendered).then(function (renderedTemplates) {
  let promsFilesGenerated = [];
  return renderedTemplates.map(function (renderedTemplate) {
    return new Promise(function (resolve, reject) {
      let templateInfo = renderedTemplate.templateInfo;
      let outputPath = templateInfo.outputPath;
      let wstream = fs.createWriteStream(outputPath);
      wstream.on('finish', function () {
        console.log('finish');
        resolve(outputPath);
      });
      wstream.on('error', function () {
        console.log('error');
        reject(outputPath);
      });
      if (wstream === process.stdout || wstream === process.stderr) {
        resolve(outputPath);
      }
      wstream.write(renderedTemplate.body);
    });
  });
}).then(function (filesGenerated) {
  return Promise.all(filesGenerated).then(function (files) {
    console.log('Files written:\n%s\n' + files.join('\n'));
  });
}).catch(function (err) {
  console.error('Could not render templates:\n', err);
});

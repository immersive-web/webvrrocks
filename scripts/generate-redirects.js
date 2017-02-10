#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

require('shelljs/global');

const ROUTER_PATH = path.join(__dirname, '..', 'public', 'ROUTER');
const PAGE_404_BEFORE = path.join(__dirname, '..', 'public', '404.html');
const PAGE_404_AFTER = path.join(__dirname, '..', '_prod', '404.html');

var lines = (cat(ROUTER_PATH) || '').split('\n');
var routes = {};

lines.forEach(line => {
  if (!line) {
    return;
  }
  var chunks = line.split(' ').filter(chunk => chunk);
  var statusCode = chunks[0];
  var before = chunks[1];
  var after = chunks[2];
  if (statusCode in routes) {
    routes[statusCode].push([before, after]);
  } else {
    routes[statusCode] = [[before, after]];
  }
});

if (('302' in routes) || ('301' in routes)) {
  var routesStr = JSON.stringify(routes);
  var body404 = cat(PAGE_404_BEFORE).replace('data-routes=""', `data-routes='${routesStr}'`);
  console.log('Writing 404.html…');
  fs.writeFile(PAGE_404_AFTER, body404, function (err) {
    if (err) {
      throw err;
    }
  });
}

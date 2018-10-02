const fs = require('fs');
const path = require('path');
const urllib = require('url');

const cheerio = require('cheerio');
const rp = require('request-promise');

const BROWSER_DATA_FILE = path.join(__dirname, '..', 'public', 'firefox.json');
const BROWSER_RELEASES_INDEX_URI = 'https://download-origin.cdn.mozilla.net/pub/firefox/nightly/latest-mozilla-central/';

function parseDate (dateStr) {
  let chunks = (dateStr || '').trim().split(' ');
  let date = chunks[0].replace(/-/g, ' ');
  let time = chunks[1];
  return Date.parse(date + ' ' + time);
}

function getDateInfo (date) {
  var parsedDate = parseDate(date);
  var rawDate = new Date(parsedDate);
  return {
    originalDateTimeString: date,
    datetime: parsedDate,
    datetimeString: rawDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}),
    dateString: rawDate.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'}),
    timeString: rawDate.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}),
    isoString: rawDate.toISOString()
  };
}

function getFileSize (fileSizeStr) {
  var newFileSizeStr = (fileSizeStr || '').trim()
    .replace(/B$/, ' B')
    .replace(/b$/, ' bits')
    .replace(/K$/, ' kB')
    .replace(/k$/, ' Kbit')
    .replace(/M$/, ' MB')
    .replace(/m$/, ' Mbit')
    .replace(/G$/, ' GB')
    .replace(/g$/, ' Gbit')
    .replace(/T$/, ' TB')
    .replace(/t$/, ' Tbit')
    .replace(/\s+/g, ' ');
  if (newFileSizeStr === String(parseInt(newFileSizeStr, 10))) {
    newFileSizeStr += ' B';
  }
  return newFileSizeStr;
}

function resolveUri (uri) {
  return urllib.resolve(BROWSER_RELEASES_INDEX_URI, uri);
}

function getFirefoxBrowserInfo ($) {
  var nameColumnIdx = 1;
  var sizeColumnIdx = 2;
  var lastModifiedColumn;
  var lastModifiedColumnIdx = 3;

  $('th').toArray().forEach(function (el, idx) {
    var cellText = $(el.children).text().trim();
    if (cellText === 'Name') {
      nameColumnIdx = idx;
    } else if (cellText === 'Size') {
      sizeColumnIdx = idx;
    } else if (cellText === 'Last Modified') {
      lastModifiedColumn = el;
      lastModifiedColumnIdx = idx;
    }
  });

  var table = $(lastModifiedColumn).closest('table');

  var buildInfoFilename = '';
  var buildInfoUrl = '';
  var dateReleasedInstaller = {};
  var dateReleasedZip = {};
  var downloadInstallerUrl = '';
  var downloadZipUrl = '';
  var fileSizeInstaller = '';
  var fileSizeInstaller = '';
  var installerFilename = '';
  var zipFilename = '';

  table.find('tr').toArray().forEach(function (tr) {
    var td = $(tr).find('td')[nameColumnIdx];
    if (td) {
      var $td = $(td);
      var cellText = $td.text();
      var isInstallerRow = false;
      var isZipRow = false;
      if (cellText.endsWith('.win64.json')) {
        buildInfoFilename = cellText;
        buildInfoUrl = resolveUri($td.children('a').attr('href'));
      } else if (cellText.endsWith('.win64.installer.exe')) {
        isInstallerRow = true;
        installerFilename = cellText;
        downloadInstallerUrl = resolveUri($td.children('a').attr('href'));
      } else if (cellText.endsWith('.win64.zip')) {
        isZipRow = true;
        zipFilename = cellText;
        downloadZipUrl = resolveUri($td.children('a').attr('href'));
      }
    }

    td = $(tr).find('td')[sizeColumnIdx];
    if (td) {
      $td = $(td);
      cellText = $td.text();
      if (isInstallerRow) {
        fileSizeInstaller = getFileSize(cellText);
      }
      if (isZipRow) {
        fileSizeZip = getFileSize(cellText);
      }
    }

    td = $(tr).find('td')[lastModifiedColumnIdx];
    if (td) {
      $td = $(td);
      cellText = $td.text();
      if (isInstallerRow) {
        dateReleasedInstaller = getDateInfo(cellText);
      }
      if (isZipRow) {
        dateReleasedZip = getDateInfo(cellText);
      }
    }
  });

  return {
    dateReleased: dateReleasedInstaller,
    dateReleasedInstaller: dateReleasedInstaller,
    dateReleasedZip: dateReleasedZip,
    buildInfoFilename: buildInfoFilename,
    buildInfoUrl: buildInfoUrl,
    fileSize: fileSizeInstaller,
    fileSizeInstaller: fileSizeInstaller,
    fileSizeZip: fileSizeZip,
    installerFilename: installerFilename,
    zipFilename: zipFilename,
    downloadUrl: downloadInstallerUrl,
    downloadInstallerUrl: downloadInstallerUrl,
    downloadZipUrl: downloadZipUrl
  };
}

var rpOptions = function (uri) {
  return {
    uri: uri,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
};

rp(rpOptions(BROWSER_RELEASES_INDEX_URI))
  .then(function ($) {
    var browserInfo = getFirefoxBrowserInfo($);
    return rp({
      uri: browserInfo.buildInfoUrl,
      transform: function (buildInfoStr) {
        Object.assign(browserInfo, {buildInfo: JSON.parse(buildInfoStr)});
        return browserInfo;
      }
    });
  })
  .then(function (browserInfo) {
    return new Promise(function (resolve, reject) {
      fs.readFile(BROWSER_DATA_FILE, function (err, browserDataStr) {
        if (err) {
          reject(err);
          return;
        }
        var browserDataObj = JSON.parse(browserDataStr);
        if (!('releases' in browserDataObj)) {
          browserDataObj.releases = {};
        }
        if (!('latest' in browserDataObj.releases)) {
          browserDataObj.releases.latest = {};
        }
        [
          'buildInfo',
          'buildInfoFilename',
          'buildInfoUrl',
          'dateReleased',
          'dateReleasedInstaller',
          'dateReleasedZip',
          'downloadInstallerUrl',
          'downloadUrl',
          'downloadZipUrl',
          'fileSize',
          'fileSizeInstaller',
          'fileSizeZip',
          'installerFilename',
          'zipFilename'
        ].forEach(function (key) {
          browserDataObj[key] = browserInfo[key];
          browserDataObj.releases.latest[key] = browserInfo[key];
        });
        resolve(browserDataObj);
      });
    });
  })
  .then(function (browserDataObj) {
    return new Promise(function (resolve, reject) {
      var browserDataStr = JSON.stringify(browserDataObj, null, 2);
      fs.writeFile(BROWSER_DATA_FILE, browserDataStr, function (err, browserData) {
        if (err) {
          reject(err);
          return;
        }
        resolve(browserDataStr);
      });
    });
  })
  .catch(function (err) {
    console.error(err);
  });

var filesList = document.querySelector('#assetFilesList');
if (filesList) {
  var urls = [];

  try {
    urls = JSON.parse(localStorage.uploadedFiles || '[]');
  } catch (e) {
    console.warn(e);
  }

  urls.forEach(prependUrlToList);

  function createLinkItem (url) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.textContent = url;
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    li.appendChild(a);
    return li;
  }

  function prependUrlToList (url) {
    var li = createLinkItem(url);
    prependChild(filesList, li);
    return li;
  }

  function prependChild (parent, el) {
    parent.insertBefore(el, parent.firstChild);
  }

  window.addEventListener('beforeunload', persistUrls);
  uploadButton.addEventListener('click', openDialog);

  function persistUrls () {
    try {
      localStorage.uploadedFiles = JSON.stringify(urls);
    } catch (e) {
      console.warn(e);
    }
  }

  function clearUrls () {
    urls = [];
    window.location.reload();
  }

  window.persistUrls = persistUrls;
  window.clearUrls = clearUrls;

  function openDialog () {
    uploadcare.openDialog(null, {
      multiple: true
    }).done(function (file) {
      file.promise().done(function (fileInfo) {
        uploadcare.loadFileGroup(fileInfo.uuid).done(function (fileGroup) {
          // Group creation completed successfully.
          fileGroup.files().forEach(function (file) {
            file.promise().done(function (fileInfo) {
              console.log(fileInfo.cdnUrl);
              prependUrlToList(fileInfo.cdnUrl);
              urls.push(fileInfo.cdnUrl);
            });
          });
        }).fail(function (err) {
          console.error(err);
        });
      });
    });
  }
}

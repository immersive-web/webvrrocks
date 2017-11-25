const cheerio = require('cheerio');
const nunjucksIncludeData = require('nunjucks-includeData');
const marky = require('marky-markdown');
const nunjucksMarkdown = require('nunjucks-markdown');

module.exports = function (nunjucksEnv) {
  nunjucksIncludeData.install(nunjucksEnv);

  nunjucksMarkdown.register(nunjucksEnv, str => {
    let dirty = marky(str, {
      headingSvgClass: [],
      prefixHeadingIds: false,
      enableHeadingLinkIcons: false
    });

    // Remove everything before the first `<h2>` element.
    dirty = dirty.substring(dirty.indexOf('<h2'));

    const $ = cheerio.load(dirty);

    $('ol, ul').each((idx, list) => {
      const $list = $(list);
      $list.addClass('bullets-light');
    });

    $('h2 a').each((idx, a) => {
      const $a = $(a);
      const id = $a.attr('id').replace('setup-instructions', 'setup');
      const href = $a.attr('href').replace('setup-instructions', 'setup');
      $a.attr('id', id);
      $a.attr('href', href);
      const $h2 = $a.parent();
      const headingText = $h2.text();
      $a.text(headingText);
      $h2.html($a);
    });

    dirty = $('body').html()
      .replace(/<h2><a id="([^"]+)"/g, '<section id="$1" class="section" data-section="$1"><h2><a')
      .replace(/\n<section/g, '</section>\n<section')
      .replace(/<li>/g, '<li><span>')
      .replace(/<\/li>/g, '</span></li>') + '</section>\n';

    return dirty;
  });
};

const cheerio = require('cheerio');
const nunjucksIncludeData = require('nunjucks-includeData');
const marky = require('marky-markdown');
const nunjucksMarkdown = require('nunjucks-markdown');

const replaceEverythingBeforeH2Element = true;

const cleanSlug = slug => slug.replace('setup-instructions', 'setup');

module.exports = function (nunjucksEnv) {
  nunjucksIncludeData.install(nunjucksEnv);

  nunjucksMarkdown.register(nunjucksEnv, str => {
    let dirty = marky(str, {
      headingSvgClass: [],
      prefixHeadingIds: false,
      enableHeadingLinkIcons: false
    });

    // Remove everything before the first `<h2>` element.
    if (replaceEverythingBeforeH2Element) {
      dirty = dirty.substring(dirty.indexOf('<h2'));
    }

    const $ = cheerio.load(dirty);

    $('ol, ul').each((idx, list) => {
      const $list = $(list);
      $list.addClass('bullets-light');
      $list.html($list.html().replace(/<li>/gi, '<li><span>').replace(/<\/li>/gi, '</span></li>'));
    });

    let html = '';
    let sections = [];

    $('h2 > a').each((idx, a) => {
      const $a = $(a);
      const id = cleanSlug($a.attr('id'));
      const href = cleanSlug($a.attr('href'));
      $a.attr('id', id);
      $a.attr('href', href);
      const $h2 = $a.parent();
      const headingText = $h2.text();
      $a.text(headingText);
      $h2.html($a);

      if (!html) {
        const bodyHtml = $('body').html();
        html = bodyHtml.substring(0, bodyHtml.indexOf('<h2'));
      }

      let sectionHtml = `<section data-section="${id}" id="${id}" class="section">\n`;
      sectionHtml += `${$.html($h2)}\n`;
      $h2.nextUntil('h2').each((idx, sibling) => {
        const $sibling = $(sibling);
        sectionHtml += $.html($sibling) + '\n';
        $sibling.remove();
      });
      sectionHtml += '</section>\n';

      sections.push(sectionHtml);
    });

    if (sections.length) {
      html += sections.join('\n\n');
    } else {
      html = $('body').html();
    }

    return html;
  });
};

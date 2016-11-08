import domready from 'domready'

import pjax from './js/vendor/pjax-standalone'

domready(() => {
  pjax.connect({container: 'main'});
});

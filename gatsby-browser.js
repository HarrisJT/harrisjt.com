// import global typefaces
require('typeface-open-sans');
require('typeface-asul');

// Import global styles
require('normalize.css');
require('prismjs/themes/prism.css');
require('./src/css/reset.css');

// A stub function is needed because gatsby won't load this file otherwise
// (https://github.com/gatsbyjs/gatsby/issues/6759)
exports.onClientEntry = () => {};

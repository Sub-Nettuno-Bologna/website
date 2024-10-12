/* eslint-disable @typescript-eslint/no-require-imports */
const { urlFor } = require('./src/helpers/sanity-client');
const {
  myPortableTextComponents,
} = require('./src/helpers/portable-text-components');
const { toHTML } = require('@portabletext/to-html');

module.exports = (config) => {
  config.addPassthroughCopy({
    'src/js': 'js',
    'static/images': 'images',
    'static/responses': 'responses',
  });

  config.addFilter('sanityToHTML', function (value) {
    return toHTML(value, { components: myPortableTextComponents });
  });
  config.addFilter('sanityImage', function (image) {
    return urlFor(image);
  });

  config.addFilter('json', function (value) {
    return JSON.stringify(value, null, 2);
  });

  return {
    dataTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};

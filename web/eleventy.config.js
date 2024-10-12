import { toHTML } from '@portabletext/to-html';
import { urlFor } from './src/helpers/sanity-client.js';
import { myPortableTextComponents } from './src/helpers/portable-text-components.js';

export default async function (config) {
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
    dir: {
      includes: '_includes',
      input: 'src',
      output: 'public',
    },
  };
}

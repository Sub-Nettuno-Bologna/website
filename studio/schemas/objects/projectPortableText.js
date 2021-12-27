import { FaExternalLinkAlt, FaLink } from 'react-icons/fa';
export default {
  title: 'Portable Text',
  name: 'projectPortableText',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  { type: 'document' },
                  // other types you may want to link to
                ],
              },
            ],
            blockEditor: {
              icon: FaLink,
            },
          },
          {
            name: 'internalOldLink',
            type: 'object',
            title: 'Internal link to other pages',
            fields: [
              {
                title: 'Relative URL',
                name: 'href',
                type: 'string',
              },
            ],
            blockEditor: {
              icon: FaLink,
            },
          },
          {
            title: 'External link',
            name: 'link',
            type: 'object',
            blockEditor: {
              icon: FaExternalLinkAlt,
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'figure',
    },
  ],
};

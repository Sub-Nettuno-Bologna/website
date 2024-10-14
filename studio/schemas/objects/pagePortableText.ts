import { FaExternalLinkAlt, FaLink } from 'react-icons/fa';
import { defineType } from 'sanity';

export default defineType({
  name: 'pagePortableText',
  of: [
    {
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        annotations: [
          {
            blockEditor: {
              icon: FaLink,
            },
            fields: [
              {
                name: 'reference',
                title: 'Reference',
                to: [
                  { type: 'document' },
                  // other types you may want to link to
                ],
                type: 'reference',
              },
            ],
            name: 'internalLink',
            title: 'Internal link',
            type: 'object',
          },
          {
            blockEditor: {
              icon: FaLink,
            },
            fields: [
              {
                name: 'href',
                title: 'Relative URL',
                type: 'string',
              },
            ],
            name: 'internalOldLink',
            title: 'Internal link to other pages',
            type: 'object',
          },
          {
            blockEditor: {
              icon: FaExternalLinkAlt,
            },
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
              },
              {
                name: 'blank',
                title: 'Open in new tab',
                type: 'boolean',
              },
            ],
            name: 'link',
            title: 'External link',
            type: 'object',
          },
        ],
        decorators: [
          { title: 'Grassetto', value: 'strong' },
          { title: 'Enfasi', value: 'em' },
        ],
      },
      styles: [
        { title: 'Normale', value: 'normal' },
        { title: 'Titolo', value: 'h2' },
        { title: 'Titolo 2', value: 'h3' },
        { title: 'Sezione', value: 'h4' },
        { title: 'Citazione', value: 'blockquote' },
      ],
      title: 'Block',
      type: 'block',
    },
    {
      type: 'figure',
    },
  ],
  title: 'Portable Text',
  type: 'array',
});

export default {
  name: 'bioPortableText',
  of: [
    {
      lists: [],
      marks: {
        annotations: [
          {
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
              },
            ],
            name: 'link',
            title: 'URL',
            type: 'object',
          },
        ],
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
      },
      styles: [{ title: 'Normal', value: 'normal' }],
      title: 'Block',
      type: 'block',
    },
  ],
  title: 'Excerpt',
  type: 'array',
};

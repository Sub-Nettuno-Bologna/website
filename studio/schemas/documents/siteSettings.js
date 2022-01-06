export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: [
    // 'create',
    'update',
    // 'delete',
    'publish',
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Titolo',
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Sottotitolo',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Descrizione per il SEO',
    },
    {
      name: 'headerImages',
      type: 'array',
      title: 'Headers',
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
};

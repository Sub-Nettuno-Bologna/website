import { FiSettings } from 'react-icons/fi';
import { defineType } from 'sanity';

export default defineType({
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Sottotitolo',
      type: 'string',
    },
    {
      description: 'Descrizione per il SEO',
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'headerImages',
      of: [
        {
          name: 'image',
          options: {
            hotspot: true,
          },
          title: 'Image',
          type: 'image',
        },
      ],
      options: {
        layout: 'grid',
      },
      title: 'Headers',
      type: 'array',
    },
  ],
  icon: FiSettings,
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
});

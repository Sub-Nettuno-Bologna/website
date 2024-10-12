import { FiFileText } from 'react-icons/fi';

export const page = {
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      description: "Per costruire l'indirizzo della pagina",
      name: 'slug',
      options: {
        maxLength: 96,
        source: 'title',
      },
      title: 'Slug',
      type: 'slug',
    },
    {
      initialValue: false,
      name: 'hidden',
      title: 'Nascosta',
      type: 'boolean',
    },
    {
      name: 'body',
      of: [{ type: 'block' }],
      title: 'Body',
      type: 'array',
    },
  ],
  icon: FiFileText,
  name: 'pagina',
  preview: {
    prepare({ title = 'No title', slug = { current: '' } }) {
      return {
        subtitle: `/${slug.current}`,
        title,
      };
    },
    select: {
      slug: 'slug',
      title: 'title',
    },
  },
  title: 'Pagine',
  type: 'document',
};

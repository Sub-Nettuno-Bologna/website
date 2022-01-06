import { FiFileText } from 'react-icons/fi';

export default {
  name: 'pagina',
  title: 'Pagine',
  type: 'document',
  icon: FiFileText,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: "Per costruire l'indirizzo della pagina",
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'pagePortableText',
    },
    {
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: { type: 'category' },
      options: { disableNew: true },
    },
    /*    {
      name: 'related corsi',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'sampleProject' } }],
    }, */
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title = 'No title', slug = {} }) {
      return {
        title,
        subtitle: `/${slug.current}`,
      };
    },
  },
};

import { FiFileText } from 'react-icons/fi';
import { defineType } from 'sanity';

export const page = defineType({
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
      name: 'body',
      title: 'Body',
      type: 'pagePortableText',
    },
    {
      name: 'category',
      options: { disableNew: true },
      title: 'Categoria',
      to: { type: 'category' },
      type: 'reference',
    },
    {
      initialValue: true,
      name: 'sidebar',
      title: 'Mostra nella sidebar del sito',
      type: 'boolean',
    },
    /*    {
      name: 'related corsi',
      title: 'Related projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'sampleProject' } }],
    }, */
  ],
  icon: FiFileText,
  name: 'pagina',
  preview: {
    prepare({ title = 'No title', slug = {} }) {
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
});

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
      initialValue: false,
      name: 'hidden',
      title: 'Nascosta',
      type: 'boolean',
    },
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

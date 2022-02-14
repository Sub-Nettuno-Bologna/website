import { FiFileText } from 'react-icons/fi';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: FiFileText,
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Data di riferimento',
      type: 'date',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      description: "Per costruire l'indirizzo della pagina",
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Contenuto',
      validation: Rule => Rule.required(),
      type: 'pagePortableText',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({ title = 'Ancora nessun titolo', slug = {} }) {
      return {
        title,
        subtitle: `/${slug.current}`,
      };
    },
  },
};

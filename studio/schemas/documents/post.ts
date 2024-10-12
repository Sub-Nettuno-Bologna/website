import { FiFileText } from 'react-icons/fi';
import format from 'date-fns/format';
import { defineType } from 'sanity';
/**
 * Deprecated
 *
 */
export default defineType({
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Data di riferimento',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      description: "Per costruire l'indirizzo della pagina",
      name: 'slug',
      options: {
        maxLength: 96,
        source: (doc) =>
          `${format(new Date(doc.date as string), 'yyyy-MM')}-${doc.title} `,
      },
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Contenuto',
      type: 'pagePortableText',
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: FiFileText,
  name: 'post',
  preview: {
    prepare({ title = 'Ancora nessun titolo', slug = {} }) {
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
  title: 'Post',
  type: 'document',
});

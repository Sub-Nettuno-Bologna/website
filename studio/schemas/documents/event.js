import { FiSun } from 'react-icons/fi';
import format from 'date-fns/format';

export default {
  name: 'event',
  title: 'Evento',
  type: 'document',
  icon: FiSun,
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
        source: doc => `${format(new Date(doc.date), 'yyyy-MM')}-${doc.title} `,
        maxLength: 96,
      },
    },
    {
      name: 'body',
      title: 'Contenuto',
      type: 'pagePortableText',
    },
    {
      name: 'locandina',
      type: 'figure',
      title: 'Locandina',
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'locandina',
    },
    prepare({ title = 'Ancora nessun titolo', date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Data',
      name: 'dateDesc',
      by: [{ field: ' v', direction: 'desc' }],
    },
    {
      title: 'Data - più vecchi',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
};

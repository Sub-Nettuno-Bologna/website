import { FiSun } from 'react-icons/fi';
import format from 'date-fns/format';

export default {
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
      description: "Per costruire l'indirizzo della pagina",
      name: 'slug',
      options: {
        maxLength: 96,
        source: doc => `${format(new Date(doc.date), 'yyyy-MM')}-${doc.title} `,
      },
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Contenuto',
      type: 'pagePortableText',
    },
    {
      name: 'locandina',
      title: 'Locandina',
      type: 'figure',
    },
  ],
  icon: FiSun,
  name: 'event',
  orderings: [
    {
      by: [{ direction: 'desc', field: ' v' }],
      name: 'dateDesc',
      title: 'Data',
    },
    {
      by: [{ direction: 'asc', field: 'date' }],
      name: 'dateAsc',
      title: 'Data - più vecchi',
    },
  ],
  preview: {
    prepare({ title = 'Ancora nessun titolo', date, media }) {
      return {
        media,
        subtitle: date,
        title,
      };
    },
    select: {
      date: 'date',
      media: 'locandina',
      title: 'title',
    },
  },
  title: 'Evento',
  type: 'document',
};

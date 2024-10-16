import { GiScubaTanks } from 'react-icons/gi';
import { defineType } from 'sanity';

export default defineType({
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      description: "Per costruire l'indirizzo della pagina",
      name: 'slug',
      options: {
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[\s-°:]+/g, '-')
            .slice(0, 200),
        source: (doc) => {
          return `corso-${(doc.title as string).replace(/^Corso\s+/i, '')}`;
        },
      },
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'minAge',
      title: 'Età minima',
      type: 'number',
    },
    {
      name: 'minDives',
      title: 'Immersioni richieste',
      type: 'number',
    },
    {
      name: 'codice',
      title: 'Codice corso',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'requirement',
      options: { disableNew: true },
      title: 'Brevetto richiesto',
      to: { type: 'corso' },
      type: 'reference',
    },
    {
      name: 'body',
      title: 'Descrizione',
      type: 'pagePortableText',
      validation: (Rule) => Rule.required(),
    },
  ],
  icon: GiScubaTanks,
  name: 'corso',
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
  title: 'Corsi',
  type: 'document',
});

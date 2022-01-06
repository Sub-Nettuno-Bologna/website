export default {
  name: 'corso',
  title: 'Corsi',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      title: 'Slug',
      type: 'slug',
      description: "Per costruire l'indirizzo della pagina",
      name: 'slug',
      options: {
        maxLength: 96,
        slugify: input =>
          input
            .toLowerCase()
            .replace(/[\s-°:]+/g, '-')
            .slice(0, 200),
        source: 'title',
        source: doc => {
          return `corso-${doc.title.replace(/^Corso\s+/i, '')}`;
        },
      },
      validation: Rule => Rule.required(),
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
      name: 'requirement',
      title: 'Brevetto richiesto',
      type: 'reference',
      to: { type: 'corso' },
      options: { disableNew: true },
    },
    {
      name: 'body',
      title: 'Descrizione',
      type: 'pagePortableText',
      validation: Rule => Rule.required(),
    },
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

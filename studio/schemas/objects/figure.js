export default {
  name: 'figure',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Testo alternativo',
      validation: Rule => Rule.error('Devi riempirlo.').required(),
      description: "Importante per il SEO e l'accessibilità",
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
    },
  },
};

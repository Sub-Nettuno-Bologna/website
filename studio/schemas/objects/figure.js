import { defineType, defineField } from 'sanity';

export const figure = defineType({
  fields: [
    defineField({
      description: "Importante per il SEO e l'accessibilità",
      name: 'alt',
      title: 'Testo alternativo',
      type: 'string',
      validation: (Rule) => Rule.error('Devi riempirlo.').required(),
    }),
  ],
  name: 'figure',
  options: {
    hotspot: true,
  },
  preview: {
    select: {
      imageUrl: 'asset.url',
    },
  },
  title: 'Image',
  type: 'image',
});

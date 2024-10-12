import { defineType, defineField } from 'sanity';

export const figure = defineType({
  fields: [
    defineField({
      name: 'image',
      options: {
        hotspot: true,
      },
      title: 'Image',
      type: 'image',
    }),
    defineField({
      description: "Importante per il SEO e l'accessibilità",
      name: 'alt',
      title: 'Testo alternativo',
      type: 'string',
      validation: (Rule) => Rule.error('Devi riempirlo.').required(),
    }),
    defineField({
      description: "Una breve descrizione dell'immagine",
      name: 'caption',
      title: 'Didascalia',
      type: 'text',
    }),
  ],
  name: 'figure',
  preview: {
    prepare(selection) {
      const { caption, imageUrl, alt } = selection;
      return {
        imageUrl,
        title: caption || alt || 'Immagine',
      };
    },
    select: {
      alt: 'alt',
      caption: 'caption',
      imageUrl: 'image.asset.url',
    },
  },
  title: 'Image',
  type: 'object',
});

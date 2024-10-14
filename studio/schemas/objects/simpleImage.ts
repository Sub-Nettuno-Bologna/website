import { defineType } from 'sanity';

export const simpleImage = defineType({
  name: 'simpleImage',
  options: {
    hotspot: true,
  },
  title: 'Image',
  type: 'image',
});

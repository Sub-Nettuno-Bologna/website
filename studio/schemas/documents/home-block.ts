import { BlockContentIcon } from '@sanity/icons';

import { defineType } from 'sanity';
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list';

export default defineType({
  fields: [
    // Minimum required configuration
    orderRankField({ type: 'category' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'pagePortableText',
    },
  ],
  icon: BlockContentIcon,
  name: 'home-block',
  orderings: [orderRankOrdering],
  preview: {
    prepare({ title = 'No title' }) {
      return {
        title,
      };
    },
    select: {
      title: 'title',
    },
  },
  title: 'Home page block',
  type: 'document',
});

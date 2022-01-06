import { FiTag } from 'react-icons/fi';

export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  icon: FiTag,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
};

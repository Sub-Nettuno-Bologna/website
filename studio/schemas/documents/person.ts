import { FiUsers } from 'react-icons/fi';

export default {
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'brevetto',
      options: {
        layout: 'dropdown',
        list: ['M1', 'M2', 'M3', 'PAiAr'],
      },
      title: 'Brevetto',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'bioPortableText',
    },
    {
      name: 'image',
      title: 'Foto',
      type: 'figure',
    },
    {
      initialValue: true,
      name: 'active',
      title: 'Staff attivo?',
      type: 'boolean',
    },
  ],
  icon: FiUsers,
  name: 'person',
  preview: {
    select: {
      media: 'image',
      title: 'name',
    },
  },
  title: 'Person',
  type: 'document',
};

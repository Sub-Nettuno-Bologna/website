import { MdPerson } from 'react-icons/md';

export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  icon: MdPerson,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'brevetto',
      title: 'Brevetto',
      type: 'string',
      options: {
        list: ['M1', 'M2', 'M3', 'PAiAr'],
        layout: 'dropdown',
      },
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
      title: 'Staff attivo?',
      name: 'active',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

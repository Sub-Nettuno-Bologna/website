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
      name: 'gender',
      options: {
        layout: 'dropdown',
        list: ['Uomo', 'Donna', 'Non specificato'],
      },
      title: 'Genere',
      type: 'string',
    },
    {
      initialValue: true,
      name: 'active',
      title: 'Staff attivo?',
      type: 'boolean',
    },
    {
      hidden: ({ document }) => !document?.active,
      initialValue: false,
      name: 'council',
      title: 'Membro del consiglio?',
      type: 'boolean',
    },
    {
      hidden: ({ document }) => !document?.active || !document?.council,
      name: 'council_seat',
      options: {
        layout: 'dropdown',
        list: [
          'Presidente',
          'Consigliere',
          'Segretario',
          'Tesoriere',
          'Vicepresidente',
        ],
      },
      title: 'Posto nel consiglio',
      type: 'string',
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

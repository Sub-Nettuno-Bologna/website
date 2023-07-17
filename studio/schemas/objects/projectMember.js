export default {
  fields: [
    {
      name: 'person',
      title: 'Person',
      to: { type: 'person' },
      type: 'reference',
    },
    {
      name: 'roles',
      of: [{ type: 'string' }],
      options: {
        layout: 'radio',
        list: [
          { title: 'Designer', value: 'designer' },
          { title: 'Developer', value: 'developer' },
          { title: 'Editor', value: 'editor' },
          { title: 'Manager', value: 'manager' },
        ],
      },
      title: 'Roles',
      type: 'array',
    },
  ],
  name: 'projectMember',
  preview: {
    prepare(data) {
      return {
        ...data,
        subtitle: data.roles && data.roles.join('/'),
        title: data.personName,
      };
    },
    select: {
      media: 'person.image',
      personName: 'person.name',
      roles: 'roles',
    },
  },
  title: 'Project Member',
  type: 'object',
};

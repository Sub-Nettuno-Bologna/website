export default {
  widgets: [
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '61c8d4e89516345887ace730',
                  title: 'Sanity Studio',
                  name: 'subnettuno-sanity-studio',
                  apiId: 'a069426b-4078-4739-bb84-93bf7ae69ffc',
                },
                {
                  buildHookId: '61c99ccc375345182a0bcef9',
                  title: 'Sito pubblico',
                  name: 'blue-lagoon-505905',
                  url: 'https://subnettuno.it',
                  apiId: '2957c68e-a3eb-40f4-b127-32195e2837dd',
                },
              ],
            },
          },
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kajyr/subnettuno-sanity',
            category: 'Code',
          },
          {
            title: 'Frontend',
            value: 'https://subnettuno.it',
            category: 'apps',
          },
        ],
      },
    },
    {
      name: 'document-list',
      options: {
        title: 'Documenti recenti',
        order: '_createdAt desc',
        types: ['pagina', 'corso', 'post'],
      },
      layout: { width: 'medium' },
    },
    { name: 'project-users', layout: { height: 'auto' } },
  ],
};

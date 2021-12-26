export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
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
                  apiId: 'a069426b-4078-4739-bb84-93bf7ae69ffc'
                },
                {
                  buildHookId: '61c8d4e730f206216f46e6d6',
                  title: 'Portfolio Website',
                  name: 'subnettuno-sanity',
                  apiId: 'cda6dfa4-a585-41c3-9303-b43cdd277828'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/kajyr/subnettuno-sanity',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://subnettuno-sanity.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}

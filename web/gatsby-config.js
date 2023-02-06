const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development';

console.log(`Using environment config: '${activeEnv}'`);

require('dotenv').config();

const isProd = activeEnv === 'production';

module.exports = {
  plugins: [
    {
      options: {
        dataset: process.env.GATSBY_SANITY_DATASET,
        overlayDrafts: false,
        projectId: process.env.GATSBY_SANITY_PROJECT_ID,
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
      },
      resolve: 'gatsby-source-sanity',
    },
    `gatsby-plugin-root-import`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mantine`,
    {
      options: {
        name: `images`,
        path: `${__dirname}/content/media`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    {
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
      resolve: `gatsby-source-filesystem`,
    },
    `gatsby-plugin-image`,
    {
      options: {
        defaults: {
          backgroundColor: `white`,
          breakpoints: [750, 1080, 1366, 1920],
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
        },
      },
      resolve: `gatsby-plugin-sharp`,
    },
    `gatsby-transformer-sharp`,
    {
      options: {
        background_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/subnettuno-icon.png`,
        name: `Club Sub Nettuno.it`,
        short_name: `subnettuno.it`,
        start_url: `/`,
        theme_color: `#ffffff`, // This path is relative to the root of the site.
      },
      resolve: `gatsby-plugin-manifest`,
    },
    {
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
          },
          {
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
            resolve: 'gatsby-remark-images',
          },
          {
            options: {
              destinationDir: 'content/media',
            },
            resolve: 'gatsby-remark-copy-linked-files',
          },
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-catch-links`,
  ],
};

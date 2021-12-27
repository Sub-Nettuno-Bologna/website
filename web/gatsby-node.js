/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

const postTemplate = path.resolve(`src/components/pages/Post.js`);
const pageTemplate = path.resolve(`src/components/pages/Page.js`);
const sanityPageTemplate = path.resolve(`src/components/pages/SanityPage.js`);

const pagesQuery = `
query PageQuery {
  allSanityPagina {
    nodes {
      id
      slug {
        current
      }
    }
  }
}
  `;

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    const fileNode = getNode(node.parent);
    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: fileNode.sourceInstanceName,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const posts = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
              sourceInstanceName
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (posts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  posts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component:
        node.fields.sourceInstanceName === 'posts'
          ? postTemplate
          : pageTemplate,
      context: {
        id: node.id,
      },
    });
  });

  // Sanity Pages
  const pagesResults = await graphql(pagesQuery);

  const pages = pagesResults.data.allSanityPagina.nodes;

  for (const page of pages) {
    createPage({
      path: page.slug.current,
      component: sanityPageTemplate,
      context: {
        id: page.id,
        slug: page.slug.current,
      },
    });
  }
};

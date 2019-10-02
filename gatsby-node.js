/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

const postTemplate = path.resolve(`src/components/pages/Post.js`);
const pageTemplate = path.resolve(`src/components/pages/Page.js`);

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    if (node.frontmatter && node.frontmatter.headerImage) {
      node.frontmatter.headerImage = path.relative(
        path.dirname(node.fileAbsolutePath),
        path.join(__dirname, '/content/', node.frontmatter.headerImage)
      );
    }

    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const posts = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { fields: { sourceInstanceName: { ne: "istruttori" } } }
      ) {
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
};

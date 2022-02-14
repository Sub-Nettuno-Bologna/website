/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

const postTemplate = path.resolve(`src/templates/Post.js`);
const pageTemplate = path.resolve(`src/templates/Page.js`);
const corsoTemplate = path.resolve(`src/templates/Corso.js`);
const sanityPageTemplate = path.resolve(`src/templates/SanityPage.js`);

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
  allSanityCorso {
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

function mkSanityPages(list, component, createPage) {
  for (const page of list) {
    console.log(`Creating page: ${page.slug.current}`);
    createPage({
      path: page.slug.current,
      component,
      context: {
        id: page.id,
        slug: page.slug.current,
      },
    });
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const posts = await graphql(`
    {
      sanity: allSanityPost {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      markdown: allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            sourceInstanceName
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

  posts.data.markdown.nodes.forEach((node) => {
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

  posts.data.sanity.nodes.forEach((node) => {
    createPage({
      path: `/${node.slug.current}`,
      component: postTemplate,
      context: {
        id: node.id,
      },
    });
  });

  // Sanity Pages
  const sanity = await graphql(pagesQuery);
  mkSanityPages(
    sanity.data.allSanityPagina.nodes,
    sanityPageTemplate,
    createPage
  );
  mkSanityPages(sanity.data.allSanityCorso.nodes, corsoTemplate, createPage);
};

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require('gatsby-source-filesystem');

const corsoTemplate = path.resolve(`src/nodes/Corso.js`);
const sanityPageTemplate = path.resolve(`src/nodes/SanityPage.js`);

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
    const value = createFilePath({ getNode, node });
    createNodeField({
      name: `slug`,
      node,
      value,
    });

    const fileNode = getNode(node.parent);
    createNodeField({
      name: 'sourceInstanceName',
      node,
      value: fileNode.sourceInstanceName,
    });
  }
};

function mkSanityPages(list, component, createPage) {
  for (const page of list) {
    console.log(`Creating page: ${page.slug.current}`);
    createPage({
      component,
      context: {
        id: page.id,
        slug: page.slug.current,
      },
      path: page.slug.current,
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

  /*   posts.data.markdown.nodes.forEach((node) => {
    createPage({
      component: postTemplate,
      context: {
        id: node.id,
      },
      path: node.fields.slug,
    });
  });

  posts.data.sanity.nodes.forEach((node) => {
    createPage({
      component: postTemplate,
      context: {
        id: node.id,
      },
      path: `/${node.slug.current}`,
    });
  }); */

  // Sanity Pages
  const sanity = await graphql(pagesQuery);
  mkSanityPages(
    sanity.data.allSanityPagina.nodes,
    sanityPageTemplate,
    createPage
  );
  mkSanityPages(sanity.data.allSanityCorso.nodes, corsoTemplate, createPage);
};

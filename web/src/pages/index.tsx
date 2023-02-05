import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'templates/Layout';
import PostListItem from 'organisms/PostListItem';
import FocusBar from 'molecules/focus-bar';

function sanityToMd(node) {
  return {
    ...node,
    fields: {
      slug: node.slug.current,
    },
    frontmatter: {
      date: node.date,
      title: node.title,
    },
  };
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
    sanity,
  },
}) => {
  const posts = sanity.nodes
    .map(sanityToMd)
    .concat(edges.map((edge) => edge.node));
  return (
    <Layout preventLinkHome topContent={<FocusBar />}>
      <div>
        {posts.map((node) => (
          <PostListItem key={node.id} post={node} />
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      limit: 5
    ) {
      edges {
        node {
          id
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
          wordCount {
            words
          }
          html
        }
      }
    }
    sanity: allSanityPost(sort: { date: DESC }, limit: 5) {
      nodes {
        id
        title
        date
        slug {
          current
        }
        _rawBody(resolveReferences: { maxDepth: 5 })
      }
    }
  }
`;

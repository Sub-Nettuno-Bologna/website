import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'templates/Layout';
import PostListItem from 'organisms/PostListItem';
import FocusBar from 'molecules/focus-bar';

function sanityToMd(node) {
  return {
    ...node,
    frontmatter: {
      title: node.title,
      date: node.date,
    },
    fields: {
      slug: node.slug.current,
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
      sort: { order: DESC, fields: [frontmatter___date] }
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
    sanity: allSanityPost(sort: { fields: date, order: DESC }, limit: 5) {
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

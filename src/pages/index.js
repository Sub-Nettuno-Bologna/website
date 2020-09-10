import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/templates/Layout';
import PostListItem from '../components/organisms/PostListItem';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout preventLinkHome>
    <div>
      {edges.map((edge) => (
        <PostListItem key={edge.node.id} post={edge.node} />
      ))}
    </div>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
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
  }
`;

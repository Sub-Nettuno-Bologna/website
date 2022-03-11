import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'templates/Layout';
import EventoListItem from 'organisms/EventoListItem';

const EventiPage = ({ data: { sanity } }) => {
  const posts = sanity.nodes;
  return (
    <Layout showHeaderImage={false} showSidebar={false}>
      <div>
        {posts.map((node) => (
          <EventoListItem key={node.id} post={node} />
        ))}
      </div>
    </Layout>
  );
};

export default EventiPage;

export const pageQuery = graphql`
  query {
    sanity: allSanityEvent(sort: { fields: date, order: DESC }, limit: 5) {
      nodes {
        id
        title
        date
        locandina {
          asset {
            gatsbyImageData(width: 1024)
          }
        }
        slug {
          current
        }
        _rawBody(resolveReferences: { maxDepth: 5 })
      }
    }
  }
`;

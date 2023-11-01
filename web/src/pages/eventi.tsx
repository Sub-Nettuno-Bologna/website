import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'templates/Layout';
import EventoListItem from 'organisms/event';
import { Column } from 'atoms/page-elements';

const EventiPage = ({ data: { sanity } }) => {
  const posts = sanity.nodes;
  return (
    <Layout showHeaderImage={false} title="Eventi">
      <Column>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {posts.map((node) => (
            <EventoListItem key={node.id} post={node} />
          ))}
        </div>
      </Column>
    </Layout>
  );
};

export default EventiPage;

export const pageQuery = graphql`
  query {
    sanity: allSanityEvent(sort: { date: DESC }, limit: 5) {
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

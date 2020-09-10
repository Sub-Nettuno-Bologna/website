import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/templates/Layout';

import ExternalLink from '../components/atoms/ExternalLink';

const Ol = styled.ol`
  list-style: none;
  padding: 0;

  li {
    padding: 0.4em 0;
  }
`;

const DidatticaPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout title="Corsi internazionali di subacquea">
    <div>
      <p>
        I nostri corsi sub sono riconosciuti in TUTTO il mondo, svolti secondo
        la didattica{' '}
        <ExternalLink href="http://www.fipsas.it">FIPSAS</ExternalLink>
        {' - '}
        <ExternalLink href="http://www.cmas.org/">CMAS</ExternalLink>, la
        federazione subacquea italiana affiliata al CONI.
      </p>
      <Ol>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </Ol>
    </div>
  </Layout>
);

export default DidatticaPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { fields: { sourceInstanceName: { eq: "corsi" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            order
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

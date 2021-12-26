import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/templates/Layout';

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
  <Layout title="Lo Staff">
    <div>
      <Ol>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <h2>{node.frontmatter.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </li>
        ))}
      </Ol>
      <hr />
      <p>
        I nostri corsi non sarebbero comunque possibili senza l’aiuto di
        Annalisa Costa, Carlo Crocetti, Danilo Sasdelli, Enrico Scaglioni,
        Giancarlo Danielli, Mimmo Brico e Francesca Marziano, impegnati nel
        percorso formativo per diventare i futuri istruttori del Club Sub
        Nettuno.
      </p>
    </div>
  </Layout>
);

export default DidatticaPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___cert] }
      filter: { fields: { sourceInstanceName: { eq: "istruttori" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            name
          }
        }
      }
    }
  }
`;

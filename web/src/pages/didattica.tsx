import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from 'templates/Layout';

import ExternalLink from '../atoms/ExternalLink';

const DidatticaPage = ({
  data: {
    allSanityCorso: { nodes: sanityCorsi },
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
      <ol className="my-2 list-inside list-disc">
        {sanityCorsi.map((node) => (
          <li key={node.id} className="pb-2">
            <Link to={`/${node.slug.current}`}>{node.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  </Layout>
);

export default DidatticaPage;

export const pageQuery = graphql`
  query {
    allSanityCorso(sort: { title: ASC }) {
      nodes {
        id
        slug {
          current
        }
        title
      }
    }
  }
`;

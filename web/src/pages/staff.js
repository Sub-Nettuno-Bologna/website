import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import BlockContent from '@sanity/block-content-to-react';

import Layout from '../components/templates/Layout';

const Ol = styled.ol`
  list-style: none;
  padding: 0;

  li {
    padding: 0.4em 0;
  }
`;

function partition(list, condition) {
  return list.reduce(
    (result, element) => {
      result[condition(element) ? 0 : 1].push(element);
      return result;
    },
    [[], []]
  );
}

const certs = ['P1', 'P2', 'P3', 'PAiAr', 'M1', 'M2', 'M3'];

function sortByCert(p1, p2) {
  const i1 = certs.indexOf(p1.brevetto);
  const i2 = certs.indexOf(p2.brevetto);
  return i2 - i1;
}

const DidatticaPage = ({ data }) => {
  const {
    allSanityPerson: { nodes: persons },
  } = data;

  const sorted = persons.sort(sortByCert);
  const [istruttori, aiuti] = partition(
    sorted,
    (p) => certs.indexOf(p.brevetto) > 3
  );

  const aiuti_str = aiuti.map((a) => a.name).join(', ');

  return (
    <Layout title="Lo Staff">
      <div>
        <Ol>
          {istruttori.map((person) => (
            <li key={person.id}>
              <h2>{person.name}</h2>
              {person.bio && <BlockContent blocks={person.bio} />}
            </li>
          ))}
        </Ol>
        <hr />
        <p>
          I nostri corsi non sarebbero comunque possibili senza l’aiuto di{' '}
          {aiuti_str} e tutti i soci impegnati nel percorso formativo per
          diventare i futuri istruttori del Club Sub Nettuno.
        </p>
      </div>
    </Layout>
  );
};

export default DidatticaPage;

export const pageQuery = graphql`
  query {
    allSanityPerson(
      filter: { active: { eq: true } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        id
        name
        brevetto
        bio {
          _key
          _rawChildren
          list
          style
          _type
          children {
            _key
            marks
            text
            _type
          }
        }
      }
    }
  }
`;

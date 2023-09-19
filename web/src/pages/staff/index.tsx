import React, { FC, ReactNode } from 'react';
import { graphql } from 'gatsby';

import Layout from 'templates/Layout';
import PersonCard from './card';

const certs = ['P1', 'P2', 'P3', 'PAiAr', 'M1', 'M2', 'M3'] as const;
type CertType = (typeof certs)[number];

function sortByCert(p1, p2) {
  const i1 = certs.indexOf(p1.brevetto);
  const i2 = certs.indexOf(p2.brevetto);
  return i2 - i1;
}

export const pageQuery = graphql`
  fragment Fields on SanityPerson {
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

  query StaffQuery {
    council: allSanityPerson(
      filter: { active: { eq: true }, council: { eq: true } }
      sort: { name: ASC }
    ) {
      nodes {
        ...Fields
      }
    }
    staff: allSanityPerson(
      filter: {
        active: { eq: true }
        council: { ne: true }
        brevetto: { ne: "PAiAr" }
      }
      sort: { name: ASC }
    ) {
      nodes {
        ...Fields
      }
    }
    aiuti: allSanityPerson(
      filter: {
        active: { eq: true }
        council: { ne: true }
        brevetto: { eq: "PAiAr" }
      }
      sort: { name: ASC }
    ) {
      nodes {
        ...Fields
      }
    }
  }
`;

export type Person = {
  id: string;
  name: string;
  brevetto: CertType;
  council: boolean;
  bio: unknown;
};

type SanityData = {
  council: { nodes: Person[] };
  staff: { nodes: Person[] };
  aiuti: { nodes: Person[] };
};

const Grid: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

const DidatticaPage: FC<{ data: SanityData }> = ({ data }) => {
  const { council, staff, aiuti } = data;

  const staffSorted = staff.nodes.sort(sortByCert);
  const councilSorted = council.nodes.sort(sortByCert);

  const aiuti_str = aiuti.nodes.map((a) => a.name).join(', ');

  return (
    <Layout>
      <h2 className="m-4">Il consiglio</h2>
      <Grid>
        {councilSorted.map((person) => (
          <PersonCard key={person.id} data={person} />
        ))}
      </Grid>
      <h2 className="m-4">Gli istruttori</h2>
      <Grid>
        {staffSorted.map((person) => (
          <PersonCard key={person.id} data={person} />
        ))}
      </Grid>
      <p className="mx-4 my-8">
        I nostri corsi non sarebbero comunque possibili senza l’aiuto di{' '}
        {aiuti_str} e tutti i soci impegnati nel percorso formativo per
        diventare i futuri istruttori del Club Sub Nettuno.
      </p>
    </Layout>
  );
};

export default DidatticaPage;

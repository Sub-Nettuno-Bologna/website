import React, { FC } from 'react';
import { graphql } from 'gatsby';

import Layout from 'templates/Layout';
import { SimpleGrid, Text, Title } from '@mantine/core';
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

const breakpoints = [
  { cols: 3, minWidth: 'md', spacing: 'xs' },
  { cols: 2, minWidth: 'sm', spacing: 'xs' },
  { cols: 1, minWidth: 'xs', spacing: 'none' },
];

const DidatticaPage: FC<{ data: SanityData }> = ({ data }) => {
  const { council, staff, aiuti } = data;

  const staffSorted = staff.nodes.sort(sortByCert);
  const councilSorted = council.nodes.sort(sortByCert);

  const aiuti_str = aiuti.nodes.map((a) => a.name).join(', ');

  return (
    <Layout>
      <Title order={2} m="sm">
        Il consiglio
      </Title>
      <SimpleGrid breakpoints={breakpoints}>
        {councilSorted.map((person) => (
          <PersonCard key={person.id} data={person} />
        ))}
      </SimpleGrid>
      <Title order={2} m="sm">
        Lo Staff
      </Title>
      <SimpleGrid breakpoints={breakpoints}>
        {staffSorted.map((person) => (
          <PersonCard key={person.id} data={person} />
        ))}
      </SimpleGrid>
      <Text m="xl">
        I nostri corsi non sarebbero comunque possibili senza l’aiuto di{' '}
        {aiuti_str} e tutti i soci impegnati nel percorso formativo per
        diventare i futuri istruttori del Club Sub Nettuno.
      </Text>
    </Layout>
  );
};

export default DidatticaPage;

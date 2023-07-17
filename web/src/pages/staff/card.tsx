import React, { FC } from 'react';
import BlockContent from '@sanity/block-content-to-react';

import { Card, Group, Image, Text } from '@mantine/core';

import placeholderFemale from './placeholder-female.png';
import placeholderMale from './placeholder-male.png';
import { Person } from '.';

const PersonCard: FC<{ data: Person }> = ({ data }) => {
  return (
    <Card shadow="none" radius="md">
      <Card.Section>
        <Image
          src={
            ['Sonia Scanu', 'Francesca Marziano'].includes(data.name)
              ? placeholderFemale
              : placeholderMale
          }
          height={160}
          alt="Placeholder photo"
          fit="contain"
        />
      </Card.Section>

      <Group mt="md" mb="xs" position="apart">
        <Text weight={500}>{data.name}</Text>
      </Group>

      {data.bio && (
        <Text size="sm" color="dimmed">
          <BlockContent blocks={data.bio} />
        </Text>
      )}
    </Card>
  );
};

export default PersonCard;

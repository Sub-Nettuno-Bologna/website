import React, { FC } from 'react';
import { PortableText } from '@portabletext/react';

import { Card, Group, Image, Text } from '@mantine/core';

import placeholderFemale from './placeholder-female.png';
import placeholderMale from './placeholder-male.png';
import { Person } from '../../pages/staff';

const PersonCard: FC<{ data: Person }> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Card shadow="none" radius="md">
      <Card.Section>
        <Image
          src={data.gender === 'Donna' ? placeholderFemale : placeholderMale}
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
          <PortableText value={data.bio as any} />
        </Text>
      )}
    </Card>
  );
};

export default PersonCard;

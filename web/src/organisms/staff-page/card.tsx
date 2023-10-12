import React, { FC } from 'react';
import { PortableText } from '@portabletext/react';

import { Card, Group, Image, Text } from '@mantine/core';

import placeholderFemale from './placeholder-female.png';
import placeholderMale from './placeholder-male.png';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Person, WithImage } from 'pages/staff';

interface PersonWithImage extends Person, WithImage {}

const PersonCard: FC<{ data: PersonWithImage }> = ({ data }) => {
  if (!data) {
    return null;
  }
  const hasImage = !!data.image?.asset;

  return (
    <Card shadow="none" radius="md">
      <Card.Section>
        {hasImage ? (
          <GatsbyImage
            image={getImage(data.image.asset)}
            style={{ maxHeight: '400px', width: '100%' }}
            objectFit="contain"
            alt={'Foto'}
          />
        ) : (
          <div
            className="h-400 flex items-center justify-items-center"
            style={{ height: '400px' }}
          >
            <Image
              src={
                data.gender === 'Donna' ? placeholderFemale : placeholderMale
              }
              height={160}
              alt="Placeholder photo"
              fit="contain"
            />
          </div>
        )}
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

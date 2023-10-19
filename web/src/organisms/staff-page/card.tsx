import React, { FC } from 'react';
import { PortableText } from '@portabletext/react';

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
    <div>
      <div className="mb-4">
        {hasImage ? (
          <GatsbyImage
            className="h-[400px] w-full"
            image={getImage(data.image.asset)}
            objectFit="contain"
            alt={'Foto'}
          />
        ) : (
          <div className="flex h-[400px] items-center justify-items-center">
            <img
              src={
                data.gender === 'Donna' ? placeholderFemale : placeholderMale
              }
              className="h-[160px] w-full object-contain"
              alt="Placeholder photo"
            />
          </div>
        )}
      </div>

      <div className="mb-4 font-bold">{data.name}</div>

      {data.bio && (
        <div className="text-md text-gray-600">
          <PortableText value={data.bio as any} />
        </div>
      )}
    </div>
  );
};

export default PersonCard;

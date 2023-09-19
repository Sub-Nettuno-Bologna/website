import React from 'react';

import Lightbox from 'atoms/Lightbox';

import PostHeader from 'molecules/Post/Header';

import { Group } from '@mantine/core';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const EventoListItem = ({ post }) => {
  return (
    <article className="relative">
      <div>
        {!!post.locandina && (
          <Lightbox
            hook={
              <Group position="center">
                <GatsbyImage
                  image={getImage(post.locandina.asset)}
                  style={{ maxHeight: '600px', width: '100%' }}
                  objectFit="contain"
                  alt={'title'}
                />
              </Group>
            }
          >
            <GatsbyImage
              image={getImage(post.locandina.asset)}
              style={{ maxHeight: '70vh', width: '100%' }}
              objectFit="contain"
              alt={'title'}
            />
          </Lightbox>
        )}
      </div>
      <div>
        <PostHeader title={post.title} date={post.date} />
        {/*         {post._rawBody && <PortableText raw={post._rawBody} />}
         */}
      </div>
    </article>
  );
};

export default EventoListItem;

import React from 'react';
import styled from 'styled-components';

import { Article } from 'atoms/Article';
import Lightbox from 'atoms/Lightbox';

import PortableText from 'molecules/PortableText';
import PostHeader from 'molecules/Post/Header';

import { Group } from '@mantine/core';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const EventoListItem = ({ post }) => {
  console.log(post);

  return (
    <Article>
      <PostHeader title={post.title} date={post.date} />

      {post._rawBody && (
        <PortableText
          raw={post._rawBody}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset="production"
        />
      )}
      {!!post.locandina && (
        <Lightbox
          hook={
            <Group position="center">
              <GatsbyImage
                image={getImage(post.locandina.asset)}
                style={{ width: '100%', maxHeight: '600px' }}
                objectFit="contain"
                alt={'title'}
              />
            </Group>
          }
        >
          <GatsbyImage
            image={getImage(post.locandina.asset)}
            style={{ width: '100%', maxHeight: '70vh' }}
            objectFit="contain"
            alt={'title'}
          />
        </Lightbox>
      )}
    </Article>
  );
};

export default EventoListItem;

import React from 'react';
import PostHeader from '../molecules/Post/Header';
import { Body, Article } from '../atoms/Article';

import { template } from '../helpers/string';

const PostListItem = ({ post }) => (
  <Article>
    <PostHeader
      permalink={post.fields.slug}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
    />

    <Body
      dangerouslySetInnerHTML={{
        __html: template(post.html, {
          GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
        }),
      }}
    />
  </Article>
);

export default PostListItem;

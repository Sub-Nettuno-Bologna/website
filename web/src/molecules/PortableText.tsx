import React from 'react';
import { Link } from 'gatsby';

import { PortableText } from '@portabletext/react';
import { styled } from 'styled-components';
import urlBuilder from '@sanity/image-url';

const Figure = styled.figure`
  img {
    width: 50%;
  }
`;

const urlFor = (source) =>
  urlBuilder({
    dataset: 'production',
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  }).image(source);

const serializers = {
  marks: {
    internalLink: ({ value, children }) => {
      const { slug = {} } = value;
      const href = `/${slug.current}`;
      return <Link to={href}>{children}</Link>;
    },
    internalOldLink: ({ value, children }) => {
      const { href = {} } = value;
      return <Link to={href}>{children}</Link>;
    },
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: 'underline' }}
        >
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
  types: {
    figure: ({ value }) => {
      return (
        <Figure>
          <img src={urlFor(value.asset).width(780).url()} alt={value.alt} />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </Figure>
      );
    },
  },
};

export default function MyPortableText({ raw }) {
  //@ts-expect-error
  return <PortableText value={raw} components={serializers} />;
}

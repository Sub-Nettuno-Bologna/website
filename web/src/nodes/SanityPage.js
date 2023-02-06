import React from 'react';
import { graphql, Link } from 'gatsby';
import urlBuilder from '@sanity/image-url';
import styled from 'styled-components';

import Layout from 'templates/Layout';
import { Body } from 'atoms/Article';
import BlockContent from '@sanity/block-content-to-react';

const Figure = styled.figure`
  img {
    width: 100%;
  }
`;

const urlFor = (source) =>
  urlBuilder({
    dataset: 'production',
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
  }).image(source);

const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return <Link to={href}>{children}</Link>;
    },
    internalOldLink: ({ mark, children }) => {
      const { href = {} } = mark;
      return <Link to={href}>{children}</Link>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
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
  span: (props) => BlockContent.defaultSerializers.span(props),
  types: {
    block: (props) => {
      return BlockContent.defaultSerializers.types.block(props);
    },
    figure: (props) => {
      return (
        <Figure>
          <img
            src={urlFor(props.node.asset).width(780).url()}
            alt={props.node.alt}
          />
          {props.node.caption && <figcaption>{props.node.caption}</figcaption>}
        </Figure>
      );
    },
    image: (props) => BlockContent.defaultSerializers.types.image(props),
  },
  unknownType: (props) => {
    console.log('unknownType', props);
    return null;
  },
};

export default function PostPage({ data }) {
  const { sanityPagina } = data;
  const { title, _rawBody } = sanityPagina;

  return (
    <Layout title={title}>
      <Body>
        <BlockContent
          blocks={_rawBody}
          serializers={serializers}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset="production"
        />
      </Body>
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($slug: String!) {
    sanityPagina(slug: { current: { eq: $slug } }) {
      title
      _rawBody
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import { Column, PageTitle } from 'atoms/page-elements';

import Layout from 'templates/Layout';
import { Body } from 'atoms/Article';
import PortableText from 'molecules/PortableText';

export default function PostPage({ data }) {
  const { sanityPagina } = data;
  const { title, _rawBody } = sanityPagina;

  return (
    <Layout title={title}>
      <Column>
        <PageTitle>{title}</PageTitle>
        <Body>
          <PortableText raw={_rawBody} />
        </Body>
      </Column>
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

import React from 'react';
import { graphql } from 'gatsby';

import { template } from '../components/helpers/string';

import Layout from '../components//templates/Layout';
import { Body } from '../components//atoms/Article';

export default function PostPage({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout title={frontmatter.title}>
      <Body
        dangerouslySetInnerHTML={{
          __html: template(html, {
            GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
          }),
        }}
      />
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`;

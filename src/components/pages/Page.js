import React from 'react';
import { graphql } from 'gatsby';

import { template } from '../helpers/string';

import Layout from '../templates/Layout';
import { Body, Article, Header } from '../atoms/Article';
import SEO from '../seo';

export default function PostPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <Article>
        <Header>
          <h2>{frontmatter.title}</h2>
        </Header>
        <Body
          dangerouslySetInnerHTML={{
            __html: template(html, {
              GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
              GATSBY_CONTACT_EMAIL: process.env.GATSBY_CONTACT_EMAIL,
            }),
          }}
        />
      </Article>
    </Layout>
  );
}
export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`;

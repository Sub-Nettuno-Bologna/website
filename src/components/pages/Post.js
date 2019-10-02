import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../templates/Layout';
import PostHeader from '../molecules/Post/Header';
import { Body, Article } from '../atoms/Article';
import SEO from '../seo';

import { template } from '../helpers/string';

export default function PostPage({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout postHeader={frontmatter.headerImage}>
      <SEO title={frontmatter.title} />
      <Article>
        <PostHeader title={frontmatter.title} date={frontmatter.date} />
        <Body
          dangerouslySetInnerHTML={{
            __html: template(html, {
              GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
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
        permalink
        headerImage {
          childImageSharp {
            fluid(maxHeight: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/templates/Layout';
import { Body } from '../components/atoms/Article';

import { template } from '../components/helpers/string';

export default function PostPage({ data }) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout
      postHeader={frontmatter.headerImage}
      title={frontmatter.title}
      date={frontmatter.date}
    >
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
        permalink
        headerImage {
          childImageSharp {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP]
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
  }
`;

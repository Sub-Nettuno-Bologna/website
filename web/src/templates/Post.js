import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/templates/Layout';
import { Body } from '../components/atoms/Article';

import { template } from '../components/helpers/string';
import PortableText from '../components/molecules/PortableText';

export default function PostPage({ data }) {
  const { markdown, sanity } = data; // data.markdownRemark holds our post data

  const title = markdown?.frontmatter?.title || sanity?.title;
  const date = markdown?.frontmatter?.date || sanity?.date;
  const headerImage = markdown?.frontmatter?.headerImage;

  return (
    <Layout postHeader={headerImage} title={title} date={date}>
      {markdown?.html && (
        <Body
          dangerouslySetInnerHTML={{
            __html: template(markdown?.html, {
              GATSBY_GA_MAPS_KEY: process.env.GATSBY_GA_MAPS_KEY,
            }),
          }}
        />
      )}
      {sanity?._rawBody && (
        <PortableText
          raw={sanity._rawBody}
          projectId={process.env.GATSBY_SANITY_PROJECT_ID}
          dataset="production"
        />
      )}
    </Layout>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    markdown: markdownRemark(id: { eq: $id }) {
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
    sanity: sanityPost(id: { eq: $id }) {
      id
      title
      date
      slug {
        current
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }
  }
`;

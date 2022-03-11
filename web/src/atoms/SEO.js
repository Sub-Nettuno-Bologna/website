/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const seoQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
    }
  }
`;
function SEO({ description, lang, title, image, article }) {
  const { site } = useStaticQuery(seoQuery);

  const metaTitle = title || site.title;
  const metaDescription = description || site.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s`}
    >
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {metaTitle && <meta property="og:title" content={metaTitle} />}
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {metaTitle && <meta name="twitter:title" content={metaTitle} />}
      {metaDescription && (
        <meta name="twitter:description" content={metaDescription} />
      )}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
};

export default SEO;

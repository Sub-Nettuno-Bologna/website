/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, title, image, article }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaTitle = title || site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${metaTitle}`}
    >
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {metaTitle && <meta property="og:title" content={metaTitle} />}
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {site.siteMetadata.author && (
        <meta name="twitter:creator" content={site.siteMetadata.author} />
      )}
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

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.bool,
};

export default SEO;

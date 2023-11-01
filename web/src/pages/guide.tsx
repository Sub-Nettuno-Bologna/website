import { Column, PageTitle } from 'atoms/page-elements';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import Layout from 'templates/Layout';

const query = graphql`
  query {
    guides: allSanityPagina(
      sort: { title: ASC }
      filter: { sidebar: { ne: false }, category: { title: { eq: "Guide" } } }
    ) {
      nodes {
        id
        title
        slug {
          current
        }
      }
    }
  }
`;

const Guide = () => {
  const data = useStaticQuery(query);
  return (
    <Layout title="Guide">
      <Column>
        <PageTitle>Guide</PageTitle>
        <ul>
          {data.guides.nodes.map((page) => {
            return (
              <li key={page.id}>
                <Link to={`/${page.slug.current}`}>{page.title}</Link>
              </li>
            );
          })}
        </ul>
      </Column>
    </Layout>
  );
};

export default Guide;

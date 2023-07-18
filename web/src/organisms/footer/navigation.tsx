import React, { FC } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import { List, Text } from '@mantine/core';

const Navigation: FC = () => {
  const data = useStaticQuery(graphql`
    query {
      sanityPages: allSanityPagina(
        sort: { title: ASC }
        filter: {
          sidebar: { ne: false }
          category: { title: { eq: "Pagine varie del sito" } }
        }
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
  `);

  const sanityPages = data.sanityPages.nodes;

  return (
    <List listStyleType="none">
      <List.Item>
        <Text c="white" component={Link} to="/didattica">
          Attività didattica
        </Text>
      </List.Item>
      {sanityPages.map((page) => {
        return (
          <List.Item key={page.id}>
            <Text c="white" component={Link} to={`/${page.slug.current}`}>
              {page.title}
            </Text>
          </List.Item>
        );
      })}
      <List.Item>
        <Text c="white" component={Link} to="/dove-siamo">
          Dove siamo
        </Text>
      </List.Item>
      <List.Item>
        <Text c="white" component={Link} to="/guide">
          Guide
        </Text>
      </List.Item>
      <List.Item>
        <Text c="white" component={Link} to="/staff">
          Lo Staff
        </Text>
      </List.Item>
      <List.Item>
        <Text c="white" component={Link} to="/contattaci">
          Contattaci
        </Text>
      </List.Item>
    </List>
  );
};

export default Navigation;

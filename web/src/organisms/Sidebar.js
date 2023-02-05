import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { fromMedium } from 'mediaqueries';

import TreeList from 'atoms/TreeList';

const Aside = styled.aside`
  order: 1;
  margin: 1em 0;

  h2 {
    text-transform: uppercase;
  }

  ul {
    padding-left: 1.4em;
  }

  @media ${fromMedium} {
    width: 27%;
    margin: 0;
  }
`;

const AsideSection = styled.section`
  border-top: 4px solid ${(p) => p.theme.black};
  padding-top: 1.6em;

  & + & {
    margin-top: 1.6em;
  }
`;

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      pages: allMarkdownRemark(
        filter: { fields: { sourceInstanceName: { eq: "pages" } } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
      sanityPages: allSanityPagina(sort: { title: ASC }) {
        nodes {
          id
          title
          slug {
            current
          }
        }
      }
      corsi: allSanityCorso(sort: { title: ASC }) {
        nodes {
          id
          slug {
            current
          }
          title
        }
      }
    }
  `);

  const { edges } = data.pages;
  const sanityPages = data.sanityPages.nodes;
  const corsiTreeList = data.corsi.nodes;

  return (
    <Aside>
      <AsideSection>
        <ul>
          <li>
            <TreeList
              title="Attività didattica"
              list={corsiTreeList}
              itemRenderer={(node) => (
                <Link to={`/${node.slug.current}`}>{node.title}</Link>
              )}
            />
          </li>
          {edges.map(({ node }) => {
            return (
              <li key={node.id}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </li>
            );
          })}
          {sanityPages.map((page) => {
            return (
              <li key={page.id}>
                <Link to={`/${page.slug.current}`}>{page.title}</Link>
              </li>
            );
          })}
          <li>
            <Link to="/dove-siamo">Dove siamo</Link>
          </li>
          <li>
            <Link to="/staff">Lo Staff</Link>
          </li>
          <li>
            <Link to="/contattaci">Contattaci</Link>
          </li>
        </ul>
      </AsideSection>
      <AsideSection>
        <p>Seguici sui social:</p>
        <ul>
          <li>
            <a
              href="https://www.facebook.com/clubsubnettuno"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/clubsubnettuno/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </AsideSection>
    </Aside>
  );
};

export default Sidebar;

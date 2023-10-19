import React, { FC } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
    <ul>
      <li>
        <Link className="text-white" to="/didattica">
          Attività didattica
        </Link>
      </li>
      {sanityPages.map((page) => {
        return (
          <li key={page.id}>
            <Link className="text-white" to={`/${page.slug.current}`}>
              {page.title}
            </Link>
          </li>
        );
      })}
      <li>
        <Link className="text-white" to="/dove-siamo">
          Dove siamo
        </Link>
      </li>
      <li>
        <Link className="text-white" to="/guide">
          Guide
        </Link>
      </li>
      <li>
        <Link className="text-white" to="/staff">
          Lo Staff
        </Link>
      </li>
      <li>
        <Link className="text-white" to="/contattaci">
          Contattaci
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;

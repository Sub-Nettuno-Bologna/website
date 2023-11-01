import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { columnClasses } from 'atoms/grid';
import classNames from 'classnames';
import Menu from './menu';

export type Corsi = {
  id: string;
  slug: {
    current: string;
  };
  title: string;
};

type QueryData = {
  corsi: {
    nodes: Corsi[];
  };
};

const NavMenu = () => {
  const data = useStaticQuery<QueryData>(graphql`
    query {
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

  return (
    <div className="bg-blue-nettuno">
      <nav
        className={classNames(
          columnClasses,
          'inner relative flex flex-col sm:flex-row sm:space-x-2'
        )}
      >
        <Link activeClassName="active" to="/" className="nav-menu-item">
          Home
        </Link>
        <Link activeClassName="active" to="/eventi" className="nav-menu-item">
          Eventi
        </Link>
        <Menu list={data.corsi.nodes} />
        <Link
          activeClassName="active"
          to="/dove-siamo"
          className="nav-menu-item"
        >
          Dove siamo
        </Link>
        <Link activeClassName="active" to="/staff" className="nav-menu-item">
          Lo Staff
        </Link>
        <Link
          activeClassName="active"
          to="/contattaci"
          className="nav-menu-item"
        >
          Contattaci
        </Link>
      </nav>
    </div>
  );
};

export default NavMenu;

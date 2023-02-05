import React from 'react';
import styled, { css } from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { columnCss } from 'atoms/Grid';
import { fromMedium } from 'mediaqueries';
import { Menu } from '@mantine/core';

const selected = css`
  background-color: white;
  color: ${(p) => p.theme.blue};
`;

const Nav = styled.nav`
  background: ${(p) => p.theme.blue};

  button {
    text-align: left;
    appearance: none;
    border: none;
    background: ${(p) => p.theme.blue};
    font-size: 1em;
    color: white;

    &[aria-expanded='true'] {
      ${selected}
    }

    &:hover {
      ${selected}
    }
  }

  a {
    &,
    &:visited {
      color: white;
    }

    &:hover {
      ${selected}
    }

    &.active {
      ${selected}
    }
  }

  .inner {
    display: flex;
    flex-direction: column;

    a,
    button {
      padding: 10px 7px;
    }

    @media ${fromMedium} {
      ${columnCss}
      flex-direction: row;

      a,
      button {
        margin-right: 1em;
      }
    }
  }
`;

const NavMenu = () => {
  const data = useStaticQuery(graphql`
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

  console.log(data.corsi.nodes);

  return (
    <Nav>
      <div className="inner">
        <Link activeClassName="active" to="/">
          Home
        </Link>
        <Link activeClassName="active" to="/eventi">
          Eventi
        </Link>
        <Menu control={<button>Corsi</button>} size={'xl'}>
          {data.corsi.nodes.map((corso) => (
            <Menu.Item
              key={corso.id}
              component={Link}
              to={`/${corso.slug.current}`}
            >
              {corso.title}
            </Menu.Item>
          ))}
        </Menu>
        <Link activeClassName="active" to="/dove-siamo">
          Dove siamo
        </Link>
        <Link activeClassName="active" to="/staff">
          Lo Staff
        </Link>
        <Link activeClassName="active" to="/contattaci">
          Contattaci
        </Link>
      </div>
    </Nav>
  );
};

export default NavMenu;

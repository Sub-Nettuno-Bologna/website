import React from 'react';
import styled, { css } from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { columnCss } from 'atoms/grid';
import { fromMedium } from 'mediaqueries';
import { createStyles, Menu } from '@mantine/core';

const selected = css`
  background-color: white;
  color: ${(p) => p.theme.blue};
`;

const Nav = styled.nav`
  background: ${(p) => p.theme.blue};

  .inner {
    display: flex;
    flex-direction: column;

    > * {
      padding: 10px 7px;
    }

    @media ${fromMedium} {
      ${columnCss}
      flex-direction: row;

      > * {
        margin-right: 1em;
      }
    }
  }
`;

const MenuLink = styled(Link)`
  &,
  &:visited {
    color: white;
  }

  &:hover {
    ${selected}
  }

  &.active {
    font-weight: 700;
  }
`;

const MenuBtn = styled.button`
  &[data-expanded] {
    ${selected}
  }

  text-align: left;
  appearance: none;
  border: none;
  background: ${(p) => p.theme.blue};
  font-size: 1em;
  color: white;
`;

const useStyles = createStyles((theme) => ({
  item: {
    '&[data-hovered]': {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
}));

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
  const { classes } = useStyles();
  return (
    <Nav>
      <div className="inner">
        <MenuLink activeClassName="active" to="/">
          Home
        </MenuLink>
        <MenuLink activeClassName="active" to="/eventi">
          Eventi
        </MenuLink>
        <Menu classNames={classes} trigger="hover">
          <Menu.Target>
            <MenuBtn>Corsi</MenuBtn>
          </Menu.Target>
          <Menu.Dropdown>
            {data.corsi.nodes.map((corso) => (
              <Menu.Item
                key={corso.id}
                component={Link}
                to={`/${corso.slug.current}`}
              >
                {corso.title}
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <MenuLink activeClassName="active" to="/dove-siamo">
          Dove siamo
        </MenuLink>
        <MenuLink activeClassName="active" to="/staff">
          Lo Staff
        </MenuLink>
        <MenuLink activeClassName="active" to="/contattaci">
          Contattaci
        </MenuLink>
      </div>
    </Nav>
  );
};

export default NavMenu;

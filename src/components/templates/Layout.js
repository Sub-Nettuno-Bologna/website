/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';

import CookieBar from '../molecules/CookieBar';

import { columnCss } from '../atoms/Grid';

import theme from '../../theme';
import { fromMedium } from '../mediaqueries';
import './layout.css';

const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  color: ${(p) => p.theme.black};
}
h1,
h2,
h3 {
  margin: 0;
  font-weight: 700;
}

h2 {
  margin-bottom: 0.5em;
}

a {
  text-decoration: none;
 

  &, &:hover {
    color: ${(p) => p.theme.blue};
  }

}

`;

const Main = styled.main`
  ${columnCss}

  @media ${fromMedium} {
    display: flex;
  }

  .content {
    flex: 1;
    margin-right: 1em;
  }
`;

const Footer = styled.footer`
  background: ${(p) => p.theme.black};
  color: white;
  padding: 2em 0;
  margin-top: 2em;
  > div {
    ${columnCss}
  }
`;

const rand = (items) => items[Math.floor(Math.random() * items.length)];

const Layout = ({ children, preventLinkHome, postHeader }) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "site-headers" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxHeight: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.edges.map((e) => e.node);

  const headerImage = postHeader ? postHeader : rand(images);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Header preventLinkHome={preventLinkHome} image={headerImage} />

        <Main>
          <Sidebar />
          <div className="content">{children}</div>
        </Main>
        <Footer>
          <div>{new Date().getFullYear()} Club Sub Nettuno</div>
        </Footer>
        <CookieBar />
      </>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  preventLinkHome: PropTypes.bool,
  postHeader: PropTypes.object,
};

export default Layout;

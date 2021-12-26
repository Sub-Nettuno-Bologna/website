/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { getImage } from 'gatsby-plugin-image';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import Header from '../organisms/Header';
import Sidebar from '../organisms/Sidebar';
import PostHeader from '../molecules/Post/Header';
import CookieBar from '../molecules/CookieBar';
import { columnCss } from '../atoms/Grid';
import Seo from '../atoms/SEO';

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
    margin-bottom: 7em;
  }
`;

const Footer = styled.footer`
  background: ${(p) => p.theme.black};
  color: white;
  padding: 2em 0;
  margin-top: 2em;
  a {
    color: inherit;
  }
`;

const InnerFooter = styled.div`
  ${columnCss}
  text-align: center;

  @media ${fromMedium} {
    text-align: left;
  }
`;

const rand = (items) => items[Math.floor(Math.random() * items.length)];

const Layout = ({
  children,
  preventLinkHome,
  postHeader,
  title,
  date,
  isArticle,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "site-headers" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  `);

  const images = data.allFile.edges.map((e) => e.node);

  const headerImage = postHeader ? postHeader : rand(images);

  const ContentElement = isArticle ? 'article' : 'section';

  const image = postHeader ? getImage(postHeader) : null;

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Seo
          title={title}
          image={image ? image.images.fallback.src : undefined}
        />
        <Header preventLinkHome={preventLinkHome} image={headerImage} />

        <Main>
          <Sidebar />
          <ContentElement className="content">
            {title && <PostHeader title={title} date={date} />}
            {children}
          </ContentElement>
        </Main>
        <Footer>
          <InnerFooter>
            <span>{new Date().getFullYear()} Club Sub Nettuno</span>
            {' - '}
            <a
              href="https://www.facebook.com/clubsubnettuno"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            {' - '}
            <a
              href="https://www.instagram.com/clubsubnettuno/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </InnerFooter>
        </Footer>
        <CookieBar />
      </>
    </ThemeProvider>
  );
};

export default Layout;

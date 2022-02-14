/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from 'organisms/Header';
import Sidebar from 'organisms/Sidebar';
import PostHeader from 'molecules/Post/Header';
import CookieBar from 'molecules/CookieBar';
import { columnCss } from 'atoms/Grid';
import Seo from 'atoms/SEO';
import GlobalStyle from 'atoms/GlobalStyle';

import theme from 'theme';
import { fromMedium } from 'mediaqueries';
import './layout.css';
import { FacebookLink, InstagramLink } from 'atoms/Social';

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
  display: flex;
  align-items: center;

  > a {
    margin-left: 1em;
  }

  @media ${fromMedium} {
    text-align: left;
  }
`;

const Layout = ({
  children,
  preventLinkHome,
  postHeader,
  title,
  date,
  isArticle,
}) => {
  const ContentElement = isArticle ? 'article' : 'section';

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Seo title={title} />
        <Header preventLinkHome={preventLinkHome} image={postHeader} />
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
            <FacebookLink />
            <InstagramLink />
          </InnerFooter>
        </Footer>
        <CookieBar />
      </>
    </ThemeProvider>
  );
};

export default Layout;

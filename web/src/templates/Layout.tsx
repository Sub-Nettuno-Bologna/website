/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC, ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from 'organisms/Header';
import CookieBar from 'molecules/cookie-bar';
import Seo from 'atoms/seo';

import theme from 'theme';
import { fromMedium } from 'mediaqueries';
import Footer from 'organisms/footer';

const Main = styled.main`
  .content {
    flex: 1;
    margin-right: 1em;
    margin-bottom: 7em;
  }
`;

const Inner = styled.div`
  @media ${fromMedium} {
    display: flex;
  }
`;

const Layout: FC<{
  date?: string;
  isArticle?: boolean;
  postHeader?: any;
  preventLinkHome?: boolean;
  showHeaderImage?: boolean;
  title?: string;
  topContent?: ReactNode;
}> = ({
  children,
  topContent,
  isArticle,
  postHeader,
  preventLinkHome,
  showHeaderImage,
  title,
}) => {
  const ContentElement = isArticle ? 'article' : 'section';

  return (
    <ThemeProvider theme={theme}>
      <>
        <Seo title={title} />
        <Header
          image={postHeader}
          preventLinkHome={preventLinkHome}
          showHeaderImage={showHeaderImage}
        />
        <Main className="mx-auto w-4/5 max-w-6xl">
          {topContent}
          <Inner>
            <ContentElement className="content">
              {title && (
                <div className="mb-6 py-2">
                  <h2>{title}</h2>
                </div>
              )}
              {children}
            </ContentElement>
          </Inner>
        </Main>
        <Footer />
        <CookieBar />
      </>
    </ThemeProvider>
  );
};

export default Layout;

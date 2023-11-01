/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from 'react';
import Header from 'organisms/Header';
import CookieBar from 'molecules/cookie-bar';
import Seo from 'atoms/seo';

import Footer from 'organisms/footer';

const Layout: FC<{
  date?: string;
  isArticle?: boolean;
  postHeader?: any;
  preventLinkHome?: boolean;
  showHeaderImage?: boolean;
  preventMarginBottom?: boolean;
  title?: string;
}> = ({
  children,
  postHeader,
  title,
  preventLinkHome,
  showHeaderImage,
  preventMarginBottom,
}) => {
  return (
    <>
      <Seo title={title} />
      <Header
        image={postHeader}
        preventLinkHome={preventLinkHome}
        showHeaderImage={showHeaderImage}
        preventMarginBottom={preventMarginBottom}
      />
      <main className="min-h-screen md:flex">
        <div className="flex-1">{children}</div>
      </main>
      <Footer />
      <CookieBar />
    </>
  );
};

export default Layout;

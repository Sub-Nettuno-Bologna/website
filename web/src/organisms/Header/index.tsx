import React, { FC } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnClasses } from 'atoms/page-elements';
import ConditionalWrapper from 'atoms/ConditionalWrapper';
import { FacebookLink, InstagramLink } from 'atoms/Social';
import Menu from './nav';
import HeaderImage from './header-image';
import { ImageSharp, Maybe } from 'types';
import classNames from 'classnames';

const headerQuery = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings {
      title
      subtitle
    }
  }
`;

const Header: FC<{
  preventLinkHome: boolean;
  image: Maybe<ImageSharp>;
  showHeaderImage?: boolean;
  preventMarginBottom?: boolean;
}> = ({
  preventLinkHome,
  image,
  showHeaderImage = true,
  preventMarginBottom,
}) => {
  const { site } = useStaticQuery(headerQuery);

  return (
    <header className={classNames('mt-2', { 'mb-4': !preventMarginBottom })}>
      <div
        className={classNames(
          columnClasses,
          'align-center mb-2 flex flex-col space-y-4  md:flex-row md:space-x-4 md:space-y-0'
        )}
      >
        <div className="flex flex-1 justify-between space-x-4">
          <div>
            <ConditionalWrapper
              condition={!preventLinkHome}
              wrapper={(children) => <Link to="/">{children}</Link>}
            >
              <StaticImage
                src="./logo-simple.png"
                alt="Logo del Club Sub Nettuno"
                loading="eager"
                placeholder="none"
                className="md:max-w-[300px]"
              />
              <h1 className="text-center text-2xl md:text-4xl">
                {site?.title}
              </h1>
            </ConditionalWrapper>
            <p className="hidden md:block">{site?.subtitle}</p>
          </div>

          <div className=" ml-auto flex flex-col justify-around space-y-4  md:flex-row md:space-x-2 md:space-y-0">
            <a
              href="http://www.fipsas.it/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StaticImage
                className="header-static-image"
                src="./fipsaslogo.png"
                alt="FIPSAS logo"
                loading="eager"
                placeholder="none"
                width={120}
              />
            </a>
            <a
              href="http://www.cmas.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StaticImage
                className="header-static-image"
                src="./cmas.png"
                alt="CMAS logo"
                loading="eager"
                placeholder="none"
                width={120}
              />
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:flex-col md:space-x-0">
          <div className="font-sm">Seguici su</div>
          <div className="flex space-x-4">
            <FacebookLink className="text-blue-nettuno" />
            <InstagramLink className="text-blue-nettuno" />
          </div>
        </div>
      </div>
      <Menu />
      {showHeaderImage && <HeaderImage postImage={image} />}
    </header>
  );
};

export default Header;

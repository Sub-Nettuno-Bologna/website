import React, { FC } from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnClasses } from 'atoms/grid';
import ConditionalWrapper from 'atoms/ConditionalWrapper';
import { fromMedium, fromLarge } from 'mediaqueries';
import { FacebookLink, InstagramLink } from 'atoms/Social';
import theme from 'theme';
import Menu from './nav-menu';
import HeaderImage from './header-image';
import { Group, Text } from '@mantine/core';
import { ImageSharp, Maybe } from 'types';
import classNames from 'classnames';

const LogoWrapper = styled.div`
  .gatsby-image-wrapper {
    margin-left: auto;
    margin-right: auto;
  }

  h1 {
    font-size: 1.4em;
    text-align: center;
  }

  p {
    margin: 0;
    display: none;
    color: ${(p) => p.theme.grey};
  }

  a {
    &:hover {
      color: ${(p) => p.theme.blue};
    }
  }

  @media ${fromMedium} {
    h1 {
      text-align: left;
    }

    p {
      display: block;
    }
    .gatsby-image-wrapper {
      max-width: 240px;
    }
  }
  @media ${fromLarge} {
    h1 {
      font-size: 2.1em;
    }

    p {
      font-size: 1.2em;
    }
  }
`;

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
}> = ({ preventLinkHome, image, showHeaderImage = true }) => {
  const { site } = useStaticQuery(headerQuery);

  return (
    <header className="mb-4 mt-2">
      <div
        className={classNames(
          columnClasses,
          'align-center mb-2 flex flex-col justify-between sm:flex-row'
        )}
      >
        <LogoWrapper>
          <ConditionalWrapper
            condition={!preventLinkHome}
            wrapper={(children) => <Link to="/">{children}</Link>}
          >
            <StaticImage
              src="./logo-simple.png"
              alt="Logo del Club Sub Nettuno"
              loading="eager"
              placeholder="none"
            />
            <h1>{site?.title}</h1>
          </ConditionalWrapper>
          <p>{site?.subtitle}</p>
        </LogoWrapper>

        <div className="my-2 flex justify-around space-x-2">
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

        <div className="social sm:-order-1">
          <Text mb="xs" fz="md">
            Seguici su
          </Text>
          <Group spacing="xl">
            <FacebookLink color={theme.blue} />
            <InstagramLink color={theme.blue} />
          </Group>
        </div>
      </div>
      <Menu />
      {showHeaderImage && <HeaderImage postImage={image} />}
    </header>
  );
};

export default Header;

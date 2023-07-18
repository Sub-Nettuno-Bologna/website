import React, { FC } from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnCss } from 'atoms/grid';
import ConditionalWrapper from 'atoms/ConditionalWrapper';
import { fromMedium, fromLarge } from 'mediaqueries';
import { FacebookLink, InstagramLink } from 'atoms/Social';
import theme from 'theme';
import Menu from './nav-menu';
import HeaderImage from './header-image';
import { Group, Text } from '@mantine/core';
import { ImageSharp, Maybe } from 'types';

const Wrapper = styled.header`
  margin: 10px 0 20px 0;
`;

const MainHeader = styled.div`
  ${columnCss}
  margin-bottom: 10px;

  a {
    &,
    &:visited,
    &:hover {
      color: ${(p) => p.theme.black};
    }
  }

  @media ${fromMedium} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .social {
      order: -1;
    }
  }
`;

const FederationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1em 0;

  a {
    flex: 1;
    margin: 0 1em;
    text-align: center;
    display: block;
  }

  img {
    width: 100%;
  }

  @media ${fromLarge} {
    img {
      max-width: initial;
    }
  }
`;

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
    <Wrapper>
      <MainHeader>
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

        <FederationWrapper>
          <a
            href="http://www.fipsas.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
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
              src="./cmas.png"
              alt="CMAS logo"
              loading="eager"
              placeholder="none"
              width={120}
            />
          </a>
        </FederationWrapper>

        <div className="social">
          <Text mb="xs" fz="md">
            Seguici su
          </Text>
          <Group spacing="xl">
            <FacebookLink color={theme.blue} />
            <InstagramLink color={theme.blue} />
          </Group>
        </div>
      </MainHeader>
      <Menu />
      {showHeaderImage && <HeaderImage postImage={image} />}
    </Wrapper>
  );
};

export default Header;

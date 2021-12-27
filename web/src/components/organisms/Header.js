import React from 'react';
import styled from 'styled-components';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnCss } from '../atoms/Grid';
import ConditionalWrapper from '../atoms/ConditionalWrapper';
import { fromMedium, fromLarge } from '../mediaqueries';

const Wrapper = styled.header`
  margin: 2em 0;

  @media ${fromMedium} {
    margin: 6em 0;
  }

  a {
    &,
    &:visited,
    &:hover {
      color: ${(p) => p.theme.black};
    }
  }
`;

const MainHeader = styled.div`
  ${columnCss}
  @media ${fromMedium} {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    max-width: 100px;
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

const titleQuery = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      subtitle
    }
  }
`;

const Header = ({ preventLinkHome, image }) => {
  const { site } = useStaticQuery(titleQuery);

  return (
    <Wrapper>
      <MainHeader>
        <LogoWrapper>
          <ConditionalWrapper
            condition={!preventLinkHome}
            wrapper={(children) => <Link to="/">{children}</Link>}
          >
            <StaticImage
              src="../../images/logo-simple.png"
              alt="Logo del Club Sub Nettuno"
            />
            <h1>{site.title}</h1>
          </ConditionalWrapper>
          <p>{site.subtitle}</p>
        </LogoWrapper>

        <FederationWrapper>
          <a
            href="http://www.fipsas.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage src="../../images/fipsas-80.png" alt="FIPSAS logo" />
          </a>
          <a
            href="http://www.cmas.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage src="../../images/cmas-80.png" alt="CMAS logo" />
          </a>
        </FederationWrapper>
      </MainHeader>
      {!!image && (
        <GatsbyImage
          image={getImage(image)}
          style={{ maxHeight: '500px', margin: '1em 0' }}
          alt="Fotografia del club"
        />
      )}
    </Wrapper>
  );
};

Header.defaultProps = {
  title: ``,
};

export default Header;

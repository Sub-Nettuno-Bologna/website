import React from 'react';
import styled from 'styled-components';
import { StaticImage, GatsbyImage } from 'gatsby-plugin-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnCss } from '../atoms/Grid';
import ConditionalWrapper from '../atoms/ConditionalWrapper';
import { fromMedium, fromLarge } from '../mediaqueries';
import { FacebookLink, InstagramLink } from '../atoms/Social';

const Wrapper = styled.header`
  margin: 10px 0 2em 0;

  @media ${fromMedium} {
    margin: 10px 0 6em 0;
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
const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  > * {
    margin-right: 10px;
  }

  @media ${fromMedium} {
    .label {
      width: 100%;
      margin-bottom: 10px;
    }
    justify-content: flex-start;
  }
`;

const headerQuery = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings {
      title
      subtitle
      headerImages {
        asset {
          gatsbyImageData(
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
            layout: FULL_WIDTH
          )
        }
      }
    }
  }
`;

const rand = (items) => items[Math.floor(Math.random() * items.length)];

const Header = ({ preventLinkHome, image }) => {
  const { site } = useStaticQuery(headerQuery);

  const images = site.headerImages.map((e) => e.asset);

  const headerImage = image ? image.childImageSharp : rand(images);

  return (
    <Wrapper>
      <MainHeader>
        <SocialWrapper>
          <div class="label">Seguici su</div>
          <FacebookLink color="#5976C0" />
          <InstagramLink color="#5976C0" />
        </SocialWrapper>

        <LogoWrapper>
          <ConditionalWrapper
            condition={!preventLinkHome}
            wrapper={(children) => <Link to="/">{children}</Link>}
          >
            <StaticImage
              src="../../images/logo-simple.png"
              alt="Logo del Club Sub Nettuno"
              loading="eager"
              placeholder="#fff"
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
            <StaticImage
              src="../../images/fipsaslogo.png"
              alt="FIPSAS logo"
              loading="eager"
              placeholder="#fff"
              width={120}
            />
          </a>
          <a
            href="http://www.cmas.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StaticImage
              src="../../images/cmas.png"
              alt="CMAS logo"
              loading="eager"
              placeholder="#fff"
              width={120}
            />
          </a>
        </FederationWrapper>
      </MainHeader>
      <GatsbyImage
        image={headerImage.gatsbyImageData}
        style={{ maxHeight: '500px', margin: '1em 0' }}
        alt="Fotografia del club"
      />
    </Wrapper>
  );
};

Header.defaultProps = {
  title: ``,
};

export default Header;

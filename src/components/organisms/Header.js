import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnCss } from '../atoms/Grid';
import ConditionalWrapper from '../atoms/ConditionalWrapper';
import { fromMedium, fromLarge } from '../mediaqueries';
import logo from '../../images/logo-simple.png';
import fipsas from '../../images/fipsas-80.png';
import cmas from '../../images/cmas-80.png';

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
  img {
    width: 100%;
    max-width: 240px;
    display: block;
    margin-left: auto;
    margin-right: auto;

    height: auto;
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

const Header = ({ preventLinkHome, image }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          claim
        }
      }
    }
  `);

  return (
    <Wrapper>
      <MainHeader>
        <LogoWrapper>
          <ConditionalWrapper
            condition={!preventLinkHome}
            wrapper={(children) => <Link to="/">{children}</Link>}
          >
            <img src={logo} alt="Logo del Club Sub Nettuno" />
            <h1>Club Sub Nettuno</h1>
          </ConditionalWrapper>
          <p>{data.site.siteMetadata.claim}</p>
        </LogoWrapper>

        <FederationWrapper>
          <a
            href="http://www.fipsas.it/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fipsas} alt="FIPSAS logo" />
          </a>
          <a
            href="http://www.cmas.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={cmas} alt="CMAS logo" />
          </a>
        </FederationWrapper>
      </MainHeader>
      {!!image && (
        <Img
          fluid={image.childImageSharp.fluid}
          style={{ maxHeight: '500px', margin: '1em 0' }}
        />
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  preventLinkHome: PropTypes.bool,
  image: PropTypes.object,
};

Header.defaultProps = {
  title: ``,
};

export default Header;

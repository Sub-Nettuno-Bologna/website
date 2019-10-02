import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { columnCss } from '../atoms/Grid';
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
      color: ${p => p.theme.black};
    }
  }
`;

const MainHeader = styled.div`
  ${columnCss}

  .logo {
    text-align: center;

    img {
      width: 100%;
      max-width: 240px;

      height: auto;
    }
  }

  h1 {
    font-size: 1.4em;
    text-align: center;
  }

  p {
    margin: 0;
  }

  a {
    color: ${p => p.theme.black};

    &:hover {
      color: ${p => p.theme.blue};
    }
  }

  .description {
    display: none;
    color: ${p => p.theme.grey};
  }
  @media ${fromMedium} {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      text-align: left;
    }

    .description {
      display: block;
    }
  }

  @media ${fromLarge} {
    h1 {
      font-size: 2.1em;
    }

    .description {
      font-size: 1.2em;
    }
  }
`;

const FederationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1em 0;

  .federation-logo {
    flex: 1;
    margin: 0 1em;
    text-align: center;
    display: block;
  }

  img {
    max-width: 50px;
  }

  @media ${fromLarge} {
    img {
      max-width: initial;
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
        <div>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <h1>
            {preventLinkHome ? (
              data.site.siteMetadata.title
            ) : (
              <Link to="/">{data.site.siteMetadata.title}</Link>
            )}
          </h1>
          <p className="description">{data.site.siteMetadata.claim}</p>
        </div>

        <FederationWrapper className="federation">
          <a href="http://www.fipsas.it/" className="federation-logo">
            <img src={fipsas} alt="FIPSAS logo" />
          </a>
          <a href="http://www.cmas.org/" className="federation-logo">
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

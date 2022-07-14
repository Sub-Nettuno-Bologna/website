import React from 'react';
import styled from 'styled-components';
import { fromMedium } from 'mediaqueries';
import { columnCss } from 'atoms/Grid';

import { FacebookLink, InstagramLink } from 'atoms/Social';

const Wrapper = styled.footer`
  background: ${(p) => p.theme.black};
  color: white;
  padding: 2em 0;
  margin-top: 2em;
  a {
    color: inherit;
  }
`;

const Inner = styled.div`
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

const Title = styled.div`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Address = styled.address`
  font-style: normal;
`;

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <div>
          <Title>Club Sub Nettuno - {new Date().getFullYear()}</Title>
          <Address>
            Associazione Sportiva Dilettantistica
            <br />
            c/o piscina Stadio "Carmen Longo"
            <br />
            accesso da via dello Sport 9<br />
            Bologna
            <br />
            tel. <a href="tel://051 6153552">051 6153552</a>
            <br />
            C.F. 01596311207
            <br />
            P.IVA 2665601205
          </Address>
        </div>
        <FacebookLink />
        <InstagramLink />
      </Inner>
    </Wrapper>
  );
};

export default Footer;

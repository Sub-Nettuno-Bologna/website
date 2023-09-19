import React from 'react';
import styled from 'styled-components';
import { fromMedium } from 'mediaqueries';

import { Column } from 'atoms/grid';

import prove from './prove-in-piscina.jpg';
import eventi from './eventi.jpg';
import { Link } from 'gatsby';

const BoxInner = styled(Link)<{ background?: string }>`
  height: 200px;
  background: blue;
  text-align: center;
  background-image: url(${(p) => p.background});
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 15px;
  background-position: center;

  h3 {
    font-size: 1.3em;
    color: white;
  }

  @media ${fromMedium} {
    width: 280px;

    &:first-child {
      border-radius: 15px 0 0 15px;
    }

    &:last-child {
      border-radius: 0 15px 15px 0;
    }
  }
`;

const FocusBar = () => {
  return (
    <nav className="mb-16 hidden lg:block">
      <Column className="flex justify-center">
        <BoxInner to="/prove-gratuite-in-piscina" background={prove}>
          <div className="text-xl font-bold text-white">Prove gratuite</div>
        </BoxInner>
        <BoxInner to="/eventi" background={eventi}>
          <div className="text-xl font-bold text-white">Eventi</div>
        </BoxInner>
      </Column>
    </nav>
  );
};

export default FocusBar;

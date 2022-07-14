import React, { useState } from 'react';
import styled from 'styled-components';
import { fromMedium } from 'mediaqueries';

import { columnCss } from 'atoms/Grid';

import prove from './prove-in-piscina.jpg';
import eventi from './eventi.jpg';
import { Link } from 'gatsby';

const Bar = styled.div`
  margin-top: -20px;
  margin-bottom: 50px;
  .inner {
    ${columnCss}
  }
`;

const Inner = styled.div`
  @media ${fromMedium} {
    display: flex;
    justify-content: center;
  }
`;

const Box = styled(Link)<{ background?: string }>`
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
    <Bar>
      <Inner className="column">
        <Box background={prove} to="/prove-gratuite-in-piscina">
          <h3>Prove gratuite</h3>
        </Box>
        <Box to="/eventi" background={eventi}>
          <h3>Eventi</h3>
        </Box>
      </Inner>
    </Bar>
  );
};

export default FocusBar;

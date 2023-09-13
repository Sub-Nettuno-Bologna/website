import React from 'react';
import styled from 'styled-components';
import { fromMedium } from 'mediaqueries';

import { Column } from 'atoms/grid';

import prove from './prove-in-piscina.jpg';
import eventi from './eventi.jpg';
import { Link } from 'gatsby';
import { Box, MediaQuery, Title } from '@mantine/core';

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
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <Box mb="xl">
        <Column className="flex justify-center">
          <BoxInner to="/prove-gratuite-in-piscina" background={prove}>
            <Title order={3}>Prove gratuite</Title>
          </BoxInner>
          <BoxInner to="/eventi" background={eventi}>
            <Title order={3}>Eventi</Title>
          </BoxInner>
        </Column>
      </Box>
    </MediaQuery>
  );
};

export default FocusBar;

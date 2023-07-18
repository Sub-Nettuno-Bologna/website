import React from 'react';
import styled from 'styled-components';
import { Column } from 'atoms/grid';

import { FacebookLink, InstagramLink } from 'atoms/Social';
import { SimpleGrid, Title, Text, Group } from '@mantine/core';
import Navigation from './navigation';

const Wrapper = styled.footer`
  background: ${(p) => p.theme.black};
  color: white;
  padding: 2em 0;
  margin-top: 2em;
`;

const Inner = styled(Column)``;

const Address = styled.address`
  font-style: normal;
`;

const breakpoints = [
  { cols: 3, minWidth: 'md', spacing: 'xs' },
  { cols: 2, minWidth: 'sm', spacing: 'xs' },
  { cols: 1, minWidth: 'xs', spacing: 'none' },
];

const Footer = () => {
  return (
    <Wrapper>
      <Inner>
        <SimpleGrid breakpoints={breakpoints}>
          <div>
            <Title order={3} mb="md">
              Sul sito
            </Title>
            <Navigation />
          </div>
          <div>
            <Title order={3} mb="md">
              Vieni a trovarci
            </Title>
            <Address>
              <Text
                c="white"
                sx={{
                  a: {
                    color: 'inherit',
                    textDecoration: 'underline',
                  },
                }}
              >
                Associazione Sportiva Dilettantistica
                <br />
                c/o piscina Stadio "Carmen Longo"
                <br />
                accesso da via dello Sport 6<br />
                Bologna
                <br />
                tel. <a href="tel://051 6153552">051 6153552</a>
                <br />
                C.F. 01596311207
                <br />
                P.IVA 2665601205
              </Text>
            </Address>
          </div>
          <div>
            <Title order={3} mb="md">
              Seguici sui social
            </Title>
            <Group spacing="xl">
              <FacebookLink color="white" />
              <InstagramLink color="white" />
            </Group>
          </div>
        </SimpleGrid>

        <Text my="xl" fz="sm">
          &copy; Club Sub Nettuno - {new Date().getFullYear()}
        </Text>
      </Inner>
    </Wrapper>
  );
};

export default Footer;

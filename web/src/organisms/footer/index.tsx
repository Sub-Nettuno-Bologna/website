import React from 'react';
import { Column } from 'atoms/grid';

import { FacebookLink, InstagramLink } from 'atoms/Social';
import { Title, Text, Group } from '@mantine/core';
import Navigation from './navigation';

const Footer = () => {
  return (
    <footer className="mt-4 bg-stone-800 py-8 text-white">
      <Column>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <address className="not-italic">
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
            </address>
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
        </div>

        <Text my="xl" fz="sm">
          &copy; Club Sub Nettuno - {new Date().getFullYear()}
        </Text>
      </Column>
    </footer>
  );
};

export default Footer;

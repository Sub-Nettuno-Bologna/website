import React, { FC } from 'react';
import { Column } from 'atoms/grid';

import { FacebookLink, InstagramLink } from 'atoms/Social';
import Navigation from './navigation';

const Title: FC = ({ children }) => {
  return <h3 className="mb-4 text-xl">{children}</h3>;
};

const Footer = () => {
  return (
    <footer className="mt-4 bg-stone-800 py-8 text-white">
      <Column>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Title>Sul sito</Title>
            <Navigation />
          </div>
          <div>
            <Title>Vieni a trovarci</Title>
            <address className="not-italic text-white">
              Associazione Sportiva Dilettantistica
              <br />
              c/o piscina Stadio "Carmen Longo"
              <br />
              accesso da via dello Sport 6<br />
              Bologna
              <br />
              tel.{' '}
              <a href="tel://051 6153552" className="text-inherit underline">
                051 6153552
              </a>
              <br />
              C.F. 01596311207
              <br />
              P.IVA 2665601205
            </address>
          </div>
          <div>
            <Title>Seguici sui social</Title>
            <div className="flex space-x-4">
              <FacebookLink color="white" />
              <InstagramLink color="white" />
            </div>
          </div>
        </div>

        <div className="my-4 text-sm">
          &copy; Club Sub Nettuno - {new Date().getFullYear()}
        </div>
      </Column>
    </footer>
  );
};

export default Footer;

import { Column, PageTitle } from 'atoms/page-elements';
import React from 'react';
import Layout from 'templates/Layout';

import { Map } from 'molecules/map';

const DoveSiamo = () => {
  return (
    <Layout title="Dove siamo" showHeaderImage={false} preventMarginBottom>
      <Map />
      <Column>
        <PageTitle>Dove siamo</PageTitle>
        <p>
          Il club ha la sede presso la piscina Carmen Longo, all&apos;interno
          del complesso dello Stadio Comunale Dall&apos;Ara di Bologna
        </p>
        <address className="block not-italic">
          Via Costa Andrea, 174
          <br />
          40134 Bologna (BO)
        </address>
        <p>
          Per accedere alla piscina usare l&apos;ingresso pedonale che si trova
          in via dello Sport 6
        </p>
      </Column>
    </Layout>
  );
};

export default DoveSiamo;

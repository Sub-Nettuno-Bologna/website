import { Column, PageTitle } from 'atoms/page-elements';
import React from 'react';
import Layout from 'templates/Layout';

const DoveSiamo = () => (
  <Layout title="Dove siamo" showHeaderImage={false}>
    <Column>
      <PageTitle>Dove siamo</PageTitle>
      <p>
        Il club ha la sede presso la piscina Carmen Longo, all&apos;interno del
        complesso dello Stadio Comunale Dall&apos;Ara di Bologna
      </p>
      <address className="block not-italic">
        Via Costa Andrea, 174
        <br />
        40134 Bologna (BO)
      </address>
      <p>
        Per accedere alla piscina usare l&apos;ingresso pedonale che si trova in
        via dello Sport 6
      </p>
      <iframe
        title="map"
        width="100%"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?q=Via dello Sport 4 Bologna&zoom=16&key=${process.env.GATSBY_GA_MAPS_KEY}`}
        allowFullScreen
      ></iframe>
    </Column>
  </Layout>
);

export default DoveSiamo;

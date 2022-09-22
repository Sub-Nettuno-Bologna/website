import React from 'react';
import styled from 'styled-components';
import Layout from 'templates/Layout';

const Address = styled.address`
  display: block;
  margin: 1em 0;
`;

const DoveSiamo = () => (
  <Layout title="Dove siamo">
    <p>
      Il club ha la sede presso la piscina Carmen Longo, all'interno del
      complesso dello Stadio Comunale Dall'Ara di Bologna
    </p>
    <Address>
      Via Costa Andrea, 174
      <br />
      40134 Bologna (BO)
    </Address>
    <p>
      Per accedere alla piscina usare l'ingresso pedonale che si trova in via
      dello Sport 6
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
  </Layout>
);

export default DoveSiamo;

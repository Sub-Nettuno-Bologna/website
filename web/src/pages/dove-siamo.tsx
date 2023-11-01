import { Column, PageTitle } from 'atoms/page-elements';
import React, { useEffect, useRef } from 'react';
import Layout from 'templates/Layout';
import 'leaflet/dist/leaflet.css';
import markerImg from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

const marker = L.icon({
  iconUrl: markerImg,
  shadowUrl: markerShadow,
});

const DoveSiamo = () => {
  const ref = useRef<L.Map>();
  useEffect(() => {
    if (!ref.current) {
      ref.current = L.map('map', { scrollWheelZoom: false }).setView(
        [44.4921, 11.3086],
        18
      );

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(ref.current);
    }
    L.marker([44.4922, 11.3086], {
      icon: marker,
    })
      .addTo(ref.current)
      .bindPopup("Questo è l'ingresso della sede");
    L.marker([44.493, 11.3082], {
      icon: marker,
    })
      .addTo(ref.current)
      .bindPopup('Questa è la piscina Carmen Longo, dove ci alleniamo');
  }, []);

  return (
    <Layout title="Dove siamo" showHeaderImage={false} preventMarginBottom>
      <div id="map" className="mb-4 h-[600px] w-full"></div>
      <Column>
        <div></div>
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

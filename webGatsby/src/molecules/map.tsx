import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import markerImg from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

export function Map() {
  const ref = useRef<L.Map>();
  useEffect(() => {
    const marker = L.icon({
      iconUrl: markerImg,
      shadowUrl: markerShadow,
    });

    if (!ref.current) {
      ref.current = L.map('map', { scrollWheelZoom: false }).setView(
        [44.4921, 11.3086],
        17
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

  return <div id="map" className="mb-4 h-[600px] w-full"></div>;
}

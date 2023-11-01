import React from 'react';
import Layout from 'templates/Layout';
import FocusBar from 'molecules/focus-bar';
import classNames from 'classnames';
import groupPhoto from './homepage/club_banner.jpeg';
import { Column } from 'atoms/page-elements';

const PhotoHolder = ({ className }) => {
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-center rounded-lg bg-slate-400 p-4'
      )}
    >
      <div className=" ">
        <img
          className="h-full"
          src={groupPhoto}
          alt="Foto di gruppo prima di partire con un pullman"
        />
      </div>
    </div>
  );
};

const IndexPage = () => {
  return (
    <Layout preventLinkHome>
      <Column>
        <FocusBar />
        <section className="my-16 space-x-6 space-y-6 leading-7 lg:flex lg:space-y-0">
          <div className="lg:w-3/5">
            <h2>Il club</h2>
            <p className="mb-2">
              Il Club Sub Nettuno, fondato nel 1984, rappresenta un'istituzione
              di prestigio nel panorama subacqueo di Bologna e delle zone
              circostanti. Con oltre tre decenni di esperienza, il club ha
              guadagnato una solida reputazione per la sua dedizione alla
              sicurezza, alla formazione e alla promozione dell'amore per il
              mondo subacqueo. Affiliato alla FIPSAS (Federazione Italiana Pesca
              Sportiva e Attività Subacquee), il Club Sub Nettuno si distingue
              per l'adempimento rigoroso agli standard più elevati di sicurezza
              e formazione subacquea.
            </p>
            <p className="mb-2">
              La missione del Club Sub Nettuno è quella di fornire un ambiente
              accogliente e inclusivo per gli appassionati di subacquea di tutte
              le età e livelli di esperienza. Grazie a un team di istruttori
              altamente qualificati, il club offre corsi di formazione che
              coprono una vasta gamma di livelli, dal principiante all'esperto.
              Questi corsi non solo insegnano le competenze necessarie per
              esplorare il mondo subacqueo in modo sicuro, ma promuovono anche
              la conservazione e la tutela dell'ambiente marino.
            </p>
            <p className="mb-2">
              Oltre alla formazione, il Club Sub Nettuno organizza regolarmente
              immersioni ed escursioni in luoghi subacquei mozzafiato, offrendo
              ai suoi membri l'opportunità di scoprire la bellezza del mare
              Italiano e di altre destinazioni subacquee.
            </p>
          </div>
          <PhotoHolder className="lg:w-2/5" />
        </section>
        <section className="mb-16 leading-7">
          <h2>La didattica</h2>
          <p className="mb-2">
            La didattica{' '}
            <a href="https://www.fipsas.it/corsi-di-subacquea-e-apnea">
              FIPSAS
            </a>
            , in linea con gli standard internazionali della CMAS (Confédération
            Mondiale des Activités Subaquatiques), rappresenta un pilastro
            fondamentale nella formazione subacquea in Italia. La Federazione
            Italiana Pesca Sportiva e Attività Subacquee (FIPSAS) si impegna a
            garantire corsi di alta qualità, supervisionati da istruttori
            altamente qualificati e accreditati dalla CMAS.{' '}
          </p>
          <p className="mb-2">
            Questo approccio didattico offre agli studenti una solida base
            teorica e pratica, consentendo loro di acquisire competenze
            subacquee avanzate in un ambiente sicuro e controllato. La didattica
            FIPSAS-CMAS si concentra non solo sull'addestramento tecnico, ma
            anche sulla promozione dei principi di conservazione dell'ambiente
            marino e sulla responsabilità etica dei subacquei, contribuendo così
            a formare subacquei consapevoli e rispettosi del mondo subacqueo che
            li circonda.
          </p>
        </section>
      </Column>
    </Layout>
  );
};

export default IndexPage;

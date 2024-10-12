import { Column, PageTitle } from 'atoms/page-elements';
import React from 'react';

import Layout from 'templates/Layout';

const NotFoundPage = () => (
  <Layout title="Pagina non trovata">
    <Column>
      <PageTitle>Pagina non trovata</PageTitle>
      <p>Mi spiace.. qua non c'è niente</p>
    </Column>
  </Layout>
);

export default NotFoundPage;

import React from 'react';

import Layout from '../components/templates/Layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Pagina non trovata" />
    <h1>Pagina non trovata</h1>
    <p>Mi spiace.. qua non c'è niente</p>
  </Layout>
);

export default NotFoundPage;

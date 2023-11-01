import { Column, PageTitle } from 'atoms/page-elements';
import React, { FC } from 'react';
import Layout from 'templates/Layout';

const Contattaci: FC = () => (
  <Layout title="Grazie di averci scritto!">
    <Column>
      <PageTitle>Grazie di averci scritto!</PageTitle>
      <p>Ti risponderemo al piu presto.</p>
    </Column>
  </Layout>
);

export default Contattaci;

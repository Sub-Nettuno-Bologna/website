import { Text, Title } from '@mantine/core';
import React, { FC } from 'react';
import Layout from 'templates/Layout';

const Contattaci: FC = () => (
  <Layout>
    <Title order={2}>Grazie di averci scritto!</Title>
    <Text>Ti risponderemo al piu presto.</Text>
  </Layout>
);

export default Contattaci;

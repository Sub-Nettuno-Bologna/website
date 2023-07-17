import { Box, Button, TextInput, Textarea } from '@mantine/core';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import Layout from 'templates/Layout';

const Contattaci: FC = () => (
  <Layout title="Contattaci">
    <Helmet>
      <meta name="referrer" content="origin" />
    </Helmet>
    <form
      action={`https://formspree.io/f/${process.env.GATSBY_CONTACT_EMAIL}`}
      method="POST"
    >
      <input type="hidden" name="_subject" value="Nuovo messaggio" />
      <TextInput
        mt="md"
        label="Il tuo nome"
        withAsterisk
        name="name"
        id="name"
        size="md"
        required={true}
        aria-required={true}
      />
      <TextInput
        mt="md"
        label="La tua email"
        withAsterisk
        size="md"
        id="email"
        type="email"
        name="_replyto"
        aria-required={true}
        required={true}
      />

      <TextInput
        mt="md"
        label="Il tuo cellulare (dove possibile ti contatteremo su WhatsApp)"
        size="md"
        id="cell"
        type="tel"
        name="cell"
      />

      <Textarea
        mt="md"
        label="Il tuo messaggio"
        withAsterisk
        id="messaggio"
        name="messaggio"
        size="md"
      />
      <Box mt="md">
        <Button type="submit">Invia</Button>
      </Box>
      <p>
        I dati inseriti saranno utilizzati e trattati nel rispetto del
        regolamento UE2016/679.
      </p>
    </form>
  </Layout>
);

export default Contattaci;

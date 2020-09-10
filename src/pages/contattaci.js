import React from 'react';
import styled from 'styled-components';
import Layout from '../components/templates/Layout';
import SEO from '../components/seo';

const Form = styled.form`
  input[type='text'],
  input[type='password'],
  input[type='email'],
  textarea {
    margin: 0.2em 0;
    width: 100%;
    background: #f7f7f7;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
    color: $grey;
    padding: 0.625em 0.4375em;
    font-size: 1rem;

    &:focus {
      background-color: #fff;
      border-color: ${(p) => p.theme.blue};
      color: #1a1a1a;
      outline: 0;
    }
  }

  label {
    margin: 0.5em 0;
    display: block;
  }
`;

const Contattaci = () => (
  <Layout>
    <SEO title="Contattaci" />
    <h1>Contattaci</h1>
    <Form
      action={`https://formspree.io/${process.env.GATSBY_CONTACT_EMAIL}`}
      method="POST"
    >
      <input type="hidden" name="_subject" value="Nuovo messaggio" />

      <label htmlFor="name"> Il tuo nome (richiesto)</label>
      <input
        id="name"
        type="text"
        name="name"
        size="40"
        aria-required="true"
        required="true"
      />
      <label htmlFor="email">La tua email (richiesto)</label>
      <input
        id="email"
        type="email"
        name="_replyto"
        size="40"
        aria-required="true"
        required="true"
      />
      <label htmlFor="messaggio">Il tuo messaggio</label>
      <textarea id="messaggio" name="messaggio" cols="40" rows="10"></textarea>
      <div>
        <input type="submit" value="Invia" />
      </div>
      <p>
        I dati inseriti saranno utilizzati e trattati nel rispetto del
        regolamento UE2016/679.
      </p>
    </Form>
  </Layout>
);

export default Contattaci;

import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import Layout from 'templates/Layout';

const TextInput: FC<{
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
}> = ({ id, placeholder, label, type = 'text', required, name }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        name={name || id}
        id={id}
        className="block w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
        aria-required={required}
      />
    </div>
  );
};

const Textarea: FC<{
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
}> = ({ id, placeholder, label, required, name }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        name={name || id}
        id={id}
        className="block w-full rounded-md border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
        aria-required={required}
      />
    </div>
  );
};

const Contattaci: FC = () => (
  <Layout title="Contattaci">
    <Helmet>
      <meta name="referrer" content="origin" />
    </Helmet>
    <form
      data-netlify="true"
      method="POST"
      name="contact-form"
      action="/contattaci-ok"
    >
      <input type="hidden" name="form-name" value="contact-form" />
      <TextInput
        label="Il tuo nome"
        id="name"
        required={true}
        aria-required={true}
      />
      <TextInput
        label="La tua email"
        id="email"
        type="email"
        name="_replyto"
        aria-required={true}
        required={true}
      />
      <TextInput
        label="Il tuo cellulare (dove possibile ti contatteremo su WhatsApp)"
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
      <div className="my-4">
        <button
          className="rounded-md bg-blue-700 p-2 text-gray-50"
          type="submit"
        >
          Invia
        </button>
      </div>
      <p className="text-xs">
        I dati inseriti saranno utilizzati e trattati nel rispetto del
        regolamento UE2016/679.
      </p>
    </form>
  </Layout>
);

export default Contattaci;

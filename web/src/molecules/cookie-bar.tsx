import React, { useState } from 'react';
import { Link } from 'gatsby';
import { storageFactory } from 'hacks/storage-factory';

import { Column } from 'atoms/grid';
import { Drawer } from '@mantine/core';

const local = storageFactory(() => localStorage);
const ACK_KEY = 'cookie-acknowledge-142';

const useSessionStorage = (key) => {
  const currentValue = local.getItem(key);
  const [, updateState] = useState(currentValue);

  const update = (value) => {
    updateState(value);
    local.setItem(key, value);
  };

  return [currentValue, update];
};

const CookieBar = () => {
  const [ack, setAccepted] = useSessionStorage(ACK_KEY);

  const accepted = ack === 'true';

  if (accepted) {
    return null;
  }

  return (
    <Drawer
      opened={!accepted}
      size="auto"
      onClose={() => setAccepted('true')}
      position="bottom"
      withCloseButton={false}
      closeOnEscape={false}
    >
      <Column className="items-center justify-between space-y-4 lg:flex lg:space-x-4 lg:space-y-0">
        <p className="flex-1">
          Questo sito fa utilizzo di cookie. Come tutti. Se preferisci puoi
          negare il tuo consenso.{' '}
        </p>
        <button
          className="bg-blue-nettuno flex-initial rounded-lg p-2 text-gray-50"
          onClick={() => setAccepted('true')}
        >
          Nessun problema
        </button>{' '}
        <Link to="/privacy-policy" className="block">
          Ulteriori informazioni
        </Link>
      </Column>
    </Drawer>
  );
};

export default CookieBar;

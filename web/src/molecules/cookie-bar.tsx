import React, { useState } from 'react';
import { Link } from 'gatsby';
import { storageFactory } from 'hacks/storage-factory';

import { Column } from 'atoms/grid';
import { Drawer, Group, Text } from '@mantine/core';

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
      size="15%"
      onClose={() => setAccepted('true')}
      position="bottom"
      withCloseButton={false}
      closeOnEscape={false}
    >
      <Column>
        <Group position="apart">
          <Text>
            Questo sito fa utilizzo di cookie. Come tutti. Se preferisci puoi
            negare il tuo consenso.{' '}
          </Text>
          <Group spacing="xl">
            <button
              className="bg-blue-700 text-gray-50 p-2 rounded-lg"
              onClick={() => setAccepted('true')}
            >
              Nessun problema
            </button>{' '}
            <Link to="/privacy-policy">Ulteriori informazioni</Link>
          </Group>
        </Group>
      </Column>
    </Drawer>
  );
};

export default CookieBar;

import React, { ReactNode, useCallback, useState } from 'react';
import { Link } from 'gatsby';
import { storageFactory } from 'hacks/storage-factory';

import { Dialog } from '@headlessui/react';

const local = storageFactory(() => localStorage);
const ACK_KEY = 'cookie-acknowledge-142';

const useSessionStorage = (key) => {
  const currentValue = local.getItem(key);
  const [value, updateState] = useState(currentValue);

  const update = useCallback((value) => {
    updateState(value);
    local.setItem(key, value);
  }, []);

  const updateOnce = useCallback((value) => {
    updateState(value);
  }, []);

  return [value, update, updateOnce];
};

type ModelProps = {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
};

function Modal({ children, isOpen, onClose, title }: ModelProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className="fixed bottom-4 right-4 z-10 w-full max-w-lg rounded bg-white p-4">
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}

const CookieBar = () => {
  const [ack, setAccepted, setAcceptedOnce] = useSessionStorage(ACK_KEY);

  const accepted = ack === 'true';

  if (accepted) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={() => setAcceptedOnce('true')}>
      <p className="mb-4">
        Questo sito fa utilizzo di cookie. Come tutti.
        <br />
        Se preferisci puoi negare il tuo consenso.
      </p>
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-nettuno flex-initial rounded-lg p-2 text-gray-50"
          onClick={() => setAccepted('true')}
        >
          Nessun problema
        </button>{' '}
        <Link to="/privacy-policy" className="block">
          Ulteriori informazioni
        </Link>
      </div>
    </Modal>
  );

  /*   return (
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
       
        </p>
       
      </Column>
    </Drawer>
  ); */
};

export default CookieBar;

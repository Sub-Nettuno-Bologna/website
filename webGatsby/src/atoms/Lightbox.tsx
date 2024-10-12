import React, { FC, ReactNode, useState } from 'react';

import { Dialog } from '@headlessui/react';

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
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded bg-white p-4">
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

const Lightbox: FC<{ hook: ReactNode }> = ({ hook, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
      <button onClick={() => setIsOpen(true)}>{hook}</button>
    </>
  );
};

export default Lightbox;

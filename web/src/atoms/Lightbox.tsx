import React, { FC, ReactNode, useState } from 'react';

import { Modal, UnstyledButton } from '@mantine/core';

const Lightbox: FC<{ hook: ReactNode }> = ({ hook, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal
        centered
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
        withCloseButton={false}
      >
        {children}
      </Modal>
      <UnstyledButton onClick={() => setIsOpen(true)}>{hook}</UnstyledButton>
    </>
  );
};

export default Lightbox;

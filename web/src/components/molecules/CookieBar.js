import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { storageFactory } from 'storage-factory';

import { PrimaryButton } from '../atoms/Buttons';
import { columnCss } from '../atoms/Grid';

const local = storageFactory(() => localStorage);
const ACK_KEY = 'cookie-acknowledge';

const useSessionStorage = key => {
  const currentValue = local.getItem(key);
  const [, updateState] = useState(currentValue);

  const update = value => {
    updateState(value);
    local.setItem(key, value);
  };

  return [currentValue, update];
};

const Bar = styled.div`
  position: fixed;
  display: none;
  width: 100%;
  bottom: 0;
  background: #ffffff;
  padding: 1rem 0;
  z-index: 9999;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 50px;
  display: block;

  > div {
    ${columnCss}
  }
`;

const CookieBar = () => {
  const [ack, setAccepted] = useSessionStorage(ACK_KEY);

  const accepted = ack === 'true';

  if (accepted) {
    return null;
  }

  return (
    <Bar>
      <div>
        Questo sito fa utilizzo di cookie. Come tutti. Se preferisci puoi negare
        il tuo consenso.{' '}
        <PrimaryButton onClick={() => setAccepted('true')}>
          Nessun problema
        </PrimaryButton>{' '}
        <Link to="/privacy-policy">Ulteriori informazioni</Link>
      </div>
    </Bar>
  );
};

export default CookieBar;

import React, { useState } from 'react';

import { ButtonAsLink } from './Buttons';
const TreeList = ({ title, list, itemRenderer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ButtonAsLink onClick={() => setOpen(!open)}>{title}</ButtonAsLink>
      {open && (
        <ul>
          {list.map((elem) => (
            <li key={elem.id}>{itemRenderer(elem)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TreeList;

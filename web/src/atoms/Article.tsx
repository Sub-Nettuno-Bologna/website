import React, { FC } from 'react';

export const Body: FC = ({ children }) => {
  return <div className="leading-6">{children}</div>;
};

export const Header: FC = ({ children }) => {
  return <header className="mb-6">{children}</header>;
};

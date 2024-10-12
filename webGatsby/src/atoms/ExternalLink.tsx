import React, { FC } from 'react';

const ExternalLink: FC<{ href: string }> = ({ children, ...other }) => (
  <a rel="noopener noreferrer" target="_blank" {...other}>
    {children}
  </a>
);

export default ExternalLink;

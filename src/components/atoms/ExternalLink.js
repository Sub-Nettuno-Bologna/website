import React from 'react';

const ExternalLink = ({ children, ...other }) => (
  <a rel="noopener noreferrer" target="_blank" {...other}>
    {children}
  </a>
);

export default ExternalLink;

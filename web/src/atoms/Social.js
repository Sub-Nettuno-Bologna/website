import React from 'react';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa';

export const FacebookLink = ({ color, ...props }) => (
  <a
    href="https://www.facebook.com/clubsubnettuno"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    <FaFacebookSquare title="Facebook" size="2em" color={color} />
  </a>
);

export const InstagramLink = ({ color, ...props }) => (
  <a
    href="https://www.instagram.com/clubsubnettuno/"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    <FaInstagram title="Instagram" size="2em" color={color} />
  </a>
);

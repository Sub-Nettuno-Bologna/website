import React, { FC } from 'react';
import { FaInstagram, FaFacebookSquare } from 'react-icons/fa';

type Props = {
  color?: string;
};

export const FacebookLink: FC<Props> = ({ color, ...props }) => (
  <a
    href="https://www.facebook.com/clubsubnettuno"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    <FaFacebookSquare title="Facebook" size="2em" color={color} />
  </a>
);

export const InstagramLink: FC<Props> = ({ color, ...props }) => (
  <a
    href="https://www.instagram.com/clubsubnettuno/"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    <FaInstagram title="Instagram" size="2em" color={color} />
  </a>
);

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Header as ArticleHeader } from '../../atoms/Article';

const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Magio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const Meta = styled.div`
  font-size: 0.8em;
  color: ${p => p.theme.textSecondary};
`;

const H2 = styled.h2`
  a {
    color: ${p => p.theme.black};
  }
`;

function formatDate(str) {
  const date = new Date(str);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
const PostHeader = ({ permalink, title, date }) => (
  <ArticleHeader>
    <Meta>{formatDate(date)}</Meta>
    <H2>{permalink ? <Link to={permalink}>{title}</Link> : title}</H2>
  </ArticleHeader>
);

export default PostHeader;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Header as ArticleHeader } from '../../atoms/Article';
import formatDate from '../../helpers/formatDate';

const Meta = styled.div`
  font-size: 0.8em;
  color: ${(p) => p.theme.textSecondary};
`;

const H2 = styled.h2`
  a {
    color: ${(p) => p.theme.black};
  }
`;

const PostHeader = ({ permalink, title, date }) => (
  <ArticleHeader>
    {date && <Meta>{formatDate(date)}</Meta>}
    <H2>{permalink ? <Link to={permalink}>{title}</Link> : title}</H2>
  </ArticleHeader>
);

export default PostHeader;

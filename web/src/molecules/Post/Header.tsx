import React, { FC } from 'react';
import { Link } from 'gatsby';
import { Header as ArticleHeader } from 'atoms/Article';
import formatDate from '../../helpers/formatDate';
import { Text, Title } from '@mantine/core';

const PostHeader: FC<{
  permalink?: string;
  title: string;
  date: Date | string;
}> = ({ permalink, title, date }) => (
  <ArticleHeader>
    {date && (
      <Text c="dimmed" fz="sm">
        {formatDate(date)}
      </Text>
    )}
    <Title order={2}>
      {permalink ? (
        <Link to={permalink} style={{ color: 'inherit' }}>
          {title}
        </Link>
      ) : (
        title
      )}
    </Title>
  </ArticleHeader>
);

export default PostHeader;

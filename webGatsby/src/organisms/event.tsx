import React, { FC } from 'react';

import Lightbox from 'atoms/Lightbox';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Link } from 'gatsby';
import formatDate from '../helpers/formatDate';

const Meta: FC<{
  permalink?: string;
  title: string;
  date: Date | string;
}> = ({ permalink, title, date }) => (
  <div className="mb-6 py-2">
    {date && <div className="text-xs text-gray-400">{formatDate(date)}</div>}
    <h2>
      {permalink ? (
        <Link to={permalink} style={{ color: 'inherit' }}>
          {title}
        </Link>
      ) : (
        title
      )}
    </h2>
  </div>
);

const EventoListItem = ({ post }) => {
  return (
    <article className="relative">
      <div>
        {!!post.locandina && (
          <Lightbox
            hook={
              <div>
                <GatsbyImage
                  image={getImage(post.locandina.asset)}
                  style={{ maxHeight: '600px', width: '100%' }}
                  objectFit="contain"
                  alt={'title'}
                />
              </div>
            }
          >
            <GatsbyImage
              image={getImage(post.locandina.asset)}
              style={{ maxHeight: '70vh', width: '100%' }}
              objectFit="contain"
              alt={'title'}
            />
          </Lightbox>
        )}
      </div>
      <div>
        <Meta title={post.title} date={post.date} />
      </div>
    </article>
  );
};

export default EventoListItem;

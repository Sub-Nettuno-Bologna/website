import React, { FC } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { ImageSharp, Maybe } from 'types';

const headerQuery = graphql`
  query ImageHeader {
    site: sanitySiteSettings {
      headerImages {
        asset {
          gatsbyImageData(placeholder: DOMINANT_COLOR, layout: FULL_WIDTH)
          _id
        }
      }
    }
  }
`;

const HeaderImage: FC<{ postImage: Maybe<ImageSharp> }> = ({ postImage }) => {
  const { site } = useStaticQuery(headerQuery);
  const images = site?.headerImages.map((e) => e.asset) || [];

  if (postImage) {
    return (
      <div className="mb-6">
        <GatsbyImage
          image={postImage.childImageSharp.gatsbyImageData}
          style={{ maxHeight: '500px' }}
          alt="Fotografia del post"
        />
      </div>
    );
  }

  return (
    <div className="mb-6">
      <Carousel showStatus={false} dynamicHeight showThumbs={false}>
        {images.map((image) => {
          return (
            <GatsbyImage
              key={image._id}
              image={image.gatsbyImageData}
              style={{ height: '500px' }}
              alt="Fotografia del post"
            />
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeaderImage;

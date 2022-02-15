import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useStaticQuery, graphql } from 'gatsby';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

//const Carousel = RRC.Carousel;

const headerQuery = graphql`
  query ImageHeader {
    site: sanitySiteSettings {
      headerImages {
        asset {
          gatsbyImageData(placeholder: DOMINANT_COLOR, layout: FULL_WIDTH)
        }
      }
    }
  }
`;

const HeaderImage = ({ postImage }) => {
  const { site } = useStaticQuery(headerQuery);
  const images = site.headerImages.map((e) => e.asset);

  if (postImage) {
    return (
      <GatsbyImage
        image={postImage.childImageSharp.gatsbyImageData}
        style={{ maxHeight: '500px' }}
        alt="Fotografia del post"
      />
    );
  }

  return (
    <Carousel showStatus={false} dynamicHeight>
      {images.map((image) => (
        <GatsbyImage
          image={image.gatsbyImageData}
          style={{ height: '500px' }}
          alt="Fotografia del post"
        />
      ))}
    </Carousel>
  );
};

export default HeaderImage;

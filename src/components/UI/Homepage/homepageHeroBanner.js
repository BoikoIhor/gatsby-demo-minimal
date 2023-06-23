import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeroBanner from 'components/UI/heroBanner';

export const homepageHeroBannerQuery = graphql`
query HeroBannerQuery {
  allContentfulBannerUpdated {
    edges {
      node {
        id
        title
        type
        location
        plainText
        sortOrder
        location
        type
        image {
          file {
            url
          }
          title
        }
        imageMobile {
          title
          file {
            url
          }
        }
        link {
          text
          type
          href
          isArrowShow
        }
        text {
          raw
        }
      }
    }
  }
}
`;

const HomepageHeroBanner = () => {
  const bannersData = useStaticQuery(homepageHeroBannerQuery);
  const banners = bannersData.allContentfulBannerUpdated.edges;
  const heroBanner = banners.filter(banner => banner.node.type === 'hero' && banner.node.location === 'homepage');

  return (
    <HeroBanner {...heroBanner[0].node}/>
  );
};

export default HomepageHeroBanner;

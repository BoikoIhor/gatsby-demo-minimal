import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "../../../styles/parent-category.scss";
import HeroBanner from '../heroBanner';

export const parentCategoryHeroQuery = graphql`
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

const ParentCategoryHero = () => {
  const bannersData = useStaticQuery(parentCategoryHeroQuery);
  const banners = bannersData.allContentfulBannerUpdated.edges;
  const heroBanner = banners.filter(banner => banner.node.type === 'hero' && banner.node.location === 'category-page');

  return (
    <HeroBanner {...heroBanner[0].node} type={"category-page"}/>
  );
};

export default ParentCategoryHero;

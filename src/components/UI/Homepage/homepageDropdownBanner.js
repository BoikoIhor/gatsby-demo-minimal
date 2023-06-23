import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Dropdown from "../dropdown";

export const dropdownBannerQuery = graphql`
  query DropdownBannerQuery {
    allContentfulBannerUpdated {
      edges {
        node {
          title
          type
          location
          image {
            file {
              url
            }
          }
          imageMobile {
            file {
              url
            }
          }
          bulletListText {
            id
            dropdownTitle
            text
          }
        }
      }
    }
  }
`;

const HomepageDropdownBanner = (props) => {
  const queryData = useStaticQuery(dropdownBannerQuery);
  const banners = queryData.allContentfulBannerUpdated.edges;
  const dropdownBanner = banners.filter(
    (banner) =>
      banner.node.location === "homepage" && banner.node.type === "dropdown"
  );
  const bannerData = dropdownBanner[0].node;

  const { title, text, image, imageMobile, bulletListText } = bannerData;

  return (
    <div className="homepage__dropdown-banner">
      <div className="homepage__dropdown-banner__content">
        <p className="homepage__dropdown-banner__content-title typography__h2">{title}</p>
        {text &&
            <p className="category-page__dropdown-text">
                {renderRichText(text)}
            </p>
        }
        <div className="homepage__dropdown-banner__content-dropdown-container">
            <Dropdown items={bulletListText} />
        </div>
      </div>
      <div className="homepage__dropdown-banner-image-container">
          <picture>
              <source media="(max-width:768px)" srcSet={imageMobile.file.url}/>
              <source media="(min-width:767px)" srcSet={image.file.url}/>
              <img className="homepage__dropdown-banner-image" src={image.file.url} alt={image.title}/>
          </picture>
      </div>
    </div>
  );
};
export default HomepageDropdownBanner;

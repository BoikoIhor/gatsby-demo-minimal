import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Dropdown from "../dropdown";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export const categoryDropdownBannerQuery = graphql`
  query CategoryDropdownBannerQuery {
    allContentfulBannerUpdated(
        filter: {location: {eq: "category-page"}, type: {eq: "dropdown-percent"}}
        ) {
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
            bulletListText {
              id
              dropdownTitle
              text
            }
            text {
                raw
            }
          }
        }
    }
  }
`;

const ParentCategoryDropdown = (props) => {
  const queryData = useStaticQuery(categoryDropdownBannerQuery);
  const banner = queryData.allContentfulBannerUpdated.edges[0].node;

  const { title, text, image, bulletListText } = banner;

  return (
    <div className="homepage__dropdown-banner category-page__dropdown">
      <div className="homepage__dropdown-banner__content category-page__dropdown-content">
        <h2 className="homepage__dropdown-banner__content-title typography__h2 category-page__dropdown-title">
            {title}
        </h2>
        {text && 
            <p className="category-page__dropdown-text">
                {renderRichText(text)}
            </p>
        }
        <img
            className="dropdown-chart__image mobile mb-20"
            src={image.file.url}
            alt={image.title}
        />
        <Dropdown items={bulletListText} />
      </div>
      <img
        className="category-page__dropdown-image desktop"
        src={image.file.url}
        alt={image.title}
      />
    </div>
  );
};
export default ParentCategoryDropdown;

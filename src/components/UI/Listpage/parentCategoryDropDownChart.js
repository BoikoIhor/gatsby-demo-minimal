import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Dropdown from "../dropdown";
import { renderRichText } from "gatsby-source-contentful/rich-text";

export const categoryDropdownBannerChartQuery = graphql`
  query CategoryDropdownBannerChartQuery {
    allContentfulBannerUpdated(
        filter: {location: {eq: "category-page"}, type: {eq: "dropdown-chart"}}
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

const ParentCategoryDropdownChart = (props) => {
  const queryData = useStaticQuery(categoryDropdownBannerChartQuery);
  const banner = queryData.allContentfulBannerUpdated.edges[0].node;

  const { title, text, image, bulletListText } = banner;

  return (
    <div className="">
      <h2 className="typography__h2 dropdown-chart__title">
            {title}
      </h2>
      <div className="homepage__dropdown-banner category-page__dropdown dropdown-chart">
        <img
          className="dropdown-chart__image desktop"
          src={image.file.url}
          alt={image.title}
        />
        <div className="homepage__dropdown-banner__content dropdown-chart__content">
          <img
              className="dropdown-chart__image mobile"
              src={image.file.url}
              alt={image.title}
          />
          {text && 
              <div className="dropdown-chart__text">
                  {renderRichText(text)}
              </div>
          }
          <Dropdown items={bulletListText} />
        </div>
      </div>
    </div>
  );
};
export default ParentCategoryDropdownChart;

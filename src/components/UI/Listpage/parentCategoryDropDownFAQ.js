import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Dropdown from "../dropdown";
import Button from "../button";

import { GTMSelectContentEvent } from "components/GTM/gtmStaticPage";

export const categoryDropdownBannerFaqQuery = graphql`
  query CategoryDropdownBannerFaqQuery {
    allContentfulBannerUpdated(
        filter: {location: {eq: "category-page"}, type: {eq: "dropdown-faq"}}
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
            link {
              href
              text
              type
              isArrowShow
            }
          }
        }
    }
  }
`;

const ParentCategoryDropdownFAQ = (props) => {
  const queryData = useStaticQuery(categoryDropdownBannerFaqQuery);
  const banner = queryData.allContentfulBannerUpdated.edges[0].node;

  const { title, image, link, bulletListText } = banner;

  const onClick = () => {
    GTMSelectContentEvent({
      content_type: title,
      content_id: ''
    });
  }

  return (
    <div className="homepage__dropdown-banner category-page__dropdown">
      <div className="homepage__dropdown-banner__content dropdown-faq__content">
        <h2 className="typography__h2 dropdown-faq__title mobile">
          {title}
        </h2>
        <Dropdown items={bulletListText} />
        <Button
            className="dropdown-faq__button--mobile mobile"
            value={link.text}
            type={"transparent"}
            href={link.href}
            isArrowShow={link.isArrowShow}
            onClick={onClick}
        />
      </div>
      <div className="desktop category-page__dropdown-image dropdown-faq__image-block">
        <h2 className="typography__h2 dropdown-faq__title">
          {title}
        </h2>
        <div className="dropdown-faq__image-wrapper">
          <img
            className="dropdown-faq__image"
            src={image.file.url}
            alt={image.title}
          />
          <Button
            className="dropdown-faq__button"
            value={link.text}
            type={link.type}
            href={link.href}
            isArrowShow={link.isArrowShow}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
export default ParentCategoryDropdownFAQ;

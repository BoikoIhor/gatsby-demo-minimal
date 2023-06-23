import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import "../../../styles/doctors-help-banner.scss";

const DoctorsHelpBanner = (props) => {
  const { bannerData } = props;
  const { title, text, image, imageMobile } = bannerData;

  return (
    <div className="doctors-help-banner">
      <div className="doctors-help-banner__content">
        <p className="doctors-help-banner__content-title typography__h2">{title}</p>
        {text &&
            <p className="category-page__dropdown-text">
                {renderRichText(text)}
            </p>
        }
      </div>
      <div className="doctors-help-banner__image-container">
          <picture>
              <source media="(max-width:1023px)" srcSet={imageMobile?.file?.url}/>
              <source media="(min-width:1024px)" srcSet={image?.file?.url}/>
              <img className="doctors-help-banner__image" src={image?.file?.url} alt={image?.title}/>
          </picture>
      </div>
    </div>
  );
};
export default DoctorsHelpBanner;

import React from "react";
import "../../styles/homepage.scss";

const FAQItem = (props) => {
  const { slideImage, title, subtext, label } = props;

  return (
    <div className="FAQ-slide">
        <div className="FAQ-slide__image-container">
            <img
                className="FAQ-slide__image"
                src={slideImage.file.url}
                alt={slideImage.title}
            />
            {label &&
              <p className="category-page__slider-label">
                  {label}
              </p>
            }
        </div>
        <div>
            <p className="FAQ-slide__title typography__title">{title}</p>
            <p className="FAQ-slide__subtext typography__p">{subtext}</p>
        </div>
    </div>
  );
};

export default FAQItem;

import React from "react";
import "../../styles/doctors-help-slider.scss";

const DoctorHelpItem = (props) => {
  const { slideImage, title, subtext, label } = props;

  return (
    <div className="doctorHelp-slide">
        <div>
            <p className="doctorHelp-slide__title typography__title">{title}</p>
            <p className="doctorHelp-slide__subtext typography__p">{subtext}</p>
        </div>
        <div className="doctorHelp-slide__image-container">
            <img
                className="doctorHelp-slide__image"
                src={slideImage.file.url}
                alt={slideImage.title}
            />
            {label &&
              <p className="category-page__slider-label">
                  {label}
              </p>
            }
        </div>
    </div>
  );
};

export default DoctorHelpItem;

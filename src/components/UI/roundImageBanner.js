import React from "react";
import "../../styles/round-image-banner.scss";

const RoundImageBanner = (props) => {
  const { bannerData } = props;

  return (
    <div className="round-image-banner">
        <h2 className="typography__h2">{bannerData.sliderTitle}</h2>

        <div className="round-image-banner__item-wrapper">
            {bannerData.slides.map((slide) => (
                <div key={slide.id} className="round-image-banner__item">
                    <div className="round-image-banner__image-container">
                        <img src={slide.slideImage.file.url} alt={slide.title} />
                    </div>
                    <div className="round-image-banner__text">
                        <p className="typography__subtitle">{slide.title}</p>
                        <p className="typography__p--inter">{slide.subtext}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RoundImageBanner;

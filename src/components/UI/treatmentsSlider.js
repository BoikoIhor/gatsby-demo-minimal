import React from "react";

import "../../styles/treatments-slider.scss";
import Slider from "./slider"
import Button from "./button";


const TreatmentsSlider = (props) => {
  const { sliderData } = props;
    let sliderConfig = {
    direction: "horizontal",
    spaceBetween: 16,
    slidesPerView: 1.2,
    breakpoints: {
      412: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 28,
      },
      1024: {
        slidesPerView: 3.2,
        spaceBetween: 28,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 28,
      }
    },
    navigation: true,
  };

  if (!sliderData) {
    return;
  }

  return (
    <div id="treatments-slider" className="treatments-slider">
        <p className="treatments-slider__title typography__h2">
            {sliderData.sliderTitle}
        </p>
      <div className={`treatments-slider__slides`}>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide, key) => {
            return (
                <div className="treatments-slide" key={key}>
                    <div className="treatments-slide__title-container">
                        <p className="treatments-slide__title typography__title">{slide.title}</p>
                        <p className="treatments-slide__subtext typography__p">{slide.subtext}</p>
                    </div>
                    <div className="treatments-slide__image-container">
                        <img
                            className="treatments-slide__image"
                            src={slide.slideImage.file.url}
                            alt={slide.slideImage.title}
                        />
                    </div>
                    <div className="treatments-slide__action-container">
                        <Button
                            value="Start nu"
                            type="light"
                            href={"/questionnaire"}
                        />
                        <Button
                            className="treatments-slide__content-button"
                            value={slide.slideButton?.text}
                            type={slide.slideButton?.type}
                            href={slide.slideButton?.href}
                            isArrowShow={slide.slideButton?.isArrowShow}
                            isThin={slide.slideButton?.isThin}
                        />
                    </div>
                </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TreatmentsSlider;

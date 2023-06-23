import React from "react";

import "../../styles/doctors-help-slider.scss";
import Slider from "./slider";
import DoctorHelpItem from "./doctorsHelpItem";

const DoctorsHelpSlider = (props) => {
  const { sliderData, type } = props;

  let sliderConfig = {
    direction: "horizontal",
    spaceBetween: 22,
    slidesPerView: 1.2,
    breakpoints: {
      412: {
        slidesPerView: 1.2,
      },
      768: {
        slidesPerView: 3.25,
        spaceBetween: 33,
      },
      1024: {
        slidesPerView: 3.5,
        spaceBetween: 37,
      },
      1440: {
        slidesPerView: 4,
      }
    },
    navigation: true,
  };

  if (!sliderData) {
    return;
  }

  return (
    <div className="doctorsHelp-slider">
        <div className="doctorsHelp-slider__title-container">
            <p className="doctorsHelp-slider__title typography__h2">
                {sliderData.name}
            </p>
            <p className="doctorsHelp-slider__sub-title">
                {sliderData.sliderTitle}
            </p>
        </div>
      <div className={`doctorsHelp__slides`}>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide) => {
            return (
              <DoctorHelpItem
                key={slide.id}
                slideImage={slide.slideImage}
                title={slide.title}
                subtext={slide.subtext}
                label={slide.slideButton?.text}
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default DoctorsHelpSlider;

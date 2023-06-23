import React from "react";

import "../../styles/FAQ-slider.scss";
import Slider from "./slider";
import FAQItem from "./FAQItem";

const FAQSlider = (props) => {
  const { sliderData } = props;

  let sliderConfig = {
    direction: "horizontal",
    spaceBetween: 20,
    slidesPerView: 1.25,
    pagination: true,
    breakpoints: {
      440: {
        slidesPerView: 1.5,
      },
      540: {
        slidesPerView: 1.75,
      },
      640: {
        slidesPerView: 2.15,
        spaceBetween: 20,
      },
      770: {
        slidesPerView: 2.25
      },
      870: {
        slidesPerView: 2.5,
        spaceBetween: 28,
      },
      930: {
        slidesPerView: 2.65
      },
      1024: {
        slidesPerView: 2.85
      },
      1150: {
        slidesPerView: 3.15
      },
      1260: {
        slidesPerView: 3.5
      },
      1360: {
        slidesPerView: 3.75
      },
      1440: {
        slidesPerView: 3.25,
        spaceBetween: 40,
      },
      1670: {
        slidesPerView: 3.5,
        spaceBetween: 40,
      },
      1800: {
        slidesPerView: 3.75,
        spaceBetween: 40,
      },
      1920: {
        slidesPerView: 4,
        spaceBetween: 40,
      }
    },
    navigation: true,
  };

  if (!sliderData) {
    return;
  }

  return (
    <div className="FAQ-slider">
      <p className="FAQ-slider__title typography__h2">
        {sliderData.sliderTitle}
      </p>
      <div className={`FAQ-slider__slides category`}>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide) => {
            return (
              <FAQItem
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

export default FAQSlider;

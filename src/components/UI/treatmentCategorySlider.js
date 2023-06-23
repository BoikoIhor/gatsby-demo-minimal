import React from "react";

import "../../styles/treatment-category-slider.scss";
import Slider from "./slider"
import Button from "./button";
import { Link } from "gatsby";


const TreatmentCategorySlider = (props) => {
  const { sliderData } = props;
    let sliderConfig = {
    direction: "horizontal",
    spaceBetween: 8,
    slidesPerView: 2.2,
    breakpoints: {
      412: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 28,
      }
    },
    navigation: true,
  };

  if (!sliderData) {
    return;
  }

  return (
    <div className="treatment-category-slider">
      <div className={`treatment-category-slider__slides`}>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide, key) => {
            return (
                <Link className="treatments-slide-link" key={key} to={slide.slideButton?.href}>
                    <div className="treatments-slide">
                        <div className="treatments-slide__image-container">
                            <img
                                className="treatments-slide__image"
                                src={slide.slideImage.file.url}
                                alt={slide.slideImage.title}
                            />
                        </div>
                        <div className="treatments-slide__action-container">
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
                </Link>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TreatmentCategorySlider;

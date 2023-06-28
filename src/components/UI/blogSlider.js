import React from "react";

import "../../styles/blog-slider.scss";
import Slider from "./slider"
import Button from "./button";
import { Link } from "gatsby";
import BannerArrowIcon from "images/svg/bannerArrow.svg";


const BlogSlider = (props) => {
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
    <div className="blog-slider">
        <div  className="blog-slider__title-container">
            <h3 className="blog-slider__title typography__h3">
                {sliderData.sliderTitle}
            </h3>
            <div className="blog-slider__all-button">
                <Button
                    className="blog-slider__content-button"
                    value={sliderData.sliderButton?.text}
                    type={sliderData.sliderButton?.type}
                    href={sliderData.sliderButton?.href}
                    isArrowShow={sliderData.sliderButton?.isArrowShow}
                    isThin={sliderData.sliderButton?.isThin}
                />
            </div>
        </div>
      <div className={`blog-slider__slides`}>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide, key) => {
            return (
                <div className="blog-slide" key={key}>
                    <div className="blog-slide__image-container">
                        <img
                            className="blog-slide__image"
                            src={slide.slideImage.file.url}
                            alt={slide.slideImage.title}
                        />
                    </div>
                    <Link  className="blog-slide__title-container" to={slide.slideButton?.href}>
                        <p className="blog-slide__title typography__title">{slide.title}</p>
                        <div className="blog-slide__action-container">
                            <img className="" src={BannerArrowIcon} alt="Arrow"/>
                        </div>
                    </Link >
                </div>
            );
          })}
        </Slider>
      </div>
        <div className="blog-slider__mobile-banners-link">
            <Button
                className="treatments-slide__content-button"
                value={sliderData.sliderButton?.text}
                type={sliderData.sliderButton?.type}
                href={sliderData.sliderButton?.href}
                isArrowShow={sliderData.sliderButton?.isArrowShow}
                isThin={sliderData.sliderButton?.isThin}
            />
        </div>
    </div>
  );
};

export default BlogSlider;

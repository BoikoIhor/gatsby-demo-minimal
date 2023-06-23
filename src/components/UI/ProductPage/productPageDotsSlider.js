import React from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Slider from "../slider";

const ProductPageDotsSlider = ({ slides }) => {
  const sliderConfig = {
    slidesPerView: 1.15,
    slidesPerGroup: 1,
    spaceBetween: 20,
    modules: [Pagination],
    pagination: {
      clickable: true,
      dynamicBullets: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    breakpoints: {
      425: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      },
      500: {
        spaceBetween: 20,
      },
      540: {
        slidesPerView: 1.5,
      },
      670: {
        slidesPerView: 1.75,
      },
      768: {
        slidesPerView: 1.99,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },
      940: {
        slidesPerView: 2.5,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    className: "swiper-container product-page__slider-dots",
  };
  return (
    <Slider config={sliderConfig}>
      {Object.values(slides.slides).map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="slide-container">
            <img
              src={slide.slideImage.file.url}
              alt={slide.title}
              className="slide-image"
            />
            <div className="slide-content">
              <p className="slide-title typography__subtitle">{slide.title}</p>
              <p className="slide-text">{slide.subtext}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default ProductPageDotsSlider;

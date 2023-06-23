import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../../styles/slider.scss";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ArrowIcon from "../../images/svg/sliderArrow.svg";

const Slider = (props) => {
  const { config } = props;

  const defaultConfig = {
    direction: "horizontal",
    spaceBetween: 30,
    slidesPerView: 1,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 38,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 38,
      },
    },
    navigation: {
      nextEl: ".button-next-slide",
      prevEl: ".button-prev-slide",
    },
    pagination: {
      clickable: true,
    },
  };

  return (
    <div className="slider-wrapper">
      <Swiper
        direction={config?.direction || defaultConfig.direction}
        spaceBetween={config?.spaceBetween || defaultConfig.spaceBetween}
        slidesPerView={config?.slidesPerView || defaultConfig.slidesPerView}
        breakpoints={config?.breakpoints || defaultConfig.breakpoints}
        navigation={config?.navigation && defaultConfig.navigation}
        pagination={config?.pagination || defaultConfig.pagination}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        initialSlide={config?.initialSlide || defaultConfig.initialSlide}
        loop={config?.loop || defaultConfig.initialSlide}
        className={config.className|| ""}
      >
        {props.children.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
        {config?.navigation && (
          <div className={`button-next-slide`}>
            <img src={ArrowIcon} alt="Next" />
          </div>
        )}

        {config?.navigation && (
          <div className={`button-prev-slide`}>
            <img src={ArrowIcon} alt="Prev" />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;

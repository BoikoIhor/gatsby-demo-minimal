import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "styles/product-page.scss";

const ProductPageSlider = ({ slides }) => {
  const pagination = {
    clickable: true,
    bulletClass: "swiper-pagination-image",
    bulletActiveClass: "swiper-pagination-image-active",
    renderBullet: function (index, className) {
      return `<span class="${className}"><img src="${
        slides[index]?.url_standard
      }" alt="Slide ${index + 1}" /></span>`;
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination]}
      slidesPerView={1}
      spaceBetween={50}
    >
      {Object.values(slides).map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide.url_standard} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductPageSlider;

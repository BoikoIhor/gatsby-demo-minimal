import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

import "../../../styles/doctors-help-slider.scss";
import Slider from "../slider";

const ProductPageReviews = (props) => {
  const { sliderData } = props;

  let sliderConfig = {
    direction: "horizontal",
    initialSlide: 2,
    spaceBetween: 18,
    slidesPerView: 1.1,
    breakpoints: {
      412: {
        slidesPerView: 1.3,
      },
      1024: {
        slidesPerView: 2.15,
        spaceBetween: 33,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 33,
      },
      1520: {
        slidesPerView: 3.5,
        spaceBetween: 33,
      }
    },
    navigation: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    }
  };  
  
  if (!sliderData) {
    return;
  }

  const renderStars = (filledStars, hasHalfStar) => {
    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
    }
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={filledStars} />);
    }
    const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={filledStars + (hasHalfStar ? 1 : 0) + i} />);
    }
    return stars;
  };

  return (
    <div className="doctorsHelp-slider product-page__reviews">
        <div className="product-page__reviews-title">
            <p className="typography__h2">
                {sliderData.sliderTitle}
            </p>
            <div className="product-page__reviews-rating">
                <div className="product-page__reviews-stars">
                    {renderStars(5, false)}
                </div>
                <p className="typography__small--inter">
                    5 average rating    
                </p>
            </div>
        </div>
      <div>
        <Slider config={sliderConfig}>
          {sliderData.slides.map((slide) => {
            return (
                <div className="product-page__reviews-slide">
                    <div className="product-page__reviews-client">
                        <img
                            className="product-page__reviews-image"
                            src={slide.slideImage.file.url}
                            alt={slide.slideImage.title}
                        />
                        <div>
                            <p className="typography__p">{slide.title}</p>
                            <p className="typography__small--inter">Verified review</p>
                        </div>
                    </div>
                    <div className="product-page__reviews-stars">
                            {renderStars(5, false)}
                    </div>
                    <p className="typography__p--inter">
                        {slide.subtext}
                    </p>
                </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductPageReviews;

import React, { useEffect, useState, useCallback } from "react";
import "../../styles/quoteSlider.scss";
import PopupCategoryArrow from "images/svg/popupCategoryArrow.svg";

const QuoteSlider = (props) => {
  const { sliderData } = props;
  const { slides, autoplayInterval=5, slideCount, quoteSliderImage } = sliderData;

  const [activeSlideindex, setActiveSlideIndex] = useState(0);

  const activeSlide = slides[activeSlideindex];
  const { title, subtext } = activeSlide;

  const showNextSlide = useCallback(() => {
    if (activeSlideindex === slideCount - 1) {
      setActiveSlideIndex(0);
    } else {
      setActiveSlideIndex((prev) => prev + 1);
    }
  }, [activeSlideindex, slideCount, setActiveSlideIndex]);

  const handleClick = () => {
      showNextSlide();
  }

  useEffect(() => {
    if (!autoplayInterval) {
      return;
    }

    const intervalId = setInterval(() => {
      showNextSlide();
    }, autoplayInterval * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [autoplayInterval, showNextSlide]);

  return (
      <div className="quote-slider-container">
          <p className="quote-slider__title typography__h2">
              {sliderData.sliderTitle}
          </p>
          <div className="quote-slider">
              {quoteSliderImage && (
                  <div className="quote-slider__image-container">
                      <img
                          className="quote-slider__image"
                          src={quoteSliderImage.file.url}
                          alt={quoteSliderImage.title}
                      />
                  </div>
              )}
              <div className="quote-slider__conteiner">
                  <div role="presentation" className="quote-slider__text-wrapper" onClick={handleClick}>
                      {title && <p className="title">{title}</p>}
                      {subtext && <p className="author">{subtext}</p>}
                  </div>
                  <div className="quote-slider__controls">
                      {slides.map((_, index) => {
                          return (
                              <button
                                  key={index}
                                  onClick={() => {
                                      setActiveSlideIndex(index);
                                  }}
                                  className={`quote-slider__controls-item${
                                      index === activeSlideindex ? "-active" : ""
                                  }`}
                              ></button>
                          );
                      })}
                  </div>
                  <div className="quote-slider__next-arrow" onClick={handleClick}>
                      <img src={PopupCategoryArrow} alt="Next"/>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default QuoteSlider;

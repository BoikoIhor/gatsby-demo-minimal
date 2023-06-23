import React from "react";
import Slider from "components/UI/slider";
import ProductCard from "components/UI/productCard";
import Button from "./button";
import "styles/product-slider.scss";

const ProductSlider = (props) => {
  const {
    products,
    title,
    subtitle,
    productSelectClick,
    isListingItem,
    isHomepage,
    isHideButtons,
    ...restProps
  } = props;

    const sliderConfig = {
        direction: "horizontal",
        spaceBetween: 10,
        slidesPerView: 1.2,
        breakpoints: {
            460: {
                slidesPerView: 1.7,
                spaceBetween: 10
            },
            600 : {
                slidesPerView: 2.2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.7,
                spaceBetween: 20
            },
            1300: {
                slidesPerView: 3.2,
                spaceBetween: 20
            },
            1440: {
                slidesPerView: 3.6,
                spaceBetween: 20
            },
        },
        navigation: true,
    };

  if (!products) {
    return;
  }

  return (
    <div className="product-slider">
      <div className="product-slider__title-wrapper">
        <div>
          <p className="product-slider-title typography__h2">{title}</p>
          <p className="product-slider__subtitle typography__p">{subtitle}</p>
        </div>
        {isHomepage && !isHideButtons && (
          <Button
            href="/category-all"
            value="Alle producten"
            isArrowShow
            type="transparent"
          />
        )}
      </div>
      <div className="product-slider-content">
        <Slider config={sliderConfig}>
          {products.map((item) => {
            const activeIngredient = item.custom_fields.find(
              (el) => el.name === "Substance"
            );
            const shortDescription = item.custom_fields.find(
              (el) => el.name === "Short_description"
            );
            const prescription = item.custom_fields.find(
              (el) => el.name === "Prescription"
            );

            return (
              <ProductCard
                key={item.id}
                name={item.name}
                activeIngredient={activeIngredient?.value}
                imageSrc={item.images[0]?.url_standard}
                shortDescription={shortDescription?.value}
                price={item.price}
                url={item.custom_url?.url}
                bigcommerceId={item.bigcommerce_id}
                isListingItem={isListingItem}
                productSelectClick={productSelectClick}
                isHomepage={isHomepage}
                prescription={prescription}
              />
            );
          })}
        </Slider>
      </div>
      {isHomepage && !isHideButtons && (
        <div className="mobile-category-link">
          <Button
            href="/category-all"
            value="Alle producten"
            isArrowShow
            type="transparent"
          />
        </div>
      )}
    </div>
  );
};

export default ProductSlider;

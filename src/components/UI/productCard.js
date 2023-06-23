import React from "react";
import { Link } from "gatsby";
import { useCart } from "../../context/cartContext";

import Button from "components/UI/button";

import "styles/product-card.scss";

const ProductCard = (props) => {
  const {
      name,
      activeIngredient,
      imageSrc,
      shortDescription,
      price,
      url,
      bigcommerceId,
      isListingItem,
      isHomepage,
      productSelectClick,
      onClick,
      prescription,
      ...restProps
  } = props;

    const isPrescription = prescription.value === 'true';

    const imagePlaceholderUrl =
      "//images.ctfassets.net/jns6jkghkn7l/56R83TDxML5MoVbA7hAVlE/ded876b66bb4b2ead1c743d60c59e658/Hims-Sildenafil-PDP-D-ATF-Image_3.png";

  return (
    <div className={isHomepage? 'product-card product-card--homepage':'product-card'}>
        <div className="product-card__heading-container">
          <div className="product-card__heading">
              <div>
                  <p className="product-card__heading-title">{name}</p>
                  <p className="product-card__heading-subtitle">
                      {activeIngredient}
                  </p>
              </div>
              <div>
                  {isPrescription ? (
                      <div className="product-card__rx">
                          Rx
                      </div>
                  ) : null}
              </div>

          </div>
        </div>
        <div className="product-card__image-container">
            <img
            className="product-card__image"
            src={imageSrc || imagePlaceholderUrl}
            alt={name}
        />
        </div>
      <p className="product-card__description">{shortDescription}</p>
        {!isPrescription ? (
            <p className="product-card__price">{`vanaf €${price},- per maand`}</p>
        ) : (
            <p className="product-card__price"></p>
        )}
      <div className="product-card__buttons">
        <Button value="Start nu" type={isListingItem ? "blue" : "light"} href="/questionnaire" />
        <Link onClick={() => productSelectClick && productSelectClick(bigcommerceId)}
              to={url ?? '/'} className="product-card__buttons-link">
            Lees meer
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { useCart } from "../../../context/cartContext";
import { ReactSVG } from "react-svg";

import Button from "components/UI/button";
import capsuleIcon from "images/svg/capsule-icon.svg";
import deliveryIcon from "images/svg/delivery-icon.svg";
import arrowIcon from "images/svg/inputArrow.svg";

const QuestionnaireProductCard = (props) => {
  const {
      questionnaireSku,
      currentProduct,
      onClick,
      ...restProps
  } = props;

  const product = currentProduct[0];

  const variant = product.variants?.find((el) => el.id === questionnaireSku);
  const dosage = variant.option_values?.find((el) => el.option_display_name === "Dosage").label;
  const subscription = variant.option_values?.find((el) => el.option_display_name === "Subscription").label;

  const imagePlaceholderUrl =
      "//images.ctfassets.net/jns6jkghkn7l/56R83TDxML5MoVbA7hAVlE/ded876b66bb4b2ead1c743d60c59e658/Hims-Sildenafil-PDP-D-ATF-Image_3.png";

  const { increaseQty } = useCart();
  const addToCart = (product, variantId, variantPrice) => {
    increaseQty({
      ...product,
      price: variantPrice || product.price,
      variant_id: variantId,
      quantity: 0
    }, 1, false);

    onClick();
  }

  const activeIngredient = product.custom_fields?.find((el) => el.name === "Substance")?.value || "";
  const shortDescription = product.custom_fields?.find((el) => el.name === "Short_description")?.value || "";

  return (
    <div className='questionnaire-product__wrapper'>
        <div className="questionnaire-product__heading">
            <img
                className="questionnaire-product__image"
                src={product.images[0]?.url_standard || imagePlaceholderUrl}
                alt={product.name}
            />
            <div className="questionnaire-product__heading-text">
                <p className="typography__p">
                    {activeIngredient} ({product.name})
                </p>
                <p className="typography__small--inter">
                    {shortDescription}
                </p>
            </div>
        </div>
        <div className="questionnaire-product__options">
            <p className="typography__small">
                Our recommendation based on your answers
            </p>
            { dosage && (
                <div className="questionnaire-product__option">
                    <div className="questionnaire-product__option-value">
                        <ReactSVG src={capsuleIcon} />
                        <span className="typography__small--inter">
                            Strength:
                        </span>
                        <span className="questionnaire-product__option-bold">
                            {dosage}
                        </span>
                    </div>
                    <p className="typography__small--inter questionnaire-product__arrow">
                        See why 
                        <ReactSVG src={arrowIcon} />
                    </p>
                </div>
            )}
            { subscription && (
                <div className="questionnaire-product__option questionnaire-product__option--large">
                    <div className="questionnaire-product__option-value">
                        <ReactSVG src={deliveryIcon} />
                        <span className="typography__small--inter">
                            Delivered:
                        </span>
                        <span className="questionnaire-product__option-bold">
                            {subscription}
                        </span>
                    </div>
                    <p className="typography__small--inter questionnaire-product__arrow">
                        Change to save 
                        <ReactSVG src={arrowIcon} />
                    </p>
                </div>
            )}
        </div>
        <div className="questionnaire-product__checkout">
            <p className="typography__title">
                {`${(variant.price / (parseInt(subscription.split("every")[0], 10) || 1)).toFixed(2)}€ `}
                <span className="questionnaire-product__quantity">
                    per maand
                </span>
            </p>
            <Button 
                className="questionnaire-product__button"
                value="Checkout" 
                type={"dark"} 
                onClick={() => { 
                    addToCart(product, questionnaireSku, product.price);
                }} 
            />
            <p className="typography__small--inter">
                Cancel-any-time subscription
            </p>
        </div>
    </div>
  );
};

export default QuestionnaireProductCard;

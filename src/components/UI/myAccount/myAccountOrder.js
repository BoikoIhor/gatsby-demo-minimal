import React from "react";
import BackIcon from "../../../images/svg/back-button-icon.svg";
import { ReactSVG } from "react-svg";
import useMyAccountOrder from "../../../hooks/myAccount/useMyAccountOrder";

import "../../../styles/my-account-order.scss";

const MyAccountOrder = (props) => {
  const {
    orderData,
    setActiveOrderPageID,
    products,
    activeOrderPageID,
  } = props;

  const {
    product,
    formatDate,
    currProduct,
    price,
    subtotal,
    grandtotal,
  } = useMyAccountOrder({
    activeOrderPageID,
    products,
    orderData,
  });

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="my-account-order">
      <div className="back-icon" onClick={() => setActiveOrderPageID(null)}>
        <ReactSVG src={BackIcon} />
      </div>
      <div className="order-content">
        <h3 className="order-content__title">Order Contents</h3>
        <div className="order-content__item">
          <img
            className="order-content__item--image"
            src={currProduct?.images[0]?.url_standard}
          />
          <div className="order-content__item--details">
            <p className="product-name">{currProduct?.name}</p>
            {product?.product_options?.map((item) => (
              <p className="product-attributes">
                <span className="product-attributes--title">
                  {item?.display_name}:
                </span>{" "}
                {item?.display_value}
              </p>
            ))}
          </div>
          <div className="order-content__item--price">{price.toFixed(2)}$</div>
        </div>
        <div className="order-content__subtotal">
          <p>Subtotal</p>
          <p>{subtotal.toFixed(2)}$</p>
        </div>
        <div className="order-content__subtotal">
          <p>Grand Total</p>
          <p>{grandtotal.toFixed(2)}$</p>
        </div>
      </div>
      <div className="order-details">
        <div className="order-details__details">
          <h3 className="order-details__details--title">Order Details</h3>
          <p>
            Order Status:{" "}
            <span className="order-details__details--value">
              {orderData.status}
            </span>
          </p>
          <p>
            Order Date:{" "}
            <span className="order-details__details--value">
              {formatDate(orderData?.date_created)}
            </span>
          </p>
          <p>
            Order Total:{" "}
            <span className="order-details__details--value">
              ${price.toFixed(2)}
            </span>
          </p>
          <p>
            Payment Method:{" "}
            <span className="order-details__details--value">
              {orderData.payment_method}
            </span>
          </p>
        </div>
        <div className="order-details__shipping">
          <h3 className="order-details__details--title">Ship To</h3>
          <p className="address-line">
            {orderData.billing_address.first_name +
              " " +
              orderData.billing_address.last_name}
          </p>
          <p className="address-line">{orderData.billing_address.company}</p>
          <p className="address-line">{orderData.billing_address.city}</p>
          <p className="address-line">
            {orderData.billing_address.street_1 +
              ", " +
              orderData.billing_address.street_1 +
              " " +
              orderData.billing_address.zip}
          </p>
          <p className="address-line">{orderData.billing_address.country}</p>
        </div>
        <div className="order-details__billing">
          <h3 className="order-details__details--title">Bill To</h3>
          <p className="address-line">
            {orderData.billing_address.first_name +
              " " +
              orderData.billing_address.last_name}
          </p>
          <p className="address-line">{orderData.billing_address.company}</p>
          <p className="address-line">{orderData.billing_address.city}</p>
          <p className="address-line">
            {orderData.billing_address.street_1 +
              ", " +
              orderData.billing_address.street_1 +
              " " +
              orderData.billing_address.zip}
          </p>
          <p className="address-line">{orderData.billing_address.country}</p>
        </div>
      </div>
    </div>
  );
};

export default MyAccountOrder;

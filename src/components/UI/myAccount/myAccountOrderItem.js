import React from "react";
import Thumbnail from "../../../images/thumbnail-sample.png";
import { ReactSVG } from "react-svg";
import ArrowMobile from "../../../images/svg/my-account-arrow-mobile.svg";
import ArrowDesktop from "../../../images/svg/my-account-arrow-desktop.svg";
import useMyAccountOrderItem from "../../../hooks/myAccount/useMyAccountOrderItem";

const MyAccountOrderItem = (props) => {
  const { id, setActiveOrderPageID, products, dateCreated } = props;

  const {
    product,
    addMonthsToDate,
    interval,
    currProduct,
  } = useMyAccountOrderItem({ id, products });

  if (!Object.keys(product).length) {
    return null;
  }

  return (
    <div onClick={() => setActiveOrderPageID(id)} className="orders__order">
      <img
        className="orders__order--thumbnail"
        alt="Thumbnail"
        src={currProduct?.images[0]?.url_thumbnail || Thumbnail}
      />
      <div>
        <p className="messages__message--problem">{product?.name}</p>
        <p className="messages__message--doctor">
          verwacht{" "}
          <span className="text-dark">
            {addMonthsToDate(dateCreated, interval)}
          </span>
        </p>
      </div>
      <ReactSVG className="mobile-icon" src={ArrowMobile} />
      <ReactSVG className="desktop-icon" src={ArrowDesktop} />
    </div>
  );
};

export default MyAccountOrderItem;

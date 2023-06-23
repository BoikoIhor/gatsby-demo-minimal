import React, { useState, useEffect } from "react";
import axios from "axios";

const useMyAccountOrderItem = (props) => {
  const { id, products } = props;
  const [product, setProduct] = useState({});
  const subscription = (product?.product_options || []).find(
    (item) => item.display_name === "Subscription"
  );
  const intervalString = (subscription?.display_value || "").split("every")[1];
  const interval = parseInt(intervalString, 10) || 1;

  const currProduct = products.find(
    (item) => item.bigcommerce_id === product.product_id
  );

  const getOrderProducts = async (id) => {
    const promise = await axios.get(`/api/v2/orders/order_id/products`, {params:{order_id: id}});
    setProduct(promise.data[0]);
  };

  const addMonthsToDate = (inputDate, months) => {
    const dateObj = new Date(inputDate);
    dateObj.setMonth(dateObj.getMonth() + months);
    return dateObj.toLocaleString("en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    getOrderProducts(id);
  }, [id]);

  return {
    product,
    addMonthsToDate,
    interval,
    currProduct,
  };
};

export default useMyAccountOrderItem;

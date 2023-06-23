import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWindow } from "context/windowContext";

const useMyAccountOrder = (props) => {
  const { activeOrderPageID, products, orderData } = props;
  const { window } = useWindow();
  const [product, setProduct] = useState({});

  const currProduct = products.find(
    (item) => item.bigcommerce_id === product.product_id
  );

  const price = +product?.price_inc_tax ?? 0;
  const subtotal = +orderData?.subtotal_inc_tax ?? 0;
  const grandtotal = +orderData?.total_inc_tax ?? 0;

  const getOrderProducts = async (id) => {
    const promise = await axios.get(`/api/v2/orders/order_id/products`, {
      params: { order_id: id },
    });
    setProduct(promise.data[0]);
  };

  const formatDate = (inputDate) => {
    if (!inputDate) {
      return;
    }
    const dateObj = new Date(inputDate);
    return `${dateObj.getDate()} ${dateObj.toLocaleString("default", {
      month: "short",
    })} ${dateObj.getFullYear()}`;
  };

  useEffect(() => {
    getOrderProducts(activeOrderPageID);

    if (window) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [activeOrderPageID]);

  return {
    product,
    formatDate,
    currProduct,
    price,
    subtotal,
    grandtotal
  };
};

export default useMyAccountOrder;

import React from 'react';
import { Link } from "gatsby";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";

import Button from "components/UI/button";
import Quantity from "components/UI/quantity";
import Image from "components/UI/image";

import deleteBinIcon from "images/svg/deleteBin.svg";


const CartProduct = (props) => {
    const { product, ...restProps } = props;

    const { increaseQty, decreaseQty, removeFromCart, localProducts } = useCart();
    const { currency } = useCurrency();

    const { pathname } = new URL(product.url);

    const localProduct = localProducts[product.variant_id];
    const isOneTimePurchase = localProduct?.custom_fields?.find(field => field.name === "One-time-purchase").value === "true";

    return (
        <div className="cart__product" {...restProps}>
            <Link to={pathname}>
                <Image className="cart__product-image"
                       src={product.image_url}
                       alt={`${product.name} image`}/>
            </Link>
            <div className="cart__product-content">
                <div className="cart__product-info">
                    <Link to={pathname} className="cart__product-link">
                        <h3 className="cart__product-title typography__title">
                            {product.name}
                        </h3>
                    </Link>
                    <div className="cart__product-price typography__title">
                        {product.list_price} {currency.token}
                    </div>
                    {
                        product.sku &&
                        <div className="cart__product-sku typography">
                            SKU: {product.sku}
                        </div>
                    }
                </div>
                <div className="cart__product-actions">
                    {
                        isOneTimePurchase ? (
                            <Quantity className="cart__product-quantity"
                                      initial={product.quantity}
                                      onIncrease={() => increaseQty(product, 1)}
                                      onDecrease={() => decreaseQty(product, 1)}/>
                        ) : (
                            <div/>
                        )
                    }
                    <Button value="Verwijder" type="transparent" iconBefore={deleteBinIcon}
                            onClick={() => removeFromCart(product)}/>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;

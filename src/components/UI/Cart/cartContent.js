import React, { useEffect } from "react";

import CartProduct from "components/UI/Cart/cartProduct";
import CartSummary from "components/UI/Cart/cartSummary";
import { GTMViewCartEvent } from "components/GTM/gtmCart";

const CartContent = (props) => {
    const {
        ActionButtons,
        isCheckout,
        cartItems,
        cartQty,
        cartTotal,
        isCartOpen,
        currency,
        updateOrder
    } = props;

    const gtmEvent = (isCartOpen, cartTotal, cartItems) => {
        if ((!isCartOpen && !isCheckout)) {
            return;
        }

        if (!Object.keys(currency).length || !cartTotal) {
            return;
        }

        GTMViewCartEvent({
            currency: currency.currency_code,
            value: cartTotal,
            items: [
                ...cartItems.map((item) => ({
                    item_id: item.product_id,
                    item_name: item.name,
                    // discount: 5.99,
                    // item_brand: getBrandNameById(product.brand_id),
                    // item_category: getCategoryNameById(categoryId),
                    item_variant: item.variant_id,
                    price: item.sale_price,
                    quantity: item.quantity,
                }))
            ],
        });
    }

    useEffect(() => {
        if (!updateOrder || !cartItems) {
            return;
        }

        updateOrder('products', [
            ...cartItems.map((item) => {
                return {
                    product_id: item.product_id,
                    quantity: item.quantity,
                    variant_id: item.variant_id
                }
            })
        ])
    }, [cartItems]);

    useEffect(() => {
        gtmEvent(isCartOpen, cartTotal, cartItems)
    }, [isCartOpen, cartTotal]);

    return (
        cartQty === 0 ?
            <div className="cart__empty">
                <h3 className="cart__empty-title typography__h3">Uw winkelmand is leeg</h3>
                <p className="cart__empty-text typography__title">U heeft nog geen producten in uw winkelmand.</p>
            </div>
            :
            <>
                <h3 className="cart__content-title typography__h3">
                    Uw winkelmand {cartItems.length > 1 ? `(${cartItems.length} items)` : `(${cartItems.length} item)`}
                </h3>
                <div className="cart__content">
                    <section className="cart__content-items">
                        {
                            cartItems.map((item, index) => (
                                <CartProduct key={index} product={item}/>
                            ))
                        }
                    </section>
                    <CartSummary ActionButtons={ActionButtons}/>
                </div>
            </>
    );
};

export default CartContent;

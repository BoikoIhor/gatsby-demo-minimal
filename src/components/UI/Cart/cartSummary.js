import React from "react";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";
import { useCheckout } from "context/checkoutContext";

const CartSummary = (props) => {
    const { ActionButtons } = props;

    const { cartTotal } = useCart();
    const { order } = useCheckout();
    const { currency } = useCurrency();

    const shippingCost = order?.base_shipping_cost

    return (
        <section className="cart__summary">
            <div className="cart__summary-wrapper">
                <div className="cart__summary-items">
                    <div className="cart__summary-item typography__small">
                        <span className="cart__summary-item-label">Subtotaal</span>
                        <span className="cart__summary-item-value">{cartTotal} {currency.token}</span>
                    </div>
                    {
                        shippingCost !== null && shippingCost !== undefined && (
                            <div className="cart__summary-item typography__small">
                                <span className="cart__summary-item-label">Verzending</span>
                                <span className="cart__summary-item-value">{shippingCost} {currency.token}</span>
                            </div>
                        )
                    }
                </div>
                <div className="cart__summary-total">
                    <div className="cart__summary-item typography__p">
                        <span className="cart__summary-item-label">Totaal</span>
                        <span className="cart__summary-item-value">
                            {cartTotal + (shippingCost ?? 0)} {currency.token}
                        </span>
                    </div>
                    <div className="cart__summary-item typography__small">
                        <span className="cart__summary-item-label">Inclusief btw</span>
                    </div>
                </div>
            </div>
            {
                ActionButtons &&
                <div className="cart__summary-actions">
                    <ActionButtons/>
                </div>
            }
        </section>
    );
};

export default CartSummary;

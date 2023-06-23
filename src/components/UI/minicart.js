import React from 'react';

import AsidePopup from "components/UI/asidePopup";
import CartContent from "components/UI/Cart/cartContent";
import Button from "components/UI/button";

import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";

import "styles/checkout-page.scss";


const Minicart = () => {
    const { currency } = useCurrency();
    const { isCartOpen, closeCart, cartQty, cartTotal, cartItems } = useCart();

    return (
        <AsidePopup className="minicart" isOpened={isCartOpen} setClosed={closeCart}>
            <CartContent
                cartItems={cartItems}
                cartQty={cartQty}
                cartTotal={cartTotal}
                isCartOpen={isCartOpen}
                currency={currency}
                ActionButtons={() => <>
                    <Button value="Bekijk winkelwagen" type="dark" isArrowShow href="/checkout"/>
                    <Button value="Verder winkelen" type="light" onClick={closeCart}/>
                </>}/>
        </AsidePopup>
    );
};

export default Minicart;

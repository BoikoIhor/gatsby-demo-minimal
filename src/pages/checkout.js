import React from "react";
import IndexProvider from "context";
import CheckoutProvider from "context/checkoutContext";

import HtmlHead from "components/UI/htmlHead";
import Main from "components/Layout/main";
import CheckoutSteps from "components/UI/Checkout/checkoutSteps";

import "styles/checkout-page.scss";


const Checkout = (props) => {
    const gtmData = {
        page: {
            title: "Checkout",
            type: "Checkout",
        },
    };

    return (
        <IndexProvider>
            <HtmlHead title="Checkout"/>
            <Main className="checkout" gtmData={gtmData}>
                <CheckoutProvider>
                    <div className="checkout__wrapper">
                        <CheckoutSteps/>
                    </div>
                </CheckoutProvider>
            </Main>
        </IndexProvider>
    );
};

export default Checkout;

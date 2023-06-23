import React from "react";
import WindowProvider from "context/windowContext";
import CustomerProvider from "context/customerContext";
import CurrencyProvider from "context/currencyContext";
import CartProvider from "context/cartContext";

const IndexProvider = ({ children }) => {
    return (
        <WindowProvider>
            <CustomerProvider>
                <CurrencyProvider>
                    <CartProvider>
                        {children}
                    </CartProvider>
                </CurrencyProvider>
            </CustomerProvider>
        </WindowProvider>
    );
};

export default IndexProvider;
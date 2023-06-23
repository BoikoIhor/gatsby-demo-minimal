import React, { lazy, Suspense, useEffect, useState } from 'react';
import { navigate } from "gatsby";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";
import { useWindow } from "context/windowContext";
import { useCheckout } from "context/checkoutContext";
import { useCustomer } from "context/customerContext";

import Button from "components/UI/button";
import Breadcrumbs from "components/UI/breadcrumbs";
import Loader from "components/UI/loader";
import HtmlHead from "components/UI/htmlHead";

import CheckoutStep from "components/UI/Checkout/checkoutStep";
import { GTMCheckoutEvent, GTMPurchaseEvent } from "components/GTM/gtmCheckout";

const CartContent = lazy(() => import('components/UI/Cart/cartContent'));
const CheckoutCustomer = lazy(() => import('components/UI/Checkout/checkoutCustomer'));
const CheckoutAddress = lazy(() => import('components/UI/Checkout/checkoutAddress'));
const CheckoutPayment = lazy(() => import('components/UI/Checkout/checkoutPayment'));

const CheckoutSteps = (props) => {
    const steps = [
        "Winkelmand",
        "Gegevens",
        "Adres",
        "Betaling",
    ];
    const [activeStep, setActiveStep] = useState(1);

    const { window } = useWindow();
    const { currency } = useCurrency();
    const { cart, removeCart, cartTotal, cartQty, cartItems, localProducts } = useCart();
    const { order, updateOrder } = useCheckout();
    const { customerData } = useCustomer();

    useEffect(() => {
        !cart && navigate('/');
    }, [cart]);

    useEffect(() => {
        if (!Object.keys(currency).length || !cartTotal) {
            return;
        }

        GTMCheckoutEvent({
            currency: currency.currency_code,
            value: cartTotal,
            coupon: "",
            checkout_step: activeStep,
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
    }, [activeStep, currency])

    const purchaseEvent = (gtmData) => {
        GTMPurchaseEvent({
            currency: currency.currency_code,
            value: cartTotal,
            coupon: "",
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
            ...gtmData
        });
    }

    return (
        <>
            <HtmlHead>
                <script src="/chargebee.js"/>
            </HtmlHead>
            <Breadcrumbs items={steps} active={activeStep} setActive={setActiveStep}/>
            <Suspense fallback={<Loader/>}>
                <CheckoutStep activeStep={activeStep} currentStep={1}>
                    <CartContent
                        isCheckout
                        cartItems={cartItems}
                        cartQty={cartQty}
                        cartTotal={cartTotal}
                        currency={currency}
                        updateOrder={updateOrder}
                        ActionButtons={() => <>
                            <Button value="Volgende" type="dark" isArrowShow
                                    onClick={() => {
                                        setActiveStep(2)
                                    }}/>
                            <Button value="Verder winkelen" type="light" href="/"/>
                        </>}/>
                </CheckoutStep>
                <CheckoutStep activeStep={activeStep} currentStep={2}>
                    <CheckoutCustomer
                        updateOrder={updateOrder}
                        customerData={customerData}
                        nextStepAction={() => setActiveStep(3)}/>
                </CheckoutStep>
                <CheckoutStep activeStep={activeStep} currentStep={3}>
                    <CheckoutAddress
                        customerData={customerData}
                        updateOrder={updateOrder}
                        nextStepAction={() => setActiveStep(4)}/>
                </CheckoutStep>
                <CheckoutStep activeStep={activeStep} currentStep={4}>
                    <CheckoutPayment
                        gtmEvent={purchaseEvent}
                        window={window}
                        order={order}
                        cartItems={cartItems}
                        removeCart={removeCart}
                        customerData={customerData}
                        localProducts={localProducts}
                        nextStepAction={() => {}}/>
                </CheckoutStep>
            </Suspense>
        </>
    );
};

export default CheckoutSteps;

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";
import { useCustomer } from "context/customerContext";

import Button from "components/UI/button";
import Breadcrumbs from "components/UI/breadcrumbs";
import Loader from "components/UI/loader";
import HtmlHead from "components/UI/htmlHead";

import CheckoutStep from "components/UI/Checkout/checkoutStep";
import { GTMCheckoutEvent } from "components/GTM/gtmCheckout";

const CartContent = lazy(() => import('components/UI/Cart/cartContent'));
const CheckoutCustomer = lazy(() => import('components/UI/Checkout/checkoutCustomer'));
const CheckoutAddress = lazy(() => import('components/UI/Checkout/checkoutAddress'));
const CheckoutPayment = lazy(() => import('components/UI/Checkout/checkoutPayment'));

const CheckoutSteps = (props) => {
    const {
        isCartStep,
        isCustomerStep
    } = props;

    const breadcrumbItems = [
        {
            name: "Winkelmand",
            isAvailable: isCartStep
        },
        {
            name: "Gegevens",
            isAvailable: isCustomerStep
        },
        {
            name: "Adres",
            isAvailable: true
        },
        {
            name: "Betaling",
            isAvailable: true
        }
    ];
    const [activeStep, setActiveStep] = useState(breadcrumbItems.indexOf(breadcrumbItems.find((i) => i.isAvailable)));

    const { currency } = useCurrency();
    const { cart, cartTotal, cartItems } = useCart();
    const { customerData } = useCustomer();

    useEffect(() => {
        !cart && navigate('/');
    }, [cart]);

    useEffect(() => {
        if (!currency.currency_code || !cartTotal) {
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
    }, [activeStep])

    const stepsComponents = [
        ({ nextStepAction }) => (
            <CartContent
                ActionButtons={() => <>
                    <Button value="Volgende" type="dark" isArrowShow
                            onClick={nextStepAction}/>
                    <Button value="Verder winkelen" type="light" href="/"/>
                </>}/>
        ),
        ({ nextStepAction }) => (
            <CheckoutCustomer nextStepAction={nextStepAction}/>
        ),
        ({ nextStepAction }) => (
            customerData.id ?
                <CheckoutAddress customerData={customerData} nextStepAction={nextStepAction}/> :
                <Loader/>
        ),
        ({ nextStepAction }) => (
            <CheckoutPayment nextStepAction={nextStepAction}/>
        )
    ]

    return (
        <>
            <HtmlHead>
                <script src="/chargebee.js"/>
            </HtmlHead>
            <Breadcrumbs items={breadcrumbItems} active={activeStep} setActive={setActiveStep}/>
            <Suspense fallback={<Loader/>}>
                {
                    stepsComponents.map((StepsComponent, index) => (
                        breadcrumbItems[index].isAvailable &&
                        <CheckoutStep activeStep={activeStep} currentStep={index} key={index}>
                            <StepsComponent
                                key={index}
                                nextStepAction={() => {
                                    index < (stepsComponents.length - 1) &&
                                    setActiveStep(breadcrumbItems.findIndex((item, ind) => item.isAvailable && ind > index))
                                }}
                            />
                        </CheckoutStep>
                    ))
                }
            </Suspense>
        </>
    );
};

CheckoutSteps.propTypes = {
    isCartStep: PropTypes.bool,
    isCustomerStep: PropTypes.bool
}

CheckoutSteps.defaultProps = {
    isCartStep: true,
    isCustomerStep: true
}

export default CheckoutSteps;

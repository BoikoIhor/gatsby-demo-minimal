import React, { lazy, useMemo, Suspense } from "react";

import RadioField from "components/UI/Inputs/RadioField";
import Loader from "components/UI/loader";

const Methods = props => {
    const {
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        setIsPlaceOrder,
        customerData,
        isSavePaymentMethod,
        setIsSavePaymentMethod,
    } = props;
    const GATSBY_BIGCOMMERCE_STOREFRONT_URL = process.env.GATSBY_BIGCOMMERCE_STOREFRONT_URL;

    const PaymentComponent = useMemo(() => {
        return selectedPaymentMethod ?
            lazy(() => import("components/UI/Checkout/Payment/Methods/" + selectedPaymentMethod)) :
            () => (
                <h3>
                    This payment method is not available
                </h3>
            )

    }, [selectedPaymentMethod])

    return (
        paymentMethods ? (
            <div className="payment-methods">
                <div className="payment-methods__list">
                    <h3 className="checkout-payment__title typography__h3">
                        Payment
                    </h3>
                    {
                        paymentMethods.map((method, index) => (
                            <RadioField
                                key={index}
                                name={'paymentMethod'}
                                className={'payment-methods__radio'}
                                label={method.id.replaceAll('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                                value={method.id}
                                onChange={() => {
                                    setSelectedPaymentMethod(method.id)
                                    setIsPlaceOrder(false)
                                }}
                                defaultChecked={index === 0}
                            >
                                {
                                    !method.id.includes('card') && (
                                        <img
                                            src={`${GATSBY_BIGCOMMERCE_STOREFRONT_URL}/img/payment-providers/${method.id.replaceAll('.', '_')}.svg`}
                                            alt={method.id}/>
                                    )
                                }
                            </RadioField>
                        ))
                    }
                </div>
                <div className="payment-methods__method">
                    <Suspense fallback={<Loader/>}>
                        <PaymentComponent
                            firstName={customerData.first_name}
                            lastName={customerData.last_name}
                            setIsPlaceOrder={setIsPlaceOrder}
                            isSavePaymentMethod={isSavePaymentMethod}
                            setIsSavePaymentMethod={setIsSavePaymentMethod}
                        />
                    </Suspense>
                </div>
            </div>
        ) : (
            <Loader/>
        )
    );
};

export default Methods;

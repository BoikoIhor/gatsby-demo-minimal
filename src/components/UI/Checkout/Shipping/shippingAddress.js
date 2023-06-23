import React, { lazy, Suspense } from "react";
import Loader from "components/UI/loader";

const ShippingEdit = lazy(() => import('components/UI/Checkout/Shipping/shippingEdit'));
const ShippingForm = lazy(() => import('components/UI/Checkout/Shipping/shippingForm'));

const ShippingAddress = (props) => {
    const {
        shippingAddress,
        setShippingAddress,
        setBillingAddress,
        isShippingEdit,
        setIsBillingEdit,
        setIsShippingEdit
    } = props;

    return (
        <div className="checkout-address__shipping">
            <h3 className="checkout-address__title typography__h3">Shipping Address</h3>
            <Suspense fallback={<Loader/>}>
                {
                    isShippingEdit ? (
                        <ShippingEdit
                            shippingAddress={shippingAddress}
                            setIsShippingEdit={setIsShippingEdit}/>
                    ) : (
                        <ShippingForm
                            shippingAddress={shippingAddress}
                            setShippingAddress={setShippingAddress}
                            setBillingAddress={setBillingAddress}
                            setIsBillingEdit={setIsBillingEdit}
                            setIsShippingEdit={setIsShippingEdit}/>
                    )
                }
            </Suspense>
        </div>
    );
};

export default ShippingAddress;

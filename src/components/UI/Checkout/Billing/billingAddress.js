import React, { lazy, Suspense } from "react";
import Loader from "components/UI/loader";

const BillingEdit = lazy(() => import('components/UI/Checkout/Billing/billingEdit'));
const BillingForm = lazy(() => import('components/UI/Checkout/Billing/billingForm'));

const BillingAddress = (props) => {
    const {
        billingAddress,
        setBillingAddress,
        isBillingEdit,
        setIsBillingEdit
    } = props;

    return (
        <div className="checkout-address__billing">
            <h3 className="checkout-address__title typography__h3">Billing Address</h3>
            <Suspense fallback={<Loader/>}>
                {
                    isBillingEdit ? (
                        <BillingEdit
                            billingAddress={billingAddress}
                            setIsBillingEdit={setIsBillingEdit}/>
                    ) : (
                        <BillingForm
                            billingAddress={billingAddress}
                            setBillingAddress={setBillingAddress}
                            setIsBillingEdit={setIsBillingEdit}/>
                    )
                }
            </Suspense>
        </div>
    );
};

export default BillingAddress;

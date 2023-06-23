import React from "react";

import AuthForm from "components/UI/authForm";
import Button from "components/UI/button";

const CheckoutCustomer = (props) => {
    const { nextStepAction, updateOrder, customerData } = props;

    return (
        <div className="checkout-customer">
            <AuthForm/>

            {
                customerData.id &&
                <Button value="Volgende" type="dark" isArrowShow
                        onClick={() => {
                            updateOrder('customer_id', customerData.id);
                            nextStepAction()
                        }}/>
            }
        </div>
    );
};

export default CheckoutCustomer;

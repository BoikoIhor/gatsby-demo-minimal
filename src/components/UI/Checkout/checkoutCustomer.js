import React from "react";
import { useCustomer } from "context/customerContext";

import AuthForm from "components/UI/authForm";
import Button from "components/UI/button";

const CheckoutCustomer = (props) => {
    const { nextStepAction } = props;

    const { customerData } = useCustomer();

    return (
        <div className="checkout-customer">
            <AuthForm/>

            {
                customerData.id &&
                <Button value="Volgende" type="dark" isArrowShow
                        onClick={() => {
                            nextStepAction()
                        }}/>
            }
        </div>
    );
};

export default CheckoutCustomer;

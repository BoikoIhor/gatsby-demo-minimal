import React from "react";
import PropTypes from "prop-types";
import Button from "components/UI/button";

const BillingEdit = (props) => {
    const { billingAddress, setIsBillingEdit } = props;

    return (
        <>
            <div className="checkout-address__billing-edit typography__p">
                <span>{billingAddress.first_name} {billingAddress.last_name}</span>
                {
                    (billingAddress.company || billingAddress.phone) && (
                        <span>{billingAddress.company} {billingAddress.phone}</span>
                    )
                }
                {
                    billingAddress.email && (
                        <span>{billingAddress.email}</span>
                    )
                }
                <span>
                    {billingAddress.street_1}
                    {
                        billingAddress.street_2 && (
                            <>
                                &nbsp;/&nbsp;{billingAddress.street_2}
                            </>
                        )
                    }
                </span>
                <span>
                    {billingAddress.city}
                    {
                        billingAddress.state && (
                            <>
                                ,&nbsp;{billingAddress.state}
                            </>
                        )
                    }
                    {
                        billingAddress.zip && (
                            <>
                                ,&nbsp;{billingAddress.zip}&nbsp;/
                            </>
                        )
                    }
                    &nbsp;
                    {billingAddress.country}
                </span>
            </div>
            <Button value="Edit Billing Address" type="transparent"
                    onClick={() => setIsBillingEdit(false)}/>
        </>
    );
};

BillingEdit.propTypes = {
    billingAddress: PropTypes.object.isRequired,
    setIsBillingEdit: PropTypes.func.isRequired
}

export default BillingEdit;

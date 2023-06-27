import React from "react";
import PropTypes from "prop-types";
import { useCurrency } from "context/currencyContext";
import { useCheckout } from "context/checkoutContext";

import Button from "components/UI/button";

const ShippingEdit = (props) => {
    const { shippingAddress, setIsShippingEdit } = props;

    const { currency } = useCurrency();
    const { order } = useCheckout();

    const shippingCost = order?.base_shipping_cost;

    return (
        <>
            <div className="checkout-address__shipping-edit typography__p">
                <span>{shippingAddress.first_name} {shippingAddress.last_name}</span>
                {
                    (shippingAddress.company || shippingAddress.phone) && (
                        <span>{shippingAddress.company} {shippingAddress.phone}</span>
                    )
                }
                {
                    shippingAddress.email && (
                        <span>{shippingAddress.email}</span>
                    )
                }
                <span>
                    {shippingAddress.street_1}
                    {
                        shippingAddress.street_2 && (
                            <>
                                &nbsp;/&nbsp;{shippingAddress.street_2}
                            </>
                        )
                    }
                </span>
                <span>
                    {shippingAddress.city}
                    {
                        shippingAddress.state && (
                            <>
                                ,&nbsp;{shippingAddress.state}
                            </>
                        )
                    }
                    {
                        shippingAddress.zip && (
                            <>
                                ,&nbsp;{shippingAddress.zip}&nbsp;/
                            </>
                        )
                    }
                    &nbsp;
                    {shippingAddress.country}
                </span>
                {
                    shippingAddress.shipping_method && (
                        <span className="checkout-address__shipping-edit--method">
                            {shippingAddress.shipping_method}
                            <span className="checkout-address__shipping-edit--bold">
                                {shippingCost} {currency.token}
                            </span>
                        </span>
                    )
                }
            </div>
            <Button value="Edit Shipping Address" type="transparent"
                    onClick={() => setIsShippingEdit(false)}/>
        </>
    );
};

ShippingEdit.propTypes = {
    shippingAddress: PropTypes.object.isRequired,
    setIsShippingEdit: PropTypes.func.isRequired
}

export default ShippingEdit;

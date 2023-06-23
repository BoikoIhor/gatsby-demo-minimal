import React, { useEffect, useState } from "react";
import axios from "axios";

import CartSummary from "components/UI/Cart/cartSummary";
import ShippingAddress from "components/UI/Checkout/Shipping/shippingAddress";
import BillingAddress from "components/UI/Checkout/Billing/billingAddress";
import Input from "components/UI/input";
import Button from "components/UI/button";

const CheckoutAddress = (props) => {
    const { nextStepAction, customerData, updateOrder } = props;

    const [customerMessage, setCustomerMessage] = useState("");

    const [shippingAddress, setShippingAddress] = useState({
        first_name: "",
        last_name: "",
        address1: "",
        city: "",
        postal_code: "",
    });
    const [billingAddress, setBillingAddress] = useState({
        first_name: "",
        last_name: "",
        address1: "",
        city: "",
        postal_code: "",
    });

    const [isShippingEdit, setIsShippingEdit] = useState(false);
    const [isBillingEdit, setIsBillingEdit] = useState(false);

    useEffect(() => {
        if (!customerData.id) {
            return;
        }

        axios
            .get("/api/v3/customers/addresses", {
                params: {
                    "customer_id:in": customerData.id
                }
            })
            .then(response => {
                if (response.data.length) {
                    setShippingAddress({ ...response.data[0], email: customerData.email });
                    setBillingAddress(response.data[0]);
                } else {
                    const customerFields = {
                        first_name: customerData.first_name,
                        last_name: customerData.last_name,
                        phone: customerData.phone,
                        company: customerData.company
                    }

                    setShippingAddress({ ...shippingAddress, ...customerFields, email: customerData.email });
                    setBillingAddress({ ...billingAddress, ...customerFields });
                }
            });

    }, [customerData])

    const removeEmpty = (obj) => Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== null && v !== '')
    );

    return (
        <div className="checkout-address">
            <div className="checkout-address__content">
                <section className="checkout-address__content-column">
                    <ShippingAddress
                        shippingAddress={shippingAddress}
                        setShippingAddress={setShippingAddress}
                        setBillingAddress={setBillingAddress}
                        isShippingEdit={isShippingEdit}
                        setIsShippingEdit={setIsShippingEdit}
                        setIsBillingEdit={setIsBillingEdit}/>

                    {
                        isShippingEdit && (
                            <BillingAddress
                                billingAddress={billingAddress}
                                setBillingAddress={setBillingAddress}
                                isBillingEdit={isBillingEdit}
                                setIsBillingEdit={setIsBillingEdit}/>
                        )
                    }

                    <div className="address-inputs__row">
                        <Input
                            type="text"
                            placeholder="Order Comments"
                            className="checkout-address__comment"
                            name="customer_message"
                            value={customerMessage}
                            onChange={setCustomerMessage}
                            isSingleInput
                        />
                    </div>
                </section>

                <CartSummary/>
            </div>
            {
                isShippingEdit && isBillingEdit && (
                    <Button value="Volgende" type="dark"
                            className="checkout-address__button"
                            isArrowShow
                            onClick={() => {
                                updateOrder('billing_address', removeEmpty({
                                    first_name: billingAddress.first_name,
                                    last_name: billingAddress.last_name,
                                    company: billingAddress.company,
                                    street_1: billingAddress.address1,
                                    street_2: billingAddress.address2,
                                    city: billingAddress.city,
                                    state: billingAddress.state_or_province,
                                    zip: billingAddress.postal_code,
                                    country: billingAddress.country,
                                    country_iso2: billingAddress.country_code,
                                    phone: billingAddress.phone,
                                }));

                                updateOrder('shipping_addresses', [removeEmpty({
                                    first_name: shippingAddress.first_name,
                                    last_name: shippingAddress.last_name,
                                    company: shippingAddress.company,
                                    street_1: shippingAddress.address1,
                                    street_2: shippingAddress.address2,
                                    city: shippingAddress.city,
                                    state: shippingAddress.state_or_province,
                                    zip: shippingAddress.postal_code,
                                    country: shippingAddress.country,
                                    country_iso2: shippingAddress.country_code,
                                    phone: shippingAddress.phone,
                                    email: shippingAddress.email,
                                    shipping_method: shippingAddress.shipping_method
                                })]);

                                updateOrder('customer_message', customerMessage);

                                nextStepAction()
                            }}/>
                )
            }
        </div>
    );
};

export default CheckoutAddress;

import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { toast } from "react-toastify";
import { useCustomer } from "context/customerContext";
import { useCheckout } from "context/checkoutContext";

import AddressInputs from "components/UI/addressInputs";
import Button from "components/UI/button";
import Input from "components/UI/input";

const BillingForm = (props) => {
    const { billingAddress, setBillingAddress, setIsBillingEdit } = props;

    const { customerData } = useCustomer();
    const { countries } = useCheckout();

    const [isSaveAddress, setIsSaveAddress] = useState(!billingAddress.address1);

    useEffect(() => {
        setIsSaveAddress(!billingAddress.address1);
    }, [billingAddress])

    const onBillingSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const formAddress = Object.fromEntries(data.entries());
        const formBillingAddress = {
            ...formAddress,
            country: customerCountry,
        };

        setBillingAddress(formBillingAddress);

        if (isSaveAddress) {
            const promise = axios
                .post("/api/v3/customers/addresses", [{
                    customer_id: customerData.id,
                    ...formAddress,
                    address_type: 'residential',
                }])

            toast.promise(promise, {
                pending: 'Address is creating...',
                success: 'Address created',
                error: 'Address can\'t be created',
            }, {
                toastId: customerData.id,
            })
        }

        setIsBillingEdit(true);
    }

    const [customerCountry, setCustomerCountry] = useState("");
    const onCountryChange = (country) => {
        setCustomerCountry(country.name);
    }

    const countriesSelect = useMemo(() => [
        {
            value: '',
            name: 'Select a country*',
            disabled: true,
            hidden: true,
            selected: !billingAddress.country,
        },
        ...countries.map(country => ({
            value: country.country_iso2,
            name: country.country,
            selected: country.country === billingAddress.country
        }))
    ], [countries, billingAddress]);

    return (
        customerData.id && (
            <form onSubmit={onBillingSubmit} name="billing-address">
                <AddressInputs
                    defaultCustomerAddress={billingAddress}
                    customerId={customerData.id}
                    countriesSelect={countriesSelect}
                    onCountryChange={onCountryChange}
                    isEmail={false}
                />

                <Input
                    type="checkbox"
                    checked={isSaveAddress}
                    onChange={() => setIsSaveAddress(!isSaveAddress)}
                    placeholder="Save this address in my address book."
                />

                <Button className="checkout-address__submit"
                        value="Save Billing Address" type="dark" isArrowShow isSubmit/>
            </form>
        )
    );
};

BillingForm.propTypes = {
    billingAddress: PropTypes.object.isRequired,
    setBillingAddress: PropTypes.func.isRequired,
    setIsBillingEdit: PropTypes.func.isRequired
}

export default BillingForm;

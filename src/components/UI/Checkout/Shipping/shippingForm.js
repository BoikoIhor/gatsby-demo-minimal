import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import { toast } from "react-toastify";
import { useCurrency } from "context/currencyContext";
import { useCheckout } from "context/checkoutContext";
import { useCart } from "context/cartContext";

import AddressInputs from "components/UI/addressInputs";
import Button from "components/UI/button";
import Input from "components/UI/input";
import RadioField from "components/UI/Inputs/RadioField";
import Loader from "components/UI/loader";

const ShippingForm = (props) => {
    const {
        customerData,
        shippingAddress,
        setShippingAddress,
        setIsShippingEdit,
        setIsBillingEdit,
        setBillingAddress,
    } = props;

    const { currency } = useCurrency();
    const { shippingZones, updateOrder } = useCheckout();
    const { cartQty } = useCart();

    const [customerCountry, setCustomerCountry] = useState("");
    const [customerShippingMethod, setCustomerShippingMethod] = useState("");
    const [isSaveAddress, setIsSaveAddress] = useState(!shippingAddress.address1);
    const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(true);
    const [shippingMethods, setShippingMethods] = useState();
    const [isShippingLoading, setIsShippingLoading] = useState(false);

    useEffect(() => {
        setIsSaveAddress(!shippingAddress.address1);
    }, [shippingAddress])

    const countriesSelect = useMemo(() => [
        {
            value: '',
            name: 'Select a country*',
            disabled: true,
            hidden: true,
            selected: !shippingAddress.country,
        },
        ...shippingZones.map(zone => {
            // TODO handle type 'global', add all countries, if needed
            return zone.type === 'country' && {
                ...zone,
                value: zone.locations[0].country_iso2,
                selected: zone.name === shippingAddress.country
            }
        })
    ], [shippingAddress, shippingZones]);

    useEffect(() => {
        if (shippingMethods?.find((method) => method.name === customerShippingMethod.name)) {
            calculateShipping(customerShippingMethod);
        }
    }, [shippingMethods])

    const onCountryChange = async ({ id: zoneId, name }) => {
        if (!zoneId) {
            return;
        }
        setCustomerCountry(name);
        updateOrder('base_shipping_cost', null)

        setIsShippingLoading(true);
        axios
            .get("/api/v2/shipping/zones/zone_id/methods", { params: { zoneId } })
            .then((response) => setShippingMethods(response.data || []))
            .finally(() => setIsShippingLoading(false));
    }

    const onShippingSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formAddress = {
            ...Object.fromEntries(formData.entries()),
            country: customerCountry,
        };

        if (!formAddress.shipping_method) {
            toast.error('Please specify Shipping Method')
            return
        }

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

        setShippingAddress(formAddress);
        if (isBillingSameAsShipping) {
            let { email: _, ...formAddressWithoutEmail } = formAddress
            setBillingAddress(formAddressWithoutEmail);
            setIsBillingEdit(true)
        } else {
            setBillingAddress({
                first_name: "",
                last_name: "",
                address1: "",
                city: "",
                postal_code: "",
            });
        }

        setIsShippingEdit(true);
    }

    const calculateShipping = (method) => {
        switch (method.type) {
            case "peritem":
                updateOrder('base_shipping_cost', method.settings.rate * cartQty)
                break;
            case "perorder":
                updateOrder('base_shipping_cost', method.settings.rate)
                break;
            case "freeshipping":
            default:
                updateOrder('base_shipping_cost', 0)
        }
    }

    return (
        <form onSubmit={onShippingSubmit} name="shipping-address">
            {
                <AddressInputs
                    defaultCustomerAddress={shippingAddress}
                    customerId={customerData.id}
                    countriesSelect={countriesSelect}
                    onCountryChange={onCountryChange}/>
            }

            <div className="checkout-address__shipping-method">
                <h4 className="checkout-address__subtitle typography__title">Shipping Method</h4>
                {
                    !isShippingLoading ? (
                        shippingMethods ? (
                            shippingMethods.length > 0 ? (
                                shippingMethods.map((method, index) => (
                                    <RadioField
                                        key={index}
                                        className={"form__radio checkout-address__shipping-radio"}
                                        name="shipping_method"
                                        value={method.name}
                                        checked={customerShippingMethod && method.name === customerShippingMethod.name}
                                        onChange={() => {
                                            setCustomerShippingMethod(method)
                                            calculateShipping(method)
                                        }}
                                        required
                                    >
                                        <span className="typography__p">
                                            {method.settings.rate ?? 0} {currency.token}
                                        </span>
                                    </RadioField>
                                ))
                            ) : (
                                <p className="typography__p">
                                    Unfortunately one or more items in your cart can't be shipped to your location.
                                    Please choose a different delivery address.
                                </p>
                            )
                        ) : (
                            <p className="typography__p">
                                Please select a shipping address in order to see shipping quotes
                            </p>
                        )
                    ) : (
                        <Loader/>
                    )
                }
            </div>

            <Input
                type="checkbox"
                checked={isSaveAddress}
                onChange={() => setIsSaveAddress(!isSaveAddress)}
                placeholder="Save this address in my address book."
            />
            <Input
                type="checkbox"
                checked={isBillingSameAsShipping}
                onChange={() => setIsBillingSameAsShipping(!isBillingSameAsShipping)}
                placeholder="My billing address is the same as my shipping address."
            />

            <Button className="checkout-address__submit"
                    value="Save Shipping Address" type="dark" isArrowShow isSubmit/>
        </form>
    );
};

ShippingForm.propTypes = {
    shippingAddress: PropTypes.object.isRequired,
    setShippingAddress: PropTypes.func.isRequired,
    setIsShippingEdit: PropTypes.func.isRequired,
    setBillingAddress: PropTypes.func.isRequired
};

export default ShippingForm;

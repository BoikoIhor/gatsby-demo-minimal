import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useValidation from "hooks/useValidation";

import Input from "components/UI/input";
import Select from "components/UI/select";

import "styles/address-inputs.scss";

const AddressInputs = props => {
    const {
        customerId,
        defaultCustomerAddress,
        isCompany,
        isPhone,
        isAddressType,
        isAddress2,
        isStateOrProvince,
        isEmail,
        countriesSelect,
        onCountryChange
    } = props;

    const [customerAddress, setCustomerAddress] = useState({
        customer_id: customerId,
        first_name: "",
        last_name: "",
        city: "",
        country_code: "",
        address1: "",
        postal_code: "",
        ...defaultCustomerAddress
    });

    useEffect(() => {
        if (defaultCustomerAddress) {
            setCustomerAddress(defaultCustomerAddress)
        }
    }, [defaultCustomerAddress])

    const { validation } = useValidation();

    useEffect(() => {
        if (defaultCustomerAddress) {
            return
        }
        let updateObj = {};

        if (isCompany) {
            updateObj['company'] = "";
        }
        if (isPhone) {
            updateObj['phone'] = "";
        }
        if (isAddressType) {
            updateObj['address_type'] = "residential";
        }
        if (isAddress2) {
            updateObj['address2'] = "";
        }
        if (isStateOrProvince) {
            updateObj['state_or_province'] = "";
        }
        if (isEmail) {
            updateObj['email'] = "";
        }

        Object.keys(updateObj) && setCustomerAddress({...customerAddress, ...updateObj})
    }, [])

    return (
        <>
            <div className="address-inputs__row">
                <Input
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={customerAddress.first_name}
                    onChange={setCustomerAddress}
                    required
                />
                <Input
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={customerAddress.last_name}
                    onChange={setCustomerAddress}
                    required
                />
            </div>
            {
                isCompany && (
                    <div className="address-inputs__row">
                        <Input
                            type="text"
                            placeholder="Company"
                            name="company"
                            value={customerAddress.company}
                            onChange={setCustomerAddress}
                        />
                    </div>
                )
            }
            {
                isPhone && (
                    <div className="address-inputs__row">
                        <Input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={customerAddress.phone}
                            onChange={setCustomerAddress}
                        />
                    </div>
                )
            }
            <div className="address-inputs__row">
                <Input
                    type="text"
                    placeholder="Address"
                    name="address1"
                    value={customerAddress.address1}
                    onChange={setCustomerAddress}
                    required
                />
            </div>
            {
                isAddress2 && (
                    <div className="address-inputs__row">
                        <Input
                            type="text"
                            placeholder="Apartment/Suite/Building"
                            name="address2"
                            value={customerAddress.address2}
                            onChange={setCustomerAddress}
                        />
                    </div>
                )
            }
            <div className="address-inputs__row">
                <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={customerAddress.city}
                    onChange={setCustomerAddress}
                    required
                />
            </div>
            {
                countriesSelect && (
                    <div className="address-inputs__row">
                        <Select required name="country_code"
                                items={countriesSelect}
                                placeholder="Country"
                                onChange={(item) => {
                                    onCountryChange && onCountryChange(item)
                                }}/>
                    </div>
                )
            }
            <div className="address-inputs__row">
                {
                    isStateOrProvince && (
                        <Input
                            type="text"
                            placeholder="State/Province"
                            name="state_or_province"
                            value={customerAddress.state_or_province}
                            onChange={setCustomerAddress}
                        />
                    )
                }
                <Input
                    type="text"
                    placeholder="Postal Code"
                    name="postal_code"
                    value={customerAddress.postal_code}
                    onChange={setCustomerAddress}
                    required
                />
            </div>

            {
                isEmail && (
                    <div className="address-inputs__row">
                        <Input
                            type="email"
                            placeholder="Email"
                            validation={[validation.email]}
                            name="email"
                            value={customerAddress.email}
                            onChange={setCustomerAddress}
                        />
                    </div>
                )
            }
        </>
    );
};

AddressInputs.propTypes = {
    customerId: PropTypes.number.isRequired,
    isCompany: PropTypes.bool,
    isPhone: PropTypes.bool,
    isAddressType: PropTypes.bool,
    isAddress2: PropTypes.bool,
    isStateOrProvince: PropTypes.bool,
    isEmail: PropTypes.bool,
    countriesSelect: PropTypes.array,
    onCountryChange: PropTypes.func
};

AddressInputs.defaultProps = {
    isCompany: true,
    isPhone: true,
    isAddressType: false,
    isAddress2: true,
    isStateOrProvince: true,
    isEmail: true
};

export default AddressInputs;

import React, { useEffect, useMemo, useState } from "react";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import PropTypes from "prop-types";

import Input from "components/UI/input";

const MollieCard = (props) => {
    const {
        firstName: cardFirstName,
        lastName: cardLastName,
        setIsPlaceOrder,
        isSavePaymentMethod,
        setIsSavePaymentMethod
    } = props;

    const {
        meta,
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const [firstName, setFirstName] = useState(cardFirstName);
    const [lastName, setLastName] = useState(cardLastName);

    const [isFirstNameInvalid, setIsFirstNameInvalid] = useState(firstName !== "");
    const [isLastNameInvalid, setIsLastNameInvalid] = useState(lastName !== "");

    const cardMeta = useMemo(() => meta, [meta]);

    useEffect(() => {
        if (isFirstNameInvalid || isLastNameInvalid || !!cardMeta.error) {
            setIsPlaceOrder(false)
        } else if (!isFirstNameInvalid && !isLastNameInvalid && !cardMeta.error) {
            setIsPlaceOrder(true)
        }
    }, [isFirstNameInvalid, isLastNameInvalid, cardMeta])

    return (
        <div className="card-inputs">
            <h3 className="typography__h3">Card payment</h3>
            <p className="typography__p">Please fill in your card details</p>

            <PaymentInputsWrapper
                {...wrapperProps}
                className="card-inputs__card"
            >
                <svg {...getCardImageProps({ images })} />
                <input {...getCardNumberProps()} className="card-inputs__card-input"/>
                <input {...getExpiryDateProps()} className="card-inputs__card-input"/>
                <input {...getCVCProps()} className="card-inputs__card-input"/>
            </PaymentInputsWrapper>
            <Input
                type="text"
                placeholder="First Name on Card"
                className="card-inputs__firstName"
                name="firstName"
                value={firstName}
                onChange={setFirstName}
                required
                isSingleInput
                setIsShowError={setIsFirstNameInvalid}
            />
            <Input
                type="text"
                placeholder="Last Name on Card"
                className="card-inputs__lastName"
                name="lastName"
                value={lastName}
                onChange={setLastName}
                required
                isSingleInput
                setIsShowError={setIsLastNameInvalid}
            />
            <Input
                type="checkbox"
                className="card-inputs__checkbox"
                checked={isSavePaymentMethod}
                onChange={() => setIsSavePaymentMethod(!isSavePaymentMethod)}
                placeholder="Save payment method"
            />
        </div>
    );
};

MollieCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isPlaceOrder: PropTypes.bool.isRequired,
    setIsPlaceOrder: PropTypes.func.isRequired
}

MollieCard.defaultProps = {
    firstName: '',
    lastName: '',
}

export default MollieCard;

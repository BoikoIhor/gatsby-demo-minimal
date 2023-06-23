import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import OpenIcon from "images/svg/password-open-eye.svg";
import CloseIcon from "images/svg/password-close-eye.svg";
import CheckboxIcon from "images/svg/inline/checkbox.inline.svg";

import useValidation from "hooks/useValidation";

import "styles/input.scss";

const Input = (props) => {
    const { validation: validationMethod } = useValidation();

    const {
        type = "text",
        placeholder = "",
        id = "",
        name = "",
        onChange,
        value = "",
        validation = [validationMethod.notEmpty],
        message = "Please enter a valid " + placeholder,
        isShowPassword,
        setIsShowPassword,
        isPasswordInput,
        checked,
        required,
        className,
        isSingleInput = false,
        isFormTriggered = false,
        setIsShowError: setParentIsShowError
    } = props;

    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        if (isFormTriggered) {
            setIsTouched(true);
        }
    }, [isFormTriggered]);

    const changeHandler = (event, name, callback) => {
        if (type === "checkbox") {
            callback((prev) => !prev);
        } else {
            if (isSingleInput) {
                return callback(event.target.value);
            }

            callback((prev) => {
                return { ...prev, [name]: event.target.value };
            });
        }
    };

    const [isValid, setIsValid] = useState(true);
    const [isShowError, setIsShowError] = useState(false);

    useEffect(() => {
        setIsValid(validation.every((rule) => rule(value)))
    }, [value])

    useEffect(() => {
        const value = isTouched && !isValid;
        setIsShowError(value)
        setParentIsShowError && setParentIsShowError(value);
    }, [isTouched, isValid])

    if (type === "checkbox") {
        return (
            <label className={`form__checkbox ${className ? className : ""}`}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange && changeHandler(e, name, onChange)}
                    data-is-valid={checked}
                />
                <div className="checkbox">
                    <CheckboxIcon/>
                </div>
                <span>{placeholder + (required ? "*" : "")}</span>
            </label>
        );
    }

    return (
        <div className={`input-wrapper ${className ? className : ""}`}>
            <label className="input-label" htmlFor={name}>
                <p className={`placeholder typography__p ${value ? "smaller" : ""}`}>
                    {placeholder + (required ? "*" : "")}
                </p>
                <input
                    className={`${value ? "filled" : ""} ${isShowError ? "invalid" : ""}`}
                    type={isShowPassword ? "text" : type}
                    id={id || name}
                    name={name}
                    onChange={(e) => onChange && changeHandler(e, name, onChange)}
                    onBlur={(e) => setIsTouched(e.target.value !== "" || required)}
                    value={value}
                    data-is-valid={isValid}
                    required={required}
                ></input>
                {isPasswordInput && (<ReactSVG
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className="password-visibility"
                    src={isShowPassword ? CloseIcon : OpenIcon}
                />)}
            </label>
            <p className={`error-message typography__small--inter ${isShowError ? "" : "hidden"}`}>
                {message}
            </p>
        </div>
    );
};

export default Input;

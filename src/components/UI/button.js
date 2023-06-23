import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import buttonArrowIcon from "images/svg/buttonArrow.svg";
import buttonArrowIconDark from "images/svg/buttonArrowDark.svg";
import buttonArrowIconSmallDark from "images/svg/buttonArrowSmallDark.svg";
import "styles/button.scss";

const Button = (props) => {
    const {
        value,
        isArrowShow,
        isMobileHeaderBtn,
        iconBefore,
        type,
        href,
        onClick,
        isSubmit,
        isThin,
        className,
        ...restProps
    } = props;

    const arrowIconMap = {
        dark: buttonArrowIcon,
        light: buttonArrowIconSmallDark,
        transparent: buttonArrowIconDark,
    };

    const buttonClasses = 'button' +
        (isMobileHeaderBtn ? " headerBtn" : "") +
        (isArrowShow ? " button--arrow" : "") +
        (type ? ' ' + type : "") +
        (className ? ' ' + className : "");

    const ButtonTextWrapper = ({ children }) => href ? (
        <Link className={`button-link ${buttonClasses}`}
              to={href}
              {...restProps}>
            {children}
        </Link>
    ) : (
        <button
            className={buttonClasses}
            type={isSubmit ? "submit" : "button"}
            onClick={onClick}
            {...restProps}
        >
            {children}
        </button>
    );

    return (
        <ButtonTextWrapper>
            {iconBefore && <img src={iconBefore} alt="Icon"/>}
            {value && <span>{value}</span>}
            {isArrowShow && <img src={arrowIconMap[type]} alt="Arrow"/>}
        </ButtonTextWrapper>
    );
};

Button.propTypes = {
    value: PropTypes.string,
    isArrowShow: PropTypes.bool,
    isMobileHeaderBtn: PropTypes.bool,
    iconBefore: PropTypes.string,
    type: PropTypes.oneOf(["dark", "light", "transparent", "blue"]),
    href: PropTypes.string,
    onClick: PropTypes.func,
    isSubmit: PropTypes.bool,
    isThin: PropTypes.bool,
    className: PropTypes.string,
};

export default Button;

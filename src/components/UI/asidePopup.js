import React from "react";
import PropTypes from "prop-types";
import OutsideClickHandler from "react-outside-click-handler";
import { createPortal } from "react-dom";
import { useWindow } from "context/windowContext";

import { useScrollLock } from "hooks/useScrollLock";

import "styles/aside-popup.scss";

import CloseIcon from "images/svg/inline/closeIcon.inline.svg";

const AsidePopup = (props) => {
    const {
        className,
        isOpened,
        setClosed,
        isCloseButton,
        children,
        ...restProps
    } = props;

    const { document } = useWindow();

    useScrollLock(isOpened);

    return createPortal(
        <aside className={"aside__wrapper" + (isOpened ? " active" : "")}>
            <div className="aside__overlay"></div>
            <OutsideClickHandler onOutsideClick={() => isOpened && setClosed()}>
                <div
                    className={"aside" + (className ? " " + className : "")}
                    {...restProps}
                >
                    {isCloseButton && (
                        <div className="aside__close-container">
                            <CloseIcon className="aside__close" onClick={setClosed}></CloseIcon>
                        </div>
                    )}

                    <div className="aside__content">{children}</div>
                </div>
            </OutsideClickHandler>
        </aside>,
        document.body
    );
};

AsidePopup.propTypes = {
    className: PropTypes.string,
    isOpened: PropTypes.bool.isRequired,
    setClosed: PropTypes.func.isRequired,
    isCloseButton: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

AsidePopup.defaultProps = {
    className: "",
    isCloseButton: true,
};

export default AsidePopup;

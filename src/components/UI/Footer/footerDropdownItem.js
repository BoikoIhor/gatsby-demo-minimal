import React from "react";
import "../../../styles/dropdown.scss";
import DropdownArrow from "../../../images/svg/dropdownArrow.svg";
import FooterLink from "./footerLink";

const FooterDropdownItem = (props) => {
    const { links, title, contactsEmail, caller, isOpenTitle, setIsOpenTitle } = props;

    const isOpen = (isOpenTitle === title);
    const clickHandler = () => {
        if (isOpen) {
            setIsOpenTitle(null);
        } else {
            setIsOpenTitle(title);
        }
    };

    return (
        <div className="dropdown__item" onClick={clickHandler}>
            <div className="dropdown__item-button" >
                <p className="dropdown__item-button__title">{title}</p>
                <div className="dropdown__item-button__arrow-container">
                    <img
                        className={`dropdown-arrow ${isOpen ? "dropdown-arrow-active" : ""}`}
                        src={DropdownArrow}
                        alt={isOpen ? "Close" : "Open"}
                    />
                </div>
            </div>
            <div className={isOpen ? "dropdown__item-content" : "dropdown__item-content-close"}>
            {caller ? (
                <div className="footer-content-contacts">
                    <div className="footer-content-contacts-phones">
                        {links.map((phone) => (
                            <a key={phone.text} href={`tel:${phone.text}`}>
                                {phone.text}
                            </a>
                        ))}
                    </div>
                    <a
                        className="footer-content-contacts-email"
                        href={`mailto:${contactsEmail}`}
                    >
                        {contactsEmail}
                    </a>
                </div>
            ) : (
              <>
                    {links.map((link) => (
                        <FooterLink key={link.text} text={link.text} href={link.href} />
                    ))}
               </>
            )}
            </div>
        </div>
    );
};

export default FooterDropdownItem;

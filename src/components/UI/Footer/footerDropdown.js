import React, { useState } from "react";
import "../../../styles/dropdown.scss";
import FooterDropdownItem from "./footerDropdownItem";

const FooterDropdown = (props) => {
    const { footerLinks, contactsPhoneNumbers, contactsEmail, contactsTitle } = props;
    const [isOpenTitle, setIsOpenTitle] = useState(null);

    if (!footerLinks) {
        return;
    }

    return (
        <>
            {footerLinks.map((group, key) => (
                <FooterDropdownItem
                    key={key}
                    links={group.links}
                    title={group.title}
                    isOpenTitle={isOpenTitle}
                    setIsOpenTitle={setIsOpenTitle}
                />
            ))}
            <FooterDropdownItem
                caller={'contacts'}
                title={contactsTitle}
                links={contactsPhoneNumbers}
                contactsEmail={contactsEmail}
                isOpenTitle={isOpenTitle}
                setIsOpenTitle={setIsOpenTitle}
            />
        </>
    );
};

export default FooterDropdown;

import React from "react";
import FooterLink from "./footerLink";
import "../../../styles/footer.scss";

const FooterLinkGroup = (props) => {
  const { links, title } = props;
  return (
    <ul>
      <p className="link-group__title">{title}</p>
      {links.map((link) => (
        <FooterLink key={link.text} text={link.text} href={link.href} />
      ))}
    </ul>
  );
};

export default FooterLinkGroup;

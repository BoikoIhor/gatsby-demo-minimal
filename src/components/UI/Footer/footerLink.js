import React from "react";
import "../../../styles/footer.scss";
import { Link } from "gatsby";

const FooterLink = (props) => {
  const { text, href } = props;
  return (
    <li className="link-wrapper">
      <Link className="footer-link" to={href}>{text}</Link>
    </li>
  );
};
export default FooterLink;

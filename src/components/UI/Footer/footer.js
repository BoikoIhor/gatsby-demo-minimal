import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import "../../../styles/footer.scss";
import FooterLinkGroup from "./footerLinkGroup";
import FooterDropdown from "./footerDropdown";

export const footerQuery = graphql`
  query {
    contentfulFooterUpdated {
      logo {
        title
        file {
          url
        }
      }
      subscriptionTitle
      subscriptionInputPlaceholder
      linkGroupTitle1
      linkGroupTitle2
      subscriptionIcons {
        image {
          title
          file {
            url
          }
        }
      }
      footerLinkGroup1 {
        text
        href
      }
      footerLinkGroup2 {
        text
        href
      }
      contactsTitle
      contactsEmail
      contactsPhoneNumbers {
        text
      }
    }
  }
`;

const Footer = (props) => {
  const footerData = useStaticQuery(footerQuery);
  const {
    contactsEmail,
    contactsPhoneNumbers,
    contactsTitle,
    logo,
    subscriptionIcons,
    subscriptionTitle,
    subscriptionInputPlaceholder,
    footerLinkGroup1,
    footerLinkGroup2,
    linkGroupTitle1,
    linkGroupTitle2,
  } = footerData.contentfulFooterUpdated;

  const footerLinks = [
    {
      id: 1,
      links: footerLinkGroup1,
      title: linkGroupTitle1,
    },
    {
      id: 2,
      links: footerLinkGroup2,
      title: linkGroupTitle2,
    },
  ];

  const { className } = props;

  return (
    <footer className={`footer${className ? " " + className : ""}`}>
      <div className="footer-content">
        <div className="footer-content-subscriptions">
          <p className="subscription-title">{subscriptionTitle}</p>
          <div className="inputWrapper">
            <input
              className="subscription-input"
              placeholder={subscriptionInputPlaceholder}
              type="email"
            />
          </div>
          <div className="subscription-links">
            {subscriptionIcons.map((icon) => (
              <img
                src={icon.image.file.url}
                key={icon.image.title}
                alt={icon.image.title}
              />
            ))}
          </div>
        </div>
        <div className="wrapper">
            <div className="desktop">
                {footerLinks.map((group) => (
                    <FooterLinkGroup
                        key={group.id}
                        links={group.links}
                        title={group.title}
                    />
                ))}
                <div className="footer-content-contacts">
                    <p className="footer-content-contacts-title">{contactsTitle}</p>
                    <div className="footer-content-contacts-phones">
                        {contactsPhoneNumbers.map((phone) => (
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
            </div>
            <div className="mobile">
                <FooterDropdown
                    footerLinks={footerLinks}
                    contactsPhoneNumbers={contactsPhoneNumbers}
                    contactsEmail={contactsEmail}
                    contactsTitle={contactsTitle}
                />
                <div className="subscription-links-mobile">
                    {subscriptionIcons.map((icon) => (
                        <img
                            src={icon.image.file.url}
                            key={icon.image.title}
                            alt={icon.image.title}
                        />
                    ))}
                </div>
            </div>
        </div>
        <div className="footer-content-logo-container">
          <img
              className="footer-content-logo"
              src={logo.file.url}
              alt={logo.title}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

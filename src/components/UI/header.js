import React from "react";
import { useStaticQuery, graphql, navigate, Link } from "gatsby";
import useHeader from "hooks/useHeader";
import { useCart } from "context/cartContext";
import { useCustomer } from "context/customerContext";
import { useWindow } from "context/windowContext";

import Button from "components/UI/button";
import Megamenu from "components/UI/megamenu";
import PopupMegamenu from "components/UI/popupMegamenu";
import AuthForm from "components/UI/authForm";
import Image from "components/UI/image";
import AsidePopup from "components/UI/asidePopup";
import AsideBanner from "components/UI/asideBanner";
import "styles/header.scss";

export const headerQuery = graphql`
  query {
    contentfulHeaderUpdated {
      logo {
        title
        file {
          url
        }
      }
      userIcon {
        title
        file {
          url
        }
      }
      burgerIcon {
        title
        file {
          url
        }
      }
      cartIcon {
        title
        file {
          url
        }
      }
      headerButton {
        text
        type
        href
        isArrowShow
      }
       headerLinks {
        text
        href
      }
      megaMenuLinks {
        href
        text
        parentCategory
      }
    }
    allBigCommerceCategories {
      nodes {
        bigcommerce_id
        parent_id
        name
        description
        custom_url {
          url
        }
      }
    }
    allBigCommerceProducts {
      nodes {
        name
        custom_url {
          url
        }
        categories
        sku
      }
    }
  }
`;

const Header = (props) => {
  const { className } = props;
  const { document } = useWindow();
  const data = useStaticQuery(headerQuery);

  const {
    logo,
    userIcon,
    headerButton,
    headerLinks,
    burgerIcon,
    cartIcon,
    megaMenuLinks
  } = data.contentfulHeaderUpdated;

  const categories = data.allBigCommerceCategories.nodes;
  const products = data.allBigCommerceProducts.nodes;

  const {
    setMegamenuCategory,
    setCategoryHandler,
    rootCategories,
    subcategories,
    megamenuCategory,
    isShowPopup,
    setIsShowPopup,
    isShowLogin,
    setIsShowLogin,
    isOpenMegaMenu,
  } = useHeader({ categories, products, megaMenuLinks});

  const { customer } = useCustomer();

  const { cartQty, openCart } = useCart();

  const handleClick = () => {
      const element = document.getElementById("treatments-slider");
      element ?
          element.scrollIntoView({ behavior: "smooth", block: "center" }) :
          navigate(headerButton?.href);
  }

  return (
    <>
      <div
        className={`header-wrapper${className ? " " + className : ""}`}
        onMouseLeave={() => {
          setMegamenuCategory(null);
        }}
      >
        <div className="header-container">
          <header className="header">
            <div className="content-wrapper">
              <Link to="/">
                <img
                  className="content-wrapper__logo"
                  src={logo.file.url}
                  alt={logo.title}
                />
              </Link>
              <div className="header__content">
                <div className="header__content__links">
                  {rootCategories.map((link, key) => (
                    <div className="link-wrapper" key={key}>
                      <Link
                        className={`header__content__links--link ${
                          megamenuCategory === link.bigcommerce_id
                            ? "header__content__links--link--active"
                            : ""
                        }`}
                        to={link.custom_url.url}
                        onMouseEnter={() => setCategoryHandler(link.bigcommerce_id)}
                      >
                        <div>{link.name}</div>
                      </Link>
                    </div>
                  ))}
                    {headerLinks?.map((link, key) => (
                        <div className="link-wrapper" key={key}>
                            <Link
                                className="header__content__links--link"
                                to={link.href}
                                onMouseEnter={() => setMegamenuCategory(null)}
                            >
                                <div>{link.text}</div>
                            </Link>
                        </div>
                        )
                    )}
                </div>
                <div className="header__content--controls">
                  <div className="cartTrigger" onClick={openCart}>
                    <Image src={cartIcon.file.url} alt={cartIcon.title} />
                    {cartQty > 0 && (
                      <span className="cartTrigger__qty">{cartQty}</span>
                    )}
                  </div>
                  {customer ? (
                    <Link to="/my-account">
                      <img
                        className="accTrigger"
                        src={userIcon.file.url}
                        alt={userIcon.title}
                      />
                    </Link>
                  ) : (
                    <img
                      onClick={() => {
                        setMegamenuCategory(null);
                        setIsShowLogin(true);
                      }}
                      className="accTrigger"
                      src={userIcon.file.url}
                      alt={userIcon.title}
                    />
                  )}
                  <Button
                    className='start-nu-button'
                    value={headerButton.text}
                    type={headerButton.type}
                    isArrowShow={headerButton.isArrowShow}
                    onClick={handleClick}
                  />
                  <img
                    onClick={() => setIsShowPopup(true)}
                    className="burger"
                    src={burgerIcon.file.url}
                    alt={burgerIcon.title}
                  />
                </div>
              </div>
            </div>
            <div className="header__rounding" />
          </header>

          <div
            className={
              isOpenMegaMenu
                ? "show-megamenu-container"
                : "hidden-megamenu-container"
            }
          >
            <div
              className={`megamenu-container ${
                megamenuCategory ? "show-menu" : "hide-menu"
              }`}
            >
              <Megamenu
                megamenuCategoryID={megamenuCategory}
                subcategories={subcategories}
              />
            </div>
          </div>
        </div>
      </div>

      <PopupMegamenu
          categories={categories}
          products={products}
          rootCategories={rootCategories}
          setIsShowPopup={setIsShowPopup}
          setIsShowLogin={setIsShowLogin}
          isShowPopup={isShowPopup}
          cartIcon={cartIcon}
          userIcon={userIcon}
          headerLinks={headerLinks}
          megaMenuLinks={megaMenuLinks}
      />

      <AsidePopup
        isOpened={isShowLogin}
        setClosed={() => setIsShowLogin(false)}
      >
        <AuthForm
          afterAuth={() => {
            setIsShowLogin(false);
            navigate("/my-account");
          }}
        >
          <AsideBanner setClosed={() => setIsShowLogin(false)} />
        </AuthForm>
      </AsidePopup>

      {megamenuCategory && <div className="megamenu-shade" />}
    </>
  );
};
export default React.memo(Header);

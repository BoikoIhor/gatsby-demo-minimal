import React, { useState } from "react";
import { Link } from "gatsby";
import { useCart } from "context/cartContext";

import AsidePopup from "components/UI/asidePopup";
import Image from "components/UI/image";
import AsideBanner from "components/UI/asideBanner";

import BackIcon from "images/svg/popupBackIcon.svg";
import CloseIcon from "images/svg/closeIcon.svg";
import PopupCategoryArrow from "images/svg/popupCategoryArrow.svg";
import { useCustomer } from "../../context/customerContext";
import { exploreLinksMap } from "./megamenu";

const PopupMegamenu = (props) => {
    const {
        rootCategories,
        categories,
        products,
        setIsShowLogin,
        isShowPopup,
        setIsShowPopup,
        cartIcon,
        userIcon,
        headerLinks,
        megaMenuLinks
    } = props;

    const [activeCategory, setActiveCategory] = useState(null);
    const { cartQty, openCart } = useCart();
    const { customer } = useCustomer();

    const categoryResetHandler = () => {
        setActiveCategory(null);
    };
    const categorySetHandler = (id) => {
        setActiveCategory(id);
    };

    const subcategories = categories
        .filter((category) => category.parent_id === activeCategory)
        .map((category) => {
            const subcategoryItems = products.filter((product) =>
                product?.categories.includes(category.bigcommerce_id)
            );
            const subcategories = megaMenuLinks.map((item) => {
                    if (+item?.parentCategory === category.bigcommerce_id) {
                        return (
                            {
                                name: item.text,
                                custom_url: {
                                    url: item.href
                                }
                            }
                        );
                    }
                }
            ).filter(item => item);
            return { ...category, products: [...subcategoryItems, ...subcategories] };
        });

    const topLevelLayout = (
        <div className="popup-content__categories">
            {rootCategories.map((category, index) => {
                return (
                    <div
                        onClick={() => categorySetHandler(category.bigcommerce_id)}
                        className="category-item"
                        key={index}
                    >
                        <div className="category-item__name">
                            {category.name}
                            <img src={PopupCategoryArrow} alt={category.name}/>
                        </div>
                        <div className="category-item__description">
                            {category.description}
                        </div>
                    </div>
                );
            })}
            {headerLinks?.map((link, key) => (
                <Link className="category-item" to={link.href} key={key}>
                    <div className="category-item__name">
                        {link.text}
                        <img src={PopupCategoryArrow} alt={link.text}/>
                    </div>
                </Link>
                )
            )}
        </div>
    );

    const categoryExpandLayout = (
        <div className="popup-content__expanded">
            <div className="popup-content__expanded__section">
                <p className="popup-content__expanded__section--title">Explore</p>
                {activeCategory &&
                    exploreLinksMap[activeCategory].map((el, key) => (
                        <Link className="typography__p" to={el.href} key={key}>
                            {el.name}
                        </Link>
                    ))}
            </div>
            {subcategories.map((item, key) => {
                return (
                    <div
                        key={key}
                        className="popup-content__expanded__section"
                    >
                        <p className="popup-content__expanded__section--title">
                            {item.name}
                        </p>
                        {item?.products.map((product, key) => {
                            return (
                                <Link
                                    className="popup-content__expanded__section--link"
                                    key={key}
                                    to={product.custom_url.url}
                                >
                                    {product.name}
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    return (
        <AsidePopup isOpened={isShowPopup}
                    setClosed={() => setIsShowPopup(false)}
                    isCloseButton={false}
                    className="popup-megamenu-wrapper">
            <div className="popup-content">
                <div className="popup-content__controls">
                    <div onClick={categoryResetHandler} className="popup-content__controls--back">
                        {
                            activeCategory && (
                                <>
                                    <div className="svg-wrapper">
                                        <img src={BackIcon} alt="Back"/>
                                    </div>
                                    <span>vorige</span>
                                </>
                            )
                        }
                    </div>
                    <div className='popup-content__action-container'>
                        <div className="cartTrigger" onClick={() => {
                            setIsShowPopup(false)
                            openCart()
                        }}>
                            <Image src={cartIcon.file.url} alt={cartIcon.title}/>
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
                                    setIsShowPopup(false);
                                    setIsShowLogin(true);
                                }}
                                className="accTrigger"
                                src={userIcon.file.url}
                                alt={userIcon.title}
                            />
                        )}
                        <div className="popup-content__action-container-close-button">
                            <img onClick={() => setIsShowPopup(false)} src={CloseIcon} alt="X"/>
                        </div>
                    </div>
                </div>
                {
                    activeCategory ?
                        categoryExpandLayout :
                        topLevelLayout
                }
                <AsideBanner buttonText="Start nu" setClosed={() => setIsShowPopup(false)} />
            </div>
        </AsidePopup>
    );
};

export default PopupMegamenu;

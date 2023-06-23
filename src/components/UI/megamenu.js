import React from "react";
import "../../styles/header.scss";
import MegamenuImage from "../../images/megamenuImage.png";
import Button from "./button";
import { Link } from "gatsby";

export const exploreLinksMap = {
    24: [
        {
            id: 1,
            name: "See all hair",
            href: "/hair/",
        },
    ],
    25: [
        {
            id: 2,
            name: "Explore Erectile Dysfunction",
            href: "/sexual-health/have-better-sex/",
        },
        {
            id: 3,
            name: "Explore Premature Ejaculation",
            href: "/sexual-health/last-longer/",
        },
    ],
    26: [
        {
            id: 4,
            name: "See all products",
            href: "/category-all",
        },
    ],
};
const Megamenu = (props) => {
  const { subcategories, megamenuCategoryID } = props;

  return (
      <div className="megamenu-wrapper">
          <div className={`megamenu`}>
              <div className="megamenu__subcategory">
                  <p className="megamenu__subcategory--title">Explore</p>
                  {megamenuCategoryID &&
                      exploreLinksMap[megamenuCategoryID].map((el, key) => (
                          <Link className="typography__p" to={el.href} key={key}>
                              {el.name}
                          </Link>
                      ))}
              </div>
              {subcategories.map((row, key) => {
                  return (
                      <div className="megamenu__subcategory" key={key}>
                          <p className="megamenu__subcategory--title">{row.name}</p>
                          {row.products.map((product, key) => (
                              <Link
                                  className="megamenu__subcategory--link"
                                  to={product.custom_url.url}
                                  key={key}
                              >
                                  {product.name}
                              </Link>
                          ))}
                      </div>
                  );
              })}
          </div>
          <div className="megamenu__image-wrapper">
              <img
                  className="megamenu__image-wrapper--image"
                  src={MegamenuImage}
                  alt="Start nu"
              />
              <div className="megamenu__image-wrapper__content">
                  <p className="megamenu__image-wrapper__content--text">
                      Start a free consultation
                  </p>
                  <Button
                      value="Get started"
                      href="/questionnaire"
                      type="dark"
                      isArrowShow
                  />
              </div>
          </div>
      </div>
  );
};

export default Megamenu;

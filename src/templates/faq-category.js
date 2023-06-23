import React from "react";
import { ReactSVG } from "react-svg";

import IndexProvider from "context";
import Main from "components/Layout/main";
import { useWindow } from "context/windowContext";

import "styles/faq-page.scss";

import searchIcon from 'images/svg/search-icon.svg'

const FAQCategory = (props) => {
  const { pageContext } = props;
  return (
    <IndexProvider>
      <FaqCategoryWrapper pageContext={pageContext} />
    </IndexProvider>
  );
};

const FaqCategoryWrapper = (props) => {
  const { pageContext } = props;
  const { name, parentCategoryLink, links, asideLinks } = pageContext;

  const subcategories = new Set();
  links.forEach((item) => subcategories.add(item.parentCategoryFaq));
  const subcategoriesArr = [...subcategories];

  const { document } = useWindow();
  const currentUrl = document?.location?.href;

  const gtmData = {
    page: {
      title: "FAQ category",
      type: "Static",
    },
  };

  return (
    <>
      <Main className="faq-wrapper" gtmData={gtmData}>
        <div className="faq">
          <div className="faq__breadcrumbs">
            <span>
              <a className="faq__breadcrumbs--link" href="/faq">
                Wellis
              </a>
            </span>
            <span> / </span>
            <span>{name}</span>
          </div>
          <div className="faq__heading">
            <h2 className="faq__heading--title">{name}</h2>
            <label className="faq__heading--search-wrapper">
            <input
              className="faq__heading--search"
              type="text"
              placeholder="Type keywords"
            />
            <ReactSVG className="search-icon" src={searchIcon} />
            </label>
          </div>
          <div className="faq__category">
            <aside className="faq__category__aside">
              {asideLinks.map((link) => (
                <a
                  className={
                    currentUrl.includes(link.href) ? "link--active" : "link"
                  }
                  href={`/faq${link.href}`}
                >
                  {link.name}
                </a>
              ))}
            </aside>
            <div className="faq__category__articles">
              {subcategoriesArr.map((subcategory) => {
                const subcategoryLinks = links.filter(
                  (link) => link.parentCategoryFaq === subcategory
                );

                return (
                  <>
                    <h3 className="subcategory__title">{subcategory}</h3>
                    <div>
                      {subcategoryLinks.map((article) => {
                        return (
                          <div className="article">
                            <a
                              href={`/faq${parentCategoryLink}${article.href}`}
                            >
                              <h4 className="article__title">{article.text}</h4>
                            </a>
                            <p className="article__text">
                              {article.description.description}
                              <span>
                                <a
                                  href={`/faq${parentCategoryLink}${article.href}`}
                                  className="article__link"
                                >
                                  {" "}
                                  continue reading
                                </a>
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default FAQCategory;

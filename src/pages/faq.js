import React from "react";
import { ReactSVG } from "react-svg";
import { useStaticQuery, graphql } from "gatsby";
import IndexProvider from "context";

import Main from "components/Layout/main";

import "styles/faq-page.scss";

import searchIcon from "images/svg/search-icon.svg";

export const faqPageQuery = graphql`
  query FAQPageQuery {
    allContentfulFaqItem(sort: { fields: sortOrder }) {
      nodes {
        id
        name
        href
        image {
          title
          file {
            url
          }
        }
        links {
          id
          text
          href
          isFrequentLink
          description {
            description
          }
        }
      }
    }
  }
`;

const FAQPage = (props) => {
  const queryData = useStaticQuery(faqPageQuery);
    console.log(queryData);
    const faqMainCategories = queryData.allContentfulFaqItem.nodes;

  const links = queryData.allContentfulFaqItem.nodes;
  const mostFrequentLink = [];
  const linksForSearch = [];
  links.forEach((category) => {
    const linksWithParentUrl = category.links.map((link) => {
      return { ...link, parentCategoryLink: category.href };
    });
    linksForSearch.push(...linksWithParentUrl);
    const frequentLinks = linksWithParentUrl.filter(
      (link) => link.isFrequentLink
    );
    mostFrequentLink.push(...frequentLinks);
  });
  mostFrequentLink.length = 5;

  const gtmData = {
    page: {
      title: "FAQ",
      type: "Static",
    },
  };

  return (
    <>
      <IndexProvider>
        <Main className="faq-wrapper" gtmData={gtmData}>
          <div className="faq">
            <h1>Help center</h1>
            <p className="title">
              Everything you need to know about all the things
            </p>
            <label className="faq__heading--search-input-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Some words"
              />
              <ReactSVG className="search-icon" src={searchIcon} />
            </label>
            <div className="faq__content">
              {faqMainCategories.map((item) => {
                return (
                  <a href={`/faq${item.href}`}>
                    <div key={item.id} className="faq-category">
                      <img
                        className="faq-category__image"
                        src={item.image.file.url}
                        alt={item.image.title}
                      />
                      <p className="faq-category__title">{item.name}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <div className="most-frequent-question-wrapper">
            <div className="most-frequent-question">
              <h2 className="most-frequent-question--title">
                Frequently asked questions
              </h2>
              {mostFrequentLink.map((article) => {
                return (
                  <div className="article">
                    <a
                      href={`/faq${article.parentCategoryLink}${article.href}`}
                    >
                      <h4 className="article__title">{article.text}</h4>
                    </a>
                    <p className="article__text">
                      {article.description.description}
                      <span>
                        <a
                          href={`/faq${article.parentCategoryLink}${article.href}`}
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
          </div>
        </Main>
      </IndexProvider>
    </>
  );
};

export default FAQPage;

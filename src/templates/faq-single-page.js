import React from "react";
import "../styles/faq-page.scss";
import IndexProvider from "context";
import Main from "components/Layout/main";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { useWindow } from "context/windowContext";
import { useStaticQuery, graphql } from "gatsby";

const linkQuery = graphql`
query LinkQuery {
  allContentfulFooterUpdated {
    nodes {
      subscriptionIcons {
        image {
          title
          file {
            url
          }
        }
      }
    }
  }
}
`

const FAQSinglePage = (props) => {
  const { pageContext } = props;
  return (
    <IndexProvider>
      <FaqSinglePageWrapper pageContext={pageContext} />
    </IndexProvider>
  );
};

const FaqSinglePageWrapper = (props) => {
  const { pageContext } = props;

  const {
    name,
    authorAvatar,
    authorName,
    parentCategoryLink,
    parentCategoryName,
    publishDate,
    richText,
    subCategory,
    relatedLinks,
  } = pageContext;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const { document } = useWindow();
  const currentUrl = document?.location?.href;

  const linksData = useStaticQuery(linkQuery)
  const links = linksData. allContentfulFooterUpdated.nodes[0].subscriptionIcons

  const gtmData = {
    page: {
      title: "FAQ",
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
            <a
              className="faq__breadcrumbs--link"
              href={`/faq${parentCategoryLink}`}
            >
              <span>{parentCategoryName}</span>
            </a>
            <span> / </span>
            <span>{subCategory}</span>
          </div>
          <div className="faq__single-article">
            <aside className="faq__single-article__aside">
              <p className="faq__single-article__aside--title">
                articles in this topic
              </p>
              {relatedLinks.map((link) => {
                return (
                  <a
                    key={link.id}
                    className={` ${
                      currentUrl.includes(link.href)
                        ? "faq__single-article__aside--link--active"
                        : "faq__single-article__aside--link"
                    }`}
                    href={`/faq${parentCategoryLink}${link.href}`}
                  >
                    {link.text}
                  </a>
                );
              })}
            </aside>
            <div className="faq__single-article__article">
              <h3 className="faq__single-article__article--title">{name}</h3>
              <div className="faq__single-article__article--info">
                <img
                  src={authorAvatar.file.url}
                  className="article-avatar"
                  alt={authorAvatar.title}
                />
                <div className="article-text-wrapper">
                  <p>
                    Written by{" "}
                    <span className="article-text-wrapper__author">
                      {authorName}
                    </span>
                  </p>
                  <p>
                    published on <span>{formatDate(publishDate)}</span>
                  </p>
                </div>
              </div>
              <div className="faq__single-article__article--content">
                {renderRichText(richText)}
              </div>
              <div className="faq__single-article__article--chat-hours">
                <p className="text"><span className="heading">Live Chat:</span> Click the "Help" bubble at the bottom left.</p>
                <p className="text"> <span className="heading">Hours:</span> 7 days a week, 5AM to 8PM Pacific Time</p>
              </div>
              <div className="faq__single-article__article--social">
                {links.map(item => <img src={item.image.file.url} alt={item.image.title}/>)}
              </div>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default FAQSinglePage;

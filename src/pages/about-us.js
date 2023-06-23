import React from "react";
import Header from "../components/UI/header";
import Footer from "../components/UI/Footer/footer";
import { useStaticQuery, graphql } from "gatsby";
import WindowProvider from "context/windowContext";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import "../styles/about-us-page.scss";

export const contentfulPageQuery = graphql`
 query AboutUsQuery {
  allContentfulContentfulPage(filter: {name: {eq: "About Us"}}) {
    nodes {
      richText {
        raw
      }
      name
      bannerItems {
        type
        title
        image {
          file {
            url
          }
          title
        }
      }
    }
  }
}
`;

const AboutUs = (props) => {
    const queryData = useStaticQuery(contentfulPageQuery)
        ?.allContentfulContentfulPage?.nodes;
    const aboutUsData = queryData.filter(
        (page) => page.name === "About Us"
    )[0];

    return (
        <>
            <WindowProvider>
                <Header />
                <main className="about-us">
                    <div className="about-us__content">
                        {renderRichText(aboutUsData.richText)}
                        {aboutUsData?.bannerItems?.map((item) => {
                            return (
                                <div>
                                    <div key={item.id} className={`about-us__banner ${item.type}`}>
                                        <div className="about-us__image-container">
                                            <img
                                                className="about-us__image"
                                                src={item.image.file.url}
                                                alt={item.image.title}
                                            />
                                        </div>
                                        <div className="about-us__title-container">
                                            <p className="about-us__title">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
                <Footer />
            </WindowProvider>
        </>
    );
};

export default AboutUs;

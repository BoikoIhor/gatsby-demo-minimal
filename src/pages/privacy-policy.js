import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import IndexProvider from "context";

import Main from "components/Layout/main";

import "styles/terms-and-conditions.scss";

export const contentfulPageQuery = graphql`
  query ContentfulPagesQuery {
    allContentfulContentfulPage {
      nodes {
        richText {
          raw
        }
        name
      }
    }
  }
`;

const PrivacyPolicy = (props) => {
    const queryData = useStaticQuery(contentfulPageQuery)
        ?.allContentfulContentfulPage?.nodes;

    const privacyData = queryData.filter(
        (page) => page.name === "Privacy policy page"
    )[0];

    const gtmData = {
        page: {
            title: "Privacy policy",
            type: "Static",
        },
    };

    return (
        <>
            <IndexProvider>
                <Main className="terms-and-conditions" gtmData={gtmData}>
                    <div className="terms-and-conditions__content">
                        {renderRichText(privacyData.richText)}
                    </div>
                </Main>
            </IndexProvider>
        </>
    );
};

export default PrivacyPolicy;

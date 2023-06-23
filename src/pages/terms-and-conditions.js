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

const TermsAndConditions = (props) => {
    const queryData = useStaticQuery(contentfulPageQuery)
        ?.allContentfulContentfulPage?.nodes;

    const termsAndConditionsData = queryData.filter(
        (page) => page.name === "Terms and Conditions page"
    )[0];

    const gtmData = {
        page: {
            title: "Terms and Conditions",
            type: "Static",
        },
    };

    return (
        <>
            <IndexProvider>
                <Main className="terms-and-conditions" gtmData={gtmData}>
                    <div className="terms-and-conditions__content">
                        {renderRichText(termsAndConditionsData.richText)}
                    </div>
                </Main>
            </IndexProvider>
        </>
    );
};

export default TermsAndConditions;

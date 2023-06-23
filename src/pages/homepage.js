import React from "react";
import IndexProvider from "context";

import HtmlHead from "components/UI/htmlHead";
import Main from "components/Layout/main";
import HomepageHeroBanner from "components/UI/Homepage/homepageHeroBanner";
import HomepageContent from "components/UI/Homepage/homepageContent";

import "styles/homepage.scss";


const Homepage = (props) => {
    const gtmData = {
        page: {
            title: "Homepage",
            type: "Static"
        }
    }

    return (
        <IndexProvider>
            <HtmlHead title="Homepage"/>
            <Main className="homepage" gtmData={gtmData}>
                <HomepageHeroBanner/>
                <HomepageContent/>
            </Main>
        </IndexProvider>
    );
};

export default Homepage;

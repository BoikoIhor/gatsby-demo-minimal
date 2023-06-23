import React from "react";
import IndexProvider from "context";
import HtmlHead from "components/UI/htmlHead";
import Main from "components/Layout/main";

const NotFoundPage = () => {
    const gtmData = {
        page: {
            title: "Not found",
            type: "Static",
        },
    };

    return (
        <IndexProvider>
            <HtmlHead title="404: Not found" />
            <Main gtmData={gtmData}>
                <h1 className="typography__h1">404: Not Found</h1>
                <p className="typography__p">You just hit a route that doesn&#39;t exist... the sadness.</p>
            </Main>
        </IndexProvider>
    );
};

export default NotFoundPage;

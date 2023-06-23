import React from "react";
import IndexProvider from "context";

import Main from "components/Layout/main";
import ListpageContent from "components/UI/Listpage/listpageContent";

import 'styles/listpage.scss'


const Listpage = (props) => {
    const gtmData = {
        page: {
            title: "Category all",
            type: "Category",
        },
    };

    return (
        <IndexProvider>
            <Main className="listpage" gtmData={gtmData}>
                <h1 className="typography__h1 listpage__title">Onze producten</h1>
                <ListpageContent/>
            </Main>
        </IndexProvider>
    );
};

export default Listpage;

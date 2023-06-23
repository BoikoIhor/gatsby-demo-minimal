import React, { useEffect } from "react";
import { navigate } from "gatsby";
import IndexProvider from "context";
import { useCustomer } from "context/customerContext";

import Main from "components/Layout/main";
import MyAccountContent from "components/UI/myAccount/myAccountContent";

import "styles/my-account.scss";


const MyAccount = (props) => {
    const MyAccountWrapper = () => {
        const { customer } = useCustomer();

        useEffect(() => {
            if (!customer) {
                return navigate("/");
            }
        }, [customer])

        const gtmData = {
            page: {
                title: "My Account",
                type: "Account",
            },
        };

        return (
            customer && (
                <Main className="my-account" gtmData={gtmData}>
                    <MyAccountContent/>
                </Main>
            )
        )
    }

    return (
        <IndexProvider>
            <MyAccountWrapper/>
        </IndexProvider>
    );
};
export default MyAccount;

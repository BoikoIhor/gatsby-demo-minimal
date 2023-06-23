import React, { useEffect } from "react";
import { GTMPageViewEvent } from "components/GTM/gtmAllPages";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useCustomer } from "context/customerContext";

import Header from "components/UI/header";
import Footer from "components/UI/Footer/footer";

import "styles/main.scss";

const Main = (props) => {
    const { children, className, gtmData, isHeader, isFooter, ...restProps } = props;

    const { customer } = useCustomer();

    useEffect(() => {
        GTMPageViewEvent({
            user: {
                referral: process.env.GATSBY_BIGCOMMERCE_STOREFRONT_URL,
                loggedInStatus: customer ? 'Logged in' : 'Logged out',
                language: 'NL'
            },
            cookies: {
                cookieType: "functional",
            },
            ...gtmData,
        });
    }, []);

    return (
        <>
            {isHeader && <Header/>}
            <main className={`main${className ? ' ' + className : ''}`} {...restProps}>
                {children}
            </main>
            {isFooter && <Footer/>}


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                draggable
                theme="light"
            />
        </>
    );
};

Main.defaultProps = {
    isHeader: true,
    isFooter: true,
}

export default Main;

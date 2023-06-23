import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import LocaleProvider from "context/localeContext";

const CurrencyContext = createContext({});

export const useCurrency = () => {
    return useContext(CurrencyContext);
};

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState({});

    const getCurrencyRequest = async () => {
        const response =
            await axios.get("/api/v2/currencies");

        const currency =
            response.data.find(currency => currency.is_default && currency.enabled) ??
            response.data[0];

        setCurrency(currency);
    }

    useEffect(() => {
        getCurrencyRequest()
    }, [])

    return (
        <CurrencyContext.Provider
            value={{
                currency,
            }}
        >
            <LocaleProvider>
                {children}
            </LocaleProvider>
        </CurrencyContext.Provider>
    );
};

export default CurrencyProvider;
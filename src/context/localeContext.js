import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const LocaleContext = createContext({});

export const useLocale = () => {
    return useContext(LocaleContext);
};

const LocaleProvider = ({ children }) => {
    const [locale, setLocale] = useState({});

    const getLocaleRequest = async () => {
        const response =
            await axios.get("/api/v3/settings/store/locale");

        setLocale(response.data);
    }

    useEffect(() => {
        getLocaleRequest()
    }, [])

    return (
        <LocaleContext.Provider
            value={{
                locale,
            }}
        >
            {children}
        </LocaleContext.Provider>
    );
};

export default LocaleProvider;
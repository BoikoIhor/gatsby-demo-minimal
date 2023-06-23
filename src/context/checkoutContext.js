import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CheckoutContext = createContext({});

export const useCheckout = () => {
    return useContext(CheckoutContext);
};

const CheckoutProvider = ({ children }) => {
    const [order, setOrder] = useState();
    const [shippingZones, setShippingZones] = useState([]);
    const [countries, setCountries] = useState([]);

    const updateOrder = (key, value) => {
        setOrder((oldOrder) => {
            return {
                ...oldOrder,
                [key]: value
            }
        })
    }

    const getShippingZonesRequest = async () => {
        const response =
            await axios.get("/api/v2/shipping/zones");

        setShippingZones(response.data);
    }

    const getCountriesRequest = async () => {
        const response =
            await axios.get("/api/v2/countries");

        setCountries(response.data);
    }

    useEffect(() => {
        getShippingZonesRequest();
        getCountriesRequest();
    }, [])

    return (
        <CheckoutContext.Provider
            value={{
                order,
                updateOrder,
                shippingZones,
                countries
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutProvider;

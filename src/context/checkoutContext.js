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
    const [orderStatuses, setOrderStatuses] = useState([]);

    const updateOrder = (key, value) => {
        setOrder((oldOrder) => {
            return {
                ...oldOrder,
                [key]: value
            }
        })
    }

    const getShippingZonesRequest = () => {
        axios.get("/api/v2/shipping/zones")
             .then(response => setShippingZones(response.data));
    }

    const getCountriesRequest = () => {
        axios.get("/api/v2/countries")
            .then(response => setCountries(response.data));
    }

    const getOrderStatusesRequest = () => {
        axios.get("/api/v2/order_statuses")
             .then(response => setOrderStatuses(response.data));
    }

    useEffect(() => {
        getShippingZonesRequest();
        getCountriesRequest();
        getOrderStatusesRequest();
    }, [])

    return (
        <CheckoutContext.Provider
            value={{
                order,
                updateOrder,
                shippingZones,
                countries,
                orderStatuses
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutProvider;

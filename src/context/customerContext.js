import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useWindow } from "context/windowContext";

const CustomerContext = createContext({});

export const useCustomer = () => {
    return useContext(CustomerContext);
};

const CustomerProvider = ({ children }) => {
    const { localStorage } = useWindow();

    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer')));
    const [customerData, setCustomerData] = useState({});

    const updateLocalStorage = () => {
        customer ?
            localStorage.setItem("customer", JSON.stringify(customer)) :
            localStorage.removeItem("customer");
    }

    const getCustomerDataRequest = async () => {
        const response =
            await axios.get("/api/v3/customers", {
                params: {
                    'id:in': customer,
                    'include': 'addresses,storecredit,formfields'
                }
            });

        setCustomerData(response.data[0]);
    }

    const removeCustomer = () => {
        setCustomer(null);
        setCustomerData({});
        localStorage.removeItem("chatMessagesCount");
    };

    const updateCustomerData = () => {
        customer ?
            getCustomerDataRequest() :
            removeCustomer();
    }

    const updateCartCustomerId = () => {
        const customer_id = customer || 0;
        const cartId = JSON.parse(localStorage.getItem('cart'));
        if (!cartId) {
            return;
        }

        axios.put('/api/v3/carts/cartId', { customer_id }, {
            params: {
                cartId
            }
        });
    }

    useEffect(() => {
        updateLocalStorage()
        updateCustomerData()
        updateCartCustomerId()
    }, [customer])

    return (
        <CustomerContext.Provider
            value={{
                customer,
                customerData,
                setCustomer,
                removeCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

export default CustomerProvider;

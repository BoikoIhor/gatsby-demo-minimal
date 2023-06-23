import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCustomer } from "context/customerContext";
import { useWindow } from "context/windowContext";
import { graphql, useStaticQuery } from "gatsby";

const productQuery = graphql`
  query MyQuery {
    allBigCommerceProducts {
      nodes {
        bigcommerce_id
        name
        variants {
          id
          option_values {
            id
            option_display_name
            label
          }
        }
        images {
          url_thumbnail
          url_standard
        }
      }
    }
  }
`;

const useMyAccount = (props) => {
  const { customerData } = useCustomer();
  const { localStorage } = useWindow();

  const queryData = useStaticQuery(productQuery);
  const products = queryData.allBigCommerceProducts.nodes;

  const links = [
    {
      id: 1,
      title: "Account",
      href: "/",
    },
    {
      id: 2,
      title: "Bestellingen",
      href: "/",
    },
    {
      id: 3,
      title: "Betaling",
      href: "/",
    },
    {
      id: 4,
      title: "Technische problemen",
      href: "/",
    },
    {
      id: 5,
      title: "Iets anders",
      href: "/",
    },
  ];

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [countries, setCounries] = useState([]);
  const [isShowUpdateForm, setIsShowUpdateForm] = useState(false);
  const [activeOrderPageID, setActiveOrderPageID] = useState(null);
  const [ordersCountToShow, setOrdersCountToShow] = useState(3);
  const [chats, setChats] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});

  const readedMessages =
    JSON.parse(localStorage.getItem("chatMessagesCount")) || {};

  const [customerDetails, setCustomerDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
  });

  const getOrders = async () => {
    if (!customerData.id) {
      return;
    }

    try {
      const promise = await axios.get("/api/v2/orders", {
        params: {
          customer_id: customerData.id,
        },
      });
      setOrders(promise.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const getChats = useCallback(async () => {
    try {
      const response = await axios.get("/api/zendesk/chat/getmessages", {
        params: {
          customer_id: customerData.id,
        },
      });
      setChats(response.data);

      const entries = Object.entries(response.data) || [];
      const haveUnread = {};
      entries.forEach((item) => {
        if (
          readedMessages[item[0]] < item[1].count ||
          !readedMessages[item[0]]
        ) {
          if (!readedMessages[item[0]]) {
            localStorage.setItem(
              "chatMessagesCount",
              JSON.stringify({ ...readedMessages, [item[0]]: 1 })
            );
            haveUnread[item[0]] = item[1].count;
          } else {
            haveUnread[item[0]] = item[1].count - readedMessages[item[0]];
          }
        }
      });
      setUnreadMessages(haveUnread);
    } catch (error) {
      console.error(error);
    }
  }, [customerData.id]);

  const entries = useMemo(() => Object.entries(chats), [chats]);
  const unreadMessagesCount = Object.entries(unreadMessages).reduce(
    (acc, item) => {
      return acc + item[1];
    },
    0
  );

  const getAddresses = useCallback(async () => {
    if (!customerData.id) {
      return;
    }

    try {
      const promise = await axios.get("/api/v3/customers/addresses", {
        params: {
          "customer_id:in": customerData.id,
        },
      });
      setAddresses(promise?.data);
    } catch (e) {
      console.error(e);
    }
  }, [customerData.id, setAddresses]);

  const editCustomerHandler = async (e) => {
    e.preventDefault();
    try {
      const inputs = Array.from(e.target.querySelectorAll("input"));
      const isFormValid = inputs.every(
        (input) => input.getAttribute("data-is-valid") !== "false"
      );
      if (!isFormValid) {
        toast.error("Please enter valid credentials");
        return;
      }

      const requestBody = {
        ...customerDetails,
        id: customerData.id,
      };
      const promise = axios.put("/api/v3/customers", [requestBody]);

      await toast.promise(promise, {
        pending: "Updating...",
        success: "Successfully updated!",
        error: "Something went wrong!",
      });
      setIsShowUpdateForm(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getCountries = async () => {
    const response = await axios.get("/api/v2/countries");
    setCounries(response?.data || []);
  };

  const hidePopup = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowUpdateForm(false);
    }
  };

  const showMore = () => {
    setOrdersCountToShow((prev) => prev + 5);
  };

  const showLess = () => {
    setOrdersCountToShow(3);
  };

  useEffect(() => {
    getChats();
  }, [customerData, getChats]);

  useEffect(() => {
    const interval = setInterval(() => {
      getChats();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [getChats]);

  useEffect(() => {
    setCustomerDetails({
      first_name: customerData.first_name,
      last_name: customerData.last_name,
      email: customerData.email,
      company: customerData.company,
      phone: customerData.phone,
    });
  }, [customerData]);

  return {
    hidePopup,
    isShowUpdateForm,
    editCustomerHandler,
    orders,
    customerDetails,
    setCustomerDetails,
    links,
    products,
    setIsShowUpdateForm,
    activeOrderPageID,
    setActiveOrderPageID,
    ordersCountToShow,
    showMore,
    showLess,
    entries,
    setAddresses,
    getAddresses,
    addresses,
    countries,
    getOrders,
    getCountries,
    unreadMessages,
    unreadMessagesCount,
  };
};

export default useMyAccount;

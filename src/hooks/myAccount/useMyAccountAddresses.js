import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCustomer } from "context/customerContext";

const useMyAccountAddresses = (props) => {
  const { customerData } = useCustomer();
  const { addresses, countries, getAddresses, getOrders, getCountries } = props;

  const [isShowAddForm, setIsShowAddForm] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  const [editAddressFormData, setEditAddressFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    country_code: "",
    state_or_province: "",
    postal_code: "",
    id: "",
  });

  const openEditFormHandler = async (id) => {
    setIsShowEditForm(true);

    const currAddress = addresses.find((item) => item.id === id);

    setEditAddressFormData({
      first_name: currAddress.first_name || "",
      last_name: currAddress.last_name || "",
      company: currAddress.company || "",
      phone: currAddress.phone || "",
      address1: currAddress.address1 || "",
      address2: currAddress.address2 || "",
      city: currAddress.city || "",
      country_code: currAddress.country_code || "",
      state_or_province: currAddress.state_or_province || "",
      postal_code: currAddress.postal_code || "",
      id: currAddress.id || "",
    });
  };

  const deleteAddressHandler = async (id) => {
    try {
      const promise = axios.delete("/api/v3/customers/addresses", {
        params: {
          id,
        },
      });
      await toast.promise(promise, {
        pending: "Deleting...",
        success: "Address successfully deleted!",
        error: "Something went wrong!",
      });
      getAddresses();
    } catch (e) {
      console.error(e);
    }
  };

  const getStates = async (id, cb) => {
    try {
      const response = await axios.get("/api/v2/countries/states", {
        params: {
          country_id: id,
        },
      });

      cb(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAddresses();
    getOrders();
    getCountries();
  }, [customerData, getAddresses]);

  return {
    addresses,
    isShowAddForm,
    setIsShowAddForm,
    isShowEditForm,
    setIsShowEditForm,
    editAddressFormData,
    setEditAddressFormData,
    getAddresses,
    openEditFormHandler,
    deleteAddressHandler,
    countries,
    getStates,
  };
};

export default useMyAccountAddresses;

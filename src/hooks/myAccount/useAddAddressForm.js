import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const useAddAddressForm = (props) => {
  const {
    customerData,
    setIsShowAddForm,
    getAddresses,
    countries,
    getStates,
  } = props;

  const [isFormTriggered, setIsFormTriggered] = useState(false);

  const [addAddressFormData, setAddAddressFormData] = useState({
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
  });

  const [country, setCountry] = useState("");

  const [currentStates, setCurrentStates] = useState([]);

  const addAddressHandler = async (e) => {
    e.preventDefault();

    const inputs = Array.from(e.target.querySelectorAll("input"));
    const isFormValid = inputs.every(
      (input) => input.getAttribute("data-is-valid") !== "false"
    );

    if (!isFormValid || !addAddressFormData.country_code) {
      setIsFormTriggered(true);
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      const requestBody = {
        ...addAddressFormData,
        customer_id: customerData.id,
      };

      const promise = axios.post("/api/v3/customers/addresses", [requestBody]);

      await toast.promise(promise, {
        pending: "Adding...",
        success: "Address successfully added!",
        error: "Something went wrong!",
      });

      setIsShowAddForm(false);
      setIsFormTriggered(false);
      getAddresses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCountryChange = (event) => {
    setAddAddressFormData((prew) => {
      return { ...prew, country_code: event.target.value };
    });
    const currCountry = countries.find(
      (item) => item.country_iso2 === event.target.value
    );
    setCountry(currCountry);
  };

  const handleStateChange = (event) => {
    setAddAddressFormData((prew) => {
      return { ...prew, state_or_province: event.target.value };
    });
  };

  useEffect(() => {
    if (country?.id) {
      getStates(country.id, setCurrentStates);
    }
  }, [country]);

  return {
    addAddressHandler,
    handleCountryChange,
    handleStateChange,
    currentStates,
    isFormTriggered,
    addAddressFormData,
    setAddAddressFormData
  };
};

export default useAddAddressForm;

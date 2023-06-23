import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useEditAddressForm = (props) => {
  const {
    editAddressFormData,
    setIsShowEditForm,
    getAddresses,
    countries,
    getStates,
    setEditAddressFormData,
  } = props;

  const [isFormTriggered, setIsFormTriggered] = useState(false);
  const [country, setCountry] = useState(editAddressFormData.country_code);
  const [currentStates, setCurrentStates] = useState([]);

  const editAddressHandler = async (e) => {
    e.preventDefault();

    const inputs = Array.from(e.target.querySelectorAll("input"));
    const isFormValid = inputs.every(
      (input) => input.getAttribute("data-is-valid") !== "false"
    );

    if (!isFormValid || !editAddressFormData.country_code) {
      setIsFormTriggered(true);
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      const promise = axios.put("/api/v3/customers/addresses", [
        editAddressFormData,
      ]);

      await toast.promise(promise, {
        pending: "Updating...",
        success: "Address successfully updated!",
        error: "Something went wrong!",
      });
      setIsShowEditForm(false);
      setIsFormTriggered(false);
      getAddresses();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCountryChange = (event) => {
    setEditAddressFormData((prew) => {
      return { ...prew, country_code: event.target.value };
    });
    const currCountry = countries.find(
      (item) => item.country_iso2 === event.target.value
    );
    setCountry(currCountry);
  };

  const handleStateChange = (event) => {
    setEditAddressFormData((prew) => {
      return { ...prew, state_or_province: event.target.value };
    });
  };

  useEffect(() => {
    const currCountry = countries.find(
      (item) => item.country_iso2 === editAddressFormData.country_code
    );
    setCountry(currCountry);

    if (country?.id) {
      getStates(country.id, setCurrentStates);
    }
  }, [country, editAddressFormData.country_code]);

  return {
    isFormTriggered,
    editAddressHandler,
    handleCountryChange,
    currentStates,
    handleStateChange,
  };
};
export default useEditAddressForm;

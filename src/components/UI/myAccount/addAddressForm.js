import React from "react";
import Input from "components/UI/input";
import Button from "components/UI/button";
import useValidation from "hooks/useValidation";
import { useCustomer } from "context/customerContext";
import useAddAddressForm from "../../../hooks/myAccount/useAddAddressForm";

const AddAddressForm = (props) => {
  const {
    hidePopup,
    setIsShowAddForm,
    getAddresses,
    countries,
    getStates,
  } = props;

  const { validation } = useValidation();
  const { customerData } = useCustomer();

  const {
    addAddressHandler,
    handleCountryChange,
    handleStateChange,
    currentStates,
    isFormTriggered,
    addAddressFormData,
    setAddAddressFormData,
  } = useAddAddressForm({
    customerData,
    setIsShowAddForm,
    getAddresses,
    countries,
    getStates,
  });

  return (
    <div onClick={hidePopup} className="popup-wrapper">
      <div className="popup-wrapper__content">
        <form
          onSubmit={addAddressHandler}
          className="popup-wrapper__content__form"
        >
          <Input
            type="text"
            placeholder="First name"
            name="first_name"
            value={addAddressFormData.first_name}
            onChange={setAddAddressFormData}
            validation={[validation.notEmpty]}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            name="last_name"
            value={addAddressFormData.last_name}
            onChange={setAddAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Company"
            name="company"
            value={addAddressFormData.company}
            onChange={setAddAddressFormData}
            validation={[validation.allowEmpty]}
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="number"
            placeholder="Phone number"
            name="phone"
            value={addAddressFormData.phone}
            onChange={setAddAddressFormData}
            validation={[validation.phone, validation.allowEmpty]}
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="text"
            placeholder="Address"
            name="address1"
            value={addAddressFormData.address1}
            onChange={setAddAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Apartment/Suite/Building"
            name="address2"
            value={addAddressFormData.address2}
            onChange={setAddAddressFormData}
            validation={[validation.allowEmpty]}
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="text"
            placeholder="Suburb/City"
            name="city"
            value={addAddressFormData.city}
            onChange={setAddAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <div className="select-wrapper">
            <select
              className={
                isFormTriggered && !addAddressFormData.country_code
                  ? "invalid"
                  : ""
              }
              value={addAddressFormData.country_code}
              onChange={handleCountryChange}
            >
              <option defaultChecked disabled value="">
                Country*
              </option>
              {countries.map((country) => (
                <option value={country.country_iso2}>{country.country}</option>
              ))}
            </select>
            <p
              className={
                isFormTriggered && !addAddressFormData.country_code
                  ? "warning show"
                  : "warning"
              }
            >
              This field is required
            </p>
          </div>

          {currentStates.length ? (
            <div className="select-wrapper">
              <select
                className={
                  isFormTriggered && !addAddressFormData.state_or_province
                    ? "invalid"
                    : ""
                }
                value={addAddressFormData.state_or_province}
                onChange={handleStateChange}
              >
                <option defaultChecked disabled value="">
                  State/Province*
                </option>
                {currentStates.map((state) => (
                  <option value={state.state}>{state.state}</option>
                ))}
              </select>
              <p
                className={
                  isFormTriggered && !addAddressFormData.state_or_province
                    ? "warning show"
                    : "warning"
                }
              >
                This field is required
              </p>
            </div>
          ) : (
            <Input
              type="text"
              placeholder="State/Province*"
              name="state_or_province"
              value={addAddressFormData.state_or_province}
              onChange={setAddAddressFormData}
              validation={[validation.notEmpty]}
              message="This field is required"
              isFormTriggered={isFormTriggered}
            />
          )}

          <Input
            type="text"
            placeholder="Zip/Postcode*"
            name="postal_code"
            value={addAddressFormData.postal_code}
            onChange={setAddAddressFormData}
            validation={[validation.notEmpty]}
            message="This field is required"
            isFormTriggered={isFormTriggered}
          />
          <Button value="Add Address" type="dark" isArrowShow isSubmit />
          <Button value="Cancel" type="light" onClick={hidePopup} />
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;

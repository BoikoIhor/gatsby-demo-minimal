import React from "react";
import Input from "components/UI/input";
import Button from "components/UI/button";
import useValidation from "hooks/useValidation";

import useEditAddressForm from "../../../hooks/myAccount/useEditAddressForm";

const EditAddressForm = (props) => {
  const {
    editAddressFormData,
    setEditAddressFormData,
    setIsShowEditForm,
    getAddresses,
    hidePopup,
    countries,
    getStates,
  } = props;

  const { validation } = useValidation();
  const {
    isFormTriggered,
    editAddressHandler,
    handleCountryChange,
    currentStates,
    handleStateChange,
  } = useEditAddressForm({
    editAddressFormData,
    setIsShowEditForm,
    getAddresses,
    countries,
    getStates,
    setEditAddressFormData,
  });

  return (
    <div onClick={hidePopup} className="popup-wrapper">
      <div className="popup-wrapper__content">
        <form
          onSubmit={editAddressHandler}
          className="popup-wrapper__content__form"
        >
          <Input
            type="text"
            placeholder="First name"
            name="first_name"
            value={editAddressFormData.first_name}
            onChange={setEditAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Last name"
            name="last_name"
            value={editAddressFormData.last_name}
            onChange={setEditAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Company"
            name="company"
            value={editAddressFormData.company}
            onChange={setEditAddressFormData}
            validation={[validation.allowEmpty]}
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="number"
            placeholder="Phone number"
            name="phone"
            value={editAddressFormData.phone}
            onChange={setEditAddressFormData}
            validation={[validation.phone, validation.allowEmpty]}
            message="Enter valid phone number"
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="text"
            placeholder="Address"
            name="address1"
            value={editAddressFormData.address1}
            onChange={setEditAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Input
            type="text"
            placeholder="Apartment/Suite/Building"
            name="address2"
            value={editAddressFormData.address2}
            onChange={setEditAddressFormData}
            validation={[validation.allowEmpty]}
            isFormTriggered={isFormTriggered}
          />
          <Input
            type="text"
            placeholder="Suburb/City"
            name="city"
            value={editAddressFormData.city}
            onChange={setEditAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <div className="select-wrapper">
            <select
              className={
                isFormTriggered && !editAddressFormData.country_code
                  ? "invalid"
                  : ""
              }
              value={editAddressFormData.country_code}
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <option value={country.country_iso2}>{country.country}</option>
              ))}
            </select>
            <p
              className={
                isFormTriggered && !editAddressFormData.country_code
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
                  isFormTriggered && !editAddressFormData.state_or_province
                    ? "invalid"
                    : ""
                }
                value={editAddressFormData.state_or_province}
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
                  isFormTriggered && !editAddressFormData.state_or_province
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
              value={editAddressFormData.state_or_province}
              onChange={setEditAddressFormData}
              isFormTriggered={isFormTriggered}
              required
            />
          )}
          <Input
            type="text"
            placeholder="Zip/Postcode"
            name="postal_code"
            value={editAddressFormData.postal_code}
            onChange={setEditAddressFormData}
            isFormTriggered={isFormTriggered}
            required
          />
          <Button value="Update Address" type="dark" isArrowShow isSubmit />
          <Button value="Cancel" type="light" onClick={hidePopup} />
        </form>
      </div>
    </div>
  );
};
export default EditAddressForm;

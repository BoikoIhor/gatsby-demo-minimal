import React from "react";

import { ReactSVG } from "react-svg";
import { useScrollLock } from "hooks/useScrollLock";

import "styles/my-account.scss";
import DeleteIcon from "../../../images/svg/deleteBin.svg";
import EditIcon from "../../../images/svg/EditIcon.svg";
import AddIcon from "../../../images/svg/AddIcon.svg";

import AddAddressForm from "./addAddressForm";
import EditAddressForm from "./editAddressform";
import useMyAccountAddresses from "../../../hooks/myAccount/useMyAccountAddresses";

const MyAccountAddress = (props) => {
  const {
    setAddresses,
    addresses,
    countries,
    getOrders,
    getCountries,
    getAddresses,
  } = props;

  const {
    isShowAddForm,
    setIsShowAddForm,
    isShowEditForm,
    setIsShowEditForm,
    editAddressFormData,
    setEditAddressFormData,
    openEditFormHandler,
    deleteAddressHandler,
    getStates,
  } = useMyAccountAddresses({
    setAddresses,
    addresses,
    countries,
    getOrders,
    getCountries,
    getAddresses,
  });

  const hidePopup = (e) => {
    if (e.target === e.currentTarget) {
      setIsShowAddForm(false);
      setIsShowEditForm(false);
    }
  };

  useScrollLock(isShowAddForm || isShowEditForm);

  return (
    <>
      <h3 className="address__title">My Addresses</h3>
      <div className="address">
        {addresses.map((address) => {
          return (
            <div key={address.id} className="address-card">
              {address.first_name && <p>{address.first_name}</p>}
              {address.last_name && <p>{address.last_name}</p>}
              {address.phone && <p>{address.phone}</p>}
              {address.country && <p>{address.country}</p>}
              {address.sity && <p>{address.sity}</p>}
              {address.address1 && <p>{address.address1}</p>}
              {address.address2 && <p>{address.address2}</p>}
              {address.company && <p>{address.company}</p>}
              <ReactSVG
                onClick={() => openEditFormHandler(address.id)}
                className="address-card__edit"
                src={EditIcon}
              />
              <ReactSVG
                onClick={() => deleteAddressHandler(address.id)}
                className="address-card__delete"
                src={DeleteIcon}
              />
            </div>
          );
        })}
        <div
          onClick={() => setIsShowAddForm(true)}
          className="address-card__add"
        >
          <ReactSVG src={AddIcon} />
        </div>
      </div>

      {isShowAddForm && (
        <AddAddressForm
          hidePopup={hidePopup}
          setIsShowAddForm={setIsShowAddForm}
          getAddresses={getAddresses}
          countries={countries}
          getStates={getStates}
        />
      )}

      {isShowEditForm && (
        <EditAddressForm
          editAddressFormData={editAddressFormData}
          setEditAddressFormData={setEditAddressFormData}
          setIsShowEditForm={setIsShowEditForm}
          getAddresses={getAddresses}
          hidePopup={hidePopup}
          countries={countries}
          getStates={getStates}
        />
      )}
    </>
  );
};

export default MyAccountAddress;

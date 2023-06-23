import React from "react";
import "../../styles/dropdown.scss";
import DropdownArrow from "../../images/svg/dropdownArrow.svg";

const DropdownItem = (props) => {
  const { name, text, isOpenId, setIsOpenId, id } = props;
  const isOpenDropdown = (isOpenId === id);
  const clickHandler = () => {
      if (isOpenDropdown) {
          setIsOpenId(null);
      } else {
          setIsOpenId(id);
      }
  };

  return (
    <div className="dropdown__item" onClick={clickHandler}>
      <div className="dropdown__item-button" >
        <p className="dropdown__item-button__title">{name}</p>
        <div className="dropdown__item-button__arrow-container">
          <img
              className={`dropdown-arrow ${isOpenDropdown ? "dropdown-arrow-active" : ""}`}
              src={DropdownArrow}
              alt={isOpenDropdown ? "Close" : "Open"}
          />
        </div>
      </div>
      <p className={isOpenDropdown ? "dropdown__item-content" : "dropdown__item-content-close"}>{text}</p>
    </div>
  );
};

export default DropdownItem;

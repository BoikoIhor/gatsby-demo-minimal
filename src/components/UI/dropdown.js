import React, { useState } from "react";
import "../../styles/dropdown.scss";
import DropdownItem from "./dropdownItem";

const Dropdown = (props) => {
  const { items } = props;
  const [isOpenId, setIsOpenId] = useState(null);

  if (!items) {
    return;
  }

    return (
    <div className="dropdown">
      {items.map((el) => (
        <DropdownItem key={el.id} name={el.dropdownTitle} text={el.text} isOpenId={isOpenId} setIsOpenId={setIsOpenId} id={el.id} />
      ))}
    </div>
  );
};

export default Dropdown;

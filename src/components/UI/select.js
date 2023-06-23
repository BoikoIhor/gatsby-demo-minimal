import React, { useEffect, useState } from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import DropdownArrow from "images/svg/dropdownArrow.svg";

import "styles/select.scss";

const Select = (props) => {
    const { className, items=[], onChange, name, required, placeholder, ...restProps } = props;

    const [selectedItem, setSelectedItem] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        chooseOption(items.find(item => item.selected) ?? items[0])
    }, [items])

    const chooseOption = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onChange) {
            onChange(item);
        }
    };

    return (
        <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
            <div className={"select typography__p" + (className ? ' ' + className : '') + (isOpen ? ' active' : '')} {...restProps}>
                <div className="select__current" onClick={() => setIsOpen(!isOpen)}>
                    {selectedItem?.name}
                    <img className="select__current-arrow" src={DropdownArrow} alt={isOpen ? "Close" : "Open"}/>
                    {
                        placeholder &&
                        <p className="placeholder typography__p">
                            {placeholder}
                        </p>
                    }
                </div>
                <ul className="select__options">
                    {
                        items.map((item, index) => (
                            !item.disabled &&
                            <li key={index} className={selectedItem?.name === item.name ? 'selected' : ''}
                                onClick={() => chooseOption(item)}>
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
                <select name={name} required={required} tabIndex={-1} defaultValue={selectedItem?.value}>
                    {
                        items.map((item, index) => (
                            <option key={index}
                                    defaultChecked={item.selected}
                                    disabled={item.disabled}
                                    hidden={item.hidden}
                                    value={item.value ?? item.name}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </OutsideClickHandler>
    );
};

Select.propTypes = {
    className: PropTypes.string,
    items: arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        disabled: PropTypes.bool,
        hidden: PropTypes.bool,
    })).isRequired,
    onChange: PropTypes.func,
};

export default Select;

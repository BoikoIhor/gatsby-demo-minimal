import React, { useState } from 'react';
import { ReactSVG } from "react-svg";
import ArrowIcon from "../../../images/svg/dropdownArrow.svg";

const SelectField = ({ options, prices, price, className }) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [selectedPrice, setSelectedPrice] = useState(prices[0]);
    const [visible, setVisible] = useState(false);

    const handleDropdownClick = () => {
    setVisible(prevVisible => !prevVisible);
    };

    const handleOptionSelect = (option, price) => {
        setSelectedOption(option);
        setSelectedPrice(price);
        setVisible(prevVisible => !prevVisible);
    };

    return (
        <div className={`container ${className}`}>
        <div className="select-field typography__small" tabIndex="0">
            <div className="select-field__title" onClick={handleDropdownClick}>
                <span>
                    {selectedOption}
                </span>
                <div className='select-field__right'>
                    <div className="select-field__price">
                        {
                            price !== +(selectedPrice / parseInt(selectedOption, 10)).toFixed(0) &&
                            <p className="select-field__default-price">
                                ${price}
                            </p>
                        }
                        <p>
                            ${(selectedPrice / parseInt(selectedOption, 10)).toFixed(0)}/ea
                        </p>
                    </div>
                    <ReactSVG
                        className={`select-field__icon ${visible ? "select-field__icon--active" : ""}`}
                        src={ArrowIcon}
                    />
                </div>
            </div>
            <input type="hidden" name="Subscription" value={selectedOption} />
            { visible && (
                <ul className="select-field__dropdown">
                    {options.map((option, index) => (
                        <li key={index} id={option} onClick={() => handleOptionSelect(option, prices[index])}>
                            <span>
                                {option}
                            </span>
                            <div className="select-field__price">
                                {
                                    price !== +(prices[index] / parseInt(option, 10)).toFixed(0) &&
                                        <p className="select-field__default-price">
                                            ${price}
                                        </p>
                                }
                                <p>
                                    ${(prices[index] / parseInt(option, 10)).toFixed(0)}/ea
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
};

export default SelectField;

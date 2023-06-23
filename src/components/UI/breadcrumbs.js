import React from "react";
import {Link} from "gatsby";

import ArrowIcon from "images/svg/inline/sliderArrow.inline.svg";

import "styles/breadcrumbs.scss";

const Breadcrumbs = (props) => {
    const {className, items, currentLocation, active, setActive, ...restProps} = props;

    return (
        <ul className={'breadcrumbs' + (className ? ' ' + className : '')} {...restProps}>
            {
                items.map((item, index) => (
                    <li className="breadcrumbs__item typography__small" key={index}>
                        {
                            index > 0 &&
                            <ArrowIcon className="breadcrumbs__arrow"/>
                        }
                        {
                            item.name ? (
                                (!item.link || item.link === currentLocation) ?
                                    <span>{item.name}</span> :
                                    <Link to={item.link}>{item.name}</Link>
                            ) : (
                                <span className={
                                    (index + 1 === active ? "breadcrumbs__item--active" : "breadcrumbs__item--inactive") +
                                    (index + 1 > active ? " breadcrumbs__item--disabled" : "")}
                                      onClick={() => (index + 1 < active) && setActive(index + 1)}>
                                    {item}
                                </span>
                            )
                        }
                    </li>
                ))
            }
        </ul>
    );
};

export default Breadcrumbs;

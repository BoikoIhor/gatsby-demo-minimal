import React from "react";

import ArrowIcon from "images/svg/inline/sliderArrow.inline.svg";

import "styles/breadcrumbs.scss";

const Breadcrumbs = (props) => {
    const {
        className,
        items,
        currentLocation,
        active,
        setActive,
        ...restProps
    } = props;

    return (
        <ul className={'breadcrumbs' + (className ? ' ' + className : '')} {...restProps} data-step-active={active}>
            {
                items.map((item, index) => (
                    item.isAvailable && (
                        <li className="breadcrumbs__item typography__small" key={index}>
                            {
                                items.indexOf(items.find((i) => i.isAvailable)) < index &&
                                <ArrowIcon className="breadcrumbs__arrow"/>
                            }
                            <span className={(
                                index === active ? "breadcrumbs__item--active" : "breadcrumbs__item--inactive"
                            ) + (
                                index > active ? " breadcrumbs__item--disabled" : ""
                            )}
                                  onClick={() => (index < active) && setActive(index)}>
                                {item.name}
                            </span>
                        </li>
                    )
                ))
            }
        </ul>
    );
};

export default Breadcrumbs;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import "styles/quantity.scss";

const Quantity = (props) => {
    const { className, initial, min, max, onChange, onIncrease, onDecrease, ...restProps } = props;

    const [qty, setQty] = useState(initial);

    useEffect(() => {
        setQty(initial);
    }, [initial]);

    const changeQty = (prev, value) => {
        setQty(value);

        onChange && onChange(prev, value);
    };

    const increase = () => {
        onIncrease()
            .then(() => changeQty(qty, qty + 1));
    };

    const decrease = () => {
        onDecrease()
            .then(() => changeQty(qty, qty - 1));
    };

    return (
        <div className={"qty typography__p" + (className ? ' ' + className : '')} {...restProps}>
            <span className={`qty__decrease${qty < min ? ' inactive' : ''}`}
                  onClick={decrease}>
                -
            </span>
            <span className="qty__value">{qty}</span>
            <span className={`qty__increase${qty >= max ? ' inactive' : ''}`}
                  onClick={increase}>
                +
            </span>
        </div>
    );
};

Quantity.propTypes = {
    className: PropTypes.string,
    initial: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func,
};

Quantity.defaultProps = {
    initial: 1,
    min: 1,
    max: 10,
};

export default Quantity;

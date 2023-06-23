import React, { useState } from 'react';
import '../../../styles/quantity-selector.scss';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="quantity-selector">
      <input
        type="number"
        name="quantity"
        className="quantity-selector__input"
        value={quantity}
        readOnly
      />
      <button type="button" className="quantity-selector__button" onClick={handleDecrease}
              disabled={quantity <= 1}>
        -
      </button>
      <button type="button" className="quantity-selector__button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;

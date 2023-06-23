import * as React from 'react';

const Checkbox = ({
  name,
  className,
  required,
  elementId,
  value,
}) => {
  return (
    <label htmlFor={elementId} className={className}>
      <input
        id={elementId}
        type='checkbox'
        name={name}
        required={required}
      />
      <div className='checkbox'>
        <svg width='20px' height='20px' viewBox='0 0 20 20'>
          <path d='M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.000000,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z'></path>
          <polyline points='4 11 8 15 16 6'></polyline>
        </svg>
      </div>
      <span>{value}</span>
    </label>
  );
};

export default Checkbox;
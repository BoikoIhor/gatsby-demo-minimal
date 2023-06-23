import * as React from 'react';
import '../../../styles/questionnaire.scss';

const RadioField = ({ name, className, checked, required, value, label, onChange, defaultChecked, children }) => {
  const handleChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <label className={className}>
      <input
        type='radio'
        value={value}
        name={name}
        onChange={handleChange}
        defaultChecked={defaultChecked}
        checked={checked}
        required={required}
      />
      <p className="radio-value typography__small">
          <span>{label ?? value}</span>
          <span className='typography__sub-text'>{children}</span>
      </p>
    </label>
  );
};

export default RadioField;

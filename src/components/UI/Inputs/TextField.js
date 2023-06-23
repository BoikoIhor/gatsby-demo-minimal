import * as React from 'react';

const TextField = ({
  name,
  className,
  placeholder,
  required,
  elementId,
}) => {
  return (
    <input
      id={elementId}
      type='text'
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextField;

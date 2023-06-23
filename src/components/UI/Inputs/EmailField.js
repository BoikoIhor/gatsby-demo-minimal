import * as React from 'react';

const EmailField = ({
  name,
  className,
  placeholder,
  required,
  elementId,
}) => {
  return (
    <>
      <input
        id={elementId}
        type='email'
        placeholder={placeholder}
        className={className}
      />
    </>
  );
};

export default EmailField;

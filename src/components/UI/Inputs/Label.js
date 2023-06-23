import * as React from 'react';

const Label = ({ text, elementId, className }) => {
  return (
    <label className={className} htmlFor={elementId}>
      {text}
    </label>
  );
};

export default Label;

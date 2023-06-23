import * as React from 'react';
import '../../../styles/questionnaire.scss';

const TextArea = ({
  name,
  className,
  placeholder,
  elementId,
  required,
  ref
}) => {
  return (
    <textarea
      id={elementId}
      type='text'
      placeholder={placeholder}
      className={className}
      ref={ref}
    />
  );
};

export default TextArea;

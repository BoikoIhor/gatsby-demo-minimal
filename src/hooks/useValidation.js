import React from "react";

const useValidation = () => {
  const validation = {
    notEmpty: (value) => value && value.trim().length > 0,
    email: (value) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)),
    password: (value)=> (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)),
    phone:(value) => (/^[+]?[\d\s-]{3,}$/.test(value)),
    allowEmpty: (value) => value === "" || !!value
  };

  return {
    validation,
  };
};

export default useValidation;

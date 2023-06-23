import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useCustomer } from "context/customerContext";

const useAuthForm = (props) => {
  const { afterAuth } = props;

  const { setCustomer } = useCustomer();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [signUpFormData, setSignUpFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    channel_id: 1,
  });

  const createAccountRequest = {
    method: "POST",
    url: "/api/v3/customers",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: signUpFormData,
  };

  const loginCustomer = async (e) => {
    e.preventDefault();
    const inputs = Array.from(e.target.querySelectorAll("input"));
    const isFormValid = inputs.every(
      (input) => input.getAttribute("data-is-valid") !== "false"
    );
    if (!isFormValid) {
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      const promise = axios
        .post("/api/v3/customers/validate-credentials", signInFormData)
        .then((response) => {
          if (response.status === 200) {
            if (!response?.data?.is_valid) {
              toast.error("Please enter valid credentials");
              return;
            }

            setCustomer(response.data.customer_id);
            toast.success("You are logged in!");
            afterAuth && afterAuth();
          }
        });

      await toast.promise(promise, {
        pending: "Signing in...",
        error: "Wrong credentials!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createCustomer = async (e) => {
    e.preventDefault();

    const inputs = Array.from(e.target.querySelectorAll("input"));
    const isFormValid = inputs.every(
      (input) => input.getAttribute("data-is-valid") !== "false"
    );

    if (!isFormValid && !isFormValid) {
      toast.error(
        "Please enter valid credentials and read end accept our Terms & Condidions"
      );
      return;
    }

    if (!isTermsChecked) {
      toast.error("Please read end accept our Terms & Condidions");
      return;
    }

    if (!isFormValid) {
      toast.error("Please enter valid credentials");
      return;
    }

    try {
      const promise = axios(createAccountRequest).then((response) => {
        if (response.status === 200) {
          setCustomer(response.data.data[0].id);

          afterAuth && afterAuth();
        }
      });

      await toast.promise(promise, {
        pending: "Creating account...",
        success: "Account successfully created!",
        error: "Something went wrong!",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    createCustomer,
    loginCustomer,
    isShowPassword,
    setIsShowPassword,
    isTermsChecked,
    setIsTermsChecked,
  };
};

useAuthForm.propTypes = {
  afterAuth: PropTypes.func,
};

export default useAuthForm;

import React from "react";
import useAuthForm from "hooks/useAuthForm";
import useValidation from "hooks/useValidation";

import Button from "components/UI/button";
import Input from "components/UI/input";

import "styles/auth-form.scss";

const SignUpForm = (props) => {
    const { afterAuth, setIsSignInLayout } = props;

    const {
        signUpFormData,
        setSignUpFormData,
        createCustomer,
        isShowPassword,
        setIsShowPassword,
        isTermsChecked,
        setIsTermsChecked
    } = useAuthForm({ afterAuth });

    const { validation } = useValidation();

    return (
        <>
            <h2 className="auth__heading typography__h2">
                Create account
            </h2>
            <p className="auth__description">
                Fill in your details to access and manage your subscription
            </p>
            <form
                onSubmit={createCustomer}
                className="auth__form"
            >
                <Input
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    value={signUpFormData.first_name}
                    onChange={setSignUpFormData}
                    required
                />
                <Input
                    type="text"
                    placeholder="Last name"
                    name="last_name"
                    value={signUpFormData.last_name}
                    onChange={setSignUpFormData}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={signUpFormData.email}
                    onChange={setSignUpFormData}
                    validation={[validation.email]}
                    required
                />
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={signUpFormData.password}
                    onChange={setSignUpFormData}
                    validation={[validation.password]}
                    message="Password must contain at least 8 characters, 1 number, 1 uppercase character and 1 uppercase character"
                    isShowPassword={isShowPassword}
                    setIsShowPassword={setIsShowPassword}
                    isPasswordInput
                    required
                />
                <Input
                    type="checkbox"
                    value={isTermsChecked}
                    checked={isTermsChecked}
                    onChange={setIsTermsChecked}
                    placeholder={
                        'I agree with privacy policy and terms'
                    }
                    validation={[validation.allowEmpty]}
                />
                <Button value="Register" type="dark" isArrowShow isSubmit/>
            </form>
            {
                setIsSignInLayout &&
                <div className="auth__create-account">
                    <p className="text">
                        Already have account?{" "}
                        <span className="link" onClick={() => setIsSignInLayout(true)}>
                            Sign in
                        </span>
                    </p>
                </div>
            }
        </>
    );
};

export default SignUpForm;

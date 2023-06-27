import React from "react";
import useAuthForm from "hooks/useAuthForm";
import useValidation from "hooks/useValidation";

import Button from "components/UI/button";
import Input from "components/UI/input";

import "styles/auth-form.scss";

const SignInForm = (props) => {
    const { afterAuth, setIsSignInLayout, isQuestionnaire } = props;

    const {
        signInFormData,
        setSignInFormData,
        loginCustomer,
        isShowPassword,
        setIsShowPassword,
    } = useAuthForm({ afterAuth });

    const { validation } = useValidation();

    return (
        <>
            <h2 className="auth__heading typography__h2">
                { isQuestionnaire ? "Login into your account" : "Welcome back" }
            </h2>
            <p className="auth__description">
                Fill in your details to access and manage your subscription
            </p>
            <form onSubmit={loginCustomer} className="auth__form">
                <Input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={signInFormData.email}
                    onChange={setSignInFormData}
                    validation={[validation.email]}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={signInFormData.password}
                    onChange={setSignInFormData}
                    validation={[validation.password]}
                    message="Password must contain at least 8 characters, 1 number, 1 uppercase character and 1 uppercase character"
                    isShowPassword={isShowPassword}
                    setIsShowPassword={setIsShowPassword}
                    isPasswordInput
                />
            <div className="auth__forgot-password">
                <p>Forgot password</p>
            </div>
                <Button value="Login" type="dark" isArrowShow isSubmit/>
            </form>
            {setIsSignInLayout && (
                <div className="auth__create-account">
                    <p className="text">
                        First time here?{" "}
                        <span className="link" onClick={() => setIsSignInLayout(false)}>
                            Create an account
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default SignInForm;

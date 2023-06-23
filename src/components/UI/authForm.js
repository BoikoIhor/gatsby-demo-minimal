import React, { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import { useCustomer } from "context/customerContext";

import Loader from "components/UI/loader";

import "styles/auth-form.scss";
import Button from "./button";

const SignInForm = lazy(() => import('components/UI/signInForm'));
const SignUpForm = lazy(() => import('components/UI/signUpForm'));

const AuthForm = (props) => {
    const { afterAuth, children } = props;
    const { customer, customerData, removeCustomer } = useCustomer()

    const [isSignInLayout, setIsSignInLayout] = useState(true);

    return (
        <div className="auth-wrapper">
            {
                customer ? (
                    Object.keys(customerData).length ? (
                        <>
                            <h3 className="typography__h3">
                                Welcome {customerData.first_name} {customerData.last_name}. You're already logged!
                            </h3>
                            <Button className="auth-wrapper__button" type="transparent" value="Log Out"
                                    onClick={removeCustomer}/>
                        </>
                    ) : (
                        <Loader/>
                    )
                ) : (
                    <>
                        <Suspense fallback={<Loader/>}>
                            {isSignInLayout ?
                                <SignInForm afterAuth={afterAuth} setIsSignInLayout={setIsSignInLayout}/> :
                                <SignUpForm afterAuth={afterAuth} setIsSignInLayout={setIsSignInLayout}/>
                            }
                        </Suspense>
                        {children}
                    </>
                )
            }
        </div>
    );
};

AuthForm.propTypes = {
    afterAuth: PropTypes.func,
    children: PropTypes.node
}

export default AuthForm;

import React from 'react';
import PropTypes from "prop-types";

const CheckoutStep = props => {
    const { activeStep, currentStep, children } = props;

    return (
        <div className={"checkout__step" + (activeStep === currentStep ? " checkout__step--active" : "")}
             data-step={currentStep}>
            {
                (activeStep >= currentStep) && (
                    children
                )
            }
        </div>
    );
};

CheckoutStep.propTypes = {
    activeStep: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
}

export default CheckoutStep;

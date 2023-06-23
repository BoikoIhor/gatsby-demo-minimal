import React from 'react';
import PropTypes from 'prop-types';

import "styles/loader.scss";

import LoaderIcon from "images/svg/inline/loader.inline.svg";

const Loader = props => {
    const {isLoading} = props;

    return (
        isLoading &&
        <div className="loader">
            <LoaderIcon/>
        </div>
    );
};

Loader.propTypes = {
    isLoading: PropTypes.bool
};

Loader.defaultProps = {
    isLoading: true
}

export default Loader;
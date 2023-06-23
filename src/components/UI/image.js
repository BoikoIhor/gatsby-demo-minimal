import React from 'react';
import PropTypes from 'prop-types';
import { useWindow } from 'context/windowContext';

const Image = ({ src, alt, className, ...props }) => {
    const { console } = useWindow();

    const handleImgLoadingError = (e) => {
        console.warn(`Image with name "${src}" does not exist, target: `, e.target);
        // e.target.src = '/images/default.png'; // TODO Add default image
        e.target.src = 'https://via.placeholder.com/500x500'
    };

    return (
        <img src={`${src}`} alt={alt} className={className}
             onError={(e) => handleImgLoadingError(e)}
             {...props}/>
    );
};

Image.defaultProps = {
    alt: 'default placeholder image',
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

export default Image;

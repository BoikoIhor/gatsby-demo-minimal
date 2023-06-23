import React, { useEffect } from 'react';

const MollieApplepay = (props) => {
    const { setIsPlaceOrder } = props;
    useEffect(() => {
        // setIsPlaceOrder(true);
    }, []);

    return (
        <div>
            <h3 className="typography__h3">Apple pay payment</h3>
            <p className="typography__p">No additional data required</p>
        </div>
    );
};

export default MollieApplepay;

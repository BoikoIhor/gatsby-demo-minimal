import React, { useEffect } from 'react';

const MollieSofort = (props) => {
    const { setIsPlaceOrder } = props;
    useEffect(() => {
        // setIsPlaceOrder(true);
    }, []);

    return (
        <div>
            <h3 className="typography__h3">Sofort payment</h3>
            <p className="typography__p">No additional data required</p>
        </div>
    );
};

export default MollieSofort;

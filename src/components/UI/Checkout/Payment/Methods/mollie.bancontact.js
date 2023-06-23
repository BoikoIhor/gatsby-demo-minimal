import React, { useEffect } from 'react';

const MollieBancontact = (props) => {
    const { setIsPlaceOrder } = props;
    useEffect(() => {
        // setIsPlaceOrder(true);
    }, []);

    return (
        <div>
            <h3 className="typography__h3">Bancontact payment</h3>
            <p className="typography__p">No additional data required</p>
        </div>
    );
};

export default MollieBancontact;

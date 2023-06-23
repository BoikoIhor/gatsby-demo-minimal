import React from 'react';

import Button from "components/UI/button";
import Image from "components/UI/image";

import MegamenuImage from "images/megamenuImage.png";

const AsideBanner = props => {
    const { buttonText, setClosed, ...restProps } = props;

    return (
        <div className="aside-banner">
            <Image src={MegamenuImage} className="aside-banner__background"/>
            <div className="aside-banner__content">
                <p className="aside-banner__content-heading">
                    Start a free consultation
                </p>
                <Button type="dark" href="/questionnaire" isArrowShow value={buttonText} onClick={() => setClosed()}
                        className={
                            buttonText ?
                                "aside-banner__content-button" :
                                "aside-banner__content-button--empty"
                        }/>
            </div>
        </div>
    );
};

export default AsideBanner;

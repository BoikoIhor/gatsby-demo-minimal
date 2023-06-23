import React, { useEffect, useState } from "react";
import { Link } from "gatsby";

import Button from "components/UI/button";
import { GTMSelectContentEvent } from "components/GTM/gtmStaticPage";

import "styles/banner.scss";

import BannerArrowIcon from "images/svg/bannerArrow.svg";


const Banner = (props) => {
    const {
        image,
        imageMobile,
        title,
        type,
        plainText,
        link,
        onClick,
        ...restProps
    } = props;

    const buttonClick = () => {
        onClick && onClick();

        GTMSelectContentEvent({
            content_type: title,
            content_id: '',
        });
    }

    const [bannerType, setBannerType] = useState('column-100');
    useEffect(() => {
        switch (type) {
            case '30%':
                setBannerType('column-30');
                break;
            case 'portrait30%':
                setBannerType('column-30-vertical');
                break;
            case '50%':
                setBannerType('column-50');
                break;
            case '70%':
                setBannerType('column-70');
                break;
            case '100%':
                setBannerType('column-100');
                break;
            default:
                setBannerType('column-100');
                break;
        }
    }, [type]);

    const IsLink = ({ children }) =>
        (bannerType !== 'column-70' && link) ?(
            <Link className="banner-link button-link" to={link?.href}>
                {children}
            </Link>
            ) : (
            <>{children}</>
        )

    return (
        <div className={`banner ${bannerType}`}>
            <IsLink>
                {(image || imageMobile) && (
                    <div className='banner__picture-container'>
                        <picture className="banner__picture">
                            {image && <source media="(min-width: 768px)" srcSet={image.file.url}/>}
                            <img src={imageMobile?.file.url ?? image?.file.url} alt={title}/>
                        </picture>
                    </div>
                )}
                <div className="banner__content">
                    {title && (
                        (bannerType === 'column-100' || bannerType === 'column-70') ?
                            (<h3 className="banner__content-title typography__h3">{title}</h3>) :
                            (<h4 className="banner__content-title typography__subtitle">{title}</h4>)
                    )}
                    {(bannerType !== 'column-70' && plainText) &&
                        <p className="banner__content-plain-text typography__p--inter">{plainText}</p>
                    }

                    {(bannerType === 'column-70') && (
                        <a className="banner__content-link" href={link?.href}>
                            <img className="" src={BannerArrowIcon} alt="Arrow"/>
                        </a>
                    )}

                    {(bannerType !== 'column-70' && link) && (
                        <Button
                            className="banner__content-button"
                            value={link?.text}
                            type={link?.type}
                            href={link?.href}
                            isArrowShow={link?.isArrowShow}
                            isThin={link?.isThin}
                            onClick={buttonClick}
                        />
                    )}
                </div>
            </IsLink>
        </div>
    );
};

export default Banner;

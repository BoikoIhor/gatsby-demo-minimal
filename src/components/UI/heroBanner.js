import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";

import Button from "components/UI/button";

import { GTMSelectPromotionEvent } from "components/GTM/gtmStaticPage";

import "styles/hero-banner.scss";

const HeroBanner = ({ title, plainText, text, link, image, imageMobile, type, ...restProps }) => {
    const buttonClick = () => {
        GTMSelectPromotionEvent({
            creative_name: title,
            creative_slot: '',
            promotion_id: '',
            promotion_name: '',
        });
    }

    return (
        <div className={`hero-banner ${type}`} {...restProps}>
            {
                (image || imageMobile) && (
                    <div className="background">
                        <picture>
                            {image && <source media="(min-width: 768px)" srcSet={image.file.url}/>}
                            <img src={imageMobile?.file.url ?? image?.file.url} alt={title}/>
                        </picture>
                    </div>
                )
            }
            <div className="content">
                {title && <p className="content__title typography__h1">{title}</p>}
                {plainText && <p className="content__description typography__subtitle">{plainText}</p>}
                {text && <p className="content__description typography__subtitle">{renderRichText(text)}</p>}
                {link &&
                    <Button className="content__button"
                            value={link.text}
                            href={link.href}
                            isArrowShow={link.isArrowShow}
                            type={link.type}
                            onClick={buttonClick}/>
                }
            </div>
        </div>
    );
};

export default HeroBanner;

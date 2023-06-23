import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import Button from "components/UI/button";

import { GTMSelectContentEvent } from "components/GTM/gtmStaticPage";

import "styles/hero-banner.scss";

export const homepageBottomBannerQuery = graphql`
query homepageBottomBannerQuery {
  allContentfulBannerUpdated {
    edges {
      node {
        id
        title
        plainText
        sortOrder
        location
        type
        link {
          type
          href
          isArrowShow
          text
        }
        image {
          file {
            url
          }
          title
        }
        text {
          raw
        }
        imageMobile {
          file {
            url
          }
        }
      }
    }
  }
}
`;

const HomepageBottomBanner = (props) => {
    const bannersData = useStaticQuery(homepageBottomBannerQuery);
    const banners = bannersData.allContentfulBannerUpdated.edges;

    const heroBanner = banners.filter(banner =>
        banner.node.type === 'homepage-bottom-banner' &&
        banner.node.location === 'homepage',
    );

    const {
        link,
        image,
        imageMobile,
        text,
        title,
    } = heroBanner[0].node;

    const onClick = () => {
        GTMSelectContentEvent({
            content_type: title,
            content_id: ''
        });
    }

    return (
        <div className="bottom-banner">
            <div className="bottom-banner__background">
                <picture>
                    <source media="(max-width:559px)" srcSet={imageMobile.file.url}/>
                    <source media="(min-width:560px)" srcSet={image.file.url}/>
                    <img src={image.file.url} alt="Bottom banner background"/>
                </picture>
            </div>
            <div className="bottom-banner__content">
                <p className="bottom-banner__title">{title}</p>
                <p className="bottom-banner__description">{renderRichText(text)}</p>
                <Button
                    className='bottom-banner__button'
                    value={link.text}
                    type={link.type}
                    isArrowShow={link.isArrowShow}
                    href={link.href}
                    onClick={onClick}
                />
            </div>
        </div>
    );
};

export default HomepageBottomBanner;

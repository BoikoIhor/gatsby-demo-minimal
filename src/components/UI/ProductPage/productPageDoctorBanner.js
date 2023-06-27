import React from 'react';
import { graphql, useStaticQuery } from "gatsby";

export const DoctorsBannerQuery = graphql`
  query DoctorsBannerQuery {
    allContentfulSlider(
      filter: {type: {eq: "doctors-banner"}, location: {eq: "product-page"}}
    ) {
      edges {
        node {
          slides {
            title
            subtext
            slideImage {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
  }
`;

const ProductPageDoctorBanner = () => {

    const elements = useStaticQuery(DoctorsBannerQuery).allContentfulSlider.edges[0].node.slides;

    return (
        <div className="product-page__doctor-banner">
            <div className='product-page__doctor-background'>
                <div className="product-page__doctor-content">
                    <h2 className="typography__h2">
                        {elements[0].title}
                    </h2>
                    <div className="product-page__doctor-wrapper">
                        <div className="product-page__doctor-left">
                            <p className="product-page__doctor-text">
                                {elements[0].subtext}
                            </p>
                            <div className="product-page__doctor-info">
                                <img src={elements[1].slideImage.file.url} alt={elements[1].slideImage.title} className="product-page__doctor-img" />
                                <div className="product-page__doctor-info-text">
                                    <p className="typography__p">
                                        {elements[1].title}
                                    </p>
                                    <p className="typography__small--inter">
                                        {elements[1].subtext}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="product-page__doctor-questions">
                            {elements.slice(2).map(function(element, index) {
                                return (
                                    <div key={index} className="product-page__doctor-question">
                                        <p className="typography__p">{element.title}</p>
                                        <p className="typography__p--inter">{element.subtext}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPageDoctorBanner;

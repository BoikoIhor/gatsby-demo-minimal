import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import QuoteSlider from "components/UI/quoteSlider";
import RoundImageBanner from "../roundImageBanner";
import ProductSlider from "components/UI/productSlider";

import "styles/listpage.scss";

export const listpageQuery = graphql`
  query ListpageQuery {
    allContentfulSlider {
      edges {
        node {
          type
          location
          sliderTitle
          slideCount
          name
          dots
          autoplayInterval
          quoteSliderImage {
            title
            file {
              url
            }
          }
          slides {
            id
            title
            subtext
            slideImage {
              file {
                url
              }
              title
            }
            slideButton {
              text
            }
          }
        }
      }
    }
    allContentfulBannerUpdated {
      edges {
        node {
          id
          title
          plainText
          sortOrder
          location
          type
          image {
            file {
              url
            }
            title
          }
          imageMobile {
            file {
              url
            }
            title
          }
          link {
            text
            type
            href
            isThin
            isArrowShow
          }
        }
      }
    }
    allBigCommerceProducts {
      nodes {
        bigcommerce_id
        id
        name
        description
        cost_price
        categories
        custom_fields {
          name
          value
        }
        images {
          url_standard
        }
        brand_id
        custom_url {
          url
        }
      }
    }
  }
`;

const ListpageContent = (props) => {
    const queryData = useStaticQuery(listpageQuery);

    const sliders = queryData.allContentfulSlider.edges;
    const bottomSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "banner-slider" &&
            slider.node.location === "homepage",
    );

    const RoundImageBannerData = sliders.filter(
        (slider) =>
            slider.node.type === "product" && slider.node.location === "homepageFAQ",
    );

    const products = queryData.allBigCommerceProducts.nodes;
    //24 - hair
    //25 - sex
    //26 - top
    //27 - learn

    const hairCategoryProducts = products.filter((obj) =>
        obj.categories.includes(24),
    );
    const sexualProblemCategoryProducts = products.filter((obj) =>
        obj.categories.includes(25),
    );

    return (
        <div className="listpage__content">
            <ProductSlider
              isListingItem
              title={"Erectieproblemen"}
              products={sexualProblemCategoryProducts}
            />
            <ProductSlider
              isListingItem
              isHomepage
              title={"Haarverlies"}
              products={hairCategoryProducts}
            />
            <QuoteSlider sliderData={bottomSliderData[0].node}/>
            <RoundImageBanner bannerData={RoundImageBannerData[0].node}/>
        </div>
    );
};

export default ListpageContent;

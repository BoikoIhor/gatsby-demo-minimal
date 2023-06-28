import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Banners from "components/UI/banners";
import QuoteSlider from "components/UI/quoteSlider";
import HomepageDropdownBanner from "components/UI/Homepage/homepageDropdownBanner";
import HomepageBottomBanner from "components/UI/Homepage/homepageBottomBanner";
import ProductSlider from "../productSlider";
import RoundImageBanner from "../roundImageBanner";
import Button from "../button";
import TreatmentsSlider from "../treatmentsSlider";
import TreatmentCategorySlider from "../treatmentCategorySlider";

import { GTMSelectContentEvent } from "components/GTM/gtmStaticPage";
import DoctorsHelpBanner from "./doctorshelpBanner";
import BlogSlider from "../blogSlider";

export const homepageQuery = graphql`
  query HomepageSliderQuery {
    allContentfulSlider {
      edges {
        node {
          type
          location
          name
          sliderTitle
          slideCount
          dots
          autoplayInterval
          quoteSliderImage {
            title
            file {
              url
            }
          }
          sliderButton {
              text
              type
              href
              isThin
              isArrowShow
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
              type
              href
              isThin
              isArrowShow
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
          text {
            raw
          }
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
        sku
        name
        price
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

const HomepageContent = (props) => {
    const queryData = useStaticQuery(homepageQuery);
    const products = queryData.allBigCommerceProducts.nodes;
    const sliders = queryData.allContentfulSlider.edges;
    const FAQSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "product" && slider.node.location === "homepageFAQ"
    );
    const bottomSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "banner-slider" &&
            slider.node.location === "homepage"
    );

    const ourTreatmentSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "our-treatments-slider" && slider.node.location === "homepage"
    );

    const treatmentCategorySliderData = sliders.filter(
        (slider) =>
            slider.node.type === "treatment-category-slider" && slider.node.location === "homepage"
    );

    const popularProductSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "popular-product-slider" && slider.node.location === "homepage"
    );

    const blogSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "blog-slider" && slider.node.location === "homepage"
    );

    const popularProductsSku = popularProductSliderData[0].node.slides?.map((slide) => slide.title);
    const popularProduct = products.filter((product) => popularProductsSku.some((item) => item ===  product.sku));
    // TODO add GTM for HomePage slider

    const banners = queryData.allContentfulBannerUpdated.edges;

    const doctorsHelpBanner = banners.filter(
        (banner) =>
            banner.node.type === "doctors-help-banner" && banner.node.location === "homepage"
    );

    return (
        <div className="homepage__content">
            <TreatmentCategorySlider sliderData={treatmentCategorySliderData[0].node}/>
            <RoundImageBanner bannerData={FAQSliderData[0].node}/>
            <TreatmentsSlider sliderData={ourTreatmentSliderData[0].node}/>
            <QuoteSlider sliderData={bottomSliderData[0].node}/>
            <DoctorsHelpBanner bannerData={doctorsHelpBanner[0].node}/>
            <ProductSlider
                title={popularProductSliderData[0].node.sliderTitle}
                isHomepage
                products={popularProduct}
            />
            <BlogSlider sliderData={blogSliderData[0].node}/>
            <HomepageBottomBanner/>
            <HomepageDropdownBanner/>
        </div>
    );
};

export default HomepageContent;

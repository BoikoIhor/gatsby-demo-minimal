import React from "react";
import "../../../styles/homepage.scss";
import "../../../styles/product-page.scss";
import wellis5 from "../../../images/wellis5.png";
import Button from "../button";
import ProductPageFAQ from "./ProductPageFAQ";
import ProductPageDotsSlider from "./productPageDotsSlider";
import RoundImageBanner from "../roundImageBanner";
import ProductSlider from "../productSlider";
import Dropdown from "../dropdown";
import { graphql, useStaticQuery } from "gatsby";
import ProductPageDoctorBanner from "./productPageDoctorBanner";
import ProductPageReviews from "./productPageReviews";
import BlogSlider from "../blogSlider";

export const ProductPageContentQuery = graphql`
  query DropdownProductBannerQuery {
    allContentfulBannerUpdated {
      edges {
        node {
          title
          plainText
          type
          location
          image {
            file {
              url
            }
          }
          bulletListText {
            id
            dropdownTitle
            text
          }
          link {
            href
            text
            type
            isArrowShow
          }
        }
      }
    }
    allContentfulSlider {
      edges {
        node {
          name
          type
          location
          sliderTitle
          slideCount
          dots
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
              href
              text
              type
              isArrowShow
              isThin
            }
          }
        }
      }
    }
  }
`;

const ProductPageContent = (props) => {
  const { product, products } = props;

  const relatedProducts = product.related_products
    .map((relatedProductId) => {
      return products.find(
          (product) => product.bigcommerce_id === relatedProductId
      );
    })
    .filter((relatedProduct) => relatedProduct != null)

  const productPageData = useStaticQuery(ProductPageContentQuery);

  const productSliderData = productPageData.allContentfulSlider.edges;
  const banners = productPageData.allContentfulBannerUpdated.edges;

  const [roundImageBanner] = productSliderData.filter(
    (slider) =>
        slider.node.type === "product" &&
        slider.node.location === "homepageFAQ"
  );

  const [dotsSliderData] = productSliderData.filter(
    (slider) =>
      slider.node.type === "product-page-dots-slider" &&
      slider.node.location === "product-page"
  );

  const [reviewsSliderData] = productSliderData.filter(
    (slider) =>
        slider.node.type === "reviews-slider" && slider.node.location === "product-page"
  );

  const [blogSliderData] = productSliderData.filter(
    (slider) =>
        slider.node.type === "blog-slider" && slider.node.location === "product-page"
  );

  const [dropdownBanner] = banners.filter(
    (banner) =>
      banner.node.location === "productpage" &&
      banner.node.type === "dropdown"
  );

  const [howItWorksData] = banners.filter(
    (banner) =>
      banner.node.location === "product-page" &&
      banner.node.type === "how-it-works"
  );

  const faqType = product.custom_fields.find(
    (el) => el.name === "faq_type"
  );

  const [FAQBannerData] = banners.filter(
    (banner) =>
      banner.node.location === "product-page" &&
      banner.node.type === faqType?.value
  );

  const [DoctorHelpBannerData] = banners.filter(
    (banner) =>
      banner.node.location === "product-page" &&
      banner.node.type === "not-sure-banner"
  );

  let doctorsHelpLink = "#";
  if (product.categories.includes(24))
    doctorsHelpLink = "/questionnaire-hair";
  else if (product.categories.includes(33))
    doctorsHelpLink = "/questionnaire-premature-ejaculation";
  else if (product.categories.includes(32))
    doctorsHelpLink = "/questionnaire-erectile-dysfunction";

  DoctorHelpBannerData.node.title = DoctorHelpBannerData.node.title.replace("{product-name}", product.name);

  const { title, bulletListText } = dropdownBanner.node;

  return (
    <div className='homepage__content'>
      <div className="homepage__dropdown-banner product-page__dropdown-banner">
        <div className="product-page__dropdown-text">
          <p className="typography__h2 product-page__dropdown-title">
            {title}
          </p>
          <p className='page-content__text typography__subtitle'>
            Beter bekend als impotentie, een erectiestoornis is wanneer een man
            aanhoudende problemen heeft met het krijgen en behouden van een
            erectie.
          </p>
        </div>
        <div className="homepage__dropdown-banner__content">
          <Dropdown items={bulletListText} />
        </div>
      </div>

      <div className="product-page__dots-slider">
        <p className="typography__h2 product-page__dots-slider-title">{dotsSliderData.node.sliderTitle}</p>
        <ProductPageDotsSlider slides={dotsSliderData.node} />
      </div>

      <div className="page-content__banner">
        <img src={howItWorksData.node.image.file.url} alt='Banner image' />
        <div className="product-page__banner-wrapper">
          <p className="typography__subtitle">{howItWorksData.node.title}</p>
          <p className="typography__p--inter">
            {howItWorksData.node.plainText}
          </p>
        </div>
        <Button
          className='product-page__banner-button'
          value={howItWorksData.node.link.text}
          type={howItWorksData.node.link.type}
          isArrowShow={howItWorksData.node.link.isArrowShow}
          href={howItWorksData.node.link.href}
        />
      </div>

      <ProductPageReviews sliderData={reviewsSliderData.node}/>
      <ProductPageDoctorBanner/>

      { DoctorHelpBannerData && (
        <div className="doctor-help">
          <h2 className="typography__h2">
            {DoctorHelpBannerData.node.title}
          </h2>
          <p className="typography__p--inter">
            {DoctorHelpBannerData.node.plainText}
          </p>
          <Button
            className='doctor-help__button'
            value={DoctorHelpBannerData.node.link.text}
            type={DoctorHelpBannerData.node.link.type}
            isArrowShow={DoctorHelpBannerData.node.link.isArrowShow}
            href={doctorsHelpLink}
          />
        </div>
      )}

      <RoundImageBanner bannerData={roundImageBanner.node}/>

      { faqType && (
        <ProductPageFAQ banner={FAQBannerData.node}/>
      )}
      <BlogSlider sliderData={blogSliderData.node}/>

      { relatedProducts.length > 0 && (
        <div className="related-products">
          <ProductSlider
            title="Bekijk ook"
            isHomepage
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
};

export default ProductPageContent;

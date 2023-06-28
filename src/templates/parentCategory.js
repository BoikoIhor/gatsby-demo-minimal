import React, { useEffect } from "react";
import { useStaticQuery } from "gatsby";
import IndexProvider from "context";
import { useCurrency } from "context/currencyContext";

import QuoteSlider from "../components/UI/quoteSlider";
import ProductSlider from "../components/UI/productSlider";
import MainLayout from "../components/Layout/main";
import ParentCategoryHero from "../components/UI/Listpage/parentCategoryHero";
import HomepageBottomBanner from "../components/UI/Homepage/homepageBottomBanner";
import TreatmentsSlider from "../components/UI/treatmentsSlider";
import ParentCategoryDropdown from "../components/UI/Listpage/parentCategoryDropDown";
import ParentCategoryDropdownFAQ from "../components/UI/Listpage/parentCategoryDropDownFAQ";
import ParentCategoryDropdownChart from "../components/UI/Listpage/parentCategoryDropDownChart";
import FAQSlider from "../components/UI/FAQSlider";
import RoundImageBanner from "../components/UI/roundImageBanner";
import HtmlHead from "components/UI/htmlHead";

import "styles/listpage.scss";
import "styles/homepage.scss";

import { listpageQuery } from "components/UI/Listpage/listpageContent";
import {
  GTMSelectItemEvent,
  GTMViewItemListEvent,
} from "components/GTM/gtmCategory";

const Category = (props) => {
  const { pageContext } = props;
  const {
    categoryId,
    title,
    allBigCommerceCategories,
    allBigCommerceBrands,
  } = pageContext;

  const queryData = useStaticQuery(listpageQuery);

  const products = queryData.allBigCommerceProducts.nodes;
  const categoryProducts = products.filter((product) =>
    product?.categories.includes(categoryId)
  );

  const sliders = queryData.allContentfulSlider.edges;
  const FAQSliderData = sliders.filter(
    (slider) =>
      slider.node.type === "product" && slider.node.location === "category-page"
  );

  const [bottomSliderData] = sliders.filter(
    (slider) =>
      slider.node.type === "banner-slider" &&
      slider.node.location === "homepage"
  );

  const [cardBanner] = sliders.filter(
    (slider) =>
      slider.node.type === "cards" && slider.node.location === "category-page"
  );

  const [roundImageBanner] = sliders.filter(
    (slider) =>
      slider.node.type === "product" && slider.node.location === "homepageFAQ"
  );

  const [ourTreatmentsliderData] = sliders.filter(
    (slider) =>
      slider.node.type === "our-treatments-slider" &&
      slider.node.location === "homepage"
  );

  const getStyle = () => {
    let backgroundColor;
    switch (categoryId) {
      case 24:
        backgroundColor = "#DDE4E5";
        break;
      case 25:
        backgroundColor = "#DDE4E5";
        break;
      case 26:
        backgroundColor = "#DDE4E5";
        break;
    }

    return backgroundColor
      ? `:root { --background-main: ${backgroundColor};}`
      : "";
  };

  const getCategoryNameById = (id) => {
    return allBigCommerceCategories.nodes.find(
      (category) => category.bigcommerce_id === id
    ).name;
  };

  const getBrandNameById = (id) => {
    return allBigCommerceBrands.nodes.find(
      (brand) => brand.bigcommerce_id === id
    ).name;
  };
  const Main = () => {
    const { currency } = useCurrency();

    const GTMData = {
      item_list_id: categoryId,
      item_list_name: title,
      items: [
        ...categoryProducts.map((product, index) => {
          return {
            item_id: product.bigcommerce_id,
            item_name: product.name,
            currency: currency.currency_code,
            // discount: 5.99,
            index,
            item_brand: getBrandNameById(product.brand_id),
            item_category: getCategoryNameById(categoryId),
            item_category2: getCategoryNameById(
              product.categories.filter((id) => id !== categoryId)[0]
            ),
            item_variant: product.variants,
            price: product.cost_price,
          };
        }),
      ],
    };
    const productSelectClick = (productId) => {
      GTMSelectItemEvent({
        ...GTMData,
        items: [GTMData.items.find((item) => item.item_id === productId)],
      });
    };

    useEffect(() => {
      if (!categoryProducts.length || !Object.keys(currency).length) {
        return;
      }

      GTMViewItemListEvent(GTMData);
    }, [categoryProducts, currency]);

    const gtmData = {
      page: {
        title,
        type: "Category",
      },
    };

    return (
      <MainLayout gtmData={gtmData}>
        <ParentCategoryHero />

        <div className="homepage__content category-page__content">
          <ParentCategoryDropdown />
          <FAQSlider sliderData={FAQSliderData[0].node} />

          {categoryProducts.length ? (
            <ProductSlider
              isHomepage
              products={categoryProducts}
              title={"Klinisch bewezen behandelingen"}
              subtitle={
                "Iedereen is anders, wij zorgen voor de juiste behandeling."
              }
              productSelectClick={productSelectClick}
            />
          ) : (
            <div className="empty-slider-placeholder">
              There is no product yet
            </div>
          )}

          <ParentCategoryDropdownChart />

          <div className="category-page__cards">
            <h2 className="typography__h2">{cardBanner.node.sliderTitle}</h2>
            <div className="category-page__card-wrapper">
              {cardBanner.node.slides.map((card) => {
                return (
                  <div className="category-page__card">
                    <img src={card.slideImage.file.url} alt="" />
                    <div className="category-page__card-text">
                      <p className="title">{card.title}</p>
                      <div className="subtext">
                        <p>{card.subtext}</p>
                      </div>
                      <p className="text">{card.slideButton.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <RoundImageBanner bannerData={roundImageBanner.node} />
          <QuoteSlider sliderData={bottomSliderData.node} />
          <HomepageBottomBanner />
          <ParentCategoryDropdownFAQ />
          <TreatmentsSlider sliderData={ourTreatmentsliderData.node} />
        </div>
      </MainLayout>
    );
  };

  return (
    <IndexProvider>
      <HtmlHead title={title} style={getStyle()} />
      <Main />
    </IndexProvider>
  );
};

export default Category;

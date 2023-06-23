import React, { useEffect } from "react";
import { useStaticQuery } from "gatsby";
import IndexProvider from "context";
import { useCurrency } from "context/currencyContext";

import QuoteSlider from "../components/UI/quoteSlider";
import RoundImageBanner from "../components/UI/roundImageBanner";
import ProductSlider from "../components/UI/productSlider";
import HtmlHead from "components/UI/htmlHead";
import MainLayout from "components/Layout/main";

import "styles/listpage.scss";

import { listpageQuery } from "components/UI/Listpage/listpageContent";
import { GTMSelectItemEvent, GTMViewItemListEvent } from "components/GTM/gtmCategory";


const Category = (props) => {
    const { pageContext } = props;
    const { categoryId, categoryParentId, title, allBigCommerceCategories, allBigCommerceBrands } = pageContext;

    const queryData = useStaticQuery(listpageQuery);

    const products = queryData.allBigCommerceProducts.nodes;
    const categoryProducts = products.filter((product) =>
        product?.categories.includes(categoryId)
    );

    const sliders = queryData.allContentfulSlider.edges;
    const bottomSliderData = sliders.filter(
        (slider) =>
            slider.node.type === "banner-slider" &&
            slider.node.location === "homepage"
    );
    const RoundImageBannerData = sliders.filter(
        (slider) =>
            slider.node.type === "product" &&
            slider.node.location === "homepageFAQ"
    );

    const getStyle = () => {
        let backgroundColor;
        switch (categoryParentId) {
            case 24:
                backgroundColor = '#DDE4E5';
                break;
            case 25:
                backgroundColor = '#F4EEDA';
                break;
            case 26:
                backgroundColor = '#F7E7D2';
                break;
        }

        return backgroundColor ?
            `:root { --background-main: ${backgroundColor};}` :
            '';
    }

    const getCategoryNameById = (id) => {
        return allBigCommerceCategories
            .nodes
            .find(category => category.bigcommerce_id === id)
            .name;
    }

    const getBrandNameById = (id) => {
        return allBigCommerceBrands
            .nodes
            .find(brand => brand.bigcommerce_id === id)
            .name;
    }

    const Main = () => {
        const { currency } = useCurrency();

        const GTMData = {
            item_list_id: categoryId,
            item_list_name: title,
            items: [...categoryProducts.map((product, index) => {
                return {
                    item_id: product.bigcommerce_id,
                    item_name: product.name,
                    currency: currency.currency_code,
                    // discount: 5.99,
                    index,
                    item_brand: getBrandNameById(product.brand_id),
                    item_category: getCategoryNameById(categoryId),
                    item_category2: getCategoryNameById(product.categories.filter(id => id !== categoryId)[0]),
                    item_variant: product.variants,
                    price: product.cost_price,
                }
            })],
        }
        const productSelectClick = (productId) => {
            GTMSelectItemEvent({
                ...GTMData,
                items: [GTMData.items.find(item => item.item_id === productId)]
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
            <MainLayout className="listpage" gtmData={gtmData}>
                <h1 className="typography__h1 listpage__title">{title}</h1>
                <div className="listpage__content">
                    {categoryProducts.length ? (
                        <ProductSlider
                            products={categoryProducts}
                            isListingItem
                            productSelectClick={productSelectClick}
                        />
                    ) : (
                        <div className="empty-slider-placeholder">
                            There is no product yet
                        </div>
                    )}
                    <QuoteSlider sliderData={bottomSliderData[0].node}/>
                    <RoundImageBanner bannerData={RoundImageBannerData[0].node}/>
                </div>
            </MainLayout>
        )
    }

    return (
        <IndexProvider>
            <HtmlHead title={title} style={getStyle()}/>
            <Main/>
        </IndexProvider>
    );
};

export default Category;

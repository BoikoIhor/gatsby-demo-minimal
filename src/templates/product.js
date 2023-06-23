import React from "react";
import IndexProvider from "context";

import Main from "components/Layout/main";
import ProductPageBanner from "components/UI/ProductPage/productPageBanner";
import ProductPageContent from "components/UI/ProductPage/productPageContent";
import HtmlHead from "components/UI/htmlHead";

import "styles/product-page.scss";

const ProductPage = (props) => {
    const { product, products, categoryName, brandName } = props.pageContext;

    const getStyle = () => {
        let backgroundColor;
        switch (product.categories[0]) {
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

    const gtmData = {
        page: {
            title: product.name,
            type: "Product",
        },
    };

    return (
        <IndexProvider>
            <HtmlHead title={product.name} style={getStyle()}/>
            <Main className="product-page__main" gtmData={gtmData}>
                <ProductPageBanner
                    categoryName={categoryName}
                    brandName={brandName}
                    product={product}
                    products={products}
                />
                <ProductPageContent product={product} products={products}/>
            </Main>
        </IndexProvider>
    );
};

export default ProductPage;

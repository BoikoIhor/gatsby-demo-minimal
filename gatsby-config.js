require("dotenv").config({
    path: `.env`,
});

module.exports = {
    siteMetadata: {
        title: `Gatsby Contentful Starter`,
        description: `Starter repo to to use with the Gatsby & Contentful course`,
        author: `elogic-commerce`,
    },
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                additionalData: "$env: " + process.env.NODE_ENV + ";",
                fonts: [
                    `Potta One`,
                    `open sans\:400`,
                    "open sans:400i",
                    `open sans\:700`,
                    "open sans:700i",
                    `open sans\:800`,
                    "open sans:800i",
                ],
            },
        },
        `gatsby-plugin-styled-components`,
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /\.inline\.svg$/,
                },
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: process.env.GOOGLE_TAGMANAGER_ID,
                includeInDevelopment: process.env.GOOGLE_TAGMANAGER_INCLUDE_IN_DEVELOPMENT === 'true',
            },
        },
        {
            resolve: "gatsby-source-bigcommerce",
            options: {
                clientId: process.env.BIGCOMMERCE_API_CLIENT_ID,
                secret: process.env.BIGCOMMERCE_API_SECRET_KEY,
                accessToken: process.env.BIGCOMMERCE_API_ACCESS_TOKEN,
                storeHash: process.env.BIGCOMMERCE_API_STORE_HASH,
                endpoints: {
                    BigCommerceProducts:
                        "/catalog/products?include=variants,images,custom_fields,bulk_pricing_rules,primary_image,videos&limit=50",
                    BigCommerceCategories: "/catalog/categories",
                    BigCommerceBrands: "/catalog/brands",
                }
            },
        }
    ],
};

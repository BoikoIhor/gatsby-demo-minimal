const path = require("path");
const fetch = require("node-fetch");
const axios = require("axios");

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "process.env.BIGCOMMERCE_API_STORE_HASH": JSON.stringify(
          process.env.BIGCOMMERCE_API_STORE_HASH
        ),
      }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      fallback: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
      },
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const {
    data: {
      allBigCommerceCategories,
      allBigCommerceBrands,
      allBigCommerceProducts,
      allContentfulFaqItem,
    },
  } = await graphql(`
    {
      allBigCommerceCategories(filter: { is_visible: { eq: true } }) {
        nodes {
          bigcommerce_id
          custom_url {
            url
          }
          name
          parent_id
          id
        }
      }
      allBigCommerceBrands {
        nodes {
          bigcommerce_id
          id
          name
        }
      }
      allBigCommerceProducts(filter: { is_visible: { eq: true } }) {
        nodes {
          images {
            url_standard
          }
          name
          variants {
            option_values {
              label
              option_display_name
            }
            id
            sku
            price
          }
          sku
          description
          price
          categories
          sale_price
          related_products
          bigcommerce_id
          custom_fields {
            name
            value
          }
          custom_url {
            url
          }
          brand_id
        }
      }
      allContentfulFaqItem(sort: { fields: sortOrder }) {
        nodes {
          id
          name
          href
          image {
            title
            file {
              url
            }
          }
          links {
            id
            text
            href
            description {
              description
            }
            richText {
              raw
            }
            authorName
            authorAvatar {
              title
              file {
                url
              }
            }
            parentCategoryFaq
            publishDate
          }
        }
      }
    }
  `);

  allBigCommerceCategories.nodes.forEach((category) => {
    createPage({
      path: `${category.custom_url.url}`,
      context: {
        categoryId: +category.bigcommerce_id,
        categoryParentId: category.parent_id,
        title: category.name,
        allBigCommerceCategories,
        allBigCommerceBrands
      },
      component: category.parent_id !== 0 ?
          path.resolve("./src/templates/category.js") :
          path.resolve("./src/templates/parentCategory.js"),
    });
  });


  allBigCommerceProducts.nodes.forEach((product) => {
    createPage({
      path: `${product.custom_url.url}`,
      context: {
        product: product,
        products: allBigCommerceProducts.nodes,
        categoryName: allBigCommerceCategories.nodes.find(category => category.bigcommerce_id === product.categories[0])?.name ?? '',
        brandName: allBigCommerceBrands.nodes.find(brand => brand.bigcommerce_id === product.brand_id)?.name ?? '',
      },
      component: path.resolve("./src/templates/product.js"),
    });
  });

  const asideLinks = allContentfulFaqItem.nodes.map((item) => {
    return {
      name: item.name,
      href: item.href,
      id: item.id,
    };
  });

  allContentfulFaqItem.nodes.forEach((faq) => {
    createPage({
      path: `/faq${faq.href}`,
      context: {
        name: faq.name,
        asideLinks,
        parentCategoryLink: faq.href,
        links: faq.links,
      },
      component: path.resolve("./src/templates/faq-category.js"),
    });

    faq.links.forEach((link) => {
      const relatedLinks = faq.links.filter(
        (item) => item.parentCategoryFaq === link.parentCategoryFaq
      );

      createPage({
        path: `/faq${faq.href}${link.href}`,
        context: {
          name: link.text,
          authorAvatar: link.authorAvatar,
          authorName: link.authorName,
          parentCategoryName: faq.name,
          parentCategoryLink: faq.href,
          subCategory: link.parentCategoryFaq,
          publishDate: link.publishDate,
          richText: link.richText,
          relatedLinks,
        },
        component: path.resolve("./src/templates/faq-single-page.js"),
      });
    });
  });

  const TYPEFORM_ACCESS_TOKEN = process.env.TYPEFORM_ACCESS_TOKEN;

  const myHeaders = new fetch.Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${TYPEFORM_ACCESS_TOKEN}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const fetchDataAndCreatePage = async (formId) => {
    try {
      const response = await fetch(
        `https://api.typeform.com/forms/${formId}`,
        requestOptions
      );
      const result = await response.json();

      let pathName = "", category = "";
      if (formId === process.env.FORM_HAIR_ID) {
        pathName = "/questionnaire-hair";
        category = "Hair";
      } else if (formId === process.env.FORM_PE_ID) {
        pathName = "/questionnaire-premature-ejaculation";
        category = "Premature Ejaculation";
      } else if (formId === process.env.FORM_ED_ID) {
        pathName = "/questionnaire-erectile-dysfunction";
        category = "Erectile Dysfunction";
      }

      createPage({
        path: `${pathName}`,
        context: {
          questions: result,
          products: allBigCommerceProducts.nodes,
          category
        },
        component: path.resolve("./src/templates/questionnaireTemplate.js"),
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const formIds = [
    process.env.FORM_HAIR_ID,
    process.env.FORM_PE_ID,
    process.env.FORM_ED_ID,
  ];

  await Promise.all(formIds.map((formId) => fetchDataAndCreatePage(formId)));

  const { data: blogData } = await axios({
    method: "GET",
    mode: "cors",
    url: process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v2/blog/posts",
    params: {
      is_published: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Auth-Token": process.env.BIGCOMMERCE_API_ACCESS_TOKEN,
    }
  });
  blogData.forEach((blog) => {
    createPage({
      path: blog.url,
      context: {
        blogData: blog,
        products: allBigCommerceProducts.nodes
      },
      component: path.resolve("./src/templates/blog.js"),
    });
  });
};

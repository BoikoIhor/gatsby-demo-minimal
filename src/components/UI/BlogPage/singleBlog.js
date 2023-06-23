import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../../../styles/blog-page.scss";
import ProductSlider from "../productSlider";
import useBlog from "../../../hooks/useBlog";

export const blogQuery = graphql`
  query BlogQuery {
    allContentfulBlogPost {
      nodes {
        subtitle
        blogId
        type
        title
        image {
          title
          file {
            url
          }
        }
        primaryButton {
          href
          text
          type
        }
        secondaryButton {
          href
          text
          type
        }
      }
    }
  }
`;

const SingleBlog = (props) => {
  const { blogData, products = [] } = props;

  const queryData = useStaticQuery(blogQuery);
  const { formatDate, sliderSku } = useBlog({ queryData, blogData });

  const sliderProducts = products.filter((product) =>
    sliderSku.includes(product.sku)
  );

  return (
    <div className="single-blog">
      <div className="single-blog__content">
        <h1 className="single-blog__content--title">{blogData.title}</h1>
        <p className="single-blog__content--date">
          {formatDate(blogData.published_date.date)}
        </p>
        <div
          className="single-blog__content--pagebuilder"
          dangerouslySetInnerHTML={{ __html: blogData.body }}
        ></div>
        {sliderProducts.length > 0 && (
          <ProductSlider products={sliderProducts} isHomepage isHideButtons />
        )}
      </div>
    </div>
  );
};
export default SingleBlog;

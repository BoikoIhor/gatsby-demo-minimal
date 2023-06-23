import React from "react";
import IndexProvider from "context";
import HtmlHead from "components/UI/htmlHead";
import Main from "components/Layout/main";
import SingleBlog from "../components/UI/BlogPage/singleBlog";

const Blog = (props) => {
  const { pageContext } = props;
  const { blogData, products } = pageContext;

  const meta = [];

  if (blogData.title) {
    meta.push({
      name: `title`,
      content: blogData.title,
    });
  }

  if (blogData.meta_description) {
    meta.push({
      name: `description`,
      content: blogData.meta_description,
    });
  }

  if (blogData.meta_keywords) {
    const keywordsValue = blogData.meta_keywords.replaceAll(",", ", ");
    meta.push({
      name: `keywords`,
      content: keywordsValue,
    });
  }

  return (
    <IndexProvider>
      <HtmlHead title={blogData.title} meta={meta} />
      <Main>
        <SingleBlog blogData={blogData} products={products} />
      </Main>
    </IndexProvider>
  );
};
export default Blog;

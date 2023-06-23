import React, { useState, useEffect, useMemo } from "react";
import { useWindow } from "context/windowContext";
import ReactDOM from "react-dom";
import Button from "../components/UI/button";

const useBlog = (props) => {
  const { blogData, queryData } = props;
  const { document } = useWindow();

  const [sliderSku, setSliderSku] = useState([]);
  const [content, setContent] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const contentToRender = useMemo(() => {
    if (content) {
      return (
        <div className="blog-banner ">
          <div className=" blog-banner__tablet">
            <div className="blog-banner__main">
              <div className="blog-banner__main__subtitle">
                {content.subtitle}
              </div>
              <h2>{content.title}</h2>
              {content.primaryButton && (
                <Button
                  value={content.primaryButton.text}
                  type={content.primaryButton.type}
                  href={content.primaryButton.href}
                />
              )}
              {content.secondaryButton && (
                <Button
                  value={content.secondaryButton.text}
                  type={content.secondaryButton.type}
                  href={content.secondaryButton.href}
                />
              )}
            </div>
            <img
              className="blog-banner__image"
              src={content.image.file.url}
              alt={content.image.title}
            />
          </div>
          <div className="blog-banner__main blog-banner__mobile">
            <div className="blog-banner__main--wrapper">
              <div>
                <div className="blog-banner__main__subtitle">
                  {content.subtitle}
                </div>
                <h2 className="blog-banner__main__title">{content.title}</h2>
              </div>
              <img
                className="blog-banner__image"
                src={content.image.file.url}
                alt={content.image.title}
              />
            </div>
            {content.primaryButton && (
              <Button
                value={content.primaryButton.text}
                type={content.primaryButton.type}
                href={content.primaryButton.href}
              />
            )}
            {content.secondaryButton && (
              <Button
                value={content.secondaryButton.text}
                type={content.secondaryButton.type}
                href={content.secondaryButton.href}
              />
            )}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [content]);

  useEffect(() => {
    const productSkuElement = document.getElementById("slider-products-sku");
    const interceptElement = document.getElementById("intercept");

    if (productSkuElement) {
      const skuData = productSkuElement.getAttribute("data-sku");

      if (skuData) {
        const skuArray = skuData.split(", ");
        setSliderSku(skuArray);
      }
    }
    if (interceptElement) {
      const contentfulId = interceptElement.getAttribute("data-contentful-id");

      const currentBlogData = queryData.allContentfulBlogPost.nodes.find(
        (el) => el.type === contentfulId
      );

      if (currentBlogData) {
        setContent(currentBlogData);
      }

      ReactDOM.render(contentToRender, interceptElement);
    }
  }, [blogData, contentToRender]);
  return {
    formatDate,
    sliderSku,
  };
};

export default useBlog;

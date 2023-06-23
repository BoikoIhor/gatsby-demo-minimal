import React from "react";
import Dropdown from "../dropdown";
import Button from "../button";

import { GTMSelectContentEvent } from "components/GTM/gtmStaticPage";

const ProductPageFAQ = (props) => {
  const { banner } = props;

  const onClick = () => {
    GTMSelectContentEvent({
      content_type: banner.title,
      content_id: ''
    });
  }

  return (
    <div className="homepage__dropdown-banner category-page__dropdown">
      <div className="homepage__dropdown-banner__content dropdown-faq__content">
        <h2 className="typography__h2 product-page__dropdown-faq-title mobile">
          {banner.title}
        </h2>
        <Dropdown items={banner.bulletListText} />
        <div className="mobile product-page__dropdown-button">
          <Button
            className="button"
            value={banner.link.text}
            type={banner.link.type}
            href={banner.link.href}
            isArrowShow={banner.link.isArrowShow}
            onClick={onClick}
          />
        </div>
      </div>
      <div className="desktop product-page__dropdown-faq">
        <h2 className="typography__h2 product-page__dropdown-faq-title">
          {banner.title}
        </h2>
        <Button
            className="button product-page__dropdown-button"
            value={banner.link.text}
            type={banner.link.type}
            href={banner.link.href}
            isArrowShow={banner.link.isArrowShow}
            onClick={onClick}
          />
      </div>
    </div>
  );
};
export default ProductPageFAQ;

import React, { useState } from "react";

const useHeader = (props) => {
  const { categories, products, megaMenuLinks } = props;

  const [megamenuCategory, setMegamenuCategory] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isOpenMegaMenu, setIsOpenMegaMenu] = useState(false);

  const setCategoryHandler = (id) => {
      setIsOpenMegaMenu(true);
      setTimeout(() => {
          setMegamenuCategory(id);
      }, 100);
  };

  const rootCategories = categories.filter(
    (category) => category.parent_id === 0 && category.name !== "Shop All"
  );
  const subcategories = categories
    .filter((category) => category.parent_id === megamenuCategory)
    .map((category) => {
        const subcategoryItems = products.filter((product) =>
        product?.categories.includes(category.bigcommerce_id)
      );
        const subcategories = megaMenuLinks.map((item) => {
            if (+item?.parentCategory === category.bigcommerce_id) {
                    return (
                        {
                            name: item.text,
                            custom_url: {
                                url: item.href
                            }
                        }
                    );
                }
            }
        ).filter(item => item);
        return { ...category, products: [...subcategoryItems, ...subcategories] };
    });

  return {
    setMegamenuCategory,
    setCategoryHandler,
    rootCategories,
    subcategories,
    megamenuCategory,
    isShowPopup,
    setIsShowPopup,
    isShowLogin,
    setIsShowLogin,
    isOpenMegaMenu
  };
};

export default useHeader;

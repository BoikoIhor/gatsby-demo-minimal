import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { useWindow } from "context/windowContext";
import { useCustomer } from "context/customerContext";
import { useCurrency } from "context/currencyContext";
import { useLocale } from "context/localeContext";

import Minicart from "components/UI/minicart";
import { GTMCloseMobileMenuEvent, GTMOpenMobileMenuEvent } from "components/GTM/gtmAllPages";


const CartContext = createContext({});

export const useCart = () => {
    return useContext(CartContext);
};

const CartProvider = ({ children }) => {
    const { localStorage } = useWindow();
    const { customerData } = useCustomer();
    const { currency } = useCurrency();
    const { locale } = useLocale();

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
    const [cartData, setCartData] = useState({});
    const [localProducts, setLocalProducts] = useState(JSON.parse(localStorage.getItem("localProducts")) ?? {});

    const cartItems = useMemo(() => cartData?.line_items?.physical_items, [cartData]);

    const cartQty = useMemo(() => {
        return Object.keys(cartData).length !== 0 ?
            cartItems.reduce((acc, line_item) => acc + line_item.quantity, 0) :
            0
    }, [cartData]);
    const cartTotal = useMemo(() => {
        return Object.keys(cartData).length !== 0 ?
            cartItems.reduce((acc, line_item) => acc + line_item.quantity * line_item.list_price, 0) :
            0
    }, [cartData]);


    const updateLocalStorage = () => {
        cart ?
            localStorage.setItem("cart", JSON.stringify(cart)) :
            localStorage.removeItem("cart");
    }

    const updateLocalProducts = (product) => {
        const updatedLocalProducts = {
            ...localProducts,
            [product.variant_id]:
                localProducts[product.variant_id] ?
                    { ...localProducts[product.variant_id], ...product } :
                    product
        }
        setLocalProducts(updatedLocalProducts);
        localStorage.setItem("localProducts", JSON.stringify(updatedLocalProducts))
    }

    const removeLocalProducts = () => {
        setLocalProducts({});
        localStorage.removeItem("localProducts")
    }

    const getCartDataRequest = async () => {
        const response = await axios
            .get('/api/v3/carts/cartId', {
                params: {
                    cartId: cart
                }
            });

        setCartData(response.data);
    }

    const removeCart = () => {
        setCart(null);
        setCartData({});
        removeLocalProducts();
    };

    const updateCartData = () => {
        cart ?
            getCartDataRequest() :
            removeCart();
    }

    useEffect(() => {
        updateLocalStorage()
        updateCartData()
    }, [cart])

    const increaseQty = async (productData, qty = 1, isOpenCart = true) => {
        updateLocalProducts(productData);

        if (cart) {
            const cartId = cartData.id;
            const cartProduct = findCartProduct(productData);

            if (cartProduct) {
                // Update cart qty
                const promise = axios
                    .put('/api/v3/carts/cartId/items/itemId', {
                        line_item: {
                            quantity: productData.quantity + qty,
                            product_id: cartProduct.product_id
                        }
                    }, {
                        params: {
                            cartId,
                            itemId: cartProduct.id
                        }
                    })
                    .then((response) => {
                        setCartData(response.data);
                    });

                await toast.promise(promise, {
                    pending: 'Product is updating...',
                    success: 'Product updated',
                    error: 'Product can\'t be updated',
                }, {
                    toastId: cartProduct.id,
                })
            } else {
                // Create cart item
                const promise = axios
                    .post('/api/v3/carts/cartId/items', {
                        line_items: [{
                            quantity: productData.quantity + qty,
                            product_id: productData.product_id ?? productData.bigcommerce_id,
                            name: productData.name,
                            variant_id: productData.variant_id
                        }]
                    }, {
                        params: {
                            cartId
                        }
                    })
                    .then((response) => {
                        setCartData(response.data);
                        isOpenCart && openCart();
                    });

                await toast.promise(promise, {
                    pending: 'Product is adding...',
                    success: 'Product added',
                    error: 'Product can\'t be added',
                }, {
                    toastId: productData.id,
                })
            }
        } else {
            // Create cart
            const promise = axios
                .post("/api/v3/carts", {
                    customer_id: customerData.id ?? 0,
                    line_items: [{
                        quantity: productData.quantity + qty,
                        product_id: productData.product_id ?? productData.bigcommerce_id,
                        name: productData.name,
                        variant_id: productData.variant_id
                    }],
                    currency: {
                        code: currency.currency_code
                    },
                    locale: locale.default_shopper_language
                })
                .then((response) => {
                    setCartData(response.data);
                    setCart(response.data.id);
                    isOpenCart && openCart();
                })

            await toast.promise(promise, {
                pending: 'Product is adding...',
                success: 'Product added',
                error: 'Product can\'t be added',
            }, {
                toastId: productData.id,
            })
        }
    };

    const decreaseQty = async (productData, qty = 1) => {
        if (!cart) {
            return;
        }

        const cartId = cartData.id;
        const cartProduct = findCartProduct(productData);

        if (cartProduct) {
            // Update cart qty
            const promise = axios
                .put('/api/v3/carts/cartId/items/itemId', {
                    line_item: {
                        quantity: productData.quantity - qty,
                        product_id: cartProduct.product_id
                    }
                }, {
                    params: {
                        cartId,
                        itemId: cartProduct.id
                    }
                })
                .then((response) => {
                    setCartData(response.data);
                })

            await toast.promise(promise, {
                pending: 'Product is updating...',
                success: 'Product updated',
                error: 'Product can\'t be updated',
            }, {
                toastId: cartProduct.id,
            })
        }
    };

    const removeFromCart = async (productData) => {
        if (!cart) {
            return;
        }

        const cartId = cartData.id;
        const cartProduct = findCartProduct(productData);

        if (cartProduct) {
            // Delete cart item
            const promise = axios
                .delete('/api/v3/carts/cartId/items/itemId', {
                    params: {
                        cartId,
                        itemId: cartProduct.id
                    }
                })
                .then((response) => {
                    if (response.data) {
                        setCartData(response.data);
                    } else {
                        setCart(null);
                    }
                })

            await toast.promise(promise, {
                pending: 'Product is removing...',
                success: 'Product removed',
                error: 'Product can\'t be removed',
            }, {
                toastId: cartProduct.id,
            })
        }
    };

    const findCartProduct = (productData) => {
        if (!cart) {
            return;
        }

        return cartItems
            .find((item) => {
                if (item.variant_id) {
                    return item.variant_id === productData.variant_id &&
                        item.product_id === (productData.product_id ?? productData.bigcommerce_id)
                } else {
                    return item.product_id === (productData.product_id ?? productData.bigcommerce_id)
                }
            });
    }


    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => {
        setIsCartOpen(true);
        GTMOpenMobileMenuEvent();
    };
    const closeCart = () => {
        setIsCartOpen(false);
        GTMCloseMobileMenuEvent();
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                cartData,
                cartItems,
                cartQty,
                cartTotal,
                isCartOpen,
                openCart,
                closeCart,
                increaseQty,
                decreaseQty,
                removeFromCart,
                removeCart,
                findCartProduct,
                localProducts
            }}
        >
            {children}

            <Minicart/>
        </CartContext.Provider>
    );
};

export default CartProvider;

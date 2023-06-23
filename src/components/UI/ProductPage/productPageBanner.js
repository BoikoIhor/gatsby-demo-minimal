import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";

import vector1 from "images/vector1.png";
import vector2 from "images/vector2.png";
import vector3 from "images/vector3.png";
import Button from "components/UI/button";
import ProductPageSlider from './productPageSlider';
import RadioField from "components/UI/Inputs/RadioField";
import SelectField from "components/UI/Inputs/SelectField";
import QuantitySelector from 'components/UI/Inputs/QuantitySelector';
import { GTMAddToCartEvent, GTMViewItemEvent } from "components/GTM/gtmProduct";

import "styles/product-page.scss";

const ProductPageBanner = (props) => {
    const { product, categoryName, brandName } = props;
    const [showSubscription, setShowSubscription] = useState(true);

    const handlePurchaseType = (value) => {
        value === 'subscription' ? setShowSubscription(true) : setShowSubscription(false)
    };

    let questionnaireLink = "#";
    if (product.categories.includes(24))
        questionnaireLink = "/questionnaire-hair";
    else if (product.categories.includes(33))
        questionnaireLink = "/questionnaire-premature-ejaculation";
    else if (product.categories.includes(32))
        questionnaireLink = "/questionnaire-erectile-dysfunction";

    const { increaseQty, findCartProduct } = useCart();
    const { currency } = useCurrency();

    const GTMData = {
        currency: currency.currency_code,
        value: product.price,
        items: [
            {
                item_id: product.bigcommerce_id,
                item_name: product.name,
                discount: +(product.price - product.variants[0].price / (parseInt(product.variants[0].option_values[0].label.split("every")[0], 10) || 1)).toFixed(2),
                item_brand: brandName,
                item_category: categoryName,
                item_variant: product.variants[0].id,
                price: product.price,
            },
        ],
    }

    useEffect(() => {
        if (!Object.keys(currency).length) {
            return;
        }

        GTMViewItemEvent(GTMData);
    }, [currency]);

    const addToCart = (event) => {
        event.preventDefault()

        const data = new FormData(event.target);
        const productVariant = Object.fromEntries(data.entries());

        const selectedVariant =
            product.variants
                   .map((variant) => {
                       const variantOptions = {}
                       variant.option_values
                              .forEach(({ option_display_name, label }) => {
                                  variantOptions[option_display_name] = label
                              })

                       return {
                           ...variant,
                           ...variantOptions
                       }
                   })
                   .find((variant) => {
                       let result = true
                       Object.keys(productVariant)
                             .filter((key) => key !== 'PurchaseType' && key !== 'quantity')
                             .forEach((key) => {
                                 result = result && variant[key] === productVariant[key]
                             })
                       return result
                   })

        if (product.variants.length > 1 && !selectedVariant) {
            toast.error('Select a variant');
            return null
        }


        const cartProduct = findCartProduct({
            variant_id: selectedVariant.id,
            bigcommerce_id: product.bigcommerce_id
        });
        const quantity = (+productVariant.quantity || 1)

        increaseQty({
            ...product,
            price: selectedVariant.price || product.price,
            variant_id: selectedVariant?.id,
            quantity: cartProduct?.quantity || 0
        }, quantity);

        GTMAddToCartEvent({
            currency: currency.currency_code,
            value: product.price,
            items: [{
                ...GTMData.items[0],
                quantity,
                discount: +(product.price - selectedVariant.price / (parseInt(selectedVariant.Subscription.split("every")[0], 10) || 1)).toFixed(2),
                item_variant: selectedVariant.id,
                price: selectedVariant.price || product.price,
            }]
        });
    };

    const dosageVariants = [];
    const subscriptionVariants = [];
    const productVariantsPrice = [];

    product.variants.forEach((variant) => {
        const dosageOption = variant.option_values.find((option) => option.option_display_name === 'Dosage');
        const subscriptionOption = variant.option_values.find((option) => option.option_display_name === 'Subscription');

        if (dosageOption && !dosageVariants.includes(dosageOption.label)) {
            dosageVariants.push(dosageOption.label);
        }

        if (subscriptionOption && !subscriptionVariants.includes(subscriptionOption.label) &&
            subscriptionOption.label !== 'None') {
            subscriptionVariants.push(subscriptionOption.label);
            productVariantsPrice.push(variant.price);
        }
    });

    const isOneTimePurchase = product.custom_fields.find(field => field.name === "One-time-purchase" && field.value === "true");
    const isSubscriptionPurchase = product.custom_fields.find(field => field.name === "Subscription" && field.value === "true");
    const isPrescription = product.custom_fields.find(field => field.name === "Prescription" && field.value === "true");


    let discount = (product.price - (Math.max(...productVariantsPrice) / [parseInt(subscriptionVariants[subscriptionVariants.length - 1], 10)])) / product.price * 100;

    return (
        <div className="product-page__banners">
            <div className="product-page__banner">
                <ProductPageSlider slides={product.images}/>
            </div>

            <form className="product-page__list" onSubmit={addToCart}>
                <h2 className="typography__h1">{product.name}</h2>
                <h3 className="typography__small--inter product-page__subtext">Sildenafil citrate</h3>
                <p
                    className="product-page__list-description typography__p--inter"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {!isPrescription && (
                    <div className="">
                        <p className="typography__p product-page__frequency">Frequency</p>
                        <div className="product-page__purchase-type">
                            {isSubscriptionPurchase && (
                                <RadioField
                                    className={'product-page__radio'}
                                    name={'PurchaseType'}
                                    value={'Subscribe and save'}
                                    children={`save up to ${discount.toFixed(0)}%`}
                                    required
                                    onChange={() => {
                                        handlePurchaseType("subscription")
                                    }}
                                    defaultChecked
                                />
                            )}
                            {isOneTimePurchase && (
                                <RadioField
                                    className={'product-page__radio'}
                                    name={'PurchaseType'}
                                    value={'One-time purchase'}
                                    children={`$${product.price}/ea`}
                                    required
                                    onChange={() => {
                                        handlePurchaseType("one-time")
                                    }}
                                />
                            )}
                        </div>

                        {product.variants.length > 0 && (
                            <div className="product-page__variants">

                                {dosageVariants.length > 0 && (
                                    <div className="product-page__subscription">
                                        <p className="typography__p">Dosage</p>
                                        <div className="product-page__dosage">
                                            {dosageVariants.map((variant, index) => {
                                                return (
                                                    <RadioField
                                                        key={variant}
                                                        className={'form__radio'}
                                                        name={'Dosage'}
                                                        value={variant}
                                                        required
                                                        checked={dosageVariants.length === 1 && index === 0}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {subscriptionVariants.length > 0 && (
                                    showSubscription ? (
                                        <div className="product-page__subscription">
                                            <p className="typography__p">
                                                Select your plan
                                            </p>
                                            <p className="typography__small--inter">
                                                Pause or cancel whenever you'd like.
                                            </p>
                                            <SelectField
                                                options={subscriptionVariants}
                                                prices={productVariantsPrice}
                                                price={product.price}
                                            />
                                        </div>
                                    ) : (
                                        <input name="Subscription" value="None" type="hidden"/>
                                    )
                                )}
                            </div>
                        )}

                        {!showSubscription && isOneTimePurchase && (
                            <div className="product-page__subscription">
                                <p className="typography__p">Quantity</p>
                                <QuantitySelector/>
                            </div>
                        )}
                    </div>
                )}
                <div className="product-page__button">
                    {isPrescription ? (
                        <Button
                            value="Add to cart"
                            type="dark"
                            isSubmit
                        />
                    ) : (
                        <Button
                            value="Add to cart"
                            type="dark"
                            isSubmit
                        />
                    )}
                </div>
                <div className="product-page__list-items typography__p">
                    <p>
                        <img src={vector1}/>
                        &nbsp; Een betaalbare oplossing
                    </p>
                    <p>
                        <img src={vector2}/>
                        &nbsp; Flexibele dossering (25, 50 & 100 mg)
                    </p>
                    <p>
                        <img src={vector3}/>
                        &nbsp; Gratis & discrete verzending
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ProductPageBanner;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { navigate } from "gatsby";
import { useWindow } from "context/windowContext";
import { useCurrency } from "context/currencyContext";
import { useCustomer } from "context/customerContext";
import { useCart } from "context/cartContext";
import { useCheckout } from "context/checkoutContext";

import useChargebee from "hooks/Checkout/useChargebee";

import Button from "components/UI/button";
import CartSummary from "components/UI/Cart/cartSummary";
import Methods from "components/UI/Checkout/Payment/methods";
import { GTMPaymentFailedEvent, GTMPurchaseEvent } from "components/GTM/gtmCheckout";

const CheckoutPayment = (props) => {
    const { nextStepAction } = props;

    const { currency } = useCurrency();
    const { window } = useWindow();
    const { order, orderStatuses } = useCheckout();
    const { cartItems, cartTotal, localProducts } = useCart();
    const { customerData } = useCustomer();

    const [createdOrder, setCreatedOrder] = useState();
    const [paymentMethods, setPaymentMethods] = useState();

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
    const [isPlaceOrder, setIsPlaceOrder] = useState(false);
    const [isSavePaymentMethod, setIsSavePaymentMethod] = useState(false);

    const { paymentIntent, chargebeeInitialized, additionalData } = useChargebee(order);

    useEffect(() => {
        const incompleteStatus = orderStatuses.find(status => status.system_label === "Incomplete")
        axios
            .post("/api/v2/orders", { ...order, status_id: incompleteStatus.id })
            .then(async ({ data: order }) => {
                setCreatedOrder(order)

                await axios
                    .get("/api/v3/payments/methods", {
                        params: {
                            order_id: order.id
                        }
                    })
                    .then(({ data: paymentMethods }) => {
                        setPaymentMethods(paymentMethods);
                        setSelectedPaymentMethod(paymentMethods[0].id)
                    })
                    .catch(error => {
                        toast.error(error.message);
                    })
            })
            .catch(error => {
                toast.error(error.message);
            })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const { paymentMethod, firstName, lastName, cardNumber, cvc, expiryDate } = Object.fromEntries(data.entries());
        const card = {
            firstName,
            lastName,
            number: cardNumber.replaceAll(' ', ''),
            cvv: cvc,
            expiryMonth: +expiryDate.split(' / ')[0],
            expiryYear: +`20${expiryDate.split(' / ')[1]}`,
        };

        toast.loading('Order is creating...', { toastId: 'order' });

        const awaitingPaymentStatus = orderStatuses.find(status => status.system_label === "Awaiting Payment")
        await axios
            .put("api/v2/orders/order_id", {
                status_id: awaitingPaymentStatus.id
            }, {
                params: {
                    order_id: createdOrder.id
                }
            })


        try {
            if (!paymentIntent) {
                toast.error('There is no Intent!')
            }

            let subscription = '';

            const cbInstance = window.Chargebee.getInstance();
            if (!cbInstance) {
                toast.error('There is no Chargebee instance!')
            }
            cbInstance
                .load3DSHandler()
                .then(threeDSHandler => {
                    // Set the created paymentIntent
                    threeDSHandler.setPaymentIntent(paymentIntent)

                    // The paymentIntent can be updated whenever the amount gets changed
                    //threeDSHandler.updatePaymentIntent(paymentIntent)
                    threeDSHandler.handleCardPayment({
                        card,
                        additionalData
                    }, {
                        change: function (paymentIntent) {
                            // Triggers on each step transition
                            // console.log('change', paymentIntent);
                        },
                        success: async function (paymentIntent) {
                            // Triggers when card is 3DS authorized
                            // console.log('success', paymentIntent);
                            threeDSHandler.updatePaymentIntent(paymentIntent);
                            // TODO: save customer payment data

                            const products = []
                            cartItems.forEach(cartItem =>
                                products.push(
                                    localProducts[cartItem.variant_id].variants ? {
                                        item_price_id: localProducts[cartItem.variant_id]
                                            .variants.find(variant => variant.id === cartItem.variant_id)
                                            .option_values.find(option => option.option_display_name === "Subscription")
                                            .label.toLowerCase().replaceAll(' ', '-'),
                                        unit_price: localProducts[cartItem.variant_id]
                                            .variants.find(variant => variant.id === cartItem.variant_id)
                                            .price * 100 * cartItem.quantity,
                                        isPrescription: localProducts[cartItem.variant_id]
                                            .custom_fields.find(field => field.name === "Prescription")
                                            .value === "true"
                                    } : {
                                        item_price_id: cartItem.variant_id,
                                        unit_price: localProducts[cartItem.variant_id].price * 100 * cartItem.quantity,
                                        isPrescription: false
                                    }
                                )
                            )

                            const getSubscriptionData = (isPrescription) => {
                                let subscriptionData = {
                                    customer_id: customerData.form_fields.find(field => field.name === 'chargebee_id').value,
                                    payment_intent: {
                                        id: paymentIntent.id,
                                    },
                                    shipping_address: {
                                        ...order.shipping_addresses[0],
                                        country: order.shipping_addresses[0].country_code
                                    },
                                    subscription_items: products
                                        .filter(product =>
                                            product.isPrescription === isPrescription
                                        )
                                        .map(product => {
                                            return {
                                                item_price_id: product.item_price_id,
                                                unit_price: product.unit_price,
                                            }
                                        })
                                }

                                if (isPrescription) {
                                    // milliseconds * seconds * minutes * hours * days
                                    const futureDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * 7));
                                    // timestamp in seconds
                                    subscriptionData.start_date = Math.round(futureDate.getTime() / 1000);
                                }

                                if (subscriptionData.subscription_items.length) {
                                    return subscriptionData;
                                }
                                return null
                            };

                            getSubscriptionData(false) && await axios
                                .post("/api/chargebee/v2/subscription", getSubscriptionData(false))
                                .then(response => {
                                    purchaseEvent({
                                        transaction_id: response.data.subscription.id,
                                        shipping: createdOrder.shipping_cost_inc_tax,
                                        tax: createdOrder.total_tax,
                                        payment_type: paymentMethod,
                                    })
                                })

                            getSubscriptionData(true) && await axios
                                .post("/api/chargebee/v2/subscription", getSubscriptionData(true))
                                .then(async response => {
                                    subscription = response.data.subscription;

                                    purchaseEvent({
                                        transaction_id: subscription.id,
                                        shipping: createdOrder.shipping_cost_inc_tax,
                                        tax: createdOrder.total_tax,
                                        payment_type: paymentMethod,
                                    })

                                    await axios.post("/api/zendesk/create_deal", {
                                        createdOrder,
                                        order,
                                        customerData,
                                        subscription_id: subscription.id,
                                        questionnaire_pdf_url: localStorage.getItem('questionnaire_file_url')
                                    });
                                })
                                .catch(error => {
                                    console.error('subscription error', error);
                                })

                            toast.success('Order placed!', { toastId: 'order' });

                            navigate(`/thank-you?orderId=${createdOrder.id}`);
                        },
                        error: function (paymentIntent, error) {
                            // Triggers when 3DS authorization fails
                            console.log('3DS authorization fails', error);
                        }
                    })
                });
        } catch (error) {
            GTMPaymentFailedEvent({
                payment_type: paymentMethod,
                ecommerceError: {
                    paymentError: error.message,
                    date: new Date().toISOString().slice(0, 10),
                    time: new Date().toTimeString().split(' ')[0]
                }
            })

            toast.error('Order can\'t be placed', { toastId: 'order' });
        }

        nextStepAction()
    }

    const purchaseEvent = (gtmData) => {
        GTMPurchaseEvent({
            currency: currency.currency_code,
            value: cartTotal,
            coupon: "",
            items: [
                ...cartItems.map((item) => ({
                    item_id: item.product_id,
                    item_name: item.name,
                    // discount: 5.99,
                    // item_brand: getBrandNameById(product.brand_id),
                    // item_category: getCategoryNameById(categoryId),
                    item_variant: item.variant_id,
                    price: item.sale_price,
                    quantity: item.quantity,
                }))
            ],
            ...gtmData
        });
    }

    return (
        <div className="checkout-payment">
            <div className="checkout-payment__content">
                <section className="checkout-payment__content-column">
                    {
                        !paymentMethods && (
                            <h3 className="checkout-payment__title typography__h3">
                                Payment
                            </h3>
                        )
                    }
                    <form onSubmit={onSubmit} className="checkout-payment__content-form">
                        <Methods
                            paymentMethods={paymentMethods}
                            selectedPaymentMethod={selectedPaymentMethod}
                            setSelectedPaymentMethod={setSelectedPaymentMethod}
                            setIsPlaceOrder={setIsPlaceOrder}
                            customerData={customerData}
                            isSavePaymentMethod={isSavePaymentMethod}
                            setIsSavePaymentMethod={setIsSavePaymentMethod}
                        />
                        <Button className="checkout-payment__button"
                                value="Place order" type="dark"
                                disabled={!isPlaceOrder || !chargebeeInitialized}
                                isSubmit/>
                    </form>
                </section>

                <CartSummary/>
            </div>
        </div>
    );
};

export default CheckoutPayment;

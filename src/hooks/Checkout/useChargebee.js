import { useEffect, useState } from "react";
import axios from "axios";
import { useWindow } from "context/windowContext";
import { useCart } from "context/cartContext";
import { useCurrency } from "context/currencyContext";
import { useCustomer } from "context/customerContext";

const useChargebee = (props) => {
    const { order } = props;
    const { window } = useWindow();
    const { cartTotal } = useCart();
    const { currency } = useCurrency();
    const { customerData } = useCustomer();

    const [chargebeeInitialized, setChargebeeInitialized] = useState(!!window.Chargebee?.inited);

    const GATSBY_CHARGEBEE_SITE_NAME = process.env.GATSBY_CHARGEBEE_SITE_NAME;
    const GATSBY_CHARGEBEE_API_URL = process.env.GATSBY_CHARGEBEE_API_URL;
    const GATSBY_CHARGEBEE_API_KEY = process.env.GATSBY_CHARGEBEE_API_KEY;
    const GATSBY_PAYMENT_GATEWAY_ACCOUNT_ID = process.env.GATSBY_PAYMENT_GATEWAY_ACCOUNT_ID;

    useEffect(() => {
        if (!window.Chargebee || window.Chargebee?.inited || chargebeeInitialized) {
            return
        }

        window.Chargebee.init({
            site: GATSBY_CHARGEBEE_SITE_NAME,
            publishableKey: GATSBY_CHARGEBEE_API_KEY,
            domain: GATSBY_CHARGEBEE_API_URL,
        });
        setChargebeeInitialized(true);
    }, [order])

    const [paymentIntent, setPaymentIntent] = useState(null);
    const [additionalData, setAdditionalData] = useState([]);

    useEffect(() => {
        if (!cartTotal || !currency) {
            return;
        }

        const intentData = {
            customer_id: customerData.form_fields.find(field => field.name === 'chargebee_id').value,
            amount: cartTotal * 100,
            currency_code: currency.currency_code,
            gateway_account_id: GATSBY_PAYMENT_GATEWAY_ACCOUNT_ID,
            payment_method_type: 'card',
        }
        // set payment intent from back-end
        axios.post('/api/chargebee/v2/payments/intent', intentData)
             .then(({ data }) => {
                 setPaymentIntent(data.payment_intent);
             })
    }, [cartTotal])

    return {
        paymentIntent,
        chargebeeInitialized,
        additionalData
    }
}

export default useChargebee

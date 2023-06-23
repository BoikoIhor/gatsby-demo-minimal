import fetch from "node-fetch"

// Deprecated
async function createSubscriberAndSubscription(fields) {
    var responce={};
    const apiKey = process.env.GATSBY_CHARGEBEE_API_KEY; // Replace with your ChangeBee API key
    const apiUrl = process.env.GATSBY_CHARGEBEE_API_URL; // ChangeBee API endpoint
    const customerString = new URLSearchParams(fields.customer).toString();

    // Create a new subscriber
    const customerResponce = await fetch(`${apiUrl}customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic  ${apiKey}`
        },
        body: customerString
    });
    responce = await customerResponce.json();

    if(responce.api_error_code=='duplicate_entry') {
        responce.customer = {};
        responce.customer.id = fields.customer.id;
    }

    if(responce.customer.id!='') {
        const subscriptionString = new URLSearchParams(fields.subscription_fields).toString();
        const subscriptionResponce = await fetch(`${apiUrl}customers/${responce.customer.id}/subscription_for_items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic  ${apiKey}`
            },
            body: subscriptionString
        });
        responce.deal_query = subscriptionString;
        responce.deal = await subscriptionResponce.json();
    }

    return responce;
}

export default async function handler(req, res) {
    var subscribtionFields = {
        customer: req.query.customer,
        subscription_fields: {
            'subscription_items[item_price_id][0]':req.query.subscription_fields.item_price_id,
            'subscription_items[billing_cycles][0]':req.query.subscription_fields.billing_cycles,
            'subscription_items[quantity][0]':req.query.subscription_fields.quantity,
            'subscription_items[active][0]':'1'
        }
    };

    //example query
    // /api/chargebee/create_subscription?customer[id]=123123123&customer[first_name]=Ihor&customer[last_name]=B&customer[email]=bojkoio@gmail.com&customer[auto_collection]=off&subscription_fields[item_price_id]=TestPlan-EUR-Monthly&subscription_fields[billing_cycles]=2&&subscription_fields[quantity]=1

    createSubscriberAndSubscription(subscribtionFields)
        .then((response) => {
            res.json({ result: response });
        }).catch((error) => res.json({ error: error }));
}

import { internalError } from "../../../../utils/bigCommerceRequest";

var chargebee = require("chargebee");
chargebee.configure({site: process.env.GATSBY_CHARGEBEE_SITE_NAME, api_key: process.env.GATSBY_CHARGEBEE_API_KEY});

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        case "POST": {
            await postRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/chargebee/v2/subscription/index.js");
        }
    }
}

/**
 * Get subscriptions list
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/subscriptions?prod_cat_ver=2&lang=node#list_subscriptions
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    chargebee.subscription
        .list(req.query)
        .request()
        .then((response) => {
            res.status(200);
            res.json({result: response.list})
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/subscription/index.js:GET", error);
        });
}

/**
 * Create subscription with items
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/subscriptions?prod_cat_ver=2&lang=node#create_subscription_for_items
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    chargebee.subscription
        .create_with_items(req.body.customer_id, {
            start_date: req.body.start_date,
            shipping_address: req.body.shipping_address,
            payment_intent: req.body.payment_intent,
            subscription_items: req.body.subscription_items
        })
        .request()
        .then((response) => {
            res.status(200);
            res.json({subscription: response.subscription});
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/subscription/index.js:POST", error);
        });
}

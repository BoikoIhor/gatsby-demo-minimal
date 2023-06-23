import { internalError } from "../../../../utils/bigCommerceRequest";

var chargebee = require("chargebee");
chargebee.configure({
    site: process.env.GATSBY_CHARGEBEE_SITE_NAME,
    api_key: process.env.GATSBY_CHARGEBEE_API_KEY
});

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
            await internalError(req, res, "api/chargebee/v2/payments/source.js");
        }
    }
}

/**
 * Get List Payment Sources
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/payment_sources?prod_cat_ver=2#list_payment_sources
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    chargebee
        .payment_source
        .list(req.query)
        .request()
        .then((response) => {
            res.status(200);
            res.json({ result: response.payment_intent });
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/payments/source.js:GET", error);
        });
}

/**
 * Create Payment Source using Payment Intent
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/payment_sources?prod_cat_ver=2#create_using_payment_intent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    chargebee
        .payment_source
        .create_using_payment_intent({
            customer_id: req.body.customer_id,
            payment_intent: {
                gateway_account_id: process.env.PAYMENT_GATEWAY_ACCOUNT_ID,
                gw_token: req.body.gw_token,
            }
        })
        .request()
        .then((response) => {
            res.status(200);
            res.json({ result: response.payment_source });
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/payments/source.js:POST", error);
        });
}

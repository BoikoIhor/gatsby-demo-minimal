import { internalError } from "../../../../utils/bigCommerceRequest";

const chargebee = require("chargebee");
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
        case "UPDATE": {
            await updateRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/chargebee/v2/payments/intent.js");
        }
    }
}

/**
 * Retrieve Payment Intent
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/payment_intents?prod_cat_ver=2#retrieve_a_payment_intent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    chargebee
        .payment_intent
        .retrieve(req.query.id)
        .request()
        .then((response) => {
            res.status(200);
            res.json({ payment_intent: response.payment_intent });
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/payments/intent.js:GET", error);
        });
}

/**
 * Create Payment Intent
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/payment_intents?prod_cat_ver=2#create_a_payment_intent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    chargebee
        .payment_intent
        .create(req.body)
        .request()
        .then((response) => {
            res.status(200);
            res.json({ payment_intent: response.payment_intent });
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/payments/intent.js:POST", error);
        });
}

/**
 * Update Payment Intent
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/payment_intents?prod_cat_ver=2#update_a_payment_intent
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updateRequest = async (req, res) => {
    chargebee
        .payment_intent
        .update(req.params.paymetn_intent_id, req.body)
        .request()
        .then((response) => {
            res.status(200);
            res.json({ result: response.payment_intent });
        })
        .catch((error) => {
            internalError(req, res, "api/chargebee/v2/payments/intent.js:UPDATE", error);
        });
}

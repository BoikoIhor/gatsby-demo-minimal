import { internalError } from "../../../../utils/bigCommerceRequest";

var chargebee = require("chargebee");
chargebee.configure({site: process.env.GATSBY_CHARGEBEE_SITE_NAME, api_key: process.env.GATSBY_CHARGEBEE_API_KEY});

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {
            await postRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/chargebee/v2/subscription/cancel.js");
        }
    }
}

/**
 * Cancel current subscription
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/subscriptions?prod_cat_ver=2#cancel_subscription_for_items
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    chargebee.subscription
        .cancel_for_items(req.body.id, {
            credit_option_for_current_term_charges: "prorate",
            end_of_term: false
        })
        .request()
        .then((response) => {
            res.status(200);
            let result = {
                subscription: response.subscription,
                customer: response.customer,
                card: response.card,
                invoice: response.invoice,
                unbilled_charges: response.unbilled_charges
            };
            res.json({result: result});
        })
        .catch((error) => {
            res.status(500);
            res.json({error: error});
        });
}

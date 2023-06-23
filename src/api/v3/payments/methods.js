import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/payments/methods.js");
        }
    }
}

/**
 * Get Accepted Payment Methods
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-payments/methods#get-accepted-payment-methods
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/payments/methods"

    let params = {};
    if (req.query.checkout_id) {
        params.checkout_id = req.query.checkout_id
    }
    if (req.query.order_id) {
        params.order_id = req.query.order_id
    }
    if (params) {
        await BigCommerceRequest(req, res, url, params);
    } else {
        await BigCommerceRequest(req, res, url);
    }
}

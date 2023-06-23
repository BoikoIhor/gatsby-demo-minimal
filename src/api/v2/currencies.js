import BigCommerceRequest, { internalError } from "../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/currencies.js");
        }
    }
}

/**
 * Get All Currencies
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/currencies#get-all-currencies
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/currencies"

    await BigCommerceRequest(req, res, url);
}

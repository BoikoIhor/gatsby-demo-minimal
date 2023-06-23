import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {
            await postRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/customers/validate-credentials.js");
        }
    }
}

/**
 * Validate a customer credentials
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-validate-credentials#validate-a-customer-credentials
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/customers/validate-credentials"

    await BigCommerceRequest(req, res, url);
}

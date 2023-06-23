import BigCommerceRequest, { internalError } from "../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/settings/store/locale.js");
        }
    }
}

/**
 * Get Locale Settings
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/settings/store-locale#get-locale-settings
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/settings/store/locale"

    await BigCommerceRequest(req, res, url);
}
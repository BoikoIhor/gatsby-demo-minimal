import BigCommerceRequest, { internalError } from "../../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/shipping/zones/zone_id/methods.js");
        }
    }
}

/**
 * Get All Shipping Methods in a Zone
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/shipping-v2/shipping-method#get-all-shipping-methods-in-a-zone
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const zoneId = req.query.zoneId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/shipping/zones/" + zoneId + "/methods"

    await BigCommerceRequest(req, res, url);
}

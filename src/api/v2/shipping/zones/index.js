import BigCommerceRequest, { internalError } from "../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/shipping/zones/index.js");
        }
    }
}

/**
 * Get All Shipping Zones
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/shipping-v2/shipping-zones#get-all-shipping-zones
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/shipping/zones"

    await BigCommerceRequest(req, res, url);
}

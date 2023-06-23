import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/countries/states.js");
        }
    }
}

/**
 * Get All States by Country Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/geography/states#get-all-country's-states
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const countryId = req.query.country_id;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/countries/" + countryId + "/states"

    await BigCommerceRequest(req, res, url);
}

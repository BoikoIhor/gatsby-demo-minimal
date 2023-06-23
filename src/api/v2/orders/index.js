import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";

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
        case "DELETE": {
            await deleteRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/orders/index.js");
        }
    }
}

let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v2/orders";

/**
 * Get All Orders
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#get-all-orders
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    let params = req.query;
    await BigCommerceRequest(req, res, url, params);
}

/**
 * Create an Order
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#create-an-order
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    await BigCommerceRequest(req, res, url);
}

/**
 * Delete All Orders
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#delete-all-orders
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    await BigCommerceRequest(req, res, url);
}

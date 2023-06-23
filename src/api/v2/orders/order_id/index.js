import BigCommerceRequest, { internalError } from "../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        case "PUT": {
            await putRequest(req, res);
            break;
        }
        case "DELETE": {
            await deleteRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/orders/order_id/index.js");
        }
    }
}

/**
 * Get an Order by Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#get-an-order
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/orders/" + req.query.order_id;

    await BigCommerceRequest(req, res, url);
}

/**
 * Update an Order by Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#update-an-order
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/orders/" + req.query.order_id;

    await BigCommerceRequest(req, res, url);
}

/**
 * Archive an Order by Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders#archive-an-order
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/orders/" + req.query.order_id;

    await BigCommerceRequest(req, res, url);
}

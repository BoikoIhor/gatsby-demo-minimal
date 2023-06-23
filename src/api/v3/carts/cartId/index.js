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
            await internalError(req, res, "api/v3/carts/cartId/index.js");
        }
    }
}

/**
 * Get a Cart
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/carts-single#get-a-cart
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId;

    await BigCommerceRequest(req, res, url);
}

/**
 * Update Customer ID
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/carts-single#update-customer-id
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId;

    await BigCommerceRequest(req, res, url);
}

/**
 * !!!Unused, not tested!!!
 * Delete a Cart
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/carts-single#delete-a-cart
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId;

    await BigCommerceRequest(req, res, url);
}

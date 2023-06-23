import BigCommerceRequest, { internalError } from "../../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "PUT": {
            await putRequest(req, res);
            break;
        }
        case "DELETE": {
            await deleteRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/carts/cartId/items/itemId.js");
        }
    }
}


/**
 * Update Cart Line Item
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/items#update-cart-line-item
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId + "/items/" + itemId

    await BigCommerceRequest(req, res, url);
}

/**
 * Delete Cart Line Item
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/items#delete-cart-line-item
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const itemId = req.query.itemId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId + "/items/" + itemId

    await BigCommerceRequest(req, res, url);
}
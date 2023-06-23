import BigCommerceRequest, { internalError } from "../../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST": {
            await postRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/carts/cartId/items/index.js");
        }
    }
}

/**
 * Add Cart Line Items
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/carts/items#add-cart-line-items
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    const cartId = req.query.cartId;
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/carts/" + cartId + "/items"

    await BigCommerceRequest(req, res, url);
}

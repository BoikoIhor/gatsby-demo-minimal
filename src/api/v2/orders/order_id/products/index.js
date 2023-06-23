import BigCommerceRequest, { internalError } from "../../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/orders/order_id/products/index.js");
        }
    }
}

/**
 * Get List Order Products
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/orders/order-products#list-order-products
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    let orderId = req.query.order_id;

    let url = process.env.BIGCOMMERCE_API_URL +
        "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/orders/" + orderId + "/products";

    await BigCommerceRequest(req, res, url);
}

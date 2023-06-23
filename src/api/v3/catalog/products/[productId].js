import BigCommerceRequest, { internalError } from "../../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/catalog/products/[productId].js");
        }
    }
}

/**
 * Get Product By Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-catalog/products#get-a-product
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    let params = req.query;
    let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/catalog/products/" + req.params.productId;

    await BigCommerceRequest(req, res, url, params);
}

import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v2/blog/posts.js");
        }
    }
}

/**
 * Get All Blog Posts
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-content/store-content/blog-posts#get-all-blog-posts
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v2/blog/posts"
    const params = {
        is_published: true,
    }

    await BigCommerceRequest(req, res, url, params);
}

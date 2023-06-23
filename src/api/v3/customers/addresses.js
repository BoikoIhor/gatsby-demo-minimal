import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";
import {encrypt, decrypt} from "../../../utils/encryption";

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
        case "PUT": {
            await putRequest(req, res);
            break;
        }
        case "DELETE": {
            await deleteRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/v3/customers/addresses.js");
        }
    }
}

const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v3/customers/addresses";

/**
 * Get customer address by id or ids
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-addresses#get-all-customer-addresses
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    let params = {};
    if (req.query['id:in']) {
        params['id:in'] = req.query['id:in']
    }
    if (req.query['customer_id:in']) {
        // params['customer_id:in'] = decrypt(req.query['customer_id:in']);
        params['customer_id:in'] = req.query['customer_id:in'];
    }
    if (params) {
        await BigCommerceRequest(req, res, url, params);
    } else {
        await BigCommerceRequest(req, res, url);
    }
}

/**
 * Create a Customer Address
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-addresses#create-a-customer-address
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    await BigCommerceRequest(req, res, url);
}

/**
 * Update Customer Address By Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-addresses#update-a-customer-address
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    await BigCommerceRequest(req, res, url);
}

/**
 * Delete Customer Address By Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-addresses#delete-a-customer-address
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    const params = {
        'id:in': req.query.id
    }
    await BigCommerceRequest(req, res, url, params);
}

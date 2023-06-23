import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";
import { encrypt, decrypt } from "../../../utils/encryption";

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
        default: {
            await internalError(req, res, "api/v3/customers/form-field-values.js");
        }
    }
}

/**
 * Get Customer Form Field Values
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-form-field-values#get-customer-form-field-values
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL +
        "/stores/" +
        process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/customers/form-field-values";
    const params = req.query;
    // if (params.customer_id) {
    //     params.customer_id = decrypt(params.customer_id);
    // }
    await BigCommerceRequest(req, res, url, params);
}

/**
 * Upsert customer form field values
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers/customer-form-field-values#upsert-customer-form-field-values
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL +
        "/stores/" +
        process.env.BIGCOMMERCE_API_STORE_HASH +
        "/v3/customers/form-field-values"

    // if (req.body.customer_id) {
    //     req.body.customer_id = decrypt(req.body.customer_id);
    // }

    await BigCommerceRequest(req, res, url);
}

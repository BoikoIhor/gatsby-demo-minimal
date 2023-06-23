import BigCommerceRequest, { internalError } from "../../../utils/bigCommerceRequest";
import { encrypt, decrypt } from "../../../utils/encryption";
import axios from "axios";

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
            await internalError(req, res, "api/v3/customers/index.js");
        }
    }
}

/**
 * Get customer by id or ids
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers#get-all-customers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v3/customers"
    const params = {
        ...req.query,
        //'id:in': decrypt(req.query[id:in])
    }

    await BigCommerceRequest(req, res, url, params);
}

/**
 * Create customer
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers#create-customers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    try {
        if (!req.body) {
            res.status(403).json(JSON.stringify("Error: Please, fill the registration form."));
        }

        let chargebee_id;
        let customerChargebeeData = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }

        const chargebeeCustomerRequestData = {
            method: "POST",
            url: process.env.GATSBY_APP_URL + "/api/chargebee/v2/customers",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: customerChargebeeData,
        }

        //TODO: create ChargeBee customer
        const responseChargebeeCustomer = await axios(chargebeeCustomerRequestData);
        console.log('responseChargebeeCustomer: ', responseChargebeeCustomer.data.result);
        if (responseChargebeeCustomer.data.result) {
            chargebee_id = responseChargebeeCustomer.data.result.id;
        }

        const customerData = {
            "email": req.body.email,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "authentication": {
                "force_password_reset": false,
                "new_password": req.body.password
            },
            "origin_channel_id": 1,
            "channel_ids": [1]
        }

        const requestData = {
            method: "POST",
            mode: "cors",
            url: process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v3/customers",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Auth-Token": process.env.BIGCOMMERCE_API_ACCESS_TOKEN,
            },
            data: [customerData],
        };

        const response = await axios(requestData);
        console.log('response:', response);
        // response.data.data.forEach(customer => {
        //     customer.id = encrypt(customer.id.toString());
        // });

        console.log('response.data.data: ', response.data[0]);

        if (response.data) {
            const formFieldRequestData = {
                method: "POST",
                url: process.env.GATSBY_APP_URL + "/api/chargebee/v2/customers/form-field-values",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                data: [{
                    "name": "chargebee_id",
                    "value": chargebee_id,
                    "customer_id": response.data[0].id
                }]
            }
            const formFieldsResponse = await axios(formFieldRequestData);
            console.log('formFieldsResponse', formFieldsResponse.data);

        }

        res.status(response.status).json(response.data);

    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data : error.toString();

        res.status(statusCode).json(errorMessage);
    }
}

/**
 * Update Customer By Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers#update-customers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const putRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v3/customers"

    await BigCommerceRequest(req, res, url);
}

/**
 * Delete Customer By Id
 *
 * BigCommerce documentation:
 * https://developer.bigcommerce.com/docs/rest-management/customers#delete-customers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deleteRequest = async (req, res) => {
    const url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH + "/v3/customers"
    const params = {
        ...req.query
    }

    await BigCommerceRequest(req, res, url, params);
}

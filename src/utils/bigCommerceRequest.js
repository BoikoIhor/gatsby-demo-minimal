import axios from "axios";
import { encrypt, decrypt } from "./encryption";

const BigCommerceRequest = async (req, res, url, params = {}, headers) => {
    const isCustomerRequest = req.baseUrl.includes('customers');
    const requestData = {
        method: req.method,
        mode: "cors",
        url,
        params,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Auth-Token": process.env.BIGCOMMERCE_API_ACCESS_TOKEN,
        },
    };

    if (req.body) {
        requestData.data = req.body
    }

    if (headers) {
        requestData.headers = headers
    }

    return await axios(requestData)
        .then((response) => {
            // if (isCustomerRequest) {
            //     // Encrypt customer IDs
            //     if (response.data.data) {
            //         response.data.data.forEach(customer => {
            //             customer.id = encrypt(customer.id.toString());
            //         });
            //     } else {
            //         response.data.forEach(customer => {
            //             customer.id = encrypt(customer.id.toString());
            //         });
            //     }
            // }

            res.status(response.status)
               .json(response.data.data ? response.data.data : response.data)
        })
        .catch((error) => {
            res.status(error.response.status)
               .json({
                   requestData,
                   error: error.response.data,
                   body: req.body,
                   originalUrl: req.originalUrl,
                   params: req.params,
                   query: req.query
               })
        });
}

export default BigCommerceRequest;

export const internalError = async (req, res, file = "", error) => {
    res.status(500)
       .json({
           message: `There is no ${req.method} API method.`,
           file,
           body: req.body,
           originalUrl: req.originalUrl,
           params: req.params,
           query: req.query,
           error
       })
}

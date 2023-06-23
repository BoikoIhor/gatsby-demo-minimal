var chargebee = require("chargebee");
chargebee.configure({site: process.env.GATSBY_CHARGEBEE_SITE_NAME, api_key: process.env.GATSBY_CHARGEBEE_API_KEY});

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
        default: {
            await internalError(req, res, "api/chargebee/v2/customers/index.js");
        }
    }
}

/**
 * Get Customers List
 *
 * Chargebee documentation:
 * https://apidocs.eu.chargebee.com/docs/api/customers?prod_cat_ver=2&lang=node#list_customers
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    chargebee.customer
        .list(req.query)
        .request()
        .then((response) => {
            res.status(200);
            res.json({result: response.list})
        })
        .catch((error) => {
            res.status(500);
            res.json({error: error});
        });
}

/**
 * Create Customer with billing address
 *
 * Chargebee documentation:
 * https://apidocs.eu.chargebee.com/docs/api/customers?prod_cat_ver=2#create_a_customer
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const postRequest = async (req, res) => {
    chargebee.customer
        .create(req.body)
        .request()
        .then((response) => {
            res.status(200);
            res.json({result: response.customer});
        })
        .catch((error) => {
            res.status(500);
            res.json({error: error});
        });
}
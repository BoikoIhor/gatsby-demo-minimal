var chargebee = require("chargebee");
chargebee.configure({site: process.env.GATSBY_CHARGEBEE_SITE_NAME, api_key: process.env.GATSBY_CHARGEBEE_API_KEY});

export default async function handler(req, res) {
    switch (req.method) {
        case "GET": {
            await getRequest(req, res);
            break;
        }
        default: {
            await internalError(req, res, "api/chargebee/v2/plans/item_price.js");
        }
    }
}

/**
 * Get All Item Prices by Plan Id
 *
 * Chargebee documentation:
 * https://apidocs.chargebee.com/docs/api/item_prices?prod_cat_ver=2#list_item_prices
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getRequest = async (req, res) => {
    chargebee.item_price
        .list({"item_id[is]": req.query.item_id, "status[is]": "active", "sort_by[asc]": "updated_at"})
        .request()
        .then((response) => {
            res.status(200);
            res.json({result: response.list});
        }).catch((error) => {
        res.status(500);
        res.json({error: error});
    });
}
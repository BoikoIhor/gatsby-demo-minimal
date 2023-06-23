import fetch from "node-fetch"
async function getZendeskDeals(fields) {
    var responce={};

    const zendeskDealUrl = process.env.ZANDESCK_API_URL+'deals?sort_by=last_stage_change_at:desc';
    const zendeskApiKey = process.env.ZANDESCK_API_KEY;

    //get deal
    const dealData = fields;
    const dealResponce = await  fetch(zendeskDealUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+zendeskApiKey
        }
    });
    responce.dealObj = await dealResponce.json();

    //change orders and capture payment
    //need to finish after connect paysystem

    return responce;
}

export default async function handler(req, res) {
    getZendeskDeals()
        .then((response) => {
            res.json({ result: response });
        }).catch((error) => res.json({ error: error }));
}
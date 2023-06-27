import fetch from "node-fetch"

async function getTicketComments(ticket_id) {
    let ticketObj = {};

    const zendeskTicketUrl = process.env.ZANDESCK_SUPPORT_API_URL+'tickets/'+ticket_id+'/comments?include=users';
    const ticketResponce = await fetch(zendeskTicketUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
        }
    });
    ticketObj = await ticketResponce.json();

    return ticketObj;
}

function getContactTickets(contactObj, needType) {
    let ticketIds= {};
    let lookupString = 'checking-type';

    for (const index in contactObj.custom_fields) {
        if(index.indexOf(lookupString)>=0) {
            ticketIds[index] = contactObj.custom_fields[index];
        }
    }
    return ticketIds;
}

async function getContact(bigcommerce_id) {
    let responce = {};
    const zendeskContactUrl = process.env.ZANDESCK_API_URL + 'contacts';
    const zendeskApiKey = process.env.ZANDESCK_API_KEY;

    //check existing contact
    const contactListResponce = await fetch(zendeskContactUrl+'?per_page=1&custom_fields[bigcommerce_id]='+ bigcommerce_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + zendeskApiKey
        }
    });
    responce = await contactListResponce.json();
    if(responce.items && responce.items.length>0) {
        responce = responce.items[0];
        return responce.data;
    }
    else {
        return false;
    }
}

async function getTicketsComments(contactData, type) {
    let ticketsIds = getContactTickets(contactData, type);
    let ticketsComments= {};

    for (const index in ticketsIds) {
        if(index==type || type=='') {
            ticketsComments[index] = await getTicketComments(ticketsIds[index]);
        }
    }
    return ticketsComments;
}

export default async function handler(req, res) {
    let responce = [];

    try {
        let contactData = await getContact(req.query.customer_id);
        if (contactData) {
            let type = req.query.type || '';
            responce = await getTicketsComments(contactData, type);
        }
        res.json(responce);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}
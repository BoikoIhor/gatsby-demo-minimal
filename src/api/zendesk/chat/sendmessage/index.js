import fetch from "node-fetch"

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

async function getUser(bigcommerce_id) {
    let responce = {};

    //search criteria
    const query = `external_id:${bigcommerce_id}`;

    //check existing contact
    const contactListResponce = await fetch(process.env.ZANDESCK_SUPPORT_API_URL+'users/search?query='+encodeURIComponent(query), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
        }
    });
    responce = await contactListResponce.json();

    if(responce.users && responce.users.length>0) {
        responce = responce.users[0];
        return responce.id;
    }
    else {
        return false;
    }
}

async function uploadFile(req) {
    let filesObj = [];
    if(req.files && req.files.length>0) {
        for (const index in req.files) {
            let file = req.files[index];
            const zendeskTicketUrl = process.env.ZANDESCK_SUPPORT_API_URL+'uploads?filename='+file.originalname;
            const fileResponce = await fetch(zendeskTicketUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': file.mimetype,
                    Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
                },
                body: file.buffer
            });
            let fileObj = await fileResponce.json();
            filesObj.push(fileObj.upload.token);
        }
    }
    return filesObj;
}

async function setTicketComment(userId, ticketId, message, req) {
    //creating ticket
    let ticketFields = {
        ticket: {
            comment: {
                body: message,
                author_id:userId
            }
        }
    }

    let uploadFilesId = await uploadFile(req);
    if(uploadFilesId.length>0) {
        ticketFields.ticket.comment.uploads = uploadFilesId;
    }

    const zendeskTicketUrl = process.env.ZANDESCK_SUPPORT_API_URL+'tickets/'+ticketId;
    const ticketResponce = await fetch(zendeskTicketUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
        },
        body: JSON.stringify(ticketFields)
    });
    let commentObj = await ticketResponce.json();

    return commentObj;
}

export default async function handler(req, res) {
    let response = [];
    let customer_id = false;
    let type = '';
    let message = '';

    if(req.query.customer_id) {
        customer_id = req.query.customer_id;
    }
    if(req.body.customer_id) {
        customer_id = req.body.customer_id;
    }
    if(req.query.type) {
        type = req.query.type;
    }
    if(req.body.type) {
        type = req.body.type;
    }
    if(req.query.message) {
        message = req.query.message;
    }
    if(req.body.message) {
        message = req.body.message;
    }

    let contactData =  await getContact(customer_id);
    let userId =  await getUser(customer_id);

    let ticketsIds = getContactTickets(contactData, type);

    for (const index in ticketsIds) {
        if(type == index) {
            response = await setTicketComment(userId, ticketsIds[index], message, req);
        }
    }

    res.json(response);
}
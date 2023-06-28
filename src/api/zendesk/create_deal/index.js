import fetch from "node-fetch"
import https from "https";
async function createTicket(objects, fields) {
    let responce = {};
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });

    //creating zendesk user
    let userFields = {
        skip_verify_email:true,
        user: {
            email: objects.contactObj.data.email,
            name: objects.contactObj.data.name,
            last_name: objects.contactObj.data.last_name,
            external_id: fields.contact.data.custom_fields.bigcommerce_id
        }
    }
    const zendeskUserUrl = process.env.ZANDESCK_SUPPORT_API_URL+'users/create_or_update';
    const userResponce = await fetch(zendeskUserUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(userFields)
    });
    responce.userObj = await userResponce.json();

    //creating ticket
    let ticketFields = {
        ticket: {
            comment: {
                html_body: '<p>Checking order and prescription required</p>',
                author_id: responce.userObj.user.id
            },
            requester: {"name": objects.contactObj.data.name, "email": objects.contactObj.data.email },
            submitter_id: responce.userObj.user.id,
        }
    }
    if(fields.deal.custom_fields.file!='') {
        ticketFields.ticket.comment.html_body += '<p><a href="'+fields.deal.custom_fields.file+'">Questionare</a></p>';
    }

    const zendeskTicketUrl = process.env.ZANDESCK_SUPPORT_API_URL+'tickets';
    const ticketResponce = await fetch(zendeskTicketUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${process.env.ZANDESCK_SUPPORT_API_KEY}`
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(ticketFields)
    });
    responce.ticketObj = await ticketResponce.json();

    return responce;
}

async function appendTicketToContact(objects, needType,  newValue) {
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    
    const zendeskApiKey = process.env.ZANDESCK_API_KEY;
    const contactData = {
        data: {
            last_name:objects.contactObj.data.last_name,
            custom_fields: {
                [needType]:newValue
            }
        }
    }
    const contactResponce = await fetch(process.env.ZANDESCK_API_URL+`contacts/upsert?custom_fields%5Bbigcommerce_id%5D=${objects.contactObj.data.custom_fields.bigcommerce_id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${zendeskApiKey}`,
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(contactData),
    });
}
async function appendTicketToDeal(objects,  ticketId) {
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    const zendeskApiKey = process.env.ZANDESCK_API_KEY;
    const contactData = {
        data: {
            custom_fields: {
                'ticket_id':ticketId,
                'ticket_url':process.env.ZANDESCK_SUPPORT_TICKETS_URL+ticketId
            }
        }
    }
    const dealResponce = await fetch(process.env.ZANDESCK_API_URL+`deals/upsert?custom_fields%5Border_id%5D=${objects.dealObj.data.custom_fields.order_id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${zendeskApiKey}`,
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(contactData),
    });
}
function getTicketType(objects, fields) {
    if(fields.deal && fields.deal.custom_fields && fields.deal.custom_fields.checking_type) {
        let lookingFieldName = 'checking-type';
        let checkingType = fields.deal.custom_fields.checking_type;
        return lookingFieldName+'-'+checkingType;
    }
    return false;
}
async function manageTickets(objects, fields) {
    let needType = getTicketType(objects, fields);
    if(needType) {
        let existsValueInContactProfile = getContactTickets(objects.contactObj.data, needType);
        if(!existsValueInContactProfile) {
            let existsValueInContactProfileObj = await createTicket(objects, fields);
            existsValueInContactProfile = existsValueInContactProfileObj.ticketObj.ticket.id;
            appendTicketToContact(objects, needType,  existsValueInContactProfile);
        }
        appendTicketToDeal(objects, existsValueInContactProfile);
    }
}
function getContactTickets(contactObj, needType) {
    if(contactObj.custom_fields && contactObj.custom_fields[needType]) {
        return contactObj.custom_fields[needType];
    }
    return false;
}

async function checkNeedDeal(products) {
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    const lookingFieldName = 'Prescription';
    const lookingFieldPrescriptionType = 'PrescriptionType';
    let result = false;
    try {
        for (const item of products) {
            let url = process.env.BIGCOMMERCE_API_URL + "/stores/" + process.env.BIGCOMMERCE_API_STORE_HASH+'/v3/catalog/products/'+item.product_id+'/custom-fields';
            let options = {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth-Token': process.env.BIGCOMMERCE_API_ACCESS_TOKEN
                },
                agent: httpsAgent,
                cache: "no-cache",
            };
            let responceObj = await fetch(url, options);
            let responceData = await responceObj.json();

            for (const field of responceData.data) {
                if(field.name==lookingFieldName) {
                    if(field.value == 'true') {
                        result = true;
                    }
                }
            }
            if(result==true) {
                for (const field of responceData.data) {
                    if(field.name==lookingFieldPrescriptionType) {
                        result = field.value;
                    }
                }
            }
        }
        return result;
    } catch (error) {
        return result;
    }
}

async function createZendeskDeal(fields) {
    let httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });
    let contactId = 0;
    let responce = {};
    const zendeskContactUrl = process.env.ZANDESCK_API_URL + 'contacts';
    const zendeskDealUrl = process.env.ZANDESCK_API_URL + 'deals';
    const zendeskTaskUrl = process.env.ZANDESCK_API_URL + 'tasks';
    const zendeskApiKey = process.env.ZANDESCK_API_KEY;

    //check existing contact
    const contactListResponce = await fetch(zendeskContactUrl+'?per_page=1&custom_fields[bigcommerce_id]='+ fields.contact.data.custom_fields.bigcommerce_id, {
        method: 'GET',
        agent: httpsAgent,
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + zendeskApiKey
        }
    });
    responce.contactObj = await contactListResponce.json();

    if(typeof(responce.contactObj.items)!=undefined) {
        if(responce.contactObj.items.length>0) {
            responce.contactObj = responce.contactObj.items[0];
            contactId = responce.contactObj.data.id;
        }
    }
    if(contactId == 0) {
        //creating contact
        const contactResponce = await fetch(zendeskContactUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + zendeskApiKey
            },
            agent: httpsAgent,
            cache: "no-cache",
            body: JSON.stringify(fields.contact)
        });
        responce.contactObj = await contactResponce.json();
        contactId = responce.contactObj.data.id;
    }

    //creating deal
    fields.deal.contact_id = contactId;
    const dealData = {
        data: fields.deal
    };
    const dealResponce = await fetch(zendeskDealUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+zendeskApiKey
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(dealData)
    });
    responce.dealObj = await dealResponce.json();

    //creating task
    fields.task.resource_id = responce.dealObj.data.id;
    const taskData = {
        data: fields.task
    };
    const taskResponce = await fetch(zendeskTaskUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+zendeskApiKey
        },
        agent: httpsAgent,
        cache: "no-cache",
        body: JSON.stringify(taskData)
    });
    responce.taskObj = await taskResponce.json();

    //creating ticket
    responce.ticketObj = await manageTickets(responce, fields);

    return responce;
}

export default async function handler(req, res) {
    let neededTicketType = await checkNeedDeal(req.body.order.products);
    if (neededTicketType) {
        //need to create deal
        const currentDate = new Date();
        const currentDateText = currentDate.toISOString();
        currentDate.setDate(currentDate.getDate() + 1);
        const taskDueText = currentDate.toISOString();
        currentDate.setHours(currentDate.getHours() - 1);
        const taskRemindText = currentDate.toISOString();

        let file_url = '';
        if(req.body.questionnaire_pdf_url && req.body.questionnaire_pdf_url!='undefined' && req.body.questionnaire_pdf_url!='null') {
            file_url = req.body.questionnaire_pdf_url;
        }
        const zendeskFields = {
            contact: {
                data: {
                    first_name: req.body.customerData.first_name,
                    last_name: req.body.customerData.last_name,
                    email: req.body.customerData.email,
                    custom_fields: {
                        bigcommerce_id: req.body.order.customer_id
                    }
                }
            },
            deal: {
                name: "Order "+req.body.createdOrder.id+" from "+currentDateText,
                value: req.body.createdOrder.total_inc_tax,
                hot: true,
                tags: [
                    "important"
                ],
                custom_fields: {
                    order_id: req.body.createdOrder.id,
                    file: file_url,
                    checking_type: neededTicketType,
                    subscription_id: req.body.subscription_id
                }
            },
            task: {
                content: "Order "+req.body.createdOrder.id+" from "+currentDateText,
                due_date: taskDueText,
                remind_at: taskRemindText,
                resource_type: 'deal'
            }
        };

        createZendeskDeal(zendeskFields);
    }

    res.json(req.body.responce);
}

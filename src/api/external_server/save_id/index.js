import fetch from "node-fetch"
import https from "https";
async function saveId(req) {
    let filesObj = [];
    if(req.files && req.files.length>0) {
        for (const index in req.files) {
            let file = req.files[index];
            const zendeskTicketUrl = process.env.EXT_SERVER_URL + 'api/save_id/';
            const fileResponce = await fetch(zendeskTicketUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': file.mimetype,
                },
                body: req
            });
            let fileObj = await fileResponce.json();
            filesObj.push(fileObj);
        }
    }
    return filesObj;
}

export default async function handler(req, res) {
    try {
        const response = await saveId(req);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
import fetch from "node-fetch"
import https from "https";

async function savePdf(req) {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false
    });

    const pdfCreatorUrl = process.env.EXT_SERVER_URL + 'api/save_pdf/';

    const pdfCreatorResponce = await fetch(pdfCreatorUrl, {
        cache: "no-cache",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        agent: httpsAgent,
        body: JSON.stringify(req.body)
    });
    return await pdfCreatorResponce.json();
}

export default async function handler(req, res) {

    try {
        const response = await savePdf(req);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
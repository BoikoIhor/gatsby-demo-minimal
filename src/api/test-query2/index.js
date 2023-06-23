import fetch from "node-fetch"

async function savePdf(req) {
    let responce = {};
    const pdfCreatorUrl = 'https://api.getwellis.com/api/save_pdf/';
    //check existing contact
    const pdfCreatorResponce = await fetch(pdfCreatorUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
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